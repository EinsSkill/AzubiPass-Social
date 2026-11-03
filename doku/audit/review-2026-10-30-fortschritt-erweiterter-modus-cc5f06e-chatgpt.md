# Fortschrittsprüfung · Erweiterter Modus · 30.10.2026

**Nutzerauftrag:** „claude ist wieder am nutzerlimit, schau was er nun wieder geschafft hat“. **Rolle:** Zwischenprüfung. **Fester geprüfter Anwendungsstand:** `cc5f06e` auf `erweiterter-modus-2026-10-28`. Vergleich zur letzten Prüfung `bab38a7`. Kein vollständiger Fach-/Browserreview; keine Mergefreigabe. `origin/main` liegt weiterhin auf `d0cfb8a`.

## Ergebnis und Fortschritt

Claude hat seit der letzten Prüfung **57 weitere Kapitel** vollständig umgestellt. Jetzt stehen **99 von 161 Kapiteln** und **354 von 602 Abschnitten** als Format-2-Vollfassung bereit. Zuvor waren es 42 Kapitel und 148 von damals 585 Abschnitten. Die Gesamtzahl der Abschnitte ist durch weitere Hauptinhalte um 17 gewachsen. Kapitelzählung bedeutet vollständige Formatabdeckung, nicht abschließende fachliche Freigabe.

| Bereich | Kapitel vollständig | Abschnitte als Vollfassung |
|---|---:|---:|
| Büromanagement insgesamt | 76/76 | 262/262 |
| IK LF5 · Buchführung | 8/8 | 32/32 |
| IK LF6 · Produktion | 7/7 | 28/28 |
| IK LF8 · Kostenrechnung | 8/8 | 32/32 |
| Übrige IK-Lernfelder | 0/62 | 0/248 |
| Gesamt | 99/161 | 354/602 |

Damit sind 16 von 26 Lernfeldern vollständig im neuen Format. Für die Umstellung fehlen noch IK LF1/2/3/4/7/9/10/11/12/13: 62 Kapitel mit aktuell 248 Abschnitten. Die alten Langfassungen dort sind weiterhin vorhanden.

## Was seit bab38a7 hinzugekommen ist

- **KfB LF2:** Gesundheit/Belastungen, Raumkonzepte und mobiles Arbeiten, Selbstmanagement, konkrete Protokolle, Post-/Versandorganisation; bisherige Inhalte sämtlicher Kapitel vertieft.
- **KfB LF3:** Auftragskontrolle, Dreisatz/Prozentrechnung, Angebotsarten, Corporate Design und englischer Kundenbrief.
- **KfB LF5:** vollständiger Werbeplan, Social Media, Werbeerfolg und ethische Grenzen, ausgeführter Serienbrief-Fall.
- **KfB LF7:** kommentierte Gesprächsführung, Beratungs-/Einwandfälle, Konfliktgespräch und GFK; pauschale Aussagen zur Körpersprache präzisiert.
- **KfB LF11:** EPK als neue echte Grafikvariante mit Ereignissen/Funktionen/XOR und Erklärung; KVP und ausgeführte Verfahrensanweisung.
- **KfB LF12:** digitale/hybride Veranstaltungen, nachhaltiger Reisevergleich; neue interaktive Darstellung für Mahlzeitenkürzungen statt zweckentfremdeter Prozessgrafik.
- **KfB LF13:** zusammenhängender Messeprojektfall, ausgeführte Kreativitätstechniken, Methodenwahl sowie Kommunikations-/Qualitäts-/Kapazitätsplan.
- **IK LF5/6/8:** ausführliche Beleg-/Buchungsfälle, Stücklisten und Kapazitätsplanung sowie vollständige KLR-/Deckungsbeitrags-/Investitionsfälle. Unser Materialplanungsmuster ist eingebaut.

Beleg: Commitfolge und `doku/erweiterter-modus/umsetzung/kapitelnotizen.md`, ergänzt durch direkt gelesene Stichproben (Werbeerfolg KfB LF5 K6 f4, EPK LF11 K2 b4, Stückliste IK LF6 K3 a1, mehrstufige Deckungsbeitragsrechnung IK LF8 K6 a2). Keine pauschale Behauptung, alle Rechts-/Jahreswertänderungen seien unabhängig bestätigt.

## Eigene Prüfungen

1. Sämtliche registrierten Kapitel geladen und Abschnittsmenge gezählt. **Alle 354 Vollfassungen bestehen den aktuellen Originalvalidator**, einschließlich Referenzauflösung und Platzierung bestehender Basiselemente.
2. Suchziele direkt mit dem aktuellen Originalgenerator `build_app.suche_sammeln` aus allen Quellen erzeugt und mit dem gepushten `docs/mittel/suche.json` verglichen: **1.508 Sollziele = 1.508 vorhandene Ziele, keine Differenzen.** Der vorige Befund P01 ist damit im geprüften Snapshot geschlossen.
3. Originale Funktionen `statisch()` und `vertrag()` aus `erweiterter_modus_test.py` ohne Browser ausgeführt; nur der Playwright-Import für diesen Lauf ausgelassen. **107 OK, eine fehlgeschlagene Assertion**, siehe unten. A26 stimmt nun über alle Seiten; Legacy-Kompatibilität wird mit fester Fixture geprüft statt übersprungen. Der vorige allgemeine Testumfangsfehler P02 wurde somit bearbeitet.
4. `python quellen/industriekaufleute_test.py`: **7.879 bestanden, 460 fehlgeschlagene Prüfungen**. Alle 460 ausschließlich auf das veraltete Textschema zurückgeführt: je 92-mal fehlende Alt-Felder `erklaerung`, `fallbeispiel`, `typische_fehler`, `merksatz` und mindestens zwei Einträge in `beispiele`. Die 92 betroffenen Abschnitte sind exakt die neu umgestellten IK LF5/6/8. Keine Gleichsetzung mit 460 fachlichen Fehlern; die Suite ist im aktuellen Stand dennoch nicht grün.

Keine eigene neue Browser-/axe-/Service-Worker-Offlineprobe; Claudes im Kapitelprotokoll genannter früherer Lauf „164 OK, 0 FEHL“ betrifft einen vorherigen Zwischenstand und wird nicht als heutiges eigenes Ergebnis übernommen.

## Noch zu erledigende Testwartung

### T01 · IK-Test muss beide Textformate fachgerecht prüfen

`quellen/industriekaufleute_test.py`, Zeilen 61–70, verlangt weiterhin das alte Acht-Felder-Schema. Bei `darstellung: vollfassung` auf den Format-2-Vertrag prüfen und Lernziel, Erklärung, Beispiel/Anwendung, nachvollziehbare Grenzen sowie Fragen in der neuen Struktur fachlich sinnvoll absichern. Genuine Legacy weiter wie bisher testen. Nicht einfach die 460 Fehler überspringen oder alte Platzhalterfelder in die neuen Kapitel kopieren. Nach Anpassung Suite erneut ausführen und echte Inhalts-/Rechenprüfungen erhalten.

### T02 · gezielte fachliche Antwortänderung in LF7 dokumentieren

Die eine fehlgeschlagene Assertion lautet `lf7.html: alte Antwort-Kennungen erhalten`. Im Check **LF7 K1 a2** wurde die zuvor richtige Antwort „Einen Widerspruch — und er glaubt dem Körper“ zu „Einen Widerspruch zwischen Worten und Auftreten“ berichtigt. Dabei änderte sich die textabhängige Optionskennung von `lf7-k1-a2-c1-oeec2aafb8fee` zu `lf7-k1-a2-c1-occa6d8db336b`.

Der tatsächliche Antwortinhalt wurde fachlich geändert, nicht nur die Ansicht umgeschaltet. Dieser Befund ist daher **kein Nachweis eines generellen Lernstandverlusts durch den erweiterten Modus**. Die pauschale Erhaltungsprüfung muss belegte Fachkorrekturen eng abgrenzen. Gewünschtes Verhalten für alte Antworten festlegen und prüfen: nicht still auf eine inhaltlich geänderte Aussage umdeuten. Andere Kennungen bleiben weiterhin unter der strengen Erhaltungsprüfung; keine globale Ausnahme.

## Nächster Schritt

Wenn Claude weiterarbeiten kann: die zehn übrigen IK-Lernfelder redigieren, T01/T02 gezielt behandeln und nach den verbleibenden Änderungen vollständige Fach-/Technikabnahme durchführen. Aktuelle Hauptabschnitte und Abnahmebelege in die Arbeitslisten aufnehmen. Büromanagement ist **redaktionell/strukturell umgestellt**, aber dadurch noch nicht vollständig unabhängig fachlich freigegeben.

Die gemeinsame Remote-Übergabe enthält noch keinen neuen Gesamtabschluss von Claude; Kapitelnotizen und tatsächliche Commits sind die Fortschrittsbelege. Keine Anwendung geändert, kein Push/Merge/Deployment durch diese Zwischenprüfung. Gesamtabschluss vor Merge gilt weiterhin.
