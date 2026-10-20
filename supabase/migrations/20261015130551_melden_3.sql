revoke all on function public.meldung_senden(text, uuid, text, text), public.meldung_status(text, uuid),
  public.meine_meldungen(timestamptz, uuid, int) from public, anon;

grant execute on function public.meldung_senden(text, uuid, text, text), public.meldung_status(text, uuid),
  public.meine_meldungen(timestamptz, uuid, int) to authenticated;

-- Melden nur noch über die Funktion; Abschluss nur über eine Entscheidung (B2, B3, B6).
-- Ohne Löschen: die alten Regeln lassen nichts mehr zu (Grants sind zusätzlich entzogen).
alter policy "meldung: selbst melden" on public.meldung with check (false);

alter policy "meldung: Team bearbeitet" on public.meldung using (false) with check (false);

revoke insert, update on public.meldung from authenticated;

alter policy "meldung: eigene sehen, Team alle" on public.meldung
  using ((select public.ist_freigeschaltet()) and (select public.beitraege_frei())
         and (melder_id = (select auth.uid()) or (select public.ist_team())));
