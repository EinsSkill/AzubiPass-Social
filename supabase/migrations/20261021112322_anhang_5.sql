-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 5: Nachzügler übernehmen, dann Leseregel.
-- 1. Was zwischen den Schritten über den alten Weg entstand und (wider Erwarten) keinen
--    Anhang hat, bekommt ihn jetzt.
-- 2. Speicher: fremde Dateien lesbar, wenn ein sichtbarer Beitrag sie als Anhang ODER im
--    Spiegel führt. Der Spiegel ist immer Anhang 1 – die Regel kann so durch die Umstellung
--    nichts verlieren, was vorher lesbar war.
insert into public.anhang (beitrag_id, position, pfad, art, groesse)
select b.id, 1, b.datei_pfad, b.datei_art,
       greatest(1, least(5242880, coalesce((o.metadata->>'size')::bigint, 1)))
  from public.beitrag b
  left join storage.objects o on o.bucket_id = 'lernzettel' and o.name = b.datei_pfad
 where b.datei_pfad is not null
   and not exists (select 1 from public.anhang x where x.beitrag_id = b.id)
on conflict do nothing;

alter policy "lernzettel: sehen, wenn der Beitrag sichtbar ist" on storage.objects
  using (bucket_id = 'lernzettel'
         and (select public.ist_freigeschaltet())
         and (select public.beitraege_frei())
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.anhang a where a.pfad = objects.name)
              or exists (select 1 from public.beitrag b where b.datei_pfad = objects.name)));
