do $t$
declare a uuid:=gen_random_uuid(); g uuid; w uuid; n int; f boolean;
begin
 insert into auth.users(id,email,aud,role) values(a,'gate-'||a||'@test.invalid','authenticated','authenticated');
 insert into public.zugangscode(code,bezeichnung)values('TEST-GATE-1','Gate probe');
 perform set_config('request.jwt.claims',json_build_object('sub',a,'role','authenticated')::text,true);
 set local role authenticated;
 perform public.profil_anlegen('GateProbe',2::smallint,'TESTGATE1',true,true);
 f:=public.beitraege_frei();
 g:=public.gruppe_gruenden('Gruppe trotz Sperre','Test',false);
 insert into public.wochenaufgabe(gruppe_id,titel)values(g,'Aufgabe trotz Sperre')returning id into w;
 select count(*)into n from public.aufgabe_liste where id=w;
 raise exception 'ERGEBNIS: beitraege_frei=%; gruppe_angelegt=%; aufgabe_lesbar=%',f,g is not null,n;
end $t$;
