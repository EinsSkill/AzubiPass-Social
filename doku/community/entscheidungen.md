# Entscheidungen · AzubiPass Social

Hier trägt **nur Lukes** ein, was freigegeben ist. Claude setzt nur um, was
hier steht. Format: Datum · Entscheidung · betroffene Datei/Version.

| Datum | Entscheidung | Bezug |
|---|---|---|
| 2026-10-08 | Eigenes Repo AzubiPass-Social, Original bleibt unverändert | – |
| 2026-10-08 | Backend Supabase (Frankfurt), Anmeldung per Mail-Link, Beta-Zugangscode, Mindestalter 16 | `supabase/` |
| 2026-10-08 | Demo/Beta für die Klasse mit echter Anmeldung | – |
| 2026-10-08 | ChatGPT macht Design und Ideen, Claude setzt um | `uebergabe.md` |
| 2026-10-08 | Vier Haupttabs bleiben: Heute, Lernen, Üben, Ich. | `01-uebersicht.md` |
| 2026-10-08 | Community ist über Ich → Community erreichbar. | `01-uebersicht.md` |
| 2026-10-08 | Auf Heute erscheint der beschriebene kompakte Abschnitt „Gemeinsam lernen" mit Community-Einstieg und höchstens einer passenden laufenden Wochenaufgabe. | `01-uebersicht.md` |
| 2026-10-08 | Die acht Community-Regeln aus 03-community-regeln.md sind freigegeben. | `03-community-regeln.md` |
| 2026-10-08 | Setze das Zugangspaket aus 02-anmeldung-profil.md samt diesen Einstiegen und Regelansicht um. | `02-anmeldung-profil.md` |
| 2026-10-12 | Zwischenansicht nach dem Zugang nach ChatGPT-Vorschlag: Einleitung „Hier findest du dein Community-Profil und die Regeln.“, Text „Dein Community-Profil ist eingerichtet. Beiträge und Lerngruppen sind in dieser Beta noch nicht verfügbar.“ und Knopf „Zu Lernen“ | Review ChatGPT 12.10., Vorschlag 1 |
| 2026-10-12 | Von Claude ergänzte Texte: ChatGPTs Änderungen übernehmen („Profilstatus prüfen“; „Die Anmeldung mit dem E-Mail-Code hat nicht geklappt. Versuch es erneut.“; Prüffehler mit Wiederholungsaktion), übrige Texte bleiben | Review ChatGPT 12.10., Vorschlag 2 |
| 2026-10-12 | Datenschutzerklärung: ChatGPT-Entwurf in den Generator einbauen, fehlende Angaben sichtbar als Lücken markieren; nur auf dem Branch, nicht live | Review ChatGPT 12.10., Vorschlag 3 |
| 2026-10-12 | Reihenfolge der nächsten Detail-Specs: 1 Beiträge-Übersicht und Detail, 2 Beitrag erstellen und Antworten, 3 Melden und Moderation (zusammen mit 1 und 2), 4 Gruppen, 5 Wochenaufgaben | Review ChatGPT 12.10., Vorschlag 4 |
| 2026-10-12 | Feld „Anmeldecode aus der E-Mail“: Kennzeichnung „Pflicht bei Anmeldung mit Code“ statt „Pflicht“ | Review ChatGPT a443607, Texte 1 |
| 2026-10-12 | Beiträge: drei Arten gemeinsam in einer ruhigen Liste mit Filter Beitragsart und Lernfeld; zunächst nur allgemeine Community-Beiträge, Gruppen später | `04-beitraege.md` v1, Frage 1 |
| 2026-10-12 | „Weitere Beiträge laden“ mit stabiler Zeit-/ID-Seitennavigation | `04-beitraege.md` v1, Frage 2 |
| 2026-10-12 | Übersicht und Lesedetail zuerst intern bauen; Klassen-Beta erst gemeinsam mit Schreiben, Antworten, Melden und Moderation | `04-beitraege.md` v1, Frage 3 |
| 2026-10-12 | Dateizugriff mit aktueller Rechteprüfung statt pauschaler Widerrufszusage; 60-Sekunden-Zusage gestrichen; Claude belegt Technik und Grenzen vor Freigabe von Uploads | `04-beitraege.md` v1, Frage 4 |
| 2026-10-12 | Die Beta ist kostenlos. Preise auf der Landingpage ganz entfernen; ein Geschäftsmodell wird später separat entschieden | Gesamtaudit A08 |
| 2026-10-12 | Reihenfolge: erst die Audit-Korrekturen (A01, A05, A04, dann A06/A07/A11/A09/A10), danach die nächste Community-Spec | Gesamtaudit Abschnitt 8 |
| 2026-10-12 | Lernkern-Korrekturen auf eigenem Branch von main, separate Freigabe durch Lukes; danach in den Community-Branch übernehmen | Gesamtaudit |
| 2026-10-12 | In die Klasse kommen Lernkern und Community; vorher nötig: Mailversand, Datenschutzangaben, Melden und Moderation | Gesamtaudit Abschnitt 10 |
| 2026-10-13 | Probeklausur nach Abgabe und Neuladen: „Eigene Probeklausur“ zeigt die letzte Auswertung (ohne Uhr, offene Selbstbewertungen erreichbar); „Neue Variante erstellen“ und „Auswahl ändern“ führen zur neuen Vorbereitung | Gegenprüfung ChatGPT 13.10., Klausurfrage |
| 2026-10-13 | Spec 05: Bei Frage und Tipp sind Titel und Text Pflicht, beim Lernzettel Beschreibung optional, Frage vorausgewählt; Antworten direkt im Beitragsdetail; beste Antwort setzen/zurücknehmen im selben Paket | `05-schreiben-antworten.md` v1, Fragen 1 und 2 |
| 2026-10-13 | Spec 05: serverseitige Paketsperre für Beiträge, anfangs geschlossen, nur benannte interne Testkonten; öffnen erst nach komplettem Paket und Lukes' Freigabe. API-/RPC-Anpassungen für Kontobindung, Idempotenz und Statusprüfung freigegeben, ohne neue fachliche Felder; Claude benennt die Datenbank-/Rechteänderungen vor dem Einspielen | `05-schreiben-antworten.md` v1, Fragen 3 und 4 |
| 2026-10-13 | Barrierefreiheit: scrollbare Tabellen per Tastatur erreichbar machen, Kontrast der Tab-Leiste auf Deckblatt/Landing korrigieren; Landing-Satz „In der Beta kannst du alle verfügbaren Lerninhalte und Übungen kostenlos nutzen.“ | Barrierefreiheits-Scan 13.10., Gegenprüfung ChatGPT |
