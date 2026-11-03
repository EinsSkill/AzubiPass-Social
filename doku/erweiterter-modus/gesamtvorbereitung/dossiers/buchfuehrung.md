# buchfuehrung · Buchführung

Quelle: `quellen/buchfuehrung.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 9 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Grundlagen & Buchführungspflicht

**Datei:** `k1-grundlagen.kapitel.json` · SHA-256 `d2f44caf4aa175ebf551a775d67a613139ad9afe784578a7b5f0269ddc720c45`

**Konkreter Kapitelauftrag:** Buchführungsaufgaben und Pflichtbeginn getrennt begründen; einen Grenzfall nicht allein aus einer Umsatzkennzahl entscheiden.

**Einordnung:** Was Buchführung ist, warum sie Pflicht ist und welche Regeln dabei gelten.

### a1 · Was ist Buchführung?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Zweck und Bedeutung der Buchführung erklären können

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Was ist Buchführung?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Buchführung ist die systematische, lückenlose und zeitgerechte Aufzeichnung aller {{begriff:geschaeftsvorfall|Geschäftsvorfälle}} in Geldeinheiten. Sie ist das ==finanzielle Gedächtnis== eines Betriebs: Ohne sie wäre nicht nachvollziehbar, woher das Geld stammt, wohin es fließt und wie es dem Unternehmen wirtschaftlich geht."
    },
    {
      "typ": "absatz",
      "text": "Jede Zahlung, jede Lieferung, jeder Kauf hinterlässt einen {{begriff:beleg|Beleg}}, der erfasst und aufbewahrt werden muss. Daraus ergeben sich fünf Aufgaben, die regelmäßig geprüft werden:"
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Aufgabe",
        "Zweck",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Dokumentation",
            "Nachweis aller Geschäftsvorfälle",
            "Lieferantenrechnung archivieren"
          ]
        },
        {
          "zellen": [
            "Steuerermittlung",
            "Berechnungsgrundlage fürs Finanzamt",
            "Jahresgewinn als Steuerbasis"
          ]
        },
        {
          "zellen": [
            "Gläubigerschutz",
            "Transparenz über die Vermögenslage",
            "Bank prüft Bonität vor Kredit"
          ]
        },
        {
          "zellen": [
            "Information",
            "Entscheidungsgrundlage fürs Management",
            "Ist die Investition rentabel?"
          ]
        },
        {
          "zellen": [
            "Selbstschutz",
            "Beweismittel bei Streitigkeiten",
            "Nachweis bei der Steuerprüfung"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Buchführung ist kein bürokratischer Selbstzweck. Wer ordentlich Buch führt, schützt sich selbst, seine Gläubiger — und handelt gesetzeskonform.",
      "karteikarte": "Nenne drei Gründe, warum Buchführung mehr ist als Bürokratie."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "titel": "Vom Beleg bis zum Jahresabschluss",
  "vorauswissen": [
    "Ein Geschäftsvorfall ist ein wirtschaftlicher Vorgang, der das Vermögen, die Schulden oder den Erfolg eines Betriebs verändert.",
    "Ein Beleg ist der nachprüfbare Nachweis dieses Vorgangs."
  ],
  "erklaerung": "Am Anfang steht immer ein Beleg, zum Beispiel eine Eingangsrechnung, ein Kontoauszug oder ein Kassenbon. Der Beleg wird geprüft, dem richtigen Geschäftsvorfall zugeordnet und anschließend in der Buchführung erfasst. Die Buchung verändert mindestens zwei Konten. Am Ende des Zeitraums werden die Konten abgeschlossen und die Werte für Bilanz und Gewinn- und Verlustrechnung verdichtet.",
  "beispiel": "MAKEL Studio erhält eine Lieferantenrechnung. Die Rechnung wird auf Echtheit, Betrag und Leistungsdatum geprüft, dem Einkauf zugeordnet und so abgelegt, dass ein sachverständiger Dritter den Vorgang später wiederfindet. Erst danach wird gebucht. Ein fehlender oder unklarer Beleg ist deshalb kein kleines Formproblem, sondern eine Lücke in der Beweiskette.",
  "ablauf": [
    "Beleg entgegennehmen und Pflichtangaben prüfen.",
    "Geschäftsvorfall wirtschaftlich einordnen und die betroffenen Konten bestimmen.",
    "Buchung mit Datum, Betrag und verständlichem Buchungstext erfassen.",
    "Beleg und Buchung so archivieren, dass die Prüfung vom Beleg zur Auswertung und zurück möglich ist."
  ],
  "beispiele": [
    "Bei einer Eingangsrechnung über Büromaterial steigt der Aufwand und zugleich die Verbindlichkeit gegenüber dem Lieferanten.",
    "Beim Kontoauszug wird nicht der Kontoauszug selbst zum Aufwand: Er dient als Nachweis für die tatsächliche Zahlung und hilft, offene Posten abzugleichen."
  ],
  "fallbeispiel": "Eine Rechnung kommt am 28.12. an, die Lieferung wurde am 20.12. erbracht und erst am 15.01. bezahlt. Für die zeitliche Zuordnung zählt der wirtschaftliche Vorgang: Die Ausgabe gehört in das alte Geschäftsjahr; die Zahlung im Januar gleicht später die Verbindlichkeit aus.",
  "typische_fehler": "Nicht erst buchen und später nach einem Beleg suchen. Ebenfalls falsch ist ein Sammeltext wie „Diverses“: Der Buchungstext muss den Vorgang verständlich machen.",
  "merksatz": "Beleg prüfen, Vorgang verstehen, richtig buchen, nachvollziehbar aufbewahren."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Wer muss Bücher führen?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Buchführungspflicht nach HGB und AO benennen und abgrenzen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Wer muss Bücher führen?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Nicht jeder Unternehmer betreibt automatisch eine vollständige {{begriff:doppelte-buchfuehrung|doppelte Buchführung}}. Die wichtigste Grundlage im Handelsrecht ist {{par:hgb-238|§ 238 HGB}}: Jeder {{begriff:kaufmann|Kaufmann}} ist verpflichtet, Bücher zu führen — ==grundsätzlich ohne Umsatz- oder Gewinnschwelle==. Einzige Ausnahme: Kleine **Einzelkaufleute** mit höchstens 800.000 € Umsatz und 80.000 € Jahresüberschuss an zwei Stichtagen hintereinander sind nach {{par:hgb-241a|§ 241a HGB}} befreit. Für eine GmbH wie MAKEL gibt es diese Befreiung nie."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Grundlage",
        "Für wen?",
        "Schwellenwert"
      ],
      "zeilen": [
        {
          "zellen": [
            "§ 238 HGB",
            "Jeder Kaufmann (Handelsgewerbe)",
            "keiner — gilt automatisch (Ausnahme: kleine Einzelkaufleute, § 241a HGB)"
          ],
          "mono": [
            0
          ]
        },
        {
          "zellen": [
            "§ 140 AO",
            "Wer nach anderem Gesetz pflichtig ist",
            "folgt aus § 238 HGB"
          ],
          "mono": [
            0
          ]
        },
        {
          "zellen": [
            "§ 141 AO",
            "Gewerbetreibende, Land- u. Forstwirte",
            "mehr als 800.000 € Umsatz oder mehr als 80.000 € Gewinn; Pflicht ab dem Jahr nach Mitteilung des Finanzamts"
          ],
          "mono": [
            0,
            2
          ]
        }
      ]
    },
    {
      "typ": "vertiefung",
      "titel": "Wozu zwei Gesetze für dieselbe Pflicht?",
      "absaetze": [
        "Weil Handelsrecht und Steuerrecht unterschiedliche Ziele haben. Das HGB schützt Gläubiger, die AO sichert das Steueraufkommen.",
        "**§ 140 AO** heißt *derivative* Pflicht — sie leitet sich ab: Wer schon handelsrechtlich Bücher führen muss, muss es auch steuerlich. **§ 141 AO** heißt *originäre* Pflicht — sie entsteht eigenständig und greift genau dort, wo das HGB nicht greift: bei Gewerbetreibenden, die keine Kaufleute sind, aber groß genug geworden sind."
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a2",
  "titel": "Pflicht und Grundsätze",
  "hintergrundwissen": "Handelsrecht ordnet die kaufmännische Rechnungslegung, Steuerrecht die Ermittlung und Kontrolle der steuerlichen Bemessungsgrundlage. Deshalb können zwei Pflichten nebeneinander bestehen, ohne dass sie dasselbe Gesetz und denselben Zweck haben.",
  "erklaerung": "Die Buchführungspflicht beantwortet die Frage, wer Bücher führen muss. Die Grundsätze ordnungsgemäßer Buchführung beantworten, wie diese Bücher geführt werden müssen. Vollständigkeit, Richtigkeit, Klarheit, Nachprüfbarkeit und zeitgerechte Erfassung bilden dabei zusammen ein System. Ein Betrieb erfüllt die Pflicht also nicht schon dadurch, dass irgendwo Zahlen stehen.",
  "beispiel": "Ein Kaufmann darf keine Umsätze auslassen, nur weil sie bar bezahlt wurden. Ein kleiner Betrieb darf seine Belege auch digital verwalten, muss aber trotzdem sicherstellen, dass sie lesbar, vollständig und wiederauffindbar bleiben.",
  "fallbeispiel": "Ein nicht im Handelsregister eingetragenes Gewerbe wächst stark. Zuerst ist zu klären, ob bereits ein Handelsgewerbe vorliegt. Falls nicht, kann die steuerliche Buchführungspflicht unabhängig davon entstehen, sobald die gesetzlichen Voraussetzungen erfüllt sind. In einer Prüfung ist daher immer zuerst die Rechtsgrundlage zu benennen. Grenzfälle: Bei genau 800.000 € Umsatz und genau 80.000 € Gewinn entsteht die Pflicht nach § 141 AO nicht — erst ein Euro mehr reicht. Und auch dann beginnt sie nicht sofort, sondern mit dem Wirtschaftsjahr nach der Mitteilung des Finanzamts. Ein eingetragener Einzelkaufmann mit zweimal hintereinander 300.000 € Umsatz und 40.000 € Gewinn ist nach § 241a HGB befreit; eine GmbH mit denselben Zahlen bleibt buchführungspflichtig.",
  "pruefungsbezug": "Typische Aufgaben verlangen die Abgrenzung von § 238 HGB, § 140 AO und § 141 AO. Entscheidend ist nicht das Auswendiglernen einer Zahl, sondern die Begründung: Kaufmann, abgeleitete Pflicht oder eigenständige steuerliche Pflicht?",
  "typische_fehler": "HGB-Pflicht und steuerliche Pflicht werden gleichgesetzt, obwohl sie unterschiedliche Anknüpfungspunkte haben. Außerdem wird „richtig“ oft mit „vollständig“ verwechselt: Eine einzelne korrekte Buchung ersetzt keine lückenlose Erfassung.",
  "merksatz": "Die Pflicht sagt, ob Bücher geführt werden müssen; die GoB sagen, ob sie brauchbar geführt sind."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Die GoB — Spielregeln der Buchführung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Grundsätze ordnungsgemäßer Buchführung kennen und anwenden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Die GoB — Spielregeln der Buchführung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Grundsätze ordnungsgemäßer Buchführung stehen nicht vollständig im Gesetz. Sie haben sich aus Handelsbräuchen und Rechtsprechung entwickelt."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Grundsatz",
        "Bedeutung",
        "In der Praxis"
      ],
      "zeilen": [
        {
          "zellen": [
            "Richtigkeit",
            "Buchungen entsprechen dem echten Vorgang",
            "Keine erfundenen Buchungen"
          ],
          "detail": "**Verstoß:** Eine Privatrechnung wird als Betriebsausgabe gebucht. Das ist nicht nur ein GoB-Verstoß, sondern je nach Höhe und Vorsatz bereits Steuerhinterziehung."
        },
        {
          "zellen": [
            "Vollständigkeit",
            "Alle Geschäftsvorfälle werden erfasst",
            "Auch Kleinbeträge buchen"
          ],
          "detail": "**Verstoß:** Barumsätze werden „vergessen\". Genau hier setzen Kassennachschauen an — eine lückenhafte Kasse ist der häufigste Anlass für eine Gewinnschätzung."
        },
        {
          "zellen": [
            "Klarheit",
            "Buchungen sind eindeutig und lesbar",
            "Klare Kontobezeichnungen"
          ],
          "detail": "**Verstoß:** Buchungstext „Diverses\". Ein sachverständiger Dritter muss sich in angemessener Zeit zurechtfinden — das ist der Maßstab aus § 238 Abs. 1 HGB."
        },
        {
          "zellen": [
            "Vorsicht",
            "Im Zweifel niedrig bewerten",
            "Verluste sofort, Gewinne erst bei Realisierung"
          ],
          "detail": "**Anwendung:** Ein Kunde ist zahlungsunfähig geworden — die Forderung wird sofort abgeschrieben. Ein Grundstück ist im Wert gestiegen — der Gewinn wird erst beim Verkauf gebucht."
        },
        {
          "zellen": [
            "Stetigkeit",
            "Gewählte Methoden beibehalten",
            "Bewertung nicht willkürlich wechseln"
          ],
          "detail": "**Warum:** Nur so sind zwei Geschäftsjahre vergleichbar. Ohne Stetigkeit könnte ein Betrieb sein Ergebnis durch Methodenwechsel jedes Jahr schönrechnen."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb bucht einen Umsatz erst im Januar, obwohl die Leistung im Dezember erbracht und berechnet wurde. Welcher Grundsatz ist verletzt?",
      "optionen": [
        {
          "text": "Klarheit",
          "richtig": false,
          "echo": "Klarheit betrifft die Verständlichkeit von Buchungstexten und Kontobezeichnungen — hier ist aber die zeitliche Zuordnung das Problem."
        },
        {
          "text": "Vollständigkeit",
          "richtig": true,
          "echo": "Richtig. Vollständigkeit verlangt die lückenlose und zeitgerechte Erfassung. Ein Vorfall aus dem Dezember gehört ins Dezember-Geschäftsjahr — sonst stimmt das Jahresergebnis nicht."
        },
        {
          "text": "Stetigkeit",
          "richtig": false,
          "echo": "Stetigkeit betrifft Bewertungs- und Abschreibungsmethoden, die über Jahre gleich bleiben sollen — nicht den Zeitpunkt einer einzelnen Buchung."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Ein Verstoß gegen die GoB berechtigt das Finanzamt, den Gewinn selbst zu schätzen ({{par:ao-162|§ 162 AO}}) — und geschätzt wird fast immer zu deinen Ungunsten."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a3",
  "titel": "Die GoB sicher anwenden",
  "hintergrundwissen": "Die GoB verbinden Gesetz, kaufmännische Praxis und Prüfungsmaßstäbe. Sie sollen verhindern, dass Zahlen zwar rechnerisch stimmen, aber den Betrieb trotzdem falsch oder unvollständig darstellen.",
  "erklaerung": "Richtigkeit prüft den einzelnen Vorgang, Vollständigkeit die lückenlose Gesamtheit. Klarheit und Nachprüfbarkeit machen die Buchführung für Dritte verständlich. Vorsicht verhindert, dass unsichere Gewinne vorweggenommen werden; Stetigkeit sorgt dafür, dass Geschäftsjahre vergleichbar bleiben.",
  "beispiele": [
    "Eine private Tankrechnung darf nicht als betrieblicher Aufwand erscheinen: Der Beleg ist echt, aber der wirtschaftliche Inhalt passt nicht zum Unternehmen.",
    "Ein Umsatz vom 31.12. darf nicht einfach in den Januar verschoben werden, nur weil die Zahlung später eingeht: Die zeitliche Zuordnung muss den Geschäftsjahrgang abbilden."
  ],
  "fallbeispiel": "Bei einer Kassenprüfung fehlen mehrere Tagesabschlüsse. Einzelne Buchungen können korrekt sein, trotzdem ist die Kasse nicht vollständig und nicht mehr zuverlässig nachprüfbar. Die Lösung besteht nicht darin, eine Sammelbuchung zu erfinden, sondern die fehlenden Belege und Ursachen zu klären.",
  "typische_fehler": "GoB werden nicht als Checkliste einzelner Wörter gelernt, sondern auf den konkreten Sachverhalt angewandt. Besonders häufig werden Richtigkeit und Vollständigkeit verwechselt.",
  "verstaendnisfragen": [
    "Warum kann eine richtige Einzelbuchung trotzdem zu einer fehlerhaften Buchführung gehören? Weil andere Vorgänge fehlen können.",
    "Warum ist Stetigkeit für Prüfungen wichtig? Weil nur gleich angewandte Methoden einen sinnvollen Vergleich ermöglichen."
  ],
  "pruefungsbezug": "In Fallaufgaben zuerst den beobachteten Fehler beschreiben, dann den verletzten Grundsatz nennen und zuletzt die Auswirkung auf Aussagekraft oder Jahresergebnis erklären.",
  "merksatz": "Richtig ist der einzelne Vorgang; vollständig ist die gesamte Buchführung; klar und stetig wird sie prüfbar."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a4 · Inventur, Inventar, Bilanz

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Inventur, Inventar und Bilanz voneinander unterscheiden

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a4",
  "titel": "Inventur, Inventar, Bilanz",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Diese drei Begriffe werden in der Prüfung häufiger verwechselt als alles andere in diesem Kapitel — dabei bauen sie schlicht aufeinander auf."
    },
    {
      "typ": "grafik",
      "variante": "stufen",
      "kopf": "Vom Zählen zur Bilanz",
      "titel": "Muster GmbH · Abschluss zum 31.12.",
      "lead": "Dieselben Werte, drei Verarbeitungsstufen.",
      "stufen": [
        {
          "name": "Inventur",
          "text": "Die **Inventur** ist der *Vorgang*: zählen, wiegen, messen — und für alles Unkörperliche die Unterlagen auswerten.",
          "darstellung": "zaehlen",
          "posten": [
            {
              "name": "Maschinen",
              "wert": 60000
            },
            {
              "name": "Fuhrpark",
              "wert": 40000
            },
            {
              "name": "Waren",
              "wert": 32000
            },
            {
              "name": "Bank",
              "wert": 15000
            },
            {
              "name": "Kasse",
              "wert": 3000
            },
            {
              "name": "Darlehen",
              "wert": 50000
            },
            {
              "name": "Verb. LuL",
              "wert": 30000
            }
          ]
        },
        {
          "name": "Inventar",
          "text": "Das **Inventar** ist das *Ergebnis*: ein Verzeichnis, das jede Position einzeln mit Wert aufführt. Unten steht das {{begriff:reinvermoegen|Reinvermögen}} — das spätere Eigenkapital.",
          "darstellung": "verzeichnis",
          "gruppen": [
            {
              "titel": "I. Vermögen",
              "posten": [
                {
                  "name": "Maschinen",
                  "wert": 60000
                },
                {
                  "name": "Fuhrpark",
                  "wert": 40000
                },
                {
                  "name": "Waren",
                  "wert": 32000
                },
                {
                  "name": "Bank & Kasse",
                  "wert": 18000
                }
              ],
              "summe": {
                "name": "Gesamtvermögen",
                "wert": 150000
              }
            },
            {
              "titel": "II. Schulden",
              "posten": [
                {
                  "name": "Bankdarlehen",
                  "wert": 50000
                },
                {
                  "name": "Verbindlichkeiten LuL",
                  "wert": 30000
                }
              ],
              "summe": {
                "name": "Gesamtschulden",
                "wert": 80000
              }
            }
          ],
          "ergebnis": {
            "name": "III. Reinvermögen",
            "wert": 70000
          }
        },
        {
          "name": "Bilanz",
          "text": "Die **Bilanz** ist die *Verdichtung*. Ändere die Werte — die beiden Seiten bleiben immer gleich hoch. Das ist keine Behauptung, sondern die Definition des Eigenkapitals.",
          "darstellung": "bilanz-rechner",
          "eingaben": [
            {
              "id": "av",
              "label": "Anlagevermögen",
              "start": 100000,
              "seite": "aktiva"
            },
            {
              "id": "uv",
              "label": "Umlaufvermögen",
              "start": 50000,
              "seite": "aktiva"
            },
            {
              "id": "dl",
              "label": "Bankdarlehen",
              "start": 50000,
              "seite": "passiva"
            },
            {
              "id": "vb",
              "label": "Verbindlichkeiten",
              "start": 30000,
              "seite": "passiva"
            }
          ],
          "hinweis_negativ": "Die Schulden übersteigen das Vermögen: Das Eigenkapital ist negativ. In der Bilanz erscheint dann ein *nicht durch Eigenkapital gedeckter Fehlbetrag* auf der Aktivseite — die Gleichung gilt weiterhin."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Inventur, Inventar oder Bilanz — was ist gemeint?",
      "kategorien": [
        "Inventur",
        "Inventar",
        "Bilanz"
      ],
      "aufgaben": [
        {
          "text": "Das Lager wird am 31.12. Stück für Stück durchgezählt.",
          "loesung": "Inventur"
        },
        {
          "text": "Eine Liste führt 340 Einzelpositionen mit Menge und Wert auf.",
          "loesung": "Inventar"
        },
        {
          "text": "Zwei Seiten stehen sich gegenüber und sind gleich hoch.",
          "loesung": "Bilanz"
        },
        {
          "text": "Pflichtbestandteil des Jahresabschlusses nach § 242 HGB.",
          "loesung": "Bilanz"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Der Dreisatz für die Prüfung: **Inventur** = der Vorgang des Zählens. **Inventar** = das schriftliche Ergebnis. **Bilanz** = die verdichtete Gegenüberstellung. Und quer dazu: Reinvermögen = Vermögen − Schulden = Eigenkapital."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a4",
  "titel": "Inventur, Inventar und Bilanz",
  "vorauswissen": "Vermögen beantwortet die Frage, welche wirtschaftlichen Werte vorhanden sind; Schulden zeigen, welche Ansprüche Dritter bestehen. Die Differenz ist das Eigenkapital beziehungsweise Reinvermögen.",
  "erklaerung": "Die Inventur ist der Vorgang der Bestandsaufnahme. Das Inventar ist das ausführliche Ergebnis mit Mengen und Werten. Die Bilanz verdichtet dieses Ergebnis in die beiden Seiten Aktiva und Passiva. Es handelt sich also um drei Stufen desselben Gedankens: feststellen, auflisten, verdichten.",
  "beispiel": "Am Jahresende zählt MAKEL die Stoffe im Lager und bewertet sie. Diese Tätigkeit ist die Inventur. Die Liste mit Stoffart, Menge und Wert ist das Inventar. In der Bilanz erscheint daraus nur noch der zusammengefasste Bilanzposten für Vorräte.",
  "beispiele": [
    "Wer 120 Kartons zählt und jeden Karton bewertet, führt eine körperliche Inventur durch. Die aufgeschriebene Einzelaufstellung ist das Inventar.",
    "Wer im Jahresabschluss nur ‚Vorräte 8.400 €‘ auf der Aktivseite ausweist, zeigt die verdichtete Bilanzdarstellung."
  ],
  "fallbeispiel": "Das Inventar weist 150.000 € Vermögen und 80.000 € Schulden aus. Das Reinvermögen beträgt 70.000 €. In der Bilanz wird dieser Betrag als Eigenkapital auf der Passivseite ausgewiesen; dadurch bleiben Aktiva und Passiva gleich hoch.",
  "pruefungsbezug": "Bei Zuordnungsaufgaben zuerst auf die Form achten: Tätigkeit = Inventur, detaillierte Liste = Inventar, verdichtete Gegenüberstellung = Bilanz. Danach kann die Eigenkapitalformel als Kontrolle dienen.",
  "typische_fehler": "Die Bilanz wird als detaillierte Inventarliste beschrieben oder die Inventur als fertiges Dokument bezeichnet. Auch ein bloßer Blick in die Buchhaltung ersetzt die körperliche Bestandsaufnahme nicht, wenn tatsächlich vorhandene Bestände geprüft werden müssen.",
  "merksatz": "Inventur ist der Vorgang, Inventar die Liste, Bilanz die verdichtete Gegenüberstellung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Die Bilanz

**Datei:** `k2-bilanz.kapitel.json` · SHA-256 `0158ece1769fc1f982a6fa8116034a027b47a3efcef37175d29faf012a2c9482`

**Konkreter Kapitelauftrag:** Ein Vermögen aus zwei Perspektiven erklären und mehrere Bilanzveränderungen nachvollziehen; Gewinn und Liquidität trennen.

**Einordnung:** Aufbau, Bilanzgleichung und die vier Veränderungsarten.

### b1 · Was ist die Bilanz?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Aufbau einer Bilanz aus Aktiva und Passiva beschreiben können

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `merke-1`, `tabelle-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Was ist die Bilanz?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Bilanz ist eine Gegenüberstellung: Auf der einen Seite das gesamte Vermögen eines Unternehmens, auf der anderen die Herkunft dieses Vermögens. Sie wird immer auf einen {{begriff:bilanzstichtag|Bilanzstichtag}} aufgestellt — in der Regel den 31. Dezember — und ist nach {{par:hgb-242|§ 242 HGB}} Pflichtbestandteil des Jahresabschlusses."
    },
    {
      "typ": "absatz",
      "text": "Die linke Seite heißt **Aktiva** und zeigt, wie das Kapital verwendet wurde. Die rechte Seite heißt **Passiva** und zeigt, woher es stammt. Weil es sich um dasselbe Kapital handelt, nur aus zwei Blickwinkeln betrachtet, gilt zwangsläufig: ==Aktiva = Passiva==."
    },
    {
      "typ": "merke",
      "text": "Aktiva zeigt, **wo** das Geld steckt. Passiva zeigt, **woher** es kommt. Es ist dasselbe Geld — deshalb sind beide Seiten immer gleich hoch, nach jeder einzelnen Buchung.",
      "karteikarte": "Was zeigt die Aktivseite, was die Passivseite — und warum sind beide zwangsläufig gleich hoch?"
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Aktiva · Mittelverwendung",
        "Passiva · Mittelherkunft"
      ],
      "zeilen": [
        {
          "zellen": [
            "A. Anlagevermögen",
            "A. Eigenkapital"
          ]
        },
        {
          "zellen": [
            "Immaterielle Vermögensgegenstände",
            "Gezeichnetes Kapital"
          ]
        },
        {
          "zellen": [
            "Sachanlagen",
            "Gewinnrücklagen"
          ]
        },
        {
          "zellen": [
            "Finanzanlagen",
            "Jahresüberschuss / -fehlbetrag"
          ]
        },
        {
          "zellen": [
            "B. Umlaufvermögen",
            "B. Rückstellungen"
          ]
        },
        {
          "zellen": [
            "Vorräte",
            "z. B. Urlaubsrückstellung"
          ]
        },
        {
          "zellen": [
            "Forderungen aus LuL",
            "C. Verbindlichkeiten"
          ]
        },
        {
          "zellen": [
            "Bankguthaben, Kasse",
            "Bankdarlehen, Verbindlichkeiten LuL"
          ]
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ein Geschäftsvorfall verändert mindestens zwei Werte der Buchführung.",
    "Aktiva und Passiva sind zwei Seiten desselben betrieblichen Kapitals."
  ],
  "erklaerung": "Die Bilanz ordnet dieselbe wirtschaftliche Situation aus zwei Blickwinkeln. Auf der Aktivseite steht, in welcher Form das Kapital im Unternehmen gebunden ist. Auf der Passivseite steht, aus welchen Quellen dieses Kapital stammt. Deshalb ist die Gleichheit nicht nur eine Rechenregel: Jede Finanzierung muss irgendwo im Vermögen wiederzufinden sein.",
  "beispiele": [
    "Finanziert ein Betrieb eine Maschine mit einem Bankdarlehen, erscheint die Maschine auf der Aktivseite und das Darlehen auf der Passivseite.",
    "Kauft der Betrieb Waren auf Rechnung, steigen die Vorräte auf der Aktivseite und die Verbindlichkeiten aus Lieferungen und Leistungen auf der Passivseite."
  ],
  "fallbeispiel": "In der Ausgangsbilanz der Grafik stehen auf der Aktivseite Anlagevermögen von 60.000 €, Waren von 20.000 €, Bank von 18.000 € und Kasse von 2.000 €. Zusammen ergibt das 100.000 €. Auf der Passivseite stehen Eigenkapital von 55.000 €, ein langfristiges Darlehen von 30.000 € und Verbindlichkeiten von 15.000 €. Auch hier lautet die Summe 100.000 €. Die Bilanz ist ausgeglichen, weil beide Seiten dasselbe Kapital beschreiben.",
  "typische_fehler": "Aktiva und Passiva werden als ‚gut‘ und ‚schlecht‘ missverstanden. Außerdem wird die Passivseite manchmal mit den Kontoständen verwechselt. Sie zeigt aber nicht nur Schulden, sondern auch das Eigenkapital als Herkunft des Kapitals.",
  "verstaendnisfragen": [
    "Warum muss eine Bilanz immer ausgeglichen sein? Weil jeder Vermögensposten durch Eigen- oder Fremdkapital finanziert ist und beide Seiten dieselbe Gesamtsumme darstellen.",
    "Was bedeutet die Aussage ‚Aktiva zeigt die Mittelverwendung‘? Sie beschreibt, worin das Kapital steckt, zum Beispiel in Maschinen, Waren, Bankguthaben oder Kasse."
  ],
  "pruefungsbezug": "Bei einer Bilanzaufgabe zuerst die Seiten benennen und anschließend die Summe jeder Seite prüfen. Eine nicht ausgeglichene Summe weist auf einen Zuordnungs- oder Rechenfehler hin.",
  "merksatz": "Aktiva zeigt, wo das Kapital steckt; Passiva zeigt, woher es stammt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Aktiva — was der Betrieb besitzt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aktiva korrekt in Anlage- und Umlaufvermögen einteilen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Aktiva — was der Betrieb besitzt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Aktivseite ist in zwei Gruppen geteilt: {{begriff:anlagevermoegen|Anlagevermögen}} und {{begriff:umlaufvermoegen|Umlaufvermögen}}. Der Unterschied ist die Verweildauer im Betrieb — und daran hängt später die Frage, ob abgeschrieben wird oder nicht."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Gruppe",
        "Verweildauer",
        "Typische Positionen"
      ],
      "zeilen": [
        {
          "zellen": [
            "Anlagevermögen (AV)",
            "dauerhaft, > 1 Jahr",
            "Grundstücke, Gebäude, Maschinen, Fuhrpark, Patente, Beteiligungen"
          ],
          "detail": "**Warum die Trennung zählt:** Nur Anlagevermögen wird über die Nutzungsdauer abgeschrieben. Die Zuordnung entscheidet also darüber, ob eine Anschaffung den Gewinn sofort mindert oder über Jahre verteilt."
        },
        {
          "zellen": [
            "Umlaufvermögen (UV)",
            "kurzfristig, < 1 Jahr",
            "Vorräte, Waren, Forderungen aus LuL, Bank, Kasse"
          ],
          "detail": "**Achtung, Denkfalle:** Entscheidend ist nicht, *was* ein Gegenstand ist, sondern *wozu* der Betrieb ihn hält. Ein Auto ist beim Autohändler Ware (UV), im Fuhrpark einer Spedition Anlagevermögen (AV)."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Nicht der Gegenstand entscheidet, sondern die Absicht. Dasselbe Fahrzeug kann bei einem Betrieb Anlagevermögen und bei einem anderen Umlaufvermögen sein.",
      "karteikarte": "Wovon hängt es ab, ob ein Gegenstand zum Anlage- oder zum Umlaufvermögen gehört?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Die Aktivseite enthält Vermögenswerte des Betriebs.",
    "Anlage- und Umlaufvermögen unterscheiden sich durch ihre betriebliche Verwendung und Verweildauer."
  ],
  "erklaerung": "Anlagevermögen dient dem Betrieb dauerhaft, während Umlaufvermögen kurzfristig verbraucht, verkauft oder in eine andere Form umgewandelt wird. Die Einteilung ist wichtig, weil sich daran die weitere Behandlung orientiert: Anlagevermögen wird über die Nutzungsdauer abgeschrieben, Umlaufvermögen wird nicht nach demselben Schema behandelt.",
  "beispiele": [
    "Ein Fahrzeug ist beim Autohändler eine Ware zum Weiterverkauf und damit Umlaufvermögen. Bei einer Spedition dient es dauerhaft dem Betriebszweck und ist Anlagevermögen.",
    "Eine Maschine gehört zum Anlagevermögen, Waren im Lager sowie Bank- und Kassenbestände zum Umlaufvermögen."
  ],
  "fallbeispiel": "Ordne vier Positionen ein: Eine dauerhaft eingesetzte Maschine gehört zum Anlagevermögen. Waren, die verkauft werden sollen, gehören zum Umlaufvermögen. Ein Bankguthaben und der Kassenbestand gehören ebenfalls zum Umlaufvermögen. Entscheidend ist bei jeder Position die Frage: Soll sie dem Betrieb dauerhaft dienen oder kurzfristig umgesetzt werden?",
  "typische_fehler": "Nicht die äußere Art des Gegenstands entscheidet. Besonders häufig wird jedes Fahrzeug automatisch als Anlagevermögen bezeichnet oder jede Maschine als Umlaufvermögen, ohne die betriebliche Absicht zu prüfen.",
  "verstaendnisfragen": [
    "Warum ist die Zuordnung für Abschreibungen wichtig? Weil die Nutzungsdauer bei Anlagevermögen die Verteilung des Aufwands bestimmt.",
    "Kann derselbe Gegenstand in zwei Betrieben unterschiedlich eingeordnet werden? Ja. Die betriebliche Zweckbestimmung entscheidet, nicht allein die Bezeichnung des Gegenstands."
  ],
  "pruefungsbezug": "Bei Zuordnungsaufgaben nicht nur den Gegenstand lesen, sondern den Verwendungszweck markieren. Formulierungen wie ‚zum Weiterverkauf‘ sprechen für Umlaufvermögen; ‚dauerhaft im Betrieb eingesetzt‘ für Anlagevermögen.",
  "merksatz": "Nicht der Gegenstand entscheidet, sondern die Absicht und die Verweildauer im Betrieb."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Passiva — woher das Kapital kommt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eigenkapital, Rückstellungen und Verbindlichkeiten unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Passiva — woher das Kapital kommt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Passivseite beantwortet die Frage, wem das Kapital gehört. {{begriff:eigenkapital|Eigenkapital}} stammt von den Eigentümern, {{begriff:fremdkapital|Fremdkapital}} von Dritten und muss zurückgezahlt werden. Wichtig für die Prüfung: Das HGB kennt dazwischen eine eigene Kategorie."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Position",
        "Was sie ist",
        "Beispiele"
      ],
      "zeilen": [
        {
          "zellen": [
            "Eigenkapital",
            "Kapital der Eigentümer; steigt mit Gewinn, sinkt mit Verlust",
            "Stammkapital, Gewinnrücklagen"
          ]
        },
        {
          "zellen": [
            "Rückstellungen",
            "Schulden mit ungewisser Höhe oder ungewissem Zeitpunkt",
            "Urlaub, Prozesskosten, Steuern"
          ]
        },
        {
          "zellen": [
            "Verbindlichkeiten",
            "Sichere Schulden mit bekanntem Betrag und Fälligkeit",
            "Bankdarlehen, Verbindlichkeiten LuL"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "{{begriff:rueckstellung|Rückstellungen}} gehören **nicht** zu den {{begriff:verbindlichkeit|Verbindlichkeiten}}. Nach {{par:hgb-249|§ 249 HGB}} bilden sie eine eigene Bilanzposition. Der Unterschied liegt allein in der Gewissheit: Verbindlichkeiten sind dem Grunde *und* der Höhe nach sicher, Rückstellungen nicht."
    },
    {
      "typ": "check",
      "frage": "Ein Mitarbeiter hat zum 31.12. noch acht Urlaubstage offen. Wie wird das in der Bilanz erfasst?",
      "optionen": [
        {
          "text": "Als Verbindlichkeit",
          "richtig": false,
          "echo": "Naheliegend, aber falsch. Eine Verbindlichkeit setzt voraus, dass Betrag und Fälligkeit feststehen. Wann der Mitarbeiter den Urlaub nimmt und was er dann kostet, ist am 31.12. offen."
        },
        {
          "text": "Als Rückstellung",
          "richtig": true,
          "echo": "Richtig. Die Verpflichtung ist dem Grunde nach entstanden — der Urlaubsanspruch besteht —, aber Höhe und Zeitpunkt sind ungewiss. Genau das ist die Definition der Rückstellung nach § 249 HGB."
        },
        {
          "text": "Gar nicht, weil noch nichts gezahlt wurde",
          "richtig": false,
          "echo": "Das würde gegen das Vorsichtsprinzip aus K1 verstoßen. Die Kosten gehören wirtschaftlich in das Jahr, in dem der Anspruch entstanden ist — nicht in das Jahr der Auszahlung."
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
    "Die Passivseite beschreibt die Herkunft des Kapitals.",
    "Schulden und Eigenkapital sind wirtschaftlich nicht dasselbe."
  ],
  "erklaerung": "Eigenkapital gehört den Eigentümern und verändert sich unter anderem durch Gewinn oder Verlust. Fremdkapital stammt von Dritten. Innerhalb des Fremdkapitals muss zwischen sicheren Verbindlichkeiten und Rückstellungen unterschieden werden: Bei einer Verbindlichkeit stehen Betrag und Fälligkeit fest; bei einer Rückstellung ist die Verpflichtung bereits entstanden, aber Höhe oder Zeitpunkt sind noch ungewiss.",
  "beispiele": [
    "Ein Bankdarlehen mit feststehendem Betrag und vereinbarter Rückzahlung ist eine Verbindlichkeit.",
    "Offene Urlaubstage am Bilanzstichtag führen zu einer Rückstellung, weil der Anspruch besteht, aber Zeitpunkt und genaue Kosten der Inanspruchnahme offen sind."
  ],
  "fallbeispiel": "Ein Mitarbeiter hat zum 31.12. noch acht Urlaubstage offen. Die Verpflichtung gehört wirtschaftlich in das laufende Jahr. Weil noch nicht feststeht, wann der Urlaub genommen wird und welche Kosten genau entstehen, wird der Betrag als Rückstellung und nicht als Verbindlichkeit erfasst. ‚Noch nicht bezahlt‘ ist also kein Grund, den Sachverhalt wegzulassen.",
  "typische_fehler": "Rückstellungen werden mit Verbindlichkeiten gleichgesetzt oder erst bei Zahlung berücksichtigt. Der entscheidende Prüfbegriff ist die Gewissheit: sicherer Betrag und bekannte Fälligkeit sprechen für Verbindlichkeit, Unsicherheit für Rückstellung.",
  "verstaendnisfragen": [
    "Warum reicht es nicht aus, dass noch kein Geld geflossen ist? Weil die Buchführung wirtschaftliche Verpflichtungen periodengerecht abbildet.",
    "Was ist das einzige zentrale Unterscheidungsmerkmal zwischen Rückstellung und Verbindlichkeit? Der Grad der Gewissheit über Höhe und Zeitpunkt."
  ],
  "pruefungsbezug": "In Fällen zuerst prüfen, ob die Verpflichtung bereits besteht. Danach fragen: Sind Betrag und Fälligkeit sicher? Wenn nein, ist die Rückstellung die passende Bilanzposition.",
  "merksatz": "Verbindlichkeit = sicher; Rückstellung = Verpflichtung mit ungewisser Höhe oder ungewissem Zeitpunkt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b4 · Die vier Bilanzveränderungsarten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die vier Bilanzveränderungsarten erkennen und begründen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `grafik-1`, `zuordnen-1`, `merke-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b4",
  "titel": "Die vier Bilanzveränderungsarten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jeder Geschäftsvorfall verändert die Bilanz — aber immer so, dass beide Seiten gleich hoch bleiben. Dafür gibt es genau vier Möglichkeiten. Wer sie kennt, kann jeden Buchungssatz auf Plausibilität prüfen: Stimmt danach noch Aktiva = Passiva?"
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Was passiert",
        "Bilanzsumme"
      ],
      "zeilen": [
        {
          "zellen": [
            "Aktiv-Tausch",
            "Ein Aktivposten steigt, ein anderer sinkt",
            "unverändert"
          ],
          "detail": "**Beispiel:** Barabhebung von 5.000 € vom Bankkonto. Bank sinkt, Kasse steigt. Es hat sich nur die Form des Vermögens geändert, nicht seine Höhe — und die Passivseite bleibt völlig unberührt."
        },
        {
          "zellen": [
            "Passiv-Tausch",
            "Ein Passivposten steigt, ein anderer sinkt",
            "unverändert"
          ],
          "detail": "**Beispiel:** Ein kurzfristiger Kredit über 10.000 € wird in ein langfristiges Darlehen umgeschuldet. Der Betrieb schuldet weiterhin dasselbe Geld — nur jemand anderem oder zu anderen Bedingungen."
        },
        {
          "zellen": [
            "Aktiv-Passiv-Mehrung",
            "Ein Aktiv- und ein Passivposten steigen",
            "steigt"
          ],
          "detail": "**Beispiel:** Warenkauf auf Ziel über 8.000 €. Der Betrieb hat mehr Waren, schuldet aber auch mehr. Die Bilanz wird länger — was nicht bedeutet, dass es dem Betrieb besser geht."
        },
        {
          "zellen": [
            "Aktiv-Passiv-Minderung",
            "Ein Aktiv- und ein Passivposten sinken",
            "sinkt"
          ],
          "detail": "**Beispiel:** Bezahlung einer Lieferantenrechnung über 8.000 € per Bank. Geld fließt ab, die Schuld verschwindet. Die Bilanz wird kürzer — auch das sagt nichts über Erfolg oder Misserfolg."
        }
      ]
    },
    {
      "typ": "grafik",
      "variante": "veraenderung",
      "kopf": "Vier Wege, dieselbe Regel",
      "titel": "Muster GmbH · Ausgangsbilanz 100.000 €",
      "lead": "Wähle einen Geschäftsvorfall und sieh zu, was mit beiden Seiten passiert.",
      "ausgang": {
        "aktiva": [
          {
            "id": "av",
            "name": "Anlagevermögen",
            "wert": 60000
          },
          {
            "id": "waren",
            "name": "Waren",
            "wert": 20000
          },
          {
            "id": "bank",
            "name": "Bank",
            "wert": 18000
          },
          {
            "id": "kasse",
            "name": "Kasse",
            "wert": 2000
          }
        ],
        "passiva": [
          {
            "id": "ek",
            "name": "Eigenkapital",
            "wert": 55000
          },
          {
            "id": "darlehen",
            "name": "Darlehen langfristig",
            "wert": 30000
          },
          {
            "id": "verb",
            "name": "Verbindlichkeiten LuL",
            "wert": 15000
          }
        ]
      },
      "vorfaelle": [
        {
          "text": "5.000 € von der Bank abheben und in die Kasse legen",
          "art": "Aktiv-Tausch",
          "bewegungen": [
            {
              "posten": "bank",
              "delta": -5000
            },
            {
              "posten": "kasse",
              "delta": 5000
            }
          ],
          "echo": "Beide Bewegungen liegen auf der Aktivseite. Das Vermögen wechselt nur die Form — die Bilanzsumme bleibt bei 100.000 €."
        },
        {
          "text": "10.000 € kurzfristigen Kredit in ein langfristiges Darlehen umwandeln",
          "art": "Passiv-Tausch",
          "bewegungen": [
            {
              "posten": "verb",
              "delta": -10000
            },
            {
              "posten": "darlehen",
              "delta": 10000
            }
          ],
          "echo": "Beide Bewegungen liegen auf der Passivseite. Der Betrieb schuldet dasselbe Geld — nur anders strukturiert. Die Bilanzsumme bleibt bei 100.000 €."
        },
        {
          "text": "Waren für 8.000 € auf Ziel kaufen",
          "art": "Aktiv-Passiv-Mehrung",
          "bewegungen": [
            {
              "posten": "waren",
              "delta": 8000
            },
            {
              "posten": "verb",
              "delta": 8000
            }
          ],
          "echo": "Je eine Bewegung auf beiden Seiten, beide nach oben. Die Bilanz wird länger: 108.000 €. Mehr Vermögen, aber auch mehr Schulden — das Eigenkapital hat sich nicht verändert."
        },
        {
          "text": "Lieferantenrechnung über 8.000 € per Bank bezahlen",
          "art": "Aktiv-Passiv-Minderung",
          "bewegungen": [
            {
              "posten": "bank",
              "delta": -8000
            },
            {
              "posten": "verb",
              "delta": -8000
            }
          ],
          "echo": "Je eine Bewegung auf beiden Seiten, beide nach unten. Die Bilanz wird kürzer: 92.000 €. Geld weg, Schuld weg — dem Betrieb geht es deshalb weder besser noch schlechter."
        }
      ],
      "regel": "Prüfstrategie: Welche zwei Positionen ändert der Vorgang? Beide auf einer Seite → Tausch. Auf beiden Seiten → Mehrung oder Minderung."
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Veränderungsart liegt vor?",
      "kategorien": [
        "Aktiv-Tausch",
        "Passiv-Tausch",
        "Mehrung",
        "Minderung"
      ],
      "aufgaben": [
        {
          "text": "Ein Kunde bezahlt eine offene Rechnung per Überweisung.",
          "loesung": "Aktiv-Tausch"
        },
        {
          "text": "Der Betrieb kauft einen Laptop für 1.200 € auf Rechnung.",
          "loesung": "Mehrung"
        },
        {
          "text": "Ein Gesellschafter wandelt sein Darlehen in Eigenkapital um.",
          "loesung": "Passiv-Tausch"
        },
        {
          "text": "Ein Bankdarlehen wird per Überweisung getilgt.",
          "loesung": "Minderung"
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Bilanzverlängerung heißt nicht Erfolg und Bilanzverkürzung nicht Misserfolg. Ob ein Betrieb Gewinn gemacht hat, sieht man nicht an der Bilanzsumme, sondern am {{begriff:eigenkapital|Eigenkapital}}.",
      "karteikarte": "Warum sagt eine steigende Bilanzsumme nichts über den Erfolg eines Betriebs aus?"
    },
    {
      "typ": "vertiefung",
      "titel": "Warum genau vier — und nicht fünf?",
      "absaetze": [
        "Weil jeder Geschäftsvorfall mindestens zwei Positionen berührt und jede Position entweder links oder rechts steht. Daraus ergeben sich vier Kombinationen: beide links, beide rechts, oder je eine pro Seite — und diese letzte Möglichkeit zerfällt in zwei Richtungen, nach oben und nach unten.",
        "Buchungen, die mehr als zwei Konten berühren, sind keine fünfte Art. Sie lassen sich immer in mehrere der vier Grundfälle zerlegen."
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b4",
  "vorauswissen": [
    "Jede Buchung betrifft mindestens zwei Konten.",
    "Aktivkonten stehen auf der linken, Passivkonten auf der rechten Bilanzseite."
  ],
  "erklaerung": "Für die vier Bilanzveränderungsarten musst du nicht sofort den vollständigen Buchungssatz bilden. Es reicht zunächst, die beiden betroffenen Bilanzpositionen zu finden und ihre Seiten zu vergleichen. Liegen beide Positionen auf derselben Seite, handelt es sich um einen Tausch. Liegt je eine Position auf Aktiva und Passiva, steigt oder sinkt die Bilanzsumme.",
  "beispiele": [
    "Bei einer Abhebung von 5.000 € sinkt Bank und Kasse steigt. Beide Konten liegen auf der Aktivseite: Aktiv-Tausch, Bilanzsumme unverändert.",
    "Beim Kauf von Waren für 8.000 € auf Ziel steigen Waren und Verbindlichkeiten. Je eine Position auf jeder Seite steigt: Aktiv-Passiv-Mehrung, Bilanzsumme plus 8.000 €."
  ],
  "fallbeispiel": "Ein Laptop für 1.200 € wird auf Ziel gekauft. Der Laptop beziehungsweise die Betriebs- und Geschäftsausstattung steigt auf der Aktivseite um 1.200 €. Gleichzeitig steigen die Verbindlichkeiten auf der Passivseite um 1.200 €. Damit liegt eine Aktiv-Passiv-Mehrung vor und die Bilanzsumme wächst um 1.200 €. Das Eigenkapital bleibt unverändert, weil der Vorgang noch keinen Aufwand oder Ertrag darstellt.",
  "typische_fehler": "Eine steigende Bilanzsumme wird vorschnell als Gewinn gedeutet. Ebenso wird eine Zahlung an einen Lieferanten als Aufwand behandelt, obwohl bei der reinen Begleichung nur Bank und Verbindlichkeit sinken.",
  "verstaendnisfragen": [
    "Wie unterscheidest du Aktiv-Tausch und Aktiv-Passiv-Mehrung? Beim Aktiv-Tausch ändern sich zwei Aktivposten; bei der Mehrung steigen ein Aktiv- und ein Passivposten.",
    "Warum kann eine Bilanzverkürzung neutral sein? Bei der Begleichung einer Schuld sinken Bank und Verbindlichkeit gleichzeitig; Vermögen und Schulden nehmen im gleichen Umfang ab."
  ],
  "pruefungsbezug": "Arbeite immer in zwei Schritten: betroffene Konten und Kontoseiten bestimmen, anschließend Richtung der Veränderung prüfen. Erst danach die Bezeichnung Aktiv-Tausch, Passiv-Tausch, Mehrung oder Minderung wählen.",
  "merksatz": "Zwei Positionen finden, Seiten vergleichen, Richtung prüfen — so entsteht die richtige Veränderungsart."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Konten & Buchungssätze

**Datei:** `k3-konten.kapitel.json` · SHA-256 `5fc13a9519d15dbe88d8b6329eeace7d32e72507612942a3d4060a2b81ffec7e`

**Konkreter Kapitelauftrag:** Einen Beleg über Kontotyp und Veränderung zum Buchungssatz entwickeln; Soll/Haben nicht mit Einnahme/Ausgabe verwechseln.

**Einordnung:** T-Konten, Aktiv- und Passivkonten, EBK und SBK — und die Regel „Soll an Haben“.

### c1 · Warum Konten?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das T-Konto aufbauen und Soll von Haben unterscheiden

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `merke-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Warum Konten?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Bilanz aus K2 ist eine Momentaufnahme. Sie zeigt den 31. Dezember — nicht, was im Jahr passiert ist. Genau dafür gibt es Konten: Für jede Bilanzposition wird ein eigenes Konto geführt, das alle Bewegungen des Jahres aufzeichnet. Am Jahresende setzt man daraus wieder eine Bilanz zusammen."
    },
    {
      "typ": "absatz",
      "text": "Jedes Konto hat die Form eines T — daher {{begriff:t-konto|T-Konto}}. Die linke Seite heißt {{begriff:soll|Soll}}, die rechte {{begriff:haben|Haben}}. Diese Wörter sind historisch und bedeuten heute nichts mehr. ==Soll und Haben sind Ortsangaben, keine Wertungen==: Ein Betrag im Soll ist weder gut noch schlecht, er steht einfach links."
    },
    {
      "typ": "merke",
      "text": "Soll = links. Haben = rechts. Wer versucht, sich die Begriffe inhaltlich herzuleiten, verliert Zeit — sie sind reine Konvention und müssen einfach sitzen.",
      "karteikarte": "Was bedeuten Soll und Haben — und was bedeuten sie ausdrücklich nicht?"
    },
    {
      "typ": "vertiefung",
      "titel": "Woher die seltsamen Wörter kommen",
      "absaetze": [
        "Aus der italienischen Kaufmannsbuchführung des 15. Jahrhunderts. Die Konten waren ursprünglich Personenkonten: Links stand, was der Kunde *soll* — also schuldet. Rechts stand, was er *hat* — also bereits geleistet hat.",
        "Als das System auf Sachkonten übertragen wurde, blieben die Namen. Der ursprüngliche Sinn ging verloren, die Bezeichnungen nicht. Genau deshalb hilft es nicht, sie logisch verstehen zu wollen."
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Die Bilanz zeigt Vermögen und Kapital zu einem Stichtag.",
    "Ein Konto sammelt alle Veränderungen einer Bilanzposition."
  ],
  "hintergrundwissen": "Soll und Haben sind keine Bewertungen, sondern feste Seitenbezeichnungen. Das T-Konto trennt Bewegungen, damit Anfangsbestand, Zugänge, Abgänge und Saldo nachvollziehbar bleiben.",
  "ablauf": [
    "Bilanzposition und Konto bestimmen.",
    "Anfangsbestand auf der Bilanzseite eröffnen.",
    "Jeden Zugang und Abgang auf der passenden Seite eintragen.",
    "Saldo als Ausgleich ermitteln und Konto abschließen."
  ],
  "beispiele": [
    "Ein Bankguthaben von 10.000 € steht als Aktivkonto im Soll. Eine Einzahlung erhöht die Bank ebenfalls im Soll; eine Überweisung verringert sie im Haben.",
    "Ein Darlehen ist ein Passivkonto. Die Aufnahme erhöht den Bestand im Haben, die Tilgung verringert ihn im Soll."
  ],
  "fallbeispiel": "Auf dem Bankkonto stehen 10.000 €. Es gehen 2.000 € ein und 1.500 € ab. Der Endbestand beträgt 10.500 €. Die Zugänge stehen im Soll, der Abgang im Haben; der Saldo wird erst danach als Ausgleich eingetragen.",
  "typische_fehler": "Soll bedeutet nicht Ausgabe und Haben nicht Einnahme. Diese Zuordnung gilt nur in bestimmten Zusammenhängen und führt sonst zu falschen Buchungen.",
  "verstaendnisfragen": [
    "Warum kann eine Einnahme im Soll stehen? Weil die Seite vom Kontotyp abhängt; ein Bankkonto ist ein Aktivkonto.",
    "Was ist der Saldo? Der Ausgleichsbetrag, der beide Kontoseiten rechnerisch gleich macht."
  ],
  "pruefungsbezug": "In Aufgaben zuerst den Kontotyp markieren und erst dann Soll/Haben entscheiden.",
  "merksatz": "Erst Kontotyp, dann Veränderung, dann Seite."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Aktivkonto und Passivkonto — spiegelverkehrt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Buchungen auf Aktiv- und Passivkonten korrekt zuordnen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Aktivkonto und Passivkonto — spiegelverkehrt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die entscheidende Frage bei jedem Konto lautet: Auf welcher Seite beginnt der {{begriff:anfangsbestand|Anfangsbestand}}, und wo werden Zugänge gebucht? Die Antwort steht in der Bilanz. Ein {{begriff:bestandskonto|Bestandskonto}} verhält sich genau so, wie seine Position in der Bilanz steht — Aktivposten links, Passivposten rechts."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "",
        "Aktivkonto",
        "Passivkonto"
      ],
      "zeilen": [
        {
          "zellen": [
            "Bildet ab",
            "Vermögen (Bilanz links)",
            "Kapital und Schulden (Bilanz rechts)"
          ]
        },
        {
          "zellen": [
            "Anfangsbestand",
            "Soll",
            "Haben"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "Zugänge",
            "Soll",
            "Haben"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "Abgänge",
            "Haben",
            "Soll"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "Saldo",
            "Sollsaldo",
            "Habensaldo"
          ],
          "detail": "**Warum das so sein muss:** Der {{begriff:saldo|Saldo}} wird immer auf der *schwächeren* Seite eingetragen, damit beide Seiten gleich hoch werden. Bei einem Aktivkonto steht mehr im Soll — also landet der Ausgleich im Haben, und der Saldo heißt trotzdem Sollsaldo, weil er die Soll-Seite als Überhang beschreibt."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Der häufigste Fehler im ganzen Kapitel: Anfangsbestand auf der falschen Seite. Eselsbrücke: Das Aktivkonto lebt links — genau wie die Aktivseite der Bilanz links steht. Alles am Passivkonto ist dazu spiegelverkehrt."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c2",
  "vorauswissen": "Aktivkonten stehen auf der linken, Passivkonten auf der rechten Bilanzseite. Zugänge werden dort gebucht, wo der Anfangsbestand steht.",
  "hintergrundwissen": "Die spiegelverkehrte Behandlung entsteht aus der Bilanzgleichung. Vermögen nimmt links zu, Kapital und Schulden rechts. Abgänge gehen jeweils auf die Gegenseite.",
  "ablauf": [
    "Konto als Aktiv oder Passiv einordnen.",
    "Prüfen, ob ein Zugang oder Abgang vorliegt.",
    "Zugang auf der Bestandsseite, Abgang auf der Gegenseite buchen.",
    "Buchungssatz durch Gegenkonto vervollständigen."
  ],
  "beispiele": [
    "Büromaterial wird bar bezahlt: Aufwand an Kasse. Die Kasse als Aktivkonto nimmt ab und steht deshalb im Haben.",
    "Ein Lieferant gewährt ein Darlehen: Bank an Darlehensverbindlichkeiten. Bank steigt im Soll, Schuld steigt im Haben."
  ],
  "fallbeispiel": "Ein Betrieb kauft einen Computer für 1.200 € auf Ziel. Der Computer als Aktivkonto nimmt zu, die Verbindlichkeit als Passivkonto ebenfalls. Der Buchungssatz lautet deshalb Computer an Verbindlichkeiten 1.200 €.",
  "typische_fehler": "Nicht vom Wort ‚Zahlung‘ täuschen lassen: Entscheidend ist, welches Konto tatsächlich steigt oder fällt. Außerdem darf die Mehrwertsteuer bei entsprechenden Aufgaben nicht vergessen werden.",
  "verstaendnisfragen": [
    "Warum steht ein Aktivzugang im Soll? Weil Aktivkonten links beginnen und dort zunehmen.",
    "Warum steht eine neue Schuld im Haben? Weil Passivkonten rechts beginnen und dort zunehmen."
  ],
  "pruefungsbezug": "Tabellenaufgaben testen meist genau die Kombination Kontotyp plus Zugang/Abgang. Eine feste Vierfelder-Tabelle verhindert das Raten.",
  "merksatz": "Aktiv: Zugang Soll, Abgang Haben. Passiv: Zugang Haben, Abgang Soll."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · EBK und SBK — Anfang und Ende des Jahres

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Konten über EBK und SBK eröffnen und abschließen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "EBK und SBK — Anfang und Ende des Jahres",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jede Buchung braucht zwei Konten. Das gilt auch beim Eröffnen: Um ein Bankkonto mit 10.000 € zu starten, braucht es ein Gegenkonto. Diese Rolle übernimmt das {{begriff:ebk|Eröffnungsbilanzkonto}}, am Jahresende spiegelbildlich das {{begriff:sbk|Schlussbilanzkonto}}."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorgang",
        "Buchungssatz",
        "Erklärung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Aktivkonto eröffnen (Bank 10.000 €)",
            "Bank an EBK 10.000 €",
            "Aktivkonto startet im Soll, das EBK nimmt die Gegenseite"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Passivkonto eröffnen (EK 8.000 €)",
            "EBK an Eigenkapital 8.000 €",
            "Passivkonto startet im Haben, das EBK steht im Soll"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Aktivkonto abschließen",
            "SBK an Bank [Saldo]",
            "Der Restbestand wandert ins SBK"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Passivkonto abschließen",
            "Eigenkapital an SBK [Saldo]",
            "Ebenso, nur spiegelverkehrt"
          ],
          "mono": [
            1
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "EBK und SBK sind reine Hilfskonten. Sie erscheinen in keiner Bilanz und in keiner GuV — sie existieren nur, damit jede Buchung ihre zwei Seiten bekommt.",
      "karteikarte": "Wozu dienen EBK und SBK, und warum tauchen sie in keiner Bilanz auf?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c3",
  "vorauswissen": "Das EBK eröffnet Bestandskonten am Jahresanfang; das SBK nimmt ihre Schlussbestände am Jahresende auf.",
  "hintergrundwissen": "EBK und SBK sind keine normalen Geschäftsprozesse, sondern technische Gegenkonten. Sie stellen sicher, dass jeder Anfangs- und Endbestand doppelt gebucht und damit nachvollziehbar übertragen wird.",
  "beispiele": [
    "Aktivkonto Bank eröffnen: Bank an EBK. Passivkonto Eigenkapital eröffnen: EBK an Eigenkapital.",
    "Aktivkonto abschließen: SBK an Bank. Ein Passivkonto wird spiegelbildlich mit dem Saldo an SBK abgeschlossen."
  ],
  "fallbeispiel": "Das Bankkonto endet mit 10.500 €. Beim Abschluss steht der Betrag auf der Haben-Seite als Ausgleich; der Buchungssatz lautet SBK an Bank 10.500 €. Im neuen Jahr wird der Bestand wieder über das EBK eröffnet.",
  "typische_fehler": "EBK und SBK werden verwechselt oder als Aufwand/Ertrag behandelt. Sie gehören nur zu den Bestandskonten.",
  "verstaendnisfragen": [
    "Warum ist das EBK ein Gegenkonto? Weil ein Konto nicht ohne Gegenbuchung eröffnet werden darf.",
    "Was wird ins SBK übertragen? Der Schlussbestand des Bestandskontos."
  ],
  "pruefungsbezug": "Bei Eröffnungs- und Abschlussbuchungen immer den Kontotyp und die Richtung des Bestands prüfen.",
  "merksatz": "EBK eröffnet, SBK schließt; beide übertragen Bestände, nicht Erfolg."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c4 · Buchungssätze — „Soll an Haben“

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Buchungssätze nach „Soll an Haben“ formulieren

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c4",
  "titel": "Buchungssätze — „Soll an Haben“",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:buchungssatz|Buchungssatz}} folgt immer demselben Muster: zuerst das Sollkonto, dann das Wort **an**, dann das Habenkonto und der Betrag. Die Summe der Soll-Beträge muss der Summe der Haben-Beträge entsprechen — auch wenn mehr als zwei Konten beteiligt sind."
    },
    {
      "typ": "grafik",
      "variante": "t-konto",
      "kopf": "Buchen, live",
      "titel": "Wo landet der Betrag?",
      "lead": "Wähle einen Geschäftsvorfall. Die Beträge laufen in die beiden betroffenen T-Konten ein.",
      "konten": [
        {
          "id": "bank",
          "name": "Bank",
          "art": "aktiv",
          "ab": 18000
        },
        {
          "id": "kasse",
          "name": "Kasse",
          "art": "aktiv",
          "ab": 2000
        },
        {
          "id": "waren",
          "name": "Wareneinkauf",
          "art": "aufwand",
          "ab": 0
        },
        {
          "id": "verb",
          "name": "Verbindlichkeiten LuL",
          "art": "passiv",
          "ab": 15000
        },
        {
          "id": "ford",
          "name": "Forderungen LuL",
          "art": "aktiv",
          "ab": 9000
        },
        {
          "id": "erloese",
          "name": "Umsatzerlöse",
          "art": "ertrag",
          "ab": 0
        }
      ],
      "vorfaelle": [
        {
          "text": "Warenkauf auf Ziel, 1.000 €",
          "satz": "Wareneinkauf 1.000 € an Verbindlichkeiten LuL 1.000 €",
          "soll": [
            {
              "konto": "waren",
              "betrag": 1000
            }
          ],
          "haben": [
            {
              "konto": "verb",
              "betrag": 1000
            }
          ],
          "echo": "Aufwand entsteht, also wächst das Wareneinkaufskonto im Soll. Bezahlt ist noch nichts — stattdessen wächst die Schuld, und Passivkonten wachsen im Haben."
        },
        {
          "text": "Lieferantenrechnung per Bank bezahlen, 500 €",
          "satz": "Verbindlichkeiten LuL 500 € an Bank 500 €",
          "soll": [
            {
              "konto": "verb",
              "betrag": 500
            }
          ],
          "haben": [
            {
              "konto": "bank",
              "betrag": 500
            }
          ],
          "echo": "Die Schuld sinkt — ein Abgang auf einem Passivkonto steht im Soll. Das Bankkonto sinkt ebenfalls, und ein Abgang auf einem Aktivkonto steht im Haben."
        },
        {
          "text": "Barverkauf von Ware, 300 €",
          "satz": "Kasse 300 € an Umsatzerlöse 300 €",
          "soll": [
            {
              "konto": "kasse",
              "betrag": 300
            }
          ],
          "haben": [
            {
              "konto": "erloese",
              "betrag": 300
            }
          ],
          "echo": "Die Kasse wächst, also Soll. Gleichzeitig entsteht ein Ertrag — und Erträge werden immer im Haben gebucht."
        },
        {
          "text": "Kunde zahlt eine offene Rechnung, 800 €",
          "satz": "Bank 800 € an Forderungen LuL 800 €",
          "soll": [
            {
              "konto": "bank",
              "betrag": 800
            }
          ],
          "haben": [
            {
              "konto": "ford",
              "betrag": 800
            }
          ],
          "echo": "Kein Ertrag! Der wurde bereits bei Rechnungsstellung gebucht. Hier tauscht der Betrieb nur eine Forderung gegen Bankguthaben — zwei Aktivkonten, also ein Aktiv-Tausch aus K2."
        }
      ],
      "regel": "Drei Fragen für jeden unbekannten Buchungssatz: Welche zwei Konten sind betroffen? Welches wird größer? Welches kleiner?"
    },
    {
      "typ": "check",
      "frage": "Ein Kunde überweist 800 € für eine Rechnung, die vor drei Wochen gestellt wurde. Welcher Buchungssatz ist richtig?",
      "optionen": [
        {
          "text": "Bank an Umsatzerlöse",
          "richtig": false,
          "echo": "Damit würde der Ertrag ein zweites Mal gebucht. Er ist bereits bei der Rechnungsstellung entstanden — sonst wäre der Umsatz im Jahresergebnis doppelt enthalten."
        },
        {
          "text": "Bank an Forderungen LuL",
          "richtig": true,
          "echo": "Richtig. Der Ertrag wurde bei Rechnungsstellung gebucht (Forderungen an Umsatzerlöse). Jetzt wird nur noch die Forderung durch Bankguthaben ersetzt — reiner Aktiv-Tausch."
        },
        {
          "text": "Forderungen LuL an Bank",
          "richtig": false,
          "echo": "Die Richtung stimmt nicht. Das Bankkonto steigt und muss deshalb im Soll stehen; die Forderung verschwindet und gehört ins Haben. Der Satz ist genau verkehrt herum."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Bei zusammengesetzten Buchungssätzen mit drei oder mehr Konten hilft eine einfache Kontrolle: Addiere alle Soll-Beträge und alle Haben-Beträge. Sind sie ungleich, ist der Satz falsch — noch bevor du über den Inhalt nachdenkst."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c4",
  "vorauswissen": "Ein Buchungssatz nennt zuerst das Sollkonto, dann ‚an‘ und danach das Habenkonto; der Betrag steht am Ende.",
  "hintergrundwissen": "Die Reihenfolge ist eine Kurzform der doppelten Buchführung. Jeder Vorgang hat mindestens eine Soll- und eine Habenwirkung in gleicher Höhe.",
  "ablauf": [
    "Geschäftsvorfall in Klartext formulieren.",
    "Betroffene Konten und Kontotypen bestimmen.",
    "Zugang oder Abgang je Konto ableiten.",
    "Sollkonto vor Habenkonto schreiben und Betrag prüfen."
  ],
  "beispiele": [
    "Büromaterial wird bar für 100 € gekauft: Bürobedarf an Kasse 100 €.",
    "Eine offene Lieferantenrechnung über 800 € wird per Bank bezahlt: Verbindlichkeiten an Bank 800 €."
  ],
  "fallbeispiel": "Ein Betrieb kauft einen Drucker für 1.190 € brutto auf Ziel. Ohne Umsatzsteueraufteilung lautet die Grundlogik Drucker/Vorsteuer an Verbindlichkeiten; in der vollständigen Aufgabe werden Nettobetrag, Vorsteuer und Bruttobetrag getrennt berechnet und kontrolliert.",
  "typische_fehler": "‚An‘ bedeutet nicht automatisch eine Zahlung. Es trennt nur Soll- und Habenkonto. Außerdem müssen Beträge auf beiden Seiten gleich hoch sein.",
  "verstaendnisfragen": [
    "Warum muss jede Buchung ausgeglichen sein? Weil keine Wertveränderung ohne Gegenwirkung erfasst wird.",
    "Was steht im Buchungssatz immer zuerst? Das Sollkonto."
  ],
  "pruefungsbezug": "Buchungssätze sollten mit Kontotyp, Veränderung und Betragskontrolle begründet werden.",
  "merksatz": "Soll an Haben – immer vollständig und betragsgleich."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Erfolgskonten & GuV

**Datei:** `k4-erfolgskonten.kapitel.json` · SHA-256 `41b3840dced292a16d984e2e7c500bab1ee35fd7e19ba0a12f2aa347ae4c8921`

**Konkreter Kapitelauftrag:** Aufwand und Ertrag bis GuV/Eigenkapital verfolgen; Bestandsfortführung und jährliche Erfolgsermittlung unterscheiden.

**Einordnung:** Aufwand, Ertrag, das GuV-Konto und die Abschlusskette bis zum Eigenkapital.

### d1 · Zwei Sorten Konten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bestandskonten von Erfolgskonten unterscheiden

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Zwei Sorten Konten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "In K3 ging es um {{begriff:bestandskonto|Bestandskonten}} — sie bilden Bilanzpositionen ab. Jetzt kommt die zweite Sorte dazu: {{begriff:erfolgskonto|Erfolgskonten}}. Sie erfassen alles, was den wirtschaftlichen Erfolg beeinflusst, also {{begriff:aufwand|Aufwendungen}} und {{begriff:ertrag|Erträge}}. In der Bilanz tauchen sie nicht auf."
    },
    {
      "typ": "absatz",
      "text": "Der wichtigste Unterschied betrifft den Jahreswechsel: Bestandskonten werden fortgeführt — der Endbestand am 31.12. ist der Anfangsbestand am 1.1. ==Erfolgskonten starten jedes Jahr bei null.== Das ist keine Willkür, sondern zwingend: Kosten und Erlöse gehören immer nur zu einem bestimmten Geschäftsjahr."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kriterium",
        "Bestandskonto",
        "Erfolgskonto"
      ],
      "zeilen": [
        {
          "zellen": [
            "Erfasst",
            "Vermögen und Kapital",
            "Aufwendungen und Erträge"
          ]
        },
        {
          "zellen": [
            "In der Bilanz?",
            "ja, direkt",
            "nein — über die GuV ins Eigenkapital"
          ]
        },
        {
          "zellen": [
            "Jahreswechsel",
            "Saldo wird fortgeführt",
            "wird auf null gestellt"
          ],
          "detail": "**Warum das logisch ist:** Ein Bankguthaben von 18.000 € ist am 1. Januar immer noch da. Der Mietaufwand des letzten Jahres dagegen ist erledigt — er gehört zum abgeschlossenen Jahr. Würde man ihn fortführen, käme im Folgejahr ein Aufwand heraus, den es gar nicht gab."
        },
        {
          "zellen": [
            "Beispiele",
            "Bank, Kasse, Verbindlichkeiten",
            "Löhne, Miete, Umsatzerlöse"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Bestandskonten führen zur Bilanz. Erfolgskonten führen über die GuV ins Eigenkapital. Beide Wege enden in derselben Schlussbilanz — nur über unterschiedliche Stationen.",
      "karteikarte": "Wohin führen Bestandskonten, wohin Erfolgskonten — und was passiert mit ihnen zum Jahreswechsel?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Bestandskonten bilden Vermögen und Kapital in der Bilanz ab.",
    "Ein Geschäftsjahr muss von den vorherigen und folgenden Jahren abgegrenzt werden."
  ],
  "erklaerung": "Bestandskonten zeigen, welche Werte am Bilanzstichtag vorhanden sind. Erfolgskonten zeigen dagegen die Vorgänge, die den Erfolg eines bestimmten Jahres beeinflussen. Deshalb wird ein Bankkonto fortgeführt, während Mietaufwand und Umsatzerlöse am Jahresende über die GuV abgeschlossen und im neuen Jahr wieder bei null begonnen werden.",
  "beispiele": [
    "Ein Bankguthaben von 18.000 € bleibt über den Jahreswechsel als Bestand erhalten und wird im nächsten Jahr weitergeführt.",
    "Der Mietaufwand des abgeschlossenen Jahres darf nicht im Folgejahr weiterlaufen, weil er wirtschaftlich bereits zum alten Geschäftsjahr gehört."
  ],
  "fallbeispiel": "Ordne vier Konten ein: Bank, Kasse und Verbindlichkeiten sind Bestandskonten, weil sie Bilanzpositionen darstellen. Löhne, Miete und Umsatzerlöse sind Erfolgskonten, weil sie Aufwand oder Ertrag eines Jahres erfassen. Beim Abschluss werden die Erfolgskonten über die GuV auf null gestellt; die Bestandskonten führen ihren Saldo über SBK und EBK weiter.",
  "typische_fehler": "Erfolgskonten werden als direkte Bilanzkonten behandelt oder ein Jahresüberschuss wird mit einem Bankbestand verwechselt. Gewinn bedeutet nicht, dass das Geld auf einem bestimmten Konto liegt, sondern dass Erträge und Aufwendungen das Eigenkapital verändert haben.",
  "verstaendnisfragen": [
    "Warum starten Erfolgskonten jedes Jahr bei null? Damit nur Aufwand und Ertrag des neuen Geschäftsjahres ausgewertet werden.",
    "Warum tauchen Erfolgskonten nicht direkt in der Bilanz auf? Ihr Saldo wird zunächst in der GuV gesammelt und anschließend über den Jahreserfolg im Eigenkapital berücksichtigt."
  ],
  "pruefungsbezug": "Bei einer Kontenart-Aufgabe nach dem Inhalt fragen: Vermögen oder Kapital bedeutet Bestandskonto; Aufwand oder Ertrag bedeutet Erfolgskonto. Danach den Abschlussweg nennen.",
  "merksatz": "Bestandskonten bleiben bestehen; Erfolgskonten messen ein Jahr und werden über die GuV abgeschlossen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Aufwand und Ertrag

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aufwands- und Ertragskonten erkennen und korrekt buchen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Aufwand und Ertrag",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Buchungslogik ist erfreulich simpel: Aufwand entsteht im **Soll**, Ertrag entsteht im **Haben**. Damit hat jedes Aufwandskonto am Jahresende einen Sollsaldo und jedes Ertragskonto einen Habensaldo — daran kann man beim Abschluss nichts verwechseln."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Konto",
        "Art",
        "Typischer Buchungssatz"
      ],
      "zeilen": [
        {
          "zellen": [
            "Löhne und Gehälter",
            "Aufwand",
            "Löhne und Gehälter an Bank"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Mietaufwand",
            "Aufwand",
            "Mietaufwand an Bank"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Wareneinkauf",
            "Aufwand",
            "Wareneinkauf an Verbindlichkeiten"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Umsatzerlöse",
            "Ertrag",
            "Bank oder Forderungen an Umsatzerlöse"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Zinserträge",
            "Ertrag",
            "Bank an Zinserträge"
          ],
          "mono": [
            2
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Aufwand ist nicht dasselbe wie Auszahlung. Eine Rechnung, die im Dezember eingeht und im Januar bezahlt wird, ist Dezember-Aufwand — die Auszahlung liegt im Januar. Diese Trennung ist die Grundlage für die Rechnungsabgrenzung in K9."
    },
    {
      "typ": "check",
      "frage": "Der Betrieb kauft am 20. Dezember Büromaterial auf Rechnung und bezahlt am 10. Januar. In welchem Jahr entsteht der Aufwand?",
      "optionen": [
        {
          "text": "Im Jahr der Zahlung",
          "richtig": false,
          "echo": "Das wäre eine reine Einnahmen-Überschuss-Betrachtung. In der doppelten Buchführung entsteht Aufwand mit dem Verbrauch beziehungsweise mit der Lieferung — nicht mit dem Geldfluss."
        },
        {
          "text": "Im Jahr der Lieferung",
          "richtig": true,
          "echo": "Richtig. Der Aufwand entsteht im Dezember, gebucht als Bürobedarf an Verbindlichkeiten. Die Zahlung im Januar berührt nur noch Bestandskonten und verändert das Ergebnis nicht mehr."
        },
        {
          "text": "Anteilig in beiden Jahren",
          "richtig": false,
          "echo": "Aufgeteilt wird nur, wenn eine Leistung sich tatsächlich über beide Jahre erstreckt — etwa eine Jahresversicherung. Eine einmalige Lieferung gehört vollständig in ein Jahr."
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
    "Im T-Konto bestimmen Kontoart und Mehrungsseite die Buchungsseite.",
    "Aufwand und Auszahlung sowie Ertrag und Einzahlung sind unterschiedliche Begriffe."
  ],
  "erklaerung": "Aufwandskonten nehmen im Soll zu, Ertragskonten im Haben. Diese Richtung passt zur Abschlusslogik: Aufwendungen werden später auf die Sollseite der GuV übertragen, Erträge auf deren Habenseite. Für die zeitliche Zuordnung ist nicht allein der Zahlungszeitpunkt entscheidend, sondern der wirtschaftliche Vorgang.",
  "beispiele": [
    "Ein Warenkauf auf Rechnung wird als Wareneinkauf an Verbindlichkeiten gebucht: Der Aufwand steht im Soll, die Schuld im Haben.",
    "Ein Verkauf auf Rechnung wird als Forderungen beziehungsweise Bank an Umsatzerlöse gebucht: Der Ertrag steht im Haben."
  ],
  "fallbeispiel": "Büromaterial wird am 20. Dezember auf Rechnung geliefert und am 10. Januar bezahlt. Im Dezember entsteht der Aufwand: Bürobedarf an Verbindlichkeiten. Im Januar wird nur die Schuld beglichen: Verbindlichkeiten an Bank. Die Zahlung verändert in diesem zweiten Schritt nicht mehr den Jahreserfolg des Dezembers.",
  "typische_fehler": "Aufwand wird mit Auszahlung gleichgesetzt. Ein weiterer Fehler ist, bei einem Ertrag automatisch einen Zahlungseingang anzunehmen; auch ein Verkauf auf Rechnung erzeugt zunächst eine Forderung und den Ertrag.",
  "verstaendnisfragen": [
    "Auf welcher Seite wächst ein Aufwandskonto? Im Soll.",
    "Warum ist die Januartilgung der Dezemberrechnung kein neuer Aufwand? Weil der Aufwand bereits bei der Lieferung im Dezember erfasst wurde."
  ],
  "pruefungsbezug": "Bei Buchungssätzen zuerst klären, ob der Vorgang Aufwand oder Ertrag erzeugt und ob sofort gezahlt wird oder eine Forderung beziehungsweise Verbindlichkeit entsteht.",
  "merksatz": "Aufwand im Soll, Ertrag im Haben — Zahlung und Erfolg können zeitlich auseinanderfallen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d3 · Das GuV-Konto

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das GuV-Konto aufstellen und den Jahreserfolg berechnen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d3",
  "titel": "Das GuV-Konto",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Das {{begriff:guv|GuV-Konto}} ist das Sammelbecken: Am Jahresende wandern alle Aufwandskonten mit ihrem Saldo ins Soll und alle Ertragskonten ins Haben. Was übrig bleibt, ist der Jahreserfolg. Wie EBK und SBK ist auch die GuV kein Sachkonto, sondern ein Abschlusskonto."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "GuV-Konto",
        "Soll (Aufwendungen)",
        "Haben (Erträge)"
      ],
      "zeilen": [
        {
          "zellen": [
            "",
            "Wareneinkauf 80.000 €",
            "Umsatzerlöse 160.000 €"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "",
            "Löhne 45.000 €",
            "Zinserträge 5.000 €"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "",
            "Miete 12.000 €",
            "Sonstige Erträge 5.000 €"
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "",
            "Abschreibungen 8.000 €",
            ""
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "",
            "Zinsaufwand 2.000 €",
            ""
          ],
          "mono": [
            1,
            2
          ]
        },
        {
          "zellen": [
            "Summe",
            "147.000 € + 23.000 € Überschuss",
            "170.000 €"
          ],
          "mono": [
            1,
            2
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Ertrag größer als Aufwand ergibt einen {{begriff:jahresueberschuss|Jahresüberschuss}} — das Eigenkapital steigt. Umgekehrt entsteht ein Jahresfehlbetrag, und das Eigenkapital sinkt. Der Gewinn eines Jahres ist nichts anderes als der Zuwachs an Eigenkapital.",
      "karteikarte": "Wie hängen Jahreserfolg und Eigenkapital zusammen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d3",
  "vorauswissen": [
    "Aufwendungen stehen im Soll, Erträge im Haben.",
    "Die GuV ist ein Abschlusskonto und kein dauerhaftes Sachkonto."
  ],
  "erklaerung": "Im GuV-Konto werden die Salden aller Erfolgskonten gesammelt. Die Aufwendungen bilden die linke Seite, die Erträge die rechte Seite. Ist die Ertragsseite höher, entsteht ein Jahresüberschuss; ist die Aufwandsseite höher, entsteht ein Jahresfehlbetrag. Erst der Saldo der GuV wird in das Eigenkapital übertragen.",
  "beispiele": [
    "Die in der Tabelle aufgeführten Aufwendungen ergeben zusammen 147.000 €, die Erträge 170.000 €. Die Differenz beträgt 23.000 € Jahresüberschuss.",
    "Ein einzelner hoher Aufwand kann durch mehrere Erträge ausgeglichen werden; entscheidend ist die Gesamtsumme beider GuV-Seiten."
  ],
  "fallbeispiel": "Für die Musterrechnung werden 170.000 € Erträge und 147.000 € Aufwendungen gegenübergestellt. Rechnung: 170.000 € − 147.000 € = 23.000 €. Weil die Erträge größer sind, liegt ein Jahresüberschuss von 23.000 € vor. Dieser Betrag erhöht anschließend das Eigenkapital; die einzelnen Erfolgskonten werden dadurch nicht als Bestände ins neue Jahr übernommen.",
  "typische_fehler": "Der Saldo wird mit der Summe der Erträge verwechselt oder der Gewinn direkt dem Bankkonto zugeschrieben. Außerdem wird vergessen, dass ein Jahresfehlbetrag das Eigenkapital mindert.",
  "verstaendnisfragen": [
    "Was wird im GuV-Konto gesammelt? Die Salden der Aufwands- und Ertragskonten eines Geschäftsjahres.",
    "Was bewirkt ein Jahresüberschuss im Eigenkapital? Das Eigenkapital steigt um den Überschuss."
  ],
  "pruefungsbezug": "Bei Berechnungen die beiden GuV-Summen sauber getrennt notieren und erst danach die Differenz bilden. Das Vorzeichen ergibt sich daraus, welche Seite größer ist.",
  "merksatz": "Erträge minus Aufwendungen ergeben den Jahreserfolg; der Jahreserfolg verändert das Eigenkapital."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d4 · Die Abschlusskette

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Abschlusskette in der richtigen Reihenfolge durchführen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d4",
  "titel": "Die Abschlusskette",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Am Jahresende ist die Reihenfolge nicht beliebig — jeder Schritt baut auf dem vorherigen auf. Wer sie umdreht, produziert eine falsche Schlussbilanz. In der Prüfung wird häufig genau nach der Reihenfolge gefragt."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Reihenfolge zählt",
      "titel": "Vom Erfolgskonto zur Schlussbilanz",
      "lead": "Klick dich Schritt für Schritt durch — jede Station schaltet die nächste frei.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Aufwandskonten abschließen",
          "satz": "GuV an [Aufwandskonto]",
          "text": "Jedes Aufwandskonto gibt seinen Sollsaldo an die GuV ab. Danach steht es auf null."
        },
        {
          "nr": 2,
          "titel": "Ertragskonten abschließen",
          "satz": "[Ertragskonto] an GuV",
          "text": "Ebenso mit den Erträgen — sie landen im Haben der GuV. Jetzt stehen sich alle Aufwendungen und Erträge gegenüber."
        },
        {
          "nr": 3,
          "titel": "Jahreserfolg ins Eigenkapital",
          "satz": "GuV an Eigenkapital (bei Gewinn)",
          "text": "Der Saldo der GuV ist der Jahreserfolg. Bei Gewinn wächst das Eigenkapital, bei Verlust schrumpft es. Erst jetzt steht der endgültige Eigenkapitalbestand fest."
        },
        {
          "nr": 4,
          "titel": "Bestandskonten abschließen",
          "satz": "SBK an [Aktivkonto] · [Passivkonto] an SBK",
          "text": "Zum Schluss wandern alle Bestandskonten ins SBK — einschließlich des soeben korrigierten Eigenkapitals. Das Ergebnis ist die Schlussbilanz."
        }
      ],
      "regel": "Erfolgskonten immer vor den Bestandskonten. Sonst schließt du das Eigenkapital ab, bevor der Gewinn darin enthalten ist."
    },
    {
      "typ": "zuordnen",
      "lead": "Welcher Schritt der Abschlusskette ist gemeint?",
      "kategorien": [
        "Schritt 1",
        "Schritt 2",
        "Schritt 3",
        "Schritt 4"
      ],
      "aufgaben": [
        {
          "text": "Der Mietaufwand von 12.000 € gibt seinen Saldo ab.",
          "loesung": "Schritt 1"
        },
        {
          "text": "Das Bankkonto wird mit seinem Restbestand ins SBK übertragen.",
          "loesung": "Schritt 4"
        },
        {
          "text": "Ein Überschuss von 23.000 € erhöht das Eigenkapital.",
          "loesung": "Schritt 3"
        },
        {
          "text": "Die Umsatzerlöse von 160.000 € wandern ins Haben der GuV.",
          "loesung": "Schritt 2"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Wenn deine Schlussbilanz nicht ausgeglichen ist, liegt der Fehler fast immer an einer von zwei Stellen: Der Jahreserfolg wurde nicht ins Eigenkapital übertragen, oder ein Erfolgskonto wurde vergessen. Prüfe beides, bevor du irgendetwas neu rechnest."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d4",
  "vorauswissen": [
    "Erfolgskonten werden über die GuV abgeschlossen.",
    "Bestandskonten werden am Ende über das Schlussbilanzkonto abgeschlossen."
  ],
  "ablauf": [
    "Zuerst die Aufwandskonten abschließen: Buchungssatz „GuV an Aufwandskonto“, der Saldo steht danach im Soll der GuV.",
    "Danach die Ertragskonten abschließen: Buchungssatz „Ertragskonto an GuV“, der Saldo steht danach im Haben der GuV.",
    "Den Saldo der GuV als Gewinn oder Verlust in das Eigenkapital übertragen.",
    "Erst danach die Bestandskonten über das SBK abschließen."
  ],
  "erklaerung": "Die Reihenfolge folgt einer Abhängigkeit: Das Eigenkapital kann erst endgültig feststehen, wenn der Jahreserfolg berechnet wurde. Und die Bestandskonten können erst danach vollständig ins SBK übertragen werden. Wer die Reihenfolge vertauscht, schließt das Eigenkapital mit einem veralteten Stand ab.",
  "beispiele": [
    "Der Mietaufwand von 12.000 € wird zuerst in die GuV übertragen; erst danach wird der Jahresüberschuss von 23.000 € ins Eigenkapital gebucht.",
    "Das Bankkonto wird erst im letzten Schritt mit seinem Restbestand ins SBK übernommen."
  ],
  "fallbeispiel": "Mini-Abschluss: Mietaufwand 12.000 € (Soll), Umsatzerlöse 35.000 € (Haben), Bank 50.000 € (Soll), Eigenkapital 27.000 € (Haben). 1. GuV an Mietaufwand 12.000 € — der Aufwand steht im Soll, also wird er im Haben ausgeglichen und landet im Soll der GuV. 2. Umsatzerlöse an GuV 35.000 €. 3. Die GuV zeigt 35.000 € − 12.000 € = 23.000 € Gewinn: GuV an Eigenkapital 23.000 €; das Eigenkapital steigt auf 50.000 €. 4. SBK an Bank 50.000 € und Eigenkapital an SBK 50.000 €. Kontrolle: Alle Konten stehen auf null, das SBK ist mit 50.000 € auf beiden Seiten ausgeglichen. Wer stattdessen „Mietaufwand an GuV“ bucht, schreibt den Aufwand ein zweites Mal ins Soll — das Konto geht dann nie auf.",
  "typische_fehler": "Bestandskonten werden vor den Erfolgskonten abgeschlossen oder der GuV-Saldo wird nicht ins Eigenkapital übertragen. Dann kann die Schlussbilanz trotz richtiger Einzelbuchungen nicht aufgehen.",
  "verstaendnisfragen": [
    "Warum kommen die Bestandskonten zuletzt? Weil das Eigenkapital vorher noch um den Jahreserfolg korrigiert werden muss.",
    "Welche zwei Stellen prüfst du bei einer unausgeglichenen Schlussbilanz zuerst? Die Übertragung des Jahreserfolgs und den vollständigen Abschluss aller Erfolgskonten."
  ],
  "pruefungsbezug": "Die Abschlusskette wird häufig als Reihenfolge oder Zuordnung geprüft. Schreibe die vier Schritte vor der eigentlichen Buchung in der richtigen Reihenfolge auf.",
  "merksatz": "Erfolgskonten vor Bestandskonten: GuV abschließen, Ergebnis ins Eigenkapital, dann SBK."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Warenkonten & Kalkulation

**Datei:** `k5-warenkonten.kapitel.json` · SHA-256 `0687c8bee25f73adb059b36693048a2d1c9585e3275938acb64199fcc596bba9`

**Konkreter Kapitelauftrag:** Einen Warenkauf und -verkauf mit Nachlass und Steuerkorrektur durchrechnen; Kalkulation und Buchung begründet verbinden.

**Einordnung:** Wareneinkauf und -verkauf, Bezugskosten, Rabatt und Skonto — und der Weg vom Einkaufs- zum Verkaufspreis.

### e1 · Warenkonten im Handel

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Wareneinkauf und Umsatzerlöse als Erfolgskonten buchen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e1",
  "titel": "Warenkonten im Handel",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Im Handelsbetrieb stehen zwei Konten im Mittelpunkt, und beide sind {{begriff:erfolgskonto|Erfolgskonten}} aus K4: Der **Wareneinkauf** ist ein Aufwandskonto, die **Umsatzerlöse** sind ein Ertragskonto. Ein- und Verkauf werden getrennt erfasst, nicht verrechnet — nur so sieht man jederzeit, wie viel insgesamt eingekauft und verkauft wurde."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorgang",
        "Buchungssatz",
        "Kontoart"
      ],
      "zeilen": [
        {
          "zellen": [
            "Warenkauf auf Ziel, 3.000 €",
            "Wareneinkauf an Verbindlichkeiten LuL",
            "Aufwand entsteht im Soll"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Warenverkauf auf Ziel, 5.000 €",
            "Forderungen LuL an Umsatzerlöse",
            "Ertrag entsteht im Haben"
          ],
          "mono": [
            1
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "{{begriff:rohertrag|Rohertrag}} = Umsatzerlöse − Wareneinsatz. Bei 5.000 € Erlös und 3.000 € Einsatz bleiben 2.000 € — davon müssen erst noch Miete, Löhne und alles Übrige bezahlt werden.",
      "karteikarte": "Wie berechnet sich der Rohertrag, und was ist er noch nicht?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e1",
  "vorauswissen": [
    "Wareneinkauf ist ein Aufwandskonto, Umsatzerlöse sind ein Ertragskonto.",
    "Der Rohertrag vergleicht Verkaufserlöse mit dem Wareneinsatz."
  ],
  "erklaerung": "Ein Handelsbetrieb hält Ein- und Verkäufe getrennt fest. Der Wareneinkauf zeigt, welcher Aufwand durch eingekaufte Ware erfasst wurde. Die Umsatzerlöse zeigen, was mit Verkäufen erwirtschaftet wurde. Erst der Vergleich beider Größen zeigt den Rohertrag; weitere Aufwendungen wie Miete oder Löhne sind darin noch nicht berücksichtigt.",
  "beispiele": [
    "Ein Warenkauf auf Ziel über 3.000 € wird als Wareneinkauf an Verbindlichkeiten LuL gebucht.",
    "Ein Warenverkauf auf Ziel über 5.000 € wird als Forderungen LuL an Umsatzerlöse gebucht."
  ],
  "fallbeispiel": "Der Betrieb erzielt 5.000 € Umsatzerlöse und hat für die verkaufte Ware einen Wareneinsatz von 3.000 €. Rechnung: 5.000 € − 3.000 € = 2.000 € Rohertrag. Diese 2.000 € sind noch nicht der Gewinn, weil daraus unter anderem Miete, Löhne und weitere betriebliche Aufwendungen bezahlt werden müssen.",
  "typische_fehler": "Umsatzerlöse und Gewinn werden gleichgesetzt. Außerdem werden Einkauf und Verkauf miteinander verrechnet, sodass nicht mehr erkennbar ist, wie hoch die einzelnen Größen waren.",
  "verstaendnisfragen": [
    "Warum werden Wareneinkauf und Umsatzerlöse getrennt gebucht? Damit Einkauf, Verkauf und Rohertrag nachvollziehbar bleiben.",
    "Was ist der Rohertrag noch nicht? Der Gewinn, weil weitere Aufwendungen noch abgezogen werden müssen."
  ],
  "pruefungsbezug": "Bei Warenbuchungen die Kontenart mitdenken: Einkauf führt zum Aufwandskonto im Soll, Verkauf zum Ertragskonto im Haben. Danach kann der Rohertrag berechnet werden.",
  "merksatz": "Rohertrag = Umsatzerlöse − Wareneinsatz; erst weitere Aufwendungen führen zum Gewinn."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e2 · Bezugskosten, Rabatt, Rücksendung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bezugskosten, Rabatte und Rücksendungen richtig behandeln

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `tabelle-2`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e2",
  "titel": "Bezugskosten, Rabatt, Rücksendung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Was die Ware wirklich gekostet hat, steht selten auf der Rechnung. {{begriff:bezugskosten|Bezugskosten}} wie Fracht und Verpackung kommen hinzu, ein {{begriff:rabatt|Rabatt}} geht ab. Das Ergebnis ist der {{begriff:einstandspreis|Einstandspreis}} — die Zahl, mit der später kalkuliert wird."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Schritt",
        "Betrag"
      ],
      "zeilen": [
        {
          "zellen": [
            "Listenpreis der Ware",
            "5.000,00 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "− Rabatt 5 %",
            "− 250,00 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "= Zieleinkaufspreis",
            "4.750,00 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "+ Bezugskosten (Fracht)",
            "+ 150,00 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "= Einstandspreis",
            "4.900,00 €"
          ],
          "mono": [
            1
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Ein Rabatt wird **nicht** separat gebucht. Er mindert den Rechnungsbetrag sofort, also wird von vornherein nur der geminderte Betrag erfasst. Skonto dagegen wird separat gebucht — das ist der Unterschied, der in der Prüfung am häufigsten verwechselt wird."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorgang",
        "Buchungssatz"
      ],
      "zeilen": [
        {
          "zellen": [
            "Bezugskosten (sofort bezahlt)",
            "Wareneinkauf an Bank"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Einkaufsrücksendung",
            "Verbindlichkeiten an Wareneinkauf"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Verkaufsrücksendung",
            "Umsatzerlöse an Forderungen"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Nachträglicher Nachlass beim Einkauf",
            "Verbindlichkeiten an Wareneinkauf"
          ],
          "mono": [
            1
          ]
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
    "Der Listenpreis ist nicht automatisch der tatsächliche Einstandspreis.",
    "Rabatt, Bezugskosten und Rücksendungen verändern den Warenwert."
  ],
  "erklaerung": "Der Einstandspreis beantwortet die praktische Frage: Was hat die Ware den Betrieb tatsächlich gekostet, bis sie am eigenen Standort verfügbar ist? Ein Rabatt mindert den Preis sofort. Bezugskosten wie Fracht werden hinzugerechnet. Der so ermittelte Einstandspreis bildet später die Basis der Kalkulation.",
  "beispiele": [
    "Aus 5.000 € Listenpreis werden nach 5 % Rabatt 4.750 € Zieleinkaufspreis. Mit 150 € Fracht entsteht ein Einstandspreis von 4.900 €.",
    "Eine Einkaufsrücksendung wird als Verbindlichkeiten an Wareneinkauf gebucht; eine Verkaufsrücksendung als Umsatzerlöse an Forderungen."
  ],
  "fallbeispiel": "Berechne den Einstandspreis: Listenpreis 5.000 €. Rabatt 5 % = 250 €, also Zieleinkaufspreis 4.750 €. Dazu kommen 150 € Bezugskosten. Ergebnis: 4.750 € + 150 € = 4.900 € Einstandspreis. Der Rabatt wird nicht noch einmal separat gebucht, weil der Rechnungsbetrag bereits gemindert ist.",
  "typische_fehler": "Rabatt und Skonto werden verwechselt. Der Rabatt wird sofort berücksichtigt; Skonto entsteht erst bei schneller Zahlung und wird dann separat gebucht. Auch Bezugskosten werden häufig vergessen oder fälschlich vom Preis abgezogen.",
  "verstaendnisfragen": [
    "Warum erhöhen Bezugskosten den Einstandspreis? Weil sie notwendig sind, damit die Ware beim Betrieb ankommt.",
    "Warum wird der Rabatt nicht separat gebucht? Weil er den Rechnungsbetrag direkt mindert und der geminderte Betrag von Anfang an erfasst wird."
  ],
  "pruefungsbezug": "Bei Rechenwegen die Reihenfolge einhalten: Listenpreis minus Rabatt, gleich Zieleinkaufspreis, plus Bezugskosten, gleich Einstandspreis. Buchungssätze nur für die im Sachverhalt genannten Vorgänge bilden.",
  "merksatz": "Rabatt geht ab, Bezugskosten kommen hinzu: Beides führt zum Einstandspreis."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e3 · Skonto — der teuerste Kredit der Welt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Skonto auf Einkaufs- und Verkaufsseite unterscheiden und buchen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e3",
  "titel": "Skonto — der teuerste Kredit der Welt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:skonto|Skonto}} entsteht erst im Moment der Zahlung — vorher weiß niemand, ob die Frist genutzt wird. Deshalb wird die ursprüngliche Buchung nicht korrigiert, sondern die Differenz separat erfasst. ==Beim Einkauf mindert der Skonto den Aufwand, beim Verkauf mindert er den Erlös.== Im Industriekontenrahmen gibt es dafür Unterkonten: Nachlässe (bei MAKEL 6001) und 5001 Erlösberichtigungen. Die Umsatzsteuer bleibt hier noch außen vor — sie kommt in K6 dazu."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Fall",
        "Ausgangslage",
        "Buchung bei Zahlung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Einkaufsskonto",
            "Verbindlichkeit 1.000 €, 2 % Skonto",
            "4400 Verbindlichkeiten 1.000 € an 2800 Bank 980 € + 6001 Nachlässe 20 €"
          ],
          "mono": [
            2
          ],
          "detail": "**Was hier passiert:** Die Schuld war 1.000 € und verschwindet vollständig — deshalb steht sie voll im Soll. Überwiesen werden aber nur 980 €. Die Lücke von 20 € ist ein nachträglicher Nachlass und mindert den Einkaufsaufwand."
        },
        {
          "zellen": [
            "Verkaufsskonto",
            "Forderung 2.000 €, 2 % Skonto",
            "2800 Bank 1.960 € + 5001 Erlösberichtigungen 40 € an 2400 Forderungen 2.000 €"
          ],
          "mono": [
            2
          ],
          "detail": "**Spiegelbildlich:** Die Forderung von 2.000 € verschwindet vollständig, eingegangen sind nur 1.960 €. Die Differenz kürzt nachträglich den Erlös und wird als Erlösberichtigung gebucht."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Einkauf → **Nachlässe** (Aufwand sinkt). Verkauf → **Erlösberichtigungen** (Erlös sinkt). Eselsbrücke: Skonto ändert nie das Konto der Gegenseite, sondern korrigiert dort, wo der ursprüngliche Betrag gebucht wurde.",
      "karteikarte": "Auf welchem Konto wird Skonto beim Einkauf und beim Verkauf gebucht — und warum?"
    },
    {
      "typ": "check",
      "frage": "Eine Rechnung über 2.000 € bietet „2 % Skonto bei Zahlung in 10 Tagen, sonst 30 Tage netto“. Lohnt es sich, den Skonto zu ziehen?",
      "optionen": [
        {
          "text": "Nein, 2 % sind zu wenig",
          "richtig": false,
          "echo": "Der Prozentsatz täuscht, weil er sich auf nur 20 Tage bezieht. Rechnet man ihn aufs Jahr hoch, liegt er weit über jedem Kontokorrentzins."
        },
        {
          "text": "Ja, das entspricht etwa 36 % Zins pro Jahr",
          "richtig": true,
          "echo": "Richtig. 2 % für 20 Tage früher zahlen entspricht rund 36 % Jahreszins (2 % × 360 ÷ 20). Selbst ein teurer Bankkredit ist günstiger — deshalb lohnt sich Skonto fast immer, notfalls über den Dispo."
        },
        {
          "text": "Nur bei Beträgen über 10.000 €",
          "richtig": false,
          "echo": "Die Höhe spielt keine Rolle. Der Vorteil ist prozentual und damit bei jedem Betrag gleich groß."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e3",
  "vorauswissen": [
    "Skonto hängt vom Zahlungszeitpunkt ab.",
    "Aufwand und Ertrag werden nach ihrem wirtschaftlichen Vorteil beziehungsweise Nachteil beurteilt."
  ],
  "erklaerung": "Bei der ursprünglichen Rechnung steht noch nicht fest, ob der Betrieb das Zahlungsziel nutzt und Skonto abzieht. Deshalb bleibt der ursprüngliche Rechnungsbetrag zunächst bestehen. Erst bei der Zahlung wird die Verbindlichkeit oder Forderung vollständig ausgebucht und die Differenz auf einem Unterkonto erfasst: Beim Einkauf mindert der Skonto den Aufwand (Konto Nachlässe, bei MAKEL 6001), beim Verkauf mindert er den Erlös (Konto 5001 Erlösberichtigungen). Die Umsatzsteuer lassen wir in diesem Kapitel noch weg; wie der Skonto zusätzlich die Steuer berichtigt, zeigt K6.",
  "beispiele": [
    "Bei einer Einkaufsverbindlichkeit von 1.000 € und 2 % Skonto werden 980 € überwiesen; 20 € werden als Nachlass gebucht und mindern den Aufwand.",
    "Bei einer Verkaufsforderung von 2.000 € und 2 % Skonto gehen 1.960 € ein; 40 € werden als Erlösberichtigung gebucht und mindern den Erlös."
  ],
  "fallbeispiel": "Eine Rechnung über 2.000 € wird innerhalb der Skontofrist bezahlt. 2 % von 2.000 € sind 40 €. Die Forderung muss vollständig mit 2.000 € ausgebucht werden. Auf der Sollseite stehen 2800 Bank 1.960 € und 5001 Erlösberichtigungen 40 €; im Haben steht 2400 Forderungen 2.000 €. Die Buchung ist ausgeglichen. Der Erlös wird damit nachträglich um 40 € gekürzt — der Betrieb hat für die Ware eben nur 1.960 € bekommen.",
  "typische_fehler": "Skonto wird schon bei der Rechnung berücksichtigt, obwohl die Nutzung noch nicht feststeht. Außerdem werden Einkaufsskonto und Verkaufsskonto vertauscht: Beim Einkauf spart der Betrieb Geld, beim Verkauf erhält er weniger. Häufiger Altfehler: Skonto als eigenen Ertrag oder Aufwand buchen — im Industriekontenrahmen ist er eine Minderung des Einkaufsaufwands bzw. des Erlöses.",
  "verstaendnisfragen": [
    "Wo wird Einkaufsskonto gebucht? Im Haben des Kontos Nachlässe (6001), weil er den Einkaufsaufwand nachträglich mindert.",
    "Warum muss eine Verkaufsforderung beim Zahlungseingang vollständig verschwinden? Weil der Kunde danach nichts mehr schuldet; die Differenz wird auf 5001 Erlösberichtigungen erfasst."
  ],
  "pruefungsbezug": "Bei Skontoaufgaben zuerst den Skontobetrag berechnen, dann die vollständige Forderung oder Verbindlichkeit ausbuchen und zuletzt Bank sowie Nachlässe oder Erlösberichtigungen einsetzen.",
  "merksatz": "Einkaufsskonto mindert den Aufwand (Nachlässe), Verkaufsskonto mindert den Erlös (Erlösberichtigungen)."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e4 · Vorwärtskalkulation

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Einstandspreis berechnen und vorwärts kalkulieren

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e4",
  "titel": "Vorwärtskalkulation",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Handelskalkulation führt vom Listeneinkaufspreis zum Angebotspreis. Sie ist ein festes Schema, das man von oben nach unten durchrechnet. Der {{begriff:einstandspreis|Einstandspreis}} ist die Nahtstelle: Alles darüber betrifft den Einkauf, alles darunter den Verkauf."
    },
    {
      "typ": "grafik",
      "variante": "kalkulationsleiter",
      "kopf": "Die Leiter",
      "titel": "Vom Einkaufspreis zum Angebotspreis",
      "lead": "Ändere die Prozentsätze und sieh zu, wie sich der Angebotspreis verschiebt. Unten kannst du auf Rückwärtskalkulation umschalten.",
      "richtungen": [
        "vorwaerts",
        "rueckwaerts"
      ],
      "start": {
        "id": "lep",
        "name": "Listeneinkaufspreis",
        "wert": 500
      },
      "stufen": [
        {
          "id": "lief-rabatt",
          "name": "Lieferantenrabatt",
          "art": "abzug",
          "satz": 20,
          "ergebnis": "Zieleinkaufspreis"
        },
        {
          "id": "lief-skonto",
          "name": "Lieferantenskonto",
          "art": "abzug",
          "satz": 2,
          "ergebnis": "Bareinkaufspreis"
        },
        {
          "id": "bezug",
          "name": "Bezugskosten",
          "art": "zuschlag-absolut",
          "betrag": 8,
          "ergebnis": "Einstandspreis",
          "marke": true
        },
        {
          "id": "hkz",
          "name": "Handlungskostenzuschlag",
          "art": "aufschlag",
          "satz": 50,
          "ergebnis": "Selbstkosten"
        },
        {
          "id": "gewinn",
          "name": "Gewinnzuschlag",
          "art": "aufschlag",
          "satz": 20,
          "ergebnis": "Barverkaufspreis"
        },
        {
          "id": "kd-skonto",
          "name": "Kundenskonto",
          "art": "im-hundert",
          "satz": 4,
          "ergebnis": "Zielverkaufspreis"
        },
        {
          "id": "kd-rabatt",
          "name": "Kundenrabatt",
          "art": "im-hundert",
          "satz": 25,
          "ergebnis": "Listenverkaufspreis"
        }
      ],
      "regel": "Kundenskonto und Kundenrabatt werden „im Hundert“ aufgeschlagen, also dividiert statt multipliziert. Grund: Der Kunde zieht sie später vom Listenpreis ab — der muss also hoch genug sein, dass danach noch der Barverkaufspreis übrig bleibt.",
      "einheit": "€"
    },
    {
      "typ": "achtung",
      "text": "Der häufigste Rechenfehler der ganzen Prüfung: Kundenrabatt mit 25 % aufschlagen statt durch 0,75 teilen. Beides klingt gleich, ergibt aber unterschiedliche Zahlen — und nur die Division führt zurück zum richtigen Barverkaufspreis."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e4",
  "vorauswissen": [
    "Der Einstandspreis ist die Nahtstelle zwischen Einkauf und Verkauf.",
    "Aufschläge werden auf eine Bezugsgröße gerechnet; Abzüge im Hundert werden durch Division berücksichtigt."
  ],
  "ablauf": [
    "Lieferantenrabatt und Lieferantenskonto vom Listeneinkaufspreis abziehen.",
    "Bezugskosten addieren und den Einstandspreis bestimmen.",
    "Handlungskosten und Gewinn aufschlagen.",
    "Kundenskonto und Kundenrabatt im Hundert zurückrechnen."
  ],
  "erklaerung": "Die Vorwärtskalkulation führt vom bekannten Einkaufspreis zum notwendigen Listenverkaufspreis. Der kritische Richtungswechsel kommt am Ende: Ein Kundenrabatt wird nicht einfach auf den Barverkaufspreis aufgeschlagen, weil der Rabatt später vom Listenpreis abgezogen wird. Deshalb muss durch den verbleibenden Prozentsatz geteilt werden.",
  "beispiele": [
    "Aus 500 € Listeneinkaufspreis werden nach 20 % Lieferantenrabatt 400 € und nach 2 % Lieferantenskonto 392 €. Mit 8 € Bezugskosten beträgt der Einstandspreis 400 €.",
    "Ein Barverkaufspreis von 720 € führt bei 4 % Kundenskonto zu 720 € ÷ 0,96 = 750 € Zielverkaufspreis."
  ],
  "fallbeispiel": "Rechne die vorhandene Kalkulationsleiter durch: 500 € − 20 % = 400 €; 400 € − 2 % = 392 €; plus 8 € Bezugskosten = 400 € Einstandspreis. 50 % Handlungskosten ergeben 600 € Selbstkosten. 20 % Gewinn ergeben 720 € Barverkaufspreis. Danach: 720 € ÷ 0,96 = 750 € Zielverkaufspreis und 750 € ÷ 0,75 = 1.000 € Listenverkaufspreis. Die Divisionen sichern, dass nach den späteren Abzügen genau 720 € übrig bleiben.",
  "typische_fehler": "Der Kundenrabatt wird mit 25 % multipliziert und dadurch zu niedrig zurückgerechnet. Auch wird der Gewinn häufig auf den falschen Zwischenwert bezogen oder der Einstandspreis mit den Selbstkosten verwechselt.",
  "verstaendnisfragen": [
    "Warum wird der Kundenrabatt durch 0,75 berücksichtigt? Weil nach einem Rabatt von 25 % noch 75 % des Listenpreises übrig bleiben.",
    "Welche Größe trennt Einkaufs- und Verkaufsseite? Der Einstandspreis."
  ],
  "pruefungsbezug": "Das Kalkulationsschema vor dem Rechnen vollständig aufschreiben und bei jeder Zeile die neue Bezugsgröße kontrollieren. Im Hundert bedeutet am Ende Division durch den verbleibenden Prozentsatz.",
  "merksatz": "Vorwärts heißt vom Einkauf zum Verkauf; Kundenrabatt und Kundenskonto werden im Hundert durch Division zurückgerechnet."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e5 · Rückwärtskalkulation

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Rückwärts vom Marktpreis zum zulässigen Einkaufspreis rechnen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e5",
  "titel": "Rückwärtskalkulation",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Manchmal steht der Verkaufspreis fest, weil der Markt ihn vorgibt. Dann läuft dasselbe Schema rückwärts: Vom Listenverkaufspreis rechnet man nach oben und erfährt, wie teuer die Ware höchstens eingekauft werden darf, damit die Kalkulation noch aufgeht."
    },
    {
      "typ": "absatz",
      "text": "Technisch dreht sich dabei jede Rechenrichtung um: Aus Abzügen werden Aufschläge, aus „im Hundert“ wird „vom Hundert“. Das Schema selbst bleibt identisch — deshalb lohnt es sich, es einmal richtig zu lernen statt zweimal halb."
    },
    {
      "typ": "zuordnen",
      "lead": "Vorwärts oder rückwärts?",
      "kategorien": [
        "Vorwärts",
        "Rückwärts"
      ],
      "aufgaben": [
        {
          "text": "Ein Lieferant nennt seinen Preis, gesucht ist unser Angebotspreis.",
          "loesung": "Vorwärts"
        },
        {
          "text": "Der Konkurrent verlangt 89 €, wir wollen mithalten.",
          "loesung": "Rückwärts"
        },
        {
          "text": "Gesucht ist der höchstzulässige Einstandspreis.",
          "loesung": "Rückwärts"
        },
        {
          "text": "Der Einstandspreis steht fest, gesucht sind die Selbstkosten.",
          "loesung": "Vorwärts"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Schreib das Schema in der Prüfung zuerst leer untereinander, bevor du rechnest — alle acht Zeilen. Dann trägst du ein, was gegeben ist, und siehst sofort, in welche Richtung du arbeiten musst. Das kostet dreißig Sekunden und verhindert den teuersten Fehler: in der falschen Richtung loszurechnen."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e5",
  "vorauswissen": [
    "Das Kalkulationsschema bleibt gleich, auch wenn die Rechenrichtung wechselt.",
    "Bei der Rückwärtskalkulation ist der Verkaufspreis vorgegeben."
  ],
  "erklaerung": "Bei der Rückwärtskalkulation steht meist der am Markt mögliche Listenverkaufspreis fest. Gesucht wird der Preis, den der Betrieb höchstens für die Ware bezahlen darf. Deshalb wird von oben nach unten rückwärts durch die bekannte Leiter gerechnet; die wirtschaftliche Bedeutung der einzelnen Stufen ändert sich nicht.",
  "beispiele": [
    "Wenn der Konkurrent 89 € verlangt und der Betrieb mithalten muss, ist der Verkaufspreis gegeben und die Rückwärtskalkulation passend.",
    "Wenn der Einstandspreis feststeht und der Angebotspreis gesucht wird, handelt es sich dagegen um eine Vorwärtskalkulation."
  ],
  "fallbeispiel": "Die vorhandene Zuordnung liefert die Entscheidungshilfe: ‚Lieferant nennt seinen Preis, gesucht ist unser Angebotspreis‘ bedeutet vorwärts. ‚Konkurrent verlangt 89 €, wir wollen mithalten‘ bedeutet rückwärts. Im zweiten Fall wird vom feststehenden Verkaufspreis bis zum höchstzulässigen Einstandspreis zurückgerechnet.",
  "typische_fehler": "Die Rechenrichtung wird gewählt, ohne zuerst die gegebene Größe und die gesuchte Größe zu markieren. Außerdem werden bei der Rückwärtskalkulation die Abzüge und Aufschläge nicht in umgekehrter Richtung gelesen.",
  "verstaendnisfragen": [
    "Welche Frage entscheidet zwischen vorwärts und rückwärts? Ist der Einkaufspreis gegeben und der Verkaufspreis gesucht oder umgekehrt?",
    "Was bleibt bei beiden Verfahren gleich? Das Kalkulationsschema und die Bedeutung der einzelnen Stufen."
  ],
  "pruefungsbezug": "Vor dem Rechnen die Wörter ‚gegeben‘ und ‚gesucht‘ notieren. Das verhindert, dass ein korrektes Schema in der falschen Richtung verwendet wird.",
  "merksatz": "Vorwärts: Einkaufspreis ist bekannt. Rückwärts: Verkaufspreis ist bekannt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Umsatzsteuer

**Datei:** `k6-umsatzsteuer.kapitel.json` · SHA-256 `838c32845e0666bb9f35018fbdc226749aaaf22ced7ea6be44041fbafab4d122`

**Konkreter Kapitelauftrag:** Eine Rechnung einschließlich Vorsteuer-/Umsatzsteuerwirkung erfassen und nachträglich korrigieren; Netto und Brutto kontrollieren.

**Einordnung:** Durchlaufprinzip, Vorsteuer, Zahllast — und warum der Betrieb nur Kassierer ist.

### f1 · Wer zahlt die Umsatzsteuer wirklich?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das Durchlaufprinzip der Umsatzsteuer erklären können

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `merke-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f1",
  "titel": "Wer zahlt die Umsatzsteuer wirklich?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die Umsatzsteuer ist eine Verbrauchsteuer: Wirtschaftlich tragen soll sie der Endverbraucher. Unternehmen sind nur Inkassostelle — sie kassieren die Steuer vom Kunden, führen sie ab und holen sich die Steuer zurück, die sie selbst beim Einkauf gezahlt haben."
    },
    {
      "typ": "absatz",
      "text": "Das nennt man das **Durchlaufprinzip**. In einer Lieferkette zahlt jedes Glied Umsatzsteuer und bekommt {{begriff:vorsteuer|Vorsteuer}} erstattet. ==Übrig bleibt bei jedem nur die Steuer auf den eigenen Wertschöpfungsanteil== — und am Ende der Kette steht jemand, der nichts zurückholen kann: der Privatkunde."
    },
    {
      "typ": "merke",
      "text": "Für den Betrieb ist die Umsatzsteuer ein durchlaufender Posten, kein Aufwand. Deshalb wird sie nie über die GuV gebucht, sondern immer über Bestandskonten.",
      "karteikarte": "Warum ist die Umsatzsteuer für einen Betrieb kein Aufwand?"
    },
    {
      "typ": "vertiefung",
      "titel": "Warum der Staat es so kompliziert macht",
      "absaetze": [
        "Weil eine einfache Endverbrauchersteuer schwer zu kontrollieren wäre: Der Staat müsste jedem einzelnen Ladengeschäft glauben, was es an Privatkunden verkauft hat.",
        "Beim Durchlaufprinzip kontrolliert sich die Kette dagegen weitgehend selbst. Jeder Betrieb hat ein Interesse daran, dass sein Lieferant die Steuer korrekt ausweist — sonst bekommt er selbst keine Vorsteuer erstattet."
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f1",
  "vorauswissen": [
    "Ein Betrieb kauft Waren ein und verkauft sie weiter.",
    "Aufwendungen und Erträge werden von durchlaufenden Beträgen unterschieden."
  ],
  "erklaerung": "Bei einem umsatzsteuerpflichtigen Betrieb gehört die Umsatzsteuer wirtschaftlich nicht zum eigenen Ergebnis. Beim Verkauf wird sie vom Kunden vereinnahmt und später an das Finanzamt weitergeleitet. Beim Einkauf gezahlte Vorsteuer wird als Anspruch gegenüber dem Finanzamt berücksichtigt. Dadurch bleibt im Betrieb nur die Steuer auf dem eigenen Wertschöpfungsanteil hängen, während der Endverbraucher keine Vorsteuer zurückholen kann.",
  "beispiele": [
    "Beim Einkauf von Waren für 1.000 € netto und 190 € Vorsteuer schuldet der Betrieb dem Lieferanten 1.190 €, kann die 190 € aber als Vorsteuer berücksichtigen.",
    "Beim Verkauf für 2.000 € netto kommen 380 € Umsatzsteuer hinzu. Der Kunde zahlt 2.380 €, aber nur 2.000 € sind Umsatzerlös des Betriebs."
  ],
  "fallbeispiel": "Ein Betrieb nimmt 2.380 € ein und gibt beim Einkauf 1.190 € aus. Für das Ergebnis zählt der Nettobetrag: 2.000 € Verkauf minus 1.000 € Einkauf = 1.000 € Wertschöpfung. Die 380 € Umsatzsteuer und 190 € Vorsteuer laufen über eigene Konten; die Differenz von 190 € wird an das Finanzamt abgeführt.",
  "typische_fehler": "Der Bruttobetrag wird als Umsatz oder Aufwand behandelt. Ebenso wird angenommen, dass Umsatzsteuer über die GuV läuft. Im beschriebenen System gehören die Steuerbeträge auf Bestandskonten, weil sie Forderung oder Verbindlichkeit gegenüber dem Finanzamt darstellen.",
  "verstaendnisfragen": [
    "Warum ist Umsatzsteuer für den Betrieb kein Aufwand? Weil sie vom Kunden vereinnahmt und als Betrag gegenüber dem Finanzamt weitergeleitet wird.",
    "Wer trägt die Steuer am Ende der Lieferkette wirtschaftlich? Der Endverbraucher, der keine Vorsteuer zurückholen kann."
  ],
  "pruefungsbezug": "Bei Sachverhalten Brutto, Netto, Vorsteuer und Umsatzsteuer sprachlich sauber trennen. Die Leitfrage lautet: Gehört der Betrag zum eigenen Ergebnis oder wird er nur für das Finanzamt durchgeleitet?",
  "merksatz": "Für den Betrieb ist Umsatzsteuer ein durchlaufender Posten; der eigene Erfolg wird netto betrachtet."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f2 · Zwei Konten, zwei Richtungen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Vorsteuer und Umsatzsteuer als Konten korrekt einordnen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `tabelle-2`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f2",
  "titel": "Zwei Konten, zwei Richtungen",
  "inhalt": [
    {
      "typ": "tabelle",
      "spalten": [
        "",
        "Vorsteuer",
        "Umsatzsteuer"
      ],
      "zeilen": [
        {
          "zellen": [
            "Entsteht beim",
            "Einkauf",
            "Verkauf"
          ]
        },
        {
          "zellen": [
            "Gegenüber dem Finanzamt",
            "Forderung",
            "Verbindlichkeit"
          ]
        },
        {
          "zellen": [
            "In der Bilanz",
            "Aktivseite",
            "Passivseite"
          ]
        },
        {
          "zellen": [
            "Gebucht im",
            "Soll",
            "Haben"
          ],
          "mono": [
            1,
            2
          ],
          "detail": "**Das ist keine Extraregel:** Die Vorsteuer ist ein Aktivkonto, und Aktivkonten wachsen im Soll — genau wie in K3. Die Umsatzsteuer ist ein Passivkonto und wächst im Haben. Wer K3 sitzen hat, muss hier nichts Neues lernen."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "In Deutschland gelten zwei Steuersätze: 19 % als Regelsatz und 7 % für bestimmte Grundgüter. Daneben gibt es steuerfreie Umsätze mit 0 %."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Satz",
        "Gilt für",
        "Beispiele"
      ],
      "zeilen": [
        {
          "zellen": [
            "19 %",
            "alle übrigen Umsätze",
            "Elektronik, Kleidung, Dienstleistungen"
          ],
          "mono": [
            0
          ]
        },
        {
          "zellen": [
            "7 %",
            "bestimmte Grundgüter",
            "Lebensmittel, Bücher, Zeitungen, ÖPNV"
          ],
          "mono": [
            0
          ]
        },
        {
          "zellen": [
            "0 %",
            "gesetzlich befreite Umsätze",
            "Ausfuhr, Arztleistungen, Wohnraummiete"
          ],
          "mono": [
            0
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Bruttobetrag von 1.190 € enthält 19 % Umsatzsteuer. Wie hoch ist der Nettobetrag?",
      "optionen": [
        {
          "text": "1.190 € − 19 % = 963,90 €",
          "richtig": false,
          "echo": "Ein häufiger Fehler. Die 19 % beziehen sich auf den Nettobetrag, nicht auf den Bruttobetrag — deshalb darf man sie nicht einfach vom Brutto abziehen."
        },
        {
          "text": "1.190 € ÷ 1,19 = 1.000 €",
          "richtig": true,
          "echo": "Richtig. Der Bruttobetrag entspricht 119 % des Nettobetrags. Also teilt man durch 1,19. Die Steuer ist dann die Differenz: 1.190 − 1.000 = 190 €. Bei 7 % entsprechend durch 1,07."
        },
        {
          "text": "1.190 € × 0,81 = 963,90 €",
          "richtig": false,
          "echo": "Derselbe Denkfehler in anderer Form: Auch hier wird der Prozentsatz auf den falschen Grundwert bezogen. Bei Abzügen im Hundert wird immer dividiert."
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
    "Aktivkonten wachsen im Soll, Passivkonten im Haben.",
    "Der Bruttobetrag enthält Nettobetrag und Steuer."
  ],
  "erklaerung": "Vorsteuer und Umsatzsteuer sind keine zwei Namen für dasselbe Konto. Vorsteuer entsteht beim Einkauf und stellt eine Forderung gegenüber dem Finanzamt dar; sie steht daher auf der Aktivseite und nimmt im Soll zu. Umsatzsteuer entsteht beim Verkauf und ist eine Verbindlichkeit; sie steht auf der Passivseite und nimmt im Haben zu.",
  "beispiele": [
    "Bei 1.190 € brutto und 19 % Steuer wird der Nettobetrag durch 1,19 berechnet: 1.190 € ÷ 1,19 = 1.000 €; die Steuer beträgt 190 €.",
    "Bei einem steuerpflichtigen Nettoverkauf von 2.000 € mit 19 % entstehen 380 € Umsatzsteuer und damit 2.380 € Forderung oder Zahlungseingang."
  ],
  "fallbeispiel": "Ein Bruttobetrag von 1.190 € enthält 19 % Umsatzsteuer. Brutto sind 119 % des Nettobetrags. Daher: 1.190 € ÷ 1,19 = 1.000 € netto. Die enthaltene Umsatzsteuer beträgt 1.190 € − 1.000 € = 190 €. Der Weg über Division ist notwendig, weil sich die 19 % auf den Nettobetrag beziehen.",
  "typische_fehler": "19 % werden direkt vom Bruttobetrag abgezogen oder mit 0,81 multipliziert. Das würde die Steuer auf den falschen Grundwert beziehen. Außerdem wird Vorsteuer auf die Passivseite eingeordnet, obwohl sie eine Forderung ist.",
  "verstaendnisfragen": [
    "Warum steht Vorsteuer im Soll? Sie ist ein Aktivkonto und damit eine Forderung gegenüber dem Finanzamt.",
    "Warum wird bei der Bruttorechnung durch 1,19 geteilt? Weil der Bruttobetrag 119 % des Nettobetrags entspricht."
  ],
  "pruefungsbezug": "Bei Brutto-Netto-Aufgaben zuerst den Steuersatz erkennen und die Bezugsgröße bestimmen. Bei 19 % durch 1,19, bei 7 % durch 1,07 teilen; die Differenz ist die enthaltene Steuer.",
  "merksatz": "Vorsteuer: Einkauf, Aktivseite, Soll. Umsatzsteuer: Verkauf, Passivseite, Haben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f3 · Buchen mit Umsatzsteuer

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Buchungen mit Umsatzsteuer formulieren und die Zahllast berechnen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`, `tabelle-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f3",
  "titel": "Buchen mit Umsatzsteuer",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Alle Warenbewegungen werden netto gebucht, die Steuer läuft über eigene Konten. Am Ende des Voranmeldungszeitraums stehen sich Umsatzsteuer und Vorsteuer gegenüber; die Differenz ist die {{begriff:zahllast|Zahllast}}."
    },
    {
      "typ": "grafik",
      "variante": "t-konto",
      "kopf": "Buchen, live",
      "titel": "Ein Zyklus mit Umsatzsteuer",
      "lead": "Drei Vorfälle nacheinander: einkaufen, verkaufen, ans Finanzamt abführen.",
      "konten": [
        {
          "id": "waren",
          "name": "Wareneinkauf",
          "art": "aufwand",
          "ab": 0
        },
        {
          "id": "vst",
          "name": "Vorsteuer",
          "art": "aktiv",
          "ab": 0
        },
        {
          "id": "verb",
          "name": "Verbindlichkeiten LuL",
          "art": "passiv",
          "ab": 0
        },
        {
          "id": "ford",
          "name": "Forderungen LuL",
          "art": "aktiv",
          "ab": 0
        },
        {
          "id": "erloese",
          "name": "Umsatzerlöse",
          "art": "ertrag",
          "ab": 0
        },
        {
          "id": "ust",
          "name": "Umsatzsteuer",
          "art": "passiv",
          "ab": 0
        },
        {
          "id": "bank",
          "name": "Bank",
          "art": "aktiv",
          "ab": 20000
        }
      ],
      "vorfaelle": [
        {
          "text": "Wareneinkauf auf Ziel: 1.000 € netto",
          "satz": "Wareneinkauf 1.000 € + Vorsteuer 190 € an Verbindlichkeiten LuL 1.190 €",
          "soll": [
            {
              "konto": "waren",
              "betrag": 1000
            },
            {
              "konto": "vst",
              "betrag": 190
            }
          ],
          "haben": [
            {
              "konto": "verb",
              "betrag": 1190
            }
          ],
          "echo": "Die Ware kostet 1.000 €, geschuldet werden 1.190 €. Die Differenz ist keine Ausgabe, sondern eine Forderung ans Finanzamt — deshalb ein eigenes Aktivkonto."
        },
        {
          "text": "Warenverkauf auf Ziel: 2.000 € netto",
          "satz": "Forderungen LuL 2.380 € an Umsatzerlöse 2.000 € + Umsatzsteuer 380 €",
          "soll": [
            {
              "konto": "ford",
              "betrag": 2380
            }
          ],
          "haben": [
            {
              "konto": "erloese",
              "betrag": 2000
            },
            {
              "konto": "ust",
              "betrag": 380
            }
          ],
          "echo": "Der Kunde schuldet 2.380 €, verdient hat der Betrieb aber nur 2.000 €. Die 380 € gehören dem Finanzamt und stehen deshalb als Verbindlichkeit im Haben."
        },
        {
          "text": "Zahllast ans Finanzamt überweisen",
          "satz": "Umsatzsteuer 380 € an Vorsteuer 190 € + Bank 190 €",
          "soll": [
            {
              "konto": "ust",
              "betrag": 380
            }
          ],
          "haben": [
            {
              "konto": "vst",
              "betrag": 190
            },
            {
              "konto": "bank",
              "betrag": 190
            }
          ],
          "echo": "Zuerst wird die Vorsteuer gegen die Umsatzsteuer verrechnet, dann fließt der Rest. Beide Steuerkonten stehen danach auf null — genau so soll es sein."
        }
      ],
      "regel": "Zahllast = Umsatzsteuer − Vorsteuer. Positiv heißt zahlen, negativ heißt Erstattung."
    },
    {
      "typ": "merke",
      "text": "Der Betrieb hat 2.380 € eingenommen und 1.190 € ausgegeben, aber nur 1.000 € verdient und 190 € ans Finanzamt abgeführt. Die Umsatzsteuer taucht im Ergebnis nirgends auf — sie ist durchgelaufen.",
      "karteikarte": "Wie berechnet sich die Zahllast, und was bedeutet ein negativer Wert?"
    },
    {
      "typ": "absatz",
      "text": "Ändert sich der Nettobetrag nachträglich, ändert sich auch die Steuer. Das passiert bei **Skonto**, bei **Rücksendungen** und bei **Preisnachlässen wegen eines Mangels**. Gebucht wird dann nicht nur die Minderung selbst, sondern auch die Berichtigung der Vorsteuer (beim Einkauf) oder der Umsatzsteuer (beim Verkauf) — § 17 UStG."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorgang",
        "Rechnung",
        "Buchung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Einkauf: Zahlung mit 2 % Skonto",
            "Rechnung 1.190 € brutto · Skonto 23,80 € = 20,00 € netto + 3,80 € Steuer",
            "4400 Verbindlichkeiten 1.190,00 € an 2800 Bank 1.166,20 € + 6001 Nachlässe 20,00 € + 2600 Vorsteuer 3,80 €"
          ],
          "mono": [
            2
          ],
          "detail": "**Erst brutto, dann aufteilen.** Der Skonto wird vom Bruttobetrag berechnet (2 % von 1.190 € = 23,80 €) und dann durch 1,19 geteilt: 20,00 € netto, 3,80 € Steuer. Weil der Betrieb weniger bezahlt hat, darf er auch nur weniger Vorsteuer abziehen — deshalb steht die Vorsteuer hier im Haben."
        },
        {
          "zellen": [
            "Verkauf: Kunde zahlt mit 2 % Skonto",
            "Forderung 2.380 € brutto · Skonto 47,60 € = 40,00 € netto + 7,60 € Steuer",
            "2800 Bank 2.332,40 € + 5001 Erlösberichtigungen 40,00 € + 4800 Umsatzsteuer 7,60 € an 2400 Forderungen 2.380,00 €"
          ],
          "mono": [
            2
          ],
          "detail": "**Spiegelbildlich.** Der Erlös sinkt um 40 €, und auch die Umsatzsteuer, die an das Finanzamt geht, sinkt um 7,60 € — deshalb steht die Umsatzsteuer im Soll."
        },
        {
          "zellen": [
            "Rücksendung an den Lieferanten",
            "Ware 100 € netto + 19 € Steuer",
            "4400 Verbindlichkeiten 119 € an Wareneinkauf 100 € + 2600 Vorsteuer 19 €"
          ],
          "mono": [
            2
          ],
          "detail": "**Die Gegenbuchung zum Einkauf.** Was beim Einkauf im Soll stand, steht bei der Rücksendung im Haben — einschließlich der Vorsteuer."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Der häufigste Fehler: den ganzen Skontobetrag (23,80 €) auf Nachlässe buchen und die Vorsteuer vergessen. Dann ist der Einkauf zu billig und die Vorsteuer zu hoch angesetzt — das Finanzamt würde zu viel erstatten."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f3",
  "vorauswissen": [
    "Wareneinkäufe und Warenverkäufe werden netto auf Aufwand und Ertrag gebucht.",
    "Die Steuerbeträge laufen über Vorsteuer und Umsatzsteuer."
  ],
  "ablauf": [
    "Beim Einkauf Nettowert und Vorsteuer im Soll, Bruttoschuld im Haben buchen.",
    "Beim Verkauf Bruttoforderung im Soll, Nettoerlös und Umsatzsteuer im Haben buchen.",
    "Umsatzsteuer mit Vorsteuer verrechnen.",
    "Eine positive Differenz als Zahllast an das Finanzamt überweisen."
  ],
  "erklaerung": "Die Zahllast ist keine zusätzliche Steuer neben den bereits gebuchten Beträgen. Sie ist der Saldo aus Umsatzsteuer und Vorsteuer: Zahllast = Umsatzsteuer − Vorsteuer. Ist der Wert positiv, muss der Betrieb zahlen; ist er negativ, ergibt sich eine Erstattung.",
  "beispiele": [
    "Der Einkauf von 1.000 € netto erzeugt 190 € Vorsteuer und eine Verbindlichkeit von 1.190 €.",
    "Der Verkauf von 2.000 € netto erzeugt 380 € Umsatzsteuer und eine Forderung von 2.380 €.",
    "Zahlt der Betrieb eine Rechnung über 1.190 € mit 2 % Skonto, berichtigt er die Vorsteuer um 3,80 €: Skonto 23,80 € brutto = 20,00 € Nachlass + 3,80 € Vorsteuerkorrektur."
  ],
  "fallbeispiel": "Bilde den vollständigen Zyklus aus der Grafik: 1. Wareneinkauf 1.000 € + Vorsteuer 190 € an Verbindlichkeiten 1.190 €. 2. Forderungen 2.380 € an Umsatzerlöse 2.000 € + Umsatzsteuer 380 €. 3. Umsatzsteuer 380 € an Vorsteuer 190 € + Bank 190 €. Die Zahllast beträgt 380 € − 190 € = 190 €. Nach der Verrechnung stehen beide Steuerkonten auf null.",
  "typische_fehler": "Die Umsatzsteuer wird auf den Warenaufwand aufgeschlagen oder die Vorsteuer als Aufwand behandelt. Auch die vollständige Forderung beziehungsweise Verbindlichkeit wird manchmal nicht ausgebucht. Bei Skonto, Rücksendung und Mängelnachlass wird außerdem häufig vergessen, die Steuer mitzuberichtigen: Ändert sich der Nettobetrag, ändert sich auch die Vorsteuer oder Umsatzsteuer.",
  "verstaendnisfragen": [
    "Was bedeutet eine negative Zahllast? Die Vorsteuer ist höher als die Umsatzsteuer; gegenüber dem Finanzamt ergibt sich eine Erstattung.",
    "Warum wird beim Verkauf die Forderung mit dem Bruttobetrag gebucht? Weil der Kunde Nettoerlös und Umsatzsteuer zusammen schuldet."
  ],
  "pruefungsbezug": "Buchungssätze immer in Netto, Steuer und Brutto zerlegen. Danach Zahllast mit der Formel prüfen und kontrollieren, ob die Soll- und Habenbeträge ausgeglichen sind.",
  "merksatz": "Zahllast = Umsatzsteuer − Vorsteuer; gezahlt wird nur die Differenz."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f4 · Die Kleinunternehmerregelung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Kleinunternehmerregelung einordnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f4",
  "titel": "Die Kleinunternehmerregelung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Wer nur geringe Umsätze hat, ist nach {{par:ustg-19|§ 19 UStG}} von der Umsatzsteuer befreit. Die Grenzen liegen seit 2025 bei ==25.000 Euro Vorjahresumsatz und 100.000 Euro im laufenden Jahr==. Ein {{begriff:kleinunternehmer|Kleinunternehmer}} weist keine Umsatzsteuer aus, muss keine Voranmeldung abgeben — und bekommt im Gegenzug keine Vorsteuer erstattet."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "",
        "Kleinunternehmer",
        "Regelbesteuerung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Umsatzgrenzen",
            "25.000 € Vorjahr · 100.000 € laufendes Jahr",
            "keine — Regelbesteuerung ab dem ersten Euro"
          ],
          "detail": "**Zwei Grenzen, zwei Wirkungen:** Die 25.000 Euro betreffen den Vorjahresumsatz — wird sie überschritten, wechselt man zum 1. Januar in die Regelbesteuerung. Die 100.000 Euro gelten für das laufende Jahr und sind seit 2025 **keine Prognose mehr**: Schon der Umsatz, mit dem die Grenze überschritten wird, unterliegt in voller Höhe der Umsatzsteuer."
        },
        {
          "zellen": [
            "Umsatzsteuer auf Rechnungen",
            "nein",
            "ja"
          ]
        },
        {
          "zellen": [
            "Vorsteuerabzug",
            "nein",
            "ja"
          ]
        },
        {
          "zellen": [
            "Vorteil",
            "weniger Bürokratie, günstiger für Privatkunden",
            "Vorsteuererstattung möglich"
          ],
          "detail": "**Wann sich was lohnt:** Wer überwiegend an Privatkunden verkauft und wenig einkauft, fährt als Kleinunternehmer besser — sein Preis wirkt für den Kunden günstiger. Wer viel investiert oder an andere Unternehmen verkauft, verzichtet auf die Regelung, weil die Vorsteuererstattung mehr wert ist."
        },
        {
          "zellen": [
            "Nachteil",
            "höhere Einkaufskosten",
            "monatliche oder vierteljährliche Voranmeldung"
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Ein Kleinunternehmer darf **keine** Umsatzsteuer auf Rechnungen ausweisen. Tut er es trotzdem, schuldet er den ausgewiesenen Betrag dem Finanzamt — ohne dafür Vorsteuer abziehen zu dürfen. Seit 2025 sind seine Umsätze zudem echt **steuerfrei** und nicht mehr nur „nicht erhoben“; auf der Rechnung braucht es deshalb einen Hinweis auf die Steuerbefreiung."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f4",
  "vorauswissen": [
    "Die Kleinunternehmerregelung ist eine Ausnahme von der Regelbesteuerung.",
    "Wer keine Umsatzsteuer ausweist, kann im Gegenzug keine Vorsteuer abziehen."
  ],
  "erklaerung": "Die vorhandene Gegenüberstellung zeigt den Zielkonflikt: Die Kleinunternehmerregelung reduziert Bürokratie und kann bei Privatkunden einen günstigeren Rechnungsbetrag ermöglichen. Dafür wird beim Einkauf die enthaltene Vorsteuer nicht erstattet, sodass sie als Teil der Einkaufskosten beim Betrieb bleibt. Bei der Regelbesteuerung werden Umsatzsteuer und Vorsteuer dagegen getrennt ausgewiesen und verrechnet.",
  "beispiele": [
    "Ein Kleinunternehmer weist auf seiner Rechnung keine Umsatzsteuer aus und erhält die beim Einkauf gezahlte Vorsteuer nicht zurück.",
    "Ein regelbesteuerter Betrieb weist Umsatzsteuer aus, führt sie ab und kann die Vorsteuer aus betrieblichen Einkäufen berücksichtigen."
  ],
  "fallbeispiel": "Prüfe die beiden Grenzen aus dem Kapitel: Maßgeblich sind 25.000 € Vorjahresumsatz und 100.000 € im laufenden Jahr. Wer die Regelung nutzt, darf keine Umsatzsteuer auf Rechnungen ausweisen und hat keinen Vorsteuerabzug. Überschreitet der Sachverhalt die Voraussetzungen, muss die Regelbesteuerung geprüft werden. In einer Aufgabe sind deshalb Umsatzjahr, Umsatzhöhe und Rechnungsangabe getrennt zu lesen.",
  "typische_fehler": "Kleinunternehmerstatus wird mit ‚keine Steuer auf der Rechnung, aber Vorsteuerabzug‘ verwechselt. Ebenso falsch ist, trotz Regelung Umsatzsteuer auszuweisen; der ausgewiesene Betrag wird dadurch nicht zu einem zulässigen Vorsteuerabzug.",
  "verstaendnisfragen": [
    "Welcher zentrale Vorteil steht welchem Nachteil gegenüber? Weniger Bürokratie und ein günstigerer Bruttopreis stehen dem fehlenden Vorsteuerabzug gegenüber.",
    "Welche Angaben müssen bei einer Aufgabe zuerst geprüft werden? Vorjahresumsatz, laufender Umsatz und ob Umsatzsteuer auf der Rechnung ausgewiesen wird."
  ],
  "pruefungsbezug": "Die Kleinunternehmerregelung wird am sichersten über eine Vergleichstabelle gelöst: Umsatzgrenzen, Ausweis auf der Rechnung, Vorsteuerabzug, Vorteil und Nachteil nacheinander prüfen.",
  "merksatz": "Keine Umsatzsteuer auf der Rechnung bedeutet bei der Kleinunternehmerregelung auch keinen Vorsteuerabzug."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k7 · Personalkosten & Gehaltsbuchung

**Datei:** `k7-personal.kapitel.json` · SHA-256 `ca012928320965a6a8d0a90b351fc1d9a03ac7fa8726748dfab11a1559140e75`

**Konkreter Kapitelauftrag:** Eine ausdrücklich vereinfachte Lohnabrechnung bis Arbeitgeberaufwand und Verbindlichkeiten verfolgen; angenommene Sätze kennzeichnen.

**Einordnung:** Vom Bruttolohn zum Nettolohn — und warum ein Gehalt den Betrieb mehr kostet, als draufsteht.

### g1 · Vom Brutto zum Netto

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bruttolohn und Nettolohn unterscheiden und die Abzüge benennen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g1",
  "titel": "Vom Brutto zum Netto",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der {{begriff:bruttolohn|Bruttolohn}} steht im Arbeitsvertrag. Was davon ankommt, ist der {{begriff:nettolohn|Nettolohn}} — dazwischen liegen Steuern und der Arbeitnehmeranteil zur Sozialversicherung. Die Rechnung ist eine reine Abzugsleiter, genau wie die Kalkulation aus K5, nur in eine Richtung."
    },
    {
      "typ": "grafik",
      "variante": "kalkulationsleiter",
      "kopf": "Die Abzugsleiter",
      "titel": "Bruttogehalt 3.000 €",
      "lead": "Ändere das Bruttogehalt oder die Sätze und sieh, was unten ankommt.",
      "richtungen": [
        "vorwaerts"
      ],
      "start": {
        "id": "brutto",
        "name": "Bruttolohn",
        "wert": 3000
      },
      "stufen": [
        {
          "id": "lst",
          "name": "Lohnsteuer",
          "art": "abzug",
          "satz": 15,
          "ergebnis": "nach Lohnsteuer"
        },
        {
          "id": "solz",
          "name": "Solidaritätszuschlag",
          "art": "abzug-von",
          "basis": "lst",
          "satz": 5.5,
          "ergebnis": "nach SolZ"
        },
        {
          "id": "kist",
          "name": "Kirchensteuer",
          "art": "abzug-von",
          "basis": "lst",
          "satz": 9,
          "ergebnis": "nach Kirchensteuer"
        },
        {
          "id": "kv",
          "name": "AN-Anteil Krankenversicherung (inkl. Zusatzbeitrag)",
          "art": "abzug-vom-start",
          "satz": 8.75,
          "ergebnis": "nach KV"
        },
        {
          "id": "rv",
          "name": "AN-Anteil Rentenversicherung",
          "art": "abzug-vom-start",
          "satz": 9.3,
          "ergebnis": "nach RV"
        },
        {
          "id": "av",
          "name": "AN-Anteil Arbeitslosenversicherung",
          "art": "abzug-vom-start",
          "satz": 1.3,
          "ergebnis": "nach AV"
        },
        {
          "id": "pv",
          "name": "AN-Anteil Pflegeversicherung",
          "art": "abzug-vom-start",
          "satz": 1.8,
          "ergebnis": "Nettolohn",
          "marke": true
        }
      ],
      "regel": "Sozialversicherungsanteile werden immer vom Bruttolohn berechnet, nicht vom bereits geminderten Betrag. Solidaritätszuschlag und Kirchensteuer dagegen von der Lohnsteuer. Sätze 2026: Krankenversicherung 14,6 % plus durchschnittlich 2,9 % Zusatzbeitrag, Rentenversicherung 18,6 %, Arbeitslosenversicherung 2,6 %, Pflegeversicherung 3,6 % — jeweils zur Hälfte getragen (Pflegeversicherung ohne Kinderlosenzuschlag, außerhalb Sachsens). Die Lohnsteuer von 15 % ist eine vereinfachte Fallvorgabe: Real ergibt sie sich aus Steuerklasse und Lohnsteuertabelle, und der Solidaritätszuschlag fällt für die meisten Beschäftigten wegen der Freigrenze ganz weg.",
      "einheit": "€"
    },
    {
      "typ": "merke",
      "text": "Brutto − Lohnsteuer − Solidaritätszuschlag − Kirchensteuer − Arbeitnehmeranteile Sozialversicherung = Netto. Der Solidaritätszuschlag und die Kirchensteuer werden nicht vom Brutto berechnet, sondern von der Lohnsteuer.",
      "karteikarte": "Aus welchen Bestandteilen setzt sich der Weg vom Brutto- zum Nettolohn zusammen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "g1",
  "vorauswissen": [
    "Der Bruttolohn ist die Ausgangsgröße der Abzüge.",
    "Nicht jeder Abzug wird vom gleichen Grundwert berechnet."
  ],
  "erklaerung": "Der Bruttolohn steht vor allen Abzügen. Für den Nettolohn werden Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und die Arbeitnehmeranteile zur Sozialversicherung abgezogen. Dabei wird zwischen Abzügen vom Brutto und Abzügen von der Lohnsteuer unterschieden: Die Sozialversicherung wird vom Bruttolohn berechnet, Solidaritätszuschlag und Kirchensteuer von der Lohnsteuer.",
  "beispiele": [
    "Bei 3.000 € Brutto werden in der vorhandenen Abzugsleiter zunächst 15 % Lohnsteuer, danach Solidaritätszuschlag und Kirchensteuer auf die Lohnsteuer sowie die Sozialversicherungsanteile vom Brutto abgezogen.",
    "Die Arbeitnehmeranteile zur Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung werden getrennt betrachtet und anschließend vom Brutto abgezogen."
  ],
  "fallbeispiel": "Fallvorgabe zur Übung (keine echte Lohnsteuertabelle): Für 3.000 € brutto beträgt die Lohnsteuer bei 15 % 450 €. Solidaritätszuschlag: 5,5 % von 450 € = 24,75 €. Kirchensteuer: 9 % von 450 € = 40,50 €. Die Arbeitnehmeranteile zur Sozialversicherung: 8,75 % + 9,3 % + 1,3 % + 1,8 % = 21,15 % von 3.000 € = 634,50 €. Netto: 3.000 € − 450 € − 24,75 € − 40,50 € − 634,50 € = 1.850,25 €.",
  "typische_fehler": "Alle Prozentsätze werden direkt vom Brutto berechnet. Dadurch werden Solidaritätszuschlag und Kirchensteuer zu hoch angesetzt. Außerdem wird Netto mit dem Betrag verwechselt, den der Betrieb insgesamt für die Beschäftigung aufwendet.",
  "verstaendnisfragen": [
    "Von welcher Größe werden Solidaritätszuschlag und Kirchensteuer berechnet? Von der Lohnsteuer.",
    "Was ist die Nettolohnrechnung im Kern? Eine Abzugsleiter vom Bruttolohn zu dem Betrag, der an den Mitarbeiter ausgezahlt wird."
  ],
  "pruefungsbezug": "Bei Rechenaufgaben die Bezugsgröße neben jeden Prozentsatz schreiben. Wenn Beitragssätze vorgegeben sind, zählt die richtige Reihenfolge mehr als das Auswendiglernen.",
  "merksatz": "Brutto ist die Ausgangsgröße; Netto ist Brutto minus Steuern und Arbeitnehmeranteile."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### g2 · Was der Betrieb zusätzlich zahlt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Arbeitnehmer- und Arbeitgeberanteile zur Sozialversicherung einordnen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g2",
  "titel": "Was der Betrieb zusätzlich zahlt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Bruttolohn ist nicht das Ende der Rechnung. Der {{begriff:arbeitgeberanteil|Arbeitgeberanteil}} zur {{begriff:sozialversicherung|Sozialversicherung}} kommt obendrauf — er wird nicht abgezogen, sondern zusätzlich gezahlt. ==Die Personalkosten sind mindestens Bruttolohn plus Arbeitgeberanteil==, also rund 121 % des vereinbarten Gehalts. Hinzu kommen Beiträge, die der Arbeitgeber allein trägt — etwa zur Unfallversicherung und die Umlagen für Krankheit und Mutterschaft —, die hier zur Vereinfachung weggelassen werden."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Zweig",
        "Beitragssatz 2026",
        "Arbeitnehmer",
        "Arbeitgeber"
      ],
      "zeilen": [
        {
          "zellen": [
            "Krankenversicherung",
            "14,6 % + 2,9 % Zusatzbeitrag",
            "8,75 %",
            "8,75 %"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Rentenversicherung",
            "18,6 %",
            "9,3 %",
            "9,3 %"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Arbeitslosenversicherung",
            "2,6 %",
            "1,3 %",
            "1,3 %"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "Pflegeversicherung",
            "3,6 %",
            "1,8 %",
            "1,8 %"
          ],
          "mono": [
            1,
            2,
            3
          ],
          "detail": "**Grundregel hälftig — mit Sonderfällen.** Der allgemeine Satz von 3,6 Prozent wird je zur Hälfte getragen (§ 58 SGB XI). Kinderlose ab 23 Jahren zahlen zusätzlich 0,6 Prozentpunkte allein, Eltern mit mehreren Kindern unter 25 bekommen Abschläge auf ihren Anteil. In Sachsen trägt der Arbeitnehmer einen höheren Anteil. Die Rechnungen in diesem Kapitel gehen von einem Elternteil außerhalb Sachsens aus."
        },
        {
          "zellen": [
            "Unfallversicherung",
            "je nach Gefahrenklasse",
            "—",
            "vollständig"
          ],
          "mono": [
            2,
            3
          ],
          "detail": "**Warum die Unfallversicherung anders ist:** Sie deckt Arbeitsunfälle und Berufskrankheiten ab, also ein Risiko aus dem Betrieb. Deshalb trägt ihn der Betrieb allein, und der Beitrag richtet sich nach der Gefahrenklasse der Branche."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Mitarbeiter verdient 3.000 € brutto, der Arbeitgeberanteil zur Sozialversicherung beträgt 634,50 €. Was kostet er den Betrieb?",
      "optionen": [
        {
          "text": "1.850,25 €, also den Nettolohn",
          "richtig": false,
          "echo": "Der Nettolohn ist nur der Teil, der beim Mitarbeiter ankommt. Steuern und Sozialabgaben zahlt der Betrieb ebenfalls — nur eben an Finanzamt und Krankenkasse statt an den Mitarbeiter."
        },
        {
          "text": "3.000 €, also den Bruttolohn",
          "richtig": false,
          "echo": "Fast. Der Bruttolohn deckt alles ab, was vom Gehalt abgezogen wird — aber nicht den Arbeitgeberanteil, der zusätzlich anfällt."
        },
        {
          "text": "3.634,50 €, also Brutto plus Arbeitgeberanteil",
          "richtig": true,
          "echo": "Richtig. Für den Betrieb zählt der Gesamtaufwand. Bei jeder Kalkulation und jeder Stellenentscheidung ist das die Zahl, mit der gerechnet werden muss — nicht das Bruttogehalt."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "g2",
  "vorauswissen": [
    "Der Arbeitnehmeranteil wird vom Brutto abgezogen.",
    "Der Arbeitgeberanteil wird zusätzlich zum Brutto gezahlt."
  ],
  "erklaerung": "Für den Betrieb endet die Rechnung nicht beim Bruttolohn. Der Arbeitgeberanteil zur Sozialversicherung kommt zusätzlich hinzu und wird nicht vom Netto des Mitarbeiters abgezogen. Deshalb sind die echten Personalkosten höher als das Gehalt, das im Vertrag steht.",
  "beispiele": [
    "Bei 3.000 € Brutto und 634,50 € Arbeitgeberanteil entstehen Personalkosten von 3.634,50 €.",
    "Die Unfallversicherung wird in der vorhandenen Tabelle vollständig vom Arbeitgeber getragen, während die übrigen Zweige mit Arbeitnehmer- und Arbeitgeberanteilen dargestellt werden."
  ],
  "fallbeispiel": "Ein Mitarbeiter verdient 3.000 € brutto. Der Arbeitgeberanteil zur Sozialversicherung beträgt 634,50 €. Rechnung: 3.000 € + 634,50 € = 3.634,50 €. Dieser Betrag ist der Aufwand des Betriebs für die Beschäftigung. Der Nettolohn von 1.850,25 € beschreibt dagegen nur die Auszahlung an den Mitarbeiter.",
  "typische_fehler": "Der Arbeitgeberanteil wird als weiterer Abzug vom Bruttolohn behandelt. Dadurch wird der Nettolohn fälschlich kleiner. Ein anderer Fehler ist, den Nettolohn als Personalkosten des Betriebs zu verwenden.",
  "verstaendnisfragen": [
    "Warum wird der Arbeitgeberanteil nicht vom Nettolohn abgezogen? Weil er zusätzlich vom Betrieb gezahlt wird.",
    "Welche Größe ist für die Kostenentscheidung des Betriebs relevant? Bruttolohn plus Arbeitgeberanteil."
  ],
  "pruefungsbezug": "Bei einer Kostenfrage immer unterscheiden: Auszahlung an den Mitarbeiter, Abführung an Finanzamt und Sozialversicherung sowie Gesamtaufwand des Arbeitgebers.",
  "merksatz": "Netto ist die Auszahlung; Personalkosten sind Brutto plus Arbeitgeberanteil."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### g3 · Die Gehaltsbuchung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine vollständige Gehaltsbuchung formulieren

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g3",
  "titel": "Die Gehaltsbuchung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Gebucht wird in drei Schritten: erst das Bruttogehalt als Aufwand mit allen Abzügen als Verbindlichkeiten, dann der Arbeitgeberanteil als zusätzlicher Aufwand, dann die tatsächlichen Zahlungen. Wichtig: ==Der Betrieb bucht den vollen Bruttobetrag als Aufwand==, obwohl er dem Mitarbeiter nur das Netto überweist."
    },
    {
      "typ": "grafik",
      "variante": "t-konto",
      "kopf": "Buchen, live",
      "titel": "Gehalt 3.000 € brutto",
      "lead": "Lohnsteuer, Soli und Kirchensteuer 515,25 €, Arbeitnehmeranteil Sozialversicherung 634,50 €, Netto 1.850,25 €, Arbeitgeberanteil 634,50 €.",
      "konten": [
        {
          "id": "loehne",
          "name": "Löhne und Gehälter",
          "art": "aufwand",
          "ab": 0
        },
        {
          "id": "soziale",
          "name": "Soziale Abgaben",
          "art": "aufwand",
          "ab": 0
        },
        {
          "id": "vlst",
          "name": "Verbindlichkeiten Lohnsteuer",
          "art": "passiv",
          "ab": 0
        },
        {
          "id": "vsv",
          "name": "Verbindlichkeiten Sozialversicherung",
          "art": "passiv",
          "ab": 0
        },
        {
          "id": "vnetto",
          "name": "Verbindlichkeiten Nettolohn",
          "art": "passiv",
          "ab": 0
        },
        {
          "id": "bank",
          "name": "Bank",
          "art": "aktiv",
          "ab": 10000
        }
      ],
      "vorfaelle": [
        {
          "text": "Schritt 1 · Gehalt erfassen",
          "satz": "Löhne und Gehälter 3.000 € an Verbindlichkeiten Lohnsteuer 515,25 € + Verbindlichkeiten SV 634,50 € + Verbindlichkeiten Nettolohn 1.850,25 €",
          "soll": [
            {
              "konto": "loehne",
              "betrag": 3000
            }
          ],
          "haben": [
            {
              "konto": "vlst",
              "betrag": 515.25
            },
            {
              "konto": "vsv",
              "betrag": 634.5
            },
            {
              "konto": "vnetto",
              "betrag": 1850.25
            }
          ],
          "echo": "Der volle Bruttobetrag ist Aufwand. Er verteilt sich auf drei Verbindlichkeiten: gegenüber dem Finanzamt, der Krankenkasse und dem Mitarbeiter selbst. Gezahlt ist noch nichts."
        },
        {
          "text": "Schritt 2 · Arbeitgeberanteil",
          "satz": "Soziale Abgaben 634,50 € an Verbindlichkeiten SV 634,50 €",
          "soll": [
            {
              "konto": "soziale",
              "betrag": 634.5
            }
          ],
          "haben": [
            {
              "konto": "vsv",
              "betrag": 634.5
            }
          ],
          "echo": "Ein eigener Aufwand, weil dieser Betrag nirgends vom Gehalt abgezogen wurde. Genau deshalb braucht er einen separaten Buchungssatz."
        },
        {
          "text": "Schritt 3 · Auszahlungen",
          "satz": "Verbindlichkeiten Nettolohn 1.850,25 € + Verbindlichkeiten Lohnsteuer 515,25 € + Verbindlichkeiten SV 1.269,00 € an Bank 3.634,50 €",
          "soll": [
            {
              "konto": "vnetto",
              "betrag": 1850.25
            },
            {
              "konto": "vlst",
              "betrag": 515.25
            },
            {
              "konto": "vsv",
              "betrag": 1269.0
            }
          ],
          "haben": [
            {
              "konto": "bank",
              "betrag": 3634.5
            }
          ],
          "echo": "Jetzt fließt das Geld — an drei Empfänger. Vom Bankkonto gehen 3.634,50 € ab, obwohl der Mitarbeiter 1.850,25 € bekommt. Das ist der Gesamtaufwand aus dem Check oben."
        }
      ],
      "regel": "Erst Aufwand und Verbindlichkeiten buchen, dann zahlen. Alle Verbindlichkeitskonten stehen danach wieder auf null."
    },
    {
      "typ": "praxistipp",
      "text": "In Prüfungsaufgaben sind die Zahlen fast immer vereinfacht vorgegeben — du musst keine Beitragssätze auswendig können. Was du können musst, ist die Struktur: drei Buchungen, und der Arbeitgeberanteil steht immer separat."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "g3",
  "vorauswissen": [
    "Aufwand wird im Soll, Verbindlichkeiten werden im Haben gebucht.",
    "Der Arbeitgeber zahlt an mehrere Empfänger."
  ],
  "ablauf": [
    "Den vollen Bruttolohn als Aufwand buchen.",
    "Lohnsteuer, Arbeitnehmeranteile und Nettolohn als Verbindlichkeiten erfassen.",
    "Den Arbeitgeberanteil als zusätzlichen Aufwand und als weitere Sozialversicherungsverbindlichkeit buchen.",
    "Nettolohn, Lohnsteuer und Sozialversicherung über die Bank begleichen."
  ],
  "erklaerung": "Die Gehaltsbuchung trennt Entstehung und Zahlung. Zuerst wird der gesamte Bruttolohn als Aufwand erfasst, obwohl er auf drei Verbindlichkeiten verteilt wird. Danach kommt der Arbeitgeberanteil als eigener Aufwand hinzu. Erst im dritten Schritt fließt das Geld an Mitarbeiter, Finanzamt und Sozialversicherung.",
  "beispiele": [
    "Beim Gehalt von 3.000 € entstehen Verbindlichkeiten von 515,25 € Lohnsteuer, 634,50 € Arbeitnehmeranteil Sozialversicherung und 1.850,25 € Nettolohn.",
    "Der Arbeitgeberanteil von 634,50 € wird als soziale Abgaben an die Verbindlichkeit Sozialversicherung gebucht und nicht aus dem Netto herausgerechnet."
  ],
  "fallbeispiel": "Die drei Buchungsschritte der Grafik lauten: 1. Löhne und Gehälter 3.000 € an Lohnsteuer 515,25 €, Sozialversicherung 634,50 € und Nettolohn 1.850,25 €. 2. Soziale Abgaben 634,50 € an Verbindlichkeiten Sozialversicherung 634,50 €. 3. Die drei Verbindlichkeiten werden bezahlt; insgesamt gehen 3.634,50 € von der Bank ab. Danach sind die Verbindlichkeitskonten ausgeglichen.",
  "typische_fehler": "Nur der Nettolohn wird als Aufwand gebucht oder der Arbeitgeberanteil wird in den ersten Buchungssatz hineingerechnet. Beides zerstört die klare Trennung der Kosten und Verbindlichkeiten.",
  "verstaendnisfragen": [
    "Warum ist der Bruttolohn der Aufwand und nicht nur der Nettolohn? Weil der Betrieb den gesamten Arbeitsaufwand trägt; die Abzüge werden nur an andere Empfänger weitergeleitet.",
    "Warum braucht der Arbeitgeberanteil einen eigenen Buchungssatz? Weil er zusätzlich entsteht und nicht aus dem Bruttolohn des Mitarbeiters abgezogen wird."
  ],
  "pruefungsbezug": "Bei Buchungssätzen die Reihenfolge ‚erfassen, Arbeitgeberanteil ergänzen, zahlen‘ verwenden. Die Summe der Verbindlichkeiten muss jeweils dem Bruttolohn beziehungsweise den gesamten Arbeitgeberzahlungen entsprechen.",
  "merksatz": "Erst den Bruttolohn und Verbindlichkeiten buchen, dann Arbeitgeberanteil und erst danach die Zahlungen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k8 · Anlagevermögen & Abschreibungen

**Datei:** `k8-afa.kapitel.json` · SHA-256 `f59011860f3a4ff4f338b2a8a7aaec967ed62019ac63d325d2b936c3e056e144`

**Konkreter Kapitelauftrag:** Anschaffung und planmäßige Wertverteilung auseinanderhalten; Zeitpunkt, Nutzungsdauer und Restwertannahme sichtbar machen.

**Einordnung:** GWG, lineare AfA, Buchwert — und was beim Verkauf eines Anlageguts passiert.

### h1 · Warum überhaupt abschreiben?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Erklären, warum Anlagevermögen abgeschrieben wird und Umlaufvermögen nicht

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "h1",
  "titel": "Warum überhaupt abschreiben?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:anlagevermoegen|Anlagevermögen}} wird über Jahre genutzt und verliert dabei an Wert — durch Verschleiß, Alterung und technischen Fortschritt. Diese Wertminderung heißt {{begriff:afa|Abschreibung}}. Beim {{begriff:umlaufvermoegen|Umlaufvermögen}} entfällt sie, weil es sich innerhalb eines Jahres umschlägt."
    },
    {
      "typ": "absatz",
      "text": "Dahinter steht dieselbe Idee wie bei den Erfolgskonten in K4: ==Kosten gehören in das Jahr, in dem sie wirtschaftlich anfallen.== Eine Maschine für 60.000 €, die sechs Jahre läuft, belastet nicht ein Jahr mit 60.000 €, sondern sechs Jahre mit je 10.000 €."
    },
    {
      "typ": "absatz",
      "text": "Für kleinere Anschaffungen gibt es eine Vereinfachung: {{begriff:gwg|Geringwertige Wirtschaftsgüter}} bis ==800 Euro netto== dürfen im Jahr des Kaufs sofort vollständig abgeschrieben werden — unabhängig davon, wie lange sie tatsächlich halten. Bis 250 Euro geht das sogar ohne gesondertes Verzeichnis. Alternativ lassen sich Güter zwischen 250,01 und 1.000 Euro in einem Sammelposten bündeln und über fünf Jahre abschreiben."
    },
    {
      "typ": "merke",
      "text": "Abschreibung ist Aufwand ohne Auszahlung. Das Geld ist beim Kauf abgeflossen; die Abschreibung verteilt diesen Betrag nur noch buchhalterisch über die Jahre.",
      "karteikarte": "Warum ist eine Abschreibung Aufwand, obwohl kein Geld fließt?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "h1",
  "vorauswissen": [
    "Anlagevermögen dient dem Betrieb über längere Zeit.",
    "Aufwand soll dem Zeitraum zugeordnet werden, in dem die wirtschaftliche Nutzung stattfindet."
  ],
  "erklaerung": "Eine Maschine verliert durch Nutzung, Alterung und technischen Fortschritt an Wert. Die Abschreibung verteilt die Anschaffungskosten deshalb über die Nutzungsdauer. Das Geld fließt beim Kauf ab; die späteren Abschreibungen sind Aufwand, ohne dass erneut Geld ausgezahlt wird. Beim Umlaufvermögen greift diese mehrjährige Verteilung nicht in gleicher Weise, weil es kurzfristig umgesetzt wird.",
  "beispiele": [
    "Eine Maschine für 60.000 €, die sechs Jahre genutzt wird, belastet das Ergebnis nicht einmalig mit 60.000 €, sondern mit sechs Jahresbeträgen von 10.000 €.",
    "Ein geringwertiges Wirtschaftsgut bis 800 € netto darf nach der vorhandenen Regel im Anschaffungsjahr sofort vollständig abgeschrieben werden; bis 250 € ist kein gesondertes Verzeichnis nötig."
  ],
  "fallbeispiel": "Ordne eine Anschaffung von 60.000 € mit sechsjähriger Nutzung ein. Beim Kauf sinkt zunächst das Bankguthaben und das Anlagevermögen steigt. Danach wird die Nutzung über sechs Jahre verteilt: 60.000 € ÷ 6 = 10.000 € AfA pro Jahr. So wird der Aufwand den Nutzungsjahren zugeordnet, statt das Kaufjahr allein zu belasten.",
  "typische_fehler": "Abschreibung wird als erneute Auszahlung verstanden. Außerdem wird jedes kleinere Wirtschaftsgut automatisch sofort abgeschrieben, ohne die im Kapitel genannten Grenzen zu prüfen.",
  "verstaendnisfragen": [
    "Warum ist Abschreibung Aufwand ohne Auszahlung? Das Geld ist bereits beim Kauf abgeflossen; die Abschreibung verteilt den Wert nur noch buchhalterisch.",
    "Welche Frage steht vor jeder Abschreibungsrechnung? Wie lange wird das Anlagegut genutzt und welche Anschaffungskosten sind zu verteilen?"
  ],
  "pruefungsbezug": "In Fällen zuerst Anlage- oder Umlaufvermögen bestimmen, dann Anschaffungskosten, Nutzungsdauer und gegebenenfalls die GWG-Grenzen prüfen.",
  "merksatz": "Abschreibung verteilt Anschaffungskosten über die Nutzung; sie ist Aufwand, aber keine neue Auszahlung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### h2 · Lineare Abschreibung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die lineare Abschreibung berechnen und buchen, auch unterjährig

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "h2",
  "titel": "Lineare Abschreibung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die lineare Abschreibung verteilt die Anschaffungskosten gleichmäßig über die {{begriff:nutzungsdauer|Nutzungsdauer}}. Jedes Jahr derselbe Betrag, bis der {{begriff:buchwert|Buchwert}} bei null liegt. Die Formel ist der ganze Trick: **Jahres-AfA = Anschaffungskosten ÷ Nutzungsdauer**."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Jahr",
        "Jahres-AfA",
        "Kumuliert",
        "Buchwert"
      ],
      "zeilen": [
        {
          "zellen": [
            "Anschaffung",
            "—",
            "—",
            "2.400 €"
          ],
          "mono": [
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "1",
            "800 €",
            "800 €",
            "1.600 €"
          ],
          "mono": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "2",
            "800 €",
            "1.600 €",
            "800 €"
          ],
          "mono": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "zellen": [
            "3",
            "800 €",
            "2.400 €",
            "0 €"
          ],
          "mono": [
            0,
            1,
            2,
            3
          ],
          "detail": "**Und dann?** Das Gerät ist buchhalterisch wertlos, steht aber vielleicht noch jahrelang im Betrieb. Manche Betriebe führen es mit einem Erinnerungswert von 1 € weiter, damit es nicht aus der Anlagenbuchhaltung verschwindet."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Wird ein Gut mitten im Jahr angeschafft, wird im ersten Jahr nur anteilig abgeschrieben — pro angefangenem Monat ein Zwölftel. Ein Kauf am 1. Juli ergibt also 6/12 der Jahres-AfA. Das wird in Prüfungsaufgaben gern versteckt, indem einfach ein Datum genannt wird."
    },
    {
      "typ": "check",
      "frage": "Ein Laptop für 1.200 € netto, Nutzungsdauer 3 Jahre, angeschafft am 1. Juli. Wie hoch ist die Abschreibung im ersten Jahr?",
      "optionen": [
        {
          "text": "400 €",
          "richtig": false,
          "echo": "Das wäre die volle Jahresabschreibung. Sie gilt nur, wenn das Gut ab Januar im Betrieb ist — hier fehlt das halbe Jahr."
        },
        {
          "text": "200 €",
          "richtig": true,
          "echo": "Richtig. Jahres-AfA = 1.200 ÷ 3 = 400 €. Davon nur sechs Zwölftel für Juli bis Dezember: 400 × 6/12 = 200 €. In den Jahren 2 und 3 sind es je 400 €, im vierten Jahr die restlichen 200 €."
        },
        {
          "text": "1.200 €",
          "richtig": false,
          "echo": "Sofortabschreibung gilt nur für geringwertige Wirtschaftsgüter bis 800 Euro netto. Ein Laptop für 1.200 Euro liegt darüber und wird deshalb über die Nutzungsdauer verteilt."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "h2",
  "vorauswissen": [
    "Die lineare Abschreibung verteilt einen Betrag gleichmäßig.",
    "Bei unterjähriger Anschaffung wird die Jahres-AfA zeitanteilig gekürzt."
  ],
  "ablauf": [
    "Jahres-AfA mit Anschaffungskosten ÷ Nutzungsdauer berechnen.",
    "Bei unterjährigem Beginn die Monate der Nutzung im ersten Jahr bestimmen.",
    "Jahres-AfA mit Monaten ÷ 12 multiplizieren.",
    "Kumulierte Abschreibungen vom ursprünglichen Wert abziehen und den Buchwert prüfen."
  ],
  "erklaerung": "Bei der linearen Methode bleibt der Jahresbetrag gleich. Der Buchwert sinkt jedes Jahr um diesen Betrag, bis die Anschaffungskosten vollständig abgeschrieben sind. Beginnt die Nutzung im laufenden Jahr, wird im ersten Jahr nur der Anteil der begonnenen Monate angesetzt.",
  "beispiele": [
    "2.400 € Anschaffungskosten und drei Jahre Nutzungsdauer ergeben 2.400 € ÷ 3 = 800 € Jahres-AfA.",
    "Bei einem Laptop für 1.200 € und drei Jahren Nutzungsdauer beträgt die Jahres-AfA 400 €. Anschaffung am 1. Juli bedeutet im ersten Jahr 400 € × 6/12 = 200 €."
  ],
  "fallbeispiel": "Für den Laptop werden die Beträge vollständig verfolgt: Anschaffungskosten 1.200 €, Nutzungsdauer drei Jahre, Jahres-AfA 400 €. Im ersten Jahr ab Juli fallen 200 € an. In den Jahren 2 und 3 jeweils 400 €. Im letzten Jahr werden die restlichen 200 € abgeschrieben. Summe: 200 € + 400 € + 400 € + 200 € = 1.200 €; der Buchwert ist danach null.",
  "typische_fehler": "Die volle Jahres-AfA wird im Anschaffungsjahr angesetzt oder der Buchwert wird aus dem ursprünglichen Preis statt aus den kumulierten Abschreibungen berechnet.",
  "verstaendnisfragen": [
    "Wie berechnest du die lineare Jahres-AfA? Anschaffungskosten geteilt durch Nutzungsdauer.",
    "Warum entstehen im Laptop-Fall vier Kalenderjahre mit Abschreibungsbeträgen, obwohl die Nutzungsdauer drei Jahre beträgt? Weil das erste Jahr nur sechs Monate umfasst und der Restbetrag im vierten Kalenderjahr anfällt."
  ],
  "pruefungsbezug": "Datum nicht überlesen. Eine genannte Anschaffung im Juli ist ein Signal für die zeitanteilige Rechnung; anschließend muss die Summe aller AfA-Beträge die Anschaffungskosten ergeben.",
  "merksatz": "Lineare AfA = Anschaffungskosten ÷ Nutzungsdauer; unterjährig zählt der Monatsanteil."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### h3 · Wenn ein Anlagegut verkauft wird

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Anlagenabgang mit Buchgewinn oder Buchverlust behandeln

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "h3",
  "titel": "Wenn ein Anlagegut verkauft wird",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Beim Verkauf zählt nicht der ursprüngliche Preis, sondern der aktuelle {{begriff:buchwert|Buchwert}}. Liegt der Verkaufspreis darüber, entsteht ein **Buchgewinn** — ein sonstiger Ertrag. Liegt er darunter, ein **Buchverlust** als sonstiger Aufwand. ==Ausgebucht wird immer der Buchwert, nie die Anschaffungskosten.=="
    },
    {
      "typ": "grafik",
      "variante": "t-konto",
      "kopf": "Buchen, live",
      "titel": "Firmenwagen · AK 18.000 €, nach 4 Jahren",
      "lead": "Jährliche AfA 3.000 €, also Buchwert 6.000 €. Zwei Verkaufspreise, zwei Ergebnisse.",
      "konten": [
        {
          "id": "bank",
          "name": "Bank",
          "art": "aktiv",
          "ab": 12000
        },
        {
          "id": "fuhrpark",
          "name": "Fuhrpark",
          "art": "aktiv",
          "ab": 6000
        },
        {
          "id": "ertrag",
          "name": "Sonstige Erträge",
          "art": "ertrag",
          "ab": 0
        },
        {
          "id": "aufwand",
          "name": "Sonstige Aufwendungen",
          "art": "aufwand",
          "ab": 0
        },
        {
          "id": "afa",
          "name": "Abschreibungen",
          "art": "aufwand",
          "ab": 0
        }
      ],
      "vorfaelle": [
        {
          "text": "Jahresabschreibung buchen, 3.000 €",
          "satz": "Abschreibungen 3.000 € an Fuhrpark 3.000 €",
          "soll": [
            {
              "konto": "afa",
              "betrag": 3000
            }
          ],
          "haben": [
            {
              "konto": "fuhrpark",
              "betrag": 3000
            }
          ],
          "echo": "Der Aufwand entsteht im Soll, das Anlagekonto sinkt im Haben. Nach dieser Buchung ist der Buchwert um 3.000 € kleiner."
        },
        {
          "text": "Verkauf für 8.000 € — über Buchwert",
          "satz": "Bank 8.000 € an Fuhrpark 6.000 € + Sonstige Erträge 2.000 €",
          "soll": [
            {
              "konto": "bank",
              "betrag": 8000
            }
          ],
          "haben": [
            {
              "konto": "fuhrpark",
              "betrag": 6000
            },
            {
              "konto": "ertrag",
              "betrag": 2000
            }
          ],
          "echo": "Buchgewinn von 2.000 €. Er bedeutet nicht, dass ein gutes Geschäft gemacht wurde — sondern dass in den Vorjahren zu viel abgeschrieben wurde."
        },
        {
          "text": "Verkauf für 4.000 € — unter Buchwert",
          "satz": "Bank 4.000 € + Sonstige Aufwendungen 2.000 € an Fuhrpark 6.000 €",
          "soll": [
            {
              "konto": "bank",
              "betrag": 4000
            },
            {
              "konto": "aufwand",
              "betrag": 2000
            }
          ],
          "haben": [
            {
              "konto": "fuhrpark",
              "betrag": 6000
            }
          ],
          "echo": "Buchverlust von 2.000 €. Das Anlagekonto wird in beiden Fällen mit demselben Betrag ausgebucht — dem Buchwert. Nur die Gegenseite unterscheidet sich."
        }
      ],
      "regel": "Immer zuerst den Buchwert bestimmen: Anschaffungskosten minus kumulierte Abschreibungen. Erst danach mit dem Verkaufspreis vergleichen."
    },
    {
      "typ": "zuordnen",
      "lead": "Buchgewinn oder Buchverlust?",
      "kategorien": [
        "Buchgewinn",
        "Buchverlust"
      ],
      "aufgaben": [
        {
          "text": "Buchwert 6.000 €, Verkaufspreis 7.500 €.",
          "loesung": "Buchgewinn"
        },
        {
          "text": "Buchwert 12.000 €, Verkaufspreis 9.000 €.",
          "loesung": "Buchverlust"
        },
        {
          "text": "AK 20.000 €, 3 Jahre à 4.000 € abgeschrieben, Verkauf für 10.000 €.",
          "loesung": "Buchverlust"
        },
        {
          "text": "AK 9.000 €, vollständig abgeschrieben, Verkauf für 500 €.",
          "loesung": "Buchgewinn"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Rechne bei Verkaufsaufgaben immer in dieser Reihenfolge: kumulierte Abschreibung, dann Buchwert, dann Vergleich mit dem Verkaufspreis. Wer sofort auf den Preis schaut, verwechselt Buchwert und Anschaffungskosten — der häufigste Fehler in diesem Kapitel."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "h3",
  "vorauswissen": [
    "Der Buchwert ist Anschaffungskosten minus kumulierte Abschreibungen.",
    "Beim Verkauf muss das Anlagekonto vollständig ausgebucht werden."
  ],
  "erklaerung": "Beim Verkauf ist nicht mehr der ursprüngliche Kaufpreis entscheidend, sondern der Buchwert am Verkaufstag. Ist der Verkaufspreis höher, entsteht ein Buchgewinn als sonstiger Ertrag. Ist er niedriger, entsteht ein Buchverlust als sonstiger Aufwand. In beiden Fällen wird das Anlagegut mit seinem Buchwert aus dem Konto entfernt.",
  "beispiele": [
    "Beim Firmenwagen beträgt der Buchwert nach vier Jahren 6.000 €. Verkauf für 8.000 € erzeugt 2.000 € Buchgewinn.",
    "Derselbe Buchwert von 6.000 € führt bei einem Verkauf für 4.000 € zu 2.000 € Buchverlust."
  ],
  "fallbeispiel": "Der Firmenwagen hatte Anschaffungskosten von 18.000 € und wurde vier Jahre lang mit 3.000 € pro Jahr abgeschrieben. Kumulierte AfA: 4 × 3.000 € = 12.000 €. Buchwert: 18.000 € − 12.000 € = 6.000 €. Bei einem Verkauf für 8.000 € lautet der Buchungssatz Bank 8.000 € an Fuhrpark 6.000 € + sonstige Erträge 2.000 €. Bei 4.000 € Verkaufspreis lautet er Bank 4.000 € + sonstige Aufwendungen 2.000 € an Fuhrpark 6.000 €.",
  "typische_fehler": "Der Verkaufspreis wird mit den Anschaffungskosten verglichen. Dadurch wird der Buchgewinn oder -verlust falsch berechnet. Auch wird das Anlagekonto nur um den Verkaufspreis statt um den Buchwert reduziert.",
  "verstaendnisfragen": [
    "Welche drei Größen brauchst du vor dem Buchungssatz? Anschaffungskosten, kumulierte Abschreibungen beziehungsweise Buchwert und Verkaufspreis.",
    "Wann entsteht ein Buchgewinn? Wenn der Verkaufspreis über dem Buchwert liegt."
  ],
  "pruefungsbezug": "Immer in der Reihenfolge rechnen: kumulierte AfA, Buchwert, Vergleich mit Verkaufspreis, Buchungssatz. Diese Reihenfolge verhindert die häufigste Verwechslung.",
  "merksatz": "Ausgebucht wird der Buchwert; Verkauf über Buchwert ist Gewinn, Verkauf unter Buchwert ist Verlust."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k9 · Jahresabschluss

**Datei:** `k9-jahresabschluss.kapitel.json` · SHA-256 `987d8a8a270c512092aa97919061282a3f6b653fee15fca459d22039947824ad`

**Konkreter Kapitelauftrag:** Bestandsaufnahme, Korrektur, Abschluss und Kennzahlen in Reihenfolge verbinden; Abschlusszahl anhand Beleg und Folge erklären.

**Einordnung:** Abschlussschritte, Rückstellungen und Rechnungsabgrenzung — das Jahr sauber zumachen.

### i1 · Die Reihenfolge des Abschlusses

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Abschlussschritte in der richtigen Reihenfolge durchführen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "i1",
  "titel": "Die Reihenfolge des Abschlusses",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "In K4 ging es um die Abschlusskette der Konten. Der vollständige Jahresabschluss hat einen Schritt davor: die Inventur aus K1. Erst wenn feststeht, was tatsächlich vorhanden ist, kann korrigiert und abgeschlossen werden."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Fünf Schritte, feste Folge",
      "titel": "Der Jahresabschluss",
      "lead": "Jeder Schritt setzt den vorherigen voraus. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Inventur",
          "satz": "keine Buchung",
          "text": "Körperliche und buchmäßige Bestandsaufnahme. Erst danach ist bekannt, was wirklich da ist."
        },
        {
          "nr": 2,
          "titel": "Korrekturbuchungen",
          "satz": "AfA · Rückstellungen · RAP",
          "text": "Abschreibungen aus K8, Rückstellungen und Rechnungsabgrenzung. Alles, was das Ergebnis noch verändert, passiert jetzt."
        },
        {
          "nr": 3,
          "titel": "Erfolgskonten über GuV",
          "satz": "GuV an Aufwand · Ertrag an GuV",
          "text": "Wie in K4: Aufwendungen ins Soll der GuV, Erträge ins Haben."
        },
        {
          "nr": 4,
          "titel": "Ergebnis ins Eigenkapital",
          "satz": "GuV an Eigenkapital",
          "text": "Der Jahreserfolg wandert ins Eigenkapital. Erst jetzt steht dessen endgültiger Stand fest."
        },
        {
          "nr": 5,
          "titel": "Bestandskonten über SBK",
          "satz": "SBK an Aktivkonto · Passivkonto an SBK",
          "text": "Zum Schluss alle Bestandskonten ins Schlussbilanzkonto. Das Ergebnis ist die Schlussbilanz."
        }
      ],
      "regel": "Korrekturbuchungen immer vor dem Abschluss der Erfolgskonten. Wer erst abschließt und dann korrigiert, muss von vorn anfangen."
    },
    {
      "typ": "achtung",
      "text": "In der Prüfung wird häufig nicht nach dem Buchungssatz gefragt, sondern nach der Reihenfolge: „Welcher Schritt kommt zuerst?“ Die Antwort ist fast immer die Inventur — und der zweithäufigste Fehler ist, die Korrekturbuchungen zu vergessen."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "i1",
  "vorauswissen": [
    "Die Inventur aus K1 stellt die tatsächlich vorhandenen Bestände fest.",
    "Erfolgskonten und Bestandskonten werden in unterschiedlichen Schritten abgeschlossen."
  ],
  "ablauf": [
    "Inventur durchführen und tatsächliche Bestände feststellen.",
    "Korrekturbuchungen wie AfA, Rückstellungen und Rechnungsabgrenzung vornehmen.",
    "Erfolgskonten über die GuV abschließen.",
    "Jahresergebnis in das Eigenkapital übertragen.",
    "Bestandskonten über das SBK abschließen."
  ],
  "erklaerung": "Die Reihenfolge ist eine fachliche Abhängigkeit und keine bloße Merkhilfe. Ohne Inventur fehlen die tatsächlichen Werte. Ohne Korrekturbuchungen wären Aufwand, Ertrag und Bilanzbestände nicht periodengerecht. Erst wenn das Ergebnis im Eigenkapital enthalten ist, kann die Schlussbilanz vollständig aufgestellt werden.",
  "beispiele": [
    "Die Inventur steht in der Grafik an erster Stelle, weil erst danach bekannt ist, was tatsächlich vorhanden ist.",
    "Abschreibungen, Rückstellungen und Rechnungsabgrenzung werden vor dem Abschluss der Erfolgskonten vorgenommen."
  ],
  "fallbeispiel": "Ordne die fünf vorhandenen Schritte: 1. Inventur, 2. Korrekturbuchungen für AfA, Rückstellungen und RAP, 3. Erfolgskonten über die GuV, 4. Ergebnis ins Eigenkapital, 5. Bestandskonten über SBK. Würde die AfA erst nach dem GuV-Abschluss gebucht, müsste der Jahreserfolg erneut korrigiert werden.",
  "typische_fehler": "Die Bestandskonten werden zu früh abgeschlossen oder die Korrekturbuchungen vergessen. Häufig wird außerdem die Inventur mit dem fertigen Inventar verwechselt.",
  "verstaendnisfragen": [
    "Warum kommt die Inventur vor den Buchungen? Sie liefert die tatsächliche Grundlage für die Korrektur der Buchwerte.",
    "Warum wird das Eigenkapital vor dem SBK aktualisiert? Weil der Jahreserfolg erst dort enthalten sein muss, bevor der endgültige Bestand abgeschlossen wird."
  ],
  "pruefungsbezug": "Bei Reihenfolgeaufgaben die fünf Stationen auswendig als Kette notieren. Das Schlüsselwort für den Anfang ist ‚Inventur‘; das Schlüsselwort vor dem SBK ist ‚Jahresergebnis ins Eigenkapital‘.",
  "merksatz": "Inventur, Korrektur, GuV, Eigenkapital, SBK — diese Reihenfolge trägt den Jahresabschluss."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### i2 · Rückstellungen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** buchfuehrung (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Rückstellungen bilden und auflösen

**Aufbauauftrag:** Beleg → wirtschaftlicher Vorgang → Kontotyp → Veränderung → Soll/Haben → vollständiger Satz → Betrags- und Sachkontrolle. Steuerannahmen ausdrücklich machen.

**Passender Gegenfall:** Gleicher Zahlungsweg, aber anderer Vorgang; erklären, weshalb ein ausgeglichener Satz dennoch sachlich falsch sein kann.

**Darstellung:** Kontenanalyse und vorhandenes T-Konto; Kontonummern aus dem tatsächlichen MAKEL-Kontenplan.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `tabelle-2`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "i2",
  "titel": "Rückstellungen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine {{begriff:rueckstellung|Rückstellung}} erfasst eine Verpflichtung, die wirtschaftlich schon zum laufenden Jahr gehört, deren Höhe oder Zeitpunkt aber noch offen ist. Das Vorsichtsprinzip aus K1 verlangt genau das: ==Drohende Belastungen werden gebucht, sobald sie absehbar sind== — nicht erst, wenn sie eintreten."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Anlass",
        "Was ungewiss ist"
      ],
      "zeilen": [
        {
          "zellen": [
            "Urlaubsrückstellung",
            "offene Urlaubstage zum 31.12.",
            "Zeitpunkt und genaue Kosten"
          ]
        },
        {
          "zellen": [
            "Steuerrückstellung",
            "erwartete Nachzahlung",
            "die Höhe"
          ]
        },
        {
          "zellen": [
            "Prozesskostenrückstellung",
            "laufender Rechtsstreit",
            "Ausgang und Höhe"
          ]
        },
        {
          "zellen": [
            "Gewährleistungsrückstellung",
            "erfahrungsgemäße Garantiefälle",
            "ob und in welcher Höhe"
          ],
          "detail": "**Wie schätzt man das?** Über Erfahrungswerte: Wenn erfahrungsgemäß 2 % des Jahresumsatzes als Garantiefall zurückkommen, wird dieser Anteil zurückgestellt. Die Schätzung muss nachvollziehbar sein — willkürliche Beträge erkennt jede Betriebsprüfung."
        }
      ]
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorgang",
        "Buchungssatz"
      ],
      "zeilen": [
        {
          "zellen": [
            "Rückstellung bilden (5.000 €)",
            "Rückstellungsaufwand 5.000 € an Rückstellungen 5.000 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Auflösung, tatsächlich 4.800 €",
            "Rückstellungen 5.000 € an Bank 4.800 € + Sonstige Erträge 200 €"
          ],
          "mono": [
            1
          ]
        },
        {
          "zellen": [
            "Auflösung, tatsächlich 5.300 €",
            "Rückstellungen 5.000 € + Sonstiger Aufwand 300 € an Bank 5.300 €"
          ],
          "mono": [
            1
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Rückstellung und Verbindlichkeit unterscheiden sich nur in einem Punkt: der Gewissheit. Steht der Betrag fest und ist die Fälligkeit bekannt, ist es eine {{begriff:verbindlichkeit|Verbindlichkeit}}. Sonst eine Rückstellung.",
      "karteikarte": "Woran erkennst du, ob ein Sachverhalt eine Rückstellung oder eine Verbindlichkeit ist?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "i2",
  "vorauswissen": [
    "Eine Rückstellung betrifft eine bereits entstandene, aber noch ungewisse Verpflichtung.",
    "Rückstellungen gehören in die Periode, in der die wirtschaftliche Ursache liegt."
  ],
  "erklaerung": "Eine Rückstellung bildet eine absehbare Belastung ab, obwohl Betrag oder Zeitpunkt noch nicht sicher feststehen. Dadurch wird der Aufwand dem richtigen Geschäftsjahr zugeordnet. Bei der späteren Auflösung wird die Rückstellung mit der tatsächlichen Zahlung verglichen: Ist die Zahlung niedriger, entsteht ein Ertrag; ist sie höher, entsteht zusätzlicher Aufwand.",
  "beispiele": [
    "Offene Urlaubstage führen zu einer Urlaubsrückstellung, weil Anspruch und wirtschaftliche Ursache bereits bestehen.",
    "Bei einer Rückstellung von 5.000 € und tatsächlicher Zahlung von 4.800 € werden 200 € als sonstiger Ertrag aufgelöst."
  ],
  "fallbeispiel": "Bilde eine Rückstellung von 5.000 €: Rückstellungsaufwand 5.000 € an Rückstellungen 5.000 €. Wird später 4.800 € gezahlt, lautet die Auflösung Rückstellungen 5.000 € an Bank 4.800 € + sonstige Erträge 200 €. Wird dagegen 5.300 € gezahlt, werden Rückstellungen 5.000 € und sonstiger Aufwand 300 € an Bank 5.300 € gebucht. So wird die Differenz nicht unterschlagen.",
  "typische_fehler": "Eine unsichere Verpflichtung wird erst bei Zahlung erfasst oder eine Rückstellung wird wie eine sichere Verbindlichkeit behandelt. Auch die Differenz zwischen Rückstellungsbetrag und tatsächlicher Zahlung wird oft vergessen.",
  "verstaendnisfragen": [
    "Was muss bei einer Rückstellung bereits feststehen? Die wirtschaftliche Verpflichtung muss entstanden oder absehbar sein; Höhe oder Zeitpunkt dürfen noch ungewiss sein.",
    "Was passiert bei einer niedrigeren tatsächlichen Zahlung? Der nicht benötigte Teil wird als sonstiger Ertrag aufgelöst."
  ],
  "pruefungsbezug": "In Fällen zuerst Gewissheit und wirtschaftliche Zugehörigkeit prüfen, anschließend Bildung und Auflösung getrennt buchen. Die tatsächliche Zahlung niemals automatisch mit dem Rückstellungsbetrag gleichsetzen.",
  "merksatz": "Rückstellung bildet die ungewisse Belastung heute ab; bei Zahlung wird mit der tatsächlichen Höhe abgerechnet."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### i3 · Rechnungsabgrenzung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aktive und passive Rechnungsabgrenzungsposten unterscheiden und buchen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "i3",
  "titel": "Rechnungsabgrenzung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zahlungen und Leistungen fallen nicht immer ins gleiche Jahr. Die {{begriff:periodenabgrenzung|periodengerechte Zuordnung}} verlangt, dass Aufwand und Ertrag dorthin gehören, wo sie wirtschaftlich hingehören. Dafür gibt es zwei Posten — und man verwechselt sie nur, solange man sie sich nicht an einem Beispiel merkt."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Posten",
        "Situation",
        "Beispiel",
        "Buchung am 31.12."
      ],
      "zeilen": [
        {
          "zellen": [
            "ARAP",
            "Ausgabe jetzt, Aufwand nächstes Jahr",
            "Jahresversicherung im Dezember gezahlt",
            "ARAP an Versicherungsaufwand"
          ],
          "mono": [
            3
          ],
          "detail": "**Warum aktiv?** Der Betrieb hat bezahlt und bekommt die Leistung erst noch — er hat also eine Art Anspruch. Ansprüche stehen links, auf der Aktivseite."
        },
        {
          "zellen": [
            "PRAP",
            "Einnahme jetzt, Ertrag nächstes Jahr",
            "Januarmiete im Dezember erhalten",
            "Mietertrag an PRAP"
          ],
          "mono": [
            3
          ],
          "detail": "**Warum passiv?** Der Betrieb hat Geld bekommen und muss die Leistung erst noch erbringen — das ist eine Verpflichtung. Verpflichtungen stehen rechts, auf der Passivseite."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb zahlt am 1. Dezember die Kfz-Versicherung für das komplette Folgejahr: 2.400 €. Was ist am 31.12. zu buchen?",
      "optionen": [
        {
          "text": "Nichts, die Zahlung ist erfolgt",
          "richtig": false,
          "echo": "Damit läge der komplette Aufwand im falschen Jahr. Das laufende Jahr würde um 2.400 € zu schlecht dargestellt und das Folgejahr um denselben Betrag zu gut."
        },
        {
          "text": "ARAP 2.400 € an Versicherungsaufwand 2.400 €",
          "richtig": true,
          "echo": "Richtig. Die Leistung betrifft ausschließlich das Folgejahr, also wird der volle Betrag abgegrenzt. Im nächsten Jahr wird der ARAP monatlich aufgelöst: Versicherungsaufwand 200 € an ARAP 200 €."
        },
        {
          "text": "PRAP 2.400 € an Versicherungsaufwand 2.400 €",
          "richtig": false,
          "echo": "Falsche Seite. Ein PRAP entsteht bei einer Einnahme, nicht bei einer Ausgabe. Hier hat der Betrieb gezahlt — daraus wird ein aktiver Posten."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "ARAP oder PRAP?",
      "kategorien": [
        "ARAP",
        "PRAP"
      ],
      "aufgaben": [
        {
          "text": "Die Miete für Januar geht schon im Dezember auf dem Konto ein.",
          "loesung": "PRAP"
        },
        {
          "text": "Die Zeitschriftenabos fürs nächste Jahr werden im November bezahlt.",
          "loesung": "ARAP"
        },
        {
          "text": "Ein Kunde zahlt im Dezember eine Wartungspauschale für das erste Quartal.",
          "loesung": "PRAP"
        },
        {
          "text": "Die Kfz-Steuer für das Folgejahr wird im Dezember abgebucht.",
          "loesung": "ARAP"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Zwei Fragen genügen: Ist Geld raus- oder reingegangen? Und gehört die Leistung ins nächste Jahr? Geld raus plus Leistung später ergibt ARAP. Geld rein plus Leistung später ergibt PRAP. Alles andere ist keine Abgrenzung."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "i3",
  "vorauswissen": [
    "Aufwand und Ertrag gehören in das Jahr ihrer wirtschaftlichen Verursachung.",
    "ARAP und PRAP verschieben einen bereits geflossenen Geldbetrag in die richtige Periode."
  ],
  "erklaerung": "Rechnungsabgrenzung wird notwendig, wenn Zahlung und Leistung in unterschiedliche Geschäftsjahre fallen. Beim ARAP ist Geld bereits ausgegeben, die Leistung gehört aber ins nächste Jahr. Beim PRAP ist Geld bereits eingegangen, die Leistung und damit der Ertrag gehören aber ins nächste Jahr. Die Seiten lassen sich über die Richtung des Geldflusses merken.",
  "beispiele": [
    "Eine Jahresversicherung wird im Dezember bezahlt, betrifft aber das Folgejahr: ARAP an Versicherungsaufwand.",
    "Eine Januarmiete geht im Dezember ein: Mietertrag an PRAP."
  ],
  "fallbeispiel": "Der Betrieb zahlt am 1. Dezember 2.400 € für die Kfz-Versicherung des kompletten Folgejahres. Am 31.12. gehört der Betrag nicht zum laufenden Aufwand. Deshalb wird ARAP 2.400 € an Versicherungsaufwand 2.400 € gebucht. Geld ist herausgegangen und die Leistung kommt erst später: aktiv und abzugrenzen. Bei einer Einnahme für eine spätere Leistung wäre die Logik spiegelbildlich PRAP.",
  "typische_fehler": "ARAP und PRAP werden allein nach dem Wort ‚Abgrenzung‘ ausgewählt, ohne den Geldfluss zu prüfen. Außerdem wird eine Zahlung als Aufwand behandelt, obwohl die Leistung erst im Folgejahr erbracht wird.",
  "verstaendnisfragen": [
    "Wie merkst du dir ARAP? Geld raus, Leistung später: aktiver Rechnungsabgrenzungsposten.",
    "Wie merkst du dir PRAP? Geld rein, Leistung später: passiver Rechnungsabgrenzungsposten."
  ],
  "pruefungsbezug": "Zuerst zwei Fragen beantworten: Ist Geld heraus- oder hineingeflossen? Gehört die Leistung ins nächste Jahr? Nur bei ‚raus + später‘ entsteht ARAP, bei ‚rein + später‘ PRAP.",
  "merksatz": "Geld raus und Leistung später = ARAP; Geld rein und Leistung später = PRAP."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
