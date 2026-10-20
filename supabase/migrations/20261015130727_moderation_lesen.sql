-- Spec 06 · Lesen für das Team (06-technik-plan.md §4.3). Alle prüfen Team und Paket.

create function public.mod_team_pruefen() returns void
language plpgsql stable set search_path = '' as $$
begin
  if (select auth.uid()) is null or not public.ist_team() then
    perform public.mod_fehler('APR01', 'Dieser Bereich ist für dich nicht verfügbar.');
  end if;
  if not public.beitraege_frei() then
    perform public.mod_fehler('APP01', 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.');
  end if;
end $$;

revoke all on function public.mod_team_pruefen() from public, anon, authenticated;

-- Ein Fall = ein Ziel (allgemein, ohne Gruppe) mit offener Meldung oder offener Prüfanfrage.
create view public.mod_faelle with (security_invoker = true) as
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
 where coalesce(b.gruppe_id, ab.gruppe_id) is null
 group by z.art, z.ziel, b.versteckt, an.versteckt, b.titel, ab.titel, an.text, b.autor_id, an.autor_id;

revoke all on public.mod_faelle from public, anon, authenticated;

create function public.moderation_zaehler() returns int
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.mod_team_pruefen();
  return (select count(*) from public.mod_faelle);
end $$;

-- p_nach: {"stufe":1,"aeltester":"…","art":"beitrag","ziel":"…"} des letzten Falls.
create function public.moderation_faelle(p_filter text, p_nach jsonb, p_anzahl int)
returns setof jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.mod_team_pruefen();
  return query
  select to_jsonb(f) || jsonb_build_object('autor', p.anzeigename)
    from public.mod_faelle f left join public.profil p on p.id = f.autor_id
   where (coalesce(p_filter, 'alle') = 'alle'
          or (p_filter = 'meldungen' and f.meldungen > 0)
          or (p_filter = 'pruefanfragen' and f.pruefanfrage))
     and (p_nach is null or (f.stufe, f.aeltester, f.art, f.ziel) >
          ((p_nach->>'stufe')::smallint, (p_nach->>'aeltester')::timestamptz, p_nach->>'art', (p_nach->>'ziel')::uuid))
   order by f.stufe, f.aeltester, f.art, f.ziel
   limit least(greatest(coalesce(p_anzahl, 25), 1), 50);
end $$;

create function public.moderation_vorlagen() returns setof jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.mod_team_pruefen();
  return query select to_jsonb(v) from public.begruendung_vorlage v where v.aktiv order by v.gruppe, v.reihenfolge;
end $$;

revoke all on function public.moderation_zaehler(), public.moderation_faelle(text, jsonb, int),
  public.moderation_vorlagen() from public, anon;

grant execute on function public.moderation_zaehler(), public.moderation_faelle(text, jsonb, int),
  public.moderation_vorlagen() to authenticated;
