-- AzubiPass Social · Paketsperre für Lerngruppen und Wochenaufgaben (Review c9e15a7, F02).
-- Endet mit „ERGEBNIS: …“ (Rollback). Jedes „FEHLER:“ ist eine Lücke.
-- t = interner Tester (Leitung), n = Profil ohne Testerfreigabe, k = Team ohne Testerfreigabe.
do $t$
declare
  t uuid := gen_random_uuid(); n uuid := gen_random_uuid(); k uuid := gen_random_uuid();
  g uuid; go uuid; w uuid; code text; r text := ''; c int;
begin
  execute $f$create function pg_temp.als(u uuid) returns void language plpgsql as $g$
    begin perform set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
          execute 'set local role authenticated'; end $g$$f$;
  execute $f$create function pg_temp.root() returns void language plpgsql as $g$
    begin execute 'reset role'; end $g$$f$;
  update public.freigabe set offen = false where schalter = 'beitraege';
  insert into public.zugangscode (code, bezeichnung) values ('TEST-SPR-1', 'Test');
  insert into auth.users (id, email, aud, role)
  select u, 'spr-' || u || '@test.invalid', 'authenticated', 'authenticated' from unnest(array[t, n, k]) u;
  insert into public.beitraege_tester (nutzer_id) values (t);
  perform pg_temp.als(t); perform public.profil_anlegen('SprTester', 2::smallint, 'TESTSPR1', true, true);
  perform pg_temp.als(n); perform public.profil_anlegen('SprNormal', 2::smallint, 'TESTSPR1', true, true);
  perform pg_temp.als(k); perform public.profil_anlegen('SprTeam', 2::smallint, 'TESTSPR1', true, true);
  perform pg_temp.root(); update public.profil set rolle = 'team' where id = k;

  -- Tester legt an (geschlossenes Paket)
  perform pg_temp.als(t);
  g := public.gruppe_gruenden('Geschlossen', '', false);
  go := public.gruppe_gruenden('Offen', '', true);
  select gc.code into code from public.gruppe_code gc where gc.gruppe_id = g;
  insert into public.wochenaufgabe (gruppe_id, titel) values (go, 'Aufgabe') returning id into w;
  insert into public.erledigt (aufgabe_id) values (w);
  select count(*) into c from public.aufgabe_liste where id = w; r := r || 'testerSieht=' || c;
  perform pg_temp.root(); insert into public.mitglied (gruppe_id, nutzer_id) values (go, n);   -- Altbestand

  -- Normales Profil, Paket zu
  perform pg_temp.als(n);
  r := r || ' frei=' || public.beitraege_frei()::text;
  begin perform public.gruppe_gruenden('Trotz Sperre', '', false); r := r || ' FEHLER:gruenden';
  exception when others then r := r || ' gruenden=' || sqlstate; end;
  begin perform public.gruppe_beitreten(code); r := r || ' FEHLER:beitreten';
  exception when others then r := r || ' beitreten=' || sqlstate; end;
  select count(*) into c from public.gruppe_liste; r := r || ' gruppen=' || c;
  select count(*) into c from public.gruppe_code; r := r || ' codes=' || c;
  select count(*) into c from public.mitglied; r := r || ' mitglieder=' || c;
  select count(*) into c from public.aufgabe_liste; r := r || ' aufgaben=' || c;
  select count(*) into c from public.erledigt; r := r || ' erledigt=' || c;
  begin insert into public.erledigt (aufgabe_id) values (w); r := r || ' FEHLER:abhaken';
  exception when others then r := r || ' abhaken=' || sqlstate; end;
  perform public.gruppe_verlassen(go);
  perform pg_temp.root();
  select count(*) into c from public.mitglied where gruppe_id = go and nutzer_id = n; r := r || ' austretenGeht=' || (c = 0)::text;
  perform pg_temp.als(n);
  begin insert into public.mitglied (gruppe_id, nutzer_id) values (go, n); r := r || ' FEHLER:offenBeitreten';
  exception when others then r := r || ' offenBeitreten=' || sqlstate; end;

  -- Team ohne Testerfreigabe, Paket zu
  perform pg_temp.als(k);
  begin insert into public.wochenaufgabe (gruppe_id, titel) values (null, 'Für alle'); r := r || ' FEHLER:teamAufgabe';
  exception when others then r := r || ' teamAufgabe=' || sqlstate; end;
  select count(*) into c from public.gruppe_liste; r := r || ' teamGruppen=' || c;

  -- Paket offen: dieselben Wege gehen
  perform pg_temp.root(); update public.freigabe set offen = true where schalter = 'beitraege';
  perform pg_temp.als(n);
  perform public.gruppe_beitreten(code);
  select count(*) into c from public.gruppe_liste where id = g and meine_rolle = 'mitglied'; r := r || ' offen:beitreten=' || c;
  insert into public.mitglied (gruppe_id, nutzer_id) values (go, n);
  insert into public.erledigt (aufgabe_id) values (w);
  select count(*) into c from public.aufgabe_liste where id = w and von_mir_erledigt; r := r || ' offen:abhaken=' || c;
  perform public.gruppe_gruenden('Nach Öffnung', '', true);
  select count(*) into c from public.gruppe_liste; r := r || ' offen:gruppen=' || c;

  -- Wieder zu: nichts mehr lesbar
  perform pg_temp.root(); update public.freigabe set offen = false where schalter = 'beitraege';
  perform pg_temp.als(n);
  select count(*) into c from public.gruppe_liste; r := r || ' wiederZu:gruppen=' || c;
  select count(*) into c from public.aufgabe_liste; r := r || ' wiederZu:aufgaben=' || c;
  perform pg_temp.als(t);
  select count(*) into c from public.gruppe_liste; r := r || ' wiederZu:tester=' || c;

  raise exception 'ERGEBNIS: %', r;
end $t$;
