# AzubiPass · Erweiterter Modus · Umsetzungsgrundlage

**Stand:** 27.10.2026 · **Verfasser/Rolle:** ChatGPT, Produktkonzept, Inhaltsentwurf und technische Spezifikation · **Empfänger:** Claude, Prüfung und Umsetzung.

**Anwendungsgrundlage:** `main` @ `f943f653e8cc41af4e53a4d83a31cbd90417d412`. **Dokumentationsbranch:** `spec/erweiterter-modus-2026-10-27`. Seitdem eventuell eingegangene Quelländerungen vor Umsetzung abgleichen. Diese Spezifikation ist keine Behauptung über eine bereits implementierte Funktion.

## 1. Auftrag und Einstieg für Claude

Lukes hat Modell 3 gewählt: **zusammenhängende Vertiefung mit gezieltem Einstieg**. Anschließend beauftragte er die möglichst weitgehende Vorbereitung, damit Claude die Idee prüfen und einfügen kann. Die bekannten Fachfehler werden von Claude später korrigiert; dieses Paket legt vor allem die neue Lern- und Darstellungsstruktur fest. Korrekturen und Erweiterung dürfen gemeinsam umgesetzt werden, müssen im Bericht aber erkennbar getrennt bleiben.

**Arbeitsauftrag:** Diese Spezifikation gegen den aktuellen Code prüfen, die drei ausgearbeiteten Musterabschnitte fachlich gegenlesen, einen schlanken kompatiblen Renderer integrieren und das Verhalten mit den Abnahmen unten prüfen. Tragfähige Details selbstständig umsetzen. Bei einem belegten Widerspruch eine konkrete bessere Lösung dokumentieren; keine erneute allgemeine Konzeptschleife. Die Muster sind redaktionelle Entwürfe, keine amtlich zertifizierten Unterrichtstexte.

**Lesereihenfolge:** Abschnitte 2–5 Produkt/Bedienung → 6–8 Daten/Integration → 9 drei Mustertexte → 10–12 Redaktion/Abnahme/Einführung. Begleitend: `abschnittsvertrag.entwurf.json`, `redaktionsplan-160-kapitel.csv`, `abnahme.json` im selben Ordner.

Es gibt keinen Auftrag zur Datenbankänderung, zu einer KI-Chatfunktion, zu einem neuen Abo oder zu einer neuen Lernstandsmetrik. Die Umsetzung gehört in die bestehenden Quellen und den normalen Build. Ein Merge/Deployment ist in dieser Vorbereitung nicht ausdrücklich neu beauftragt. Bestehende Projektregeln gelten; fremde Änderungen erhalten.

## 2. Bestätigte Wünsche und ausgearbeitete Vorgaben

| Status | Festlegung |
|---|---|
| Von Lukes ausdrücklich bestätigt | Der Modus vertieft vorhandenes Wissen und erklärt ausführlicher, wenn die normale Fassung nicht reicht. |
| Von Lukes ausdrücklich bestätigt | Nötige Grundlagen kurz erklären, zusätzlich bei Bedarf aufklappbar anbieten. |
| Von Lukes ausdrücklich bestätigt | Warum-Erklärungen, vollständig durchgearbeitete Beispiele, Vergleiche und Grafiken/Tabellen je nach Thema verwenden. |
| Von Lukes ausdrücklich bestätigt | Zuerst zusammenhängend lesen; zusätzliche Details und Sonderfälle aufklappbar. |
| Von Lukes bestätigte Modellrichtung | Modell 3: gezielter Einstieg am Abschnitt und Möglichkeit, das gesamte Kapitel ausführlich zu lesen; dieselben Inhalte für beide Wege. |
| Ausarbeitung von ChatGPT für die Umsetzung | Exakte Texte, Zustandsregeln, Datenvertrag, Suchverhalten, Sitzungsspeicherung, Pilotfolge und technische Abnahmen unten. Keine erfundenen wörtlichen Einzelentscheidungen von Lukes. |

**Leitfrage:** Hilft diese Vertiefung jemandem weiter, der den Grundtext bereits gelesen, aber noch nicht verstanden hat?

## 3. Zielbild und Inhaltshierarchie

Die kompakte Ansicht bleibt der schnelle Einstieg. Die ausführliche Ansicht entwickelt denselben Sachverhalt verständlicher: Einordnung, Erklärung und Begründung, vollständig gelöstes Beispiel, Interpretation. Grundlagen, Vergleiche, Sonderfälle und Verbindungen stehen genau dort optional bereit, wo sie gebraucht werden.

Die Redaktion nutzt ein Gerüst, die Oberfläche zeigt keinen zwanghaften Acht-Kästchen-Parcours. Überschriften werden nach dem Sachverhalt gewählt, beispielsweise „Warum der Rabatt zuerst kommt“ statt immer „Hintergrundwissen“. Nicht jedes Thema benötigt jeden Baustein. Ein organisatorischer Fall braucht keine erfundene Rechentabelle; eine Kalkulation dagegen darf nicht aus drei allgemeinen Sätzen bestehen.

### Drei Ebenen

1. **Kompakt:** Was ist die Regel oder Vorgehensweise? Der bestehende Überblick und seine Aufgaben bleiben zugänglich.
2. **Ausführlich:** Wie und warum funktioniert sie? Eine auch ohne Öffnen weiterer Kästen verständliche Darstellung mit vollständigem Muster.
3. **Bei Bedarf:** fehlende Grundlagen, nahe Gegenfälle, Grenzen und weitere Zusammenhänge. Die zentrale Erklärung darf nicht in diesen optionalen Elementen versteckt sein.

Keine starre Wortzahl, keine zwingenden vier Abschnitte pro Kapitel. Die Einheit der Überarbeitung ist zunächst der vorhandene Abschnitt, nicht ein neu erfundenes Parallelkapitel. Zusätzliche Pflichtinhalte aus dem Audit dürfen neue stabile Abschnitte erfordern; das wird fachlich begründet.

## 4. Bedienung und genaue Texte

### 4.1 Einstieg und Zustände

| Ort/Zustand | Sichtbarer Text | Aktion |
|---|---|---|
| Kapitelanfang, nicht alle vertiefbaren Abschnitte offen | **Ganzes Kapitel ausführlich lesen** | Öffnet die Hauptvertiefung aller verfügbaren Abschnitte; optionale Grundlagen/Sonderfälle bleiben zu. |
| Kapitelanfang, alle vertiefbaren Abschnitte offen | **Ganzes Kapitel kompakt lesen** | Schließt die Hauptvertiefungen; Eingaben und Ergebnisstände bleiben erhalten. |
| An einem kompakten Abschnitt | **Ausführlicher verstehen** | Öffnet nur diesen Abschnitt. |
| An einem vertieften Abschnitt | **Kompakt anzeigen** | Schließt nur diesen Abschnitt. |
| Gemischtes Kapitel | **2 von 4 Abschnitten ausführlich geöffnet** | Neutrale Information, kein Fortschritt und kein Lernzielzähler. |
| Optionaler Inhalt | **Grundlagen nachlesen: …** / **Fälle vergleichen: …** / **Sonderfall verstehen: …** / **Zusammenhang entdecken: …** | Öffnet diesen Inhalt inline. Mehrere dürfen gleichzeitig geöffnet sein. |
| Verständnisfrage | **Antwort anzeigen** / **Antwort ausblenden** | Zeigt die begründete Antwort ohne Punkte oder Pflicht-Eingabe. |

Der Abschnittsschalter steht unmittelbar unter seiner Überschrift. Der Kapitelschalter bleibt oben, ohne neue dauerhaft schwebende Leiste. Für lange Vertiefungen darf ein zweiter Rückschalter am Abschnittsende stehen; beide steuern denselben Zustand und erhalten eindeutige barrierefreie Namen.

**Vorbereitung eines typischen Wegs:** Kapitel kompakt öffnen → unklaren Abschnitt vertiefen → im laufenden Text eine Tabelle lesen → bei Bedarf eine Grundlage öffnen → zum Haupttext zurückkehren → Abschnitt wieder kompakt anzeigen. Keine zweite Seite und kein verpflichtender Übungsdurchlauf.

### 4.2 Öffnen, Schließen und Orientierung

- Erster regulärer Aufruf startet kompakt. Individuelle Öffnungen innerhalb derselben laufenden Lernfeldseite bleiben beim Kapitelwechsel in dieser Sitzung erhalten. Kein neuer Sync-/Lernstandseintrag dafür erforderlich; nach vollständigem Neuladen wieder kompakt, außer ein konkreter Such-/Direktlink verlangt Öffnung.
- Optionale Inhalte werden beim Zuklappen ihres Hauptabschnitts ebenfalls geschlossen. Bei erneutem Öffnen bleiben sie geschlossen. Neue Lernende sollen nicht mit einer unkontrollierten Detailwand starten.
- Ein Klick verschiebt die Seite nicht zum Kapitelanfang. Beim Öffnen bleibt die Abschnittsüberschrift an derselben wahrnehmbaren Position. Beim Schließen aus einem langen Inhalt heraus wird zur sichtbaren Abschnittsüberschrift beziehungsweise zum auslösenden Schalter orientiert.
- Muss ein fokussierter Bereich verborgen werden, wandert der Fokus zuerst zum zugehörigen sichtbaren Schalter. Keine Tastaturposition in verstecktem Inhalt zurücklassen.
- „Ganzes Kapitel ausführlich“ öffnet alle verfügbaren Hauptvertiefungen, aber keine Musterlösungen und keine optionalen Details.
- Kapitel ohne vertiefbaren Inhalt erhalten keinen wirkungslosen Schalter. Ein teilweise überarbeitetes Kapitel benennt verfügbare Abschnitte korrekt; kein Lernendenhinweis mit technischen Begriffen wie Schema-Version.
- Ein vorhandenes Legacy-Zusatzfeld kann weiterhin über den bekannten Mechanismus genutzt werden. Nur neu redigierte Abschnitte werden als vollständige, nicht redundante Ersatzdarstellung des erklärenden Textes behandelt.

### 4.3 Fortschritt, Aufgaben und Berufstrennung

Öffnen ist kein Verstehenstest. Der Ansichtswechsel verändert weder Antworten noch Punkte, Karteifächer oder bestehende Lernzielkennungen. Kein zusätzlicher „Ausführlich abgeschlossen“-Status.

Vorhandene Grafiken, Checks und Selbsttests werden funktional weiterverwendet, nicht als zweite Übung geklont. Eine Grafik mit veränderlichen Eingaben behält ihre Werte auch beim Ansichtswechsel. Die gemeinsame Lernstandsquelle bleibt die bestehende.

Der Inhaltsschlüssel besteht aus **Beruf + Lernfeld + Kapitel + Abschnitt**. Ein KfB-Abschnitt darf nicht die Öffnung oder Daten eines gleich benannten IK-Abschnitts übernehmen. Sessionzustände müssen beim Konto-/Berufswechsel korrekt abgegrenzt werden; keine neue Umgehung bestehender Kontogrenzen.

## 5. Gestaltung und Zugänglichkeit

Bestehende AzubiPass-Welt verwenden: Royal Green `#1B4332`, Deep Green `#12301F`, Warm Cream `#F5F5F0`, bestehende Serifenschrift für Lernen und Sans für Bedienung. Gold dient als Akzent. Für kleine Schrift die bereits vorhandene dunklere Goldtextfarbe verwenden, nicht ungeprüft das Logo-Gold. Verbindliche Referenz: `doku/marke/README.md` und vorhandene CSS-Variablen. Kein neues Logo, keine zusätzlichen Illustrationswelten erforderlich.

- Haupttext bleibt eine ruhige Lesespalte. Aufklappbare Vertiefungen sind zurückhaltend abgegrenzt, keine gleichförmige Ansammlung großer farbiger Karten.
- Tabellen enthalten klare Kopfzellen, Einheiten und lesbare Zahlen. Am Handy darf ausschließlich eine klar erkennbare Tabellenregion horizontal scrollen; die gesamte Seite bleibt innerhalb der Breite. Zentrale Ergebniswerte zusätzlich in einem Satz erklären.
- Diagramme brauchen beschriftete Achsen/Einheiten und eine textliche Aussage. Für exakte Zahlen Diagramme aus Daten erstellen, keine generierten Bildgrafiken als Rechenbeleg.
- Schalter sind echte Buttons oder passende native Disclosure-Elemente mit zugänglichem Namen und korrekt abgebildetem Zustand. Native Semantik nicht mit widersprechenden ARIA-Attributen überbauen.
- Vollständig mit Tastatur nutzbar, sichtbarer Fokus, ausreichend große Tippziele nach bestehenden Projektprüfungen; nicht nur durch Farbe unterscheiden.
- Bei reduzierter Bewegung keine erzwungene Scrollanimation. Automatische Animationen sind für das Lesen nicht nötig.
- Ohne JavaScript muss der Grundinhalt lesbar bleiben. Für bereits gelieferte Vertiefungen nach Möglichkeit native aufklappbare Fallbacks anbieten, statt alle Details dauerhaft unzugänglich zu verstecken. Kein leeres Lernkapitel, wenn eine neue Interaktion fehlschlägt.

## 6. Bestehender Code und technische Anschlussstellen

Diese Stellen wurden gelesen; sie sind Ausgangspunkte, keine pauschale Erlaubnis zur Neuorganisation des Lernkerns:

| Stelle | Ist-Zustand | Nötige Änderung |
|---|---|---|
| `quellen/build.py`, `_ausfuehrlich_karte` | Ordnet `ausfuehrlich.abschnitte` vorhandenen Abschnitts-IDs zu. | Neues Format erkennen, Altformat weiter verarbeiten, fehlende/widersprüchliche Referenzen prüfen. |
| `quellen/build.py`, `detail_zusatz` | Rendert feste Textfelder als Überschriften/Absätze. | Strukturierten Text, Tabellen, Rechenschritte, Vergleiche, Referenzen, optionale Details und Fragen getrennt rendern. |
| `quellen/build.py`, `kapitel` | Grundblöcke plus Zusatz; ein Kapitelschalter. | Abschnittsschalter und zusammengesetzte Zustände; neue Abschnitte ohne direkt wiederholten Grundtext. |
| `quellen/azubipass.js`, `langfassung` | Öffnet alle `.detail-zusatz` eines Kapitels. | Zentrale Zustandsfunktion für Abschnitt/Kapitel und Fokus-/Scrollbehandlung. |
| `quellen/azubipass.css` | Vorhandene Detailstile, `[hidden]` global. | Ruhige Darstellung und Tabellen/Disclosure; kein ungültiger Fokus in verborgenen Gruppen. |
| `quellen/build_app.py`, `suche_sammeln` | Liest nur Grundblöcke, ein Treffer je Abschnitt. | Sichtbare Langtexte/optionale Erklärungen zusätzlich indexieren und zielgerichtet öffnen. |
| `doku/kapitel-format.md` | Beschreibung des bestehenden Quellenformats. | Dort neues Format und Migration dokumentieren; keine zweite widersprechende Formatspezifikation dauerhaft pflegen. |
| Build/Offline-Dateien | Bestehende Pipeline erzeugt `docs/`. | Regulär neu bauen und Cacheversion aktualisieren; `docs/` nicht von Hand ändern. |

**Wichtiger Befund:** Der jetzige Modus ergänzt Grundtext, er ersetzt ihn nicht. Das darf für Altbestand bleiben. Bei neu redigiertem Inhalt braucht es ausdrücklich die Kennzeichnung „vollständige Vertiefung“; sonst kann nicht sicher entschieden werden, ob versteckter Grundtext inhaltlich fehlen würde.

## 7. Datenvertrag als konkreter Entwurf

Die Datei `abschnittsvertrag.entwurf.json` enthält einen vollständigen Referenzentwurf für den Rechenpilot. Sie liegt absichtlich in `doku/`, nicht in `quellen/`: Claude prüft den Vertrag vor Einbau gegen vorhandenen Renderer und bevorzugt bestehende Blocktypen, wenn deren Semantik passt.

### 7.1 Trennung von Vollfassung und Altzusatz

Neues optionales Formatkennzeichen unter `ausfuehrlich`, beispielsweise `format: 2`. Jeder neue Eintrag verweist mit `abschnitt` auf die **bestehende** Abschnitts-ID und kennzeichnet `darstellung: vollfassung`. Ohne diese ausdrückliche Kennzeichnung gilt weiter Legacy-Zusatzverhalten. Ein strukturell ungültiger Format-2-Eintrag fällt nicht still auf leeren Text zurück: Build mit klarer Fundstelle abbrechen.

| Feld | Bedeutung / Regel |
|---|---|
| `abschnitt` | Existierende Abschnitts-ID; keine Umbenennung alter Lernziele. |
| `darstellung` | `vollfassung`: Haupttext kann erklärenden Kurztext ersetzen. Legacy unverändert zusätzlich. |
| `vorwissen_kurz` | Kurze, sichtbare Einordnung. Kein langes Eingangstor vor der eigentlichen Erklärung. |
| `inhalt[]` | Geordnete Hauptdarstellung; Reihenfolge ist Lesereihenfolge. |
| `typ`/`id` | Blockart und stabile, semantische ID; keine Position als dauerhafte Kennung. |
| `details[]` | Optionaler Inhalt mit stabiler ID, Kategorie, individuellem Titel und geordneten Inhaltsblöcken. |
| `verstaendnisfragen[]` | Frage und Antwort in getrennten Feldern; Hilfen optional, keine automatische Benotung. |
| `quellen[]` | Primärquelle und sachlicher Bezug; bei dynamischen Werten Datenstand, Abrufdatum und Geltungsbereich. |
| `basis_erhalten[]` | Manifest gemeinsam weiterverwendeter bestehender Inhalte, besonders Grafiken/Checks. Referenzen eindeutig auflösen. |

**Vorgeschlagene Hauptblockarten:** Absatz, Zwischenüberschrift, Tabelle, Rechenweg, Fallvergleich, gemeinsame Bestandsreferenz und Verweis. Keine freie HTML-Eingabe notwendig. Ein Rechenweg enthält Ausgangsdaten, einzelne Operationen, Ergebnis/Einheit und Begründung; eine Tabelle enthält echte Überschriften, Zellen und gegebenenfalls erklärenden Schluss. Inline-Begriffs-/Paragraphenverweise aus dem bestehenden Format weiterverwenden. Neue Strukturen nicht als Python-/JSON-Objektzeichenkette im Absatz ausgeben.

Für optionale Details dieselben sicheren Blockarten verwenden; keine rekursiv beliebig tief verschachtelten Klappkästen. Im ersten Schritt eine Ebene Details plus darin aufklappbare Antwort genügt. Quellenanker und Details erhalten stabile, berufsbezogen eindeutige Zielkennungen.

### 7.2 Bestehende Interaktionen einmal erhalten

Vor Migration jedes Pilotabschnitts vorhandene Grundblöcke inventarisieren: reine Erklärprosa, Tabelle/Schema, Grafik/Check/Zuordnung und sonstige Referenz. Die vollständige Vertiefung darf **nur** eindeutig ersetzte Erklärinhalte verdrängen. Alle alten Übungen und interaktiven Grafiken bleiben genau einmal im DOM beziehungsweise in der funktionalen Instanz erhalten.

Die genaue Gruppierung kann Claude schlank an die heutige Renderstruktur anpassen. Verbindlich sind diese Invarianten:

- Bereits erzeugte Kennungen für Übungen/Karten nicht durch neue Blockreihenfolge verschieben. Zähler zur Erzeugung bestehender IDs werden weiter aus der ursprünglichen Reihenfolge abgeleitet, nicht aus einer gefilterten Teilansicht.
- Ein gemeinsamer Grafik-/Checkblock behält seine Instanz und Daten; kein neues Canvas oder Reset beim Umschalten.
- Kein verschachteltes `hidden`, das einen gemeinsam benötigten Block unabsichtlich mitversteckt.
- Keine doppelte DOM-ID und keine zwei gespeicherten Antworten auf dieselbe Aufgabe.
- Ein referenzierter gemeinsamer Block wird nicht zusätzlich in der Langfassung dupliziert. Der Langtext kann darauf hinführen; auch bei unterschiedlicher Absatzlänge bleibt der Block eindeutig zugeordnet.
- Altabschnitte werden nicht durch bloße Wortähnlichkeit automatisch zerlegt oder in Vollfassungen umgewandelt.

**Konkreter Altbestand:** `grafik()` rendert heute eine `.sig` mit `data-grafik`, ohne die vom Blockzähler berechnete eigene DOM-Kennung auszugeben. Karten und Checks besitzen dagegen echte bestehende IDs. Der Vertragsentwurf unterscheidet daher alte DOM-IDs von neu zu vergebenden gemeinsamen Grafikschlüsseln. Eine nicht existierende Grafik-ID darf nicht als Integrationsbeleg vorausgesetzt werden.

Wenn die verlustfreie gemeinsame Darstellung im ersten Pilot nicht belegt werden kann, zunächst den bestehenden Zusatzmodus für diesen Abschnitt behalten und die konkrete Ursache dokumentieren. Keine pauschale Umschaltung aller 160 Kapitel durch ein neues Flag.

### 7.3 Suche und Links

Die vorhandenen Links wie `lf4.html#k3-b1` bleiben gültig. Bestehende Fragmentrouten nicht neu interpretieren oder durch ein zweites Hashsystem ersetzen. Als kompatible Erweiterung sind Suchparameter vor dem bestehenden Fragment möglich, etwa `lf4.html?ansicht=ausfuehrlich&detail=b1-skonto-bedingung#k3-b1`; die konkrete Schreibweise ist Vorschlag und muss mit dem bestehenden Router abgestimmt werden.

Suchindex unterscheidet Hauptvertiefung, optionales Detail und Frage. Ein Treffer auf einen Detailtext öffnet zunächst das Kapitel, den Abschnitt und das betroffene Detail; ein Treffer auf eine Verständnisfrage verrät nicht sofort deren Antwort. Antworten werden in Version 1 nicht als separate Suchergebnisse indexiert, damit die Suche keine Lösungen vorwegnimmt. Sichtbare Erklärungen/Gegenfälle hingegen sind durchsuchbar.

Ein Treffer darf nicht in geschlossenem Inhalt landen. Unbekannte Detailkennung öffnet den gültigen Abschnitt ohne Fehler; kein fremder Beruf wird wegen eines ähnlichen Schlüssels gewählt. URLs dürfen keine Antworten oder Kontodaten enthalten. Suchdatensätze und HTML werden aus derselben Quelle gebaut.

### 7.4 Offline, Aktualität und Quellen

Alle nötigen Erklärungen, Tabellen und lokalen Darstellungen werden mit der App ausgeliefert. Kein Netzabruf beim Aufklappen. Externe Quellenlinks können offline unerreichbar sein; der Lerntext bleibt vollständig.

Eine Korrektur aktueller Regeln muss Kurztext, Vollfassung, gemeinsame Begriffe, Karten und Aufgaben konsistent halten. Dynamische Werte nach Quelle/Jahr/Geltungsbereich führen; keine zweite lose Kopie in der Vollfassung. Offene redaktionelle Fragen gehören in die Übergabe; ein sachlich notwendiger Standhinweis für Lernende darf bleiben. Das bloße Entfernen eines „Zu prüfen“-Kastens schließt keine Fachlücke.

## 8. Qualitätsregeln für Redaktion und Musterübernahme

**Ein Abschnitt ist erst fertig, wenn:** eine echte Verständnisfrage identifiziert ist; notwendige Begriffe erklärt sind; die Begründung über den Kurztext hinausführt; das Muster vollständig und kontrollierbar ist; Grenzen erkennbar sind; keine falsche Immer-Regel entsteht; Quelle/Geltungsbereich klar sind.

Musterbetrieb MAKEL weiterverwenden. Zahlen in den folgenden drei Piloten sind ausdrücklich **fiktive Übungsdaten** und ändern keine Unternehmensstammdaten. Niemand muss für die Erklärung die Personalliste auswendig kennen. Jede größere Themenstrecke erhält später mindestens einen Transfer auf einen anderen passenden betrieblichen Kontext. Keine neue erfundene Gesetzesregel und keine ungeprüfte Jahreszahl ergänzen.

Es muss nicht jede Vertiefung einen neuen benoteten Fall enthalten. Musterfälle erklären; Verständnisfragen laden zum Nachdenken ein; der vorhandene Simulator bleibt für bewertete Aufgaben zuständig. Neue Aufgaben nur dann, wenn sie einen sinnvollen Kompetenznachweis ergänzen, mit eigener stabiler ID und fachlicher Bewertung.

## 9. Drei ausgearbeitete Musterabschnitte

Die folgenden Texte sind konkrete redaktionelle Einfügevorlagen, keine bloßen Inhaltsüberschriften. Zwischenüberschriften gehören zum Haupttext. Mit „Optional“ markierte Teile sind geschlossen, Antworten stehen getrennt. Claude darf Begriffssyntax und Quellenanker an das bestehende Format anpassen; Bedeutung und Voraussetzungen erhalten.

### Pilot A · Rechnen · KfB LF 4 K3 b1 · Angebote auf dieselbe Grundlage bringen

**Ziel:** Du kannst erklären, weshalb der Listenpreis nicht ausreicht, und aus Rabatt, nutzbarem Skonto und Bezugskosten einen vergleichbaren Bezugspreis berechnen.

**Kurzes Vorwissen:** Ein Prozentwert bezieht sich immer auf einen bestimmten Grundwert. In diesem vereinfachten Vergleich betrachten wir Nettobeträge; MAKEL ist im Fall zum vollen Vorsteuerabzug berechtigt. Die Umsatzsteuer wird deshalb nicht als Kostenbestandteil in diesen Nettopreisvergleich aufgenommen. Andere Steuer- und Auslandssachverhalte sind hier nicht unterstellt.

**Warum der günstigste Listenpreis nicht immer gewinnt**

Ein Angebot nennt zunächst einen Preis. Wie viel die Beschaffung den Betrieb tatsächlich kostet, hängt aber auch von den Bedingungen ab. Ein Lieferant kann einen Rabatt gewähren, ein anderer den Transport bereits einschließen. Ein scheinbar günstiger Preis kann durch zusätzliche Fracht teurer werden. Deshalb vergleichen wir nicht einzelne auffällige Zahlen, sondern bringen beide Angebote auf denselben Umfang und dieselbe Berechnungsgrundlage.

Zuerst prüfst du, ob Ware, Menge, Qualität und Lieferleistung überhaupt vergleichbar sind. Erst danach rechnest du. Der Bezugspreis, auch Einstandspreis genannt, berücksichtigt im folgenden Grundfall den Liefererrabatt, einen tatsächlich nutzbaren Liefererskonto und die zusätzlichen Bezugskosten. Die Zahl ersetzt nicht die spätere Prüfung von Qualität, Zuverlässigkeit und Nachhaltigkeit.

**Ein vollständiger Vergleich bei MAKEL**

MAKEL benötigt 100 gleichartige Rohlinge. Beide Lieferanten bieten dieselbe Qualität, Menge und Lieferfrist. Alle Beträge sind netto und gelten für die gesamte Menge. Bei A sind 1.000 € Listenpreis, 10 % Rabatt und 2 % Skonto innerhalb von zehn Tagen vereinbart. Die Fracht kostet zusätzlich 40 € und ist ausdrücklich nicht skontierbar. B verlangt 930 € einschließlich Transport; Rabatt und Skonto gibt es dort nicht. Für den Grundfall kann MAKEL A rechtzeitig bezahlen.

| Rechenschritt | Warum dieser Schritt? | Angebot A |
|---|---|---:|
| Listeneinkaufspreis | Vereinbarter Ausgangswert | 1.000,00 € |
| Rabatt: 1.000 × 10 % | Sofortiger Nachlass auf den Listenpreis | −100,00 € |
| Zieleinkaufspreis | Grundlage für den hier vereinbarten Skonto | 900,00 € |
| Skonto: 900 × 2 % | Die Frist wird im Grundfall tatsächlich genutzt | −18,00 € |
| Bareinkaufspreis | Warenpreis nach den beiden Nachlässen | 882,00 € |
| Fracht | Zusätzlich, laut Fall nicht skontierbar | +40,00 € |
| **Bezugspreis** | **Vergleichbarer Gesamtbetrag** | **922,00 €** |

Bei B beträgt der Bezugspreis 930 €. A ist damit im Grundfall 8 € günstiger. Je Rohling sind das 9,22 € gegenüber 9,30 €. Die Einheitenkontrolle ist wichtig: Du darfst den Gesamtpreis des einen Angebots nicht mit dem Stückpreis des anderen vergleichen.

**Warum werden Rabatt und Skonto nicht einfach addiert?**

Die beiden Prozentsätze haben unterschiedliche Grundwerte. Der Rabatt wird hier aus 1.000 € berechnet. Danach bleiben 900 €; nur auf diese 900 € werden die 2 % Skonto angewendet. Wer insgesamt 12 % von 1.000 € abzieht und dann 40 € Fracht addiert, erhält 920 € und zieht 2 € zu viel ab. Die scheinbar kleine Abweichung zeigt einen Denkfehler, der bei größeren Mengen erheblich werden kann.

**Was das Ergebnis für die Entscheidung bedeutet**

Du kannst jetzt eine präzise Aussage treffen: Unter den genannten, vergleichbaren Bedingungen und bei fristgerechter Zahlung ist A rein preislich günstiger. Ob MAKEL A auswählt, hängt zusätzlich etwa von Lieferzuverlässigkeit und Qualitätsanforderungen ab. Der Satz „A ist immer günstiger“ wäre aus dieser Rechnung nicht ableitbar.

**Optional – Grundlagen nachlesen: Prozentwert und Grundwert**

10 % bedeuten zehn von hundert. Bei einem Grundwert von 1.000 € entsprechen sie 100 €. Nach dem Rabatt hat sich der Grundwert für den nächsten Nachlass verändert: 2 % von 900 € sind 18 €, nicht 20 €. Schreibe bei jeder Prozentrechnung den Grundwert daneben; dann erkennst du, welche Zahl tatsächlich mit dem Prozentsatz verknüpft wird.

**Optional – Fälle vergleichen: MAKEL kann die Skontofrist nicht nutzen**

Ohne Skonto kostet A 900 € plus 40 € Fracht, also 940 €. B bleibt bei 930 €. Nun ist B rein preislich 10 € günstiger. Genau deshalb darf ein möglicher Skonto nicht bedingungslos als sichere Ersparnis eingeplant werden. Ob eine Finanzierung zur Skontonutzung wirtschaftlich wäre, ist eine zusätzliche Frage; dafür müssen die Kreditkosten bekannt sein.

**Optional – Sonderfall verstehen: Welche Beträge sind skontierbar?**

Unser Fall legt ausdrücklich fest, dass die Fracht nicht skontierbar ist. In einem anderen Vertrag kann die Bemessungsgrundlage anders geregelt sein. Dann wird nicht dieselbe Zahl mechanisch weiterverwendet, sondern zuerst die vereinbarte Skontobasis bestimmt. Das Rechenschema hilft nur, wenn seine Eingaben zum Vertrag passen.

**Optional – Zusammenhang entdecken: Liquidität und Lieferantenentscheidung**

Die Bezugskalkulation fragt nach den Kosten. Die Liquiditätsplanung fragt, ob MAKEL den Betrag zum richtigen Zeitpunkt zahlen kann. Beide Antworten werden für eine gute Entscheidung benötigt. Weiterführende Inhalte: LF9 K1 Liquidität; LF4 K3 b3 qualitative Lieferantenauswahl. Verweise nur erzeugen, wenn die Ziele im aktuellen Bestand tatsächlich vorhanden sind.

**Verständnisfrage A1:** Warum beziehen sich die 2 % Skonto auf 900 €?

**Zunächst verborgene Antwort:** Weil der Rabatt den Warenpreis schon auf 900 € reduziert hat und laut Fall dieser Zieleinkaufspreis die Skontobasis ist. Die nicht skontierbare Fracht wird anschließend addiert.

**Verständnisfrage A2:** Welche Änderung lässt B in unserem Vergleich günstiger werden?

**Zunächst verborgene Antwort:** Wenn MAKEL A nicht innerhalb der Skontofrist bezahlt, steigt dessen Bezugspreis auf 940 €. B kostet unverändert 930 € und ist dann 10 € günstiger.

**Redaktioneller Schluss:** Als Darstellungsfamilie Tabelle und kommentierter Rechenweg verwenden. Die vorhandene interaktive Kalkulationsdarstellung bleibt gemeinsam erreichbar, wenn ihre Daten zu den Beispielannahmen passen; unterschiedliche Beispielwerte ausdrücklich kennzeichnen. Keine bestehenden Karten/Checks automatisch aus diesem Text neu erzeugen. Fachlicher Stand: mathematisches Modell mit fest vorgegebenen Bedingungen, kein jährlicher Beitragssatz.

### Pilot B · Recht · KfB LF 3 K2 b2 · Wann aus zwei Erklärungen ein Vertrag wird

**Ziel:** Du kannst eine unveränderte Annahme von einem neuen Antrag unterscheiden und deinen Schluss an den konkreten Erklärungen begründen.

**Kurzes Vorwissen:** Für unseren vereinfachten B2B-Fall handeln die Beteiligten wirksam und mit ausreichender Vertretungsmacht. Die Erklärungen sind eindeutig, gehen rechtzeitig zu, und das Angebot enthält die wesentlichen Bedingungen. Streit über AGB, Schweigen, kaufmännische Bestätigungsschreiben oder Sonderregeln ist nicht Gegenstand des Grundfalls.

**Warum eine Antwort noch keine Annahme sein muss**

Ein Vertrag setzt übereinstimmende Willenserklärungen voraus. Der Antrag beschreibt ein Geschäft so bestimmt, dass die andere Seite es annehmen kann. Entscheidend ist nicht, dass zwei Schreiben ähnlich aussehen oder beide Seiten grundsätzlich handeln möchten. Sie müssen sich über dasselbe Geschäft einig sein.

Ein verbindliches Angebot ist deshalb etwas anderes als eine Frage nach Preisen. Mit „Was würden 100 Hoodies kosten?“ erkundigt sich ein Kunde zunächst. Mit einem eindeutig verbindlichen Angebot werden dagegen bestimmte Bedingungen zum Vertragsschluss vorgeschlagen. Die Bezeichnung des Schreibens kann ein Hinweis sein; ausschlaggebend bleibt sein Inhalt.

**Der Grundfall: eine eindeutige Zustimmung**

MAKEL bietet einer Agentur verbindlich 100 genau bezeichnete Hoodies für 40 € netto je Stück an. Im Angebot steht eine Annahmefrist bis Freitag und ein bestimmter Liefertermin. Die Agentur antwortet am Mittwoch: „Wir nehmen Ihr Angebot über 100 Hoodies unverändert an.“ Die Antwort geht MAKEL am selben Tag zu. Im beschriebenen Fall liegt eine rechtzeitige, inhaltlich passende Annahme vor. Die Erklärungen stimmen überein; der Vertrag ist geschlossen.

**Der Vergleichsfall: Zustimmung mit anderer Menge**

Die Agentur antwortet stattdessen: „Wir bestellen 120 Hoodies zu den angebotenen Bedingungen.“ Jetzt passt die Menge nicht mehr zum Antrag über 100 Stück. Die Antwort nimmt deshalb nicht einfach das ursprüngliche Angebot an. Sie lehnt es rechtlich verbunden mit einem neuen Antrag ab. MAKEL muss erst entscheiden, ob es 120 Stück zu diesen Bedingungen liefern möchte. Erst eine passende Annahme dieses neuen Antrags schließt den Vertrag über 120 Stück.

| Erklärung der Agentur | Einordnung im beschriebenen Fall | Was folgt? |
|---|---|---|
| „100 Stück, unverändert wie angeboten“ | Rechtzeitige Annahme | Vertrag über 100 Stück |
| „120 Stück zu diesen Bedingungen“ | Abändernde Antwort, neuer Antrag | Noch kein Vertrag über 120 Stück |
| „Könnten Sie alternativ auch 120 Stück anbieten?“ | Nachfrage ohne eindeutig erklärte Annahme | Inhalt klären; nicht automatisch als Vertrag buchen |

**So begründest du deine Entscheidung**

Lege die Erklärungen nebeneinander. Benenne zunächst den ursprünglichen Antrag: Wer schlägt wem welches Geschäft vor? Prüfe dann, ob die Antwort wirksam, rechtzeitig und inhaltlich unverändert ist. Markiere Abweichungen bei Menge, Preis, Ausführung oder sonstigen Bedingungen. Schließe mit einem konkreten Ergebnis: Wer muss noch welche Erklärung abgeben, damit das gewünschte Geschäft zustande kommt?

Das ist hilfreicher als der Satz „Eine Auftragsbestätigung macht den Vertrag.“ Ob eine solche Bestätigung etwas annimmt, etwas ändert oder nur einen schon bestehenden Vertrag dokumentiert, hängt vom vorherigen Ablauf und ihrem Inhalt ab.

**Optional – Grundlagen nachlesen: Anfrage und Antrag**

Eine Anfrage soll Informationen beschaffen und zeigt im gewöhnlichen Grundfall noch keinen Bindungswillen. Ein Antrag ist dagegen auf den Abschluss eines bestimmten Vertrags gerichtet. Deshalb darf eine Lernaufgabe nicht erst „MAKEL fragt an“ schreiben und diese Erklärung anschließend ohne weitere Angaben als verbindlichen Antrag behandeln. Bei mehrdeutigem Wortlaut braucht es Auslegung beziehungsweise zusätzliche Sachverhaltsangaben.

**Optional – Fälle vergleichen: Annahmefrist verpasst**

Ein ausdrücklich bis Freitag befristetes Angebot kann nicht beliebig lange angenommen werden. Eine verspätete Annahme gilt grundsätzlich als neuer Antrag. Sonderregeln, etwa bei erkennbar ungewöhnlicher Beförderungsverzögerung, gehören in einen eigenen fortgeschrittenen Fall; sie dürfen den Grundfall nicht unklar machen.

**Optional – Sonderfall verstehen: Darf die Agentur einfach schweigen?**

Im hier beschriebenen gewöhnlichen Fall ersetzt Schweigen keine eindeutige Annahme. Daraus folgt jedoch keine grenzenlose Regel für jede kaufmännische Konstellation. Wenn ein Fall auf besondere Handelsbräuche oder ein kaufmännisches Bestätigungsschreiben abstellt, muss genau dieser zusätzliche Sachverhalt geprüft werden.

**Optional – Zusammenhang entdecken: Vertrag und Auftragsbearbeitung**

Ein sauber erfasster Auftrag braucht eine gesicherte Vertragsgrundlage. Sonst kann die Produktion 120 Stück vorbereiten, obwohl nur ein Angebot über 100 Stück abgegeben wurde. Die rechtliche Prüfung vermeidet damit unmittelbar organisatorische Fehler. Weiterführendes Ziel: LF3 K4 Bestellung und Auftragsbestätigung.

**Verständnisfrage B1:** Warum führt „120 statt 100“ nicht automatisch zum Vertrag über 120 Stück?

**Zunächst verborgene Antwort:** Weil MAKEL zunächst nur 100 Stück angeboten hat. Die abweichende Antwort ist ein neuer Antrag. MAKEL muss diesen erst annehmen; die bloße Ähnlichkeit der Bedingungen ersetzt die Zustimmung nicht.

**Verständnisfrage B2:** Welche drei Punkte prüfst du vor deinem Ergebnis?

**Zunächst verborgene Antwort:** Den ursprünglichen Antrag, die inhaltliche Übereinstimmung der Antwort und die Rechtzeitigkeit beziehungsweise die einschlägige Annahmefrist. Die im Grundfall vorausgesetzte Wirksamkeit/Vertretungsmacht bleibt als Voraussetzung erkennbar.

**Quellen für Claude:** BGB §§ 145, 147, 148, 150; § 149 für den gezielt abgegrenzten Versandsonderfall. Primärseiten am 27.10.2026 geprüft, §§ 145/150 über den amtlichen Suchindex und Gesamtgesetz, §147 direkt: https://www.gesetze-im-internet.de/bgb/__145.html · https://www.gesetze-im-internet.de/bgb/__147.html · https://www.gesetze-im-internet.de/bgb/__148.html · https://www.gesetze-im-internet.de/bgb/__150.html . Vor Übernahme gegen aktuellen Rechtsstand bestätigen. Gesetz nicht ungekürzt in mehreren Textfeldern duplizieren.

### Pilot C · Organisation · KfB LF 2 K2 b2 · Wichtigkeit und Dringlichkeit auseinanderhalten

**Ziel:** Du kannst Aufgaben anhand ihrer Folgen und Fristen priorisieren und erklären, wann du selbst handeln oder Zuständigkeiten klären musst.

**Kurzes Vorwissen:** Dringlichkeit beschreibt zeitlichen Handlungsdruck. Wichtigkeit beschreibt den Beitrag zu relevanten Zielen oder die Folgen einer Nichterledigung. Für den Fall zählt nicht nur dein persönliches Interesse, sondern der betriebliche Auftrag und deine Rolle.

**Warum das Lauteste nicht immer zuerst kommt**

Im Büro können mehrere Aufgaben gleichzeitig Aufmerksamkeit verlangen: Eine Nachricht erscheint als „dringend“, das Telefon klingelt, und eine Auswertung ist erst nächste Woche fällig. Wer ausschließlich auf Unterbrechungen reagiert, beginnt die Auswertung möglicherweise erst dann, wenn kaum Zeit übrig ist. Die Aufgabe war schon vorher wichtig; sie war nur noch nicht unmittelbar dringend.

Die Eisenhower-Matrix hilft, diese zwei Fragen getrennt zu beantworten. Zuerst: Welche Folgen hat es, wenn die Aufgabe nicht erledigt wird? Danach: Bis wann muss etwas geschehen, und welche Vorarbeiten brauchen Zeit? Erst dann wählst du eine Handlung. Die Matrix ist eine Entscheidungshilfe, kein automatischer Ersatz für Fachwissen oder betriebliche Zuständigkeit.

**Ein Vormittag bei MAKEL**

Du unterstützt die Verwaltung. Vier Aufgaben liegen vor: Eine sachlich geprüfte Rechnung muss heute zur zuständigen Freigabe, damit die vereinbarte Skontofrist genutzt werden kann. Eine Präsentation für neue Auszubildende ist in zwei Wochen fällig; für sie fehlen noch Angaben aus zwei Abteilungen. Eine Rückfrage zur Bewirtung soll heute weitergeleitet werden. Alte, nicht mehr verwendbare Werbeprospekte sollen irgendwann sortiert werden.

| Aufgabe | Begründete Einordnung | Nächste Handlung in deiner Rolle |
|---|---|---|
| Rechnung zur heutigen Freigabe weitergeben | Wichtig und dringend: Frist und wirtschaftliche Folge | Vollständigkeit prüfen und unverzüglich an die befugte Person geben; nicht selbst eine fehlende Zahlungsbefugnis ersetzen. |
| Azubi-Präsentation vorbereiten | Wichtig, noch nicht unmittelbar dringend | Angaben jetzt anfordern und einen Bearbeitungstermin fest einplanen. |
| Bewirtungsrückfrage weiterleiten | Zeitgebunden, aber im Fall geringer eigener Zielbeitrag | Zuständige Person informieren; kurze Erledigung nur, wenn sie höher priorisierte Arbeit nicht verdrängt. |
| Unbrauchbare Prospekte sortieren | Im beschriebenen Fall weder dringend noch sinnvoll wichtig | Mit der zuständigen Person klären, ob die Aufgabe entfallen kann. Keine eigenmächtige Vernichtung aufbewahrungspflichtiger Unterlagen. |

**Warum Terminieren mehr bedeutet als Verschieben**

„Mache ich später“ enthält noch keinen Plan. Ein Termin benennt dagegen einen bearbeitbaren nächsten Schritt und die dafür reservierte Zeit. Für die Präsentation kannst du heute die Abteilungsangaben anfordern, bis Mittwoch eine Rückmeldung vereinbaren und am Donnerstag den Entwurf erstellen. So werden Abhängigkeiten sichtbar, bevor sie die spätere Frist gefährden.

**Warum Delegieren nicht automatisch erlaubt ist**

Die bekannte Handlungsempfehlung für dringende, weniger wichtige Aufgaben lautet häufig „delegieren“. Als Auszubildender hast du aber nicht automatisch Weisungsbefugnis. Du kannst Zuständigkeit und Unterstützung klären, eine Aufgabe nach Absprache weitergeben oder deine Prioritäten mit der ausbildenden Person besprechen. Eine Methode erzeugt keine Befugnis, die dir betrieblich nicht eingeräumt wurde.

**Optional – Grundlagen nachlesen: Folge und Frist**

Eine Aufgabe ist nicht allein deshalb wichtig, weil sie aufwendig ist. Ein kurzer sicherheitsrelevanter Hinweis kann wichtiger sein als eine lange optische Überarbeitung einer Präsentation. Ebenso ist eine Aufgabe nicht allein deshalb dringend, weil die Absenderin dieses Wort verwendet. Frage nach der tatsächlichen Frist und der Folge einer Verzögerung. Gesetzliche und sicherheitsrelevante Pflichten dürfen dabei nicht nach persönlichem Geschmack abgewertet werden.

**Optional – Fälle vergleichen: Wenn der Drucker für den Versand ausfällt**

Ein leerer Toner wurde vielleicht zunächst als Routine eingeordnet. Stoppt der Ausfall aber den heutigen Versand, ändern sich seine betrieblichen Folgen: Die Behebung wird wichtig und dringend. Die Matrix ordnet nicht unveränderlich bestimmte Gegenstände ein; sie bewertet eine konkrete Situation.

**Optional – Sonderfall verstehen: Alles scheint wichtig und dringend**

Wenn mehrere Pflichten gleichzeitig unerfüllbar sind, reicht Umordnen nicht. Benenne die Fristen, den nötigen Aufwand und die Folgen. Lege der zuständigen Person konkrete Alternativen vor: Unterstützung, geänderter Umfang oder veränderter Termin. Dauerhafte Überlastung ist nicht allein ein persönliches Planungsproblem. Die Methode hilft dann vor allem, den Konflikt rechtzeitig sichtbar zu machen.

**Optional – Zusammenhang entdecken: ALPEN und Eisenhower**

Eisenhower hilft bei der Entscheidung, welche Aufgaben Vorrang haben. ALPEN unterstützt die anschließende Tagesplanung mit Aufwandsschätzung, Puffer und Nachkontrolle. Beide Werkzeuge lösen unterschiedliche Teilprobleme. Weiterführende Ziele: LF2 K2 b1 ALPEN, b3 Zeitdiebe; für größere Abhängigkeiten LF13 Projektplanung.

**Verständnisfrage C1:** Warum darf die Präsentation nicht warten, bis sie dringend wird?

**Zunächst verborgene Antwort:** Weil Informationen aus anderen Abteilungen und die eigene Bearbeitung Zeit benötigen. Die Aufgabe ist bereits wichtig; frühes Terminieren und Anfordern der Angaben verhindert vermeidbaren Zeitdruck.

**Verständnisfrage C2:** Muss ein leerer Toner immer „dringend, aber unwichtig“ sein?

**Zunächst verborgene Antwort:** Nein. Wenn ohne Drucker ein wichtiger Versand ausfällt, hat die Behebung wesentliche Folgen und kann wichtig und dringend sein. Die Einordnung hängt vom Fall ab, nicht vom Wort „Toner“.

**Redaktioneller Schluss:** Vorhandene Eisenhower-Grafik gemeinsam nutzen und die Fallbegründungen ergänzen. Keine Aussage, dass jede Person immer vormittags am leistungsfähigsten sei oder dass ein fester Pufferprozentsatz allgemein verbindlich wäre. Es handelt sich um ein Organisationsmodell und eine begründete Anwendung, nicht um eine gesetzliche Vorschrift.

## 10. Redaktionelle Arbeitsplanung für den Gesamtbestand

Die CSV `redaktionsplan-160-kapitel.csv` erfasst alle Kapitel mit ihren aktuellen Abschnitts-IDs und einer passenden Darstellungsfamilie. **Sie ist ein Arbeitsplan, keine Behauptung über 160 fertig geschriebene Vollfassungen.** Genau drei Musterabschnitte sind oben als ausformulierte Einfügevorlagen vorbereitet. Für die übrigen Abschnitte liefert die Matrix die zu erhaltende Struktur und den Redaktionsauftrag.

### Themenprofile

| Familie | Kern der Vertiefung | Passende Darstellungen | Fehler, den die Redaktion vermeiden muss |
|---|---|---|---|
| Recht | Voraussetzungen → Sachverhalt → Anwendung → begründete Folge | Gegenüberstellung, Prüfschema, Gegenfall | Anspruch oder Frist ohne Voraussetzungen; B2B/B2C/Azubi/Arbeitnehmer vermischen. |
| Rechnen | Eingaben/Einheiten → Formel/Begründung → Schritte → Kontrolle → Entscheidung | Rechentabelle, Kostenkurve, Kalkulationsschema | Falscher Grundwert, versteckte Annahme, richtige Zahl als alleinige Erklärung. |
| Buchführung | Beleg → wirtschaftlicher Vorgang → Konten/Seiten → Buchung → Kontrolle | T-Konten, Buchungszeilen, Belegabgleich | Ausgeglichener Buchungssatz wird ohne Prüfung der Konten als richtig erklärt. |
| Kommunikation | Ziel/Interessen → Gespräch → kommentierte Wirkung → Alternative | Dialog, Gesprächsphasen, Gegenüberstellung | Starre Psychologieregeln, Kulturstereotype und bloße Merksatzlisten. |
| Organisation/Prozess | Auftrag → Abhängigkeiten/Zuständigkeit → Ablauf → Störung → Verbesserung | Ablaufbild, Plan, ausgefüllte Vorlage | Methodenbeschreibung ohne ausgeführte Anwendung oder ohne Befugnisgrenzen. |
| Markt/Gesamtwirtschaft | Einflussgröße → Wirkungskette → Grenzen → Entscheidung | Datenvergleich, Diagramm, Szenarien | Ein Zusammenhang wird ohne Bedingungen als sichere Kausalität behauptet. |

### Reihenfolge

1. **Drei Piloten vollständig:** A/B/C einschließlich Suche, Tastatur, bestehender Übungsdaten und Altbestand. Danach ein kleiner zusätzlicher Buchführungspilot zum Nachweis, dass gemeinsame T-Konten nicht zurückgesetzt werden.
2. **KfB besonders erklärungsintensiv:** LF4 Vertrags-/Beschaffungsfälle, LF6 Buchführung, LF8 Personal, LF9 Finanzierung/Rechtsformen und LF10 KLR; bekannte Fehler vor Übernahme korrigieren.
3. **KfB übrige Lernfelder:** in fachlich zusammenhängenden Chargen. Neue Pflichtinhalte aus dem Audit nicht bloß als Sonderfall verstecken; nötige Hauptabschnitte ergänzen.
4. **IK:** zunächst LF5/6/8/10/12 mit vollständigen Beleg-/Rechenfällen, dann gezielte Methoden-/Transferergänzungen in den übrigen Feldern. Bereits gute Fälle erhalten.

Eine Charge wird mit einer kleinen Liste tatsächlich überarbeiteter Abschnitts-IDs, Quellen und erfüllter Inhaltskriterien dokumentiert. „Alle Felder befüllt“ allein ist keine Abnahme. Während der Migration kann ein Kapitel neue Vollfassungen und alte Zusatztexte enthalten; Oberfläche und Zähler müssen korrekt damit umgehen.

## 11. Konkrete Abnahmekriterien

Die strukturierten Fälle stehen zusätzlich in `abnahme.json`. Sie sind ein Testplan, keine bereits bestandenen Tests. Keine künstlichen Tests schreiben, die nur dieselbe Rendererfunktion erneut behaupten. Relevante Verhaltensfälle mit bestehenden Projekttests verbinden.

| ID | Ausführung | Erwartung |
|---|---|---|
| A01 | Unverändertes Legacy-Kapitel aufrufen und ausführlich schalten | Alte Zusatzinhalte bleiben erreichbar; nichts wird durch ein neues Vollfassungsflag verschluckt. |
| A02 | Nur Pilot A öffnen | Nur der betreffende Abschnitt vertieft, andere bleiben kompakt. |
| A03 | Alle Hauptvertiefungen öffnen | Alle verfügbaren Haupttexte offen, Details/Antworten weiter geschlossen. |
| A04 | Einen von mehreren offenen Abschnitten schließen | Gemischter Zustand und Kapiteltext stimmen; andere bleiben unverändert. |
| A05 | Kapitel ohne Vertiefung öffnen | Kein wirkungsloser Schalter und keine Fehlermeldung. |
| A06 | Detail öffnen und Hauptabschnitt schließen/erneut öffnen | Detail wird geschlossen, Fokus bleibt sichtbar, Erklärung wieder lesbar. |
| A07 | Verständnisfrage lesen | Antwort zunächst verborgen, bewusst aufklappbar, keine neue Punktzahl. |
| A08 | In gemeinsamer Grafik Werte ändern und Ansicht wechseln | Werte und Grafikinstanz bleiben erhalten. |
| A09 | Vorhandenen Check beantworten und Ansicht mehrfach wechseln | Antwort/Punktzahl/IDs unverändert, keine doppelte Karte. |
| A10 | Bestehenden Lernstand mit Lesezeichen/Antworten laden | Kein Reset und keine unzulässige Migration allein wegen Ansichtsänderung. |
| A11 | Suchbegriff nur in Hauptvertiefung suchen | Treffer erscheint und öffnet sichtbaren passenden Abschnitt. |
| A12 | Begriff nur im optionalen Gegenfall suchen | Abschnitt und genau dieses Detail werden geöffnet. |
| A13 | Frage-Treffer öffnen | Frage sichtbar, Antwort weiter verborgen. |
| A14 | Alten Abschnittslink öffnen | Existierender Fragmentlink bleibt gültig. |
| A15 | Ungültige Detailkennung mit gültigem Abschnitt öffnen | Gültiger Abschnitt erreichbar, kein Absturz oder fremder Treffer. |
| A16 | Zwischen KfB und IK mit ähnlichen Kennungen wechseln | Inhalt und Zustand berufsrichtig, keine Vermischung. |
| A17 | Kapitel A/B wechseln und innerhalb der Seite zurückkehren | Sitzung erhält Öffnungen wie beschrieben, keine neue Cloudspeicherung. |
| A18 | Seite vollständig neu laden | Regulär kompakt; gezielter Deep-Link öffnet nur geforderte Ebenen. |
| A19 | In langer Vertiefung zurückschalten | Keine Orientierung am Seitenanfang und kein Fokus in verstecktem Inhalt. |
| A20 | Nur Tastatur/Screenreader verwenden | Alle Schalter erreichbar, Zustand/Name korrekt, Lesereihenfolge logisch. |
| A21 | 320/375 px breite Ansicht und große Textdarstellung | Kein Seitenüberlauf; Tabelle separat bedienbar und Inhalt verständlich. |
| A22 | Bewegung reduzieren | Keine erzwungene Animation; Bedienung unverändert. |
| A23 | Nach gecachtem Erstaufruf offline gehen | Erklärungen, Tabellen und Details vollständig verfügbar. |
| A24 | Neues ungültiges Schema / doppelte ID / fehlender Abschnitt | Build bricht mit Datei/Abschnitt und verständlichem Fehler ab. |
| A25 | Alle drei Muster mit Voraussetzungen nachrechnen/prüfen | A: 922/930, ohne Skonto 940; B: passende Annahme vs. neuer Antrag; C: zuständigkeits- und situationsabhängige Einordnung. |
| A26 | HTML/Index/Cache nach normalem Build vergleichen | Neue Inhalte und Suchziele synchron, kein veralteter Mischstand. |

Zusätzliche Prüfpunkte: keine versehentlich duplizierten DOM-IDs; keine alten Übungskennungen verändert; Konto-/Resetgrenzen bestehender Lernstandstests bestehen; shared definitions/Paragraphenreferenzen korrekt. Printmodus darf keinen Kurz-/Lang-Doppeltext ausgeben. Bestehendes Druckverhalten nicht still neu definieren; gewählte Ansicht verwenden, optionale geschlossene Details nur bei ausdrücklich angebotener Druckoption mitgeben.

## 12. Claudes Prüf- und Einbaufolge

1. Aktuellen Branch und `AGENTS.md` lesen, fremde Änderungen feststellen; Anwendungsstand gegenüber der Grundlage abgleichen.
2. Bekannte fachliche Fehler aus `doku/audit/2026-10-27-abgleich-claude-chatgpt.md` berücksichtigen. Fehlerhafte Altfassung nicht als fachliche Quelle für neue Volltexte übernehmen.
3. Drei Muster fachlich/technisch prüfen; nur begründete Abweichungen dokumentieren. Datenvertrag an vorhandene sichere Blocktypen anpassen, nicht alle Texte automatisch in starres Raster umschreiben.
4. Kompatiblen Renderer und lokale UI-Zustände einbauen; bestehende Kennungen/Interaktionen zuerst erhalten. Quellenformatdokumentation aktualisieren.
5. Suchindex/Deep-Link/Offline-Build integrieren. Kein externer Textgenerierungsdienst notwendig.
6. Piloten mit gezielten Abnahmen und erforderlicher bestehender Regression prüfen; neue Tests nur für tatsächliche neue Verhaltensrisiken.
7. Ergebnis, geänderte Dateien, fachliche Quellen, getestete Fälle und verbleibende konkrete Grenzen in der Übergabe dokumentieren. Anschließend redaktionelle Chargen anhand der Matrix erweitern.

**Vorbereitungsstand dieses Pakets:** Konzept, UX-Texte, Datenvertragsentwurf, drei Musterabschnitte, redaktionelle Matrix und Abnahmen erstellt. **Noch nicht erledigt:** Produktionseinbau, Browserprüfung der neuen Bedienung, Fachfreigabe sämtlicher späterer Volltexte, komplette Neuredaktion aller 160 Kapitel. Die vorbereiteten Inhalte sollen Claudes Arbeit konkret machen, nicht einen bereits fertigen Einbau vortäuschen.
