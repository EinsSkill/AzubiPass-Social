-- AzubiPass Social · hilfsfunktionen

-- ============================================================== Hilfsfunktionen
-- security definer, damit die Prüfung „bin ich Mitglied?" nicht selbst wieder
-- unter die Regeln der Mitgliedertabelle fällt (sonst Endlosschleife).

create function public.ist_freigeschaltet() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profil where id = (select auth.uid()));
$$;

create function public.ist_team() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profil
                 where id = (select auth.uid()) and rolle = 'team');
$$;

create function public.ist_mitglied(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.mitglied
                 where gruppe_id = g and nutzer_id = (select auth.uid()));
$$;

create function public.ist_leitung(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.mitglied
                 where gruppe_id = g and nutzer_id = (select auth.uid())
                   and rolle = 'leitung');
$$;

-- Gut lesbare Codes ohne 0/O und 1/I, aus echten Zufallsbytes.
create function public.zufallscode(laenge integer) returns text
language sql volatile set search_path = '' as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
                           1 + (get_byte(z.b, i) % 32), 1), '' order by i)
  from (select extensions.gen_random_bytes(laenge) as b) z,
       generate_series(0, laenge - 1) as i;
$$;
