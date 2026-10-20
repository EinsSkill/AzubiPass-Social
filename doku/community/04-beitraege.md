# 04 · Beiträge – Übersicht und Detail

> Status: SPEC · Version: 1 · Stand: 2026-10-12 · Autor: ChatGPT
>
> Entwurf zur Entscheidung durch Lukes. Grundlage: `00-vorlage.md`, `01-uebersicht.md` Version 3, Entscheidungen vom 12.10., `community.js` und die vorhandenen SQL-Migrationen bei a443607. Keine Implementierungsfreigabe. Keine neuen Datenbankfelder. Die ausdrücklich benannten Anpassungswünsche betreffen Abfrage und Dateizugriff.

## 1. Zweck

Azubis finden Fragen, Lernzettel und Tipps, lesen einen Beitrag mit seinen Antworten und wechseln bei vorhandenem Bezug direkt zum passenden Lernkapitel.

Umfang dieser Spec: C04 Übersicht und C05 Lesedetail. C06 Schreiben, Antworten verfassen, C13 Melden und C14 Moderation erhalten eigene Detail-Specs. Das gesamte Beiträge-Paket geht erst gemeinsam mit nutzbarem Melden und Moderation in die Klassen-Beta. Keine sichtbaren Knöpfe ohne funktionierendes Ziel.

## 2. Einstieg

- Heute → Zur Community und Ich → Community durchlaufen dieselbe Zugangskontrolle aus 02.
- Nach Sitzung und Profil öffnet C04 und ersetzt die derzeitige Zwischenansicht. Das eigene Profil und die Regeln bleiben über „Profil“ erreichbar; Abmelden bleibt dort.
- Ein Beitragslink führt nach der Zugangskontrolle zum aktuell berechtigten C05. Nicht verfügbare Ziele zeigen den neutralen Rückweg ohne fremde Metadaten.
- Vier globale Tabs bleiben erhalten; Ich ist in der Community aktiv. Browser-Zurück führt zur tatsächlichen vorherigen Ansicht.
- Für diese erste Phase enthält C04 ausschließlich Beiträge „Für alle in der Community“, also `gruppe_id = null`. Gruppeninhalte werden erst mit der Gruppen-Spec in einen passenden Kontext eingeführt. Der Backend-Standard „alles Sichtbare“ wird hier nicht verwendet.

## 3. Aufbau von oben nach unten

### C04 · Übersicht

1. Zurück-Navigation, Augenbraue „Ich · Community“, Überschrift „Beiträge“, Kopfaktion „Profil“.
2. Einleitung „Fragen, Lernzettel und Tipps aus der Community.“
3. Zwei beschriftete Filter: „Beitragsart“ (Alle Arten, Lernzettel, Frage, Tipp) und „Lernfeld“ (Alle Lernfelder, tatsächlicher Lernfeldkatalog einschließlich Buchführung). Bei aktiven Filtern erscheint „Filter zurücksetzen“. Keine Suche oder zusätzlichen Filter ohne eigene Entscheidung.
4. Offene Beitragsliste mit feinen Trennlinien. Jede Zeile: Art; vorhandenes Lernfeld/Kapitel; Titel als Link; Anzeigename, gegebenenfalls Mentor:in/Team, Datum; tatsächliche Anzahl Antworten und Hilfreich. Fragen zeigen bei `geloest = true` „Gelöst“. `an_mentoren` wird als „An Mentor:innen“ gekennzeichnet, ohne Antwortversprechen.
5. Reihenfolge: neueste Erstellung zuerst. Auf dem Handy brechen Titel und Metadaten um. Keine Bildergalerie, keine Profilbilder, keine Dateiabrufe bereits in der Übersicht.
6. Bei weiteren Ergebnissen „Weitere Beiträge laden“. Filterwechsel ersetzt die Liste nach neuer Anfrage; Antworten alter Filteranfragen werden verworfen. Beim Rückweg aus C05 Filter, geladene Zeilen und Scrollposition innerhalb desselben Kontos wiederherstellen, nach aktueller Zugangsprüfung.
7. „Beitrag schreiben“ wird erst mit freigegebenem C06 eingeblendet. Vorher kein deaktivierter Ersatzknopf. „Lerngruppen“ wird erst mit dem funktionierenden Gruppenbereich zur lokalen Auswahl ergänzt.
8. Bestehende globale Navigation.

### C05 · Beitragsdetail

1. „Zurück zu Beiträgen“ beziehungsweise später das tatsächlich erlaubte Ursprungsziel. Zugang erneut prüfen.
2. Art, vorhandene Zuordnung, bei Fragen „Gelöst“ und gegebenenfalls „An Mentor:innen“; Beitragstitel als Hauptüberschrift.
3. Anzeigename, vorhandene zugewiesene Rolle und Lehrjahr, Erstellungsdatum; Bearbeitungsdatum nur, wenn tatsächlich vorhanden und sinnvoll verschieden.
4. Vollständiger Beitragstext als Klartext mit erhaltenen Zeilenumbrüchen. Nutzereingaben werden niemals als HTML ausgeführt. Keine externe Linkvorschau und keine automatische Ausführung eingebetteter Inhalte.
5. Bei vorhandener Datei eigener Dateibereich: zugelassenes Bild oder PDF. Bild erhält eine neutrale Beschriftung mit dem Beitragstitel; PDF wird über „PDF öffnen“ geöffnet, ohne unzuverlässige Pflichtvorschau. Kein erfundener Original-Dateiname: das aktuelle Modell enthält nur Pfad und Dateiart. Dateifehler sperrt nicht den restlichen Beitrag. Keine Dateien in den allgemeinen Offline-Cache.
6. „Antworten“ mit tatsächlicher Anzahl. Beste Antwort zuerst, dann weitere sichtbare Antworten zeitlich aufsteigend gemäß vorhandenem Backend. Antworttext, Anzeigename, vorhandene Rolle/Lehrjahr und Datum. `beste = true` kennzeichnet „Beste Antwort“. Noch keine Antwortschreibfunktion aus dieser Spec.
7. Zuordnung: „Kapitel in Lernen öffnen“ nur, wenn das Kapitel im tatsächlich geladenen Katalog existiert. Ist nur das Lernfeld zugeordnet, „Lernfeld in Lernen öffnen“. Fehlende Zuordnung wird weggelassen; veraltete Kennung ist kein toter Link.
8. Weitere Aktionen werden mit ihren jeweils freigegebenen Specs ergänzt: Hilfreich markieren/zurücknehmen, Antworten, beste Antwort wählen, Melden und eigene Inhalte verwalten. In diesem Lesepaket sind Hilfreich und Lösungsstatus reine Anzeigen. Keine irreführenden anklickbaren Platzhalter.

Autor- oder Teamzugriff kann ausgeblendete Datensätze zurückliefern. Die Oberfläche behandelt sie ausdrücklich als „Ausgeblendet“, entfernt sie aus der normalen Übersicht und zeigt keinen gewöhnlichen Datei-/Antwortfluss. Der spätere Moderationskontext ist gesondert zu gestalten. Den Backend-Sichtbarkeitsfilter nicht pauschal mit `not versteckt` verwechseln.

## 4. Aktionen

| Aktion | Wer darf | Was passiert danach |
|---|---|---|
| Beiträge lesen / filtern | Aktuelle Sitzung mit freigeschaltetem Profil | Serverseitig lesbare allgemeine Beiträge; passende leere oder Fehleransicht |
| Weitere Beiträge laden | Dieselbe berechtigte Person | Nächste Seite ohne ausgelassene oder doppelte Datensätze; laufenden Knopf sperren |
| Beitrag öffnen | Profil mit aktuellem Leserecht | C05 mit frisch geprüftem Inhalt und getrennt geladenen Antworten |
| Datei öffnen | Aktuelles Leserecht an Beitrag und Datei | Berechtigter Dateizugriff; Fehler verständlich anzeigen |
| Kapitel/Lernfeld öffnen | Alle | Tatsächlich vorhandenes Lernziel; Community-Konto zum Lernen nicht erforderlich |
| Profil öffnen | Angemeldete Person | Eigenes Profil, Regeln und Abmelden |
| Zurück | Alle | Erlaubtes Ursprungsziel; entzogene Inhalte nicht wieder aus altem Speicher anzeigen |
| Erneut versuchen | Aktuell berechtigte Person | Nur die fehlgeschlagene Leseanfrage erneut ausführen |

Kontowechsel verwirft Beiträge, Antworten, Filterentwürfe, Dateilinks und verspätete Ergebnisse des vorigen Kontos. Kein automatisches erneutes Absenden einer Schreibaktion durch Navigation oder Wiederverbindung.

## 5. Zustände

- **Leer, allgemeine Liste:** „Hier gibt es noch keine Beiträge.“ Wenn C06 vorhanden ist, ergänzen: „Stell eine Frage oder teile einen Lernzettel oder Tipp.“ Dazu „Beitrag schreiben“.
- **Leer, Filter:** „Zu diesen Filtern gibt es keine Beiträge.“ Dazu „Filter zurücksetzen“.
- **Leer, Antworten:** „Noch keine Antworten.“ Die später eingeführte Schreibaktion kommt aus ihrer eigenen Spec.
- **Lädt:** „Beiträge werden geladen …“, „Beitrag wird geladen …“, „Antworten werden geladen …“, „Datei wird geladen …“. Die Teilbereiche warten nicht unnötig aufeinander. Keine erfundenen Zähler.
- **Fehler, Liste:** „Die Beiträge konnten nicht geladen werden. Versuch es erneut.“ Dazu „Erneut versuchen“ und „Zu Lernen“.
- **Fehler, nächste Seite:** „Weitere Beiträge konnten nicht geladen werden.“ Bereits geladene, weiterhin berechtigte Zeilen erhalten; Wiederholung ohne Doppelungen.
- **Fehler, Detail:** „Der Beitrag konnte nicht geladen werden. Versuch es erneut.“ Nicht als nicht vorhanden ausgeben, wenn nur die Anfrage scheiterte.
- **Fehler, Antworten:** „Die Antworten konnten nicht geladen werden.“ Separates „Erneut versuchen“; keine Nullantworten behaupten.
- **Fehler, Datei:** „Die Datei konnte nicht geladen werden.“ Separates „Erneut versuchen“. Abgelaufene Zugriffsmöglichkeit nur nach erneuter Rechteprüfung erneuern.
- **Offline:** „Du bist offline. Für die Community brauchst du Internet. Lernen und Üben kannst du weiter nutzen.“ Keine privaten Feed-/Detaildaten weiter aus einem alten Cache zeigen; Rückweg „Zu Lernen“. Wiederverbindung prüft Sitzung und Leserecht neu.
- **Ohne Profil:** Profilanlage aus 02, keine Beitragsabfragen vorher.
- **Ohne Sitzung:** Anmeldung aus 02; ursprüngliches Ziel ohne Inhaltsdaten merken.
- **Ohne Berechtigung / gelöscht:** „Dieser Inhalt ist für dich nicht verfügbar.“ Dazu „Zur Community“ und „Zu Lernen“. Keine fremden Titel, Autoren, Pfade oder Gründe preisgeben.
- **Ausgeblendet, eigener zulässiger Kontext:** „Dieser Beitrag ist ausgeblendet.“ Noch keine Behauptung zu Gründen oder Bearbeitungsfrist. Datei nicht neu öffnen lassen; Moderation entscheidet im gesonderten Paket.
- **Sitzung abgelaufen / Konto gewechselt:** Alte Daten und Dateidarstellung sofort aus der App entfernen. Nach Login Ziel neu prüfen; niemals alten Cache eines anderen Kontos nutzen.
- **Änderung während Nutzung:** Beim erneuten Öffnen, Rückkehr der Sichtbarkeit, manueller Aktualisierung und jeder relevanten Aktion neu prüfen. Die vorhandene Live-Funktion liefert nur INSERT-Ereignisse; sie belegt keine sofortige Erkennung von Löschung, Ausblendung oder Rechteentzug. Eine entsprechende Erweiterung ist vor zugesagter sofortiger Aktualisierung nötig.

## 6. Texte (wörtlich)

| Stelle | Text |
|---|---|
| Überschrift Übersicht | Beiträge |
| Einleitung | Fragen, Lernzettel und Tipps aus der Community. |
| Profilaktion | Profil |
| Filter | Beitragsart / Lernfeld |
| Standardauswahl | Alle Arten / Alle Lernfelder |
| Filteraktion | Filter zurücksetzen |
| Beitragsarten | Lernzettel / Frage / Tipp |
| Ziel | Für alle in der Community |
| Mentor:innen-Zuordnung | An Mentor:innen |
| Lösung | Gelöst |
| Antwortstatus | Beste Antwort |
| Anzahl | 1 Antwort / {Anzahl} Antworten |
| Reaktionszahl | {Anzahl} hilfreich |
| Dateiaktion PDF | PDF öffnen |
| Dateiaktion Bild | Bild öffnen |
| Lernzielaktion | Kapitel in Lernen öffnen / Lernfeld in Lernen öffnen |
| Weitere Ergebnisse | Weitere Beiträge laden |
| Rückweg Detail | Zurück zu Beiträgen |
| Wiederholen | Erneut versuchen |
| Lernrückweg | Zu Lernen |

Die Dateiaktion darf erst angeboten werden, wenn ein berechtigter Zugriff vorhanden ist. Ein Mentor:innen-Kennzeichen ist eine Teamzuweisung und keine amtliche Bestätigung der fachlichen Richtigkeit.

## 7. Daten

| Bereich | Vorhandene Felder / Quelle |
|---|---|
| Beitrag | `id`, `autor_id`, `gruppe_id`, `art`, `titel`, `text`, `lernfeld`, `kapitel`, `datei_pfad`, `datei_art`, `an_mentoren`, `geloest`, `versteckt`, `erstellt_am`, `bearbeitet_am` |
| Listenmetadaten | `autor_name`, `autor_rolle`, `autor_lehrjahr`, `gruppe_name`, `antworten`, `hilfreich_zahl`, `von_mir_hilfreich` aus `beitrag_liste` |
| Antworten | `id`, `beitrag_id`, `autor_id`, `text`, `beste`, `versteckt`, `erstellt_am`, zugehöriger Profilname/Rolle/Lehrjahr |
| Lernziele | Tatsächlich geladener Katalog der App; keine neuen Lerninhalte erfinden |
| Filter / Rückweg | Nur UI-Zustand derselben aktuellen Kontositzung |

Kein neues Datenbankfeld. Keine Profilbilder, Suchindexfelder, ungelesen-Zähler, Benachrichtigungspräferenzen oder Ranglisten.

**Ausdrücklicher Anpassungswunsch – Seitennavigation:** `beitraege()` sortiert aktuell nur nach `erstellt_am` und verwendet für die nächste Seite `< vor`. Bei gleichen Zeitstempeln an der Seitengrenze können Einträge fehlen. Für „Weitere Beiträge laden“ stabile Sortierung nach `erstellt_am` und vorhandener `id` sowie passender zusammengesetzter Cursor. Das erweitert die Datenschicht-API, nicht das Datenmodell. Vor Implementierung freigeben; keine stillschweigende Verwendung der unvollständigen Zeitnavigation.

**Ausdrücklicher Anpassungswunsch – Dateien:** R3 aus dem Review lösen. Bis dahin keine Zusage eines in 60 Sekunden widerrufenen Zugriffs und keine Freigabe für reale Uploads. Gewählte Strategie und bestehende Storage-Ausnahme dokumentieren und prüfen.

**Ausdrücklicher Anpassungswunsch – Auth-Rennen:** R1/R2 vor Verwendung des Profilcaches in neuen Ansichten beheben. Alle neuen Leseantworten an Anfrage, Konto und Ziel binden.

Die Beitrags- und Antwortschreibfunktionen zählen heute noch UTF-16-Einheiten. Für die nachfolgende Erstellungs-/Antwort-Spec auf SQL-kompatible Codepunktzählung abgleichen; das Profil wurde bereits korrigiert.

## 8. Barrierefreiheit

- Bestehende App-Gestaltung gemäß `DESIGN.md`; mobile Ansicht zuerst. Source Serif 4 für Inhalte, IBM Plex Sans für Bedienung, Mono für knappe Kennungen.
- Fokusfolge: Zurück, Profil, Filter, Beitragslinks, weitere Ergebnisse, globale Navigation. Im Detail Zurück, Inhalt, Datei, Lernziel, Antwortbereich und später freigegebene Aktionen. Semantik entsprechend der tatsächlichen visuellen Reihenfolge.
- Hauptüberschrift beim echten Ansichtswechsel fokussieren. Ein Filterwechsel erhält Fokus im Filter und meldet das Ergebnis kurz; er springt nicht zur Seitenüberschrift. Beim Nachladen Fokus auf dem Auslöser halten, hinzugefügte Ergebnisse ankündigen.
- Filter dauerhaft beschriften. Beitragslinks mit verständlichem Titel; Metadaten nicht zu einem unübersichtlichen einzigen Tastaturziel verschachteln.
- „Gelöst“, „Beste Antwort“, „Ausgeblendet“ und Rollen textlich kennzeichnen. Farbe allein reicht nicht.
- Fehler und Ladevorgänge passend ankündigen; kein Live-Vorlesen des gesamten Feeds.
- Tippziele mindestens 44 × 44 CSS-px. 320 px, 200 % Schrift und lange echte Titel müssen ohne verdeckte Pflichtaktionen funktionieren.
- Tastatur und Screenreader prüfen; Dialoge aus späteren Specs halten Fokus und geben ihn zurück. Reduzierte Bewegung beachten; kein automatisches Scrollen zu neu eingetroffenen Beiträgen.
- Bilder bekommen aussagekräftige Beschriftung, soweit sie aus vorhandenen Daten möglich ist. Das aktuelle Modell bietet keinen individuellen Alternativtext; ein solcher wäre ein ausdrücklich zu entscheidender Datenmodellwunsch. Ein PDF ist nicht automatisch barrierefrei, nur weil es hochgeladen werden kann.

## 9. Offene Fragen an Lukes

1. **Übersicht:** Drei Arten gemeinsam in einer ruhigen Liste, mit Beitragsart- und Lernfeldfilter? Empfehlung: ja. Erst allgemeine Community-Beiträge, Gruppen später.
2. **Seitennavigation:** „Weitere Beiträge laden“ mit stabiler Zeit-/ID-Navigation freigeben? Empfehlung: ja. Alternativ bewusste Beschränkung auf die 30 neuesten Beiträge, ausdrücklich beschriftet; kein scheinbar vollständiger Feed.
3. **Umsetzung und Beta:** Übersicht und Lesedetail zuerst intern bauen; für die Klassen-Beta gemeinsam mit Schreiben, Antworten, Melden und Moderation freigeben? Empfehlung: ja. Keine produktive Beiträge-Freigabe ohne Melde-/Moderationsweg.
4. **Dateizugriff:** Aktuelle Rechte bei Dateiabrufen bevorzugen und die bisherige 60-Sekunden-Zusage streichen? Empfehlung: ja. Claude soll die konkrete Technik und verbleibenden Grenzen belegen, bevor Uploads freigegeben werden.

### Abnahmefälle für Claude

Allgemeine Beiträge, keine Gruppeninhalte in C04; jede Art und beide Filter; keine Treffer; erster Abruf und nächste Seite mit Fehler; gleiche Zeitstempel an der Seitengrenze; keine doppelten/fehlenden Beiträge; Zurück mit korrekter Filter-/Scrollposition; Direktlink ohne Sitzung/Profil; gelöschtes, fremdes und ausgeblendetes Ziel; Antworten getrennt laden; beste Antwort richtig sortieren; reale Lernziele; Datei fehlt/abgelaufen/entzogen; kein Community-Cache offline; Kontowechsel und späte Antworten; harmlose HTML-Zeichen als Text; lange Unicode-Titel; Tastatur, 320 px, 200 % Schrift, Screenreader und Bildschirmtastatur. Echte Testdaten und Mock-Testfälle im Bericht unterscheiden.

### Kopierbare Rückgabe an Claude

> Review von a443607: Die meisten Zugangsnachbesserungen sind nachvollzogen. Vor technischer Abnahme bitte (1) Profilcache und verspätete Profilantworten in der Datenschicht an Konto/Auth-Generation binden, (2) verspäteten Abmelde-Erfolg so behandeln, dass er kein neues Konto aus der Ansicht entfernt. Beide Rennen sind lokal mit unverändertem Quellcode reproduziert. (3) Die Aussage „alte Dateilinks nach höchstens 60 Sekunden unzugänglich“ korrigieren: Links gelten weiterhin 3600 Sekunden, cacheControl 60 stand bereits in d752f1f. Storage-Löschfehler und Zugriff nach Ausblenden vor dem Beiträge-Paket bearbeiten. „Pflicht“ passt; beim E-Mail-Code empfiehlt ChatGPT „Pflicht bei Anmeldung mit Code“. Der Satz zur kontofreien Nutzung von Lernen/Üben passt. Keine Klassen-Beta-, Merge- oder Live-Freigabe. Die Beiträge-Spec Version 1 liegt Lukes zur Entscheidung vor. Entscheidungen trägt nur Lukes ein; Claude implementiert erst den freigegebenen Umfang.
