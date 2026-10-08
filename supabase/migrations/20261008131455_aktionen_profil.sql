-- AzubiPass Social · aktionen_profil

create function public.profil_anlegen(
  p_anzeigename text, p_lehrjahr smallint, p_code text,
  p_mindestens_16 boolean, p_regeln boolean
) returns public.profil
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
  zc public.zugangscode;
  neu public.profil;
begin
  if ich is null then
    raise exception 'Bitte zuerst anmelden.';
  end if;
  if exists (select 1 from public.profil where id = ich) then
    raise exception 'Du hast schon ein Profil.';
  end if;
  if coalesce(p_mindestens_16, false) is not true then
    raise exception 'Die Community ist erst ab 16 Jahren.';
  end if;
  if coalesce(p_regeln, false) is not true then
    raise exception 'Bitte bestätige die Community-Regeln.';
  end if;

  -- Bindestriche und Leerzeichen sind beim Abtippen egal.
  select * into zc from public.zugangscode
   where replace(code, '-', '') = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
   for update;
  if zc.code is null or not zc.aktiv
     or (zc.max_nutzungen is not null and zc.genutzt >= zc.max_nutzungen) then
    raise exception 'Der Zugangscode stimmt nicht oder ist nicht mehr gültig.';
  end if;

  if exists (select 1 from public.profil
             where lower(btrim(anzeigename)) = lower(btrim(p_anzeigename))) then
    raise exception 'Diesen Anzeigenamen gibt es schon. Nimm einen anderen.';
  end if;

  insert into public.profil (id, anzeigename, lehrjahr, zugang, mindestens_16)
  values (ich, btrim(p_anzeigename), p_lehrjahr, zc.code, true)
  returning * into neu;

  update public.zugangscode set genutzt = genutzt + 1 where code = zc.code;
  return neu;
end;
$$;
