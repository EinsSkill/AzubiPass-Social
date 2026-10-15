-- Spec 06 · Moderation: Tabellen (06-technik-plan.md §2, freigegeben 15.10.2026).
-- Alle neuen Tabellen: RLS an, keine Rechte für Konten – Zugriff nur über Funktionen.

-- Aktive Ausblendungsentscheidung: stabile Referenz für Prüfanfragen (D09).
create table public.ausblendung (
  id                uuid primary key default gen_random_uuid(),
  beitrag_id        uuid references public.beitrag (id) on delete cascade,
  antwort_id        uuid references public.antwort (id) on delete cascade,
  autor_id          uuid not null references public.profil (id) on delete cascade,
  quelle            text not null check (quelle in ('automatisch', 'team', 'altbestand')),
  erstellt_am       timestamptz,                       -- null nur bei altbestand
  erstellt_von      uuid references public.profil (id) on delete set null,
  bestaetigt_am     timestamptz,
  bestaetigt_von    uuid references public.profil (id) on delete set null,
  kategorie         text check (kategorie in ('falsch', 'urheberrecht', 'beleidigung',
                                              'spam', 'persoenliche_daten', 'sonstiges')),
  begruendung_autor text check (char_length(begruendung_autor) between 1 and 500),
  aufgehoben_am     timestamptz,
  aufgehoben_durch  uuid,
  check (num_nonnulls(beitrag_id, antwort_id) = 1),
  check (bestaetigt_am is null or begruendung_autor is not null),
  check ((quelle = 'altbestand') = (erstellt_am is null))
);

create unique index ausblendung_aktiv_beitrag on public.ausblendung (beitrag_id)
  where aufgehoben_am is null and beitrag_id is not null;

create unique index ausblendung_aktiv_antwort on public.ausblendung (antwort_id)
  where aufgehoben_am is null and antwort_id is not null;

create index ausblendung_autor on public.ausblendung (autor_id);

create index ausblendung_beitrag on public.ausblendung (beitrag_id);

create index ausblendung_antwort on public.ausblendung (antwort_id);

-- Eine Prüfanfrage je Ausblendungsentscheidung (unique), id = Vorgangskennung.
create table public.pruefanfrage (
  id                   uuid primary key,
  ausblendung_id       uuid not null unique references public.ausblendung (id) on delete cascade,
  autor_id             uuid not null references public.profil (id) on delete cascade,
  begruendung          text not null check (char_length(begruendung) between 1 and 500),
  erstellt_am          timestamptz not null default now(),
  status               text not null default 'offen' check (status in ('offen', 'abgeschlossen')),
  ergebnis             text check (ergebnis in ('aufgehoben', 'bestaetigt')),
  ergebnis_begruendung text check (char_length(ergebnis_begruendung) between 1 and 500),
  abgeschlossen_am     timestamptz,
  entscheidung_id      uuid,
  check ((status = 'offen') = (ergebnis is null))
);

create index pruefanfrage_autor on public.pruefanfrage (autor_id);

-- Protokoll: nur anhängen. Ziel ohne Fremdschlüssel, damit es Löschungen überlebt.
create table public.moderation_entscheidung (
  id                   uuid primary key,
  beitrag_id           uuid,
  antwort_id           uuid,
  aktion               text not null check (aktion in ('ausblenden', 'weiter_ausblenden', 'einblenden',
                         'sichtbar_lassen', 'korrektur', 'anfrage_aufheben', 'anfrage_bestaetigen',
                         'erklaerung_aendern', 'automatisch_ausgeblendet')),
  vorher_versteckt     boolean not null,
  nachher_versteckt    boolean not null,
  akteur               text not null check (akteur in ('team', 'automatik')),
  akteur_id            uuid references public.profil (id) on delete set null,
  zeit                 timestamptz not null default now(),
  interne_begruendung  text check (char_length(interne_begruendung) between 1 and 500),
  autor_text           text,
  ausblendung_id       uuid,
  pruefanfrage_id      uuid,
  korrektur_antwort_id uuid,
  meldungen            uuid[] not null default '{}',
  alte_erklaerung      text,
  check (num_nonnulls(beitrag_id, antwort_id) = 1),
  check (akteur = 'automatik' or interne_begruendung is not null)
);

create index moderation_entscheidung_zeit on public.moderation_entscheidung (zeit desc, id desc);

create index moderation_entscheidung_akteur on public.moderation_entscheidung (akteur_id);
