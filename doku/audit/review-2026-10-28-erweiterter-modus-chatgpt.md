# Gegenprüfung · Erweiterter Modus · 28.10.2026

**Vorgänger:** Claude, Umsetzung `f041834`, Übergabe `22c84b8`. **Rolle:** fachliche Prüfung der drei Piloten und gezielte technische Gegenprüfung. **Geprüfte Anwendung:** `f041834` auf `erweiterter-modus-2026-10-28`, Basis `d0cfb8a`. Ausgecheckt war `22c84b8` (nachfolgende Übergabedokumentation). Der folgende Reviewcommit ist nicht der geprüfte Anwendungscommit.

## Ergebnis

**Die drei Pilottexte sind im dargestellten Grundumfang fachlich tragfähig und entsprechen dem vereinbarten Modell.** Keine neue komplette Textüberarbeitung notwendig. Rechenweg, Begründung, Gegenfälle und verborgene Antworten sind sinnvoll umgesetzt. Die Abweichungen „Rechenweg/Fallvergleich als Tabelle“ und „Pareto als zusätzliches Detail erhalten“ sind sachgerecht.

Eine begrenzte technische Nachbesserung **E01 (mittel)** wird vor Abschluss empfohlen: Unbekannte Formatkennzeichnung darf nicht still in den Altformatrenderer gelangen. **E02 (niedrig)** ist eine bewusste, aber bislang nicht als solche ausgewiesene Abweichung bei Direktlinks: Ansicht und Detail werden aus der URL entfernt. Für reproduzierbare Such-/Teillinks sollte die Adresse erhalten bleiben.

Keine Änderung an Anwendung, Datenbank oder `main`; keine Merge-/Live-Freigabe. Nach enger Korrektur von E01 und Entscheidung/Anpassung E02 kann Lukes den Merge entscheiden; kein neuer allgemeiner 160-Kapitel-Audit erforderlich.

## Fachliche Prüfung der Piloten

| Pilot | Eigene Prüfung | Ergebnis |
|---|---|---|
| A · LF4 K3 b1 | 1.000 € × 90 % = 900 €; 2 % davon 18 €; 882 € + 40 € = 922 €. Vergleich 930 €, Differenz 8 €, Stückpreise 9,22/9,30 €. Ohne Skonto 940 €, B 10 € günstiger. Falsche Addition 12 % ergibt 920 €. | Korrekt. Nettobasis, voller Vorsteuerabzug, vergleichbare Leistung und nicht skontierbare Fracht sind ausdrücklich vorgegeben. Die Entscheidung wird auf den Grundfall begrenzt. |
| B · LF3 K2 b2 | Verbindlicher Antrag, rechtzeitig/unverändert angenommener Grundfall; abweichende Menge 120 statt 100 als Ablehnung plus neuer Antrag; Anfrage, Frist und Schweigen abgegrenzt. | Korrekt für die genannten Voraussetzungen. § 150 Abs. 2 und Abs. 1 BGB passen; keine allgemeine Gleichsetzung jeder Anfrage mit einem Antrag. |
| C · LF2 K2 b2 | Wichtigkeit/Dringlichkeit mit konkreten Folgen und Fristen, Vorbereitung der Präsentation, begrenzte Delegationsbefugnis, veränderlicher Tonerfall, Überlastung und ALPEN. | Korrekt als Organisationsmodell. Kein unbedingtes „Toner ist unwichtig“, keine erfundene Weisungsbefugnis. Pareto ausdrücklich nur Denkhilfe. |

Pilot B: [§ 145 BGB](https://www.gesetze-im-internet.de/bgb/__145.html) und [§ 150 BGB](https://www.gesetze-im-internet.de/bgb/__150.html) am 28.10.2026 direkt gelesen. [§ 362 HGB](https://www.gesetze-im-internet.de/hgb/__362.html) ebenfalls gelesen: Eine laufende Geschäftsverbindung allein ist keine allgemeine Schweigen-ist-Annahme-Regel. Der Pilot warnt nur vor Sonderkonstellationen und ordnet keine pauschale Rechtsfolge an; daher kein eigener Fachfehler. Bei späterem Ausbau die besonderen Voraussetzungen ausdrücklich erklären.

Der Verweis der Kalkulationsleiter auf andere Startwerte wird im Text transparent erklärt. Dieselbe bestehende Grafik wird verwendet. Die Ziele `k3-b3`, `lf9:k1`, `k4`, `k2-b1`, `k2-b3`, `lf13:k2` sind im Quellbestand vorhanden und werden vom Validator aufgelöst.

## E01 · mittel · Fehlerhaftes Format wird als Alttext gerendert

**Fundstelle:** `quellen/vertiefung.py`, `ist_vollfassung` und `pruefe`, insbesondere die Auswahl von `eintraege` vor der Strukturprüfung; anschließend `quellen/build.py`, `_ausfuehrlich_karte` und `detail_zusatz`.

**Reproduktion mit Originalfunktionen:** In jeweils einem der drei vorhandenen Format-2-Piloten ausschließlich `darstellung: "vollfassung"` zu `darstellung: "vollfasung"` ändern. `vertiefung.pruefe()` gibt ohne Fehler `{}` zurück. Die neuen Strukturen werden als Legacy-Eintrag behandelt. Haupttext und optionale Details fehlen; `verstaendnisfragen` wird vom alten `_langwerte()` zu einer Python-Objektdarstellung wie `{'id': 'c1', 'frage': …, 'antwort': …}` gemacht. Die zunächst verborgenen Antworten erscheinen dabei als Teil des Datenobjekts. Grundtext bleibt erhalten; es handelt sich nicht um Verlust des gesamten Kapitels, aber um einen stillen Defekt der Vertiefung.

**Warum relevant:** Der Formatvertrag soll bei ungültigen neuen Einträgen den Build mit Fundstelle abbrechen. Vor der geplanten größeren Redaktion ist gerade diese Abgrenzung nötig. Die vorhandenen A24-Fälle prüfen fehlende Formatnummer bei korrekt geschriebener Darstellung, aber nicht die unbekannte Darstellung selbst.

**Korrektur:** Eingabestruktur und vorhandene Format-/Darstellungskennzeichen vor dem Wegfiltern prüfen. Unbekannte ausdrückliche `darstellung`-Werte ablehnen. Legacy-Einträge ohne Darstellungskennzeichen bleiben in gemischten Kapiteln erlaubt. Ein ungültiger neuer Eintrag darf nicht als alter Texttyp interpretiert werden. Kein globales Verbot von Legacy-Inhalten oder automatisches Umschreiben des Altbestands.

**Enge Abnahme:** Für alle drei Pilotmutationen Buildfehler mit Datei und Abschnitt; gültiger Format-2-Pilot und echtes gemischtes Kapitel weiterhin gültig; kein Objekttext im erzeugten Lerninhalt. Bestehende A24-Fälle beibehalten.

## E02 · niedrig · Suchlink verliert Ansicht und Detail in der Adresse

**Fundstelle:** `quellen/azubipass.js`, `tiefeAnwenden`, Aufruf `history.replaceState(null, "", location.pathname + location.hash)`. Im Test `erweiterter_modus_test.py` wird die Entfernung ausdrücklich erwartet.

**Reproduktion:** Ein Link `lf4.html?ansicht=ausfuehrlich&detail=a-ohne-skonto#k3-b1` öffnet zunächst korrekt den Gegenfall. Die Originalfunktion ersetzt die Adresse dann durch `lf4.html#k3-b1`. Neuladen oder Kopieren der jetzt angezeigten Adresse führt nicht mehr zur verlangten Detailansicht. Zusätzlich werden bei diesem Vorgang etwaige andere Suchparameter entfernt.

**Einordnung:** Kein Fehler der fachlichen Inhalte und kein Grund für eine große Neuarchitektur. Die gewählte Implementierung macht einen einmaligen Suchauftrag daraus. Unsere Spezifikation unterscheidet reguläres Neuladen (kompakt) vom ausdrücklich angeforderten Such-/Direktlink (passende Ebene offen); deshalb ist dies eine Produktabweichung und kein vollständig erfüllter ursprünglicher A18-Fall.

**Empfehlung:** Explizite Ansichts-/Detailparameter erhalten; sie sind dann selbst der reproduzierbare Zustand für Suchlinks, ohne dass neue Lernstandsdaten gespeichert werden. Normaler Aufruf ohne diese Parameter bleibt nach Reload kompakt. Beim bewussten anschließenden Ansichtswechsel kann die URL konsistent aktualisiert werden. Unbeteiligte Parameter nicht pauschal löschen.

**Enge Abnahme:** Normaler Kapitelaufruf ohne Parameter → Reload kompakt; expliziter Detail-Link → initial, nach Reload und beim erneuten Öffnen der kopierten Adresse derselbe sichtbare Detailbereich; unbekannte Detailkennung bleibt harmlos. Falls Lukes bewusst nur einmalige Suchaufträge wünscht, diese Abweichung dokumentieren; nicht gleichzeitig stabile Detail-URLs versprechen.

## Eigene Belege und Grenzen

- [Ausführbares Reviewskript](belege/2026-10-28-erweiterter-modus-review.py) und [Ausgabe](belege/2026-10-28-erweiterter-modus-review.json).
- Die vorhandenen Funktionen `statisch()` und `vertrag()` aus `erweiterter_modus_test.py` erneut ausgeführt; nur der hier nicht verfügbare Playwright-Import wurde für diesen statischen Lauf ausgelassen. Kein Nachbau der Assertions als eigene unabhängige Browserabnahme. Ergebnis: keine Fehler in diesen beiden Testteilen.
- Statische Belege: 160 Kapitel mit passenden Schaltern, keine doppelten IDs der Pilotseiten, alte Check-/Karten-/Zuordnungs-/Antwortkennungen unverändert, 22 Suchziele im HTML vorhanden, sechs Musterantworten nicht als eigene Antworttexte indexiert.
- E01 mit echten Original-Pythonfunktionen an allen drei Piloten reproduziert. E02 mit der unveränderten Originalfunktion in einer Node-VM und minimalen DOM-/History-Stubs reproduziert; **kein realer Browsertest** dieses Falls.
- Pilot-A-Zahlen unabhängig mit `Decimal` nachgerechnet. Ein Vorkommen von „922“ im HTML allein wäre dafür kein mathematischer Beleg.
- `python quellen/industriekaufleute_test.py`: **8.271 bestanden, 0 Fehler, 285 Aufgaben**. Keine neue Gesamtprüfung der unveränderten IK-Fachtexte.
- Playwrights Node-Paket ist vorhanden, Chromium fehlt. Downloadversuch des Headless-Browsers lieferte eine ungültige/leere ZIP-Datei und scheiterte. Deshalb keine eigene Wiederholung von Browser, axe, visueller Prüfung oder 269 Browserfällen; Claudes entsprechende Ergebnisse bleiben seine Belege.
- A23 im vorhandenen Test blockiert Service Worker und zählt Anfragen beim Aufklappen. Das belegt lokale Inhaltsverfügbarkeit ohne Nachladen, aber keine vollständige echte PWA-Offline-/Service-Worker-Abnahme. Diese Grenze im Umsetzungsbericht präzisieren, keinen bestandenen Offline-Lauf erfinden.
- Fehlende Begleitdateien im Remote-Branch sind bekannt. Tabellen statt eigener Rechenweg-/Fallvergleichstypen erfüllen den Sinn der Spec; deshalb kein Befund nur wegen abweichender JSON-Feldnamen. Das lokale Vorbereitungspaket bleibt ergänzende Referenz.

## Rückgabe an Claude / Lukes

Claude sichert E01 mit einem begrenzten Negativfall ab und übernimmt nach Möglichkeit die kleine Linkkorrektur E02. Nur die betroffenen Fälle plus notwendige Regression prüfen; keine erneute Neuredaktion der Pilottexte und kein beliebiges Ausweiten auf alle Kapitel. Danach entscheidet Lukes über den Merge. Diese Dokumentation erteilt keine Mergefreigabe und verändert keine Fachinhalte.
