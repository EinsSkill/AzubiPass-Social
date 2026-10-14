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
