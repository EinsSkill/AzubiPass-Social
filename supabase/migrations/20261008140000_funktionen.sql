-- AzubiPass Social · Hilfsfunktionen, Aktionen und Trigger

-- ============================================================== Hilfsfunktionen
-- security definer, damit die Prüfung „bin ich Mitglied?" nicht selbst wieder
-- unter die Regeln der Mitgliedertabelle fällt (sonst Endlosschleife).

create function public.ist_freigeschaltet() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profil where id = (select auth.uid()));
$$;

create function public.ist_team() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profil
                 where id = (select auth.uid()) and rolle = 'team');
$$;

create function public.ist_mitglied(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.mitglied
                 where gruppe_id = g and nutzer_id = (select auth.uid()));
$$;

create function public.ist_leitung(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.mitglied
                 where gruppe_id = g and nutzer_id = (select auth.uid())
                   and rolle = 'leitung');
$$;

-- Gut lesbare Codes ohne 0/O und 1/I, aus echten Zufallsbytes.
create function public.zufallscode(laenge integer) returns text
language sql volatile set search_path = '' as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
                           1 + (get_byte(z.b, i) % 32), 1), '' order by i)
  from (select extensions.gen_random_bytes(laenge) as b) z,
       generate_series(0, laenge - 1) as i;
$$;

-- ============================================================== Aktionen (RPC)

create function public.profil_anlegen(
  p_anzeigename text, p_lehrjahr smallint, p_code text,
  p_mindestens_16 boolean, p_regeln boolean
) returns public.profil
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  zc public.zugangscode;
  neu public.profil;
begin
  if ich is null then
    raise exception 'Bitte zuerst anmelden.';
  end if;
  if exists (select 1 from public.profil where id = ich) then
    raise exception 'Du hast schon ein Profil.';
  end if;
  if coalesce(p_mindestens_16, false) is not true then
    raise exception 'Die Community ist erst ab 16 Jahren.';
  end if;
  if coalesce(p_regeln, false) is not true then
    raise exception 'Bitte bestätige die Community-Regeln.';
  end if;

  -- Bindestriche und Leerzeichen sind beim Abtippen egal.
  select * into zc from public.zugangscode
   where replace(code, '-', '') = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
   for update;
  if zc.code is null or not zc.aktiv
     or (zc.max_nutzungen is not null and zc.genutzt >= zc.max_nutzungen) then
    raise exception 'Der Zugangscode stimmt nicht oder ist nicht mehr gültig.';
  end if;

  if exists (select 1 from public.profil
             where lower(btrim(anzeigename)) = lower(btrim(p_anzeigename))) then
    raise exception 'Diesen Anzeigenamen gibt es schon. Nimm einen anderen.';
  end if;

  insert into public.profil (id, anzeigename, lehrjahr, zugang, mindestens_16)
  values (ich, btrim(p_anzeigename), p_lehrjahr, zc.code, true)
  returning * into neu;

  update public.zugangscode set genutzt = genutzt + 1 where code = zc.code;
  return neu;
end;
$$;

create function public.gruppe_gruenden(p_name text, p_beschreibung text, p_offen boolean)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  neu uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
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

create function public.gruppe_beitreten(p_code text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  g uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
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

-- Wer als letzte Leitung geht, übergibt an das am längsten dabei gebliebene
-- Mitglied. Sonst bliebe eine Gruppe ohne jemanden, der sie pflegen kann.
-- Geht das letzte Mitglied, verschwindet die Gruppe ganz.
create function public.gruppe_verlassen(p_gruppe uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  nachfolge uuid;
begin
  delete from public.mitglied where gruppe_id = p_gruppe and nutzer_id = ich;
  if not found then
    return;                             -- war gar nicht Mitglied
  end if;
  if not exists (select 1 from public.mitglied
                 where gruppe_id = p_gruppe and rolle = 'leitung') then
    select nutzer_id into nachfolge from public.mitglied
     where gruppe_id = p_gruppe order by beigetreten_am limit 1;
    if nachfolge is not null then
      update public.mitglied set rolle = 'leitung'
       where gruppe_id = p_gruppe and nutzer_id = nachfolge;
    else
      -- Niemand mehr da: Eine leere Gruppe würde unsichtbar weiterleben.
      delete from public.gruppe where id = p_gruppe;
    end if;
  end if;
end;
$$;

-- Nur wer die Frage gestellt hat, markiert die beste Antwort. Ein zweiter
-- Tipp auf dieselbe Antwort nimmt die Markierung wieder weg.
create function public.beste_antwort(p_antwort uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  a public.antwort;
  b public.beitrag;
begin
  select * into a from public.antwort where id = p_antwort;
  if a.id is null then
    raise exception 'Diese Antwort gibt es nicht mehr.';
  end if;
  select * into b from public.beitrag where id = a.beitrag_id;
  if b.autor_id is distinct from ich then
    raise exception 'Nur wer gefragt hat, kann die beste Antwort wählen.';
  end if;
  if a.beste then
    update public.antwort set beste = false where id = a.id;
    update public.beitrag set geloest = false where id = b.id;
  else
    update public.antwort set beste = false where beitrag_id = b.id and beste;
    update public.antwort set beste = true where id = a.id;
    update public.beitrag set geloest = true where id = b.id;
  end if;
end;
$$;

-- Moderation: ausblenden statt löschen, damit eine Fehlentscheidung
-- rückgängig zu machen ist. Erledigt dabei die offenen Meldungen.
create function public.moderieren(p_art text, p_id uuid, p_versteckt boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.ist_team() then
    raise exception 'Nur das Team kann moderieren.';
  end if;
  if p_art = 'beitrag' then
    update public.beitrag set versteckt = p_versteckt where id = p_id;
    update public.meldung set status = 'erledigt' where beitrag_id = p_id and status = 'offen';
  elsif p_art = 'antwort' then
    update public.antwort set versteckt = p_versteckt where id = p_id;
    update public.meldung set status = 'erledigt' where antwort_id = p_id and status = 'offen';
  else
    raise exception 'Unbekannte Art: %', p_art;
  end if;
end;
$$;

-- Mentor:innen ernennt das Team. Die Rolle „team" selbst wird bewusst nicht
-- über die App vergeben, sondern nur direkt in der Datenbank.
create function public.rolle_setzen(p_nutzer uuid, p_rolle text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.ist_team() then
    raise exception 'Nur das Team kann Rollen vergeben.';
  end if;
  if p_rolle not in ('azubi', 'mentor') then
    raise exception 'Diese Rolle kann man hier nicht vergeben.';
  end if;
  if exists (select 1 from public.profil where id = p_nutzer and rolle = 'team') then
    raise exception 'Teamrollen ändert man nicht über die App.';
  end if;
  update public.profil set rolle = p_rolle where id = p_nutzer;
end;
$$;

-- Konto löschen: entfernt den Login und über die Fremdschlüssel alles, was
-- daran hängt. Die hochgeladenen Dateien räumt die App vorher selbst ab,
-- weil Speicherobjekte nur über die Storage-Schnittstelle gelöscht werden.
create function public.konto_loeschen() returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
begin
  if ich is null then
    raise exception 'Bitte zuerst anmelden.';
  end if;
  delete from auth.users where id = ich;
end;
$$;

-- ============================================================== Trigger

-- Spam-Bremse: genug für jede echte Lernsitzung, zu wenig für ein Skript.
create function public.bremse() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  zahl integer;
begin
  if ich is null then
    return new;                         -- Wartung direkt in der Datenbank
  end if;
  if tg_table_name = 'beitrag' then
    select count(*) into zahl from public.beitrag
     where autor_id = ich and erstellt_am > now() - interval '1 hour';
    if zahl >= 20 then
      raise exception 'Du hast in der letzten Stunde schon 20 Beiträge veröffentlicht. Kurz durchatmen.';
    end if;
  elsif tg_table_name = 'antwort' then
    select count(*) into zahl from public.antwort
     where autor_id = ich and erstellt_am > now() - interval '1 hour';
    if zahl >= 60 then
      raise exception 'Du hast in der letzten Stunde schon 60 Antworten geschrieben. Kurz durchatmen.';
    end if;
  elsif tg_table_name = 'meldung' then
    select count(*) into zahl from public.meldung
     where melder_id = ich and erstellt_am > now() - interval '1 hour';
    if zahl >= 30 then
      raise exception 'Zu viele Meldungen in kurzer Zeit. Das Team schaut sich die bisherigen an.';
    end if;
  end if;
  return new;
end;
$$;

create trigger beitrag_bremse before insert on public.beitrag
  for each row execute function public.bremse();
create trigger antwort_bremse before insert on public.antwort
  for each row execute function public.bremse();
create trigger meldung_bremse before insert on public.meldung
  for each row execute function public.bremse();

create function public.bearbeitet() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.titel is distinct from old.titel or new.text is distinct from old.text then
    new.bearbeitet_am := now();
  end if;
  return new;
end;
$$;

create trigger beitrag_bearbeitet before update on public.beitrag
  for each row execute function public.bearbeitet();

-- Drei Meldungen von drei verschiedenen Personen blenden einen Inhalt aus,
-- bis das Team entschieden hat. Schützt die Klasse auch nachts.
create function public.automatisch_ausblenden() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.beitrag_id is not null and
     (select count(distinct melder_id) from public.meldung
       where beitrag_id = new.beitrag_id and status = 'offen') >= 3 then
    update public.beitrag set versteckt = true where id = new.beitrag_id;
  elsif new.antwort_id is not null and
     (select count(distinct melder_id) from public.meldung
       where antwort_id = new.antwort_id and status = 'offen') >= 3 then
    update public.antwort set versteckt = true where id = new.antwort_id;
  end if;
  return new;
end;
$$;

create trigger meldung_ausblenden after insert on public.meldung
  for each row execute function public.automatisch_ausblenden();
