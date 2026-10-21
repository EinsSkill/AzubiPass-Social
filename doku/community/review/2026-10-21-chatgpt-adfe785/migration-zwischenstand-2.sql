-- Nach anhang_2/3/4 ausführen. Zeigt bleibende Lücke und Gegenprobe eines neuen Alt-RPC-Aufrufs.
\set ON_ERROR_STOP on
select 'Nach Schritt 4: Beitrag='||(select count(*) from public.beitrag where id='20000000-0000-4000-a000-000000000001')||', Anhang='||(select count(*) from public.anhang where beitrag_id='20000000-0000-4000-a000-000000000001');
set role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000002","role":"authenticated"}',false);
select 'Andere Testerin: Beitrag='||(select count(*) from public.beitrag_liste where id='20000000-0000-4000-a000-000000000001')||', Datei='||(select count(*) from storage.objects where name='10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000001.png');
reset role;
insert into storage.objects(bucket_id,name,owner,metadata) values
 ('lernzettel','10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000002.png','10000000-0000-4000-a000-000000000001','{"size":1000,"mimetype":"image/png"}');
set role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000001","role":"authenticated"}',false);
select public.beitrag_veroeffentlichen('20000000-0000-4000-a000-000000000002','lernzettel','Nach vier Schritten','',null,null,false,
 '10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000002.png','bild');
reset role;
select 'Gegenprobe nach Schritt 4: Anhang='||(select count(*) from public.anhang where beitrag_id='20000000-0000-4000-a000-000000000002');
set role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000002","role":"authenticated"}',false);
select 'Gegenprobe andere Testerin: Datei='||(select count(*) from storage.objects where name='10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000002.png');
reset role;
