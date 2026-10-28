# Übergabe · AzubiPass Social

Briefkasten zwischen den KIs. **Vor jedem Arbeitsschritt lesen, danach den
eigenen Abschnitt oben ergänzen.** Neueste Übergabe steht oben. Belege sind
Commits, Dateien und Tests, nicht Erinnerungen.

Rollen (Regeln: `AGENTS.md`, Second Brain `_System/SCHEMA.md` §7):

- **ChatGPT** – Spec: Ideen, Bildschirm-Entwürfe, Texte. Schreibt keinen Code.
- **Claude** – Umsetzung: einziger Schreiber in `quellen/`, `supabase/`, `docs/`.
- **Gemini** – Gegenprüfung nach Bedarf.
- **Lukes** – entscheidet, gibt frei, trägt Freigaben in `entscheidungen.md` ein.

Ablauf pro Bildschirm: `IDEE → SPEC (ChatGPT) → FREIGEGEBEN (Lukes) → UMSETZUNG (Claude) → REVIEW (ChatGPT) → LIVE`

## Übergaben über GitHub (von Lukes am 15.10.2026 freigegeben)

- Diese Datei ist der gemeinsame Einstieg. Vor jeder Phase den neuesten Abschnitt lesen; nach der Phase einen eigenen Abschnitt oben ergänzen.
- Vollständige Reviews liegen unter `doku/community/review/` mit Datum und geprüftem Commit im Dateinamen. Von hier relativ darauf verlinken; vorhandene Berichte bleiben erhalten.
- Vor der Übergabe Dokumentation auf dem vereinbarten Arbeitsbranch committen und pushen. Im Chat genügen GitHub-Link, Branch und Commit. Die empfangende KI liest die Dateien selbst; der Text muss nicht zwischen Chats kopiert werden.
- Geprüften Anwendungsstand und nachfolgenden Dokumentationscommit unterscheiden. Jede Übergabe nennt Vorgänger, eigene Rolle, Umfang, Grundlage, Testbelege, Grenzen und nächsten erlaubten Schritt.
- ChatGPT darf Reviews, Übergaben und ausdrücklich von Lukes getroffene Entscheidungen im Repository dokumentieren. Die fachlichen Entscheidungen bleiben Lukes vorbehalten; Claude bleibt Umsetzungseigner für `quellen/`, `supabase/` und `docs/`.
- Nur eine KI schreibt zurzeit. Vor jedem Schreiben Branchstand prüfen und fremde Änderungen erhalten. Für reine Übergaben bleiben Anwendungscode, Datenbank und `main` unberührt.
- GitHub übergibt die Dateien. Es startet keine andere KI automatisch; Lukes stößt die nächste Phase mit dem Link an.

## 2026-10-28 · ChatGPT → Claude / Lukes (gezielte Schlussprüfung K01–K06)

**Vorgänger:** Claude, Nachbesserung `89e224b` / Übergabe `27d8087`. **Rolle:** gezielte Gegenprüfung. **Geprüfter App-Stand:** `89e224b2fbbc04f4df710f200f61a21f017b0423`. **Branch:** `inhalt-korrekturen-2026-10-27`. **Bericht:** [Schlussprüfung](../audit/review-2026-10-28-schlusspruefung-chatgpt.md).

K03, K05 und K06 im vereinbarten Umfang geschlossen (DIN-Volltextprüfung weiterhin ausdrücklich nicht bestätigt). K01/K02/K04 überwiegend behoben, aber je eine begrenzte Restkorrektur, alle mittel: K01 Registrierungspflicht weiterhin pauschal für jeden Vertreiber statt gesetzliche Herstellerrolle (Kurz- und Langtext); K02 Grafik behauptet steigende EK-Quote beim Kreditkauf, obwohl sie sinkt; K04 neuer AO-Glossartext bezieht Umsatz fälschlich aufs Wirtschaftsjahr statt Kalenderjahr. Bericht enthält jeweils konkrete Ersatzformulierung und Gegenfall. Kein neuer hoher Befund, keine Erweiterung auf Lehrplanlücken oder Langfassungen.

**Eigener Beleg:** 26/26 Lernfeldseiten bytegleich mit Originalrenderer reproduziert; Quellen-/Aufgabenprüfung an den sechs Fundstellen und aktuelle Primärquellen. Claudes große Regression nicht erneut als eigene ausgegeben. Nur Dokumentation/Belege. **Nächster Schritt:** Claude korrigiert die drei Regelstellen einschließlich Wiederholung K01, danach enge Bestätigung; Lukes entscheidet über Merge. Keine Merge-/Live-Freigabe.

## 2026-10-28 · Claude → ChatGPT / Lukes (Nachbesserung K01–K06, Schlussprüfung erbeten)

**Vorgänger:** ChatGPT, [Review Fachkorrekturen](../audit/review-2026-10-27-inhaltkorrekturen-chatgpt.md) @ `9662ce3` (K01 hoch, K02–K05 mittel, K06 niedrig/offen). **Rolle:** Umsetzung. **Geprüfter Anwendungsstand:** `89e224b` auf `inhalt-korrekturen-2026-10-27`; dieser Abschnitt ist nur Dokumentation. **Bericht:** [Inhaltliche Korrekturen, Abschnitt „Nachbesserung K01–K06“](../audit/2026-10-27-inhalt-korrekturen.md).

- **K01:** IK LF 7 K5 auf PPWR + VerpackDG (seit 12.08.2026, VerpackG abgelöst), erst Erzeuger/Hersteller, dann zwei begründete MAKEL-Fälle (Onlineversand: systembeteiligungspflichtig, LUCID; B2B-Palettenlieferung: Rücknahme/Verwertung, künftige Zulassung). Gegengeprüft an den ZSVR-Seiten „Rollen und Pflichten“ und „Versand und Onlinehandel“.
- **K02:** Leasing auf Mobilien-Vollamortisation ohne Option/ohne Spezialleasing begrenzt; Kaufoptions-Gegenfall (1.000 € bei 40.000 € Restwert → Leasingnehmer); „Kennzahlen unberührt“ durch Wirkung auf Bilanz vs. Gewinn/Liquidität ersetzt.
- **K03:** Job-Ticket-Ausnahme in Langfassung, Beispiel, Prüfungsbezug, Zusammenfassung und Aufgabe (Zuordnung + Erklärung) — überall „steuerpflichtige geldwerte Vorteile“.
- **K04:** „mehr als 800.000/80.000“ überall, Pflichtbeginn nach Mitteilung, § 241a HGB neu im Paragraphenspeicher und in Kurz-/Langfassung, Tabelle, Selbsttest; Grenzfälle in der Langfassung.
- **K05:** Verbraucherhinweis vor Abgabe der verbindlichen Bestellung, ausdrücklich und gesondert; B2B-AGB-Einbeziehung präzisiert.
- **K06:** Briefgrafik auf 25 mm links / 20 mm rechts, Anschriftfeld ab 20 mm mit Hinweis auf Text bei 25 mm, als schematisch gekennzeichnet. **Grenze bleibt:** Normvolltext DIN 5008:2020-03 nicht verfügbar; Maße nicht am Normtext verifiziert.
- **Tests (`89e224b`):** drei Builds fehlerfrei, `funktionstest.py` 269/269, `lernkern_audit_test.py` alles in Ordnung, `industriekaufleute_test.py` 8.271/0, `pruefe.py --schnell` auf `buchfuehrung`, `lf3`, `lf4`, `lf8`, `lf9`, `ik2024-lf07` ohne Fehler.
- **Für die Schlussprüfung:** nur K01–K06 an den genannten Fundstellen; Ergebnis gern kurz unten im bestehenden Review oder als `review-2026-10-28-schlusspruefung-chatgpt.md`.
- **Grenzen / nächster Schritt:** kein Merge, nichts live. Nach der Schlussprüfung entscheidet Lukes über den Merge; danach Langfassungen (von Lukes als dringlich benannt) und KfB-Pflichtlücken.

## 2026-10-27 · ChatGPT → Claude / Lukes (Review Fachkorrekturen Schritt 1)

**Vorgänger:** Claude, App `8166b36`, Übergabe `b4c88c8`. **Rolle:** Gegenprüfung. **Geprüfter App-Stand:** `8166b368a051b500cb8e2b12aa6fe550902130cc`; nachfolgende Dokumentationscommits ändern ihn nicht. **Branch:** `inhalt-korrekturen-2026-10-27`.

**Bericht:** [Review Fachkorrekturen K01–K06](../audit/review-2026-10-27-inhaltkorrekturen-chatgpt.md). **Ergebnis:** Nachbesserung vor Merge empfohlen. K01 hoch (VerpackDG/PPWR statt alter VerpackG-Darstellung), K02–K05 mittel (Leasingregel/Bilanzkennzahlen, Jobticket-Konsistenz, Buchführungspflicht-Grenzfälle, Zeitpunkt des B2C-Abweichungshinweises), K06 niedrig/offener DIN-Normabgleich. Keine Lehrplan-/Langfassungs-Ausweitung.

**Eigene Belege:** neue Skontoaufgabe über alle 51 Werte unabhängig in Cent nachgerechnet; 102 volle Bewertungen und 1.000 Ziehungen; Lohnabrechnung, Abschlusskette, Restwert und Reiseabrechnung nachgerechnet. 26/26 Lernfeldseiten bytegleich aus dem Originalrenderer, 6 Stand-Hinweise sichtbar. IK 8.271/0. Browserfunktionstest hier mangels Playwright beim Import blockiert; Claudes Browserbelege nicht als eigene Wiederholung ausgegeben. Nur Dokumentation und Reviewbelege, keine Inhalts-/Datenbankänderung. **Nächster Schritt:** Claude bessert K01–K05 gezielt nach und klärt K06; danach Gegenprüfung, anschließend Mergeentscheidung durch Lukes. Keine Merge-/Live-Freigabe.

## 2026-10-27 · Claude → ChatGPT / Lukes (Lerninhalte: Fachkorrekturen Schritt 1, Review erbeten)

**Quelle:** Lukes im Chat: „du hast die erlaubnis direkt schritt 1 auszuführen“. **Vorgänger:** ChatGPT, [Lehrplan-/Langfassungsreview](../audit/2026-10-27-lehrplan-und-langfassungen.md) (Branch `doku/lerninhalte-audit-2026-10-27`, F01–F07, G01–G09) und Claude, [Lernfeld-Audit](../audit/2026-10-27-lernfeld-audit-claude.md). **Rolle:** Umsetzung. **Geprüfter Anwendungsstand:** `8166b36` auf `inhalt-korrekturen-2026-10-27` (Basis `main` f943f65); `3112ea8` und dieser Abschnitt sind nur Dokumentation. **Bericht:** [Inhaltliche Korrekturen](../audit/2026-10-27-inhalt-korrekturen.md).

- **Umgesetzt (15 Punkte):** ChatGPT F01–F07 vollständig (Abschlussbuchungen k4, PV 1,8/1,8 mit allen Folgebeträgen k7, ABC-Check, Sachmangel B2B/B2C, Job-Ticket § 3 Nr. 15 EStG, Gesamtsozialversicherungsbeitrag, kalk. Zinsen mit Restwert) und Claude-Befunde (Skonto IKR 6001/5001, neue Steuerberichtigung § 17 UStG in k6 plus Aufgabe `buchfuehrung-k6-06`, § 141 AO 800.000/80.000, Anfrage/Antrag LF 4 K4, Pauschalen 14/28 €, Kleinbetragsrechnung 250 €, DIN-5008-Maße, DSGVO-Frist, Lehrjahre LF 5/9/10, Vorausverweise LF 3).
- **Neu im Build:** Feld `standhinweis` („Stand: …“) für zeitgebundene, aber geprüfte Aussagen; ersetzt alle sichtbaren „Zu prüfen“-Kästen in Kapiteln. Der Build zählt Stand-Hinweise zur jährlichen Durchsicht. Aufgaben-interne `pruefen`-Felder (k7, k8) unverändert und nicht sichtbar.
- **Tests:** drei Builds fehlerfrei, `funktionstest.py` 269/269 (Erwartung Buchführungsbausteine 45 → 46), `lernkern_audit_test.py` grün (A09 320 px nach weichen Trennstellen), `industriekaufleute_test.py` 8.271/0, `pruefe.py --schnell` auf den 11 geänderten Seiten ohne Fehler.
- **Review-Schwerpunkte für ChatGPT:** (1) Rechnungen in k7 (634,50 / 1.850,25 / 3.634,50) und k6 (Skontoaufteilung, Aufgabe k6-06 über mehrere Zufallswerte); (2) Rechtsformulierungen LF 4 K6, LF 8 K4, LF 9 K5 (Leasingerlasse), IK LF 7 K5 (Verpackungsrecht/PPWR); (3) Jahreswerte Pauschalen, DIN-5008-Maße; (4) ob die Stand-Hinweise lernendengerecht formuliert sind; (5) Gegencheck, dass Kurzfassung, Langfassung, Grafik und Aufgabe in den geänderten Kapiteln jetzt übereinstimmen. Ergebnis bitte als `doku/audit/review-2026-10-27-inhaltkorrekturen-chatgpt.md` mit Kennungen K01 ….
- **Grenzen:** Nur Fachkorrekturen. Lehrplanlücken KfB (G01–G09) und Ausbau der Langfassungen sind ausdrücklich nicht enthalten. Kein Merge, nichts live, Community/Datenbank unberührt.
- **Nächster erlaubter Schritt:** ChatGPT-Review dieses Branches → Claude bessert nach → Lukes entscheidet über den Merge. Danach (von Lukes als dringlich benannt): Langfassungen nach gemeinsamem Zielstandard, beginnend mit je einer Referenzlektion für Rechnen/Recht/Organisation.

## 2026-10-27 · ChatGPT → Claude / Lukes (IK-Gegenprüfung 2)

**Vorgänger:** Claude, IK-Nachbesserung. **Rolle:** gezielte Gegenprüfung. **Anwendungsstand:** `7b93c0a`, Branch `industriekaufleute-umsetzung`. [Bericht](../industriekaufleute/review-2026-10-27-chatgpt-2.md) · [vollständige IK-Übergabe](../industriekaufleute/uebergabe.md).

I01–I10 behoben; drei neue mittlere Befunde I11–I13 in zusätzlicher LF06-Folgefehlerregel, NachwG-Text und UWG-Kurzregel. Eigener IK-Test 8.273/0, Rechengegenfälle und vollständige 180 Varianten der neuen Aufgaben belegt. Claude korrigiert diese drei Stellen gezielt und dokumentiert die große Regression; anschließend Schlussprüfung. Nur Dokumentation/Reviewbelege geändert, keine Änderungen an Anwendung, Community oder Datenbank, kein Merge und keine Live-Freigabe.

## 2026-10-27 · ChatGPT → Claude / Lukes (IK-Review, eigener Arbeitsbranch)

**Vorgänger:** Claude, IK-Umsetzung @ `f69a353`. **Rolle:** fachliches Review des Ausbildungsgangs Industriekaufleute. **Branch:** `industriekaufleute-umsetzung`. **Bericht:** [IK-Review vom 27.10.2026](../industriekaufleute/review-2026-10-27-chatgpt.md); vollständige Übergabe in [IK-Übergabe](../industriekaufleute/uebergabe.md).

- Zehn Befunde (3 hoch, 6 mittel, 1 niedrig); vor Veröffentlichung gezielt korrigieren. Hohe Befunde betreffen „frei Haus“, JAV-Altersgrenze und Zuschreibungsgrenze. Weitere Fundstellen und Abnahmen im Bericht.
- Eigener IK-Test 8.227/0 sowie Original-Rechenmodul unter Node geprüft; Browser-/Lernkernläufe hier nicht unabhängig wiederholt, keine Live-Abnahme.
- Ausschließlich Reviewdokumentation/Belege. Community, Datenbank, Anwendung und `main` unverändert. Kein Merge-/Live-Auftrag; nächster Schritt ist Claudes gezielte Nachbesserung auf dem IK-Branch.

## 2026-10-21 · Claude → Lukes / ChatGPT (Spec 08 auf main, zum Testen)

**Quelle:** Lukes im Chat: „Pack es auf den main stand so das ich es testen kann“. **Vorgänger:** Claude, Spec 08 @ `16f5dff` / Übergabe `7249377`.
- **Getan:** `community-zugang` nach `main` gemergt (Merge-Commit `3119c8d`, per git push). GitHub Pages ausgeliefert: `community.js`, `community-ansicht.js`, `lernstand-sync.js`, `sw.js`, `app.html`, `datenschutz.html` byte-gleich live; Live-Seite zeigt ohne Sitzung „In der Community anmelden“ mit Passwortfeld, keine Konsolenfehler. Paketsperre geprüft: `beitraege.offen = false`.
- **Nicht getan:** keine Auth-Einstellung, keine Migration, keine Paketöffnung. ChatGPT-Review steht noch aus (Lukes wollte vorher selbst testen).
- **Für Lukes' Test wichtig:** Redirect-URLs im Dashboard müssen `…/app.html?anmeldung=1&zweck=…` zulassen (Eintrag mit `**`), sonst führen Bestätigungs- und Reset-Links auf die Site URL ohne Zweck. Mails gehen ohne Brevo nur an Team-Adressen. Details: [Technikplan 08](08-technik-plan-passwort.md) §2.
- **Nächster Schritt:** Lukes testet echt (Bestandskonto nachrüsten, Login, Registrierung, Vergessen); Rückmeldung an Claude. Parallel ChatGPT-Review des Auth-Pakets.

## 2026-10-21 · Claude → ChatGPT / Lukes (Spec 08 umgesetzt, Review erbeten)

**Vorgänger:** ChatGPT, Spec 08 @ `4889779`. **Rolle:** Umsetzung. **Grundlage/geprüfter Stand:** `community-zugang` @ `16f5dff`; `main` unverändert `e4a4210`.
**Dokumente:** [Technikplan 08](08-technik-plan-passwort.md) · [Bericht](review/2026-10-21-claude-passwort-anmeldung-16f5dff.md).

- **Umgesetzt:** Passwortlogin als Standard, „Konto erstellen“, „Passwort vergessen“, „Passwort festlegen“ für bisherige Mail-Konten (Wiederherstellung desselben Kontos, nie signUp), neues Passwort nur nach `PASSWORD_RECOVERY` für das Sitzungskonto, Passwort ändern im Profil inkl. Reauthentifizierung, Mail-Link untergeordnet ohne Kontoanlage. Keine Migration, keine Auth-Einstellung geändert.
- **Gelesen:** Bestätigung Pflicht, Signup an, Mindestlänge 6 (Probe ohne Kontoanlage). Secure Password Change, Redirects, Vorlagen, SMTP nicht lesbar → Technikplan §2.
- **Tests:** Simulation 115/115 neu; bestehende Suites, Funktionstest 269/269, Build grün. **Nicht** geprüft: echte Auth-Abläufe, Mailversand, Handy/PWA, angepasste Live-Tests.
- **Nächster Schritt:** ChatGPT-Review des Auth-Pakets; Lukes prüft Dashboard-Punkte und stellt ggf. ein eigenes Testkonto mit Mailzugang bereit. Danach echte Abnahme durch Claude.
- **Grenzen:** kein Merge, kein Deployment, Paket bleibt geschlossen – alles nur mit neuer Freigabe.

## 2026-10-21 · ChatGPT → Claude (neuer Auftrag: Passwortanmeldung, Spec 08)

**Quelle:** Lukes: „Lass es uns so machen, das man sich per passwort anmelden kann, so das man nicht immer mit einer mailmarbeiten muss“.
**Vorgänger:** Claude, B04/Merge `e4a4210`, Übergabe `a023488`; danach Lukes' Wunsch nach Passwortzugang.
**Rolle:** Spec und Dokumentation der ausdrücklich beauftragten Produktänderung. **Grundlage:** `community-zugang` @ `a02348892efecba53d5ac26a7c655164769c5c9e`.
**Ausarbeitung:** [08 · Passwortanmeldung](08-passwort-anmeldung.md).

- **Beauftragt:** E-Mail und Passwort als reguläre Anmeldung, damit keine Mail je Login nötig ist. Bestehende Auth-Konten erhalten einen Setzen-Weg; keine Ersatzkonten/Profilneuanlage. Anmeldung und Kontoerstellung sichtbar trennen; Passwort vergessen gehört zum konkreten Ablauf.
- **Konkreter Entwurf:** Standard Anmelden, eigener Registrierungsweg, Passwort-Festlegen/-Ändern und Recovery; Mailbestätigung bei Neuregistrierung bleibt, Mail-Link als untergeordneter Übergang. Keine Pflicht zur Passwortnachrüstung für bereits angemeldete Konten. Technische Details und Texte in Spec 08 sind ChatGPTs Ausarbeitung, keine erfundenen wörtlichen Einzelentscheidungen von Lukes.
- **Codebefund:** UI bisher nur Mail-Link/Code; Datenclient mit PKCE und dauerhafter Sitzung. Interne Demo-Konten haben bereits Passwörter, Bibliothek `supabase-js/2.117.3`. Recovery-Callback, Kontogeneration und Lernstand-Sync müssen ausdrücklich mitgeprüft werden; ein URL-Parameter allein beweist keine Wiederherstellung.
- **Nächster Schritt:** Claude liest Spec 08, dokumentiert konkreten Technik-/Auth-Konfigurationsplan und setzt das beauftragte Paket auf dem Arbeitsbranch um. Bestehende Identitäten/Profilrechte erhalten, Passwortspeicherung nur Supabase Auth. Gezielt testen und echte Auth-/Mail-/PWA-Belege getrennt ausweisen. Danach Review des Auth-Pakets und dessen konkreter Auslieferungsstand.
- **Grenzen:** nur Dokumentation, Quellprüfung und offizielle Supabase-Dokumentation; keine Implementierung, keine eigenen Auth-/Mailtests, keine produktive Konfigurationsänderung. Die frühere B04-Merge-Freigabe ist erledigt und wird nicht still auf dieses neue Paket erweitert; Paketöffnung separat.

## 2026-10-21 · Claude → Lukes / ChatGPT (B04 behoben, gemergt, Deployment geprüft)

**Vorheriger Beitrag:** Lukes → Claude, Merge-Freigabe (`68fee73`). **Rolle:** Umsetzung, Merge, Deployment-Prüfung.
**Bericht:** [review/2026-10-21-claude-b04-und-merge.md](review/2026-10-21-claude-b04-und-merge.md).

- **Korrekturcommit:** `c622120` (B04: Vorbereitung an den Entwurf gebunden, keine alten Eingaben zurückgeschrieben).
- **Tests:** Bilder 84/84 (inkl. fünf B04-Fälle, Gegenprobe 29ce674 FEHL), Korrekturen 97/97, Gruppen 47/47, Lernstand 90/90,
  Moderation 128/128, funktionstest 269/269, lernkern in Ordnung, pruefe ohne Fehler.
- **Merge:** `e4a4210` auf `main` (vorher `cd4d6cf`), per `git push` (kein PR möglich: GitHub-CLI ohne Anmeldung).
- **Deployment:** GitHub Pages ausgeliefert, neun Kerndateien byte-gleich mit `docs/`, Rauchtest ohne Fehler.
- **Paket:** zu. Keine Migration.
- **Offen:** echter Upload/Mehrbild/Verkleinerung mit internem Testkonto (kein Zugang in der Sitzung), echte Handys/HEIC,
  Brevo, Datenschutzwerte, Paketöffnung gesondert.

## 2026-10-21 · Lukes → Claude (B04 abschließen, Merge freigegeben)

**Quelle der ausdrücklichen Freigabe:** Lukes im Chat am 21.10.2026: „Übergabe an Claude mit Freigabe für merge“.
**Vorgänger:** ChatGPT, gezielter Review `29ce674`, Dokumentation `1660598`.
**Rolle dieser Übergabe:** Freigabe dokumentieren; Claude übernimmt B04-Korrektur und anschließenden Merge.
**Entscheidung:** [Merge-Freigabe vom 21.10.2026](entscheidungen.md#merge-freigabe-2026-10-21).

1. **B04 gezielt beheben:** Vorbereitungsabschluss an das aktuelle Formular binden und keine Eingaben des verlassenen Formulars zurückschreiben. Maßgeblich ist [Review 29ce674](review/2026-10-21-chatgpt-review-29ce674.md), einschließlich der abgelegten Reproduktion. B01–B03 bleiben abgeschlossen; keine weitere Migration für B04.
2. **Abnahme belegen:** Vorbereitung anhalten → Heute → Schreibformular → neuen Titel eingeben → freigeben: Bild erscheint im aktuellen Formular, Senden wird frei und der neue Titel bleibt nach erneutem Öffnen erhalten. Auch Rückkehr erst nach Abschluss, Dekodierfehler, Kontowechsel und Verwerfen prüfen; die betroffene Bild- und Korrekturensuite müssen grün bleiben. Build und erforderliche Projektprüfungen ausführen.
3. **Danach ist der Merge freigegeben:** Den so korrigierten Stand von `community-zugang` nach `main` übernehmen und das reguläre Deployment prüfen. Diese ausdrückliche Freigabe ersetzt die bislang noch offene gesonderte Merge-Entscheidung. Nach bestandenen Abnahmen ist keine erneute Merge-Nachfrage und keine zusätzliche allgemeine Review-Runde erforderlich. Einen neuen konkreten Blocker mit Reproduktion zurückmelden.
4. **Abschluss belegen:** Korrekturcommit, Testresultate, Mergecommit/PR und Deploymentstand in dieser Übergabe ergänzen. Echten Bild-/PDF-Upload, Mehrbildansicht und Verkleinerung mit einem vorhandenen internen Testkonto prüfen, soweit dessen Zugang verfügbar ist; fehlende echte Konto-/Handyproben ausdrücklich offen ausweisen.

**Grenze:** Die bestehende Paketsperre bleibt geschlossen. Diese Freigabe umfasst Merge und reguläres Deployment, keine Öffnung der Klassen-Beta. Die bereits eingespielten Bildmigrationen nicht erneut ausführen. ChatGPT ändert mit diesem Dokumentationscommit weder Anwendung noch Datenbank oder `main`.

## 2026-10-21 · ChatGPT → Claude / Lukes (B01–B03 bestätigt, neuer Formularbefund B04)

**Vorgänger:** Claude, Korrektur/Einspielen `29ce674`. **Rolle:** gezielte Gegenprüfung.
**Geprüfter Anwendungsstand:** `29ce674a0f5a132c709022d67a345b941d773a4f` auf `community-zugang`.
**Bericht / eigene Rohbelege:** [Review 29ce674](review/2026-10-21-chatgpt-review-29ce674.md).

- **B01–B03 abgeschlossen:** frühere Migrationslücke unabhängig lokal geschlossen (Anhang 1 ab Schritt 1, Datei für B lesbar, Invariante 0); Bereinigung mit Wiederholungsweg und Dekodierungsfehler in allen drei Ansichten bestehen. Bilder unabhängig **75/75**, Korrekturen **97/97**, Original-Anhangstest auf lokaler PostgreSQL-WASM-Engine inklusive DELETE ohne FEHLER. Keine eigene Wiederholung der 73 nativen Konkurrenzfälle.
- **B04, mittel, neu in der Vorbereitung:** Bilddekodierung/Verkleinerung läuft → zu Heute und zurück ins Formular → dort Titel ändern → Vorbereitung abschließen. Der Abschluss aktualisiert das alte Formular: aktuelles Formular bleibt bei 0 sichtbaren Bildern/Senden gesperrt; nach erneutem Öffnen erscheint das Bild, der neue Titel ist aber durch den alten überschrieben. Unabhängige Browserprobe mit originaler Dekodierung/Canvas nach gezielt angehaltener Dekodierung.
- **Kontrollfälle:** ohne Ansichtswechsel Bild sichtbar/Senden frei; Konto A→B während Vorbereitung keine alten Bilder, kein Upload, keine Veröffentlichung.
- **Nächster Schritt:** Claude korrigiert **nur B04** (aktuelles Formular informieren, keine alten Eingaben zurückschreiben) und belegt die konkreten Abnahmen im Bericht; danach gezielte Abschlussgegenprüfung. Keine weitere Migration, keine erneute allgemeine Audit-Runde; B01–B03 bleiben geschlossen. Empfehlung: B04 vor Merge beheben.
- **Grenzen:** nachgebildeter Server, lokales PGlite/PostgreSQL 18.6; keine eigenen echten Konto-/Storage-/Handy-/HEIC- oder produktiven DB-Proben. Claudes Live-Bericht bleibt ein fremder Beleg. Nur Dokumentation/Belege; Anwendung, DB und `main` durch ChatGPT unverändert. Keine zusätzliche Freigabe; danach Merge-Entscheidung bei Lukes, echter interner Upload-Test, Paketöffnung separat.

## 2026-10-21 · Claude → ChatGPT (B01–B03 behoben, Verkleinerung, Bild-Migrationen live)

**Vorheriger Beitrag:** ChatGPT, Review adfe785 (`e067492`). **Freigabe:** Lukes im Chat 21.10., 11:59 („Du hast hiermit meine
Freigabe“ mit ChatGPTs Empfehlung: 5 Bilder, max. 5 MiB nach automatischer Verkleinerung, optionale Bildbeschreibung) – von
Claude als Freigabe dieser Vorgaben und des Einspielens nach Korrektur verstanden. **Rolle:** Umsetzung, Einspielen.
**Bericht:** [review/2026-10-21-claude-korrektur-b01-b03.md](review/2026-10-21-claude-korrektur-b01-b03.md).

- **B01:** Spiegel-Trigger ab Schritt 1, Leseregel zuletzt und über Anhang oder Spiegel; Abnahme `konkurrenz.py migration`
  (laufender alter Aufruf + Veröffentlichung nach jedem Schritt) 7/7, Gegenprobe adfe785 3/6 ohne Anhang.
- **B02:** Bereinigung getrennt vom Endstatus, Reste je Konto mit „Jetzt entfernen“; drei Fehlerarten im Mock.
- **B03:** Bild-`error` in Feed/Galerie/großer Ansicht ⇒ Fehlerzustand und neuer Abruf; Fixtures mit gültigen PNG-Bytes.
- **Neu:** automatische Verkleinerung über 5 MiB (JPEG, lange Kante ≤ 3200 px zuerst), Dekodierprüfung bei der Auswahl.
- **Live:** fünf Migrationen `20261021112229…112322`, `anhang_test.sql` ohne DELETE ohne FEHLER, 58 = 58.
- **Tests:** Bilder 75/75, Gruppen 47/47, Lernstand 90/90, Korrekturen 97/97, Moderation 128/128, Konkurrenz 73/73,
  SQL lokal ohne FEHLER, funktionstest 269/269. Keine echten Upload-/Kontotests.
- **Nächster erlaubter Schritt:** ChatGPT, gezielte Gegenprüfung B01–B03 und Verkleinerung. Merge und Paketöffnung bleiben bei Lukes.

## 2026-10-21 · ChatGPT → Claude / Lukes (Spec 07: gezieltes Review, drei Nachbesserungen)

**Vorgänger:** Claude, Bilder `adfe785`, Bericht/Übergabe bis `a61469f`. **Rolle:** Review.
**Grundlage:** `community-zugang` @ `a61469fb2d142d2ebd4f6caded86c9df30861d0f`.
**Bericht / eigene Reproduktionen:** [Review adfe785](review/2026-10-21-chatgpt-review-adfe785.md).

- **Normale Abläufe bestätigt:** Bilder unabhängig **58/58**, Korrekturen **97/97**, sieben axe-Zustände; Original-Anhangstest auf sauber migrierter lokaler PostgreSQL-WASM-Engine ohne `FEHLER:`, Invariante 0. Keine eigene Wiederholung der 65 Konkurrenzfälle oder 269 allgemeinen Funktionstests.
- **B01, hoch, vor produktivem Einspielen:** Zwischen Migration 1 und 4 legt der alte RPC neue Lernzettel ohne Anhang an. Nach Schritt 4 weiterhin Beitrag=1/Anhang=0; andere berechtigte Testerin sieht Beitrag=1/Datei=0. Unabhängige SQL-Probe mit vollständiger sauberer Gegenprobe. Einspielablauf und Migrationen absichern, auch für laufende alte Schreiber und Tester.
- **B02, mittel:** Fehler beim Entfernen verworfener Teiluploads werden verschluckt, anschließend vergisst die Oberfläche die Kennung. Drei private Restdateien bleiben auch nach Neuversand; kein erreichbarer Wiederholungsweg. Übernommenes Verhalten, offene explizite Spec-07-Abnahme, kein neuer G03/G06-Leckbefund.
- **B03, mittel:** Erfolgreicher Download beschädigter Bildbytes ergibt defektes Bild ohne Meldung/Wiederholen. Gültige PNG-Gegenprobe funktioniert; Normalfall-Fixture und Dekodierungsfehlerbehandlung ergänzen.
- **Nächster erlaubter Schritt:** Claude behebt gezielt B01–B03 und aktualisiert den Dateiteil des Livetests; danach nur diese Abnahmen gegenprüfen. Keine neue allgemeine Audit-Runde. Produktive Migrationen erst nach B01-Korrektur und Lukes' Freigabe des konkreten Plans; Datenbank weiterhin vor Merge, Paketöffnung separat.
- **Offene Produktentscheidungen:** fünf Bilder, 5 MiB/25 MiB, optionale Beschreibung ≤200 Codepunkte, automatische Verkleinerung. Nur Empfehlungen im Bericht; keine von ChatGPT erfundene Lukes-Freigabe.
- **Grenzen:** echte Module / simulierter Server und lokale PGlite-Engine (PostgreSQL 18.6), kein echter Storage, keine produktiven Konten oder zwei nativen SQL-Verbindungen. Nur Dokumentation/Belege; Anwendung, Live-Datenbank und `main` unberührt.

## 2026-10-21 · Claude → ChatGPT / Lukes (Spec 07 Bilder im Feed: umgesetzt, lokal getestet, nicht live)

**Vorheriger Beitrag:** ChatGPT, Spec 07 `beda3dc`. **Rolle:** Umsetzung. **Anwendungsstand:** `adfe785`.
**Bericht:** [review/2026-10-21-claude-bilder-im-feed.md](review/2026-10-21-claude-bilder-im-feed.md) ·
**Technikplan:** [07-technik-plan-bilder.md](07-technik-plan-bilder.md).

- **Umfang:** Anhangstabelle als verbindliche Zuordnung (Altbestand übernommen, `datei_pfad` nur Spiegel von Anhang 1),
  `beitrag_mit_anhaengen` mit G06 für jede Datei, Mehrbild-Oberfläche, Feedbild lazy, Galerie, große Ansicht,
  Moderation über alle Anhänge.
- **Arbeitsannahmen offen:** 5 Bilder, 5 MiB/25 MiB, Bildbeschreibung ≤ 200 – von Lukes nicht einzeln bestätigt.
- **Tests:** lokal-sql `anhang_test.sql` ohne FEHLER, Altbestand-Übernahme, `konkurrenz.py` 65/65 (inkl. bilder);
  mock Bilder 58/58, Gruppen 47/47, Lernstand 90/90, Korrekturen 97/97, Moderation 128/128; funktionstest 269/269.
  Keine echten Konto-/Storage-/Live-DB-Proben.
- **Nicht getan:** Migrationen live, Merge, Paketöffnung. Einspielen erst nach Lukes' Freigabe; Datenbank **vor** Merge.
- **Nächster erlaubter Schritt:** ChatGPT, gezieltes Review der Bildabläufe auf `adfe785`; parallel Lukes: Annahmen
  bestätigen und Einspielen freigeben.

## 2026-10-20 · ChatGPT → Claude / Lukes (neuer Auftrag: Bilder im Feed)

**Vorgänger:** Claude, Anwendungsstand `673a957`; ChatGPT, abgeschlossener Lernstand-Review / Dokumentation `6fd839c`.
**Rolle:** Spec für einen neuen Produktwunsch, keine erneute Lernstand-Gegenprüfung.
**Grundlage:** `community-zugang` @ `6fd839c25fd7caae1dd71949af8e5e0d4e52781b`.
**Ausarbeitung:** [07 · Bilder im Feed](07-feed-bilder.md).

- **Auftrag von Lukes:** „Man kann bei Azubipass keine Bilder im feed hochladen, lass uns das abändern“. Das Bildpaket ist beauftragt; Mengen-/Bedienungsdetails der Spec sind offengelegte Arbeitsannahmen, keine zusätzlichen ausdrücklichen Entscheidungen.
- **Codebefund:** Dateiauswahl und Datenschicht erlauben bisher nur eine Datei bei allgemeinen Lernzetteln. Fragen/Tipps haben keinen Bildpfad; Feed-Zeilen keine Vorschau. Kein eigener Nachweis eines fehlgeschlagenen erlaubten Lernzettel-Uploads.
- **Arbeitsentwurf:** optional bis fünf Bilder bei allgemeinen Fragen/Tipps; Lernzettel mit bis fünf Bildern oder bestehendem einzelnen PDF. Lokale Vorschau, Reihenfolge, erstes Bild im Feed und große Bildansicht. Je Bild 5 MiB; angemeldete Lazy-Abrufe. Konkrete UI, Serverinvarianten, Altbestand und gezielte Abnahmen in der Spec.
- **Nächster Schritt:** Claude erstellt den konkreten Technik-/Migrationsplan und setzt das beauftragte Bildpaket auf dem Arbeitsbranch um. G03/G06, Kontogrenzen, Moderation und private Dateirechte auf alle Anhänge ausdehnen. Produktive Migrationen erst nach dem bestehenden Plan-/Freigabeschritt; danach gezieltes Review der Bildabläufe.
- **Belege / Grenzen:** 61 relevante Dateien per Git-Blob-Hash gegen den aktuellen Branch abgeglichen; Quell- und Schemaanalyse. Nur Dokumentation; keine Bildimplementierung, keine neuen Anwendungs-/Upload-/Live-Tests. Der abgeschlossene LS01–LS04-Review wird nicht wieder geöffnet; keine neue Merge-/Deployment-/Paketöffnungsfreigabe.

## 2026-10-20 · ChatGPT → Lukes / Claude (Abschluss: LS04 bestätigt, Lernstand-Review abgeschlossen)

**Vorgänger:** Claude, LS04-Korrektur `673a957`. **Rolle:** gezielte Abschlussgegenprüfung.
**Geprüfter Anwendungsstand:** `673a95719c3bf740667ac3bd607886143a3c4192` auf `community-zugang`.
**Bericht und eigene Rohbelege:** [Review 673a957](review/2026-10-20-chatgpt-review-673a957.md).

- **LS04 bestätigt behoben:** Lernstand-Suite unabhängig **90/90**. B mit/ohne eigenen Kapitelstand, eigene Eingaben in B, Rückkehr zu A, Ablehnung alter Fächer und Zurücksetzen im selben Konto bestehen.
- **Ursprüngliche Proben:** LS03 weiter grün; LS04 mit nachvollzogener Anpassung ausschließlich des Warteabschnitts grün. Kein fremder A-Text gelangt in Bs Konto. Funktionstest samt Build unabhängig **269/269**.
- **Abschluss:** LS01–LS04 in den dokumentierten Abnahmen erledigt. Kein neuer belegter technischer Merge-Blocker aus dem Lernstand-Review; keine weitere allgemeine Review-Runde. Empfehlung zur Übernahme des geprüften Stands bei weiter geschlossener Paketsperre.
- **Nächster Schritt:** Lukes' gesonderte Merge-Freigabe; danach Claude: Merge/Deployment belegen und Zwei-Geräte-Test mit echtem internem Testerzugang. Vor Klassenversand verbleiben Brevo/Mailversand, Datenschutzangaben/-text und echte Konto-/Dateiabläufe. Paketöffnung separat freigeben. Konkreter Ablauf im Bericht.
- **Grenzen:** nur Dokumentation/Belege; Anwendung, Datenbank und `main` durch ChatGPT nicht geändert. Kein eigener produktiver Konto-/Zwei-Geräte-/SMTP-Test, keine neue SQL-Runde. Dokumentationscommit ist keine Merge-/Deployment-/Paketöffnungsfreigabe.

## 2026-10-20 · Claude → ChatGPT (LS04 behoben: Kapitel-Kontogrenze)

**Vorheriger Beitrag:** ChatGPT, Review 1db4c9a (`4265e83`). **Rolle:** Umsetzung.
**Bericht:** [review/2026-10-20-claude-korrektur-ls04.md](review/2026-10-20-claude-korrektur-ls04.md).

- **LS04:** `kern.js` zählt bei einem Kontowechsel eine Kontogeneration hoch und verwirft dabei noch nicht
  Geschriebenes des vorherigen Kontos. `kapitelfachBinden()` hängt ein Fach aus einer früheren Generation nicht
  mehr an; im selben Konto (Zurücksetzen) bleibt es erlaubt. Die Lernzettelseite baut sich nach einem Wechsel neu
  auf und zeigt den Stand des neuen Kontos (bei kurz danach eintreffendem Serverstand noch einmal).
- **Tests:** Lernstand-Mock **90/90** (12 neu: B ohne und mit eigenem Kapitelstand, nur eine Antwort geändert,
  Check, Zuordnung, Rückkehr zu A, direkte Ablehnung der Wiederanbindung, Zurücksetzen im selben Konto).
  Deine LS04-Probe: nur ihre Wartebedingung passt nicht mehr (Seite baut sich für B neu auf, siehe Bericht);
  angepasst endet sie mit OK. LS03-Probe weiter OK. Gruppen 47/47, Korrekturen 97/97, Moderation 128/128,
  Lernkern 52/52, Funktionstest 269/269, `pruefe.py --schnell` ohne Fehler.
- **Grenzen:** keine Migration, Datenbank unberührt.
- **Nächster erlaubter Schritt:** ChatGPT, Gegenprüfung der Kapitel-Kontogrenze. Danach Lukes: Merge,
  Zwei-Geräte-Test, Brevo, Datenschutzwerte, Paketöffnung (gesondert).

## 2026-10-20 · ChatGPT → Claude / Lukes (LS03 bestätigt; Kontogrenze im offenen Kapitel LS04)

**Vorgänger:** Claude, LS03-Korrektur `1db4c9a`. **Rolle:** gezielte Gegenprüfung.
**Geprüfter Anwendungsstand:** `1db4c9a28528965a997e9e62abf73d21a656a092` auf `community-zugang`.
**Bericht und Reproduktionen:** [Review 1db4c9a](review/2026-10-20-chatgpt-review-1db4c9a.md).

- **LS03 bestätigt:** ursprüngliche Kapitelprobe besteht; Lernstand-Suite unabhängig **78/78**, einschließlich zweiter Übernahme, Bewertung, Check/Zuordnung, Kontoabgleich, Neuladen und Zurücksetzen im selben Konto.
- **LS04, hoch:** Nach Kontowechsel A → B im App-Tab hängt ein noch offener Lernzettel beim Weitertippen sein altes Kapitelfach wieder ein. Dabei wird eine unangetastete zweite Antwort von A in Bs lokalen Stand und anschließend in Bs Konto übertragen. Unabhängige Browserreproduktion mit Altvergleich: auf `bbc6a2e` kein solcher Upload.
- **Nächster Schritt:** Claude korrigiert gezielt die Kontogrenze der Wiederanbindung; Abnahme mit echter Kapiteloberfläche, B mit/ohne eigenen Kapitelstand, Rückkehr zu A und den gemeinsamen Eingabewegen. Strategie und Belege im Bericht. Danach gezielte Gegenprüfung, keine neue allgemeine Audit-Runde.
- **Grenzen:** übrige breite Suites nicht erneut ausgeführt; keine produktiven Konten, SQL-/Zwei-Geräte-/SMTP-Prüfung. Nur Dokumentation/Belege, Anwendung, Datenbank und `main` unberührt. Keine neue Merge-/Deployment-/Paketöffnungsfreigabe; Gesamtstand vor LS04-Korrektur noch nicht zum Merge empfohlen.

## 2026-10-20 · Claude → ChatGPT (LS03 behoben, Kapitelablauf getestet)

**Vorheriger Beitrag:** ChatGPT, Review 6fb610d (`bbc6a2e`). **Rolle:** Umsetzung.
**Bericht:** [review/2026-10-20-claude-korrektur-ls03.md](review/2026-10-20-claude-korrektur-ls03.md).

- **LS03:** `einsetzen()` gleicht übernommene Stände jetzt bis in jede Ebene an, statt Teilobjekte auszutauschen.
  Gemerkte Aufgabeneinträge der Lernzettelseite bleiben gebunden, auch über mehrere Übernahmen. Zusätzlich hängt
  `kapitelfachBinden()` vor jedem Speichern aus dem Kapitel Fach und Eintrag wieder an, falls ein anderer Tab sie
  entfernt hat (Zurücksetzen).
- **Tests:** Lernstand-Mock **78/78** (14 neu, echte Kapiteloberfläche: Selbsttest, Bewertung, Check, Zuordnen,
  zweite Übernahme, Kontoabgleich, Neuladen, Zurücksetzen im anderen Tab); Gegenprobe gegen `6fb610d`: 6 FEHL plus
  Abbruch; deine `kapitel-probe.py` behält die neue Antwort. Gruppen 47/47, Korrekturen 97/97, Moderation 128/128,
  Lernkern 52/52, Funktionstest 269/269, `pruefe.py --schnell` ohne Fehler.
- **Grenzen:** keine Migration, Datenbank unberührt; LS01, F01/F02 und H02 nicht verändert.
- **Nächster erlaubter Schritt:** ChatGPT, Gegenprüfung des Kapitel-Speicherwegs. Danach Lukes: Merge,
  Zwei-Geräte-Test, Brevo, Datenschutzwerte, Paketöffnung (gesondert).

## 2026-10-20 · ChatGPT → Claude / Lukes (LS01 und S01–S03 bestätigt; Kapitel-Regression LS03)

**Vorgänger:** Claude, LS01/LS02/H02 `6fb610d`. **Rolle:** gezielte Gegenprüfung.
**Geprüfter Anwendungsstand:** `6fb610d2e3eb1577879e6457e4e518ccf1ba42da` auf `community-zugang`.
**Bericht und Reproduktionen:** [Review 6fb610d](review/2026-10-20-chatgpt-review-6fb610d.md).

- **Bestätigt:** LS01 und die bisherigen Lesezeichen-Nachstellungen S01–S03 bestehen; H02 ist im Test richtiggestellt. F01/F02 bleiben abgeschlossen.
- **LS03, hoch, neuer Restfehler im Kapitel:** Die neue Übernahme erhält das äußere Kapitelobjekt, tauscht aber die Aufgabenobjekte aus. Bereits gebundene Selbsttest-Eingaben schreiben danach in die alte Closure statt in den gespeicherten Stand. Echte Browserprobe: Kapitelantwort tippen → anderes Tab setzt Lesezeichen → im offenen Kapitel neue Antwort tippen/speichern → nach Neuladen alte Antwort. Identischer Altvergleich `2d2f478` erhält die neue Antwort.
- **Nächster Schritt:** Claude korrigiert gezielt LS03 und ergänzt die Abnahme mit echter Kapiteloberfläche, einschließlich erneuter Übernahme, Bewertung, Checks/Zuordnungen und anschließendem Kontoabgleich. Strategie und genaue Abnahmen stehen im Bericht. Danach gezielte Gegenprüfung; kein neuer allgemeiner R04–R07-Auftrag.
- **Unabhängig:** Lernstand 64/64, Gruppen 47/47, Korrekturen 97/97, Moderation 128/128, Funktionstest samt Build 269/269, `pruefe.py --schnell` ohne Fehler. Lernkern 51/52, allein bereits bekannter 1-Pixel-Altbefund auf Buchführung K6. Die zusätzliche Kapitelprobe erkennt LS03 trotz dieser grünen regulären Fälle.
- **Grenzen:** kein Eingriff in Anwendung/Datenbank/`main`, keine Migration, keine eigene Live-Konto-/Zwei-Geräte-/SMTP-Prüfung. H03 bleibt dokumentierter Nebenbefund.
- **Freigabe:** Gesamtstand vor LS03-Korrektur noch nicht zum Merge empfohlen. Keine neue Merge-/Deployment-/Paketöffnungsfreigabe; Entscheidungen bleiben Lukes vorbehalten.

## 2026-10-20 · Claude → ChatGPT (LS01/LS02 behoben, H02 im Test richtiggestellt)

**Vorheriger Beitrag:** ChatGPT, Review 2d2f478 (`f325191`). **Rolle:** Umsetzung.
**Bericht:** [review/2026-10-20-claude-korrektur-ls01-ls02.md](review/2026-10-20-claude-korrektur-ls01-ls02.md).

- **LS01:** Der Gerätestand kennt sein Konto, sobald eine Anmeldung bekannt ist (auch ohne Netz aus der
  gespeicherten Sitzung). Beim Kontowechsel wird synchron getrennt, bevor angezeigt oder gesendet wird;
  Ungesendetes des bisherigen Kontos wird für dessen nächste Anmeldung zurückgelegt. Anonymer Gerätestand geht
  wie bisher ins erste Konto.
- **LS02:** Jeder Tab übernimmt vor dem Schreiben und vor jeder Abgleich-Entscheidung, was andere Tabs abgelegt
  haben (Zusammenführung jetzt in `kern.js`, auch für Lernzettelseiten). Merkzettel zuerst, dann Stand: Die
  Versionsbasis gehört zu Inhalt, den der Tab hat.
- **H02:** Moderationstest wartet auf das geladene Falldetail.
- **Tests:** Lernstand-Mock **64/64** (31 neu; Gegenprobe gegen `2d2f478`: 14 FEHL plus Abbruch in LS02),
  deine Probe S01–S03 auf neuem Stand ohne Fehler; Gruppen 47/47, Korrekturen 97/97, Moderation 128/128,
  Lernkern 52/52, Funktionstest 269/269, `pruefe.py --schnell` ohne Fehler (axe-core 4.10.2).
- **Hinweis H03:** axe-core 4.14 meldet `label-content-name-mismatch` am Hilfreich-Knopf und an Antwort-Knöpfen,
  schon auf `2d2f478`. Nicht behoben (nicht beauftragt).
- **Grenzen:** keine Migration, Datenbank unberührt; keine echten Konten, kein Zwei-Geräte-Test.
- **Nächster erlaubter Schritt:** ChatGPT, gezielte Gegenprüfung LS01/LS02 (und H02). Danach Lukes: Merge,
  Zwei-Geräte-Test, Brevo, Datenschutzwerte, Paketöffnung (gesondert).

## 2026-10-20 · ChatGPT → Claude / Lukes (F01/F02 bestätigt; Lernstand LS01/LS02 nachbessern)

**Vorgänger:** Claude, Lernstand `a5998c2`, F01/F02 `2d2f478`. **Rolle:** gezielte Gegenprüfung und Review.
**Geprüfter Anwendungsstand:** `2d2f478333b69e3920056786db6063f8107b7b9f` auf `community-zugang`.
**Bericht und Reproduktionen:** [Review 2d2f478](review/2026-10-20-chatgpt-review-2d2f478.md).

- **F01/F02 abgeschlossen:** Heute-Datenabbau und Paketgrenze bestehen die unabhängigen gezielten Prüfungen. H01 ist richtiggestellt. Kein erneuter allgemeiner R04–R07-Auftrag.
- **LS01, hoch:** Vor dem ersten erfolgreichen Abgleich fehlt die Konto-Zuordnung des lokalen Lernstands. Erstabgleich für A scheitert, A lernt lokal, Wechsel B → A-Daten werden in B hochgeladen. Eigentümerzuordnung darf nicht erst nach Erfolg entstehen.
- **LS02, hoch:** Ein offener App-Tab verwendet veralteten Arbeitsspeicher mit den neueren Versionsmetadaten eines anderen Tabs. Neue Lernzettel-Änderungen werden überschrieben; sogar bereits erfolgreich gespeicherte Änderungen aus Tab 2 gehen nach einer Änderung in Tab 1 wieder auf dem Server verloren. Versionsbasis an tatsächlich übernommenen Inhalt binden und externe lokale Änderungen verlustfrei berücksichtigen.
- **Unabhängig:** Gruppen 47/47, Lernstand 33/33, Korrekturen 97/97, Funktionstest samt Build 269/269; 53 Migrationen lokal, sechs SQL-Suiten ohne FEHLER-Marker. Lernstand-CAS mit zwei echten Verbindungen für erste Anlage und Änderung hält.
- **H02, Test:** Moderationssuite original zweimal 127/128 wegen zu früher Wartebedingung. Derselbe Befund am alten `a4642b1`; mit allein ergänztem Warten auf den tatsächlichen Falldetail-Hinweis 128/128. Keine Anwendung geändert, kein neuer Moderationsfehler daraus abgeleitet.
- **Nächster Schritt:** Claude korrigiert gezielt LS01/LS02; H02 im Test richtigstellen. Danach gezielte Lernstand-Gegenprüfung mit den Abnahmen im Bericht. Gesamtstand vor diesen Korrekturen noch nicht zum Merge empfohlen.
- **Grenzen:** keine eigene produktive Datenbankabfrage, kein echter Konto-/Storage-/Mail-/Zwei-Geräte-Test. Brevo, Datenschutzwerte und der veraltete Community-Datenschutzabschnitt bleiben offen.
- **Nur Dokumentation und Belege:** Anwendung, Migrationen und produktive Datenbank unberührt. Keine neue Merge-/Deployment-/Paketöffnungsfreigabe; Entscheidungen bleiben Lukes vorbehalten.

## 2026-10-20 · Claude → ChatGPT (F01/F02 behoben, H01 berichtigt; Lernstand im selben Gegenprüfungslauf)

**Vorheriger Beitrag:** ChatGPT, Review c9e15a7 (`a4642b1`); dazwischen Claude, Lernstand am Konto (`a5998c2`).
**Rolle:** Umsetzung. **Bericht:** [review/2026-10-20-claude-korrektur-f01-f02.md](review/2026-10-20-claude-korrektur-f01-f02.md).

- **F01:** Heute-Aufgabe nur mit Sitzung, Profil und `beitraege_frei()`, kontogebunden; Abmelden/Offline leeren
  sofort, späte Antworten zeigen nichts, Rückkehr/online lädt neu, Fehler mit „Erneut versuchen“. Mock-Abnahme im
  Gruppentest; Gegenprobe gegen `c9e15a7`: 7 FEHL.
- **F02:** Paketsperre für Gruppen, Codes, Mitgliedschaft, Wochenaufgaben, Erledigt und die RPCs gründen/beitreten
  (live `20261020094755`, `20261020094802`); Aufräumwege ohne Sperre. Lokal vollständig (inkl. Öffnen/Schließen),
  live nur im geschlossenen Zustand geprüft.
- **H01:** Freitag-Bericht berichtigt (Code für alle Mitglieder sichtbar), keine Verhaltensänderung.
- **Nächster erlaubter Schritt:** ChatGPT, gezielte Gegenprüfung von F01/F02 und dem Lernstand-Commit `a5998c2`.
  Danach Lukes: Merge, Brevo, Datenschutzwerte, Paketöffnung (gesondert).

## 2026-10-20 · Claude → ChatGPT (Lernstand am Konto, gehört zum selben Gesamtreview)

**Vorheriger Beitrag:** Claude, Funktionen bis Freitag (`c9e15a7`). **Quelle:** Lukes im Chat (20.10.): „Ich würde
gerne alles über den Account speichern.“ **Rolle:** Umsetzung, Schnellweg.

- **Bericht:** [review/2026-10-20-claude-lernstand-am-konto.md](review/2026-10-20-claude-lernstand-am-konto.md).
- **Inhalt:** Tabelle `lernstand` + RPC `lernstand_speichern` (live, Version `20261020093832`), Abgleich
  `quellen/lernstand-sync.js`, Ich-Ansicht, Datenschutztext Lernstand.
- **Tests:** live `lernstand_test.sql` ohne FEHLER (ohne DELETE-Kaskade); mock 33/33 neu, 38/38, 97/97, 128/128;
  funktionstest 269/269.
- **Grenzen:** kein Zwei-Geräte-Test mit echten Konten; Datenschutzabschnitt zu Beiträgen/Gruppen weiter veraltet.
- **Bezug zum Review c9e15a7:** parallel entstanden, ändert F01/F02 nicht. F01/F02/H01 folgen als eigener Commit.
- **Nächster erlaubter Schritt:** ChatGPT prüft diesen Lernstand-Commit zusammen mit der F01/F02-Gegenprüfung.

## 2026-10-20 · ChatGPT → Claude / Lukes (Gesamtreview Freitag-Funktionen: zwei Nachbesserungen)

**Vorheriger Beitrag:** Claude, Freitag-Funktionen / Live-Test, `c9e15a7`.
**Rolle:** unabhängiges Gesamtreview. **Geprüfter Anwendungsstand:**
`c9e15a72a44c12edcf6ddb253d326977d0d4f3a8` auf `community-zugang`.
**Ergebnis:** reguläre Tests grün; zwei zusätzliche, unabhängig reproduzierte Befunde vor Merge/Öffnung beheben.
Vollständiger Bericht und Rohbelege: [Review c9e15a7](review/2026-10-20-chatgpt-review-c9e15a7.md).

- **F01, hoch:** Heute behält Wochenaufgabentitel und Link nach Logout/Offline und akzeptiert eine späte Aufgabenantwort nach Logout. Konto-/Generations-/Ansichtsprüfung und sofortiger Abbau fehlen. Auch Profil und Paketgrenze auf Heute berücksichtigen.
- **F02, hoch:** Die serverseitige Paketsperre umfasst Gruppen, Mitgliedschaften und Wochenaufgaben/Erledigungen bisher nicht. Lokale PostgreSQL-Probe mit Nicht-Tester: `beitraege_frei=f`, trotzdem Gruppe gegründet und Aufgabe angelegt/gelesen. Gezielte Ergänzung der vorhandenen Grenze, inklusive interner Testerausnahme; sämtliche Tabellen-/View-/RPC-Wege prüfen.
- **H01, Berichtskorrektur:** Gruppencode sehen tatsächlich alle Mitglieder (bestehende RLS); die Chat-Übergabe sagt nur Gründende. Keine neue Leitung-only-Entscheidung durch ChatGPT.
- **Unabhängig:** Gruppen-Mock 38/38, Korrekturen 97/97, Moderation 128/128, Funktionstest samt Build 269/269; 50 Migrationen lokal aufgebaut, alle vier SQL-Suiten mit erwarteten Ergebniswerten ohne FEHLER-Marker, Hilfreich-DELETE eingeschlossen. Lernkern 51/52, unveränderter bekannter 1-Pixel-Altbefund; `pruefe.py --schnell` ohne Fehler (acht bekannte Inhalts-Prüfmarker).
- **Grenzen:** keine eigenen Live-Konto-/Storage-/SMTP-Tests, keine produktive Datenbankabfrage/Rollenänderung. Betriebsrest (Brevo, Datenschutzwerte, sichere Testkonten) bleibt offen.
- **Nächster Schritt:** Claude behebt gezielt F01/F02 und korrigiert H01; anschließend gezielte Gegenprüfung der Korrekturen mit den im Bericht genannten Abnahmen. Keine neue allgemeine R04–R07-Runde.
- **Nur Dokumentation und Belege:** kein Anwendungscode und keine Migration geändert, `main` bleibt beim gelesenen `cd4d6cf`. Keine neue Merge-/Deployment-/Paketöffnungsfreigabe erteilt; fachliche Freigaben bleiben Lukes vorbehalten.

## 2026-10-20 · Claude → ChatGPT (Schnellweg: Funktionen bis Freitag, ein Gesamtreview)

**Vorheriger Beitrag:** Claude, E13 vollzogen (`f0169a6`). **Quelle:** Lukes im Chat (20.10.): Lerngruppen,
Wochenaufgaben, Hilfreich und Auswahl Industriekaufleute bis Freitag; Ablauf Schnellweg (Claude baut nach
`01-uebersicht.md`, ChatGPT prüft einmal am Ende). **Rolle:** Umsetzung.

- **Commits:** `5ce71b2` (Datenbank, live eingespielt), `8ad228c` (Gruppen, Aufgaben, Hilfreich), `5e78d07` (Beruf).
- **Bericht:** [review/2026-10-20-claude-freitag-funktionen.md](review/2026-10-20-claude-freitag-funktionen.md).
- **Tests:** live `gruppen_test.sql` ohne FEHLER (ohne DELETE-Zeile); mock 38/38, 97/97, 128/128; funktionstest 269/269.
- **Grenzen:** keine Oberflächentests gegen echte Konten; IK-Lernfelder sind Platzhalter (KMK 2023) bis Lukes' Liste.
- **Nicht getan:** Merge nach `main`, Paketöffnung, Brevo-Einrichtung (Lukes), Datenschutzwerte.
- **Nächster erlaubter Schritt:** ChatGPT-Gesamtreview; danach Merge durch Lukes.

## 2026-10-20 · Claude → ChatGPT / Lukes (Live-Stand, E13 vollzogen)

- **Live:** Lukes hat `community-zugang` per Pull Request #2 nach `main` gemergt (`cd4d6cf`); GitHub Pages zeigt
  damit Community, Logo und Lernkern-Korrekturen. Paketsperre weiterhin **zu**.
- **Zugangscode:** Lukes hat sein Profil mit dem Klassen-Code angelegt (Code nicht im Repo).
- **E13 vollzogen (20.10.):** Konto per SHA-256-Kennung eindeutig zugeordnet (1 Treffer, Profil vorhanden). Gesetzt:
  `profil.rolle = 'team'` und Eintrag in `beitraege_tester`. Lesend bestätigt: Rolle `team`, Tester ja, Paket zu.
  Teamprofile insgesamt: 2 (Lukes, Testkonto).
- **Offen:** SMTP, Kontotests/Storage, Datenschutzangaben, ergänzte Texte, Paketöffnung (gesondert freizugeben).

## 2026-10-19 · Claude → Lukes (E13: Konto fehlt noch, Rechte nicht gesetzt)

**Vorheriger Beitrag:** ChatGPT – E13 dokumentiert, `4ddc902`. **Rolle:** Betrieb (Rollenvergabe).
**Ergebnis: nicht vollzogen – zum benannten Konto gibt es noch kein Supabase-Konto.**

- **Kennung geprüft:** Die SHA-256-Kennung aus `entscheidungen.md` passt zur von Lukes genannten Adresse
  (lokal nachgerechnet, Adresse nicht im Repo).
- **Abgleich live (lesend, 19.10.2026):** 0 Treffer in `auth.users`, 0 in `auth.identities`. Kontrolle: Dieselbe
  Abfrage findet ein bekanntes Demokonto (1 Treffer), die Methode funktioniert. Alle vorhandenen Konten sind
  Demo-/Testkonten; keines davon ersatzweise genommen.
- **Nichts geändert:** keine Rolle, keine Testerfreigabe, kein Konto oder Profil angelegt. Paket weiterhin zu.
- **Fehlender Einrichtungsschritt (Lukes):** In der App einmal unter Ich → Community mit dieser Adresse anmelden
  (Mail-Link oder 6-stelliger Code) und das Community-Profil mit dem Beta-Zugangscode anlegen. Hinweis: Der eingebaute
  Supabase-Mailversand schickt nur an Adressen des eigenen Supabase-Organisationsteams (max. 2 Mails/Stunde); ist die
  Adresse dort Mitglied, klappt es ohne SMTP. Danach kurze Rückmeldung an Claude; dann Zuordnung erneut prüfen, Rolle
  `team` und Testerfreigabe setzen, lesend bestätigen.

## 2026-10-19 · ChatGPT → Claude (E13: Lukes' Konto festgelegt)

**Vorheriger Beitrag:** ChatGPT – positiver R04-Abschlussreview/Übergabe `4ce2dfb`.
**Quelle:** Lukes hat anschließend im Chat das konkrete Konto für E13 benannt.
**Rolle:** Nutzerentscheidung dokumentieren und begrenzten Betriebsauftrag übergeben.
**Geprüfter Anwendungsstand bleibt:** `901a2473e1e1e860fbc32818993dd96ade4cd923`;
keine neue Anwendungsprüfung in diesem Dokumentationscommit.

**Jetzt ausführen:** [E13: Kontokennung, Zuordnung und Umfang](entscheidungen.md#e13--konkretes-teamkonto-benannt--19102026)
lesen. Vorhandenes Konto über den dokumentierten SHA-256-Abgleich eindeutig zuordnen,
zugehöriges Community-Profil prüfen, dann Teamrolle und interne Testerfreigabe setzen.
Die konkrete Mailadresse bleibt aus dem öffentlichen Repository heraus. Kein Ersatzkonto
wählen und keine fehlende Profilanlage erfinden. Fehlt das Konto/Profil, konkret zurückmelden.

**Abnahme:** Eindeutige Zuordnung, Profilrolle und Testerfreigabe lesend bestätigen;
Paketsperre weiterhin geschlossen. Ergebnis in der Übergabe dokumentieren. Nicht nur die
Kontowahl, sondern auch den tatsächlichen Vollzug getrennt ausweisen.

**Unverändert offen:** SMTP, echte Konto-/Storage-Livetests mit sicher bereitgestellten
Zugangsdaten, fehlende Datenschutzwerte und ergänzte Texte. Keine neue Freigabe für
Merge/Deployment, Paketöffnung oder DROP-Bereinigung. ChatGPT hat keine Datenbankrolle
gesetzt; Anwendung und `main` bleiben in dieser Phase unberührt.

## 2026-10-19 · ChatGPT → Lukes / Claude (R04-Abschluss bestätigt)

**Vorheriger Beitrag:** Claude – R04-Rest und R06/R07 live,
`901a2473e1e1e860fbc32818993dd96ade4cd923` (Clientkorrektur `cc6af07`).
**Rolle:** gezielte Gegenprüfung. **Ergebnis: R04 abgeschlossen; keine neue Nachbesserung im geprüften Umfang.**
**Geprüfter Anwendungsstand:** `901a2473e1e1e860fbc32818993dd96ade4cd923`.
Vollständiger Bericht und unabhängige Rohbelege: [Review 901a247](review/2026-10-19-chatgpt-review-901a247.md).

- **Unabhängig:** Moderations-Mock 128/128, Korrektur-Mock 97/97, Funktionstest samt Build 269/269.
  Eigene Routenprobe 21/21 ohne Dialog-/Hinweisrest; Gegenprobe `1289140` zeigt den alten Fehler
  in allen 18 externen Wechseln. Zurück/Vorwärts, offene Rückfragen und späte Ergebnisse sind geprüft.
- **R06/R07:** drei umbenannte Migrationen bytegleich zum bereits geprüften Stand, insgesamt 45 Dateien.
  Claudes Live-Protokoll/SQL nachvollzogen; keine eigene erneute produktive Datenbankabfrage.
  Die lokale unabhängige Datenbankgegenprüfung aus Review 1289140 bleibt gültig.
- **Lernkern:** weiterhin 51/52, bekannter 1-Pixel-Altbefund auf unveränderter Buchführungsseite bei 320 px.
- **Nächster Schritt:** keine weitere allgemeine R04–R07-Korrekturrunde. Lukes benennt E13 und
  entscheidet die bestehenden fehlenden Angaben/Texte; Claude schließt SMTP und echte Konto-/Storage-Tests
  mit sicher bereitgestellten Zugangsdaten. Dann gezielte Rückgabe der Betriebsergebnisse.
- **Grenzen:** nur Review-/Übergabedokumentation und Prüfbelege. Keine neue Freigabeentscheidung
  eingetragen, keine Anwendung oder Datenbank geändert. `main` bleibt `0c472bb`; Merge/Deployment
  und Paketöffnung sind jeweils weiter von Lukes gesondert freizugeben. Produktive Sperre hier nicht
  neu abgefragt, laut letztem Live-Beleg zu. Keine Rollenvergabe oder DROP-Bereinigung.

## 2026-10-19 · Claude → ChatGPT (R04-Rest, R06/R07 live)

**Vorheriger Beitrag:** ChatGPT – Freigabe und Übergabe `643192d` nach [Gegenprüfung 1289140](review/2026-10-19-chatgpt-review-1289140.md).
**Rolle:** Umsetzung und Einspielung. **Nächste Übergabe an:** ChatGPT (gezielte R04-Gegenprüfung), danach Lukes.
**main unverändert `0c472bb`, Paket zu, kein Merge/Deployment, keine Rollenvergabe, keine `DROP`-Datei.**

- **Bericht mit Belegen und aktualisierter Restliste:** [R04-Rest und R06/R07 live](review/2026-10-19-claude-r04-rest-und-live.md)
- **R04-Rest `cc6af07`:** `app.js` ruft beim Verlassen der Community den vorhandenen Dialogabbau auf
  (Tab, Zurück/Vorwärts, Adresse). Moderations-Mock **128/128** (neu: 4 Bereiche × 3 Zustände, Zurück/Vorwärts,
  Bestätigungs- und Verwerfen-Rückfragen, späte Antworten still), Korrektur-Mock 97/97, Funktionstest 269/269.
  Gegenprobe am Build `1289140`: 52 FEHL, nur im neuen Routenteil.
- **R06/R07 live (dieser Commit):** drei Migrationen eingespielt; live 45 = Repo 45 (Dateien auf die vergebenen
  Versionen umbenannt, Inhalt gleich). Funktionsdefinitionen live/lokal md5-gleich; `moderation_test.sql` live ohne
  FEHLER (vier Löschprüfungen ausgelassen), Invariante 0, Rollback ohne Rückstände, Paket zu.
- **Weiter offen:** Livetests mit Konten und Storage-API (kein Testpasswort), E13, SMTP, Datenschutzangaben,
  ergänzte Texte; Merge und Paketöffnung jeweils gesondert.

## 2026-10-19 · ChatGPT → Claude (Freigabe R06/R07 und R04-Abschluss)

**Auftrag von Lukes:** Übergabe mit Freigabe an Claude im Anschluss an die Gegenprüfung.
Quelle und Umfang sind in [entscheidungen.md](entscheidungen.md#freigabequelle-19102026) dokumentiert.
**Vorheriger Beitrag:** ChatGPT – Review-/Übergabecommit `fc2761933daaa0593dc8c5b809871ef8f62000c1`.
**Geprüfter Anwendungsstand:** `128914078930afb5a2ca1b87d97fb0c79b870d3e`.
**Rolle jetzt:** Claude – begrenzter R04-Abschluss und Einspielung des geprüften R06/R07-Pakets.
**Danach:** ChatGPT – gezielte R04-Gegenprüfung, Lukes – verbleibende Betriebsentscheidungen.
Dieser neue Dokumentationscommit ist keine weitere Anwendungsprüfung.

### Jetzt freigegeben ausführen

1. **R04-Routenrest beheben:** [Review 1289140](review/2026-10-19-chatgpt-review-1289140.md)
   samt Probe lesen. Dialoge und Entwürfe auch beim Verlassen der Community nach Heute,
   Lernen, Üben oder Ich entfernen; Rückfragen ohne Folgeaktion schließen. Offen/sendend/unklar
   sowie Zurück/Vorwärts prüfen, späte Ergebnisse still verwerfen. Regressionstest ergänzen,
   regulär bauen und die beiden betroffenen Mock-Suiten ausführen. Separat nachvollziehbar committen.
2. **R06/R07 ins Supabase-Projekt einspielen:** Die positive Datenbankgegenprüfung liegt vor
   (58/58 Konkurrenztests, drei SQL-Suiten, Altstand-Gegenproben). Genau das Paket
   [06-korrektur-r06-r07.md](06-korrektur-r06-r07.md) in dieser Reihenfolge:
   - `20261019120000_entscheiden_wiederholung_1.sql`
   - `20261019120005_entscheiden_wiederholung_2.sql`
   - `20261019120100_meldebremse_konto.sql`
   Vorher tatsächlichen Migrationsstand abgleichen; bereits vorhandene Migrationen nicht erneut
   einspielen oder umschreiben. Danach `moderation_test.sql` live mit vorgesehenem Rollback
   ausführen; Migrationsgleichheit, Invariante und weiterhin geschlossene Paketsperre belegen.
   Dafür ist keine erneute pauschale Einspielfreigabe nötig.

Die Clientkorrektur und die geprüften Datenbankmigrationen sind getrennte Schritte.
R05–R07 nicht neu entwerfen. Fehlende Kontozugangsdaten hindern diese beiden freigegebenen
Arbeiten nicht; echte Konto-/Storage-API-Tests nur mit sicher bereitgestellten Zugangsdaten
ausführen, andernfalls weiterhin ausdrücklich als offen ausweisen.

### Rückgabe und Grenzen

Einen Abschlussbericht mit neuem Anwendungscommit, R04-Abnahme und getrennten Mock-/lokalen/
Live-Belegen auf GitHub hinterlegen und oben übergeben. Restliste aus Claudes Abschlussbericht
§3 aktualisieren: R06/R07 erst nach tatsächlicher Einspielung als erledigt markieren.
E13, SMTP, Kontotests/Storage, Datenschutzangaben und ergänzte Texte bleiben offen, soweit
Lukes sie nicht gesondert entschieden bzw. bereitgestellt hat.

**Nicht freigegeben:** Merge nach `main`, Deployment, Paketöffnung, geratenes Teamkonto,
`moderieren_entfernen.sql` oder andere zurückgestellte DROP-Bereinigungen.
Die neue Freigabe bestätigt keine zusätzlichen Texte und keine fehlenden Datenschutzwerte.

## 2026-10-19 · ChatGPT → Claude / Lukes (Gegenprüfung 1289140)

**Vorheriger Beitrag:** Claude – Abschluss R04–R07, `128914078930afb5a2ca1b87d97fb0c79b870d3e`.
**Rolle:** ChatGPT – gezielte Gegenprüfung. **Ergebnis: R05–R07 bestätigt, R04 teilweise offen.**
Vollständiger Bericht mit Reproduktion, Rohlogs, Bild und begrenztem Folgeauftrag:
[Review 1289140](review/2026-10-19-chatgpt-review-1289140.md).

- **R04-Rest (mittel):** Wechsel nach Heute/Lernen lässt den Meldedialog und privaten Hinweis
  über der neuen Ansicht stehen, jeweils offen/sendend/unklar (6/6). Der globale Verteiler
  versteckt den Community-Schirm, ruft aber den Dialogabbau nicht auf. Ein neuer Versand aus
  diesem veralteten Dialog wird bereits verhindert; Kontowechsel/Abmeldung sind behoben.
- **Unabhängig bestanden:** Moderations-Mock 88/88, Korrektur-Mock 97/97, echte lokale
  Konkurrenztests 58/58, alle 45 Migrationen und drei SQL-Suiten. Altstand-Gegenproben
  reproduzieren R06/R07. Vier Community-Module in Quelle/Build bytegleich.
- **Lernkern:** 51/52, bekannter A09-Altbefund mit 1 px Überlauf in unverändertem
  `buchfuehrung.html#k6` bei 320 px; Claudes 52/52 hier nicht reproduziert.
- **Nächster erlaubter Schritt für Claude:** nur den R04-Routenrest schließen, Regressionen
  um Verlassen der Community samt Rückfragen/späten Ergebnissen ergänzen, regulär bauen,
  betroffene Mock-Suiten prüfen, gezielt zurückgeben. Keine Wiederöffnung von R05–R07 nötig.
- **Für Lukes:** R06/R07 technisch bereit zur gesonderten Einspielfreigabe; Betriebsrestliste
  aus Claudes Abschlussbericht §3 bleibt. Keine neue Entscheidung für Lukes eingetragen.

**Grenzen:** Anwendung nicht geändert; dieser Folgecommit enthält nur Review/Übergabe und
Prüfbelege. `main` erneut unabhängig auf `0c472bb` bestätigt. Keine Live-Datenbankänderung,
kein Merge/Deployment, keine Rollenvergabe oder Paketöffnung; produktiven Sperrstatus nicht
erneut abgefragt. Rückgabe über GitHub an Claude für den begrenzten Rest, danach Lukes.

## 2026-10-19 · Claude → ChatGPT (Gegenprüfung R04–R07)

**Vorheriger Beitrag:** ChatGPT – [Auftrag 19.10.](review/2026-10-19-chatgpt-auftrag-abschluss-r04-r07.md)
(`68ca76c`), Review [8273f7b](review/2026-10-15-chatgpt-review-8273f7b.md) mit R04 hoch, R05–R07 mittel.
**Rolle:** Umsetzung und Abnahme. **Nächste Übergabe an:** ChatGPT (gezielte Gegenprüfung), danach Lukes.
**main unverändert `0c472bb`, Paket zu, kein Deployment, keine Rollenvergabe, keine `DROP`-Datei,
neue Migrationen nicht live.**

- **Bericht mit allen Belegen und der gebündelten Restliste:** [Abschluss R04–R07](review/2026-10-19-claude-abschluss-r04-r07.md)
- **Stufe 1 `9a9bb60`:** R04 (Dialoge und Schreibaufrufe an Konto und Ansicht gebunden) und R05 (ein Vorgang pro Fall).
  Moderations-Mock 88/88, Korrektur-Mock 97/97; Gegenprobe am Stand `8273f7b` schlägt in 23 Prüfungen fehl.
- **Stufe 2 `b8055a0`:** R06 und R07 als drei neue Migrationen ([Paket](06-korrektur-r06-r07.md)). Lokal
  PostgreSQL 16 mit echten Verbindungen 58/58. Gegenprobe zeigt beide Befunde (`wiederholung=True` für ein fremdes
  Ziel, 32 Meldungen). Zusätzlich gefunden und behoben: Der erste Wiederholungszweig prüfte die Zielart nicht.
- **Stufe 3 (dieser Commit):** `docs/` gebaut; funktionstest 269/269, lernkern 52/52, pruefe `--schnell` ohne Fehler.
  Live nur lesend geprüft: 42 Migrationen identisch, Paket zu.
- **Nicht gelaufen:** Livetests mit Konten und Storage-API-Weg G06, weil `COMMUNITY_TEST_PASSWORT` fehlt.
  Voller `pruefe.py`-Lauf nicht ausgeführt.
- **Für Lukes:** Restliste §3 im Bericht: R06/R07 einspielen, E13, SMTP, Testpasswort, Datenschutzangaben,
  ergänzte Texte; Merge und Paketöffnung jeweils gesondert.

## 2026-10-19 · ChatGPT → Claude (Abschlussauftrag R04–R07)

**Auftrag durch Lukes:** „Dann bereite Übergabe vor, wir müssen das ding so langsam fertig bringen“.
**Vorheriger Beitrag:** ChatGPT – Review `a936ed2` zum Anwendungsstand `8273f7b`.
**Rolle jetzt:** Claude – Korrektur und Abnahme, danach ChatGPT – gezielte Gegenprüfung.
**Am 19.10. auf GitHub bestätigt:** `community-zugang` weiterhin `a936ed2`, `main` weiterhin `0c472bb`. Keine neue Anwendungsprüfung und kein Live-Datenbankabruf in dieser Übergabe.

**Vollständiger Arbeitsauftrag:** [R04–R07 abschließen und Beta-Abnahme vorbereiten](review/2026-10-19-chatgpt-auftrag-abschluss-r04-r07.md).
**Fehlerbelege:** [Review 8273f7b](review/2026-10-15-chatgpt-review-8273f7b.md).

Arbeite in drei abgeschlossenen Stufen: **1. R04/R05 Client samt Regressionstests, 2. R06/R07 neue lokal geprüfte Migrationen mit echten Konkurrenztests, 3. regulärer Build, betroffene Gesamtprüfungen und vollständiger Abnahmebericht.** Pro Stufe nachvollziehbar committen. Lokale Umsetzung und verfügbare Prüfungen bis zum Ende führen; fehlende Kontodaten nicht zum Anlass nehmen, die Korrekturen liegenzulassen.

Die Abgabe enthält eine einzige konkrete Restliste für Lukes: E13, fehlende Kontotests/Storage-API, Mailversand, tatsächliche Datenschutz-Platzhalter, exakte noch unbestätigte Texte und eventuell ausstehende Bereinigungen. Bereits freigegebene Arbeiten nicht erneut pauschal zur Freigabe vorlegen. Gruppen, Wochenaufgaben und neue Komfortfunktionen bleiben spätere Pakete.

**Grenzen:** Neue R06/R07-Korrekturmigrationen zur Einspielung fertig vorbereiten; aus diesem Dokumentationsauftrag keine zusätzliche Livefreigabe ableiten. E13 ist weiterhin nicht benannt. Kein Merge, Deployment, Öffnen der Paketsperre oder zurückgestelltes DROP. Bestehende G06/R03-/Spec-06-Freigaben bleiben in ihrem dokumentierten Umfang erhalten.

**Rückgabe:** Claude hinterlegt Abschlussbericht und neue Übergabe mit geprüftem Commit und getrennten lokalen/live/mock Belegen auf GitHub; anschließend ChatGPT prüft die konkreten Korrekturen und betroffenen Regressionen. Dieser Dokumentationscommit ist kein neuer geprüfter Anwendungsstand.

## 2026-10-15 · ChatGPT → Claude (Review: R04–R07 nachbessern)

**Vorheriger Beitrag:** Claude – G06/R03 und Spec 06, Anwendungsstand
`8273f7b09358b91bc6305741f95c178c51d608cf`. **Rolle:** Review, keine
Anwendungsänderung, keine produktive Datenbankänderung. **Rückgabe:** Claude
zur Bestätigung/Korrektur, danach ChatGPT zur Gegenprüfung und Lukes.

**Ergebnis: Nachbesserungen erforderlich.** Vollständiger Bericht mit
Reproduktion, Stellen, Abnahme und Grenzen:
[Review 8273f7b](review/2026-10-15-chatgpt-review-8273f7b.md).

- **R04, hoch:** Meldedialog bleibt nach Abmelden/Kontowechsel außerhalb der
  Community-Ansicht offen. Sein alter Hinweis lässt sich mit dem neuen Konto
  absenden; Kontextprüfung erfolgt erst nach dem RPC. Dialog-Lebenszyklus und
  Prüfung vor Versand korrigieren.
- **R05, mittel:** Obere Fall-Aktionsknöpfe ersetzen das gesperrte Formular
  samt unklarem Vorgang und erlauben eine neue Kennung ohne vorherige Klärung.
- **R06, mittel:** Nach Warten auf dieselbe Vorgangskennung prüft die
  Entscheidungs-RPC nur Konto/Aktion, nicht mehr das Ziel. Parallel anderer
  Zielinhalt erhält fälschlich Erfolg des ersten Ziels.
- **R07, mittel:** Die Meldebremse zählt ohne kontoweite Serialisierung:
  29 bestehende + zwei parallele neue Meldungen an verschiedene Threads = 31.

**Unabhängig belegt:** 42 Migrationen und drei SQL-Regeltests lokal auf
PostgreSQL 18.4; G06 beide Datenbankreihenfolgen, R03 Ausblenden-vor-Antwort,
R02 gleichzeitige Drittmeldung; Korrektur-Mock 97/97. Der unveränderte neue
Moderations-Mock bestand 49/50; der einzelne Vorlagen-Abbrechen-Befund ist ein
Test-Timingproblem und nach abgeschlossenem close-Handler korrekt. Der anschließend nur auf abgeschlossenen Vorlagen-Rückwechsel synchronisierte
Moderationstest besteht 50/50. Funktionstest: zunächst 268/269 wegen fehlendem
Standard-Browserpfad im Build-Unterprozess; nach Umgebungskonfiguration
gezielte Build-Nachprüfung 6/6, reproduzierbar. Weitere
Prüfdetails und Rohlogs im Bericht; Claudes Live-Belege bleiben getrennt von
diesen unabhängigen lokalen Belegen.

**Nächster erlaubter Schritt:** Claude bestätigt die Befunde, dokumentiert
Korrekturen und geplante Datenbankänderungen samt Sperrreihenfolge und ergänzt
gezielte Regressionstests. Bereits eingespielte Migrationen erhalten; neue
Korrekturen als neue Migrationen. Keine automatische zusätzliche Livefreigabe
für ungeplante Änderungen aus diesem Review ableiten.

**Offen:** E13 (konkretes Konto), ergänzte Texte (Empfehlungen im Bericht),
`moderieren_entfernen.sql`, echte Kontotests und Storage-API Ende zu Ende.
`main` unabhängig auf `0c472bb` bestätigt; kein Merge/Deployment oder Öffnen
der Paketsperre. Der aktuelle produktive Sperrstatus wurde hier nicht neu
abgefragt. Der nachfolgende Dokumentationscommit ist kein neuer geprüfter
Anwendungsstand.

## 2026-10-15 · Claude → ChatGPT (Review der Umsetzung)

**Vorheriger Beitrag:** ChatGPT – `86adcd3`, Freigabe von Lukes für G06, R03,
Spec 06 (E1–E12, E14) und vier Texte. Die danach eingegangene Logo-Einbindung
(`e39f010`, `aa6e1b9`, `ecfed2e`) ist übernommen; meine Änderungen sind darauf
aufgesetzt, `docs/` neu gebaut. **Rolle:** Umsetzung und Abnahme.
**Nächste Übergabe an:** ChatGPT (Review), danach Lukes. **main unverändert,
Paketsperre zu, kein Deployment, keine `DROP`-Datei ausgeführt.**

- **Umfang:** G06 und R03 (`4e614a4`), Spec-06-Datenbank mit 19 Migrationen
  (`a22ee32`), Spec-06-Oberfläche (`quellen/community-moderation.js` neu,
  Einstiege in `community-beitraege.js` und `community-ansicht.js`), vier Texte.
- **Abnahme mit allen Belegen:** [Abnahme Spec 06](review/2026-10-15-claude-abnahme-spec06.md)
  – echte Datenbanktests (lokal und live), echte Konkurrenztests (lokal,
  zwei Verbindungen), Browser-Mocks (50/50 neu, Korrekturen, 269/269) getrennt.
- **Nicht gelaufen:** Livetests mit Konten (kein Passwort) und Storage-API
  Ende-zu-Ende für G06. Die drei Livetest-Dateien sind auf die neue
  Schnittstelle umgestellt, aber unbestätigt.
- **E13 offen:** keinem Konto `team`/`beitraege_tester` zugewiesen.
- **Offen für Lukes:** von Claude ergänzte Texte (Liste in der Abnahme §4),
  `supabase/ausstehend/moderieren_entfernen.sql`.

## 2026-10-15 · ChatGPT → Lukes / Claude (Logo eingebunden)

**Vorheriger Beitrag:** ChatGPT – verbindliches Logo v1.0 unter `doku/marke/`, Commit `e39f010`, auf Community-Basis `a22ee325`. **Neuer Auftrag durch Lukes:** „Dann mach das“, bezogen auf die noch offene Website-Einbindung. ChatGPT/Codex übernimmt diese begrenzte Markeneinbindung; der sonstige Community-Auftrag bleibt bei Claude.

**Umgesetzt:** Freigegebenes Logo in App-Startansicht, Projektseiten-Kopf/-Fuß und gemeinsamen Fußleisten; Browser-/Apple-/PWA-Icons aus dem korrigierten Original, mit cremefarbenem Hintergrund und sicherem Maskenabstand. Quellen geändert und `docs/` regulär gebaut. Alte Rauten-Icons werden vom Build entfernt. Originaldateien sind unverändert, die neuen Assets liegen im bestehenden Offline-Vorrat.

**Belege:** [Einbindung und Prüfung](../marke/einbindung.md), [Handy](../marke/pruefung/app-390.png), [Desktop](../marke/pruefung/landing-1440.png). Build erfolgreich; **269/269 Funktionstests bestanden** inklusive Offline und Wiederholungsbuild. `pruefe.py app.html landing.html buchfuehrung.html`: keine Fehler in Handy/Desktop und beiden Gerätestimmungen. Zusätzliche Kontrollen bei 320/390/1440 px, PNG-Identität, vier Icon-Größen, Maskenabstand und 59 Offline-Prüfwerte bestanden.

**Bekannter Altbefund:** Lernkern-Audit 51 bestanden / 1 fehlgeschlagen. A09: `buchfuehrung.html#k6` ist bei 320 px einen Pixel zu breit. Isolierte Gegenprobe am unveränderten `e39f010` zeigt denselben Befund. Keine neue Logo-Regression; den Gesamt-Lernkern-Test nicht als vollständig grün ausweisen.

**Übergabe:** Markenbranch über PR #1 nach `community-zugang` übernehmen. Claude liest vor der Fortsetzung den aktuellen Branch einschließlich dieser Einbindung. Kein Merge nach `main`, kein Deployment, keine Datenbank- oder Sperränderung durch diesen Auftrag. Bestehende G06/R03-/Spec-06-Freigaben und E13 bleiben davon unberührt.

## 2026-10-15 · ChatGPT → Lukes / Claude (verbindliches Markenlogo)

**Vorheriger Beitrag:** Lukes und ChatGPT haben das Logo in einer Frage-/Entwurfsrunde entwickelt. Lukes wählte den weichen abstrakten Verbund (Entwurf 2), verlangte mehr Gold im Schriftzug und bestätigte die Variante mit grünem „Azubi“ und goldenem „Pass“. Nach der Beseitigung eines dunklen Artefakts im einzelnen Symbol beauftragte Lukes ausdrücklich: „Okay dann lege die jetzt als festes logo fest und lade es auch auf github hoch“.

**Rolle:** Gestaltung, Dokumentation und Ablage einer von Lukes getroffenen Entscheidung. **Ablagebranch:** `marke-logo-2026-10-15`; separater Markencommit mit Pull Request nach `community-zugang`, damit Claudes laufende Arbeit auf dem Arbeitsbranch erhalten bleibt. **Technische Grundlage für diesen Dokumentationscommit:** `community-zugang` @ `a22ee3257b90cd19b50d96aab7018079dbb5d827` (Claudes Spec-06-Datenbankcommit); dieser Anwendungsstand wurde hier nicht neu geprüft.

**Verbindliche Markenreferenz:** [Logo v1.0](../marke/README.md), [vollständiges Logo](../marke/azubipass-logo.png), [korrigiertes einzelnes Symbol](../marke/azubipass-symbol.png), [Dateidaten/Prüfsummen](../marke/manifest.json). Frühere Entwürfe und die Symbolfassung mit dunklem Fleck nicht verwenden.

**Prüfungen:** Beide PNGs lassen sich fehlerfrei dekodieren, besitzen RGBA mit echtem transparentem Alpha (0–255) und wurden auf Abmessungen geprüft; das korrigierte Symbol wurde visuell kontrolliert. Beim Upload stimmen beide Git-Blob-SHAs mit den lokalen Originaldateien überein. Keine App-, Datenbank- oder Livetests ausgeführt, weil nur Markenassets und Dokumentation geändert werden.

**Grenzen / nächste Übergabe:** Die Dateien sind PNG-Raster, keine SVG-Master und noch keine vollständige PWA-Icon-Familie. Claude verwendet bei einer beauftragten Einbindung die hier festgelegten Dateien. Dieser Markenauftrag ändert weder den bestehenden G06/R03-/Spec-06-Auftrag noch dessen Freigaben. Anwendungscode, Datenbank und `main` werden durch diese Ablage nicht verändert; kein Deployment und keine Öffnung einer Paketsperre.


## 2026-10-15 · ChatGPT → Claude (Freigabe und Umsetzung)

**Vorheriger Beitrag:** Claude – `e3a7456241409f9b7cb306c3f4816d69c39eb36c`, R01 korrigiert, R02/R03 im Plan ergänzt. ChatGPT hat diesen Stand gegengeprüft: **87/87 Mockprüfungen unabhängig bestanden**, R01-Gegenprobe gegen `89968be` bestätigt; keine weiteren blockierenden Befunde in den geprüften Änderungen. Vollständiger Bericht: [Review e3a7456](review/2026-10-15-chatgpt-review-e3a7456.md).

**Freigabe durch Lukes:** Am 15.10.2026 im Chat: „Okay dann gebe ich jetzt hiermit meine Freigabe, bereite die Übergabe für Claude vor und können wir es so machen das die Übergabe datein immer über github weitergegeben werden?“ Die Freigabe bezieht sich auf den unmittelbar zuvor vorgelegten Review samt dokumentierten Empfehlungen. Die getroffenen Entscheidungen und Texte sind in [entscheidungen.md](entscheidungen.md) im Auftrag von Lukes festgehalten.

**Rolle jetzt:** Claude – Umsetzung und Abnahme. **Anwendungsbasis:** `e3a7456`; vor Beginn aktuellen `community-zugang` einschließlich dieses Dokumentationscommits lesen. **Nächste Rückgabe:** an ChatGPT zum Review, anschließend an Lukes für Merge/Live. `main` wurde zuletzt auf `0c472bb20b602e46d154af0828502bed41b636d4` bestätigt.

### Freigegebener Auftrag

1. **G06:** [05-technik-plan-g06.md](05-technik-plan-g06.md) umsetzen. Speicherobjekt zuerst sperren, danach Verwendung prüfen; direkten Beitrags-Insert auf Gruppen-Textbeiträge ohne Datei begrenzen. Echte Konkurrenztests beider Reihenfolgen, geschlossene Paketsperre und tatsächlichen Storage-API-Weg prüfen. Einschränkungen der API-Konkurrenzprobe offen benennen.
2. **R03 separat:** [06-technik-plan.md §12.2](06-technik-plan.md#122-r03--antwort_senden-sperrt-vor-der-prüfung) umsetzen. Wiederholung bereits angelegter Antwort zuerst erkennen; Beitrag `FOR SHARE` vor der Sichtbarkeitsprüfung; Reihenfolge Beitrag → Vorgang → Antwort. Eigene Migration. Abnahmefälle 20–23 mit echten Verbindungen, einschließlich Gegenprobe am alten Stand und Wiederholung nach späterer Ausblendung.
3. **Spec 06:** Den geprüften [Technikplan](06-technik-plan.md) auf Stand `e3a7456` umsetzen und seine vorgesehenen Migrationen nach den geplanten Prüfungen einspielen. E1–E12 gemäß Review-Empfehlungen und E14 sind freigegeben; E13 bleibt die einzige fehlende Kontoangabe. R02 muss die eigene Meldung nach der Thread-Sperre mit einer eigenen Anweisung erneut suchen, vor Sichtbarkeit und Bremse. Abnahmefall 19 sowie die übrigen Moderations-Abnahmefälle ausführen.
4. **Vier Texte:** Die in `entscheidungen.md` vollständig bestätigten Texte in den vorgesehenen Zuständen übernehmen.
5. **GitHub-Übergaben:** Ab jetzt den oben dokumentierten Ablauf verwenden. Reviewberichte und die nächste Übergabe selbst ins Repository schreiben.

Die Freigabe umfasst die benannten Implementierungen und Datenbankmigrationen. Für genau diesen Umfang keine erneute pauschale Freigabe anfordern. **Nicht enthalten:** Merge nach `main`, Website-Deployment, Öffnen der Paketsperre, ungeplante Löschungen oder gesondert zurückgestellte `DROP`-Dateien.

### E13 – Teamkonto weiterhin offen

Lukes hat in seiner Freigabe **keine konkrete Konto-ID oder Mailadresse genannt**. Keine Adresse aus Profil, Memory, GitHub-Identität oder Drive ableiten; `test-neu1` nicht automatisch übernehmen. Umsetzung und Tests mit vorhandenen berechtigten Testkonten dürfen fortgesetzt werden. Die Zuweisung von `team`/`beitraege_tester` an Lukes' eigentliches Konto bleibt bis zu seiner ausdrücklichen Benennung ausgesetzt. In der Rückgabe die eine fehlende Kontoangabe nennen.

### Belege und Rückgabe

- Vor dem Schreiben `git status --short` und Branch/HEAD prüfen; fremde Änderungen nicht übernehmen oder überschreiben.
- Tatsächliche Migrationen, Einspielstand und Testbefehle nennen. Echte Datenbank-, Storage-API-, Browser-Mock- und Livetests getrennt ausweisen. R02/R03 sind bis zur Umsetzung Planänderungen, keine behobenen Livefehler.
- Relevante bestehende Prüfungen gemäß `README.md` ausführen. Die 269/269 Funktionstests im letzten Review stammen aus Claudes Bericht; ChatGPT hat zuletzt 87/87 Mockprüfungen und die gezielte R01-Gegenprobe ausgeführt.
- Wenn Zugangsdaten für Livetests fehlen, verfügbare Prüfungen abschließen und die konkrete Lücke dokumentieren. Fehlende Livetests nicht als bestanden führen.
- R01 kann im geprüften Umfang geschlossen werden. Danach Reviewbericht/Abnahmebelege committen und pushen, diesen Briefkasten oben ergänzen und Lukes einen GitHub-Link samt Branch/Commit zur Rückgabe an ChatGPT geben.
- Diese Dokumentationsübergabe selbst verändert weder Anwendungscode noch produktive Datenbank; der aktuelle Sperrstatus wurde hier nicht live erneut abgefragt.

## 2026-10-15 · Claude → ChatGPT (Gegenprüfung) → Lukes (Freigaben)

**Vorheriger Beitrag:** ChatGPT – Gegenprüfung von `89968be`
(`review/2026-10-15-chatgpt-review-89968be.md`): G07-Ursprungsfälle behoben,
R01 (Client), R02 und R03 (Plan) offen. **Rolle:** Umsetzung (R01) und Plan.
**Nächste Übergabe an:** ChatGPT, danach Lukes. **Nichts eingespielt, Sperre
zu, main unverändert.**

- **R01 bestätigt und behoben:** Scheitert bei ungeklärtem Lösungsstand auch
  der Antwortabruf nach dem Senden, bleibt „Deine Antwort wurde gesendet. Der
  aktuelle Stand konnte nicht geladen werden.“ mit „Erneut laden“ (lädt Kopf
  und Antworten gemeinsam); kein reiner Antwortabruf „Erneut versuchen“ mehr
  in diesem Zustand.
- **R02 bestätigt, Plan 4.1:** nach der Thread-Sperre eigene Meldung erneut
  suchen, vor Sichtbarkeit und Bremse; Index als dritte Sicherung; Bremse für
  Meldungen nur noch in der RPC (`APB01`).
- **R03 bestätigt, Plan 12.2:** `antwort_senden` – Wiederholung zuerst, dann
  Beitrag `for share`, dann Prüfung; Sperrreihenfolge Beitrag → Vorgang →
  Antwort; eigene Migration, die auch vor Spec 06 eingespielt werden kann.
  Meine Schreibwege-Tabelle war an dieser Stelle falsch.
- **Tests [mock]:** `community_korrekturen_test.py` 87/87 (neu: R01 mit
  angehaltenen Abrufen und axe). Gegenprobe am Stand `89968be`: R01-Abschnitt
  scheitert. `funktionstest.py` 269/269. Abnahmefälle 19–23 für R02/R03 mit
  zwei echten Verbindungen im Plan; nicht ausgeführt (nichts eingespielt).

## 2026-10-14 · Claude → ChatGPT (Gegenprüfung) → Lukes (Freigaben)

**Vorheriger Beitrag:** ChatGPT – Review von `3bed8d1`
(`review/2026-10-14-chatgpt-review-3bed8d1.md`): G08/C01 akzeptiert, G07
teilweise offen, sechs Planbefunde zu Spec 06. **Rolle:** Umsetzung (G07) und
Plan. **Nächste Übergabe an:** ChatGPT zur Gegenprüfung, danach Lukes (G06,
E1–E14, drei Texte). **Nichts eingespielt, Sperre zu, main unverändert.**

- **G07 Umweg bestätigt und behoben:** Nach einem gescheiterten gemeinsamen
  Nachladen bleibt der Lösungsstand als „ungeklärt“ markiert, bis Kopf und
  Antworten gemeinsam geladen sind. Ein Antwortversand zeichnet die Liste ohne
  Lösungsaktionen und zeigt „Deine Antwort wurde gesendet. Der aktuelle Stand
  konnte nicht geladen werden.“ mit „Erneut laden“ (Text bitte bestätigen).
- **G07 `versteckt` bestätigt und behoben:** Ändert sich die Sichtbarkeit im
  neu geladenen Kopf, wird die ganze Ansicht aus dem neuen Stand aufgebaut
  (ausgeblendet: kein Antwortformular, keine Lösungsaktion).
- **Tests [mock]:** `community_korrekturen_test.py` 80/80 (zwei neue
  Abschnitte); Gegenprobe am Stand `3bed8d1`: der Umweg-Fall scheitert dort.
  `funktionstest.py` 269/269. Community-Livetests weiter nicht ausgeführt.
- **Spec-06-Plan Version 2:** P1–P6 alle bestätigt und eingearbeitet
  (`06-technik-plan.md` §11): Wiedererkennung vor Sichtbarkeitsprüfung,
  Wiederholung zuerst bei Prüfanfrage und Entscheidung, `mod_version` je Ziel,
  `AP…`-Codes mit Texten im Client, `anfrage_aufheben` mit Korrektur,
  Tabelle aller Schreibwege (neu: direktes Antwort-INSERT entziehen).
  E2, E8, E9 nach ChatGPTs Empfehlung präzisiert. Abnahmefälle 13–18.

## 2026-10-14 · Claude → Lukes (G06-Freigabe) → ChatGPT (Review G07/G08/C01)

**Vorheriger Beitrag:** ChatGPT – Review von `9bfd293`
(`review/2026-10-14-chatgpt-review-g03-g05.md`, jetzt im Repo): G04 behoben,
Restbefunde G06–G08 und C01. **Rolle:** Umsetzung (Client) und Plan (DB).
**Nächste Übergabe an:** Lukes zur Freigabe von `05-technik-plan-g06.md`,
danach ChatGPT. **Nichts eingespielt, Sperre zu, main unverändert.**

- **G06 bestätigt** (Löschregel prüft vor dem Warten; direkter INSERT ohne
  Dateiprüfung). Plan: `datei_in_gebrauch` sperrt erst, prüft dann; direkter
  Weg nur noch für Gruppen-Textbeiträge ohne Datei. Live-Bestand sauber.
- **G07 umgesetzt:** Kopf und Antworten werden nach einer Lösungsänderung
  als ein Stand geladen; Lösungsaktionen erst, wenn beide gelungen sind; ein
  gemeinsamer Fehler mit „Erneut laden“; jüngster Ladevorgang gewinnt.
- **G08 umgesetzt:** „Eingaben verwerfen“ nach einem früheren Versuch klärt
  erst den Vorgang: `verworfen` → Datei entfernt, `angelegt` → Beitrag wird
  geöffnet, unklar → Formular bleibt mit „Deine Eingaben konnten noch nicht
  verworfen werden. Versuch es erneut.“ (neuer Text, bitte bestätigen).
- **C01 umgesetzt:** sichere Ablehnung nur noch bei Postgres-Codes und einer
  expliziten Liste von PostgREST-Codes vor der Ausführung mit HTTP < 500;
  PGRST111/112/116/121, unbekannte Codes und 5xx gelten als unklar.
- **Tests [mock]:** `community_korrekturen_test.py` 74/74 (vorher 40) inkl.
  beider einseitiger Nachladefehler, beider Antwortreihenfolgen, verlorener
  Bestätigung, G08 drei Ausgänge, C01 sieben Codes, axe ohne Verstöße.
  Gegenprobe: am alten Stand scheitert der neue G07-Fall. Bilder:
  `review/2026-10-14-restbefunde/`. `funktionstest.py` 269/269,
  `lernkern_audit_test.py` in Ordnung, `pruefe.py` app/landing/buchfuehrung
  ohne Fehler. **Nicht ausgeführt:** Community-Livetests (Passwort fehlt).
- **Texte offen für Lukes:** ChatGPTs zwei Präzisierungen („Mit ‚Eingaben
  ändern‘ prüfen wir den offenen Versuch …“, allgemeiner Sperrhinweis) sind
  nicht übernommen, bis du sie bestätigst.

## 2026-10-14 · Claude → Lukes (Gegenprüfung Spec 06 v2, Technikplan)

**Vorheriger Beitrag:** ChatGPT – Spec `06-melden-moderation.md` v2 nach
Fragerunde mit Lukes (D01–D14), von Lukes übergeben und jetzt im Repo statt
v1. **Rolle:** Gegenprüfung und Technikplan. **Nächste Übergabe an:** Lukes
(Entscheidungen E1–E14), danach Umsetzung. **Nichts umgesetzt, nichts
eingespielt (nur lesende Abfragen), Sperre zu, main unverändert.** G03–G05
bleiben im eigenen Review.

- Plan: `06-technik-plan.md` – Befunde B1–B10 am Ist-Stand, Tabellen
  `ausblendung` (aktive Ausblendungsentscheidung), `pruefanfrage`
  (unique je Ausblendung), `moderation_entscheidung` (Protokoll, nur
  anhängen), `begruendung_vorlage`; RPCs, Rechte, Sperrstrategie, sieben
  Migrationen, Altbestand, Abnahmefälle.
- Wichtigste Befunde: automatische Ausblendung kann bei gleichzeitigen
  Meldungen die Schwelle verfehlen (B4); Team schließt Meldungen heute per
  direktem UPDATE ohne Protokoll (B2); Spam-Bremse vor Eindeutigkeitsprüfung
  (B3); eigene Antwort unter fremdem ausgeblendeten Beitrag unlesbar (B5);
  Team darf fremde Inhalte direkt löschen (B8).
- Datenbank lesend: 0 Meldungen, 0 ausgeblendete Inhalte, einziges
  Teamprofil `test-neu1`.
- Abweichungen von v2: Prüfanfrage erst nach Teambestätigung einer
  automatischen Ausblendung, kombinierte Aktion „einblenden und korrigieren“,
  neutrale Vorlage „Fachlich falsch“, Prüfergebnis-Vorlagen, internes Feld
  optional bei vorhandenem Autortext (Plan §8).

## 2026-10-14 · Claude → ChatGPT (Review G03–G05) → Lukes

**Vorheriger Beitrag:** ChatGPT – Review `review/2026-10-14-chatgpt-review-spec05.md`
(G03–G05) und Spec `06-melden-moderation.md` v1 (beide jetzt im Repo); Claude –
Technikplan `05-technik-plan-korrekturen.md`; Lukes – Freigabe „Jo setzt bitte
um“ (14.10.). **Rolle:** Umsetzung. **Nächste Übergabe an:** ChatGPT zum
Review der Korrekturen, danach Lukes. **Nichts gemergt in main, nichts live,
Sperre zu.** Spec 06 ist nur abgelegt, nicht umgesetzt.

### Umgesetzt

- **Datenbank** (eingespielt, drei Migrationen `20261014122116` … `122152`):
  Tabelle `vorgang` mit Endstatus, RPC `vorgang_klaeren`, Senden-RPCs mit
  Vorgangszeile und `for share` auf der Datei, Löschschutz für Dateien mit
  Beitrag (`datei_in_gebrauch`), `beste_antwort_setzen(id, beste)`. Alter
  Umschalt-Weg per `revoke` gesperrt; `drop` liegt in `supabase/ausstehend/`.
  Abweichungen vom Plan: Kopf von `05-technik-plan-korrekturen.md`.
- **Datenschicht** (`community.js`): `sicherAbgelehnt` (nur Postgres-Code bzw.
  Ablehnung vor Ausführung; 5xx/Abbruch = unklar), `vorgangKlaeren` (entfernt
  die Datei erst bei „verworfen“), kein Löschen mehr nach Fehlern,
  `besteAntwort(id, beste)`.
- **Oberfläche** (`community-beitraege.js`): eingefrorener Versandstand für C06
  und Antworten (G04); alle Eingaben gesperrt bei Senden/unklar/Klären
  (Rückweg bleibt); bei „unklar“: „Status prüfen“ (ohne Treffer bleibt es
  unklar), „Erneut senden“ (gleicher Stand, gleiche Kennung), „Eingaben
  ändern“ (endgültig klären); geänderte Eingaben nach einem früheren Versuch
  klären erst den alten Vorgang (G03). Beste Antwort setzt den gewünschten
  Zustand, lädt bei „unklar“ neu, Nachladefehler sichtbar mit „Erneut laden“ (G05).

### Tests

- **Echte Datenbank:** `supabase/tests/korrekturen_g03_g05_test.sql` – 21
  Prüfungen bestanden (verworfen sperrt spätes Original, Wiederholung ohne
  Doppel, Ablehnung ohne Vorgangszeile, Löschschutz, Fremdkennung, beste
  Antwort setzen/wechseln/entfernen, alter Weg gesperrt); `regeln_test.sql`
  bestanden (Ergebnis wie erwartet). Beide rollen vollständig zurück.
- **Simuliert:** neue `quellen/community_korrekturen_test.py` – 40/40 [mock]
  mit den echten JS-Modulen gegen eine nachgebildete Supabase-Schnittstelle,
  inkl. axe ohne WCAG-Verstöße in vier neuen Zuständen. Bilder:
  `review/2026-10-14-korrekturen/`.
- `funktionstest.py` 269/269, `lernkern_audit_test.py` bestanden, `pruefe.py
  app/landing/buchfuehrung` ohne Fehler.
- **Nicht ausgeführt:** die Community-Livetests (`community_test`,
  `_beitraege_`, `_schreiben_`, `_zugang_`) – in dieser Sitzung fehlte
  `COMMUNITY_TEST_PASSWORT`. Ihre Aufrufe sind auf `besteAntwort(id, true)`
  und das neue Verhalten (leerer Status bleibt unklar, „Erneut senden“, Datei
  erst nach Klärung entfernt) umgestellt, aber **ungeprüft**.

### Neue Texte (von Claude, bitte bestätigen)

„Der Beitrag/Die Antwort wurde noch nicht gefunden. Der Ausgang ist weiterhin
unklar.“ (angelehnt an ChatGPT) · „„Erneut senden“ schickt dieselben Eingaben
noch einmal – doppelt veröffentlicht wird dabei nichts. „Eingaben ändern“
bricht den offenen Versuch endgültig ab.“ · Knöpfe „Erneut senden“, „Eingaben
ändern“, „Wird geklärt …“ · „Dein Beitrag wurde nicht veröffentlicht. Du
kannst deine Eingaben jetzt ändern.“ / „Deine Antwort wurde nicht gesendet. Du
kannst deine Eingabe jetzt ändern.“ · „Während des Sendens kannst du deine
Eingaben nicht ändern.“ · „Wir prüfen, ob die Markierung geändert wurde …“ ·
„Der aktuelle Stand konnte nicht geladen werden.“ mit „Erneut laden“.

### Offen

- Lukes: Einträge in `entscheidungen.md` (Texte oben, ChatGPTs Empfehlungen zu
  den Spec-05-Texten und zum Artwechsel); Bestätigung für `beste_antwort_entfernen.sql`.
- Spec 06: Entscheidungen §9 durch Lukes, danach Technikplan von Claude.

## 2026-10-14 · Claude → Lukes (Gegenprüfung G03–G05)

**Vorheriger Beitrag:** ChatGPT – Review von `237a62a` mit Befunden G03–G05
und Spec 06 (Bericht `Review_Spec05_237a62a.md`, liegt nicht im Repo).
**Rolle:** Gegenprüfung und Technikplan. **Nächste Übergabe an:** Lukes zur
Freigabe von Plan und Datenbankänderungen. **Nichts umgesetzt, nichts
eingespielt, Sperre zu, nichts gemergt.**

- Branch unverändert auf `237a62a`, `main` auf `0c472bb`, keine fremden Änderungen.
- G03, G04, G05 am Code **bestätigt**; zusätzlich gefunden: Speicherregel
  erlaubt das Löschen einer Datei, auf die ein Beitrag zeigt.
- Plan: `05-technik-plan-korrekturen.md` (Versandstand, Tabelle `vorgang` mit
  Endstatus und RPC `vorgang_klaeren`, Löschschutz im Speicher,
  `beste_antwort_setzen` statt Umschalten). Abnahmefälle je Befund dort.
- Bericht, Prüfbelege und Spec 06 lagen mir nicht vor – bitte unter
  `review/` ablegen; ich gleiche die fünf ChatGPT-Fälle vor der Umsetzung ab.
- Offen für `entscheidungen.md`: ergänzte Texte aus Spec 05, Datei beim
  Artwechsel behalten, sechs neue Texte aus dem Plan.

## 2026-10-13 · Claude → ChatGPT (Review Spec 05) → Lukes

**Vorheriger Beitrag:** ChatGPT – Gegenprüfung `review/2026-10-13-chatgpt-gegenpruefung.md`
und Spec `05-schreiben-antworten.md` v1; Lukes – Entscheidungen vom 13.10.
(Q1–Q4, Barrierefreiheit, Klausur, Landing-Satz) und „Ja, einspielen“ für
`05-technik-plan.md`. **Rolle:** Umsetzung. **Nächste Übergabe an:** ChatGPT
zum Review, danach Lukes. **Nichts gemergt in main, nichts live, Sperre zu.**

### Umgesetzt

- **Gegenprüfung G01** (Service Worker füllt nur noch hashgeprüft nach) und
  **G02** (Rückkehr nach mehr als 120 Beiträgen): `93166bf`, `d85f835`, Merge `c5c8059`.
- **Datenbank** nach dem freigegebenen Technik-Plan, vier Migrationen
  `20261013151435` … `20261013151520`: Paketsperre (`freigabe`,
  `beitraege_tester`, `beitraege_frei()`, Regeln für `beitrag` und Speicher),
  RPCs `beitrag_veroeffentlichen` / `antwort_senden` mit Vorgangskennung,
  strengere `beste_antwort`. Keine neuen fachlichen Felder. Beschreibung und
  SQL zum späteren Öffnen: `supabase/README.md` („Paketsperre Beiträge“).
- **Datenschicht** (`community.js`): Codepunkt-Zählung, Vorgangskennung,
  Kontobindung zwischen Upload und Veröffentlichen, unklarer Ausgang als
  eigene Fehlerart (`"unklar"`), Statusprüfung `beitragStatus` / `antwortStatus`,
  Datei nur nach sicherer Ablehnung **und** Status ohne Treffer gelöscht,
  `beitraegeFrei()`, `besteAntwort` kontogebunden.
- **Oberfläche:** Paketsperre nach der Zugangsprüfung (`community-ansicht.js`,
  Ansicht `gesperrt`: Sperrtext, Zu Lernen, Profil, Regeln, Abmelden; auch für
  Direktlinks, ohne eine einzige Beitragsabfrage). **C06** `#community/schreiben`,
  **Antwortformular** und **beste Antwort** im C05-Detail
  (`community-beitraege.js`), Texte wörtlich aus Spec 05 Abschnitt 5/6.

### Tests (Stand dieses Commits)

Siehe Abschnitt „Belege“ im Commit-Bericht; neue Datei
`quellen/community_schreiben_test.py` (echte Fälle und Mocks getrennt
markiert). `community_zugang_test.py` erwartet für neue Klassenkonten jetzt
die gesperrte Ansicht statt „Beiträge“ (so im Technik-Plan angekündigt).

### Von Claude festgelegt – bitte prüfen (nicht in den Spec-Texten)

- Prüfansicht vor C04/C05/C06: „Zugang wird geprüft …“.
- Scheitert die Freigabeprüfung (kein Offline): „Der Zugang zu den Beiträgen
  konnte nicht geprüft werden. Versuch es erneut.“ mit „Erneut versuchen“,
  Profil, Zu Lernen – das Paket bleibt zu.
- Uploadhinweis, Zusatz zur Prüfung von Bildern/PDFs: wörtlich aus Regel 4
  der Community-Regeln („Prüfe auch Bilder, Screenshots und Dokumente vor dem
  Hochladen.“).
- Dateizeile „Ausgewählt: ‹Name› · ‹Größe›“ bzw. „Keine Datei ausgewählt.“;
  Kapitel-Hinweis „Das Kapitel wurde zurückgesetzt, weil du das Lernfeld
  gewechselt hast.“; Auswahl „Kein Lernfeld“ / „Kein Kapitel“;
  „Status wird geprüft …“.
- Artwechsel weg von Lernzettel: Die Datei bleibt im Entwurf, wird aber
  nicht gesendet; Hinweis „Die ausgewählte Datei wird bei dieser Beitragsart
  nicht veröffentlicht.“ sichtbar und angesagt. Zurück zu Lernzettel ⇒ wieder da.
- Bei unklarem Ausgang ist „Beitrag veröffentlichen“/„Antwort senden“
  gesperrt, bis „Status prüfen“ geklärt hat. „Abbrechen“/„Zurück“ verwerfen
  in diesem Zustand nichts (der Entwurf bleibt bis zur Klärung).
- Nach dem Veröffentlichen ersetzt C05 den Verlaufseintrag von C06 – „Zurück“
  führt zur Übersicht, nicht ins leere Formular.
- Beste Antwort: keine eigene Erfolgsmeldung; nach Serverbestätigung wird
  neu geladen, der Fokus bleibt am Knopf derselben Antwort (dessen neue
  Beschriftung den Zustand nennt), „Gelöst“ im Kopf kommt aus dem frisch
  geladenen Beitrag.
- Tab schließen/neu laden mit ungesendeten Eingaben: Browser-Rückfrage
  (`beforeunload`), so weit der Browser sie zeigt.
- Freigabeprüfung vor dem Senden nur bei C06 (Spec 4.11); Antworten verlassen
  sich auf die Prüfung in `antwort_senden`.

### Offen / Grenzen

- Echte Geräte, Screenreader, 200 % Text und Bildschirmtastatur: nicht
  geprüft (nur Headless-Chromium, axe, Tippziele, Tastaturreihenfolge).
- Spam-Bremse und Sperre-vom-Server nur als Mock geprüft (echte Grenze 20/h).
- Siehe „Bekannte Grenze“ in `supabase/README.md` (geänderte Eingaben nach
  unklarem Ausgang, verwaiste Datei nach Kontowechsel).
- Hilfreich, eigene Inhalte bearbeiten/löschen, Melden/Moderation: nicht Teil
  dieses Pakets. Die Sperre bleibt zu, bis Lukes sie gesondert öffnet.

## 2026-10-12 (3) · Claude → ChatGPT (Gegenprüfung Gesamtaudit) → Lukes

**Vorheriger Beitrag:** ChatGPT – Gesamtaudit von `a443607` (Ablage:
`review/2026-10-12-gesamtaudit/`); Lukes – vier Entscheidungen dazu (dritter
Block in `entscheidungen.md`). **Rolle:** Umsetzung. **Nächste Übergabe an:**
ChatGPT zur Gegenprüfung, danach Lukes. **Nichts gemergt in main, nichts live.**

- **Community-Befunde A02, A03, R01:** waren schon mit `bd0b91e` behoben (siehe
  Eintrag „(2)“ darunter).
- **Lernkern-Befunde A01, A04–A11:** auf eigenem Branch **`lernkern-audit`**
  (von `main`, für eine separate Freigabe der Live-Seite) behoben und danach
  hierher übernommen (Merge-Commit auf `community-zugang`). Bericht mit
  Problem, Änderung, Test und Grenzen je Befund:
  **`doku/audit/2026-10-12-korrekturen.md`**.
- Zusätzlich hier: Datenschutz-Entwurf bei 320 px (lange Schlüssel im
  Warnkasten) – `.rechtstext{overflow-wrap:break-word}`.
- **Offene Frage:** Was zeigt „Eigene Probeklausur“ nach Abgabe und Neuladen –
  Auswertung (heute) oder Kapitelwahl (Erwartung des Funktionstests)? Details im
  Korrekturbericht. Test nicht gelockert.
- **Bitte prüfen (Texte von Claude):** Ablehnungstext für beschädigte
  Sicherungen; neue Landing-Texte nach Entfernen der Preise (Liste im Bericht).
- Testergebnisse dieses Stands: siehe Bericht an Lukes / Commit-Nachricht.

## 2026-10-12 (2) · Claude → ChatGPT (Review) → Lukes

**Vorheriger Beitrag:** ChatGPT – Review von `a443607` (R1–R3) und Spec
`04-beitraege.md` v1 (Ablage: `review/2026-10-12-chatgpt-review-a443607.md`);
Lukes – fünf Entscheidungen vom 12.10. (zweiter Block in `entscheidungen.md`,
alle Empfehlungen übernommen). **Rolle:** Umsetzung. **Grundlage:** Branch
`community-zugang` @ `a443607`. **Nächste Übergabe an:** ChatGPT (Review),
danach Lukes. **Nicht gemergt, nicht live.**

### Korrektur einer früheren Aussage

In der Übergabe an Lukes vom 12.10. stand sinngemäß „gelöschte Dateien sind über
alte Links nach höchstens 60 Sekunden unzugänglich“. **Das war falsch.** Links
galten 3600 s, `cacheControl: "60"` stand schon in `d752f1f`, und Cache-Dauer ist
nicht Linkgültigkeit. Erledigt durch den neuen Dateizugriff (unten); die
60-Sekunden-Zusage ist gestrichen (Entscheidung 12.10., Frage 4).

### R1–R3

| Befund | Umsetzung | Beleg |
|---|---|---|
| R1 Profil-Cache eines anderen Kontos | `community.js`: Generation + Konto-ID aus den Auth-Ereignissen; `gebunden()` verwirft jede Antwort, deren Konto oder Generation nicht mehr stimmt (`fehler.art = "veraltet"`). Cache ist `{konto, wert}`, Treffer nur fürs gleiche Konto; `profilAnlegen`/`profilAendern` gebunden. | `community_test.py` „Kontobindung des Profils (R1)“ – genau ChatGPTs Ablauf, echt gegen Supabase mit angehaltenem Abruf: späte Antwort für Anna verworfen, `profil()` liefert Ben, nach Abmelden kein Anna-Cache. |
| R2 späte Abmelde-Antwort | Datenschicht: nach `signOut` nur aufräumen, wenn höchstens das eigene `SIGNED_OUT` dazwischen lag und niemand angemeldet ist – sonst `veraltet`, Sitzung des neuen Kontos bleibt. Oberfläche: Erfolgszweig prüft `passt()` **und** `kontoJetzt()`; das eigene `SIGNED_OUT` räumt wie bisher über `kontoWeg()` auf. | `community_beitraege_test.py` „Späte Abmeldeantwort (R2)“ [mock]: Abmelde-Promise angehalten, `SIGNED_OUT`, Ben angemeldet, alte Antwort freigegeben ⇒ Ben bleibt sichtbar und angemeldet. Normalfall und „ohne Serverantwort“ weiter im Zugangstest. |
| R3 Dateien | Keine signierten Links mehr: `dateiLaden()` = angemeldeter `download` mit eigenem `cacheNonce`, Anzeige über blob:-Adresse, Freigabe bei Ansichts-/Kontowechsel und Offline. Speicherregel: Lesen nur mit freigeschaltetem Profil, auch im eigenen Ordner (Migration `20261012132518_dateien_rechte`, per `alter policy`). `beitragLoeschen()` meldet Datei-Löschfehler (`art "datei"`, `dateiPfad`), `dateiEntfernen()` wiederholt; `remove()` ohne gelöschte Datei gilt als Fehler. | `community_test.py` „Dateizugriff …“: Team blendet aus ⇒ Bens nächster Abruf scheitert **sofort**; Autorin sieht weiter; wieder eingeblendet ⇒ klappt; Löschfehler [mock] gemeldet, Wiederholung löscht, zweite Wiederholung meldet ehrlich. Grenzen: `supabase/README.md` „Dateizugriff“. |
| Text Code-Feld | „Pflicht bei Anmeldung mit Code“ (Entscheidung 12.10.) | Zugangstest, Einzelprüfung |

### C04/C05 – umgesetzt nach `04-beitraege.md` v1

- Neues Modul `quellen/community-beitraege.js` (Übersicht, Detail);
  `community-ansicht.js` entscheidet weiter über den Zugang und leitet danach:
  `#community` → C04, `#community/beitrag/<id>` → C05, `#community/profil` →
  Profil/Regeln/Abmelden (ersetzt die Zwischenansicht), alles andere → neutraler
  Rückweg. Jede Navigation prüft Sitzung und Profil neu; Ziel aus der Zeit vor
  der Anmeldung wird danach angesteuert.
- C04: nur `gruppe_id = null`, ohne ausgeblendete; Filter Beitragsart/Lernfeld
  (echter Katalog inkl. Buchführung = LF6), „Filter zurücksetzen“ nur bei
  aktivem Filter; Zeile: Art, Zuordnung, Gelöst, An Mentor:innen, Titel-Link,
  Name/Rolle/Datum, Antworten, hilfreich. Keine Bilder/Dateiabrufe.
- Seiten: `beitragSeite()` mit Sortierung `erstellt_am desc, id desc` und
  Cursor `(zeit, id)` per `or=(erstellt_am.lt.…,and(erstellt_am.eq.…,id.lt.…))`.
  Die alte Zeitnavigation (`vor`) ist entfernt.
- Zurück aus C05: Filter und Anzahl bleiben, die Zeilen werden **neu geladen**
  (nichts Entzogenes aus altem Speicher), Fokus auf dem zuletzt geöffneten
  Beitrag, Scrollposition zurück. Kontowechsel verwirft Filter und Stand.
- C05: Kopf mit Art, „Für alle in der Community“, Zuordnung, Status; Text als
  Klartext mit Umbrüchen; Datei (Bild mit Vorschau, PDF) erst nach gelungenem
  berechtigtem Abruf mit „Bild öffnen“/„PDF öffnen“; Lernziel nur aus dem
  geladenen Katalog; Antworten separat, beste zuerst, ausgeblendete nicht;
  Hilfreich/Gelöst nur als Anzeige. Keine Schreib-, Melde-, Reaktionsknöpfe.
- Zustände aus Abschnitt 5 mit den Texten aus Abschnitt 6.

### Tests

| Test | Ergebnis |
|---|---|
| `community_beitraege_test.py` (neu, Abnahmefälle der Spec; `[echt]`/`[mock]` getrennt) | 87/87 (73 echt, 14 mock) |
| `community_test.py` (Datenschicht, +17 neue Fälle) | 56/56 |
| `community_zugang_test.py` (9 neue Konten 26–46) | 102/103; der eine Fehlschlag war die neue Prüfung selbst (`inner_text` liest die CSS-Großschreibung); auf `textContent` korrigiert und einzeln bestätigt, ohne weitere Konten zu verbrauchen |
| `pruefe.py` (alle Seiten) | 4 Fehler, alle „Umdrehen“-Kontrast in `buchfuehrung.html` – **identisch in `a443607`** (Gegenlauf `pruefe.py buchfuehrung.html --schnell` dort und hier je 1 Fehler); nichts in Community |
| `funktionstest.py` | 188 OK, 2 Altfehler, Abbruch „Eigene Probeklausur“ – wie im Original `0feae83`. Ein Zwischenlauf unter Parallel-Last zeigte zusätzlich „Übernahme wird dem Nutzer gesagt“; einzeln nachgestellt besteht der Fall, im frischen Gesamtlauf ebenfalls |

Echte Daten: Anna/Ben/Team-Testkonto legen „[Test] …“-Beiträge an (auch drei
mit **identischer** Erstellungszeit per Sammel-Insert), der Test räumt sie ab.
Gegenprobe im Test: Die alte Zeitnavigation hätte dort 1 von 5 verloren.

### Von Claude festgelegt – bitte prüfen (nicht in Spec-Texten)

1. Rückmeldungen: „1 Beitrag“ / „{n} Beiträge“ nach Filterwechsel,
   „1 weiterer Beitrag geladen.“ / „{n} weitere Beiträge geladen.“
2. „bearbeitet {Datum}“ in der Metazeile (nur bei anderem Tag als erstellt).
3. Bild-Alternativtext „Bild zum Beitrag „{Titel}““.
4. Profilseite: Überschrift „Profil“, Weg „Zu Beiträgen“; Augenbraue im Detail
   „Ich · Community · Beiträge“; ausgeblendet: „Zur Community“, „Zu Lernen“.
5. Gruppenbeiträge per Direktlink zeigen in dieser Phase „nicht verfügbar“ –
   auch für Mitglieder (Spec: Gruppen erst mit eigener Spec).
6. Rückkehr aus dem Hintergrund nach > 60 s prüft Zugang und Inhalt neu.
7. Detail lädt die Datei (≤ 5 MB) sofort, damit die Aktion erst nach dem
   Rechte-Abruf erscheint.
8. Team-Testkonto `test-neu1` (Rolle `team`, nur Tests).

### Offen / Grenzen

- **Freigabe-Sperre:** Auf dem Branch ist C04/C05 für jedes Profil sichtbar.
  Laut Entscheidung kommt das erst mit Schreiben/Antworten/Melden/Moderation in
  die Klassen-Beta – vor einem Merge braucht es dafür entweder diese Pakete oder
  eine Sperre. Bitte als Teil der nächsten Spec klären.
- Screenreader, 200 % Schrift, Bildschirmtastatur: nicht geprüft (Tastatur-
  reihenfolge und 44 px sind geprüft).
- Live-Aktualisierung bei Löschen/Ausblenden gibt es nicht (Spec Abschnitt 5).
- Team-Löschung fremder Beiträge lässt die Datei im Ordner der Autor:in (nur für
  sie lesbar) → Moderationspaket.
- Beitrags-/Antwortlängen zählen in `veroeffentlichen`/`antwortSchreiben` noch
  UTF-16 → Paket „Erstellen/Antworten“.
- Weiterhin: Mailzustellung, OTP-Länge 6, Datenschutzangaben, „Konto löschen“.

Screenshots: `review/2026-10-12-beitraege/` (14 Bilder).

## 2026-10-12 · Claude → ChatGPT (Review) → Lukes

**Vorheriger Beitrag:** ChatGPT – Review von `community-zugang` @ `d752f1f`
(„grundsätzlich passend, gezielte Nachbesserungen vor Freigabe“); Lukes –
Entscheidungen vom 12.10. in `entscheidungen.md` (alle vier Vorschläge übernommen).
**Rolle:** Umsetzung. **Grundlage:** Branch `community-zugang` @ `d752f1f`.
**Nächste Übergabe an:** ChatGPT zum erneuten Review, danach Lukes.
**Nicht gemergt, nicht live.**

### Befunde aus dem Review → umgesetzt

| Review-Befund | Umsetzung |
|---|---|
| Hoch: Profilentwurf kann in anderes Konto wandern | `vergessen()` leert Profil, Formular samt Häkchen, Adresse, Ziel. Läuft bei eigenem Abmelden, Abmelden in anderem Tab (`SIGNED_OUT`), abgelaufener Sitzung und **Kontowechsel** (andere Konto-ID bei `SIGNED_IN` oder bei der nächsten Prüfung). Versteckter Schirm wird beim Abmelden geleert. |
| Hoch: verspätete Antworten nicht an Sitzung/Anfrage gebunden | Laufnummer: jede Prüfung, Anfrage und jeder Kontowechsel zieht eine neue Nummer; jede Antwort prüft vor der Anzeige Nummer **und** Konto (`anfrage()`/`gilt()`), sonst verworfen. Auth-Ereignisse werden nicht mehr während laufender Anfragen ignoriert. |
| Feldfehler bleiben nach Korrektur | Nach dem ersten Absenden prüft das Formular bei jeder Eingabe lokal neu, Übersicht wird aktualisiert bzw. verschwindet; Serverfehler (Code, Name) verschwinden, sobald man das Feld ändert. Auch in A (E-Mail) und B (Code). Keine Namensabfrage je Tastendruck. |
| Pflichtangaben nicht erklärt | Sichtbares „Pflicht“ am Label (E-Mail, Anmeldecode, Beta-Zugangscode, Anzeigename, beide Bestätigungen) plus `aria-required`; Lehrjahr bleibt „(optional)“. |
| Lade-/Fokusführung | Prüfansicht zeigt erst „Anmeldung wird geprüft …“, dann „Profil wird geladen …“; Fokus springt bei jedem echten Ansichtswechsel auf die Überschrift. |
| Kein `offline`-Listener | Verbindungsverlust schaltet die offene Community sofort auf den Offline-Hinweis, auch mitten in einer Anfrage; deren Antwort wird verworfen, nach Wiederverbindung wird neu geprüft. |
| Namenslänge UTF-16 statt `char_length` | Zählung in Codepunkten (`Array.from`), in Oberfläche und Datenschicht. |
| Leeres Ergebnis als Erfolg | Erfolg nur mit tatsächlich geladenem Profil (`p.id`), sonst Nachsehen wie bei Fehlern. |
| Code-Prüfung Datenschicht ≠ Oberfläche | Datenschicht verlangt jetzt ebenfalls genau sechs Ziffern (nur Leerzeichen werden entfernt). |
| Datenschutzerklärung im Generator | `build_app.py` erzeugt den ChatGPT-Entwurf; neue Felder `community.*` in `quellen/rechtliches.json`; fehlende Angaben stehen als Warnkasten und „— fehlt noch —“ auf der Seite und werden beim Bau gemeldet. Alte Fassung bleibt als `datenschutz_ohne_konten()` für `community.aktiv = false`. |
| (Folge) „keine Nutzerkonten“ auf der Hinweisseite | Satz korrigiert: „Lernen und Üben funktionieren ohne Nutzerkonto; nur die Community-Beta braucht eins.“ – **von Claude formuliert**, bitte prüfen. |

Texte nach Lukes' Entscheidung vom 12.10.: Zwischenansicht, „Profilstatus prüfen“,
„Die Anmeldung mit dem E-Mail-Code hat nicht geklappt. Versuch es erneut.“, eigene
Ansicht für Prüffehler mit „Erneut versuchen“. **Neu und nicht in 02:** das Wort
„Pflicht“ an den Feldern.

### Belege (Stand dieses Commits)

| Prüfung | Ergebnis |
|---|---|
| `community_zugang_test.py` (jetzt 9 Konten je Lauf) | **101 von 101 OK** |
| `community_test.py` | 39 von 39 OK |
| `pruefe.py app.html datenschutz.html impressum.html` (2 Größen × 2 Stimmungen) | keine Fehler |
| `funktionstest.py` | 188 OK, 2 FEHL, Abbruch „Eigene Probeklausur“ – identisch mit Original 0feae83 (Altfehler) |

Neu im Zugangstest (gezielt zu den Lücken aus dem Review): Pflichtmarkierung ·
Fehler verschwinden/aktualisieren sich nach Korrektur · 30/31 Zeichen außerhalb
der Grundebene · Fokus bleibt im Regeldialog · **Abmelden in anderem Tab** löscht
Entwurf, neues Konto bekommt leeres Formular · **Kontowechsel in anderem Tab**
ohne Abmelden verwirft Entwurf · **späte Erfolgsantwort nach Abmelden** wird
verworfen · **Verbindungsabbruch während Versand** (kein falscher Erfolg, kein
Nachsenden) · **Verbindungsabbruch während Profilanlage**, Anlage kam an →
Profil genau einmal, gefunden · leeres Ergebnis ist kein Erfolg · Direktlink und
Neuladen ohne Profil → Profilanlage, keine Abrufe von Beiträgen/Gruppen/Aufgaben ·
„Profil wird geladen …“ · Fokus auf neuer Überschrift · Profilformular bei 320 px ·
Abmelden ohne Serverantwort meldet lokal trotzdem ab (supabase-js entfernt die
lokale Sitzung auch ohne Antwort; „Abmeldung nicht bestätigt“ kann daher praktisch
nicht eintreten). Screenshots: `doku/community/review/2026-10-12-nachbesserung/`.

### Weiterhin nicht belegt (ehrlich offen)

- Installierte App (Standalone-Modus) und echter Mail-Link Ende zu Ende – erst mit
  SMTP und auf einem echten Gerät prüfbar.
- Bildschirmleser, 200 % Textgröße und Bildschirmtastatur – nur auf echten Geräten.
- Zwei Tabs, die **gleichzeitig** anlegen (getestet: nacheinander und verlorene
  Antwort). Die Datenbank schützt durch Primärschlüssel; die Oberfläche prüft nach.
- Fremde Gruppe als Ziel mit Login-Rückweg – Gruppen gibt es noch nicht.
- Backend-Ausnahme (aus dem Review): Die Speicherregel „eigener Ordner“ erlaubt
  Lesen eigener Dateien ohne Profilprüfung; nur relevant bei entferntem Profil mit
  verbliebenen Dateien. Dokumentiert in `supabase/README.md`, nicht geändert.
- Datenschutzerklärung: Anschrift, Kontakt, Supabase-Vertragspartner und
  Garantien, Mailanbieter und Fristen fehlen (Lukes).

## 2026-10-08 (3) · Claude → ChatGPT (Review) → Lukes

**Vorheriger Beitrag:** ChatGPT – `01-uebersicht.md` und `02-anmeldung-profil.md`
(Version 3), `03-community-regeln.md`; Lukes – Freigabe der fünf Punkte in
`entscheidungen.md`.
**Rolle:** Umsetzung. **Grundlage:** Branch `community-zugang`, abgezweigt von
`main` @ `0c472bb`; Datenschicht @ `3386b94`.
**Nächste Übergabe an:** ChatGPT zum Review, danach Lukes für die offenen
Entscheidungen unten. **Nicht gemergt, nicht live** – `main` bleibt unverändert.

### Umgesetzt (nur das freigegebene Zugangspaket)

- **A Anmeldung, B Mail versendet (Link oder 6-stelliger Code), C Prüfen,
  D Profil anlegen, C17 Regeln** – `quellen/community-ansicht.js`, Texte wörtlich
  aus 02, Regeltext wird beim Bau aus `03-community-regeln.md` gelesen
  (eine Quelle, Build bricht ab, wenn es nicht genau 8 Regeln sind).
- **Einstiege:** Ich → Zeile „Community"; Heute → „Gemeinsam lernen" mit
  „Zur Community" (ohne Wochenaufgabe, lädt keine Community-Daten). Vier Tabs
  bleiben, in der Community ist „Ich" aktiv.
- **Datenschicht:** Link-Einlösung als Versprechen, abgelaufene/fremde Links
  erkannt, Abmelden räumt alle `azubipass-sitzung*`-Schlüssel weg.
- **Drei Codes klar getrennt:** „Anmeldecode aus der E-Mail" (nur B, Ziffern,
  `one-time-code`), „Beta-Zugangscode" (nur D), Gruppen-Code kommt nicht vor.

### Belege

| Prüfung | Ergebnis |
|---|---|
| `community_zugang_test.py` (neu, echter Browser + echtes Supabase) | **70 von 70 Prüfungen OK** |
| `community_test.py` (Datenschicht) | 39 OK, 0 Fehler |
| `pruefe.py app.html` (2 Größen × 2 Stimmungen, jetzt **inkl. Community**) | Keine Fehler; Gegenprobe mit absichtlich zu kleinem Knopf wurde erkannt |
| `funktionstest.py` | 188 OK, 2 FEHL, Abbruch bei „Eigene Probeklausur" – **identisch mit dem Original `EinsSkill/AzubiPass` @ 0feae83** (dort ebenfalls 188 OK, dieselben 2 FEHL, derselbe Abbruch). Altfehler: „Alle Kapitel fertig: Prüfungstraining öffnen", „Alle fertig: Ziel ist der Übungsteil", Abbruch „Eigene Probeklausur". Ein zwischenzeitlicher neuer Fehler („0 fällige Karten: kein toter Knopf") kam vom Community-Link und ist behoben. |
| `supabase/tests/regeln_test.sql` | nicht erneut ausgeführt – keine Änderung an Regeln oder Rechten |

Die Fälle aus 02 §9 einzeln: kein Zugriff ohne Sitzung/Profil (keine
`/rest/v1`-Anfrage vor Anmeldung, auch nicht auf Heute) · Code: falsche Länge,
Buchstaben, führende Null bleibt erhalten (echter Server lehnt ab), Rate-Limit,
erfolgreicher Code führt zu D · falscher Beta-Code, belegter Name (andere
Groß-/Kleinschreibung), fehlende Bestätigungen mit Fehlerübersicht, übrige
Eingaben bleiben · Doppelklick: genau ein Versand, genau eine Profilanlage ·
zwei Tabs: zweiter Tab übernimmt das Profil des ersten, keine zweite Anlage ·
verlorene Antwort: Profil wird gefunden · Antwort UND Nachsehen scheitern:
„Wir konnten nicht prüfen …", danach „Status prüfen" findet es · Profil-Lesefehler
führt nicht zu D · wiederkehrend ohne Beta-Code · unbekanntes Ziel nach Login:
keine Daten · abgelaufener Link und Link aus fremdem Browser: klarer Rückweg,
Adresse aufgeräumt · offline: kein Versand, kein Absenden, Heute sagt es,
Lernen bleibt erreichbar · Abmelden: kein Name mehr sichtbar, Sitzung weg,
Lernstand (`azubipass:konto`) Byte für Byte unverändert · Tastaturreihenfolge D
wie in 02 §8, Regeldialog: Escape, Fokus zurück, kein Haken · alle Tippziele
≥ 44 × 44 px in A, B, D, Regeln, Community · 320 px ohne seitliches Scrollen.

**Wie getestet:** Wo eine echte Mail nötig wäre, ersetzt der Test nur die
Antwort des Mailservers (`/auth/v1/otp`, `/auth/v1/verify`); beim Code kommt
eine **echte** Sitzung zurück. Alles andere geht an das echte Projekt. Screenshots:
`doku/community/review/2026-10-08-zugang/`.

### Abweichungen und Entscheidungsbedarf (bitte nicht still übernehmen)

1. **Ziel nach erfolgreichem Zugang.** 02 sagt „Beiträge" – die sind nicht
   freigegeben. Übergangsweise zeigt die Community nur das eigene Profil
   (Name, Lehrjahr, ggf. Rolle) mit „Community-Regeln lesen" und „Abmelden",
   darunter **erfundener Text**: „Beiträge und Lerngruppen kommen mit der
   nächsten Version." → ChatGPT/Lukes: Text und Ansicht festlegen.
2. **Selbst ergänzte Texte** (in 02 nicht vorgegeben): Augenbraue „Ich ·
   Community"; „‹ Zurück"; „Schließen" im Regeldialog; „Bitte prüfe deine
   Eingaben:" über der Fehlerübersicht; Knopf „Status prüfen"; Ladetext
   „Abmelden …"; Überschrift „Community" für Offline-, Nicht-verfügbar- und
   Unklar-Ansicht; Gruppentitel unter Ich „Gemeinsam lernen"; Code-Fehler bei
   Rate-Limit „Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch
   es erneut."; bei Netzfehler „Das hat gerade nicht geklappt. Versuch es
   erneut."; Prüffehler „Die Anmeldung konnte nicht geprüft werden. Versuch es
   erneut." → Review.
3. **„Öffne den Link in diesem Browser."** wird immer gezeigt: technisch nötig,
   weil der Link (PKCE) nur im anfordernden Browser gilt.
4. **Datenschutzerklärung** (`datenschutz.html`, verlinkt aus A) sagt noch
   „kein externer Dienst" und kennt keine Konten. **Vor der Klassen-Beta
   anpassen** – Rechtstext, also Entwurf durch ChatGPT, Entscheidung Lukes.
5. **Code-Länge:** Die App erwartet 6 Ziffern. In Supabase unter
   Authentication → Providers → Email muss „Email OTP Length" 6 sein (prüfen).
6. **Mail-Link Ende zu Ende** ist ohne SMTP nicht testbar; getestet sind
   Fehlerwege und der Code-Weg mit echter Sitzung.
7. Schlägt ein Abruf fehl, wiederholt die Supabase-Bibliothek ihn selbst; der
   unklare Ausgang erscheint deshalb nach gut 10 Sekunden (Knopf zeigt so lange
   „Profil wird angelegt …").
8. Testkonten: 21 von 28 `test-neu*` verbraucht, Stand in `supabase/README.md`.

## Offene Aufgaben (Lukes)

- [ ] **Mail-Sache – bewusst auf später verschoben.** Bis dahin kommen
  Anmelde-Mails nicht bei der Klasse an; getestet wird mit den Demo-Konten.
  - eigener Mailversand in Supabase (Authentication → Emails → SMTP),
    Vorschlag Gmail mit App-Passwort, `smtp.gmail.com:587`
  - Rate Limit für Mails auf ca. 60 pro Stunde (Authentication → Rate Limits)
- [x] GitHub Pages läuft: https://einsskill.github.io/AzubiPass-Social/ (Demo-Anmeldung dort getestet)
- [x] Site URL, Redirect-URL und Mailvorlage erledigt (Lukes, 08.10.)
- [ ] „Konto löschen" einspielen (`supabase/ausstehend/`), braucht Bestätigung

---

## 2026-10-08 · ChatGPT → Lukes (eingetragen von Claude, Wortlaut aus 01/02)

„2026-10-08 · ChatGPT → Lukes: 01-uebersicht.md und 02-anmeldung-profil.md,
Version 3: Navigation, Heute-Gestaltung und Regeltext im Chat freigegeben; neue
Mail-Code-Unterstützung mit Claudes Datenschicht abgeglichen. Nächster Schritt:
Lukes entscheidet und dokumentiert die freigegebene Version; Claude implementiert
danach den freigegebenen Umfang."

„ChatGPT → Lukes, 2026-10-08: Zugangsspec Version 3: bestätigte Einstiege,
freigegebener Regeltext und Mail-Code-Unterstützung. Übergabe zur Umsetzung des
aktuellen Zugangspakets. Claude setzt nach dokumentierter Freigabe A–D um und
belegt Zugriffsschutz sowie Fehler-/Offline-Fälle."

---

## 2026-10-08 (2) · Claude → ChatGPT / Lukes

**Vorheriger Beitrag:** Claude – Datenbank und Regeln (`supabase/`).
**Rolle:** Umsetzung. **Grundlage:** `main`, siehe `git log`.
**Nächste Übergabe an:** ChatGPT – weiterhin `01-uebersicht.md` und
`02-anmeldung-profil.md`. Die Technik dahinter ist fertig, die Oberfläche
wartet auf die freigegebenen Entwürfe.

### Neu

- `quellen/community.js` – Datenschicht ohne Oberfläche (`AP.community`):
  Anmeldung per Mail-Link **und** per 6-stelligem Code aus derselben Mail
  (für die installierte App, wo der Link oft im Browser statt in der App
  aufgeht), Profil, Gruppen, Beiträge mit Datei, Antworten, beste Antwort,
  Hilfreich, Wochenaufgaben, Melden, Moderation, Live-Meldungen.
  Fehlermeldungen kommen fertig auf Deutsch – die Entwürfe können sie
  wörtlich übernehmen oder bessere vorschlagen.
- `quellen/supabase.js` – Bibliothek lokal statt von fremden Servern; wird
  erst geladen, wenn jemand die Community öffnet.
- `quellen/community_test.py` – ~~45~~ **39 bis 42 Prüfungen** (je nachdem,
  ob die Demo-Profile schon bestehen) mit zwei Demo-Konten gegen das echte
  Projekt, alle bestanden. *Korrektur 08.10.: Die Zahl 45 war nicht gezählt,
  sondern geschätzt.* Passwort und Demo-Code hat nur Lukes.

### Für die Entwürfe wichtig

- Anmeldung: Nach „Link schicken" braucht der Bildschirm zwei Wege –
  Link in der Mail antippen **oder** Code eintippen.
- Hochgeladene Dateien sind privat und werden über Links angezeigt, die eine
  Stunde gelten. Vorschaubilder also nachladen, nicht dauerhaft speichern.
- Fehlerarten, nach denen die Oberfläche unterscheiden kann:
  `netz`, `anmeldung`, `rechte`, `eingabe`, `bremse`, `server`.

### Bekannte Grenzen

- `funktionstest.py` scheitert bei „Eigene Probeklausur" – **schon im
  Original** (`EinsSkill/AzubiPass` @ 0feae83) so, nicht durch die Community.
  Eigene Aufgabe, nicht Teil dieses Projekts.
- „Konto löschen" (`supabase/ausstehend/`) wartet auf Lukes' Bestätigung.
- Anmelde-Mails gehen erst an die Klasse, wenn eigener Mailversand (SMTP)
  eingerichtet ist.

---

## 2026-10-08 · Claude → ChatGPT

**Vorheriger Beitrag:** Lukes – Repo angelegt, Rollen festgelegt.
**Rolle:** Umsetzung. **Grundlage:** `main` @ siehe `git log`.
**Nächste Übergabe an:** ChatGPT – Übersicht aller Community-Bildschirme
(`01-uebersicht.md`) und erster Bildschirm „Anmeldung und Profil anlegen"
(`02-anmeldung-profil.md`), beides im Format von `00-vorlage.md`.

### Was schon steht (nicht neu entwerfen, darauf aufbauen)

- Supabase-Projekt `azubipass-social` (Frankfurt). Schema, Regeln und Test
  unter `supabase/` – siehe `supabase/README.md`.
- **Anmeldung:** Link per Mail (kein Passwort). Danach legt man ein **Profil**
  an: Beta-Zugangscode, Anzeigename (2–30 Zeichen, eindeutig), Lehrjahr 1–3
  (optional), Häkchen „mindestens 16", Häkchen „Community-Regeln".
  Ohne Profil sieht man in der Community nichts.
- **Rollen:** `azubi`, `mentor` (vergibt das Team), `team` (nur Datenbank).
- **Lerngruppen:** gründen (Name 3–60, Beschreibung bis 500, offen oder
  geschlossen), beitreten per 8-stelligem Code oder bei offenen Gruppen direkt,
  verlassen. Rollen in der Gruppe: `leitung`, `mitglied`. Max. 10 gegründete
  Gruppen pro Person.
- **Beiträge** (für alle oder für eine Gruppe), drei Arten: `lernzettel`
  (mit Datei Bild/PDF bis 5 MB), `frage`, `tipp`. Titel 3–120, Text bis 4000,
  optional Lernfeld und Kapitel. Fragen können „an Mentor:innen" gehen.
- **Antworten** bis 2000 Zeichen; wer gefragt hat, markiert die **beste
  Antwort** → Frage gilt als gelöst.
- **„Hilfreich"** – eine Markierung pro Person und Beitrag.
- **Wochenaufgaben** (Challenges): von der Gruppenleitung oder vom Team,
  laufen höchstens 31 Tage, man hakt sie als erledigt ab; sichtbar ist, wie
  viele erledigt haben.
- **Melden** mit Grund (falsch, Urheberrecht, Beleidigung, Spam, persönliche
  Daten, sonstiges). Drei Meldungen blenden einen Inhalt automatisch aus, bis
  das Team entscheidet. Team kann aus- und einblenden.
- **Spam-Bremse:** 20 Beiträge / 60 Antworten / 30 Meldungen pro Stunde.

### Grenzen für die Entwürfe

- Eine Designsprache: `PRODUCT.md`, `DESIGN.md`. Waldgrün, Creme, Gold als
  Orientierung; Source Serif 4 / IBM Plex Sans / IBM Plex Mono.
- Keine Emojis, kein Konfetti, keine Punkte/Streaks/Ranglisten-Jagd,
  keine generischen Dashboard-Kacheln, keine erfundenen Kennzahlen.
- Mobil zuerst, Tippziele mindestens 44 × 44 px, Tastatur bedienbar.
- Lernen und Üben bleiben offline nutzbar. **Community braucht Internet** –
  der Offline-Zustand muss entworfen werden.
- Ton: Azubi zu Azubi, direkt, ohne Werbesprache.
- Rechtlich: keine echten IHK-Prüfungsaufgaben hochladen lassen
  (Hinweis beim Upload), Mindestalter 16.

### Offene Fragen an Lukes (bitte in `entscheidungen.md` beantworten)

1. Die App hat heute eine Vierer-Tab-Leiste (Heute, Lernen, Üben, Ich).
   Community als **fünfter Tab** oder ersetzt/erweitert sie einen bestehenden?
2. Soll die Community auf „Heute" auftauchen (z. B. laufende Wochenaufgabe)?

