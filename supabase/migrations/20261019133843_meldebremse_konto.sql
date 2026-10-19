-- R07 (Review 8273f7b): Die 30-Meldungen-Bremse je Konto und Stunde ist jetzt
-- atomar. Bisher serialisierte nur die Threadsperre; zwei Meldungen desselben
-- Kontos an verschiedene Beiträge zählten denselben Stand (29 + 2 = 31).
-- Neu: transaktionsgebundene Advisory-Sperre je Konto direkt vor Zählung und
-- Anlage. Wiederholungen (eigene Meldung vor und nach der Threadsperre, R02)
-- kehren vorher zurück und brauchen die Kontosperre nicht.
-- Ersetzt die Funktion aus 20261015130525_melden_2.sql (Datei bleibt).

create or replace function public.meldung_senden(p_art text, p_ziel uuid, p_grund text, p_hinweis text)
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
  -- R07: Kontosperre vor dem Zählen. Neue Meldungen eines Kontos laufen
  -- nacheinander durch Zählung und Anlage, auch an verschiedene Threads.
  -- Reihenfolge: Thread (Beitrag → Antwort) → Konto. Wer die Kontosperre hält,
  -- wartet auf keine fremde Threadsperre mehr – keine Verklemmung.
  perform pg_advisory_xact_lock(hashtextextended('azubipass.meldung:' || ich::text, 0));
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
