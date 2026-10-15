-- AzubiPass Social · Abnahme Spec 06 Melden und Moderation (Fälle aus 06-technik-plan.md §10/§12).
-- Wie regeln_test.sql: endet absichtlich mit „ERGEBNIS: …“, damit alles
-- zurückgerollt wird. Jedes „FEHLER:“ ist eine Lücke. Gleichzeitigkeit prüft
-- tests/lokal/konkurrenz.py (moderation), nicht dieser Block.
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); c uuid := gen_random_uuid();
  d uuid := gen_random_uuid(); t uuid := gen_random_uuid(); m uuid := gen_random_uuid();
  o uuid := gen_random_uuid(); t2 uuid := gen_random_uuid(); x uuid := gen_random_uuid();
  f2 uuid := gen_random_uuid(); f uuid := gen_random_uuid(); ab uuid := gen_random_uuid(); a2 uuid := gen_random_uuid();
  q1 uuid := gen_random_uuid(); q4 uuid := gen_random_uuid(); e1 uuid := gen_random_uuid();
  fall jsonb; j jsonb; r text := ''; n int; aus1 uuid; aus2 uuid; ver int; ids uuid[]; s text;
  seiten int := 0; gesamt int := 0; zuletzt jsonb; einzig int;
begin
  execute $f$create function pg_temp.als(u uuid) returns void language plpgsql as $g$
    begin perform set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
          execute 'set local role authenticated'; end $g$$f$;
  execute $f$create function pg_temp.root() returns void language plpgsql as $g$
    begin execute 'reset role'; end $g$$f$;
  execute $f$create function pg_temp.inv() returns int language sql as $g$
    select (select count(*) from public.beitrag x where x.versteckt <> exists
             (select 1 from public.ausblendung y where y.beitrag_id = x.id and y.aufgehoben_am is null))::int
         + (select count(*) from public.antwort x where x.versteckt <> exists
             (select 1 from public.ausblendung y where y.antwort_id = x.id and y.aufgehoben_am is null))::int $g$$f$;

  insert into public.zugangscode (code, bezeichnung) values ('TEST-MOD-99', 'Test');
  insert into auth.users (id, email, aud, role)
  select u, 'mod-' || u || '@test.invalid', 'authenticated', 'authenticated' from unnest(array[a, b, c, d, t, m, o, t2, x]) u;
  insert into public.beitraege_tester (nutzer_id) select unnest(array[a, b, c, d, t, m, t2]);
  -- t2 ist Team ohne Testerfreigabe → wird unten wieder entfernt
  delete from public.beitraege_tester where nutzer_id = t2;
  perform pg_temp.als(a); perform public.profil_anlegen('ModAnna', 2::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(b); perform public.profil_anlegen('ModBen', 2::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(c); perform public.profil_anlegen('ModCem', 2::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(d); perform public.profil_anlegen('ModDana', 2::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(t); perform public.profil_anlegen('ModTeam', 3::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(m); perform public.profil_anlegen('ModMentor', 3::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(o); perform public.profil_anlegen('ModOhne', 1::smallint, 'TESTMOD99', true, true);
  perform pg_temp.als(t2); perform public.profil_anlegen('ModTeamZwei', 3::smallint, 'TESTMOD99', true, true);
  perform pg_temp.root();
  update public.profil set rolle = 'team' where id in (t, t2);
  update public.profil set rolle = 'mentor' where id = m;

  perform pg_temp.als(a);
  perform public.beitrag_veroeffentlichen(f, 'frage', 'Wie buche ich Skonto?', 'Frage', null, null, false, null, null);
  perform public.beitrag_veroeffentlichen(f2, 'tipp', 'Tipp zum Melden', 'Text', null, null, false, null, null);
  perform pg_temp.als(b); perform public.antwort_senden(ab, f, 'Antwort von Ben');

  -- 1/13 · Melden, Wiedererkennung, automatische Ausblendung
  perform pg_temp.als(b);
  select neu::text || '/' || gleich::text into s from public.meldung_senden('beitrag', f, 'falsch', ' Stelle 2 ');
  r := r || 'erste=' || s;
  select neu::text || '/' || gleich::text into s from public.meldung_senden('beitrag', f, 'falsch', 'Stelle 2');
  r := r || ' wiederholt=' || s;
  select neu::text || '/' || gleich::text into s from public.meldung_senden('beitrag', f, 'spam', '');
  r := r || ' anderer=' || s;
  perform pg_temp.als(c); perform public.meldung_senden('beitrag', f, 'beleidigung', '');
  perform pg_temp.root(); select versteckt::text into s from public.beitrag where id = f; r := r || ' nachZwei=' || s;
  perform pg_temp.als(d); perform public.meldung_senden('beitrag', f, 'falsch', '');
  perform pg_temp.root();
  select versteckt::text into s from public.beitrag where id = f; r := r || ' nachDrei=' || s;
  select count(*) into n from public.ausblendung where beitrag_id = f and quelle = 'automatisch'; r := r || ' auto=' || n;
  select count(*) into n from public.moderation_entscheidung where beitrag_id = f and akteur = 'automatik'; r := r || ' protokollAuto=' || n;
  perform pg_temp.als(d);
  select neu::text || '/' || gleich::text into s from public.meldung_senden('beitrag', f, 'falsch', '');
  r := r || ' wiederholtVersteckt=' || s;
  perform pg_temp.als(m);
  begin perform public.meldung_senden('beitrag', f, 'falsch', ''); r := r || ' FEHLER:verstecktGemeldet';
  exception when others then r := r || ' fremdVersteckt=' || sqlstate; end;
  perform pg_temp.als(o);
  begin perform public.meldung_senden('beitrag', f, 'falsch', ''); r := r || ' FEHLER:ohnePaket';
  exception when others then r := r || ' ohnePaket=' || sqlstate; end;
  perform pg_temp.als(x);
  begin perform public.meldung_senden('beitrag', f, 'falsch', ''); r := r || ' FEHLER:ohneProfil';
  exception when others then r := r || ' ohneProfil=' || sqlstate; end;

  -- 2 · Bremse nach Wiedererkennung, Codepunkte
  perform pg_temp.root();
  insert into public.beitrag (autor_id, art, titel, text)
  select a, 'tipp', 'Bremse ' || g, '' from generate_series(1, 31) g;
  insert into public.meldung (melder_id, beitrag_id, grund)
  select c, id, 'spam' from public.beitrag where autor_id = a and titel like 'Bremse %' and titel <> 'Bremse 31';
  perform pg_temp.als(c);
  select neu::text into s from public.meldung_senden('beitrag', f, 'beleidigung', ''); r := r || ' bremseWiederholt=' || s;
  begin perform public.meldung_senden('beitrag', (select id from public.beitrag where titel = 'Bremse 31'), 'spam', '');
    r := r || ' FEHLER:bremse';
  exception when others then r := r || ' bremse=' || sqlstate; end;
  perform pg_temp.als(b);
  begin perform public.meldung_senden('beitrag', f2, 'spam', repeat('😀', 501)); r := r || ' FEHLER:501';
  exception when others then r := r || ' hinweis501=' || sqlstate; end;
  select neu::text into s from public.meldung_senden('beitrag', f2, 'spam', repeat('😀', 500)); r := r || ' hinweis500=' || s;

  -- 3 · Rechte
  perform pg_temp.als(b);
  begin perform public.moderation_zaehler(); r := r || ' FEHLER:azubiZaehler';
  exception when others then r := r || ' azubi=' || sqlstate; end;
  perform pg_temp.als(m);
  begin perform public.moderation_fall('beitrag', f); r := r || ' FEHLER:mentor';
  exception when others then r := r || ' mentor=' || sqlstate; end;
  perform pg_temp.als(t2);
  begin perform public.moderation_zaehler(); r := r || ' FEHLER:teamOhnePaket';
  exception when others then r := r || ' teamOhnePaket=' || sqlstate; end;
  perform pg_temp.als(b);
  begin insert into public.meldung (beitrag_id, grund) values (f, 'spam'); r := r || ' FEHLER:direktMelden';
  exception when others then r := r || ' direktMelden=' || sqlstate; end;
  begin insert into public.antwort (beitrag_id, text) values (f, 'direkt'); r := r || ' FEHLER:direktAntwort';
  exception when others then r := r || ' direktAntwort=' || sqlstate; end;
  perform pg_temp.als(t);
  begin update public.meldung set status = 'erledigt' where beitrag_id = f; r := r || ' FEHLER:direktErledigt';
  exception when others then r := r || ' direktErledigt=' || sqlstate; end;
  begin perform count(*) from public.ausblendung; r := r || ' FEHLER:ausblendungLesbar';
  exception when others then r := r || ' ausblendungLesen=' || sqlstate; end;
  begin perform public.moderieren('beitrag', f, false); r := r || ' FEHLER:alterWeg';
  exception when others then r := r || ' alterWeg=' || sqlstate; end;
  begin delete from public.antwort where id = ab; get diagnostics n = row_count; r := r || ' teamLoescht=' || n;
  exception when others then r := r || ' teamLoescht=' || sqlstate; end;

  -- 4 · Matrix: vorläufige Ausblendung bestätigen, Prüfanfrage, Erklärung, Einblenden
  perform pg_temp.als(a);
  j := public.eigener_inhalt('beitrag', f);
  r := r || ' vorlaeufig=' || (j->'ausblendung'->>'vorlaeufig') || '/' || coalesce(j->'ausblendung'->>'begruendung', 'ohne');
  begin perform public.pruefanfrage_senden(gen_random_uuid(), (j->'ausblendung'->>'id')::uuid, 'Bitte prüfen');
    r := r || ' FEHLER:anfrageVorlaeufig';
  exception when others then r := r || ' anfrageVorlaeufig=' || sqlstate; end;
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f);
  aus1 := (fall->'ausblendung'->>'id')::uuid; ver := (fall->>'version')::int;
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  r := r || ' fallMeldungen=' || cardinality(ids);
  begin perform public.moderation_entscheiden(e1, 'beitrag', f, 'weiter_ausblenden', ids, null, aus1, ver, '', '', 'falsch', null);
    r := r || ' FEHLER:ohneText';
  exception when others then r := r || ' ohneText=' || sqlstate; end;
  j := public.moderation_entscheiden(e1, 'beitrag', f, 'weiter_ausblenden', ids, null, aus1, ver, '',
         'Dein Inhalt wurde ausgeblendet, weil die fachliche Aussage hier besonders irreführend ist. Die betroffene Stelle: Skontosatz.', 'falsch', null);
  r := r || ' bestaetigt=' || (j->>'ausblendung_id' = aus1::text)::text;
  select count(*) into n from public.meldung where beitrag_id = f and status = 'erledigt' and erledigt_durch = e1;
  r := r || ' erledigt=' || n;
  j := public.moderation_entscheiden(e1, 'beitrag', f, 'weiter_ausblenden', ids, null, aus1, ver, '', 'x', 'falsch', null);
  r := r || ' wiederholung=' || (j->>'wiederholung');
  begin perform public.moderation_entscheiden(e1, 'beitrag', f, 'einblenden', '{}', null, aus1, ver + 1, 'x', null, null, null);
    r := r || ' FEHLER:andereAktion';
  exception when others then r := r || ' andereAktion=' || sqlstate; end;
  perform pg_temp.root(); select count(*) into n from public.moderation_entscheidung where id = e1; r := r || ' protokollEins=' || n;

  perform pg_temp.als(a);
  j := public.eigener_inhalt('beitrag', f);
  r := r || ' anfrageMoeglich=' || (j->'ausblendung'->>'anfrage_moeglich');
  j := public.pruefanfrage_senden(q1, aus1, 'Die Aussage stimmt laut Buch.');
  r := r || ' anfrage=' || (j->>'status');
  j := public.pruefanfrage_senden(q1, aus1, 'egal');
  r := r || ' anfrageWiederholt=' || (j->>'wiederholung');
  begin perform public.pruefanfrage_senden(gen_random_uuid(), aus1, 'Noch einmal'); r := r || ' FEHLER:zweiteAnfrage';
  exception when others then r := r || ' zweiteAnfrage=' || sqlstate; end;
  perform pg_temp.als(b);
  begin perform public.pruefanfrage_senden(gen_random_uuid(), aus1, 'fremd'); r := r || ' FEHLER:fremdeAnfrage';
  exception when others then r := r || ' fremdeAnfrage=' || sqlstate; end;

  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f); ver := (fall->>'version')::int;
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'erklaerung_aendern', '{}', null, aus1, ver, '', 'Neu', null, null);
    r := r || ' FEHLER:erklaerungBeiAnfrage';
  exception when others then r := r || ' erklaerungBeiAnfrage=' || sqlstate; end;
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'anfrage_bestaetigen', '{}', q1, aus1, ver - 1, '', 'Bleibt.', null, null);
    r := r || ' FEHLER:alteVersion';
  exception when others then r := r || ' alteVersion=' || sqlstate; end;
  j := public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'anfrage_bestaetigen', '{}', q1, aus1, ver, '',
         'Wir haben deinen Inhalt erneut geprüft. Die Ausblendung bleibt bestehen. Grund: Satz 2.', null, null);
  r := r || ' bestaetigtGleicheId=' || (j->>'ausblendung_id' = aus1::text)::text;
  perform pg_temp.als(a);
  begin perform public.pruefanfrage_senden(gen_random_uuid(), aus1, 'Nochmal'); r := r || ' FEHLER:nachBestaetigung';
  exception when others then r := r || ' nachBestaetigung=' || sqlstate; end;
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f); ver := (fall->>'version')::int;
  perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'erklaerung_aendern', '{}', null, aus1, ver, '', 'Erklärung neu', null, null);
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'erklaerung_aendern', '{}', null, aus1, ver, '', 'Zweite', null, null);
    r := r || ' FEHLER:zweiteErklaerung';
  exception when others then r := r || ' zweiteErklaerung=' || sqlstate; end;
  perform pg_temp.root();
  select count(*) into n from public.ausblendung where beitrag_id = f; r := r || ' ausblendungen=' || n;
  select count(*) into n from public.moderation_entscheidung where beitrag_id = f and aktion = 'erklaerung_aendern' and alte_erklaerung is not null;
  r := r || ' alteErklaerung=' || n;
  perform pg_temp.als(a);
  begin perform public.pruefanfrage_senden(gen_random_uuid(), aus1, 'Nach Erklärung'); r := r || ' FEHLER:nachErklaerung';
  exception when others then r := r || ' nachErklaerung=' || sqlstate; end;

  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f); ver := (fall->>'version')::int;
  j := public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'einblenden', '{}', null, aus1, ver,
         'Doch nur einfacher Fehler', null, null, 'Team-Hinweis: Skonto wird vom Bruttobetrag berechnet.');
  r := r || ' eingeblendet=' || (j->>'versteckt');
  perform pg_temp.root();
  select count(*) into n from public.antwort where beitrag_id = f and team_korrektur and autor_id = t; r := r || ' korrektur=' || n;
  perform pg_temp.als(a);
  j := public.pruefanfrage_senden(q1, aus1, 'egal');
  r := r || ' q1Gespeichert=' || (j->>'ergebnis');

  -- D13: direkt ausblenden ohne Meldung → neue Entscheidung, neues Anfragerecht
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f); ver := (fall->>'version')::int;
  j := public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'ausblenden', '{}', null, null, ver, '',
         'Dein Inhalt wurde ausgeblendet, weil er Werbung enthält.', 'spam', null);
  aus2 := (j->>'ausblendung_id')::uuid; r := r || ' neueId=' || (aus2 <> aus1)::text;
  perform pg_temp.als(a);
  perform public.pruefanfrage_senden(q4, aus2, 'Keine Werbung.');
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f); ver := (fall->>'version')::int;
  j := public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'anfrage_aufheben', '{}', q4, aus2, ver, '',
         'Wir haben deinen Inhalt erneut geprüft. Die Ausblendung ist aufgehoben.', null, 'Zweite Teamkorrektur.');
  r := r || ' aufgehoben=' || (j->>'versteckt') || '/' || ((j->>'korrektur_antwort_id') is not null)::text;
  perform pg_temp.als(a);
  j := public.pruefanfrage_senden(q4, aus2, 'egal');
  r := r || ' q4Gespeichert=' || (j->>'ergebnis');
  j := public.eigener_inhalt('beitrag', f);
  r := r || ' frueheresSichtbar=' || coalesce(j->'fruehere'->'pruefanfrage'->>'ergebnis', 'fehlt');

  -- sichtbar_lassen und Korrektur zu einer Antwort (Bezug, E7)
  perform pg_temp.als(t);
  fall := public.moderation_fall('antwort', ab);
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  j := public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'korrektur', ids, null, null, (fall->>'version')::int,
         'Antwort ungenau', null, null, 'Ergänzung des Teams zur Antwort.');
  perform pg_temp.root();
  select count(*) into n from public.antwort where bezug_antwort_id = ab and team_korrektur; r := r || ' bezug=' || n;
  select count(*) into n from public.meldung where antwort_id = ab and status = 'offen'; r := r || ' antwortOffen=' || n;
  perform pg_temp.als(m); perform public.meldung_senden('antwort', ab, 'sonstiges', '');
  perform pg_temp.als(t);
  fall := public.moderation_fall('antwort', ab);
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  j := public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'sichtbar_lassen', ids, null, null, (fall->>'version')::int,
         'Kein Verstoß', null, null, null);
  r := r || ' sichtbarLassen=' || (j->>'versteckt');

  -- 5 · Fall geändert: neue Meldung, bearbeiteter Inhalt
  fall := public.moderation_fall('antwort', ab);
  perform pg_temp.als(d); perform public.meldung_senden('antwort', ab, 'spam', '');
  perform pg_temp.als(t);
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'ausblenden', '{}', null, null,
          (fall->>'version')::int, '', 'Text', 'spam', null); r := r || ' FEHLER:neueMeldung';
  exception when others then r := r || ' neueMeldung=' || sqlstate; end;
  fall := public.moderation_fall('antwort', ab);
  perform pg_temp.als(b); update public.antwort set text = 'Bearbeitete Antwort' where id = ab;
  perform pg_temp.als(t);
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'sichtbar_lassen', ids, null, null,
          (fall->>'version')::int, 'x', null, null, null); r := r || ' FEHLER:bearbeitet';
  exception when others then r := r || ' bearbeitet=' || sqlstate; end;

  -- 6 · verworfene Kennung, späte Entscheidung
  perform pg_temp.als(t);
  e1 := gen_random_uuid();
  r := r || ' klaeren=' || public.vorgang_klaeren(e1, 'entscheidung');
  fall := public.moderation_fall('beitrag', f2);
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  begin perform public.moderation_entscheiden(e1, 'beitrag', f2, 'sichtbar_lassen', ids, null, null, (fall->>'version')::int, 'ok', null, null, null);
    r := r || ' FEHLER:spaetNachVerworfen';
  exception when others then r := r || ' spaetNachVerworfen=' || sqlstate; end;

  -- 7 · beste Antwort: manuell ausblenden, automatisch ausblenden
  perform pg_temp.als(a); perform public.beste_antwort_setzen(ab, true);
  perform pg_temp.als(t);
  fall := public.moderation_fall('antwort', ab);
  select array_agg((v->>'id')::uuid) into ids from jsonb_array_elements(fall->'meldungen') v;
  perform public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'ausblenden', coalesce(ids, '{}'), null, null,
          (fall->>'version')::int, '', 'Dein Inhalt wurde ausgeblendet, weil er Werbung enthält.', 'spam', null);
  perform pg_temp.root();
  select beste::text || '/' || (select geloest::text from public.beitrag where id = f) into s from public.antwort where id = ab;
  r := r || ' besteManuell=' || s;
  perform pg_temp.als(t);
  fall := public.moderation_fall('antwort', ab);
  perform public.moderation_entscheiden(gen_random_uuid(), 'antwort', ab, 'einblenden', '{}', null,
          (fall->'ausblendung'->>'id')::uuid, (fall->>'version')::int, 'Doch in Ordnung', null, null, null);
  perform pg_temp.root(); select beste::text into s from public.antwort where id = ab; r := r || ' besteNachEinblenden=' || s;
  perform pg_temp.als(d); perform public.antwort_senden(a2, f, 'Zweite Antwort');
  perform pg_temp.als(a); perform public.beste_antwort_setzen(a2, true);
  perform pg_temp.als(b); perform public.meldung_senden('antwort', a2, 'falsch', '');
  perform pg_temp.als(m); perform public.meldung_senden('antwort', a2, 'falsch', '');
  perform pg_temp.als(a); perform public.meldung_senden('antwort', a2, 'falsch', '');
  perform pg_temp.root();
  select versteckt::text || '/' || beste::text || '/' || (select geloest::text from public.beitrag where id = f) into s
    from public.antwort where id = a2;
  r := r || ' besteAutomatisch=' || s;

  -- 9 · Antwort unter fremdem ausgeblendeten Beitrag (E6)
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f);
  perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'ausblenden', '{}', null, null,
          (fall->>'version')::int, '', 'Dein Inhalt wurde ausgeblendet, weil er Werbung enthält.', 'spam', null);
  perform pg_temp.als(b);
  j := public.eigener_inhalt('antwort', ab);
  r := r || ' eltern=' || (j->>'eltern_ausgeblendet') || '/' || coalesce(j->>'eltern_id', 'ohneId') || '/' || coalesce(j->>'titel', 'ohneTitel');
  select count(*) into n from public.antwort where id = ab; r := r || ' direktLesbar=' || n;
  select count(*) into n from public.eigene_ausblendungen() e where e->>'zustand' = 'eltern_ausgeblendet'; r := r || ' eigeneListe=' || n;
  begin perform public.eigener_inhalt('beitrag', f); r := r || ' FEHLER:fremderInhalt';
  exception when others then r := r || ' fremderInhalt=' || sqlstate; end;

  -- 10 · Meine Meldungen: verborgenes Ziel ohne Titel
  select count(*) into n from public.meine_meldungen(null, null, 50) where titel is null;
  r := r || ' meineOhneTitel=' || n;

  -- 11 · viele Fälle, Seiten, Dringlichkeit
  perform pg_temp.root();
  insert into public.beitrag (autor_id, art, titel, text)
  select a, 'tipp', 'Seite ' || g, '' from generate_series(1, 60) g;
  insert into public.meldung (melder_id, beitrag_id, grund, erstellt_am)
  select d, id, case when titel in ('Seite 7', 'Seite 33') then 'beleidigung' else 'spam' end, '2026-01-01T00:00:00Z'
    from public.beitrag where titel like 'Seite %';
  select count(*) into einzig from public.mod_faelle;          -- Erwartung als Datenbankeigentümer
  perform pg_temp.als(t);
  n := public.moderation_zaehler();
  begin perform count(*) from public.mod_faelle; r := r || ' FEHLER:sichtLesbar';
  exception when others then r := r || ' sicht=' || sqlstate; end;
  r := r || ' zaehler=' || (n = einzig)::text;
  zuletzt := null; ids := '{}';
  loop
    select array_agg(v) into ids from (select (j2->>'ziel')::uuid v from public.moderation_faelle('alle', zuletzt, 7) j2) z;
    exit when ids is null;
    seiten := seiten + 1;
    select j2 into zuletzt from public.moderation_faelle('alle', zuletzt, 7) j2 offset cardinality(ids) - 1 limit 1;
    gesamt := gesamt + cardinality(ids);
    exit when seiten > 30;
  end loop;
  r := r || ' seitenGesamt=' || (gesamt = n)::text;
  select string_agg(j2->>'titel', ',') into s from (select * from public.moderation_faelle('alle', null, 2) j2) z;
  r := r || ' hochZuerst=' || s;

  -- 12 · Protokoll unveränderlich
  perform pg_temp.root();
  begin update public.moderation_entscheidung set interne_begruendung = 'geändert' where akteur_id = t; r := r || ' FEHLER:protokollGeaendert';
  exception when others then r := r || ' protokollAendern=verboten'; end;
  begin delete from public.moderation_entscheidung where akteur_id = t; r := r || ' FEHLER:protokollGeloescht';
  exception when others then r := r || ' protokollLoeschen=verboten'; end;

  -- 17 · Abbruch mitten in der Entscheidung (Antwort-Bremse bei der Korrektur): nichts bleibt
  perform set_config('request.jwt.claims', '', true);         -- Wartung: Bremse greift nicht
  insert into public.antwort (beitrag_id, autor_id, text) select f2, t, 'Füller ' || g from generate_series(1, 60) g;
  perform pg_temp.als(a); j := public.eigener_inhalt('beitrag', f);
  perform public.pruefanfrage_senden(gen_random_uuid(), (j->'ausblendung'->>'id')::uuid, 'Bitte erneut prüfen');
  perform pg_temp.als(t);
  fall := public.moderation_fall('beitrag', f);
  begin perform public.moderation_entscheiden(gen_random_uuid(), 'beitrag', f, 'anfrage_aufheben', '{}',
          (fall->'pruefanfrage'->>'id')::uuid, (fall->'ausblendung'->>'id')::uuid, (fall->>'version')::int, '',
          'Aufgehoben.', null, 'Korrektur, die an der Bremse scheitert');
    r := r || ' FEHLER:abbruch';
  exception when others then null; end;
  perform pg_temp.root();
  select versteckt::text || '/' || (select status from public.pruefanfrage where id = (fall->'pruefanfrage'->>'id')::uuid)
    into s from public.beitrag where id = f;
  r := r || ' abbruchUnveraendert=' || s;

  -- 12b · Kontolöschung leert nur akteur_id
  select count(*) into ver from public.moderation_entscheidung where akteur_id = t;
  delete from auth.users where id = t;
  select count(*) into n from public.moderation_entscheidung where akteur_id is null and akteur = 'team';
  r := r || ' kontoGeloescht=' || (n >= ver)::text;

  r := r || ' invariante=' || pg_temp.inv();
  raise exception 'ERGEBNIS: %', r;
end $t$;
