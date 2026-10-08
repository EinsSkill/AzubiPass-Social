-- AzubiPass Social · aktionen_gruppen

create function public.gruppe_gruenden(p_name text, p_beschreibung text, p_offen boolean)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  neu uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
  end if;
  if (select count(*) from public.gruppe where erstellt_von = ich) >= 10 then
    raise exception 'Du hast schon 10 Gruppen gegründet. Mehr geht in der Beta nicht.';
  end if;

  insert into public.gruppe (name, beschreibung, offen, erstellt_von)
  values (btrim(p_name), coalesce(btrim(p_beschreibung), ''), coalesce(p_offen, false), ich)
  returning id into neu;

  insert into public.gruppe_code (gruppe_id, code) values (neu, public.zufallscode(8));
  insert into public.mitglied (gruppe_id, nutzer_id, rolle) values (neu, ich, 'leitung');
  return neu;
end;
$$;

create function public.gruppe_beitreten(p_code text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  g uuid;
begin
  if not public.ist_freigeschaltet() then
    raise exception 'Bitte zuerst ein Profil anlegen.';
  end if;
  select gruppe_id into g from public.gruppe_code
   where code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  if g is null then
    raise exception 'Zu diesem Code gibt es keine Gruppe.';
  end if;
  insert into public.mitglied (gruppe_id, nutzer_id) values (g, ich)
  on conflict do nothing;
  return g;
end;
$$;

-- Wer als letzte Leitung geht, übergibt an das am längsten dabei gebliebene
-- Mitglied. Sonst bliebe eine Gruppe ohne jemanden, der sie pflegen kann.
-- Geht das letzte Mitglied, verschwindet die Gruppe ganz.
create function public.gruppe_verlassen(p_gruppe uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  nachfolge uuid;
begin
  delete from public.mitglied where gruppe_id = p_gruppe and nutzer_id = ich;
  if not found then
    return;                             -- war gar nicht Mitglied
  end if;
  if not exists (select 1 from public.mitglied
                 where gruppe_id = p_gruppe and rolle = 'leitung') then
    select nutzer_id into nachfolge from public.mitglied
     where gruppe_id = p_gruppe order by beigetreten_am limit 1;
    if nachfolge is not null then
      update public.mitglied set rolle = 'leitung'
       where gruppe_id = p_gruppe and nutzer_id = nachfolge;
    else
      -- Niemand mehr da: Eine leere Gruppe würde unsichtbar weiterleben.
      delete from public.gruppe where id = p_gruppe;
    end if;
  end if;
end;
$$;
