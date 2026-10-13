-- Beste Antwort (Spec 05): nur bei Fragen; setzen nur bei sichtbarer Frage und
-- sichtbarer Antwort; Zurücknehmen bleibt möglich. Paketsperre gilt.
create or replace function public.beste_antwort(p_antwort uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  a public.antwort;
  b public.beitrag;
begin
  if not public.beitraege_frei() then
    raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.';
  end if;
  select * into a from public.antwort where id = p_antwort;
  if a.id is null then
    raise exception 'Diese Antwort gibt es nicht mehr.';
  end if;
  select * into b from public.beitrag where id = a.beitrag_id;
  if b.autor_id is distinct from ich then
    raise exception 'Nur wer gefragt hat, kann die beste Antwort wählen.';
  end if;
  if b.art <> 'frage' then
    raise exception 'Eine beste Antwort gibt es nur bei Fragen.';
  end if;
  if a.beste then
    update public.antwort set beste = false where id = a.id;
    update public.beitrag set geloest = false where id = b.id;
  else
    if b.versteckt or a.versteckt then
      raise exception 'Ausgeblendete Inhalte können nicht als beste Antwort markiert werden.';
    end if;
    update public.antwort set beste = false where beitrag_id = b.id and beste;
    update public.antwort set beste = true where id = a.id;
    update public.beitrag set geloest = true where id = b.id;
  end if;
end;
$$;
