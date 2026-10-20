# 07 · Bilder in Community-Beiträgen und im Feed

> Stand: 2026-10-20 · Autor: ChatGPT · Rolle: Spec / Übergabe an Claude
>
> Auftrag von Lukes: „Man kann bei Azubipass keine Bilder im feed hochladen, lass uns das abändern“.
> Grundlage: `community-zugang` @ `6fd839c25fd7caae1dd71949af8e5e0d4e52781b`.
> Das Bildpaket ist beauftragt. Die unten benannten Mengen- und Bedienungsdetails sind Arbeitsannahmen von ChatGPT, keine zusätzlichen wörtlichen Entscheidungen von Lukes. Keine Anwendungsänderung oder neue Live-Freigabe durch diesen Dokumentationsstand.

## 1. Ausgangslage und Ziel

Der aktuelle Code erlaubt eine Datei nur bei allgemeinen Lernzetteln. `schreiben()` in `quellen/community-beitraege.js` blendet die Dateiauswahl bei Fragen und Tipps aus; `veroeffentlichen()` in `quellen/community.js` verwirft dort eine übergebene Datei. Das Beitragsmodell hat nur `datei_pfad` / `datei_art`. Die Feed-Zeile zeigt Art, Titel und Metadaten, lädt aber kein Bild. Im Detail werden vorhandene Lernzettelbilder bereits angemeldet abgerufen und dargestellt.

Das erklärt die fehlende Funktion im Code. Es ist kein Nachweis eines gesonderten Fehlers beim Upload eines zulässigen Lernzettelbilds auf einem produktiven Konto.

Ziel: Eine Frage mit Screenshot, ein Tipp mit Foto und ein mehrseitiger Lernzettel lassen sich als jeweils ein Beitrag veröffentlichen. Schon im allgemeinen Feed ist das erste Bild sichtbar; Antippen führt zur großen Ansicht und zu den übrigen Bildern.

## 2. Umfang und Arbeitsannahmen

| Beitragsart | Bilder | PDF | Titel und Text |
|---|---|---|---|
| Frage | Optional, 1–5 | Kein PDF-Anhang | Bestehende Pflicht für Titel und Text bleibt |
| Tipp | Optional, 1–5 | Kein PDF-Anhang | Bestehende Pflicht für Titel und Text bleibt |
| Lernzettel | 1–5 Bilder als Alternative zum PDF | Alternativ genau ein PDF | Titel Pflicht, Beschreibung optional |

Arbeitsannahmen: maximal fünf Bilder, jeweils höchstens **5 MiB = 5.242.880 Bytes**, zusammen höchstens **25 MiB = 26.214.400 Bytes**. Zugelassen: JPEG, PNG und WebP wie bisher. Bei Lernzetteln entweder Bilder oder ein PDF bis 5 MiB; beide Modi nicht gleichzeitig. Ein Lernzettel benötigt weiterhin einen Anhang. Fragen und Tipps ohne Bilder funktionieren weiter.

Der Auftrag betrifft den allgemeinen Feed. Gruppenbeiträge und Antworten behalten ihren bestehenden Umfang. Eine Erweiterung von Gruppen auf Dateien darf nicht versehentlich aus dem gemeinsam verwendeten Formular entstehen. Keine neue Beitragsart „Foto“ erforderlich.

Diese Spec ersetzt für den beauftragten allgemeinen Bildpfad die Beschränkungen aus `04-beitraege.md` §3 (keine Bilder im Feed) und `05-schreiben-antworten.md` §3 (Datei nur bei Lernzetteln). Die übrigen Schreib-, Zugangs- und Moderationsregeln gelten weiter.

## 3. Beitrag schreiben

1. Nach Titel und Text erscheint bei Frage und Tipp **„Bilder hinzufügen (optional)“**. Bei Lernzetteln erscheint die Auswahl **„Bilder“ / „PDF“**, zunächst Bilder.
2. Die native Dateiauswahl erlaubt mehrere Bilder. Erneute Auswahl ergänzt bis zur Obergrenze. Abbrechen des Dateidialogs verändert die vorhandene Auswahl nicht. Auf dem Smartphone bleiben Galerie und die vom Browser angebotene Kamera zugänglich; kein `capture` erzwingen, das die Galerie verdrängt.
3. Bilder erscheinen vor dem Senden als lokale Vorschauliste mit Nummer, Name und Größe. Aktionen je Bild: **„Entfernen“**, **„Nach vorn“**, **„Nach hinten“**. Reihenfolge entspricht später der Veröffentlichung; keine Drag-Pflicht.
4. Ungültige oder überzählige Dateien werden mit konkretem Grund zurückgewiesen. Bereits gültige Auswahl bleibt erhalten. Nichts still abschneiden oder veröffentlichen. Das erste ausgewählte Bild wird zum Feedbild; die Reihenfolge ist vor dem Senden änderbar.
5. Arbeitsannahme: je Bild eine optionale **„Bildbeschreibung“** bis 200 Codepunkte. Sie wird als Alternativtext genutzt. Ohne Beschreibung neutral „Bild {n} von {gesamt} zum Beitrag „{Titel}““; keinen erfundenen Bildinhalt erzeugen.
6. Wechsel Frage ↔ Tipp ↔ Lernzettel erhält gültige Bilder und Texte. Beim Wechsel eines PDF-Lernzettels zu Frage/Tipp oder zum Bildermodus den Verlust der PDF-Auswahl vorab erklären und bestätigen lassen. Keine inkompatible Datei unsichtbar zurücklassen.
7. Auswahl und Vorschau bleiben lokal und ans Konto gebunden. Der Upload startet erst bei **„Beitrag veröffentlichen“**. Vor dem Start lokale Prüfung und bestehende aktuelle Freigabeprüfung. Der vorhandene Uploadhinweis bleibt sichtbar.
8. Während des gesamten Sendens Eingaben, Reihenfolge und Auswahl sperren. Verständlicher Fortschritt **„Bild 2 von 4 wird hochgeladen …“**, keine erfundenen Prozentwerte. Erfolg erst nach bestätigter Beitrags-ID.

Texte: „Bis zu 5 Bilder. JPG, PNG oder WebP, jeweils höchstens 5 MiB.“ / „Du kannst höchstens 5 Bilder hinzufügen.“ / „Dieses Bild ist größer als 5 MiB.“ / „Dieses Bildformat wird nicht unterstützt. Wähle JPG, PNG oder WebP.“ / „Die Bilder konnten nicht vollständig hochgeladen werden. Deine Auswahl ist noch da.“ Letzten Satz nur vor sicher noch nicht begonnener Veröffentlichung verwenden; danach gilt die bestehende Unklarheitsbehandlung.

## 4. Feed und große Ansicht

- Jede berechtigte Bild-Beitragszeile erhält unter dem Titel einen Bildbereich. Das erste Bild bleibt vollständig erkennbar, mit begrenzter Höhe und ohne erzwungenen Beschnitt wichtiger Schrift. Bei mehreren Bildern erscheint **„1 / {Anzahl}“**. PDF-Beiträge erhalten einen PDF-Hinweis, keine automatische PDF-Vorschau.
- Antippen des Bildes öffnet den zugehörigen Beitrag und dessen große Bildansicht. Im Beitragsdetail sind alle Bilder über nummerierte Auswahl oder „Vorheriges Bild“ / „Nächstes Bild“ erreichbar; keine automatische Wiedergabe und keine Pflicht zum Wischen.
- Die große Ansicht bietet einen eindeutig beschrifteten Schließen-Knopf, Escape und korrekte Fokusführung. Nach Schließen zurück zum Auslöser. Beim Rückweg in den Feed Filter, Position und den Ursprungsbeitrag erhalten.
- Ein Bildfehler betrifft nur den Bildbereich: **„Das Bild konnte nicht geladen werden.“** plus **„Erneut versuchen“**. Titel, Text, Antworten und Rückweg bleiben nutzbar. Kein fehlgeschlagenes Bild als gelöschten Beitrag darstellen.
- Bestehendes Design aus `DESIGN.md` und Markenassets beibehalten. Bei 320 px, 200 % Schrift und Bildschirmtastatur bleiben Auswahl, Entfernen, Reihenfolge und Senden erreichbar. Alle Bildaktionen brauchen Textnamen und mindestens 44 × 44 CSS-px große Tippziele.

### Laden und Speicherverbrauch

Ein Feed kann viele Bilder enthalten. Deshalb nur das erste Bild einer Zeile bei Annäherung an den sichtbaren Bereich tatsächlich herunterladen, höchstens zwei Bildabrufe gleichzeitig. `loading="lazy"` allein reicht nicht, wenn vorher schon alle Dateien über `dateiLaden()` heruntergeladen wurden. Bilder 2–5 erst im Detail beziehungsweise bei Auswahl laden. Objektadressen mit begrenztem Speicherbestand verwalten, bei Entfernung/Ansichts- oder Kontowechsel freigeben; Bildplatz reservieren, damit das Nachladen die Leseposition nicht verschiebt. Keine Dateien im Service-Worker-, IndexedDB- oder lokalen Community-Cache ablegen.

## 5. Auftrag an Claude: Datenmodell und Schreiben

Mehrere Dateien benötigen eine echte Erweiterung von Modell, RPC und Lesedaten. Nur das Dateifeld sichtbar zu machen oder `multiple` zu setzen erfüllt den Auftrag nicht. Claude dokumentiert vor dem Einspielen den konkreten Migrations-/Kompatibilitätsplan mit den folgenden Invarianten:

- Geordnete Anhangsmetadaten pro Beitrag: eindeutiger privater Pfad, Art/MIME, Position und optionale Bildbeschreibung. Eine Anhangstabelle ist die empfohlene Form; Namen und Migration legt Claude anhand des tatsächlichen Schemas fest. Anzahl, Größen- und Formatgrenzen auch serverseitig sichern; Clientangaben allein reichen nicht. Keine frei wählbaren öffentlichen Bild-URLs übernehmen.
- Vorhandene Einbild- und PDF-Lernzettel bleiben lesbar. Bestehende Speicherobjekte wiederverwenden, keine unnötige Neuanlage der Originaldateien. Eine verbindliche Quelle für die Dateizuordnung festlegen; keine auseinanderlaufenden Altspalten und Anhangszeilen. Alte PWA-Versionen mit Ein-Datei-RPC kontrolliert weiter unterstützen oder verständlich zum Aktualisieren führen.
- Pro Veröffentlichung unveränderliche Momentaufnahme und eine Vorgangskennung, dazu stabile Dateikennungen. Wiederholung desselben Vorgangs erzeugt weder einen zweiten Beitrag noch zusätzliche Anhänge. Bereits hochgeladene Dateien nicht wegen einer geänderten Auswahl unter derselben Kennung austauschen. Änderung nach sicherem Verwerfen bekommt eine neue Kennung.
- Beitrag und vollständige Anhangszuordnung atomar festschreiben, erst nachdem alle angegebenen Dateien hochgeladen und geprüft sind. Fehler beim dritten Bild darf keinen öffentlich sichtbaren halben Beitrag erzeugen. Teiluploads bleiben zunächst privat.
- Bei Netzverlust oder verlorenem RPC-Ergebnis Ausgang über den bestehenden Vorgangsstatus klären. Niemals referenzierte Dateien auf Verdacht löschen. Bei sicher verworfenem Vorgang alle zugehörigen unbenutzten Teiluploads gezielt bereinigen; fehlgeschlagene Bereinigung wiederholbar behandeln.
- G06 auf **jede** Datei erweitern: Objektsperre vor Verwendungsprüfung, deterministische Sperrreihenfolge für mehrere Dateien, direkte Inserts/Updates ohne diese Prüfung ausgeschlossen. Veröffentlichung gegen Löschung in beiden Reihenfolgen belegen. `datei_in_gebrauch` muss die neue verbindliche Zuordnung berücksichtigen.
- Kontobindung nach jedem Upload und vor RPC, keine Fortsetzung unter einem anderen Konto. Kontowechsel verwirft lokale Auswahl und Vorschaubilder; spät eintreffende Downloads werden freigegeben. Die LS01–LS04-Korrekturen am Lernstand werden durch dieses Paket nicht erweitert.
- Löschen des Beitrags, eigene ausgeblendete Inhalte und Teamansicht auf alle zugehörigen Dateien abstimmen. Moderationsaktionen beziehen sich weiterhin auf den ganzen Beitrag einschließlich aller Bilder. Die Teamansicht ruft Bilder erst über „Datei prüfen“ ab, nicht automatisch im Fallüberblick.

## 6. Rechte und Moderation

Privater Speicher und angemeldeter Download mit aktueller Rechteprüfung bleiben verbindlich. Keine öffentlichen Buckets oder signierten Dauerlinks für die Feedvorschau. Aktuelle Paketfreigabe, Profil, Beitragssichtbarkeit und die bestehenden Sonderwege für eigene ausgeblendete Inhalte / Teamprüfung müssen für jeden neuen Pfad gelten. Ein Nichtmitglied darf durch die Erweiterung weiterhin keine Gruppenanhänge oder fremden Gruppentexte lesen.

Bei bekanntem Rechteentzug Bildansicht und Objektadressen entfernen; beim erneuten Abruf Rechte frisch prüfen. Bereits heruntergeladene Daten sind nicht fernlöschbar. Keine neue sofortige Widerrufsgarantie behaupten. Die bisherige Paket-/Merge-Freigabe wird durch diese Produktänderung nicht erweitert.

## 7. Gezielte Abnahme und Rückgabe

| Prüfung | Erwartung |
|---|---|
| Frage/Tipp ohne Bild, mit 1 und 5 Bildern | Textpflicht, Reihenfolge, bestätigte Anlage und Feedvorschau korrekt |
| Lernzettel mit Bildern / bestehendem PDF / ohne Datei | Beide Modi funktionieren; ohne Anhang verständlich abgelehnt |
| 6 Bilder; 5 MiB exakt / +1 Byte; Formatfehler | Grenzen in UI und direkter API durchgesetzt; gültige Auswahl bleibt |
| Auswahl ergänzen, entfernen, umsortieren; Arten-/PDF-Wechsel | Keine still verlorenen oder heimlich mitgesendeten Dateien |
| Doppelklick, verlorene RPC-Antwort, Wiederholung | Ein Beitrag, ein vollständiger unveränderter Anhangssatz |
| Teilupload, Abbruch, Bereinigungsfehler | Kein sichtbarer Teilbeitrag; referenzierte Dateien bleiben geschützt |
| Gleichzeitiges Veröffentlichen / Dateilöschen | Beide echten DB-Reihenfolgen erhalten G06 für jedes Bild |
| Konto A → B während Upload/Download | Keine Fortsetzung, Ansicht oder verspätete Datei von A unter B |
| Gesperrtes Konto/Paket, fremder Pfad, versteckter Beitrag | Direkte API und Storage lehnen unberechtigten Zugriff ab |
| Eigener ausgeblendeter Beitrag / Teamfall | Alle Anhänge nur über die bestehenden erlaubten Sonderwege |
| Alter Ein-Datei-Bestand und alter PWA-Client | Dokumentierter kompatibler Ablauf ohne Doppelzuordnung |
| Feed mit vielen Bildern, Filter, Nachladen, Zurück | Lazy-Abrufe, begrenzte Parallelität/Speichernutzung, stabile Position |
| Großansicht, Bildfehler, 320 px, Tastatur | Navigation/Fokus/Schließen funktionieren; Inhalt bleibt erreichbar |

Claude liefert Commit, Migrationen und Tests samt Unterscheidung zwischen simulierten und echten Konto-/Storage-/DB-Proben. Bestehende betroffene Schreib-, Beitrags-, Moderations- und Gruppenprüfungen aus `README.md` passend ausführen; neue Fälle gezielt ergänzen. Keine neue allgemeine Audit-Runde als Ersatz für die Bildabläufe.

**Nächster Schritt:** Claude konkretisiert Technik und setzt das beauftragte Bildpaket auf dem Arbeitsbranch um; Mengen-/Bedienungsannahmen in der Übergabe offen nennen. Produktive Migrationen erst nach dem dafür vorgesehenen Plan-/Freigabeschritt. Danach gezieltes ChatGPT-Review, anschließend die vereinbarte Live-Abnahme.

**Beleggrenze dieses Dokuments:** Quell- und Schemaanalyse; 61 relevante lokale Dateien einschließlich der Migrationsgrundlage per Git-Blob-Hash gegen den aktuellen Branch abgeglichen. Keine Bildfunktion implementiert, kein Upload-/Browser-/Live-Test ausgeführt. Bestehender Lernstand-Abschlussreview bleibt ein separater Nachweis.
