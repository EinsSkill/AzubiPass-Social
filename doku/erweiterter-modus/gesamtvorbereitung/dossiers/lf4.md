# lf4 · Sachgüter und Dienstleistungen beschaffen und Verträge schließen

Quelle: `quellen/lf4.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 7 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Bedarf ermitteln und Bestände steuern

**Datei:** `lf4-k1-bedarf.kapitel.json` · SHA-256 `cfec014e7a2fd229bd7cd2e99403fc6791d775cca3757bfc89299b1cdf2fb1c7`

**Konkreter Kapitelauftrag:** Für unterschiedliche Materialarten Bedarf und Bestellzeitpunkt planen; Verbrauch, Bestand, Sicherheitsreserve und Lagerfolgen erklären.

**Einordnung:** Zu wenig kostet den Auftrag. Zu viel kostet Geld.

### b1 · Was gebraucht wird — und wie man es herausfindet

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bedarfsarten unterscheiden und Ermittlungsverfahren zuordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Was gebraucht wird — und wie man es herausfindet",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jede Beschaffung beginnt mit einer Frage: Was brauchen wir, wie viel davon, und wann? Die {{begriff:bedarfsermittlung|Bedarfsermittlung}} beantwortet sie. ==Wer sie überspringt, bestellt entweder zu spät und legt die Produktion still, oder zu früh und bindet Geld in Regalen.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Verfahren",
        "Grundlage",
        "Passt zu"
      ],
      "zeilen": [
        {
          "zellen": [
            "Deterministisch",
            "konkreter Auftrag, Stückliste",
            "A-Güter, teure Teile"
          ],
          "detail": "**Gerechnet, nicht geschätzt.** Aus dem Kundenauftrag ergibt sich exakt, wie viel Material nötig ist. Für 300 Ordner brauchst du 300 Rückenschilder — das muss niemand schätzen."
        },
        {
          "zellen": [
            "Stochastisch",
            "Verbrauch der Vergangenheit",
            "C-Güter, Verbrauchsmaterial"
          ],
          "detail": "**Aus Erfahrungswerten hochgerechnet.** Wie viel Kopierpapier im letzten Quartal wegging, sagt gut voraus, wie viel im nächsten weggeht. Genauigkeit ist hier weniger wichtig als der geringe Aufwand."
        },
        {
          "zellen": [
            "Subjektiv",
            "Schätzung, Erfahrung",
            "Neues ohne Vergangenheitswerte"
          ],
          "detail": "**Die schwächste Methode** — aber bei einem neuen Produkt gibt es keine Zahlen, auf die man sich stützen könnte. Wird ersetzt, sobald echte Verbrauchsdaten vorliegen."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Deterministisch heißt **gerechnet**, stochastisch heißt **aus dem Verbrauch geschätzt**. Der Aufwand muss zum Wert des Materials passen: Für Schreibblöcke rechnet niemand mit Stücklisten.",
      "karteikarte": "Welche drei Verfahren der Bedarfsermittlung gibt es, und wovon hängt die Wahl ab?"
    },
    {
      "typ": "praxistipp",
      "text": "Merk dir die Verfahren über den Preis des Materials, nicht über die Namen. Teuer und planbar heißt rechnen. Billig und ständig gebraucht heißt schätzen. Damit ordnest du in der Prüfung jedes Beispiel richtig zu."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Bedarf bedeutet, welche Menge eines Materials zu welchem Zeitpunkt benötigt wird.",
    "Die Planungsmethode soll zum Wert und zur Vorhersagbarkeit des Materials passen."
  ],
  "erklaerung": "Die deterministische Bedarfsermittlung rechnet aus einem konkreten Auftrag oder einer Stückliste. Die stochastische Bedarfsermittlung nutzt den Verbrauch der Vergangenheit. Die subjektive Bedarfsermittlung greift auf Erfahrung und Schätzung zurück, wenn noch keine belastbaren Verbrauchsdaten vorhanden sind. Die Wahl ist deshalb eine Abwägung zwischen Genauigkeit und Planungsaufwand.",
  "beispiele": [
    "Für 300 bestellte Ordner werden 300 Rückenschilder benötigt: Der Bedarf ist aus dem Auftrag ableitbar und damit deterministisch.",
    "Kopierpapier wird anhand des Verbrauchs im letzten Quartal geplant; bei einem neuen Produkt ohne Vergangenheitswerte bleibt zunächst nur eine subjektive Schätzung."
  ],
  "fallbeispiel": "Ein Betrieb plant drei Materialien: Rückenschilder für einen konkreten Auftrag werden aus der Stückzahl berechnet. Kopierpapier wird aus vergangenen Verbrauchswerten hochgerechnet. Für ein völlig neues Produkt ohne Auftrag und Verbrauchsdaten wird zunächst die Erfahrung der zuständigen Person genutzt. Sobald echte Verbrauchsdaten vorliegen, kann die Schätzung durch eine stochastische Planung ersetzt werden.",
  "typische_fehler": "Stochastisch und subjektiv werden gleichgesetzt, obwohl die stochastische Methode auf Vergangenheitsdaten beruht. Umgekehrt wird für billiges Verbrauchsmaterial eine unnötig genaue Stückliste erstellt, obwohl der Aufwand den Wert übersteigt.",
  "verstaendnisfragen": [
    "Was ist der Kernunterschied zwischen deterministisch und stochastisch? Deterministisch wird aus einem konkreten Bedarf gerechnet; stochastisch wird aus vergangenen Verbräuchen geschätzt.",
    "Wann ist subjektive Bedarfsermittlung nachvollziehbar? Wenn keine geeigneten Auftrags- oder Verbrauchsdaten vorhanden sind."
  ],
  "pruefungsbezug": "In Zuordnungsaufgaben zuerst die Informationsquelle markieren: konkreter Auftrag = deterministisch, Vergangenheit = stochastisch, Erfahrung ohne Daten = subjektiv.",
  "merksatz": "Deterministisch heißt gerechnet, stochastisch heißt aus Verbrauchsdaten geschätzt, subjektiv heißt erfahrungsbasiert geschätzt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Nicht alles ist gleich wichtig: die ABC-Analyse

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine ABC-Analyse durchführen und begründen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Nicht alles ist gleich wichtig: die ABC-Analyse",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "In fast jedem Lager gilt dasselbe Muster: Wenige Materialarten machen den größten Teil des Einkaufswerts aus, und sehr viele Materialarten machen fast nichts aus. Die {{begriff:abc-analyse|ABC-Analyse}} macht dieses Muster sichtbar und leitet daraus ab, wo sich Planungsaufwand lohnt."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Drei Klassen",
      "titel": "Wo sich Aufwand lohnt",
      "lead": "Die Anteile sind Richtwerte, keine Gesetze. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "A-Güter",
          "ton": "gold",
          "punkte": [
            {
              "text": "Wenig Menge, viel Wert",
              "detail": "Grob etwa ein Fünftel der Materialarten, aber rund vier Fünftel des Einkaufswerts. Hier liegt das Geld."
            },
            {
              "text": "Deterministisch planen",
              "detail": "Bedarf wird gerechnet, nicht geschätzt. Der Aufwand lohnt sich, weil jeder Prozentpunkt Einsparung viel Geld bedeutet."
            },
            {
              "text": "Sorgfältig verhandeln",
              "detail": "Angebotsvergleich, Preisverhandlung, mehrere Bezugsquellen. Bei A-Gütern rechnet sich der Aufwand fast immer."
            },
            {
              "text": "Kleine Bestellmengen, häufig",
              "detail": "Weniger Kapital im Lager gebunden. Bei hohem Wert je Stück wiegt das schwerer als die höheren Bestellkosten."
            }
          ]
        },
        {
          "name": "C-Güter",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Viel Menge, wenig Wert",
              "detail": "Etwa die Hälfte der Materialarten, aber nur ein kleiner einstelliger Prozentsatz des Werts. Schrauben, Klebeband, Notizblöcke."
            },
            {
              "text": "Stochastisch planen",
              "detail": "Aus dem Verbrauch geschätzt. Eine genaue Planung würde mehr kosten, als sie einspart."
            },
            {
              "text": "Vereinfacht beschaffen",
              "detail": "Rahmenverträge, Sammelbestellungen, ein fester Lieferer. Für 4 Euro Klebeband holt niemand drei Angebote ein."
            },
            {
              "text": "Große Mengen, selten",
              "detail": "Genau umgekehrt zu den A-Gütern: Das gebundene Kapital ist gering, die Bestellkosten fallen dagegen ins Gewicht."
            }
          ]
        }
      ],
      "regel": "B-Güter liegen dazwischen und werden nach Bedarf mal wie A, mal wie C behandelt. Die Zahlen sind Faustwerte — in der Prüfung wird die Einteilung gerechnet, nicht auswendig gewusst."
    },
    {
      "typ": "absatz",
      "text": "Gerechnet wird die Analyse immer gleich: **Jahresverbrauch mal Preis** ergibt den Jahreswert je Material. Danach sortiert man absteigend, bildet die Summe von oben nach unten und schaut, wo die Grenzen liegen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Material",
        "Menge/Jahr",
        "Preis",
        "Jahreswert",
        "Klasse"
      ],
      "zeilen": [
        {
          "zellen": [
            "Kopierer-Toner",
            "120",
            "180,00 €",
            "21.600,00 €",
            "A"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Aktenordner",
            "2.400",
            "2,10 €",
            "5.040,00 €",
            "B"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Kopierpapier (Paket)",
            "900",
            "3,40 €",
            "3.060,00 €",
            "B"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Kugelschreiber",
            "3.000",
            "0,35 €",
            "1.050,00 €",
            "C"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Haftnotizen",
            "1.800",
            "0,45 €",
            "810,00 €",
            "C"
          ],
          "mono": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Die Klasse hängt am **Wert**, nicht an der Menge. Kugelschreiber sind mit 3.000 Stück die zweitgrößte Menge im Lager und trotzdem C-Gut. Wer nach Stückzahl sortiert, bekommt in der Prüfung die Analyse falsch herum."
    },
    {
      "typ": "check",
      "frage": "Ein Material hat einen Jahresverbrauch von 40 Stück bei 950 € je Stück. Der gesamte Materialverbrauch des Betriebs liegt bei 50.000 € im Jahr; als A-Güter gelten die Materialien, die zusammen rund 75–80 % des Werts ausmachen. Wie behandelst du es?",
      "optionen": [
        {
          "text": "C-Gut — die Menge ist sehr klein",
          "richtig": false,
          "echo": "Die Menge sagt nichts. 40 × 950 € sind 38.000 € Jahreswert, das sind 76 % des gesamten Materialwerts — damit ein A-Gut."
        },
        {
          "text": "A-Gut — hoher Jahreswert, also genau planen",
          "richtig": true,
          "echo": "Richtig. 38.000 € von 50.000 € sind 76 % des Jahreswerts — bei nur 40 Stück das typische A-Gut: wenig Menge, viel Wert. Bedarf genau rechnen, Angebote sorgfältig vergleichen, eher kleine Mengen häufiger bestellen."
        },
        {
          "text": "Lässt sich auch mit diesen Angaben nicht sagen",
          "richtig": false,
          "echo": "Ohne Gesamtwert und Klassengrenze wäre das richtig — die ABC-Klasse ergibt sich immer aus dem Anteil am Gesamtwert, nie aus einem Eurobetrag allein. Hier sind aber beide Angaben gegeben: 76 % liegen im A-Bereich."
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
    "Der Wert eines Materials ergibt sich aus Jahresverbrauch mal Preis.",
    "Die ABC-Analyse ordnet Materialien nach ihrem Jahreswert, nicht nach ihrer Stückzahl."
  ],
  "ablauf": [
    "Für jedes Material Jahresverbrauch und Preis zusammentragen.",
    "Jahreswert mit Menge mal Preis berechnen.",
    "Materialien nach Jahreswert absteigend sortieren.",
    "Kumulierte Werte bilden und daraus A-, B- und C-Güter ableiten."
  ],
  "erklaerung": "Die ABC-Analyse konzentriert den Planungsaufwand auf die Materialien, bei denen finanziell am meisten auf dem Spiel steht. A-Güter haben einen hohen Jahreswert und werden deshalb sorgfältig geplant. C-Güter haben einen kleinen Wert; dort ist eine vereinfachte Beschaffung sinnvoll. B-Güter liegen dazwischen.",
  "beispiele": [
    "120 Toner zu 180 € ergeben 21.600 € Jahreswert und gehören in der vorhandenen Tabelle zu A.",
    "3.000 Kugelschreiber zu 0,35 € ergeben nur 1.050 € Jahreswert und sind trotz der hohen Stückzahl C-Güter."
  ],
  "fallbeispiel": "Ein Material wird 40-mal pro Jahr zu 950 € benötigt. Jahreswert: 40 × 950 € = 38.000 €. Der gesamte Materialverbrauch liegt bei 50.000 €, das Material macht also 76 % des Werts aus. Die Menge ist klein, der Wertanteil aber sehr hoch. Deshalb wird es als A-Gut behandelt: Bedarf möglichst genau bestimmen, Angebote sorgfältig vergleichen und den Bestand nicht unnötig groß machen.",
  "typische_fehler": "Die Klasse wird nach Menge statt nach Wert vergeben — oder nach einem absoluten Eurobetrag ohne Vergleich: 38.000 € sind bei 50.000 € Gesamtwert 76 %, bei 38 Mio. € nur 0,1 %. Auch die Richtwerte der ABC-Analyse werden als starre gesetzliche Grenzen behandelt, obwohl die vorhandene Grafik sie ausdrücklich als Faustwerte bezeichnet.",
  "verstaendnisfragen": [
    "Warum können wenige Stück A-Güter sein? Weil der Preis je Stück den Jahreswert stark erhöhen kann.",
    "Warum werden C-Güter vereinfacht beschafft? Weil eine sehr genaue Planung bei geringem Jahreswert mehr Aufwand verursachen kann, als sie einspart."
  ],
  "pruefungsbezug": "Immer zuerst den Jahreswert berechnen und die Materialien danach sortieren. Erst die kumulierte Wertbetrachtung entscheidet über die Klasse.",
  "merksatz": "ABC richtet sich nach dem Jahreswert: Menge mal Preis, nicht nach der Menge allein."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Wann muss bestellt werden?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Meldebestand berechnen und Bestandsgrößen erklären

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `merke-1`, `vertiefung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wann muss bestellt werden?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der {{begriff:meldebestand|Meldebestand}} ist die wichtigste Zahl der Lagersteuerung. Er beantwortet nicht, *wie viel* bestellt wird, sondern *wann*. ==Er ist genau so bemessen, dass der verbleibende Vorrat noch bis zur Ankunft der neuen Lieferung reicht.=="
    },
    {
      "typ": "grafik",
      "variante": "lagerkurve",
      "kopf": "Der Sägezahn",
      "titel": "Wann muss bestellt werden?",
      "lead": "Vier Zahlen, ein Bild. Schieb die Werte und sieh, wie die Meldelinie wandert.",
      "eingaben": {
        "verbrauch": {
          "label": "Tagesverbrauch in Stück",
          "start": 50,
          "min": 5,
          "max": 300,
          "schritt": 5
        },
        "lieferzeit": {
          "label": "Lieferzeit in Tagen",
          "start": 6,
          "min": 1,
          "max": 30,
          "schritt": 1
        },
        "mindest": {
          "label": "Mindestbestand in Stück",
          "start": 200,
          "min": 0,
          "max": 1500,
          "schritt": 50
        },
        "menge": {
          "label": "Bestellmenge in Stück",
          "start": 1200,
          "min": 100,
          "max": 4000,
          "schritt": 100
        }
      },
      "regel": "Meldebestand = Tagesverbrauch × Lieferzeit + Mindestbestand. Verlängert sich die Lieferzeit, muss früher bestellt werden — die Meldelinie wandert nach oben, ohne dass sich am Verbrauch etwas ändert."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Größe",
        "Bedeutung",
        "Wenn sie fehlt"
      ],
      "zeilen": [
        {
          "zellen": [
            "{{begriff:mindestbestand|Mindestbestand}}",
            "eiserner Vorrat als Puffer",
            "jede Störung führt zum Stillstand"
          ],
          "detail": "**Der Puffer für den Ausnahmefall:** Lieferer kommt zwei Tage später, Verbrauch steigt unerwartet. Wird er regelmäßig angetastet, ist er zu niedrig angesetzt."
        },
        {
          "zellen": [
            "{{begriff:meldebestand|Meldebestand}}",
            "Auslöser für die Bestellung",
            "man bestellt zu spät"
          ],
          "detail": "**Die einzige Größe, die gerechnet wird:** Tagesverbrauch × Lieferzeit + Mindestbestand. Alles andere sind Festlegungen."
        },
        {
          "zellen": [
            "{{begriff:hoechstbestand|Höchstbestand}}",
            "Obergrenze des Lagers",
            "Kapital und Fläche werden gebunden"
          ],
          "detail": "**Meist Mindestbestand plus Bestellmenge.** Was darüber liegt, kostet Lagerkosten und Zinsen, ohne die Lieferfähigkeit zu verbessern."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Meldebestand = Tagesverbrauch × Lieferzeit + Mindestbestand.** Die Formel ist die meistgerechnete Aufgabe dieses Lernfelds — und sie ist die einzige, die du wirklich auswendig brauchst.",
      "karteikarte": "Wie berechnet sich der Meldebestand, und was passiert mit ihm, wenn sich die Lieferzeit verlängert?"
    },
    {
      "typ": "vertiefung",
      "titel": "Warum es eine optimale Bestellmenge gibt",
      "absaetze": [
        "Zwei Kostenarten laufen gegeneinander. Je größer die Bestellmenge, desto seltener wird bestellt — die **Bestellkosten je Stück** sinken. Gleichzeitig liegt mehr Ware länger im Lager, die **Lagerkosten** steigen.",
        "Die {{begriff:optimale-bestellmenge|optimale Bestellmenge}} ist der Punkt, an dem die Summe beider Kosten am kleinsten ist. Grafisch ist es der tiefste Punkt der Gesamtkostenkurve, rechnerisch die Stelle, an der Bestell- und Lagerkosten gleich hoch sind.",
        "Für die Prüfung im ersten Lehrjahr genügt meist das Verständnis dieses Zielkonflikts. Die Andlersche Formel selbst wird eher im dritten Lehrjahr verlangt — sie unterstellt gleichmäßigen Verbrauch und feste Preise, was in der Praxis selten zutrifft."
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Bestandsgröße ist gemeint?",
      "kategorien": [
        "Mindestbestand",
        "Meldebestand",
        "Höchstbestand"
      ],
      "aufgaben": [
        {
          "text": "Wird bei Erreichen unterschritten und löst die Bestellung aus.",
          "loesung": "Meldebestand"
        },
        {
          "text": "Soll im Normalbetrieb gar nicht angetastet werden.",
          "loesung": "Mindestbestand"
        },
        {
          "text": "Wird direkt nach dem Wareneingang erreicht.",
          "loesung": "Höchstbestand"
        },
        {
          "text": "Steigt, wenn der Lieferer länger braucht.",
          "loesung": "Meldebestand"
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
    "Der Meldebestand löst die Bestellung aus.",
    "Der Mindestbestand ist ein Puffer, der normalerweise nicht angetastet werden soll."
  ],
  "ablauf": [
    "Tagesverbrauch feststellen.",
    "Tagesverbrauch mit der Lieferzeit multiplizieren.",
    "Mindestbestand addieren.",
    "Bei Erreichen des Meldebestands bestellen und die Bestellmenge berücksichtigen."
  ],
  "erklaerung": "Der Meldebestand beschreibt nicht die gewünschte Bestellmenge, sondern den Zeitpunkt der Bestellung. Während der Lieferzeit wird weiter verbraucht; der Bestand muss deshalb noch für diese Tage reichen. Der Mindestbestand schützt zusätzlich vor Lieferverzögerungen oder unerwartet höherem Verbrauch.",
  "beispiele": [
    "Bei 50 Stück Tagesverbrauch, sechs Tagen Lieferzeit und 200 Stück Mindestbestand liegt der Meldebestand bei 50 × 6 + 200 = 500 Stück.",
    "Verlängert sich die Lieferzeit, steigt der Meldebestand, weil während des Wartens mehr Stück verbraucht werden."
  ],
  "fallbeispiel": "Setze die Werte der Lagergrafik ein: Tagesverbrauch 50 Stück, Lieferzeit sechs Tage, Mindestbestand 200 Stück. Rechnung: 50 × 6 = 300 Stück Verbrauch während der Lieferzeit; 300 + 200 = 500 Stück Meldebestand. Wird bei 500 bestellt und beträgt die Bestellmenge 1.200 Stück, liegt der Bestand nach dem Wareneingang rechnerisch bei 1.400 Stück, sofern der Mindestbestand nicht verändert wurde.",
  "typische_fehler": "Meldebestand und Mindestbestand werden verwechselt. Außerdem wird die Bestellmenge in die Formel des Meldebestands eingesetzt, obwohl sie erst für den Bestand nach dem Wareneingang relevant ist.",
  "verstaendnisfragen": [
    "Was passiert mit dem Meldebestand bei längerer Lieferzeit? Er steigt, weil mehr Verbrauch überbrückt werden muss.",
    "Warum wird der Mindestbestand addiert? Er soll als Puffer auch nach dem Verbrauch während der Lieferzeit noch vorhanden sein."
  ],
  "pruefungsbezug": "Die Formel zuerst vollständig hinschreiben: Tagesverbrauch × Lieferzeit + Mindestbestand. Danach Einheiten und Ergebnis auf Plausibilität prüfen.",
  "merksatz": "Meldebestand = Tagesverbrauch × Lieferzeit + Mindestbestand."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Bezugsquellen finden und anfragen

**Datei:** `lf4-k2-bezugsquellen.kapitel.json` · SHA-256 `2b65531a8f8286714ae053108e0be91229f44e8f83e20d6bb926df1bc08315a8`

**Konkreter Kapitelauftrag:** Zwei Lieferanten anhand belastbarer Quellen auswählen und anfragen; notwendige Angaben und Nachhaltigkeitskriterien begründen.

**Einordnung:** Wer nicht fragt, zahlt den Listenpreis.

### b1 · Woher die Lieferer kommen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bezugsquellen ermitteln und Lieferer bewerten

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Woher die Lieferer kommen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Bevor angefragt wird, muss klar sein, wen man überhaupt anfragt. Betriebsinterne Quellen sind schneller und billiger als externe — ==die eigene Lieferantenkartei ist fast immer die erste Adresse, weil dort steht, wer in der Vergangenheit zuverlässig war.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Quelle",
        "Art",
        "Stärke"
      ],
      "zeilen": [
        {
          "zellen": [
            "Lieferantenkartei, alte Rechnungen",
            "intern",
            "kostenlos, Erfahrung liegt vor"
          ],
          "detail": "**Der billigste Weg.** Wer schon einmal geliefert hat, ist bekannt: Preise, Termintreue, Reklamationsverhalten. Diese Information hat kein Katalog."
        },
        {
          "zellen": [
            "Branchenverzeichnisse, Onlineportale",
            "extern",
            "breite Übersicht, schnell"
          ]
        },
        {
          "zellen": [
            "Messen und Fachausstellungen",
            "extern",
            "Ware sehen, Menschen kennenlernen"
          ],
          "detail": "**Besonders bei erklärungsbedürftigen Gütern.** Man sieht Verarbeitung und Qualität, statt sie aus Datenblättern zu erraten."
        },
        {
          "zellen": [
            "IHK, Fachverbände",
            "extern",
            "geprüfte Adressen, neutral"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Bei bekannten Lieferern hilft die {{begriff:lieferantenbewertung|Lieferantenbewertung}}: Preis, Qualität, Termintreue und Service werden laufend erfasst. Sie ist die Grundlage dafür, wen man beim nächsten Bedarf überhaupt noch anfragt."
    },
    {
      "typ": "merke",
      "text": "**Erst intern suchen, dann extern.** Und die Zahl der Anfragen richtet sich nach dem Wert: Bei A-Gütern lohnen sich mehrere Angebote, bei C-Gütern genügt der bekannte Lieferer.",
      "karteikarte": "Welche internen und externen Bezugsquellen gibt es, und warum sucht man zuerst intern?"
    },
    {
      "typ": "praxistipp",
      "text": "Ein einziger Lieferer ist bequem und gefährlich. Fällt er aus, steht die Beschaffung. Bei wichtigen Materialien lohnt sich ein zweiter Lieferer, auch wenn er etwas teurer ist — das ist der Preis der Unabhängigkeit."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Bezugsquellen können innerhalb oder außerhalb des eigenen Betriebs liegen.",
    "Eine Lieferantenbewertung verbindet vergangene Erfahrungen mit der nächsten Beschaffungsentscheidung."
  ],
  "erklaerung": "Die interne Lieferantenkartei und alte Rechnungen sind oft der erste sinnvolle Anlaufpunkt, weil dort bereits Preise, Qualität, Termintreue und Reklamationserfahrungen vorliegen. Externe Quellen wie Branchenverzeichnisse, Onlineportale, Messen, IHK und Fachverbände erweitern den Marktüberblick. Die Suche soll nicht nur einen Preis liefern, sondern zuverlässige Alternativen sichtbar machen.",
  "beispiele": [
    "Die Lieferantenkartei zeigt, welcher bekannte Lieferer bisher pünktlich geliefert und Reklamationen gut bearbeitet hat.",
    "Auf einer Fachmesse kann die Verarbeitung eines erklärungsbedürftigen Produkts direkt geprüft werden; ein Onlineportal liefert dagegen schnell eine breite Übersicht möglicher Anbieter."
  ],
  "fallbeispiel": "Für einen wichtigen A-Artikel wird zuerst die interne Kartei ausgewertet. Zwei bekannte Lieferer werden anhand von Preis, Qualität, Termintreue und Service verglichen. Weil ein einzelner Lieferer abhängig machen kann, werden zusätzlich zwei externe Quellen geprüft. So entsteht eine Entscheidung aus vorhandener Erfahrung und aktuellem Marktvergleich.",
  "typische_fehler": "Nur nach dem niedrigsten Preis gesucht oder ausschließlich einen bequemen bekannten Lieferer verwendet. Eine Bezugsquelle ist aber auch dann ungeeignet, wenn sie billig, unzuverlässig oder bei Ausfall nicht ersetzbar ist.",
  "verstaendnisfragen": [
    "Warum wird zuerst intern gesucht? Die Kartei enthält bereits Erfahrungen und verursacht keinen zusätzlichen Suchaufwand.",
    "Warum kann ein zweiter Lieferer sinnvoll sein? Er verringert die Abhängigkeit, wenn der bisherige Lieferer ausfällt."
  ],
  "pruefungsbezug": "Interne und externe Quellen unterscheiden und anschließend begründen, welche Quelle für den konkreten Artikel geeignet ist. Bei A-Gütern ist ein intensiverer Vergleich plausibler als bei C-Gütern.",
  "merksatz": "Erst intern nach Erfahrung suchen, dann extern den Markt erweitern; nicht nur den Preis bewerten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Die Anfrage

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine vollständige Anfrage aufbauen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Die Anfrage",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:anfrage|Anfrage}} ist rechtlich **unverbindlich**. Sie ist kein Antrag im Sinne des {{par:bgb-145|§ 145 BGB}}, sondern die Bitte um ein Angebot — man verpflichtet sich zu nichts. Trotzdem entscheidet ihre Qualität darüber, ob die Angebote später vergleichbar sind."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Vier Angaben",
      "titel": "Was in jede Anfrage gehört",
      "lead": "Fehlt eine davon, kommen Angebote zurück, die man nicht vergleichen kann. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Art und Güte der Ware",
          "satz": "möglichst genau",
          "text": "Artikelbezeichnung, Norm, Materialstärke, Farbe. Je unschärfer die Beschreibung, desto unterschiedlicher die angebotenen Qualitäten — und desto sinnloser der Preisvergleich."
        },
        {
          "nr": 2,
          "titel": "Menge",
          "satz": "mit Einheit",
          "text": "500 Stück, 20 Pakete, 3 Paletten. Die Menge beeinflusst den Preis über Mengenrabatte erheblich, deshalb muss sie in allen Anfragen gleich sein."
        },
        {
          "nr": 3,
          "titel": "Liefertermin und Lieferort",
          "satz": "wann und wohin",
          "text": "Ein billiges Angebot mit acht Wochen Lieferzeit nützt nichts, wenn die Ware in zwei Wochen gebraucht wird. Der Ort entscheidet außerdem über die Frachtkosten."
        },
        {
          "nr": 4,
          "titel": "Gewünschte Bedingungen",
          "satz": "Zahlung und Lieferung",
          "text": "Zahlungsziel, Skonto, Verpackung, wer den Transport trägt. Wer danach nicht fragt, bekommt die Bedingungen des Lieferers — und die sind selten die günstigsten."
        }
      ],
      "regel": "Regel für den Vergleich: In allen Anfragen müssen Ware, Menge und Termin identisch sein. Nur dann vergleicht man am Ende Preise und nicht Äpfel mit Birnen."
    },
    {
      "typ": "achtung",
      "text": "Verwechsle **Anfrage** und **Bestellung** nicht. Die Anfrage bindet niemanden. Die Bestellung ist ein Antrag nach {{par:bgb-145|§ 145 BGB}} und bindet dich. In Prüfungsfällen ist genau das oft die Falle: Ein Betrieb „fragt an\" und meint dabei längst eine Bestellung."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Eine Anfrage bittet um ein Angebot und ist rechtlich unverbindlich.",
    "Angebote sind nur vergleichbar, wenn sie dieselbe Leistung beschreiben."
  ],
  "ablauf": [
    "Art und Güte der Ware möglichst genau beschreiben.",
    "Menge und Einheit angeben.",
    "Liefertermin und Lieferort nennen.",
    "Gewünschte Zahlungs- und Lieferbedingungen abfragen."
  ],
  "erklaerung": "Die Anfrage ist noch keine Bestellung und verpflichtet den Betrieb zu nichts. Ihre Qualität entscheidet aber über die spätere Vergleichbarkeit. Wenn einer der vier Bereiche fehlt, kann ein Lieferer eine andere Qualität, Menge, Frist oder Kostenverteilung anbieten; der scheinbar günstigere Preis wäre dann kein fairer Vergleich.",
  "beispiele": [
    "Eine Anfrage über 500 Ordner muss neben der Menge auch die gewünschte Qualität, den Liefertermin und den Lieferort nennen.",
    "Wer Fracht, Verpackung, Skonto und Zahlungsziel nicht abfragt, kennt später den tatsächlichen Vergleichswert der Angebote nicht."
  ],
  "fallbeispiel": "Formuliere die Anfrage für 500 Ordner: Art und Güte der Ordner beschreiben, 500 Stück als Menge nennen, den gewünschten Liefertermin und Lieferort angeben und nach Preis, Lieferbedingungen, Zahlungsziel und Skonto fragen. Dieselben Angaben werden an alle angefragten Lieferer gesendet. Erst dann lassen sich die Antworten sinnvoll vergleichen.",
  "typische_fehler": "Eine ungenaue Anfrage wird mit einer Bestellung verwechselt. Besonders riskant sind fehlende Mengenangaben und ein fehlender Liefertermin: Dann sind Mengenrabatt und zeitliche Eignung der Angebote nicht vergleichbar.",
  "verstaendnisfragen": [
    "Warum ist die Anfrage rechtlich unverbindlich? Sie fordert nur zur Abgabe eines Angebots auf und ist selbst kein Antrag nach § 145 BGB.",
    "Welche vier Angaben bilden den Kern einer Anfrage? Art und Güte, Menge, Liefertermin und Lieferort sowie die gewünschten Bedingungen."
  ],
  "pruefungsbezug": "Bei einer Schreib- oder Zuordnungsaufgabe die vier Angaben systematisch abhaken. Danach ausdrücklich sagen, dass die Anfrage noch keine Bestellung ist.",
  "merksatz": "Eine Anfrage bindet nicht; sie muss Ware, Menge, Termin, Ort und Bedingungen so genau nennen, dass Angebote vergleichbar werden."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Das Angebot und seine Bindung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Bindungswirkung eines Angebots beurteilen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Das Angebot und seine Bindung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:angebot|Angebot}} auf eine Anfrage ist ein Antrag — und der Lieferer ist daran nach {{par:bgb-145|§ 145 BGB}} gebunden. Er kann es nicht zurückziehen, nur weil ihm der Preis später zu niedrig erscheint. Genau deshalb schränken Lieferer die Bindung fast immer ein."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Formulierung",
        "Wirkung",
        "Für dich als Käufer"
      ],
      "zeilen": [
        {
          "zellen": [
            "ohne Zusatz",
            "voll bindend",
            "sicher — Annahme genügt"
          ]
        },
        {
          "zellen": [
            "„freibleibend\", „unverbindlich\"",
            "keine Bindung",
            "deine Bestellung ist erst der Antrag"
          ],
          "detail": "**Die häufigste {{begriff:freizeichnungsklausel|Freizeichnungsklausel}}.** Das Angebot ist dann nur eine Einladung, selbst ein Angebot abzugeben. Der Vertrag kommt erst zustande, wenn der Lieferer deine Bestellung bestätigt."
        },
        {
          "zellen": [
            "„solange Vorrat reicht\"",
            "Bindung nur bei Verfügbarkeit",
            "Menge vorher zusichern lassen"
          ]
        },
        {
          "zellen": [
            "„Preise freibleibend\"",
            "nur der Preis ist offen",
            "der Rest gilt weiter"
          ],
          "detail": "**Teilweise Freizeichnung.** Ware, Menge und Termin binden, der Preis kann sich ändern. Bei langen Lieferzeiten und schwankenden Rohstoffpreisen üblich."
        },
        {
          "zellen": [
            "„gültig bis 30.09.\"",
            "Bindung mit fester Frist",
            "rechtzeitig entscheiden"
          ],
          "detail": "**Eine gesetzte Frist geht immer vor** {{par:bgb-147|§ 147 BGB}}. Nach Fristablauf ist das Angebot erloschen — eine spätere Annahme ist ein neuer Antrag."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Ein Angebot **ohne** Einschränkung bindet. Steht „freibleibend\" dabei, bindet es nicht — dann ist deine Bestellung der Antrag und du wartest auf die Auftragsbestätigung.",
      "karteikarte": "Was bedeutet ein „freibleibendes\" Angebot, und wer gibt in diesem Fall den bindenden Antrag ab?"
    },
    {
      "typ": "check",
      "frage": "Ein Lieferer schickt ein Angebot über 500 Ordner zu 2,10 € mit dem Zusatz „freibleibend\". Du bestellst genau diese 500 Ordner. Was gilt?",
      "optionen": [
        {
          "text": "Der Vertrag ist geschlossen — du hast das Angebot angenommen",
          "richtig": false,
          "echo": "Nein. Ein freibleibendes Angebot ist kein bindender Antrag, sondern nur eine Aufforderung, selbst eines abzugeben. Es gibt also nichts, was du annehmen könntest."
        },
        {
          "text": "Deine Bestellung ist der Antrag — der Vertrag entsteht erst mit der Bestätigung",
          "richtig": true,
          "echo": "Richtig. Durch das Wort „freibleibend\" hat der Lieferer die Bindung ausgeschlossen. Deine Bestellung ist damit der bindende Antrag nach § 145 BGB. Der Vertrag kommt erst zustande, wenn der Lieferer sie annimmt — meist per Auftragsbestätigung."
        },
        {
          "text": "Es kommt gar kein Vertrag zustande, weil das Angebot unverbindlich war",
          "richtig": false,
          "echo": "Zu weit gedacht. Unverbindlich heißt nur, dass der Lieferer nicht gebunden ist — nicht, dass kein Vertrag möglich wäre. Er kann deine Bestellung jederzeit annehmen."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Bindet das Angebot?",
      "kategorien": [
        "Bindend",
        "Nicht bindend"
      ],
      "aufgaben": [
        {
          "text": "„Wir bieten Ihnen 200 Ordner zu 2,30 € an.\"",
          "loesung": "Bindend"
        },
        {
          "text": "„Angebot freibleibend.\"",
          "loesung": "Nicht bindend"
        },
        {
          "text": "„Dieses Angebot gilt bis zum 15. Oktober.\"",
          "loesung": "Bindend"
        },
        {
          "text": "„Lieferung solange der Vorrat reicht.\"",
          "loesung": "Nicht bindend"
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
    "Ein Vertrag entsteht durch Antrag und Annahme.",
    "Eine Freizeichnungsklausel kann die Bindungswirkung eines Angebots einschränken."
  ],
  "erklaerung": "Ein Angebot ohne Zusatz ist ein bindender Antrag. Der Lieferer kann es innerhalb der geltenden Frist nicht einfach zurücknehmen. Wörter wie ‚freibleibend‘ oder ‚unverbindlich‘ schließen diese Bindung dagegen aus. Dann ist das Schreiben nur eine Aufforderung; die Bestellung des Käufers wird zum Antrag und die Auftragsbestätigung zur Annahme.",
  "beispiele": [
    "‚Wir bieten 200 Ordner zu 2,30 € an‘ ist ohne Einschränkung bindend, sofern die übrigen Vertragsangaben bestimmt sind.",
    "Bei ‚Angebot freibleibend‘ entsteht der Vertrag erst, wenn der Lieferer die Bestellung annimmt; eine Bestellung allein reicht nicht."
  ],
  "fallbeispiel": "Ein Lieferer bietet 500 Ordner zu 2,10 € mit dem Zusatz ‚freibleibend‘ an. Der Käufer bestellt genau diese Menge. Die Bestellung ist jetzt der bindende Antrag des Käufers. Der Vertrag entsteht erst, wenn der Lieferer die Bestellung annimmt, etwa durch eine Auftragsbestätigung. Die bloße Übereinstimmung mit dem Text des freibleibenden Schreibens genügt nicht.",
  "typische_fehler": "‚Unverbindlich‘ wird so verstanden, als könne überhaupt kein Vertrag entstehen. Tatsächlich fehlt nur die Bindung des ursprünglichen Schreibens. Umgekehrt wird eine Bestellung bei freibleibendem Angebot fälschlich als Annahme bezeichnet.",
  "verstaendnisfragen": [
    "Wer gibt bei einem freibleibenden Angebot den Antrag ab? Der Käufer mit seiner Bestellung.",
    "Was bewirkt eine ausdrücklich gesetzte Angebotsfrist? Sie bestimmt, wie lange der Antrag angenommen werden kann; danach ist eine spätere Reaktion grundsätzlich ein neuer Antrag."
  ],
  "pruefungsbezug": "Formulierungen wie ‚freibleibend‘, ‚unverbindlich‘, ‚solange Vorrat reicht‘ und ein Gültigkeitsdatum markieren. Dann Antrag und Annahme in der richtigen Reihenfolge benennen.",
  "merksatz": "Ohne Freizeichnung bindet das Angebot; bei ‚freibleibend‘ bindet erst die Bestellung des Käufers."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Angebote vergleichen

**Datei:** `lf4-k3-angebotsvergleich.kapitel.json` · SHA-256 `8ccbb5cfd3071aadd0d18c9d1dc4e517c8147e73051ecc8619a6c364cad7a3a8`

**Konkreter Kapitelauftrag:** Zwei vollständige Angebote unter gleichen Voraussetzungen vergleichen; jede Preisstufe und die qualitative Entscheidung erklären.

**Einordnung:** Der Listenpreis sagt fast nichts. Der Einstandspreis alles.

### b1 · Der Weg zum Einstandspreis

**Status:** Pilot eingebaut; fachliche Gegenprüfung 28.10., technische Restpunkte offen. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Einstandspreis über die Bezugskalkulation berechnen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Der Weg zum Einstandspreis",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zwei Angebote nennen 2,10 € und 2,00 €. Welches ist günstiger? ==Ohne Rabatt, Skonto und Frachtkosten lässt sich das nicht beantworten.== Die {{begriff:bezugskalkulation|Bezugskalkulation}} rechnet beide Angebote auf dieselbe Größe herunter: den {{begriff:einstandspreis|Einstandspreis}}."
    },
    {
      "typ": "grafik",
      "variante": "kalkulationsleiter",
      "kopf": "Die Leiter",
      "titel": "Vom Listenpreis zum Einstandspreis",
      "lead": "Ändere Rabatt, Skonto und Bezugskosten und sieh, wie sich der Einstandspreis verschiebt.",
      "richtungen": [
        "vorwaerts"
      ],
      "start": {
        "id": "lep",
        "name": "Listeneinkaufspreis",
        "wert": 1050
      },
      "stufen": [
        {
          "id": "rabatt",
          "name": "Liefererrabatt",
          "art": "abzug",
          "satz": 10,
          "ergebnis": "Zieleinkaufspreis"
        },
        {
          "id": "skonto",
          "name": "Liefererskonto",
          "art": "abzug",
          "satz": 2,
          "ergebnis": "Bareinkaufspreis"
        },
        {
          "id": "bezug",
          "name": "Bezugskosten (Fracht, Verpackung)",
          "art": "zuschlag-absolut",
          "betrag": 45,
          "ergebnis": "Einstandspreis",
          "marke": true
        }
      ],
      "regel": "Reihenfolge merken: erst Rabatt, dann Skonto, dann Bezugskosten. Skonto wird vom bereits rabattierten Preis gerechnet — nie vom Listenpreis."
    },
    {
      "typ": "achtung",
      "text": "Die **Reihenfolge ist zwingend**. Wer Skonto vom Listeneinkaufspreis rechnet, bekommt ein zu niedriges Ergebnis. Rabatt und Skonto werden nacheinander abgezogen, nicht addiert und dann gemeinsam — 10 % und 2 % ergeben nicht 12 %."
    },
    {
      "typ": "merke",
      "text": "Listeneinkaufspreis **−** Rabatt **=** Zieleinkaufspreis **−** Skonto **=** Bareinkaufspreis **+** {{begriff:bezugskosten|Bezugskosten}} **=** Einstandspreis. Nur Einstandspreise sind vergleichbar.",
      "karteikarte": "Wie lautet das Schema der Bezugskalkulation vom Listeneinkaufspreis bis zum Einstandspreis?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "darstellung": "vollfassung",
  "ziel": "Du kannst erklären, weshalb der Listenpreis nicht ausreicht, und aus Rabatt, nutzbarem Skonto und Bezugskosten einen vergleichbaren Bezugspreis berechnen.",
  "vorwissen_kurz": "Ein Prozentwert bezieht sich immer auf einen bestimmten Grundwert. In diesem vereinfachten Vergleich rechnen wir mit Nettobeträgen: MAKEL darf die Vorsteuer voll abziehen, die Umsatzsteuer ist deshalb kein Kostenbestandteil des Vergleichs.",
  "inhalt": [
    {
      "typ": "zwischentitel",
      "id": "a-warum",
      "text": "Warum der günstigste Listenpreis nicht immer gewinnt"
    },
    {
      "typ": "absatz",
      "id": "a-warum-1",
      "text": "Ein Angebot nennt zunächst einen Preis. Wie viel die Beschaffung den Betrieb tatsächlich kostet, hängt aber auch von den Bedingungen ab. Ein Lieferant gewährt einen {{begriff:rabatt|Rabatt}}, ein anderer schließt den Transport bereits ein. Ein scheinbar günstiger Preis kann durch zusätzliche Fracht teurer werden. Deshalb vergleichen wir nicht einzelne auffällige Zahlen, sondern bringen beide Angebote auf denselben Umfang und dieselbe Berechnungsgrundlage."
    },
    {
      "typ": "absatz",
      "id": "a-warum-2",
      "text": "Zuerst prüfst du, ob Ware, Menge, Qualität und Lieferleistung überhaupt vergleichbar sind. Erst danach rechnest du. Der {{begriff:einstandspreis|Bezugspreis}}, auch Einstandspreis genannt, berücksichtigt im folgenden Grundfall den Liefererrabatt, einen tatsächlich nutzbaren {{begriff:skonto|Skonto}} und die zusätzlichen {{begriff:bezugskosten|Bezugskosten}}. Die Zahl ersetzt nicht die spätere Prüfung von Qualität, Zuverlässigkeit und Nachhaltigkeit."
    },
    {
      "typ": "zwischentitel",
      "id": "a-fall",
      "text": "Ein vollständiger Vergleich bei MAKEL"
    },
    {
      "typ": "absatz",
      "id": "a-fall-1",
      "text": "MAKEL benötigt 100 gleichartige Rohlinge (fiktive Übungsdaten). Beide Lieferanten bieten dieselbe Qualität, Menge und Lieferfrist; alle Beträge sind netto und gelten für die gesamte Menge. **Angebot A:** 1.000 € Listenpreis, 10 % Rabatt, 2 % Skonto bei Zahlung innerhalb von zehn Tagen; die Fracht kostet zusätzlich 40 € und ist ausdrücklich nicht skontierbar. **Angebot B:** 930 € einschließlich Transport, ohne Rabatt und Skonto. Im Grundfall kann MAKEL A rechtzeitig bezahlen."
    },
    {
      "typ": "tabelle",
      "id": "a-rechnung",
      "spalten": [
        "Rechenschritt",
        "Warum dieser Schritt?",
        "Angebot A"
      ],
      "zeilen": [
        {
          "zellen": [
            "Listeneinkaufspreis",
            "Vereinbarter Ausgangswert",
            "1.000,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "− Rabatt: 1.000 × 10 %",
            "Sofortiger Nachlass auf den Listenpreis",
            "−100,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "= Zieleinkaufspreis",
            "Grundlage für den hier vereinbarten Skonto",
            "900,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "− Skonto: 900 × 2 %",
            "Die Frist wird im Grundfall tatsächlich genutzt",
            "−18,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "= Bareinkaufspreis",
            "Warenpreis nach beiden Nachlässen",
            "882,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "+ Fracht",
            "Zusätzlich, laut Fall nicht skontierbar",
            "+40,00 €"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "**= Bezugspreis**",
            "**Vergleichbarer Gesamtbetrag**",
            "**922,00 €**"
          ],
          "mono": [
            2
          ]
        }
      ],
      "fazit": "Bei B beträgt der Bezugspreis 930 €. A ist im Grundfall damit 8 € günstiger — je Rohling 9,22 € gegenüber 9,30 €. Achte auf die Einheit: Den Gesamtpreis des einen Angebots darfst du nicht mit dem Stückpreis des anderen vergleichen."
    },
    {
      "typ": "basis",
      "id": "a-leiter",
      "ref": "grafik-1",
      "hinweis": "Die Leiter startet mit anderen Beispielwerten (1.050 € Listenpreis, 45 € Bezugskosten). Stell sie auf unseren Fall um — 1.000 €, 10 %, 2 %, 40 € — und du landest bei 922 €."
    },
    {
      "typ": "zwischentitel",
      "id": "a-addieren",
      "text": "Warum Rabatt und Skonto nicht einfach addiert werden"
    },
    {
      "typ": "absatz",
      "id": "a-addieren-1",
      "text": "Die beiden Prozentsätze haben unterschiedliche Grundwerte. Der Rabatt wird aus 1.000 € berechnet; danach bleiben 900 €, und nur auf diese 900 € werden die 2 % Skonto angewendet. Wer insgesamt 12 % von 1.000 € abzieht und dann 40 € Fracht addiert, erhält 920 € und hat 2 € zu viel abgezogen. Die kleine Abweichung zeigt einen Denkfehler, der bei größeren Mengen erheblich wird."
    },
    {
      "typ": "zwischentitel",
      "id": "a-bedeutung",
      "text": "Was das Ergebnis für die Entscheidung bedeutet"
    },
    {
      "typ": "absatz",
      "id": "a-bedeutung-1",
      "text": "Du kannst jetzt eine präzise Aussage treffen: Unter den genannten, vergleichbaren Bedingungen und bei fristgerechter Zahlung ist A rein preislich günstiger. Ob MAKEL A auswählt, hängt zusätzlich etwa von Lieferzuverlässigkeit und Qualitätsanforderungen ab. Der Satz „A ist immer günstiger“ lässt sich aus dieser Rechnung nicht ableiten."
    }
  ],
  "details": [
    {
      "id": "a-grundwert",
      "kategorie": "grundlagen",
      "titel": "Prozentwert und Grundwert",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "a-grundwert-1",
          "text": "10 % bedeuten zehn von hundert. Bei einem Grundwert von 1.000 € sind das 100 €. Nach dem Rabatt hat sich der Grundwert für den nächsten Nachlass verändert: 2 % von 900 € sind 18 €, nicht 20 €. Schreib bei jeder Prozentrechnung den Grundwert daneben — dann erkennst du, welche Zahl tatsächlich mit dem Prozentsatz verknüpft wird."
        }
      ]
    },
    {
      "id": "a-ohne-skonto",
      "kategorie": "vergleich",
      "titel": "MAKEL kann die Skontofrist nicht nutzen",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "a-ohne-skonto-1",
          "text": "Ohne Skonto kostet A 900 € plus 40 € Fracht, also 940 €. B bleibt bei 930 € und ist nun rein preislich 10 € günstiger. Genau deshalb darf ein möglicher Skonto nicht bedingungslos als sichere Ersparnis eingeplant werden. Ob es sich lohnt, die Skontozahlung über einen Kredit zu finanzieren, ist eine zusätzliche Frage — dafür müssen die Kreditkosten bekannt sein."
        }
      ]
    },
    {
      "id": "a-skontobasis",
      "kategorie": "sonderfall",
      "titel": "Welche Beträge sind skontierbar?",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "a-skontobasis-1",
          "text": "Unser Fall legt ausdrücklich fest, dass die Fracht nicht skontierbar ist. In einem anderen Vertrag kann die Bemessungsgrundlage anders geregelt sein. Dann wird nicht dieselbe Zahl mechanisch weiterverwendet, sondern zuerst die vereinbarte Skontobasis bestimmt. Das Rechenschema hilft nur, wenn seine Eingaben zum Vertrag passen."
        }
      ]
    },
    {
      "id": "a-liquiditaet",
      "kategorie": "zusammenhang",
      "titel": "Liquidität und Lieferantenentscheidung",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "a-liquiditaet-1",
          "text": "Die Bezugskalkulation fragt nach den Kosten. Die Liquiditätsplanung fragt, ob MAKEL den Betrag zum richtigen Zeitpunkt zahlen kann. Für eine gute Entscheidung braucht es beide Antworten."
        },
        {
          "typ": "verweis",
          "id": "a-liquiditaet-2",
          "text": "Weiterlesen:",
          "ziele": [
            "k3-b3",
            "lf9:k1"
          ]
        }
      ]
    }
  ],
  "verstaendnisfragen": [
    {
      "id": "a1",
      "frage": "Warum beziehen sich die 2 % Skonto auf 900 € und nicht auf 1.000 €?",
      "antwort": "Weil der Rabatt den Warenpreis schon auf 900 € reduziert hat und dieser Zieleinkaufspreis laut Fall die Skontobasis ist. Die nicht skontierbare Fracht wird erst danach addiert."
    },
    {
      "id": "a2",
      "frage": "Welche Änderung lässt B in unserem Vergleich günstiger werden?",
      "antwort": "Wenn MAKEL A nicht innerhalb der Skontofrist bezahlt, steigt dessen Bezugspreis auf 940 €. B kostet unverändert 930 € und ist dann 10 € günstiger."
    }
  ]
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Rabatt, Skonto, Bezugskosten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Skonto und Rabatt richtig einordnen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `vertiefung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Rabatt, Skonto, Bezugskosten",
  "inhalt": [
    {
      "typ": "tabelle",
      "spalten": [
        "Größe",
        "Wofür",
        "Rechnerisch"
      ],
      "zeilen": [
        {
          "zellen": [
            "{{begriff:rabatt|Rabatt}}",
            "Preisnachlass beim Kauf",
            "vom Listenpreis"
          ],
          "detail": "**Wird immer gewährt**, unabhängig vom Zahlungszeitpunkt. Mengenrabatt für große Abnahme, Treuerabatt für lange Geschäftsbeziehung, Wiederverkäuferrabatt für den Handel."
        },
        {
          "zellen": [
            "{{begriff:skonto|Skonto}}",
            "Belohnung für schnelle Zahlung",
            "vom Zieleinkaufspreis"
          ],
          "detail": "**Nur wenn innerhalb der Skontofrist gezahlt wird.** Skonto ist kein Rabatt, sondern ein Zins für die vorzeitige Zahlung — und ein sehr hoher noch dazu."
        },
        {
          "zellen": [
            "{{begriff:bezugskosten|Bezugskosten}}",
            "Fracht, Verpackung, Versicherung, Zoll",
            "werden addiert"
          ],
          "detail": "**Die am häufigsten vergessene Position.** Ein Angebot „ab Werk\" wirkt billiger als eines „frei Haus\" — bis die Frachtrechnung kommt."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Skonto zu ziehen lohnt sich fast immer. Wer bei „2 % Skonto innerhalb 10 Tagen, Zahlungsziel 30 Tage\" früh zahlt, spart 2 % für 20 Tage früheres Zahlen. **Aufs Jahr gerechnet ist das ein zweistelliger Zinssatz** — mehr, als jeder Kontokorrentkredit kostet."
    },
    {
      "typ": "vertiefung",
      "titel": "Wie man den Jahreszins des Skontos überschlägt",
      "absaetze": [
        "Die gängige Überschlagsformel lautet: **Skontosatz × 360 ÷ (Zahlungsziel − Skontofrist)**. Bei 2 % Skonto, 10 Tagen Skontofrist und 30 Tagen Ziel sind das 2 × 360 ÷ 20 = 36 % im Jahr.",
        "Der Wert ist bewusst grob: Er rechnet mit dem kaufmännischen Jahr zu 360 Tagen und bezieht den Skontosatz auf den vollen Rechnungsbetrag statt auf den tatsächlich gezahlten. Für die Entscheidung genügt das — die Größenordnung ist eindeutig.",
        "Die kaufmännische Folgerung: Selbst wenn dafür der Kontokorrentkredit in Anspruch genommen werden muss, ist Skontoziehen meist günstiger. Nur wenn die Liquidität es überhaupt nicht hergibt, zahlt man erst am Ende des Ziels."
      ]
    },
    {
      "typ": "check",
      "frage": "Listeneinkaufspreis 1.000 €, 20 % Rabatt, 3 % Skonto. Wie hoch ist der Bareinkaufspreis?",
      "optionen": [
        {
          "text": "770,00 € — 20 % und 3 % ergeben zusammen 23 %",
          "richtig": false,
          "echo": "So darf man nicht rechnen. Die Sätze beziehen sich auf verschiedene Grundlagen: Der Rabatt geht vom Listenpreis, das Skonto vom bereits verminderten Zieleinkaufspreis."
        },
        {
          "text": "776,00 €",
          "richtig": true,
          "echo": "Richtig gerechnet. 1.000 € − 200 € Rabatt = 800 € Zieleinkaufspreis. Davon 3 % Skonto sind 24 €, also 776 € Bareinkaufspreis. Kämen jetzt noch Bezugskosten dazu, ergäbe sich daraus der Einstandspreis."
        },
        {
          "text": "800,00 € — Skonto zählt beim Vergleich nicht mit",
          "richtig": false,
          "echo": "Doch. Skonto senkt den tatsächlich gezahlten Betrag und gehört deshalb in die Kalkulation — vorausgesetzt, der Betrieb zahlt auch wirklich innerhalb der Frist."
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
    "Rabatt wird beim Kauf gewährt; Skonto hängt von schneller Zahlung ab.",
    "Bezugskosten gehören zu den tatsächlichen Beschaffungskosten."
  ],
  "erklaerung": "Rabatt und Skonto sehen beide wie Preisnachlässe aus, wirken aber zu unterschiedlichen Zeitpunkten. Der Rabatt mindert den Preis sofort. Skonto wird nur bei Zahlung innerhalb der Frist genutzt und wird deshalb auf dem bereits rabattierten Preis berechnet. Fracht, Verpackung, Versicherung und Zoll erhöhen dagegen den Einstandspreis.",
  "beispiele": [
    "Bei 2 % Skonto innerhalb von 10 Tagen und 30 Tagen Zahlungsziel werden 2 % für 20 Tage früheres Zahlen gespart; die vorhandene Überschlagsrechnung entspricht etwa 36 % Jahreszins.",
    "Ein Angebot ‚frei Haus‘ enthält die Lieferung bereits, während beim Angebot ‚ab Werk‘ die Fracht noch als Bezugskosten ergänzt werden muss."
  ],
  "fallbeispiel": "Bei 2 % Skonto, zehn Tagen Skontofrist und 30 Tagen Zahlungsziel beträgt die verkürzte Zahlungszeit 20 Tage. Überschlag: 2 × 360 ÷ 20 = 36 % Jahreszins. Das erklärt, warum der Betrieb die Skontofrist wirtschaftlich prüfen sollte; die genaue Entscheidung hängt trotzdem von Liquidität und Zahlungsbedingungen ab.",
  "typische_fehler": "Skonto wird als immer gewährter Rabatt behandelt oder Bezugskosten werden nicht berücksichtigt. Auch wird der Skontovorteil isoliert betrachtet, ohne zu prüfen, ob die Zahlung rechtzeitig möglich ist.",
  "verstaendnisfragen": [
    "Wann entsteht Skonto? Erst bei Zahlung innerhalb der vereinbarten Skontofrist.",
    "Welche Kosten werden addiert? Fracht, Verpackung, Versicherung und Zoll als Bezugskosten."
  ],
  "pruefungsbezug": "Begriffe anhand des Zeitpunkts unterscheiden: sofortiger Nachlass = Rabatt, Nachlass für schnelle Zahlung = Skonto, Kosten bis zum Eintreffen = Bezugskosten.",
  "merksatz": "Rabatt sofort, Skonto bei schneller Zahlung, Bezugskosten zusätzlich."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Wenn der Preis nicht alles ist

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Angebote qualitativ mit einer Nutzwertanalyse bewerten

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wenn der Preis nicht alles ist",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Einstandspreis entscheidet den **quantitativen** Vergleich. Daneben steht der qualitative: Zuverlässigkeit, Qualität, Service, Umweltverhalten. Die {{begriff:nutzwertanalyse|Nutzwertanalyse}} macht ihn nachvollziehbar, statt ihn dem Bauchgefühl zu überlassen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kriterium",
        "Gewicht",
        "Lieferer A",
        "Lieferer B"
      ],
      "zeilen": [
        {
          "zellen": [
            "Einstandspreis",
            "40 %",
            "8 Pkt → 3,2",
            "10 Pkt → 4,0"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Liefertreue",
            "30 %",
            "10 Pkt → 3,0",
            "5 Pkt → 1,5"
          ],
          "mono": [
            1,
            2,
            3
          ],
          "detail": "**Hier kippt die Entscheidung.** Lieferer B ist billiger, liefert aber unzuverlässig. Bei einem A-Gut, das die Produktion versorgt, wiegt das schwerer als ein paar Cent."
        },
        {
          "zellen": [
            "Qualität",
            "20 %",
            "9 Pkt → 1,8",
            "7 Pkt → 1,4"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Service",
            "10 %",
            "7 Pkt → 0,7",
            "6 Pkt → 0,6"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "**Nutzwert**",
            "100 %",
            "**8,7**",
            "**7,5**"
          ],
          "mono": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Nutzwert = Punkte **mal** Gewichtung, dann alles addieren. Der höchste Nutzwert gewinnt — auch wenn er nicht der billigste ist.",
      "karteikarte": "Wie funktioniert eine Nutzwertanalyse, und wann führt sie zu einem anderen Ergebnis als der reine Preisvergleich?"
    },
    {
      "typ": "praxistipp",
      "text": "Die Gewichtung muss **vor** dem Vergleich festgelegt werden, nicht danach. Sonst schiebt man die Gewichte so lange hin und her, bis der Wunschlieferer oben steht — und die Analyse begründet nur noch eine längst getroffene Entscheidung."
    },
    {
      "typ": "zuordnen",
      "lead": "Quantitativ oder qualitativ?",
      "kategorien": [
        "Quantitativ",
        "Qualitativ"
      ],
      "aufgaben": [
        {
          "text": "Der Einstandspreis je Stück beträgt 1,87 €.",
          "loesung": "Quantitativ"
        },
        {
          "text": "Der Lieferer hat in zwei Jahren nie zu spät geliefert.",
          "loesung": "Qualitativ"
        },
        {
          "text": "Die Frachtkosten betragen 45 € je Sendung.",
          "loesung": "Quantitativ"
        },
        {
          "text": "Bei Reklamationen antwortet der Lieferer am selben Tag.",
          "loesung": "Qualitativ"
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
    "Einstandspreis ist der quantitative Vergleich.",
    "Qualitative Kriterien werden mit Punkten und Gewichtungen bewertet."
  ],
  "ablauf": [
    "Kriterien und Gewichte vor dem Vergleich festlegen.",
    "Jeden Lieferer je Kriterium mit Punkten bewerten.",
    "Punkte mit dem Gewicht multiplizieren.",
    "Gewichtete Werte addieren und den höchsten Nutzwert begründen."
  ],
  "erklaerung": "Die Nutzwertanalyse macht qualitative Überlegungen nachvollziehbar. Ein Lieferer kann beim Preis schlechter, bei Liefertreue und Qualität aber deutlich besser sein. Die Gewichtung muss vor dem Ergebnis feststehen, sonst wird die Rechnung nur nachträglich an den Wunschlieferer angepasst.",
  "beispiele": [
    "Lieferer A erhält beim Einstandspreis 8 Punkte bei 40 % Gewichtung: 8 × 0,40 = 3,2 Nutzwertpunkte.",
    "In der vorhandenen Tabelle erreicht Lieferer A insgesamt 8,7 Punkte und Lieferer B 7,5, obwohl B beim Preis 10 Punkte erhält."
  ],
  "fallbeispiel": "Berechne Lieferer A aus der Tabelle: Einstandspreis 8 × 40 % = 3,2; Liefertreue 10 × 30 % = 3,0; Qualität 9 × 20 % = 1,8; Service 7 × 10 % = 0,7. Summe: 3,2 + 3,0 + 1,8 + 0,7 = 8,7. Lieferer B kommt auf 7,5. Nach dieser Gewichtung ist A die bessere Gesamtentscheidung, obwohl B beim Preis besser abschneidet.",
  "typische_fehler": "Gewichtung und Punkte werden vertauscht oder erst nach Kenntnis des Ergebnisses festgelegt. Ein weiterer Fehler ist, nur den Preis zu betrachten und die qualitative Bewertung als ‚subjektiv‘ ohne nachvollziehbare Rechnung abzutun.",
  "verstaendnisfragen": [
    "Was bedeutet ein Gewicht von 40 %? Das Kriterium trägt 40 % zum Gesamtnutzwert bei.",
    "Wann kann der höchste Nutzwert vom billigsten Lieferer abweichen? Wenn andere wichtige Kriterien, etwa Liefertreue oder Qualität, höher bewertet werden."
  ],
  "pruefungsbezug": "In Berechnungen jedes Kriterium einzeln multiplizieren und erst am Ende addieren. In der Begründung immer Preis und qualitative Kriterien gemeinsam nennen.",
  "merksatz": "Nutzwert = Punkte mal Gewichtung; die Gewichte stehen fest, bevor die Lieferer bewertet werden."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Der Kaufvertrag und seine Bedingungen

**Datei:** `lf4-k4-kaufvertrag.kapitel.json` · SHA-256 `70e77615eed4cc990e302155dc34d4d293f6f14ba55a3b75c7827e9ed1f4b97d`

**Konkreter Kapitelauftrag:** Kauf, Miete, Werk- und Dienstleistung im Beschaffungsfall abgrenzen; Leistungsversprechen, Bedingungen und Vertragsschluss verbinden.

**Einordnung:** Was drinsteht, entscheidet später — nicht das Gespräch davor.

### b1 · Was im Vertrag stehen muss

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Inhalt eines Kaufvertrags nach Muss- und Kann-Bestandteilen ordnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Was im Vertrag stehen muss",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:kaufvertrag|Kaufvertrag}} kommt nach {{par:bgb-433|§ 433 BGB}} zustande, sobald sich beide Seiten über Ware und Preis einig sind. ==Alles Weitere ist freiwillig — aber genau dort entscheidet sich, wer bei Störungen den Schaden trägt.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Bestandteil",
        "Muss oder kann",
        "Wenn er fehlt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Art und Güte der Ware",
            "muss",
            "kein wirksamer Vertrag"
          ],
          "detail": "**Ohne bestimmbaren Kaufgegenstand kein Vertrag.** „Irgendwelche Ordner\" reicht nicht — Art, Ausführung und Qualität müssen wenigstens bestimmbar sein."
        },
        {
          "zellen": [
            "Menge",
            "muss",
            "kein wirksamer Vertrag"
          ]
        },
        {
          "zellen": [
            "Preis",
            "muss",
            "kein wirksamer Vertrag"
          ],
          "detail": "**Bestimmbar genügt.** „Zum Listenpreis am Liefertag\" ist zulässig, weil sich der Preis daraus errechnen lässt."
        },
        {
          "zellen": [
            "Lieferzeit und Lieferort",
            "kann",
            "gesetzliche Regel greift: sofort, beim Verkäufer"
          ],
          "detail": "**Ohne Vereinbarung ist die Leistung sofort fällig**, und Leistungsort ist der Sitz des Verkäufers. Das bedeutet: Der Käufer müsste die Ware abholen. In der Praxis wird deshalb fast immer etwas anderes vereinbart."
        },
        {
          "zellen": [
            "Zahlungsbedingungen",
            "kann",
            "Zahlung sofort, ohne Abzug"
          ]
        },
        {
          "zellen": [
            "Verpackung, Transport, Gefahrübergang",
            "kann",
            "gesetzliche Grundregel gilt"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Ware, Menge, Preis** sind die drei Muss-Bestandteile. Alles andere kann vereinbart werden — fehlt es, greift das Gesetz, und das ist selten das, was der Käufer sich vorgestellt hat.",
      "karteikarte": "Welche drei Bestandteile muss ein Kaufvertrag mindestens enthalten, und was passiert, wenn Lieferzeit und Zahlungsbedingungen fehlen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "titel": "Vom Antrag zum Vertrag",
  "erklaerung": "Ein Vertrag entsteht, wenn ein bestimmbarer Antrag vollständig angenommen wird. Ware und Preis müssen feststehen; Liefertermin, Zahlungsart, Versand und Eigentumsvorbehalt regeln anschließend, wie der Vertrag praktisch abgewickelt wird. Weicht die Antwort von Menge oder Preis ab, ist sie keine Annahme, sondern ein neuer Antrag.",
  "beispiel": "MAKEL bestellt ohne vorheriges Angebot 200 Hoodies zu 52 Euro — die Bestellung ist hier der Antrag. Der Lieferer bestätigt 180 Stück zu 54 Euro. Damit ist der Antrag nicht angenommen (§ 150 Abs. 2 BGB). Die Bestätigung ist ein neuer Antrag, den MAKEL noch annehmen muss. Eine bloße Anfrage wäre dagegen noch gar kein Antrag gewesen.",
  "typische_fehler": "Eine Auftragsbestätigung wird automatisch als Vertragsschluss behandelt, obwohl sie den Antrag verändert. Ebenso falsch ist die Annahme, mündliche Nebenabreden seien unwichtig: Was ausdrücklich vereinbart wurde, kann dem Kleingedruckten vorgehen.",
  "merksatz": "Vollständige Annahme = Vertrag; Abweichung = neuer Antrag."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Lieferung und Zahlung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Lieferungs- und Zahlungsbedingungen beurteilen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Lieferung und Zahlung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:lieferbedingungen|Lieferbedingungen}} regeln zwei Fragen, die man nicht verwechseln darf: **Wer zahlt den Transport** und **wer trägt die Gefahr**, wenn unterwegs etwas passiert. Die {{begriff:handelsklausel|Handelsklauseln}} fassen beides in kurze Formeln."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Enden",
      "titel": "Ab Werk oder frei Haus",
      "lead": "Dieselbe Ware, entgegengesetzte Lastenverteilung. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Ab Werk",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Käufer zahlt den Transport",
              "detail": "Die Frachtkosten kommen zum Angebotspreis dazu. Genau deshalb wirkt ein Angebot ab Werk im Vergleich billiger, als es ist."
            },
            {
              "text": "Gefahr geht früh über",
              "detail": "Ab Übergabe an den Frachtführer trägt der Käufer das Risiko. Geht die Ware unterwegs kaputt, muss er trotzdem zahlen."
            },
            {
              "text": "Käufer organisiert",
              "detail": "Spediteur beauftragen, Termine abstimmen, Versicherung prüfen. Mehr Aufwand, dafür Kontrolle über den Transportweg."
            }
          ]
        },
        {
          "name": "Frei Haus",
          "ton": "gold",
          "punkte": [
            {
              "text": "Verkäufer zahlt den Transport",
              "detail": "Die Fracht steckt im Preis. Für den Angebotsvergleich heißt das: keine Bezugskosten mehr addieren."
            },
            {
              "text": "Gefahr geht spät über",
              "detail": "Erst mit der Ankunft beim Käufer. Geht unterwegs etwas kaputt, ist das das Problem des Verkäufers."
            },
            {
              "text": "Verkäufer organisiert",
              "detail": "Bequem für den Käufer. Der Verkäufer lässt sich diese Bequemlichkeit über den Preis bezahlen."
            }
          ]
        }
      ],
      "regel": "Im Auslandsgeschäft übernehmen die Incoterms diese Aufgabe — dieselbe Logik, nur international einheitlich benannt und wesentlich feiner abgestuft."
    },
    {
      "typ": "absatz",
      "text": "Die {{begriff:zahlungsbedingungen|Zahlungsbedingungen}} legen fest, wann und mit welchem Abzug gezahlt wird. Die übliche Formel „**30 Tage netto, 10 Tage 2 % Skonto**\" heißt: Der volle Betrag ist nach 30 Tagen fällig, bei Zahlung binnen 10 Tagen dürfen 2 % abgezogen werden."
    },
    {
      "typ": "check",
      "frage": "Ihr kauft Ware ab Werk. Der Spediteur beschädigt die Sendung unterwegs. Wer trägt den Schaden?",
      "optionen": [
        {
          "text": "Der Verkäufer — er hat mangelhafte Ware geliefert",
          "richtig": false,
          "echo": "Die Ware war beim Gefahrübergang in Ordnung. Der Schaden entstand danach, also nicht mehr in seinem Verantwortungsbereich."
        },
        {
          "text": "Der Käufer — die Gefahr ging mit der Übergabe an den Frachtführer über",
          "richtig": true,
          "echo": "Richtig. Bei „ab Werk\" trägt der Käufer ab Übergabe an den Frachtführer die Gefahr. Er muss den Kaufpreis trotzdem zahlen und sich wegen des Schadens an den Frachtführer oder dessen Versicherung halten. Genau deshalb gehört zu einer Beschaffung ab Werk auch die Frage nach der Transportversicherung."
        },
        {
          "text": "Der Frachtführer zahlt automatisch an den Verkäufer",
          "richtig": false,
          "echo": "Der Frachtführer haftet zwar, aber gegenüber seinem Auftraggeber — und der ist bei „ab Werk\" der Käufer. Automatisch passiert außerdem nichts, der Anspruch muss geltend gemacht werden."
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
  "titel": "Lieferung, Gefahr und Zahlung",
  "erklaerung": "Nach dem Vertrag muss der Verkäufer die vereinbarte Sache übergeben und übereignen; der Käufer muss sie abnehmen und den Preis zahlen. Liefer- und Zahlungsbedingungen verschieben, wer organisiert, wann gezahlt wird und wann die Gefahr eines zufälligen Untergangs übergeht. Deshalb gehören diese Bedingungen zur wirtschaftlichen Beurteilung des Angebots.",
  "beispiel": "Bei „frei Haus“ trägt der Verkäufer die Organisation der Lieferung und kalkuliert die Fracht meist in den Preis ein. Bei „ab Werk“ muss der Käufer den Transport selbst organisieren oder zusätzlich bezahlen. Der niedrigere Preis auf dem Papier ist deshalb nicht automatisch das günstigere Angebot.",
  "typische_fehler": "Frachtkosten werden beim Angebotsvergleich vergessen. Auch der Übergang von Besitz und Eigentum wird verwechselt: Die Ware kann schon beim Käufer liegen, obwohl das Eigentum wegen eines Eigentumsvorbehalts noch beim Verkäufer ist.",
  "merksatz": "Nicht nur den Preis lesen: Lieferung, Gefahr, Zahlung und Eigentum gehören zusammen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Das Kleingedruckte

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Wirkung von AGB und Eigentumsvorbehalt erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Das Kleingedruckte",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:agb|Allgemeine Geschäftsbedingungen}} sind vorformulierte Vertragsbedingungen für eine Vielzahl von Verträgen. Nach {{par:bgb-305|§ 305 BGB}} werden sie nur Vertragsbestandteil, wenn der Verwender **ausdrücklich darauf hinweist** und der andere Teil die Möglichkeit hatte, sie zur Kenntnis zu nehmen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Frage",
        "Antwort",
        "Folge"
      ],
      "zeilen": [
        {
          "zellen": [
            "Beide Seiten verwenden AGB — welche gelten?",
            "nur der übereinstimmende Teil",
            "Widersprüchliches fällt weg, das Gesetz greift"
          ],
          "detail": "**Der Klassiker im Geschäftsverkehr.** Einkaufs- und Verkaufsbedingungen prallen aufeinander. Was sich widerspricht, gilt nicht — an dieser Stelle entscheidet dann das BGB."
        },
        {
          "zellen": [
            "Individuelle Absprache gegen AGB?",
            "die Absprache gewinnt",
            "Vorrang der Individualabrede"
          ],
          "detail": "**Was einzeln ausgehandelt wurde, schlägt das Kleingedruckte** — auch wenn es nur mündlich vereinbart war. Deshalb sollte man solche Zusagen schriftlich festhalten."
        },
        {
          "zellen": [
            "Überraschende Klausel",
            "wird nicht Vertragsbestandteil",
            "unwirksam"
          ]
        },
        {
          "zellen": [
            "Zweifel bei der Auslegung",
            "gehen zulasten des Verwenders",
            "wer sie schreibt, trägt das Risiko"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Die wichtigste Klausel für den Verkäufer ist der {{begriff:eigentumsvorbehalt|Eigentumsvorbehalt}} nach {{par:bgb-449|§ 449 BGB}}: Die Ware bleibt bis zur vollständigen Zahlung sein Eigentum, obwohl der Käufer sie längst besitzt und benutzt."
    },
    {
      "typ": "achtung",
      "text": "Der Eigentumsvorbehalt allein berechtigt **nicht** zur Wegnahme. Der Verkäufer muss erst vom Vertrag zurücktreten, bevor er die Ware herausverlangen kann — so steht es ausdrücklich in {{par:bgb-449|§ 449 BGB}}. Wer einfach abholt, begeht verbotene Eigenmacht."
    },
    {
      "typ": "merke",
      "text": "AGB gelten nur bei **Hinweis und Kenntnisnahmemöglichkeit**. Individuelle Absprachen gehen immer vor, Unklarheiten gehen zulasten dessen, der die AGB gestellt hat.",
      "karteikarte": "Unter welchen Voraussetzungen werden AGB Vertragsbestandteil, und was gilt bei widersprechenden AGB beider Seiten?"
    },
    {
      "typ": "zuordnen",
      "lead": "Wirksam oder nicht?",
      "kategorien": [
        "Wirksam",
        "Unwirksam"
      ],
      "aufgaben": [
        {
          "text": "In den AGB steht der Eigentumsvorbehalt bis zur vollständigen Zahlung.",
          "loesung": "Wirksam"
        },
        {
          "text": "Die AGB werden erst mit der Rechnung nach Vertragsschluss übersandt.",
          "loesung": "Unwirksam"
        },
        {
          "text": "Mündlich wurde „frei Haus\" zugesagt, die AGB sagen „ab Werk\".",
          "loesung": "Wirksam"
        },
        {
          "text": "Versteckt zwischen Lieferklauseln steht eine Vertragsstrafe von 5.000 €.",
          "loesung": "Unwirksam"
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
  "titel": "Störung und Reaktion",
  "erklaerung": "Bei einer Pflichtverletzung muss zuerst geklärt werden, was genau geschuldet war und ob die Abweichung erheblich ist. Danach folgen je nach Fall Mängelrechte, Fristsetzung, Rücktritt oder Schadensersatz. Wer sofort selbst handelt, ohne den Vertragspartner in Verzug zu setzen oder zurückzutreten, riskiert zusätzliche Probleme.",
  "beispiel": "Eine gelieferte Maschine hat nicht die vereinbarte Leistung. MAKEL dokumentiert den Mangel, rügt ihn und setzt eine angemessene Frist zur Nacherfüllung. Erst wenn diese scheitert oder unzumutbar ist, kommen weitere Rechte in Betracht.",
  "typische_fehler": "Die Ware wird eigenmächtig zurückgeschickt oder abgeholt, ohne den Vertrag rechtlich zu beenden. Außerdem wird ein Eigentumsvorbehalt als sofortige Erlaubnis verstanden, die Sache beim Kunden wegzunehmen.",
  "merksatz": "Vertrag lesen, Abweichung dokumentieren, Frist und Rechte in der richtigen Reihenfolge prüfen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Wenn der Lieferer zu spät kommt

**Datei:** `lf4-k5-lieferungsverzug.kapitel.json` · SHA-256 `e78af6b877e11a289c5f0eee4328fa1a34b2f235d3d46c71a82b25e123c7d7ea`

**Konkreter Kapitelauftrag:** Eine verspätete Lieferung anhand der einzelnen Voraussetzungen beurteilen; Mahnung, Ausnahmen und mögliche Folgeschritte trennen.

**Einordnung:** Verspätet ist nicht dasselbe wie im Verzug.

### b1 · Vier Voraussetzungen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Voraussetzungen des Lieferungsverzugs prüfen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Vier Voraussetzungen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine verspätete Lieferung ist noch kein {{begriff:lieferungsverzug|Lieferungsverzug}}. ==Erst wenn vier Dinge zusammenkommen, hat der Käufer überhaupt Rechte.== Das ist der Punkt, an dem in Prüfungsfällen die meisten Antworten schiefgehen: Sie springen sofort zum Rücktritt, ohne die Voraussetzungen zu prüfen."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Prüfung",
      "titel": "Liegt Verzug vor?",
      "lead": "Vier Fragen in dieser Reihenfolge. Fällt eine aus, gibt es keinen Verzug. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Fälligkeit",
          "satz": "Leistungszeit ist da",
          "text": "Der vereinbarte Termin ist erreicht. Ohne Vereinbarung ist die Leistung sofort fällig. Vor der Fälligkeit gibt es keinen Verzug — auch dann nicht, wenn absehbar ist, dass es knapp wird."
        },
        {
          "nr": 2,
          "titel": "Nichtleistung trotz Möglichkeit",
          "satz": "die Ware gibt es noch",
          "text": "Ist die Leistung dauerhaft unmöglich geworden — das bestellte Einzelstück ist verbrannt — liegt kein Verzug vor, sondern Unmöglichkeit. Das ist ein anderer Fall mit anderen Rechtsfolgen."
        },
        {
          "nr": 3,
          "titel": "Mahnung",
          "satz": "§ 286 BGB",
          "text": "Die eindeutige Aufforderung zu liefern, nach Eintritt der Fälligkeit. In bestimmten Fällen ist sie entbehrlich — dazu gleich mehr. Eine Mahnung vor Fälligkeit geht ins Leere."
        },
        {
          "nr": 4,
          "titel": "Vertretenmüssen",
          "satz": "Vorsatz oder Fahrlässigkeit",
          "text": "Der Lieferer muss die Verzögerung zu verantworten haben. Bei höherer Gewalt oder unverschuldeter Betriebsstörung fehlt es daran. Das Verschulden wird allerdings vermutet — der Lieferer muss sich entlasten, nicht der Käufer es beweisen."
        }
      ],
      "regel": "Merksatz: Fällig — nicht geliefert — gemahnt — verschuldet. Erst wenn alle vier stehen, beginnt der Verzug, und erst ab da laufen die Rechte des Käufers."
    },
    {
      "typ": "merke",
      "text": "Verspätung allein reicht nicht. **Verzug beginnt frühestens mit der Mahnung** — und die kann erst nach Fälligkeit wirksam ausgesprochen werden.",
      "karteikarte": "Welche vier Voraussetzungen müssen für Lieferungsverzug vorliegen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Verzug setzt eine fällige Leistung voraus.",
    "Unmöglichkeit und Verzögerung sind unterschiedliche Störungen."
  ],
  "ablauf": [
    "Prüfen, ob der Liefertermin beziehungsweise die Leistung fällig ist.",
    "Prüfen, ob der Lieferer trotz Möglichkeit nicht leistet.",
    "Prüfen, ob eine Mahnung erforderlich und erfolgt ist.",
    "Prüfen, ob der Lieferer die Verzögerung zu vertreten hat."
  ],
  "erklaerung": "Eine verspätete Lieferung allein reicht nicht. Vor dem Termin kann kein Verzug eintreten. Ist die Leistung dauerhaft unmöglich, liegt ebenfalls kein Verzug vor, sondern ein anderer Fall. Die vier Fragen werden deshalb in einer festen Reihenfolge geprüft: fällig, nicht geliefert, gemahnt und verschuldet.",
  "beispiele": [
    "Eine Lieferung am 1. Juni, die am 2. Juni fehlt, ist fällig und nicht erbracht; bei einem kalendermäßig bestimmten Termin kann die Mahnung entbehrlich sein.",
    "Verbrennt das einzige bestellte Einzelstück vor der Lieferung, ist die Leistung dauerhaft unmöglich und nicht lediglich verspätet."
  ],
  "fallbeispiel": "Bestellt wird eine Ware zum 1. Juni. Am 8. Juni fehlt sie noch. Der Termin ist fällig, die Ware wurde trotz möglicher Lieferung nicht erbracht. Weil der Termin kalendermäßig bestimmt ist, ist eine Mahnung nicht zwingend. Danach muss noch geprüft werden, ob der Lieferer die Verzögerung zu vertreten hat. Erst wenn alle vier Punkte bejaht werden, liegt Lieferungsverzug vor.",
  "typische_fehler": "Direkt aus der Verspätung auf Rücktritt geschlossen oder eine Mahnung vor der Fälligkeit berücksichtigt. Auch Unmöglichkeit wird fälschlich als Verzug bezeichnet.",
  "verstaendnisfragen": [
    "Warum ist eine Mahnung vor dem Liefertermin unwirksam? Weil die Leistung noch nicht fällig ist.",
    "Was unterscheidet Unmöglichkeit vom Verzug? Bei Unmöglichkeit kann die Leistung dauerhaft nicht mehr erbracht werden; beim Verzug wäre sie noch möglich."
  ],
  "pruefungsbezug": "Die vier Prüfschritte ausdrücklich hinschreiben: fällig, nicht geliefert, Mahnung, Vertretenmüssen. Erst danach Rechtsfolgen ableiten.",
  "merksatz": "Fällig, nicht geliefert, gemahnt, verschuldet — erst dann beginnt Lieferungsverzug."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Wann die Mahnung entfällt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Beurteilen, wann eine Mahnung entbehrlich ist

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Wann die Mahnung entfällt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{par:bgb-286|§ 286 BGB}} nennt Fälle, in denen keine Mahnung nötig ist. Der wichtigste für den Betriebsalltag: **Der Termin steht kalendermäßig fest.** Dann mahnt der Kalender."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Formulierung im Vertrag",
        "Mahnung nötig?",
        "Warum"
      ],
      "zeilen": [
        {
          "zellen": [
            "„Lieferung am 15. Oktober\"",
            "nein",
            "kalendermäßig bestimmt"
          ],
          "detail": "**Der Termin ist datumsgenau festgelegt.** Am 16. Oktober ist der Lieferer automatisch im Verzug, ohne dass jemand etwas schreiben muss."
        },
        {
          "zellen": [
            "„Lieferung in der 42. Kalenderwoche\"",
            "nein",
            "kalendermäßig bestimmbar"
          ]
        },
        {
          "zellen": [
            "„Lieferung 14 Tage nach Auftragseingang\"",
            "nein",
            "berechenbar ab einem Ereignis"
          ],
          "detail": "**Auch das ist kalendermäßig bestimmbar**: Ein Ereignis plus eine feste Frist ergibt ein berechenbares Datum."
        },
        {
          "zellen": [
            "„Lieferung schnellstmöglich\"",
            "ja",
            "kein bestimmter Termin"
          ],
          "detail": "**Unbestimmte Formulierungen helfen niemandem.** Wer „baldmöglichst\" oder „schnellstmöglich\" vereinbart, muss später mahnen und läuft dem Termin hinterher."
        },
        {
          "zellen": [
            "Lieferer sagt: „Wir liefern nicht.\"",
            "nein",
            "ernsthafte, endgültige Verweigerung"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Ein häufiger Denkfehler: Eine **Auftragsbestätigung mit Liefertermin** genügt für die kalendermäßige Bestimmung nur, wenn dieser Termin auch Vertragsinhalt geworden ist. Schickt der Lieferer einseitig einen Termin, den der Käufer nie akzeptiert hat, ist die Lage weniger eindeutig."
    },
    {
      "typ": "praxistipp",
      "text": "Genau hier zahlt sich Kapitel 4 aus: Wer im Vertrag ein festes Datum vereinbart statt „schnellstmöglich\", spart sich später die Mahnung und ist sofort im Recht. Zwei Minuten beim Bestellen, Wochen gespart beim Streit."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Eine Mahnung ist eine eindeutige Aufforderung nach Eintritt der Fälligkeit.",
    "§ 286 BGB nennt Fälle, in denen der Kalender oder die endgültige Weigerung die Mahnung ersetzt."
  ],
  "erklaerung": "Steht der Liefertermin kalendermäßig fest, tritt der Verzug nach Ablauf des Termins ohne zusätzliche Mahnung ein. Das gilt auch, wenn der Termin aus einem Ereignis und einer festen Frist berechnet werden kann, zum Beispiel 14 Tage nach Auftragseingang. Bei unbestimmten Formulierungen wie ‚schnellstmöglich‘ muss dagegen grundsätzlich gemahnt werden.",
  "beispiele": [
    "‚Lieferung am 15. Oktober‘: Ab dem Folgetag kann Verzug ohne Mahnung vorliegen.",
    "‚Lieferung 14 Tage nach Auftragseingang‘ ist berechenbar; ‚Lieferung schnellstmöglich‘ ist dagegen kein bestimmter Termin."
  ],
  "fallbeispiel": "Ein Vertrag bestimmt die Lieferung am 15. Oktober. Am 16. Oktober ist die Ware nicht da. Der Termin war kalendermäßig bestimmt, deshalb ist die Mahnung nach § 286 BGB entbehrlich. Anders wäre es bei ‚schnellstmöglich‘: Dann müsste der Käufer nach Fälligkeit eine eindeutige Aufforderung zur Lieferung senden.",
  "typische_fehler": "Jede verspätete Lieferung zwingend mit einer Mahnung verbinden oder eine unbestimmte Zusage wie ‚baldmöglichst‘ als kalendermäßige Bestimmung behandeln. Auch ein einseitig genannter, nicht vereinbarter Termin darf nicht automatisch als Vertragsinhalt gelten.",
  "verstaendnisfragen": [
    "Welche Formulierung lässt den Kalender mahnen? Ein kalendermäßig bestimmter oder bestimmbarer Liefertermin.",
    "Wann bleibt die Mahnung nötig? Bei einem unbestimmten Termin oder wenn kein anderer gesetzlicher Ausnahmefall greift."
  ],
  "pruefungsbezug": "Markiere im Sachverhalt jedes Datum und jede Frist. Wörter wie ‚am‘, ‚bis‘ oder ‚14 Tage nach‘ sprechen für Bestimmbarkeit; ‚schnellstmöglich‘ nicht.",
  "merksatz": "Fester Termin = Mahnung entbehrlich; unbestimmter Termin = nach Fälligkeit mahnen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Was der Käufer jetzt darf

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Rechte des Käufers bei Verzug ableiten

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Was der Käufer jetzt darf",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Steht der Verzug fest, hat der Käufer drei Wege. Wichtig ist die Reihenfolge: **Rücktritt und Schadensersatz statt der Leistung setzen fast immer eine Fristsetzung voraus** — ohne sie geht es nicht."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Recht",
        "Voraussetzung",
        "Wirkung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Auf Lieferung bestehen",
            "Verzug liegt vor",
            "Vertrag bleibt, plus Verzögerungsschaden"
          ],
          "detail": "**Der Normalfall.** Der Käufer will die Ware ja haben. Zusätzlich kann er den Schaden ersetzt verlangen, der durch die Verspätung entstanden ist — etwa Kosten für eine Ersatzanmietung."
        },
        {
          "zellen": [
            "Rücktritt vom Vertrag",
            "angemessene Frist erfolglos verstrichen",
            "Vertrag rückabgewickelt"
          ],
          "detail": "**{{par:bgb-323|§ 323 BGB}}.** Beide Seiten geben zurück, was sie erhalten haben. Wer zurücktritt, kann die Ware nicht mehr verlangen — das ist eine endgültige Entscheidung."
        },
        {
          "zellen": [
            "Schadensersatz statt der Leistung",
            "angemessene Frist erfolglos verstrichen",
            "Ersatz des Nichterfüllungsschadens"
          ],
          "detail": "**Der Weg zum {{begriff:deckungskauf|Deckungskauf}}:** Der Käufer besorgt die Ware woanders und verlangt den Mehrpreis. Kostet die Ersatzware 1.200 € statt 1.000 €, sind die 200 € der Schaden."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Eine Besonderheit gilt beim **Fixgeschäft** — wenn die Einhaltung des Termins nach dem Vertrag so wesentlich ist, dass eine spätere Lieferung sinnlos wäre. Beim beiderseitigen Handelskauf kann der Käufer dann sofort zurücktreten oder Schadensersatz verlangen, ohne Frist zu setzen."
    },
    {
      "typ": "achtung",
      "text": "Beim handelsrechtlichen Fixgeschäft dreht sich die Pflicht um: Will der Käufer **trotzdem** die Lieferung haben, muss er das dem Verkäufer **unverzüglich** anzeigen. Schweigt er, gilt der Vertrag als aufgehoben — Schweigen ist hier ausnahmsweise eine Erklärung."
    },
    {
      "typ": "check",
      "frage": "Vereinbart war Lieferung am 10. März. Am 20. März ist noch nichts da. Der Einkäufer will sofort zurücktreten und woanders kaufen. Geht das?",
      "optionen": [
        {
          "text": "Ja — der Termin war überschritten, das genügt",
          "richtig": false,
          "echo": "Verzug liegt zwar vor, weil der Termin kalendermäßig bestimmt war. Für den Rücktritt braucht es aber zusätzlich eine erfolglos verstrichene Nachfrist."
        },
        {
          "text": "Nein — erst muss eine angemessene Frist gesetzt werden",
          "richtig": true,
          "echo": "Richtig. Der Verzug ist am 11. März ohne Mahnung eingetreten, weil der Termin kalendermäßig bestimmt war. Für Rücktritt oder Schadensersatz statt der Leistung verlangt § 323 BGB aber zusätzlich eine angemessene Nachfrist. Erst wenn die fruchtlos verstreicht, darf zurückgetreten und ein Deckungskauf abgerechnet werden."
        },
        {
          "text": "Nein — ohne Mahnung ist gar kein Verzug eingetreten",
          "richtig": false,
          "echo": "Doch. Bei einem kalendermäßig bestimmten Termin ist die Mahnung nach § 286 BGB entbehrlich. Der Verzug lief also bereits — es fehlt nur die Nachfrist für den Rücktritt."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Mahnung nötig oder entbehrlich?",
      "kategorien": [
        "Mahnung nötig",
        "Entbehrlich"
      ],
      "aufgaben": [
        {
          "text": "„Lieferung bis spätestens 30. April.\"",
          "loesung": "Entbehrlich"
        },
        {
          "text": "„Lieferung erfolgt zeitnah.\"",
          "loesung": "Mahnung nötig"
        },
        {
          "text": "Der Lieferer teilt schriftlich mit, er werde nicht liefern.",
          "loesung": "Entbehrlich"
        },
        {
          "text": "Im Vertrag steht kein Termin, die Ware fehlt seit Wochen.",
          "loesung": "Mahnung nötig"
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
    "Verzug und Rücktritt sind nicht dasselbe.",
    "Rücktritt und Schadensersatz statt der Leistung setzen grundsätzlich eine erfolglose angemessene Frist voraus."
  ],
  "erklaerung": "Bei bestehendem Verzug kann der Käufer zunächst weiter auf Lieferung bestehen und einen Verzögerungsschaden verlangen. Will er sich vom Vertrag lösen oder die Ware anderweitig beschaffen und den Mehrpreis verlangen, braucht er grundsätzlich eine angemessene Nachfrist. Das Fixgeschäft bildet im vorhandenen Stoff eine besondere Ausnahme.",
  "beispiele": [
    "Der Käufer besteht weiter auf Lieferung und verlangt zusätzlich die Kosten einer notwendigen Ersatzanmietung als Verzögerungsschaden.",
    "Bei einem Deckungskauf für 1.200 € statt ursprünglich 1.000 € beträgt der geltend gemachte Mehrpreis 200 €, sofern die weiteren Voraussetzungen vorliegen."
  ],
  "fallbeispiel": "200 Bürostühle sollten bis zum 1. Juni geliefert werden und werden für einen Umzug am 20. Juni benötigt. Am 8. Juni fehlt die Lieferung. Weil die Stühle noch gebraucht werden, wird zunächst eine angemessene Nachfrist bis zum 15. Juni gesetzt. Zusätzlich kann ein bereits entstandener Verzögerungsschaden verlangt werden. Läuft die Frist erfolglos ab, kommen Rücktritt oder Schadensersatz statt der Leistung und damit ein Deckungskauf in Betracht.",
  "typische_fehler": "Sofortiger Rücktritt allein wegen des abgelaufenen Termins oder Verwechslung von Verzögerungsschaden und Schadensersatz statt der Leistung. Die Nachfrist wird nur beim Fixgeschäft entbehrlich.",
  "verstaendnisfragen": [
    "Was darf der Käufer sofort bei Verzug? Weiter auf Lieferung bestehen und Verzögerungsschaden verlangen.",
    "Was muss vor dem Rücktritt grundsätzlich geschehen? Eine angemessene Frist zur Leistung muss erfolglos verstreichen."
  ],
  "pruefungsbezug": "Rechtsfolge immer an die Voraussetzung knüpfen: Lieferung plus Verzögerungsschaden bei Verzug; Rücktritt oder Deckungskauf grundsätzlich erst nach Nachfrist.",
  "merksatz": "Verzug eröffnet Rechte, aber Rücktritt und Ersatzlieferung brauchen grundsätzlich eine erfolglose Nachfrist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Wenn die Ware mangelhaft ist

**Datei:** `lf4-k6-mangel.kapitel.json` · SHA-256 `685711450c1841f61277155411fcc09fd3e16a837c4bbab3e75dcedb98fbc4d3`

**Konkreter Kapitelauftrag:** Einen Liefermangel dokumentieren und Rechte begründen; Kundengruppe, Untersuchungs-/Rügepflicht und Nacherfüllung sauber abgrenzen.

**Einordnung:** Erst prüfen, dann rügen — sonst gilt sie als genehmigt.

### b1 · Wann ist Ware mangelhaft?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Sachmangel nach den drei Anforderungen bestimmen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Wann ist Ware mangelhaft?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Seit der Reform vom 1. Januar 2022 prüft {{par:bgb-434|§ 434 BGB}} einen {{begriff:sachmangel|Sachmangel}} an drei Maßstäben. ==Neu ist dabei vor allem, dass die objektiven Anforderungen immer mitgelten== — was üblich ist, zählt auch dann, wenn im Vertrag nichts dazu steht. Abweichen geht nur durch eine **wirksame abweichende Vereinbarung**: Zwischen Unternehmen kann die Abweichung im Vertrag vereinbart werden, etwa „B-Ware mit Farbabweichung“; steht sie nur im Kleingedruckten, muss sie zusätzlich als AGB wirksam einbezogen sein. Gegenüber Verbrauchern sind die Hürden höher (§ 476 BGB): Der Verbraucher muss **bevor er seine verbindliche Bestellung abgibt** eigens über die konkrete Abweichung informiert werden, und die Abweichung muss ausdrücklich und gesondert vereinbart werden — etwa durch ein eigenes Ankreuzfeld. Ein Hinweis erst in der Bestellbestätigung kommt zu spät, eine Klausel in den AGB reicht nie."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Anforderung",
        "Prüffrage",
        "Beispiel für einen Mangel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Subjektiv",
            "Was wurde vereinbart?",
            "220 g/m² bestellt, 160 g/m² geliefert"
          ],
          "detail": "**Die vereinbarte Beschaffenheit** samt Menge, Art, Qualität und der vertraglich vorausgesetzten Verwendung. Auch zugesagtes Zubehör und Anleitungen gehören dazu."
        },
        {
          "zellen": [
            "Objektiv",
            "Was darf man erwarten?",
            "Druckerpapier staubt und verklebt die Walze"
          ],
          "detail": "**Eignung für die gewöhnliche Verwendung** und die übliche Beschaffenheit vergleichbarer Ware. Auch wenn nichts vereinbart wurde: Papier muss durch einen Drucker laufen."
        },
        {
          "zellen": [
            "Montage",
            "Wurde richtig montiert oder erklärt?",
            "Regal kippt wegen falscher Anleitung"
          ],
          "detail": "**Auch die fehlerhafte Anleitung ist ein Sachmangel** — im Volksmund die IKEA-Klausel. Voraussetzung ist, dass die falsche Anleitung tatsächlich zum Schaden führt."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Daneben stellt {{par:bgb-434|§ 434 BGB}} zwei Fälle dem Sachmangel ausdrücklich gleich: die **Falschlieferung** — geliefert wird etwas anderes als bestellt — und die **Zuweniglieferung**. Beides wird also nach denselben Regeln behandelt wie schlechte Qualität."
    },
    {
      "typ": "merke",
      "text": "Drei Maßstäbe: **vereinbart, üblich, richtig montiert.** Falsch- und Zuweniglieferung gelten ebenfalls als Sachmangel. Entscheidend ist immer der Zustand bei **Gefahrübergang**.",
      "karteikarte": "An welchen drei Anforderungen misst § 434 BGB einen Sachmangel, und welche zwei Fälle stehen ihm gleich?"
    },
    {
      "typ": "achtung",
      "text": "Ein Mangel muss **bei Gefahrübergang** vorgelegen haben. Was der Käufer später selbst kaputt macht, ist kein Mangel. Bei „ab Werk\" ist der maßgebliche Zeitpunkt die Übergabe an den Frachtführer — ein Transportschaden ist deshalb kein Sachmangel, sondern ein Fall für den Frachtführer."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ein Kaufvertrag verpflichtet zur Übergabe einer mangelfreien Sache.",
    "Gefahrübergang bezeichnet den Zeitpunkt, ab dem das Risiko des zufälligen Untergangs auf den Käufer übergeht."
  ],
  "hintergrundwissen": "§ 434 BGB vergleicht die tatsächliche Ware mit mehreren Maßstäben. Die vereinbarte Beschaffenheit steht an erster Stelle; zusätzlich zählt, was Käufer bei einer vergleichbaren Sache vernünftigerweise erwarten dürfen. Deshalb kann auch eine nicht ausdrücklich vereinbarte, aber übliche Eigenschaft wichtig sein.",
  "ablauf": [
    "Vertrag und Bestellung lesen: Was wurde konkret vereinbart?",
    "Ware bei Gefahrübergang mit Bestellung, Beschreibung und üblicher Beschaffenheit vergleichen.",
    "Abweichung dokumentieren: Fotos, Lieferschein, Prüfprotokoll und betroffene Menge sichern.",
    "Erst danach entscheiden, ob ein Sachmangel, eine Falschlieferung oder eine Zuweniglieferung vorliegt."
  ],
  "beispiele": [
    "Bestellt sind 100 Ordner mit 8 cm Rückenbreite, geliefert werden 5-cm-Ordner: vereinbarte Beschaffenheit und Menge weichen ab.",
    "Eine Kaffeemaschine wird als funktionsfähig verkauft, schaltet sich aber bei normaler Nutzung aus: Auch ohne besondere Zusage liegt eine Abweichung von der üblichen Verwendung vor."
  ],
  "fallbeispiel": "MAKEL bestellt 50 Kartons Kopierpapier einer bestimmten Grammatur. Bei der Eingangskontrolle werden zehn Kartons mit deutlich dünnerem Papier gefunden. Die richtige Prüfung lautet: Bestellung ansehen, betroffene Menge feststellen, Beweise sichern und die Abweichung dem Lieferanten konkret mitteilen. Nicht die gesamte Lieferung pauschal zurückweisen, wenn nur zehn Kartons betroffen sind.",
  "typische_fehler": "Nicht jede Unzufriedenheit ist ein Sachmangel. Ein bloßer Geschmackswechsel oder ein später selbst verursachter Schaden reicht nicht. Umgekehrt darf eine falsche Anleitung nicht übersehen werden, wenn sie die Montage fehlerhaft macht.",
  "verstaendnisfragen": [
    "Warum wird der Zeitpunkt des Gefahrübergangs geprüft? Weil der Mangel zu diesem Zeitpunkt vorgelegen haben muss.",
    "Warum kann eine Falschlieferung wie ein Sachmangel behandelt werden? Weil der Käufer nicht das geschuldete Kaufobjekt erhalten hat."
  ],
  "pruefungsbezug": "In Fällen immer zuerst die drei Maßstäbe nennen und anschließend die Abweichung am Sachverhalt belegen. Die reine Aussage ‚Ware ist schlecht‘ reicht nicht.",
  "merksatz": "Vereinbart, üblich und richtig montiert: Diese drei Perspektiven entscheiden, ob die Ware mangelhaft ist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Die Rügepflicht unter Kaufleuten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Untersuchungs- und Rügepflicht beim Handelskauf anwenden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Die Rügepflicht unter Kaufleuten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zwischen Kaufleuten gilt eine Regel, die im Verbrauchergeschäft fehlt und die viele Rechte kostet: {{par:hgb-377|§ 377 HGB}}. Der Käufer muss die Ware **unverzüglich untersuchen** und Mängel **unverzüglich anzeigen**. ==Wer schweigt, verliert seine Mängelrechte vollständig — die Ware gilt als genehmigt.=="
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Frist",
      "titel": "Untersuchen, rügen, Rechte behalten",
      "lead": "Vier Schritte nach dem Wareneingang. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Wareneingang",
          "satz": "die Uhr läuft",
          "text": "Mit der Ablieferung beginnt die Pflicht. „Unverzüglich\" heißt ohne schuldhaftes Zögern — je nach Ware und Betriebsgröße sind das Stunden bis wenige Tage, keine Wochen."
        },
        {
          "nr": 2,
          "titel": "Untersuchen",
          "satz": "soweit tunlich",
          "text": "Verlangt wird eine im ordnungsgemäßen Geschäftsgang zumutbare Prüfung — bei größeren Mengen genügt eine Stichprobe. Niemand muss jede einzelne Schraube einzeln messen."
        },
        {
          "nr": 3,
          "titel": "Offene Mängel rügen",
          "satz": "unverzüglich",
          "text": "Was bei dieser Untersuchung erkennbar ist, muss sofort angezeigt werden. Die Rüge braucht keine Form, sollte aber beweisbar sein — also schriftlich, mit Angabe von Art und Umfang des Mangels."
        },
        {
          "nr": 4,
          "titel": "Versteckte Mängel",
          "satz": "unverzüglich nach Entdeckung",
          "text": "Zeigt sich der Mangel erst später im Gebrauch, läuft die Frist ab der Entdeckung neu. Die Verjährung nach § 438 BGB läuft davon unabhängig weiter — sie wird durch die Rüge nicht verlängert."
        }
      ],
      "regel": "Die Ausnahme: Hat der Verkäufer den Mangel arglistig verschwiegen, kann er sich auf eine versäumte Rüge nicht berufen. Wer täuscht, soll aus der Nachlässigkeit des anderen keinen Vorteil ziehen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Situation",
        "Gilt § 377 HGB?",
        "Folge bei Schweigen"
      ],
      "zeilen": [
        {
          "zellen": [
            "Betrieb kauft bei Betrieb",
            "ja",
            "Rechte verloren, Ware genehmigt"
          ],
          "detail": "**Der beiderseitige Handelskauf** — beide Seiten sind Kaufleute. Genau der Normalfall in der Beschaffung."
        },
        {
          "zellen": [
            "Verbraucher kauft bei Betrieb",
            "nein",
            "Rechte bleiben bis zur Verjährung"
          ],
          "detail": "**Privatkunden trifft keine Rügepflicht.** Sie haben zwei Jahre Zeit — deshalb ist die Rechtslage im Verbrauchergeschäft für den Käufer deutlich komfortabler."
        },
        {
          "zellen": [
            "Verkäufer hat den Mangel arglistig verschwiegen",
            "Berufung ausgeschlossen",
            "Rechte bleiben trotz Schweigen"
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Eure Lieferung Kopierpapier kommt am Montag. Am Freitag fällt beim Auspacken der dritten Palette auf, dass die Bögen zu dünn sind. Ihr rügt am folgenden Montag. Was gilt?",
      "optionen": [
        {
          "text": "Alles in Ordnung — zwei Jahre Gewährleistung laufen ja",
          "richtig": false,
          "echo": "Die zwei Jahre aus § 438 BGB sind die Verjährungsfrist. Beim Handelskauf steht davor die Rügepflicht aus § 377 HGB, und die ist viel kürzer."
        },
        {
          "text": "Kritisch — die zu dünne Ware wäre bei einer zumutbaren Prüfung sofort aufgefallen",
          "richtig": true,
          "echo": "Richtig. Die Papierstärke ist ein offener Mangel, den eine stichprobenartige Prüfung beim Wareneingang gezeigt hätte. Eine Woche später ist nicht mehr unverzüglich — die Ware gilt als genehmigt und die Mängelrechte sind verloren. Anders läge es nur, wenn der Lieferer den Mangel arglistig verschwiegen hätte."
        },
        {
          "text": "Unproblematisch — versteckte Mängel dürfen später gerügt werden",
          "richtig": false,
          "echo": "Ein versteckter Mangel ist einer, den man bei zumutbarer Untersuchung nicht erkennen kann. Eine abweichende Papierstärke gehört nicht dazu, die sieht und fühlt man beim ersten Griff."
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
  "vorauswissen": "Die Rügepflicht gilt nur beim beiderseitigen Handelskauf. Sie ist von der allgemeinen Verjährungsfrist zu unterscheiden.",
  "hintergrundwissen": "§ 377 HGB schützt den Verkäufer davor, lange nach der Lieferung mit angeblich schon vorhandenen Mängeln konfrontiert zu werden. Dafür muss der kaufmännische Käufer die Ware im ordnungsgemäßen Geschäftsgang untersuchen und erkennbare Mängel unverzüglich anzeigen.",
  "ablauf": [
    "Prüfen, ob beide Parteien Kaufleute sind.",
    "Art der Ware und zumutbare Eingangskontrolle bestimmen.",
    "Offenen Mangel sofort, versteckten Mangel sofort nach Entdeckung konkret rügen.",
    "Rüge beweisbar dokumentieren und betroffene Ware sichern."
  ],
  "beispiele": [
    "Bei 500 Kartons Büromaterial ist eine Stichprobe regelmäßig ausreichend; eine vollständige Einzelprüfung jeder Packung ist nicht immer zumutbar.",
    "Ein Defekt, der erst beim ersten bestimmungsgemäßen Einsatz sichtbar wird, kann ein versteckter Mangel sein. Dann beginnt die Rügefrist mit der Entdeckung, nicht mit einer beliebig späten Sammelprüfung."
  ],
  "fallbeispiel": "Die Lieferung kommt Montag an, die Eingangskontrolle erkennt am Dienstag beschädigte Kartons. Eine schriftliche Rüge am Dienstag mit Menge, Schaden und gewünschter Klärung ist rechtzeitig und nachvollziehbar. Wer erst drei Wochen wartet, riskiert die Genehmigungsfiktion.",
  "typische_fehler": "Die zweijährige Verjährung ersetzt nicht die sofortige Rüge. Ebenso ist ‚unverzüglich‘ kein starrer Zeitraum: Ware, Betriebsablauf und Erkennbarkeit des Mangels müssen berücksichtigt werden.",
  "verstaendnisfragen": [
    "Warum genügt Schweigen nicht? Weil die Ware im Handelskauf sonst als genehmigt gilt.",
    "Was muss eine gute Rüge enthalten? Mindestens die erkennbare Abweichung, die betroffene Ware und den Bezug zur Lieferung."
  ],
  "pruefungsbezug": "Prüfungsfälle werden meist über Kaufmannseigenschaft, Erkennbarkeit und Zeitpunkt gelöst. Diese drei Punkte sollten sichtbar getrennt geprüft werden.",
  "merksatz": "Im Handelskauf gilt: untersuchen, erkennen, unverzüglich und konkret rügen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Welche Rechte der Käufer hat

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Mängelrechte in der richtigen Reihenfolge ableiten

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `vertiefung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Welche Rechte der Käufer hat",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{par:bgb-437|§ 437 BGB}} zählt die Rechte auf — aber sie stehen **nicht gleichrangig nebeneinander**. Die {{begriff:nacherfuellung|Nacherfüllung}} kommt zuerst. Der Verkäufer soll die Chance bekommen, seinen Fehler selbst zu beheben, bevor der Vertrag angetastet wird."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Stufen",
      "titel": "In dieser Reihenfolge, nicht anders",
      "lead": "Wer Stufe 1 überspringt, verliert im Streit. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Nacherfüllung verlangen",
          "satz": "§ 439 BGB · Käufer wählt",
          "text": "Reparatur oder Ersatzlieferung — die Wahl hat der Käufer. Alle nötigen Aufwendungen wie Transport, Arbeit und Material trägt der Verkäufer. Dazu gehört eine angemessene Frist."
        },
        {
          "nr": 2,
          "titel": "Frist verstreicht erfolglos",
          "satz": "oder Nacherfüllung schlägt fehl",
          "text": "Erst jetzt öffnet sich die zweite Stufe. Die Frist ist entbehrlich, wenn der Verkäufer die Nacherfüllung ernsthaft verweigert oder sie zweimal misslungen ist."
        },
        {
          "nr": 3,
          "titel": "Rücktritt oder Minderung",
          "satz": "§ 323 · § 441 BGB",
          "text": "Rücktritt löst den Vertrag auf, beide geben zurück. Minderung behält die Ware und senkt den Preis. Bei nur unerheblichem Mangel ist der Rücktritt ausgeschlossen — die Minderung bleibt."
        },
        {
          "nr": 4,
          "titel": "Schadensersatz",
          "satz": "zusätzlich möglich",
          "text": "Deckt, was über die Ware hinaus entstanden ist: Produktionsausfall, Mehrkosten des Deckungskaufs, vergebliche Aufwendungen. Setzt in der Regel Verschulden des Verkäufers voraus."
        }
      ],
      "regel": "Merksatz: Nacherfüllung zuerst, alles andere danach. Wer sofort mindert oder zurücktritt, ohne dem Verkäufer die Nachbesserung angeboten zu haben, steht im Streit schlecht da."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Recht",
        "Vertrag",
        "Passt, wenn"
      ],
      "zeilen": [
        {
          "zellen": [
            "{{begriff:nacherfuellung|Nacherfüllung}}",
            "bleibt bestehen",
            "die Ware weiter gebraucht wird"
          ]
        },
        {
          "zellen": [
            "{{begriff:minderung|Minderung}}",
            "bleibt bestehen",
            "die Ware trotz Mangel brauchbar ist"
          ],
          "detail": "**Der Kaufpreis sinkt im Verhältnis der Werte** nach {{par:bgb-441|§ 441 BGB}}. Praktisch wird meist ein Prozentsatz verhandelt — das ist schneller als jedes Gutachten."
        },
        {
          "zellen": [
            "Rücktritt",
            "wird rückabgewickelt",
            "die Ware unbrauchbar ist"
          ],
          "detail": "**Ausgeschlossen bei unerheblicher Pflichtverletzung.** Ein kleiner Kratzer an der Rückwand rechtfertigt keine Rückabwicklung des ganzen Vertrags."
        },
        {
          "zellen": [
            "Schadensersatz",
            "je nach Art",
            "über die Ware hinaus Schaden entstand"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Zeitlich begrenzt {{par:bgb-438|§ 438 BGB}} die Ansprüche: **zwei Jahre ab Ablieferung** bei beweglichen Sachen, **fünf Jahre** bei Bauwerken und dafür verwendetem Material. Hat der Verkäufer arglistig getäuscht, gilt die regelmäßige {{begriff:verjaehrung|Verjährung}} von drei Jahren nach {{par:bgb-195|§ 195 BGB}}."
    },
    {
      "typ": "vertiefung",
      "titel": "Warum Verjährung und Rügefrist zwei verschiedene Dinge sind",
      "absaetze": [
        "Die **Rügefrist** aus {{par:hgb-377|§ 377 HGB}} entscheidet, ob Rechte überhaupt entstehen. Wer nicht rechtzeitig rügt, hat gar keine Ansprüche — die Ware gilt als genehmigt.",
        "Die **Verjährungsfrist** aus {{par:bgb-438|§ 438 BGB}} entscheidet, wie lange bestehende Ansprüche durchsetzbar bleiben. Sie läuft ab Ablieferung, unabhängig davon, wann der Mangel entdeckt wurde.",
        "Beides zusammen heißt: Ein versteckter Mangel, der nach 23 Monaten auffällt, muss zwar unverzüglich gerügt werden — aber einen Monat später ist der Anspruch trotzdem verjährt. Die Rüge verlängert die Verjährung nicht."
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welches Recht passt hier am besten?",
      "kategorien": [
        "Nacherfüllung",
        "Minderung",
        "Rücktritt"
      ],
      "aufgaben": [
        {
          "text": "Von 500 Ordnern haben 20 einen Kratzer, verwendbar sind sie alle.",
          "loesung": "Minderung"
        },
        {
          "text": "Der gelieferte Drucker läuft nicht, der Lieferer bietet Austausch an.",
          "loesung": "Nacherfüllung"
        },
        {
          "text": "Zweimal Ersatz geliefert, beide Male defekt, Termin längst vorbei.",
          "loesung": "Rücktritt"
        },
        {
          "text": "Statt 220 g/m² kam 160 g/m² — der Lieferer will sofort umtauschen.",
          "loesung": "Nacherfüllung"
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
  "vorauswissen": "Mängelrechte bauen grundsätzlich aufeinander auf: Der Käufer soll zunächst eine mangelfreie Leistung ermöglichen, bevor weitere Rechte geprüft werden.",
  "hintergrundwissen": "Die Nacherfüllung kann aus Reparatur oder Ersatzlieferung bestehen. Erst wenn sie scheitert, verweigert wird oder unzumutbar ist, kommen regelmäßig Rücktritt oder Minderung sowie gegebenenfalls Schadensersatz in Betracht.",
  "ablauf": [
    "Mangel und rechtzeitige Rüge feststellen.",
    "Nacherfüllung verlangen und angemessene Frist setzen.",
    "Ergebnis dokumentieren: behoben, fehlgeschlagen, verweigert oder unzumutbar.",
    "Danach Rücktritt, Minderung oder Schadensersatz mit den jeweiligen Voraussetzungen prüfen."
  ],
  "beispiele": [
    "Ein Drucker wird repariert und funktioniert danach ordnungsgemäß: Der Nacherfüllungsanspruch ist erfüllt.",
    "Die Ersatzlieferung weist denselben Fehler erneut auf: Jetzt muss geprüft werden, ob die Nacherfüllung fehlgeschlagen ist und welches Folgerecht passt."
  ],
  "fallbeispiel": "MAKEL erhält einen defekten Scanner. Die erste Reaktion ist nicht sofort der Rücktritt, sondern eine konkrete Aufforderung zur Reparatur oder Ersatzlieferung. Bleibt der Lieferant trotz angemessener Möglichkeit erfolglos, wird die nächste Stufe der Rechte geprüft.",
  "typische_fehler": "Nicht jedes Problem berechtigt sofort zur Vertragsauflösung. Auch Minderung und Rücktritt sind nicht dasselbe: Bei der Minderung bleibt der Vertrag bestehen, der Preis wird angepasst.",
  "verstaendnisfragen": [
    "Warum steht Nacherfüllung am Anfang? Weil der Vertrag grundsätzlich erhalten und der Mangel zunächst behoben werden soll.",
    "Was unterscheidet Rücktritt und Minderung? Rücktritt löst den Vertrag rückab, Minderung reduziert den Preis bei Behalten der Sache."
  ],
  "pruefungsbezug": "Die Rechtekette sollte als begründete Reihenfolge dargestellt werden, nicht als ungeordnete Liste. Jede Stufe braucht einen konkreten Sachverhaltsbezug.",
  "merksatz": "Erst Nacherfüllung, dann – bei deren Scheitern – die weiteren Rechte prüfen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k7 · Wenn der Kunde nicht zahlt

**Datei:** `lf4-k7-zahlungsverzug.kapitel.json` · SHA-256 `90c402575e697d50caaf96a49dc480ec08fc0670ce09fd786b26b6b04519a57f`

**Konkreter Kapitelauftrag:** Einen offenen Kundenposten von Fälligkeit bis Durchsetzung verfolgen; Verzug, Zinsen, Verjährung und Kulanz getrennt beurteilen.

**Einordnung:** Vom freundlichen Hinweis bis zum Gerichtsvollzieher.

### b1 · Zwei Störungen auf der Käuferseite

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Annahmeverzug und Zahlungsverzug unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Zwei Störungen auf der Käuferseite",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Käufer schuldet nach {{par:bgb-433|§ 433 BGB}} zweierlei: **zahlen und abnehmen**. Verletzt er die eine Pflicht, entsteht {{begriff:zahlungsverzug|Zahlungsverzug}}; verletzt er die andere, {{begriff:annahmeverzug|Annahmeverzug}}. ==Die beiden werden in Prüfungen gern vermischt, haben aber völlig verschiedene Folgen.=="
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Pflichten",
      "titel": "Nicht abgenommen oder nicht bezahlt?",
      "lead": "Dieselbe Rechnung, zwei ganz unterschiedliche Lagen. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Annahmeverzug",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Ware wird nicht angenommen",
              "detail": "Der Verkäufer hat ordnungsgemäß angeboten — richtige Ware, richtiger Ort, richtige Zeit — und der Käufer nimmt sie nicht."
            },
            {
              "text": "Gefahr geht auf den Käufer über",
              "detail": "Geht die Ware danach unter, muss der Käufer trotzdem zahlen. Das ist die schärfste Folge des Annahmeverzugs."
            },
            {
              "text": "Verkäufer haftet nur noch eingeschränkt",
              "detail": "Für die Ware haftet er ab jetzt nur bei Vorsatz und grober Fahrlässigkeit. Leichte Fahrlässigkeit bei der Lagerung schadet ihm nicht mehr."
            },
            {
              "text": "Mehraufwendungen sind zu ersetzen",
              "detail": "Lagerkosten, erneute Anfahrt, Kühlung. Bei Handelsgeschäften kommt der Selbsthilfeverkauf in Betracht — die Ware wird verwertet und abgerechnet."
            }
          ]
        },
        {
          "name": "Zahlungsverzug",
          "ton": "gold",
          "punkte": [
            {
              "text": "Rechnung wird nicht bezahlt",
              "detail": "Die Forderung ist fällig, der Käufer zahlt nicht — und er hat es zu vertreten. Liquiditätsprobleme entschuldigen nicht, Geld muss man haben."
            },
            {
              "text": "Verzugszinsen laufen",
              "detail": "Ab dem Eintritt des Verzugs, nicht erst ab der Mahnung im Betrieb. Das macht bei großen Beträgen schnell einen spürbaren Unterschied."
            },
            {
              "text": "Verzugsschaden ist zu ersetzen",
              "detail": "Mahnkosten, Kosten des Inkassos oder Anwalts, entgangene Zinsen. Alles, was durch die verspätete Zahlung tatsächlich entstanden ist."
            },
            {
              "text": "Notfalls gerichtlich durchsetzen",
              "detail": "Mahnbescheid, Vollstreckungsbescheid, Zwangsvollstreckung. Der letzte Schritt, wenn das kaufmännische Mahnwesen nichts bringt."
            }
          ]
        }
      ],
      "regel": "Merksatz: Annahmeverzug betrifft die Ware, Zahlungsverzug das Geld. Beide können gleichzeitig vorliegen — wer nicht abnimmt, zahlt oft auch nicht."
    },
    {
      "typ": "merke",
      "text": "**Annahmeverzug** verschiebt die Gefahr auf den Käufer und mildert die Haftung des Verkäufers. **Zahlungsverzug** löst Zinsen und Schadensersatz aus.",
      "karteikarte": "Worin unterscheiden sich Annahmeverzug und Zahlungsverzug, und was ist jeweils die wichtigste Folge?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Nach § 433 BGB muss der Käufer die Ware abnehmen und den Kaufpreis zahlen.",
    "Die beiden Pflichten können unabhängig voneinander gestört werden."
  ],
  "erklaerung": "Annahmeverzug liegt vor, wenn der Verkäufer die richtige Ware ordnungsgemäß anbietet und der Käufer sie nicht annimmt. Dann geht die Gefahr auf den Käufer über, die Haftung des Verkäufers wird eingeschränkt und Mehraufwendungen können ersetzt verlangt werden. Zahlungsverzug entsteht dagegen, wenn eine fällige Forderung nicht bezahlt wird und die weiteren Voraussetzungen des § 286 BGB erfüllt sind; dann laufen Verzugszinsen und weitere Verzugsschäden.",
  "beispiele": [
    "Der Kunde schickt den Fahrer trotz richtiger Lieferung weg: Das ist Annahmeverzug, nicht Zahlungsverzug.",
    "Die Ware wurde angenommen, aber die Rechnung bleibt nach Fälligkeit offen: Das ist Zahlungsverzug."
  ],
  "fallbeispiel": "Ein Kunde nimmt die angelieferte Ware nicht an und bezahlt anschließend auch die Rechnung nicht. Es können beide Störungen nebeneinander vorliegen: Für die nicht angenommene Ware gelten die Folgen des Annahmeverzugs; für die offene fällige Forderung die Folgen des Zahlungsverzugs. Die Begriffe werden getrennt geprüft, auch wenn sie im selben Sachverhalt vorkommen.",
  "typische_fehler": "Jede Nichtzahlung als Annahmeverzug bezeichnen oder aus dem Annahmeverzug automatisch Verzugszinsen ableiten. Annahmeverzug betrifft die Übergabe; Zahlungsverzug die fällige Geldforderung.",
  "verstaendnisfragen": [
    "Welche wichtigste Folge hat Annahmeverzug? Die Gefahr geht auf den Käufer über und der Verkäufer haftet nur noch eingeschränkt.",
    "Welche Folgen hat Zahlungsverzug? Vor allem Verzugszinsen und Ersatz weiterer Verzugsschäden."
  ],
  "pruefungsbezug": "Im Sachverhalt die Verben markieren: Wird nicht angenommen oder nicht bezahlt? Erst danach die passende Störung und ihre Rechtsfolgen nennen.",
  "merksatz": "Annahmeverzug betrifft die Ware; Zahlungsverzug betrifft das Geld."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Ab wann läuft der Zahlungsverzug?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Eintritt des Zahlungsverzugs bestimmen und Ansprüche berechnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `merke-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Ab wann läuft der Zahlungsverzug?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{par:bgb-286|§ 286 BGB}} kennt drei Wege in den Zahlungsverzug. Der dritte ist der, den viele nicht kennen — und er greift ohne jede Mahnung."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Weg",
        "Voraussetzung",
        "Verzug beginnt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Mahnung",
            "Aufforderung nach Fälligkeit",
            "mit Zugang der Mahnung"
          ],
          "detail": "**Der Grundfall.** Eine Mahnung vor Fälligkeit wirkt nicht. Die erste Mahnung setzt den Verzug in Gang — sie ist noch nicht selbst Verzugsschaden und deshalb in der Regel nicht ersatzfähig."
        },
        {
          "zellen": [
            "Kalendermäßig bestimmt",
            "„zahlbar bis 30. Juni\"",
            "am Tag danach, ohne Mahnung"
          ]
        },
        {
          "zellen": [
            "30-Tage-Regel",
            "Rechnung zugegangen und fällig",
            "spätestens 30 Tage danach"
          ],
          "detail": "**Gegenüber Verbrauchern nur, wenn sie in der Rechnung darauf hingewiesen wurden.** Zwischen Betrieben gilt sie ohne diesen Hinweis — das wird in Prüfungen gern abgefragt."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Steht der Verzug fest, schuldet der Käufer Zinsen nach {{par:bgb-288|§ 288 BGB}}. Die Höhe hängt davon ab, **ob ein Verbraucher beteiligt ist**: fünf Prozentpunkte über dem Basiszinssatz, wenn ja — neun Prozentpunkte, wenn beide Seiten Unternehmer sind. Dazu kommt bei Entgeltforderungen zwischen Unternehmen eine Pauschale von 40 Euro.",
      "standhinweis": "Der Basiszinssatz wird zum 1. Januar und 1. Juli neu festgelegt. In Rechenaufgaben ist er vorgegeben; für eine echte Forderung den aktuellen Wert bei der Deutschen Bundesbank nachsehen."
    },
    {
      "typ": "achtung",
      "text": "Die **40-Euro-Pauschale** gibt es nur, wenn der Schuldner **kein Verbraucher** ist. Und sie wird auf einen später geltend gemachten Schadensersatz für Rechtsverfolgungskosten angerechnet — man bekommt sie also nicht zusätzlich obendrauf."
    },
    {
      "typ": "merke",
      "text": "Verzugszinsen: **fünf** Prozentpunkte über Basiszinssatz mit Verbraucher, **neun** Prozentpunkte ohne. Die 40-Euro-Pauschale gilt nur zwischen Unternehmen.",
      "karteikarte": "Wie hoch sind die Verzugszinsen nach § 288 BGB, und wovon hängt der Unterschied ab?"
    },
    {
      "typ": "check",
      "frage": "Ihr habt einem Geschäftskunden am 2. Mai eine Rechnung über 5.000 € geschickt, zahlbar sofort. Es steht kein Datum und kein Hinweis auf Verzug drauf. Wann ist er spätestens im Verzug?",
      "optionen": [
        {
          "text": "Gar nicht — ohne Mahnung gibt es keinen Verzug",
          "richtig": false,
          "echo": "Das gilt nur als Grundregel. § 286 BGB kennt daneben die 30-Tage-Regel für Entgeltforderungen, die ohne Mahnung greift."
        },
        {
          "text": "Spätestens 30 Tage nach Zugang der Rechnung",
          "richtig": true,
          "echo": "Richtig. Bei Entgeltforderungen tritt der Verzug spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung ein. Der besondere Hinweis in der Rechnung ist nur gegenüber Verbrauchern nötig — hier ist der Kunde ein Unternehmen. Ab dann laufen neun Prozentpunkte über dem Basiszinssatz, dazu die Pauschale von 40 €."
        },
        {
          "text": "Sofort am 2. Mai, weil „zahlbar sofort\" draufsteht",
          "richtig": false,
          "echo": "„Sofort\" macht die Forderung fällig, bestimmt aber keinen Kalendertag im Sinne des § 286 BGB. Für den Verzug braucht es entweder eine Mahnung oder den Ablauf der 30 Tage."
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
    "Zahlungsverzug kann durch Mahnung, einen festen Zahlungstermin oder die 30-Tage-Regel eintreten.",
    "Die 40-Euro-Pauschale gilt nur bei Entgeltforderungen zwischen Unternehmen."
  ],
  "erklaerung": "Der Grundfall ist die Mahnung nach Fälligkeit. Daneben kann ein kalendermäßig bestimmtes Zahlungsdatum den Verzug ohne Mahnung auslösen. Die 30-Tage-Regel beginnt bei einer fälligen Entgeltforderung spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung; gegenüber Verbrauchern ist der Hinweis in der Rechnung erforderlich. Die konkrete Zinshöhe hängt vom jeweils geltenden Basiszinssatz ab und muss bei aktuellen Aufgaben geprüft werden.",
  "beispiele": [
    "‚Zahlbar bis 30. Juni‘: Der Verzug kann am Folgetag ohne weitere Mahnung beginnen.",
    "Bei einer sofort fälligen Rechnung an einen Geschäftskunden kann die 30-Tage-Regel auch ohne Hinweis in der Rechnung greifen."
  ],
  "fallbeispiel": "Eine Rechnung über 5.000 € geht einem Geschäftskunden am 2. Mai zu und ist sofort fällig. Steht kein konkretes Zahlungsdatum und kein Hinweis auf Verzug in der Rechnung, beginnt der Verzug spätestens nach Ablauf der 30 Tage nach Fälligkeit und Zugang. Ab diesem Zeitpunkt werden die Verzugszinsen nach § 288 BGB und bei einem Geschäftskunden die 40-Euro-Pauschale geprüft. Für den genauen Eurobetrag muss der aktuelle Basiszinssatz eingesetzt werden.",
  "typische_fehler": "Ohne Mahnung immer das Fehlen von Verzug annehmen oder ‚zahlbar sofort‘ mit einem kalendermäßig bestimmten Datum gleichsetzen. Außerdem wird die 40-Euro-Pauschale gegenüber Verbrauchern angesetzt oder der veränderliche Basiszinssatz als feste Zahl behandelt.",
  "verstaendnisfragen": [
    "Welche drei Wege können zum Zahlungsverzug führen? Mahnung, kalendermäßige Bestimmung und 30-Tage-Regel.",
    "Wovon hängt die konkrete Höhe der Verzugszinsen ab? Vom gesetzlichen Prozentsatz und dem jeweils aktuellen Basiszinssatz sowie davon, ob ein Verbraucher beteiligt ist."
  ],
  "pruefungsbezug": "Das Eintrittsdatum auf einer Zeitachse bestimmen und erst danach Zinsen und Pauschale prüfen. Bei dynamischen Werten den Prüfmarker beachten und keine veraltete Zahl einsetzen.",
  "merksatz": "Erst den Beginn des Verzugs bestimmen, dann Zinsen, Pauschale und weiteren Schaden berechnen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Vom Mahnbrief zur Zwangsvollstreckung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das gerichtliche Mahnverfahren in seinen Stufen erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `praxistipp-1`, `vertiefung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Vom Mahnbrief zur Zwangsvollstreckung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Das **kaufmännische** Mahnwesen ist eine betriebliche Entscheidung: Wie viele Mahnungen, in welchem Ton, mit welcher Frist. ==Rechtlich genügt eine einzige.== Erst wenn das nichts bringt, folgt das **gerichtliche** Mahnverfahren."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Der gerichtliche Weg",
      "titel": "Vier Stufen bis zum Geld",
      "lead": "Jede Stufe hat ihre eigene Frist. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Antrag auf Mahnbescheid",
          "satz": "beim Mahngericht",
          "text": "Der Gläubiger beantragt den {{begriff:mahnbescheid|Mahnbescheid}}, ohne die Forderung begründen zu müssen. Das Gericht prüft nur die Form, nicht ob die Forderung berechtigt ist. Deshalb geht es schnell und ist vergleichsweise billig."
        },
        {
          "nr": 2,
          "titel": "Widerspruch möglich",
          "satz": "zwei Wochen",
          "text": "Widerspricht der Schuldner fristgerecht, endet das Mahnverfahren. Es geht dann in das normale Streitverfahren über, in dem die Forderung tatsächlich geprüft wird. Widerspricht er nicht, geht es weiter."
        },
        {
          "nr": 3,
          "titel": "Vollstreckungsbescheid",
          "satz": "auf Antrag",
          "text": "Er wirkt wie ein Urteil und ist dreißig Jahre lang vollstreckbar. Auch dagegen kann sich der Schuldner wehren — durch Einspruch, ebenfalls binnen zwei Wochen."
        },
        {
          "nr": 4,
          "titel": "Zwangsvollstreckung",
          "satz": "Gerichtsvollzieher",
          "text": "Pfändung von Konto, Lohn oder Sachen. Ob dabei Geld herauskommt, hängt allein davon ab, ob der Schuldner etwas hat — ein Titel gegen einen Mittellosen bleibt Papier."
        }
      ],
      "regel": "Beide Fristen betragen zwei Wochen: Widerspruch gegen den Mahnbescheid, Einspruch gegen den Vollstreckungsbescheid. Wer sie verstreichen lässt, verliert die Möglichkeit, die Forderung inhaltlich prüfen zu lassen."
    },
    {
      "typ": "absatz",
      "text": "Zeitlich begrenzt {{par:bgb-195|§ 195 BGB}} die Forderung auf **drei Jahre**. Sie beginnt nach {{par:bgb-199|§ 199 BGB}} aber nicht mit der Rechnung, sondern **mit dem Schluss des Jahres**, in dem der Anspruch entstanden ist — eine Rechnung aus dem März 2026 verjährt also erst Ende 2029."
    },
    {
      "typ": "praxistipp",
      "text": "Deshalb häufen sich Mahnbescheide im Dezember. Wer eine alte Forderung hat, muss vor dem Jahreswechsel handeln — der Mahnbescheid hemmt die Verjährung. Ein Blick in die offene Postenliste im November gehört in jedem Betrieb zum Jahresabschluss."
    },
    {
      "typ": "vertiefung",
      "titel": "Warum Vorbeugen billiger ist als Mahnen",
      "absaetze": [
        "Jede Mahnstufe kostet Arbeitszeit, und jeder Tag Verzug kostet Zinsen, die selten vollständig hereingeholt werden. Der {{begriff:eigentumsvorbehalt|Eigentumsvorbehalt}} aus Kapitel 4 ist deshalb kein Papierkram, sondern die billigste Sicherheit, die es gibt.",
        "Weitere übliche Mittel: Vorkasse oder Anzahlung bei Neukunden, Bonitätsauskunft vor größeren Aufträgen, Kreditlimits je Kunde, und Skonto als Anreiz für schnelle Zahlung.",
        "Rechnerisch lohnt sich Skonto für den Verkäufer oft trotz des Abschlags: Zwei Prozent Nachlass sind billiger als sechzig Tage Kapitalbindung plus das Ausfallrisiko."
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Störung liegt vor?",
      "kategorien": [
        "Annahmeverzug",
        "Zahlungsverzug",
        "Lieferungsverzug"
      ],
      "aufgaben": [
        {
          "text": "Der Kunde lässt die angelieferte Ware an der Rampe stehen.",
          "loesung": "Annahmeverzug"
        },
        {
          "text": "Die Rechnung ist seit sechs Wochen fällig, es kam nichts.",
          "loesung": "Zahlungsverzug"
        },
        {
          "text": "Der vereinbarte Liefertermin war vor zehn Tagen, die Ware fehlt.",
          "loesung": "Lieferungsverzug"
        },
        {
          "text": "Der Kunde verweigert die Unterschrift auf dem Lieferschein und schickt den Fahrer weg.",
          "loesung": "Annahmeverzug"
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
    "Das kaufmännische Mahnwesen ist von einem gerichtlichen Mahnverfahren zu unterscheiden.",
    "Ein gerichtlicher Titel ermöglicht anschließend die Zwangsvollstreckung."
  ],
  "ablauf": [
    "Forderung fällig stellen und kaufmännisch mahnen.",
    "Bei ausbleibender Zahlung Mahnbescheid beantragen.",
    "Widerspruchsfrist abwarten; bei Ausbleiben Vollstreckungsbescheid beantragen.",
    "Nach einem vollstreckbaren Titel die Zwangsvollstreckung einleiten."
  ],
  "erklaerung": "Eine kaufmännische Mahnung ist eine betriebliche Erinnerung und kann individuell gestaltet werden. Das gerichtliche Mahnverfahren ist dagegen ein formaler Weg: Mahnbescheid, mögliche zweiwöchige Reaktion, Vollstreckungsbescheid und schließlich Zwangsvollstreckung. Das Gericht prüft beim Mahnbescheid zunächst nur die Formalien; bei Widerspruch wird die Forderung im streitigen Verfahren inhaltlich geprüft.",
  "beispiele": [
    "Gegen einen zugestellten Mahnbescheid kann der Schuldner innerhalb von zwei Wochen Widerspruch einlegen.",
    "Nach einem Vollstreckungsbescheid kann bei ausbleibender Zahlung zum Beispiel eine Konto-, Lohn- oder Sachpfändung folgen."
  ],
  "fallbeispiel": "Eine Forderung über 8.000 € bleibt trotz kaufmännischer Mahnung offen. Der Gläubiger beantragt den Mahnbescheid. Widerspricht der Schuldner, endet der vereinfachte Mahnweg und die Forderung wird im Streitverfahren geprüft. Widerspricht er nicht, kann der Vollstreckungsbescheid beantragt werden. Bleibt auch danach die Zahlung aus, ist die Zwangsvollstreckung möglich.",
  "typische_fehler": "Mahnbescheid und Vollstreckungsbescheid werden vertauscht oder angenommen, das Gericht prüfe beim ersten Schritt bereits die materielle Richtigkeit der Forderung. Auch die zweiwöchigen Reaktionsfristen werden übersehen.",
  "verstaendnisfragen": [
    "Was passiert bei Widerspruch gegen den Mahnbescheid? Das Verfahren geht in ein streitiges Verfahren über.",
    "Welche Stufe erlaubt die Zwangsvollstreckung? Der Vollstreckungsbescheid beziehungsweise der daraus folgende vollstreckbare Titel."
  ],
  "pruefungsbezug": "Die vier Stufen in Reihenfolge nennen und jeweils die mögliche Reaktion des Schuldners ergänzen: Mahnbescheid, Widerspruch, Vollstreckungsbescheid, Einspruch, Zwangsvollstreckung.",
  "merksatz": "Mahnen, Mahnbescheid, Vollstreckungsbescheid, vollstrecken — jede Stufe hat eigene Fristen und Folgen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
