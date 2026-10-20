create function public.pruefanfrage_senden(p_id uuid, p_ausblendung uuid, p_begruendung text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := public.mod_autor_pruefen();
  t text := btrim(coalesce(p_begruendung, ''));
  q public.pruefanfrage; x public.ausblendung; s record; neu uuid; art text; ziel uuid;
begin
  if p_id is null or p_ausblendung is null then perform public.mod_fehler('APE01', 'Vorgangskennung fehlt.'); end if;
  -- Wiederholung zuerst (P2), auch nach Abschluss und Aufhebung.
  select * into q from public.pruefanfrage where id = p_id;
  if q.id is not null then
    if q.autor_id = ich and q.ausblendung_id = p_ausblendung then
      return jsonb_build_object('id', q.id, 'status', q.status, 'ergebnis', q.ergebnis,
        'ergebnis_begruendung', q.ergebnis_begruendung, 'wiederholung', true);
    end if;
    perform public.mod_fehler('APV01', 'Dieser Vorgang wurde bereits abgeschlossen. Lade die Seite neu.');
  end if;
  if t = '' then perform public.mod_fehler('APE01', 'Gib eine kurze Begründung ein.'); end if;
  if char_length(t) > 500 then perform public.mod_fehler('APE01', 'Die Begründung darf höchstens 500 Zeichen lang sein.'); end if;
  select * into x from public.ausblendung where id = p_ausblendung;
  if x.id is null then perform public.mod_fehler('APF01', 'Die Ausblendung hat sich geändert. Lade die Seite neu.'); end if;
  art := case when x.beitrag_id is not null then 'beitrag' else 'antwort' end;
  ziel := coalesce(x.beitrag_id, x.antwort_id);
  select * into s from public.mod_sperren(art, ziel);
  select * into x from public.ausblendung where id = p_ausblendung;          -- nach der Sperre neu lesen
  if x.autor_id <> ich or (case when art = 'beitrag' then (s.b).autor_id else (s.a).autor_id end) <> ich then
    perform public.mod_fehler('APR01', 'Dieser Bereich ist für dich nicht verfügbar.');
  end if;
  if x.aufgehoben_am is not null or x.bestaetigt_am is null then
    perform public.mod_fehler('APF01', 'Die Ausblendung hat sich geändert. Lade die Seite neu.');
  end if;
  if exists (select 1 from public.pruefanfrage where ausblendung_id = x.id) then
    perform public.mod_fehler('APD01', 'Du hast für diese Ausblendung bereits eine Prüfung angefragt.');
  end if;
  insert into public.vorgang (id, autor_id, art, zustand) values (p_id, ich, 'pruefanfrage', 'angelegt')
  on conflict (id) do nothing returning id into neu;
  if neu is null then
    perform public.mod_fehler('APV01', 'Dieser Vorgang wurde bereits abgeschlossen. Lade die Seite neu.');
  end if;
  insert into public.pruefanfrage (id, ausblendung_id, autor_id, begruendung) values (p_id, x.id, ich, t)
  returning * into q;
  perform public.mod_version_hoch(art, ziel);
  return jsonb_build_object('id', q.id, 'status', q.status, 'ergebnis', null,
    'ergebnis_begruendung', null, 'wiederholung', false);
end $$;

create function public.pruefanfrage_status(p_ausblendung uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare ich uuid := public.mod_autor_pruefen(); q public.pruefanfrage;
begin
  select * into q from public.pruefanfrage where ausblendung_id = p_ausblendung and autor_id = ich;
  return case when q.id is null then null else jsonb_build_object('id', q.id, 'status', q.status,
    'ergebnis', q.ergebnis, 'ergebnis_begruendung', q.ergebnis_begruendung, 'wiederholung', true) end;
end $$;

revoke all on function public.eigene_ausblendungen(), public.eigener_inhalt(text, uuid),
  public.pruefanfrage_senden(uuid, uuid, text), public.pruefanfrage_status(uuid) from public, anon;

grant execute on function public.eigene_ausblendungen(), public.eigener_inhalt(text, uuid),
  public.pruefanfrage_senden(uuid, uuid, text), public.pruefanfrage_status(uuid) to authenticated;
