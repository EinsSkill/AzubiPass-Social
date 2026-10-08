-- AzubiPass Social · regeln_gruppen

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
  -- Die Leitung selbst geht über gruppe_verlassen(), damit die Gruppe
  -- nicht ohne Leitung zurückbleibt.
  using ((nutzer_id = (select auth.uid()) and rolle = 'mitglied')
         or (public.ist_leitung(gruppe_id) and nutzer_id <> (select auth.uid()))
         or (select public.ist_team()));
