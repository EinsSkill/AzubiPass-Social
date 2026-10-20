-- Beruf (Lukes, 20.10.2026): Industriekaufleute wählen „ik“ und ordnen Beiträge
-- eigenen Lernfeldern zu. Kennungen bleiben lf1–lf12; die Berufsspalte am
-- Beitrag entscheidet, zu welchem Katalog sie gehören. Kapitel gibt es nur
-- für Büromanagement (kfb), solange keine IK-Lerninhalte in der App sind.

alter table public.profil add column beruf text not null default 'kfb'
  check (beruf in ('kfb', 'ik'));
alter table public.beitrag add column beruf text not null default 'kfb'
  check (beruf in ('kfb', 'ik'));
alter table public.beitrag add constraint beitrag_ik_ohne_kapitel
  check (beruf = 'kfb' or kapitel is null);

grant select (beruf), update (beruf) on public.profil to authenticated;
grant select (beruf) on public.beitrag to authenticated;

-- Der Beitrag übernimmt beim Anlegen den Beruf seiner Autorin/seines Autors.
create function public.beitrag_beruf_setzen() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  new.beruf := coalesce((select p.beruf from public.profil p where p.id = new.autor_id), 'kfb');
  return new;
end $$;

revoke all on function public.beitrag_beruf_setzen() from public, anon, authenticated;

create trigger beitrag_beruf before insert on public.beitrag
  for each row execute function public.beitrag_beruf_setzen();

create or replace view public.beitrag_liste with (security_invoker = true) as
 select b.id, b.autor_id, b.gruppe_id, b.art, b.titel, b.text, b.lernfeld, b.kapitel,
        b.datei_pfad, b.datei_art, b.an_mentoren, b.geloest, b.versteckt, b.erstellt_am, b.bearbeitet_am,
        p.anzeigename as autor_name, p.rolle as autor_rolle, p.lehrjahr as autor_lehrjahr,
        g.name as gruppe_name,
        (select count(*) from public.antwort a where a.beitrag_id = b.id and not a.versteckt) as antworten,
        (select count(*) from public.hilfreich h where h.beitrag_id = b.id) as hilfreich_zahl,
        (exists (select 1 from public.hilfreich h where h.beitrag_id = b.id
                  and h.nutzer_id = (select auth.uid()))) as von_mir_hilfreich,
        b.beruf, p.beruf as autor_beruf
   from public.beitrag b
   join public.profil p on p.id = b.autor_id
   left join public.gruppe g on g.id = b.gruppe_id;
