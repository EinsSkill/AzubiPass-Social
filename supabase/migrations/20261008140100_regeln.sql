-- AzubiPass Social · Sichten und Row Level Security

-- ============================================================== Sichten
-- security_invoker: Die Sicht rechnet mit den Rechten der fragenden Person,
-- die Regeln der Tabellen gelten also auch hier.

create view public.beitrag_liste with (security_invoker = true) as
select b.*,
       p.anzeigename as autor_name,
       p.rolle       as autor_rolle,
       p.lehrjahr    as autor_lehrjahr,
       g.name        as gruppe_name,
       (select count(*) from public.antwort a
         where a.beitrag_id = b.id and not a.versteckt)          as antworten,
       (select count(*) from public.hilfreich h
         where h.beitrag_id = b.id)                              as hilfreich_zahl,
       exists (select 1 from public.hilfreich h
                where h.beitrag_id = b.id
                  and h.nutzer_id = (select auth.uid()))         as von_mir_hilfreich
  from public.beitrag b
  join public.profil p on p.id = b.autor_id
  left join public.gruppe g on g.id = b.gruppe_id;

create view public.gruppe_liste with (security_invoker = true) as
select g.*,
       (select count(*) from public.mitglied m where m.gruppe_id = g.id) as mitglieder,
       (select m.rolle from public.mitglied m
         where m.gruppe_id = g.id and m.nutzer_id = (select auth.uid())) as meine_rolle
  from public.gruppe g;

create view public.aufgabe_liste with (security_invoker = true) as
select a.*,
       g.name as gruppe_name,
       (select count(*) from public.erledigt e where e.aufgabe_id = a.id) as erledigt_zahl,
       exists (select 1 from public.erledigt e
                where e.aufgabe_id = a.id
                  and e.nutzer_id = (select auth.uid()))                 as von_mir_erledigt
  from public.wochenaufgabe a
  left join public.gruppe g on g.id = a.gruppe_id;

-- ============================================================== Row Level Security

alter table public.zugangscode   enable row level security;
alter table public.profil        enable row level security;
alter table public.gruppe        enable row level security;
alter table public.gruppe_code   enable row level security;
alter table public.mitglied      enable row level security;
alter table public.beitrag       enable row level security;
alter table public.antwort       enable row level security;
alter table public.hilfreich     enable row level security;
alter table public.wochenaufgabe enable row level security;
alter table public.erledigt      enable row level security;
alter table public.meldung       enable row level security;

-- profil
create policy "profil: sehen, wer freigeschaltet ist" on public.profil
  for select to authenticated using ((select public.ist_freigeschaltet()));
create policy "profil: eigenes ändern" on public.profil
  for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- gruppe
create policy "gruppe: offene und eigene sehen" on public.gruppe
  for select to authenticated
  using ((select public.ist_freigeschaltet())
         and (offen or public.ist_mitglied(id) or (select public.ist_team())));
create policy "gruppe: Leitung ändert" on public.gruppe
  for update to authenticated
  using (public.ist_leitung(id)) with check (public.ist_leitung(id));
create policy "gruppe: Leitung oder Team löscht" on public.gruppe
  for delete to authenticated
  using (public.ist_leitung(id) or (select public.ist_team()));

-- gruppe_code
create policy "gruppe_code: nur Mitglieder" on public.gruppe_code
  for select to authenticated using (public.ist_mitglied(gruppe_id));

-- mitglied
create policy "mitglied: Mitglieder und offene Gruppen sehen" on public.mitglied
  for select to authenticated
  using ((select public.ist_freigeschaltet())
         and (public.ist_mitglied(gruppe_id)
              or exists (select 1 from public.gruppe g where g.id = gruppe_id and g.offen)
              or (select public.ist_team())));
create policy "mitglied: offener Gruppe selbst beitreten" on public.mitglied
  for insert to authenticated
  with check ((select public.ist_freigeschaltet())
              and nutzer_id = (select auth.uid()) and rolle = 'mitglied'
              and exists (select 1 from public.gruppe g where g.id = gruppe_id and g.offen));
create policy "mitglied: Leitung vergibt Rollen" on public.mitglied
  for update to authenticated
  using (public.ist_leitung(gruppe_id)) with check (public.ist_leitung(gruppe_id));
create policy "mitglied: austreten oder entfernen" on public.mitglied
  for delete to authenticated
  using (nutzer_id = (select auth.uid()) or public.ist_leitung(gruppe_id)
         or (select public.ist_team()));

-- beitrag
create policy "beitrag: sichtbar für alle oder die Gruppe" on public.beitrag
  for select to authenticated
  using ((select public.ist_freigeschaltet())
         and (gruppe_id is null or public.ist_mitglied(gruppe_id) or (select public.ist_team()))
         and (not versteckt or autor_id = (select auth.uid()) or (select public.ist_team())));
create policy "beitrag: selbst veröffentlichen" on public.beitrag
  for insert to authenticated
  with check ((select public.ist_freigeschaltet())
              and autor_id = (select auth.uid())
              and not versteckt and not geloest
              and (gruppe_id is null or public.ist_mitglied(gruppe_id))
              and (datei_pfad is null
                   or split_part(datei_pfad, '/', 1) = (select auth.uid())::text));
create policy "beitrag: eigenen ändern" on public.beitrag
  for update to authenticated
  using (autor_id = (select auth.uid())) with check (autor_id = (select auth.uid()));
create policy "beitrag: eigenen oder als Team löschen" on public.beitrag
  for delete to authenticated
  using (autor_id = (select auth.uid()) or (select public.ist_team()));

-- antwort
create policy "antwort: sichtbar, wenn der Beitrag sichtbar ist" on public.antwort
  for select to authenticated
  using (exists (select 1 from public.beitrag b where b.id = beitrag_id)
         and (not versteckt or autor_id = (select auth.uid()) or (select public.ist_team())));
create policy "antwort: selbst antworten" on public.antwort
  for insert to authenticated
  with check (autor_id = (select auth.uid()) and not versteckt and not beste
              and exists (select 1 from public.beitrag b
                          where b.id = beitrag_id and not b.versteckt));
create policy "antwort: eigene ändern" on public.antwort
  for update to authenticated
  using (autor_id = (select auth.uid())) with check (autor_id = (select auth.uid()));
create policy "antwort: eigene oder als Team löschen" on public.antwort
  for delete to authenticated
  using (autor_id = (select auth.uid()) or (select public.ist_team()));

-- hilfreich
create policy "hilfreich: sehen, wenn der Beitrag sichtbar ist" on public.hilfreich
  for select to authenticated
  using (exists (select 1 from public.beitrag b where b.id = beitrag_id));
create policy "hilfreich: selbst markieren" on public.hilfreich
  for insert to authenticated
  with check (nutzer_id = (select auth.uid())
              and exists (select 1 from public.beitrag b where b.id = beitrag_id));
create policy "hilfreich: selbst zurücknehmen" on public.hilfreich
  for delete to authenticated using (nutzer_id = (select auth.uid()));

-- wochenaufgabe
create policy "wochenaufgabe: für alle oder die Gruppe" on public.wochenaufgabe
  for select to authenticated
  using ((select public.ist_freigeschaltet())
         and (gruppe_id is null or public.ist_mitglied(gruppe_id) or (select public.ist_team())));
create policy "wochenaufgabe: Leitung oder Team stellt" on public.wochenaufgabe
  for insert to authenticated
  with check (erstellt_von = (select auth.uid())
              and ((gruppe_id is null and (select public.ist_team()))
                   or (gruppe_id is not null and public.ist_leitung(gruppe_id))));
create policy "wochenaufgabe: Leitung oder Team ändert" on public.wochenaufgabe
  for update to authenticated
  using ((gruppe_id is null and (select public.ist_team()))
         or (gruppe_id is not null and public.ist_leitung(gruppe_id)))
  with check ((gruppe_id is null and (select public.ist_team()))
              or (gruppe_id is not null and public.ist_leitung(gruppe_id)));
create policy "wochenaufgabe: Leitung oder Team löscht" on public.wochenaufgabe
  for delete to authenticated
  using ((select public.ist_team())
         or (gruppe_id is not null and public.ist_leitung(gruppe_id)));

-- erledigt
create policy "erledigt: sehen, wenn die Aufgabe sichtbar ist" on public.erledigt
  for select to authenticated
  using (exists (select 1 from public.wochenaufgabe a where a.id = aufgabe_id));
create policy "erledigt: selbst abhaken, solange sie läuft" on public.erledigt
  for insert to authenticated
  with check (nutzer_id = (select auth.uid())
              and exists (select 1 from public.wochenaufgabe a
                          where a.id = aufgabe_id
                            and current_date between a.beginn and a.ende));
create policy "erledigt: selbst zurücknehmen" on public.erledigt
  for delete to authenticated using (nutzer_id = (select auth.uid()));

-- meldung
create policy "meldung: eigene sehen, Team alle" on public.meldung
  for select to authenticated
  using (melder_id = (select auth.uid()) or (select public.ist_team()));
create policy "meldung: selbst melden" on public.meldung
  for insert to authenticated
  with check ((select public.ist_freigeschaltet())
              and melder_id = (select auth.uid()) and status = 'offen'
              and ((beitrag_id is not null
                    and exists (select 1 from public.beitrag b where b.id = beitrag_id))
                   or (antwort_id is not null
                       and exists (select 1 from public.antwort a where a.id = antwort_id))));
create policy "meldung: Team bearbeitet" on public.meldung
  for update to authenticated
  using ((select public.ist_team())) with check ((select public.ist_team()));
