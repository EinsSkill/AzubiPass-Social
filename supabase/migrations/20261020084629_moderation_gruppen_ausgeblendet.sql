-- Lerngruppen (20.10.2026): Ausblendungsliste auch mit Gruppeninhalten.

create or replace function public.moderation_ausgeblendet(p_nach jsonb, p_anzahl int)
returns setof jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.mod_team_pruefen();
  return query
  with l as (
    select x.id, case when x.beitrag_id is not null then 'beitrag' else 'antwort' end as art,
           coalesce(x.beitrag_id, x.antwort_id) as ziel, x.quelle, x.erstellt_am, x.bestaetigt_am,
           coalesce(x.erstellt_am, '-infinity'::timestamptz) as sortzeit,
           coalesce(b.titel, ab.titel) as titel, left(an.text, 140) as antwort_auszug,
           coalesce(b.erstellt_am, an.erstellt_am) as inhalt_erstellt_am,
           coalesce(ab.versteckt, false) as eltern_ausgeblendet
      from public.ausblendung x
      left join public.beitrag b on b.id = x.beitrag_id
      left join public.antwort an on an.id = x.antwort_id
      left join public.beitrag ab on ab.id = an.beitrag_id
     where x.aufgehoben_am is null)
  select to_jsonb(l) - 'sortzeit' || jsonb_build_object('sortzeit', l.sortzeit::text) from l
   where p_nach is null or (l.sortzeit, l.id) < ((p_nach->>'sortzeit')::timestamptz, (p_nach->>'id')::uuid)
   order by l.sortzeit desc, l.id desc
   limit least(greatest(coalesce(p_anzahl, 25), 1), 50);
end $$;
