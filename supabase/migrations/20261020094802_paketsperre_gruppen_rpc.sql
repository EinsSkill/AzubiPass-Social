-- AzubiPass Social · Paketsperre für Gruppe gründen / mit Code beitreten (Review c9e15a7, F02).
-- Wort für Wort wie 20261008131436_aktionen_gruppen.sql, ergänzt um die Prüfung
-- beitraege_frei() direkt nach der Profilprüfung. gruppe_verlassen bleibt ohne Sperre.

create or replace function public.gruppe_gruenden(p_name text, p_beschreibung text, p_offen boolean)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  neu uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
  end if;
  if not public.beitraege_frei() then
    raise exception 'Lerngruppen sind für die Klassen-Beta noch nicht freigeschaltet.';
  end if;
  if (select count(*) from public.gruppe where erstellt_von = ich) >= 10 then
    raise exception 'Du hast schon 10 Gruppen gegründet. Mehr geht in der Beta nicht.';
  end if;

  insert into public.gruppe (name, beschreibung, offen, erstellt_von)
  values (btrim(p_name), coalesce(btrim(p_beschreibung), ''), coalesce(p_offen, false), ich)
  returning id into neu;

  insert into public.gruppe_code (gruppe_id, code) values (neu, public.zufallscode(8));
  insert into public.mitglied (gruppe_id, nutzer_id, rolle) values (neu, ich, 'leitung');
  return neu;
end;
$$;

create or replace function public.gruppe_beitreten(p_code text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  g uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
  end if;
  if not public.beitraege_frei() then
    raise exception 'Lerngruppen sind für die Klassen-Beta noch nicht freigeschaltet.';
  end if;
  select gruppe_id into g from public.gruppe_code
   where code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  if g is null then
    raise exception 'Zu diesem Code gibt es keine Gruppe.';
  end if;
  insert into public.mitglied (gruppe_id, nutzer_id) values (g, ich)
  on conflict do nothing;
  return g;
end;
$$;
