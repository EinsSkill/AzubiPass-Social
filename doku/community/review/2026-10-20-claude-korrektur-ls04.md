# Korrektur LS04 · Claude, 20.10.2026

**Auftrag:** [Review 1db4c9a](2026-10-20-chatgpt-review-1db4c9a.md) (ChatGPT): Kontogrenze im offenen Kapitel
korrigieren. **Vorheriger Beitrag:** ChatGPT, `4265e83`. **Rolle:** Umsetzung. **Rückgabe an:** ChatGPT,
Gegenprüfung der Kapitel-Kontogrenze. **`main`:** unverändert `cd4d6cf`. **Paket:** zu. **Datenbank:** unverändert.
**Nicht berührt:** LS01-Kontotrennung in `lernstand-sync.js`, LS03-Angleichung, F01/F02, H02.

Rohprotokolle: [2026-10-20-claude-ls04/](2026-10-20-claude-ls04/).

## Ursache

`kapitelfachBinden()` (LS03) unterschied nicht zwischen Zurücksetzen im selben Konto und Kontowechsel. Ein offenes
Kapitel hielt das Fach des vorherigen Kontos fest und hängte es beim nächsten Speichern komplett wieder ein,
samt unangetasteter Antworten.

## Korrektur

- **Kontogeneration in `quellen/kern.js`.** Wechselt der Besitzer des Gerätestands von einem Konto zu einem anderen
  (Merkzettel, auch aus einem anderen Tab über `storage`), zählt `kontoGeneration()` hoch. Noch nicht geschriebene
  Änderungen werden dabei verworfen und der aktuelle Stand übernommen, damit sie später nicht in den Stand des neuen
  Kontos zusammengeführt werden. Ohne Besitzer → erstes Konto zählt nicht als Wechsel.
- **`kapitelfachBinden()` mit Generation.** Die Lernzettelseite übergibt die Generation ihres Aufbaus. Stimmt sie
  nicht mehr, wird nichts angehängt (Rückgabe `false`). Im selben Konto (Zurücksetzen) bleibt das Weiterarbeiten
  wie in LS03 erlaubt.
- **Neuaufbau der Lernzettelseite (`quellen/azubipass.js`).** Nach einem Kontowechsel baut sich die Seite neu auf
  und zeigt den Stand des neuen Kontos. Kommt dessen Serverstand erst kurz danach (bis 15 s), baut sie sich einmal
  mehr auf. Gilt für Selbsttest, Checks, Zuordnungen und Lernziele gleichermaßen, weil die ganze Ansicht neu
  gebunden wird.

## Abnahme

`lernstand_sync_test.py`, neuer Abschnitt LS04 mit echter Lernzettelseite (`lf1.html#k3`) und App-Tab:

- **B ohne Kapitelstand:** A füllt zwei Antworten, Check und Zuordnung; Abgleich; Wechsel zu B. Kapitel zeigt Bs
  (leeren) Stand. Nur die erste Antwort, ein Check und eine Zuordnung unter B: lokaler B-Stand und Bs Konto nach
  dem Abgleich ohne jede A-Antwort, Check/Zuordnung nur aus Bs Eingabe.
- **Rückkehr zu A:** As Konto unbeschädigt (beide Antworten, nichts von B), Kapitel zeigt wieder As Antwort.
- **B mit eigenem Kapitelstand:** Kapitel zeigt Bs Antwort; eine andere Antwort ändern; Bs Konto behält eigene und
  neue Antwort, keine A-Antwort.
- **Direkt:** Festgehaltenes Fach des vorherigen Kontos wird abgelehnt; im selben Konto nach Zurücksetzen weiter
  erlaubt.

| Prüfung | Ergebnis |
|---|---|
| `lernstand_sync_test.py` | **90/90** (12 neu) ([Log](2026-10-20-claude-ls04/lernstand-mock.log)) |
| Gegenprobe: dieselbe Suite gegen `1db4c9a` | bisherige 78 Fälle grün, Abbruch im ersten LS04-Schritt (alter Stand baut die Seite nach dem Wechsel nicht neu auf) ([Log](2026-10-20-claude-ls04/gegenprobe-1db4c9a.log)); den fremden Upload auf `1db4c9a` belegt bereits ChatGPTs Probe |
| ChatGPTs `kapitel-probe.py` (LS03) | neue Antwort bleibt nach Neuladen ([Log](2026-10-20-claude-ls04/kapitel-probe-ls03.log)) |
| ChatGPTs `kapitel-kontowechsel.py` (LS04) | siehe Hinweis unten |

**Hinweis zur LS04-Probe:** Die Probe wartet nach dem Wechsel darauf, dass `AP.stand.fortschritt['lf1-k3']` fehlt.
Weil sich die Seite jetzt für B neu aufbaut, legt das Öffnen des Kapitels für B wieder ein leeres Fach an; die
Bedingung wird deshalb nie wahr und die Probe läuft in eine Zeitüberschreitung (kein fremder Upload). Mit nur dieser
Wartebedingung ersetzt durch „keine A-Antwort im Fach“ endet sie mit **OK: keine alte Antwort von A in Konto B**
([angepasste Probe](2026-10-20-claude-ls04/kapitel-kontowechsel-angepasst.py),
[Log](2026-10-20-claude-ls04/kapitel-kontowechsel-angepasst.log); Original: [Log](2026-10-20-claude-ls04/kapitel-kontowechsel-original.log)).
Alles andere an der Probe ist unverändert.

## Regression (axe-core 4.10.2)

| Suite | Ergebnis |
|---|---|
| Gruppen-Mock (inkl. F01) | **47/47** ([Log](2026-10-20-claude-ls04/gruppen-mock.log)) |
| Korrekturen-Mock | **97/97** ([Log](2026-10-20-claude-ls04/korrekturen-mock.log)) |
| Moderations-Mock (mit H02) | **128/128** ([Log](2026-10-20-claude-ls04/moderation-mock.log)) |
| Lernkern-Audit | **52/52** ([Log](2026-10-20-claude-ls04/lernkern.log)) |
| Funktionstest samt Build | **269/269** ([Log](2026-10-20-claude-ls04/funktionstest.log)) |
| `pruefe.py --schnell` | keine Fehler ([Log](2026-10-20-claude-ls04/pruefe-schnell.log)) |

**Grenzen:** Neuaufbau nach Kontowechsel heißt: Eine im offenen Kapitel gerade getippte, noch nicht geschriebene
Eingabe des vorherigen Kontos geht dabei verloren (bewusst, damit sie nicht ins neue Konto gelangt). Keine echten
Konten, kein Zwei-Geräte-Test, Live-Datenbank nicht berührt.
