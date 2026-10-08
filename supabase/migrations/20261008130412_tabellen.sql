-- AzubiPass Social · Tabellen
-- Alle Tabellen der Community. Row Level Security ist sofort an; die Regeln
-- folgen in einer eigenen Migration. Ohne Regeln sieht niemand etwas.

create table public.profil (
  id            uuid primary key references auth.users (id) on delete cascade,
  anzeigename   text not null check (char_length(btrim(anzeigename)) between 2 and 30),
  lehrjahr      smallint check (lehrjahr between 1 and 3),
  ueber_mich    text not null default '' check (char_length(ueber_mich) <= 280),
  rolle         text not null default 'azubi' check (rolle in ('azubi', 'mentor', 'team')),
  zugang        text references public.zugangscode (code) on delete set null,
  mindestens_16 boolean not null check (mindestens_16),
  regeln_am     timestamptz not null default now(),
  erstellt_am   timestamptz not null default now()
);
create unique index profil_anzeigename_eindeutig on public.profil (lower(btrim(anzeigename)));

create table public.gruppe (
  id            uuid primary key default gen_random_uuid(),
  name          text not null check (char_length(btrim(name)) between 3 and 60),
  beschreibung  text not null default '' check (char_length(beschreibung) <= 500),
  offen         boolean not null default false,
  erstellt_von  uuid default auth.uid() references public.profil (id) on delete set null,
  erstellt_am   timestamptz not null default now()
);

-- Der Einladungscode steht in einer eigenen Tabelle: Eine offene Gruppe ist
-- für alle sichtbar, ihr Code aber nur für Mitglieder.
create table public.gruppe_code (
  gruppe_id     uuid primary key references public.gruppe (id) on delete cascade,
  code          text not null unique
);

create table public.mitglied (
  gruppe_id      uuid not null references public.gruppe (id) on delete cascade,
  nutzer_id      uuid not null default auth.uid() references public.profil (id) on delete cascade,
  rolle          text not null default 'mitglied' check (rolle in ('leitung', 'mitglied')),
  beigetreten_am timestamptz not null default now(),
  primary key (gruppe_id, nutzer_id)
);
create index mitglied_nutzer on public.mitglied (nutzer_id);

create table public.beitrag (
  id            uuid primary key default gen_random_uuid(),
  autor_id      uuid not null default auth.uid() references public.profil (id) on delete cascade,
  gruppe_id     uuid references public.gruppe (id) on delete cascade,   -- null = für alle
  art           text not null check (art in ('lernzettel', 'frage', 'tipp')),
  titel         text not null check (char_length(btrim(titel)) between 3 and 120),
  text          text not null default '' check (char_length(text) <= 4000),
  lernfeld      text check (lernfeld ~ '^(lf([1-9]|1[0-3])|buchfuehrung)$'),
  kapitel       text check (kapitel ~ '^k[1-9][0-9]?$'),
  datei_pfad    text unique,
  datei_art     text check (datei_art in ('bild', 'pdf')),
  an_mentoren   boolean not null default false,
  geloest       boolean not null default false,
  versteckt     boolean not null default false,
  erstellt_am   timestamptz not null default now(),
  bearbeitet_am timestamptz,
  check ((datei_pfad is null) = (datei_art is null)),
  check (kapitel is null or lernfeld is not null)
);
create index beitrag_neueste on public.beitrag (erstellt_am desc);
create index beitrag_gruppe on public.beitrag (gruppe_id, erstellt_am desc);
create index beitrag_autor on public.beitrag (autor_id);

create table public.antwort (
  id            uuid primary key default gen_random_uuid(),
  beitrag_id    uuid not null references public.beitrag (id) on delete cascade,
  autor_id      uuid not null default auth.uid() references public.profil (id) on delete cascade,
  text          text not null check (char_length(btrim(text)) between 1 and 2000),
  beste         boolean not null default false,
  versteckt     boolean not null default false,
  erstellt_am   timestamptz not null default now()
);
create index antwort_beitrag on public.antwort (beitrag_id, erstellt_am);
create index antwort_autor on public.antwort (autor_id);
create unique index antwort_eine_beste on public.antwort (beitrag_id) where beste;

create table public.hilfreich (
  beitrag_id    uuid not null references public.beitrag (id) on delete cascade,
  nutzer_id     uuid not null default auth.uid() references public.profil (id) on delete cascade,
  erstellt_am   timestamptz not null default now(),
  primary key (beitrag_id, nutzer_id)
);
create index hilfreich_nutzer on public.hilfreich (nutzer_id);

create table public.wochenaufgabe (
  id            uuid primary key default gen_random_uuid(),
  gruppe_id     uuid references public.gruppe (id) on delete cascade,   -- null = für alle
  titel         text not null check (char_length(btrim(titel)) between 3 and 120),
  beschreibung  text not null default '' check (char_length(beschreibung) <= 1000),
  lernfeld      text check (lernfeld ~ '^(lf([1-9]|1[0-3])|buchfuehrung)$'),
  kapitel       text check (kapitel ~ '^k[1-9][0-9]?$'),
  beginn        date not null default current_date,
  ende          date not null default (current_date + 6),
  erstellt_von  uuid default auth.uid() references public.profil (id) on delete set null,
  erstellt_am   timestamptz not null default now(),
  check (ende >= beginn and ende <= beginn + 31),
  check (kapitel is null or lernfeld is not null)
);
create index wochenaufgabe_gruppe on public.wochenaufgabe (gruppe_id, ende desc);
create index wochenaufgabe_ersteller on public.wochenaufgabe (erstellt_von);

create table public.erledigt (
  aufgabe_id    uuid not null references public.wochenaufgabe (id) on delete cascade,
  nutzer_id     uuid not null default auth.uid() references public.profil (id) on delete cascade,
  erledigt_am   timestamptz not null default now(),
  primary key (aufgabe_id, nutzer_id)
);
create index erledigt_nutzer on public.erledigt (nutzer_id);

create table public.meldung (
  id            uuid primary key default gen_random_uuid(),
  melder_id     uuid not null default auth.uid() references public.profil (id) on delete cascade,
  beitrag_id    uuid references public.beitrag (id) on delete cascade,
  antwort_id    uuid references public.antwort (id) on delete cascade,
  grund         text not null check (grund in ('falsch', 'urheberrecht', 'beleidigung',
                                               'spam', 'persoenliche_daten', 'sonstiges')),
  hinweis       text not null default '' check (char_length(hinweis) <= 500),
  status        text not null default 'offen' check (status in ('offen', 'erledigt')),
  erstellt_am   timestamptz not null default now(),
  check (num_nonnulls(beitrag_id, antwort_id) = 1)
);
create unique index meldung_einmal_beitrag on public.meldung (melder_id, beitrag_id)
  where beitrag_id is not null;
create unique index meldung_einmal_antwort on public.meldung (melder_id, antwort_id)
  where antwort_id is not null;
create index meldung_beitrag on public.meldung (beitrag_id);
create index meldung_antwort on public.meldung (antwort_id);

-- Row Level Security sofort an: Ohne Regeln sieht niemand etwas.
alter table public.profil        enable row level security;
alter table public.gruppe        enable row level security;
alter table public.gruppe_code   enable row level security;
alter table public.mitglied      enable row level security;
alter table public.beitrag       enable row level security;
alter table public.antwort       enable row level security;
alter table public.hilfreich     enable row level security;
alter table public.wochenaufgabe enable row level security;
alter table public.erledigt      enable row level security;
alter table public.meldung       enable row level security;
