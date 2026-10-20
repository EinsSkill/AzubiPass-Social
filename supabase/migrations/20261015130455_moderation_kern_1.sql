-- Spec 06 · Moderation: interne Helfer (keine Rechte für Konten).

-- Fehler mit eigenem SQLSTATE; der Client stuft nur diese Codes als sicher ein.
create function public.mod_fehler(p_code text, p_text text) returns void
language plpgsql set search_path = '' as $$
begin
  raise exception '%', p_text using errcode = p_code;
end $$;

-- Thread sperren: Beitrag (bei Antwort deren Elternbeitrag) FOR UPDATE, danach
-- die Antwort. Reihenfolge Beitrag → Antwort wie in beste_antwort_setzen.
create function public.mod_sperren(p_art text, p_ziel uuid,
  out b public.beitrag, out a public.antwort)
language plpgsql set search_path = '' as $$
declare bid uuid;
begin
  if p_art = 'beitrag' then bid := p_ziel;
  elsif p_art = 'antwort' then select beitrag_id into bid from public.antwort where id = p_ziel;
  else perform public.mod_fehler('APE01', 'Unbekannte Art.');
  end if;
  select * into b from public.beitrag where id = bid for update;
  if b.id is null then perform public.mod_fehler('APZ01', 'Dieser Inhalt ist für dich nicht verfügbar.'); end if;
  if p_art = 'antwort' then
    select * into a from public.antwort where id = p_ziel for update;
    if a.id is null then perform public.mod_fehler('APZ01', 'Dieser Inhalt ist für dich nicht verfügbar.'); end if;
  end if;
end $$;

-- Aktive Ausblendung eines Ziels.
create function public.mod_aktiv(p_art text, p_ziel uuid) returns public.ausblendung
language sql stable set search_path = '' as $$
  select * from public.ausblendung
   where aufgehoben_am is null
     and ((p_art = 'beitrag' and beitrag_id = p_ziel) or (p_art = 'antwort' and antwort_id = p_ziel));
$$;

-- Ausblenden: versteckt setzen; eine ausgeblendete beste Antwort verliert die
-- Markierung, die Frage gilt dann als ungelöst (Spec §4).
create function public.mod_verbergen(p_art text, p_ziel uuid) returns void
language plpgsql set search_path = '' as $$
declare a public.antwort;
begin
  if p_art = 'beitrag' then
    update public.beitrag set versteckt = true where id = p_ziel;
  else
    update public.antwort set versteckt = true, beste = false where id = p_ziel returning * into a;
    if a.id is not null then
      update public.beitrag set geloest = false
       where id = a.beitrag_id and not exists
         (select 1 from public.antwort x where x.beitrag_id = a.beitrag_id and x.beste);
    end if;
  end if;
end $$;

create function public.mod_zeigen(p_art text, p_ziel uuid) returns void
language sql set search_path = '' as $$
  update public.beitrag set versteckt = false where p_art = 'beitrag' and id = p_ziel;
  update public.antwort set versteckt = false where p_art = 'antwort' and id = p_ziel;
$$;

create function public.mod_version_hoch(p_art text, p_ziel uuid) returns void
language sql set search_path = '' as $$
  update public.beitrag set mod_version = mod_version + 1 where p_art = 'beitrag' and id = p_ziel;
  update public.antwort set mod_version = mod_version + 1 where p_art = 'antwort' and id = p_ziel;
$$;

-- Dringlichkeit: 1 = hoch (persönliche Daten, Beleidigung), 2 = normal.
create function public.mod_stufe(p_grund text) returns smallint
language sql immutable set search_path = '' as $$
  select case when p_grund in ('persoenliche_daten', 'beleidigung') then 1 else 2 end::smallint;
$$;

-- Inhaltsänderungen erhöhen die Moderationsversion (P3); Antworten bekommen
-- dabei bearbeitet_am (B7).
create function public.inhalt_version() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_table_name = 'beitrag' then
    if (new.titel, new.text, new.lernfeld, new.kapitel, new.datei_pfad, new.an_mentoren)
       is distinct from (old.titel, old.text, old.lernfeld, old.kapitel, old.datei_pfad, old.an_mentoren) then
      new.mod_version := old.mod_version + 1;
    end if;
  elsif new.text is distinct from old.text then
    new.mod_version := old.mod_version + 1;
    new.bearbeitet_am := now();
  end if;
  return new;
end $$;

create trigger beitrag_inhalt_version before update on public.beitrag
  for each row execute function public.inhalt_version();

create trigger antwort_inhalt_version before update on public.antwort
  for each row execute function public.inhalt_version();

-- Protokoll unveränderlich; erlaubt ist nur das automatische Leeren von
-- akteur_id bei einer Kontolöschung.
create function public.protokoll_schutz() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and new.akteur_id is null and old.akteur_id is not null
     and (to_jsonb(new) - 'akteur_id') = (to_jsonb(old) - 'akteur_id') then
    return new;
  end if;
  raise exception 'Das Protokoll kann nicht geändert werden.';
end $$;
