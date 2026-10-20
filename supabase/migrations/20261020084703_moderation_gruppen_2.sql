-- Lerngruppen (20.10.2026): Entscheidungen auch für Gruppeninhalte. Sonst wie
-- 20261019133825_entscheiden_wiederholung_2.sql.

create or replace function public.moderation_entscheiden(
  p_id uuid, p_art text, p_ziel uuid, p_aktion text, p_meldungen uuid[], p_pruefanfrage uuid,
  p_ausblendung uuid, p_version int, p_intern text, p_autor_text text, p_kategorie text, p_korrektur text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  intern text := nullif(btrim(coalesce(p_intern, '')), '');
  autor text := nullif(btrim(coalesce(p_autor_text, '')), '');
  korr text := nullif(btrim(coalesce(p_korrektur, '')), '');
  gesehen uuid[] := coalesce((select array_agg(x order by x) from unnest(p_meldungen) x), '{}');
  e public.moderation_entscheidung; s record; aus public.ausblendung; anf public.pruefanfrage;
  v boolean; offen uuid[]; neu uuid;
  geaendert constant text := 'Der Fall hat sich geändert. Prüfe die aktuellen Meldungen erneut.';
begin
  if ich is null or not public.ist_freigeschaltet() or not public.ist_team() then
    perform public.mod_fehler('APR01', 'Dieser Bereich ist für dich nicht verfügbar.');
  end if;
  if not public.beitraege_frei() then
    perform public.mod_fehler('APP01', 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.');
  end if;
  if p_id is null then perform public.mod_fehler('APE01', 'Vorgangskennung fehlt.'); end if;
  -- Wiederholung zuerst (P2): gespeichertes Ergebnis zurück.
  select * into e from public.moderation_entscheidung where id = p_id;
  if e.id is not null then
    if public.mod_gleicher_vorgang(e, ich, p_aktion, p_art, p_ziel) then
      return public.mod_ergebnis(e, true);
    end if;
    perform public.mod_fehler('APV01', 'Dieser Vorgang wurde bereits abgeschlossen. Lade die Seite neu.');
  end if;
  if p_aktion not in ('ausblenden', 'weiter_ausblenden', 'einblenden', 'sichtbar_lassen', 'korrektur',
                      'anfrage_aufheben', 'anfrage_bestaetigen', 'erklaerung_aendern') then
    perform public.mod_fehler('APE01', 'Unbekannte Entscheidung.');
  end if;
  if char_length(intern) > 500 or char_length(autor) > 500 then
    perform public.mod_fehler('APE01', 'Die Begründung darf höchstens 500 Zeichen lang sein.');
  end if;
  if char_length(korr) > 2000 then
    perform public.mod_fehler('APE01', 'Die Korrektur darf höchstens 2000 Zeichen lang sein.');
  end if;
  insert into public.vorgang (id, autor_id, art, zustand) values (p_id, ich, 'entscheidung', 'angelegt')
  on conflict (id) do nothing returning id into neu;
  if neu is null then
    select * into e from public.moderation_entscheidung where id = p_id;
    if public.mod_gleicher_vorgang(e, ich, p_aktion, p_art, p_ziel) then return public.mod_ergebnis(e, true); end if;
    perform public.mod_fehler('APV01', 'Dieser Vorgang wurde bereits abgeschlossen. Lade die Seite neu.');
  end if;

  select * into s from public.mod_sperren(p_art, p_ziel);
  v := case when p_art = 'beitrag' then (s.b).versteckt else (s.a).versteckt end;
  -- Ein Vergleichswert (P3) plus gesehene Bezüge.
  if p_version is distinct from (case when p_art = 'beitrag' then (s.b).mod_version else (s.a).mod_version end) then
    perform public.mod_fehler('APF01', geaendert);
  end if;
  aus := public.mod_aktiv(p_art, p_ziel);
  select * into anf from public.pruefanfrage where ausblendung_id = aus.id and status = 'offen';
  select coalesce(array_agg(id order by id), '{}') into offen from public.meldung
   where status = 'offen' and ((p_art = 'beitrag' and beitrag_id = p_ziel) or (p_art = 'antwort' and antwort_id = p_ziel));
  if p_ausblendung is distinct from aus.id or p_pruefanfrage is distinct from anf.id
     or offen <> gesehen or v <> (aus.id is not null) then
    perform public.mod_fehler('APF01', geaendert);
  end if;
  if anf.id is not null and p_aktion not in ('anfrage_aufheben', 'anfrage_bestaetigen') then
    perform public.mod_fehler('APF01', geaendert);
  end if;
  if (p_aktion in ('ausblenden', 'sichtbar_lassen', 'korrektur') and v)
     or (p_aktion in ('weiter_ausblenden', 'einblenden', 'erklaerung_aendern') and not v)
     or (p_aktion in ('anfrage_aufheben', 'anfrage_bestaetigen') and anf.id is null)
     or (p_aktion = 'erklaerung_aendern' and aus.bestaetigt_am is null) then
    perform public.mod_fehler('APF01', geaendert);
  end if;
  intern := public.mod_pflicht(p_aktion, p_art, aus, gesehen, intern, autor, p_kategorie, korr, (s.b).versteckt);

  perform public.mod_wirkung(p_id, p_art, p_ziel, p_aktion, ich, s.b, aus, anf, gesehen, v,
                             intern, autor, p_kategorie, korr);
  select * into e from public.moderation_entscheidung where id = p_id;
  return public.mod_ergebnis(e, false);
end $$;
