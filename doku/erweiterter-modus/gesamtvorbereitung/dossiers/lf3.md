# lf3 · Aufträge bearbeiten

Quelle: `quellen/lf3.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 6 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Der Auftragsprozess im Überblick

**Datei:** `lf3-k1-prozess.kapitel.json` · SHA-256 `fd4208cd35ce6d8df47e3b527c63fe168ba8da71750838f3a6137e3764b4ea38`

**Konkreter Kapitelauftrag:** Einen Kundenauftrag vom Erstkontakt bis Zahlungseingang verfolgen; Übergaben, Kontrollpunkte und Kundenzufriedenheit erklären.

**Einordnung:** Sechs Belege, eine Kette — und du sitzt mittendrin.

### a1 · Die Kette

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Geschäftsprozess der Auftragsbearbeitung beschreiben

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Die Kette",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:auftragsbearbeitung|Auftragsbearbeitung}} ist der Prozess, in dem du als Kaufmann für Büromanagement die meiste Zeit verbringst. Sie beginnt nicht mit dem Vertrag, sondern lange davor — und endet nicht mit der Lieferung, sondern erst mit dem Geldeingang."
    },
    {
      "typ": "absatz",
      "text": "==Wichtig ist die Blickrichtung:== In diesem Lernfeld bist du der **Verkäufer**. Ein Kunde fragt bei dir an. Die Gegenrichtung — du beschaffst selbst etwas — ist Lernfeld 4."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Der Prozess",
      "titel": "Von der Anfrage bis zum Geldeingang",
      "lead": "Sechs Stationen, jede mit eigenem Beleg. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Anfrage",
          "satz": "Kunde → Betrieb · unverbindlich",
          "text": "Der Kunde bittet um ein Angebot. Rechtlich passiert dabei noch gar nichts — eine Anfrage verpflichtet niemanden zu irgendetwas."
        },
        {
          "nr": 2,
          "titel": "Angebot",
          "satz": "Betrieb → Kunde · bindend",
          "text": "Jetzt wird es ernst. Das Angebot ist rechtlich der Antrag, und daran bist du gebunden, solange du dich nicht ausdrücklich freigezeichnet hast."
        },
        {
          "nr": 3,
          "titel": "Bestellung",
          "satz": "Kunde → Betrieb · der Vertrag steht",
          "text": "Nimmt der Kunde dein Angebot unverändert an, ist der Kaufvertrag geschlossen. Ohne Unterschrift, ohne Papier, allein durch zwei übereinstimmende Erklärungen."
        },
        {
          "nr": 4,
          "titel": "Auftragsbestätigung",
          "satz": "Betrieb → Kunde",
          "text": "Sie schafft Klarheit über das Vereinbarte. Rechtlich ist sie nur dann die Annahme, wenn kein bindendes Angebot vorausging — sonst wiederholt sie nur, was schon gilt."
        },
        {
          "nr": 5,
          "titel": "Lieferung",
          "satz": "mit Lieferschein",
          "text": "Die Ware geht raus, begleitet vom Lieferschein. Er enthält bewusst keine Preise — er dient dem Empfänger zur Prüfung, ob die Sendung vollständig ist."
        },
        {
          "nr": 6,
          "titel": "Rechnung und Zahlung",
          "satz": "Betrieb → Kunde → Geldeingang",
          "text": "Erst mit dem Zahlungseingang ist der Prozess abgeschlossen. Bleibt er aus, beginnt das Mahnwesen — das lernst du in Lernfeld 4 (Zahlungsverzug) und vertiefst es in Lernfeld 9."
        }
      ],
      "regel": "Merke die Reihenfolge über die Richtung: Anfrage und Bestellung kommen vom Kunden, Angebot, Bestätigung, Lieferschein und Rechnung von dir."
    },
    {
      "typ": "merke",
      "text": "Der Vertrag entsteht bei **Schritt 3**, nicht bei der Auftragsbestätigung und schon gar nicht bei der Lieferung. Das ist die häufigste Fehlvorstellung im ganzen Lernfeld.",
      "karteikarte": "An welcher Stelle des Auftragsprozesses kommt der Kaufvertrag zustande?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "vorauswissen": [
    "Ein Auftrag besteht aus mehreren aufeinanderfolgenden Geschäftsschritten.",
    "Belege dokumentieren jeweils einen bestimmten Schritt im Prozess."
  ],
  "erklaerung": "Der Auftragsprozess im Lernfeld 3 wird aus Sicht des Verkäufers gelesen: Anfrage, Angebot, Bestellung, Auftragsbestätigung, Lieferung, Rechnung und Zahlung. Anfrage und Bestellung kommen vom Kunden; Angebot, Auftragsbestätigung, Lieferschein und Rechnung erstellt der Betrieb. Die Anfrage ist rechtlich unverbindlich. Der Vertrag entsteht erst durch übereinstimmende Willenserklärungen, in der Regel mit der Annahme der Bestellung.",
  "beispiele": [
    "Eine Kundin fragt nach 200 Ordnern. Die Anfrage löst noch keinen Vertrag aus; der Betrieb erstellt daraufhin ein Angebot.",
    "Nach der Bestellung erstellt der Betrieb die Auftragsbestätigung und später Lieferschein und Rechnung. Abgeschlossen ist der Prozess erst mit dem Zahlungseingang."
  ],
  "fallbeispiel": "Eine Kundin bittet telefonisch um ein Angebot über 200 Ordner und sagt am nächsten Tag ab. Die Anfrage hatte keine rechtliche Wirkung; auch die bereits begonnene Angebotserstellung macht daraus keinen Kaufvertrag. Erst ein abgegebenes Angebot und dessen Annahme würden den Vertrag entstehen lassen.",
  "typische_fehler": "Die Anfrage wird als Bestellung behandelt oder die Auftragsbestätigung als Vertragsschluss angesehen. Außerdem wird der Prozess mit der Rechnung beendet, obwohl die Zahlung noch aussteht.",
  "verstaendnisfragen": [
    "Welche Belege kommen typischerweise vom Kunden? Anfrage und Bestellung.",
    "Wann ist der Auftragsprozess abgeschlossen? Mit dem Zahlungseingang."
  ],
  "pruefungsbezug": "Ordne zuerst die Belege den Prozessschritten und dem Ersteller zu. Prüfe danach, an welchem Punkt die Willenserklärungen den Vertrag bilden.",
  "merksatz": "Vom Kunden kommen Anfrage und Bestellung; der Betrieb bearbeitet Angebot, Bestätigung, Lieferung und Rechnung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Welcher Beleg wozu

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Belege dem richtigen Prozessschritt zuordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**M01:** Kein kompakter Absatz vorhanden. Erweiterte Erklärung darf dennoch angeboten werden; siehe Technikauftrag. Keine Dummyabsätze einfügen.

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Welcher Beleg wozu",
  "inhalt": [
    {
      "typ": "tabelle",
      "spalten": [
        "Beleg",
        "Von wem",
        "Enthält",
        "Rechtliche Wirkung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Anfrage",
            "Kunde",
            "Bedarf, Menge, Termin",
            "keine"
          ],
          "detail": "**Deshalb kostet eine Anfrage nichts** — weder Geld noch Bindung. Du darfst sie ignorieren, auch wenn das geschäftlich unklug wäre."
        },
        {
          "zellen": [
            "Angebot",
            "Betrieb",
            "Ware, Preis, Menge, Liefer- und Zahlungsbedingungen",
            "Antrag, bindend"
          ]
        },
        {
          "zellen": [
            "Bestellung",
            "Kunde",
            "Bezug auf das Angebot, Menge, Termin",
            "Annahme oder Antrag"
          ]
        },
        {
          "zellen": [
            "Auftragsbestätigung",
            "Betrieb",
            "alle vereinbarten Punkte",
            "Annahme oder Bestätigung"
          ]
        },
        {
          "zellen": [
            "Lieferschein",
            "Betrieb",
            "Menge und Art, keine Preise",
            "Nachweis der Lieferung"
          ],
          "detail": "**Warum keine Preise:** Der Lieferschein geht durch viele Hände — Spediteur, Poststelle, Lager. Preise gehen diese Beteiligten nichts an, und in Konzernen ist die Trennung sogar vorgeschrieben."
        },
        {
          "zellen": [
            "Rechnung",
            "Betrieb",
            "Pflichtangaben nach dem Umsatzsteuergesetz",
            "Zahlungsaufforderung"
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Kunde bestellt auf ein bindendes Angebot hin, ohne etwas zu ändern. Wann ist der Vertrag geschlossen?",
      "optionen": [
        {
          "text": "Mit dem Zugang der Bestellung",
          "richtig": true,
          "echo": "Richtig. Das Angebot war der Antrag, die unveränderte Bestellung ist die Annahme. Damit liegen zwei übereinstimmende Willenserklärungen vor — der Vertrag steht. Eine Auftragsbestätigung ist dann nur noch Höflichkeit und Dokumentation."
        },
        {
          "text": "Mit der Auftragsbestätigung",
          "richtig": false,
          "echo": "Ein verbreiteter Irrtum. Die Auftragsbestätigung wiederholt hier nur, was bereits gilt — der Vertrag ist mit der Bestellung entstanden. Rechtlich die Annahme ist sie nur, wenn kein bindendes Angebot vorausging."
        },
        {
          "text": "Mit der Lieferung",
          "richtig": false,
          "echo": "Die Lieferung ist die Erfüllung des Vertrags, nicht sein Abschluss. Wäre es anders, könnte sich niemand darauf verlassen, dass bestellte Ware auch kommt."
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
    "Ein Beleg dokumentiert einen anderen Sachverhalt als der nächste Beleg.",
    "Lieferung und Zahlung sind unterschiedliche Prozessschritte."
  ],
  "erklaerung": "Die Anfrage klärt den Bedarf, das Angebot nennt die Konditionen, die Bestellung erklärt den Kaufwunsch, und die Auftragsbestätigung dokumentiert die Annahme oder einen neuen Antrag. Der Lieferschein weist den Inhalt der Sendung nach, die Rechnung fordert die Zahlung. Der Lieferschein enthält bewusst keine Preise, weil er durch Lager, Transport und Warenannahme geht und nur die Vollständigkeit der Lieferung geprüft werden soll.",
  "beispiele": [
    "Bei einer Lieferung vergleicht der Empfänger den Lieferschein mit der tatsächlichen Menge; die Preise werden auf der separat versandten Rechnung geprüft.",
    "Der Zahlungseingang belegt den Abschluss der Zahlungsstufe, während der Lieferschein den Inhalt der Sendung dokumentiert."
  ],
  "fallbeispiel": "Ein Kunde meldet, dass auf dem Lieferschein kein Preis steht. Das ist kein Fehler: Der Lieferschein soll die Sendung nachweisen und enthält deshalb keine Preisinformationen. Für Preis, Steuer und Zahlungsziel ist die Rechnung der passende Beleg. Die Belege werden nicht vermischt, sondern nach ihrer Funktion geprüft.",
  "typische_fehler": "Lieferschein und Rechnung werden gleichgesetzt oder der Frachtbrief dem Käufer zugeordnet. Der Frachtbrief regelt das Verhältnis zum Frachtführer; der Lieferschein das Verhältnis von Verkäufer und Käufer hinsichtlich der Lieferung.",
  "verstaendnisfragen": [
    "Warum enthält der Lieferschein keine Preise? Damit die an der Lieferung beteiligten Stellen nur den Lieferumfang prüfen und keine Preisinformationen erhalten.",
    "Welcher Beleg fordert die Zahlung an? Die Rechnung."
  ],
  "pruefungsbezug": "Begründe jede Belegzuordnung mit seiner Funktion: Bedarf, Konditionen, Erklärung, Annahme, Sendungsinhalt, Zahlungsforderung oder Zahlung.",
  "merksatz": "Der Lieferschein beweist, was rausging; die Rechnung sagt, was dafür zu zahlen ist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Dein Platz im Prozess

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den eigenen Handlungsrahmen im Prozess einordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Dein Platz im Prozess",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Rahmenlehrplan verlangt ausdrücklich, den **eigenen Verantwortungsbereich und die eigenen Befugnisse** in diesem Prozess einzuordnen. Praktisch heißt das: Was darfst du selbst entscheiden, und wo musst du fragen?"
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Handlung",
        "Meist erlaubt",
        "Meist genehmigungspflichtig"
      ],
      "zeilen": [
        {
          "zellen": [
            "Anfrage beantworten",
            "Standardangebot aus dem System",
            "abweichende Konditionen"
          ]
        },
        {
          "zellen": [
            "Preis nennen",
            "Listenpreis",
            "Rabatt über den festgelegten Rahmen hinaus"
          ],
          "detail": "**Hier greift die Handlungsvollmacht aus Lernfeld 1:** Sie deckt die gewöhnlichen Geschäfte ab. Ein außergewöhnlicher Nachlass gehört nicht dazu — und wer ihn trotzdem zusagt, bindet den Betrieb möglicherweise gegenüber dem Kunden, muss sich aber intern verantworten."
        },
        {
          "zellen": [
            "Liefertermin zusagen",
            "aus der Verfügbarkeitsanzeige",
            "Zusage trotz fehlender Ware"
          ]
        },
        {
          "zellen": [
            "Auftrag annehmen",
            "im üblichen Rahmen",
            "Großaufträge, Neukunden ohne Bonität"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Wenn du unsicher bist, ob du etwas zusagen darfst, hilft eine Formulierung, die nichts verschenkt und trotzdem freundlich ist: „Das kläre ich und melde mich bis morgen Mittag zurück.“ Ein Rückruf mit Termin wirkt professioneller als eine schnelle Zusage, die zurückgenommen werden muss."
    },
    {
      "typ": "zuordnen",
      "lead": "Wer erstellt den Beleg?",
      "kategorien": [
        "Kunde",
        "Betrieb"
      ],
      "aufgaben": [
        {
          "text": "Angebot",
          "loesung": "Betrieb"
        },
        {
          "text": "Bestellung",
          "loesung": "Kunde"
        },
        {
          "text": "Lieferschein",
          "loesung": "Betrieb"
        },
        {
          "text": "Anfrage",
          "loesung": "Kunde"
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
    "Im Lernfeld 3 handelst du überwiegend auf Verkäuferseite.",
    "Eine Unterschrift braucht einen passenden Handlungsrahmen."
  ],
  "erklaerung": "Der eigene Platz im Auftragsprozess ergibt sich aus der Aufgabe und der erteilten Handlungsvollmacht. Wer im Zweifel nicht weiß, ob er ein Angebot abgeben, einen Auftrag bestätigen oder eine Lieferung freigeben darf, fragt nach. Die Beschaffungsseite — Anfrage an Lieferer und Einkauf — gehört in Lernfeld 4; hier wird die Verkaufsseite vom Kundenkontakt bis zur Zahlung betrachtet.",
  "beispiele": [
    "Ein Mitarbeiter nimmt eine Kundenanfrage auf und leitet sie für die Angebotserstellung weiter, ohne selbst außerhalb seiner Vollmacht einen Vertrag zu schließen.",
    "Vor einer verbindlichen Auftragsbestätigung wird geprüft, ob die Handlungsvollmacht diesen Vorgang umfasst; bei Unsicherheit wird nachgefragt."
  ],
  "fallbeispiel": "Eine Sachbearbeiterin soll eine Bestellung bestätigen, weiß aber nicht, ob sie dazu bevollmächtigt ist. Sie prüft zuerst ihren Handlungsrahmen. Fehlt die Sicherheit, fragt sie die zuständige Stelle oder den Vorgesetzten. So wird vermieden, dass eine unberechtigte Unterschrift den Betrieb bindet.",
  "typische_fehler": "Aus dem Bearbeiten eines Vorgangs wird automatisch eine Vertretungsmacht abgeleitet. Ebenso wird die Beschaffungsperspektive mit dem Verkaufsprozess vermischt.",
  "verstaendnisfragen": [
    "Woraus ergibt sich der eigene Handlungsrahmen? Aus der Handlungsvollmacht.",
    "Was ist bei unklarer Vollmacht zu tun? Vor der verbindlichen Erklärung nachfragen."
  ],
  "pruefungsbezug": "Ordne im Fall zuerst die Verkäuferperspektive und anschließend die Vollmacht ein. Eine saubere Prozesszuordnung ersetzt keine Prüfung der Unterschriftsbefugnis.",
  "merksatz": "Im Auftragsprozess weißt du nicht nur, welcher Beleg folgt, sondern auch, ob du ihn wirksam abgeben darfst."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Wie ein Vertrag entsteht

**Datei:** `lf3-k2-vertrag.kapitel.json` · SHA-256 `a8fc0473e84c5289ae5eface5e14fc3cc684298a06bef87c89a61e8163c2bf6c`

**Konkreter Kapitelauftrag:** Anfrage, verbindlichen Antrag und geänderte Annahme vergleichen; jede Rechtsfolge an den Voraussetzungen festmachen.

**Einordnung:** Zwei Sätze genügen — wenn sie zusammenpassen.

### b1 · Der Baustein: die Willenserklärung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Willenserklärung und Rechtsgeschäft erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Der Baustein: die Willenserklärung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jeder Vertrag besteht aus {{begriff:willenserklaerung|Willenserklärungen}} — Äußerungen, die auf eine Rechtsfolge gerichtet sind. Sie brauchen weder Schriftform noch Unterschrift. ==Ein Nicken an der Auktion, das Auflegen der Ware aufs Kassenband, das Einsteigen in den Bus== sind vollwertige Willenserklärungen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Form",
        "Beispiel",
        "Wirksam?"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ausdrücklich mündlich",
            "„Ich nehme die 200 Ordner.“",
            "ja"
          ]
        },
        {
          "zellen": [
            "Schriftlich",
            "unterschriebene Bestellung",
            "ja"
          ]
        },
        {
          "zellen": [
            "Durch schlüssiges Handeln",
            "Ware aufs Kassenband legen",
            "ja"
          ],
          "detail": "**Konkludentes Handeln nennt die Rechtssprache das.** Es zählt genauso wie das gesprochene Wort — deshalb kommt an der Supermarktkasse ein Kaufvertrag zustande, ohne dass jemand ein Wort sagt."
        },
        {
          "zellen": [
            "Schweigen",
            "keine Reaktion auf ein Angebot",
            "in der Regel nein"
          ],
          "detail": "**Die kaufmännische Ausnahme:** Nach {{par:hgb-362|§ 362 HGB}} kann Schweigen unter Kaufleuten in laufender Geschäftsverbindung als Zustimmung gelten. Für Verbraucher gilt das nie — unbestellte Ware muss niemand bezahlen."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Ein {{begriff:rechtsgeschaeft|Rechtsgeschäft}} besteht aus mindestens einer Willenserklärung. **Einseitig** wie Kündigung oder Testament, **zweiseitig** wie Kauf, Miete oder Arbeitsvertrag.",
      "karteikarte": "Was ist eine Willenserklärung, und in welchen Formen kann sie abgegeben werden?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ein Vertrag beruht auf übereinstimmenden Erklärungen.",
    "Eine Erklärung kann ausdrücklich oder durch schlüssiges Handeln abgegeben werden."
  ],
  "erklaerung": "Eine Willenserklärung kann mündlich, schriftlich oder durch schlüssiges Handeln erfolgen. Für einen Kaufvertrag braucht es Antrag und Annahme. Schweigen gilt grundsätzlich nicht als Zustimmung; unter Kaufleuten kann § 362 HGB eine Ausnahme bilden. Die rechtliche Wirkung wird deshalb aus Inhalt, Verhalten und Situation bestimmt, nicht allein aus einem unterschriebenen Dokument.",
  "beispiele": [
    "Eine Bestellung im Onlineshop ist eine ausdrückliche Willenserklärung; die Annahme kann durch eine passende Auftragsbestätigung erklärt werden.",
    "Wer eine Ware an der Kasse bezahlt und erhält, erklärt seinen Willen auch durch schlüssiges Handeln. Bloßes Schweigen ist dagegen grundsätzlich keine Annahme."
  ],
  "fallbeispiel": "Ein Kunde fragt telefonisch nur nach dem Preis und erhält noch kein Angebot. Aus der Frage allein folgt kein Vertrag, weil der Rechtsbindungswille nicht als Antrag feststeht. Erst eine hinreichend bestimmte Bestellung oder ein passendes Angebot mit Annahme bildet die erforderlichen Willenserklärungen.",
  "typische_fehler": "Jede Äußerung wird als Antrag gewertet oder Schweigen automatisch als Zustimmung. Auch eine Anfrage wird mit einer verbindlichen Bestellung verwechselt.",
  "verstaendnisfragen": [
    "Welche Formen kann eine Willenserklärung haben? Mündlich, schriftlich oder durch schlüssiges Handeln.",
    "Ist Schweigen grundsätzlich eine Annahme? Nein; es gibt nur besondere Ausnahmen, etwa unter Kaufleuten nach § 362 HGB."
  ],
  "pruefungsbezug": "Markiere in Fällen die konkrete Handlung und frage, ob sie als Antrag, Annahme, bloße Anfrage oder Schweigen einzuordnen ist.",
  "merksatz": "Vertragserklärungen können unterschiedlich aussehen; entscheidend sind Inhalt und erkennbarer Rechtsbindungswille."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Antrag und Annahme

**Status:** Pilot eingebaut; fachliche Gegenprüfung 28.10., technische Restpunkte offen. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das Zustandekommen eines Kaufvertrags nachvollziehen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Antrag und Annahme",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:kaufvertrag|Kaufvertrag}} entsteht aus genau zwei Willenserklärungen: {{begriff:antrag|Antrag}} und {{begriff:annahme|Annahme}}. Nach {{par:bgb-145|§ 145 BGB}} ist der Antragende an seinen Antrag gebunden — er kann ihn nicht einfach zurückziehen, wenn ihm der Preis nachträglich zu niedrig erscheint."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Zwei Erklärungen",
      "titel": "So entsteht der Vertrag",
      "lead": "Vier Schritte, und der Vertrag steht. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Antrag",
          "satz": "§ 145 BGB · bindend",
          "text": "Eine Willenserklärung, die so bestimmt ist, dass ein schlichtes Ja zum Vertrag führt. Ware, Menge und Preis müssen also feststehen. „Was kosten Ordner?“ ist kein Antrag, sondern eine Anfrage."
        },
        {
          "nr": 2,
          "titel": "Bindungsfrist läuft",
          "satz": "§ 147 BGB",
          "text": "Unter Anwesenden muss sofort angenommen werden. Unter Abwesenden so lange, wie der Antragende mit einer Antwort rechnen darf — bei einer Mail also Tage, nicht Wochen. Eine ausdrücklich genannte Frist geht immer vor."
        },
        {
          "nr": 3,
          "titel": "Annahme",
          "satz": "muss vollständig entsprechen",
          "text": "Jede Abweichung — andere Menge, anderer Termin, anderer Preis — gilt als Ablehnung verbunden mit einem neuen Antrag. Dann dreht sich die Rollenverteilung um."
        },
        {
          "nr": 4,
          "titel": "Vertrag",
          "satz": "§ 433 BGB",
          "text": "Beide Erklärungen stimmen überein, der Vertrag ist geschlossen. Der Verkäufer schuldet Übergabe und Eigentumsverschaffung, der Käufer Zahlung und Abnahme."
        }
      ],
      "regel": "Merksatz: Wer abweicht, nimmt nicht an — er macht ein neues Angebot. Damit wandert die Bindung auf die andere Seite."
    },
    {
      "typ": "achtung",
      "text": "Verwechsle nicht **Vertragsschluss** und **Eigentumsübergang**. Der Vertrag verpflichtet nur; das Eigentum geht erst mit Einigung und Übergabe über. Deshalb gehört gelieferte, aber noch nicht bezahlte Ware unter Eigentumsvorbehalt weiterhin dem Verkäufer."
    },
    {
      "typ": "check",
      "frage": "Du bietest 200 Ordner zu 3,50 € an. Der Kunde bestellt 200 Ordner zu 3,20 €. Was ist passiert?",
      "optionen": [
        {
          "text": "Der Vertrag ist zu 3,20 € geschlossen",
          "richtig": false,
          "echo": "Dafür fehlt deine Zustimmung. Eine Annahme muss dem Antrag vollständig entsprechen — beim Preis ändert sich das nicht."
        },
        {
          "text": "Der Vertrag ist zu 3,50 € geschlossen",
          "richtig": false,
          "echo": "Auch das nicht. Der Kunde hat dein Angebot gerade nicht angenommen, sondern abgelehnt."
        },
        {
          "text": "Kein Vertrag — die Bestellung ist ein neuer Antrag",
          "richtig": true,
          "echo": "Richtig. Die Abweichung beim Preis macht aus der Annahme eine Ablehnung verbunden mit einem neuen Antrag. Jetzt bist du am Zug: Nimmst du an, gilt 3,20 €. Schweigst du, kommt in der Regel kein Vertrag zustande."
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
  "darstellung": "vollfassung",
  "ziel": "Du kannst eine unveränderte Annahme von einem neuen Antrag unterscheiden und dein Ergebnis an den konkreten Erklärungen begründen.",
  "vorwissen_kurz": "Im vereinfachten Grundfall handeln beide Seiten wirksam und mit ausreichender Vertretungsmacht, die Erklärungen sind eindeutig und gehen rechtzeitig zu, und das Angebot enthält die wesentlichen Bedingungen. Streit über AGB, Schweigen oder kaufmännische Bestätigungsschreiben ist nicht Teil dieses Falls.",
  "inhalt": [
    {
      "typ": "zwischentitel",
      "id": "b-warum",
      "text": "Warum eine Antwort noch keine Annahme sein muss"
    },
    {
      "typ": "absatz",
      "id": "b-warum-1",
      "text": "Ein Vertrag setzt zwei übereinstimmende {{begriff:willenserklaerung|Willenserklärungen}} voraus. Der {{begriff:antrag|Antrag}} beschreibt ein Geschäft so bestimmt, dass die andere Seite es mit einem schlichten Ja annehmen kann; wer ihn abgibt, ist nach {{par:bgb-145|§ 145 BGB}} daran gebunden. Entscheidend ist nicht, dass zwei Schreiben ähnlich aussehen oder beide Seiten grundsätzlich handeln möchten. Sie müssen sich über **dasselbe** Geschäft einig sein."
    },
    {
      "typ": "absatz",
      "id": "b-warum-2",
      "text": "Ein verbindliches Angebot ist deshalb etwas anderes als eine Frage nach Preisen. Mit „Was würden 100 Hoodies kosten?“ erkundigt sich ein Kunde zunächst — das ist eine {{begriff:anfrage|Anfrage}}. Mit einem eindeutig verbindlichen Angebot werden dagegen bestimmte Bedingungen zum Vertragsschluss vorgeschlagen. Die Überschrift eines Schreibens kann ein Hinweis sein; ausschlaggebend bleibt sein Inhalt."
    },
    {
      "typ": "basis",
      "id": "b-kette",
      "ref": "grafik-1"
    },
    {
      "typ": "zwischentitel",
      "id": "b-grundfall",
      "text": "Der Grundfall: eine eindeutige Zustimmung"
    },
    {
      "typ": "absatz",
      "id": "b-grundfall-1",
      "text": "MAKEL bietet einer Agentur verbindlich 100 genau bezeichnete Hoodies für 40 € netto je Stück an (fiktive Übungsdaten), mit einer Annahmefrist bis Freitag und einem bestimmten Liefertermin. Die Agentur antwortet am Mittwoch: „Wir nehmen Ihr Angebot über 100 Hoodies unverändert an.“ Die Antwort geht MAKEL am selben Tag zu. Sie kommt innerhalb der Frist ({{par:bgb-148|§ 148 BGB}}) und deckt sich inhaltlich mit dem Antrag. Die Erklärungen stimmen überein — der Vertrag ist geschlossen."
    },
    {
      "typ": "zwischentitel",
      "id": "b-vergleich",
      "text": "Der Vergleichsfall: Zustimmung mit anderer Menge"
    },
    {
      "typ": "absatz",
      "id": "b-vergleich-1",
      "text": "Die Agentur antwortet stattdessen: „Wir bestellen 120 Hoodies zu den angebotenen Bedingungen.“ Jetzt passt die Menge nicht mehr zum Antrag über 100 Stück. Nach {{par:bgb-150|§ 150 Abs. 2 BGB}} gilt eine solche Antwort als Ablehnung, verbunden mit einem neuen Antrag. MAKEL muss erst entscheiden, ob es 120 Stück zu diesen Bedingungen liefern möchte. Erst wenn MAKEL diesen neuen Antrag annimmt, gibt es einen Vertrag über 120 Stück."
    },
    {
      "typ": "tabelle",
      "id": "b-tabelle",
      "spalten": [
        "Erklärung der Agentur",
        "Einordnung im beschriebenen Fall",
        "Was folgt?"
      ],
      "zeilen": [
        {
          "zellen": [
            "„100 Stück, unverändert wie angeboten“",
            "Rechtzeitige Annahme",
            "Vertrag über 100 Stück"
          ]
        },
        {
          "zellen": [
            "„120 Stück zu diesen Bedingungen“",
            "Abändernde Antwort = Ablehnung + neuer Antrag",
            "Noch kein Vertrag; MAKEL entscheidet"
          ]
        },
        {
          "zellen": [
            "„Könnten Sie alternativ auch 120 Stück anbieten?“",
            "Nachfrage ohne eindeutige Annahme",
            "Inhalt klären; nicht als Auftrag erfassen"
          ]
        }
      ]
    },
    {
      "typ": "zwischentitel",
      "id": "b-begruenden",
      "text": "So begründest du dein Ergebnis"
    },
    {
      "typ": "liste",
      "id": "b-schritte",
      "nummeriert": true,
      "punkte": [
        "Den ursprünglichen Antrag benennen: Wer schlägt wem welches Geschäft vor?",
        "Prüfen, ob die Antwort rechtzeitig kommt — innerhalb einer gesetzten Frist oder der regelmäßigen Antwortzeit ({{par:bgb-147|§ 147 BGB}}).",
        "Antwort und Antrag Punkt für Punkt vergleichen: Ware, Menge, Preis, Ausführung, Termin, sonstige Bedingungen.",
        "Mit einem konkreten Ergebnis schließen: Ist der Vertrag geschlossen — oder wer muss noch welche Erklärung abgeben?"
      ]
    },
    {
      "typ": "absatz",
      "id": "b-begruenden-1",
      "text": "Das ist hilfreicher als der Satz „Eine Auftragsbestätigung macht den Vertrag.“ Ob eine Bestätigung etwas annimmt, etwas ändert oder nur einen bereits geschlossenen Vertrag dokumentiert, hängt vom vorherigen Ablauf und von ihrem Inhalt ab."
    }
  ],
  "details": [
    {
      "id": "b-anfrage",
      "kategorie": "grundlagen",
      "titel": "Anfrage und Antrag",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "b-anfrage-1",
          "text": "Eine Anfrage soll Informationen beschaffen und zeigt im gewöhnlichen Fall noch keinen Bindungswillen. Ein Antrag ist dagegen auf den Abschluss eines bestimmten Vertrags gerichtet. Deshalb darf ein Fall nicht erst „MAKEL fragt an“ schreiben und diese Erklärung anschließend ohne weitere Angaben als verbindlichen Antrag behandeln. Ist der Wortlaut mehrdeutig, braucht es Auslegung oder zusätzliche Angaben zum Sachverhalt."
        }
      ]
    },
    {
      "id": "b-frist",
      "kategorie": "vergleich",
      "titel": "Die Annahmefrist ist verpasst",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "b-frist-1",
          "text": "Ein ausdrücklich bis Freitag befristetes Angebot kann nicht beliebig lange angenommen werden ({{par:bgb-148|§ 148 BGB}}). Antwortet die Agentur erst am Montag, gilt ihre Annahme als neuer Antrag ({{par:bgb-150|§ 150 Abs. 1 BGB}}) — MAKEL kann ihn annehmen, muss aber nicht. Sonderregeln, etwa wenn eine rechtzeitig abgeschickte Antwort unerwartet lange unterwegs war, gehören in einen eigenen, fortgeschrittenen Fall."
        }
      ]
    },
    {
      "id": "b-schweigen",
      "kategorie": "sonderfall",
      "titel": "Darf die Agentur einfach schweigen?",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "b-schweigen-1",
          "text": "Im hier beschriebenen gewöhnlichen Fall ersetzt Schweigen keine Annahme. Daraus folgt aber keine grenzenlose Regel für jede kaufmännische Konstellation: Stellt ein Fall auf eine laufende Geschäftsverbindung unter Kaufleuten oder ein kaufmännisches Bestätigungsschreiben ab, muss genau dieser zusätzliche Sachverhalt geprüft werden."
        }
      ]
    },
    {
      "id": "b-auftrag",
      "kategorie": "zusammenhang",
      "titel": "Vertrag und Auftragsbearbeitung",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "b-auftrag-1",
          "text": "Ein sauber erfasster Auftrag braucht eine gesicherte Vertragsgrundlage. Sonst bereitet die Produktion 120 Stück vor, obwohl MAKEL nur 100 Stück angeboten hat. Die rechtliche Prüfung vermeidet damit unmittelbar organisatorische Fehler."
        },
        {
          "typ": "verweis",
          "id": "b-auftrag-2",
          "text": "Weiterlesen:",
          "ziele": [
            "k4"
          ]
        }
      ]
    }
  ],
  "verstaendnisfragen": [
    {
      "id": "b1",
      "frage": "Warum führt „120 statt 100“ nicht automatisch zu einem Vertrag über 120 Stück?",
      "antwort": "Weil MAKEL nur 100 Stück angeboten hat. Die abweichende Antwort ist eine Ablehnung, verbunden mit einem neuen Antrag. MAKEL muss diesen erst annehmen; die bloße Ähnlichkeit der Bedingungen ersetzt die Zustimmung nicht."
    },
    {
      "id": "b2",
      "frage": "Welche drei Punkte prüfst du, bevor du ein Ergebnis nennst?",
      "antwort": "Den ursprünglichen Antrag, die inhaltliche Übereinstimmung der Antwort und die Rechtzeitigkeit nach der gesetzten oder der regelmäßigen Annahmefrist. Die im Grundfall vorausgesetzte Wirksamkeit und Vertretungsmacht bleiben als Voraussetzung im Blick."
    }
  ],
  "quellen": [
    {
      "titel": "§§ 145, 147, 148, 150 BGB",
      "url": "https://www.gesetze-im-internet.de/bgb/__150.html",
      "bezug": "Bindung, Annahmefrist, verspätete und abändernde Annahme; Wortlaut geprüft am 28.10.2026"
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

### b3 · Wer darf überhaupt?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Geschäftsfähigkeit prüfen und Folgen ableiten

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wer darf überhaupt?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine Willenserklärung wirkt nur, wenn derjenige {{begriff:geschaeftsfaehigkeit|geschäftsfähig}} ist. Das Gesetz kennt drei Stufen — und die mittlere ist die, mit der du im Betrieb tatsächlich zu tun hast."
    },
    {
      "typ": "grafik",
      "variante": "staffel",
      "kopf": "Drei Stufen",
      "titel": "Geschäftsfähigkeit nach Alter",
      "lead": "Trag ein Alter ein und sieh, was gilt.",
      "eingaben": {
        "jahre": {
          "label": "Alter der Person in Jahren",
          "start": 16
        }
      },
      "stufen": [
        {
          "ab": 0,
          "frist": "geschäftsunfähig",
          "termin": "§ 104 BGB — Erklärungen sind nichtig",
          "monate": 0
        },
        {
          "ab": 7,
          "frist": "beschränkt geschäftsfähig",
          "termin": "§ 106 BGB — schwebend unwirksam ohne Einwilligung",
          "monate": 2
        },
        {
          "ab": 18,
          "frist": "voll geschäftsfähig",
          "termin": "unbeschränkt wirksam",
          "monate": 5
        }
      ],
      "regel": "Beschränkt geschäftsfähig heißt: Der Vertrag ist schwebend unwirksam. Er wird rückwirkend wirksam, wenn die Eltern zustimmen — und endgültig unwirksam, wenn sie es verweigern."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Fall",
        "Regel",
        "Ergebnis"
      ],
      "zeilen": [
        {
          "zellen": [
            "Lediglich rechtlicher Vorteil",
            "{{par:bgb-107|§ 107 BGB}}",
            "wirksam ohne Zustimmung"
          ],
          "detail": "**Ein echtes Geschenk ist wirksam** — der Minderjährige bekommt etwas, ohne eine Pflicht zu übernehmen. Sobald er etwas zahlen oder pflegen muss, ist es kein lediglich rechtlicher Vorteil mehr."
        },
        {
          "zellen": [
            "Mit Einwilligung der Eltern",
            "{{par:bgb-107|§ 107 BGB}}",
            "wirksam"
          ]
        },
        {
          "zellen": [
            "Vollständig mit Taschengeld bezahlt",
            "{{par:bgb-110|§ 110 BGB}}",
            "wirksam"
          ],
          "detail": "**Der Taschengeldparagraf greift erst, wenn tatsächlich bezahlt wurde** — und zwar vollständig. Eine Ratenzahlung aus dem Taschengeld reicht nicht, solange noch etwas offen ist."
        },
        {
          "zellen": [
            "Ohne Zustimmung, auf Rechnung",
            "{{par:bgb-106|§ 106 BGB}}",
            "schwebend unwirksam"
          ]
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Wirksam oder nicht?",
      "kategorien": [
        "Wirksam",
        "Schwebend unwirksam",
        "Nichtig"
      ],
      "aufgaben": [
        {
          "text": "Ein 15-Jähriger kauft ein Buch und bezahlt bar mit seinem Taschengeld.",
          "loesung": "Wirksam"
        },
        {
          "text": "Ein 5-Jähriger bestellt online ein Spielzeug.",
          "loesung": "Nichtig"
        },
        {
          "text": "Ein 16-Jähriger schließt ohne Zustimmung der Eltern einen Handyvertrag ab.",
          "loesung": "Schwebend unwirksam"
        },
        {
          "text": "Ein 17-Jähriger bekommt ein Fahrrad geschenkt.",
          "loesung": "Wirksam"
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
    "Geschäftsfähigkeit hängt vom Alter ab.",
    "Minderjährige können nicht jeden Vertrag allein wirksam schließen."
  ],
  "erklaerung": "Unter sieben Jahren sind Willenserklärungen nichtig. Von sieben bis 17 Jahren besteht beschränkte Geschäftsfähigkeit; ab 18 ist sie unbeschränkt. Ein Vertrag eines beschränkt Geschäftsfähigen, der nicht lediglich rechtlich vorteilhaft ist, kann zunächst schwebend unwirksam sein. Der Taschengeldparagraf § 110 BGB greift, wenn vollständig mit eigenen Mitteln bezahlt wurde.",
  "beispiele": [
    "Ein 16-Jähriger bestellt Büromaterial auf Rechnung. Weil nicht vollständig mit eigenen Mitteln bezahlt wurde, hilft § 110 BGB nicht; die Zustimmung der Eltern ist relevant.",
    "Ein Kauf, den ein Minderjähriger vollständig mit eigenen Mitteln bezahlt, kann nach § 110 BGB wirksam sein."
  ],
  "fallbeispiel": "Ein 16-jähriger Azubi bestellt Büromaterial für 89 € auf Rechnung. Er ist beschränkt geschäftsfähig und der Kauf ist nicht lediglich rechtlich vorteilhaft. Weil die Ware nicht vollständig mit eigenen Mitteln bezahlt wurde, greift § 110 BGB nicht. Verweigern die Eltern die Zustimmung, ist der Vertrag endgültig unwirksam; bereits gelieferte Ware muss zurückgegeben werden.",
  "typische_fehler": "Die Altersgrenzen werden vermischt oder jede Zahlung eines Minderjährigen als Taschengeldfall behandelt. Entscheidend ist, ob vollständig mit eigenen Mitteln bezahlt wurde und ob der Vertrag rechtlich vorteilhaft ist.",
  "verstaendnisfragen": [
    "Welche Altersstufen gelten? Unter 7 nichtig, 7 bis 17 beschränkt geschäftsfähig, ab 18 unbeschränkt geschäftsfähig.",
    "Wann kann § 110 BGB helfen? Wenn der Minderjährige die Leistung vollständig mit eigenen Mitteln bewirkt hat."
  ],
  "pruefungsbezug": "Notiere bei Minderjährigen zuerst Alter, dann Vertragsart, eigene Zahlung und Zustimmung des gesetzlichen Vertreters.",
  "merksatz": "Alter prüfen, eigene Zahlung prüfen, Zustimmung prüfen — erst dann steht die Wirksamkeit fest."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Anfrage und Angebot

**Datei:** `lf3-k3-angebot.kapitel.json` · SHA-256 `e3a79f7959a2b2061f8e0b29f04b32e11a0fa6a1439405046eca4aa536af108e`

**Konkreter Kapitelauftrag:** Aus einer konkreten Anfrage ein vergleichbares Angebot erstellen; Prozentrechnung, Preisbasis und Angebotsarten erklären.

**Einordnung:** Was drinstehen muss — und wie du dich aus der Bindung nimmst.

### c1 · Die Anfrage

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Anfragearten unterscheiden und beantworten

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Die Anfrage",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine {{begriff:anfrage|Anfrage}} kostet nichts und verpflichtet niemanden — aber sie ist der Moment, in dem ein Kunde entscheidet, ob er weitermacht. ==Wie schnell und wie genau du antwortest, ist deshalb ein Verkaufsargument==, lange bevor über Preise gesprochen wird."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Was der Kunde will",
        "Deine Antwort"
      ],
      "zeilen": [
        {
          "zellen": [
            "Allgemeine Anfrage",
            "Überblick über das Sortiment",
            "Katalog, Preisliste, Prospekt"
          ],
          "detail": "**Hier ist noch nichts entschieden.** Der Kunde sondiert. Ein Katalog ist rechtlich kein Angebot, sondern eine Aufforderung, selbst eines abzugeben — sonst wäre jeder Anbieter an jeden gedruckten Preis gebunden."
        },
        {
          "zellen": [
            "Bestimmte Anfrage",
            "konkrete Ware, Menge, Termin",
            "individuelles Angebot"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Katalog, Prospekt und Schaufenster sind **keine** Angebote im Rechtssinn, sondern Aufforderungen zur Abgabe eines Angebots. Erst dein individuelles Angebot bindet dich.",
      "karteikarte": "Warum ist ein Katalog rechtlich kein Angebot?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Eine Anfrage erkundet Waren, Mengen oder Konditionen.",
    "Nicht jede Anfrage enthält schon einen verbindlichen Kaufwillen."
  ],
  "erklaerung": "Die allgemeine Anfrage bittet um einen Überblick, etwa durch Katalog oder Preisliste. Die bestimmte Anfrage nennt konkrete Ware, Menge und Termin und führt typischerweise zu einem individuellen Angebot. Katalog, Prospekt und Schaufenster sind keine Angebote im Rechtssinn, sondern Aufforderungen, selbst ein Angebot abzugeben.",
  "beispiele": [
    "‚Bitte senden Sie uns Ihren Katalog‘ ist eine allgemeine Anfrage; die passende Antwort sind Katalog, Preisliste oder Prospekt.",
    "‚Wir benötigen 200 Ordner bis zum 15. September‘ ist eine bestimmte Anfrage; daraus wird ein individuelles Angebot erstellt."
  ],
  "fallbeispiel": "Eine Kundin bittet telefonisch um ein Angebot über 200 Ordner und sagt am nächsten Tag ab. Die Anfrage war rechtlich unverbindlich und hat keinen Kaufvertrag begründet. Dass der Betrieb bereits Arbeit in die Angebotserstellung gesteckt hat, ändert die Einordnung nicht.",
  "typische_fehler": "Ein Katalog wird als bindendes Angebot behandelt oder eine allgemeine Anfrage mit einer Bestellung gleichgesetzt. Entscheidend ist, ob bereits eine bestimmte, rechtlich bindende Erklärung vorliegt.",
  "verstaendnisfragen": [
    "Was unterscheidet allgemeine und bestimmte Anfrage? Die bestimmte Anfrage nennt konkrete Ware, Menge und Termin; die allgemeine bittet nur um Überblick.",
    "Warum ist ein Katalog kein Angebot? Weil er zur Abgabe eines eigenen Angebots auffordert und den Anbieter nicht an jeden gedruckten Preis bindet."
  ],
  "pruefungsbezug": "Markiere konkrete Angaben zu Ware, Menge und Termin. Fehlen sie, spricht das für eine allgemeine Anfrage; vorhanden sind sie, folgt meist ein individuelles Angebot.",
  "merksatz": "Die Anfrage eröffnet den Verkauf, bindet aber noch niemanden."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Was ins Angebot gehört

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ein vollständiges Angebot aufbauen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Was ins Angebot gehört",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:angebot|Angebot}} muss so bestimmt sein, dass ein schlichtes Ja genügt. Fehlt eine wesentliche Angabe, kommt kein Vertrag zustande — sondern eine Rückfrage, und damit Verzögerung."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Angabe",
        "Warum sie nötig ist"
      ],
      "zeilen": [
        {
          "zellen": [
            "Art und Güte der Ware",
            "Ohne genaue Bezeichnung ist unklar, worüber Einigkeit besteht"
          ]
        },
        {
          "zellen": [
            "Menge",
            "Bestimmt Preis und Lieferfähigkeit"
          ]
        },
        {
          "zellen": [
            "Preis",
            "Netto, zuzüglich Umsatzsteuer, mit Rabatten"
          ]
        },
        {
          "zellen": [
            "Liefer- und Zahlungsbedingungen",
            "Wer trägt Fracht, wann ist zu zahlen"
          ]
        },
        {
          "zellen": [
            "Liefertermin",
            "Datum oder Frist ab Bestellung"
          ]
        },
        {
          "zellen": [
            "Bindungsfrist",
            "Bis wann gilt das Angebot"
          ],
          "detail": "**Der am häufigsten vergessene Punkt.** Ohne eigene Frist gilt § 147 BGB — also die Zeit, in der du mit einer Antwort rechnen darfst. Das ist unbestimmt und im Streitfall Auslegungssache. Eine Zeile wie „gültig bis 31.08.“ erspart dir das."
        },
        {
          "zellen": [
            "Erfüllungsort und Gerichtsstand",
            "meist über die AGB geregelt"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Rechne das Angebot nicht frei Hand. Der Weg vom Einstandspreis zum Angebotspreis ist die Handelskalkulation, die in Lernfeld 6 ausführlich drankommt — Selbstkosten, Gewinnzuschlag, dann Kundenskonto und Kundenrabatt im Hundert aufschlagen. Wer den Rabatt einfach draufrechnet statt dividiert, verschenkt bei jedem Auftrag Geld."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c2",
  "vorauswissen": [
    "Ein Angebot muss so bestimmt sein, dass ein schlichtes Ja genügt.",
    "Preis und Lieferumfang müssen für beide Seiten erkennbar sein."
  ],
  "erklaerung": "Ein vollständiges Angebot enthält Art und Güte der Ware, Menge, Preis einschließlich Rabatten und Umsatzsteuer, Liefer- und Zahlungsbedingungen, Liefertermin und Bindungsfrist. Erfüllungsort und Gerichtsstand können über AGB geregelt sein. Fehlt eine wesentliche Angabe, ist eine Rückfrage nötig; die Erklärung ist nicht so bestimmt, dass ein einfaches Ja den Vertrag bilden kann.",
  "beispiele": [
    "Bei 200 Ordnern werden Bezeichnung, Menge, Preis, Liefertermin und Zahlungsbedingung ausdrücklich genannt.",
    "Eine Bindungsfrist wie ‚gültig bis 31.08.‘ schafft Klarheit darüber, wie lange der Kunde annehmen kann."
  ],
  "fallbeispiel": "Ein Angebot nennt Ware und Menge, lässt aber den Liefertermin und die Bindungsfrist offen. Vor der Annahme wird die Angebotsvorlage ergänzt. So sind die Konditionen bestimmt und der Betrieb weiß, wie lange die Bindung läuft. Die Bindungsfrist verhindert, dass die Antwortzeit allein aus den Umständen ausgelegt werden muss.",
  "typische_fehler": "Rabatte werden einfach zum Preis addiert oder der Liefertermin nicht genannt. Häufig fehlt außerdem die Bindungsfrist, obwohl der Betrieb die Dauer der Bindung steuern möchte.",
  "verstaendnisfragen": [
    "Welche Angaben müssen mindestens geprüft werden? Art und Güte, Menge, Preis, Liefer- und Zahlungsbedingungen, Termin und Bindungsfrist.",
    "Warum ist eine Bindungsfrist praktisch wichtig? Sie legt fest, bis wann der Kunde das Angebot annehmen kann."
  ],
  "pruefungsbezug": "Nutze bei Fehlersuchen eine Checkliste und prüfe besonders Preisbestandteile, Termin und Frist. Begründe jede fehlende Angabe mit ihrer rechtlichen oder organisatorischen Funktion.",
  "merksatz": "Ein Angebot muss so vollständig sein, dass ein Ja ohne Rückfrage möglich ist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · Gebunden oder nicht

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bindung und Freizeichnung beurteilen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "Gebunden oder nicht",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Nach {{par:bgb-145|§ 145 BGB}} bist du an dein Angebot gebunden — es sei denn, du schließt die Bindung aus. Genau dafür gibt es die {{begriff:freizeichnungsklausel|Freizeichnungsklausel}}. Sie ist kein Trick, sondern schlicht nötig, wenn du nicht garantieren kannst, dass die Ware noch da ist."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Angebotsarten",
      "titel": "Bindend oder freibleibend",
      "lead": "Derselbe Text, ein Zusatz — und die Rollen tauschen.",
      "seiten": [
        {
          "name": "Bindendes Angebot",
          "ton": "gold",
          "punkte": [
            {
              "text": "Der Regelfall nach § 145 BGB",
              "detail": "Wer nichts dazuschreibt, ist gebunden. Das gilt auch dann, wenn dir hinterher auffällt, dass du dich verkalkuliert hast."
            },
            {
              "text": "Die Bestellung ist die Annahme",
              "detail": "Bestellt der Kunde unverändert, steht der Vertrag sofort — ohne dass du noch etwas tun musst."
            },
            {
              "text": "Du musst liefern können",
              "detail": "Deshalb vor Abgabe die Verfügbarkeit prüfen. Ein bindendes Angebot über Ware, die es nicht mehr gibt, führt geradewegs in die Vertragsstörung."
            },
            {
              "text": "Bindung endet mit der Frist",
              "detail": "Mit eigener Frist zum genannten Datum, ohne eigene Frist nach § 147 BGB."
            }
          ]
        },
        {
          "name": "Freibleibendes Angebot",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Zusatz wie freibleibend, unverbindlich, Preis freibleibend",
              "detail": "Auch „solange der Vorrat reicht“ oder „Zwischenverkauf vorbehalten“ wirken so. Der Zusatz muss deutlich sein, nicht im Kleingedruckten versteckt."
            },
            {
              "text": "Rechtlich kein Antrag",
              "detail": "Es ist nur eine Aufforderung, selbst ein Angebot abzugeben — wie der Katalog."
            },
            {
              "text": "Die Bestellung wird zum Antrag",
              "detail": "Damit dreht sich die Bindung um: Jetzt ist der Kunde gebunden und wartet auf deine Annahme."
            },
            {
              "text": "Du musst unverzüglich reagieren",
              "detail": "Willst du nicht annehmen, sag ab. Unter Kaufleuten in laufender Geschäftsverbindung kann Schweigen sonst nach § 362 HGB als Zustimmung gelten."
            }
          ]
        }
      ],
      "regel": "Die Faustregel für den Alltag: Ist die Ware sicher da, biete bindend an — das ist verbindlicher und verkauft besser. Ist sie es nicht, zeichne dich frei."
    },
    {
      "typ": "check",
      "frage": "Dein Angebot enthält den Zusatz „freibleibend“. Der Kunde bestellt daraufhin. Wer ist jetzt gebunden?",
      "optionen": [
        {
          "text": "Du, weil du das Angebot gemacht hast",
          "richtig": false,
          "echo": "Gerade nicht. Durch die Freizeichnung war dein Schreiben rechtlich kein Antrag, sondern nur eine Aufforderung, selbst eines abzugeben."
        },
        {
          "text": "Der Kunde, seine Bestellung ist der Antrag",
          "richtig": true,
          "echo": "Richtig. Beim freibleibenden Angebot dreht sich die Rollenverteilung um: Die Bestellung ist der Antrag, der Kunde ist daran gebunden und wartet auf deine Annahme. Achtung: Reagierst du unter Kaufleuten in laufender Geschäftsverbindung gar nicht, kann dein Schweigen nach § 362 HGB als Annahme gelten."
        },
        {
          "text": "Niemand, es fehlt eine Willenserklärung",
          "richtig": false,
          "echo": "Die Bestellung ist sehr wohl eine Willenserklärung — sie ist nur der Antrag statt der Annahme."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Bindendes Angebot oder nicht?",
      "kategorien": [
        "Bindend",
        "Nicht bindend"
      ],
      "aufgaben": [
        {
          "text": "Individuelles Angebot über 200 Ordner zu 3,50 €, gültig bis 31.08.",
          "loesung": "Bindend"
        },
        {
          "text": "Preisliste im Katalog",
          "loesung": "Nicht bindend"
        },
        {
          "text": "Angebot mit dem Zusatz „solange der Vorrat reicht“",
          "loesung": "Nicht bindend"
        },
        {
          "text": "Schriftliches Angebot ohne weiteren Zusatz",
          "loesung": "Bindend"
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
    "Ein Antragender ist nach § 145 BGB grundsätzlich gebunden.",
    "Die Bindung kann durch eine Freizeichnung eingeschränkt werden."
  ],
  "erklaerung": "Ohne Zusatz ist ein Angebot grundsätzlich bindend. Formulierungen wie ‚freibleibend‘ oder ‚solange der Vorrat reicht‘ schließen die Bindung aus. Beim freibleibenden Angebot wird die Bestellung des Kunden zum Antrag; der Vertrag entsteht erst durch die Annahme des Verkäufers. Eine eindeutige Reaktion bleibt wichtig, weil unter Kaufleuten § 362 HGB eine besondere Bedeutung des Schweigens haben kann.",
  "beispiele": [
    "Ein bindendes Angebot ohne eigene Frist kann nach § 147 BGB nur so lange angenommen werden, wie unter regelmäßigen Umständen mit einer Antwort zu rechnen ist.",
    "Bei ‚freibleibend‘ ist der Kunde nach seiner Bestellung gebunden, während der Verkäufer erst mit seiner Annahme den Vertrag schließt."
  ],
  "fallbeispiel": "Ein bindendes Angebot wird per E-Mail versandt, der Kunde meldet sich erst nach drei Wochen. Eine eigene Frist fehlt, daher wird § 147 BGB geprüft. Bei einer E-Mail sind regelmäßig wenige Tage, nicht drei Wochen, zu erwarten. Die Bindung ist erloschen; die verspätete Bestellung ist ein neuer Antrag, den der Betrieb annehmen kann, aber nicht muss.",
  "typische_fehler": "‚Freibleibend‘ wird als besonders verbindliches Angebot verstanden oder eine Bestellung automatisch als Vertrag behandelt. Außerdem wird eine verspätete Annahme nicht mit der regelmäßigen Antwortzeit verglichen.",
  "verstaendnisfragen": [
    "Was bewirkt ‚freibleibend‘? Die Bindung des Anbieters wird ausgeschlossen; die Bestellung wird zum Antrag des Kunden.",
    "Was gilt ohne eigene Bindungsfrist? Die regelmäßige Antwortzeit nach § 147 BGB."
  ],
  "pruefungsbezug": "Suche zuerst nach Freizeichnungszusätzen, dann nach einer eigenen Frist. Fehlt beides, prüfe die regelmäßige Antwortzeit und ordne eine verspätete Erklärung als neuen Antrag ein.",
  "merksatz": "Ohne Freizeichnung bindet das Angebot; mit ‚freibleibend‘ bindet sich zunächst der bestellende Kunde."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Bestellung und Auftragsbestätigung

**Datei:** `lf3-k4-bestellung.kapitel.json` · SHA-256 `59e08ccd07e9030a875ece2d20b3cf91e52e186fd244fe4ef4eab444131ea6fa`

**Konkreter Kapitelauftrag:** Eine Bestellung mit abweichender Auftragsbestätigung prüfen; kaufmännische Dokumente und rechtliche Erklärungen trennen.

**Einordnung:** Der Vertrag steht — jetzt zählt, was genau vereinbart wurde.

### d1 · Zwei Schreiben, zwei Bedeutungen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bestellung und Auftragsbestätigung rechtlich einordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Zwei Schreiben, zwei Bedeutungen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:bestellung|Bestellung}} ist die Willenserklärung des Kunden — aber ob sie Antrag oder Annahme ist, hängt davon ab, was vorher passiert ist. Dasselbe gilt für die {{begriff:auftragsbestaetigung|Auftragsbestätigung}}."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Ausgangslage",
        "Bestellung ist",
        "Auftragsbestätigung ist"
      ],
      "zeilen": [
        {
          "zellen": [
            "Bindendes Angebot ging voraus",
            "die Annahme — Vertrag steht",
            "nur Bestätigung des Vereinbarten"
          ],
          "detail": "**Praktisch trotzdem sinnvoll.** Sie dokumentiert, was gilt, und deckt Missverständnisse früh auf. Rechtlich ändert sie nichts mehr."
        },
        {
          "zellen": [
            "Freibleibendes Angebot ging voraus",
            "der Antrag",
            "die Annahme — Vertrag steht"
          ]
        },
        {
          "zellen": [
            "Kein Angebot ging voraus",
            "der Antrag",
            "die Annahme — Vertrag steht"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Weicht die Auftragsbestätigung inhaltlich von der Bestellung ab — anderer Termin, andere Menge —, ist sie keine Annahme, sondern ein neuer Antrag. Der Kunde muss dann seinerseits zustimmen. Kommentarlose Abweichungen in Auftragsbestätigungen sind eine der häufigsten Streitursachen im Alltag."
    },
    {
      "typ": "merke",
      "text": "Die Frage lautet immer: **Wer hat zuletzt etwas Bindendes erklärt?** Wer abweicht, macht ein neues Angebot — egal, wie das Schreiben überschrieben ist.",
      "karteikarte": "Wann ist die Auftragsbestätigung rechtlich die Annahme und wann nur eine Bestätigung?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Eine Bestellung kann Antrag oder Annahme sein.",
    "Die rechtliche Wirkung hängt vom vorherigen Angebot ab."
  ],
  "erklaerung": "Ging ein bindendes Angebot voraus und bestellt der Kunde unverändert, ist die Bestellung die Annahme und der Vertrag steht. Ging ein freibleibendes Angebot voraus oder gab es kein Angebot, ist die Bestellung der Antrag. Die Auftragsbestätigung ist dann die Annahme. Weicht sie in Termin, Menge oder einer anderen Bedingung ab, ist sie ein neuer Antrag.",
  "beispiele": [
    "Nach einem bindenden Angebot über 200 Ordner zum 15. September bestätigt die Bestellung genau diese Daten: Vertragsschluss durch die Bestellung.",
    "Nach einem freibleibenden Angebot wird die Bestellung zum Antrag und die Auftragsbestätigung zur Annahme."
  ],
  "fallbeispiel": "Der Kunde bestellt 200 Ordner mit Liefertermin 15. September. Die Auftragsbestätigung nennt den 29. September. Weil sie vom Inhalt der Bestellung abweicht, ist sie keine Annahme, sondern ein neuer Antrag. Ein Vertrag über den neuen Termin entsteht erst, wenn der Kunde zustimmt oder die Lieferung zum 29. September widerspruchslos annimmt.",
  "typische_fehler": "Die Überschrift ‚Auftragsbestätigung‘ wird wichtiger genommen als der Inhalt. Außerdem wird eine Bestellung nach einem bindenden Angebot als neuer Antrag behandelt, obwohl der Vertrag bereits mit der unveränderten Annahme geschlossen wurde.",
  "verstaendnisfragen": [
    "Wann ist die Bestellung die Annahme? Wenn ihr ein bindendes Angebot vorausging und sie diesem vollständig entspricht.",
    "Was bedeutet eine abweichende Auftragsbestätigung? Neuer Antrag statt Annahme; der Kunde muss zustimmen."
  ],
  "pruefungsbezug": "Frage in dieser Reihenfolge: Was ging voraus? Ist die Bestellung gleichlautend? Weicht die Bestätigung ab? Erst dann die Begriffe Antrag, Annahme oder Bestätigung verwenden.",
  "merksatz": "Nicht die Überschrift entscheidet, sondern das vorausgegangene Angebot und der genaue Inhalt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Das Kleingedruckte

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Wirksamkeit von AGB beurteilen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Das Kleingedruckte",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:agb|Allgemeine Geschäftsbedingungen}} sind vorformulierte Bedingungen für eine Vielzahl von Verträgen. Nach {{par:bgb-305|§ 305 BGB}} gelten sie nur unter zwei Voraussetzungen — und beide werden im Alltag oft übersehen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Voraussetzung",
        "Was das heißt",
        "Typischer Fehler"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ausdrücklicher Hinweis vor Vertragsschluss",
            "Der Kunde muss wissen, dass es AGB gibt",
            "Hinweis erst auf der Rechnung"
          ],
          "detail": "**Zu spät ist zu spät.** AGB, die erstmals auf der Rechnung auftauchen, sind nicht Vertragsbestandteil geworden — der Vertrag war da längst geschlossen."
        },
        {
          "zellen": [
            "Zumutbare Möglichkeit der Kenntnisnahme",
            "lesbar, verfügbar, verständlich",
            "Verweis auf eine Website ohne Link"
          ]
        },
        {
          "zellen": [
            "Keine überraschenden Klauseln",
            "Was niemand erwarten muss, gilt nicht",
            "versteckte Zusatzkosten"
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb druckt seine AGB erstmals auf die Rechnung. Gelten sie?",
      "optionen": [
        {
          "text": "Ja, sie sind ja schriftlich mitgeteilt",
          "richtig": false,
          "echo": "Schriftlichkeit genügt nicht. Entscheidend ist der Zeitpunkt: Der Hinweis muss vor oder bei Vertragsschluss erfolgen."
        },
        {
          "text": "Nein, der Hinweis kam nach Vertragsschluss",
          "richtig": true,
          "echo": "Richtig. Nach § 305 BGB muss der Verwender bei Vertragsschluss ausdrücklich auf die AGB hinweisen. Die Rechnung kommt erst nach Vertragsschluss und nach der Lieferung — die Bedingungen sind damit nicht Vertragsbestandteil geworden."
        },
        {
          "text": "Nur gegenüber Verbrauchern nicht",
          "richtig": false,
          "echo": "Die Einbeziehungsregel gilt im Grundsatz für beide. Unter Kaufleuten sind die Anforderungen zwar niedriger, aber ein Hinweis erst auf der Rechnung reicht auch dort nicht."
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
    "AGB sind vorformulierte Bedingungen für mehrere Verträge.",
    "Der Zeitpunkt des Hinweises entscheidet über ihre Einbeziehung."
  ],
  "erklaerung": "Nach § 305 BGB müssen AGB vor oder bei Vertragsschluss ausdrücklich einbezogen werden. Die andere Seite muss in zumutbarer Weise von ihrem Inhalt Kenntnis nehmen können; überraschende Klauseln gelten nicht. Ein Hinweis erst auf der Rechnung kommt zu spät, weil der Vertrag dann bereits geschlossen ist.",
  "beispiele": [
    "Ein Bestellformular verweist vor Vertragsschluss auf lesbare, zugängliche AGB. Der Kunde erhält damit die Möglichkeit zur Kenntnisnahme.",
    "Zusatzkosten, die erstmals auf der Rechnung auftauchen und überraschend sind, werden nicht durch den späteren Abdruck Vertragsbestandteil."
  ],
  "fallbeispiel": "Ein Betrieb druckt seine AGB erstmals auf die Rechnung. Der Vertrag war zu diesem Zeitpunkt bereits geschlossen. Der Hinweis kam zu spät; Schriftlichkeit allein genügt nicht. Für eine wirksame Einbeziehung hätte der Betrieb vor Vertragsschluss hinweisen und eine zumutbare Kenntnisnahme ermöglichen müssen.",
  "typische_fehler": "Die AGB werden als wirksam angesehen, weil sie irgendwo schriftlich vorliegen. Maßgeblich sind aber Zeitpunkt, Zugangsmöglichkeit und das Verbot überraschender Klauseln.",
  "verstaendnisfragen": [
    "Welche zwei zeitlichen und praktischen Voraussetzungen sind zentral? Hinweis vor Vertragsschluss und zumutbare Möglichkeit der Kenntnisnahme.",
    "Warum reicht die Rechnung nicht? Weil sie erst nach dem Vertragsschluss ausgehändigt wird."
  ],
  "pruefungsbezug": "Markiere in AGB-Fällen den Zeitpunkt des Hinweises und die Möglichkeit, den Inhalt zu lesen. Prüfe danach, ob eine Klausel überraschend ist.",
  "merksatz": "AGB müssen vor dem Vertrag sichtbar und zumutbar zugänglich sein — die Rechnung ist zu spät."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d3 · Liefern und zahlen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Liefer- und Zahlungsbedingungen unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d3",
  "titel": "Liefern und zahlen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zwei Blöcke regeln, wie der Vertrag praktisch abgewickelt wird. Sie werden gern verwechselt, obwohl sie ganz verschiedene Fragen beantworten: ==Wer bringt die Ware und trägt das Risiko — und wann kommt das Geld?=="
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Blöcke",
      "titel": "Liefer- und Zahlungsbedingungen",
      "lead": "Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Lieferbedingungen",
          "ton": "gold",
          "punkte": [
            {
              "text": "ab Werk — der Käufer holt und zahlt alles",
              "detail": "Kosten und Gefahr gehen bereits am Werkstor über. Für den Verkäufer die günstigste Variante, für den Käufer die aufwendigste."
            },
            {
              "text": "frei Haus — der Verkäufer trägt Kosten bis zur Tür",
              "detail": "Die im Handel häufigste Vereinbarung. Sie ist ein Verkaufsargument und wird in den Preis einkalkuliert."
            },
            {
              "text": "unfrei — der Empfänger zahlt die Fracht",
              "detail": "Die Ware wird versandt, die Frachtkosten stellt der Frachtführer dem Empfänger in Rechnung."
            },
            {
              "text": "Verpackung, Versicherung, Teillieferungen",
              "detail": "Auch das gehört hierher — besonders die Frage, ob Teillieferungen zulässig sind, spart später Streit."
            }
          ]
        },
        {
          "name": "Zahlungsbedingungen",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Vorkasse — Geld zuerst",
              "detail": "Üblich bei Neukunden ohne Bonitätsprüfung oder bei Sonderanfertigungen."
            },
            {
              "text": "Zahlungsziel — etwa 30 Tage netto",
              "detail": "Ein Kredit, den du dem Kunden gewährst. Er kostet dich Liquidität, deshalb steht er im Angebot und nicht im Belieben des Kunden."
            },
            {
              "text": "Skonto — Abzug bei schneller Zahlung",
              "detail": "Zwei Prozent bei zehn Tagen entsprechen rund 36 Prozent Jahreszins — die Rechnung dahinter (2 % × 360 ÷ 20 Tage) kommt in Lernfeld 6 ausführlich. Ein starker Anreiz, aber ein teurer."
            },
            {
              "text": "Ratenzahlung, Nachnahme, Lastschrift",
              "detail": "Je nach Kundengruppe und Betrag. Die Wahl ist immer auch eine Entscheidung über das Ausfallrisiko."
            }
          ]
        }
      ],
      "regel": "Merkfrage zur Unterscheidung: Geht es um die **Ware** oder um das **Geld**? Lieferbedingungen betreffen Transport, Kosten und Gefahrübergang — Zahlungsbedingungen den Zeitpunkt und die Art der Zahlung."
    },
    {
      "typ": "zuordnen",
      "lead": "Liefer- oder Zahlungsbedingung?",
      "kategorien": [
        "Lieferbedingung",
        "Zahlungsbedingung"
      ],
      "aufgaben": [
        {
          "text": "„Frei Haus ab einem Bestellwert von 100 €“",
          "loesung": "Lieferbedingung"
        },
        {
          "text": "„30 Tage netto, bei 10 Tagen 2 % Skonto“",
          "loesung": "Zahlungsbedingung"
        },
        {
          "text": "„Teillieferungen sind zulässig“",
          "loesung": "Lieferbedingung"
        },
        {
          "text": "„Zahlbar per Lastschrift“",
          "loesung": "Zahlungsbedingung"
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d3",
  "vorauswissen": [
    "Liefer- und Zahlungsbedingungen regeln verschiedene Teile der Vertragserfüllung.",
    "Lieferbedingungen betreffen nicht nur den Termin."
  ],
  "erklaerung": "Lieferbedingungen beschreiben Ware, Liefertermin, Kosten und Gefahr. Zahlungsbedingungen betreffen Zeitpunkt und Art der Zahlung. Beide müssen zusammenpassen: Der Kunde soll erkennen können, was geliefert wird, wer Kosten trägt und wann beziehungsweise wie gezahlt wird.",
  "beispiele": [
    "Eine Lieferbedingung regelt, wann die Ware eintrifft und wer die Frachtkosten trägt.",
    "Eine Zahlungsbedingung legt fest, wann und auf welchem Weg der Rechnungsbetrag zu zahlen ist."
  ],
  "fallbeispiel": "Ein Auftrag nennt eine Lieferung, aber nicht, wer die Frachtkosten trägt; außerdem fehlt das Zahlungsziel. Vor der Bestätigung werden beide Bereiche ergänzt: Liefertermin, Kosten und Gefahr auf der Lieferseite, Zahlungszeitpunkt und Zahlungsart auf der Zahlungsseite. So wird die Vereinbarung vollständig und der spätere Rechnungsprozess eindeutig.",
  "typische_fehler": "Lieferbedingungen werden nur als Datum verstanden oder Zahlungsbedingungen mit dem Preis verwechselt. Auch wird die Auftragsbestätigung formuliert, obwohl die Abweichung bei Termin oder Kosten noch nicht geklärt ist.",
  "verstaendnisfragen": [
    "Welche Fragen beantworten Lieferbedingungen? Was wird wann geliefert, wer trägt Kosten und wie wird die Gefahr behandelt?",
    "Welche Fragen beantworten Zahlungsbedingungen? Wann und auf welche Art wird gezahlt?"
  ],
  "pruefungsbezug": "Ordne jede Angabe entweder Lieferung oder Zahlung zu und prüfe, ob Termin, Kosten, Gefahr, Zahlungszeitpunkt und Zahlungsart eindeutig sind.",
  "merksatz": "Lieferbedingungen klären Ware und Weg; Zahlungsbedingungen klären Geld und Zeitpunkt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Lieferung und Rechnung

**Datei:** `lf3-k5-rechnung.kapitel.json` · SHA-256 `bae14ad956e20f1d370f17867fa3ca137bf6f3239fc03176d55f081bd07aa051`

**Konkreter Kapitelauftrag:** Lieferschein, Bestellung und Rechnung gegeneinander prüfen; Mengen, Steuerschema und Fehlerbehandlung aus dem Beleg ableiten.

**Einordnung:** Die Ware ist raus — jetzt muss das Geld kommen.

### e1 · Die Ware geht raus

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Lieferpapiere unterscheiden und ihre Funktion erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e1",
  "titel": "Die Ware geht raus",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Mit der Lieferung erfüllt der Verkäufer seine Hauptpflicht aus {{par:bgb-433|§ 433 BGB}}. Begleitet wird sie vom {{begriff:lieferschein|Lieferschein}} — dem einzigen Beleg im Prozess, der bewusst **keine Preise** enthält."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Papier",
        "Zweck",
        "Bleibt bei"
      ],
      "zeilen": [
        {
          "zellen": [
            "Lieferschein",
            "Inhalt der Sendung nachweisen",
            "Empfänger"
          ]
        },
        {
          "zellen": [
            "Empfangsbestätigung",
            "Erhalt quittieren",
            "Verkäufer"
          ]
        },
        {
          "zellen": [
            "Frachtbrief",
            "Transportauftrag an den Frachtführer",
            "Frachtführer"
          ],
          "detail": "**Nicht mit dem Lieferschein verwechseln.** Der Frachtbrief regelt das Verhältnis zwischen Absender und Frachtführer, der Lieferschein das zwischen Verkäufer und Käufer."
        },
        {
          "zellen": [
            "Rechnung",
            "Zahlung anfordern",
            "Empfänger"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Die Lieferung erfüllt den Vertrag, sie schließt ihn nicht. Und sie überträgt nicht automatisch das Eigentum — bei vereinbartem Eigentumsvorbehalt bleibt die Ware bis zur vollständigen Zahlung dem Verkäufer.",
      "karteikarte": "Welche Funktion hat der Lieferschein, und warum stehen keine Preise darauf?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e1",
  "vorauswissen": [
    "Die Lieferung erfüllt die Hauptpflicht aus dem Kaufvertrag.",
    "Lieferschein, Empfangsbestätigung und Frachtbrief dokumentieren unterschiedliche Beziehungen."
  ],
  "erklaerung": "Der Lieferschein weist den Inhalt der Sendung nach und enthält keine Preise. Die Empfangsbestätigung quittiert den Erhalt. Der Frachtbrief regelt das Verhältnis zwischen Absender und Frachtführer. Die Rechnung fordert die Zahlung. Lieferung und Rechnung gehören daher zum selben Prozess, erfüllen aber verschiedene Informations- und Nachweisfunktionen.",
  "beispiele": [
    "Die Warenannahme vergleicht Artikel und Menge mit dem Lieferschein und bestätigt den Empfang; Preise werden in der Rechnung geprüft.",
    "Der Frachtführer arbeitet mit dem Frachtbrief, während der Käufer mit dem Lieferschein den Lieferumfang kontrolliert."
  ],
  "fallbeispiel": "Ein Kunde meldet, dass drei Kartons angekommen sind, aber im Lieferschein vier stehen. Der Lieferschein ist der passende Beleg für die Mengenprüfung. Die Empfangsbestätigung zeigt, was quittiert wurde; der Frachtbrief wird nur für das Verhältnis zum Transporteur herangezogen. Die Rechnung wird erst danach auf die geschuldete Zahlung geprüft.",
  "typische_fehler": "Der Lieferschein wird als Rechnung ohne Preis verstanden oder der Frachtbrief als Beleg des Kaufvertrags. Außerdem wird die Lieferung mit dem Eigentumsübergang gleichgesetzt, obwohl ein Eigentumsvorbehalt vereinbart sein kann.",
  "verstaendnisfragen": [
    "Warum stehen auf dem Lieferschein keine Preise? Er soll den Sendungsinhalt nachweisen und wird von mehreren Stellen gesehen.",
    "Wem ordnest du den Frachtbrief zu? Dem Verhältnis zwischen Absender und Frachtführer."
  ],
  "pruefungsbezug": "Ordne in Belegaufgaben immer Zweck und Beteiligte zu. Bei Eigentumsvorbehalt zusätzlich prüfen, ob die Ware trotz Lieferung noch dem Verkäufer gehört.",
  "merksatz": "Lieferschein prüft Inhalt, Empfangsbestätigung den Erhalt, Frachtbrief den Transport und Rechnung die Zahlung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e2 · Die Rechnung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Pflichtangaben einer Rechnung prüfen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e2",
  "titel": "Die Rechnung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:rechnung|Rechnung}} ist mehr als eine Zahlungsaufforderung: Sie ist der Beleg, mit dem dein Kunde die Vorsteuer abzieht. ==Fehlt eine Pflichtangabe, verliert er diesen Abzug== — und meldet sich bei dir. Die Angaben stehen in {{par:ustg-14|§ 14 UStG}}."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Rechnungsarten",
      "titel": "Vollständige Rechnung oder Kleinbetragsrechnung",
      "lead": "Bis 250 € brutto genügen weniger Angaben (§ 33 UStDV). Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Vollständige Rechnung",
          "ton": "gold",
          "punkte": [
            {
              "text": "Name und Anschrift beider Beteiligten",
              "detail": "Vollständig, nicht abgekürzt. Bei falscher Anschrift des Empfängers kippt der Vorsteuerabzug."
            },
            {
              "text": "Steuernummer oder Umsatzsteuer-Identifikationsnummer",
              "detail": "Eine von beiden genügt. Bei innergemeinschaftlichen Lieferungen ist die USt-IdNr. Pflicht."
            },
            {
              "text": "Ausstellungsdatum und fortlaufende Rechnungsnummer",
              "detail": "Die Nummer muss einmalig und lückenlos vergeben sein — daran hängt die Nachprüfbarkeit der Buchführung, die du in Lernfeld 6 genauer kennenlernst."
            },
            {
              "text": "Menge und handelsübliche Bezeichnung der Leistung",
              "detail": "„Diverses“ oder „Ware“ genügt nicht. Die Leistung muss identifizierbar sein."
            },
            {
              "text": "Zeitpunkt der Lieferung",
              "detail": "Auch dann anzugeben, wenn er mit dem Rechnungsdatum übereinstimmt — dann genügt ein entsprechender Hinweis."
            },
            {
              "text": "Entgelt, Steuersatz und Steuerbetrag",
              "detail": "Getrennt ausgewiesen. Bei Steuerbefreiung stattdessen ein Hinweis auf den Grund."
            }
          ]
        },
        {
          "name": "Kleinbetragsrechnung",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Gesamtbetrag bis 250 € brutto",
              "detail": "Gedacht für Bewirtungsbelege, Tankquittungen, Bahntickets — dort wäre der volle Angabenkatalog unpraktikabel."
            },
            {
              "text": "Name und Anschrift des Ausstellers",
              "detail": "Der Empfänger muss hier nicht genannt werden — das ist die wichtigste Erleichterung."
            },
            {
              "text": "Ausstellungsdatum",
              "detail": "Bleibt Pflicht."
            },
            {
              "text": "Menge und Art der Leistung",
              "detail": "Bleibt ebenfalls Pflicht — auch hier genügt „Diverses“ nicht."
            },
            {
              "text": "Bruttobetrag und Steuersatz",
              "detail": "Der Steuerbetrag muss nicht getrennt ausgewiesen werden; es reicht der Hinweis auf den Steuersatz."
            }
          ]
        }
      ],
      "regel": "Grenze: 250 € einschließlich Umsatzsteuer (§ 33 UStDV). Darüber braucht es alle Angaben nach § 14 UStG — Aussteller, Datum, Leistung und Steuersatz sind aber in jedem Fall dabei."
    },
    {
      "typ": "absatz",
      "text": "Wann gezahlt wird, steht in den {{begriff:zahlungsbedingungen|Zahlungsbedingungen}} aus Kapitel 4. Der Klassiker lautet „30 Tage netto, bei Zahlung innerhalb von 10 Tagen 2 % Skonto“ — wie man ihn bucht, lernst du in Lernfeld 6, Kapitel 5."
    },
    {
      "typ": "check",
      "frage": "Ein Kunde reklamiert, er könne aus deiner Rechnung keine Vorsteuer ziehen. Was prüfst du zuerst?",
      "optionen": [
        {
          "text": "Ob der Betrag stimmt",
          "richtig": false,
          "echo": "Ein falscher Betrag wäre ärgerlich, hindert den Vorsteuerabzug aber nicht. Der scheitert an fehlenden Pflichtangaben, nicht an der Höhe."
        },
        {
          "text": "Ob alle Pflichtangaben nach § 14 UStG enthalten sind",
          "richtig": true,
          "echo": "Richtig. Der Vorsteuerabzug setzt eine ordnungsgemäße Rechnung voraus. Typische Lücken: fehlende Steuernummer, unvollständige Anschrift des Empfängers, fehlender Lieferzeitpunkt oder eine zu unbestimmte Leistungsbeschreibung. Die Rechnung lässt sich berichtigen."
        },
        {
          "text": "Ob der Kunde vorsteuerabzugsberechtigt ist",
          "richtig": false,
          "echo": "Das wäre der zweite Schritt und liegt nicht in deiner Verantwortung. Zuerst prüfst du, was du selbst beeinflussen kannst — die Angaben auf deiner Rechnung."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Leg dir eine kurze Prüfliste an und geh sie vor jedem Rechnungsversand durch: beide Anschriften, Steuernummer, Datum, Nummer, Leistung, Lieferzeitpunkt, Entgelt, Steuersatz, Steuerbetrag. Zehn Sekunden — gegen einen Rückruf, eine Korrektur und einen verärgerten Kunden."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e2",
  "vorauswissen": [
    "Eine Rechnung belegt die Leistung und ermöglicht dem Empfänger den Vorsteuerabzug.",
    "Pflichtangaben müssen vollständig und nachvollziehbar sein."
  ],
  "erklaerung": "§ 14 UStG verlangt unter anderem vollständige Namen und Anschriften, Steuernummer oder Umsatzsteuer-Identifikationsnummer, Ausstellungsdatum, fortlaufende Rechnungsnummer, Menge und handelsübliche Bezeichnung, Lieferzeitpunkt sowie Entgelt, Steuersatz und Steuerbetrag. Bei kleinen Beträgen genügt eine Kleinbetragsrechnung mit weniger Angaben. Fehlt eine Pflichtangabe, ist die Rechnung nicht ordnungsgemäß und der Vorsteuerabzug des Empfängers kann gefährdet sein.",
  "beispiele": [
    "Fehlt auf einer Rechnung der Lieferzeitpunkt, wird eine berichtigte Rechnung mit eindeutiger Bezugnahme auf die ursprüngliche Rechnung erstellt.",
    "Eine Rechnungsnummer wird einmalig und fortlaufend vergeben; die Bezeichnung ‚Diverses‘ reicht als handelsübliche Leistungsbeschreibung nicht aus."
  ],
  "fallbeispiel": "Bei der Rechnungsprüfung fehlt der Lieferzeitpunkt. Die Angabe gehört zu den Pflichtangaben nach § 14 UStG. Deshalb wird eine berichtigte Rechnung erstellt, die eindeutig auf die ursprüngliche Rechnung Bezug nimmt. Stimmen Liefer- und Rechnungsdatum überein, kann ein entsprechender Hinweis den Zeitpunkt belegen; die übrigen Pflichtangaben werden ebenfalls kontrolliert.",
  "typische_fehler": "Nur Name, Datum und Betrag werden geprüft. Häufig fehlen Lieferzeitpunkt, fortlaufende Nummer oder die handelsübliche Bezeichnung. Kleinbetragsregel und vollständige Rechnung werden außerdem verwechselt.",
  "verstaendnisfragen": [
    "Welche Angabe fehlt besonders häufig? Der Zeitpunkt der Lieferung oder Leistung.",
    "Was ist die Folge einer fehlenden Pflichtangabe? Die Rechnung ist nicht ordnungsgemäß; der Empfänger kann den Vorsteuerabzug verlieren, bis berichtigt wird."
  ],
  "pruefungsbezug": "Prüfe in der Reihenfolge Anschriften, Steuerangabe, Datum, Nummer, Leistung, Lieferzeitpunkt, Entgelt und Steuer. Danach klären, ob die Kleinbetragsrechnung anwendbar ist.",
  "merksatz": "Eine Rechnung ist erst prüffähig, wenn Leistung, Beteiligte, Zeit, Nummer und Steuer vollständig erkennbar sind."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Geschäftsbriefe nach DIN 5008

**Datei:** `lf3-k6-din5008.kapitel.json` · SHA-256 `f0e1294926ed0ab7c72f536002723dc3974ac62532cf410bf1aba50cfbde2965`

**Konkreter Kapitelauftrag:** Einen Kundenbrief nachvollziehbar aufbauen; Informationshierarchie, Corporate Design und verlässlich belegte Normangaben trennen.

**Einordnung:** Wo was steht — und warum das keine Geschmacksfrage ist.

### f1 · Der Aufbau

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Aufbau eines Geschäftsbriefs benennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f1",
  "titel": "Der Aufbau",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:din5008|DIN 5008}} legt fest, wie ein Geschäftsbrief aufgebaut ist. Das ist keine Formsache: Die Anschrift muss im Fenster des Briefumschlags erscheinen, und ein Sachbearbeiter muss die Bezugszeichen finden, ohne zu suchen. ==In der AP1 wird die Norm direkt am Rechner geprüft.=="
    },
    {
      "typ": "grafik",
      "variante": "brief",
      "kopf": "Der Geschäftsbrief",
      "titel": "Aufbau nach DIN 5008",
      "lead": "Schematische Darstellung eines Briefs nach Form B auf A4. Klick auf einen Bereich — jeder hat eine feste Position und eine Aufgabe.",
      "zonen": [
        {
          "id": "kopf",
          "name": "Briefkopf",
          "x": 25,
          "y": 6,
          "b": 165,
          "h": 32,
          "art": "pflicht",
          "notiz": "Absenderangaben und Logo. Er reicht bis zum Beginn des Anschriftfelds und wird meist als Vorlage einmal angelegt."
        },
        {
          "id": "anschrift",
          "name": "Anschriftfeld",
          "x": 20,
          "y": 45,
          "b": 85,
          "h": 45,
          "art": "pflicht",
          "notiz": "Das Feld beginnt 20 mm vom linken Blattrand, die Anschrift selbst steht wie der übrige Text bei 25 mm. Es muss im Fenster des Briefumschlags sichtbar sein. Oben die Zusatz- und Vermerkzone für Angaben wie „Einschreiben“ oder die Rücksendeangabe, darunter die Anschrift selbst — **ohne Leerzeile** zwischen Straße und Ort."
        },
        {
          "id": "info",
          "name": "Informationsblock",
          "x": 125,
          "y": 45,
          "b": 65,
          "h": 45,
          "art": "frei",
          "notiz": "Rechts neben dem Anschriftfeld: Ihr Zeichen, Ihre Nachricht vom, Unser Zeichen, Telefon, E-Mail und das Datum. Er ersetzt die früher übliche Bezugszeichenzeile."
        },
        {
          "id": "betreff",
          "name": "Betreff",
          "x": 25,
          "y": 92,
          "b": 165,
          "h": 8,
          "art": "pflicht",
          "notiz": "Kurz und ohne das Wort „Betreff“. Er wird hervorgehoben, meist fett, und endet **ohne Punkt**."
        },
        {
          "id": "anrede",
          "name": "Anrede",
          "x": 25,
          "y": 104,
          "b": 165,
          "h": 8,
          "art": "pflicht",
          "notiz": "Nach der Anrede folgt ein Komma, der Text beginnt danach klein. Zwischen Betreff und Anrede sowie zwischen Anrede und Text steht jeweils eine Leerzeile."
        },
        {
          "id": "text",
          "name": "Brieftext",
          "x": 25,
          "y": 116,
          "b": 165,
          "h": 92,
          "art": "pflicht",
          "notiz": "Linksbündig, ohne Einzug, Absätze durch Leerzeilen getrennt. Der erste Satz sagt, worum es geht — nicht „Bezug nehmend auf Ihr Schreiben“."
        },
        {
          "id": "gruss",
          "name": "Grußformel",
          "x": 25,
          "y": 212,
          "b": 165,
          "h": 8,
          "art": "pflicht",
          "notiz": "Eine Leerzeile nach dem Text, **ohne Komma** am Ende. Danach folgen Firmenbezeichnung, Raum für die Unterschrift und der maschinenschriftliche Name."
        },
        {
          "id": "unterschrift",
          "name": "Firma · Unterschrift · Name",
          "x": 25,
          "y": 224,
          "b": 100,
          "h": 26,
          "art": "pflicht",
          "notiz": "Hier zeigt sich die Vertretungsmacht aus Lernfeld 1: **ppa.** beim Prokuristen, **i. V.** oder **i. A.** bei Handlungsvollmacht."
        },
        {
          "id": "anlage",
          "name": "Anlagenvermerk",
          "x": 25,
          "y": 254,
          "b": 100,
          "h": 8,
          "art": "frei",
          "notiz": "Das Wort „Anlagen“ wird hervorgehoben, die einzelnen Anlagen darunter aufgeführt. Er steht nach dem Namen, nicht am Seitenende."
        },
        {
          "id": "fuss",
          "name": "Geschäftsangaben",
          "x": 25,
          "y": 268,
          "b": 165,
          "h": 22,
          "art": "frei",
          "notiz": "Rechtsform, Sitz, Registergericht, Handelsregisternummer, Geschäftsführung und Bankverbindung. Für Kaufleute sind diese Pflichtangaben im Geschäftsbrief gesetzlich vorgeschrieben."
        }
      ],
      "masse": [
        {
          "bei": 45,
          "text": "Anschriftfeld (Form B: 45 mm)"
        },
        {
          "bei": 92,
          "text": "Betreff"
        },
        {
          "bei": 212,
          "text": "Gruß"
        }
      ],
      "regel": "Zwei Formen gibt es: Bei **Form A** beginnt das Anschriftfeld 27 mm unter dem oberen Blattrand, bei **Form B** 45 mm — Form B lässt mehr Platz für einen aufwendigen Briefkopf und ist im Geschäftsverkehr die übliche. Das Anschriftfeld ist bei beiden Formen 85 mm breit und 45 mm hoch, der Informationsblock beginnt 125 mm vom linken Blattrand. Seitenränder für den Text: links 25 mm, rechts mindestens 20 mm. Die Grafik ist schematisch; verbindlich sind die Maße der aktuellen Normausgabe DIN 5008:2020-03 und die Briefvorlage deines Betriebs."
    },
    {
      "typ": "merke",
      "text": "Der Betreff endet **ohne Punkt**, die Grußformel **ohne Komma**, und nach der Anrede steht ein **Komma** mit anschließender Kleinschreibung. Diese drei Kleinigkeiten kosten in der Prüfung regelmäßig Punkte.",
      "karteikarte": "Welche Zeichensetzung gilt bei Betreff, Anrede und Grußformel?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f1",
  "vorauswissen": [
    "Ein Geschäftsbrief muss schnell lesbar und eindeutig zugeordnet werden können.",
    "Anschrift, Bezug und Inhalt haben im Brief feste Funktionen."
  ],
  "erklaerung": "DIN 5008 ordnet den Geschäftsbrief in einer festen Reihenfolge: Briefkopf, Anschriftfeld, Informationsblock, Betreff, Anrede, Brieftext, Grußformel, Unterschrift mit Name, Anlagenvermerk und Geschäftsangaben. Das Anschriftfeld muss im Umschlagfenster sichtbar sein; zwischen Straße und Ort steht keine Leerzeile. Die Norm schafft damit eine einheitliche Orientierung und ist in der AP1 direkt am Rechner anwendbar.",
  "beispiele": [
    "Der Betreff ‚Angebot Nr. 4711‘ steht ohne das Wort ‚Betreff‘ und ohne Punkt, bevor die Anrede folgt.",
    "Im Informationsblock können Zeichen, Datum, Telefon und E-Mail stehen; im Fußbereich folgen die Geschäftsangaben mit Rechtsform, Sitz und Registerangaben."
  ],
  "fallbeispiel": "Ein Brief enthält Briefkopf, Anschriftfeld, Informationsblock, Betreff, Anrede, Text, Gruß, Unterschrift und Anlagen. Bei der Kontrolle wird die Reihenfolge mit der DIN-5008-Struktur abgeglichen. Das Anschriftfeld wird fenstergerecht positioniert, der Betreff gekürzt und der Anlagenvermerk nach dem Namen platziert. So wird nicht nur ein schönes, sondern ein funktional lesbarer Brief erstellt.",
  "typische_fehler": "Das Anschriftfeld wird nach optischem Geschmack verschoben, das Wort ‚Betreff‘ ergänzt oder der Anlagenvermerk an das Seitenende gesetzt. Auch die Geschäftsangaben im Fußbereich werden vergessen.",
  "verstaendnisfragen": [
    "Warum ist die Position des Anschriftfelds wichtig? Damit die Anschrift im Fenster des Briefumschlags sichtbar ist.",
    "Was gehört in welcher Reihenfolge nach dem Brieftext? Grußformel, Firmenbezeichnung mit Unterschrift und Name, Anlagenvermerk und Geschäftsangaben."
  ],
  "pruefungsbezug": "Arbeite den Brief von oben nach unten ab und prüfe jede Zone statt nur das Gesamtbild. DIN 5008 wird direkt am Rechner über die konkrete Einrichtung sichtbar.",
  "merksatz": "Ein Geschäftsbrief ist eine Funktionsordnung: Jede Information hat ihren Platz."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f2 · Schreibregeln

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Schreibregeln für Datum, Zahlen und Anschriften anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f2",
  "titel": "Schreibregeln",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Norm regelt nicht nur den Aufbau, sondern auch die Schreibweise im Text. Diese Regeln sind der Teil, der in der AP1 direkt am Rechner abgefragt wird."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Was",
        "Richtig",
        "Falsch"
      ],
      "zeilen": [
        {
          "zellen": [
            "Datum, numerisch",
            "2026-09-01 oder 01.09.2026",
            "1.9.26"
          ],
          "detail": "**Beide Formen sind zulässig.** Die numerische Schreibweise mit Punkten braucht führende Nullen und die vierstellige Jahreszahl. Die Form nach ISO beginnt mit dem Jahr und wird international verwendet."
        },
        {
          "zellen": [
            "Datum, alphanumerisch",
            "1. September 2026",
            "01. September 2026"
          ]
        },
        {
          "zellen": [
            "Telefonnummer",
            "0211 12345-67",
            "0211 / 12 34 5 - 67"
          ],
          "detail": "**Gegliedert wird von rechts nach links in Zweiergruppen — außer bei Durchwahlen.** Die Durchwahl wird mit Bindestrich angehängt. Klammern und Schrägstriche sind nicht mehr vorgesehen."
        },
        {
          "zellen": [
            "Betrag",
            "1.250,00 EUR",
            "1250,-- €uro"
          ]
        },
        {
          "zellen": [
            "Prozent",
            "25 % der Menge",
            "25% der Menge"
          ],
          "detail": "**Zwischen Zahl und Zeichen steht ein Leerzeichen** — bei Prozent, Grad und Einheiten. Nur beim Gradzeichen für Winkel entfällt es."
        },
        {
          "zellen": [
            "Anschrift",
            "keine Leerzeile vor dem Ort",
            "Leerzeile zwischen Straße und Ort"
          ]
        },
        {
          "zellen": [
            "Auslassungspunkte",
            "Text ...",
            "Text..."
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Welche Schreibweise entspricht der DIN 5008?",
      "optionen": [
        {
          "text": "Wir liefern 25% der Menge bis zum 1.9.26.",
          "richtig": false,
          "echo": "Zwei Fehler: Zwischen Zahl und Prozentzeichen gehört ein Leerzeichen, und das Datum braucht führende Nullen sowie die vierstellige Jahreszahl."
        },
        {
          "text": "Wir liefern 25 % der Menge bis zum 01.09.2026.",
          "richtig": true,
          "echo": "Richtig. Leerzeichen vor dem Prozentzeichen, Datum mit führenden Nullen und vierstelliger Jahreszahl. Ebenfalls zulässig wäre die Schreibweise 2026-09-01."
        },
        {
          "text": "Wir liefern 25 %-der Menge bis zum 01.09.26.",
          "richtig": false,
          "echo": "Der Bindestrich hat dort nichts zu suchen, und die Jahreszahl muss vierstellig sein."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Stell die Vorlage einmal richtig ein, statt bei jedem Brief nachzudenken: Seitenränder, Briefkopf, Anschriftfeld und Informationsblock als Formatvorlage speichern. Dann bleibt bei jedem Schreiben nur noch der Inhalt zu tun — und genau das wird in der AP1 auch bewertet: nicht Schönheit, sondern normgerechte Einrichtung."
    },
    {
      "typ": "zuordnen",
      "lead": "Entspricht die Schreibweise der Norm?",
      "kategorien": [
        "Richtig",
        "Falsch"
      ],
      "aufgaben": [
        {
          "text": "Sehr geehrte Frau Meyer, / wir bestätigen …",
          "loesung": "Richtig"
        },
        {
          "text": "Mit freundlichen Grüßen,",
          "loesung": "Falsch"
        },
        {
          "text": "Betreff: Ihre Bestellung vom 01.09.2026.",
          "loesung": "Falsch"
        },
        {
          "text": "Der Rechnungsbetrag lautet 1.250,00 EUR.",
          "loesung": "Richtig"
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
    "Schreibregeln sollen Eindeutigkeit und einheitliche Bearbeitung sichern.",
    "Zeichen, Zahlen und Datumsangaben sind Teil der formalen Prüfung."
  ],
  "erklaerung": "Der Betreff wird ohne ‚Betreff‘ und ohne Punkt geschrieben. Nach der Anrede steht ein Komma, der anschließende Text beginnt klein. Die Grußformel endet ohne Komma. Beispiele für zulässige Datumsformen sind 01.09.2026 und 2026-09-01; beim Prozentzeichen steht ein Leerzeichen davor. Die Unterschrift zeigt mit ppa., i. V. oder i. A. den jeweiligen Handlungsrahmen.",
  "beispiele": [
    "Aus ‚Betreff: Angebot Nr. 4711.‘ wird ‚Angebot Nr. 4711‘; aus ‚Sehr geehrte Damen und Herren:‘ wird ‚Sehr geehrte Damen und Herren,‘.",
    "Geschäftliche Schreibweisen lauten etwa 0211 12345-67, 1.250,00 EUR und 25 %; die Datumsangabe kann 01.09.2026 oder 2026-09-01 sein."
  ],
  "fallbeispiel": "Ein Kollege schreibt ‚Betreff: Angebot Nr. 4711.‘, setzt nach der Anrede einen Doppelpunkt und beendet ‚Mit freundlichen Grüßen,‘ mit Komma. Die Korrektur erfolgt in drei Schritten: ‚Betreff‘ und Punkt entfernen, nach der Anrede ein Komma setzen und die Grußformel ohne Satzzeichen schreiben. Danach beginnt der Brieftext klein.",
  "typische_fehler": "Der Doppelpunkt nach der Anrede wird aus anderen Textsorten übernommen, der Punkt im Betreff bleibt stehen oder das Komma nach der Grußformel wird gesetzt. Bei Zahlen fehlen außerdem Leerzeichen und Einheiten.",
  "verstaendnisfragen": [
    "Welche drei Zeichensetzungsregeln sind besonders wichtig? Betreff ohne Punkt, Anrede mit Komma und Grußformel ohne Komma.",
    "Wie wird die Vertretungsmacht sichtbar? Durch die passende Zeichnung, etwa ppa. bei Prokura oder i. V. beziehungsweise i. A. bei Handlungsvollmacht."
  ],
  "pruefungsbezug": "Korrigiere Briefe systematisch: Betreff, Anrede, Textbeginn, Gruß, Datum, Zahlen, Prozentzeichen und Zeichnung. Nutze die Normregeln statt persönlicher Gestaltungsvorlieben.",
  "merksatz": "Betreff ohne Punkt, Anrede mit Komma, Gruß ohne Komma — die drei schnellen DIN-5008-Punkte."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
