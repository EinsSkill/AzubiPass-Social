-- Paketsperre Beiträge (Spec 05, Entscheidung 13.10.2026): startet geschlossen.
create table public.freigabe (
  schalter     text primary key,
  offen        boolean not null default false,
  geaendert_am timestamptz not null default now()
);
insert into public.freigabe (schalter, offen) values ('beitraege', false);
alter table public.freigabe enable row level security;
create policy "freigabe: lesen" on public.freigabe for select to authenticated using (true);
revoke all on public.freigabe from anon, authenticated;
grant select on public.freigabe to authenticated;

create table public.beitraege_tester (
  nutzer_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.beitraege_tester enable row level security;
revoke all on public.beitraege_tester from anon, authenticated;

create function public.beitraege_frei() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select offen from public.freigabe where schalter = 'beitraege'), false)
      or exists (select 1 from public.beitraege_tester where nutzer_id = (select auth.uid()));
$$;
revoke all on function public.beitraege_frei() from public, anon;
grant execute on function public.beitraege_frei() to authenticated;

insert into public.beitraege_tester (nutzer_id)
select id from auth.users where email in
  ('demo-anna@azubipass.invalid', 'demo-ben@azubipass.invalid', 'test-neu1@azubipass.invalid');
