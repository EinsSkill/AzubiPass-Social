-- AzubiPass Social · Konto löschen (NOCH NICHT EINGESPIELT)
-- Supabase verlangt für Löschungen in auth.users eine eigene Bestätigung.
-- Nach dem Einspielen zusätzlich: grant execute on function public.konto_loeschen() to authenticated;

-- Konto löschen: entfernt den Login und über die Fremdschlüssel alles, was
-- daran hängt. Die hochgeladenen Dateien räumt die App vorher selbst ab,
-- weil Speicherobjekte nur über die Storage-Schnittstelle gelöscht werden.
create function public.konto_loeschen() returns void
language plpgsql security definer set search_path = '' as $$
declare
  ich uuid := (select auth.uid());
begin
  if ich is null then
    raise exception 'Bitte zuerst anmelden.';
  end if;
  delete from auth.users where id = ich;
end;
$$;

grant execute on function public.konto_loeschen() to authenticated;
