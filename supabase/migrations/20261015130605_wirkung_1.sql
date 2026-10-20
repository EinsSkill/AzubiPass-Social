-- Spec 06 · Wirkung einer geprüften Teamentscheidung. Wird nur von
-- moderation_entscheiden nach Sperre und Prüfung aufgerufen; alles in einer
-- Transaktion (P5): Sichtbarkeit, Ausblendung, Korrektur, Anfrage, Meldungen, Protokoll.
create function public.mod_wirkung(
  p_id uuid, p_art text, p_ziel uuid, p_aktion text, p_ich uuid, b public.beitrag,
  aus public.ausblendung, anf public.pruefanfrage, gesehen uuid[], v boolean,
  intern text, autor text, p_kategorie text, korr text) returns void
language plpgsql set search_path = '' as $$
declare
  betroffen uuid; aus_id uuid := aus.id; korr_id uuid; nachher boolean := v; alte text; n int;
begin
  if p_aktion = 'ausblenden' then
    if p_art = 'beitrag' then select x.autor_id into betroffen from public.beitrag x where x.id = p_ziel;
    else select y.autor_id into betroffen from public.antwort y where y.id = p_ziel;
    end if;
    insert into public.ausblendung (beitrag_id, antwort_id, autor_id, quelle, erstellt_am, erstellt_von,
      bestaetigt_am, bestaetigt_von, kategorie, begruendung_autor)
    values (case when p_art = 'beitrag' then p_ziel end, case when p_art = 'antwort' then p_ziel end,
      betroffen, 'team', clock_timestamp(), p_ich, clock_timestamp(), p_ich, p_kategorie, autor)
    returning id into aus_id;
    perform public.mod_verbergen(p_art, p_ziel);
    nachher := true;
  elsif p_aktion = 'weiter_ausblenden' and aus.bestaetigt_am is null then
    update public.ausblendung set bestaetigt_am = clock_timestamp(), bestaetigt_von = p_ich,
      kategorie = p_kategorie, begruendung_autor = autor where id = aus.id;
  elsif p_aktion = 'erklaerung_aendern' then
    alte := aus.begruendung_autor;
    update public.ausblendung set begruendung_autor = autor where id = aus.id;
  elsif p_aktion in ('einblenden', 'anfrage_aufheben') then
    update public.ausblendung set aufgehoben_am = now(), aufgehoben_durch = p_id where id = aus.id;
    perform public.mod_zeigen(p_art, p_ziel);
    nachher := false;
  end if;

  if anf.id is not null then
    update public.pruefanfrage set status = 'abgeschlossen',
      ergebnis = case when p_aktion = 'anfrage_aufheben' then 'aufgehoben' else 'bestaetigt' end,
      ergebnis_begruendung = autor, abgeschlossen_am = now(), entscheidung_id = p_id
     where id = anf.id and status = 'offen';
    get diagnostics n = row_count;
    if n <> 1 then perform public.mod_fehler('APF01', 'Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.'); end if;
  end if;

  -- Teamkorrektur: eigene, gekennzeichnete Antwort unter dem Beitrag; bei einer
  -- Antwort mit Bezug auf diese (E7). Nie automatisch beste Antwort.
  if korr is not null then
    korr_id := gen_random_uuid();
    insert into public.antwort (id, beitrag_id, autor_id, text, team_korrektur, bezug_antwort_id)
    values (korr_id, b.id, p_ich, korr, true, case when p_art = 'antwort' then p_ziel end);
  end if;

  if p_aktion <> 'erklaerung_aendern' and cardinality(gesehen) > 0 then
    update public.meldung set status = 'erledigt', erledigt_durch = p_id, erledigt_am = now()
     where id = any (gesehen) and status = 'offen';
    get diagnostics n = row_count;
    if n <> cardinality(gesehen) then
      perform public.mod_fehler('APF01', 'Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.');
    end if;
  end if;

  perform public.mod_version_hoch(p_art, p_ziel);
  insert into public.moderation_entscheidung (id, beitrag_id, antwort_id, aktion, vorher_versteckt,
    nachher_versteckt, akteur, akteur_id, interne_begruendung, autor_text, ausblendung_id,
    pruefanfrage_id, korrektur_antwort_id, meldungen, alte_erklaerung)
  values (p_id, case when p_art = 'beitrag' then p_ziel end, case when p_art = 'antwort' then p_ziel end,
    p_aktion, v, nachher, 'team', p_ich, intern, autor, aus_id, anf.id, korr_id,
    case when p_aktion = 'erklaerung_aendern' then '{}' else gesehen end, alte);
end $$;

revoke all on function public.mod_wirkung(uuid, text, uuid, text, uuid, public.beitrag, public.ausblendung,
  public.pruefanfrage, uuid[], boolean, text, text, text, text) from public, anon, authenticated;
