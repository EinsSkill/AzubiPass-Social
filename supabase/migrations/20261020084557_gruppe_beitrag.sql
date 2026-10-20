-- Lerngruppen (Lukes, 20.10.2026): Beiträge in einer Gruppe mit Vorgangskennung
-- wie beitrag_veroeffentlichen (G03). Nur Frage und Tipp, keine Dateien (G06:
-- Dateien gibt es nur in allgemeinen Lernzetteln). Nur Mitglieder.

create function public.gruppe_beitrag_veroeffentlichen(p_vorgang uuid, p_gruppe uuid, p_art text,
  p_titel text, p_text text, p_lernfeld text, p_kapitel text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  vorhanden public.beitrag;
  neu uuid;
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
  if p_art not in ('frage', 'tipp') then
    raise exception 'In Gruppen gibt es Fragen und Tipps.';
  end if;
  if p_gruppe is null or not public.ist_mitglied(p_gruppe) then
    raise exception 'Du bist nicht Mitglied dieser Gruppe.';
  end if;

  insert into public.vorgang (id, autor_id, art, zustand) values (p_vorgang, ich, 'beitrag', 'angelegt')
  on conflict (id) do nothing returning id into neu;
  if neu is null then
    select * into vorhanden from public.beitrag where id = p_vorgang;
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    if exists (select 1 from public.vorgang where id = p_vorgang and autor_id = ich and art = 'beitrag') then
      raise exception 'Dieser Vorgang wurde abgebrochen.';
    end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  insert into public.beitrag (id, autor_id, gruppe_id, art, titel, text, lernfeld, kapitel)
  values (p_vorgang, ich, p_gruppe, p_art, btrim(coalesce(p_titel, '')), coalesce(p_text, ''),
          nullif(p_lernfeld, ''), nullif(p_kapitel, ''));
  return p_vorgang;
end $$;

revoke all on function public.gruppe_beitrag_veroeffentlichen(uuid, uuid, text, text, text, text, text) from public, anon;
grant execute on function public.gruppe_beitrag_veroeffentlichen(uuid, uuid, text, text, text, text, text) to authenticated;
