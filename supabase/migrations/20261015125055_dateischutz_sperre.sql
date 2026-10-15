-- G06 (Technikplan 05-technik-plan-g06.md, freigegeben 15.10.2026):
-- 1. Löschschutz: erst das Speicherobjekt sperren, dann die Verwendung prüfen.
--    Eine laufende Veröffentlichung hält die Zeile per FOR SHARE; die Prüfung
--    wartet darauf und liest danach in einer neuen Anweisung den festgeschriebenen
--    Stand. Der frühere Kommentar („volatile genügt“) war falsch.
-- 2. Direkter Beitrags-Insert nur noch für Gruppen-Textbeiträge ohne Datei.
--    Allgemeine Beiträge und alles mit Datei nur über beitrag_veroeffentlichen.
create or replace function public.datei_in_gebrauch(p_pfad text) returns boolean
language plpgsql volatile security definer set search_path = '' as $$
begin
  if split_part(p_pfad, '/', 1) is distinct from (select auth.uid())::text then
    return false;
  end if;
  perform 1 from storage.objects
   where bucket_id = 'lernzettel' and name = p_pfad
     for update;
  return exists (select 1 from public.beitrag where datei_pfad = p_pfad);
end $$;

revoke all on function public.datei_in_gebrauch(text) from public, anon;
grant execute on function public.datei_in_gebrauch(text) to authenticated;

alter policy "beitrag: selbst veröffentlichen" on public.beitrag
  with check ((select public.ist_freigeschaltet())
              and (select public.beitraege_frei())
              and autor_id = (select auth.uid())
              and not versteckt and not geloest
              and gruppe_id is not null
              and public.ist_mitglied(gruppe_id)
              and datei_pfad is null and datei_art is null);
