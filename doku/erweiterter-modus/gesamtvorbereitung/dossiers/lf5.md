# lf5 · Kunden akquirieren und binden

Quelle: `quellen/lf5.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 6 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Der Markt und die Marktsituation

**Datei:** `lf5-k1-markt.kapitel.json` · SHA-256 `5a3e4fd2ad4b2d5950345f6197ad8d4d11023a14771ff1f13ebf573c22e35605`

**Konkreter Kapitelauftrag:** Die Marktstellung eines Produkts aus Nachfragesituation und Wettbewerb erklären; Anbieter-/Nachfragerposition nicht verallgemeinern.

**Einordnung:** Wo Angebot und Nachfrage sich treffen — und wer dabei am längeren Hebel sitzt.

### a1 · Was ein Markt ist

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Markt, Marktformen und Marktanteil erklären

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Was ein Markt ist",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:markt|Markt}} ist kein Ort mehr, sondern ein Zustand: Überall dort, wo Angebot und Nachfrage aufeinandertreffen, entsteht ein Preis. ==Der Preis ist das Ergebnis, nicht die Vorgabe== — er stellt sich dort ein, wo beide Seiten sich einigen."
    },
    {
      "typ": "absatz",
      "text": "Wie viel Spielraum ein Betrieb bei diesem Preis hat, hängt davon ab, wie viele Anbieter und Nachfrager es gibt. Diese Zahl bestimmt die Marktform."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Wenige Nachfrager",
        "Viele Nachfrager",
        "Marktform"
      ],
      "zeilen": [
        {
          "zellen": [
            "ein Anbieter",
            "viele Nachfrager",
            "Angebotsmonopol"
          ],
          "detail": "**Größter Preisspielraum.** Wer als Einziger anbietet, setzt den Preis fast frei — begrenzt nur durch die Zahlungsbereitschaft und die Aufsicht des Kartellamts."
        },
        {
          "zellen": [
            "wenige Anbieter",
            "viele Nachfrager",
            "Angebotsoligopol"
          ],
          "detail": "**Der häufigste Fall bei großen Marken.** Jeder beobachtet die anderen; eine Preissenkung löst sofort Reaktionen aus. Deshalb wird hier eher über Werbung als über den Preis gekämpft."
        },
        {
          "zellen": [
            "viele Anbieter",
            "viele Nachfrager",
            "Polypol"
          ],
          "detail": "**Der Normalfall im Handel.** Der einzelne Anbieter ist zu klein, um den Preis zu beeinflussen — er muss den Marktpreis nehmen oder sich durch etwas anderes unterscheiden."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Je weniger Anbieter, desto größer der Preisspielraum. Wer im Polypol sitzt, verkauft nicht über den Preis, sondern über Qualität, Service oder Nähe.",
      "karteikarte": "Welche drei Marktformen gibt es nach der Zahl der Anbieter, und wie wirkt sich das auf den Preisspielraum aus?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "vorauswissen": [
    "Anbieter wollen Leistungen verkaufen, Nachfrager wollen sie erwerben.",
    "Der Preis verbindet Angebot und Nachfrage."
  ],
  "erklaerung": "Ein Markt ist das Zusammentreffen von Angebot und Nachfrage. Der Preis ist nicht einfach nur eine Zahl aus der Preisliste, sondern das Ergebnis dieses Zusammentreffens. Die Marktform hängt von der Zahl der Anbieter ab: Im Monopol steht ein Anbieter vielen Nachfragern gegenüber, im Oligopol wenigen Anbietern und im Polypol vielen Anbietern.",
  "beispiele": [
    "Bei einem Monopol hat der einzelne Anbieter mehr Preisspielraum als in einem Polypol, in dem viele Anbieter miteinander konkurrieren.",
    "Bei einem Oligopol beobachten wenige Anbieter einander; Preisentscheidungen eines Anbieters können die übrigen unmittelbar beeinflussen."
  ],
  "fallbeispiel": "Ein Betrieb prüft, warum er seinen Preis nicht beliebig erhöhen kann. Zuerst wird die Marktform betrachtet. Stehen viele vergleichbare Anbieter bereit, handelt es sich eher um ein Polypol; der Preisspielraum ist begrenzt. Gibt es dagegen nur wenige Anbieter, ist der Preisspielraum größer. Die Entscheidung wird damit nicht nur aus den eigenen Kosten, sondern aus dem Markt abgeleitet.",
  "typische_fehler": "Markt wird mit einem Verkaufsraum gleichgesetzt oder die Marktform nach der Zahl der Kunden statt nach der Zahl der Anbieter bestimmt. Außerdem wird der Preis als ausschließlich kostenbestimmt verstanden.",
  "verstaendnisfragen": [
    "Woraus entsteht der Preis im Marktmodell? Aus dem Zusammentreffen von Angebot und Nachfrage.",
    "Welche Marktform hat die geringste Anbieterzahl? Das Monopol."
  ],
  "pruefungsbezug": "Zähle bei Marktformaufgaben die Anbieter und ordne erst danach Monopol, Oligopol oder Polypol zu. Ergänze die Folgerung für den Preisspielraum.",
  "merksatz": "Markt bedeutet Angebot plus Nachfrage; je weniger Anbieter, desto größer der mögliche Preisspielraum."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Käufermarkt oder Verkäufermarkt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Käufer- und Verkäufermarkt unterscheiden und Folgen ableiten

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Käufermarkt oder Verkäufermarkt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die zweite Frage ist wichtiger als die Marktform: Wer ist knapp? Wenn mehr angeboten als nachgefragt wird, herrscht ein {{begriff:kaeufermarkt|Käufermarkt}} — der Kunde hat die Wahl. Umgekehrt entsteht ein {{begriff:verkaeufermarkt|Verkäufermarkt}}."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Marktlagen",
      "titel": "Wer sitzt am längeren Hebel?",
      "lead": "Dieselbe Ware, zwei völlig unterschiedliche Verhaltensweisen. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Käufermarkt",
          "ton": "gold",
          "punkte": [
            {
              "text": "Angebot größer als Nachfrage",
              "detail": "Es gibt mehr Ware als Interessenten. Der Normalfall in fast allen Konsumgütermärkten."
            },
            {
              "text": "Der Kunde bestimmt",
              "detail": "Er vergleicht, verhandelt, wechselt. Wer ihn halten will, muss ihm einen Grund geben."
            },
            {
              "text": "Marketing wird überlebenswichtig",
              "detail": "Genau hier entsteht der Bedarf für alles, was in diesem Lernfeld folgt. Ohne Käufermarkt bräuchte niemand Marketing."
            },
            {
              "text": "Preise unter Druck, Service wird zum Argument",
              "detail": "Wenn alle dasselbe anbieten, entscheidet, was drumherum passiert: Beratung, Lieferzeit, Erreichbarkeit."
            }
          ]
        },
        {
          "name": "Verkäufermarkt",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Nachfrage größer als Angebot",
              "detail": "Die Ware ist knapp. Typisch bei Lieferengpässen, neuen Technologien oder in Krisenzeiten."
            },
            {
              "text": "Der Anbieter bestimmt",
              "detail": "Er kann Preise und Bedingungen weitgehend vorgeben — und tut es meist auch."
            },
            {
              "text": "Werbung wird nebensächlich",
              "detail": "Wer ohnehin alles verkauft, muss niemanden überzeugen. Marketing beschränkt sich auf Verwaltung der Nachfrage."
            },
            {
              "text": "Wartelisten statt Rabatte",
              "detail": "Statt um Kunden zu werben, wird zugeteilt. Das kehrt die gesamte Verkaufslogik um."
            }
          ]
        }
      ],
      "regel": "Merksatz: Im Käufermarkt sucht der Anbieter den Kunden, im Verkäufermarkt sucht der Kunde die Ware."
    },
    {
      "typ": "check",
      "frage": "In deiner Branche gibt es plötzlich Lieferengpässe, die Ware wird knapp. Was verändert sich für das Marketing?",
      "optionen": [
        {
          "text": "Die Werbung muss verstärkt werden",
          "richtig": false,
          "echo": "Umgekehrt. Bei Knappheit verkauft sich die Ware von selbst — Werbebudget wäre hier verschwendet. Nötig wird eher die Steuerung, wer wie viel bekommt."
        },
        {
          "text": "Der Markt kippt zum Verkäufermarkt, Werbung tritt zurück",
          "richtig": true,
          "echo": "Richtig. Übersteigt die Nachfrage das Angebot, sitzt der Anbieter am längeren Hebel. Marketing verschiebt sich von der Gewinnung zur Verwaltung — Wartelisten, Zuteilung, Kommunikation von Lieferzeiten."
        },
        {
          "text": "Nichts, Marketing ist von der Marktlage unabhängig",
          "richtig": false,
          "echo": "Marketing ist die Ausrichtung am Markt. Ändert sich der Markt grundlegend, ändern sich zwangsläufig auch die sinnvollen Maßnahmen."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a2",
  "vorauswissen": [
    "Marktmacht hängt davon ab, welche Seite knapp ist.",
    "Angebot und Nachfrage können sich unterschiedlich entwickeln."
  ],
  "erklaerung": "Übersteigt das Angebot die Nachfrage, liegt ein Käufermarkt vor. Kundinnen und Kunden können vergleichen und der Anbieter muss sich stärker an ihren Wünschen orientieren. Übersteigt dagegen die Nachfrage das Angebot, liegt ein Verkäufermarkt vor; der Anbieter hat die stärkere Position. Die Marktlage erklärt damit auch, warum Marketing bei einem Käufermarkt besonders wichtig wird.",
  "beispiele": [
    "Viele Anbieter konkurrieren um wenige Kunden: Käufermarkt, stärkerer Preisdruck und höherer Bedarf an Marketing.",
    "Viele Kunden suchen eine knappe Leistung, die nur wenige Anbieter liefern: Verkäufermarkt, größerer Spielraum des Anbieters."
  ],
  "fallbeispiel": "Ein Betrieb stellt fest, dass mehrere Anbieter dieselbe Leistung anbieten, während die Zahl der Kunden sinkt. Das Angebot ist größer als die Nachfrage. Die Situation ist ein Käufermarkt. Der Betrieb muss die Kundenstruktur und Konkurrenz prüfen und sein Marketing nutzen, statt allein auf eine Preiserhöhung zu setzen.",
  "typische_fehler": "Die Begriffe werden aus Sicht des Verkäufers verwechselt. Außerdem wird ein Käufermarkt nur als ‚schlechter Markt‘ bezeichnet, ohne die Konsequenz für Kundenorientierung, Preis und Marketing zu erklären.",
  "verstaendnisfragen": [
    "Wer hat im Käufermarkt die stärkere Position? Die Nachfrager beziehungsweise Kunden.",
    "Was kennzeichnet den Verkäufermarkt? Die Nachfrage übersteigt das Angebot; der Anbieter ist in der stärkeren Position."
  ],
  "pruefungsbezug": "Suche in Fallaufgaben zuerst nach Knappheit: Ist das Angebot oder die Nachfrage größer? Daraus folgt die Marktbezeichnung und die Machtverteilung.",
  "merksatz": "Wer knapp ist, hat die Macht: viel Angebot bedeutet Käufermarkt, viel Nachfrage Verkäufermarkt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Die eigene Lage einschätzen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Marktsituation des eigenen Betriebs einschätzen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Die eigene Lage einschätzen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Rahmenlehrplan verlangt, die Marktsituation entlang von drei Größen zu betrachten: **Kundenstruktur**, **Konkurrenz** und **konjunkturelle Lage**. Alle drei lassen sich mit Zahlen fassen, die im Betrieb bereits vorliegen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Größe",
        "Leitfrage",
        "Wo die Zahlen liegen"
      ],
      "zeilen": [
        {
          "zellen": [
            "Kundenstruktur",
            "Wer kauft — Alter, Region, Branche, Größe?",
            "eigene Kundendatenbank, Rechnungen"
          ]
        },
        {
          "zellen": [
            "Konkurrenz",
            "Wie viele Anbieter, wie stark?",
            "Branchenberichte, IHK, Webseiten der Mitbewerber"
          ]
        },
        {
          "zellen": [
            "Konjunkturelle Lage",
            "Wächst der Gesamtmarkt oder schrumpft er?",
            "Statistisches Bundesamt, Verbandsstatistiken"
          ],
          "detail": "**Warum das zusammengehört:** Ein steigender eigener Umsatz sagt wenig, solange der Gesamtmarkt noch schneller wächst. Dann hast du trotz Wachstum {{begriff:marktanteil|Marktanteil}} verloren."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "{{begriff:marktanteil|Marktanteil}} = eigener Umsatz ÷ Gesamtumsatz des Marktes × 100. Er ist die einzige Zahl, die den eigenen Erfolg ins Verhältnis zur Konkurrenz setzt.",
      "karteikarte": "Wie berechnet sich der Marktanteil, und warum sagt der eigene Umsatz allein zu wenig?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche der drei Größen ist gemeint?",
      "kategorien": [
        "Kundenstruktur",
        "Konkurrenz",
        "Konjunktur"
      ],
      "aufgaben": [
        {
          "text": "Zwei Drittel unserer Aufträge kommen aus dem Rheinland.",
          "loesung": "Kundenstruktur"
        },
        {
          "text": "Der Branchenumsatz ist im dritten Quartal um 4 % gesunken.",
          "loesung": "Konjunktur"
        },
        {
          "text": "Ein neuer Anbieter unterbietet uns systematisch um 10 %.",
          "loesung": "Konkurrenz"
        },
        {
          "text": "Der Anteil unserer Kunden über 60 wächst stetig.",
          "loesung": "Kundenstruktur"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a3",
  "vorauswissen": [
    "Die eigene Marktposition ergibt sich nicht aus einer einzelnen Zahl.",
    "Kunden, Konkurrenz und konjunkturelle Lage beeinflussen die Marktsituation."
  ],
  "erklaerung": "Eine Marktsituation wird über Kundenstruktur, Konkurrenz und konjunkturelle Lage eingeschätzt. Der Marktanteil setzt den eigenen Umsatz ins Verhältnis zum Marktumsatz: eigener Umsatz ÷ Marktumsatz × 100. Erst der Vergleich mit dem Gesamtmarkt zeigt, wie groß die eigene Position tatsächlich ist.",
  "beispiele": [
    "Ein Betrieb betrachtet nicht nur seine Umsätze, sondern auch Kundengruppen und die Zahl der Wettbewerber.",
    "Für den Marktanteil wird der eigene Umsatz durch den Umsatz des gesamten Marktes geteilt und mit 100 multipliziert."
  ],
  "fallbeispiel": "Ein Unternehmen kennt seinen eigenen Umsatz, aber noch nicht den Marktumsatz. Eine Aussage wie ‚wir verkaufen viel‘ reicht deshalb nicht für den Marktanteil. Zuerst wird der Gesamtmarkt abgegrenzt und der Marktumsatz ermittelt. Dann wird gerechnet: eigener Umsatz ÷ Marktumsatz × 100. Das Ergebnis wird anschließend zusammen mit Kundenstruktur, Konkurrenz und Konjunktur bewertet.",
  "typische_fehler": "Der eigene Umsatz wird als Marktanteil bezeichnet oder durch die Kundenzahl geteilt. Außerdem wird die konjunkturelle Lage ignoriert, obwohl sie die Nachfrage des gesamten Marktes beeinflussen kann.",
  "verstaendnisfragen": [
    "Welche drei Bereiche helfen bei der Markteinschätzung? Kundenstruktur, Konkurrenz und konjunkturelle Lage.",
    "Wie lautet die Marktanteilsformel? Eigener Umsatz ÷ Marktumsatz × 100."
  ],
  "pruefungsbezug": "Schreibe bei Marktanteilsaufgaben die Formel vor dem Einsetzen hin und prüfe, ob der Nenner wirklich den gesamten abgegrenzten Markt umfasst.",
  "merksatz": "Marktanteil ist immer ein Verhältnis zum Gesamtmarkt, nie der eigene Umsatz allein."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Marktforschung

**Datei:** `lf5-k2-marktforschung.kapitel.json` · SHA-256 `0681bef52a8c33f5ec9ae5b4e34d63e038bcfcc96bc22f94c8ba89e2b0c94c1b`

**Konkreter Kapitelauftrag:** Eine Kundenbefragung planen und begrenzt auswerten; Grundgesamtheit, Stichprobe und suggestive Fragen vergleichen.

**Einordnung:** Woher du weißt, was Kunden wollen — statt es zu vermuten.

### b1 · Zwei Wege zu Daten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Primär- und Sekundärforschung unterscheiden und einsetzen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Zwei Wege zu Daten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:marktforschung|Marktforschung}} beantwortet Fragen, die sonst im Bauchgefühl enden. Dafür gibt es genau zwei Wege: Daten neu erheben oder vorhandene auswerten. ==Die Reihenfolge ist fast immer dieselbe== — erst schauen, was schon da ist, und nur die Lücke neu erheben."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Wege",
      "titel": "Primär- oder Sekundärforschung",
      "lead": "Beide beantworten dieselbe Frage — mit sehr unterschiedlichem Aufwand.",
      "seiten": [
        {
          "name": "Sekundärforschung",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Vorhandene Daten auswerten",
              "detail": "Sie wurden für einen anderen Zweck erhoben und liegen bereits vor."
            },
            {
              "text": "Betriebsintern",
              "detail": "Umsatzstatistik, Kundendatei, Reklamationen, Außendienstberichte, Angebote und deren Erfolgsquote."
            },
            {
              "text": "Betriebsextern",
              "detail": "Statistisches Bundesamt, IHK- und Verbandsberichte, Fachzeitschriften, Geschäftsberichte der Konkurrenz."
            },
            {
              "text": "Schnell und günstig",
              "detail": "Oft an einem Nachmittag zu haben und meist kostenlos — deshalb immer der erste Schritt."
            },
            {
              "text": "Aber: nicht passgenau und womöglich veraltet",
              "detail": "Die Daten wurden für eine andere Frage erhoben. Prüfe Alter, Herkunft und Interesse der Quelle — dieselbe Quellenkritik wie in Lernfeld 1."
            }
          ]
        },
        {
          "name": "Primärforschung",
          "ton": "gold",
          "punkte": [
            {
              "text": "Daten neu erheben",
              "detail": "Speziell für die eigene Fragestellung, deshalb genau passend."
            },
            {
              "text": "Befragung",
              "detail": "Schriftlich, telefonisch, persönlich oder online. Die häufigste Methode — und die mit den meisten Fehlerquellen."
            },
            {
              "text": "Beobachtung",
              "detail": "Zusehen statt fragen: Laufwege im Laden, Klickpfade im Shop. Vorteil: Menschen verhalten sich anders, als sie sagen."
            },
            {
              "text": "Test und Experiment",
              "detail": "Produkttest, Markttest in einer Region, A/B-Test zweier Varianten. Liefert Ursache-Wirkung statt bloßer Zusammenhänge."
            },
            {
              "text": "Teuer und langsam",
              "detail": "Deshalb erst dann, wenn die Sekundärforschung die Frage nicht beantworten konnte."
            }
          ]
        }
      ],
      "regel": "Faustregel: Sekundär zuerst, primär nur für die verbleibende Lücke. Wer neu erhebt, was längst vorliegt, verbrennt Geld."
    },
    {
      "typ": "merke",
      "text": "**Sekundär** heißt nicht zweitrangig, sondern zweitverwertet. Es ist der erste Schritt, nicht der schlechtere.",
      "karteikarte": "Was unterscheidet Primär- von Sekundärforschung, und womit fängt man an?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Marketingentscheidungen brauchen Informationen über Markt und Kunden.",
    "Daten können bereits vorhanden oder neu erhoben worden sein."
  ],
  "erklaerung": "Sekundärforschung wertet vorhandene interne und externe Daten aus. Sie ist meist schnell und günstig. Primärforschung erhebt neue Daten durch Befragung, Beobachtung, Test oder Experiment. Sinnvoll ist die Reihenfolge: zuerst die vorhandenen Daten nutzen und danach nur die verbleibende Informationslücke neu erforschen.",
  "beispiele": [
    "Interne Verkaufszahlen und Reklamationen sind Sekundärdaten, weil sie bereits im Betrieb vorliegen.",
    "Eine neue Kundenbefragung oder ein Test mit zwei Varianten ist Primärforschung, weil die Daten für die konkrete Frage erhoben werden."
  ],
  "fallbeispiel": "Ein Betrieb möchte wissen, warum eine Produktgruppe weniger nachgefragt wird. Zuerst werden vorhandene Verkaufsdaten, Reklamationen und externe Marktinformationen ausgewertet. Bleibt offen, welche Kundenanforderung fehlt, wird eine Befragung oder Beobachtung durchgeführt. So wird die teurere Primärforschung auf die echte Lücke begrenzt.",
  "typische_fehler": "Jede Internetrecherche wird als Primärforschung bezeichnet oder eine neue Befragung gestartet, obwohl interne Daten die Frage bereits beantworten. Auch wird Primärforschung nur mit Befragung gleichgesetzt.",
  "verstaendnisfragen": [
    "Was ist der Kernunterschied? Sekundärforschung nutzt vorhandene Daten; Primärforschung erhebt neue.",
    "Welche Reihenfolge spart Aufwand? Erst Sekundärforschung, dann Primärforschung für die verbleibende Lücke."
  ],
  "pruefungsbezug": "Ordne die konkrete Datenquelle zu und begründe die Reihenfolge. Nenne bei Primärforschung nicht nur Befragung, sondern auch Beobachtung, Test und Experiment.",
  "merksatz": "Sekundär ist schon da, primär wird neu erhoben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Wen fragen — und wie viele?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Erhebungsmethoden auswählen und begründen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Wen fragen — und wie viele?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Alle zu befragen ist unmöglich. Deshalb wird aus der {{begriff:grundgesamtheit|Grundgesamtheit}} eine {{begriff:stichprobe|Stichprobe}} gezogen. Entscheidend ist nicht ihre Größe, sondern ob sie ==repräsentativ== ist: Sie muss in ihrer Zusammensetzung dem Ganzen entsprechen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Auswahlverfahren",
        "Wie ausgewählt wird",
        "Repräsentativ?"
      ],
      "zeilen": [
        {
          "zellen": [
            "Zufallsauswahl",
            "jeder hat dieselbe Chance, gezogen zu werden",
            "ja, bei ausreichender Größe"
          ]
        },
        {
          "zellen": [
            "Quotenauswahl",
            "die Stichprobe bildet bekannte Anteile nach, etwa Alter und Geschlecht",
            "ja, wenn die Quoten stimmen"
          ]
        },
        {
          "zellen": [
            "Willkürliche Auswahl",
            "wer gerade greifbar ist",
            "nein"
          ],
          "detail": "**Der häufigste Fehler in Schülerbefragungen.** Wer vormittags in der Fußgängerzone fragt, erreicht überwiegend Menschen, die vormittags Zeit haben — und hält das Ergebnis anschließend für die Meinung der Bevölkerung."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Du befragst 200 Personen vor deiner Berufsschule zu Bürobedarf. Was ist das Hauptproblem?",
      "optionen": [
        {
          "text": "Die Stichprobe ist zu klein",
          "richtig": false,
          "echo": "200 Antworten sind für viele Fragestellungen ausreichend. Die Zahl ist selten das Problem — die Zusammensetzung schon."
        },
        {
          "text": "Die Stichprobe ist nicht repräsentativ",
          "richtig": true,
          "echo": "Richtig. Vor einer Berufsschule triffst du fast ausschließlich Auszubildende zwischen 16 und 21. Sie sind kein Abbild der Käufer von Bürobedarf — die sitzen in Einkaufsabteilungen. Die Auswahl ist willkürlich, nicht zufällig."
        },
        {
          "text": "Befragungen sind grundsätzlich unzuverlässig",
          "richtig": false,
          "echo": "Zu pauschal. Befragungen sind ein anerkanntes Verfahren — sie stehen und fallen mit der Auswahl der Befragten und der Formulierung der Fragen."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Eine Befragung soll Aussagen über eine größere Zielgruppe ermöglichen.",
    "Die Auswahl der Befragten beeinflusst die Aussagekraft."
  ],
  "erklaerung": "Eine Stichprobe muss repräsentativ sein, nicht bloß groß. Zufalls- und Quotenauswahl können die Zielgruppe angemessen abbilden; eine willkürliche Auswahl verzerrt das Ergebnis. Vor der Auswahl wird deshalb festgelegt, welche Zielgruppe untersucht wird und welche Merkmale in der Stichprobe vorkommen müssen.",
  "beispiele": [
    "Eine zufällig ausgewählte Gruppe kann die Zielgruppe besser abbilden als eine große Gruppe, die nur aus zufällig erreichbaren Personen besteht.",
    "Bei einer Quotenauswahl werden vorher passende Anteile der Zielgruppe festgelegt und bei der Befragung berücksichtigt."
  ],
  "fallbeispiel": "Ein Fragebogen wird nur an die Personen verteilt, die gerade im Eingangsbereich erreichbar sind. Obwohl viele Antworten eingehen, ist die Auswahl willkürlich. Für eine belastbarere Aussage wird die Zielgruppe beschrieben und eine Zufalls- oder Quotenauswahl verwendet. Die Entscheidung lautet daher nicht ‚mehr Antworten‘, sondern ‚passendere Stichprobe‘.",
  "typische_fehler": "Die Stichprobengröße wird mit Repräsentativität gleichgesetzt. Außerdem wird eine willkürliche Auswahl als Zufallsauswahl bezeichnet, obwohl nicht jede Person der Zielgruppe dieselbe Chance hatte.",
  "verstaendnisfragen": [
    "Was ist wichtiger als eine bloße große Zahl? Dass die Stichprobe die Zielgruppe repräsentativ abbildet.",
    "Welche Auswahlverfahren nennt der Inhalt als repräsentativ? Zufallsauswahl und Quotenauswahl."
  ],
  "pruefungsbezug": "Prüfe bei Stichproben zuerst Zielgruppe und Auswahlverfahren. Begründe die Qualität mit Repräsentativität, nicht mit der Anzahl allein.",
  "merksatz": "Nicht die größte, sondern die passende Stichprobe liefert brauchbare Aussagen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Den Fragebogen bauen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Fragebogen aufbauen und typische Fehler vermeiden

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Den Fragebogen bauen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Rahmenlehrplan verlangt ausdrücklich, einen Fragebogen mit den Mitteln eines Textverarbeitungsprogramms zu gestalten — also mit Formularfeldern, Ankreuzkästchen und Auswahllisten. Inhaltlich folgt er einem festen Aufbau."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Teil",
        "Zweck",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Einleitung",
            "Zweck nennen, Anonymität zusichern, Dauer angeben",
            "„Fünf Minuten, anonym, für unsere Sortimentsplanung.“"
          ]
        },
        {
          "zellen": [
            "Eisbrecherfrage",
            "leicht zu beantworten, senkt die Hemmschwelle",
            "„Wie oft kaufen Sie Büromaterial ein?“"
          ]
        },
        {
          "zellen": [
            "Sachfragen",
            "der eigentliche Kern",
            "Zufriedenheit, Wünsche, Preisbereitschaft"
          ]
        },
        {
          "zellen": [
            "Statistische Angaben",
            "zum Schluss, weil persönlich",
            "Alter, Betriebsgröße, Branche"
          ],
          "detail": "**Warum ans Ende:** Wer gleich zu Beginn nach Alter und Einkommen gefragt wird, bricht eher ab. Am Ende hat der Befragte schon investiert und beantwortet auch die unangenehmen Fragen."
        },
        {
          "zellen": [
            "Dank",
            "Abschluss, ggf. Hinweis auf Ergebnisse",
            "„Danke — auf Wunsch schicken wir Ihnen die Auswertung.“"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Vier Fehler, die jeden Fragebogen entwerten: **Suggestivfragen** („Finden Sie unseren Service nicht auch hervorragend?“), **Doppelfragen** (zwei Sachen in einer Frage), **Fachbegriffe**, die der Befragte nicht kennt, und **fehlende Ausweichmöglichkeit** — ohne „weiß nicht“ raten die Leute einfach."
    },
    {
      "typ": "merke",
      "text": "Geschlossene Fragen mit Ankreuzkästchen sind schnell auswertbar, offene Fragen liefern Antworten, an die niemand gedacht hat. Ein guter Bogen hat viele geschlossene und ein bis zwei offene am Ende.",
      "karteikarte": "Wann setzt du offene, wann geschlossene Fragen ein?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welcher Fragebogen-Fehler liegt vor?",
      "kategorien": [
        "Suggestivfrage",
        "Doppelfrage",
        "Fachjargon"
      ],
      "aufgaben": [
        {
          "text": "„Wie zufrieden sind Sie mit Preis und Lieferzeit?“",
          "loesung": "Doppelfrage"
        },
        {
          "text": "„Wie beurteilen Sie unsere Konditionenpolitik?“",
          "loesung": "Fachjargon"
        },
        {
          "text": "„Stimmen Sie zu, dass unser Service besser geworden ist?“",
          "loesung": "Suggestivfrage"
        },
        {
          "text": "„Wie bewerten Sie Sortiment und Beratung?“",
          "loesung": "Doppelfrage"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b3",
  "vorauswissen": [
    "Fragen müssen die gewünschte Information eindeutig erfassen.",
    "Befragte brauchen eine verständliche und faire Antwortmöglichkeit."
  ],
  "erklaerung": "Ein Fragebogen beginnt mit Einleitung und Eisbrecherfragen, führt zu den Sachfragen, fragt statistische Angaben am Ende ab und schließt mit Dank. Suggestivfragen lenken die Antwort, Doppelfragen verlangen zwei Antworten zugleich. Fachjargon und fehlende Ausweichmöglichkeiten können ebenfalls die Aussage verzerren.",
  "beispiele": [
    "‚Wie zufrieden sind Sie mit Preis und Service?‘ ist eine Doppelfrage; Preis und Service sollten getrennt gefragt werden.",
    "Eine Einleitung erklärt Zweck und Ablauf, bevor die Sachfragen beginnen; statistische Angaben werden erst am Ende erhoben."
  ],
  "fallbeispiel": "Ein Fragebogen enthält die Frage ‚Sie finden unseren schnellen und günstigen Service doch gut, oder?‘. Sie ist suggestiv und enthält zwei bewertende Eigenschaften. Die Überarbeitung trennt die Aspekte, formuliert neutral und bietet eine passende Antwortskala sowie eine Ausweichmöglichkeit an.",
  "typische_fehler": "Zwei Themen werden in eine Frage gepackt, die gewünschte Antwort wird sprachlich vorgegeben oder Fachbegriffe werden ohne Erklärung verwendet.",
  "verstaendnisfragen": [
    "Warum ist eine Doppelfrage problematisch? Weil nicht erkennbar ist, worauf sich die Antwort bezieht.",
    "Wozu dient eine Ausweichmöglichkeit? Sie verhindert, dass Befragte eine unpassende Antwort erzwingen müssen."
  ],
  "pruefungsbezug": "Streiche in Überarbeitungsaufgaben wertende Wörter, trenne mehrere Sachverhalte und prüfe, ob jede Frage mit den vorhandenen Antwortmöglichkeiten beantwortbar ist.",
  "merksatz": "Eine gute Frage ist neutral, eindeutig, verständlich und lässt eine passende Antwort zu."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Marketingkonzeption und Produktpolitik

**Datei:** `lf5-k3-produktpolitik.kapitel.json` · SHA-256 `9e1e5b4d14693cc72a9adaa23f6fa95bc1c718bb1fd41afefc8d1cc9f9e26064`

**Konkreter Kapitelauftrag:** Aus einem Marketingziel passende Produktmaßnahmen ableiten; Zielgruppe, Nutzen und Instrumentenabstimmung begründen.

**Einordnung:** Vom Ziel zur Maßnahme — und was mit dem Produkt selbst geschieht.

### c1 · Erst das Ziel, dann die Maßnahme

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Marketingkonzeption von Zielen bis Maßnahmen aufbauen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Erst das Ziel, dann die Maßnahme",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:marketing|Marketing}} ist nicht Werbung. Es ist die Ausrichtung des ganzen Betriebs am Markt — und beginnt nicht mit einer Anzeige, sondern mit einem Ziel. Der Weg dorthin heißt Marketingkonzeption und hat drei Stufen: ==Ziel, Strategie, Maßnahme==."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Stufe",
        "Frage",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Marketingziel",
            "Was wollen wir erreichen?",
            "Marktanteil in NRW von 6 auf 8 % steigern, binnen zwei Jahren"
          ],
          "detail": "**Ein Ziel ohne Zahl und Frist ist kein Ziel.** „Mehr verkaufen“ lässt sich nicht überprüfen und damit auch nicht steuern. Prüfbare Ziele nennen Größe, Höhe und Zeitraum."
        },
        {
          "zellen": [
            "Marketingstrategie",
            "Auf welchem Weg?",
            "Konzentration auf Geschäftskunden statt Privatkunden"
          ]
        },
        {
          "zellen": [
            "Marketingmaßnahmen",
            "Womit konkret?",
            "Außendienst aufstocken, Staffelrabatte, Fachanzeigen"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Ziel, Strategie, Maßnahme — in dieser Reihenfolge. Wer mit der Maßnahme beginnt, macht Werbung ohne Richtung und kann hinterher nicht sagen, ob sie gewirkt hat.",
      "karteikarte": "Aus welchen drei Stufen besteht die Marketingkonzeption, und warum ist die Reihenfolge zwingend?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Marketingmaßnahmen sollen einen konkreten Zweck erfüllen.",
    "Ein Ziel muss später überprüfbar sein."
  ],
  "erklaerung": "Die Marketingkonzeption folgt der Reihenfolge Ziel, Strategie, Maßnahme. Ein Marketingziel braucht eine Größe, eine Zielhöhe und eine Frist. Erst wenn klar ist, was bis wann erreicht werden soll, lässt sich eine passende Strategie wählen und eine konkrete Maßnahme beurteilen.",
  "beispiele": [
    "‚Bekannter werden‘ ist zu unbestimmt; ein Ziel mit Größe, Höhe und Frist kann später an einer konkreten Entwicklung geprüft werden.",
    "Eine Maßnahme wie eine Werbeaktion wird erst sinnvoll, wenn sie aus einer zuvor festgelegten Strategie und einem überprüfbaren Ziel folgt."
  ],
  "fallbeispiel": "Ein Team möchte den Absatz erhöhen und schlägt sofort eine Anzeige vor. Zuerst wird das Ziel mit Größe, Höhe und Frist formuliert. Dann wird die Strategie festgelegt und erst anschließend die Anzeige als Maßnahme ausgewählt. Am Ende wird geprüft, ob die Zielgröße im vorgesehenen Zeitraum erreicht wurde.",
  "typische_fehler": "Eine Maßnahme wird ohne Ziel gestartet oder der Erfolg nur mit ‚war sichtbar‘ bewertet. Außerdem werden Strategie und Maßnahme als Synonyme behandelt.",
  "verstaendnisfragen": [
    "Welche drei Bestandteile braucht ein Marketingziel? Größe, Höhe und Frist.",
    "Was kommt in der Konzeption zuerst? Das Ziel, danach Strategie und Maßnahme."
  ],
  "pruefungsbezug": "Prüfe Zielaufgaben mit der Dreierfrage: Was wird gemessen, welcher Wert soll erreicht werden und bis wann?",
  "merksatz": "Erst das überprüfbare Ziel, dann die Strategie, dann die Maßnahme."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Die vier Instrumente

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die vier Instrumente des Marketing-Mix benennen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Die vier Instrumente",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Für die Maßnahmen stehen vier Werkzeugkästen bereit, zusammen der {{begriff:marketing-mix|Marketing-Mix}}. Sie wirken nur gemeinsam: Ein hervorragendes Produkt zum falschen Preis über den falschen Weg verkauft sich nicht."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Instrument",
        "Regelt",
        "Typische Fragen"
      ],
      "zeilen": [
        {
          "zellen": [
            "Produktpolitik",
            "das Angebot selbst",
            "Was bieten wir an? In welcher Qualität und Verpackung?"
          ]
        },
        {
          "zellen": [
            "Preispolitik",
            "Preis und Konditionen",
            "Was kostet es? Welche Rabatte, welche Zahlungsziele?"
          ]
        },
        {
          "zellen": [
            "Distributionspolitik",
            "den Weg zum Kunden",
            "Direkt oder über den Handel? Eigenes Lager oder Spediteur?"
          ]
        },
        {
          "zellen": [
            "Kommunikationspolitik",
            "das Sprechen darüber",
            "Wie erfährt der Kunde davon? Über welchen Kanal?"
          ],
          "detail": "**Im Englischen die vier P:** Product, Price, Place, Promotion. Diese Merkhilfe wird in Prüfungsaufgaben gern vorausgesetzt, ohne sie zu erklären."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb führt eine Kundenkarte mit Treuepunkten ein. Zu welchem Instrument gehört das?",
      "optionen": [
        {
          "text": "Produktpolitik",
          "richtig": false,
          "echo": "Das Produkt selbst bleibt unverändert. Die Kundenkarte ändert nichts am Angebot, sondern an dem, was der Kunde dafür zahlt."
        },
        {
          "text": "Preispolitik",
          "richtig": true,
          "echo": "Richtig. Treuepunkte sind ein nachträglicher Preisnachlass, also eine Konditionenentscheidung — und Konditionen gehören zur Preispolitik. Dass die Karte auch beworben wird, macht sie nicht zur Kommunikationspolitik."
        },
        {
          "text": "Distributionspolitik",
          "richtig": false,
          "echo": "Der Weg der Ware zum Kunden ändert sich nicht. Distribution betrifft Absatzwege, Lager und Transport."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c2",
  "vorauswissen": [
    "Marketing besteht aus mehreren aufeinander abgestimmten Instrumenten.",
    "Produkt, Preis, Weg und Kommunikation beeinflussen sich gegenseitig."
  ],
  "erklaerung": "Der Marketing-Mix besteht aus Produkt-, Preis-, Distributions- und Kommunikationspolitik, den vier P. Produktpolitik gestaltet das Angebot, Preispolitik die Konditionen, Distributionspolitik den Weg zum Kunden und Kommunikationspolitik die Ansprache. Eine Maßnahme in einem Bereich kann die anderen Bereiche beeinflussen.",
  "beispiele": [
    "Eine Produktvariante braucht eine Preisentscheidung, einen passenden Vertriebsweg und eine Information der Kunden.",
    "Ein günstiger Preis hilft wenig, wenn das Produkt nicht erreichbar ist oder die Kommunikation die Zielgruppe nicht erreicht."
  ],
  "fallbeispiel": "Für ein neues Produkt werden vier Fragen gestellt: Was wird angeboten? Zu welchem Preis? Über welchen Weg erreicht es den Kunden? Wie wird darüber informiert? Die Antworten ordnen Produkt-, Preis-, Distributions- und Kommunikationspolitik zu. Erst das Zusammenspiel ergibt den Marketing-Mix.",
  "typische_fehler": "Marketing wird nur mit Werbung gleichgesetzt oder die vier P werden als unabhängige Einzelentscheidungen behandelt. Außerdem wird Distribution mit Kommunikation verwechselt.",
  "verstaendnisfragen": [
    "Welche vier Instrumente gehören zum Marketing-Mix? Produkt, Preis, Distribution und Kommunikation.",
    "Welche Frage beantwortet die Distributionspolitik? Wie das Angebot zum Kunden gelangt."
  ],
  "pruefungsbezug": "Ordne Fallmaßnahmen nach dem Gegenstand zu: Angebot, Preis, Weg oder Ansprache. Begründe bei einer Konzeption das Zusammenspiel.",
  "merksatz": "Die vier P decken ab, was angeboten, bezahlt, verteilt und kommuniziert wird."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · Produktpolitik

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Produktpolitische Maßnahmen und den Produktlebenszyklus anwenden

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "Produktpolitik",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:produktpolitik|Produktpolitik}} entscheidet über das Angebot selbst. Vier Maßnahmen stehen zur Wahl — und die vierte fällt am schwersten."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Maßnahme",
        "Was geschieht",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Produktinnovation",
            "etwas Neues kommt ins Sortiment",
            "erstmals nachhaltige Papierlinie"
          ]
        },
        {
          "zellen": [
            "Produktvariation",
            "ein bestehendes Produkt wird verändert und ersetzt das alte",
            "neue Rezeptur, altes Produkt entfällt"
          ]
        },
        {
          "zellen": [
            "Produktdifferenzierung",
            "eine Variante tritt neben das bestehende Produkt",
            "zusätzlich eine XL-Packung"
          ],
          "detail": "**Der Unterschied zur Variation ist die häufigste Prüfungsfalle:** Bei der Variation gibt es danach *ein* Produkt, bei der Differenzierung *zwei*."
        },
        {
          "zellen": [
            "Produktelimination",
            "ein Produkt fliegt aus dem Sortiment",
            "Ladenhüter wird ausgelistet"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Wann welche Maßnahme sinnvoll ist, hängt davon ab, wo das Produkt in seinem Leben steht. Dafür gibt es den {{begriff:produktlebenszyklus|Produktlebenszyklus}}."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Fünf Phasen",
      "titel": "Der Produktlebenszyklus",
      "lead": "Jede Phase verlangt andere Maßnahmen. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Einführung",
          "satz": "Umsatz niedrig · Gewinn negativ",
          "text": "Das Produkt ist neu und unbekannt. Hohe Kosten für Werbung und Vertrieb, noch kein Gewinn. Ziel ist Bekanntheit, nicht Ertrag."
        },
        {
          "nr": 2,
          "titel": "Wachstum",
          "satz": "Umsatz steigt stark · Gewinn wird positiv",
          "text": "Der Markt nimmt das Produkt an, die Stückzahlen steigen. Jetzt kommen die ersten Nachahmer — der Preis gerät unter Druck."
        },
        {
          "nr": 3,
          "titel": "Reife",
          "satz": "Umsatz steigt langsamer · Gewinn am höchsten",
          "text": "Die ertragreichste Phase. Der Markt ist weitgehend erschlossen, die Kosten sind gesunken. Hier wird das Geld verdient, mit dem Neues finanziert wird."
        },
        {
          "nr": 4,
          "titel": "Sättigung",
          "satz": "Umsatz erreicht den Höhepunkt",
          "text": "Jeder, der das Produkt will, hat es. Wachstum nur noch über Ersatzkäufe. Typische Reaktion: Produktvariation oder -differenzierung, um den Zyklus zu strecken."
        },
        {
          "nr": 5,
          "titel": "Rückgang",
          "satz": "Umsatz und Gewinn fallen",
          "text": "Das Produkt verliert an Bedeutung. Jetzt ist die Entscheidung fällig: relaunchen oder eliminieren. Beides zu spät zu tun kostet am meisten."
        }
      ],
      "regel": "Die Kurve zeigt den Umsatz, nicht den Gewinn — beide erreichen ihren Höhepunkt zu unterschiedlichen Zeiten. Der Gewinn kippt früher."
    },
    {
      "typ": "merke",
      "text": "{{begriff:sortiment|Sortimentsbreite}} = wie viele verschiedene Warengruppen. **Sortimentstiefe** = wie viele Varianten je Gruppe. Ein Fachgeschäft ist schmal und tief, ein Discounter breit und flach.",
      "karteikarte": "Was ist der Unterschied zwischen Sortimentsbreite und Sortimentstiefe?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c3",
  "vorauswissen": [
    "Ein Produkt kann sich im Zeitverlauf verändern.",
    "Sortimente bestehen aus Warengruppen und Varianten."
  ],
  "erklaerung": "Produktpolitik umfasst Innovation, Variation, Differenzierung und Elimination. Bei der Variation wird das alte Produkt ersetzt; bei der Differenzierung steht eine Variante daneben. Der Produktlebenszyklus führt von Einführung über Wachstum und Reife zu Sättigung und Rückgang. Sortimentsbreite meint die Zahl der Warengruppen, Sortimentstiefe die Varianten je Gruppe.",
  "beispiele": [
    "Wird eine bisherige Produktversion durch eine neue ersetzt, liegt Variation vor; bleibt sie bestehen und kommt eine Variante hinzu, liegt Differenzierung vor.",
    "Ein Sortiment mit vielen Warengruppen ist breit; viele Varianten innerhalb einer Warengruppe machen es tief."
  ],
  "fallbeispiel": "Ein Betrieb ersetzt sein bisheriges Produkt vollständig durch eine neue Version. Das ist Variation, nicht Differenzierung. Wird zusätzlich zur bisherigen Version eine weitere Ausführung angeboten, wäre es Differenzierung. Für die Lebenszyklusplanung wird anschließend geprüft, ob sich das Produkt in Einführung, Wachstum, Reife, Sättigung oder Rückgang befindet.",
  "typische_fehler": "Variation und Differenzierung werden vertauscht. Ebenso wird angenommen, der Gewinn sei in der Sättigung am höchsten; der vorhandene Inhalt ordnet den höchsten Gewinn der Reife zu.",
  "verstaendnisfragen": [
    "Was ist der Prüfstein zwischen Variation und Differenzierung? Wird das alte Produkt ersetzt oder bleibt es neben einer Variante bestehen?",
    "Was beschreibt Sortimentsbreite und -tiefe? Breite = Zahl der Warengruppen, Tiefe = Zahl der Varianten je Gruppe."
  ],
  "pruefungsbezug": "Ordne Produktmaßnahmen über die Frage ‚ein Produkt oder zwei?‘ und Lebenszyklusaufgaben über die fünf Phasen zu.",
  "merksatz": "Variation ersetzt, Differenzierung ergänzt; Breite zählt Gruppen, Tiefe zählt Varianten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Preispolitik

**Datei:** `lf5-k4-preispolitik.kapitel.json` · SHA-256 `d3c25f747cf6215307838370f1ebbb12fb9a871a5f1ef084ab0b9c4056cea5e7`

**Konkreter Kapitelauftrag:** Einen Verkaufspreis unter Kosten-, Nachfrage- und Wettbewerbsaspekten beurteilen; Rabattwirkung mit Marge vergleichen.

**Einordnung:** Der Preis ist das einzige Instrument, das Geld einbringt statt kostet.

### d1 · Wie ein Preis entsteht

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Kosten- und marktorientierte Preisbildung unterscheiden

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Wie ein Preis entsteht",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:preispolitik|Preispolitik}} ist unter den vier Instrumenten die schnellste: Eine Preisänderung wirkt sofort, während ein neues Produkt Monate braucht. Sie ist auch die gefährlichste — ==ein Prozent Preisnachlass kostet direkt ein Prozent Umsatz==, während ein Prozent mehr Werbung nur Kosten verursacht."
    },
    {
      "typ": "absatz",
      "text": "Für die Preisfindung gibt es zwei Denkrichtungen, und in der Praxis treffen sie sich in der Mitte."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Ansatz",
        "Ausgangspunkt",
        "Grenze"
      ],
      "zeilen": [
        {
          "zellen": [
            "Kostenorientiert",
            "eigene Selbstkosten plus Gewinnzuschlag",
            "der Markt zahlt es womöglich nicht"
          ],
          "detail": "**Das ist die Handelskalkulation aus Lernfeld 6:** vom Einstandspreis über die Selbstkosten zum Listenverkaufspreis. Sie sagt dir, was du mindestens verlangen musst — nicht, was du verlangen kannst."
        },
        {
          "zellen": [
            "Marktorientiert",
            "Preis der Konkurrenz, Zahlungsbereitschaft",
            "deckt womöglich die Kosten nicht"
          ],
          "detail": "**Hier arbeitet die Rückwärtskalkulation:** Der Markt gibt den Preis vor, du rechnest zurück und erfährst, was der Einkauf höchstens kosten darf. Passt es nicht, ist das Produkt nicht machbar — nicht der Preis zu niedrig."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Die kostenorientierte Rechnung liefert die **Preisuntergrenze**, der Markt die **Preisobergrenze**. Zwischen beiden liegt der Spielraum. Liegt die Untergrenze über der Obergrenze, gibt es keinen Spielraum — dann muss an den Kosten gearbeitet werden, nicht am Preis.",
      "karteikarte": "Was liefert die kostenorientierte, was die marktorientierte Preisbildung — und was passiert, wenn beide sich nicht treffen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Ein Preis muss Kosten decken und am Markt akzeptiert werden.",
    "Kosten- und Marktsicht liefern unterschiedliche Grenzen."
  ],
  "erklaerung": "Die kostenorientierte Preisbildung liefert die Preisuntergrenze, weil darunter die eigenen Kosten nicht gedeckt sind. Die marktorientierte Betrachtung liefert die Preisobergrenze, weil der Markt die Zahlungsbereitschaft begrenzt. Liegt die Untergrenze über der Obergrenze, reicht eine einfache Preisentscheidung nicht; die Kosten müssen geprüft und bearbeitet werden.",
  "beispiele": [
    "Ein Preis unterhalb der Kostenuntergrenze kann kurzfristig attraktiv aussehen, deckt aber die Kosten nicht.",
    "Ein Preis oberhalb der vom Markt akzeptierten Obergrenze wird trotz Kostendeckung nicht nachgefragt."
  ],
  "fallbeispiel": "Die Kostenrechnung ergibt eine Untergrenze, die Marktforschung eine niedrigere Obergrenze. Zuerst wird nicht einfach ein Mittelwert gewählt. Die Grenzen werden gegenübergestellt: Ist die Untergrenze höher als die Obergrenze, muss der Betrieb an den Kosten arbeiten oder die Marktsituation neu beurteilen. Erst danach wird ein tragfähiger Preis festgelegt.",
  "typische_fehler": "Untergrenze und Obergrenze werden vertauscht oder der höchste mögliche Preis automatisch als bester Preis angesehen. Auch wird übersehen, dass eine nicht passende Kostensituation bearbeitet werden muss.",
  "verstaendnisfragen": [
    "Woher kommt die Preisuntergrenze? Aus den Kosten.",
    "Woher kommt die Preisobergrenze? Aus dem Markt beziehungsweise der Zahlungsbereitschaft."
  ],
  "pruefungsbezug": "Schreibe in Preisfällen zuerst ‚Kosten = Untergrenze‘ und ‚Markt = Obergrenze‘. Vergleiche anschließend beide Grenzen.",
  "merksatz": "Kosten begrenzen nach unten, Markt und Zahlungsbereitschaft nach oben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Zwei Wege bei neuen Produkten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Preisstrategien für neue Produkte auswählen und begründen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Zwei Wege bei neuen Produkten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Wer ein neues Produkt einführt, hat eine Grundsatzentscheidung zu treffen: hoch einsteigen und langsam senken — oder tief einsteigen und den Markt schnell besetzen."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Strategien",
      "titel": "Abschöpfung oder Durchdringung",
      "lead": "Dasselbe Produkt, zwei gegensätzliche Preisstrategien.",
      "seiten": [
        {
          "name": "Abschöpfung (Skimming)",
          "ton": "gold",
          "punkte": [
            {
              "text": "Hoher Einstiegspreis, schrittweise Senkung",
              "detail": "Zuerst wird bei denen abgeschöpft, die bereit sind, viel zu zahlen — danach werden preisbewusstere Käufer nachgeholt."
            },
            {
              "text": "Entwicklungskosten kommen schnell zurück",
              "detail": "Gerade bei Technik mit hohem Forschungsaufwand ist das oft der einzige Weg, die Investition zu refinanzieren."
            },
            {
              "text": "Setzt einen Vorsprung voraus",
              "detail": "Funktioniert nur, solange es keinen gleichwertigen Wettbewerber gibt — sonst kauft niemand den hohen Preis."
            },
            {
              "text": "Risiko: lockt Nachahmer an",
              "detail": "Hohe Preise signalisieren hohe Margen. Genau das zieht Wettbewerber an, und zwar schnell."
            }
          ]
        },
        {
          "name": "Durchdringung (Penetration)",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Niedriger Einstiegspreis, später Anhebung",
              "detail": "Der Preis liegt anfangs nahe an den Kosten oder darunter, um schnell viele Kunden zu gewinnen."
            },
            {
              "text": "Schneller Marktanteil",
              "detail": "Wer früh viele Kunden hat, profitiert von Bekanntheit, Gewohnheit und sinkenden Stückkosten."
            },
            {
              "text": "Schreckt Wettbewerber ab",
              "detail": "Ein niedriger Marktpreis macht den Einstieg für andere unattraktiv — die Margen sind von Anfang an dünn."
            },
            {
              "text": "Risiko: der Preis lässt sich schwer erhöhen",
              "detail": "Kunden gewöhnen sich an den Einstiegspreis. Spätere Anhebungen werden als Verschlechterung empfunden."
            }
          ]
        }
      ],
      "regel": "Faustregel: Abschöpfung bei technischem Vorsprung, Durchdringung bei austauschbaren Produkten in einem Massenmarkt."
    },
    {
      "typ": "absatz",
      "text": "Wie stark eine Preisänderung überhaupt wirkt, beschreibt die {{begriff:preiselastizitaet|Preiselastizität}}. Reagiert die Nachfrage stark, ist sie elastisch — dann kostet schon eine kleine Erhöhung viel Absatz. Bei unelastischer Nachfrage, etwa bei Grundnahrungsmitteln oder Medikamenten, ändert sich kaum etwas."
    },
    {
      "typ": "check",
      "frage": "Ein Hersteller bringt ein technisch überlegenes Gerät auf den Markt, das es so noch nicht gibt. Welche Strategie liegt nahe?",
      "optionen": [
        {
          "text": "Penetration, um schnell Marktanteil zu holen",
          "richtig": false,
          "echo": "Möglich, aber es verschenkt Geld. Solange kein Wettbewerber existiert, gibt es Käufer, die deutlich mehr zahlen würden — ein niedriger Einstiegspreis lässt diesen Ertrag liegen."
        },
        {
          "text": "Skimming, weil ein Vorsprung besteht",
          "richtig": true,
          "echo": "Richtig. Ein technischer Vorsprung ist genau die Voraussetzung für die Abschöpfungsstrategie: Zuerst zahlen die Interessierten den hohen Preis, danach wird schrittweise gesenkt und die nächste Käuferschicht erschlossen. Der Nachteil bleibt: hohe Preise ziehen Nachahmer an."
        },
        {
          "text": "Preis genau auf Höhe der Konkurrenz",
          "richtig": false,
          "echo": "Es gibt keine vergleichbare Konkurrenz — daran lässt sich also gar nicht anknüpfen."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d2",
  "vorauswissen": [
    "Neue Produkte können unterschiedlich in den Markt eingeführt werden.",
    "Markt- und Wettbewerbssituation bestimmen die passende Preisstrategie."
  ],
  "erklaerung": "Beim Skimming wird mit einem hohen Preis gestartet und der Preis langsam gesenkt. Das passt zu technischem Vorsprung. Bei der Penetration wird mit einem niedrigen Preis gestartet, um schnell Marktanteile zu gewinnen; das passt zu austauschbaren Massenprodukten. Die Strategie muss zum Produkt und Markt passen.",
  "beispiele": [
    "Ein Produkt mit technischem Vorsprung kann zunächst über Skimming einen hohen Preis durchsetzen.",
    "Bei einem austauschbaren Massenprodukt kann Penetration über einen tiefen Einstiegspreis Marktanteile gewinnen."
  ],
  "fallbeispiel": "Ein neues Produkt besitzt einen technischen Vorsprung und spricht zunächst Kundinnen und Kunden an, die dafür zahlen. Die passende Strategie ist Skimming: hoch einsteigen und später senken. Wäre das Produkt austauschbar und der Massenmarkt entscheidend, wäre Penetration mit niedrigem Einstiegspreis die passendere Wahl.",
  "typische_fehler": "Skimming wird mit niedrigem Einstiegspreis und Penetration mit hohem Einstiegspreis verbunden. Außerdem wird die Strategie ohne Bezug zu Vorsprung, Austauschbarkeit und Marktgröße gewählt.",
  "verstaendnisfragen": [
    "Welche Richtung hat Skimming? Hoher Einstiegspreis, anschließend langsame Senkung.",
    "Wann passt Penetration? Bei austauschbaren Massenprodukten, wenn schnell Marktanteile gewonnen werden sollen."
  ],
  "pruefungsbezug": "Suche in Falltexten nach ‚technischer Vorsprung‘ oder ‚Massenmarkt‘. Diese Stichwörter führen meist direkt zu Skimming oder Penetration.",
  "merksatz": "Skimming schöpft oben ab; Penetration dringt unten in den Markt ein."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d3 · Konditionen sind auch Preis

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Konditionen als Teil der Preispolitik einordnen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d3",
  "titel": "Konditionen sind auch Preis",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zur Preispolitik gehört mehr als die Zahl auf dem Etikett. Rabatte, Skonto, Zahlungsziele und Lieferbedingungen verändern den tatsächlich gezahlten Preis — oft stärker als eine Preisänderung selbst, und deutlich unauffälliger."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kondition",
        "Wirkung",
        "Aus Lernfeld 6"
      ],
      "zeilen": [
        {
          "zellen": [
            "Mengenrabatt",
            "Anreiz für größere Bestellmengen",
            "mindert den Rechnungsbetrag sofort"
          ]
        },
        {
          "zellen": [
            "Treuerabatt",
            "bindet den Kunden über Zeit",
            "wird nicht separat gebucht"
          ]
        },
        {
          "zellen": [
            "Skonto",
            "Anreiz für schnelle Zahlung",
            "separat gebucht als Aufwand oder Ertrag"
          ],
          "detail": "**Der Zusammenhang mit Lernfeld 6:** Zwei Prozent Skonto bei zwanzig Tagen entsprechen etwa 36 Prozent Jahreszins. Für den Kunden ist das ein starker Anreiz — für dich als Anbieter ein teures Instrument, das du bewusst einsetzen solltest."
        },
        {
          "zellen": [
            "Zahlungsziel",
            "verschafft dem Kunden Liquidität",
            "bindet deine eigene"
          ]
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Zu welchem Instrument des Marketing-Mix gehört die Maßnahme?",
      "kategorien": [
        "Produkt",
        "Preis",
        "Distribution",
        "Kommunikation"
      ],
      "aufgaben": [
        {
          "text": "Ab 500 Stück gibt es 5 % Nachlass.",
          "loesung": "Preis"
        },
        {
          "text": "Die Ware wird künftig auch über einen Onlineshop verkauft.",
          "loesung": "Distribution"
        },
        {
          "text": "Die Verpackung wird auf Recyclingmaterial umgestellt.",
          "loesung": "Produkt"
        },
        {
          "text": "Eine Anzeige erscheint in der Branchenzeitschrift.",
          "loesung": "Kommunikation"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Rabatte wirken sofort und lassen sich schwer zurücknehmen. Wer regelmäßig nachlässt, erzieht seine Kunden dazu, auf den nächsten Nachlass zu warten — und verkauft danach nichts mehr zum Listenpreis. Zeitlich befristete Aktionen sind deshalb weniger schädlich als dauerhafte Nachlässe."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d3",
  "vorauswissen": [
    "Der Preis besteht nicht nur aus dem Listenpreis.",
    "Kunden reagieren unterschiedlich stark auf Preisänderungen."
  ],
  "erklaerung": "Preispolitik umfasst auch Rabatte, Skonto und Zahlungsziele, selbst wenn der Listenpreis unverändert bleibt. Die Preiselastizität beschreibt, wie stark die Nachfrage auf eine Preisänderung reagiert. Bei hoher Reaktion kann eine Preisänderung die Nachfrage deutlich verändern; bei geringer Reaktion fällt die Mengenänderung schwächer aus.",
  "beispiele": [
    "Ein Rabatt senkt den tatsächlich gezahlten Preis, obwohl der Listenpreis gleich bleibt.",
    "Ein Skonto verändert den Preis bei schneller Zahlung; ein Zahlungsziel verändert den Zeitpunkt der Zahlung und damit die Kondition."
  ],
  "fallbeispiel": "Ein Betrieb plant keine Listenpreissenkung, bietet aber Rabatt und Skonto an. Für die Preisentscheidung werden beide Konditionen berücksichtigt, weil sie den tatsächlich erzielten Preis verändern. Anschließend wird beobachtet, wie stark die Nachfrage auf diese Änderung reagiert; genau diese Reaktion beschreibt die Preiselastizität.",
  "typische_fehler": "Nur der Listenpreis wird betrachtet oder Skonto mit einem dauerhaften Rabatt gleichgesetzt. Die Preiselastizität wird außerdem als Preis selbst statt als Reaktion der Nachfrage verstanden.",
  "verstaendnisfragen": [
    "Welche Konditionen gehören zur Preispolitik? Unter anderem Rabatte, Skonto und Zahlungsziele.",
    "Was misst Preiselastizität? Wie stark die Nachfrage auf Preisänderungen reagiert."
  ],
  "pruefungsbezug": "Prüfe bei Preisfällen den tatsächlich erzielten Preis und die Reaktion der Menge, nicht nur die Zahl auf der Preisliste.",
  "merksatz": "Konditionen verändern den Preis, auch wenn die Preisliste gleich aussieht."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Distributionspolitik

**Datei:** `lf5-k5-distribution.kapitel.json` · SHA-256 `1943706d542e2bea51fdb370c244a35168b7ae737f37c02a105fca06a29fd5cb`

**Konkreter Kapitelauftrag:** Direkten Verkauf und Absatzmittler für dieselbe Zielgruppe vergleichen; Reichweite, Kosten und Kontrolle abwägen.

**Einordnung:** Wie die Ware zum Kunden kommt — und wer daran verdient.

### e1 · Direkt oder über andere

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Direkten und indirekten Absatzweg unterscheiden und bewerten

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e1",
  "titel": "Direkt oder über andere",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:distributionspolitik|Distributionspolitik}} beantwortet eine einzige große Frage: Verkaufst du selbst an den Endkunden oder schaltest du jemanden dazwischen? ==Beides hat einen Preis== — der eine kostet Aufwand, der andere Marge."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Absatzwege",
      "titel": "Direkt oder indirekt",
      "lead": "Dieselbe Ware, zwei Wege zum Kunden.",
      "seiten": [
        {
          "name": "Direkter Absatz",
          "ton": "gold",
          "punkte": [
            {
              "text": "Hersteller verkauft unmittelbar an den Kunden",
              "detail": "Über eigenen Außendienst, eigene Filialen, den eigenen Onlineshop oder ab Werk."
            },
            {
              "text": "Voller Kundenkontakt",
              "detail": "Du weißt, wer kauft, warum und was er reklamiert. Diese Daten sind die Grundlage jeder Kundenbindung."
            },
            {
              "text": "Keine Handelsspanne abzugeben",
              "detail": "Die Marge, die sonst beim Händler bleibt, bleibt im Haus."
            },
            {
              "text": "Aber: hoher eigener Aufwand",
              "detail": "Vertrieb, Lager, Versand, Rechnungsstellung und Reklamationen müssen selbst organisiert werden — bei vielen kleinen Kunden schnell teurer als die Handelsspanne."
            }
          ]
        },
        {
          "name": "Indirekter Absatz",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Über Groß- und Einzelhandel",
              "detail": "Der {{begriff:absatzmittler|Absatzmittler}} kauft auf eigene Rechnung und verkauft weiter."
            },
            {
              "text": "Große Reichweite ohne eigenen Aufbau",
              "detail": "Der Handel hat Standorte, Kunden und Logistik bereits — du nutzt sie mit."
            },
            {
              "text": "Weniger Verwaltung",
              "detail": "Statt tausend Endkunden hast du ein paar Händler als Rechnungsempfänger."
            },
            {
              "text": "Aber: Handelsspanne und Abstand zum Kunden",
              "detail": "Du verdienst weniger je Stück und erfährst kaum, was am Ende der Kette passiert. Preis- und Auftrittsgestaltung liegen teilweise nicht mehr in deiner Hand."
            }
          ]
        }
      ],
      "regel": "Faustregel: Wenige große Kunden sprechen für den direkten Weg, viele kleine für den indirekten. Erklärungsbedürftige Produkte ebenfalls für direkt."
    },
    {
      "typ": "merke",
      "text": "Der indirekte Weg kostet dich die Handelsspanne, der direkte den Aufwand. Die Frage ist nie, welcher billiger ist, sondern welcher bei *deiner* Kundenzahl billiger ist.",
      "karteikarte": "Wann lohnt der direkte, wann der indirekte Absatzweg?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e1",
  "vorauswissen": [
    "Ein Produkt muss den Kunden nicht nur überzeugen, sondern auch erreichen.",
    "Der Vertriebsweg beeinflusst Kundenkontakt, Aufwand und Marge."
  ],
  "erklaerung": "Distributionspolitik regelt den Weg der Ware zum Kunden. Beim direkten Absatz verkauft der Hersteller selbst: Er hat vollen Kundenkontakt und keine Handelsspanne abzugeben, trägt aber den höheren Verwaltungs- und Vertriebsaufwand. Beim indirekten Absatz werden Groß- und Einzelhandel eingeschaltet; die Reichweite steigt, der Aufwand im eigenen Betrieb sinkt, dafür wird die Marge geringer.",
  "beispiele": [
    "Ein Hersteller verkauft im eigenen Vertrieb direkt an den Kunden und erhält den vollständigen Kundenkontakt.",
    "Über Groß- und Einzelhandel erreicht die Ware mehr Kunden, wird aber durch weitere Handelsstufen geführt."
  ],
  "fallbeispiel": "Ein Betrieb muss zwischen eigenem Verkauf und dem Weg über den Handel entscheiden. Beim direkten Absatz prüft er, ob er den zusätzlichen Verwaltungsaufwand leisten kann und den Kundenkontakt braucht. Beim indirekten Absatz prüft er Reichweite und geringere Marge. Die Entscheidung richtet sich damit nicht nur nach dem kürzesten Weg, sondern nach Kontakt, Aufwand und Ertrag.",
  "typische_fehler": "Indirekter Absatz wird als schlechter bezeichnet, weil eine Handelsspanne entsteht. Außerdem wird direkter Absatz mit geringem Aufwand gleichgesetzt, obwohl der Betrieb mehr selbst organisieren muss.",
  "verstaendnisfragen": [
    "Was ist der zentrale Unterschied? Beim direkten Absatz verkauft der Hersteller selbst; beim indirekten Absatz stehen Handelsstufen dazwischen.",
    "Welche typische Folge hat indirekter Absatz? Größere Reichweite, weniger eigene Verwaltung, aber geringere Marge."
  ],
  "pruefungsbezug": "Vergleiche bei Fallaufgaben immer Kundenkontakt, Verwaltungsaufwand, Reichweite und Marge. Danach den passenden Absatzweg begründen.",
  "merksatz": "Direkt bedeutet voller Kontakt und eigener Aufwand; indirekt bedeutet Handelsstufen und größere Reichweite."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e2 · Mittler und Helfer

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Absatzmittler und Absatzhelfer voneinander abgrenzen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e2",
  "titel": "Mittler und Helfer",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zwischen Hersteller und Kunde treten zwei verschiedene Sorten von Beteiligten auf, und sie werden regelmäßig verwechselt. Der Unterschied liegt darin, ==wem die Ware unterwegs gehört==."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Rolle",
        "Wird Eigentümer?",
        "Beispiele"
      ],
      "zeilen": [
        {
          "zellen": [
            "Absatzmittler",
            "ja — kauft auf eigene Rechnung",
            "Großhandel, Einzelhandel"
          ],
          "detail": "**Er trägt das Risiko.** Weil ihm die Ware gehört, bleibt er auf ihr sitzen, wenn sie sich nicht verkauft. Deshalb verlangt er eine Spanne — sie ist der Preis für dieses Risiko."
        },
        {
          "zellen": [
            "Absatzhelfer",
            "nein — vermittelt oder transportiert nur",
            "Handelsvertreter, Makler, Spediteur"
          ],
          "detail": "**Er trägt kein Warenrisiko** und erhält deshalb keine Spanne, sondern Provision oder Entgelt. Der Handelsvertreter verkauft in fremdem Namen auf fremde Rechnung."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Handelsvertreter verkauft im Namen deines Betriebs an Geschäftskunden. Was ist er?",
      "optionen": [
        {
          "text": "Absatzmittler, weil er verkauft",
          "richtig": false,
          "echo": "Verkaufen allein macht ihn nicht zum Mittler. Entscheidend ist, ob ihm die Ware zwischenzeitlich gehört — beim Handelsvertreter nicht."
        },
        {
          "text": "Absatzhelfer, weil er kein Eigentum erwirbt",
          "richtig": true,
          "echo": "Richtig. Der Handelsvertreter handelt in fremdem Namen auf fremde Rechnung und wird nie Eigentümer. Er trägt kein Warenrisiko und erhält deshalb Provision statt Handelsspanne. Der Vertrag kommt direkt zwischen deinem Betrieb und dem Kunden zustande — der Absatz bleibt damit ein direkter."
        },
        {
          "text": "Weder noch, er ist Angestellter",
          "richtig": false,
          "echo": "Ein Handelsvertreter ist selbstständig. Ein angestellter Verkäufer wäre Teil des eigenen Vertriebs — der Handelsvertreter arbeitet auf eigene Rechnung, verkauft aber fremde Ware."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Für die Prüfung reicht eine einzige Frage zur Einordnung: Gehört die Ware unterwegs jemand anderem als dir? Wenn ja, ist es ein Absatzmittler und der Weg ist indirekt. Wenn nein, bleibt es dein direkter Absatz — auch wenn jemand anderes ihn abwickelt."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e2",
  "vorauswissen": [
    "Nicht alle Beteiligten im Vertrieb werden Eigentümer der Ware.",
    "Eigentum und Vermittlung sind die entscheidenden Unterscheidungsmerkmale."
  ],
  "erklaerung": "Absatzmittler kaufen auf eigene Rechnung, werden Eigentümer und tragen das Warenrisiko. Dazu gehören Groß- und Einzelhandel. Absatzhelfer unterstützen den Vertrieb, werden aber nicht Eigentümer: Handelsvertreter, Makler und Spediteure gehören zu dieser Gruppe. Die Merksfrage lautet: Gehört die Ware unterwegs jemand anderem?",
  "beispiele": [
    "Ein Einzelhändler kauft die Ware auf eigene Rechnung und trägt das Risiko, sie nicht weiterzuverkaufen: Absatzmittler.",
    "Ein Handelsvertreter vermittelt Geschäfte, ohne Eigentümer der Ware zu werden; ein Spediteur transportiert sie ebenfalls nur."
  ],
  "fallbeispiel": "In einer Zuordnung stehen Einzelhändler, Handelsvertreter, Makler und Spediteur. Der Einzelhändler kauft auf eigene Rechnung und wird Eigentümer, daher Absatzmittler. Handelsvertreter und Makler vermitteln, der Spediteur transportiert; keiner wird Eigentümer. Sie sind Absatzhelfer.",
  "typische_fehler": "Jede Person zwischen Hersteller und Kunde wird als Mittler bezeichnet. Entscheidend ist aber nicht die Position im Weg, sondern Eigentum, eigene Rechnung und Warenrisiko.",
  "verstaendnisfragen": [
    "Woran erkennst du einen Absatzmittler? Er wird Eigentümer und trägt das Warenrisiko.",
    "Welche drei Absatzhelfer nennt der Inhalt? Handelsvertreter, Makler und Spediteure."
  ],
  "pruefungsbezug": "Prüfe bei jeder beteiligten Person nur die Eigentumsfrage und ergänze eigene Rechnung beziehungsweise Warenrisiko.",
  "merksatz": "Wer Eigentümer wird, ist Mittler; wer nur vermittelt oder transportiert, ist Helfer."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Kommunikationspolitik und Kundenbindung

**Datei:** `lf5-k6-kommunikation.kapitel.json` · SHA-256 `795f0b31b4b851cb3238883702c91f977a9660750a5a9f237d9fdd2a76ac0ed3`

**Konkreter Kapitelauftrag:** Einen vollständigen Werbeplan für eine kleine Kampagne ausfüllen; Zielgruppe, Kanal, Zeitpunkt, Etat, Ethik und Wirkungsmessung verbinden.

**Einordnung:** Wie du gehört wirst — und warum das Halten günstiger ist als das Gewinnen.

### f1 · Vier Arten zu sprechen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Instrumente der Kommunikationspolitik unterscheiden

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f1",
  "titel": "Vier Arten zu sprechen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:kommunikationspolitik|Kommunikationspolitik}} ist alles, womit ein Betrieb über sich und seine Leistung spricht. Werbung ist nur ein Teil davon — und selten der wirksamste."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Instrument",
        "Was es tut",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Werbung",
            "bezahlte Botschaft an viele",
            "Anzeige, Plakat, Onlinewerbung"
          ]
        },
        {
          "zellen": [
            "Verkaufsförderung",
            "kurzfristiger Anstoß am Verkaufsort",
            "Aktionspreis, Warenprobe, Display"
          ],
          "detail": "**{{begriff:verkaufsfoerderung|Verkaufsförderung}} ist immer befristet.** Wird sie dauerhaft, gewöhnt sich der Kunde daran und sie verliert ihre Wirkung — dann ist sie faktisch eine Preissenkung."
        },
        {
          "zellen": [
            "Öffentlichkeitsarbeit",
            "Ansehen des Betriebs pflegen",
            "Pressemitteilung, Tag der offenen Tür, Sponsoring"
          ],
          "detail": "**Der Unterschied zur Werbung:** {{begriff:oeffentlichkeitsarbeit|Öffentlichkeitsarbeit}} bewirbt kein Produkt, sondern den Betrieb als Ganzes. Sie wirkt langsamer, dafür glaubwürdiger — weil sie nicht wie Werbung aussieht."
        },
        {
          "zellen": [
            "Persönlicher Verkauf",
            "direktes Gespräch mit dem Kunden",
            "Außendienst, Beratung, Messe"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Werbung erreicht viele oberflächlich, der persönliche Verkauf wenige gründlich. Je erklärungsbedürftiger und teurer das Produkt, desto weiter verschiebt sich das Gewicht zum Gespräch.",
      "karteikarte": "Welche vier Instrumente hat die Kommunikationspolitik, und wodurch unterscheidet sich Öffentlichkeitsarbeit von Werbung?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f1",
  "vorauswissen": [
    "Ein Betrieb kann über unterschiedliche Wege mit seinem Markt kommunizieren.",
    "Nicht jede Kommunikation bewirbt direkt ein einzelnes Produkt."
  ],
  "erklaerung": "Kommunikationspolitik umfasst Werbung, Verkaufsförderung, Öffentlichkeitsarbeit und persönlichen Verkauf. Verkaufsförderung ist immer befristet; eine dauerhafte Maßnahme wird zur Preissenkung. Öffentlichkeitsarbeit bewirbt den Betrieb und sein Ansehen, nicht ein einzelnes Produkt. Der persönliche Verkauf arbeitet mit dem direkten Gespräch.",
  "beispiele": [
    "Eine zeitlich begrenzte Aktion ist Verkaufsförderung; eine dauerhafte Preisreduzierung ist keine befristete Verkaufsförderung mehr.",
    "Eine Darstellung der Unternehmensleistungen und des Betriebs ist Öffentlichkeitsarbeit, während eine Produktanzeige Werbung ist."
  ],
  "fallbeispiel": "Ein Betrieb plant eine befristete Aktion für ein Produkt und gleichzeitig eine Information über seine Rolle als Ausbildungsbetrieb. Die Produktaktion wird als Verkaufsförderung eingeordnet. Die Information über den Betrieb ist Öffentlichkeitsarbeit. Beide Maßnahmen gehören zur Kommunikationspolitik, verfolgen aber unterschiedliche Gegenstände.",
  "typische_fehler": "Öffentlichkeitsarbeit und Werbung werden gleichgesetzt oder jede Preisaktion als Verkaufsförderung bezeichnet, obwohl sie dauerhaft angelegt ist.",
  "verstaendnisfragen": [
    "Welche vier Kommunikationsarten gehören zum Inhalt? Werbung, Verkaufsförderung, Öffentlichkeitsarbeit und persönlicher Verkauf.",
    "Was bewirbt Öffentlichkeitsarbeit? Den Betrieb beziehungsweise sein Ansehen, nicht unmittelbar ein einzelnes Produkt."
  ],
  "pruefungsbezug": "Ordne eine Maßnahme über Dauer und Gegenstand zu: befristete Aktivierung, Produktwerbung, Betriebsbild oder persönliches Verkaufsgespräch.",
  "merksatz": "Kommunikation kann Produkt, Aktion, Betrieb oder persönliches Gespräch zum Gegenstand haben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f2 · Werbung planen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine Werbemaßnahme nach der AIDA-Formel planen und rechtliche Grenzen beachten

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f2",
  "titel": "Werbung planen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Werbung wirkt nicht, weil sie schön ist, sondern weil sie eine Reihenfolge einhält. Die bekannteste Beschreibung dieser Reihenfolge ist die {{begriff:aida|AIDA-Formel}}. Sie ist über hundert Jahre alt und beschreibt trotzdem noch, warum die meisten Anzeigen scheitern: ==Sie springen von der Aufmerksamkeit direkt zur Handlung.=="
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Vier Stufen",
      "titel": "Die AIDA-Formel",
      "lead": "Jede Stufe setzt die vorherige voraus. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Attention — Aufmerksamkeit",
          "satz": "Wahrgenommen werden",
          "text": "Ohne diesen Schritt passiert nichts Weiteres. Auffälliges Bild, ungewöhnliche Zahl, direkte Frage. Die schwierigste Stufe, weil hier alle anderen Botschaften konkurrieren."
        },
        {
          "nr": 2,
          "titel": "Interest — Interesse",
          "satz": "Relevanz zeigen",
          "text": "Der Empfänger muss erkennen, dass es um ihn geht. Hier entscheidet sich, ob er weiterliest — mit einem Nutzen, nicht mit einer Produkteigenschaft."
        },
        {
          "nr": 3,
          "titel": "Desire — Wunsch",
          "satz": "Besitzen wollen",
          "text": "Aus „interessant“ wird „das will ich“. Dafür braucht es einen konkreten Vorteil und meist einen Beweis: Zahl, Beispiel, Testergebnis."
        },
        {
          "nr": 4,
          "titel": "Action — Handlung",
          "satz": "Den nächsten Schritt möglich machen",
          "text": "Bestellnummer, Link, Telefonnummer, Öffnungszeit. Wer keinen klaren nächsten Schritt anbietet, verliert genau hier alle, die er überzeugt hat."
        }
      ],
      "regel": "Der häufigste Fehler ist die übersprungene dritte Stufe: Aufmerksamkeit erzeugen und sofort zum Kauf auffordern, ohne je einen Grund geliefert zu haben."
    },
    {
      "typ": "absatz",
      "text": "Werbung hat rechtliche Grenzen, und zwei davon trifft jeder Azubi im Büroalltag. {{par:uwg-5|§ 5 UWG}} verbietet irreführende Angaben — auch Übertreibungen, die als Tatsache erscheinen. Und {{par:uwg-7|§ 7 UWG}} verlangt für Werbung per E-Mail, Telefon oder Fax grundsätzlich die ==vorherige ausdrückliche Einwilligung==."
    },
    {
      "typ": "achtung",
      "text": "Eine Werbemail an einen Geschäftskunden, der nie eingewilligt hat, ist keine Bagatelle: Sie ist eine unzumutbare Belästigung im Sinne des Gesetzes und kann abgemahnt werden. Auch die Adressen aus einer gekauften Liste ändern daran nichts — die Einwilligung muss dir gegenüber erteilt worden sein."
    },
    {
      "typ": "check",
      "frage": "Eine Anzeige zeigt ein auffälliges Bild und darunter groß „Jetzt bestellen!“ — sonst nichts. Welche AIDA-Stufe fehlt?",
      "optionen": [
        {
          "text": "Attention",
          "richtig": false,
          "echo": "Die ist vorhanden: Das auffällige Bild erzeugt Aufmerksamkeit. Genau daran scheitert die Anzeige aber nicht."
        },
        {
          "text": "Interest und Desire",
          "richtig": true,
          "echo": "Richtig. Zwischen Aufmerksamkeit und Handlungsaufforderung fehlt jeder Grund: kein Nutzen, kein Vorteil, kein Beleg. Der Empfänger weiß nicht, worum es geht und warum es ihn betrifft — die Aufforderung läuft deshalb ins Leere."
        },
        {
          "text": "Action",
          "richtig": false,
          "echo": "„Jetzt bestellen“ ist die Handlungsaufforderung — sie ist da. Nur fehlt jeder Grund, ihr zu folgen."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f2",
  "vorauswissen": [
    "Werbung soll Aufmerksamkeit in eine Handlung überführen.",
    "Rechtliche Grenzen gelten unabhängig vom Werbeziel."
  ],
  "erklaerung": "AIDA beschreibt die Stufen Attention, Interest, Desire und Action. Jede Stufe baut auf der vorherigen auf: Aufmerksamkeit allein reicht nicht, wenn kein Interesse und kein Wunsch entstehen. Nach § 5 UWG ist irreführende Werbung verboten. Werbung per Mail, Telefon oder Fax setzt nach § 7 UWG die vorherige Einwilligung voraus.",
  "beispiele": [
    "Eine Anzeige, die auffällt, aber keinen Wunsch nach dem Produkt und keine Handlungsaufforderung auslöst, bleibt bei Attention oder Interest stehen.",
    "Eine Werbemail wird nicht allein durch einen attraktiven Inhalt zulässig; die vorherige Einwilligung ist zu prüfen."
  ],
  "fallbeispiel": "Eine Anzeige fällt durch ein großes Bild auf, erklärt aber keinen Nutzen und enthält keine Handlungsaufforderung. In AIDA fehlen mindestens Desire und Action. Bei der Überarbeitung werden Nutzen und Wunsch aufgebaut und anschließend eine konkrete Handlung ermöglicht. Zusätzlich wird geprüft, dass keine irreführende Aussage verwendet wird.",
  "typische_fehler": "AIDA wird als lose Sammlung von Begriffen gelernt oder die fehlende Desire-Stufe übersehen. Werberecht wird auf eine Quellenangabe reduziert, obwohl Irreführung und Einwilligung geprüft werden müssen.",
  "verstaendnisfragen": [
    "Wofür steht AIDA? Attention, Interest, Desire, Action.",
    "Welche zwei Rechtsmerksätze gelten? Keine irreführende Werbung und vorherige Einwilligung für Werbung per Mail, Telefon oder Fax."
  ],
  "pruefungsbezug": "Prüfe Werbeanzeigen stufenweise und nenne bei Rechtsfällen ausdrücklich § 5 beziehungsweise § 7 UWG als vorhandenen Bezug.",
  "merksatz": "Erst Aufmerksamkeit, dann Interesse, Wunsch und Handlung — AIDA ist eine Kette."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f3 · Kunden halten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Maßnahmen der Kundenbindung begründen und Beschwerden nutzen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f3",
  "titel": "Kunden halten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Titel dieses Lernfelds nennt zwei Dinge: akquirieren **und** binden. Der zweite Teil wird meist unterschätzt, obwohl er der wirtschaftlichere ist — ==einen bestehenden Kunden zu halten kostet ein Vielfaches weniger, als einen neuen zu gewinnen==, weil Erstansprache, Vertrauensaufbau und Erstberatung entfallen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art der Bindung",
        "Wie sie wirkt",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Wirtschaftlich",
            "ein Wechsel kostet Geld",
            "Rahmenvertrag, Bonusprogramm"
          ]
        },
        {
          "zellen": [
            "Technisch",
            "ein Wechsel kostet Aufwand",
            "eingebundene Schnittstelle, geschulte Mitarbeiter"
          ]
        },
        {
          "zellen": [
            "Vertraglich",
            "ein Wechsel ist zeitweise ausgeschlossen",
            "Laufzeit, Kündigungsfrist"
          ],
          "detail": "**Vorsicht mit dieser Form.** Wer nur bleibt, weil er muss, ist kein gebundener Kunde, sondern ein wartender. Sobald die Frist abläuft, ist er weg — und er erzählt anderen davon."
        },
        {
          "zellen": [
            "Emotional",
            "ein Wechsel lohnt nicht",
            "Zufriedenheit, persönlicher Ansprechpartner, Vertrauen"
          ],
          "detail": "**Die einzige Bindung, die freiwillig ist** — und deshalb die einzige, die auch Empfehlungen erzeugt. Sie entsteht nicht durch Programme, sondern durch verlässliche Erfahrungen."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Die technische Grundlage dafür ist das {{begriff:crm|Kundenbeziehungsmanagement}}: eine Datenbank, in der Kontakte, Käufe, Angebote und Anliegen zusammenlaufen. Sie ersetzt keine Beziehung, aber sie ermöglicht sie — weil jeder im Betrieb weiß, was zuletzt besprochen wurde."
    },
    {
      "typ": "merke",
      "text": "Ein {{begriff:beschwerdemanagement|gut behandelter Beschwerdeführer}} ist danach oft treuer als ein Kunde, der nie ein Problem hatte. Der Grund: Er hat erlebt, dass du auch dann verlässlich bist, wenn etwas schiefgeht — und genau das kann keine Werbung behaupten.",
      "karteikarte": "Warum kann eine gut bearbeitete Beschwerde die Kundenbindung stärken?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Art der Kundenbindung liegt vor?",
      "kategorien": [
        "Wirtschaftlich",
        "Technisch",
        "Vertraglich",
        "Emotional"
      ],
      "aufgaben": [
        {
          "text": "Der Kunde hat eine Mindestlaufzeit von 24 Monaten unterschrieben.",
          "loesung": "Vertraglich"
        },
        {
          "text": "Die Bestellsoftware des Kunden ist an unser System angebunden.",
          "loesung": "Technisch"
        },
        {
          "text": "Ab dem dritten Jahr steigt der Treuerabatt.",
          "loesung": "Wirtschaftlich"
        },
        {
          "text": "Der Kunde ruft immer denselben Ansprechpartner an und vertraut ihm.",
          "loesung": "Emotional"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Wenn eine Beschwerde eingeht, entscheiden die ersten Minuten. Vier Schritte, die fast immer funktionieren: zuhören ohne zu unterbrechen, den Ärger anerkennen, eine konkrete Lösung mit Termin nennen, und nachfassen, ob sie gewirkt hat. Der letzte Schritt wird fast immer vergessen — und ist der, an den sich der Kunde erinnert."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f3",
  "vorauswissen": [
    "Kundenbindung kann auf unterschiedlichen Bindungsarten beruhen.",
    "Ein bestehender Kunde muss nicht neu gewonnen werden."
  ],
  "erklaerung": "Kundenbindung kann wirtschaftlich, technisch, vertraglich oder emotional entstehen. Nur die emotionale Bindung ist freiwillig; die anderen beruhen auf Preisvorteilen, technischen Systemen oder Verträgen. Einen Kunden zu halten ist deutlich günstiger, als einen neuen zu gewinnen. Deshalb gehört nach dem Kauf auch die Pflege der Beziehung in die Marketingaufgabe.",
  "beispiele": [
    "Ein Vertrag bindet über seine Laufzeit vertraglich; ein technisches System kann den Wechsel erschweren und dadurch technische Bindung erzeugen.",
    "Ein Unternehmen kann Kunden über wirtschaftliche Vorteile halten oder durch gute persönliche Erfahrungen emotional binden."
  ],
  "fallbeispiel": "Ein Betrieb verliert Kunden trotz guter Einzelwerbung. Die Analyse prüft zuerst die vier Bindungsarten und die Zeit nach dem Kauf. Fehlen verlässliche Nachbetreuung und passende Vorteile, wird nicht nur mehr Werbung geschaltet, sondern die bestehende Kundenbeziehung verbessert. So wird das Halten von Kunden als eigene Aufgabe sichtbar.",
  "typische_fehler": "Kundenbindung wird nur mit Rabatt gleichgesetzt oder jede Bindung als freiwillig angesehen. Außerdem wird nur die Neukundengewinnung betrachtet, obwohl bestehende Kunden wirtschaftlich günstiger zu halten sind.",
  "verstaendnisfragen": [
    "Welche vier Bindungsarten gibt es? Wirtschaftliche, technische, vertragliche und emotionale Bindung.",
    "Welche ist freiwillig? Die emotionale Kundenbindung."
  ],
  "pruefungsbezug": "Ordne Fallbeispiele nach dem Bindungsgrund und begründe zusätzlich, warum Kundenpflege eine eigene Marketingmaßnahme ist.",
  "merksatz": "Kundenbindung beginnt nach dem Kauf; emotional bleibt nur, wer freiwillig bleibt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
