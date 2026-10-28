# Erweiterter Modus · vollständige Redaktion vor Merge

Stand: 28.10.2026. Rolle ChatGPT: Konzept, Redaktionsvorbereitung und Gegenprüfung. Umsetzung: Claude. Grundlage: Anwendung `f041834`, Remote-Übergabe `22c84b8`, Review `e3f1b05`, Umfangsentscheidung `d3de2fa`. Remote am 28.10.2026 erneut gelesen, weiterhin `22c84b8`.

## Auftrag

Lukes: „ne ich will das alles durch ist vor dem merge“ und „okay dann lass uns alles vorbereiten und claude setzt dann um“.

Den erweiterten Modus über **beide Berufe, alle 26 Lernfelder und sämtliche aktuellen Erklärabschnitte** fertigstellen. Ausgangsbestand: 160 Kapitel, 567 Abschnitte. Die drei bestehenden Pilotabschnitte sind Zwischenstand. Kein Pilotmerge mit späterer Redaktion des Restbestands. Kapitelweise Arbeit und Zwischenprüfungen bleiben möglich. Danach legt Claude den Gesamtstand einschließlich offener Grenzen zur Mergeentscheidung vor; dieser Auftrag erteilt keine Mergefreigabe.

## Was dieses Paket tatsächlich liefert

- 160 kapitelspezifische Fallaufträge und 567 Abschnittsdossiers mit originalen Lernzielen, Grundtexten, vorhandenen Zusatztexten, Struktur, Erhaltungsreferenzen und Redaktionsbedarf.
- Einen maschinenlesbaren Arbeitsbestand einschließlich Quellhashes und Ausgangsstatus, damit kein Abschnitt verloren geht.
- Vier zusätzliche ausformulierte Muster für Buchführung, KLR, Kommunikation und industrielle Materialplanung; die drei bereits eingebauten Piloten bleiben Referenz für ihre Themen.
- Konkrete Ergänzungsaufträge zu allen L-/K-Punkten des übernommenen Lehrplanaudits, technische Vorarbeiten und eine gemeinsame Abschlussprüfung.

**Das sind vollständige Redaktionsunterlagen für den Gesamtbestand, keine Behauptung über 567 bereits neu geschriebene und fachlich freigegebene Volltexte.** Die Dossiers zitieren den aktuellen Altbestand als Arbeitsmaterial. Claude muss daraus die zusammenhängende Vollfassung schreiben, fachlich prüfen und einbauen. Ein bloßes automatisches Umbenennen der alten Acht-Felder-Texte erfüllt den Auftrag nicht. Die vier neuen Muster sind Entwürfe mit geprüfter Struktur/Arithmetik, keine fertige Gesamtredaktion.

## Lesereihenfolge und Vorrang

1. `CLAUDE_START.md` und `01_REDAKTIONSSTANDARD.md`.
2. `02_TECHNIK_UND_MIGRATION.md`: E01, E02 und die neu ermittelte Absatzvoraussetzung zuerst lösen.
3. `03_LEHRPLAN_ERGAENZUNGEN.md`: Altbefunde am aktuellen Stand entscheiden und einplanen.
4. Dossier des nächsten Lernfelds unter `dossiers/`; `kapitelplan.csv` und `abschnittsplan.csv` als Arbeitslisten.
5. Neue Texte anhand des tatsächlichen Formats aus `quellen/vertiefung.py` und `doku/kapitel-format.md` einfügen. `muster/` enthält passende Format-2-Entwürfe.
6. `04_ABNAHME_UND_ABSCHLUSS.md`; Ergebnisse pro Charge in der vorgesehenen Tabelle führen.

Bei Widerspruch gilt: aktuelle ausdrückliche Nutzerentscheidung → tatsächlicher Quellstand und Testbelege → dieses Gesamtpaket → ursprüngliche Pilot-Spec. Unter `referenz-v1/` liegt die alte Vorbereitung unverändert zum Nachschlagen. Deren Aussagen „drei Piloten zuerst abschließen“ und „übrige Texte später“ sind **keine** Ausnahme vom Gesamtabschluss vor Merge. Der alte Schemaentwurf ist nicht mehr der technische Zielvertrag; das tatsächlich implementierte Format 2 ist die Anschlussstelle.

## Arbeitsfolge ohne weitere Konzeptschleife

1. Branchstand und fremde Änderungen prüfen, Quellhashes mit `bestand.json` abgleichen. Veränderte Dateien gezielt neu lesen, nicht mit alten Dossierauszügen überschreiben.
2. E01/E02 und den Fall ohne ersetzbaren Absatz (M01) mit engen Tests klären. Keine pauschale Neuarchitektur.
3. Zusatzmuster prüfen; Buchführung an einer echten Grafik mit geänderten Eingaben umschalten und unveränderte Instanz/Lernstände belegen.
4. KfB LF4/6/8/9/10, danach übrige KfB-Lernfelder; IK LF5/6/8/10/12, danach übrige IK-Lernfelder. Innerhalb eines Lernfelds in Kapitelreihenfolge arbeiten. Dies ist eine Arbeitsreihenfolge, keine willkürliche Priorisierung von Prüfungswahrscheinlichkeiten.
5. Lehrplanergänzungen bei den zugehörigen Kapiteln mitnehmen. Für neue Hauptinhalte die kompakte Ansicht mitentwickeln; nichts Pflichtiges ausschließlich als optionalen Sonderfall verstecken. Bereits erledigte Korrekturen nicht zurückrollen.
6. Pro Abschnitt sinnvoll redigieren, vorhandene Fragen mit begründeter Antwort getrennt fassen, passende Darstellung wählen, Quellen-/Zahlenprüfung durchführen. Kein künstlicher Mindestumfang als Ersatz für Verständnis.
7. Nach jeder Charge Textprüfung und betroffene Builds/Tests. Gesamtabnahme erst, wenn aktuelle Kapitel-/Abschnittsmenge vollständig erfasst ist und alle erforderlichen Prüfungen belegt sind.

Fachliche oder technische Änderungen mit konkretem Grund selbstständig lösen. Rückfragen nur bei einer echten Produktentscheidung oder nicht auflösbarem Widerspruch; nicht für jede Tabelle und Überschrift.

## Übergabe und Zustand

Am Ende vollständige Quellen, gebaute App, Suchindex und Cache konsistent erzeugen. Arbeitsliste aktualisieren, neue Abschnitte nachtragen, verbleibende Sperren benennen. Keine Datenbankänderung, neue KI-Funktion oder neue Lernstandswertung für diesen Modus nötig. Überarbeitete Texte nicht automatisch als amtlich/IHK-geprüft ausgeben. Nur tatsächlich durchgeführte Browser-, Offline- oder Fachprüfungen als bestanden melden.

Die Dateien sind repo-bezogene Vorbereitung. ChatGPT hat hier keinen Anwendungscode und keine Kapitelquelle geändert.
