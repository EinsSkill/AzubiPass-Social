# Umsetzung und Abnahme

Stand: 20.10.2026. Technischer Planungsstand `cd4d6cf37164260ddc32584a7820df1f1e1c352c`. Die nachfolgenden konkreten Vorschläge sind umzusetzen oder mit einer fachlich gleichwertigen, dokumentierten Lösung zu ersetzen. Unterschiede zum aktuellen Code zuerst prüfen.

## 1. Zielverhalten

- Dieselbe installierbare App mit den bestehenden Bereichen Heute, Lernen, Üben und Ich sowie der vorhandenen Suche.
- Ein gut erreichbarer Auswahlknopf für den Ausbildungsgang im Lernen-Bereich; dieselbe Einstellung auch unter Ich. Keine zusätzliche Hauptnavigation nur für den zweiten Beruf.
- Bestehende Nutzer starten nach dem Update weiter im Büromanagement. Die Auswahl wird lokal gespeichert. Kein verpflichtender Einrichtungsdialog blockiert den bisherigen Einstieg.
- Wechseln zeigt die passenden Lernfelder, Fortschritte, Wiederholungen, Übungen, Suche und Prüfungspfade. Der Titel macht den aktiven Beruf verständlich.
- Aktive Filter werden beim Berufswechsel nachvollziehbar auf einen gültigen Zustand gesetzt. Es erscheinen keine fremden Kapitel oder leeren Auswahllisten durch veraltete Filterwerte.
- Keine neue Lernkontoanmeldung, Cloud-Synchronisierung, Bezahlschranke oder kommerzielle Preisänderung. Die aktuelle README beschreibt Lernen ohne Konto und nichtkommerziellen Betrieb; frühere Geschäftsideen sind keine Implementierungsvorgabe.
- Die Community-Zugänge und Sperren bleiben funktional unverändert. Insbesondere keine gemeinsame Berufsauswahl als angeblich serverseitige Berechtigung behandeln.

## 2. Kennungen, Dateien und Registry

### Eindeutige Kennungen

Vorgeschlagene Berufskennungen: `bueromanagement-2025` und `industriekaufleute-2024`. Das sind neue Metadaten, keine Umbenennung alter Lernstandsschlüssel.

Alte Lernfelder wie `lf1`, `lf10` und `buchfuehrung` behalten Kennungen und Seitenadressen. Neue Lernfelder erhalten IDs `ik2024-lf01` bis `ik2024-lf13`. Neue Kapitel verwenden konsistent `k01`, `k02` usw.; ihre volle Kennung enthält immer das Lernfeld. Neue Karten, Fragen, Antwortoptionen, Aufgabenvarianten und Vokabeln erhalten ebenfalls kollisionsfreie stabile Kennungen.

### Physische Ablage im vorhandenen Quellenordner

| Inhalt | Vorgeschlagenes Muster |
|---|---|
| Berufsregistry | `quellen/ausbildungsgaenge.json` |
| Neues Lernfeld | `quellen/ik2024-lf01.lernfeld.json` |
| Neues Kapitel | `quellen/ik2024-lf01-k01.kapitel.json` |
| Kapitelaufgaben | `quellen/ik2024-lf01-k01.aufgaben.json` |
| Berufsbezogene gemeinsame Begriffe/Paragraphen | `quellen/ik2024-gemeinsam.json` |
| Ergänzende Produktionsdaten | `quellen/ik2024-produktionsfaelle.json` |
| Berufsbezogene Vokabeln | `quellen/ik2024-vokabeln.json` |
| Prüfungsvorlagen | `quellen/ik2024-pruefungen.json` oder gleichwertige bestehende Vorlagenstruktur |
| Gebaute Lernfeldseite | `docs/ik2024-lf01.html` durch Build erzeugt |

Die flache Ablage passt zum heutigen `glob('*.lernfeld.json')` und `glob('*.aufgaben.json')`. Bei sinnvoller anderer Ablage muss Claude alle Finder und Aufgabensammler anpassen und auf vollständige Erfassung testen. Nie neue Dateien in Unterordnern anlegen und voraussetzen, dass der bestehende nichtrekursive Finder sie automatisch erkennt.

### Registry-Inhalt

Je Ausbildungsgang: Kennung, Anzeigename, Ausbildungsordnungsjahr, KMK-Quelle, Lernfeldliste in richtiger Reihenfolge, Lehrjahr je Feld, amtliche Lernfeldnummer, gemeinsame Quellen und Prüfungspfade. Die bestehende Zuordnung von `buchfuehrung` zu Büromanagement-LF 6 explizit erhalten. Neues Industriekaufleute-LF 5 ist Buchführung; neues LF 6 ist Produktion.

Sortierung und Kurzformen aus diesen Metadaten ableiten. Die heutigen Funktionen `lernfeld_dateien()` und `lernfeld_aliases()` können die neue Reihenfolge nicht zuverlässig aus allen Ziffern eines Namens beziehungsweise nur `lf(\d+)` ableiten. Weder „202401“ als Lernfeldnummer anzeigen noch neue Produktion als Buchführungsalias ausgeben.

### Gemeinsame Daten

`lade()` kombiniert heute `gemeinsam.json` mit lernfeldeigenen Definitionen. Für neue Industriekaufleute-Inhalte eine ausdrücklich berufsbezogene geprüfte Auswahl laden. Rechtsgrundlagen für Büromanagement 2025 nicht stillschweigend auf Industriekaufleute 2024 vererben. Berufsabhängige Begriffs-/Paragraphenkennungen namespace-sicher halten. Tatsächlich identische Grundbegriffe dürfen gemeinsam gepflegt werden, wenn Quelle und Bedeutung übereinstimmen.

Die bestehende MAKEL-Identität bleibt gemeinsam. Neue Produktionsdaten werden ergänzt oder über eine klar referenzierte Fallquelle eingebunden, ohne bestehende global verwendete Aufgabenwerte zu verändern. Daten dürfen nicht je Kapitel unabhängig voneinander auseinanderlaufen.

## 3. Lernstand und Migration

Der vorhandene Speicher heißt `azubipass:konto`; laufende Probeklausuren verwenden `azubipass:probeklausur:v1`. Die gegenwärtige Dokumentation beschreibt Kontofassung 3. Tatsächliche Fassung und Normalisierung im aktuellen `kern.js` vor Änderung nochmals kontrollieren.

### Zu erhaltendes Verhalten

- Alte Kapitel-, Karten-, Quiz-, Vokabel- und Lesezeichendaten bleiben unter den bisherigen stabilen IDs erhalten.
- Neue IDs kollidieren nicht mit alten. Es gibt keine automatische Übertragung eines Büromanagement-Lernfeldfortschritts auf ein neues Industriekaufleute-Lernfeld.
- Eine alte Sicherung wird weiterhin gelesen und mit dem lokalen Stand zusammengeführt. Zeitstempelregeln dürfen neueren lokalen Fortschritt nicht durch eine ältere Sicherung ersetzen.
- Farbmodus bleibt eine globale persönliche Einstellung. Kapitel- und Prüfungsempfehlungen beziehen sich auf den gewählten Beruf.

### Vorgeschlagene Erweiterung auf Kontofassung 4

Zusätzlich speichern: aktiver Beruf, pro Beruf zuletzt gelesenes Kapitel, eigener Prüfungstermin und nötige berufsbezogene Aktivitätsdaten. Die bestehenden Sammlungen für Fortschritt und Karten können wegen eindeutiger IDs gemeinsam bleiben; Filter und Zählung brauchen aber zuverlässige Berufszuordnung.

Die bisherigen Top-Level-Felder `zuletzt` und `pruefungstermin` bei der Migration als **Büromanagement-Daten** sichern. Neue Industriekaufleute-Daten nicht in diese alten Werte hineininterpretieren. Zentrale Lese-/Schreibfunktionen statt unterschiedlicher Ad-hoc-Zugriffe in einzelnen Ansichten verwenden. Normalisierung, Export, Import und Zusammenführung müssen die neuen Felder kennen, damit sie nicht unbemerkt verworfen werden.

Die historische globale Aktivitätsliste erhalten. Wenn eine berufsspezifische Statistik angeboten wird, alte historische Tage nur dem bekannten alten Beruf zuordnen; keine genaue Kapitelaktivität erfinden. Neue Aktivitäten mit Beruf erfassen oder eine sachlich gleichwertige Ergänzung verwenden. Berufsübergreifende Statistiken eindeutig als solche beschriften.

### Laufende Klausuren

Eine begonnene Büromanagement-Klausur darf beim Berufswechsel nicht verschwinden oder zu einem Industriekaufleute-Bogen werden. Für den neuen Beruf einen eigenen Lauf-Speicher, etwa `azubipass:probeklausur:industriekaufleute-2024:v1`, oder ein nachweisbar kompatibles Mehrberufsformat nutzen. Der alte Schlüssel bleibt lesbar. Ergebnisse tragen eine Berufskennung; alte Ergebnisse ohne Kennung gehören zum alten Beruf.

Eine fremde laufende Klausur darf nicht allein wegen einer Berufsumschaltung abgegeben, gelöscht oder neu erzeugt werden. Export enthält gemäß bestehendem Verhalten Ergebniszusammenfassungen; wenn laufende Antworten bisher nicht mitexportiert werden, dieses Verhalten klar beibehalten und nicht als Sicherung laufender Bögen versprechen. Globale Rücksetzung muss alle zugehörigen Klausurspeicher erfassen und den Umfang verständlich anzeigen.

### Direkte Links und mehrere Tabs

- Alte Links zu Büromanagement funktionieren unverändert. Neue Seiten lassen den Berufsbezug aus Kennung/Metadaten erkennen.
- Lernaktionen werden dem tatsächlich geöffneten Kapitel zugeordnet, nicht allein einem inzwischen in einem anderen Tab umgeschalteten aktiven Beruf.
- Ein Berufswähler darf keinen fremden Prüfungstermin, fremde zuletzt-gelesen-Daten oder fremde offene Antworten überschreiben.
- Zurück/Vorwärts und direkte URLs stellen einen gültigen Kontext her; keine stille falsche Kapitelzuordnung.

## 4. Build und Oberfläche

- `build.py`, `build_app.py` und die gemeinsamen Loader verwenden dieselbe Registry. Inhalte, Suche, Quiz, Karteikarten, Aufgaben und Prüfungspfade stimmen in ihrer Berufszuordnung überein.
- `landing.config.json` enthält heute einen globalen Büromanagement-Prüfungstermin. Diesen nicht als neuen Industriekaufleute-Termin übernehmen. Ohne geprüften oder persönlich gesetzten Termin eine sachliche leere Anzeige verwenden, keinen geratenen Countdown.
- Heute zeigt Empfehlungen, Fälligkeiten und Gesamtfortschritt des aktiven Berufs. Globale Zahlen sind nur mit entsprechender Beschriftung zulässig.
- Suche standardmäßig im aktiven Beruf. Ein optionaler Gesamtfilter ist keine Pflicht dieses Auftrags.
- Lernen bietet die bestehende Darstellung nach Lehrjahr und Lernfeld; Kurz-/Langfassung teilen Lernziele, Aufgaben und Lernstand.
- Üben filtert Karten, Quiz, Vokabeln und Probeklausuren. Bestehende gemeinsame Grundlagen nur sichtbar einbeziehen, wenn deren Zuordnung ausdrücklich vorgesehen ist.
- Fehlende Inhalte nicht als fertig anbieten. Abschlusszustand erfordert alle 85 Kapitel; Zwischenschritte bleiben als Arbeitsstand erkennbar.
- `docs/` ausschließlich bauen. Vorhandene Markenassets aus `doku/marke/` verwenden; kein neues Logo oder Farbkonzept.

## 5. Offline und Leistung

Der aktuelle Service Worker sammelt gebaute HTML- und Mitteldateien mit Inhaltsversionen. Neue Berufsseiten und benötigte Dateien müssen vollständig im vorgesehenen Offline-Bestand liegen. Die tatsächliche Größe nach Ausbau messen und dokumentieren.

Mindestziel: Beide vollständig erzeugten Ausbildungsgänge sind nach erfolgreichem Offline-Download ohne Netz les- und übbar. Erst nach erfolgreicher Cache-Erneuerung Vollständigkeit melden. Ein fehlgeschlagener Updateversuch darf einen zuvor funktionierenden Cache nicht unbrauchbar machen.

Falls die vorhandene Cache-Strategie bei gemessener Größe nicht tragfähig ist, berufsweise Offline-Pakete einsetzen: verständlicher Downloadstatus, atomarer Austausch und weiterhin funktionierender Altbestand. Das ist eine technische Umsetzungsmöglichkeit, keine Aufforderung zu einem neuen allgemeinen Downloadprodukt. Keine Behauptung „offline bereit“, solange noch Pflichtdateien fehlen.

Suche und große Inhaltsindizes bei Bedarf pro Beruf aufteilen, aber Auswahl und Offline-Auflösung zuverlässig testen. Keine unnötigen externen Schrift-, Analyse- oder KI-Dienste ergänzen.

## 6. Quellen- und Inhaltsabnahme

Claude führt eine Datei `doku/industriekaufleute/kompetenzmatrix.md` mit folgenden Spalten: Lernfeld, Kompetenzpassage/gedruckte Lehrplanseite, Kapitel/Abschnitt, Übung oder anderer Nachweis, Quelle, Prüfstand und begründete Ergänzungen.

Für rechtliche Aussagen genaue Primärquellen verwenden. Einstiegspunkte: BBiG, JArbSchG, BetrVG, BGB, HGB, UStG und die im jeweiligen Personal-/Wirtschaftsfall tatsächlich einschlägigen Normen; für Geldpolitik offizielle EZB-Dokumentation. Die Gesetzesliste ersetzt keinen konkreten Quellenbeleg. Eine unerreichbare Quelle nicht als gelesen ausweisen; geeignete amtliche Alternative suchen.

Jahresabhängige Werte in einer geprüften Parameterquelle mit Stand halten, soweit das System dies sinnvoll unterstützt. Keine globalen Fantasiewerte für Lohnsteuer oder Sozialversicherung. Für zeitlose Rechenübungen vollständig vorgegebene fiktive Daten zulässig; deren Status muss direkt erkennbar sein.

Fachlich prüfen: Rechenweg, Einheit, Netto/Brutto, Prozentbasis, Zeitbezug, Kontenzuordnung, Rundung, Modellgrenzen, rechtliche Voraussetzungen, behauptete Kausalität und Leistungsniveau. Varianten müssen dieselben Kontrollen bestehen.

## 7. Arbeitspakete mit Abnahmekriterien

| Paket | Ergebnis | Abnahme |
|---|---|---|
| A · Ausgangslage | Aktuellen Branch, Fremdarbeit, Build, Speicher und Format geprüft | Dokumentierter Basiscommit und unveränderter Altbestand vor Beginn |
| B · Architektur | Registry, eindeutige IDs, Berufswahl und Migration | Beide Berufe getrennt sichtbar; alte Daten und Direktlinks bleiben gültig |
| C · Referenzen | Ein bekanntes Thema und ein neues Produktionskapitel vollständig | Qualität am tatsächlichen Büromanagement-Niveau, echte Langfassung und passende Aufgaben |
| D · AP1-Inhalte | LF 1–7, 44 Kapitel vollständig | Quellen, Übungen, Lernhilfen und fachliche Rechnungen geprüft |
| E · Weitere Inhalte | LF 8–13, 41 Kapitel vollständig | Gleiche Qualitätsanforderungen, sinnvolle Vorwissensbezüge |
| F · Englisch und Prüfungen | 80 neue Vokabeln, AP1/AP2/WiSo und Fachaufgabenleitfaden | Richtige Dauer/Abgrenzung; neun reproduzierbare Beispielbögen und nachvollziehbare Auswertung |
| G · Gesamtprüfung | Build, Regression, fachliche und visuelle Prüfung | Belege mit Befehlen, Ergebnissen und verbliebenen Mängeln; kein automatisches Deployment |

Wesentliche Etappen in separaten Commits festhalten. Anschließend weiterarbeiten, solange der Auftrag klar und keine reale externe Abhängigkeit ungelöst ist.

## 8. Konkrete Prüffälle

### Bestehende Prüfungen

Die im aktuellen README beschriebenen Build-/Prüfbefehle ausführen, soweit der geänderte Umfang sie betrifft. Zum gelesenen Stand: `python schriften.py`, `python build.py`, `python build_app.py`, `python build_landing.py`, `python pruefe.py`, `python funktionstest.py` und `python lernkern_audit_test.py` im passenden Arbeitsverzeichnis. Eine veränderte README kann neue Anforderungen enthalten.

Bestehende Community-Mocks nur bei betroffenen gemeinsamen Routinen oder tatsächlicher Regressionsgefahr gezielt einsetzen. Keine produktiven Testkonten oder Datenbankänderungen allein für einen lokalen Lernbereich erfinden. Bekannte Altbefunde separat von neuen Fehlern dokumentieren.

### Neue sinnvolle Regressionen

1. Altes Konto der Fassung 3 mit gesetzten Kapiteln, Karten, Vokabeln, Lesezeichen, zuletzt, Prüfungstermin und Ergebnissen laden; alle zugehörigen Werte nach Migration erhalten.
2. Industriekaufleute auswählen, ein Kapitel abschließen, Karte bewerten und eigenen Termin setzen; Büromanagement-Daten bleiben unverändert.
3. In beiden Berufen ein ähnlich benanntes LF 1/K1 bearbeiten; keine Kollision.
4. Zwischen Berufen mit laufender Klausur wechseln; Antworten und Timer bleiben korrekt zugeordnet.
5. Alte Sicherung in einen neueren gemischten Kontostand importieren; keine neueren Daten verlieren, neue Sammlungen nicht löschen.
6. Neue Sicherung exportieren und in einen leeren Speicher importieren; beide Berufsstände und Ergebniszuordnung erhalten.
7. Heute, Lernen, Üben, Vokabeln, Suche und Prüfungspfad bei Berufswechsel auf passende Inhalte prüfen; fällige Karten des anderen Berufs erscheinen nicht versehentlich.
8. Alte und neue Direktlinks, Zurück/Vorwärts und mehrere Tabs prüfen; Schreiben erfolgt für den tatsächlich geöffneten Inhalt.
9. Gleiche globale Begriffs-ID mit unterschiedlicher berufsbezogener Definition als Negativprobe verwenden; kein unbeabsichtigtes Überschreiben durch Indexzusammenführung.
10. Neue Dateinamen werden gefunden und in LF-Reihenfolge 1–13 einsortiert; kein Überspringen oder falscher Alias durch Ziffernextraktion.
11. Beide Offline-Bestände nach Download ohne Netz öffnen, suchen und üben; Cache-Update mit fehlender Datei darf bestehenden Stand nicht zerstören.
12. Alle 85 Kapitel vollständig, alle Aufgaben referenziert, keine Rohplatzhalter oder fehlerhaften Definitionen. Nicht nur die Gesamtzahl prüfen: erwartete Kennungen und Berufszuordnung vergleichen.
13. Mindestens drei feste Varianten je Prüfungsart auf Dauer, Punkte, Lösung, Grenzfälle und Wiederaufnahme prüfen.
14. Globales Zurücksetzen entfernt tatsächlich die dazugehörigen Daten beider Berufe und laufenden Klausuren; Beschriftung erklärt den Umfang.

### Visuelle Prüfung

Mobil ab 320/360 Pixel Breite und Desktop prüfen: lange Berufsnamen, Auswahlknopf, Tabellen, Konten, Formeln, Kapitel mit Kurz-/Langfassung, Status und Prüfungsauswertung. Tastaturbedienung, sichtbarer Fokus, verständliche Labels und Kontrast erhalten. Bei fachlichen Grafiken Beschriftung und Einheiten prüfen, nicht nur ein Screenshot ohne offensichtlichen Überlauf.

## 9. Fertigmeldung

Bericht nennt tatsächlich gebaute Lernfelder/Kapitel, Aufgaben, Karten, Vokabeln, Prüfungsvarianten und Offline-Dateien. Ziele und erreichte Werte getrennt ausweisen. Testresultate mit geprüftem Commit verbinden. Verbliebene Fehler samt reproduzierbarem Fall nennen.

Keinen Erfolg behaupten, der nur aus Dateinamen, Überschriften oder einem Syntaxcheck abgeleitet ist. Dieses Planungspaket liefert Struktur und Aufgabenentwürfe, keine bereits fachlich abgenommenen Lerntexte.
