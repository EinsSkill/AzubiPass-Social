-- AzubiPass Social · sichten

-- ============================================================== Sichten
-- security_invoker: Die Sicht rechnet mit den Rechten der fragenden Person,
-- die Regeln der Tabellen gelten also auch hier.

create view public.beitrag_liste with (security_invoker = true) as
select b.*,
       p.anzeigename as autor_name,
       p.rolle       as autor_rolle,
       p.lehrjahr    as autor_lehrjahr,
       g.name        as gruppe_name,
       (select count(*) from public.antwort a
         where a.beitrag_id = b.id and not a.versteckt)          as antworten,
       (select count(*) from public.hilfreich h
         where h.beitrag_id = b.id)                              as hilfreich_zahl,
       exists (select 1 from public.hilfreich h
                where h.beitrag_id = b.id
                  and h.nutzer_id = (select auth.uid()))         as von_mir_hilfreich
  from public.beitrag b
  join public.profil p on p.id = b.autor_id
  left join public.gruppe g on g.id = b.gruppe_id;

create view public.gruppe_liste with (security_invoker = true) as
select g.*,
       (select count(*) from public.mitglied m where m.gruppe_id = g.id) as mitglieder,
       (select m.rolle from public.mitglied m
         where m.gruppe_id = g.id and m.nutzer_id = (select auth.uid())) as meine_rolle
  from public.gruppe g;

create view public.aufgabe_liste with (security_invoker = true) as
select a.*,
       g.name as gruppe_name,
       (select count(*) from public.erledigt e where e.aufgabe_id = a.id) as erledigt_zahl,
       exists (select 1 from public.erledigt e
                where e.aufgabe_id = a.id
                  and e.nutzer_id = (select auth.uid()))                 as von_mir_erledigt
  from public.wochenaufgabe a
  left join public.gruppe g on g.id = a.gruppe_id;
