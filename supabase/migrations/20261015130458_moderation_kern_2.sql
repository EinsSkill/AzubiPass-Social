create trigger moderation_entscheidung_schutz before update or delete on public.moderation_entscheidung
  for each row execute function public.protokoll_schutz();

revoke all on function public.mod_fehler(text, text), public.mod_sperren(text, uuid),
  public.mod_aktiv(text, uuid), public.mod_verbergen(text, uuid), public.mod_zeigen(text, uuid),
  public.mod_version_hoch(text, uuid), public.mod_stufe(text)
  from public, anon, authenticated;
