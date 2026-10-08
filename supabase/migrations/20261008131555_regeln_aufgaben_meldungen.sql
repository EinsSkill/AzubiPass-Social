-- AzubiPass Social · regeln_aufgaben_meldungen

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
