-- Spec 06 · Rechte, Altbestand (06-technik-plan.md §5, E10, E11, P6).

-- Alter Moderationsweg ohne Protokoll: für Konten gesperrt (B1). Das endgültige
-- Entfernen liegt in supabase/ausstehend/moderieren_entfernen.sql.
revoke all on function public.moderieren(text, uuid, boolean) from public, anon, authenticated;

-- E10: Das Team löscht keine fremden Inhalte mehr direkt.
alter policy "beitrag: eigenen oder als Team löschen" on public.beitrag
  using (autor_id = (select auth.uid()));

alter policy "beitrag: eigenen oder als Team löschen" on public.beitrag rename to "beitrag: eigenen löschen";

alter policy "antwort: eigene oder als Team löschen" on public.antwort
  using (autor_id = (select auth.uid()));

alter policy "antwort: eigene oder als Team löschen" on public.antwort rename to "antwort: eigene löschen";

-- E11: „gelöst“ nur über beste_antwort_setzen und die Moderation.
revoke update (geloest) on public.beitrag from authenticated;

-- P6: Antworten nur noch über antwort_senden (sperrt und prüft den Beitrag, R03).
revoke insert on public.antwort from authenticated;

-- Altbestand: früher ausgeblendete Inhalte ohne erfundene Person oder Zeit.
insert into public.ausblendung (beitrag_id, autor_id, quelle, erstellt_am)
select b.id, b.autor_id, 'altbestand', null from public.beitrag b
 where b.versteckt and not exists (select 1 from public.ausblendung x where x.beitrag_id = b.id and x.aufgehoben_am is null);

insert into public.ausblendung (antwort_id, autor_id, quelle, erstellt_am)
select a.id, a.autor_id, 'altbestand', null from public.antwort a
 where a.versteckt and not exists (select 1 from public.ausblendung x where x.antwort_id = a.id and x.aufgehoben_am is null);
