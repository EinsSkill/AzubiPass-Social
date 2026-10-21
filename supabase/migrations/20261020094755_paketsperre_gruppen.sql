-- AzubiPass Social · Paketsperre auch für Lerngruppen und Wochenaufgaben (Review c9e15a7, F02).
-- Dieselbe Grenze wie bei Beiträgen: lesen und anlegen nur mit beitraege_frei()
-- (Paket offen oder interner Tester). Bewusst ohne Sperre bleiben die Aufräumwege:
-- austreten (gruppe_verlassen, eigene Mitgliedschaft löschen), Gruppe/Aufgabe löschen,
-- eigenes Erledigt zurücknehmen. Views (gruppe_liste, aufgabe_liste) sind security_invoker
-- und erben die Regeln. Nur alter policy / create or replace, kein DROP.

alter policy "gruppe: offene und eigene sehen" on public.gruppe
  using ((select public.ist_freigeschaltet()) and (select public.beitraege_frei())
         and (offen or public.ist_mitglied(id) or (select public.ist_team())));
alter policy "gruppe: Leitung ändert" on public.gruppe
  using (public.ist_leitung(id) and (select public.beitraege_frei()))
  with check (public.ist_leitung(id) and (select public.beitraege_frei()));

alter policy "gruppe_code: nur Mitglieder" on public.gruppe_code
  using (public.ist_mitglied(gruppe_id) and (select public.beitraege_frei()));

alter policy "mitglied: Mitglieder und offene Gruppen sehen" on public.mitglied
  using ((select public.ist_freigeschaltet()) and (select public.beitraege_frei())
         and (public.ist_mitglied(gruppe_id)
              or exists (select 1 from public.gruppe g where g.id = gruppe_id and g.offen)
              or (select public.ist_team())));
alter policy "mitglied: offener Gruppe selbst beitreten" on public.mitglied
  with check ((select public.ist_freigeschaltet()) and (select public.beitraege_frei())
              and nutzer_id = (select auth.uid()) and rolle = 'mitglied'
              and exists (select 1 from public.gruppe g where g.id = gruppe_id and g.offen));
alter policy "mitglied: Leitung vergibt Rollen" on public.mitglied
  using (public.ist_leitung(gruppe_id) and (select public.beitraege_frei()))
  with check (public.ist_leitung(gruppe_id) and (select public.beitraege_frei()));

alter policy "wochenaufgabe: für alle oder die Gruppe" on public.wochenaufgabe
  using ((select public.ist_freigeschaltet()) and (select public.beitraege_frei())
         and (gruppe_id is null or public.ist_mitglied(gruppe_id) or (select public.ist_team())));
alter policy "wochenaufgabe: Leitung oder Team stellt" on public.wochenaufgabe
  with check (erstellt_von = (select auth.uid()) and (select public.beitraege_frei())
              and ((gruppe_id is null and (select public.ist_team()))
                   or (gruppe_id is not null and public.ist_leitung(gruppe_id))));
alter policy "wochenaufgabe: Leitung oder Team ändert" on public.wochenaufgabe
  using ((select public.beitraege_frei())
         and ((gruppe_id is null and (select public.ist_team()))
              or (gruppe_id is not null and public.ist_leitung(gruppe_id))))
  with check ((select public.beitraege_frei())
              and ((gruppe_id is null and (select public.ist_team()))
                   or (gruppe_id is not null and public.ist_leitung(gruppe_id))));

-- erledigt lesen hängt über „Aufgabe sichtbar“ schon an der Sperre; anlegen ausdrücklich.
alter policy "erledigt: selbst abhaken, solange sie läuft" on public.erledigt
  with check (nutzer_id = (select auth.uid()) and (select public.beitraege_frei())
              and exists (select 1 from public.wochenaufgabe a
                          where a.id = aufgabe_id
                            and current_date between a.beginn and a.ende));
