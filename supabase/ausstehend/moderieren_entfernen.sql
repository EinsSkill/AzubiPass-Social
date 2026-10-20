-- Erst nach Lukes' ausdrücklicher Bestätigung einspielen (wie beste_antwort_entfernen.sql).
-- Der alte Moderationsweg ohne Protokoll ist seit 20261015130848_moderation_rechte per
-- revoke für alle Konten gesperrt; dies entfernt ihn endgültig.
drop function if exists public.moderieren(text, uuid, boolean);
