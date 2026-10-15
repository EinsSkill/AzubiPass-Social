create function public.eigener_inhalt(p_art text, p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  ich uuid := public.mod_autor_pruefen();
  b public.beitrag; a public.antwort; eb public.beitrag; akt public.ausblendung; letzte public.ausblendung;
begin
  if p_art = 'beitrag' then select * into b from public.beitrag where id = p_id and autor_id = ich;
  elsif p_art = 'antwort' then
    select * into a from public.antwort where id = p_id and autor_id = ich;
    select * into eb from public.beitrag where id = a.beitrag_id;
  end if;
  if coalesce(b.id, a.id) is null then
    perform public.mod_fehler('APZ01', 'Dieser Inhalt ist für dich nicht verfügbar.');
  end if;
  akt := public.mod_aktiv(p_art, p_id);
  select * into letzte from public.ausblendung x
   where x.autor_id = ich and ((p_art = 'beitrag' and x.beitrag_id = p_id) or (p_art = 'antwort' and x.antwort_id = p_id))
     and exists (select 1 from public.pruefanfrage q where q.ausblendung_id = x.id)
   order by x.erstellt_am desc nulls last, x.id limit 1;
  return jsonb_build_object('art', p_art, 'id', p_id,
    'titel', b.titel, 'text', coalesce(b.text, a.text), 'beitrag_art', b.art,
    'datei_pfad', b.datei_pfad, 'datei_art', b.datei_art,
    'erstellt_am', coalesce(b.erstellt_am, a.erstellt_am), 'bearbeitet_am', coalesce(b.bearbeitet_am, a.bearbeitet_am),
    'versteckt', coalesce(b.versteckt, a.versteckt),
    -- Vom fremden Elternbeitrag nur, ob er ausgeblendet ist; Verweis nur, wenn lesbar.
    'eltern_ausgeblendet', p_art = 'antwort' and eb.versteckt and eb.autor_id <> ich,
    'eltern_id', case when p_art = 'antwort' and (not eb.versteckt or eb.autor_id = ich) then eb.id end,
    'ausblendung', case when akt.id is null then null else public.mod_autorsicht(akt) end,
    'fruehere', case when letzte.id is null or letzte.id = akt.id then null else public.mod_autorsicht(letzte) end);
end $$;
