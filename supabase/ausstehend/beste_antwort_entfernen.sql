-- Entfernt den alten Umschalt-Weg der besten Antwort (G05, 14.10.2026).
-- Seit Migration 20261014122152 ist er für Konten schon nicht mehr aufrufbar
-- (revoke). Das Supabase-MCP bricht Löschungen ohne Bestätigung ab; daher hier
-- zum späteren Einspielen nach Lukes' Bestätigung.
drop function if exists public.beste_antwort(uuid);
