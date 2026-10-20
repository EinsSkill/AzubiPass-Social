# Gesamtaudit 12.10.2026 · Korrekturen am Lernkern

**Vorheriger Beitrag:** ChatGPT – Gesamtaudit von `community-zugang` @ `a443607`
(Ablage auf dem Community-Branch: `doku/community/review/2026-10-12-gesamtaudit/`).
Lukes – Entscheidungen vom 12.10.: Beta kostenlos, Preise entfernen; erst Audit,
dann Community; Lernkern-Korrekturen auf eigenem Branch von `main` mit separater
Freigabe; Lernkern und Community gehen in die Klasse.
**Rolle:** Umsetzung. **Branch:** `lernkern-audit` (von `main` @ `0c472bb`).
**Nicht gemergt in main, nicht live.** Danach wird der Branch in
`community-zugang` übernommen.

A02, A03 und R01 betreffen die Community und sind schon auf `community-zugang`
@ `bd0b91e` behoben (siehe dortige Übergabe).

Regressionstest für alles hier: `quellen/lernkern_audit_test.py` (Chromium,
keine Konten, kein Netz nach außen) – **42/42**. Gegenprobe gegen `main`:
A01 (Import bricht ab, Ich danach unbedienbar) und A05 (Lesezeichen nach 0/100 ms
weg) schlagen dort fehl; A04 lässt sich dort gar nicht erst prüfen, weil der alte
Vorrat keine Prüfwerte hat.

| Befund | Problem | Änderung | Test | Grenzen |
|---|---|---|---|---|
| A01 Import | Formal gültiges JSON mit falschen Typen (z. B. `lesezeichen:[null]`, `aktivitaet:42`, `karten:{"x":null}`) warf beim Zusammenführen, schrieb Teile in den Speicher und legte „Ich“ samt Import lahm. | `kern.js`: `sicherungPruefen()` prüft jedes Feld und jeden Eintrag (streng bei Typen, großzügig bei fehlenden Feldern → v1/v2 bleiben einspielbar). `app.js`: Zusammenführen in einer **Kopie**, Übernahme mit `kontoErsetzen()` in einem Schritt, sofort gespeichert. `normalisieren()` bereinigt beim Laden auch einzelne Einträge (Karten, Vokabeln, Lesezeichen, Lerntage, Ergebnisse, zuletzt, Termin). | 8 kaputte Dateien: Ablehnung mit Grund, Speicher byte-gleich, kein Skriptfehler; Import danach erreichbar; gültige Sicherung in frischem Browser (Fortschritt, Karten, Vokabeln, Lesezeichen); v1-Datei → v3; schon gespeicherter kaputter Stand: Ich/Heute ohne Fehler, bereinigt. | Unbekannte Felder werden wie bisher nicht übernommen. Ablehnungstext neu (Claude): „Diese Sicherung ist beschädigt und wurde nicht eingespielt (…). Nichts geändert.“ |
| A05 Speichern | `sichern()` schrieb erst nach 400 ms; Neuladen nach 0/100 ms verlor die Aktion. | Erste Änderung wird **sofort** geschrieben, weitere in kurzer Folge gebündelt (Tippen); Ausstehendes wird bei `pagehide`, `beforeunload` und Wechsel in den Hintergrund geschrieben. `sofortSichern()` für Stellen, die eine Bestätigung zeigen (Import). | Lesezeichen + Neuladen nach 0 und 100 ms bleibt; zweite Änderung innerhalb des Bündels + Seitenwechsel bleibt. | Ein harter Prozessabbruch des Betriebssystems ist nicht nachgestellt. Eine Änderung aus einem zweiten Tab kann – wie vorher – von einem ausstehenden Schreiben dieses Tabs überschrieben werden. |
| A04 Offline-Cache | Fehlende Dateien wurden beim Installieren übergangen (`.catch(()=>{})`), später wurde aus dem Netz – ggf. einer neueren Fassung – nachgefüllt. | `gemeinsames.py`: `zwischenspeicher_schreiben()` erzeugt `sw.js` mit **SHA-256 je Datei**; Fassungskennung aus den Prüfwerten. Installation nur, wenn alle Dateien ankommen **und** passen, sonst wird die halbe Fassung gelöscht und die alte bleibt aktiv. Antworten nur aus der eigenen Fassung, kein Nachfüllen. Läuft am Ende von `build.py`, `build_app.py` **und** `build_landing.py`. | Erstinstallation mit 503 → nichts aktiv; danach vollständig (55 Dateien); geänderte Datei unter gleicher Adresse kommt nicht in die Fassung; neue Fassung mit falschem Prüfwert → alte bleibt intakt und aktiv; offline mit zwei Tabs. | Liefert der Server kurz nach einem Deployment noch alte Dateien (CDN), scheitert die Installation und wird beim nächsten Besuch wiederholt – das ist gewollt. Erstbesuch ohne Netz bleibt ohne Offline-Fassung. Echte PWA-Installation auf Geräten nicht geprüft. |
| A06 Grafiken | `.kglied`/`.vgl-punkt` waren klickbare DIVs, per Tastatur nicht erreichbar (36 Ketten, 32 Vergleiche). | `azubipass.js`: Kopfzeile ist ein echter `<button>` mit `aria-expanded`/`aria-controls`; gesperrte Kettenstufen erreichbar mit `aria-disabled`; Text ist `aria-hidden`, solange zu. CSS: Optik unverändert, sichtbarer Fokusring. | Fokus, Enter, Leertaste, Freigabe der nächsten Stufe, aria-disabled, Schließen, Fokus sichtbar, Maus weiter, kein Eintrag ohne Knopf. | Übrige 14 Grafiktypen und SVG-Hotspots nicht per Tastatur/Screenreader geprüft. |
| A07 Sprunglink | `href="#inhalt"` wurde vom Hash-Verteiler als Ansicht gelesen; Kapitel verschwand. | `kern.js`: Klick auf `a.sprung` wird abgefangen; fokussiert die erste sichtbare Überschrift im `<main>` (sonst `<main>`), Adresse bleibt. | Kapitel LF4 K6, App Lernen, App Üben: Fokus im Inhalt, Hash unverändert. | – |
| A11 Kontrast | `.seite > .dreher` (#6C5208) überschrieb die Rückseite (#12301F), 1,94:1. | Regel gilt nur noch für `.seite:not(.rueck)`. | Rückseite 5,91:1; Vorderseite unverändert. | Hover-Zustände nicht gemessen. |
| A09 320 px | LF5 K6, LF10 K3, Buchführung K9 liefen über (Rasterspalten mit langem Wort). | `.kapitel-auftakt/.ziele/.lauf/.abschluss > * {min-width:0}`, Überschriften brechen um (`hyphens:auto`, `lang="de"`). Kein `overflow-x:hidden`. | Alle 75 Kapitel + Datenschutz, Impressum, Landing, Heute, Ich bei 320 px: kein Überlauf (80 Ansichten). | Datenschutz auf `community-zugang` (Entwurf mit langen Schlüsseln) wird beim Übernehmen dort geprüft. |
| A10 Heute | Alles fertig + `zuletzt = null` → „Dein erster Schritt“. | `app.js`: Zuerst prüfen, ob noch etwas offen ist. | 75 Kapitel fertig, kein zuletzt → „Prüfungstraining öffnen“. Funktionstest: die beiden bisherigen FEHL-Zeilen. | – |
| A08 Landing | Preise (11,99 €, 22,99 € …) widersprachen „kein Verkauf“; `href="/"`. | Entscheidung 12.10.: Preise ganz entfernt, Sätze zu Gratis-Teil/Endspurt angepasst, Logo `href="./"`. | Kein „€“, „gratis“, „Endspurt“ auf der Seite; kein `href="/"`. | Neue Texte von Claude, bitte prüfen: Meta „In der Beta kostenlos.“; Fakt „Beta · kostenlos“; Countdown „Prüfungstraining und eigene Probeklausuren findest du in der App unter Üben.“ + „Zum Prüfungstraining“; Katalog „In der Beta ist alles kostenlos — schau rein, …“; Abschluss „Fang einfach an. / Die Beta ist kostenlos.“ |
| Folge aus A05 | Beim allerersten Besuch lud die App nach der Übernahme durch den Zwischenspeicher sofort neu. Weil jetzt sofort gespeichert wird, war der einmalige Übernahme-Hinweis danach schon „gesehen“ (Funktionstest „Übernahme wird dem Nutzer gesagt“). | `app.js`: Neu geladen wird nur noch, wenn eine **alte** Fassung abgelöst wird – nicht beim ersten Besuch. | Funktionstest-Fall besteht; einzeln mehrfach nachgestellt. | – |
| Funktionstest | Abbruch bei „Eigene Probeklausur“ nach dem Neuladen (veraltete Navigation). | Nach dem Neuladen zuerst `#ueben`, dann der Einstieg; Assertions unverändert. | Test läuft jetzt bis zum Ende durch. | Ein vorher nie erreichter Fall schlägt fehl, siehe unten. |

### Offene Frage an Lukes/ChatGPT: Klausur nach der Abgabe erneut öffnen

Weil der Funktionstest jetzt durchläuft, wird zum ersten Mal die Prüfung
„Abgeschlossene Klausur wird nicht als laufende angezeigt“ erreicht. Sie
schlägt fehl: Öffnet man nach Abgabe und Neuladen „Eigene Probeklausur“, zeigt
die App die **Auswertung** der abgegebenen Klausur (ohne Uhr, mit „Offene
Antworten selbst bewerten“) – der Test erwartet die **Kapitelwahl**. Die Klausur
erscheint also nicht als laufende; strittig ist nur, was stattdessen kommt.
`doku/eigene-probeklausur.md` legt das nicht fest. Claude hat weder den Test
gelockert noch das Verhalten geändert. Entscheidung nötig: Auswertung behalten
(dann Test anpassen) oder Kapitelwahl zeigen (dann App anpassen).

### Gesamtläufe auf diesem Branch

| Prüfung | Vorher (`main`) | Jetzt |
|---|---|---|
| `lernkern_audit_test.py` | – (neu) | 42/42 |
| `funktionstest.py` | 188 OK, 2 FEHL, Abbruch bei „Eigene Probeklausur“ | **264 von 265**, läuft durch; einziger FEHL ist die offene Klausurfrage oben |
| `pruefe.py` (alle Seiten, 4 Ansichten) | 4 Fehler (A11-Kontrast), 6 Hinweise | **0 Fehler**, 6 Hinweise (offene fachliche Prüfmarker) |

Zwischenbefund und Korrektur: Die neuen Vergleichsknöpfe waren zunächst nur so
hoch wie ihre Textzeile (160 Tippziel-Meldungen in `pruefe.py`); der
Innenabstand liegt jetzt auf dem Knopf (≥ 44 px), Optik fast unverändert
(+6 px je Eintrag).

Nicht Teil dieser Korrekturen: E01/E02 (Gestaltung), die acht offenen
fachlichen Prüfmarker, Screenreader/OS-Zoom/echte Geräte.


## Nachtrag 13.10.2026 · Gegenprüfung ChatGPT

| Punkt | Änderung | Test |
|---|---|---|
| G01 Cache-Miss einer erwarteten Datei | Fetch-Handler prüft den Pfad gegen `VORRAT`. Fehlt ein erwarteter Eintrag (oder der ganze Speicher), wird die Datei nur mit **passendem SHA-256** aus dem Netz genommen und wieder abgelegt; sonst Hinweisseite (Navigation) bzw. 503 – nie eine Datei aus einer anderen Fassung. Nicht zum Vorrat Gehörendes wird wie bisher durchgereicht. | Eintrag fehlt + fremde Datei → 503/Hinweis; passende Datei → ausgeliefert und repariert; ganzer Speicher fehlt + fremde/passende Datei; Speicher repariert sich. |
| Klausur nach Abgabe | Entscheidung Lukes: Auswertung bleibt. In `doku/eigene-probeklausur.md` festgehalten. Funktionstest prüft jetzt: keine Uhr/kein Abgeben, Auswertung offen, Antworten und Selbstbewertung erhalten, „Auswahl ändern“ und „Neue Variante erstellen“ führen zur Vorbereitung. | Funktionstest |
| Landing-Satz | „In der Beta kannst du alle verfügbaren Lerninhalte und Übungen kostenlos nutzen.“ (Entscheidung Lukes) | A08 |
| Barrierefreiheit | siehe `2026-10-13-barrierefreiheit.md` (Tabellen per Tastatur, Kontraste) | Abschnitt BF |

Neuer Text von Claude, bitte prüfen: Hinweisseite „Diese Seite fehlt im
Offline-Speicher / Die gespeicherte Fassung der App ist unvollständig. Öffne die
App mit Internetverbindung neu, dann wird sie wieder vollständig geladen. / Zur
Startseite“.
