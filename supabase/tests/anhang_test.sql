-- AzubiPass Social · Bilder im Feed (Spec 07): Anhänge, Grenzen, Wiederholung, Rechte, G06 (Einzelverbindung).
-- Endet mit „ERGEBNIS: …“ (Rollback). Jedes „FEHLER:“ ist eine Lücke.
-- a, b: Tester mit Profil; n: Profil ohne Testerfreigabe (Paket zu); t: Team.
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); n uuid := gen_random_uuid(); t uuid := gen_random_uuid();
  v1 uuid := gen_random_uuid(); v2 uuid := gen_random_uuid(); v3 uuid := gen_random_uuid(); v4 uuid := gen_random_uuid();
  v5 uuid := gen_random_uuid(); v6 uuid := gen_random_uuid(); v7 uuid := gen_random_uuid(); v8 uuid := gen_random_uuid();
  j jsonb; r text := ''; c int; s text; i int;
begin
  execute $f$create function pg_temp.als(u uuid) returns void language plpgsql as $g$
    begin perform set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
          execute 'set local role authenticated'; end $g$$f$;
  execute $f$create function pg_temp.root() returns void language plpgsql as $g$
    begin execute 'reset role'; end $g$$f$;
  execute $f$create function pg_temp.obj(u uuid, v uuid, k int, endung text, mime text, groesse bigint) returns text language plpgsql as $g$
    declare p text := u::text || '/' || v::text || '-' || k || '.' || endung;
    begin insert into storage.objects (bucket_id, name, owner, metadata)
          values ('lernzettel', p, u, jsonb_build_object('size', groesse, 'mimetype', mime)); return p; end $g$$f$;
  execute $f$create function pg_temp.liste(variadic p text[]) returns jsonb language sql as $g$
    select coalesce(jsonb_agg(jsonb_build_object('pfad', x, 'beschreibung', '') order by o), '[]') from unnest(p) with ordinality as u(x, o) $g$$f$;

  update public.freigabe set offen = false where schalter = 'beitraege';
  insert into public.zugangscode (code, bezeichnung) values ('TEST-ANH-1', 'Test');
  insert into auth.users (id, email, aud, role)
  select u, 'anh-' || u || '@test.invalid', 'authenticated', 'authenticated' from unnest(array[a, b, n, t]) u;
  insert into public.beitraege_tester (nutzer_id) values (a), (b), (t);
  perform pg_temp.als(a); perform public.profil_anlegen('AnhAnna', 2::smallint, 'TESTANH1', true, true);
  perform pg_temp.als(b); perform public.profil_anlegen('AnhBen', 2::smallint, 'TESTANH1', true, true);
  perform pg_temp.als(n); perform public.profil_anlegen('AnhNeu', 2::smallint, 'TESTANH1', true, true);
  perform pg_temp.als(t); perform public.profil_anlegen('AnhTeam', 2::smallint, 'TESTANH1', true, true);
  perform pg_temp.root(); update public.profil set rolle = 'team' where id = t;

  -- Frage ohne Bild, mit 5 Bildern (Reihenfolge, Spiegel, Liste)
  perform pg_temp.als(a);
  perform public.beitrag_mit_anhaengen(v1, 'frage', 'Ohne Bild', 'Text', null, null, false, null);
  select count(*) into c from public.anhang where beitrag_id = v1; r := r || 'ohneBild=' || c;
  perform pg_temp.root();
  perform pg_temp.obj(a, v2, k, 'png', 'image/png', case when k = 3 then 5242880 else 1000 end) from generate_series(1, 5) k;
  perform pg_temp.als(a);
  j := jsonb_build_array(
    jsonb_build_object('pfad', a || '/' || v2 || '-3.png', 'beschreibung', 'Drittes zuerst'),
    jsonb_build_object('pfad', a || '/' || v2 || '-1.png'), jsonb_build_object('pfad', a || '/' || v2 || '-2.png'),
    jsonb_build_object('pfad', a || '/' || v2 || '-4.png'), jsonb_build_object('pfad', a || '/' || v2 || '-5.png'));
  perform public.beitrag_mit_anhaengen(v2, 'tipp', 'Fünf Bilder', 'Text', null, null, false, j);
  select string_agg(substring(pfad from '-([1-5])\.png$'), ',' order by position) into s from public.anhang where beitrag_id = v2;
  r := r || ' reihenfolge=' || s;
  select (datei_pfad = a || '/' || v2 || '-3.png')::text || '/' || datei_art into s from public.beitrag where id = v2; r := r || ' spiegel=' || s;
  select jsonb_array_length(anhaenge)::text || '/' || (anhaenge->0->>'beschreibung') into s from public.beitrag_liste where id = v2;
  r := r || ' liste=' || s;
  -- Wiederholung mit anderer Liste: derselbe Beitrag, Anhänge unverändert
  r := r || ' wiederholt=' || (public.beitrag_mit_anhaengen(v2, 'tipp', 'x', 'y', null, null, false, '[]') = v2)::text;
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' anhaengeDanach=' || c;

  -- Grenzen
  perform pg_temp.root();
  perform pg_temp.obj(a, v3, k, 'png', 'image/png', 1000) from generate_series(1, 5) k;
  perform pg_temp.obj(a, v4, 1, 'png', 'image/png', 5242881);
  perform pg_temp.obj(a, v5, 1, 'png', 'image/gif', 100);
  perform pg_temp.obj(a, v6, 1, 'pdf', 'application/pdf', 3000);
  perform pg_temp.obj(a, v6, 2, 'png', 'image/png', 3000);
  perform pg_temp.als(a);
  begin perform public.beitrag_mit_anhaengen(v3, 'frage', 'Sechs', 'T', null, null, false,
          pg_temp.liste(a||'/'||v3||'-1.png', a||'/'||v3||'-2.png', a||'/'||v3||'-3.png', a||'/'||v3||'-4.png', a||'/'||v3||'-5.png', a||'/'||v3||'-5.png'));
    r := r || ' FEHLER:sechs'; exception when others then r := r || ' sechs=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v4, 'frage', 'Zu groß', 'T', null, null, false, pg_temp.liste(a||'/'||v4||'-1.png'));
    r := r || ' FEHLER:plusEinByte'; exception when others then r := r || ' plusEinByte=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v5, 'frage', 'GIF', 'T', null, null, false, pg_temp.liste(a||'/'||v5||'-1.png'));
    r := r || ' FEHLER:format'; exception when others then r := r || ' format=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v6, 'frage', 'PDF an Frage', 'T', null, null, false, pg_temp.liste(a||'/'||v6||'-1.pdf'));
    r := r || ' FEHLER:pdfFrage'; exception when others then r := r || ' pdfFrage=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v6, 'lernzettel', 'PDF und Bild', '', null, null, false,
          pg_temp.liste(a||'/'||v6||'-1.pdf', a||'/'||v6||'-2.png'));
    r := r || ' FEHLER:pdfUndBild'; exception when others then r := r || ' pdfUndBild=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v7, 'lernzettel', 'Ohne Anhang', '', null, null, false, '[]');
    r := r || ' FEHLER:lzOhne'; exception when others then r := r || ' lzOhne=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v7, 'frage', 'Fremder Pfad', 'T', null, null, false, pg_temp.liste(b||'/'||v7||'-1.png'));
    r := r || ' FEHLER:fremd'; exception when others then r := r || ' fremd=' || sqlstate; end;
  begin perform public.beitrag_mit_anhaengen(v7, 'frage', 'Anderer Vorgang', 'T', null, null, false, pg_temp.liste(a||'/'||v3||'-1.png'));
    r := r || ' FEHLER:andererVorgang'; exception when others then r := r || ' andererVorgang=' || sqlstate; end;
  -- Teilupload: Bild 3 fehlt → kein Beitrag, keine Anhänge, Vorgang nicht verbraucht
  begin perform public.beitrag_mit_anhaengen(v3, 'frage', 'Teil', 'T', null, null, false,
          pg_temp.liste(a||'/'||v3||'-1.png', a||'/'||v3||'-2.png', a||'/'||v3||'-9.png'));
    r := r || ' FEHLER:teil'; exception when others then r := r || ' teil=' || sqlstate; end;
  perform pg_temp.root();
  select count(*) into c from public.beitrag where id = v3; r := r || ' teilBeitrag=' || c;
  select count(*) into c from public.vorgang where id = v3; r := r || ' teilVorgang=' || c;
  perform pg_temp.als(a);
  perform public.beitrag_mit_anhaengen(v3, 'lernzettel', 'Lernzettel 5 Bilder', '', null, null, false,
          pg_temp.liste(a||'/'||v3||'-1.png', a||'/'||v3||'-2.png', a||'/'||v3||'-3.png', a||'/'||v3||'-4.png', a||'/'||v3||'-5.png'));
  select count(*) into c from public.anhang where beitrag_id = v3; r := r || ' lzBilder=' || c;
  perform public.beitrag_mit_anhaengen(v6, 'lernzettel', 'Lernzettel PDF', '', null, null, false, pg_temp.liste(a||'/'||v6||'-1.pdf'));
  select art into s from public.anhang where beitrag_id = v6; r := r || ' lzPdf=' || s;
  -- Alter Ein-Datei-Weg legt Anhang 1 an
  perform pg_temp.root();
  insert into storage.objects (bucket_id, name, owner, metadata)
  values ('lernzettel', a || '/' || v8 || '.png', a, '{"size": 700, "mimetype": "image/png"}');
  perform pg_temp.als(a);
  perform public.beitrag_veroeffentlichen(v8, 'lernzettel', 'Alter Client', '', null, null, false, a || '/' || v8 || '.png', 'bild');
  select count(*)::text || '/' || max(groesse) into s from public.anhang where beitrag_id = v8; r := r || ' alterWeg=' || s;

  -- G06 (einzeln): Bild 4 in Gebrauch, unbenutzte Datei löschbar
  r := r || ' inGebrauch=' || public.datei_in_gebrauch(a || '/' || v2 || '-4.png')::text;
  delete from storage.objects where name = a || '/' || v2 || '-4.png'; get diagnostics c = row_count; r := r || ' loeschtBenutzte=' || c;
  delete from storage.objects where name = a || '/' || v4 || '-1.png'; get diagnostics c = row_count; r := r || ' loeschtUnbenutzte=' || c;
  begin insert into public.anhang (beitrag_id, position, pfad, art, groesse) values (v1, 1, a || '/x.png', 'bild', 1);
    r := r || ' FEHLER:direkt'; exception when others then r := r || ' direkt=' || sqlstate; end;

  -- Lesen: andere Testerin, Paket zu ohne Tester, ausgeblendet
  perform pg_temp.als(b);
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' bSieht=' || c;
  select count(*) into c from storage.objects where name = a || '/' || v2 || '-5.png'; r := r || ' bDatei5=' || c;
  perform pg_temp.als(n);
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' paketZu=' || c;
  select count(*) into c from storage.objects where name = a || '/' || v2 || '-5.png'; r := r || ' paketZuDatei=' || c;
  perform pg_temp.root(); update public.beitrag set versteckt = true where id = v2;
  perform pg_temp.als(b);
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' verstecktFremd=' || c;
  select count(*) into c from storage.objects where name = a || '/' || v2 || '-2.png'; r := r || ' verstecktDatei=' || c;
  perform pg_temp.als(a);
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' verstecktAutor=' || c;
  perform pg_temp.als(t);
  select count(*) into c from public.anhang where beitrag_id = v2; r := r || ' verstecktTeam=' || c;
  select count(*) into c from storage.objects where name = a || '/' || v2 || '-2.png'; r := r || ' teamDatei=' || c;

  -- Beitrag löschen: Anhänge weg, Dateien danach löschbar
  perform pg_temp.als(a);
  delete from public.beitrag where id = v3;
  select count(*) into c from public.anhang where beitrag_id = v3; r := r || ' nachLoeschen=' || c;
  delete from storage.objects where name like a || '/' || v3 || '-%'; get diagnostics c = row_count; r := r || ' dateienFrei=' || c;

  -- Invariante: Spiegel = Anhang 1
  perform pg_temp.root();
  select count(*) into c from public.beitrag b left join public.anhang x on x.beitrag_id = b.id and x.position = 1
   where b.datei_pfad is distinct from x.pfad or b.datei_art is distinct from x.art;
  r := r || ' invariante=' || c;
  raise exception 'ERGEBNIS: %', r;
end $t$;
