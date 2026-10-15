# Abnahme Claude · G06, R03 und Spec 06 (15.10.2026)

**Grundlage:** Freigabe von Lukes laut `uebergabe.md` (ChatGPT-Abschnitt in
`86adcd3`), Technikplan `06-technik-plan.md` auf Stand `e3a7456`,
`05-technik-plan-g06.md`. **Branch:** `community-zugang`. `main` unverändert
(`0c472bb`). **Paketsperre:** zu (nicht angefasst). **E13:** offen – keinem
Konto wurde `team` oder `beitraege_tester` zugewiesen.

## 1. Commits

| Commit | Inhalt |
|---|---|
| `4e614a4` | G06 und R03: zwei Migrationen eingespielt, lokale Konkurrenztests |
| `a22ee32` | Spec 06 Datenbank: 19 Migrationen eingespielt, SQL- und Konkurrenztests |
| `e39f010`, `aa6e1b9`, `ecfed2e` | Logo (ChatGPT, von Lukes beauftragt) – übernommen, nicht verändert |
| dieser Commit | Spec 06 Oberfläche, vier Texte, Tests, Abnahme, Übergabe; auf den Logo-Stand aufgesetzt und neu gebaut |

## 2. Eingespielte Migrationen (live, Supabase)

- G06 `20261015125055_dateischutz_sperre` – `datei_in_gebrauch` sperrt das
  Speicherobjekt (`for update`), erst danach die Verwendungsprüfung; direkter
  Beitrags-Insert nur noch für Gruppen-Textbeiträge ohne Datei.
- R03 `20261015125103_antwort_senden_sperre` – Wiederholung zuerst, dann
  Beitrag `for share`, dann Sichtbarkeit, Vorgang, Antwort.
- Spec 06 `20261015130421` … `20261015130848` (19 Dateien): Tabellen
  `ausblendung`, `pruefanfrage`, `moderation_entscheidung` (nur anhängen),
  `begruendung_vorlage`; RPCs `meldung_senden`, `meldung_status`,
  `meine_meldungen`, `moderation_zaehler/_faelle/_fall/_vorlagen/_ausgeblendet/_protokoll`,
  `moderation_entscheiden`, `entscheidung_status`, `eigene_ausblendungen`,
  `eigener_inhalt`, `pruefanfrage_senden`, `pruefanfrage_status`;
  `vorgang_klaeren` erweitert; Rechte E10 (keine Teamlöschung fremder
  Inhalte), E11 (`geloest` nicht direkt), P6 (kein direkter Antwort-Insert).
- **Nicht ausgeführt:** `supabase/ausstehend/moderieren_entfernen.sql`
  (`DROP` der alten Funktion `moderieren`; Rechte sind entzogen, die Datei
  wartet auf gesonderte Bestätigung).
- Technischer Hinweis: Das MCP-Werkzeug bricht Anweisungen mit `DROP`/`DELETE`
  ab. Alte Melde-Policies sind deshalb per `alter policy … with check (false)`
  stillgelegt statt gelöscht; Wirkung gleich, im Test geprüft.

## 3. Prüfungen – getrennt nach Art

### Echte Datenbank

| Prüfung | Ort | Ergebnis |
|---|---|---|
| `supabase/tests/moderation_test.sql` (Fälle 1–17, Rollback) | lokal PostgreSQL 16 mit Supabase-Grundlage | bestanden |
| dieselbe Datei ohne Lösch-Anweisungen | live Supabase (Rollback) | bestanden |
| `regeln_test.sql` (angepasst: Beitrag/Antwort nur über RPC) | live | bestanden |
| `korrekturen_g03_g05_test.sql` | live | bestanden |
| Invariante „aktive Ausblendung ⇔ versteckt“ | live | 0 Abweichungen |

### Echte Nebenläufigkeit (zwei Verbindungen, lokal)

`supabase/tests/lokal/konkurrenz.py` gegen `aufbauen.sh`-Datenbank:
G06 beide Reihenfolgen (inkl. geschlossene Paketsperre), R03 Fälle 20–23
inkl. Wiederholung nach späterer Ausblendung, Spec 06: Fall 1 (B4-Wettlauf),
6 (gleiche Kennung), 15 (P3 Version), 18 (P6 Bearbeiten/Löschen beide
Reihenfolgen), 19/19b (R02). Alle bestanden; `--alt` (Gegenprobe am alten
Stand) scheitert wie erwartet.

### Browser mit nachgebildeter Schnittstelle [mock]

| Datei | Ergebnis |
|---|---|
| `quellen/community_moderation_test.py` (neu) | 50/50, axe ohne WCAG-Verstöße in 6 Zuständen |
| `quellen/community_korrekturen_test.py` (Text 1 aktualisiert, P4-Codes ergänzt) | bestanden |
| `quellen/funktionstest.py` | 269/269 |
| `quellen/lernkern_audit_test.py` | „Alles in Ordnung“ (hier auch A09 bei 320 px; ChatGPT meldete dort 1 px Überlauf – Umgebungsunterschied, nicht Spec 06) |
| `quellen/pruefe.py --schnell app.html` (Sichtprüfung) | keine Fehler; der volle Lauf über alle Seiten brach nach 15 min am Zeitlimit dieser Umgebung ab (nicht als bestanden zu werten, Community-Ansichten betrifft er nur über `app.html`) |

Abgedeckt [mock]: Meldedialog (Pflichtgrund, Fokus, Rückmeldung am Ursprung,
„bereits gemeldet“, unklar → Status prüfen → Erneut senden mit festem
Versandstand, APB01/APZ01 als sichere Ablehnung), Teamkorrektur-Kennzeichnung
und „Team“ als öffentlicher Name, Antwortbezug, eigene ausgeblendete Antwort
als Platzhalter, Meine Meldungen, eigener Inhalt mit Prüfanfrage (unklar →
Status → genau eine Anfrage, danach kein zweites Anfragerecht), Rechte ohne
Team, Zähler und Zähler-Ladefehler ohne erfundene 0, Fälle schädlich zuerst
ohne Meldernamen, Entscheidung „Inhalt ausblenden“ (Vorlage, „…“-Prüfung,
Vorschau, Ersetzen-Rückfrage, Bestätigung, unklar → Status), APF01 → „Fall
neu laden“, Direktweg vom Beitrag. P4: alle acht eigenen Codes bei HTTP 400
sicher, `APF01`/503 und `AP999`/400 unklar.

Bilder: [`2026-10-15-spec06/`](2026-10-15-spec06/).

### Livetests – nicht ausgeführt

`community_test.py`, `community_beitraege_test.py`,
`community_schreiben_test.py` sind auf die neue Schnittstelle umgestellt
(`meldungSenden`, `moderationFall` + `entscheiden`), konnten aber **nicht
laufen**: In dieser Umgebung gibt es kein Testkonto-Passwort. Ebenso fehlt ein
Ende-zu-Ende-Test des Storage-API-Wegs für G06; geprüft ist die
Datenbankseite (Sperre auf `storage.objects`) mit zwei echten Verbindungen.

## 4. Texte

- Bestätigte Texte 1–4 (`entscheidungen.md`) stehen in den vorgesehenen
  Zuständen: 1 und 2 neu in `community-beitraege.js` (Klärungshilfe mit
  Beitrags- und Antwortvariante, Sperrhinweis), 3 und 4 waren seit G08/R01
  vorhanden.
- **Von Claude ergänzt, zur Bestätigung:** Erfolgstexte der Entscheidungen
  (u. a. „Die Erklärung wurde geändert.“, „Die Teamkorrektur wurde
  veröffentlicht.“, „Die Entscheidung wurde gespeichert. Die Liste konnte
  noch nicht neu geladen werden.“), Hinweise der Klärungsleiste für
  Entscheidung und Prüfanfrage („… doppelt gespeichert wird dabei nichts.“),
  „Ersetze „…“ durch die konkrete Stelle.“, „Deine Begründung ersetzen?“, die
  beiden Prüfergebnis-Vorlagen in `begruendung_vorlage`, Ladetexte der Listen.

## 5. Grenzen und Abweichungen

- `eigene_ausblendungen` ohne Seitennavigation (höchstens 200 Einträge).
- Vier ältere Funktionen weichen live nur durch entfernte Kommentare vom Repo
  ab (vorbestehend, kosmetisch); Regeln, Spalten und Rechte sind identisch.
- Die Team-Einstiege in der Oberfläche richten sich nach `profil.rolle`; das
  Recht prüft ausschließlich die Datenbank.
- Mock-Tests ersetzen keine Livetests mit echten Konten.

## 6. Nächster erlaubter Schritt

Review durch ChatGPT auf diesem Commit. Danach Lukes: E13 (konkretes
Teamkonto), Bestätigung der ergänzten Texte, `moderieren_entfernen.sql`,
Livetests mit Zugangsdaten, Merge/Deployment/Paketsperre – alles gesondert.
