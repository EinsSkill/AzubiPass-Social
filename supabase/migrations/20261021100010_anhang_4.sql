-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 4: alter Ein-Datei-Weg für ältere App-Versionen.
-- Wort für Wort wie 20261014122131_senden_mit_endstatus.sql, ergänzt um die Anhangszeile,
-- damit auch alte Clients nur über die verbindliche Zuordnung (public.anhang) veröffentlichen.
create or replace function public.beitrag_veroeffentlichen(
  p_vorgang uuid, p_art text, p_titel text, p_text text, p_lernfeld text, p_kapitel text,
  p_an_mentoren boolean, p_datei_pfad text, p_datei_art text) returns uuid
language plpgsql security definer set search_path = '' as $$
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

  insert into public.vorgang (id, autor_id, art, zustand) values (p_vorgang, ich, 'beitrag', 'angelegt')
  on conflict (id) do nothing returning id into neu;
  if neu is null then
    -- Gleichzeitiger erster Versuch hat inzwischen festgeschrieben?
    select * into vorhanden from public.beitrag where id = p_vorgang;
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    if exists (select 1 from public.vorgang where id = p_vorgang and autor_id = ich and art = 'beitrag') then
      raise exception 'Dieser Vorgang wurde abgebrochen.';
    end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  if p_datei_pfad is not null then
    if split_part(p_datei_pfad, '/', 1) <> ich::text then
      raise exception 'Die Datei gehört nicht zu deinem Konto.';
    end if;
    -- Zeilensperre: Ein gleichzeitiges Löschen wartet bis zum Festschreiben.
    perform 1 from storage.objects o where o.bucket_id = 'lernzettel' and o.name = p_datei_pfad for share;
    if not found then raise exception 'Die Datei ist nicht hochgeladen.'; end if;
  end if;

  insert into public.beitrag (id, autor_id, gruppe_id, art, titel, text, lernfeld, kapitel,
                              datei_pfad, datei_art, an_mentoren)
  values (p_vorgang, ich, null, p_art, btrim(coalesce(p_titel, '')), coalesce(p_text, ''),
          nullif(p_lernfeld, ''), nullif(p_kapitel, ''), p_datei_pfad, p_datei_art,
          coalesce(p_an_mentoren, false) and p_art = 'frage');
  -- Spec 07: die Datei ist auch hier Anhang 1 (verbindliche Zuordnung).
  if p_datei_pfad is not null then
    insert into public.anhang (beitrag_id, position, pfad, art, groesse)
    select p_vorgang, 1, p_datei_pfad, p_datei_art,
           greatest(1, least(5242880, coalesce((o.metadata->>'size')::bigint, 1)))
      from storage.objects o where o.bucket_id = 'lernzettel' and o.name = p_datei_pfad;
  end if;
  return p_vorgang;
end $$;
