# Gesamtreview Freitag-Funktionen · ChatGPT · 20.10.2026

**Ergebnis:** Zwei belegte Nachbesserungen vor Merge/Öffnung empfohlen (F01, F02). Die regulären Testfälle bestehen; ihre Abdeckung umfasst diese beiden Fälle bisher nicht. Keine neue fachliche Freigabe durch ChatGPT.

**Vorgänger:** Claude, Freitag-Funktionen und Live-Test, `c9e15a7`.
**Rolle:** unabhängiges Gesamtreview, keine Umsetzung.
**Geprüfter Anwendungsstand:** `c9e15a72a44c12edcf6ddb253d326977d0d4f3a8`, Branch `community-zugang`.
**Vergleich:** ab `d408c9c`; fünf neue Commits. `main` beim Review `cd4d6cf37164260ddc32584a7820df1f1e1c352c` (vorheriger Community-Merge).
**Grundlagen:** AGENTS.md, README.md, 01-uebersicht.md, neueste Übergabe, Claudes Freitag-Bericht; Quellenmodule, neue Migrationen und die weiterverwendeten Gruppen-/Aufgabenregeln. Second Brain `Business/AzubiPass.md` ergänzend gelesen; die gelesene Drive-Fassung ist älter und ersetzt den Repository-Stand nicht.

## F01 · Hoch · Wochenaufgabe auf Heute bleibt nach Abmeldung/Offline sichtbar

**Ort:** `quellen/community-gruppen.js`, `heuteAufgabe()` (783–807), `vergessen()` (813); `quellen/community-ansicht.js`, `kontoWeg()` und Offline-Listener; `quellen/community.js`, `aufgaben()` über `mit()` statt Kontobindung.

Der kleine Aufgabenblock prüft die gespeicherte Sitzung und Internetverbindung nur beim Start. Seine Antwort erhält weder Konto-/Generations- noch Ansichtsprüfung. `vergessen()` löscht nur den Gruppenhinweis; der bereits gerenderte Heute-Block wird nicht geleert. Der Offline-Listener der Zugangsansicht greift nur bei sichtbarer Community, nicht auf Heute.

**Unabhängige Browserprobe mit echten App-Modulen und simulierter Schnittstelle:**

1. Auf Heute eine laufende Aufgabe anzeigen lassen.
2. `SIGNED_OUT` auslösen: Aufgabentitel und Link bleiben sichtbar.
3. Frische Sitzung, Aufgabe laden, Browser offline schalten: Details bleiben sichtbar.
4. Frische Sitzung, Aufgabenantwort anhalten, abmelden, Antwort freigeben: danach erscheint der Aufgabentitel erstmals.

Alle drei unerwünschten Ergebnisse sind in [probe.log](2026-10-20-chatgpt-c9e15a7/probe.log) belegt. Reproduktion: [probe.py](2026-10-20-chatgpt-c9e15a7/probe.py). Das betrifft auch zurückgegebene Gruppen-/Aufgabennamen; die Probe verwendet zur eindeutigen Erkennung einen synthetischen Aufgabentitel. Kein fremdes Live-Konto wurde benutzt.

**Soll:** 01-uebersicht.md §2: nach Logout/entzogenem Zugriff keine alten Aufgabendetails; offline keine privaten Details. Aufgabenabruf und Anzeige an Konto, Generation, vorhandenes Profil, Paketsperre und aktuellen Heute-Block binden. Bei Logout, Kontowechsel und Offline den sichtbaren und versteckten Block sofort leeren; späte Antworten dürfen nichts erneut einblenden. Rückkehr aus Hintergrund und Rechteverlust berücksichtigen. Fehlerzustand mit dem vorgesehenen Wiederholen anbieten.

**Gezielte Abnahme:** Bereits sichtbare sowie angehaltene Antworten bei Logout, Wechsel zu anderem Konto und Offline testen; keine alten Titel/Gruppennamen oder Links. Ohne Profil/Paket keine Aufgabenabfrage bzw. keine Datenanzeige. Nach Wiederverbindung mit neu geprüften Rechten wieder laden.

## F02 · Hoch · Gruppen und Wochenaufgaben umgehen die geschlossene Paketsperre

**Ort:** `supabase/migrations/20261008131436_aktionen_gruppen.sql`, `20261008131536_regeln_gruppen.sql`, `20261008131555_regeln_aufgaben_meldungen.sql`; keine Ergänzung dieser Grenzen in den fünf neuen Migrationen. Heute lädt `aufgabe_liste` direkt.

Die neue Navigation wartet zwar auf `beitraege_frei()`, doch Gruppen-RPCs, Gruppen-/Mitgliedschaftsregeln sowie Wochenaufgaben und Erledigt-Regeln verwenden diese Sperre nicht. Ein normales freigeschaltetes Profil kann deshalb bei geschlossenem Paket über die API Gruppen gründen/beitreten sowie zulässige Aufgaben bearbeiten/lesen. Die neue Heute-Anzeige nutzt diesen ungesperrten Lesepfad. Die Zusicherung „Gruppen, Beiträge und Aufgaben erst nach Paketöffnung“ trifft damit serverseitig nicht zu.

**Unabhängige PostgreSQL-16-Probe:** Supabase-Grundlage aus dem Repo und sämtliche 50 Migrationen unverändert auf einer lokalen Testdatenbank. Neues Profil, kein Eintrag in `beitraege_tester`, Schalter weiter geschlossen. Trotzdem Gruppe gegründet, darin Wochenaufgabe angelegt und über `aufgabe_liste` gelesen:

```text
ERGEBNIS: beitraege_frei=f; gruppe_angelegt=t; aufgabe_lesbar=1
```

[SQL-Probe](2026-10-20-chatgpt-c9e15a7/gate-probe.sql) · [Rohbeleg](2026-10-20-chatgpt-c9e15a7/gate-probe.log). Die abschließende ERGEBNIS-Exception ist beabsichtigt und rollt die Probe zurück.

**Soll:** Die angekündigte gemeinsame Paketgrenze auch serverseitig für Gruppen, Gruppencodes, Mitgliedschaft, Wochenaufgaben und Erledigungen durchsetzen; ausschließlich die ausdrücklich vorgesehenen internen Tester bleiben ausgenommen. Views und direkte Tabellen-/RPC-Wege abdecken, nicht nur die Navigation. Notwendige Austritts-/Aufräumwege bewusst behandeln. Heute berücksichtigt dieselbe Grenze (F01).

**Gezielte Abnahme:** Nicht-Tester mit Profil und geschlossenem Paket kann weder Gruppen-/Aufgabeninhalte lesen noch neue Gruppen/Mitgliedschaften/Aufgaben/Erledigungen anlegen; Tester kann weiter prüfen. Nach Öffnung funktionieren dieselben erlaubten Wege. Nach erneutem Schließen keine alten Inhalte oder späten Antworten. Bestehende Gruppen-/Aufgabenrechte und Moderation bleiben korrekt.

## H01 · Sachliche Korrektur der Übergabe, kein zusätzlicher Merge-Blocker

Die Chat-Übergabe sagt „Gruppencode nur für Gründende sichtbar“. Tatsächlich zeigt `infoBereich()` ihn jedem Mitglied. Das passt zur bestehenden RLS-Regel `gruppe_code: nur Mitglieder`. Die unabhängige Browserprobe zeigt für ein normales Mitglied `OFFEN123` (synthetischer Testcode). 01-uebersicht.md verlangt bestätigtes Leserecht und legt keine exklusive Gründerregel fest.

Claude soll den Bericht richtigstellen. Eine Beschränkung auf Leitung wäre eine neue Produktentscheidung, die hier nicht still getroffen wird. Die Codes aus der Probe sind ausschließlich Mock-Daten.

## Unabhängige Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `community_gruppen_test.py` | **38/38**, einschließlich axe an den vorhandenen Prüfstellen |
| `community_korrekturen_test.py` | **97/97** |
| `community_moderation_test.py` | **128/128** |
| `funktionstest.py` einschließlich Build | **269/269**, reproduzierbarer Bestand |
| Alle 50 Migrationen auf PostgreSQL 16 | aufgebaut |
| `regeln_test.sql` | erwartetes ERGEBNIS, kein FEHLER-Marker |
| `korrekturen_g03_g05_test.sql` | erwartetes ERGEBNIS, kein FEHLER-Marker |
| `moderation_test.sql` | erwartetes ERGEBNIS, kein FEHLER-Marker, Invariante 0 |
| `gruppen_test.sql` vollständig, einschließlich Hilfreich-DELETE | erwartetes ERGEBNIS, kein FEHLER-Marker |
| `lernkern_audit_test.py` | **51/52**, bekannter Altbefund: Buchführung K6 bei 320 px ist 321 px breit |
| Zusätzliche Browser- und SQL-Proben | **F01/F02 reproduziert** |

Rohbelege und Reproduktion: [2026-10-20-chatgpt-c9e15a7/](2026-10-20-chatgpt-c9e15a7/).

Die regulären Gruppenfälle, Beitragserstellung per Vorgangskennung, Hilfreich setzen/zurücknehmen, Profil-Beruf, IK-Auswahl und zentrale Gruppenmoderation bestehen in diesem Umfang. Die Testzahlen sind keine Prüfung der gesamten Oberfläche gegen echte Supabase-Konten. Die vier SQL-Suiten schließen bewusst mit einer ERGEBNIS-Exception und Rollback, also einem von null verschiedenen psql-Rückgabewert; die Ergebniswerte wurden gelesen, nicht nur der Prozessstatus.

## Grenzen und Übergabe

- Lernkern-Audit: der bereits dokumentierte 1-Pixel-Überlauf auf unveränderter Buchführungsseite ist kein neuer Freitag-Befund.
- Keine eigene produktive Datenbankabfrage und keine erneute Verifizierung von E13 oder dem Live-Migrationsstand. Claudes Betriebsbelege bleiben als solche gekennzeichnet.
- Keine echte Konto-/Storage-/Mail-Ende-zu-Ende-Prüfung: sichere Testzugänge und SMTP fehlen weiterhin. Brevo und fehlende Datenschutzwerte bleiben Betriebsaufgaben.
- Keine Änderung an Anwendungscode, Migrationen oder produktiver Datenbank. Dieser Commit enthält ausschließlich Review, Prüfbelege und Übergabe. Build-Zeitstempel aus der lokalen Prüfung werden nicht mit übernommen.
- Keine Merge-/Deployment- oder Paketöffnungsfreigabe. Nächster Schritt: Claude behebt **gezielt F01/F02**, korrigiert H01 im Bericht und übergibt die entsprechenden Belege. Danach gezielte Gegenprüfung dieser Korrekturen; keine erneute allgemeine R04–R07-Runde.
