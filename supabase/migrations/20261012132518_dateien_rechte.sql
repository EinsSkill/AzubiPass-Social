-- AzubiPass Social · Dateizugriff nur mit aktueller Rechteprüfung (Entscheidung 12.10.)
-- Lesen auch im eigenen Ordner nur mit freigeschaltetem Profil. Fremde Dateien
-- weiterhin nur, wenn der zugehörige Beitrag für die fragende Person sichtbar
-- ist – die Regeln von public.beitrag gelten in der Unterabfrage mit
-- (ausgeblendet, gelöscht, fremde Gruppe ⇒ kein Abruf).
-- Die App ruft Dateien nur noch angemeldet ab (download), keine signierten Links.

alter policy "lernzettel: sehen, wenn der Beitrag sichtbar ist" on storage.objects
  using (bucket_id = 'lernzettel'
         and (select public.ist_freigeschaltet())
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.beitrag b where b.datei_pfad = objects.name)));
