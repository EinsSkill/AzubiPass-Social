-- Beste Antwort (G05): gewünschten Zustand setzen statt umschalten. Eine
-- Wiederholung nach verlorener Bestätigung bewirkt nichts Gegenteiliges.
-- Die Zeilensperre auf dem Beitrag serialisiert gleichzeitige Aufrufe.
create function public.beste_antwort_setzen(p_antwort uuid, p_beste boolean) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  a public.antwort;
  b public.beitrag;
begin
  if not public.beitraege_frei() then
    raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.';
  end if;
  if p_beste is null then raise exception 'Gewünschter Zustand fehlt.'; end if;
  select * into a from public.antwort where id = p_antwort;
  if a.id is null then raise exception 'Diese Antwort gibt es nicht mehr.'; end if;
  select * into b from public.beitrag where id = a.beitrag_id for update;
  if b.autor_id is distinct from ich then
    raise exception 'Nur wer gefragt hat, kann die beste Antwort wählen.';
  end if;
  if b.art <> 'frage' then raise exception 'Eine beste Antwort gibt es nur bei Fragen.'; end if;
  select * into a from public.antwort where id = p_antwort;          -- nach der Sperre neu lesen
  if a.id is null then raise exception 'Diese Antwort gibt es nicht mehr.'; end if;
  if a.beste = p_beste then return p_beste; end if;                   -- schon so: nichts tun
  if p_beste then
    if b.versteckt or a.versteckt then
      raise exception 'Ausgeblendete Inhalte können nicht als beste Antwort markiert werden.';
    end if;
    update public.antwort set beste = false where beitrag_id = b.id and beste;
    update public.antwort set beste = true  where id = a.id;
    update public.beitrag set geloest = true where id = b.id;
  else
    update public.antwort set beste = false where id = a.id;
    update public.beitrag set geloest = false where id = b.id;
  end if;
  return p_beste;
end $$;

revoke all on function public.beste_antwort_setzen(uuid, boolean) from public, anon;
grant execute on function public.beste_antwort_setzen(uuid, boolean) to authenticated;

-- Alter Umschalt-Weg: für Konten nicht mehr aufrufbar. Das endgültige Entfernen
-- (drop) braucht eine eigene Bestätigung: supabase/ausstehend/beste_antwort_entfernen.sql
revoke all on function public.beste_antwort(uuid) from public, anon, authenticated;
