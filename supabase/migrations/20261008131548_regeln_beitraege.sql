-- AzubiPass Social · regeln_beitraege

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
