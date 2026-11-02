# Erweiterter Modus · Fortschritt und Gegenprüfung

**Datum:** 02.11.2026. **Rolle:** ChatGPT, Fortschrittsprüfung und gezielte technische/fachliche Gegenprüfung. **Anwendungsstand:** `5380a00ad45644c0e8529ecc2593c709581fe0b6` auf `erweiterter-modus-2026-10-28`. **Vorgänger:** Zwischenprüfung `cc5f06e`. Kein Merge/Deployment; `origin/main` bei Abruf weiterhin `d0cfb8a`.

## Ergebnis

**Die Umstellung ist vollständig: 26 Lernfelder, 161 Kapitel, 602 von 602 Abschnitten im neuen Format.** Seit der letzten Prüfung sind die zehn übrigen IK-Lernfelder mit 62 Kapiteln/248 Abschnitten dazugekommen. Das neue KfB-Rechtsformenkapitel besitzt jetzt auch drei Aufgabenbausteine für AFB I–III.

Die bisher offenen technischen Zwischenstandspunkte sind bearbeitet: Suchindex synchron, IK-Test auf neues Format umgestellt, Antwortkorrektur gezielt dokumentiert. Die eigenen Prüfungen unten sind grün. Trotzdem **noch keine Bestätigung „alles fachlich und in der Bedienung abgenommen“**: Drei begrenzte Nachbesserungen N01–N03 und die noch nicht vollständig belegte Gesamtabnahme bleiben. Kein vollständiges erneutes Lesen und rechtliches Verifizieren sämtlicher 602 Texte durch diesen Bericht.

## Eigene Belege

| Prüfung | Ergebnis |
|---|---|
| Alle Registries und Kapitelquellen, Originalvalidator | 161 Kapitel, 602/602 Vollfassungen gültig; bestehende Basiselemente und Referenzen strukturell geprüft |
| Modustest, Originalfunktionen `statisch()` und `vertrag()` | 110 OK, 0 FEHL; ausschließlich Playwright-Import für diesen Nichtbrowserlauf ausgelassen |
| `industriekaufleute_test.py` | 9.219 bestanden, 0 Fehler, 285 Aufgaben |
| Suchindex gegen aktuellen Originalgenerator | 2.500 Soll-/Istziele, keine fehlenden oder überzähligen Ziele |
| Originalrenderer, Ausgabe in temporäres Verzeichnis umgeleitet | Alle 26 Lernfeldseiten bytegleich mit dem gepushten HTML reproduziert |
| JavaScript-Syntax `node --check quellen/azubipass.js` | Kein Syntaxfehler |
| Neue Bestellmengengrafik, unveränderte Funktion/Helper in Node mit minimalem DOM | Drei Eingaben ohne zugeordneten zugänglichen Namen reproduziert; mathematischer Grundfall q* ≈ 707,11 Stück, jährliche Bestell-/Lagerkosten zusammen ≈ 1.414,21 € |

Reproduzierbar: [Prüfskript](belege-2026-11-02-5380a00/pruefung.py), [Prüfausgabe](belege-2026-11-02-5380a00/pruefung.json), [Grafikprobe](belege-2026-11-02-5380a00/grafik-probe.cjs), [Grafikausgabe](belege-2026-11-02-5380a00/grafik-probe.json). Die temporäre Rendererprüfung verändert keine Repository-Artefakte.

Die neuen Formatprüfungen sind sinnvolle Strukturhilfen. Wortzahl, Tabelle mit Fazit und zwei Fragen beweisen für sich keine fachliche oder didaktische Richtigkeit. Der gegenwärtige IK-Test schreibt Tabellen auch für andere Themen vor; das ist kein Grund, bereits gute Dialog-/Prozesserklärungen künstlich in Tabellen umzuschreiben.

## N01 · mittel · KG-Mitsprache und Haftung in neuem Kapitel/Prüfungsaufgaben präzisieren

**Fundstellen:** `quellen/lf9-k7-rechtsformen.kapitel.json`, Vollfassung b2 einschließlich Frage b2-f1; `quellen/lf9-k7-rechtsformen.aufgaben.json`, Bausteine `lf9-k7-01` und `lf9-k7-03` mit Erklärung, Musterlösung und Punkteraster.

**Befund:** Das Kapitel beschreibt bei außergewöhnlichen Geschäften lediglich ein Widerspruchsrecht der Kommanditistin. Die neue AFB-III-Musterlösung empfiehlt die KG unter der pauschalen Aussage, Jonas entscheide allein. Die gesetzliche Ausgangslage ist genauer: § 164 HGB lässt § 116 Abs. 2 Satz 1 ausdrücklich unberührt; bei Geschäften außerhalb des gewöhnlichen Betriebs ist ein Beschluss aller Gesellschafter erforderlich. Die Tante hat daher im gesetzlichen Grundmodell bei einem Werkstattkauf mehr als nur ein nachträgliches Vetorecht. Keine abweichende Vertragsregel wird im Aufgabenfall vorgegeben.

**Zusätzlich:** AFB I fragt nach Haftung *gegenüber Gläubigern*, bietet für die Kommanditistin aber nur „bis zur Höhe der Einlage“. Das verwechselt Register-Haftsumme, Einlagepflicht und bereits erbrachte Leistung. § 171/172 HGB sind einzubeziehen. Bei vollständig geleisteter Einlage in Höhe der Haftsumme ohne haftungsschädliche Rückzahlung ist die unmittelbare Außenhaftung grundsätzlich ausgeschlossen; das Risiko, die Beteiligung wirtschaftlich zu verlieren, ist etwas anderes. Die ausführliche Erklärung in b3 enthält diese Unterscheidung bereits teilweise, die neue Aufgabenlösung verkürzt sie wieder.

**Korrekturvorschlag:**

- b2 und Antwort auf b2-f1: „Gewöhnliche Geschäfte führt Jonas im gesetzlichen Grundmodell allein. Für außergewöhnliche Geschäfte benötigt er grundsätzlich einen Beschluss aller Gesellschafter, also auch die Zustimmung der Tante. Abweichende gesellschaftsvertragliche Regelungen sind gesondert zu prüfen.“ Innenbefugnis und wirksame Außenvertretung weiter trennen.
- AFB III: Empfehlung auf laufende Geschäftsführung begrenzen und verbleibende Gesellschafter-/Kontrollrechte benennen. „Nicht mitarbeiten“ bedeutet nicht „bei jeder Entscheidung ohne Mitspracherecht“. Die begründete Empfehlung kann weiterhin KG sein; sie muss die Wünsche aber mit ihren Grenzen ehrlich abgleichen.
- AFB I: Haftsumme und erbrachte Einlage ausdrücklich vorgeben oder die Antwort so formulieren, dass diese Voraussetzungen enthalten sind. Risiko der verlorenen Einlage und unmittelbare Außenhaftung getrennt erklären.

**Enge Abnahme:** Gewöhnliche Farbenbestellung vs. zusätzliche Werkstatt; einmal keine Zustimmung der Tante. Haftsumme 40.000 €, Einlage in gleicher Höhe vollständig geleistet, keine Rückzahlung vs. erst 25.000 € geleistet: Außenhaftung grundsätzlich 0 € vs. noch 15.000 €. Kapitel, Frage und alle betroffenen Aufgabenraster konsistent. Keine globalen Lernstands-Ausnahmen; gezielte Inhaltsänderungen dokumentieren.

**Am 02.11.2026 direkt geprüft:** [§ 164 HGB](https://www.gesetze-im-internet.de/hgb/__164.html), [§ 171 HGB](https://www.gesetze-im-internet.de/hgb/__171.html), [§ 172 HGB](https://www.gesetze-im-internet.de/hgb/__172.html). § 116 war als Einzelseiten-Open mehrfach nicht abrufbar; sein aktueller amtlicher Suchindextext und der amtliche HGB-Gesamttext stützen den Zustimmungssatz: [§ 116 HGB](https://www.gesetze-im-internet.de/hgb/__116.html). Nicht als erfolgreiches Einzelabrufen dieser letzten Seite ausgeben.

## N02 · mittel · Drei Eingabefelder der Bestellmengengrafik ohne zugeordneten Namen

**Fundstelle:** `quellen/azubipass.js`, `gBestellmenge`, Schleife über `bedarf`, `bestellkosten`, `lagerkosten`; Verwendung IK LF4 K02 a3.

Sichtbares `label` und `input` werden als Geschwister in ein `div` eingefügt. Es fehlen `for`/`id`, umschließendes Label, `aria-label` und `aria-labelledby`. Der unveränderte Helper `AP.kommafeld` setzt nur Typ/Eingabemodus und ergänzt keine Beschriftung. Der Grafikcontainer/SVG-Name ersetzt die Namen der drei Formularfelder nicht.

**Eigene Reproduktion:** Originalgrafik und Originalhelper mit den tatsächlichen JSON-Daten in minimalem DOM ausgeführt. Für alle drei Felder fehlende Zuordnung bestätigt, siehe Grafikbeleg. Das ist ein Attribut-/Strukturbeleg, **kein behaupteter Browser-/axe-Lauf**.

**Korrektur:** Sichtbare Beschriftung und jeweiliges Feld mit seitenweit eindeutiger ID/`for` verbinden oder ein korrekt umschließendes Label verwenden; alternativ zulässige Namenszuordnung. Mehrere Grafiken auf derselben Seite und Zurücksetzen berücksichtigen, keine doppelten IDs.

**Abnahme:** Alle drei Felder per zugänglichem Namen auffindbar; Klick auf Label fokussiert beim `for`-/Umschließungsweg das Feld. Nach Reset weiterhin gültig, Werteberechnung unverändert. Browser/axe auf dieser neuen Grafik ausführen, nicht nur auf den alten Pilotseiten. [W3C-Technik H44](https://www.w3.org/WAI/WCAG22/Techniques/html/H44) am 02.11.2026 gelesen; sie beschreibt eine passende Lösung, nicht die einzig erlaubte Technik.

## N03 · mittel · Urlaubsbeispiel benötigt klare Vertragsannahme

**Fundstelle:** `quellen/ik2024-lf12-k07.kapitel.json`, a3, Tabelle a3-t1 und Detail a3-d1.

**Befund:** Aus 30 Jahresurlaubstagen, Austritt Ende März und zwei genommenen Tagen werden 5,5 Resttage berechnet. Der Vertrag wird nur als „bei Austritt zeitanteilig“ beschrieben. Das Detail behauptet, die gesetzliche Aufrundung gelte für Mehrurlaub nur, wenn der Vertrag das vorsehe. Diese Umkehrung ist zu pauschal: Entscheidend ist die Vertragsauslegung und ob der Mehrurlaub einem klar eigenständigen Berechnungsregime unterliegt. Ohne belegte Abweichung darf man ein getrenntes Regime nicht einfach voraussetzen.

**Keine pauschale Gegenaussage:** 5,5 Tage sind nicht unter allen denkbaren Verträgen ausgeschlossen. Sie können mit einer wirksamen, klar getrennten Regelung für den Mehrurlaub als Beispielannahme nachvollziehbar sein. Der veröffentlichte Fall nennt eine solche Regelung aber nicht. § 5 Abs. 2 BUrlG ordnet für den einschlägigen gesetzlichen Teilurlaub die Aufrundung ab einem halben Tag an. Die BAG-Auslegungsgrundsätze sprechen bei nicht eigenständig abweichend geregeltem Mehrurlaub für Gleichlauf; das ist eine Übertragung des Auslegungsgrundsatzes auf den Beispielsachverhalt, kein direkt identischer BAG-Fall.

**Korrekturweg wählen:** Entweder das Beispiel vollständig im gleichen Berechnungsregime rechnen und die passende Rundung vor Abzug des genommenen Urlaubs erläutern; oder Mindesturlaub und vertraglichen Mehrurlaub mit ausdrücklich vorgegebener, rechtlich geprüfter separater Regelung getrennt berechnen. Das Detail entsprechend ändern. Alternativ einen einfachen reinen Mindesturlaubsfall verwenden, wenn die Vertragsauslegung nicht Lernziel sein soll.

**Enge Abnahme:** Kein Satz „Mehrurlaub wird nur bei ausdrücklicher Aufrundungsvereinbarung gerundet“. Zwei nachvollziehbare Fälle mit klaren Regeln; keine wechselnden Annahmen zwischen Tabelle, Fazit und aufklappbarem Detail. Eine Tageszahl nicht allein wegen arithmetischer Plausibilität als rechtlich richtig behandeln.

**Primärquellen gelesen:** [§ 5 BUrlG](https://www.gesetze-im-internet.de/burlg/__5.html); [BAG 9 AZR 579/16, insbesondere Rn. 56](https://www.bundesarbeitsgericht.de/entscheidung/9-azr-579-16/) zum Gleichlauf der Berechnungsbestimmungen mangels abweichenden Regelungswillens. [BAG 9 AZR 219/22](https://www.bundesarbeitsgericht.de/entscheidung/9-azr-219-22/) bestätigt in einem anders geregelten Tarifvertragsfall die Relevanz ausdrücklicher Teilurlaubs-/Rundungsvorschriften; keine ungeprüfte Gleichsetzung der Verträge.

## Abschlussprüfung bleibt offen

- Eine aktuelle vollständige Fach-/Lehrplanabnahme anhand aller L-/K-Aufträge ist noch nicht durch diesen Bericht belegt. Die ursprünglichen Arbeitslisten enthalten weiter Ausgangsstatus und Hashes; aktuelle Erledigungsbelege müssen als Abschlussstand zusammengeführt werden. Kapitelnotizen sind wertvoll, ersetzen aber keine unabhängige Bestätigung aller Rechts-/Jahreswerte.
- Python-Playwright und Chromium sind hier weiterhin nicht vorhanden. Deshalb keine eigene neue Wiederholung von Browser-/axe-, mobiler Sichtprüfung, großen Browserregressionen, echter Service-Worker-Offlineabnahme oder Druckabnahme. Ein früherer grüner Pilotlauf ist keine abschließende Prüfung aller neuen Grafiken und 602 Vollfassungen.
- Die eigenen Rechts-/Rechenprüfungen sind Risikostichproben. Bundesbank-Basiszinssatz 1,52 % ab 01.07.2026 stichprobenartig amtlich bestätigt; daraus folgt keine Kontrolle aller Jahreswerte. Ein einfacher automatischer Rechenausdruckscanner liefert Rundungs-/Parser-Scheinbefunde und wurde ausdrücklich nicht als Zertifizierung aller Rechnungen gezählt.
- Die zusätzliche Bestellmengengrafik ist fachlich eine nachvollziehbare Ergänzung. Die in den Notizen erwähnte Zwei-Grafiken-Ausnahme ist keine neue fachliche Sperre aus diesem Review; bestehende Ausnahme sauber dokumentieren. Keine unnötige erneute Konzeptfreigabe.

**Nächster Schritt:** Claude korrigiert N01–N03 gezielt, prüft die genannten Gegenfälle und belegt die finale Fach-/Browser-/Offlineabnahme am korrigierten Gesamtstand. Danach Mergevorlage an Lukes. Kein neuer Auftrag, die gesamte abgeschlossene Redaktion nochmals neu zu schreiben. Keine Anwendung durch ChatGPT geändert; nur Review und Belege.
