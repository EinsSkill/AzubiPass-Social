-- Spec 06 · Eigene ausgeblendete Inhalte und Prüfanfrage (06-technik-plan.md §4.4, E1, E6, P2).

create function public.mod_autor_pruefen() returns uuid
language plpgsql stable set search_path = '' as $$
declare ich uuid := (select auth.uid());
begin
  if ich is null or not public.ist_freigeschaltet() then
    perform public.mod_fehler('APR01', 'Dafür brauchst du ein Community-Profil.');
  end if;
  if not public.beitraege_frei() then
    perform public.mod_fehler('APP01', 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.');
  end if;
  return ich;
end $$;

revoke all on function public.mod_autor_pruefen() from public, anon, authenticated;

-- Was die betroffene Person zu einer Ausblendung sehen darf: keine Meldungen,
-- keine Melder, kein internes Protokoll. Zeit und Begründung erst nach der
-- ersten Teamentscheidung (vorläufige automatische Ausblendung ohne Person/Zeit).
create function public.mod_autorsicht(x public.ausblendung) returns jsonb
language sql stable set search_path = '' as $$
  select jsonb_build_object('id', x.id, 'aktiv', x.aufgehoben_am is null,
    'vorlaeufig', x.quelle = 'automatisch' and x.bestaetigt_am is null,
    'begruendung', case when x.bestaetigt_am is not null then x.begruendung_autor end,
    'zeit', x.bestaetigt_am,
    'anfrage_moeglich', x.aufgehoben_am is null and x.bestaetigt_am is not null
                        and not exists (select 1 from public.pruefanfrage q where q.ausblendung_id = x.id),
    'pruefanfrage', (select jsonb_build_object('id', q.id, 'status', q.status, 'ergebnis', q.ergebnis,
                       'ergebnis_begruendung', q.ergebnis_begruendung, 'erstellt_am', q.erstellt_am,
                       'abgeschlossen_am', q.abgeschlossen_am)
                       from public.pruefanfrage q where q.ausblendung_id = x.id));
$$;

revoke all on function public.mod_autorsicht(public.ausblendung) from public, anon, authenticated;

-- Liste: eigene aktive Ausblendungen, frühere mit Prüfanfrage, eigene sichtbare
-- Antworten unter fremden ausgeblendeten Beiträgen (E6, ohne fremde Inhalte).
create function public.eigene_ausblendungen() returns setof jsonb
language plpgsql stable security definer set search_path = '' as $$
declare ich uuid := public.mod_autor_pruefen();
begin
  return query
  select r from (
    select jsonb_build_object('art', case when x.beitrag_id is not null then 'beitrag' else 'antwort' end,
             'id', coalesce(x.beitrag_id, x.antwort_id),
             'titel', b.titel, 'antwort_auszug', left(an.text, 140),
             'zustand', case when x.aufgehoben_am is null then 'ausgeblendet' else 'aufgehoben' end,
             'ausblendung', public.mod_autorsicht(x)) as r,
           coalesce(x.bestaetigt_am, x.erstellt_am, b.erstellt_am, an.erstellt_am) as zeit
      from public.ausblendung x
      left join public.beitrag b on b.id = x.beitrag_id
      left join public.antwort an on an.id = x.antwort_id
     where x.autor_id = ich and coalesce(b.autor_id, an.autor_id) = ich
       and (x.aufgehoben_am is null or exists (select 1 from public.pruefanfrage q where q.ausblendung_id = x.id))
    union all
    select jsonb_build_object('art', 'antwort', 'id', an.id, 'titel', null, 'antwort_auszug', left(an.text, 140),
             'zustand', 'eltern_ausgeblendet', 'ausblendung', null), an.erstellt_am
      from public.antwort an join public.beitrag eb on eb.id = an.beitrag_id
     where an.autor_id = ich and not an.versteckt and eb.versteckt and eb.autor_id <> ich
  ) t order by t.zeit desc
  limit 200;
end $$;
