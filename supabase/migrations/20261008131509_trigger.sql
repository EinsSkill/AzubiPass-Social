-- AzubiPass Social · trigger

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
