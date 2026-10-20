-- AzubiPass Social · Test der Korrekturen G03 und G05 (14.10.2026)
-- Wie regeln_test.sql: endet absichtlich mit einem Fehler „ERGEBNIS: …", damit
-- alles zurückgerollt wird. Ein „FEHLER:" im Ergebnis bedeutet eine Lücke.
-- Erwartet: verworfen=verworfen spaeterOriginal=abgebrochen angelegt=1 klaeren=angelegt
--   wiederholt=1 artFalsch=vergeben abgelehnt=ohneZeile danachKlaeren=verworfen
--   altInhalt=angelegt dateiVorher=false dateiGeschuetzt=true regel=1 fremdeDatei=false
--   fremdKlaeren=vergeben antwortAngelegt=angelegt antwortVerworfen=abgebrochen
--   fremdBeste=verboten besteZweimal=1 geloest=true wechsel=v8 entfernt=0
--   geloestDanach=false altUmschalten=verboten
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid();
  v1 uuid := gen_random_uuid(); v2 uuid := gen_random_uuid(); v3 uuid := gen_random_uuid();
  v4 uuid := gen_random_uuid(); v5 uuid := gen_random_uuid(); v6 uuid := gen_random_uuid();
  v7 uuid := gen_random_uuid(); v8 uuid := gen_random_uuid();
  pfad text; x text; n int; r text := '';
begin
  insert into public.zugangscode (code, bezeichnung) values ('TEST-KORR-99', 'Test');
  insert into auth.users (id, email, aud, role) values
    (a, 'ka@test.invalid', 'authenticated', 'authenticated'),
    (b, 'kb@test.invalid', 'authenticated', 'authenticated');
  insert into public.beitraege_tester (nutzer_id) values (a), (b);
  pfad := a::text || '/' || v3::text || '.png';
  insert into storage.objects (bucket_id, name, owner) values ('lernzettel', pfad, a);
  execute 'set local role authenticated';

  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  perform public.profil_anlegen('Anna', 2::smallint, 'TESTKORR99', true, true);

  -- G03: verworfen sperrt ein später eintreffendes Original
  r := r || 'verworfen=' || public.vorgang_klaeren(v1, 'beitrag');
  begin perform public.beitrag_veroeffentlichen(v1, 'frage', 'Spät angekommen', 'x', null, null, false, null, null);
    r := r || ' FEHLER:spaeterOriginal-angelegt';
  exception when others then r := r || case when sqlerrm like '%abgebrochen%' then ' spaeterOriginal=abgebrochen' else ' FEHLER:' || sqlerrm end; end;

  -- angelegt, Klärung danach, unveränderte Wiederholung
  perform public.beitrag_veroeffentlichen(v2, 'frage', 'Echte Frage', 'Text', null, null, false, null, null);
  select count(*) into n from public.beitrag where id = v2; r := r || ' angelegt=' || n;
  r := r || ' klaeren=' || public.vorgang_klaeren(v2, 'beitrag');
  perform public.beitrag_veroeffentlichen(v2, 'frage', 'Echte Frage', 'Text', null, null, false, null, null);
  select count(*) into n from public.beitrag where id = v2; r := r || ' wiederholt=' || n;
  begin perform public.vorgang_klaeren(v2, 'antwort'); r := r || ' FEHLER:artFalsch';
  exception when others then r := r || ' artFalsch=vergeben'; end;

  -- sicher abgelehnt (Prüfregel): keine Vorgangszeile, Klärung danach verworfen
  begin perform public.beitrag_veroeffentlichen(v4, 'frage', 'x', 'Text', null, null, false, null, null);
    r := r || ' FEHLER:kurzerTitel';
  exception when others then null; end;
  execute 'reset role';
  select count(*) into n from public.vorgang where id = v4;
  r := r || case when n = 0 then ' abgelehnt=ohneZeile' else ' FEHLER:abgelehnt-mitZeile' end;
  execute 'set local role authenticated';
  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  r := r || ' danachKlaeren=' || public.vorgang_klaeren(v4, 'beitrag');

  -- Inhalt aus der Zeit vor der Vorgangstabelle (direkter Weg)
  execute 'reset role';
  insert into public.beitrag (id, autor_id, art, titel, text) values (v5, a, 'tipp', 'Alter Tipp', 'y');
  execute 'set local role authenticated';
  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  r := r || ' altInhalt=' || public.vorgang_klaeren(v5, 'beitrag');

  -- Datei mit Beitrag ist gegen Löschen geschützt, danach wieder frei
  -- Löschregel: ohne echtes Entfernen geprüft (das Supabase-MCP verlangt dafür eine
  -- Bestätigung). Die Regel enthält „not datei_in_gebrauch(name)“; geprüft wird
  -- die Funktion vor und nach dem Veröffentlichen sowie für einen fremden Ordner.
  r := r || ' dateiVorher=' || public.datei_in_gebrauch(pfad)::text;
  perform public.beitrag_veroeffentlichen(v3, 'lernzettel', 'Zettel', '', null, null, false, pfad, 'bild');
  r := r || ' dateiGeschuetzt=' || public.datei_in_gebrauch(pfad)::text;
  select count(*) into n from pg_policies where schemaname = 'storage' and tablename = 'objects'
    and policyname = 'lernzettel: eigene löschen' and qual like '%datei_in_gebrauch%';
  r := r || ' regel=' || n;

  -- Ben: fremde Kennung klären, Antworten mit Endstatus
  perform set_config('request.jwt.claims', json_build_object('sub', b, 'role','authenticated')::text, true);
  perform public.profil_anlegen('Ben', 1::smallint, 'TESTKORR99', true, true);
  r := r || ' fremdeDatei=' || public.datei_in_gebrauch(pfad)::text;
  begin perform public.vorgang_klaeren(v2, 'beitrag'); r := r || ' FEHLER:fremdKlaeren';
  exception when others then r := r || ' fremdKlaeren=vergeben'; end;
  perform public.antwort_senden(v6, v2, 'Antwort eins');
  r := r || ' antwortAngelegt=' || public.vorgang_klaeren(v6, 'antwort');
  perform public.vorgang_klaeren(v7, 'antwort');
  begin perform public.antwort_senden(v7, v2, 'Zu spät'); r := r || ' FEHLER:antwortVerworfen';
  exception when others then r := r || case when sqlerrm like '%abgebrochen%' then ' antwortVerworfen=abgebrochen' else ' FEHLER:' || sqlerrm end; end;
  perform public.antwort_senden(v8, v2, 'Antwort zwei');
  begin perform public.beste_antwort_setzen(v6, true); r := r || ' FEHLER:fremdBeste';
  exception when others then r := r || ' fremdBeste=verboten'; end;

  -- G05: gewünschten Zustand setzen, Wiederholung ohne Gegenwirkung
  perform set_config('request.jwt.claims', json_build_object('sub', a, 'role','authenticated')::text, true);
  perform public.beste_antwort_setzen(v6, true);
  perform public.beste_antwort_setzen(v6, true);
  select count(*) into n from public.antwort where beitrag_id = v2 and beste; r := r || ' besteZweimal=' || n;
  select geloest::text into x from public.beitrag where id = v2; r := r || ' geloest=' || x;
  perform public.beste_antwort_setzen(v8, true);
  select case when id = v8 then 'v8' else 'andere' end into x from public.antwort where beitrag_id = v2 and beste;
  r := r || ' wechsel=' || coalesce(x, 'keine');
  perform public.beste_antwort_setzen(v8, false);
  perform public.beste_antwort_setzen(v8, false);
  select count(*) into n from public.antwort where beitrag_id = v2 and beste; r := r || ' entfernt=' || n;
  select geloest::text into x from public.beitrag where id = v2; r := r || ' geloestDanach=' || x;
  begin execute format('select public.beste_antwort(%L)', v6); r := r || ' FEHLER:altUmschalten';
  exception when others then r := r || ' altUmschalten=verboten'; end;

  raise exception 'ERGEBNIS: %', r;
end $t$;
