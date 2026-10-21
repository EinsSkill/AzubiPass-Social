-- AzubiPass Social · Bilder im Feed (Spec 07), Teil 2: Lesesicht und Löschschutz.

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
