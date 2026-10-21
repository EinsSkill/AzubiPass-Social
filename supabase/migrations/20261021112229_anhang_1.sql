-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 1: Anhänge als verbindliche Zuordnung.
-- Plan: doku/community/07-technik-plan-bilder.md (Fassung 2, B01: Schreibweg zuerst sichern).
-- public.anhang ist die Quelle für Dateien eines Beitrags (1–5, geordnet).
-- beitrag.datei_pfad/datei_art bleiben als Spiegel von Anhang 1 für alte App-Versionen.
-- Schreibschutz für alte Clients ab diesem Schritt: Jeder Beitrag mit datei_pfad bekommt
-- per Trigger sofort Anhang 1 – auch über den alten Ein-Datei-RPC und auch, wenn dessen
-- Aufruf schon lief (create trigger wartet auf laufende Schreibtransaktionen).

create table public.anhang (
  beitrag_id   uuid not null references public.beitrag (id) on delete cascade,
  position     smallint not null check (position between 1 and 5),
  pfad         text not null unique,
  art          text not null check (art in ('bild', 'pdf')),
  groesse      bigint not null check (groesse between 1 and 5242880),
  beschreibung text not null default '' check (char_length(beschreibung) <= 200),
  primary key (beitrag_id, position)
);

alter table public.anhang enable row level security;
-- Lesbar genau dann, wenn der Beitrag für die fragende Person sichtbar ist.
create policy "anhang: wenn der Beitrag sichtbar ist" on public.anhang
  for select to authenticated
  using (exists (select 1 from public.beitrag b where b.id = beitrag_id));
revoke all on public.anhang from anon, authenticated;
grant select on public.anhang to authenticated;

create function public.anhang_aus_spiegel() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.anhang (beitrag_id, position, pfad, art, groesse)
  select new.id, 1, new.datei_pfad, new.datei_art,
         greatest(1, least(5242880, coalesce((o.metadata->>'size')::bigint, 1)))
    from (select 1) x
    left join storage.objects o on o.bucket_id = 'lernzettel' and o.name = new.datei_pfad
  on conflict do nothing;
  return null;
end $$;
revoke all on function public.anhang_aus_spiegel() from public, anon, authenticated;

create trigger beitrag_anhang_aus_spiegel after insert on public.beitrag
  for each row when (new.datei_pfad is not null)
  execute function public.anhang_aus_spiegel();

-- Altbestand: jeder Ein-Datei-Beitrag bekommt seine Datei als Anhang 1.
-- Speicherobjekte werden wiederverwendet, nichts neu angelegt.
insert into public.anhang (beitrag_id, position, pfad, art, groesse)
select b.id, 1, b.datei_pfad, b.datei_art,
       greatest(1, least(5242880, coalesce((o.metadata->>'size')::bigint, 1)))
  from public.beitrag b
  left join storage.objects o on o.bucket_id = 'lernzettel' and o.name = b.datei_pfad
 where b.datei_pfad is not null
   and not exists (select 1 from public.anhang x where x.beitrag_id = b.id)
on conflict do nothing;
