revoke all on function public.moderation_entscheiden(uuid, text, uuid, text, uuid[], uuid, uuid, int,
  text, text, text, text) from public, anon;

grant execute on function public.moderation_entscheiden(uuid, text, uuid, text, uuid[], uuid, uuid, int,
  text, text, text, text) to authenticated;
