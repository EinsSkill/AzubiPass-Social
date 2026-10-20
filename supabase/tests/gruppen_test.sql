-- AzubiPass Social · Lerngruppen, Wochenaufgaben, Hilfreich, Beruf (20.10.2026).
-- Endet mit „ERGEBNIS: …“ (Rollback). Jedes „FEHLER:“ ist eine Lücke.
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); c uuid := gen_random_uuid(); t uuid := gen_random_uuid();
  g uuid; code text; v1 uuid := gen_random_uuid(); id1 uuid; w uuid; fall jsonb; j jsonb; r text := ''; n int; s text;
begin
  execute $f$create function pg_temp.als(u uuid) returns void language plpgsql as $g$
    begin perform set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
          execute 'set local role authenticated'; end $g$$f$;
  execute $f$create function pg_temp.root() returns void language plpgsql as $g$
    begin execute 'reset role'; end $g$$f$;
  insert into public.zugangscode (code, bezeichnung) values ('TEST-GRP-1', 'Test');
  insert into auth.users (id, email, aud, role)
  select u, 'grp-' || u || '@test.invalid', 'authenticated', 'authenticated' from unnest(array[a, b, c, t]) u;
  insert into public.beitraege_tester (nutzer_id) select unnest(array[a, b, c, t]);
  perform pg_temp.als(a); perform public.profil_anlegen('GrpAnna', 2::smallint, 'TESTGRP1', true, true);
  perform pg_temp.als(b); perform public.profil_anlegen('GrpBen', 2::smallint, 'TESTGRP1', true, true);
  perform pg_temp.als(c); perform public.profil_anlegen('GrpCem', 1::smallint, 'TESTGRP1', true, true);
  perform pg_temp.als(t); perform public.profil_anlegen('GrpTeam', 3::smallint, 'TESTGRP1', true, true);
  perform pg_temp.root(); update public.profil set rolle = 'team' where id = t;

  -- Beruf
  perform pg_temp.als(b);
  update public.profil set beruf = 'ik' where id = b;
  select beruf into s from public.profil where id = b; r := r || 'beruf=' || s;
  perform public.beitrag_veroeffentlichen(gen_random_uuid(), 'frage', 'Frage zur Kostenrechnung', 'Text', 'lf8', null, false, null, null);
  select beruf into s from public.beitrag where autor_id = b; r := r || ' beitragBeruf=' || s;
  begin perform public.beitrag_veroeffentlichen(gen_random_uuid(), 'tipp', 'Tipp mit Kapitel', 'Text', 'lf2', 'k1', false, null, null);
    r := r || ' FEHLER:ikKapitel';
  exception when others then r := r || ' ikKapitel=' || sqlstate; end;
  begin update public.profil set beruf = 'xx' where id = b; r := r || ' FEHLER:berufFrei';
  exception when others then r := r || ' berufFrei=' || sqlstate; end;

  -- Gruppe gründen, beitreten
  perform pg_temp.als(a);
  g := public.gruppe_gruenden('Lerngruppe Rechnungswesen', 'Wir üben Buchungssätze.', false);
  select gc.code into code from public.gruppe_code gc where gc.gruppe_id = g;
  r := r || ' code=' || (code is not null)::text;
  perform pg_temp.als(b); perform public.gruppe_beitreten(lower(code));
  select count(*) into n from public.gruppe_liste where id = g and meine_rolle = 'mitglied'; r := r || ' bensBeitritt=' || n;
  perform pg_temp.als(c);
  select count(*) into n from public.gruppe_liste where id = g; r := r || ' geschlossenFremd=' || n;

  -- Gruppenbeitrag
  perform pg_temp.als(b);
  id1 := public.gruppe_beitrag_veroeffentlichen(v1, g, 'frage', 'Wie buche ich Abschreibungen?', 'Bitte erklären', null, null);
  r := r || ' wiederholt=' || (public.gruppe_beitrag_veroeffentlichen(v1, g, 'frage', 'x', 'y', null, null) = id1)::text;
  begin perform public.gruppe_beitrag_veroeffentlichen(gen_random_uuid(), g, 'lernzettel', 'Zettel', '', null, null);
    r := r || ' FEHLER:gruppeLernzettel';
  exception when others then r := r || ' gruppeLernzettel=' || sqlstate; end;
  perform pg_temp.als(c);
  begin perform public.gruppe_beitrag_veroeffentlichen(gen_random_uuid(), g, 'tipp', 'Fremder Tipp', '', null, null);
    r := r || ' FEHLER:fremdSchreibt';
  exception when others then r := r || ' fremdSchreibt=' || sqlstate; end;
  select count(*) into n from public.beitrag_liste where id = id1; r := r || ' fremdSieht=' || n;
  perform pg_temp.als(a);
  select count(*) into n from public.beitrag_liste where id = id1 and gruppe_name is not null; r := r || ' mitgliedSieht=' || n;
  perform public.antwort_senden(gen_random_uuid(), id1, 'Antwort aus der Gruppe');
  select count(*) into n from public.antwort where beitrag_id = id1; r := r || ' antwort=' || n;

  -- Hilfreich
  insert into public.hilfreich (beitrag_id) values (id1);
  select hilfreich_zahl into n from public.beitrag_liste where id = id1; r := r || ' hilfreich=' || n;
  delete from public.hilfreich where beitrag_id = id1 and nutzer_id = a;
  select hilfreich_zahl into n from public.beitrag_liste where id = id1; r := r || ' zurueck=' || n;

  -- Wochenaufgabe
  insert into public.wochenaufgabe (gruppe_id, titel, beschreibung) values (g, 'Fünf Buchungssätze', 'Bis Freitag') returning id into w;
  perform pg_temp.als(b);
  begin insert into public.wochenaufgabe (gruppe_id, titel) values (g, 'Mitglied stellt'); r := r || ' FEHLER:mitgliedStellt';
  exception when others then r := r || ' mitgliedStellt=' || sqlstate; end;
  insert into public.erledigt (aufgabe_id) values (w);
  select erledigt_zahl::text || '/' || von_mir_erledigt::text into s from public.aufgabe_liste where id = w; r := r || ' erledigt=' || s;
  perform pg_temp.als(c);
  select count(*) into n from public.aufgabe_liste where id = w; r := r || ' fremdAufgabe=' || n;
  perform pg_temp.als(t);
  insert into public.wochenaufgabe (gruppe_id, titel) values (null, 'Klassenaufgabe der Woche');
  perform pg_temp.als(c);
  select count(*) into n from public.aufgabe_liste where gruppe_id is null; r := r || ' klassenaufgabe=' || n;

  -- Moderation von Gruppeninhalten
  perform pg_temp.als(a); perform public.meldung_senden('beitrag', id1, 'spam', 'Werbung');
  perform pg_temp.als(t);
  select count(*) into n from public.moderation_faelle('alle', null, 50) f where (f->>'ziel')::uuid = id1; r := r || ' fallGruppe=' || n;
  fall := public.moderation_fall('beitrag', id1);
  j := public.moderation_entscheiden(gen_random_uuid(), 'beitrag', id1, 'sichtbar_lassen',
         array[(fall->'meldungen'->0->>'id')::uuid], null, null, (fall->>'version')::int, 'Keine Werbung', null, null, null);
  r := r || ' entschiedenGruppe=' || (j->>'versteckt');

  raise exception 'ERGEBNIS: %', r;
end $t$;
