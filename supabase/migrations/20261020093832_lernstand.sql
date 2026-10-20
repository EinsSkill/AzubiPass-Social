-- AzubiPass Social · Lernstand am Konto (20.10.2026, Lukes: „alles über den Account speichern“).
-- Ein Eintrag je Konto: der ganze Lernstand aus kern.js als JSON, dazu eine
-- Versionsnummer für den Abgleich mehrerer Geräte. Schreiben nur über
-- lernstand_speichern (Vergleich mit der Basisversion, kein blindes Überschreiben).
create table public.lernstand (
  nutzer_id uuid primary key references auth.users (id) on delete cascade,
  daten jsonb not null,
  version integer not null default 1 check (version >= 1),
  geaendert_am timestamptz not null default now(),
  constraint lernstand_objekt check (jsonb_typeof(daten) = 'object'),
  constraint lernstand_groesse check (octet_length(daten::text) <= 1000000)
);

alter table public.lernstand enable row level security;

create policy lernstand_eigen_lesen on public.lernstand
  for select to authenticated using (nutzer_id = (select auth.uid()));

revoke all on public.lernstand from anon, authenticated;
grant select on public.lernstand to authenticated;

-- Ergebnis: {"ok": true, "version": n}
--        oder {"ok": false, "version": n|null, "daten": …} – der Server hat inzwischen
--        einen anderen Stand; der Client führt zusammen und versucht es mit dieser Basis erneut.
create or replace function public.lernstand_speichern(p_daten jsonb, p_basis integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  u uuid := auth.uid();
  v integer;
  d jsonb;
begin
  if u is null then
    raise exception 'Bitte melde dich an.' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profil p where p.id = u) then
    raise exception 'Lege zuerst dein Community-Profil an.' using errcode = 'P0001';
  end if;
  if p_daten is null or jsonb_typeof(p_daten) <> 'object' then
    raise exception 'Der Lernstand ist ungültig.' using errcode = '22023';
  end if;
  if octet_length(p_daten::text) > 1000000 then
    raise exception 'Der Lernstand ist zu groß zum Speichern.' using errcode = '22023';
  end if;

  select l.version, l.daten into v, d from public.lernstand l where l.nutzer_id = u for update;

  if not found then
    if coalesce(p_basis, 0) <> 0 then
      return jsonb_build_object('ok', false, 'version', null, 'daten', null);
    end if;
    insert into public.lernstand (nutzer_id, daten) values (u, p_daten)
      on conflict (nutzer_id) do nothing;
    if not found then
      -- Ein anderes Gerät war im selben Moment schneller.
      select l.version, l.daten into v, d from public.lernstand l where l.nutzer_id = u;
      return jsonb_build_object('ok', false, 'version', v, 'daten', d);
    end if;
    return jsonb_build_object('ok', true, 'version', 1);
  end if;

  if p_basis is distinct from v then
    return jsonb_build_object('ok', false, 'version', v, 'daten', d);
  end if;

  update public.lernstand
     set daten = p_daten, version = v + 1, geaendert_am = now()
   where nutzer_id = u;
  return jsonb_build_object('ok', true, 'version', v + 1);
end;
$$;

revoke all on function public.lernstand_speichern(jsonb, integer) from public, anon;
grant execute on function public.lernstand_speichern(jsonb, integer) to authenticated;
