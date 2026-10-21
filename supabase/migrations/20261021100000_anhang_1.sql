-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 1: Anhänge als verbindliche Zuordnung.
-- Plan: doku/community/07-technik-plan-bilder.md.
-- public.anhang ist ab jetzt die einzige Quelle für Dateien eines Beitrags (1–5, geordnet).
-- beitrag.datei_pfad/datei_art bleiben nur als Spiegel des ersten Anhangs für alte
-- App-Versionen; geschrieben werden sie ausschließlich von den beiden
-- Veröffentlichungs-RPCs zusammen mit den Anhangszeilen (gleiche Transaktion).

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
-- Lesbar genau dann, wenn der Beitrag für die fragende Person sichtbar ist
-- (Regeln von public.beitrag in der Unterabfrage: Paket, Profil, Gruppe,
-- ausgeblendet nur Autor:in und Team).
create policy "anhang: wenn der Beitrag sichtbar ist" on public.anhang
  for select to authenticated
  using (exists (select 1 from public.beitrag b where b.id = beitrag_id));
revoke all on public.anhang from anon, authenticated;
grant select on public.anhang to authenticated;

-- Altbestand: jeder Ein-Datei-Beitrag bekommt seine Datei als Anhang 1.
-- Speicherobjekte werden wiederverwendet, nichts neu angelegt.
insert into public.anhang (beitrag_id, position, pfad, art, groesse)
select b.id, 1, b.datei_pfad, b.datei_art,
       greatest(1, least(5242880, coalesce((o.metadata->>'size')::bigint, 1)))
  from public.beitrag b
  left join storage.objects o on o.bucket_id = 'lernzettel' and o.name = b.datei_pfad
 where b.datei_pfad is not null
on conflict do nothing;

-- Feed und Detail: Anhänge als geordnete Liste (security_invoker: Regeln von anhang).
create or replace view public.beitrag_liste with (security_invoker = true) as
 select b.id, b.autor_id, b.gruppe_id, b.art, b.titel, b.text, b.lernfeld, b.kapitel,
        b.datei_pfad, b.datei_art, b.an_mentoren, b.geloest, b.versteckt, b.erstellt_am, b.bearbeitet_am,
        p.anzeigename as autor_name, p.rolle as autor_rolle, p.lehrjahr as autor_lehrjahr,
        g.name as gruppe_name,
        (select count(*) from public.antwort a where a.beitrag_id = b.id and not a.versteckt) as antworten,
        (select count(*) from public.hilfreich h where h.beitrag_id = b.id) as hilfreich_zahl,
        (exists (select 1 from public.hilfreich h where h.beitrag_id = b.id
                  and h.nutzer_id = (select auth.uid()))) as von_mir_hilfreich,
        b.beruf, p.beruf as autor_beruf,
        coalesce((select jsonb_agg(jsonb_build_object('position', x.position, 'pfad', x.pfad, 'art', x.art,
                                                      'beschreibung', x.beschreibung) order by x.position)
                    from public.anhang x where x.beitrag_id = b.id), '[]'::jsonb) as anhaenge
   from public.beitrag b
   join public.profil p on p.id = b.autor_id
   left join public.gruppe g on g.id = b.gruppe_id;

-- Speicher: fremde Dateien nur, wenn ein sichtbarer Beitrag sie als Anhang führt.
alter policy "lernzettel: sehen, wenn der Beitrag sichtbar ist" on storage.objects
  using (bucket_id = 'lernzettel'
         and (select public.ist_freigeschaltet())
         and (select public.beitraege_frei())
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.anhang a where a.pfad = objects.name)));

-- G06 für jede Datei: erst das Speicherobjekt sperren, dann die Verwendung prüfen.
create or replace function public.datei_in_gebrauch(p_pfad text) returns boolean
language plpgsql volatile security definer set search_path = '' as $$
begin
  if split_part(p_pfad, '/', 1) is distinct from (select auth.uid())::text then
    return false;
  end if;
  perform 1 from storage.objects
   where bucket_id = 'lernzettel' and name = p_pfad
     for update;
  return exists (select 1 from public.anhang where pfad = p_pfad)
      or exists (select 1 from public.beitrag where datei_pfad = p_pfad);
end $$;
