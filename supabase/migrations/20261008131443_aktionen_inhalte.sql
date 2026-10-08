-- AzubiPass Social · aktionen_inhalte

-- Nur wer die Frage gestellt hat, markiert die beste Antwort. Ein zweiter
-- Tipp auf dieselbe Antwort nimmt die Markierung wieder weg.
create function public.beste_antwort(p_antwort uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  a public.antwort;
  b public.beitrag;
begin
  select * into a from public.antwort where id = p_antwort;
  if a.id is null then
    raise exception 'Diese Antwort gibt es nicht mehr.';
  end if;
  select * into b from public.beitrag where id = a.beitrag_id;
  if b.autor_id is distinct from ich then
    raise exception 'Nur wer gefragt hat, kann die beste Antwort wählen.';
  end if;
  if a.beste then
    update public.antwort set beste = false where id = a.id;
    update public.beitrag set geloest = false where id = b.id;
  else
    update public.antwort set beste = false where beitrag_id = b.id and beste;
    update public.antwort set beste = true where id = a.id;
    update public.beitrag set geloest = true where id = b.id;
  end if;
end;
$$;

-- Moderation: ausblenden statt löschen, damit eine Fehlentscheidung
-- rückgängig zu machen ist. Erledigt dabei die offenen Meldungen.
create function public.moderieren(p_art text, p_id uuid, p_versteckt boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.ist_team() then
    raise exception 'Nur das Team kann moderieren.';
  end if;
  if p_art = 'beitrag' then
    update public.beitrag set versteckt = p_versteckt where id = p_id;
    update public.meldung set status = 'erledigt' where beitrag_id = p_id and status = 'offen';
  elsif p_art = 'antwort' then
    update public.antwort set versteckt = p_versteckt where id = p_id;
    update public.meldung set status = 'erledigt' where antwort_id = p_id and status = 'offen';
  else
    raise exception 'Unbekannte Art: %', p_art;
  end if;
end;
$$;

-- Mentor:innen ernennt das Team. Die Rolle „team" selbst wird bewusst nicht
-- über die App vergeben, sondern nur direkt in der Datenbank.
create function public.rolle_setzen(p_nutzer uuid, p_rolle text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.ist_team() then
    raise exception 'Nur das Team kann Rollen vergeben.';
  end if;
  if p_rolle not in ('azubi', 'mentor') then
    raise exception 'Diese Rolle kann man hier nicht vergeben.';
  end if;
  if exists (select 1 from public.profil where id = p_nutzer and rolle = 'team') then
    raise exception 'Teamrollen ändert man nicht über die App.';
  end if;
  update public.profil set rolle = p_rolle where id = p_nutzer;
end;
$$;
