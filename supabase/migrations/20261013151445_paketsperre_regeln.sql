-- Paketsperre: Beiträge lesen/anlegen und Lernzettel-Dateien nur mit beitraege_frei().
-- Antworten, Hilfreich und Meldungen hängen über „Beitrag sichtbar“ mit dran.
alter policy "beitrag: sichtbar für alle oder die Gruppe" on public.beitrag
  using ((select public.ist_freigeschaltet())
         and (select public.beitraege_frei())
         and (gruppe_id is null or public.ist_mitglied(gruppe_id) or (select public.ist_team()))
         and (not versteckt or autor_id = (select auth.uid()) or (select public.ist_team())));

alter policy "beitrag: selbst veröffentlichen" on public.beitrag
  with check ((select public.ist_freigeschaltet())
              and (select public.beitraege_frei())
              and autor_id = (select auth.uid())
              and not versteckt and not geloest
              and (gruppe_id is null or public.ist_mitglied(gruppe_id))
              and (datei_pfad is null
                   or split_part(datei_pfad, '/', 1) = (select auth.uid())::text));

alter policy "lernzettel: sehen, wenn der Beitrag sichtbar ist" on storage.objects
  using (bucket_id = 'lernzettel'
         and (select public.ist_freigeschaltet())
         and (select public.beitraege_frei())
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.beitrag b where b.datei_pfad = objects.name)));

alter policy "lernzettel: eigene hochladen" on storage.objects
  with check (bucket_id = 'lernzettel'
              and (storage.foldername(name))[1] = (select auth.uid())::text
              and (select public.ist_freigeschaltet())
              and (select public.beitraege_frei()));
