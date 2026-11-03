# lf8 · Personalwirtschaftliche Aufgaben wahrnehmen

Quelle: `quellen/lf8.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 6 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Personalbedarf ermitteln

**Datei:** `lf8-k1-bedarf.kapitel.json` · SHA-256 `0ae24e69f5fcc16b92d1ff0b60ade839918c32f359252f8814189e0c4f5fa017`

**Konkreter Kapitelauftrag:** Eine Personallücke quantitativ und qualitativ bestimmen; Demografie, Inklusion und unterschiedliche Lebenslagen berücksichtigen.

**Einordnung:** Wie viele — und mit welchen Fähigkeiten.

### a1 · Zwei Fragen, nicht eine

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Quantitativen und qualitativen Personalbedarf unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Zwei Fragen, nicht eine",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der {{begriff:personalbedarf|Personalbedarf}} zerfällt in zwei Fragen, die getrennt beantwortet werden müssen: ==Wie viele Menschen== braucht der Betrieb — und ==welche Fähigkeiten== müssen diese Menschen mitbringen. Wer nur die erste beantwortet, stellt Leute ein, die die Arbeit nicht können."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Frage",
        "Grundlage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Quantitativ",
            "Wie viele Mitarbeiter?",
            "Arbeitsmenge, Zeitbedarf, Ausfallzeiten"
          ]
        },
        {
          "zellen": [
            "Qualitativ",
            "Welche Qualifikation?",
            "Stellenbeschreibung, Anforderungsprofil"
          ]
        },
        {
          "zellen": [
            "Zeitlich",
            "Wann und wie lange?",
            "Auftragslage, Saison, Projekte"
          ],
          "detail": "**Wird oft vergessen und ist der teuerste Fehler.** Wer den Bedarf richtig berechnet, ihn aber zum falschen Zeitpunkt deckt, zahlt entweder Leerlauf oder verliert Aufträge. Bei saisonalen Spitzen ist deshalb häufig Befristung oder Zeitarbeit die Antwort, nicht die Festanstellung."
        },
        {
          "zellen": [
            "Örtlich",
            "An welchem Standort?",
            "Aufbauorganisation, Filialstruktur"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Quantitativ ist eine **Zahl**, qualitativ ist ein **Profil**. Beide gehören zusammen: Drei Mitarbeiter zu suchen, ohne zu wissen, was sie können müssen, führt zu drei falschen Einstellungen.",
      "karteikarte": "Welche vier Dimensionen hat der Personalbedarf?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "vorauswissen": [
    "Personalplanung betrifft nicht nur die Zahl, sondern auch die passende Person.",
    "Arbeitsmenge, Fähigkeiten, Zeit und Ort können den Bedarf beeinflussen."
  ],
  "erklaerung": "Personalbedarf hat vier Dimensionen: quantitativ, qualitativ, zeitlich und örtlich. Quantitativ wird gefragt, wie viele Kräfte benötigt werden; qualitativ, welche Fähigkeiten nötig sind. Zeitlich und örtlich wird ergänzt, wann und wo die Arbeit anfällt. Eine Zahl ohne Anforderungsprofil kann deshalb zu einer falschen Einstellung führen.",
  "beispiele": [
    "Drei zusätzliche Kräfte können quantitativ richtig sein, aber qualitativ falsch, wenn die benötigten Fähigkeiten nicht im Profil stehen.",
    "Ein Bedarf kann nur für eine bestimmte Zeit oder an einem bestimmten Ort bestehen; Zahl, Profil, Zeitraum und Einsatzort werden getrennt geprüft."
  ],
  "fallbeispiel": "Ein Betrieb stellt fest, dass die Arbeitsmenge steigt, möchte aber nur ‚mehr Personal‘ ausschreiben. Die Bedarfsermittlung ergänzt die fehlenden Fragen: Wie viele Kräfte sind nötig? Welche Fähigkeiten müssen sie mitbringen? Zu welchem Zeitpunkt und an welchem Ort werden sie gebraucht? Erst die vier Antworten bilden eine brauchbare Grundlage für die Beschaffung.",
  "typische_fehler": "Quantitativer und qualitativer Bedarf werden gleichgesetzt. Außerdem wird ein dauerhaftes Vollzeitprofil angenommen, obwohl der Bedarf zeitlich oder örtlich begrenzt sein kann.",
  "verstaendnisfragen": [
    "Welche vier Dimensionen hat Personalbedarf? Quantitativ, qualitativ, zeitlich und örtlich.",
    "Warum reicht die Frage ‚Wie viele?‘ nicht aus? Weil ohne Qualifikationsprofil die falschen Personen eingestellt werden können."
  ],
  "pruefungsbezug": "Beginne jede Fallaufgabe mit den vier Dimensionen. So werden Zahl und Profil nicht vermischt und zeitliche oder örtliche Besonderheiten nicht übersehen.",
  "merksatz": "Personalbedarf fragt gleichzeitig: wie viele, welche Fähigkeiten, wann und wo."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Die Rechnung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Nettopersonalbedarf berechnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Die Rechnung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der quantitative Bedarf wird in zwei Schritten ermittelt. Zuerst der **Bruttopersonalbedarf**: wie viele Kräfte theoretisch nötig sind. Davon wird der vorhandene Bestand abgezogen und um erwartete Zu- und Abgänge bereinigt — das Ergebnis ist der **Nettopersonalbedarf**, also die Zahl, die tatsächlich eingestellt oder abgebaut werden muss."
    },
    {
      "typ": "grafik",
      "variante": "kalkulationsleiter",
      "kopf": "Die Bedarfsrechnung",
      "titel": "Vom Bestand zum Nettobedarf",
      "lead": "Ändere die Werte und sieh, wie sich der tatsächliche Einstellungsbedarf verschiebt.",
      "richtungen": [
        "vorwaerts"
      ],
      "start": {
        "id": "brutto",
        "name": "Bruttopersonalbedarf",
        "wert": 48
      },
      "stufen": [
        {
          "id": "bestand",
          "name": "− vorhandener Personalbestand",
          "art": "zuschlag-absolut",
          "betrag": -42,
          "ergebnis": "nach Abzug des Bestands"
        },
        {
          "id": "abgaenge",
          "name": "+ erwartete Abgänge (Rente, Kündigung)",
          "art": "zuschlag-absolut",
          "betrag": 5,
          "ergebnis": "nach Abgängen"
        },
        {
          "id": "zugaenge",
          "name": "− feststehende Zugänge (Übernahme Azubis)",
          "art": "zuschlag-absolut",
          "betrag": -3,
          "ergebnis": "Nettopersonalbedarf",
          "marke": true
        }
      ],
      "regel": "Nettopersonalbedarf = Bruttobedarf − Bestand + Abgänge − Zugänge. Ein negatives Ergebnis bedeutet Überdeckung — dann geht es um Freisetzung statt um Beschaffung.",
      "einheit": "Personen",
      "spaltenkopf": "Personen"
    },
    {
      "typ": "check",
      "frage": "Der Bruttobedarf liegt bei 40 Stellen, der Bestand bei 38. Es gehen 4 Mitarbeiter in Rente, 2 Azubis werden übernommen. Wie hoch ist der Nettobedarf?",
      "optionen": [
        {
          "text": "2 Stellen",
          "richtig": false,
          "echo": "Das ist nur die Differenz aus Brutto und Bestand. Die Abgänge und Zugänge fehlen — dabei verändern gerade sie das Ergebnis erheblich."
        },
        {
          "text": "4 Stellen",
          "richtig": true,
          "echo": "Richtig. 40 − 38 = 2, plus 4 Abgänge = 6, minus 2 Zugänge = 4. Es müssen also vier Personen eingestellt werden, obwohl die reine Differenz nur zwei ergäbe."
        },
        {
          "text": "6 Stellen",
          "richtig": false,
          "echo": "Die übernommenen Auszubildenden sind vergessen. Sie decken bereits zwei der offenen Stellen ab und müssen abgezogen werden."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Für den Bruttobedarf hilft eine einfache Rechnung: Arbeitsmenge geteilt durch die Leistung je Kraft. Wer 12.000 Vorgänge im Jahr hat und je Kraft 500 schafft, braucht 24 Kräfte — allerdings bezogen auf die **tatsächliche** Arbeitszeit nach Abzug von Urlaub, Krankheit und Fortbildung, nicht auf die vertragliche."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a2",
  "vorauswissen": [
    "Der Bruttobedarf beschreibt den theoretischen Gesamtbedarf.",
    "Bestand, Zu- und Abgänge verändern den tatsächlichen Einstellungsbedarf."
  ],
  "erklaerung": "Der Bruttobedarf wird aus der Arbeitsmenge und der Leistung je Kraft abgeleitet. Beispiel aus dem Kapitel: 12.000 Vorgänge geteilt durch 500 Vorgänge je Kraft ergeben 24 Kräfte. Danach wird der vorhandene Bestand berücksichtigt. Die Nettobedarfsformel lautet: Bruttobedarf − Bestand + Abgänge − Zugänge. Abgänge erhöhen den Bedarf, Zugänge senken ihn. Die Leistung bezieht sich auf die tatsächliche Arbeitszeit nach Urlaub, Krankheit und Fortbildung.",
  "beispiele": [
    "Bei 12.000 Vorgängen und 500 Vorgängen je Kraft lautet der Bruttobedarf 12.000 ÷ 500 = 24 Kräfte.",
    "Ein erwarteter Zugang senkt den Nettobedarf, ein erwarteter Abgang erhöht ihn; ein negatives Ergebnis bedeutet Überdeckung und damit Freisetzung."
  ],
  "fallbeispiel": "Zuerst wird mit 12.000 ÷ 500 der Bruttobedarf von 24 Kräften berechnet. Danach werden Bestand sowie erwartete Zu- und Abgänge eingesetzt: Bruttobedarf minus Bestand plus Abgänge minus Zugänge. Erst dieses Ergebnis sagt, wie viele Personen tatsächlich eingestellt oder abgebaut werden müssen. Würde ein negativer Nettobedarf entstehen, läge eine Überdeckung vor.",
  "typische_fehler": "Der Bestand wird zum Bruttobedarf addiert oder Abgänge werden abgezogen. Ebenso wird mit der vertraglichen statt der tatsächlichen Arbeitszeit gerechnet.",
  "verstaendnisfragen": [
    "Wie lautet die Nettobedarfsformel? Bruttobedarf − Bestand + Abgänge − Zugänge.",
    "Was bedeutet ein negativer Nettobedarf? Überdeckung; der Betrieb hat mehr Kräfte als benötigt und muss Freisetzung prüfen."
  ],
  "pruefungsbezug": "Schreibe die Formel vor dem Einsetzen vollständig hin und kontrolliere jedes Vorzeichen. Bei der Bruttorechnung tatsächliche Leistung statt bloßer Vertragszeit verwenden.",
  "merksatz": "Brutto ist der theoretische Bedarf; netto bleibt nach Bestand, Zu- und Abgängen übrig."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Was die Stelle verlangt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Stellenbeschreibung und Anforderungsprofil erstellen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Was die Stelle verlangt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der qualitative Bedarf entsteht aus zwei Dokumenten, die aufeinander aufbauen. Die {{begriff:stellenbeschreibung|Stellenbeschreibung}} beschreibt die **Stelle**, das {{begriff:anforderungsprofil|Anforderungsprofil}} beschreibt die **Person**, die sie ausfüllen soll."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Dokument",
        "Enthält",
        "Wird gebraucht für"
      ],
      "zeilen": [
        {
          "zellen": [
            "Stellenbeschreibung",
            "Bezeichnung, Ziel, Aufgaben, Befugnisse, Einordnung, Vertretung",
            "Organisation, Eingruppierung, Zeugnis"
          ],
          "detail": "**Sie überlebt den Stelleninhaber.** Wechselt jemand, bleibt die Stelle — deshalb ist sie unabhängig von der Person formuliert. Sie liefert später auch die Grundlage für das Arbeitszeugnis."
        },
        {
          "zellen": [
            "Anforderungsprofil",
            "Ausbildung, Erfahrung, Kenntnisse, persönliche Eignung",
            "Stellenanzeige, Bewerberauswahl"
          ],
          "detail": "**Trenne Muss und Kann.** Wer alle Wünsche zu Mussanforderungen erklärt, bekommt keine Bewerbungen. Drei bis fünf harte Kriterien reichen, der Rest ist wünschenswert."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Beide Dokumente müssen mit dem {{par:agg-1|AGG}} vereinbar sein. Anforderungen wie ein bestimmtes Alter, eine Nationalität oder ein Geschlecht sind unzulässig, solange sie nicht ausnahmsweise für die Tätigkeit wesentlich sind. Schon eine Formulierung wie „junges, dynamisches Team sucht Verstärkung“ kann als Hinweis auf eine Altersbenachteiligung gewertet werden."
    },
    {
      "typ": "zuordnen",
      "lead": "Stellenbeschreibung oder Anforderungsprofil?",
      "kategorien": [
        "Stellenbeschreibung",
        "Anforderungsprofil"
      ],
      "aufgaben": [
        {
          "text": "„Bearbeitet eingehende Rechnungen und pflegt die Kreditorenstammdaten.“",
          "loesung": "Stellenbeschreibung"
        },
        {
          "text": "„Abgeschlossene kaufmännische Ausbildung, sicherer Umgang mit Tabellenkalkulation.“",
          "loesung": "Anforderungsprofil"
        },
        {
          "text": "„Berichtet an die Leitung Rechnungswesen, vertritt die Debitorenbuchhaltung.“",
          "loesung": "Stellenbeschreibung"
        },
        {
          "text": "„Sorgfältige Arbeitsweise, Bereitschaft zur Einarbeitung in neue Software.“",
          "loesung": "Anforderungsprofil"
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
    "Eine Stelle und eine Person werden in unterschiedlichen Dokumenten beschrieben.",
    "Anforderungen müssen mit dem AGG vereinbar sein."
  ],
  "erklaerung": "Die Stellenbeschreibung beschreibt die Stelle: Aufgaben, Einordnung und Anforderungen der Funktion. Das Anforderungsprofil beschreibt die Person, die diese Stelle ausfüllen soll. Die Stellenbeschreibung überlebt den Stelleninhaber und kann später Grundlage für das Zeugnis sein. Anforderungen an Alter, Geschlecht, Herkunft oder Nationalität sind nach dem vorhandenen AGG-Bezug unzulässig, solange sie nicht ausnahmsweise für die Tätigkeit wesentlich sind.",
  "beispiele": [
    "Die Stellenbeschreibung erklärt, welche Aufgaben zu erledigen sind; das Anforderungsprofil nennt die dafür benötigten Fähigkeiten.",
    "‚Junges, dynamisches Team‘ kann auf eine Altersbenachteiligung hindeuten und muss bei einer Anzeige kritisch geprüft werden."
  ],
  "fallbeispiel": "Eine Anzeige sucht eine ‚junge deutsche Mitarbeiterin‘. Zuerst werden die Formulierungen von den tatsächlichen Aufgaben getrennt. Alter, Nationalität und Geschlecht knüpfen an geschützte Merkmale an und sind ohne wesentlichen Tätigkeitsgrund nicht zulässig. Die Anzeige wird stattdessen aus der Stellenbeschreibung und einem sachlichen Anforderungsprofil formuliert.",
  "typische_fehler": "Stellenbeschreibung und Anforderungsprofil werden als dasselbe Dokument behandelt. Außerdem wird eine scheinbar freundliche Altersformulierung nicht als möglicher AGG-Verstoß erkannt.",
  "verstaendnisfragen": [
    "Was beschreibt die Stellenbeschreibung? Die Stelle und ihre Aufgaben, nicht die konkrete Person.",
    "Woran prüfst du eine Anforderung nach AGG? Ob sie an Alter, Geschlecht, Herkunft oder ein ähnliches geschütztes Merkmal anknüpft und für die Tätigkeit wesentlich ist."
  ],
  "pruefungsbezug": "Trenne in Anzeigenfällen Aufgabe, Anforderung und unzulässiges persönliches Merkmal. Nutze die Stellenbeschreibung als dauerhafte Funktionsgrundlage.",
  "merksatz": "Die Stelle beschreibt die Arbeit, das Profil die passende Person — und das AGG begrenzt die Auswahlmerkmale."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Personal beschaffen

**Datei:** `lf8-k2-beschaffung.kapitel.json` · SHA-256 `83156c1bea00100b2bf58b4752c342ef492d2f138c803e222fb30939962ce666`

**Konkreter Kapitelauftrag:** Interne und externe Beschaffung für dieselbe Stelle vergleichen; Kriterien aus dem tatsächlichen Bedarf statt Stereotypen ableiten.

**Einordnung:** Von innen oder von außen — und wie eine Anzeige aussehen muss, die niemanden ausschließt.

### b1 · Innen oder außen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Interne und externe Beschaffung gegeneinander abwägen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Innen oder außen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Steht der Bedarf fest, gibt es zwei Richtungen: Die Stelle wird aus der eigenen Belegschaft besetzt oder über den Arbeitsmarkt. ==Beides hat einen Preis== — der eine kostet eine Nachfolgelücke, der andere Einarbeitungszeit und Risiko."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Wege",
      "titel": "Interne oder externe Beschaffung",
      "lead": "Dieselbe offene Stelle, zwei Wege. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Intern",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Versetzung, Aufstieg, Mehrarbeit, Übernahme von Azubis",
              "detail": "Auch die Übernahme nach der Ausbildung zählt hierher — für deinen Betrieb der günstigste Weg überhaupt, weil die Einarbeitung längst gelaufen ist."
            },
            {
              "text": "Der Betrieb kennt die Person",
              "detail": "Leistung, Verhalten und Einarbeitungsbedarf sind bekannt. Das senkt das Fehlbesetzungsrisiko erheblich."
            },
            {
              "text": "Motiviert die Belegschaft",
              "detail": "Wer sieht, dass Aufstieg möglich ist, bleibt eher. Interne Ausschreibung ist deshalb auch ein Bindungsinstrument."
            },
            {
              "text": "Schnell und günstig",
              "detail": "Keine Anzeigenkosten, kürzere Verfahren, keine Probezeit-Unsicherheit."
            },
            {
              "text": "Aber: die Lücke wandert nur",
              "detail": "Die frei gewordene Stelle muss ebenfalls besetzt werden. Und es kommen keine neuen Ideen von außen — Betriebsblindheit ist die typische Folge."
            }
          ]
        },
        {
          "name": "Extern",
          "ton": "gold",
          "punkte": [
            {
              "text": "Stellenanzeige, Arbeitsagentur, Portale, Personalberatung",
              "detail": "Dazu kommen Initiativbewerbungen, Praktika, Messen und Empfehlungen aus der Belegschaft."
            },
            {
              "text": "Größere Auswahl",
              "detail": "Der Arbeitsmarkt ist deutlich größer als die eigene Belegschaft — bei speziellen Qualifikationen oft der einzige Weg."
            },
            {
              "text": "Neue Sichtweisen",
              "detail": "Wer von außen kommt, stellt Fragen, die intern niemand mehr stellt. Genau das kann ein Betrieb brauchen — und genau das stört manchmal auch."
            },
            {
              "text": "Keine Folgelücke",
              "detail": "Die Stelle wird tatsächlich geschlossen, statt verschoben zu werden."
            },
            {
              "text": "Aber: teuer, langsam, riskant",
              "detail": "Anzeigenkosten, Auswahlverfahren, Einarbeitung — und die Unsicherheit, ob die Person zum Betrieb passt, zeigt sich erst nach Monaten."
            }
          ]
        }
      ],
      "regel": "Faustregel: Erst intern prüfen, dann extern ausschreiben. Viele Betriebe sind dazu ohnehin durch Betriebsvereinbarung verpflichtet."
    },
    {
      "typ": "merke",
      "text": "Interne Beschaffung schließt die Stelle nicht, sie **verschiebt** sie. Rechne bei der Planung immer die Folgestelle mit — sonst hast du am Ende zwei Vakanzen statt einer.",
      "karteikarte": "Nenne je zwei Vor- und Nachteile der internen Personalbeschaffung."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Personalbedarf kann durch bestehende oder neue Mitarbeitende gedeckt werden.",
    "Jeder Beschaffungsweg hat eigene Vorteile und Grenzen."
  ],
  "erklaerung": "Interne Beschaffung nutzt Versetzung, Aufstieg, Mehrarbeit oder die Übernahme von Auszubildenden. Sie ist schnell, günstig und motivierend, weil die Person bekannt ist. Die Lücke wandert aber häufig nur weiter und neue Impulse fehlen. Externe Beschaffung nutzt Anzeigen, Arbeitsagentur, Portale, eigene Kanäle, Personalberatung oder Zeitarbeit und erweitert den Bewerberkreis.",
  "beispiele": [
    "Die Übernahme eines Azubis deckt eine Stelle intern und nutzt bereits bekannte Fähigkeiten.",
    "Eine Anzeige in einem Portal erweitert den Kreis, bringt aber zusätzlichen Auswahlaufwand und weniger Vorwissen über die Person."
  ],
  "fallbeispiel": "Eine Stelle wird frei. Der Betrieb prüft zuerst, ob Versetzung, Aufstieg oder Übernahme möglich sind. Ist intern niemand passend verfügbar, wird extern gesucht. Bei der Entscheidung werden Geschwindigkeit, Kosten, Motivation, neue Impulse und die Frage berücksichtigt, ob die ursprüngliche Lücke nur verschoben wird.",
  "typische_fehler": "Interne Beschaffung wird nur als Vorteil und externe nur als Nachteil dargestellt. Außerdem wird vergessen, dass die interne Lösung eine neue Lücke schaffen kann.",
  "verstaendnisfragen": [
    "Welche vier internen Wege nennt der Inhalt? Versetzung, Aufstieg, Mehrarbeit und Übernahme von Auszubildenden.",
    "Was ist der zentrale interne Nachteil? Die Lücke wandert möglicherweise nur, und neue Impulse fehlen."
  ],
  "pruefungsbezug": "Nenne bei einer Vor- und Nachteilsaufgabe mindestens Geschwindigkeit, Kosten, Motivation, Lückenwirkung und neue Impulse.",
  "merksatz": "Intern ist bekannt und schnell; extern erweitert die Auswahl, kostet aber mehr Auswahlaufwand."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Welcher Weg wofür

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Beschaffungswege auswählen und begründen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**M01:** Kein kompakter Absatz vorhanden. Erweiterte Erklärung darf dennoch angeboten werden; siehe Technikauftrag. Keine Dummyabsätze einfügen.

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Welcher Weg wofür",
  "inhalt": [
    {
      "typ": "tabelle",
      "spalten": [
        "Weg",
        "Passt bei",
        "Kosten"
      ],
      "zeilen": [
        {
          "zellen": [
            "Interne Ausschreibung",
            "Aufstiegsstellen, bekannte Aufgaben",
            "gering"
          ]
        },
        {
          "zellen": [
            "Agentur für Arbeit",
            "breite Suche, geförderte Gruppen",
            "kostenlos"
          ]
        },
        {
          "zellen": [
            "Onlineportale",
            "kaufmännische Standardstellen",
            "mittel"
          ]
        },
        {
          "zellen": [
            "Eigene Website und Social Media",
            "Nachwuchs, Ausbildungsplätze",
            "gering"
          ],
          "detail": "**Für Ausbildungsplätze inzwischen der wichtigste Kanal.** Wer Sechzehnjährige erreichen will, findet sie nicht in der Zeitung — dieselbe Logik wie bei deinem eigenen Vertriebskanal."
        },
        {
          "zellen": [
            "Personalberatung",
            "Führungspositionen, seltene Qualifikationen",
            "hoch"
          ]
        },
        {
          "zellen": [
            "Zeitarbeit",
            "kurzfristige Spitzen, Vertretungen",
            "mittel bis hoch"
          ],
          "detail": "**Kein Beschaffungsweg im engeren Sinn:** Der Zeitarbeitnehmer bleibt Arbeitnehmer des Verleihers. Der Einsatzbetrieb hat das Weisungsrecht, aber keinen Arbeitsvertrag mit ihm."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb braucht für drei Monate Vertretung während einer Elternzeit. Welcher Weg passt am besten?",
      "optionen": [
        {
          "text": "Externe Ausschreibung einer unbefristeten Stelle",
          "richtig": false,
          "echo": "Das würde eine dauerhafte Stelle für einen vorübergehenden Bedarf schaffen. Nach drei Monaten hätte der Betrieb eine Überdeckung — und die Rückkehrerin keinen Platz."
        },
        {
          "text": "Befristete Einstellung oder Zeitarbeit",
          "richtig": true,
          "echo": "Richtig. Der Bedarf ist zeitlich begrenzt, also muss auch die Lösung befristet sein. Eine Vertretung während der Elternzeit ist zudem ein anerkannter Sachgrund für eine Befristung — die Alternative Zeitarbeit ist schneller, aber teurer."
        },
        {
          "text": "Interne Versetzung ohne Ersatz",
          "richtig": false,
          "echo": "Dann fehlt die versetzte Kraft an ihrer bisherigen Stelle. Die Lücke wäre nur verschoben — bei einem befristeten Bedarf besonders unpraktisch."
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
    "Externe Personalbeschaffung kann über mehrere Kanäle erfolgen.",
    "Vermittlung und Einsatzbetrieb sind nicht immer derselbe Arbeitgeber."
  ],
  "erklaerung": "Externe Wege sind Anzeigen, Arbeitsagentur, Portale, eigene Kanäle, Personalberatung und Zeitarbeit. Bei Zeitarbeit bleibt die eingesetzte Person Arbeitnehmer des Verleihers und hat keinen Arbeitsvertrag mit dem Einsatzbetrieb. Der Weg wird nach Bedarf, Zeit, benötigtem Profil und gewünschter Dauer ausgewählt.",
  "beispiele": [
    "Eine Anzeige und ein Onlineportal richten sich an einen offenen Bewerbermarkt; Personalberatung kann die Suche stärker begleiten.",
    "Bei Zeitarbeit wird die Person im Betrieb eingesetzt, bleibt aber beim Verleiher angestellt."
  ],
  "fallbeispiel": "Ein Betrieb benötigt kurzfristig Unterstützung, möchte aber keinen eigenen Arbeitsvertrag für diese Einsatzphase schließen. Zeitarbeit kann den kurzfristigen Einsatz ermöglichen. Für die rechtliche Zuordnung wird geprüft, wer der Arbeitgeber ist: der Verleiher, nicht der Einsatzbetrieb. Für eine dauerhafte Stelle wäre ein anderer Beschaffungsweg zu bewerten.",
  "typische_fehler": "Zeitarbeitnehmer werden als Beschäftigte des Einsatzbetriebs bezeichnet. Außerdem wird nur der Kanal genannt, ohne Dauer, Kosten und gewünschtes Profil einzubeziehen.",
  "verstaendnisfragen": [
    "Welche externen Wege werden genannt? Anzeige, Arbeitsagentur, Portale, eigene Kanäle, Personalberatung und Zeitarbeit.",
    "Wer ist Arbeitgeber eines Zeitarbeitnehmers? Der Verleiher."
  ],
  "pruefungsbezug": "Trenne bei Fällen den Beschaffungskanal von der Arbeitgeberrolle. Begründe den Weg mit Dauer, Dringlichkeit und passendem Profil.",
  "merksatz": "Der Einsatzort sagt bei Zeitarbeit nicht, wer der Arbeitgeber ist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Die Stellenanzeige

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine rechtssichere Stellenanzeige aufbauen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Die Stellenanzeige",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine Stellenanzeige ist Werbung — dieselben Regeln wie in Lernfeld 5. Sie muss auffallen, den Nutzen zeigen und einen klaren nächsten Schritt anbieten. Zusätzlich muss sie rechtssicher sein."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Teil",
        "Inhalt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Betrieb",
            "Wer sucht — kurz, konkret, ohne Superlative"
          ]
        },
        {
          "zellen": [
            "Stelle",
            "Bezeichnung, Beginn, Umfang, Befristung, Standort"
          ]
        },
        {
          "zellen": [
            "Aufgaben",
            "aus der Stellenbeschreibung, drei bis fünf Punkte"
          ]
        },
        {
          "zellen": [
            "Anforderungen",
            "aus dem Anforderungsprofil, Muss und Kann getrennt"
          ]
        },
        {
          "zellen": [
            "Angebot",
            "was der Betrieb bietet — Entgelt, Entwicklung, Arbeitszeit"
          ],
          "detail": "**Der am häufigsten fehlende Teil.** Viele Anzeigen listen nur, was verlangt wird. Auf einem Arbeitsmarkt, auf dem Bewerber die Auswahl haben, ist das ein Käufermarkt aus Sicht des Betriebs — und dann muss geworben werden."
        },
        {
          "zellen": [
            "Kontakt",
            "Ansprechpartner mit Namen, Weg, Frist"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Nach {{par:agg-7|§ 7 AGG}} darf die Anzeige nicht an Alter, Geschlecht, Herkunft, Religion, Behinderung oder sexuelle Identität anknüpfen. Deshalb der Zusatz **(m/w/d)** und deshalb keine Altersangaben. Wer dagegen verstößt, riskiert Entschädigungsansprüche abgelehnter Bewerber — auch dann, wenn die Person die Stelle ohnehin nicht bekommen hätte."
    },
    {
      "typ": "praxistipp",
      "text": "Prüfe jede Anzeige mit einer einzigen Frage: Würde sich jemand ausgeschlossen fühlen, der die Arbeit könnte? „Belastbarer junger Mann für unser dynamisches Team“ schließt drei Gruppen auf einmal aus — und keine davon wegen fehlender Eignung."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b3",
  "vorauswissen": [
    "Eine Stellenanzeige verbindet Stelle, Aufgaben und Anforderungsprofil.",
    "Das AGG begrenzt die zulässige Auswahlformulierung."
  ],
  "erklaerung": "Eine Stellenanzeige enthält Betrieb, Stelle, Aufgaben, Anforderungen, Angebot und Kontakt. Sie muss sachlich formuliert sein und darf nicht an geschützte Merkmale anknüpfen. Die Schreibweise (m/w/d) und der Verzicht auf Altersgrenzen helfen, die Anzeige offen zu formulieren; Herkunft, Geschlecht und Alter dürfen nicht ohne zulässigen Tätigkeitsgrund verlangt werden.",
  "beispiele": [
    "Eine gute Anzeige beschreibt Aufgabe, Anforderungen, Angebot und Kontakt statt eine gewünschte Altersgruppe zu nennen.",
    "Die Formulierung (m/w/d) vermeidet eine Ausschreibung nur für ein Geschlecht; eine Altersgrenze wird nicht aufgenommen."
  ],
  "fallbeispiel": "Eine Anzeige enthält Betrieb und Kontakt, aber weder Aufgaben noch Anforderungen; außerdem wird eine Altersgrenze genannt. Die Überarbeitung ergänzt die fehlenden Sachinformationen und streicht die altersbezogene Formulierung. Danach wird die Anzeige auf einen sachlichen, offenen Bewerberkreis geprüft.",
  "typische_fehler": "Nur die Rechtsformulierung wird geprüft, während Aufgaben, Angebot oder Kontakt fehlen. Umgekehrt wird eine Anzeige als korrekt angesehen, sobald (m/w/d) darin steht.",
  "verstaendnisfragen": [
    "Welche sechs Bestandteile gehören in eine Stellenanzeige? Betrieb, Stelle, Aufgaben, Anforderungen, Angebot und Kontakt.",
    "Welche Merkmale dürfen nicht ohne zulässigen Grund angeknüpft werden? Geschlecht, Alter, Herkunft und weitere geschützte Merkmale."
  ],
  "pruefungsbezug": "Prüfe Anzeigen in zwei Durchgängen: erst Vollständigkeit, dann AGG-Konformität. So werden formale und diskriminierende Fehler getrennt erkannt.",
  "merksatz": "Eine Stellenanzeige muss vollständig, sachlich und offen für den passenden Bewerberkreis sein."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Auswählen und einstellen

**Datei:** `lf8-k3-auswahl.kapitel.json` · SHA-256 `49536817d818e924dbbb5e57098719d03caea8fa1ed19016e972cb7202cec7ea`

**Konkreter Kapitelauftrag:** Eine Auswahlentscheidung anhand vorab bestimmter Kriterien begründen; Vertragsart, Datenschutz und Einstellungsunterlagen anschließen.

**Einordnung:** Vom Bewerbungseingang bis zum unterschriebenen Vertrag.

### c1 · Der Ablauf

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ein Auswahlverfahren strukturiert durchführen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Der Ablauf",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein Auswahlverfahren ist ein Trichter: Aus vielen Bewerbungen wird eine Entscheidung. Der Maßstab bleibt auf jeder Stufe derselbe — das Anforderungsprofil aus Kapitel 1."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Sechs Stufen",
      "titel": "Vom Eingang bis zur Zusage",
      "lead": "Klick dich durch — jede Stufe hat eine eigene Aufgabe.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Eingangsbestätigung",
          "satz": "innerhalb weniger Tage",
          "text": "Keine Formalie, sondern Teil des Auftritts nach außen. Wer wochenlang nichts hört, erzählt das weiter — und bewirbt sich nicht noch einmal."
        },
        {
          "nr": 2,
          "titel": "Vorauswahl anhand der Unterlagen",
          "satz": "Muss-Kriterien prüfen",
          "text": "Anschreiben, Lebenslauf, Zeugnisse gegen das Anforderungsprofil halten. Ergebnis sind drei Stapel: einladen, Warteschleife, absagen."
        },
        {
          "nr": 3,
          "titel": "Vorstellungsgespräch",
          "satz": "strukturiert, nicht spontan",
          "text": "Feste Fragen für alle Bewerber machen die Ergebnisse vergleichbar — und schützen davor, dass der Eindruck der ersten Minute entscheidet."
        },
        {
          "nr": 4,
          "titel": "Weitere Verfahren",
          "satz": "Arbeitsprobe · Test · Assessment",
          "text": "Je nach Stelle. Eine Arbeitsprobe sagt in der Regel mehr über die künftige Leistung aus als jedes Gespräch."
        },
        {
          "nr": 5,
          "titel": "Entscheidung und Beteiligung",
          "satz": "Betriebsrat anhören",
          "text": "Vor der Einstellung ist in größeren Betrieben die Zustimmung des Betriebsrats einzuholen — dazu gleich mehr."
        },
        {
          "nr": 6,
          "titel": "Zusage und Absage",
          "satz": "beides zeitnah",
          "text": "Erst zusagen, wenn die Zusage angenommen wurde, dann den anderen absagen. Absagen ohne Begründung — Begründungen können als Anknüpfungspunkt für AGG-Ansprüche dienen."
        }
      ],
      "regel": "Der Maßstab ist auf jeder Stufe das Anforderungsprofil. Wer ohne festen Maßstab auswählt, wählt nach Sympathie — und begründet es hinterher fachlich."
    },
    {
      "typ": "merke",
      "text": "Strukturierte Gespräche mit denselben Fragen für alle sind nicht bürokratisch, sondern die einzige Möglichkeit, Bewerber tatsächlich zu vergleichen — und der beste Schutz gegen Diskriminierungsvorwürfe.",
      "karteikarte": "Warum werden Vorstellungsgespräche strukturiert geführt?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Auswahlentscheidungen brauchen einen vorher festgelegten Maßstab.",
    "Das Anforderungsprofil beschreibt die passende Person für die Stelle."
  ],
  "erklaerung": "Der Auswahlablauf führt von Eingangsbestätigung und Vorauswahl über Gespräch und weitere Verfahren zur Entscheidung sowie Zu- oder Absage. Auf jeder Stufe gilt das Anforderungsprofil als Maßstab. Strukturierte Gespräche machen Bewerber vergleichbar und verringern das Risiko, dass persönliche Eindrücke die fachliche Auswahl ersetzen.",
  "beispiele": [
    "In der Vorauswahl werden Unterlagen am Anforderungsprofil geprüft, nicht an Sympathie oder einem zufälligen Detail.",
    "Allen Bewerbern werden im strukturierten Gespräch vergleichbare Fragen gestellt; zusätzliche Verfahren werden nur nach dem gleichen Anforderungsbezug bewertet."
  ],
  "fallbeispiel": "Für eine Stelle gehen mehrere Bewerbungen ein. Zuerst wird der Eingang bestätigt, dann werden die Unterlagen anhand des Anforderungsprofils vorausgewählt. Im strukturierten Gespräch werden vergleichbare Fragen gestellt; danach folgt die Entscheidung und eine Zu- oder Absage. Jeder Schritt wird mit demselben Profil begründet.",
  "typische_fehler": "Die Auswahl beginnt mit dem Gespräch, ohne Kriterien festzulegen. Außerdem werden Bewerber nach persönlicher Sympathie verglichen oder ein zusätzliches Verfahren ohne Bezug zur Stelle eingesetzt.",
  "verstaendnisfragen": [
    "Was ist der Maßstab auf jeder Auswahlstufe? Das Anforderungsprofil.",
    "Warum sind strukturierte Gespräche hilfreich? Sie machen Bewerber vergleichbar und schützen besser vor Diskriminierungsvorwürfen."
  ],
  "pruefungsbezug": "Nenne die Schritte in Reihenfolge und verknüpfe jede Entscheidung mit dem Anforderungsprofil. So wird aus einer Ablaufbeschreibung eine begründete Auswahl.",
  "merksatz": "Ein gutes Auswahlverfahren ist nachvollziehbar, vergleichbar und am Anforderungsprofil ausgerichtet."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Was gefragt werden darf

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Zulässige von unzulässigen Fragen im Vorstellungsgespräch unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Was gefragt werden darf",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Im Vorstellungsgespräch gilt ein einfacher Grundsatz: Zulässig ist, was für die **konkrete Stelle** von Bedeutung ist. Alles andere ist unzulässig — und auf unzulässige Fragen darf der Bewerber ==bewusst falsch antworten==, ohne dass ihm daraus ein Nachteil entsteht."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Die Fragegrenze",
      "titel": "Zulässig und unzulässig",
      "lead": "Links, was gefragt werden darf. Rechts, was nicht — und was der Bewerber darf.",
      "seiten": [
        {
          "name": "Zulässig",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Ausbildung, beruflicher Werdegang, Zeugnisse",
              "detail": "Der Kern jeder Eignungsprüfung — hier darf umfassend nachgefragt werden."
            },
            {
              "text": "Fachkenntnisse und Fähigkeiten für die Stelle",
              "detail": "Sprachen, Software, Führerschein, wenn die Tätigkeit es verlangt."
            },
            {
              "text": "Bisheriges Gehalt, wenn es für die Eingruppierung zählt",
              "detail": "Zulässig, aber nur mit Bezug zur ausgeschriebenen Stelle."
            },
            {
              "text": "Wettbewerbsverbote aus dem alten Arbeitsverhältnis",
              "detail": "Weil sie die Beschäftigung tatsächlich hindern könnten."
            },
            {
              "text": "Krankheiten, die die Tätigkeit unmöglich machen",
              "detail": "Eng zu verstehen: Es geht um die konkrete Eignung für diese Stelle, nicht um den Gesundheitszustand allgemein."
            }
          ]
        },
        {
          "name": "Unzulässig",
          "ton": "rot",
          "punkte": [
            {
              "text": "Schwangerschaft",
              "detail": "Auch dann unzulässig, wenn die Stelle befristet oder körperlich fordernd ist. Auf diese Frage darf die Bewerberin falsch antworten."
            },
            {
              "text": "Familienplanung, Familienstand, Kinderwunsch",
              "detail": "Ohne Bezug zur Eignung und mittelbar geschlechtsbezogen."
            },
            {
              "text": "Religion, Weltanschauung, Parteizugehörigkeit",
              "detail": "Ausnahme nur bei kirchlichen Trägern und Tendenzbetrieben, und auch dort eng begrenzt."
            },
            {
              "text": "Gewerkschaftszugehörigkeit",
              "detail": "Sie geht den Arbeitgeber nichts an und ist über die Koalitionsfreiheit geschützt."
            },
            {
              "text": "Vorstrafen ohne Bezug zur Tätigkeit",
              "detail": "Bei einer Buchhaltungsstelle darf nach Vermögensdelikten gefragt werden, bei einer Lagerstelle nicht."
            },
            {
              "text": "Vermögensverhältnisse und Schulden",
              "detail": "Ausnahme nur bei Stellen mit besonderer Vermögensverantwortung."
            }
          ]
        }
      ],
      "regel": "Das Recht zur Lüge bei unzulässigen Fragen ist kein Betrug, sondern Notwehr — sonst wäre das Frageverbot wertlos, weil jedes Schweigen als Bestätigung gelesen würde."
    },
    {
      "typ": "check",
      "frage": "Eine Bewerberin wird gefragt, ob sie schwanger ist, und verneint. Sie ist schwanger. Kann der Arbeitgeber den Vertrag später anfechten?",
      "optionen": [
        {
          "text": "Ja, wegen arglistiger Täuschung",
          "richtig": false,
          "echo": "Eine Täuschung liegt rechtlich nicht vor, weil die Frage unzulässig war. Wer unzulässig fragt, kann sich auf die Antwort nicht berufen."
        },
        {
          "text": "Nein, die Frage war unzulässig",
          "richtig": true,
          "echo": "Richtig. Die Frage nach einer Schwangerschaft ist unzulässig, weil sie mittelbar an das Geschlecht anknüpft. Die Bewerberin durfte sie wahrheitswidrig beantworten; eine Anfechtung wegen arglistiger Täuschung scheidet aus."
        },
        {
          "text": "Nur wenn die Stelle befristet war",
          "richtig": false,
          "echo": "Auch bei Befristung bleibt die Frage unzulässig. Die Rechtsprechung macht hier keine Ausnahme — sonst wäre der Schutz gerade dort ausgehebelt, wo er am nötigsten ist."
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
    "Fragen im Bewerbungsgespräch müssen einen Bezug zur konkreten Stelle haben.",
    "Persönliche Merkmale sind nicht automatisch beruflich relevant."
  ],
  "erklaerung": "Zulässig sind Fragen, die für die konkrete Tätigkeit relevant sind. Fragen nach Schwangerschaft, Familienplanung, Religion, Gewerkschaft oder Vorstrafen ohne Stellenbezug sind unzulässig. Auf eine unzulässige Frage darf wahrheitswidrig geantwortet werden. Entscheidend ist nicht, ob der Arbeitgeber neugierig ist, sondern ob die Information für die Stelle erforderlich ist.",
  "beispiele": [
    "Eine Frage nach einer für die Tätigkeit notwendigen Fähigkeit hat Stellenbezug und kann zulässig sein.",
    "Die Frage nach Familienplanung gehört nicht zur Eignung für die Stelle; eine Frage nach Vorstrafen ist nur bei konkretem Stellenbezug einzuordnen."
  ],
  "fallbeispiel": "Im Gespräch wird eine Bewerberin nach Schwangerschaft und Familienplanung gefragt. Die Fragen haben keinen Bezug zu den konkreten Aufgaben und sind daher unzulässig. Die Bewerberin darf wahrheitswidrig antworten. Die Auswahl wird anschließend anhand des Anforderungsprofils und zulässiger Fragen fortgesetzt.",
  "typische_fehler": "Jede Frage im Gespräch wird als erlaubt angesehen oder jede Frage nach einer Vorstrafe pauschal verboten, ohne den Stellenbezug zu prüfen. Auch wird die zulässige Antwort auf eine unzulässige Frage fälschlich als Täuschung behandelt.",
  "verstaendnisfragen": [
    "Was ist der Prüfstein für eine Frage? Hat sie einen konkreten Bezug zur Stelle?",
    "Wie darf auf eine unzulässige Frage geantwortet werden? Wahrheitswidrig, ohne dass daraus automatisch ein unzulässiger Auswahlgrund wird."
  ],
  "pruefungsbezug": "Ordne Gesprächsfragen nicht nach persönlicher Höflichkeit, sondern nach konkretem Stellenbezug und geschütztem Merkmal.",
  "merksatz": "Im Bewerbungsgespräch zählt die Stelle, nicht die private Neugier des Arbeitgebers."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · Vertrag und Mitbestimmung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Arbeitsvertrag und die Beteiligung des Betriebsrats einordnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "Vertrag und Mitbestimmung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ist die Entscheidung gefallen, folgt der {{begriff:arbeitsvertrag|Arbeitsvertrag}}. Nach {{par:bgb-611a|§ 611a BGB}} verpflichtet er zu weisungsgebundener Arbeit in persönlicher Abhängigkeit — genau das unterscheidet ihn vom Auftrag an einen Selbstständigen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Punkt",
        "Regelung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Form",
            "formfrei möglich, die wesentlichen Bedingungen sind aber schriftlich niederzulegen"
          ]
        },
        {
          "zellen": [
            "Inhalt",
            "Beginn, Tätigkeit, Ort, Arbeitszeit, Entgelt, Urlaub, Kündigungsfristen, Probezeit"
          ]
        },
        {
          "zellen": [
            "Probezeit",
            "bis zu sechs Monate, Kündigungsfrist dann zwei Wochen"
          ],
          "detail": "**Nicht verwechseln mit der Probezeit in der Ausbildung** — dort sind es nach dem BBiG höchstens vier Monate. Im Arbeitsverhältnis sind es sechs."
        },
        {
          "zellen": [
            "Befristung",
            "nur mit Sachgrund oder als sachgrundlose Befristung im gesetzlichen Rahmen"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Bevor eingestellt wird, ist in Betrieben ab einer bestimmten Größe der Betriebsrat zu beteiligen. Nach {{par:betrvg-99|§ 99 BetrVG}} braucht die Einstellung seine **Zustimmung** — anders als bei der Kündigung, wo eine Anhörung genügt."
    },
    {
      "typ": "merke",
      "text": "Bei der **Einstellung** braucht es die Zustimmung des Betriebsrats, bei der **Kündigung** nur seine Anhörung. Beides ist Pflicht — fehlt es, ist die Maßnahme angreifbar.",
      "karteikarte": "Wie unterscheidet sich die Beteiligung des Betriebsrats bei Einstellung und Kündigung?"
    },
    {
      "typ": "zuordnen",
      "lead": "Zulässige oder unzulässige Frage im Vorstellungsgespräch?",
      "kategorien": [
        "Zulässig",
        "Unzulässig"
      ],
      "aufgaben": [
        {
          "text": "„Beherrschen Sie die Tabellenkalkulation sicher?“",
          "loesung": "Zulässig"
        },
        {
          "text": "„Planen Sie in nächster Zeit eine Familie?“",
          "loesung": "Unzulässig"
        },
        {
          "text": "„Sind Sie wegen eines Vermögensdelikts vorbestraft?“ — für eine Kassenstelle",
          "loesung": "Zulässig"
        },
        {
          "text": "„In welcher Gewerkschaft sind Sie?“",
          "loesung": "Unzulässig"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c3",
  "vorauswissen": [
    "Ein Arbeitsvertrag beschreibt weisungsgebundene Arbeit in persönlicher Abhängigkeit.",
    "Bei Einstellungen kann der Betriebsrat beteiligt sein."
  ],
  "erklaerung": "Nach § 611a BGB ist die persönliche Abhängigkeit mit Weisungsgebundenheit ein Merkmal des Arbeitsverhältnisses. Bei einer Einstellung braucht der Arbeitgeber nach § 99 BetrVG die Zustimmung des Betriebsrats, soweit die betriebliche Mitbestimmung anwendbar ist. Vertrag und Beteiligung des Betriebsrats sind daher zwei getrennte Prüfschritte.",
  "beispiele": [
    "Wer nach Inhalt, Zeit und Ort der Arbeit Weisungen erhält, wird auf die Merkmale persönlicher Abhängigkeit geprüft.",
    "Vor der Einstellung wird neben dem Vertrag auch die Zustimmung des Betriebsrats eingeholt; die Anhörung bei einer Kündigung ist davon zu unterscheiden."
  ],
  "fallbeispiel": "Ein Betrieb hat eine Bewerberin ausgewählt und möchte sofort den Vertrag unterschreiben. Vorher wird geprüft, ob die Tätigkeit als weisungsgebundene Arbeit einzuordnen ist und ob die Zustimmung des Betriebsrats nach § 99 BetrVG erforderlich ist. Erst danach wird der Einstellungsprozess vollständig abgeschlossen.",
  "typische_fehler": "Die Zustimmung bei Einstellung wird mit der Anhörung bei Kündigung verwechselt. Außerdem wird jede freie Mitarbeit automatisch als Arbeitsverhältnis oder jede Tätigkeit ohne Kontrolle als frei eingeordnet.",
  "verstaendnisfragen": [
    "Welche zwei Merkmale nennt § 611a BGB im vorhandenen Inhalt? Weisungsgebundene Arbeit und persönliche Abhängigkeit.",
    "Was braucht die Einstellung nach § 99 BetrVG? Die Zustimmung des Betriebsrats."
  ],
  "pruefungsbezug": "Trenne in Fällen Arbeitsvertragsmerkmale, Auswahlentscheidung und Mitbestimmung. Merke: Zustimmung bei Einstellung, Anhörung bei Kündigung.",
  "merksatz": "Auswahl, Vertrag und Mitbestimmung sind drei Schritte — keiner ersetzt den anderen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Entgelt und Abrechnung

**Datei:** `lf8-k4-entgelt.kapitel.json` · SHA-256 `fad30ffbc91993dbb33b7a4676a1d780bf900d7753e892162f378d6d69a52ade`

**Konkreter Kapitelauftrag:** Eine Gehaltsabrechnung schrittweise lesen; Steuer, Sozialversicherung, Arbeitgeberaufwand und geldwerte Vorteile unterscheiden.

**Einordnung:** Wonach bezahlt wird — und was am Ende auf der Abrechnung steht.

### d1 · Wonach bezahlt wird

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Entgeltformen unterscheiden und ihren Einsatz begründen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Wonach bezahlt wird",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Grundfrage jeder Entgeltform lautet: Wird die **Zeit** bezahlt oder die **Leistung**? Beide Wege haben ihren Ort — und wer sie vertauscht, bekommt entweder schlechte Qualität oder gar keine Bewerber."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Grundformen",
      "titel": "Zeitlohn oder Akkordlohn",
      "lead": "Dieselbe Arbeit, zwei völlig verschiedene Anreize.",
      "seiten": [
        {
          "name": "Zeitlohn",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Bezahlt wird die Anwesenheitszeit",
              "detail": "Stunden- oder Monatslohn. Die häufigste Form im Büro und überall dort, wo Leistung sich nicht sinnvoll zählen lässt."
            },
            {
              "text": "Fördert Sorgfalt statt Tempo",
              "detail": "Wer für Zeit bezahlt wird, hat keinen Anreiz zu hetzen — genau richtig bei Beratung, Buchhaltung oder Pflege."
            },
            {
              "text": "Planbar für beide Seiten",
              "detail": "Der Mitarbeiter kennt sein Einkommen, der Betrieb seine Personalkosten."
            },
            {
              "text": "Aber: kein Leistungsanreiz",
              "detail": "Wer schneller arbeitet, verdient nicht mehr. Deshalb wird Zeitlohn häufig mit Prämien oder Zielvereinbarungen kombiniert."
            }
          ]
        },
        {
          "name": "Akkordlohn",
          "ton": "gold",
          "punkte": [
            {
              "text": "Bezahlt wird die Leistungsmenge",
              "detail": "Stückakkord nach Menge oder Zeitakkord nach vorgegebenen Zeiten je Stück."
            },
            {
              "text": "Nur bei akkordfähiger Arbeit zulässig",
              "detail": "Die Leistung muss messbar, vom Mitarbeiter beeinflussbar und regelmäßig wiederholbar sein. Trifft im Büro fast nie zu."
            },
            {
              "text": "Mindestlohn bleibt garantiert",
              "detail": "Auch im Akkord darf das Entgelt den gesetzlichen und tariflichen Mindestlohn nicht unterschreiten — der Akkordrichtsatz sichert das ab."
            },
            {
              "text": "Aber: Tempo geht vor Qualität",
              "detail": "Der Anreiz wirkt auf die Menge, nicht auf die Sorgfalt. Deshalb ist Akkord für Jugendliche verboten und in vielen Bereichen tariflich ausgeschlossen."
            }
          ]
        }
      ],
      "regel": "Faustregel: Zeitlohn, wenn Sorgfalt zählt. Akkord, wenn Menge zählt und messbar ist. Prämienlohn, wenn beides zählt."
    },
    {
      "typ": "absatz",
      "text": "Der {{begriff:praemienlohn|Prämienlohn}} ist der Kompromiss: ein sicherer Grundlohn plus eine Prämie für messbare Zusatzleistungen — Qualität, Termintreue, Materialersparnis oder Mengenleistung. Im kaufmännischen Bereich begegnet er dir als Zielvereinbarung oder Bonus."
    },
    {
      "typ": "merke",
      "text": "Für Jugendliche unter 18 ist Akkordarbeit nach dem Jugendarbeitsschutzgesetz **verboten** — genau wie jede Arbeit, bei der das Tempo von außen vorgegeben wird und den Schutz gefährdet.",
      "karteikarte": "Welche drei Entgeltformen gibt es, und wann passt welche?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Entgelt kann an Zeit, Leistung oder einer Kombination hängen.",
    "Akkord setzt eine bestimmte messbare Arbeitsleistung voraus."
  ],
  "erklaerung": "Zeitlohn vergütet die Anwesenheitszeit. Akkordlohn richtet sich nach der Leistungsmenge; dafür muss die Leistung messbar, beeinflussbar und wiederholbar sein. Prämienlohn verbindet Zeit und Leistung. Jugendliche unter 18 dürfen keine Akkordarbeit leisten. Auch bei Akkord gilt der Mindestlohn.",
  "beispiele": [
    "Bei Zeitlohn bleibt die Vergütung an der geleisteten Zeit orientiert; bei Akkord steigt sie mit der messbaren Leistungsmenge.",
    "Eine Tätigkeit ohne beeinflussbare oder wiederholbare Leistung eignet sich nicht für Akkordlohn; bei einer minderjährigen Person ist Akkordarbeit zusätzlich verboten."
  ],
  "fallbeispiel": "Ein Betrieb möchte eine Leistung nach Stückzahl vergüten. Zuerst werden die drei Voraussetzungen geprüft: Ist die Leistung messbar, kann die beschäftigte Person sie beeinflussen und wiederholt sie sich? Fehlt eine Voraussetzung, wird kein Akkordlohn gewählt. Ist die Person unter 18, ist Akkordarbeit unabhängig davon ausgeschlossen; der Mindestlohn bleibt auch bei zulässigem Akkord maßgeblich.",
  "typische_fehler": "Prämienlohn und Akkordlohn werden gleichgesetzt oder nur die Messbarkeit geprüft. Außerdem wird angenommen, Akkord könne den Mindestlohn unterschreiten.",
  "verstaendnisfragen": [
    "Welche drei Voraussetzungen hat Akkord? Messbar, beeinflussbar und wiederholbar.",
    "Welche Entgeltform kombiniert Zeit und Leistung? Prämienlohn."
  ],
  "pruefungsbezug": "Ordne Entgeltformen zuerst nach dem Anknüpfungspunkt zu und prüfe bei Akkord immer Voraussetzungen, Alter und Mindestlohn.",
  "merksatz": "Zeitlohn zählt Zeit, Akkord zählt Menge, Prämienlohn verbindet beides."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Die Abrechnung lesen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine Entgeltabrechnung lesen und die Bestandteile zuordnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Die Abrechnung lesen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:entgeltabrechnung|Entgeltabrechnung}} führt vom Bruttoentgelt zum Auszahlungsbetrag. Die Rechnung dahinter kennst du bereits — sie steht in Lernfeld 6, Kapitel 7. ==Hier geht es um die andere Seite: nicht ums Buchen, sondern ums Verstehen und Erklären.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Block",
        "Was darin steht",
        "Wer es bekommt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Bruttoentgelt",
            "Grundentgelt, Zulagen, Zuschläge, geldwerte Vorteile",
            "Ausgangspunkt der Rechnung"
          ],
          "detail": "**Geldwerte Vorteile werden grundsätzlich mitversteuert.** Ein Dienstwagen zur privaten Nutzung erhöht das steuerpflichtige Brutto, ohne dass Geld fließt — deshalb fällt das Netto niedriger aus, als der Mitarbeiter erwartet. Es gibt aber steuerfreie Ausnahmen: Ein Job-Ticket für Bus und Bahn, das der Arbeitgeber zusätzlich zum ohnehin geschuldeten Lohn gewährt, ist nach § 3 Nr. 15 EStG steuerfrei. Ob ein Vorteil das Netto mindert, muss also jeweils geprüft werden."
        },
        {
          "zellen": [
            "Gesetzliche Abzüge",
            "Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer",
            "Finanzamt"
          ]
        },
        {
          "zellen": [
            "Sozialversicherung",
            "Arbeitnehmeranteile zu KV, RV, AV, PV",
            "Krankenkasse als Einzugsstelle"
          ],
          "detail": "**Die Krankenkasse zieht den Gesamt­sozial­versicherungs­beitrag ein** — also auch die Renten- und Arbeitslosenversicherungsbeiträge — und verteilt sie weiter. Deshalb heißt sie Einzugsstelle, eine beliebte Prüfungsfrage. Ausnahme: Die Unfallversicherung zahlt der Arbeitgeber allein an die Berufsgenossenschaft."
        },
        {
          "zellen": [
            "Sonstige Abzüge",
            "Vermögenswirksame Leistungen, Pfändungen, Vorschüsse",
            "je nach Fall"
          ]
        },
        {
          "zellen": [
            "Auszahlungsbetrag",
            "was tatsächlich überwiesen wird",
            "Mitarbeiter"
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Mitarbeiter fragt, warum sein Netto gesunken ist, obwohl das Bruttogehalt gleich geblieben ist. Was prüfst du zuerst?",
      "optionen": [
        {
          "text": "Ob er zu wenig gearbeitet hat",
          "richtig": false,
          "echo": "Bei gleichem Bruttogehalt spielt die Arbeitszeit keine Rolle mehr — das Brutto steht ja fest."
        },
        {
          "text": "Steuerklasse, Beitragssätze und geldwerte Vorteile",
          "richtig": true,
          "echo": "Richtig. Bei unverändertem Brutto kann das Netto nur über die Abzüge sinken: eine geänderte Steuerklasse etwa nach Heirat oder Scheidung, ein gestiegener Zusatzbeitrag der Krankenkasse, der Pflegeversicherungszuschlag für Kinderlose ab 23 — oder ein neu hinzugekommener geldwerter Vorteil wie ein Dienstwagen."
        },
        {
          "text": "Ob der Arbeitgeberanteil gestiegen ist",
          "richtig": false,
          "echo": "Der Arbeitgeberanteil wird nicht vom Gehalt abgezogen, sondern kommt obendrauf. Er belastet den Betrieb, nicht das Netto des Mitarbeiters."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Wenn ein Kollege mit seiner Abrechnung zu dir kommt, geh sie von oben nach unten durch und benenne jeden Block. Die meisten Rückfragen erledigen sich, sobald jemand versteht, dass Steuer und Sozialversicherung zwei getrennte Systeme mit unterschiedlichen Bemessungsgrundlagen sind."
    },
    {
      "typ": "zuordnen",
      "lead": "Welcher Entgeltform ist die Situation zuzuordnen?",
      "kategorien": [
        "Zeitlohn",
        "Akkordlohn",
        "Prämienlohn"
      ],
      "aufgaben": [
        {
          "text": "Feste 2.800 € im Monat für eine Sachbearbeiterin.",
          "loesung": "Zeitlohn"
        },
        {
          "text": "Grundgehalt plus Bonus bei Erreichen der Jahresziele.",
          "loesung": "Prämienlohn"
        },
        {
          "text": "Bezahlung je gefertigtem Bauteil.",
          "loesung": "Akkordlohn"
        },
        {
          "text": "Stundenlohn für eine Aushilfe im Lager.",
          "loesung": "Zeitlohn"
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
    "Die Abrechnung beginnt mit dem Brutto und endet mit dem Auszahlungsbetrag.",
    "Nicht jeder Abzug hat dieselbe Funktion."
  ],
  "erklaerung": "Eine Abrechnung wird vom Brutto über gesetzliche Abzüge und Sozialversicherung zum Auszahlungsbetrag gelesen. Sonstige Abzüge werden gesondert betrachtet. Steuerpflichtige geldwerte Vorteile — etwa die private Nutzung eines Dienstwagens — erhöhen das steuerpflichtige Brutto, obwohl kein zusätzlicher Geldbetrag ausgezahlt wird. Es gibt steuerfreie Ausnahmen: Ein Job-Ticket für Bus und Bahn, das zusätzlich zum ohnehin geschuldeten Lohn gewährt wird, bleibt nach § 3 Nr. 15 EStG steuerfrei. Die Krankenkasse ist Einzugsstelle für den Gesamt­sozial­versicherungs­beitrag, also Kranken-, Pflege-, Renten- und Arbeitslosenversicherung; die Unfallversicherung zahlt der Arbeitgeber allein und direkt an die Berufsgenossenschaft.",
  "beispiele": [
    "Ein steuerpflichtiger geldwerter Vorteil wie die private Dienstwagennutzung wird dem steuerpflichtigen Brutto zugerechnet, obwohl die Person dafür nicht nochmals Geld erhält; ein zusätzlich gewährtes Job-Ticket für den Nahverkehr dagegen nicht.",
    "Für die Sozialversicherungsbeiträge wird die Krankenkasse als Einzugsstelle betrachtet; die Abrechnung weist anschließend den Auszahlungsbetrag aus."
  ],
  "fallbeispiel": "Eine Beschäftigte fragt, warum ihr steuerpflichtiges Brutto höher ist als der ausgezahlte Betrag. Die Abrechnung wird schrittweise gelesen: Brutto, gesetzliche Abzüge, Sozialversicherung, sonstige Abzüge, Auszahlungsbetrag. Ein geldwerter Vorteil kann das steuerpflichtige Brutto erhöhen, ohne dass er als Geld auf dem Konto erscheint.",
  "typische_fehler": "Brutto und Auszahlung werden gleichgesetzt oder alle Abzüge als Sozialversicherung bezeichnet. Auch die Krankenkasse wird nur als eine einzelne Versicherung statt als Einzugsstelle für die Beiträge betrachtet.",
  "verstaendnisfragen": [
    "Welche Reihenfolge hilft beim Lesen? Brutto, gesetzliche Abzüge, Sozialversicherung, sonstige Abzüge, Auszahlungsbetrag.",
    "Wer ist Einzugsstelle für den Gesamt­sozial­versicherungs­beitrag? Die Krankenkasse — für Kranken-, Pflege-, Renten- und Arbeitslosenversicherung, nicht für die Unfallversicherung."
  ],
  "pruefungsbezug": "Lies eine Abrechnung von oben nach unten und ordne jeden Betrag seiner Stufe zu. Geldwerte Vorteile als Brutto-Bestandteil prüfen, nicht als Auszahlung — und dabei klären, ob sie steuerpflichtig oder steuerfrei sind.",
  "merksatz": "Brutto ist nicht Netto: Die Abrechnung erklärt den Weg zwischen beiden Beträgen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Einsatz und Entwicklung

**Datei:** `lf8-k5-einsatz.kapitel.json` · SHA-256 `c8975b70ec738393d409739335fdf8b6b262b7323ccd5d0e025c2d17b40a21e8`

**Konkreter Kapitelauftrag:** Einen Personaleinsatz- und Entwicklungsfall mit Abwesenheit bearbeiten; Schutzrecht, Fristenkontrolle und Weiterbildung verbinden.

**Einordnung:** Arbeitszeit gestalten und Menschen weiterbringen.

### e1 · Wann gearbeitet wird

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Arbeitszeitmodelle unterscheiden und passend auswählen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e1",
  "titel": "Wann gearbeitet wird",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Arbeitszeitmodelle sind längst ein Wettbewerbsfaktor. Auf einem Arbeitsmarkt, auf dem Bewerber die Auswahl haben, entscheidet oft nicht das Gehalt, sondern die Frage, ==wie frei jemand über seine Zeit verfügt=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Modell",
        "Wie es funktioniert",
        "Passt bei"
      ],
      "zeilen": [
        {
          "zellen": [
            "Feste Arbeitszeit",
            "gleicher Beginn und gleiches Ende",
            "Schalter, Produktion, Schichtbetrieb"
          ]
        },
        {
          "zellen": [
            "Gleitzeit",
            "Kernzeit fest, Rahmen beweglich",
            "Büro mit gleichmäßiger Auslastung"
          ],
          "detail": "**{{begriff:gleitzeit|Gleitzeit}} braucht ein Zeitkonto** und klare Regeln, wie viele Plus- oder Minusstunden zulässig sind und wann sie ausgeglichen werden. Ohne diese Regeln entstehen Berge, die niemand mehr abbauen kann."
        },
        {
          "zellen": [
            "Vertrauensarbeitszeit",
            "keine Zeiterfassung im klassischen Sinn, Ergebnis zählt",
            "eigenverantwortliche Tätigkeiten"
          ],
          "detail": "**Achtung, Rechtsentwicklung:** Auch bei Vertrauensarbeitszeit besteht eine Pflicht zur Arbeitszeiterfassung. Vertrauen bezieht sich auf die Lage der Arbeitszeit, nicht auf ihre Dokumentation."
        },
        {
          "zellen": [
            "Teilzeit",
            "reduzierte Wochenstunden",
            "Vereinbarkeit, stufenweise Rückkehr"
          ]
        },
        {
          "zellen": [
            "Schichtarbeit",
            "Wechsel in festen Schichten",
            "durchgehender Betrieb"
          ]
        },
        {
          "zellen": [
            "Mobiles Arbeiten",
            "Arbeit außerhalb des Betriebs",
            "Tätigkeiten ohne Ortsbindung"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Alle Modelle bewegen sich im Rahmen des Arbeitszeitgesetzes: werktäglich acht Stunden, Verlängerung auf zehn nur, wenn im Schnitt von sechs Monaten acht nicht überschritten werden. Für Jugendliche gilt weiterhin das strengere Jugendarbeitsschutzgesetz aus Lernfeld 1.",
      "karteikarte": "Nenne vier Arbeitszeitmodelle und je einen passenden Einsatzbereich."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e1",
  "vorauswissen": [
    "Arbeitszeitmodelle verteilen Arbeitszeit unterschiedlich.",
    "Arbeitszeit bleibt auch bei größerer Freiheit rechtlich zu erfassen."
  ],
  "erklaerung": "Zu den Arbeitszeitmodellen gehören feste Arbeitszeit, Gleitzeit, Vertrauensarbeitszeit, Teilzeit, Schichtarbeit und mobiles Arbeiten. Gleitzeit braucht ein Zeitkonto und Regeln für den Ausgleich. Auch Vertrauensarbeitszeit hebt die Pflicht zur Arbeitszeiterfassung nicht auf. Nach dem Arbeitszeitgesetz gelten werktäglich acht Stunden, bis zehn Stunden bei Ausgleich im Halbjahresschnitt.",
  "beispiele": [
    "Bei Gleitzeit werden Beginn und Ende innerhalb eines Rahmens gewählt; Zeitkonto und Ausgleichsregeln sorgen dafür, dass die Abweichungen nachvollziehbar bleiben.",
    "Mobiles Arbeiten verändert den Ort, Vertrauensarbeitszeit die Kontrolle der Lage; beide sind trotzdem in der Arbeitszeitplanung und -erfassung zu berücksichtigen."
  ],
  "fallbeispiel": "Ein Betrieb führt Gleitzeit ein, beschreibt aber weder Zeitkonto noch Ausgleich. Das Modell ist organisatorisch unvollständig. Es werden Regeln für die Zeiterfassung und den Ausgleich festgelegt. Zusätzlich wird geprüft, dass die tägliche Arbeitszeit die acht Stunden beziehungsweise den zulässigen Ausgleich bis zehn Stunden einhält.",
  "typische_fehler": "Vertrauensarbeitszeit wird als arbeitszeitfreie Selbstbestimmung verstanden. Außerdem wird Gleitzeit ohne Zeitkonto oder Ausgleichsregel eingeführt.",
  "verstaendnisfragen": [
    "Welche zwei Voraussetzungen braucht Gleitzeit? Ein Zeitkonto und Regeln für den Ausgleich.",
    "Was gilt auch bei Vertrauensarbeitszeit? Die Pflicht zur Arbeitszeiterfassung."
  ],
  "pruefungsbezug": "Ordne Modelle nach der Gestaltung von Zeit und Ort zu und prüfe anschließend Erfassung, tägliche Grenze und Ausgleich.",
  "merksatz": "Mehr Freiheit bei der Lage der Arbeit beseitigt weder Regeln noch Zeiterfassung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e2 · Menschen weiterbringen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Maßnahmen der Personalentwicklung einordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e2",
  "titel": "Menschen weiterbringen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:personalentwicklung|Personalentwicklung}} ist kein Wohlfahrtsprogramm, sondern die günstigste Form der Personalbeschaffung: Wer intern qualifiziert, muss extern nicht suchen. Sie wird nach dem Zeitpunkt gegliedert."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Zeitpunkt",
        "Maßnahme",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Into the job",
            "Vorbereitung auf eine Stelle",
            "Ausbildung, Einarbeitungsplan, Traineeprogramm"
          ]
        },
        {
          "zellen": [
            "On the job",
            "Lernen am Arbeitsplatz",
            "Unterweisung, Job-Rotation, Projektarbeit"
          ],
          "detail": "**Die wirksamste und billigste Form.** Job-Rotation heißt planmäßiger Wechsel zwischen Aufgaben — genau das, was dein betrieblicher Ausbildungsplan mit dir macht."
        },
        {
          "zellen": [
            "Off the job",
            "Lernen außerhalb des Arbeitsplatzes",
            "Seminar, Fortbildung, Fachwirt"
          ]
        },
        {
          "zellen": [
            "Along the job",
            "begleitende Förderung",
            "Mentoring, Coaching, Mitarbeitergespräch"
          ]
        },
        {
          "zellen": [
            "Out of the job",
            "Vorbereitung auf das Ausscheiden",
            "Altersteilzeit, Ruhestandsvorbereitung"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Grundlage jeder Entwicklung ist das **Mitarbeitergespräch**: einmal jährlich, vorbereitet von beiden Seiten, mit Rückblick, Beurteilung und Zielvereinbarung. Es folgt denselben Regeln wie jedes Feedback aus Lernfeld 7 — beschreibend, konkret, unter vier Augen."
    },
    {
      "typ": "check",
      "frage": "Eine Sachbearbeiterin soll auf eine Teamleitung vorbereitet werden. Welche Maßnahme passt am besten?",
      "optionen": [
        {
          "text": "Off the job: ein Führungsseminar",
          "richtig": false,
          "echo": "Sinnvoll als Ergänzung, aber allein zu wenig. Führung lernt man nicht im Seminarraum, sondern in Situationen — das Seminar liefert Begriffe, keine Erfahrung."
        },
        {
          "text": "Eine Kombination aus Seminar und begleitendem Mentoring",
          "richtig": true,
          "echo": "Richtig. Off the job vermittelt die Grundlagen, along the job sichert die Übertragung in den Alltag. Ergänzt um erste Führungsaufgaben in einem Projekt entsteht daraus eine echte Vorbereitung statt eines Zertifikats."
        },
        {
          "text": "Gar keine — Führung lernt man durch Machen",
          "richtig": false,
          "echo": "Lernen am Arbeitsplatz ist wirksam, aber ohne Begleitung teuer: Die Fehler macht die Person an echten Mitarbeitern. Genau dafür gibt es Mentoring."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welcher Form der Personalentwicklung ist die Maßnahme zuzuordnen?",
      "kategorien": [
        "Into the job",
        "On the job",
        "Off the job",
        "Along the job"
      ],
      "aufgaben": [
        {
          "text": "Ein Azubi durchläuft planmäßig alle Abteilungen.",
          "loesung": "On the job"
        },
        {
          "text": "Ein Mitarbeiter besucht ein zweitägiges Seminar zur neuen Software.",
          "loesung": "Off the job"
        },
        {
          "text": "Eine neue Kollegin bekommt einen strukturierten Einarbeitungsplan.",
          "loesung": "Into the job"
        },
        {
          "text": "Ein erfahrener Kollege begleitet einen Nachwuchskraft über ein Jahr.",
          "loesung": "Along the job"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e2",
  "vorauswissen": [
    "Personalentwicklung kann vor, während und nach einer Tätigkeit ansetzen.",
    "Lernen soll die berufliche Entwicklung und den Einsatz verbinden."
  ],
  "erklaerung": "Die fünf Formen der Personalentwicklung werden über ihre Präpositionen unterschieden: into the job, on the job, off the job, along the job und out of the job. On the job findet direkt am Arbeitsplatz statt und ist die wirksamste und günstigste Form. Das jährliche Mitarbeitergespräch verbindet Rückblick, Beurteilung und Zielvereinbarung.",
  "beispiele": [
    "Eine Einarbeitung in die konkrete Stelle gehört zu into the job; Lernen während der laufenden Aufgabe zu on the job.",
    "Eine Entwicklung außerhalb des Arbeitsplatzes gehört zu off the job; das Mitarbeitergespräch verbindet Rückblick und neue Ziele."
  ],
  "fallbeispiel": "Eine neue Aufgabe soll sicher beherrscht werden. Zuerst wird geklärt, ob die Person in die Stelle eingeführt, während der Arbeit angeleitet oder außerhalb des Arbeitsplatzes geschult werden soll. Für die laufende Weiterentwicklung wird das Mitarbeitergespräch genutzt: Rückblick, Beurteilung und Zielvereinbarung werden verbunden. Ist Lernen direkt am Arbeitsplatz möglich, wird on the job geprüft.",
  "typische_fehler": "Die fünf Formen werden nur übersetzt, ohne den Zeitpunkt und Ort des Lernens zuzuordnen. Außerdem wird das Mitarbeitergespräch auf eine reine Beurteilung reduziert.",
  "verstaendnisfragen": [
    "Welche Form gilt als wirksamste und günstigste? On the job.",
    "Welche drei Elemente verbindet das jährliche Mitarbeitergespräch? Rückblick, Beurteilung und Zielvereinbarung."
  ],
  "pruefungsbezug": "Ordne die englischen Präpositionen nach Ort und Zeitpunkt der Entwicklung und nenne jeweils ein passendes Beispiel.",
  "merksatz": "Personalentwicklung folgt der Frage, wann und wo gelernt wird; on the job ist direkt und wirksam."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Trennung und Zeugnis

**Datei:** `lf8-k6-trennung.kapitel.json` · SHA-256 `21008a9e7a47c98c78e7c9ae0ad2cb5bb557aa9fad37ba38cf05cf51c42efd30`

**Konkreter Kapitelauftrag:** Eine Beendigung samt Arbeitspapieren und Zeugnis einordnen; Bedingungen und Fristen vor einer Rechtsfolge prüfen.

**Einordnung:** Kündigungsarten, Fristen, Schutz — und was am Ende im Zeugnis steht.

### f1 · Nicht jede Trennung ist eine Kündigung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Wege der Personalfreisetzung und Beendigungsarten unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `tabelle-2`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f1",
  "titel": "Nicht jede Trennung ist eine Kündigung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:personalfreisetzung|Personalfreisetzung}} beginnt nicht mit der Kündigung, sondern lange davor. ==Die Kündigung ist das letzte Mittel==, nicht das erste — und im Geltungsbereich des Kündigungsschutzgesetzes muss der Betrieb das auch belegen können."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Stufe",
        "Maßnahme",
        "Wirkung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ohne Personalabbau",
            "Überstunden abbauen, Urlaub einbringen, Kurzarbeit",
            "Kapazität sinkt, Stellen bleiben"
          ]
        },
        {
          "zellen": [
            "Natürliche Fluktuation",
            "frei werdende Stellen nicht nachbesetzen",
            "langsam, aber ohne Konflikt"
          ],
          "detail": "**Die schmerzloseste Form** — und die langsamste. Sie funktioniert nur, wenn die {{begriff:fluktuation|Fluktuation}} hoch genug und der Abbaubedarf nicht dringend ist."
        },
        {
          "zellen": [
            "Einvernehmlich",
            "Aufhebungsvertrag, Altersteilzeit",
            "schnell, aber teuer"
          ]
        },
        {
          "zellen": [
            "Einseitig",
            "Kündigung durch den Arbeitgeber",
            "letztes Mittel, rechtlich riskant"
          ]
        }
      ]
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Beendigungsart",
        "Wer entscheidet",
        "Besonderheit"
      ],
      "zeilen": [
        {
          "zellen": [
            "Fristablauf",
            "niemand — der Vertrag endet",
            "nur bei Befristung"
          ]
        },
        {
          "zellen": [
            "{{begriff:aufhebungsvertrag|Aufhebungsvertrag}}",
            "beide gemeinsam",
            "keine Fristen, kein Kündigungsschutz"
          ],
          "detail": "**Vorsicht für den Arbeitnehmer:** Wer freiwillig zustimmt, riskiert eine Sperrzeit beim Arbeitslosengeld — in der Regel zwölf Wochen. Deshalb ist ein Aufhebungsvertrag selten so vorteilhaft, wie er im Gespräch klingt."
        },
        {
          "zellen": [
            "Ordentliche Kündigung",
            "eine Seite",
            "Frist einhalten, Grund nötig im KSchG-Bereich"
          ]
        },
        {
          "zellen": [
            "Außerordentliche Kündigung",
            "eine Seite",
            "fristlos, wichtiger Grund, zwei Wochen Frist"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Nach {{par:bgb-623|§ 623 BGB}} bedarf jede Kündigung und jeder Aufhebungsvertrag der **Schriftform** — eigenhändig unterschrieben auf Papier. Eine Kündigung per E-Mail, Messenger oder Fax ist unwirksam, auch wenn sie zugegangen ist und alle sie verstanden haben."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f1",
  "vorauswissen": [
    "Personalfreisetzung kann vor einer Kündigung beginnen.",
    "Eine Kündigung ist das letzte Mittel und muss formal wirksam sein."
  ],
  "erklaerung": "Freisetzung wird stufenweise betrachtet: Überstunden, Kurzarbeit, Fluktuation, Aufhebungsvertrag und erst dann Kündigung. Kündigung und Aufhebungsvertrag brauchen nach § 623 BGB Schriftform; E-Mail, Messenger oder Fax reichen nicht. Die Formfrage wird vor jeder inhaltlichen Prüfung geklärt.",
  "beispiele": [
    "Ein Betrieb kann zunächst Überstunden abbauen oder Kurzarbeit prüfen, bevor er eine Kündigung ausspricht.",
    "Eine Kündigung per E-Mail ist unwirksam, selbst wenn die Empfängerin sie gelesen und verstanden hat."
  ],
  "fallbeispiel": "Ein Arbeitgeber schickt eine Kündigung als E-Mail und beruft sich darauf, dass sie zugegangen ist. Zuerst wird die Form geprüft: § 623 BGB verlangt Schriftform mit eigenhändiger Unterschrift auf Papier. Die E-Mail ist deshalb unwirksam. Erst bei einer wirksamen Form wären Frist, Schutz und Grund zu prüfen.",
  "typische_fehler": "Die Kündigung wird sofort inhaltlich bewertet, ohne die Schriftform zu prüfen. Außerdem wird ein Aufhebungsvertrag als formfreies Gespräch behandelt.",
  "verstaendnisfragen": [
    "Welche Stufen können vor der Kündigung liegen? Überstunden, Kurzarbeit, Fluktuation und Aufhebungsvertrag.",
    "Welche Form verlangen Kündigung und Aufhebungsvertrag? Schriftform mit eigenhändiger Unterschrift auf Papier."
  ],
  "pruefungsbezug": "Beginne jede Trennungsaufgabe mit der Form. Erst danach Frist, Kündigungsschutz, Betriebsratsanhörung und Kündigungsgrund prüfen.",
  "merksatz": "Die Kündigung ist das letzte Mittel und beginnt formal mit Papier und Unterschrift."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f2 · Fristen und Schutz

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Kündigungsfristen berechnen und den Kündigungsschutz prüfen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `check-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f2",
  "titel": "Fristen und Schutz",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Grundfrist nach {{par:bgb-622|§ 622 BGB}} beträgt vier Wochen zum Fünfzehnten oder zum Monatsende und gilt für **beide** Seiten. Kündigt der Arbeitgeber, verlängert sie sich mit der Betriebszugehörigkeit — für den Arbeitnehmer bleibt es bei vier Wochen, sofern nichts anderes vereinbart ist."
    },
    {
      "typ": "grafik",
      "variante": "staffel",
      "kopf": "Die Staffelung",
      "titel": "Welche Frist gilt — und wann ist Schluss?",
      "lead": "Trag die Betriebszugehörigkeit und das Zugangsdatum ein. Genau so wird die Aufgabe in der Prüfung gestellt.",
      "eingaben": {
        "jahre": {
          "label": "Betriebszugehörigkeit in Jahren",
          "start": 6
        },
        "datum": {
          "label": "Kündigung geht zu am",
          "start": "2026-03-10"
        }
      },
      "stufen": [
        {
          "ab": 0,
          "frist": "4 Wochen",
          "termin": "zum 15. oder Monatsende",
          "wochen": 4
        },
        {
          "ab": 2,
          "frist": "1 Monat",
          "termin": "zum Monatsende",
          "monate": 1
        },
        {
          "ab": 5,
          "frist": "2 Monate",
          "termin": "zum Monatsende",
          "monate": 2
        },
        {
          "ab": 8,
          "frist": "3 Monate",
          "termin": "zum Monatsende",
          "monate": 3
        },
        {
          "ab": 10,
          "frist": "4 Monate",
          "termin": "zum Monatsende",
          "monate": 4
        },
        {
          "ab": 12,
          "frist": "5 Monate",
          "termin": "zum Monatsende",
          "monate": 5
        },
        {
          "ab": 15,
          "frist": "6 Monate",
          "termin": "zum Monatsende",
          "monate": 6
        },
        {
          "ab": 20,
          "frist": "7 Monate",
          "termin": "zum Monatsende",
          "monate": 7
        }
      ],
      "regel": "Merke die Sprünge: 2, 5, 8, 10, 12, 15, 20 Jahre — die Monate laufen dabei schlicht von 1 bis 7. Die verlängerten Fristen gelten nur für den Arbeitgeber und enden ausschließlich zum Monatsende. In der Probezeit sind es zwei Wochen ohne Termin."
    },
    {
      "typ": "absatz",
      "text": "Ob überhaupt ein Grund nötig ist, entscheidet der {{begriff:kuendigungsschutz|Kündigungsschutz}}. Er greift nach {{par:kschg-23|§ 23 KSchG}} erst in Betrieben mit **mehr als zehn** Arbeitnehmern und nach {{par:kschg-1|§ 1 KSchG}} erst, wenn das Arbeitsverhältnis länger als sechs Monate bestanden hat."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kündigungsgrund",
        "Bedeutung",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Personenbedingt",
            "in der Person liegend, ohne Verschulden",
            "dauerhafte Krankheit, entzogene Fahrerlaubnis"
          ]
        },
        {
          "zellen": [
            "Verhaltensbedingt",
            "steuerbares Fehlverhalten",
            "wiederholte Unpünktlichkeit trotz Abmahnung"
          ],
          "detail": "**In der Regel erst nach Abmahnung.** Sie muss das Fehlverhalten konkret benennen, zur Änderung auffordern und die Kündigung für den Wiederholungsfall ankündigen. Ohne diese drei Bestandteile ist sie wirkungslos."
        },
        {
          "zellen": [
            "Betriebsbedingt",
            "dringende betriebliche Erfordernisse",
            "Auftragseinbruch, Wegfall der Stelle"
          ],
          "detail": "**Hier ist zusätzlich die Sozialauswahl zu beachten:** Unter vergleichbaren Mitarbeitern trifft es den, der sie am ehesten verkraftet — nach Dauer der Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Mitarbeiter ist seit sechs Jahren im Betrieb. Der Arbeitgeber kündigt am 10. März. Wann endet das Arbeitsverhältnis?",
      "optionen": [
        {
          "text": "Am 7. April, vier Wochen später",
          "richtig": false,
          "echo": "Die Grundfrist von vier Wochen gilt nur bis zu zwei Jahren Betriebszugehörigkeit. Nach sechs Jahren greift bereits die verlängerte Frist."
        },
        {
          "text": "Am 31. Mai",
          "richtig": true,
          "echo": "Richtig. Bei sechs Jahren Betriebszugehörigkeit gilt die Stufe „ab 5 Jahre“ mit zwei Monaten zum Monatsende. Zugang am 10. März bedeutet also Ende am 31. Mai — nicht am 10. Mai, weil die verlängerten Fristen ausschließlich zum Monatsende laufen."
        },
        {
          "text": "Am 10. Mai",
          "richtig": false,
          "echo": "Die Länge stimmt, der Termin nicht. Die gestaffelten Fristen des § 622 Abs. 2 BGB enden immer zum Monatsende — der Fünfzehnte ist nur bei der Grundfrist möglich."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Vor jeder Kündigung ist nach {{par:betrvg-102|§ 102 BetrVG}} der Betriebsrat anzuhören. Eine ohne Anhörung ausgesprochene Kündigung ist **unwirksam** — unabhängig davon, wie berechtigt sie sonst wäre.",
      "karteikarte": "Welche drei Kündigungsgründe kennt das KSchG, und was ist bei betriebsbedingter Kündigung zusätzlich zu beachten?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f2",
  "vorauswissen": [
    "Frist, Kündigungsschutz und Betriebsgröße müssen getrennt geprüft werden.",
    "Der Betriebsrat ist vor einer Kündigung anzuhören."
  ],
  "erklaerung": "Die Grundfrist nach § 622 BGB beträgt vier Wochen zum 15. oder zum Monatsende und gilt für beide Seiten. Für Arbeitgeber verlängert sie sich mit der Betriebszugehörigkeit in den Stufen 2, 5, 8, 10, 12, 15 und 20 Jahre auf ein bis sieben Monate zum Monatsende. In der Probezeit gilt eine Frist von zwei Wochen ohne festen Termin. Kündigungsschutz greift nach sechs Monaten und in Betrieben mit mehr als zehn Arbeitnehmern. Die Kündigungsgründe sind personen-, verhaltens- und betriebsbedingt; bei betriebsbedingter Kündigung kommt Sozialauswahl hinzu. Ohne Anhörung des Betriebsrats ist die Kündigung unwirksam.",
  "beispiele": [
    "Eine Arbeitgeberfrist von zwei Monaten endet zum Monatsende; eine Arbeitnehmerin bleibt grundsätzlich bei der vierwöchigen Grundfrist, sofern nichts anderes vereinbart ist.",
    "Vor einer betriebsbedingten Kündigung werden zusätzlich Kündigungsgrund und Sozialauswahl geprüft; vor jeder Kündigung die Anhörung des Betriebsrats."
  ],
  "fallbeispiel": "Ein Arbeitgeber kündigt einem Beschäftigten nach mehr als sechs Monaten in einem Betrieb mit mehr als zehn Arbeitnehmern zum 15. des nächsten Monats, ohne den Betriebsrat anzuhören. Die Prüfung ergibt mehrere Punkte: Kündigungsschutz ist eröffnet, die Arbeitgeberfrist muss nach Betriebszugehörigkeit geprüft werden, und die fehlende Anhörung macht die Kündigung unwirksam.",
  "typische_fehler": "Verlängerte Fristen werden auch auf Arbeitnehmer angewendet, der Monatsendtermin wird vergessen oder die Schwellen des Kündigungsschutzes werden nicht zusammen geprüft. Die Betriebsratsanhörung wird als freiwillig behandelt.",
  "verstaendnisfragen": [
    "Welche Grundfrist gilt für beide Seiten? Vier Wochen zum 15. oder zum Monatsende.",
    "Was bewirkt eine fehlende Betriebsratsanhörung? Die Kündigung ist unwirksam."
  ],
  "pruefungsbezug": "Rechne in dieser Reihenfolge: Form, Betriebsgröße und Dauer, Frist, Kündigungsgrund, Sozialauswahl und Betriebsratsanhörung.",
  "merksatz": "Arbeitgeberfristen verlängern sich, Arbeitnehmerfristen nicht automatisch; die Anhörung des Betriebsrats bleibt zwingend."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f3 · Das Zeugnis

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ein Arbeitszeugnis beurteilen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `tabelle-2`, `achtung-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f3",
  "titel": "Das Zeugnis",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Nach {{par:gewo-109|§ 109 GewO}} besteht bei Beendigung Anspruch auf ein {{begriff:arbeitszeugnis|Arbeitszeugnis}}. Es muss **wahr** und zugleich **wohlwollend** sein — zwei Anforderungen, die sich widersprechen. Aus diesem Widerspruch ist die berüchtigte Zeugnissprache entstanden."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Formulierung",
        "Bedeutung"
      ],
      "zeilen": [
        {
          "zellen": [
            "stets zu unserer vollsten Zufriedenheit",
            "sehr gut"
          ],
          "mono": []
        },
        {
          "zellen": [
            "stets zu unserer vollen Zufriedenheit",
            "gut"
          ]
        },
        {
          "zellen": [
            "zu unserer vollen Zufriedenheit",
            "befriedigend"
          ],
          "detail": "**Ein einziges Wort macht den Unterschied.** „Stets“ steht für Dauerhaftigkeit, „voll“ für den Grad. Fehlt „stets“, fehlt eine Note. Genau deshalb liest man ein Zeugnis Wort für Wort und nicht dem Sinn nach."
        },
        {
          "zellen": [
            "zu unserer Zufriedenheit",
            "ausreichend"
          ]
        },
        {
          "zellen": [
            "hat sich bemüht",
            "mangelhaft"
          ]
        }
      ]
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Zeugnisart",
        "Inhalt",
        "Wann"
      ],
      "zeilen": [
        {
          "zellen": [
            "Einfaches Zeugnis",
            "Art und Dauer der Tätigkeit",
            "auf Verlangen"
          ]
        },
        {
          "zellen": [
            "Qualifiziertes Zeugnis",
            "zusätzlich Leistung und Verhalten",
            "nur auf ausdrückliches Verlangen"
          ]
        },
        {
          "zellen": [
            "Zwischenzeugnis",
            "bei Vorgesetztenwechsel, interner Bewerbung",
            "bei berechtigtem Interesse"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Verboten sind Geheimzeichen jeder Art — auffällige Zeichensetzung, Ausrufezeichen, ungewöhnliche Schreibweisen oder Auslassungen, die etwas mitteilen sollen. Ebenso unzulässig ist der Hinweis auf Krankheiten, Gewerkschaftszugehörigkeit oder die Ausübung von Betriebsratstätigkeit."
    },
    {
      "typ": "praxistipp",
      "text": "Prüfe jedes Zeugnis auf drei Dinge: Ist die **Schlussformel** vorhanden — Dank, Bedauern über das Ausscheiden, Zukunftswünsche? Fehlt sie, ist das ein deutliches Signal. Ist die **Tätigkeitsbeschreibung** vollständig, oder wurden wichtige Aufgaben weggelassen? Und stimmt das **Austrittsdatum** mit dem Ende des Arbeitsverhältnisses überein?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welcher Kündigungsgrund liegt vor?",
      "kategorien": [
        "Personenbedingt",
        "Verhaltensbedingt",
        "Betriebsbedingt"
      ],
      "aufgaben": [
        {
          "text": "Der Betrieb schließt eine ganze Abteilung.",
          "loesung": "Betriebsbedingt"
        },
        {
          "text": "Ein Mitarbeiter kommt trotz zweier Abmahnungen weiter zu spät.",
          "loesung": "Verhaltensbedingt"
        },
        {
          "text": "Einem Berufskraftfahrer wird die Fahrerlaubnis dauerhaft entzogen.",
          "loesung": "Personenbedingt"
        },
        {
          "text": "Ein Auftrag entfällt, die Stelle wird nicht mehr gebraucht.",
          "loesung": "Betriebsbedingt"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f3",
  "vorauswissen": [
    "Ein Zeugnis wird bei Beendigung des Arbeitsverhältnisses ausgestellt.",
    "Wahrheit und Wohlwollen müssen gleichzeitig eingehalten werden."
  ],
  "erklaerung": "Nach § 109 GewO besteht Anspruch auf ein einfaches oder qualifiziertes Zeugnis. Es muss wahr und wohlwollend sein. Die Tätigkeitsbeschreibung muss vollständig sein; Schlussformel, Austrittsdatum und unauffällige Schreibweise werden geprüft. Geheimzeichen, Hinweise auf Krankheiten, Gewerkschaftszugehörigkeit oder Betriebsratstätigkeit sind unzulässig. Die vorhandene Zeugnissprache übersetzt abgestufte Zufriedenheitsformulierungen.",
  "beispiele": [
    "Ein einfaches Zeugnis bestätigt Art und Dauer der Tätigkeit; ein qualifiziertes enthält zusätzlich Leistung und Verhalten.",
    "Fehlt die Schlussformel mit Dank, Bedauern und Zukunftswünschen, ist das bei der Prüfung ein deutliches Signal, ersetzt aber keine vollständige Inhaltsprüfung."
  ],
  "fallbeispiel": "Ein Zeugnis nennt die Stelle, lässt aber wichtige Aufgaben weg und enthält ein falsches Austrittsdatum. Bei der Prüfung werden Tätigkeitsbeschreibung und Datum korrigiert. Danach werden Wahrheit, Wohlwollen, Schlussformel und unzulässige Geheimzeichen kontrolliert. Krankheiten oder Betriebsratstätigkeit dürfen nicht als versteckte Bewertung aufgenommen werden.",
  "typische_fehler": "Wohlwollend wird mit positiv, aber unwahr gleichgesetzt. Außerdem werden auffällige Zeichensetzung oder Auslassungen als harmlose Gestaltung übersehen.",
  "verstaendnisfragen": [
    "Welche beiden Anforderungen stehen im Spannungsverhältnis? Das Zeugnis muss wahr und zugleich wohlwollend sein.",
    "Welche drei Punkte gehören zur praktischen Zeugnisprüfung? Schlussformel, vollständige Tätigkeitsbeschreibung und richtiges Austrittsdatum."
  ],
  "pruefungsbezug": "Unterscheide einfaches und qualifiziertes Zeugnis und prüfe anschließend Inhalt, Formulierungen und unzulässige Geheimzeichen.",
  "merksatz": "Ein Zeugnis ist wahr, wohlwollend, vollständig und frei von Geheimzeichen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
