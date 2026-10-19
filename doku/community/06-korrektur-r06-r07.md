# Korrekturpaket R06 und R07 · Datenbank

**Stand:** 19.10.2026, Claude. **Grundlage:** [Review 8273f7b](review/2026-10-15-chatgpt-review-8273f7b.md),
[Auftrag 19.10.](review/2026-10-19-chatgpt-auftrag-abschluss-r04-r07.md).
**Status: lokal umgesetzt und geprüft, NICHT live eingespielt.** Die Einspielung ins
Supabase-Projekt braucht Lukes' ausdrückliches „einspielen“ (siehe Abschlussbericht).

Bereits eingespielte Migrationsdateien bleiben unverändert. Die Korrektur ersetzt
zwei Funktionen per `create or replace`; Rechte (`grant execute … to authenticated`)
bleiben dabei erhalten. Jede Datei liegt unter 5 KB (Grenze des Einspielwerkzeugs).

## Dateien in Einspielreihenfolge

| Datei | Größe | Wirkung |
|---|---|---|
| `supabase/migrations/20261019120000_entscheiden_wiederholung_1.sql` | 1,0 KB | Neue interne Funktion `mod_gleicher_vorgang(e, konto, aktion, art, ziel)` – gleicher Vorgang nur bei gleichem Konto, gleicher Aktion, gleicher Ziel-ID **und** gleicher Zielart. Keine Rechte für Konten. |
| `supabase/migrations/20261019120005_entscheiden_wiederholung_2.sql` | 4,9 KB | `moderation_entscheiden`: beide Wiederholungszweige (vor dem Einfügen in `vorgang` und nach dem Warten am Konflikt) nutzen `mod_gleicher_vorgang`; jede Abweichung ergibt `APV01`. Sonst Wort für Wort wie `20261015130645_entscheiden_2.sql`. |
| `supabase/migrations/20261019120100_meldebremse_konto.sql` | 3,9 KB | `meldung_senden`: transaktionsgebundene Kontosperre `pg_advisory_xact_lock(hashtextextended('azubipass.meldung:' || konto, 0))` direkt vor Zählung und Anlage. Sonst Wort für Wort wie in `20261015130525_melden_2.sql`. |

## R06 · Was sich ändert

Vorher prüfte nur der erste Zweig das Ziel – und auch der nur über
`coalesce(beitrag_id, antwort_id) = p_ziel`, also ohne Zielart. Der zweite Zweig
(nach dem Warten auf die Vorgangskennung) prüfte nur Konto und Aktion. Folge: Eine
wiederverwendete Kennung konnte für ein anderes Ziel oder eine andere Zielart
„Wiederholung, erfolgreich“ zurückgeben, ohne dort etwas zu bewirken.

Sperrreihenfolge unverändert: `vorgang` (Primärschlüssel der Kennung) → Beitrag
`for update` → Antwort `for update`.

## R07 · Was sich ändert und warum diese Sperre

Die Threadsperre serialisiert nur Meldungen an denselben Beitrag. Zwei neue
Meldungen desselben Kontos an verschiedene Beiträge zählten gleichzeitig denselben
Stand (29 + 2 = 31).

Ablauf von `meldung_senden` jetzt:

1. eigene Meldung suchen → vorhanden: zurückgeben (ohne Sperre)
2. Thread sperren (Beitrag → Antwort, wie bisher)
3. eigene Meldung erneut suchen (R02) → vorhanden: zurückgeben
4. Sichtbarkeit prüfen
5. **neu: Kontosperre** (Advisory-Sperre, endet mit der Transaktion)
6. Meldungen der letzten Stunde zählen (eigener Snapshot nach dem Warten, READ COMMITTED) → ab 30 `APB01`
7. anlegen, Version erhöhen, dritte Meldung blendet über den Trigger aus

**Verklemmungsfreiheit:** Die Kontosperre wird immer *nach* der Threadsperre
genommen und nur von `meldung_senden`. Wer sie hält, braucht danach nur noch Zeilen
des eigenen, bereits gesperrten Threads (Insert, Trigger-Ausblendung,
Versionszähler). Kein anderer Schreibweg nimmt die Kontosperre. Damit gibt es keinen
Zyklus Konto ↔ Thread. Wiederholungen (Schritt 1 und 3) erreichen die Kontosperre
nicht und funktionieren auch an der Grenze.

**Warum Advisory statt Zeilensperre auf `profil`:** Eine `for update`-Sperre auf
der Profilzeile hätte gleichzeitige Profiländerungen derselben Person blockiert.
Die Advisory-Sperre betrifft nur Meldungen. Hash-Kollisionen zweier Konten würden
nur unnötig serialisieren, nie Grenzen aufweichen.

## Prüfungen (lokal, PostgreSQL 16.15, Grundlage + alle 45 Migrationsdateien)

| Prüfung | Ergebnis |
|---|---|
| `supabase/tests/moderation_test.sql` (neu: `andereArt`, `anderesZiel`) | ERGEBNIS-Rollback ohne FEHLER, beide `APV01`, Invariante 0 |
| `regeln_test.sql`, `korrekturen_g03_g05_test.sql` | ERGEBNIS-Rollback ohne FEHLER |
| `konkurrenz.py r06` (zwei Verbindungen) | gleiches Ziel parallel: eine Entscheidung, beide dasselbe Ergebnis; anderes Ziel / andere Zielart / fremdes Teamkonto / andere Aktion parallel: zweiter Aufruf wartet, dann `APV01`, Ziel 2 unverändert; sequentiell: Wiederholung ok, vier Kollisionen `APV01` |
| `konkurrenz.py r07` (bis zu fünf Verbindungen, `lock_timeout` 5 s) | 29 + drei parallele neue Ziele: beide Nachzügler warten auf die Advisory-Sperre, Ergebnis eine neue + zwei `APB01`, insgesamt 30; Wiederholung an der Grenze ok (auch parallel zu einem `APB01`); dritte Meldung blendet aus, parallele Meldung desselben Kontos `APB01`; kreuzende Meldungen zweier Konten plus Entscheidung im selben Thread: alle enden, keine Verklemmung, kein Sperr-Timeout (dreimal wiederholt) |
| `konkurrenz.py g06 r03 moderation` auf dem neuen Stand | bestanden (G06, R03, B4, R02, P3, P6, gleiche Kennung) |
| Gegenprobe `--alt` am Stand vor R06/R07 | R06: anderes Ziel und andere Zielart liefern `wiederholung=True`; sequentiell andere Zielart „erfolg“. R07: kein Warten, drei neue, **32** Meldungen in der Stunde |

Rohprotokolle: [review/2026-10-19-claude-abschluss/](review/2026-10-19-claude-abschluss/).

**Nicht geprüft:** Supabase live (nicht eingespielt), Verhalten unter realer Last.
