-- Pflichtfelder einer Entscheidung (E4: internes Feld darf leer sein, wenn ein
-- Autortext da ist). Gibt die interne Begründung zurück.
create function public.mod_pflicht(p_aktion text, p_art text, aus public.ausblendung, gesehen uuid[],
  intern text, autor text, p_kategorie text, korr text, eltern_versteckt boolean) returns text
language plpgsql set search_path = '' as $$
begin
  if p_aktion in ('ausblenden', 'anfrage_aufheben', 'anfrage_bestaetigen', 'erklaerung_aendern')
     or (p_aktion = 'weiter_ausblenden' and aus.bestaetigt_am is null) then
    if autor is null then perform public.mod_fehler('APE01', 'Gib eine kurze Begründung ein.'); end if;
    intern := coalesce(intern, autor);
  end if;
  if p_aktion = 'ausblenden' or (p_aktion = 'weiter_ausblenden' and aus.bestaetigt_am is null) then
    if p_kategorie is null or p_kategorie not in ('falsch', 'urheberrecht', 'beleidigung', 'spam',
                                                  'persoenliche_daten', 'sonstiges') then
      perform public.mod_fehler('APE01', 'Wähle eine Vorlage für die Begründung.');
    end if;
  end if;
  if intern is null then perform public.mod_fehler('APE01', 'Gib eine kurze Begründung ein.'); end if;
  if p_aktion = 'korrektur' and korr is null then perform public.mod_fehler('APE01', 'Gib die Korrektur ein.'); end if;
  if korr is not null and p_aktion not in ('korrektur', 'einblenden', 'anfrage_aufheben') then
    perform public.mod_fehler('APE01', 'Eine Korrektur passt nicht zu dieser Entscheidung.');
  end if;
  if p_aktion in ('sichtbar_lassen') and cardinality(gesehen) = 0 then
    perform public.mod_fehler('APE01', 'Es gibt keine offenen Meldungen zum Abschließen.');
  end if;
  if p_aktion = 'weiter_ausblenden' and aus.bestaetigt_am is not null and cardinality(gesehen) = 0 then
    perform public.mod_fehler('APE01', 'Es gibt keine offenen Meldungen zum Abschließen.');
  end if;
  if korr is not null and p_art = 'antwort' and eltern_versteckt then
    perform public.mod_fehler('APF01', 'Der zugehörige Beitrag ist ausgeblendet.');
  end if;

  return intern;
end $$;

revoke all on function public.mod_pflicht(text, text, public.ausblendung, uuid[], text, text, text, text, boolean)
  from public, anon, authenticated;

-- Status nach unklarem Ausgang; ein leerer Befund ist erst nach vorgang_klaeren endgültig.
create function public.entscheidung_status(p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare e public.moderation_entscheidung;
begin
  if not public.ist_team() or not public.beitraege_frei() then
    perform public.mod_fehler('APR01', 'Dieser Bereich ist für dich nicht verfügbar.');
  end if;
  select * into e from public.moderation_entscheidung where id = p_id and akteur_id = (select auth.uid());
  return case when e.id is null then null else public.mod_ergebnis(e, true) end;
end $$;

revoke all on function public.entscheidung_status(uuid) from public, anon;

grant execute on function public.entscheidung_status(uuid) to authenticated;

-- Klären auch für Entscheidungen und Prüfanfragen (G03-Muster).
create or replace function public.vorgang_klaeren(p_vorgang uuid, p_art text) returns text
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  v public.vorgang;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if p_vorgang is null or p_art is null or p_art not in ('beitrag', 'antwort', 'entscheidung', 'pruefanfrage') then
    raise exception 'Vorgangskennung fehlt.';
  end if;
  insert into public.vorgang (id, autor_id, art, zustand)
  values (p_vorgang, ich, p_art,
          case when (p_art = 'beitrag' and exists (select 1 from public.beitrag where id = p_vorgang and autor_id = ich))
                 or (p_art = 'antwort' and exists (select 1 from public.antwort where id = p_vorgang and autor_id = ich))
                 or (p_art = 'entscheidung' and exists (select 1 from public.moderation_entscheidung where id = p_vorgang and akteur_id = ich))
                 or (p_art = 'pruefanfrage' and exists (select 1 from public.pruefanfrage where id = p_vorgang and autor_id = ich))
               then 'angelegt' else 'verworfen' end)
  on conflict (id) do nothing;
  select * into v from public.vorgang where id = p_vorgang;
  if v.autor_id is distinct from ich or v.art is distinct from p_art then
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;
  return v.zustand;
end $$;
