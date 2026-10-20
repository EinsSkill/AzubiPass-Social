# AzubiPass Social · Gegenprüfung und nächste Spec

Stand: 13.10.2026 · ChatGPT → Lukes → Claude

## Grundlage und Ergebnis

Vorheriger Beitrag: Claude – Audit-Korrekturen und Zusammenführung auf `community-zugang`. Rolle jetzt: Gegenprüfung, danach Spec. Geprüfte, isolierte Stände:

- `lernkern-audit`: `d56a4e0d3f8aed28dc5de753e0576a701800d377`.
- `community-zugang`: `a0954dc9daacb71941572157f3e5b8098b6c18ed`.
- `origin/main`: unverändert `0c472bb20b602e46d154af0828502bed41b636d4`.

Zuerst gelesen: `doku/audit/2026-10-12-korrekturen.md`, oberster Eintrag `(3)` in `doku/community/uebergabe.md`, Entscheidungen. Zusätzlich Quellcode, tatsächliche Git-Diffs, Service Worker, Migrationen, Tests, `doku/eigene-probeklausur.md`, `04-beitraege.md` und `00-vorlage.md`.

**Ergebnis: Die meisten Korrekturen sind nachvollzogen und die berichteten Lernkern-Testzahlen selbst bestätigt. A04 benötigt eine weitere Absicherung bei fehlenden Cache-Einträgen. In C04 ist die Wiederherstellung nach mehr als 120 geladenen Beiträgen unvollständig. Die Klausurentscheidung liegt bei Lukes. Keine Merge- oder Deployment-Freigabe.**

Nur lokale Browserdaten/Testumgebung verwendet. Keine Supabase-Konten verbraucht, keine echten Community-Inhalte verändert. Der Funktionstest führt selbst einen Build aus; dessen erzeugte Änderungen wurden im isolierten Lernkern-Checkout anschließend entfernt. Kein Anwendungscode verändert, kein Push.

## Eigene Prüfungen

| Prüfung | Ergebnis / Grenze |
|---|---|
| Lernkern-Regression auf d56a4e0 | **42/42 bestanden** |
| Lernkern-Regression auf a0954dc | **42/42 bestanden** |
| Gegenprobe A01 auf main | Drei beschädigte Importe schlagen fehl; danach wird Ich unbedienbar und der Lauf bricht bei der nächsten Importprüfung ab. Damit ist der Unterschied zum korrigierten Stand selbst belegt. |
| Gegenprobe A05 auf main | Lesezeichen nach Neuladen bei 0 und 100 ms jeweils verloren; Folgeprüfung bricht wegen fehlendem gespeichertem Konto ab. Die korrigierten Stände bestehen dieselben Fälle. |
| Funktionstest auf d56a4e0 | **264/265 bestanden**, gleicher offener Klausurfall |
| Sichtprüfung a0954dc: App, Datenschutz, Impressum, Landing | **0 Fehler**, 390 × 844 und 1440 × 1100, jeweils light/dark |
| Vollständige Sichtprüfung d56a4e0 | **0 Fehler**, 6 Hinweise auf insgesamt 8 fachliche Prüfmarker; alle gebauten Seiten im bestehenden Prüflauf, 390 × 844 und 1440 × 1100 jeweils light/dark. |
| SHA-256 gegen tatsächliche gebaute Dateien | Alle **55** Lernkern- und **57** Community-Einträge stimmen |
| R1: verspätete Profilantwort A nach Anmeldung B | Eigener kontrollierter Node-Test: A wird mit `veraltet` verworfen, Cache liefert B |
| R2: verspäteter Abmelde-Erfolg nach Anmeldung B | Eigener Chromium-Test mit simuliertem Auth-Dienst: B bleibt sichtbar, Zustand `drin` |
| A04: erwartete Datei aus aktivem Cache entfernen, Server liefert neue Fassung | **Neue Fassung wird ausgeliefert**, siehe Befund G01 |
| C04: 150 Beiträge laden, Nr. 140 öffnen, zurück | Eigener Chromium-Test mit simulierten Daten: danach nur 120 Beiträge; zuvor geöffneter Eintrag fehlt, siehe G02 |
| Community-Sichtbelege | 14 bestehende Beitrags-Screenshots gesichtet; zusätzliche eigene Chromium-Szenarien bei 320 und 1440 px mit simulierten Daten bestehen: Liste, Artfilter, Detail, Antworten, Klartext statt HTML, Lernkapitellink, kein Überlauf/JavaScript-Fehler. Eigene Detailbilder gesichtet. Keine eigenen echten Supabase-UI-Tests. |
| Supabase-Datenschicht 56/56 und Beiträge 87/87 | Von Claude berichtet und Testcode gelesen; mangels Zugangsdaten nicht selbst gegen Server wiederholt |
| Zugangstest | Nicht erneut gegen echte Konten ausgeführt; frühere Einzelkorrektur und Verbrauchsgrenze dokumentiert |

Browserumgebung: Chromium 153 unter Linux, anstelle von Claudes lokalem Browser. Die bestehenden Python-Tests wurden über einen externen Runner mit diesem ausführbaren Browser gestartet; Prüf-Assertions blieben unverändert. Kein Beleg für echte Smartphones, Screenreader, installierte Geräte-PWA oder OS-Prozessabbruch.

Der pauschale Abschlusstext von `pruefe.py` („Freigabe möglich“) beschreibt ausschließlich dessen eigene automatisierte Prüfungen. Er ersetzt weder die zusätzliche Gegenprüfung G01/G02 noch Lukes' Produkt-, Merge- oder Veröffentlichungsentscheidung.

## Gegenprüfung je Befund

| Befund | Urteil | Begründung |
|---|---|---|
| A01 beschädigte Sicherung | Abgedeckte Fehler behoben | Typprüfung, Zusammenführung in Kopie, erst anschließend Übernahme; kaputte/alte/gültige Testdateien und gespeicherte Altfehler bestehen. Keine Behauptung vollständiger Prüfung beliebiger JSON-Inhalte. |
| A02 Kontobindung / Profilcache | Geprüftes Rennen behoben | Konto und Generation, gebundene Antworten, Cache mit Konto-ID. Eigene Gegenprobe liefert B statt A. |
| A03 späte Abmeldung | Geprüftes Rennen behoben | Prüfung in Datenschicht und Oberfläche; eigener Browser-Test erhält Konto B. Normaler echter Supabase-Logout hier nicht neu geprüft. |
| R01 / frühere R3 Dateizugriff | Code/Policy passend; Serverbeleg von Claude | Angemeldeter Download statt signierter Links; Profilprüfung auch im eigenen Storage-Ordner; Blob-Freigabe und erkannte Löschfehler. Bereits heruntergeladene Inhalte bleiben beim Empfänger. |
| A04 Fassungstreue im Offline-Cache | **Teilweise behoben; G01 offen** | Vollständige Installation und Dateihashes passen; fehlender erwarteter Cache-Eintrag fällt trotzdem auf ungeprüftes Netzwerk zurück. |
| A05 sofortiges Speichern | Geprüfte Fälle behoben | Erste Änderung sofort, weitere gebündelt, Flush beim Verlassen/Verbergen; 0/100-ms-Neuladen und Folgeänderung bestehen. Zwei-Tabs-Konflikt und harter OS-Abbruch bleiben Grenzen. |
| A06 Ketten/Vergleiche | Geprüfte Typen behoben | Echte Buttons, Tastaturaktivierung, Fokus und ARIA; Vergleichstippziele berücksichtigt. 14 übrige Typen/SVG-Hotspots bleiben ungeprüft. |
| A07 Sprunglink | Behoben in getesteten Wegen | Fokus im Hauptinhalt ohne kaputten Hash; Kapitel/Lernen/Üben bestehen. |
| A08 kostenlose Beta / Landing | Sichtbare Preise entfernt | Texte sagen kostenlose Beta, projektbezogener Logo-Link. Alte Preiswerte stehen noch in `landing.config.json`, werden von der geprüften Landing nicht ausgegeben. Das ist keine neu freigegebene Preisstrategie. |
| A09 320 px | Geprüfte Überläufe behoben | 80 Ansichten im Regressionstest bestehen; Community-Rechtsseite zusätzlich bei 390 px geprüft, merged 320-px-Regression besteht. Kein `overflow-x:hidden` als Verdeckung. |
| A10 alles fertig ohne Verlauf | Behoben | Heute zeigt Prüfungstraining; beide früheren Funktionsfälle bestehen. |
| A11 Kartenrückseite | Geprüfter Kontrast behoben | Rückseite erhält ihre eigene Textfarbe, Regression besteht. Hover nicht separat abgenommen. |
| A05-Folge Erstbesuch/Übernahmehinweis | Testfall behoben | Kein Erstinstallations-Reload; Funktionstest bestätigt den Übernahmehinweis. Kein zusätzlicher Beleg für Deployment mitten in einer Erstinstallation. |

## G01 · Hoch für die zugesagte Fassungstreue: Cache-Miss einer erwarteten Datei

**Ort:** `quellen/gemeinsames.py`, `SW_VORLAGE`, Fetch-Handler; entsprechend `docs/sw.js`.

Der Installationspfad ist deutlich besser: Jede Datei wird vor dem Speichern gehasht, eine fehlgeschlagene neue Installation verwirft die halbe neue Fassung. Alle geprüften Hashes stimmen, und die bestehenden Tests für fehlende Datei/neuen falschen Hash/alte aktive Fassung bestehen.

Der Fetch-Handler unterscheidet jedoch nicht zwischen „nicht im Vorrat“ und „im Vorrat, aber nicht mehr im Cache“. In beiden Fällen folgt `fetch(anfrage)`. Es wird zwar nichts nachträglich in den Cache geschrieben, aber eine Seite der anderen Fassung kann trotzdem ausgeliefert werden.

**Eigene Reproduktion im echten Chromium:**

1. d56a4e0 vollständig installieren und aktiven Controller abwarten.
2. Genau `lf13.html` aus dem aktiven Cache entfernen; `Cache.delete()` meldet `true`.
3. Der Testserver liefert unter derselben URL eine geänderte Seite mit `NEW-VERSION-MARKER`.
4. `fetch('lf13.html', {cache: 'reload'})` aus der kontrollierten Seite enthält den Marker: **true**.

Die Entfernung wurde gezielt simuliert; damit ist nicht behauptet, dass normale Browser selbst einzelne Dateien regelmäßig entfernen. Der Test belegt das Verhalten bei einem unvollständigen oder entfernten aktiven Cache und die Grenze der derzeitigen Garantie.

**Erwartung:** Eine Datei, die zur aktiven Fassung gehört, darf bei einem Cache-Miss nicht ungeprüft aus einer anderen Fassung kommen.

**Empfehlung an Claude:** Den normalisierten angefragten Pfad gegen `VORRAT` prüfen. Fehlt ein erwarteter Eintrag, einen klaren Wiederherstellungs-/Aktualisierungszustand liefern, statt die neue Datei durchzureichen. Falls überhaupt Netzwerk-Reparatur vorgesehen wird, nur nach passender Hashprüfung und ausdrücklicher Änderung der bisher dokumentierten Strategie. Wirklich nicht zum Vorrat gehörende Anfragen dürfen weiterhin durchgereicht werden. Cache-Miss und komplett fehlender aktiver Cache brauchen eigene Regressionen.

Kein Grund, die 42 bestandenen Tests zurückzunehmen: Sie prüfen die vorhandenen Installationsfälle korrekt. Der zusätzliche Fall fehlt bislang.

## G02 · Mittel, nur Community: Rückkehr nach mehr als 120 Beiträgen

Ort: `quellen/community-beitraege.js`, `liste()` → `laden()`: Anzahl bei Rückkehr auf 120 begrenzt. Die Liste kann über „Weitere Beiträge laden“ dagegen mehr als 120 Einträge enthalten.

Eigener Chromium-Test mit simulierten Daten bei a0954dc: 150 Beiträge über vier Nachladeaktionen anzeigen → „Auditbeitrag 140“ öffnen → „Zurück zu Beiträgen“. Ergebnis: **vorher 150, nachher 120**, zuvor geöffneter Beitrag nicht vorhanden. Damit gehen auch die versprochene Fokus-/Positionswiederherstellung für diesen Eintrag verloren.

Empfehlung: Beim Zurückkommen die nötigen Seiten mit der vorhandenen stabilen Zeit-/ID-Navigation neu laden, bis die vorher geladene Anzahl beziehungsweise das noch zugängliche Ursprungsziel wieder erreicht ist. Entzogene oder gelöschte Inhalte weiterhin nicht aus einem alten Cache anzeigen. Grenze eines einzelnen API-Abrufs nicht mit der Gesamtlänge der Liste verwechseln. Neue Regression mit mindestens fünf Seiten. **Kein Befund gegen den reinen Lernkern-Branch.**

## Klausur nach Abgabe: Empfehlung zur Entscheidung

**Empfehlung: Auswertung behalten.** Nach Abgabe und Neuladen soll „Eigene Probeklausur“ die letzte Auswertung öffnen, ohne laufende Uhr und ohne erneute Bearbeitung der bereits abgegebenen Klausur. Offene Selbstbewertungen bleiben erreichbar. „Neue Variante erstellen“ und „Auswahl ändern“ führen ausdrücklich zu einer neuen Vorbereitung.

Das erhält den Lernzusammenhang und verhindert, dass noch offene Selbstbewertungen beim Wiederöffnen praktisch versteckt werden. Das bisherige Konzept sagt nur, dass eine abgeschlossene Klausur nicht ungefragt als laufende angezeigt wird; es verbietet die Auswertung nicht.

Der Test verbindet heute „keine Uhr“ mit „Kapitelwahl vorhanden“. Das sind zwei verschiedene Anforderungen. Nach Lukes' Entscheidung soll Claude den Test konkret auf Auswertung, fehlende Uhr, erhaltene Antworten/Selbstbewertung und funktionierende neue Vorbereitung umstellen. Nicht einfach die fehlgeschlagene Assertion entfernen. Entscheidung in Konzept/Entscheidungen dokumentieren; ChatGPT trägt keine Freigabe stellvertretend ein.

## Texte von Claude

**Sicherungsablehnung:** „Diese Sicherung ist beschädigt und wurde nicht eingespielt (…). Nichts geändert.“ ist für die abgelehnten Typ-/Strukturfehler passend und durch die Tests mit unverändertem Speicher belegt. Kann übernommen werden. Eine kürzere Alternative wäre „Diese Sicherung konnte nicht eingespielt werden: {Grund}. Dein bisheriger Lernstand wurde nicht verändert.“ Kein notwendiger Korrekturpunkt.

**Landing:** „In der Beta kostenlos.“, „Beta · kostenlos“, „Die Beta ist kostenlos.“ sowie die Verweise auf Prüfungstraining unter Üben entsprechen Lukes' Entscheidung. „In der Beta ist alles kostenlos — schau rein, dann weißt du, ob's was für dich ist.“ ist verständlich; für eine etwas ruhigere Formulierung empfehle ich optional: „In der Beta kannst du alle verfügbaren Lerninhalte und Übungen kostenlos nutzen.“ Das verhindert auch, dass „alles“ als Zusage noch nicht freigegebener Community-Funktionen gelesen wird. Beide Fassungen sind keine Preisfreigabe für die Zeit nach der Beta.

Die zusätzlichen C04/C05-Texte aus der Übergabe passen überwiegend: Rückmeldung nach Nachladen, „bearbeitet {Datum}“, Profil/Zu Beiträgen und neutraler Bild-Alternativtext. Letzterer beschreibt nur die Einordnung und ersetzt keine Beschreibung des Bildinhalts. Im Filter-Leerzustand wird dieselbe Meldung zweimal sichtbar angezeigt; das ist ein kleiner Bedienungs-/Textbefund, kein Zugriffsschutzfehler. Empfehlung: einmal sichtbar anzeigen und den Status für Assistenztechnik ankündigen.

## Ehrlich benannte Grenzen und Freigabereihenfolge

Die Übergabe benennt OS-Abbruch, Mehrtab-Schreiben, weitere Grafiktypen, SVG-Hotspots, echte Geräte, Screenreader, Mailzustellung, OTP-Konfiguration und Datenschutzlücken nachvollziehbar. Ergänzen muss sie G01 und G02. „42/42“ bedeutet keine vollständige Mehrtab- oder Cache-Verlust-Absicherung.

Für `lernkern-audit`: G01 schließen; Lukes entscheidet über den Klausur-Rückweg; entsprechender Test muss danach bestehen. Erst dann technische Empfehlung zur gesonderten Merge-Freigabe. Diese Gegenprüfung erteilt selbst keine Veröffentlichungserlaubnis.

Für `community-zugang`: Zusätzlich G02 beheben und die bereits dokumentierte Klassen-Beta-Sperre durchsetzen. C04/C05 sind auf diesem Branch momentan für jedes freigeschaltete Profil erreichbar. Das ist zum internen Entwickeln dokumentiert, aber keine abgesicherte Auslieferungssperre. Mailversand, vollständige Datenschutzangaben, Schreiben/Antworten und Melden/Moderation bleiben vor Klassen-Beta nötig. Der folgende Spec-Entwurf macht die Sperre konkret.

---

# 05 · Beitrag erstellen und Antworten

> Status: SPEC · Version: 1 · Stand: 2026-10-13 · Autor: ChatGPT
>
> Entwurf für Lukes. Danach Umsetzung durch Claude. Grundlage: a0954dc, 00-vorlage, 04-beitraege, Entscheidungen und tatsächliche Datenschicht/SQL-Rechte. Keine Implementierungs-, Merge- oder Live-Freigabe.

## 1. Zweck

Azubis stellen eine verständliche Frage, teilen einen eigenen Lernzettel oder Tipp und antworten auf einen zugänglichen Beitrag, ohne Eingaben unbemerkt zu verlieren oder versehentlich doppelt zu veröffentlichen.

Enthalten: C06 Beitrag schreiben und Antwortformular im C05-Detail. Vorschlag für dieses Paket: beste Antwort bei Fragen setzen/zurücknehmen. Hilfreich, eigene Inhalte bearbeiten/löschen sowie Melden/Moderation sind weitere Spezifikations-/Implementierungsteile; ihre Veröffentlichung wird nicht stillschweigend vorgezogen.

## 2. Einstieg

- C04 → „Beitrag schreiben“ → C06, nur nach aktueller Sitzung, Profil und interner Paketfreigabe. Vorgeschlagener neuer Unterweg `#community/schreiben`; bisher ist dieser Weg nicht implementiert und endet neutral.
- C05 → „Antwort schreiben“ → beschriftetes Formular direkt unter dem Antwortbereich.
- C06 hat „Zurück zu Beiträgen“, C05 bleibt die bestehende Leseseite.
- Ziel dieser Phase ist fest „Für alle in der Community“. Keine Gruppenauswahl und keine Gruppen-Direktwege, bis die Gruppen-Spec freigegeben ist.
- Kein Schreibknopf und keine Beitragsabfrage für Klassennutzer, solange die Paketsperre aktiv ist. Gesperrte Direktlinks dürfen keine Titel-/Datei-/Antwortdaten verraten.

### Verbindliche Klassen-Beta-Sperre – Vorschlag zur Freigabe

Eine neue gemeinsame serverseitige Freigabe für das **gesamte Beiträge-Paket** startet mit **false**. In diesem Zustand haben nur ausdrücklich benannte interne Testkonten Zugriff auf Übersicht, Details, Erstellung und Antworten. Die vorhandene, administrativ gesetzte Demo-Kennzeichnung kann als Basis dienen; Claude muss ihre tatsächliche Vertrauensgrenze prüfen. Rollen `mentor` und `team` sind allein keine automatische Freigabe für alle Nutzenden.

Die App liest den Freigabestatus nach der Zugangsprüfung. Normale Klassenkonten erhalten bei geschlossener Freigabe weiterhin Profil/Regeln/Abmelden und den klaren Hinweis „Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.“ Dazu „Zu Lernen“. Es werden keine Beitragsdaten geladen. Direktlinks enden neutral im selben gesperrten Zustand.

**Wichtig:** Die Oberfläche allein reicht nicht. Serverrechte müssen Lesen und Schreiben von Beiträgen/Antworten und den zugehörigen Dateizugriff für die gesperrten Konten ebenfalls verhindern. Die benötigten Anpassungen an RLS, RPC und Speicherregeln sind ein **ausdrücklicher technischer Änderungswunsch**, keine schon bestehende Funktion und keine Anweisung, nur ein JavaScript-Flag einzubauen.

Öffnen ausschließlich nach Lukes' gesonderter Freigabe, wenn C04/C05, C06/Antworten, Melden und Moderation gemeinsam geprüft sind und Mailversand/Datenschutz bereitstehen. Eine Konfiguration „Schreiben fertig“ öffnet nichts automatisch. Scheitert die Freigabeprüfung, bleibt das Paket geschlossen. Bereits offene Ansichten müssen Schließen der Freigabe und Rollen-/Kontowechsel bei bekanntem Status beziehungsweise erneuter Prüfung berücksichtigen. Neue Serverzugriffe werden unmittelbar nach der serverseitigen Sperre abgelehnt; ohne entsprechende Live-Technik wird keine sofortige Entfernung schon dargestellter Inhalte auf einem untätigen Gerät versprochen.

## 3. Aufbau von oben nach unten

### C06 · Beitrag schreiben

1. Zurück, Augenbraue „Ich · Community · Beiträge“, Überschrift „Beitrag schreiben“.
2. Zielzeile „Für alle in der Community“ und kurze Einleitung „Stell eine Frage oder teile einen Lernzettel oder Tipp.“
3. Pflichtfeld „Beitragsart“: Frage / Lernzettel / Tipp. Vorschlag: Frage vorausgewählt; ein Artenwechsel löscht keine Texte stillschweigend.
4. Pflichtfeld „Titel“: 3–120 Codepunkte nach Entfernen äußerer Leerzeichen. Sichtbare Zählung „{n} / 120 Zeichen“, längenabhängiger Fehler.
5. „Text“: höchstens 4000 Codepunkte. Vorschlag: bei Frage und Tipp Pflicht, mindestens ein Nicht-Leerzeichen; bei Lernzettel „Beschreibung (optional)“. Bestehendes Datenmodell erlaubt leeren Text, daher ist die strengere Frage-/Tipp-Regel ein ausdrücklich vorgeschlagener Eingabestandard, keine bereits geltende SQL-Regel.
6. Nur Lernzettel: Pflichtfeld „Datei“. JPG, PNG, WebP oder PDF, höchstens 5 MiB = 5.242.880 Bytes. Hilfetext „JPG, PNG, WebP oder PDF, höchstens 5 MiB.“ Gewählter lokaler Dateiname, Größe, „Datei entfernen“. Dateiname wird nicht als neues Datenbankfeld eingeführt. Kein Upload bereits bei Dateiauswahl.
7. Uploadhinweis: „Lade nur Inhalte hoch, die du teilen darfst. Keine echten IHK-Prüfungsaufgaben und keine persönlichen Daten anderer Personen.“ Zusätzlich Hinweis auf Prüfung von Bildern und PDFs. Keine neue Bestätigungspflicht ohne Entscheidung.
8. Optionale Zuordnung „Lernfeld (optional)“ und davon abhängiges „Kapitel (optional)“, ausschließlich aus dem geladenen Katalog. Ein Lernfeldwechsel setzt die unpassende Kapitelwahl sichtbar zurück.
9. Nur Frage: freiwilliges Häkchen „Frage an Mentor:innen richten“, zunächst aus. Hilfetext „Das kennzeichnet deine Frage für Mentor:innen. Eine Antwort ist nicht garantiert.“ Bei anderer Art wird die Option nicht mitgesendet.
10. Fehlerübersicht mit Feldlinks nach erfolglosem Absenden; Fehler verschwinden nach Korrektur. Keine Serverabfrage bei jedem Tastendruck.
11. Hauptaktion „Beitrag veröffentlichen“, Nebenaktion „Abbrechen“. Zuerst lokale Validierung, dann aktuelle Zugangs-/Freigabeprüfung, dann tatsächlich notwendiger Upload und Veröffentlichung.
12. Erfolg nur nach bestätigter Beitrags-ID; C05 des eigenen Beitrags öffnet mit „Dein Beitrag wurde veröffentlicht.“ Eingaben erst nach eindeutigem Erfolg löschen.

Artenwechsel mit ausgewählter Datei: vor dem Verlassen von Lernzettel erklären „Die ausgewählte Datei wird bei dieser Beitragsart nicht veröffentlicht.“ Auswahl entfernen erst nach ausdrücklicher Bestätigung oder während des Wechsels auf einer klar angekündigten Weise; nicht versehentlich als Anhang einer Frage senden. Claude darf keine beliebigen Anhänge an Fragen/Tipps ergänzen.

### Antworten im C05-Detail

1. Bestehenden Beitrag und Antworten anzeigen, danach „Antwort schreiben“ als Einstieg zum eingeblendeten Formular.
2. Pflichtfeld „Deine Antwort“: 1–2000 Codepunkte nach Trimmen. Mehrzeilig, Zählung „{n} / 2000 Zeichen“. Klartext, keine Anhänge, keine Antworten auf Antworten und keine Erwähnungs-/Benachrichtigungsfunktion.
3. Hauptaktion „Antwort senden“, Nebenaktion „Abbrechen“.
4. Erfolg: frische Antworten laden, eigene neue Antwort als Ergebnis finden, Eingabe leeren und „Deine Antwort wurde gesendet.“ ankündigen. Scheitert das Nachladen nach bestätigtem Schreiben, Erfolg nicht zurücknehmen oder erneut senden: „Deine Antwort wurde gesendet. Die Antworten konnten noch nicht neu geladen werden.“ mit Lese-Wiederholung.
5. Nur bei einer Frage und für deren Autor:in: an einer sichtbaren Antwort „Als beste Antwort markieren“. Bei aktueller bester Antwort „Markierung entfernen“. Danach bestätigten Lösungsstatus und Antworten neu laden. Kein Erfolgszustand vor Serverbestätigung.

Die vorhandene RPC `beste_antwort` prüft bisher den Autor, aber nicht ausdrücklich Beitragsart oder verborgene Inhalte. Für diesen Vorschlag muss Claude die Serverprüfung auf zulässige sichtbare Fragen/Antworten ergänzen. Das ist eine explizite technische Nachbesserung; eine ausgeblendete Antwort darf nicht zur öffentlich angezeigten Lösung werden.

## 4. Aktionen

| Aktion | Wer darf | Ergebnis |
|---|---|---|
| Beitrag schreiben | Sitzung, Profil, aktive interne oder später allgemeine Paketfreigabe | C06, fester allgemeiner Zielbereich |
| Datei auswählen | Berechtigter Entwurf mit Art Lernzettel | Nur lokale Auswahl und Prüfung, noch kein Upload |
| Veröffentlichen | Profil, Freigabe und passende aktuelle Serverrechte | Ein bestätigter Beitrag; C05 öffnen |
| Antwort schreiben/senden | Profil, Freigabe, aktuell lesbarer und nicht ausgeblendeter Beitrag | Eine bestätigte Antwort; Liste neu laden |
| Beste Antwort setzen/zurücknehmen | Autor:in einer zugänglichen, nicht ausgeblendeten Frage | Bestätigte Markierung und Lösungsstatus |
| Abbrechen / zurück | Alle | Bei geänderten, ungesendeten Eingaben Rückfrage; bei laufendem Versand Ergebnis nicht fälschlich als abgebrochen darstellen |
| Status prüfen | Dieselbe berechtigte Person | Klären, ob der bereits gestartete Vorgang angekommen ist; keine neue Veröffentlichung |

### Kontobindung und eindeutige Schreibvorgänge

Ein kompletter Schreibvorgang wird vor dem Start an Konto und Generation gebunden. Nach jedem asynchronen Schritt muss vor einem weiteren Schreib-/Uploadschritt die Bindung noch stimmen. Es genügt nicht, nur die letzte UI-Antwort zu ignorieren. Ein Entwurf von A darf unter B niemals weitergesendet werden. Abmeldung oder Kontowechsel entfernt alte Eingaben/Dateiauswahl aus der Ansicht. Bei bereits gesendeter Anfrage kann der Server den ursprünglichen Vorgang noch abschließen; das ist kein Grund, ihn unter dem neuen Konto zu wiederholen.

Doppelklick sperrt denselben Vorgang. Verlorene Antworten sind **unklarer Ausgang**, nicht automatisch „nicht gesendet“. Eine erneut verwendbare Vorgangskennung muss serverseitig eine doppelte Anlage verhindern. Das aktuelle API setzt Beitrag-/Antwort-ID ausschließlich serverseitig; bestehende Spaltenrechte erlauben keine freie ID beim Insert. Deshalb ist robuste Idempotenz ein **ausdrücklicher API-/RPC-Änderungswunsch**, der mit vorhandenen UUID-Feldern umgesetzt werden kann, sofern Claude das sicher prüft. Kein stilles Erweitern der Insert-Rechte und kein unsicherer Abgleich nur anhand von Titel/Text/Zeit.

Ohne freigegebene Idempotenztechnik bleibt bei unklarem Ausgang nur Statusprüfung und ein ehrlicher blockierter Wiederholungsweg; die Oberfläche darf dann keine garantiert doppelfreie Wiederholung versprechen. Die technische Variante muss vor Umsetzung vereinbart und getestet werden.

Bei Lernzetteln ist besonders wichtig: Die vorhandene `veroeffentlichen()`-Fehlerbehandlung entfernt die hochgeladene Datei nach jedem Fehler. Nach verloren gegangener Antwort kann der Beitrag aber bereits gespeichert sein. **Datei in diesem Fall nicht blind löschen.** Erst den Vorgangsstatus klären; nur sicher nicht referenzierte Dateien bereinigen. Uploadfehler, Beitragfehler, unklarer Erfolg und Bereinigungsfehler sind verschiedene Fälle.

## 5. Zustände

- **Leer:** Beschriftetes Formular, Beispiele höchstens als Hilfetext; kein ausgedachter Beitrag als reale Veröffentlichung.
- **Lokale Fehler:** „Bitte prüfe deine Eingaben:“ mit Feldlinks. „Der Titel braucht 3 bis 120 Zeichen.“ / „Gib einen Text für deine Frage ein.“ / „Gib einen Text für deinen Tipp ein.“ / „Der Text darf höchstens 4000 Zeichen lang sein.“ / „Wähle eine Datei für deinen Lernzettel.“ / „Erlaubt sind JPG, PNG, WebP oder PDF.“ / „Die Datei darf höchstens 5 MiB groß sein.“ / „Die Antwort braucht 1 bis 2000 Zeichen.“
- **Lädt:** „Beitrag wird veröffentlicht …“, bei tatsächlichem Upload „Datei wird hochgeladen …“, „Antwort wird gesendet …“. Kein erfundener Prozentfortschritt. Formular vor mehrfacher Auslösung schützen; Lernen bleibt erreichbar.
- **Sicher fehlgeschlagen:** „Dein Beitrag wurde nicht veröffentlicht. Deine Eingaben sind noch da.“ beziehungsweise „Deine Antwort wurde nicht gesendet. Deine Eingabe ist noch da.“ Nur verwenden, wenn der erfolglose Ausgang sicher ist.
- **Unklarer Ausgang:** „Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde. Prüfe den Status, bevor du erneut sendest.“ / „Wir konnten nicht prüfen, ob deine Antwort gesendet wurde. Prüfe den Status, bevor du erneut sendest.“ Dazu „Status prüfen“. Keine automatische Wiederholung.
- **Bestätigter Erfolg, Detailabruf scheitert:** „Dein Beitrag wurde veröffentlicht. Er konnte noch nicht angezeigt werden.“ Dazu „Beitrag erneut laden“. Vorhandene ID behalten, nicht nochmals veröffentlichen.
- **Offline vor Versand:** „Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab.“ Kein Hintergrundversand. Entwurf nur im Arbeitsspeicher dieses Kontos behalten; kein dauerhaft gespeicherter Entwurf versprechen. Nach Wiederverbindung erneut Zugang/Freigabe prüfen.
- **Offline während Versand:** Ausgang nach Wiederverbindung klären; keine „nicht gesendet“-Behauptung allein wegen Netzverlust. Kein automatisches Nachsenden.
- **Ohne Profil/Sitzung:** Wege aus 02, kein Lesen/Schreiben vorher. Bei Kontowechsel Entwurf verwerfen; kein Übertragen an anderes Konto.
- **Rechte entzogen / Beitrag ausgeblendet:** „Du kannst diesen Beitrag gerade nicht bearbeiten oder beantworten.“ Neutraler Rückweg; fremde Metadaten entfernen, wenn Leserecht fehlt.
- **Paketsperre:** „Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.“ Dazu „Zu Lernen“; eigene Profilaktionen bleiben erreichbar.
- **Spam-Bremse:** „Du hast gerade viele Beiträge veröffentlicht. Versuch es später erneut.“ / „Du hast gerade viele Antworten gesendet. Versuch es später erneut.“ Eingaben erhalten, kein Restkontingent als Motivation anzeigen.
- **Ungesendeter Entwurf beim Verlassen:** „Deine Eingaben wurden noch nicht gesendet. Möchtest du sie verwerfen?“ Aktionen „Weiter schreiben“ / „Eingaben verwerfen“. Browser-/Tab-Schließen kann nur soweit vom Browser unterstützt warnen; keine garantierte Rückfrage behaupten.
- **Beste Antwort:** Bei Fehler „Die Markierung konnte nicht geändert werden. Versuch es erneut.“ Alten bestätigten Zustand erhalten, keine vorschnelle Umordnung.

## 6. Texte (wörtlich)

| Stelle | Text |
|---|---|
| Titel C06 | Beitrag schreiben |
| Einleitung | Stell eine Frage oder teile einen Lernzettel oder Tipp. |
| Ziel | Für alle in der Community |
| Art | Beitragsart |
| Titel | Titel |
| Text Frage/Tipp | Text |
| Text Lernzettel | Beschreibung (optional) |
| Zuordnung | Lernfeld (optional) / Kapitel (optional) |
| Datei | Datei / Datei entfernen |
| Mentor:innen | Frage an Mentor:innen richten |
| Pflichtkennzeichnung | Pflicht |
| Beitrag senden | Beitrag veröffentlichen |
| Antwort öffnen | Antwort schreiben |
| Antwortfeld | Deine Antwort |
| Antwort senden | Antwort senden |
| Abbrechen | Abbrechen |
| Erfolg | Dein Beitrag wurde veröffentlicht. / Deine Antwort wurde gesendet. |
| Unklar | Status prüfen |
| Lösung | Als beste Antwort markieren / Markierung entfernen |
| Sperre | Beiträge sind für die Klassen-Beta noch nicht freigeschaltet. |

Die vorhandenen Community-Regeln bleiben unverändert. Nutzertext wird nur als Klartext dargestellt. Keine Erfolgsversprechen, keine amtliche Qualitätsbestätigung und keine Push-/Mailbenachrichtigung beim Setzen der Mentor:innen-Option.

## 7. Daten

| Inhalt | Bestehende Felder |
|---|---|
| Beitrag | `art`, `titel`, `text`, optional `lernfeld`, `kapitel`, `an_mentoren`; `gruppe_id = null` |
| Lernzettel | `datei_pfad`, `datei_art`; lokal ausgewählte File, zugelassene MIME-Typen und vorhandener privater Bucket |
| Antwort | `beitrag_id`, `text`; Autor/ID/Zeit aus dem Server |
| Beste Antwort | Vorhandene RPC und `beste`, `geloest` |
| Entwurf | Arbeitsspeicher, an Konto gebunden; kein automatischer Lernstandsupload |

Keine neuen fachlichen Datenfelder für Dateiname, Profilbilder, Benachrichtigungen oder Gruppen. Alle Textlängen in UI und Datenschicht müssen mit SQL `char_length` übereinstimmen: Codepunkte, nicht UTF-16-Länge. Bestehende `veroeffentlichen()`/`antwortSchreiben()` zählen noch UTF-16 und sind dafür anzupassen. Kombinierte sichtbare Zeichen können mehrere Codepunkte sein; die Zählung ist keine Graphemzählung.

**Explizite technische Änderungswünsche:** serverseitige Paketsperre samt sicherer interner Ausnahme; idempotente Veröffentlichung/Antwort mit Statusprüfung; Kontobindung ganzer Schreibabläufe; sichere Behandlung von Uploads bei unklarem Ausgang; zusätzliche Serverprüfung für beste Antwort. Claude muss Datenmodell-, Rechte- und RPC-Anpassungen vor Umsetzung konkret benennen. Keine vorhandene Funktion fälschlich als fertig darstellen.

## 8. Barrierefreiheit

- Bestehende Gestaltung aus DESIGN/PRODUCT und C04/C05 fortsetzen; keine neue Formularwelt. Mobile zuerst, 320 px, 390 px und Desktop prüfen.
- Reihenfolge: Zurück, Art, Titel, Text, gegebenenfalls Datei, Lernfeld, Kapitel, Mentor:innen, Absenden, Abbrechen. Ausgeblendete Elemente sind nicht fokussierbar.
- Dauerhafte Labels, sichtbares „Pflicht“, passende `aria-required`/`aria-invalid` und mit Feld verknüpfte Hilfe/Fehler. Zähler nicht bei jedem Zeichen laut vorlesen lassen; Grenzverletzungen ankündigen.
- Nach fehlgeschlagenem Absenden Fokus auf Fehlerübersicht beziehungsweise erstes fehlerhaftes Feld. Korrektur aktualisiert Fehler ohne Fokusverlust.
- Native Dateiauswahl, Tastaturzugang, mindestens 44 × 44 px Tippziele. Auch mit Bildschirmtastatur bleiben Absenden/Abbrechen erreichbar; keine Fixleiste verdeckt Eingaben.
- Beim Öffnen der Antwort Fokus ins Feld. Nach erfolgreichem Senden neue Antwort verständlich ankündigen; keine unvermittelte Feed-Verschiebung bei fremden Änderungen.
- Dialoge mit Escape, Fokusbindung und Rückgabe. Lösungsmarkierung ist textlich erkennbar; nicht nur Gold oder Grün.
- Reduzierte Bewegung beachten. Echte Geräte, Screenreader und 200 % Text bleiben explizite Abnahmefälle; Headless-Chromium ersetzt sie nicht.

## 9. Offene Fragen an Lukes

1. **Fragen und Tipps:** Titel und Text verpflichtend, bei Lernzetteln Beschreibung optional? Empfehlung: ja; Frage als Standardart.
2. **Antworten:** direkt im Beitragsdetail statt einer neuen ganzen Seite; beste Antwort für den Fragesteller im selben Paket? Empfehlung: ja. Hilfreich und Bearbeiten/Löschen bleiben gesonderter Umfang.
3. **Paketsperre:** serverseitig standardmäßig geschlossen, nur benannte interne Testkonten zugelassen; öffnen erst nach komplettem Paket und deiner Freigabe? Empfehlung: ja. Claude konkretisiert die sichere technische Umsetzung.
4. **Verlässliches Senden:** nötige API-/RPC-Anpassungen für Kontobindung, Idempotenz und Statusprüfung freigeben, ohne neue fachliche Felder zu erfinden? Empfehlung: ja. Ein bloß gesperrter Button reicht bei verlorenen Antworten nicht.

### Abnahmefälle für Claude

Jede Art; Pflichtfelder; 120/121, 4000/4001 und 2000/2001 Codepunkte einschließlich Nicht-BMP-Zeichen; leerer/Whitespace-Text; Lernfeldwechsel mit Kapitel; Mentor:innen nur bei Frage; falscher MIME-Typ, exakt zulässige Größe und ein Byte darüber; kein Upload vor Absenden; Datei entfernen/Art wechseln; sichere Uploadbereinigung; verlorene Antwort nach erfolgreicher Anlage; Doppelklick und gleiche Vorgangskennung; Neuladen bei unklarem Ausgang; Konto-/Freigabewechsel zwischen Upload und Insert; Offline vor/während Versand; Teilfehler nach bestätigtem Erfolg; beste Antwort nur eigene sichtbare Frage und sichtbare Antwort; Markierung zurücknehmen; gesperrte Klasse via UI und direkter API, interne Testkonten erlaubter Umfang; 320 px/200 % Text/Tastatur/Screenreader/echte Bildschirmtastatur. Echte und simulierte Prüfungen getrennt ausweisen.

---

## Kopierbare Übergabe an Claude

> Gegenprüfung d56a4e0/a0954dc: Lernkern-Regression auf beiden Ständen 42/42, Funktionstest auf d56a4e0 264/265 wie berichtet. Profilcache-Rennen und späte Abmeldeantwort bestehen meine kontrollierten Gegenproben; angemeldeter Dateizugriff und Storage-Policy sind im Code passend, echte Supabase-Tests habe ich nicht erneut ausgeführt. Neuer Befund G01 zu A04: Bei Cache-Miss einer erwarteten Datei liefert der aktive Worker ungeprüft Netzwerkdaten aus einer anderen Fassung; im Chromium nach Löschung von lf13.html reproduziert. Bitte fail-safe behandeln und Regression für fehlenden Eintrag/fehlenden Cache ergänzen. G02 nur Community: Nach 150 geladenen Beiträgen, Detail Nr. 140 und Rückkehr erscheinen nur 120; Fokusziel fehlt. Bitte benötigte Seiten stabil nachladen und Regression ergänzen. Empfehlung an Lukes: Klausurauswertung nach Abgabe behalten; Test nach ausdrücklicher Entscheidung auf Auswertung/keine Uhr/erhaltene Selbstbewertung/neue Vorbereitung prüfen. Sicherungs- und Landingtexte passen grundsätzlich. Grenzen ergänzen, einschließlich G01/G02. Keine Merge-/Deployment-Freigabe. Spec 05 Version 1 liegt Lukes zur Entscheidung vor; sie fordert eine serverseitige Klassen-Beta-Sperre bis Schreiben/Antworten/Melden/Moderation und Voraussetzungen gemeinsam freigegeben sind. Entscheidungen trägt Lukes ein, Claude setzt nur freigegebenen Umfang um.
