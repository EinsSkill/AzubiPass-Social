-- R06 (Review 8273f7b): Auch der Zweig nach dem Warten auf die Vorgangskennung
-- gleicht Konto, Aktion, Ziel-ID und Zielart ab. Vorher prüfte er nur Konto und
-- Aktion und bestätigte so eine Wiederholung für ein anderes Ziel.
-- Beide Wiederholungszweige nutzen dieselbe Prüfung; Abweichung = APV01.
-- Ersetzt die Funktion aus 20261015130645_entscheiden_2.sql (Datei bleibt).
-- Sperrreihenfolge unverändert: vorgang (Kennung) → Beitrag → Antwort.

create function public.mod_gleicher_vorgang(e public.moderation_entscheidung, p_ich uuid,
  p_aktion text, p_art text, p_ziel uuid) returns boolean
language sql immutable set search_path = '' as $$
  select e.id is not null and e.akteur_id = p_ich and e.aktion = p_aktion
     and ((p_art = 'beitrag' and e.beitrag_id = p_ziel and e.antwort_id is null)
       or (p_art = 'antwort' and e.antwort_id = p_ziel and e.beitrag_id is null));
$$;

revoke all on function public.mod_gleicher_vorgang(public.moderation_entscheidung, uuid, text, text, uuid)
  from public, anon, authenticated;
