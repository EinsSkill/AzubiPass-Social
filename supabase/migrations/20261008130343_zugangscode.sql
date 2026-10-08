-- AzubiPass Social · Community-Grundgerüst
-- ---------------------------------------------------------------------------
-- Lerngruppen, Beiträge (Lernzettel, Fragen, Tipps), Antworten, „Hilfreich",
-- Wochenaufgaben, Meldungen und Profile.
--
-- Grundsatz: Alles liegt hinter Row Level Security. Wer sich angemeldet hat,
-- aber noch kein Profil mit gültigem Zugangscode angelegt hat, sieht nichts.
-- Schreibrechte sind zusätzlich auf einzelne Spalten begrenzt, damit niemand
-- über die offene Schnittstelle Felder wie „rolle" oder „versteckt" setzt.
--
-- Alle Funktionen mit erhöhten Rechten (security definer) haben einen leeren
-- search_path und sprechen Tabellen nur voll qualifiziert an.

create table public.zugangscode (
  code          text primary key check (code ~ '^[A-Z0-9-]{6,32}$'),
  bezeichnung   text not null,
  aktiv         boolean not null default true,
  max_nutzungen integer check (max_nutzungen > 0),
  genutzt       integer not null default 0,
  erstellt_am   timestamptz not null default now()
);
comment on table public.zugangscode is
  'Beta-Zugang. Nur über profil_anlegen() erreichbar, nie direkt lesbar.';
alter table public.zugangscode enable row level security;
