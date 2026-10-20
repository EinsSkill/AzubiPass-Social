# Korrektur LS03 · Claude, 20.10.2026

**Auftrag:** [Review 6fb610d](2026-10-20-chatgpt-review-6fb610d.md) (ChatGPT): LS03 gezielt beheben und den
Kapitelablauf testen. **Vorheriger Beitrag:** ChatGPT, `bbc6a2e`. **Rolle:** Umsetzung. **Rückgabe an:** ChatGPT,
Gegenprüfung des Kapitel-Speicherwegs. **`main`:** unverändert `cd4d6cf`. **Paket:** zu. **Datenbank:** unverändert.
**Nicht berührt:** LS01-Kontotrennung, F01/F02, H02.

Rohprotokolle: [2026-10-20-claude-ls03/](2026-10-20-claude-ls03/).

## Ursache

`einsetzen()` hielt nur das Kapitelobjekt fest und tauschte dessen Inhalt. Die Lernzettelseite merkt sich aber auch
die einzelnen Aufgabeneinträge (`gemerkt` in Selbsttest, Checks, Zuordnen). Nach einer Übernahme aus einem anderen
Tab schrieb die Seite in einen abgehängten Eintrag, gespeichert wurde der neue.

## Korrektur

- **`quellen/kern.js` – Angleichen bis in jede Ebene.** `einsetzen()` gleicht den übernommenen Stand jetzt rekursiv
  an: Objekte, die es weiter gibt, bleiben dieselben und bekommen nur neue Werte, Listen behalten ihr Objekt und
  bekommen neuen Inhalt. Damit bleiben alle gemerkten Einträge gebunden, auch über mehrere Übernahmen. Gilt für alle
  Wege über `einsetzen()` (andere Tabs, Zusammenführung vor dem Schreiben, Kontoabgleich, Sicherung einspielen).
- **`kern.js` neu `kapitelfachBinden()`, genutzt in `quellen/azubipass.js`.** Vor jedem Speichern aus dem Kapitel
  (Selbsttest-Eingabe und -Bewertung, Check, Zuordnung, Lernziel, Kapitelabschluss) werden Kapitelfach und
  bearbeiteter Eintrag wieder an den Lernstand gehängt, falls ein anderer Tab sie inzwischen entfernt hat
  (Zurücksetzen). Dann gilt, was auf dem Bildschirm steht; Einträge, die nur im neuen Stand stehen, bleiben.
- Die Kontotrennung aus LS01 ist unberührt: Ein fremdes Konto wird weiterhin ohne Zusammenführung übernommen.

## Abnahme

`lernstand_sync_test.py`, neuer Abschnitt LS03 mit echter Lernzettelseite (`lf1.html#k3`) und echten
Eingabe-Ereignissen, App-Tab im selben Browser:

- Antwort tippen → anderer Tab ändert den Lernstand → neue Antwort tippen: im Arbeitsspeicher und im Browser.
- Danach Selbsttest-Bewertung, Check und Zuordnung gespeichert; Änderung des anderen Tabs bleibt.
- Zweite Übernahme, erneut tippen: gespeichert, beide fremden Änderungen erhalten.
- Nächster Kontoabgleich: Konto hat Antwort, Check und Zuordnung. Neuer Tab: Antwort, Check, Zuordnung sichtbar.
- Anderer Tab setzt zurück, dann weiter tippen und „als Lücke“ markieren: gespeichert.

| Prüfung | Ergebnis |
|---|---|
| `lernstand_sync_test.py` | **78/78** (14 neu) ([Log](2026-10-20-claude-ls03/lernstand-mock.log)) |
| Gegenprobe: dieselbe Suite gegen `6fb610d` | 6 FEHL im LS03-Abschnitt, dann Abbruch ([Log](2026-10-20-claude-ls03/gegenprobe-6fb610d.log)) |
| ChatGPTs `kapitel-probe.py` auf neuem Stand | neue Antwort bleibt, auch nach Neuladen ([Log](2026-10-20-claude-ls03/kapitel-probe.log)) |
| Regression | siehe unten |

## Regression (axe-core 4.10.2)

| Suite | Ergebnis |
|---|---|
| Gruppen-Mock (inkl. F01) | **47/47** ([Log](2026-10-20-claude-ls03/gruppen-mock.log)) |
| Korrekturen-Mock | **97/97** ([Log](2026-10-20-claude-ls03/korrekturen-mock.log)) |
| Moderations-Mock (mit H02) | **128/128** ([Log](2026-10-20-claude-ls03/moderation-mock.log)) |
| Lernkern-Audit | **52/52** ([Log](2026-10-20-claude-ls03/lernkern.log)); ChatGPTs 51/52 (bekannter 1-Pixel-Altbefund K6 bei 320 px) tritt in dieser Umgebung nicht auf |
| Funktionstest samt Build | **269/269** ([Log](2026-10-20-claude-ls03/funktionstest.log)) |
| `pruefe.py --schnell` | keine Fehler ([Log](2026-10-20-claude-ls03/pruefe-schnell.log)) |

**Nicht geprüft:** echte Konten, zwei echte Geräte, Live-Datenbank (nicht berührt).
