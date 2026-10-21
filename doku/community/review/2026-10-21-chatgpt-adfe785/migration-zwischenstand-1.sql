-- Nur lokale Testdatenbank! Nach Migration anhang_1, vor anhang_2/3/4 ausführen.
\set ON_ERROR_STOP on
insert into public.zugangscode(code,bezeichnung) values ('TEST-BLD-DEPLOY','Migrationstest');
insert into auth.users(id,email,aud,role) values
 ('10000000-0000-4000-a000-000000000001','migration-a@test.invalid','authenticated','authenticated'),
 ('10000000-0000-4000-a000-000000000002','migration-b@test.invalid','authenticated','authenticated');
insert into public.beitraege_tester(nutzer_id) values ('10000000-0000-4000-a000-000000000001'),('10000000-0000-4000-a000-000000000002');
set role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000001","role":"authenticated"}',false);
select public.profil_anlegen('MigrationAnna',2::smallint,'TESTBLDDEPLOY',true,true);
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000002","role":"authenticated"}',false);
select public.profil_anlegen('MigrationBen',2::smallint,'TESTBLDDEPLOY',true,true);
reset role;
insert into storage.objects(bucket_id,name,owner,metadata) values
 ('lernzettel','10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000001.png','10000000-0000-4000-a000-000000000001','{"size":1000,"mimetype":"image/png"}');
set role authenticated;
select set_config('request.jwt.claims','{"sub":"10000000-0000-4000-a000-000000000001","role":"authenticated"}',false);
select public.beitrag_veroeffentlichen('20000000-0000-4000-a000-000000000001','lernzettel','Im Zwischenstand','',null,null,false,
 '10000000-0000-4000-a000-000000000001/20000000-0000-4000-a000-000000000001.png','bild');
reset role;
select 'Nach Schritt 1: Beitrag='||(select count(*) from public.beitrag where id='20000000-0000-4000-a000-000000000001')||', Anhang='||(select count(*) from public.anhang where beitrag_id='20000000-0000-4000-a000-000000000001');
