# Entscheidungen · AzubiPass Social

Hier stehen **nur von Lukes getroffene Entscheidungen**. Eine KI darf seine
im Chat ausdrücklich erteilte Freigabe im Auftrag dokumentieren und muss die
Quelle und den Umfang nennen. Claude setzt nur um, was hier freigegeben ist.
Format: Datum · Entscheidung · betroffene Datei/Version.

## Erweiterter Modus · vollständig vor Merge · 28.10.2026

**Quelle:** Lukes im Chat als Korrektur des Vorschlags, nach drei Piloten und zwei technischen Korrekturen zu mergen: „ne ich will das alles durch ist vor dem merge“.

**Entscheidung:** Der erweiterte Modus wird erst nach vollständiger Umsetzung und Prüfung zum Merge vorgelegt. Die drei Piloten sind eine Zwischenabnahme, kein abgeschlossener Mergeumfang. Die bisher vorgeschlagene Reihenfolge „Piloten mergen, danach übrige Kapitel“ ist damit ersetzt.

**Konkretisierung aus dem bestehenden Auftrag (ChatGPT):** Alle Lernfelder beider Berufe und sämtliche zugehörigen Kapitel/Erklärabschnitte nach dem vereinbarten Modell bearbeiten; Ausgangsbestand 26 Lernfelder und 160 Kapitel. Vor Abschluss den aktuellen Quellbestand inventarisieren, da Ergänzungen die Anzahl verändern können. Pro Abschnitt zusammenhängend erklären und begründen, erforderliche Grundlagen kurz einführen, Vertiefungen optional aufklappbar machen und Beispiele, Rechenwege, Vergleiche bzw. Tabellen passend zum Thema wählen. Bestehender Inhalt darf bei der Umstellung nicht versehentlich entfallen. Reines Umverpacken des Alttextes zählt nicht als abgeschlossene Vertiefung.

**Abschlussbelege:** Vollständigkeitsliste aller aktuellen Abschnitte; fachliche und didaktische Gegenprüfung; E01/E02 aus dem Pilotreview bearbeitet; notwendige Builds, Regression, Suche/Detail-Links, erhaltene Aufgaben/Lernstände, mobile Bedienung, Barrierefreiheit und echte Offline-Nutzung geprüft. Nicht durchgeführte Prüfungen bleiben offen und dürfen nicht als bestanden gelten. Kapitelweise Umsetzung und Zwischenprüfungen auf dem Arbeitsbranch sind möglich, die abschließende Mergevorlage erfolgt nach dem Gesamtabschluss.

Claude bleibt Umsetzungseigner; ChatGPT unterstützt Ausarbeitung und Gegenprüfung. Dieser Auftrag ist keine Merge-/Live-Freigabe und behauptet keine bereits erfolgte Gesamtumsetzung.


## Passwortanmeldung · Auftrag vom 21.10.2026

**Quelle:** Lukes im Chat: „Lass es uns so machen, das man sich per passwort anmelden kann, so das man nicht immer mit einer mailmarbeiten muss“.

Damit ist die Umstellung des regulären Zugangs auf **E-Mail-Adresse und Passwort** beauftragt. Eine Mail soll nicht bei jeder Anmeldung nötig sein. Bestehende Konten müssen mit ihrem bisherigen Profil und ihren Daten weiterverwendet werden können.

ChatGPTs konkrete Ausarbeitung steht in [08-passwort-anmeldung.md](08-passwort-anmeldung.md): getrennte Anmeldung/Kontoerstellung, Passwort für Bestandskonten festlegen, Passwort vergessen/ändern und erhaltene E-Mail-Bestätigung bei Registrierung. Diese Details sind die Ausarbeitung des Auftrags, keine zusätzlichen wörtlichen Entscheidungen von Lukes. Claude bleibt Umsetzungseigner; bestehende Paketgrenzen gelten weiter. Die bereits erledigte Merge-Freigabe für B04 ist keine pauschale Freigabe dieses neuen Auth-Pakets.

<a id="merge-freigabe-2026-10-21"></a>

## Merge-Freigabe · 21.10.2026

**Quelle:** Lukes im Chat: „Übergabe an Claude mit Freigabe für merge“.

Lukes gibt Claude den Merge von `community-zugang` nach `main` frei. Grundlage sind der geprüfte Anwendungsstand `29ce674` und ChatGPTs Review/Übergabe `1660598`, ergänzt um die gezielte Behebung des dort noch offenen **B04**. B01–B03 sind abgeschlossen.

**Reihenfolge:** B04 beheben und die konkreten Abnahmen aus [Review 29ce674](review/2026-10-21-chatgpt-review-29ce674.md) sowie die erforderlichen betroffenen Tests/Builds bestehen lassen; danach mergen und das reguläre Deployment prüfen. Eine erneute gesonderte Merge-Freigabe ist nach dieser belegten Korrektur nicht nötig. Neue konkrete Blocker zurückmelden; keine zusätzliche allgemeine Audit-Runde.

**Nicht umfasst:** Öffnung der Klassen-Beta bzw. der bestehenden Paketsperre. Echte Upload-/Handyproben bleiben gesondert als durchgeführt oder offen zu dokumentieren. Für B04 ist keine neue Datenbankmigration erforderlich. Ausführung und Belege liegen bei Claude; diese Datei hält Lukes' Freigabe fest.

## Bilder im Feed · Auftrag vom 20.10.2026

**Quelle:** Lukes: „Man kann bei Azubipass keine Bilder im feed hochladen, lass uns das abändern“.

Damit ist die Produktänderung **Bilder in Feed-Beiträgen hochladen und darstellen** beauftragt. ChatGPT hat dafür [07-feed-bilder.md](07-feed-bilder.md) als konkrete Spec ausgearbeitet; Claude bleibt Umsetzungseigner.

Die Obergrenze fünf, Verteilung auf die Beitragsarten und Bedienungsdetails sind Arbeitsannahmen der Spec. Lukes hat diese Einzelheiten nicht gesondert beantwortet; sie werden hier nicht als zusätzliche ausdrückliche Freigaben ausgegeben. Keine neue produktive Migration, kein Merge/Deployment und keine Paketöffnung durch diesen Auftrag dokumentiert.

## E13 · konkretes Teamkonto benannt · 19.10.2026

**Quelle:** Lukes hat im Chat am 19.10.2026 direkt auf die Frage nach seinem
Community-Konto dessen konkrete E-Mail-Adresse genannt. Die bisher fehlende
Kontowahl ist damit entschieden. Die eigentliche Rollenvergabe ist noch auszuführen.

**Kontokennung für Claude:** SHA-256 der kleingeschriebenen, außen getrimmten
E-Mail-Adresse (UTF-8):

`37c238031ab7b79f296907a89b878625cb97a5fda778d70c1a196110873679f4`

Das Repository ist öffentlich; die vollständige private Mailadresse wird hier deshalb
nicht veröffentlicht. Claude gleicht diese Kennung mit den vorhandenen Konten in
`auth.users` ab. Nur bei genau einem Treffer und einem zugehörigen Community-Profil
dieses konkrete Konto verwenden. Keine andere Adresse, kein Demo-Teamkonto und kein
neu geratenes Konto als Ersatz einsetzen. Fehlt Konto oder Profil, den fehlenden
Einrichtungsschritt konkret zurückmelden.

**Ausführen:** Für dieses verifizierte Konto `public.profil.rolle = 'team'`
setzen und es bei weiter geschlossener Paketsperre in `public.beitraege_tester`
aufnehmen. Bestehende Rechte/Einträge erhalten, idempotent arbeiten und anschließend
Kontozuordnung, Rolle und Testerfreigabe lesend prüfen. E13 erst danach als umgesetzt
ausweisen. Keine Zugangsdaten oder vollständigen Kontolisten ins Repository schreiben.

Diese Kontowahl bestätigt weder weitere Texte/Datenschutzwerte noch SMTP-Versand,
Merge/Deployment oder Paketöffnung. Die übrige Betriebsrestliste bleibt bestehen.

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

| 2026-10-15 | G06 umsetzen und nach den vorgesehenen Prüfungen einspielen: Speicherobjekt vor Verwendungsprüfung sperren; direkter Beitrags-Insert nur für Gruppen-Textbeiträge ohne Datei. | 05-technik-plan-g06.md |
| 2026-10-15 | R03 als eigene Migration umsetzen und nach den vorgesehenen Prüfungen einspielen: bereits angelegte Antwort zuerst erkennen; Beitrag FOR SHARE vor der Sichtbarkeitsprüfung; Reihenfolge Beitrag → Vorgang → Antwort. | 06-technik-plan.md §12.2 |
| 2026-10-15 | E1: Prüfanfrage erst nach erster Teambestätigung einer automatischen Ausblendung. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E2: Wiedereinblenden bzw. Aufheben einer Prüfanfrage mit optionaler Korrektur in einer atomaren Entscheidung. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E3: Neutrale fachliche Vorlage verwenden und die betroffene Aussage konkret benennen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E4: Internes Feld darf leer sein, wenn der Server den vorhandenen Autortext übernimmt. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E5: Vorlagenverwaltung später; Texte je Entscheidung anpassbar. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E6: Eigene Antworten unter fremden ausgeblendeten Beiträgen in der Eigenansicht zugänglich halten. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E7: Antwortbezug an Teamkorrekturen mit aktueller Sichtbarkeitsprüfung aufnehmen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E8: Öffentlich „Team · Fachliche Korrektur“, intern handelndes Konto; keine Anonymität gegenüber direkten Datenabfragen versprechen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E9: Protokoll bis Ende der Klassen-Beta, spätestens 31.12.2026, behalten; dann über Behalten/Löschen entscheiden. Bis dahin keine automatische Löschung. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E10: Direkte Teamlöschung fremder Inhalte entfernen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E11: geloest nur über kontrollierte Abläufe setzen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E12: Bearbeitung eigener ausgeblendeter Inhalte weiter erlauben; aktuellen Stand vor Entscheidung prüfen. | 06-technik-plan.md / Review e3a7456 |
| 2026-10-15 | E14: Geprüften Spec-06-Technikplan auf Stand e3a7456 mit diesen Entscheidungen umsetzen und die vorgesehenen Migrationen nach den geplanten Prüfungen einspielen. E13-Kontozuweisung bleibt ausgesetzt, bis Lukes das konkrete Konto benennt. | 06-technik-plan.md, Stand e3a7456 |
| 2026-10-15 | Vier offene Texte einschließlich Antwortvariante bestätigt; vollständiger Wortlaut im Abschnitt unten. | Review e3a7456 §5 |
| 2026-10-15 | Übergaben und Reviews künftig direkt auf dem Arbeitsbranch über GitHub weitergeben; ChatGPT darf diese Dokumentation und ausdrücklich getroffene Nutzerentscheidungen im Auftrag committen und pushen. Merge, Deployment und Öffnen der Paketsperre bleiben gesondert freizugeben. | AGENTS.md; uebergabe.md |

## Freigabequelle 19.10.2026

Lukes im Chat, unmittelbar nach der positiven Gegenprüfung von R05–R07 und dem
Hinweis auf den R04-Rest: „okay also jetzt übergabe mit freigqbe qn clqude?“

Im Auftrag dokumentierter Umfang dieser Übergabe mit Freigabe:

- **R06/R07 einspielen:** die drei unveränderten, lokal und unabhängig geprüften
  Migrationen aus `06-korrektur-r06-r07.md` ins verbundene Supabase-Projekt einspielen
  und die vorgesehenen Live-Prüfungen durchführen; Paketsperre geschlossen lassen.
- **R04 abschließen:** den verbliebenen Dialog beim Verlassen der Community beheben,
  gezielt testen und regulär bauen; Claude bleibt Umsetzungseigner.
- **Übergabe über GitHub:** Auftrag, Belege und Ergebnis auf `community-zugang`
  dokumentieren; anschließend gezielte Rückgabe an ChatGPT.

Grundlage: [Review 1289140](review/2026-10-19-chatgpt-review-1289140.md),
Dokumentationscommit `fc27619`, geprüfter Anwendungsstand `1289140`.
Dies erweitert die Einspielfreigabe gezielt auf R06/R07. Keine Freigabe für
Merge/Deployment, Paketöffnung, E13 ohne konkretes Konto, ergänzte Texte,
fehlende Datenschutzangaben oder zurückgestellte DROP-Dateien.

## Freigabequelle 15.10.2026

Von Lukes im Chat nach der Gegenprüfung von `e3a7456`: „Okay dann gebe ich
jetzt hiermit meine Freigabe, bereite die Übergabe für Claude vor und können
wir es so machen das die Übergabe datein immer über github weitergegeben
werden?“

Im Auftrag von Lukes durch ChatGPT übertragen. Bezug ist der unmittelbar
zuvor vorgelegte [Review e3a7456](review/2026-10-15-chatgpt-review-e3a7456.md)
mit den dort dokumentierten Empfehlungen und vier Texten. Die Freigabe
umfasst G06, R03 und Spec 06 wie oben festgehalten; keine eigenständigen
zusätzlichen Produktentscheidungen durch ChatGPT.

**Historischer Stand am 15.10.2026 – inzwischen durch E13 oben ergänzt:** Damals war keine konkrete Konto-ID oder Mailadresse genannt.
Keine Rolle oder Testerfreigabe für ein geratenes Konto setzen; `test-neu1`
nicht automatisch übernehmen. Die übrige freigegebene Arbeit darf laufen.

## Bestätigte Texte vom 15.10.2026

1. „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts veröffentlicht, wird er endgültig verworfen. Wurde dein Beitrag bereits veröffentlicht, öffnen wir ihn.“

   Antwortvariante: „Mit ‚Eingaben ändern‘ prüfen wir den offenen Versuch. Wurde noch nichts gesendet, wird er endgültig verworfen. Wurde deine Antwort bereits gesendet, zeigen wir sie.“

2. „Solange der Versand läuft oder sein Ergebnis unklar ist, kannst du deine Eingaben nicht ändern.“

3. „Deine Eingaben konnten noch nicht verworfen werden. Versuch es erneut.“

4. „Deine Antwort wurde gesendet. Der aktuelle Stand konnte nicht geladen werden.“ – mit „Erneut laden“.

Merge nach `main`, Deployment, Öffnen der Paketsperre und zuvor gesondert
zurückgestellte `DROP`-Dateien sind mit dieser Freigabe nicht freigegeben.
