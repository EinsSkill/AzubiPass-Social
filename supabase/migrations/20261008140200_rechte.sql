-- AzubiPass Social · Rechte

-- ============================================================== Rechte
-- Erst alles weg, dann gezielt zurück. Anonyme Zugriffe bekommen gar nichts.

revoke all on all tables in schema public from anon, authenticated;
revoke all on all functions in schema public from public, anon, authenticated;

-- Vom Profil anderer sieht man nur, was öffentlich gemeint ist; welcher
-- Zugangscode benutzt wurde und die Altersbestätigung bleiben verborgen.
grant select (id, anzeigename, lehrjahr, ueber_mich, rolle, erstellt_am)
  on public.profil to authenticated;

grant select on public.gruppe, public.gruppe_code, public.mitglied,
                public.beitrag, public.antwort, public.hilfreich, public.wochenaufgabe,
                public.erledigt, public.meldung,
                public.beitrag_liste, public.gruppe_liste, public.aufgabe_liste
  to authenticated;

grant update (anzeigename, lehrjahr, ueber_mich) on public.profil to authenticated;

grant update (name, beschreibung, offen) on public.gruppe to authenticated;
grant delete on public.gruppe to authenticated;

grant insert (gruppe_id, nutzer_id) on public.mitglied to authenticated;
grant update (rolle) on public.mitglied to authenticated;
grant delete on public.mitglied to authenticated;

grant insert (gruppe_id, art, titel, text, lernfeld, kapitel, datei_pfad, datei_art, an_mentoren)
  on public.beitrag to authenticated;
grant update (titel, text, lernfeld, kapitel, an_mentoren, geloest) on public.beitrag to authenticated;
grant delete on public.beitrag to authenticated;

grant insert (beitrag_id, text) on public.antwort to authenticated;
grant update (text) on public.antwort to authenticated;
grant delete on public.antwort to authenticated;

grant insert (beitrag_id) on public.hilfreich to authenticated;
grant delete on public.hilfreich to authenticated;

grant insert (gruppe_id, titel, beschreibung, lernfeld, kapitel, beginn, ende)
  on public.wochenaufgabe to authenticated;
grant update (titel, beschreibung, lernfeld, kapitel, beginn, ende)
  on public.wochenaufgabe to authenticated;
grant delete on public.wochenaufgabe to authenticated;

grant insert (aufgabe_id) on public.erledigt to authenticated;
grant delete on public.erledigt to authenticated;

grant insert (beitrag_id, antwort_id, grund, hinweis) on public.meldung to authenticated;
grant update (status) on public.meldung to authenticated;

grant execute on function
  public.ist_freigeschaltet(), public.ist_team(), public.ist_mitglied(uuid),
  public.ist_leitung(uuid),
  public.profil_anlegen(text, smallint, text, boolean, boolean),
  public.gruppe_gruenden(text, text, boolean), public.gruppe_beitreten(text),
  public.gruppe_verlassen(uuid), public.beste_antwort(uuid),
  public.moderieren(text, uuid, boolean), public.rolle_setzen(uuid, text),
  public.konto_loeschen()
  to authenticated;

-- Neue Tabellen und Funktionen sollen nicht still wieder offen sein.
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on functions from public, anon, authenticated;

-- ============================================================== Indizes
create index gruppe_ersteller on public.gruppe (erstellt_von);
create index profil_zugang on public.profil (zugang);

