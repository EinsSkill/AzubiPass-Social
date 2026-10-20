-- AzubiPass Social · Lernstand am Konto (20.10.2026).
-- Endet mit „ERGEBNIS: …“ (Rollback). Jedes „FEHLER:“ ist eine Lücke.
do $t$
declare
  a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); x uuid := gen_random_uuid();
  j jsonb; r text := ''; n int; s text;
begin
  execute $f$create function pg_temp.als(u uuid) returns void language plpgsql as $g$
    begin perform set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
          execute 'set local role authenticated'; end $g$$f$;
  execute $f$create function pg_temp.root() returns void language plpgsql as $g$
    begin execute 'reset role'; end $g$$f$;
  insert into public.zugangscode (code, bezeichnung) values ('TEST-LST-1', 'Test');
  insert into auth.users (id, email, aud, role)
  select u, 'lst-' || u || '@test.invalid', 'authenticated', 'authenticated' from unnest(array[a, b, x]) u;
  perform pg_temp.als(a); perform public.profil_anlegen('LstAnna', 2::smallint, 'TESTLST1', true, true);
  perform pg_temp.als(b); perform public.profil_anlegen('LstBen', 2::smallint, 'TESTLST1', true, true);

  -- Ohne Profil kein Speichern
  perform pg_temp.als(x);
  begin perform public.lernstand_speichern('{"version":3}'::jsonb, 0); r := r || 'FEHLER:ohneProfil';
  exception when others then r := r || 'ohneProfil=' || sqlstate; end;

  -- Erstes Speichern, Wiederholung mit alter Basis
  perform pg_temp.als(a);
  j := public.lernstand_speichern('{"version":3,"fortschritt":{"lf1-k1":{"fertig":true}}}'::jsonb, 0);
  r := r || ' erst=' || (j->>'ok') || '/' || (j->>'version');
  j := public.lernstand_speichern('{"version":3,"fortschritt":{}}'::jsonb, 0);
  r := r || ' basis0Erneut=' || (j->>'ok') || '/' || (j->>'version') || '/' || (j->'daten'->'fortschritt' ? 'lf1-k1')::text;
  j := public.lernstand_speichern('{"version":3,"fortschritt":{"lf1-k2":{}}}'::jsonb, 1);
  r := r || ' zweit=' || (j->>'ok') || '/' || (j->>'version');
  j := public.lernstand_speichern('{"version":3}'::jsonb, 1);
  r := r || ' veraltet=' || (j->>'ok') || '/' || (j->>'version');
  select count(*) into n from public.lernstand where daten->'fortschritt' ? 'lf1-k2'; r := r || ' stand=' || n;

  -- Ungültig, zu groß
  begin perform public.lernstand_speichern('[1,2]'::jsonb, 2); r := r || ' FEHLER:array';
  exception when others then r := r || ' array=' || sqlstate; end;
  begin perform public.lernstand_speichern(jsonb_build_object('x', repeat('a', 1000001)), 2); r := r || ' FEHLER:gross';
  exception when others then r := r || ' gross=' || sqlstate; end;

  -- Kein direktes Schreiben, fremder Stand unsichtbar
  begin update public.lernstand set version = 99; r := r || ' FEHLER:direktUpdate';
  exception when others then r := r || ' direktUpdate=' || sqlstate; end;
  begin insert into public.lernstand (nutzer_id, daten) values (a, '{}'); r := r || ' FEHLER:direktInsert';
  exception when others then r := r || ' direktInsert=' || sqlstate; end;
  perform pg_temp.als(b);
  select count(*) into n from public.lernstand; r := r || ' bSieht=' || n;
  j := public.lernstand_speichern('{"version":3}'::jsonb, 0);
  r := r || ' bErst=' || (j->>'ok');
  select count(*) into n from public.lernstand; r := r || ' bSiehtEigen=' || n;

  -- anon
  perform pg_temp.root(); execute 'set local role anon';
  begin perform public.lernstand_speichern('{}'::jsonb, 0); r := r || ' FEHLER:anon';
  exception when others then r := r || ' anon=' || sqlstate; end;
  perform pg_temp.root();

  -- Konto weg → Lernstand weg
  delete from auth.users where id = a;
  select count(*) into n from public.lernstand where nutzer_id = a; r := r || ' kaskade=' || n;

  raise exception 'ERGEBNIS: %', r;
end $t$;
