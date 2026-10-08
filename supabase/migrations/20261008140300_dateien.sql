-- AzubiPass Social · Live-Aktualisierung und Dateispeicher

-- ============================================================== Live-Aktualisierung

alter publication supabase_realtime add table public.beitrag, public.antwort;

-- ============================================================== Dateien

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lernzettel', 'lernzettel', false, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;

create policy "lernzettel: eigene hochladen" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'lernzettel'
              and (storage.foldername(name))[1] = (select auth.uid())::text
              and (select public.ist_freigeschaltet()));

create policy "lernzettel: sehen, wenn der Beitrag sichtbar ist" on storage.objects
  for select to authenticated
  using (bucket_id = 'lernzettel'
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.beitrag b where b.datei_pfad = objects.name)));

create policy "lernzettel: eigene löschen" on storage.objects
  for delete to authenticated
  using (bucket_id = 'lernzettel'
         and (storage.foldername(name))[1] = (select auth.uid())::text);
