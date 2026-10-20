create function public.meldung_senden(p_art text, p_ziel uuid, p_grund text, p_hinweis text)
returns table (meldung_id uuid, status text, neu boolean, gleich boolean)
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  h text := btrim(coalesce(p_hinweis, ''));
  m public.meldung; s record; sichtbar boolean;
begin
  if ich is null or not public.ist_freigeschaltet() then
    perform public.mod_fehler('APR01', 'Dafür brauchst du ein Community-Profil.');
  end if;
  if not public.beitraege_frei() then
    perform public.mod_fehler('APP01', 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.');
  end if;
  if p_art not in ('beitrag', 'antwort') or p_ziel is null
     or p_grund not in ('falsch', 'urheberrecht', 'beleidigung', 'spam', 'persoenliche_daten', 'sonstiges') then
    perform public.mod_fehler('APE01', 'Wähle einen Grund für deine Meldung.');
  end if;
  if char_length(h) > 500 then
    perform public.mod_fehler('APE01', 'Der Hinweis darf höchstens 500 Zeichen lang sein.');
  end if;
  -- 2. Eigene Meldung zuerst (P1): nur Werte, die der Client schon kennt.
  m := public.mod_eigene_meldung(ich, p_art, p_ziel);
  if m.id is not null then
    return query select m.id, m.status, false, (m.grund = p_grund and m.hinweis = h); return;
  end if;
  -- 3. Thread sperren, 4. nach dem Warten erneut suchen (R02).
  select * into s from public.mod_sperren(p_art, p_ziel);
  m := public.mod_eigene_meldung(ich, p_art, p_ziel);
  if m.id is not null then
    return query select m.id, m.status, false, (m.grund = p_grund and m.hinweis = h); return;
  end if;
  -- 5. Sichtbarkeit wie die Leseregeln, dann Bremse, dann anlegen.
  sichtbar := (s.b).gruppe_id is null or public.ist_mitglied((s.b).gruppe_id) or public.ist_team();
  sichtbar := sichtbar and (not (s.b).versteckt or (s.b).autor_id = ich or public.ist_team());
  if p_art = 'antwort' then
    sichtbar := sichtbar and (not (s.a).versteckt or (s.a).autor_id = ich or public.ist_team());
  end if;
  if not sichtbar then perform public.mod_fehler('APZ01', 'Dieser Inhalt ist für dich nicht verfügbar.'); end if;
  if (select count(*) from public.meldung x where x.melder_id = ich
        and x.erstellt_am > now() - interval '1 hour') >= 30 then
    perform public.mod_fehler('APB01', 'Du hast gerade viele Meldungen gesendet. Versuch es später erneut.');
  end if;
  begin
    insert into public.meldung (melder_id, beitrag_id, antwort_id, grund, hinweis)
    values (ich, case when p_art = 'beitrag' then p_ziel end, case when p_art = 'antwort' then p_ziel end,
            p_grund, h)
    returning * into m;
  exception when unique_violation then                       -- 6. dritte Sicherung
    m := public.mod_eigene_meldung(ich, p_art, p_ziel);
    return query select m.id, m.status, false, (m.grund = p_grund and m.hinweis = h); return;
  end;
  perform public.mod_version_hoch(p_art, p_ziel);
  return query select m.id, m.status, true, true;
end $$;

create function public.meldung_status(p_art text, p_ziel uuid)
returns table (meldung_id uuid, status text, erstellt_am timestamptz)
language sql stable security definer set search_path = '' as $$
  select m.id, m.status, m.erstellt_am from public.meldung m
   where public.ist_freigeschaltet() and public.beitraege_frei()
     and m.melder_id = (select auth.uid())
     and ((p_art = 'beitrag' and m.beitrag_id = p_ziel) or (p_art = 'antwort' and m.antwort_id = p_ziel));
$$;

-- Eigene Meldungen; Titel/Ziel nur, solange das Ziel jetzt lesbar ist (Leseregeln
-- über security invoker: die Unterabfragen laufen mit den Rechten der Person).
create function public.meine_meldungen(p_nach_zeit timestamptz, p_nach_id uuid, p_anzahl int)
returns table (id uuid, grund text, status text, erstellt_am timestamptz, art text, ziel_id uuid, titel text)
language sql stable security invoker set search_path = '' as $$
  select m.id, m.grund, m.status, m.erstellt_am,
         case when m.beitrag_id is not null then 'beitrag' else 'antwort' end,
         coalesce(b.id, a.id),
         coalesce(b.titel, ab.titel)
    from public.meldung m
    left join public.beitrag b on b.id = m.beitrag_id
    left join public.antwort a on a.id = m.antwort_id
    left join public.beitrag ab on ab.id = a.beitrag_id
   where m.melder_id = (select auth.uid())
     and (p_nach_zeit is null or (m.erstellt_am, m.id) < (p_nach_zeit, p_nach_id))
   order by m.erstellt_am desc, m.id desc
   limit least(greatest(coalesce(p_anzahl, 30), 1), 50);
$$;
