-- Verlässliches Senden (Spec 05): Die App vergibt pro Vorgang eine Kennung, die
-- zur ID wird. Ein zweiter Versuch mit derselben Kennung legt nichts doppelt an.
create function public.beitrag_veroeffentlichen(
  p_vorgang uuid, p_art text, p_titel text, p_text text, p_lernfeld text, p_kapitel text,
  p_an_mentoren boolean, p_datei_pfad text, p_datei_art text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  vorhanden public.beitrag;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if not public.ist_freigeschaltet() then raise exception 'Dafür brauchst du ein Community-Profil.'; end if;
  if not public.beitraege_frei() then raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.'; end if;
  if p_vorgang is null then raise exception 'Vorgangskennung fehlt.'; end if;

  select * into vorhanden from public.beitrag where id = p_vorgang;
  if vorhanden.id is not null then
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  if p_datei_pfad is not null then
    if split_part(p_datei_pfad, '/', 1) <> ich::text then
      raise exception 'Die Datei gehört nicht zu deinem Konto.';
    end if;
    if not exists (select 1 from storage.objects o where o.bucket_id = 'lernzettel' and o.name = p_datei_pfad) then
      raise exception 'Die Datei ist nicht hochgeladen.';
    end if;
  end if;

  insert into public.beitrag (id, autor_id, gruppe_id, art, titel, text, lernfeld, kapitel,
                              datei_pfad, datei_art, an_mentoren)
  values (p_vorgang, ich, null, p_art, btrim(coalesce(p_titel, '')), coalesce(p_text, ''),
          nullif(p_lernfeld, ''), nullif(p_kapitel, ''), p_datei_pfad, p_datei_art,
          coalesce(p_an_mentoren, false) and p_art = 'frage')
  on conflict (id) do nothing;

  select * into vorhanden from public.beitrag where id = p_vorgang;
  if vorhanden.autor_id is distinct from ich then raise exception 'Diese Vorgangskennung ist schon vergeben.'; end if;
  return vorhanden.id;
end $$;

create function public.antwort_senden(p_vorgang uuid, p_beitrag uuid, p_text text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  b public.beitrag;
  vorhanden public.antwort;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if not public.ist_freigeschaltet() then raise exception 'Dafür brauchst du ein Community-Profil.'; end if;
  if not public.beitraege_frei() then raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.'; end if;
  if p_vorgang is null then raise exception 'Vorgangskennung fehlt.'; end if;

  select * into vorhanden from public.antwort where id = p_vorgang;
  if vorhanden.id is not null then
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  select * into b from public.beitrag where id = p_beitrag;
  if b.id is null or b.versteckt
     or not (b.gruppe_id is null or public.ist_mitglied(b.gruppe_id) or public.ist_team()) then
    raise exception 'Du kannst diesen Beitrag gerade nicht beantworten.';
  end if;

  insert into public.antwort (id, beitrag_id, autor_id, text)
  values (p_vorgang, p_beitrag, ich, btrim(coalesce(p_text, '')))
  on conflict (id) do nothing;

  select * into vorhanden from public.antwort where id = p_vorgang;
  if vorhanden.autor_id is distinct from ich then raise exception 'Diese Vorgangskennung ist schon vergeben.'; end if;
  return vorhanden.id;
end $$;

revoke all on function public.beitrag_veroeffentlichen(uuid, text, text, text, text, text, boolean, text, text) from public, anon;
revoke all on function public.antwort_senden(uuid, uuid, text) from public, anon;
grant execute on function public.beitrag_veroeffentlichen(uuid, text, text, text, text, text, boolean, text, text) to authenticated;
grant execute on function public.antwort_senden(uuid, uuid, text) to authenticated;
