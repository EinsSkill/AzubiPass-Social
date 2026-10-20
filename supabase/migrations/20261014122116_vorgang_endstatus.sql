-- Endstatus pro Vorgangskennung (G03, Technik-Plan 05-Korrekturen, freigegeben 14.10.2026).
-- Wer zuerst einträgt, gewinnt: Das Senden trägt 'angelegt' ein, die Klärung
-- 'verworfen'. Der Primärschlüssel serialisiert gleichzeitige Aufrufe, sodass ein
-- verworfener Vorgang nie mehr veröffentlicht werden kann.
create table public.vorgang (
  id          uuid primary key,
  autor_id    uuid not null references auth.users on delete cascade,
  art         text not null check (art in ('beitrag', 'antwort')),
  zustand     text not null check (zustand in ('angelegt', 'verworfen')),
  erstellt_am timestamptz not null default now()
);
alter table public.vorgang enable row level security;   -- keine Regeln: nur über Funktionen
revoke all on public.vorgang from anon, authenticated;

-- Klärt einen offenen Vorgang endgültig: 'angelegt' (Inhalt existiert oder
-- wird gerade festgeschrieben) oder 'verworfen' (kann nie mehr ankommen).
-- Prüft die Paketsperre bewusst nicht: Klären legt keine Inhalte an.
create function public.vorgang_klaeren(p_vorgang uuid, p_art text) returns text
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  v public.vorgang;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if p_vorgang is null or p_art is null or p_art not in ('beitrag', 'antwort') then
    raise exception 'Vorgangskennung fehlt.';
  end if;
  -- Inhalte aus der Zeit vor dieser Tabelle haben keine Vorgangszeile.
  insert into public.vorgang (id, autor_id, art, zustand)
  values (p_vorgang, ich, p_art,
          case when (p_art = 'beitrag' and exists (select 1 from public.beitrag where id = p_vorgang and autor_id = ich))
                 or (p_art = 'antwort' and exists (select 1 from public.antwort where id = p_vorgang and autor_id = ich))
               then 'angelegt' else 'verworfen' end)
  on conflict (id) do nothing;
  select * into v from public.vorgang where id = p_vorgang;
  if v.autor_id is distinct from ich or v.art is distinct from p_art then
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;
  return v.zustand;
end $$;

-- Zeigt ein Beitrag auf diese Datei im eigenen Ordner? Volatile, damit die
-- Löschregel nach einer Sperrwartezeit den neu festgeschriebenen Beitrag sieht.
-- Security definer: auch bei geschlossener Paketsperre wirksam.
create function public.datei_in_gebrauch(p_pfad text) returns boolean
language sql volatile security definer set search_path = '' as $$
  select split_part(p_pfad, '/', 1) = (select auth.uid())::text
     and exists (select 1 from public.beitrag where datei_pfad = p_pfad);
$$;

alter policy "lernzettel: eigene löschen" on storage.objects
  using (bucket_id = 'lernzettel'
         and (storage.foldername(name))[1] = (select auth.uid())::text
         and not public.datei_in_gebrauch(name));

revoke all on function public.vorgang_klaeren(uuid, text) from public, anon;
revoke all on function public.datei_in_gebrauch(text) from public, anon;
grant execute on function public.vorgang_klaeren(uuid, text) to authenticated;
grant execute on function public.datei_in_gebrauch(text) to authenticated;
