-- Vorlagen für Begründungen (Startbestand unten; Verwaltung später, E5).
create table public.begruendung_vorlage (
  id            text primary key,
  gruppe        text not null check (gruppe in ('ausblendung', 'pruefergebnis')),
  kategorie     text not null,
  titel         text not null,
  text          text not null default '' check (char_length(text) <= 500),
  aktiv         boolean not null default true,
  reihenfolge   smallint not null default 0,
  geaendert_am  timestamptz not null default now()
);

alter table public.meldung
  add column erledigt_durch uuid,
  add column erledigt_am    timestamptz;

alter table public.antwort
  add column team_korrektur   boolean not null default false,
  add column bezug_antwort_id uuid references public.antwort (id) on delete set null,
  add column bearbeitet_am    timestamptz,
  add column mod_version      integer not null default 0;

alter table public.beitrag
  add column mod_version integer not null default 0;

create index antwort_bezug on public.antwort (bezug_antwort_id);

create index meldung_melder on public.meldung (melder_id, erstellt_am);

alter table public.vorgang drop constraint vorgang_art_check;

alter table public.vorgang add constraint vorgang_art_check
  check (art in ('beitrag', 'antwort', 'entscheidung', 'pruefanfrage'));

alter table public.ausblendung             enable row level security;

alter table public.pruefanfrage            enable row level security;

alter table public.moderation_entscheidung enable row level security;

alter table public.begruendung_vorlage     enable row level security;

revoke all on public.ausblendung, public.pruefanfrage, public.moderation_entscheidung,
              public.begruendung_vorlage from anon, authenticated;

insert into public.begruendung_vorlage (id, gruppe, kategorie, titel, text, reihenfolge) values
 ('beleidigung', 'ausblendung', 'beleidigung', 'Beleidigung',
  'Dein Inhalt wurde ausgeblendet, weil er andere Personen beleidigt oder herabsetzt. Bitte bleib bei sachlicher und respektvoller Kritik.', 1),
 ('persoenliche_daten', 'ausblendung', 'persoenliche_daten', 'Persönliche Daten',
  'Dein Inhalt wurde ausgeblendet, weil er persönliche oder vertrauliche Daten anderer enthält. Solche Daten gehören nicht in die Community.', 2),
 ('urheberrecht', 'ausblendung', 'urheberrecht', 'Urheberrecht',
  'Dein Inhalt wurde ausgeblendet, weil Zweifel bestehen, ob du ihn hier teilen darfst. Bitte teile nur Inhalte, für die du die nötigen Rechte hast.', 3),
 ('spam', 'ausblendung', 'spam', 'Spam',
  'Dein Inhalt wurde ausgeblendet, weil er Werbung, Spam oder wiederholt denselben Inhalt enthält. Beiträge sollen beim Lernen und in der Ausbildung helfen.', 4),
 ('falsch', 'ausblendung', 'falsch', 'Fachlich falsch',
  'Dein Inhalt wurde ausgeblendet, weil die fachliche Aussage hier besonders irreführend ist. Die betroffene Stelle: …', 5),
 ('sonstiges', 'ausblendung', 'sonstiges', 'Sonstiges', '', 6),
 ('ergebnis_aufgehoben', 'pruefergebnis', 'aufgehoben', 'Ausblendung aufheben',
  'Wir haben deinen Inhalt erneut geprüft. Die Ausblendung ist aufgehoben.', 1),
 ('ergebnis_bestaetigt', 'pruefergebnis', 'bestaetigt', 'Ausblendung bestätigen',
  'Wir haben deinen Inhalt erneut geprüft. Die Ausblendung bleibt bestehen. Grund: …', 2);
