-- Spec 06 · Melden (06-technik-plan.md §4.1 mit P1/R02).

-- Automatische Ausblendung: drei verschiedene Personen mit offenen Meldungen.
-- Läuft in der Transaktion von meldung_senden, der Thread ist dort gesperrt (B4).
create or replace function public.automatisch_ausblenden() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  art text := case when new.beitrag_id is not null then 'beitrag' else 'antwort' end;
  ziel uuid := coalesce(new.beitrag_id, new.antwort_id);
  autor uuid; versteckt boolean; aus uuid;
begin
  if (select count(distinct melder_id) from public.meldung
       where status = 'offen' and (beitrag_id = new.beitrag_id or antwort_id = new.antwort_id)) < 3 then
    return new;
  end if;
  if art = 'beitrag' then select b.autor_id, b.versteckt into autor, versteckt from public.beitrag b where b.id = ziel;
  else select a.autor_id, a.versteckt into autor, versteckt from public.antwort a where a.id = ziel;
  end if;
  if versteckt then return new; end if;
  insert into public.ausblendung (beitrag_id, antwort_id, autor_id, quelle, erstellt_am)
  values (new.beitrag_id, new.antwort_id, autor, 'automatisch', clock_timestamp()) returning id into aus;
  perform public.mod_verbergen(art, ziel);
  insert into public.moderation_entscheidung (id, beitrag_id, antwort_id, aktion, vorher_versteckt,
    nachher_versteckt, akteur, ausblendung_id)
  values (gen_random_uuid(), new.beitrag_id, new.antwort_id, 'automatisch_ausgeblendet', false, true,
    'automatik', aus);
  return new;
end $$;

-- Die Meldungs-Bremse prüft jetzt meldung_senden selbst (APB01).
create or replace function public.bremse() returns trigger
language plpgsql security definer set search_path = '' as $$
declare ich uuid := (select auth.uid()); zahl integer;
begin
  if ich is null or tg_table_name = 'meldung' then return new; end if;
  if tg_table_name = 'beitrag' then
    select count(*) into zahl from public.beitrag where autor_id = ich and erstellt_am > now() - interval '1 hour';
    if zahl >= 20 then
      raise exception 'Du hast in der letzten Stunde schon 20 Beiträge veröffentlicht. Kurz durchatmen.';
    end if;
  elsif tg_table_name = 'antwort' then
    select count(*) into zahl from public.antwort where autor_id = ich and erstellt_am > now() - interval '1 hour';
    if zahl >= 60 then
      raise exception 'Du hast in der letzten Stunde schon 60 Antworten geschrieben. Kurz durchatmen.';
    end if;
  end if;
  return new;
end $$;

create function public.mod_eigene_meldung(p_ich uuid, p_art text, p_ziel uuid) returns public.meldung
language sql stable set search_path = '' as $$
  select * from public.meldung where melder_id = p_ich
     and ((p_art = 'beitrag' and beitrag_id = p_ziel) or (p_art = 'antwort' and antwort_id = p_ziel));
$$;

revoke all on function public.mod_eigene_meldung(uuid, text, uuid) from public, anon, authenticated;
