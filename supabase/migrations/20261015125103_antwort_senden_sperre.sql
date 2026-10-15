-- R03 (06-technik-plan.md §12.2, freigegeben 15.10.2026): Beitrag erst sperren,
-- dann Sichtbarkeit prüfen. Bisher wurde der Beitrag ohne Sperre gelesen und
-- erst beim Fremdschlüssel gewartet – danach ohne neue Prüfung. So konnte eine
-- Antwort unter einem gerade ausgeblendeten Beitrag entstehen.
-- Reihenfolge: Wiederholung erkennen → Beitrag FOR SHARE → prüfen → Vorgang → Antwort.
create or replace function public.antwort_senden(p_vorgang uuid, p_beitrag uuid, p_text text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  b public.beitrag;
  vorhanden public.antwort;
  neu uuid;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if not public.ist_freigeschaltet() then raise exception 'Dafür brauchst du ein Community-Profil.'; end if;
  if not public.beitraege_frei() then raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.'; end if;
  if p_vorgang is null then raise exception 'Vorgangskennung fehlt.'; end if;

  -- 1. Wiederholung zuerst: bereits angelegt ⇒ dieselbe ID, auch nach späterer Ausblendung.
  select * into vorhanden from public.antwort where id = p_vorgang;
  if vorhanden.id is not null then
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  -- 2. Beitrag sperren; nach einer Wartezeit liefert die Sperrabfrage den
  --    festgeschriebenen Stand. FOR SHARE: Antworten blockieren sich nicht
  --    gegenseitig, kollidieren aber mit jeder Moderation (FOR UPDATE).
  select * into b from public.beitrag where id = p_beitrag for share;
  if b.id is null or b.versteckt
     or not (b.gruppe_id is null or public.ist_mitglied(b.gruppe_id) or public.ist_team()) then
    raise exception 'Du kannst diesen Beitrag gerade nicht beantworten.';
  end if;

  insert into public.vorgang (id, autor_id, art, zustand) values (p_vorgang, ich, 'antwort', 'angelegt')
  on conflict (id) do nothing returning id into neu;
  if neu is null then
    select * into vorhanden from public.antwort where id = p_vorgang;
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    if exists (select 1 from public.vorgang where id = p_vorgang and autor_id = ich and art = 'antwort') then
      raise exception 'Dieser Vorgang wurde abgebrochen.';
    end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  insert into public.antwort (id, beitrag_id, autor_id, text)
  values (p_vorgang, p_beitrag, ich, btrim(coalesce(p_text, '')));
  return p_vorgang;
end $$;
