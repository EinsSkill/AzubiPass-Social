-- Lerngruppen (20.10.2026): Gruppeninhalte gehören jetzt in die Moderation.
-- Bisher filterten Fallliste, Fall und Ausblendungsliste Gruppenbeiträge aus,
-- weil es noch keine Gruppen gab. Sonst unverändert.

create or replace view public.mod_faelle with (security_invoker = true) as
with ziele as (
  select case when m.beitrag_id is not null then 'beitrag' else 'antwort' end as art,
         coalesce(m.beitrag_id, m.antwort_id) as ziel, m.erstellt_am as zeit,
         public.mod_stufe(m.grund) as stufe, 1 as meldung, 0 as anfrage
    from public.meldung m where m.status = 'offen'
  union all
  select case when a.beitrag_id is not null then 'beitrag' else 'antwort' end,
         coalesce(a.beitrag_id, a.antwort_id), p.erstellt_am,
         public.mod_stufe(coalesce(a.kategorie, 'sonstiges')), 0, 1
    from public.pruefanfrage p join public.ausblendung a on a.id = p.ausblendung_id
   where p.status = 'offen'
)
select z.art, z.ziel, min(z.stufe)::smallint as stufe, min(z.zeit) as aeltester,
       sum(z.meldung)::int as meldungen, sum(z.anfrage) > 0 as pruefanfrage,
       coalesce(b.versteckt, an.versteckt) as versteckt,
       coalesce(b.titel, ab.titel) as titel,
       left(an.text, 140) as antwort_auszug,
       coalesce(b.autor_id, an.autor_id) as autor_id
  from ziele z
  left join public.beitrag b on z.art = 'beitrag' and b.id = z.ziel
  left join public.antwort an on z.art = 'antwort' and an.id = z.ziel
  left join public.beitrag ab on ab.id = an.beitrag_id
 group by z.art, z.ziel, b.versteckt, an.versteckt, b.titel, ab.titel, an.text, b.autor_id, an.autor_id;

create or replace function public.moderation_fall(p_art text, p_ziel uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare b public.beitrag; a public.antwort; aus public.ausblendung; r jsonb;
begin
  perform public.mod_team_pruefen();
  if p_art = 'beitrag' then select * into b from public.beitrag where id = p_ziel;
  elsif p_art = 'antwort' then
    select * into a from public.antwort where id = p_ziel;
    select * into b from public.beitrag where id = a.beitrag_id;
  end if;
  if b.id is null or (p_art = 'antwort' and a.id is null) then
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
