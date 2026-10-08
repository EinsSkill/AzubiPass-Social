-- AzubiPass Social · Test der Zugriffsregeln
-- Im Supabase-SQL-Editor ausführen. Der Block endet absichtlich mit einem
-- Fehler: Die Meldung „ERGEBNIS: …" zeigt das Ergebnis, und weil es ein Fehler
-- ist, wird alles zurückgerollt. Es bleibt also nichts in der Datenbank.
-- Jede Prüfung muss „verboten", „abgelehnt", „geschuetzt" oder die
-- erwartete Zahl zeigen; ein „FEHLER:" bedeutet eine Lücke.
-- Erwartet: ohneProfil:profile=0 falscherCode=abgelehnt code=8 rolleSetzen=verboten
--   verstecktSetzen=verboten B_sieht=1 B_codes=0 zugangSpalte=geschuetzt
--   B_nachBeitritt=2 besteDurchFremde=verboten geloest=true
--   moderierenOhneTeam=verboten C_sieht=0 anon=verboten B_rolle=leitung
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); c uuid := gen_random_uuid();
  g uuid; code text; post uuid; ant uuid; n int; r text := '';
begin
  insert into public.zugangscode (code, bezeichnung) values ('TEST-CODE-99', 'Test');
  insert into auth.users (id, email, aud, role) values
    (a, 'a@test.invalid', 'authenticated', 'authenticated'),
    (b, 'b@test.invalid', 'authenticated', 'authenticated'),
    (c, 'c@test.invalid', 'authenticated', 'authenticated');
  execute 'set local role authenticated';

  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  select count(*) into n from public.profil; r := r || 'ohneProfil:profile=' || n;
  begin perform public.profil_anlegen('Anna', 2::smallint, 'falsch', true, true); r := r || ' FEHLER:falscherCode-ok';
  exception when others then r := r || ' falscherCode=abgelehnt'; end;
  perform public.profil_anlegen('Anna', 2::smallint, 'test code 99', true, true);
  g := public.gruppe_gruenden('Lerngruppe LF2', 'Test', false);
  select gc.code into code from public.gruppe_code gc where gruppe_id = g;
  r := r || ' code=' || coalesce(length(code)::text,'null');
  insert into public.beitrag (gruppe_id, art, titel, text) values (g, 'frage', 'Geheime Gruppenfrage', 'x') returning id into post;
  insert into public.beitrag (art, titel, text, lernfeld, kapitel) values ('tipp', 'Öffentlicher Tipp', 'y', 'lf2', 'k1');
  begin update public.profil set rolle = 'team' where id = a; r := r || ' FEHLER:rolle-geaendert';
  exception when others then r := r || ' rolleSetzen=verboten'; end;
  begin insert into public.beitrag (art, titel, versteckt) values ('tipp','Versteckt-Hack', true); r := r || ' FEHLER:versteckt';
  exception when others then r := r || ' verstecktSetzen=verboten'; end;

  perform set_config('request.jwt.claims', json_build_object('sub', b, 'role','authenticated')::text, true);
  perform public.profil_anlegen('Ben', 1::smallint, 'TESTCODE99', true, true);
  select count(*) into n from public.beitrag_liste; r := r || ' B_sieht=' || n;
  select count(*) into n from public.gruppe_code; r := r || ' B_codes=' || n;
  begin select zugang into code from public.profil limit 1; r := r || ' FEHLER:zugang-lesbar';
  exception when others then r := r || ' zugangSpalte=geschuetzt'; end;
  execute 'reset role';
  select gc.code into code from public.gruppe_code gc where gruppe_id = g;
  execute 'set local role authenticated';
  perform set_config('request.jwt.claims', json_build_object('sub', b, 'role','authenticated')::text, true);
  perform public.gruppe_beitreten(lower(code));
  select count(*) into n from public.beitrag_liste; r := r || ' B_nachBeitritt=' || n;
  insert into public.antwort (beitrag_id, text) values (post, 'Antwort von Ben') returning id into ant;
  begin perform public.beste_antwort(ant); r := r || ' FEHLER:B-beste';
  exception when others then r := r || ' besteDurchFremde=verboten'; end;
  insert into public.hilfreich (beitrag_id) values (post);

  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  perform public.beste_antwort(ant);
  select geloest::text into code from public.beitrag where id = post; r := r || ' geloest=' || code;
  begin perform public.moderieren('beitrag', post, true); r := r || ' FEHLER:moderiert';
  exception when others then r := r || ' moderierenOhneTeam=verboten'; end;

  perform set_config('request.jwt.claims', json_build_object('sub', c, 'role','authenticated')::text, true);
  select count(*) into n from public.beitrag; r := r || ' C_sieht=' || n;

  execute 'set local role anon';
  begin select count(*) into n from public.beitrag; r := r || ' FEHLER:anon=' || n;
  exception when others then r := r || ' anon=verboten'; end;

  execute 'set local role authenticated';
  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  perform public.gruppe_verlassen(g);
  execute 'reset role';
  select rolle into code from public.mitglied where gruppe_id = g and nutzer_id = b; r := r || ' B_rolle=' || coalesce(code,'-');

  raise exception 'ERGEBNIS: %', r;
end $t$;
