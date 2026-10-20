# Review · G06, R03 und Spec 06 · 8273f7b

**Ergebnis: Nachbesserungen erforderlich.** G06 und die gezielt geprüften R02-/R03-Fälle halten. Die Spec-06-Umsetzung enthält vier neue, unabhängig reproduzierte Befunde: R04 hoch, R05–R07 mittel. Vor Klassenöffnung beheben und gegenprüfen. Dies ist keine Merge-, Deployment- oder Datenbankfreigabe.

**Vorheriger Beitrag:** Claude – Umsetzung und Abnahme, `8273f7b09358b91bc6305741f95c178c51d608cf`. **Rolle:** ChatGPT – Review, keine Änderungen an Anwendungscode oder Datenbank. **Branch:** `community-zugang`. **Nächste Übergabe:** Claude zur Bestätigung und Korrektur, danach ChatGPT zur Gegenprüfung und Lukes für die noch offenen Entscheidungen.

## Grundlage und Grenzen

Gelesen: `AGENTS.md`, `README.md`, neueste Übergabe, `entscheidungen.md`, Spec 06 v2, Technikplan v2 einschließlich P1–P6/R02/R03, G06-Plan, Claudes Abnahme, neue Migrationen und Community-Module samt ihren Aufrufen. GitHub bestätigte den Arbeitsbranch auf `8273f7b`; `main` wurde unabhängig auf `0c472bb20b602e46d154af0828502bed41b636d4` gelesen. Die zugängliche Second-Brain-Projektseite verweist für technischen Stand und Tests ausdrücklich auf das Repository; sie ersetzt diese Prüfung nicht.

Die unabhängige Datenbank ist **lokales PostgreSQL 18.4**, aufgebaut aus `supabase/tests/lokal/supabase_grundlage.sql` und allen **42 echten Repo-Migrationen**. Das ist nicht Claudes PostgreSQL-16-Umgebung, nicht Supabase live und nicht die Storage-API. Browserproben verwenden die echten gebauten Module mit der nachgebildeten Schnittstelle aus den vorhandenen Tests. Kontowechsel wird über die Auth-Ereignisschnittstelle ausgelöst. Alle Probe-Konten und Hinweise sind künstliche Testdaten.

## R04 · Hoch · Meldedialog überlebt Kontowechsel und sendet alten Hinweis als neues Konto

**Stellen:** `quellen/community-moderation.js`, insbesondere `meldenDialog`, `abschicken` (Zeile 246), Anhängen an `document.body` und `vergessen` (Zeile 1301); Aufräumen über `community-ansicht.js:kontoWeg`.

Der Meldedialog wird außerhalb der Community-Ansicht an `document.body` angehängt. `vergessen()` leert nur drei Modulvariablen; es schließt und leert die Dialoge nicht. Der Handler prüft `ctx.gilt()` erst **nach** dem Schreibaufruf, nicht davor. Die Datenschicht bindet den neuen Aufruf an das dann aktuelle Konto.

**Reproduktion [Browser-Mock]:**

1. Als Anna einen fremden Beitrag öffnen, Meldedialog öffnen, Hinweis `Privater Hinweis von Anna` eintragen.
2. Echtes `SIGNED_OUT`-Ereignis über den registrierten Auth-Callback auslösen; Sitzung und `getUser` liefern danach kein Konto. Die Community zeigt bereits die Anmeldung.
3. Der modale Dialog bleibt offen, einschließlich Kontext und Hinweis: `LOGOUT_DIALOG 1`.
4. Ben über `SIGNED_IN` anmelden; Profil/Sitzung/`getUser` liefern jetzt Ben.
5. Im verbliebenen Dialog Spam wählen und senden. `meldung_senden` wird mit dem alten Ziel und Annas Hinweis aus dem jetzt aktuellen Konto Ben aufgerufen. Erst die Rückgabe wird vom alten Kontext verworfen.

**Folge:** Inhalt eines alten Kontos bleibt sichtbar und ein alter Entwurf kann im Namen eines anderen Kontos gesendet werden. Das verletzt Kontobindung und Aufräumgrenze der Spec, unabhängig von den serverseitig korrekten Rollenprüfungen.

**Erwartete Korrektur:** Dialoge samt Daten beim Kontowechsel/Abmelden zuverlässig schließen und entfernen; vor jedem Versand/Wiederholungsversand die ursprüngliche Konto-/Generationsbindung prüfen. Auch Status-, Bestätigungs- und Vorlagen-Rückfragen sowie Offline/Ansichtswechsel auf denselben Lebenszyklus prüfen. Eine laufende Anfrage darf nachträglich keinen Erfolg im neuen Kontext anzeigen.

**Abnahme:** Abmelden und direkter Kontowechsel während offenem, sendendem und unklarem Meldedialog; danach weder alter Dialog noch alter Text, kein RPC aus dem alten Entwurf mit dem neuen Konto. Bestehende Zugangstests beibehalten.

## R05 · Mittel · Andere Entscheidungsknöpfe umgehen den gesperrten Versandstand

**Stellen:** `community-moderation.js`, Fall-Aktionsknöpfe um Zeile 655, `formular` ab Zeile 738, lokaler Zustand `e` und Klärleiste.

Nur das aktive Formular wird gesperrt. Die darüberliegenden Aktionsknöpfe bleiben aktiv und rufen erneut `formular(...)` auf. Diese Funktion leert den Formularplatz und erzeugt einen neuen Zustand mit neuer Kennung. Der alte laufende oder unklare Vorgang wird dabei nicht geklärt.

**Reproduktion [Browser-Mock]:** Eine fachliche Korrektur mit Text A senden, die Bestätigung ausbleiben lassen (`spaet`). Sobald „Status prüfen“ steht, den oberen Knopf „Fachliche Korrektur ergänzen“ erneut anklicken. Die Klärleiste verschwindet, die Textfelder sind leer. Korrektur B lässt sich mit einer **anderen** Kennung senden, während A noch ungeklärt ist. Die Probe zeigt zwei verschiedene `p_id` bei unverändertem Fall.

Die serverseitige Versionsprüfung begrenzt mögliche Doppelwirkungen. Der belegte Fehler ist der Verlust des offenen Vorgangs und die Umgehung des zugesagten Klärwegs; die Probe behauptet keine zwei erfolgreich gespeicherten echten Datenbankentscheidungen.

**Erwartete Korrektur:** Einen Zustand pro Fall besitzen; alle konkurrierenden Fallaktionen während Versand/Klärung sperren oder gezielt in denselben Klärweg führen. Eine neue Kennung erst nach bestätigter Verwerfung bzw. neu geladenem, bestätigtem Fall zulassen. Auch bei ungesendetem Text den unbeabsichtigten Verlust durch einen Aktionswechsel verhindern.

**Abnahme:** Alle oberen Fallaktionen bei angehaltener Antwort und unklarem Ergebnis durchgehen; kein zweites Formular mit neuer Kennung, unveränderter Versandstand und erreichbarer Status-/Klärweg. Anschließend die erlaubte Änderung nach `vorgang_klaeren = verworfen` prüfen.

## R06 · Mittel · Konfliktzweig bestätigt Wiederholung für ein anderes Ziel

**Stelle:** `supabase/migrations/20261015130645_entscheiden_2.sql`, Zeile 44.

Die erste Wiederholungsprüfung vergleicht Konto, Aktion und Ziel. Nach dem Warten auf `vorgang` prüft der zweite Zweig nur Konto und Aktion. Dort fehlen Ziel und Zielart.

**Reproduktion [echte lokale Datenbank, zwei Verbindungen]:**

1. Teamkonto A führt `moderation_entscheiden` mit Kennung X, Aktion `korrektur`, Ziel P aus und lässt die Transaktion offen.
2. Dasselbe Konto ruft gleichzeitig X und `korrektur` für ein anderes Ziel Q auf. Es wartet am Konflikt der Vorgangskennung.
3. A committet. Der zweite Aufruf liefert **Erfolg mit `wiederholung: true` und dem Ergebnis von P**, obwohl Q unverändert ist.

**Folge:** Falsche Erfolgsbestätigung für das angeforderte Ziel. Bei normal zufällig neu erzeugten Kennungen ist keine spontane UUID-Kollision zu erwarten; betroffen ist die ausdrücklich zugesagte API-Idempotenz bei wiederverwendeten Kennungen.

**Erwartete Korrektur:** In beiden Wiederholungszweigen identische Prüfung von Konto, Aktion, Ziel-ID und Zielart; bei Abweichung `APV01`. Neue Korrekturmigration statt nachträglichem Umschreiben einer bereits eingespielten Migration.

**Abnahme:** Parallel gleiche Kennung/gleiches Ziel → genau ein Ergebnis; gleiche Kennung/anderes Ziel oder andere Art → zweiter Aufruf `APV01`, keine Wirkung auf das zweite Ziel. Sequentielle Wiederholung weiterhin prüfen.

## R07 · Mittel · 30-Meldungen-Bremse ist über verschiedene Threads nicht atomar

**Stelle:** `20261015130525_melden_2.sql`, Zählung und Insert ab Zeile 40.

Die Threadsperre serialisiert Meldungen zu demselben Beitrag. Zwei Meldungen desselben Kontos an verschiedene Beiträge halten verschiedene Sperren. Beide zählen deshalb denselben noch festgeschriebenen Kontostand.

**Reproduktion [echte lokale Datenbank, zwei Verbindungen]:** Ein Konto hat 29 Meldungen in der letzten Stunde. Verbindung A legt Meldung 30 zu P an, committet noch nicht. Verbindung B meldet Q, sieht ebenfalls 29, legt die Meldung an und committet. A committet. Anschließend existieren **31** Meldungen für dieses Konto in der Stunde. Mehr parallele Ziele können die Grenze weiter überschreiten.

**Einordnung:** Das Muster der früheren zählenden Bremse hatte dieselbe grundsätzliche Grenze; belegt ist hier der neue RPC-Weg. Kein neuer Rechtezugriff, aber die zugesagte Spam-Bremse schützt bei Parallelität nicht zuverlässig.

**Erwartete Korrektur:** Kontobezogene Serialisierung oder atomare Reservierung für neue Meldungen planen. Sperrreihenfolge mit den vorhandenen Threadsperren und allen übrigen Schreibwegen abgleichen. Vorhandene eigene Meldungen müssen weiterhin vor der Bremse erkannt werden; R02 nicht zurückbauen.

**Abnahme:** 29 bestehende Meldungen + parallele neue Meldungen an verschiedene Threads → höchstens eine neue, übrige `APB01`; Wiederholungen vorhandener Meldungen bleiben erfolgreich, auch an der Grenze. Konkurrenzprobe auf Verklemmungen ergänzen.

## Unabhängige Prüfbelege

| Prüfung | Ergebnis und Aussagegrenze |
|---|---|
| Alle 42 Migrationen | Lokal PostgreSQL 18.4 erfolgreich |
| `moderation_test.sql` | Erwarteter ERGEBNIS-Rollback, keine FEHLER-Ausnahme; Invariante 0 |
| `regeln_test.sql` | Erwarteter ERGEBNIS-Rollback; direkte allgemeine Inserts/Antwort-Inserts und alter Moderationsweg gesperrt |
| `korrekturen_g03_g05_test.sql` | Erwarteter ERGEBNIS-Rollback; bestehende Schutzfälle bestanden |
| Eigene G06-Konkurrenzprobe | Veröffentlichung zuerst: DELETE wartet, 0 gelöscht. Löschen zuerst: Veröffentlichung wartet, danach „nicht hochgeladen“. **Nur Datenbank/RLS**, keine Storage-API |
| Eigene R03-Konkurrenzprobe | Ausblenden zuerst: Antwort wartet, danach abgelehnt. Die übrigen R03-Reihenfolgen und Altstand-Gegenproben wurden hier nicht erneut ausgeführt |
| Eigene R02-Konkurrenzprobe | Zwei gleichzeitige Drittmeldungen desselben Kontos: zweite wartet, danach gleiche Meldungs-ID, `neu=false`; genau diese Probe unabhängig bestätigt |
| `community_korrekturen_test.py` | **97/97 bestanden**, einschließlich P4-Fehlercodes |
| `community_moderation_test.py`, unverändert | **49/50 bestanden**. Timingfehler im Test der Abbrechen-Rückfrage, siehe unten |
| Moderations-Mock mit gezielter Test-Synchronisation | **50/50 bestanden**, einschließlich sechs axe-Prüfungen; nur im temporären Test auf abgeschlossenen Vorlagen-Rückwechsel gewartet, Anwendung unverändert |
| `funktionstest.py` | Voller Lauf zunächst **268/269**. Ausschließlich der Build-Unterprozess scheiterte am in dieser Umgebung fehlenden Standard-Browserpfad. Nach Konfiguration des vorhandenen Chromium: gezielte Wiederholung aller sechs Build-/Offline-Prüfungen **6/6 bestanden**, Build reproduzierbar. Kein zweiter voller 269er-Lauf behauptet |
| Eigene Browserproben | R04/R05 reproduziert; Vorlagen-Abbrechen nach abgeschlossenem close-Handler korrekt |
| Eigene SQL-Parallelproben | R06/R07 reproduziert |
| Quelle vs. Build | `community.js`, `community-ansicht.js`, `community-beitraege.js`, `community-moderation.js` jeweils bytegleich unter `quellen/` und `docs/mittel/` |

**Timinggrenze des vorhandenen Moderationstests:** Die Prüfung wartet nur auf `!dialog[open]`. Das kann bereits stimmen, bevor der asynchrone `close`-Handler die vorherige Auswahl zurücksetzt. Die direkt danach ausgewertete erste `input_value()`-Abfrage sah noch die Zwischenlage; die später für die Fehlerausgabe erneut gelesenen Werte zeigten schon die korrekte Vorlage und den erhaltenen eigenen Text. Eine gezielte Gegenprobe mit Warten auf den abgeschlossenen Zustandswechsel besteht. Dies ist hier **kein belegter Produktfehler** des Vorlagen-Abbrechens. Ein Wiederholungslauf mit geändertem Warten brach bei parallel laufender Browserlast bereits am ersten 5-Sekunden-Warten ab und wird nicht als bestandener Lauf gezählt. Der anschließende vollständige Lauf mit gezielter Synchronisation bestand 50/50. Die Anwendung wurde dafür nicht korrigiert.

Die Rohbelege liegen in [2026-10-15-chatgpt-8273f7b/](2026-10-15-chatgpt-8273f7b/). Testskripte und Infrastruktur dieser unabhängigen Proben lagen außerhalb des Anwendungscodes. Die Buildprüfungen erzeugten ausschließlich lokale Ausgaben; deren Änderungen wurden nach der Prüfung auf den geprüften Git-Stand zurückgesetzt und werden nicht übergeben. Keine produktiven Testdaten angelegt, keine Zugangsdaten verwendet.

## Texte und offene Freigaben

Die vier bestätigten Texte sind in der Umsetzung vorhanden. Claudes ergänzte Erfolgs-/Ladetexte und die beiden Prüfergebnis-Vorlagen sind als Vorschläge nachvollziehbar, bleiben aber Lukes' Entscheidung. Für die beiden neuen Klärleisten empfehle ich eine sprachliche Präzisierung:

- Entscheidung: „Mit ‚Erneut senden‘ wiederholen wir denselben Vorgang. Eine zweite Entscheidung wird dabei nicht angelegt.“
- Prüfanfrage: „Mit ‚Erneut senden‘ wiederholen wir dieselbe Anfrage. Eine zweite Prüfanfrage wird dabei nicht angelegt.“

Das vermeidet die missverständliche Formulierung, dieselbe Entscheidung werde „noch einmal gespeichert“. Es behebt R05 allein nicht. Keine Textfreigabe in `entscheidungen.md` hinzugefügt.

**E13 bleibt offen.** Kein Konto aus Erinnerungen, GitHub-Identität oder dem vorhandenen Testprofil ableiten. `moderieren_entfernen.sql` bleibt zurückgestellt; die entzogenen Ausführungsrechte sind lokal bestätigt. Aus fachlicher Sicht ist das spätere Entfernen des abgeschalteten alten Wegs plausibel, aber hier weder beauftragt noch ausgeführt.

**Nicht unabhängig bestätigt:** Live-Migrationsgleichheit, aktueller Live-Paketsperrstatus, Storage-API Ende zu Ende, Livetests mit echten Konten, vollständige Sichtprüfung aller Seiten, echte Hilfstechnologien. Claudes Live-Belege bleiben dessen Belege. Keine Umdeutung der fehlenden Tests in ein bestandenes Release.

## Nächster Schritt

Claude bestätigt R04–R07 anhand der konkreten Fälle, korrigiert Client und Datenbank in getrennt nachvollziehbaren Stufen und ergänzt die gezielten Regressionstests. Geplante Datenbankänderungen und Sperrreihenfolge vor dem Einspielen dokumentieren; bereits produktive Migrationsdateien erhalten. Danach Rückgabe über `uebergabe.md` mit neuem Commit und getrennten lokalen/live/mock Belegen. Bestehende Freigaben nicht als Merge-/Deployment-/Paketöffnungsfreigabe auslegen. Die noch fehlenden Kontotests und Storage-API-Prüfung bleiben ausdrücklich offen.
