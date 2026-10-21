-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 3: Beitrag mit 0–5 Anhängen veröffentlichen.
-- Beitrag und alle Anhänge in einer Transaktion, erst nach Sperre und Prüfung jeder Datei.
-- Wiederholung mit derselben Vorgangskennung liefert denselben Beitrag, Anhänge unverändert.
-- beitrag.datei_pfad/datei_art = Spiegel von Anhang 1 (nur für alte App-Versionen).
create function public.beitrag_mit_anhaengen(
  p_vorgang uuid, p_art text, p_titel text, p_text text, p_lernfeld text, p_kapitel text,
  p_an_mentoren boolean, p_anhaenge jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  vorhanden public.beitrag;
  neu uuid;
  liste jsonb;
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
    select * into vorhanden from public.beitrag where id = p_vorgang;
    if vorhanden.autor_id = ich then return vorhanden.id; end if;
    if exists (select 1 from public.vorgang where id = p_vorgang and autor_id = ich and art = 'beitrag') then
      raise exception 'Dieser Vorgang wurde abgebrochen.';
    end if;
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;

  liste := public.anhaenge_pruefen(ich, p_vorgang, p_art, p_anhaenge);

  insert into public.beitrag (id, autor_id, gruppe_id, art, titel, text, lernfeld, kapitel,
                              datei_pfad, datei_art, an_mentoren)
  values (p_vorgang, ich, null, p_art, btrim(coalesce(p_titel, '')), coalesce(p_text, ''),
          nullif(p_lernfeld, ''), nullif(p_kapitel, ''), liste->0->>'pfad', liste->0->>'art',
          coalesce(p_an_mentoren, false) and p_art = 'frage');
  insert into public.anhang (beitrag_id, position, pfad, art, groesse, beschreibung)
  select p_vorgang, (x->>'pos')::smallint, x->>'pfad', x->>'art', (x->>'groesse')::bigint, x->>'beschreibung'
    from jsonb_array_elements(liste) x;
  return p_vorgang;
end $$;

revoke all on function public.beitrag_mit_anhaengen(uuid, text, text, text, text, text, boolean, jsonb) from public, anon;
grant execute on function public.beitrag_mit_anhaengen(uuid, text, text, text, text, text, boolean, jsonb) to authenticated;
