-- Spec 06 · Teamentscheidung (06-technik-plan.md §4.2, P2/P3/P5).

create function public.mod_ergebnis(e public.moderation_entscheidung, p_wiederholung boolean) returns jsonb
language sql stable set search_path = '' as $$
  select jsonb_build_object('entscheidung_id', e.id, 'aktion', e.aktion, 'versteckt', e.nachher_versteckt,
    'ausblendung_id', e.ausblendung_id, 'pruefanfrage_id', e.pruefanfrage_id,
    'korrektur_antwort_id', e.korrektur_antwort_id, 'wiederholung', p_wiederholung);
$$;

revoke all on function public.mod_ergebnis(public.moderation_entscheidung, boolean) from public, anon, authenticated;
