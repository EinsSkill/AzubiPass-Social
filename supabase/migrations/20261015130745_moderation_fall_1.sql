-- Spec 06 · Einzelfall, ausgeblendete Inhalte, Protokoll (Team).

create function public.moderation_fall(p_art text, p_ziel uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare b public.beitrag; a public.antwort; aus public.ausblendung; r jsonb;
begin
  perform public.mod_team_pruefen();
  if p_art = 'beitrag' then select * into b from public.beitrag where id = p_ziel;
  elsif p_art = 'antwort' then
    select * into a from public.antwort where id = p_ziel;
    select * into b from public.beitrag where id = a.beitrag_id;
  end if;
  if b.id is null or (p_art = 'antwort' and a.id is null) or b.gruppe_id is not null then
    perform public.mod_fehler('APZ01', 'Dieser Inhalt ist für dich nicht verfügbar.');
  end if;
  aus := public.mod_aktiv(p_art, p_ziel);
  select jsonb_build_object(
    'art', p_art, 'ziel', p_ziel,
    'version', case when p_art = 'beitrag' then b.mod_version else a.mod_version end,
    'versteckt', case when p_art = 'beitrag' then b.versteckt else a.versteckt end,
    'beitrag', jsonb_build_object('id', b.id, 'art', b.art, 'titel', b.titel, 'text', b.text,
       'lernfeld', b.lernfeld, 'kapitel', b.kapitel, 'datei_pfad', b.datei_pfad, 'datei_art', b.datei_art,
       'erstellt_am', b.erstellt_am, 'bearbeitet_am', b.bearbeitet_am, 'versteckt', b.versteckt,
       'autor', (select jsonb_build_object('anzeigename', p.anzeigename, 'rolle', p.rolle, 'lehrjahr', p.lehrjahr)
                   from public.profil p where p.id = b.autor_id)),
    'antwort', case when a.id is null then null else jsonb_build_object('id', a.id, 'text', a.text,
       'erstellt_am', a.erstellt_am, 'bearbeitet_am', a.bearbeitet_am, 'versteckt', a.versteckt,
       'team_korrektur', a.team_korrektur,
       'autor', (select jsonb_build_object('anzeigename', p.anzeigename, 'rolle', p.rolle, 'lehrjahr', p.lehrjahr)
                   from public.profil p where p.id = a.autor_id)) end,
    'meldungen', coalesce((select jsonb_agg(jsonb_build_object('id', m.id, 'grund', m.grund, 'hinweis', m.hinweis,
                   'erstellt_am', m.erstellt_am) order by m.erstellt_am, m.id)
                 from public.meldung m where m.status = 'offen'
                  and ((p_art = 'beitrag' and m.beitrag_id = p_ziel) or (p_art = 'antwort' and m.antwort_id = p_ziel))), '[]'),
    'ausblendung', case when aus.id is null then null else jsonb_build_object('id', aus.id, 'quelle', aus.quelle,
       'erstellt_am', aus.erstellt_am, 'bestaetigt_am', aus.bestaetigt_am, 'kategorie', aus.kategorie,
       'begruendung_autor', aus.begruendung_autor) end,
    'pruefanfrage', (select jsonb_build_object('id', q.id, 'begruendung', q.begruendung, 'erstellt_am', q.erstellt_am)
                       from public.pruefanfrage q where q.ausblendung_id = aus.id and q.status = 'offen'),
    'verlauf', coalesce((select jsonb_agg(jsonb_build_object('aktion', e.aktion, 'zeit', e.zeit, 'akteur', e.akteur,
                   'interne_begruendung', e.interne_begruendung) order by e.zeit desc)
                 from (select * from public.moderation_entscheidung x
                        where (p_art = 'beitrag' and x.beitrag_id = p_ziel) or (p_art = 'antwort' and x.antwort_id = p_ziel)
                        order by x.zeit desc limit 20) e), '[]'))
  into r;
  return r;
end $$;
