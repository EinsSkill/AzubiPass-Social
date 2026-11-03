# lf1 · Die eigene Rolle im Betrieb mitgestalten und den Betrieb präsentieren

Quelle: `quellen/lf1.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 7 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Das System der dualen Ausbildung

**Datei:** `lf1-k1-duale-ausbildung.kapitel.json` · SHA-256 `9d36d6d8130e3e38ae7a65d60dce69515ce9ef74e1043e3013193c49ff722916`

**Konkreter Kapitelauftrag:** Betrieb und Schule bearbeiten dieselbe Ausbildungssituation mit verschiedenen Aufgaben; Zuständigkeit und eigene Mitwirkung erklären.

**Einordnung:** Zwei Lernorte, vier Regelwerke, eine Prüfung in zwei Teilen.

### a1 · Zwei Lernorte, ein Ziel

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Beteiligten der dualen Ausbildung und ihre Aufgaben benennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Zwei Lernorte, ein Ziel",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:duale-ausbildung|duale Ausbildung}} heißt so, weil du an zwei Orten gleichzeitig lernst: im Betrieb und in der Berufsschule. Das ist kein Zufall und keine Verwaltungslaune — beide vermitteln unterschiedliche Teile derselben Qualifikation. ==Der Betrieb bringt dir bei, wie es gemacht wird. Die Schule erklärt, warum es so gemacht wird.=="
    },
    {
      "typ": "absatz",
      "text": "Dazu kommt eine dritte Instanz, die viele Azubis erst kurz vor der Prüfung wahrnehmen: die {{begriff:zustaendige-stelle|zuständige Stelle}}. Für kaufmännische Berufe ist das die Industrie- und Handelskammer."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Beteiligter",
        "Aufgabe",
        "Rechtsgrundlage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ausbildungsbetrieb",
            "vermittelt die praktischen Inhalte, zahlt die Vergütung",
            "Berufsbildungsgesetz"
          ],
          "detail": "**Wichtige Unterscheidung:** Der {{begriff:ausbildender|Ausbildende}} ist dein Vertragspartner — meist der Betrieb als Ganzes. Der {{begriff:ausbilder|Ausbilder}} ist die Person, die dich tatsächlich anleitet. In der Prüfung werden die beiden Begriffe gern vertauscht."
        },
        {
          "zellen": [
            "Berufsschule",
            "vermittelt die theoretischen Inhalte in Lernfeldern",
            "Schulgesetze der Länder"
          ]
        },
        {
          "zellen": [
            "Zuständige Stelle (IHK)",
            "überwacht, registriert, prüft",
            "Berufsbildungsgesetz"
          ],
          "detail": "**Was die IHK konkret tut:** Sie trägt deinen Vertrag ins Verzeichnis der Ausbildungsverhältnisse ein, überwacht die Eignung von Betrieb und Ausbildern, beruft die Prüfungsausschüsse und stellt am Ende dein Prüfungszeugnis aus."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Der Ausbildende ist der Vertragspartner, der Ausbilder die ausbildende Person. Und die IHK ist nicht dein Arbeitgeber — sie ist die Aufsicht über das Ganze.",
      "karteikarte": "Wer sind die drei Beteiligten der dualen Ausbildung und was macht jeder?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "vorauswissen": [
    "Eine Ausbildung verbindet praktisches Handeln mit fachlichem Lernen.",
    "Der Betrieb und die Berufsschule haben unterschiedliche Aufgaben."
  ],
  "erklaerung": "Duale Ausbildung bedeutet nicht, dass Betrieb und Berufsschule denselben Unterricht zweimal anbieten. Der Betrieb zeigt die beruflichen Abläufe und lässt dich unter Anleitung handeln. Die Berufsschule ordnet diese Erfahrungen fachlich ein und vermittelt die theoretischen Grundlagen. Die zuständige Stelle überwacht das Ausbildungsverhältnis und organisiert die Prüfung.",
  "beispiele": [
    "Im Betrieb lernst du, einen Auftrag in der Bürosoftware zu bearbeiten; in der Berufsschule ordnest du den Vorgang in einen Geschäftsprozess ein.",
    "Der Betrieb ist der Ausbildende und damit Vertragspartner. Die konkrete Anleitung kann ein bestellter Ausbilder übernehmen; beide Begriffe bezeichnen also nicht automatisch dieselbe Person."
  ],
  "fallbeispiel": "Ein Azubi fragt, ob die IHK sein Arbeitgeber sei, weil sie den Vertrag einträgt und die Prüfung organisiert. Vertragspartner ist der Ausbildungsbetrieb als Ausbildender. Die Berufsschule vermittelt die schulischen Inhalte. Die IHK ist die zuständige Stelle: Sie überwacht, registriert und prüft, ist aber nicht Arbeitgeber.",
  "typische_fehler": "Ausbildender und Ausbilder werden vertauscht. Außerdem wird die IHK als dritte Lernstätte oder als Arbeitgeber verstanden. Sie ist die zuständige Stelle für Überwachung und Prüfung; die beiden Lernorte bleiben Betrieb und Berufsschule.",
  "verstaendnisfragen": [
    "Warum braucht die Ausbildung zwei Lernorte? Weil praktische Handlungskompetenz und theoretische Einordnung unterschiedliche Lernaufgaben sind.",
    "Wer ist Vertragspartner des Azubis? Der Ausbildende, in der Regel der Betrieb oder das Unternehmen, nicht die einzelne anleitende Person und nicht die IHK."
  ],
  "pruefungsbezug": "Bei einer Zuordnungsaufgabe zuerst die drei Rollen markieren: Betrieb = Praxis und Vertrag, Berufsschule = Theorie und Lernfelder, zuständige Stelle = Überwachung und Prüfung.",
  "merksatz": "Der Betrieb zeigt, wie es geht; die Schule erklärt, warum; die zuständige Stelle überwacht und prüft."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Vier Pläne, die zusammengehören

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ausbildungsordnung, Ausbildungsrahmenplan, Rahmenlehrplan und betrieblichen Ausbildungsplan unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `vertiefung-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Vier Pläne, die zusammengehören",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Was du lernen musst, steht nicht in einem Dokument, sondern in vier ineinandergreifenden. Wer sie einmal auseinanderhält, hat eine der klassischen Prüfungsfragen sicher."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Dokument",
        "Wer erlässt es",
        "Was steht drin"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ausbildungsordnung",
            "Bund (Rechtsverordnung)",
            "Berufsbezeichnung, Dauer, Berufsbild, Prüfungsanforderungen"
          ]
        },
        {
          "zellen": [
            "Ausbildungsrahmenplan",
            "Bund, Anlage zur Ausbildungsordnung",
            "Was der Betrieb wann vermitteln muss"
          ]
        },
        {
          "zellen": [
            "Rahmenlehrplan",
            "Kultusministerkonferenz",
            "Die Lernfelder der Berufsschule mit Zeitrichtwerten"
          ]
        },
        {
          "zellen": [
            "Betrieblicher Ausbildungsplan",
            "der einzelne Betrieb",
            "Welche Abteilung wann welchen Inhalt übernimmt"
          ],
          "detail": "**Der einzige Plan, der auf dich persönlich zugeschnitten ist.** Er ist Anlage deines Ausbildungsvertrags — und wenn du das Gefühl hast, dass du Inhalte gar nicht siehst, ist er das Dokument, mit dem du das ansprichst."
        }
      ]
    },
    {
      "typ": "vertiefung",
      "titel": "Warum Bund und Länder sich das teilen",
      "absaetze": [
        "Weil das Grundgesetz die Zuständigkeiten trennt: Die berufliche Bildung im Betrieb ist Sache des Bundes, das Schulwesen Sache der Länder. Eine einzige Behörde für beides gibt es also gar nicht.",
        "Damit trotzdem nichts auseinanderläuft, werden Ausbildungsordnung und Rahmenlehrplan in einem gemeinsamen Verfahren abgestimmt. Für deinen Beruf ist beides zuletzt 2025 neu gefasst worden — die Ausbildungsordnung vom 25. Februar 2025, der Rahmenlehrplan in der Fassung vom 20. März 2025."
      ]
    },
    {
      "typ": "merke",
      "text": "Merkformel: **Ordnung** und **Rahmenplan** kommen vom Bund für den Betrieb, der **Lehrplan** von den Ländern für die Schule, und der **betriebliche Plan** ist deine persönliche Fassung davon.",
      "karteikarte": "Welche vier Pläne steuern deine Ausbildung — und wer erlässt jeweils welchen?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a2",
  "vorauswissen": [
    "Ausbildungsinhalte müssen verbindlich geplant werden.",
    "Betriebliche Ausbildung und Berufsschulunterricht werden durch unterschiedliche Stellen geregelt."
  ],
  "erklaerung": "Die vier Pläne liegen auf unterschiedlichen Ebenen. Die Ausbildungsordnung beschreibt den anerkannten Beruf. Der Ausbildungsrahmenplan konkretisiert, was der Betrieb vermitteln muss. Der Rahmenlehrplan ordnet die schulischen Lernfelder. Der betriebliche Ausbildungsplan übersetzt den Rahmenplan schließlich in die Abteilungen und Zeitabläufe des einzelnen Betriebs.",
  "beispiele": [
    "Die Ausbildungsordnung nennt Berufsbezeichnung, Dauer und Prüfungsanforderungen; sie ist deshalb die übergeordnete Rechtsgrundlage.",
    "Wenn der Ausbildungsrahmenplan einen Inhalt vorsieht, legt der betriebliche Ausbildungsplan fest, welche Abteilung ihn wann übernimmt. Der Rahmenlehrplan bleibt dagegen der Plan für die Berufsschule."
  ],
  "fallbeispiel": "Ein Azubi findet im betrieblichen Ausbildungsplan keinen Einsatz in einer Abteilung, obwohl der Ausbildungsrahmenplan den entsprechenden Inhalt vorsieht. Der Plan für den einzelnen Betrieb ist daraufhin zu prüfen und mit dem Ausbilder zu besprechen. Er darf den verbindlichen Rahmen nicht einfach auslassen, sondern muss ihn auf die betrieblichen Stationen übertragen.",
  "typische_fehler": "Ausbildungsrahmenplan und Rahmenlehrplan werden wegen des ähnlichen Namens gleichgesetzt. Die sichere Gegenprobe lautet: Rahmenlehrplan = Berufsschule und KMK; Ausbildungsrahmenplan = Betrieb und Anlage zur Ausbildungsordnung; betrieblicher Ausbildungsplan = konkrete Abteilungen.",
  "verstaendnisfragen": [
    "Welcher Plan ist auf den einzelnen Betrieb zugeschnitten? Der betriebliche Ausbildungsplan.",
    "Warum gibt es einen Rahmenlehrplan und einen Ausbildungsrahmenplan? Weil Schule und Betrieb ihre Inhalte jeweils in eigenen Zuständigkeiten planen und aufeinander abstimmen."
  ],
  "pruefungsbezug": "Ordne in Tabellenaufgaben immer zwei Merkmale zu: Wer erlässt das Dokument und für welchen Lernort gilt es. So lässt sich der betriebliche Ausbildungsplan sicher vom Rahmenlehrplan unterscheiden.",
  "merksatz": "Ordnung und Ausbildungsrahmenplan steuern den Betrieb, der Rahmenlehrplan die Schule, der betriebliche Plan deinen konkreten Ablauf."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Der Weg bis zum Abschluss

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den Ablauf der Ausbildung bis zur gestreckten Abschlussprüfung erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Der Weg bis zum Abschluss",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Deine Ausbildung ist ein Ablauf mit festen Stationen. Besonders wichtig ist die {{begriff:gestreckte-pruefung|gestreckte Abschlussprüfung}}: ==Es gibt keine Zwischenprüfung mehr, die man einfach mitnimmt.== Teil 1 zählt bereits zur Endnote und kann nicht wiederholt werden."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Dein Ausbildungsverlauf",
      "titel": "Von der Unterschrift bis zum Zeugnis",
      "lead": "Fünf Stationen, jede mit eigenen Rechtsfolgen. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Vertragsschluss",
          "satz": "vor Beginn · schriftlich · Eintrag bei der IHK",
          "text": "Der Vertrag muss schriftlich niedergelegt und ins Verzeichnis der Ausbildungsverhältnisse eingetragen werden. Ohne Eintragung keine Prüfungszulassung."
        },
        {
          "nr": 2,
          "titel": "Probezeit",
          "satz": "1 bis 4 Monate",
          "text": "Beide Seiten können jederzeit fristlos und ohne Begründung kündigen. Danach ist eine Kündigung durch den Betrieb nur noch aus wichtigem Grund möglich."
        },
        {
          "nr": 3,
          "titel": "Teil 1 der Abschlussprüfung",
          "satz": "Mitte des 2. Ausbildungsjahres",
          "text": "Informationstechnisches Büromanagement. Das Ergebnis fließt fest in die Endnote ein und wird nicht wiederholt — auch dann nicht, wenn Teil 2 wiederholt werden muss."
        },
        {
          "nr": 4,
          "titel": "Teil 2 der Abschlussprüfung",
          "satz": "Ende des 3. Ausbildungsjahres",
          "text": "Schriftliche Prüfungsbereiche plus das Fachgespräch zu den beiden gewählten Wahlqualifikationen."
        },
        {
          "nr": 5,
          "titel": "Ende des Ausbildungsverhältnisses",
          "satz": "Ablauf der Zeit — oder früher",
          "text": "Mit Ablauf der vereinbarten Ausbildungszeit. Bestehst du die Prüfung vorher, endet die Ausbildung bereits mit der Bekanntgabe des Ergebnisses durch den Prüfungsausschuss."
        }
      ],
      "regel": "Merke dir Station 3: Teil 1 ist keine Übung. Wer ihn verpatzt, schleppt das bis zum Schluss mit."
    },
    {
      "typ": "check",
      "frage": "Du bestehst die Abschlussprüfung vier Wochen vor dem im Vertrag genannten Enddatum. Wann endet dein Ausbildungsverhältnis?",
      "optionen": [
        {
          "text": "Am vereinbarten Enddatum",
          "richtig": false,
          "echo": "Das gilt nur, wenn du die Prüfung nicht vorher bestehst. Nach § 21 BBiG endet die Ausbildung mit dem Bestehen — der Vertrag läuft nicht künstlich weiter."
        },
        {
          "text": "Mit Bekanntgabe des Prüfungsergebnisses",
          "richtig": true,
          "echo": "Richtig. Nach § 21 BBiG endet das Ausbildungsverhältnis mit der Bekanntgabe des Ergebnisses durch den Prüfungsausschuss. Ab diesem Tag bist du kein Azubi mehr — was auch bedeutet, dass die Ausbildungsvergütung endet."
        },
        {
          "text": "Mit dem Tag der schriftlichen Prüfung",
          "richtig": false,
          "echo": "Zu früh. Solange das Ergebnis nicht feststeht und bekannt gegeben ist, läuft die Ausbildung weiter — schließlich könnte die Prüfung auch nicht bestanden sein."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Nach bestandener Prüfung endet auch dein Anspruch auf Ausbildungsvergütung. Wenn du übernommen wirst, sollte der Arbeitsvertrag also nahtlos anschließen — sprich das rechtzeitig an, nicht erst am Tag der Bekanntgabe."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a3",
  "vorauswissen": [
    "Das Ausbildungsverhältnis beginnt mit Vertrag und Probezeit.",
    "Die Abschlussprüfung besteht aus Teil 1 und Teil 2."
  ],
  "erklaerung": "Der Ausbildungsablauf hat feste Stationen: Vertragsschluss und Eintragung, Probezeit, Teil 1 der gestreckten Abschlussprüfung, Teil 2 und das Ende des Ausbildungsverhältnisses. Teil 1 ist bereits Bestandteil der Endnote und keine folgenlose Zwischenprüfung. Für die zeitliche Einordnung muss zwischen dem vereinbarten Vertragsende und dem tatsächlichen Ende nach Bekanntgabe eines bestandenen Prüfungsergebnisses unterschieden werden.",
  "beispiele": [
    "Im dritten Monat kann eine Kündigung während der noch laufenden Probezeit ohne Frist und ohne Begründung erfolgen; die Probezeit dauert ein bis vier Monate.",
    "Teil 1 findet in der Mitte des zweiten Ausbildungsjahres statt und wird nicht wiederholt, auch wenn Teil 2 später wiederholt werden muss."
  ],
  "fallbeispiel": "Eine Auszubildende besteht die Abschlussprüfung vier Wochen vor dem im Vertrag genannten Enddatum. Der Prüfungstermin allein beendet das Verhältnis nicht. Es endet mit der Bekanntgabe des Prüfungsergebnisses durch den Prüfungsausschuss, weil dieses Datum früher liegt als das vereinbarte Ende.",
  "typische_fehler": "Teil 1 wird als reine Übung behandelt oder das Ende immer automatisch auf das Vertragsdatum gelegt. Ebenfalls falsch ist, das Prüfungsdatum mit dem Tag der Ergebnisbekanntgabe gleichzusetzen.",
  "verstaendnisfragen": [
    "Warum ist Teil 1 besonders wichtig? Weil das Ergebnis in die Endnote einfließt und Teil 1 nicht wiederholt wird.",
    "Welches Datum entscheidet bei bestandener Prüfung vor Vertragsende? Die Bekanntgabe des Prüfungsergebnisses durch den Prüfungsausschuss."
  ],
  "pruefungsbezug": "Ordne Ablauffälle chronologisch und trenne Prüfungstermin, Ergebnisbekanntgabe und Vertragsdatum. Bei Kündigungsfragen zuerst prüfen, ob die Probezeit von einem bis vier Monaten noch läuft.",
  "merksatz": "Teil 1 zählt mit; bei früherem Bestehen endet die Ausbildung mit der Bekanntgabe des Ergebnisses."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Der Ausbildungsvertrag

**Datei:** `lf1-k2-ausbildungsvertrag.kapitel.json` · SHA-256 `e6e8612920ce37a7a20cc0e494737d8fbd7ca89aed98b576595bce227b64e5c8`

**Konkreter Kapitelauftrag:** Einen Ausbildungsvertrag aus Sicht einer neuen Auszubildenden prüfen; Vertragsangaben, Ausbildungszweck und Ansprechpartner verbinden.

**Einordnung:** Was drinstehen muss, was nicht drinstehen darf — und wie er endet.

### b1 · Was im Vertrag stehen muss

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die zwingenden Inhalte des Ausbildungsvertrags benennen

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
      "text": "Der {{begriff:ausbildungsvertrag|Berufsausbildungsvertrag}} ist kein normaler Arbeitsvertrag. Nach {{par:bbig-10|§ 10 BBiG}} gelten die Regeln des Arbeitsvertrags nur, soweit der Ausbildungszweck nichts anderes verlangt — und der verlangt oft etwas anderes. ==Der wesentliche Vertragsinhalt muss vor Beginn in Textform niedergelegt und der Vertrag bei der IHK eingetragen werden.=="
    },
    {
      "typ": "absatz",
      "text": "{{par:bbig-11|§ 11 BBiG}} zählt auf, was mindestens drinstehen muss. Fehlt etwas davon, ist der Vertrag nicht automatisch ungültig — aber der Betrieb verletzt seine Pflicht, und im Streitfall geht die Unklarheit zu seinen Lasten."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Pflichtangabe",
        "Warum sie zählt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Art, sachliche und zeitliche Gliederung der Ausbildung",
            "Verweist auf den betrieblichen Ausbildungsplan als Anlage"
          ]
        },
        {
          "zellen": [
            "Beginn und Dauer",
            "Bestimmt zugleich das reguläre Ende nach § 21 BBiG"
          ]
        },
        {
          "zellen": [
            "Ausbildungsmaßnahmen außerhalb der Ausbildungsstätte",
            "Etwa überbetriebliche Lehrgänge oder Verbundpartner"
          ]
        },
        {
          "zellen": [
            "Dauer der täglichen Ausbildungszeit",
            "Grundlage für Überstunden- und Pausenfragen"
          ]
        },
        {
          "zellen": [
            "Dauer der Probezeit",
            "Muss zwischen einem und vier Monaten liegen"
          ],
          "detail": "**Fehlt die Angabe?** Dann gilt trotzdem die gesetzliche Mindestprobezeit von einem Monat. Eine vereinbarte Probezeit von sechs Monaten wäre dagegen unwirksam und würde auf vier Monate gekürzt."
        },
        {
          "zellen": [
            "Zahlung und Höhe der Vergütung",
            "Muss angemessen sein und jährlich steigen"
          ]
        },
        {
          "zellen": [
            "Dauer des Urlaubs",
            "Bei Jugendlichen nach Alter gestaffelt"
          ]
        },
        {
          "zellen": [
            "Voraussetzungen für eine Kündigung",
            "Verweis auf § 22 BBiG"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Textform, Eintragung bei der zuständigen Stelle, Beginn erst danach. Für die Niederschrift genügt seit dem 1. Januar 2025 eine lesbare, dauerhafte Fassung — etwa als PDF per E-Mail; eine eigenhändige Unterschrift verlangt {{par:bbig-11|§ 11 BBiG}} dafür nicht mehr. Ohne Eintragung im Verzeichnis der Ausbildungsverhältnisse wirst du am Ende nicht zur Prüfung zugelassen.",
      "karteikarte": "Welche drei formalen Voraussetzungen muss ein Ausbildungsvertrag erfüllen, bevor die Ausbildung beginnt?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Der Ausbildungsvertrag regelt ein Ausbildungs- und kein gewöhnliches Arbeitsverhältnis.",
    "Der wesentliche Vertragsinhalt muss vor Beginn in Textform festgehalten werden."
  ],
  "erklaerung": "§ 11 BBiG verlangt einen Mindestinhalt, damit beide Seiten den Ablauf der Ausbildung nachvollziehen können. Dazu gehören unter anderem Gliederung, Beginn und Dauer, tägliche Ausbildungszeit, Probezeit, Vergütung, Urlaub und Kündigungsvoraussetzungen. Die Textform muss lesbar und dauerhaft sein; eine Eintragung bei der zuständigen Stelle gehört zusätzlich zum formalen Ablauf.",
  "beispiele": [
    "Eine PDF mit den Vertragsangaben kann die erforderliche lesbare und dauerhafte Fassung bilden; entscheidend ist, dass der Inhalt vor Beginn niedergelegt wird.",
    "Eine Probezeit von sechs Monaten passt nicht in den gesetzlichen Rahmen. Zulässig sind ein bis vier Monate; eine fehlende Angabe führt nicht dazu, dass die Probezeit beliebig lang wird."
  ],
  "fallbeispiel": "Vor Ausbildungsbeginn wird ein Vertrag geprüft. Enthalten sind Beginn und Dauer, tägliche Ausbildungszeit, Vergütung, Urlaub und Kündigungsvoraussetzungen, aber die sachliche und zeitliche Gliederung fehlt. Das Ergebnis lautet nicht automatisch ‚Vertrag unwirksam‘. Es liegt aber eine Pflichtverletzung bei der Niederschrift vor; der betriebliche Ausbildungsplan muss zur Klärung herangezogen werden und der fehlende wesentliche Inhalt ist nachzutragen.",
  "typische_fehler": "Die Eintragung bei der IHK wird mit dem Abschluss des Vertrags verwechselt. Außerdem wird angenommen, eine eigenhändige Unterschrift sei für jede Textform zwingend oder eine sechsmonatige Probezeit gelte vollständig.",
  "verstaendnisfragen": [
    "Welche Angaben helfen bei einer späteren Arbeitszeitfrage? Die vereinbarte tägliche Ausbildungszeit sowie die Angaben zu Urlaub und Vergütung.",
    "Was ist bei einer Probezeit von sechs Monaten zu beachten? Der zulässige Höchstrahmen beträgt vier Monate; die überschießende Vereinbarung kann nicht als sechsmonatige Probezeit fortgelten."
  ],
  "pruefungsbezug": "Bei Vertragsfällen die Pflichtangaben systematisch abhaken: Gliederung, Beginn/Dauer, externe Maßnahmen, tägliche Zeit, Probezeit, Vergütung, Urlaub und Kündigung.",
  "merksatz": "Der Vertrag muss den Ausbildungsweg, die Zeit, das Geld, den Urlaub und das Ende nachvollziehbar machen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Was nicht drinstehen darf

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Unzulässige Vertragsklauseln erkennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Was nicht drinstehen darf",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Das BBiG schützt Auszubildende auch vor Klauseln, denen sie selbst zugestimmt haben. Bestimmte Vereinbarungen sind schlicht **nichtig** — sie gelten nicht, selbst wenn beide Seiten unterschrieben haben. Das ist der Unterschied zu einem gewöhnlichen Vertrag, in dem gilt, was vereinbart wurde."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zulässig und nichtig",
      "titel": "Zwei Sorten Klauseln",
      "lead": "Links, was vereinbart werden darf. Rechts, was auch mit deiner Unterschrift nicht gilt.",
      "seiten": [
        {
          "name": "Wirksam vereinbar",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Probezeit von einem bis vier Monaten",
              "detail": "Innerhalb dieses Rahmens ist jede Länge zulässig — auch die vollen vier Monate."
            },
            {
              "text": "Höhere Vergütung als der Tarif",
              "detail": "Abweichungen nach oben sind immer erlaubt. Das ist das Günstigkeitsprinzip aus K4."
            },
            {
              "text": "Mehr Urlaub als das Gesetz verlangt",
              "detail": "Auch hier gilt: besser als der Mindeststandard ist immer möglich."
            },
            {
              "text": "Verpflichtung zum Führen des Berichtshefts",
              "detail": "Es ist ohnehin Pflicht und Zulassungsvoraussetzung zur Prüfung."
            }
          ]
        },
        {
          "name": "Nichtig",
          "ton": "rot",
          "punkte": [
            {
              "text": "Beschränkung der Berufsausübung nach der Ausbildung",
              "detail": "Du darfst nach dem Abschluss arbeiten, wo du willst. Eine Ausnahme gibt es nur, wenn innerhalb der letzten sechs Monate ein Arbeitsvertrag für die Zeit danach geschlossen wird."
            },
            {
              "text": "Entschädigung für die Ausbildung",
              "detail": "Der Betrieb darf sich die Ausbildung nicht bezahlen lassen — weder direkt noch über eine Rückzahlungsklausel bei vorzeitigem Ausscheiden."
            },
            {
              "text": "Vertragsstrafen",
              "detail": "Eine Klausel wie „bei Abbruch werden 2.000 € fällig“ ist unwirksam, egal wie sie formuliert ist."
            },
            {
              "text": "Ausschluss oder Beschränkung von Schadensersatzansprüchen",
              "detail": "Deine gesetzlichen Ansprüche lassen sich nicht wegvereinbaren."
            },
            {
              "text": "Pauschalierung von Schadensersatz",
              "detail": "Auch ein fester Betrag „für den Fall der Fälle“ ist nichtig."
            }
          ]
        }
      ],
      "regel": "Faustregel: Alles, was dich besserstellt als das Gesetz, ist erlaubt. Alles, was dich schlechterstellt, ist es nicht — auch mit Unterschrift."
    },
    {
      "typ": "achtung",
      "text": "Nichtig heißt: von Anfang an unwirksam. Du musst eine solche Klausel nicht anfechten und keine Frist einhalten — sie hat nie gegolten. Wenn dein Betrieb auf einer Vertragsstrafe besteht, ist die IHK die richtige Adresse."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Nicht jede unterschriebene Vertragsklausel ist wirksam.",
    "Nichtig bedeutet, dass eine Vereinbarung von Anfang an keine Wirkung hat."
  ],
  "erklaerung": "Das BBiG schützt die freie Berufsausübung und verhindert, dass der Betrieb die Ausbildung als kostenpflichtige Leistung oder über eine Vertragsstrafe absichert. Zulässig sind Vereinbarungen, die den gesetzlichen Standard verbessern, etwa mehr Vergütung oder mehr Urlaub. Nichtig sind unter anderem Entschädigungen für die Ausbildung, Vertragsstrafen und Beschränkungen der späteren Berufsausübung.",
  "beispiele": [
    "Eine höhere Vergütung als der Tarif ist eine günstigere Vereinbarung und darf getroffen werden.",
    "Eine Klausel ‚bei Abbruch 2.000 Euro Vertragsstrafe‘ gilt nicht, auch wenn sie verständlich formuliert und unterschrieben ist."
  ],
  "fallbeispiel": "Im Vertrag steht: ‚Bei vorzeitiger Beendigung durch den Auszubildenden sind 1.500 € Ausbildungskosten zu erstatten.‘ Die Klausel verlangt eine Entschädigung für die Ausbildung und wirkt zugleich wie eine Vertragsstrafe. Beides gehört zu den nichtigen Vereinbarungen. Ergebnis: Der Azubi muss die Klausel nicht anfechten und nicht zahlen.",
  "typische_fehler": "‚Unterschrieben‘ wird mit ‚wirksam‘ gleichgesetzt. Ebenso wird Nichtigkeit mit Anfechtbarkeit verwechselt. Eine nichtige Klausel gilt von Anfang an nicht; sie braucht keine Kündigung und keine besondere Frist.",
  "verstaendnisfragen": [
    "Warum darf mehr Urlaub vereinbart werden, eine Ausbildungskostenpauschale aber nicht? Mehr Urlaub verbessert den Schutz; die Pauschale belastet den Azubi entgegen dem Schutzgedanken des BBiG.",
    "Was bedeutet eine nichtige Vertragsstrafe? Sie hat von Anfang an keine Rechtswirkung, auch wenn beide Seiten unterschrieben haben."
  ],
  "pruefungsbezug": "Markiere in Fallaufgaben zuerst die Klauselart. Vertragsstrafe, Ausbildungskosten-Entschädigung und spätere Berufsbeschränkung sind typische Signalwörter für Nichtigkeit.",
  "merksatz": "Besserstellungen sind möglich; Straf- und Rückzahlungsklauseln, die die Ausbildung verteuern oder die Berufswahl beschränken, sind nichtig."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Wie das Ausbildungsverhältnis endet

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Beendigungsgründe und Kündigungsmöglichkeiten unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wie das Ausbildungsverhältnis endet",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Es gibt genau zwei reguläre Wege aus der Ausbildung und zwei außerordentliche. {{par:bbig-21|§ 21 BBiG}} regelt das reguläre Ende, {{par:bbig-22|§ 22 BBiG}} die Kündigung."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Weg",
        "Voraussetzung",
        "Frist"
      ],
      "zeilen": [
        {
          "zellen": [
            "Zeitablauf",
            "die vereinbarte Ausbildungszeit ist um",
            "keine — endet automatisch"
          ]
        },
        {
          "zellen": [
            "Bestandene Prüfung",
            "Bekanntgabe des Ergebnisses vor Zeitablauf",
            "endet sofort mit der Bekanntgabe"
          ]
        },
        {
          "zellen": [
            "Kündigung in der Probezeit",
            "beide Seiten, ohne Grund",
            "keine Frist"
          ],
          "detail": "**Formfrage:** Auch die Probezeitkündigung muss schriftlich erfolgen und bei Minderjährigen an die gesetzlichen Vertreter gerichtet sein. Eine mündliche Kündigung ist unwirksam."
        },
        {
          "zellen": [
            "Kündigung nach der Probezeit",
            "Betrieb: nur aus wichtigem Grund · Azubi: auch bei Berufsaufgabe oder -wechsel",
            "fristlos bzw. vier Wochen"
          ],
          "detail": "**Die Asymmetrie ist Absicht.** Der Betrieb braucht einen wichtigen Grund, du nicht — es genügt, dass du die Ausbildung aufgeben oder in einem anderen Beruf fortsetzen willst. Dann gilt eine Frist von vier Wochen."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Du bist im 14. Monat deiner Ausbildung und möchtest in einen anderen Beruf wechseln. Wie kommst du aus dem Vertrag?",
      "optionen": [
        {
          "text": "Gar nicht, der Vertrag läuft bis zum Ende",
          "richtig": false,
          "echo": "Ein Ausbildungsvertrag ist kein Käfig. § 22 BBiG gibt Auszubildenden ausdrücklich ein eigenes Kündigungsrecht bei Berufswechsel oder Aufgabe der Ausbildung."
        },
        {
          "text": "Kündigung mit vierwöchiger Frist",
          "richtig": true,
          "echo": "Richtig. Nach § 22 Absatz 2 BBiG kannst du mit einer Frist von vier Wochen kündigen, wenn du die Ausbildung aufgeben oder in einem anderen Beruf fortsetzen willst. Ein wichtiger Grund ist dafür nicht nötig — die Kündigung muss aber schriftlich erfolgen und den Grund angeben."
        },
        {
          "text": "Fristlose Kündigung ohne Angabe von Gründen",
          "richtig": false,
          "echo": "Das gilt nur in der Probezeit. Danach ist eine fristlose Kündigung deinerseits nur aus wichtigem Grund möglich — beim Berufswechsel gilt stattdessen die Vier-Wochen-Frist."
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Nach {{par:bbig-16|§ 16 BBiG}} hast du bei Beendigung Anspruch auf ein schriftliches Zeugnis — auch bei Abbruch. Verlange auf Wunsch die qualifizierte Fassung mit Angaben zu Führung, Leistung und besonderen Fähigkeiten; das einfache Zeugnis nennt nur Art, Dauer und Ziel."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b3",
  "vorauswissen": [
    "Ein Ausbildungsverhältnis kann durch Zeitablauf, Prüfung oder Kündigung enden.",
    "Die Kündigungsregeln ändern sich nach Ende der Probezeit."
  ],
  "erklaerung": "Für das Ende müssen vier Situationen auseinandergehalten werden: reguläres Ende mit Ablauf der vereinbarten Ausbildungszeit, früheres Ende mit Bekanntgabe des bestandenen Prüfungsergebnisses, fristlose Kündigung während der Probezeit und Kündigung nach der Probezeit. Während der Probezeit können beide Seiten ohne Frist und ohne Grund kündigen. Danach kann der Betrieb nur aus wichtigem Grund fristlos kündigen; der Azubi kann bei Berufsaufgabe oder Berufswechsel mit vier Wochen Frist kündigen.",
  "beispiele": [
    "Eine Kündigung im fünften Monat mit der Begründung ‚passt nicht ins Team‘ ist keine zulässige Probezeitkündigung mehr; nach vier Monaten gelten die strengeren Regeln.",
    "Wer die Ausbildung vollständig aufgibt oder den Beruf wechselt, kann nach der Probezeit mit vier Wochen Frist kündigen."
  ],
  "fallbeispiel": "Eine Auszubildende erhält im fünften Monat eine fristlose Kündigung, weil sie angeblich nicht ins Team passt. Die Probezeit darf höchstens vier Monate dauern und ist daher beendet. Danach braucht der Betrieb einen wichtigen Grund. Die pauschale Begründung reicht nicht; die Kündigung ist in diesem Fall nicht als wirksame fristlose Kündigung eingeordnet.",
  "typische_fehler": "Die Probezeit wird mit fünf oder sechs Monaten angenommen, oder die Kündigungsmöglichkeiten von Betrieb und Azubi werden gleich behandelt. Außerdem wird das reguläre Vertragsende mit dem früheren Ende durch bestandene Prüfung übersehen.",
  "verstaendnisfragen": [
    "Welche Kündigungsmöglichkeit hat der Betrieb nach der Probezeit? Nur die fristlose Kündigung aus wichtigem Grund.",
    "Wann darf der Azubi mit vier Wochen Frist kündigen? Wenn er die Berufsausbildung aufgeben oder sich für einen anderen Beruf ausbilden lassen will."
  ],
  "pruefungsbezug": "In Kündigungsfällen drei Fragen in dieser Reihenfolge stellen: Ist die Probezeit beendet? Wer kündigt? Liegt der passende Grund beziehungsweise die passende Frist vor?",
  "merksatz": "Probezeit: jederzeit ohne Grund; danach Betrieb nur aus wichtigem Grund, Azubi bei Berufswechsel mit vier Wochen Frist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Rechte, Pflichten und Jugendarbeitsschutz

**Datei:** `lf1-k3-rechte-pflichten.kapitel.json` · SHA-256 `4c8a979ed9e129b44b119988e10fdeefa7da88724a7a22a22240c77f41f6ed35`

**Konkreter Kapitelauftrag:** Eine betriebliche Bitte mit Ausbildungszweck und Schutzvorschriften abgleichen; Rechte und eigene Pflichten gemeinsam begründen.

**Einordnung:** Was du schuldest, was der Betrieb schuldet — und was für dich gilt, solange du unter 18 bist.

### c1 · Zwei Seiten, zwei Pflichtenkataloge

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Pflichten der Auszubildenden und des Betriebs gegenüberstellen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Zwei Seiten, zwei Pflichtenkataloge",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein Ausbildungsverhältnis ist ein Austauschverhältnis. {{par:bbig-13|§ 13 BBiG}} listet auf, was du schuldest, {{par:bbig-14|§ 14 BBiG}} was der Betrieb schuldet. ==Beide Kataloge stehen im selben Gesetz und sind gleich verbindlich== — das ist kein Wohlwollen des Betriebs, sondern Recht."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Die Pflichtenkataloge",
      "titel": "§ 13 gegen § 14 BBiG",
      "lead": "Jede Zeile anklicken für die Erläuterung.",
      "seiten": [
        {
          "name": "Du als Auszubildender",
          "ton": "gold",
          "punkte": [
            {
              "text": "Lernpflicht",
              "detail": "Du musst dich bemühen, die berufliche Handlungsfähigkeit zu erwerben. Das ist die Oberpflicht, aus der alle anderen folgen."
            },
            {
              "text": "Sorgfaltspflicht",
              "detail": "Aufgetragene Arbeiten sorgfältig ausführen — gemessen an deinem Ausbildungsstand, nicht an dem einer Fachkraft."
            },
            {
              "text": "Teilnahme an Berufsschule und Prüfungen",
              "detail": "Keine Kür, sondern gesetzliche Pflicht. Fehlzeiten in der Schule sind auch gegenüber dem Betrieb ein Problem."
            },
            {
              "text": "Weisungsgebundenheit",
              "detail": "Du folgst Weisungen des Ausbilders oder anderer weisungsbefugter Personen — solange sie dem Ausbildungszweck dienen."
            },
            {
              "text": "Beachtung der Betriebsordnung",
              "detail": "Arbeitszeiten, Kleiderordnung, IT-Regeln, Zutrittsregelungen."
            },
            {
              "text": "Pfleglicher Umgang mit Werkzeug und Material",
              "detail": "Auch mit Laptop, Diensthandy und Zugangsdaten."
            },
            {
              "text": "Schweigepflicht über Betriebsgeheimnisse",
              "detail": "Gilt weiter, auch nach dem Ende der Ausbildung. Praktisch relevant bei Social Media und beim Wechsel zur Konkurrenz."
            }
          ]
        },
        {
          "name": "Der Ausbildungsbetrieb",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Ausbildungspflicht",
              "detail": "Er muss dafür sorgen, dass die berufliche Handlungsfähigkeit tatsächlich vermittelt wird — nach dem betrieblichen Ausbildungsplan."
            },
            {
              "text": "Selbst ausbilden oder Ausbilder bestellen",
              "detail": "Die ausbildende Person muss persönlich und fachlich geeignet sein."
            },
            {
              "text": "Ausbildungsmittel kostenlos stellen",
              "detail": "Werkzeuge, Materialien, Fachliteratur und alles, was für Prüfungen gebraucht wird — auf Kosten des Betriebs."
            },
            {
              "text": "Freistellung für Schule und Prüfungen",
              "detail": "Nach {{par:bbig-15|§ 15 BBiG}}, und die Zeit wird auf die Ausbildungszeit angerechnet."
            },
            {
              "text": "Nur ausbildungsdienliche Aufgaben übertragen",
              "detail": "Die zentrale Schranke des Weisungsrechts — dazu gleich mehr."
            },
            {
              "text": "Angemessene Vergütung zahlen",
              "detail": "Nach {{par:bbig-17|§ 17 BBiG}}, mindestens in Höhe der gesetzlichen Mindestvergütung und jährlich steigend."
            },
            {
              "text": "Zeugnis ausstellen",
              "detail": "Nach {{par:bbig-16|§ 16 BBiG}} bei Beendigung, auf Verlangen qualifiziert."
            }
          ]
        }
      ],
      "regel": "Merkhilfe: § 13 ist dreizehn — dein Katalog. § 14 ist vierzehn — der des Betriebs. Die Reihenfolge im Gesetz ist auch die in der Prüfung."
    },
    {
      "typ": "merke",
      "text": "Deine Sorgfaltspflicht misst sich an deinem **Ausbildungsstand**. Ein Fehler im dritten Monat ist etwas anderes als derselbe Fehler im dritten Jahr — genau darum ist es eine Ausbildung.",
      "karteikarte": "Woran bemisst sich die Sorgfaltspflicht eines Auszubildenden?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Ein Ausbildungsvertrag verpflichtet beide Seiten.",
    "Die Pflichten des Azubis stehen dem Ausbildungsauftrag des Betriebs gegenüber."
  ],
  "erklaerung": "§ 13 BBiG beschreibt die Pflichten des Auszubildenden: Lernen, sorgfältige Aufgabenerledigung, Berufsschulbesuch, Befolgen zulässiger Weisungen, Beachtung der Betriebsordnung, pfleglicher Umgang mit Arbeitsmitteln und Verschwiegenheit. § 14 BBiG verpflichtet den Betrieb, die berufliche Handlungsfähigkeit zu vermitteln, geeignete Ausbilder einzusetzen, Ausbildungsmittel kostenlos zu stellen, für Schule und Prüfungen freizustellen, ausbildungsdienliche Aufgaben zu übertragen, zu vergüten und ein Zeugnis auszustellen.",
  "beispiele": [
    "Der Azubi führt eine aufgetragene Büroaufgabe sorgfältig aus und meldet, wenn eine Anweisung unklar ist; der Betrieb stellt dafür die erforderlichen Ausbildungsmittel kostenlos bereit.",
    "Muss der Azubi zur Berufsschule oder Prüfung, liegt die Freistellungspflicht beim Betrieb. Das ist keine freiwillige Kulanz."
  ],
  "fallbeispiel": "Ein Azubi soll eine Aufgabe bearbeiten, erhält aber keinen Zugang zum benötigten Programm. Der Azubi muss sich um den Erwerb der beruflichen Handlungsfähigkeit bemühen und sorgfältig arbeiten; der Betrieb muss die notwendigen Ausbildungsmittel kostenlos bereitstellen. Ohne Mittel kann die Leistung nicht fair am Maßstab einer Fachkraft bewertet werden.",
  "typische_fehler": "Nur die Azubi-Pflichten werden gelernt. Außerdem wird Sorgfalt mit fehlerfreier Leistung einer ausgebildeten Fachkraft gleichgesetzt. Maßstab ist der jeweilige Ausbildungsstand.",
  "verstaendnisfragen": [
    "Warum gehören Berufsschule und Prüfung in den Pflichtenkatalog des Betriebs? Weil der Betrieb dafür freistellen und die Ausbildung insgesamt ermöglichen muss.",
    "Woran wird die Sorgfalt des Azubis gemessen? Am Ausbildungsstand, nicht am Maßstab einer bereits fertig ausgebildeten Fachkraft."
  ],
  "pruefungsbezug": "Bei Gegenüberstellungen zwei Spalten anlegen: Pflichten nach § 13 BBiG und Pflichten nach § 14 BBiG. So werden Lernen und Ausbilden, Befolgen und Anleiten nicht vertauscht.",
  "merksatz": "Der Azubi muss lernen und sorgfältig mitwirken; der Betrieb muss anleiten, freistellen und die Ausbildung ermöglichen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Wo das Weisungsrecht endet

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Grenzen des Weisungsrechts erkennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Wo das Weisungsrecht endet",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Das {{begriff:weisungsrecht|Weisungsrecht}} erlaubt dem Betrieb, dir zu sagen, was du wann und wo tust. Es hat aber eine harte Grenze: Aufgaben müssen **dem Ausbildungszweck dienen** und deinen Kräften angemessen sein. Was das praktisch heißt, ist die häufigste Streitfrage im ersten Lehrjahr."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Aufgabe",
        "Zulässig?",
        "Warum"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ablage sortieren",
            "ja",
            "Gehört zum Berufsbild, auch wenn es langweilig ist"
          ]
        },
        {
          "zellen": [
            "Kaffee für eine Besprechung vorbereiten",
            "in Maßen ja",
            "Als Teil der Sitzungsvorbereitung; nicht als Dauerbeschäftigung"
          ]
        },
        {
          "zellen": [
            "Täglich zwei Stunden die Küche putzen",
            "nein",
            "Kein Bezug zum Ausbildungsberufsbild"
          ],
          "detail": "**Die Grenze verläuft nicht bei „unangenehm“, sondern bei „berufsfremd“.** Einmal die Spülmaschine ausräumen ist Betriebsalltag. Eine feste tägliche Reinigungsschicht ist eine andere Tätigkeit — und dafür wärst du nicht eingestellt worden."
        },
        {
          "zellen": [
            "Private Besorgungen für den Chef",
            "nein",
            "Dient nicht dem Ausbildungszweck"
          ]
        },
        {
          "zellen": [
            "Schwere Kisten dauerhaft schleppen",
            "nein",
            "Nicht den Kräften angemessen, bei Jugendlichen zusätzlich vom JArbSchG erfasst"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Wenn dir Aufgaben dauerhaft berufsfremd vorkommen, ist der erste Schritt nicht die Beschwerde bei der IHK, sondern der betriebliche Ausbildungsplan. Frag nach ihm und vergleiche. Ein sachliches Gespräch mit dem Ausbilder auf Basis des Plans löst die meisten Fälle."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c2",
  "vorauswissen": [
    "Das Weisungsrecht ordnet die Arbeit im Betrieb.",
    "Ausbildungsaufgaben müssen einen Bezug zum Ausbildungszweck haben."
  ],
  "erklaerung": "Eine Weisung ist nicht schon deshalb zulässig, weil sie vom Betrieb kommt. § 14 BBiG begrenzt die Aufgaben auf Tätigkeiten, die dem Ausbildungszweck dienen. Gelegentliche Nebenaufgaben können im Arbeitsalltag vorkommen; berufsfremde oder dauerhaft überfordernde Aufgaben überschreiten aber die Grenze. Der betriebliche Ausbildungsplan ist der sachliche Bezugspunkt für das Gespräch.",
  "beispiele": [
    "Eine gelegentliche Ablage von Unterlagen kann zu kaufmännischen Büroabläufen passen; tägliches Autowaschen gehört nicht zum Ausbildungsberuf Kaufleute für Büromanagement.",
    "Eine Aufgabe darf erklärt und angeleitet werden. Wird sie ohne passende Mittel und dauerhaft auf dem Niveau einer Fachkraft verlangt, ist die Ausbildungs- und Schutzfunktion zu prüfen."
  ],
  "fallbeispiel": "Ein Azubi im Büromanagement soll jeden Morgen eine Stunde lang Firmenwagen waschen. Autowaschen ist keine ausbildungsdienliche Büroaufgabe; die regelmäßige Dauer spricht außerdem gegen eine gelegentliche Nebenaufgabe. Der nächste Schritt ist ein Gespräch mit dem Ausbilder anhand des Ausbildungsplans. Bei fehlender Lösung kommen Ausbildungsberater der IHK oder die JAV als Anlaufstellen in Betracht.",
  "typische_fehler": "Jede betriebliche Anweisung wird als automatisch verbindlich angesehen. Der Gegenfehler ist, jede Nebenaufgabe pauschal abzulehnen, obwohl die konkrete Aufgabe gelegentlich und ausbildungsbezogen sein kann.",
  "verstaendnisfragen": [
    "Welche erste Frage entscheidet über die Zulässigkeit einer Aufgabe? Dient sie dem Ausbildungszweck und passt sie zum Berufsbild beziehungsweise Ausbildungsplan?",
    "Was ist bei einer unpassenden Weisung ein sinnvoller erster Schritt? Sachlich mit dem Ausbilder sprechen und den betrieblichen Ausbildungsplan als Bezug nehmen."
  ],
  "pruefungsbezug": "Begründe nicht nur mit ‚gefällt mir nicht‘, sondern mit Ausbildungszweck, Berufsbild, Häufigkeit und Ausbildungsplan. Diese Kriterien machen die Antwort nachvollziehbar.",
  "merksatz": "Weisungsrecht ja — aber nur innerhalb des Ausbildungszwecks und ohne berufsfremde Daueraufgaben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · Jugendarbeitsschutz

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Schutzvorschriften des Jugendarbeitsschutzgesetzes anwenden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`, `vertiefung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "Jugendarbeitsschutz",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Solange du noch keine 18 bist, gilt für dich das {{begriff:jarbschg|Jugendarbeitsschutzgesetz}} statt des Arbeitszeitgesetzes. Als {{begriff:jugendlicher|Jugendlicher}} gilt, wer 15, aber noch nicht 18 Jahre alt ist. ==Mit dem 18. Geburtstag fallen die Sonderregeln weg== — das ist einer der beliebtesten Prüfungsstolpersteine."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Bereich",
        "Regel für Jugendliche",
        "Grundlage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Tägliche Arbeitszeit",
            "höchstens 8 Stunden",
            "§ 8 JArbSchG"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Wöchentliche Arbeitszeit",
            "höchstens 40 Stunden",
            "§ 8 JArbSchG"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Pause bei 4,5 bis 6 Stunden",
            "mindestens 30 Minuten",
            "§ 11 JArbSchG"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Pause bei mehr als 6 Stunden",
            "mindestens 60 Minuten",
            "§ 11 JArbSchG"
          ],
          "mono": [
            2
          ],
          "detail": "**Und sie müssen echte Pausen sein:** in Blöcken von mindestens 15 Minuten, frühestens eine Stunde nach Beginn und spätestens eine Stunde vor Ende der Arbeitszeit."
        },
        {
          "zellen": [
            "Fünf-Tage-Woche",
            "Samstag und Sonntag grundsätzlich frei",
            "§§ 15–17 JArbSchG"
          ],
          "mono": [
            2
          ]
        },
        {
          "zellen": [
            "Urlaub",
            "30 · 27 · 25 Werktage, je nach Alter am 1. Januar",
            "§ 19 JArbSchG"
          ],
          "mono": [
            2
          ],
          "detail": "**Die Staffelung im Wortlaut:** mindestens 30 Werktage, wenn der Jugendliche zu Beginn des Kalenderjahres noch nicht 16 ist; 27 Werktage, wenn noch nicht 17; 25 Werktage, wenn noch nicht 18. Entscheidend ist das Alter am 1. Januar, nicht zum Zeitpunkt des Urlaubs — wer am 2. Januar 18 wird, hat für das ganze Jahr noch den Anspruch eines 17-Jährigen. Volljährige Auszubildende fallen unter das Bundesurlaubsgesetz mit mindestens 24 Werktagen."
        },
        {
          "zellen": [
            "Berufsschultag",
            "Anrechnung auf die Arbeitszeit, Freistellung",
            "§§ 9, 15 JArbSchG"
          ],
          "mono": [
            2
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Eine 17-jährige Auszubildende hat an einem Tag 7 Stunden Arbeitszeit. Wie lange muss ihre Pause mindestens sein?",
      "optionen": [
        {
          "text": "30 Minuten",
          "richtig": false,
          "echo": "30 Minuten genügen nur bei einer Arbeitszeit von mehr als viereinhalb bis sechs Stunden. Bei sieben Stunden ist die Schwelle überschritten."
        },
        {
          "text": "60 Minuten",
          "richtig": true,
          "echo": "Richtig. § 11 JArbSchG verlangt bei mehr als sechs Stunden Arbeitszeit mindestens 60 Minuten Ruhepause. Diese darf in Blöcke aufgeteilt werden, aber jeder Block muss mindestens 15 Minuten dauern."
        },
        {
          "text": "45 Minuten",
          "richtig": false,
          "echo": "Diese Zwischenstufe gibt es im Jugendarbeitsschutzgesetz nicht. Es kennt nur zwei Schwellen: 30 Minuten und 60 Minuten."
        }
      ]
    },
    {
      "typ": "vertiefung",
      "titel": "Und wenn ich volljährig bin?",
      "absaetze": [
        "Dann gilt das Arbeitszeitgesetz. Die werktägliche Arbeitszeit darf acht Stunden betragen und auf bis zu zehn Stunden verlängert werden, wenn im Durchschnitt von sechs Monaten acht Stunden nicht überschritten werden.",
        "Auch die Pausen ändern sich: mindestens 30 Minuten bei mehr als sechs Stunden und 45 Minuten bei mehr als neun Stunden. Der Urlaub richtet sich dann nach dem Bundesurlaubsgesetz oder — meistens günstiger — nach deinem Tarifvertrag."
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welches Gesetz regelt den Sachverhalt?",
      "kategorien": [
        "BBiG",
        "JArbSchG",
        "Vertrag"
      ],
      "aufgaben": [
        {
          "text": "Der Betrieb muss die Ausbildungsmittel kostenlos stellen.",
          "loesung": "BBiG"
        },
        {
          "text": "Eine 16-Jährige darf höchstens 40 Stunden pro Woche arbeiten.",
          "loesung": "JArbSchG"
        },
        {
          "text": "Die Probezeit dauert genau drei Monate.",
          "loesung": "Vertrag"
        },
        {
          "text": "Nach mehr als sechs Stunden Arbeit stehen 60 Minuten Pause zu.",
          "loesung": "JArbSchG"
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
    "Für Jugendliche gelten zusätzliche Schutzregeln.",
    "Arbeitszeit, Pausen und Urlaub müssen gemeinsam betrachtet werden."
  ],
  "erklaerung": "Für unter 18-Jährige begrenzt das JArbSchG die Arbeitszeit auf höchstens acht Stunden täglich und 40 Stunden wöchentlich. Ab 4,5 Stunden sind 30 Minuten Pause erforderlich, bei mehr als sechs Stunden 60 Minuten. Der Urlaubsanspruch richtet sich nach dem Alter am 1. Januar und beträgt 30, 27 oder 25 Werktage. Das Alter ist deshalb bei jeder Fallaufgabe die erste Prüfvariable.",
  "beispiele": [
    "Wer an vier Tagen je acht Stunden gearbeitet hat, darf am fünften Tag höchstens noch acht Stunden leisten, weil die Wochenhöchstgrenze 40 Stunden beträgt.",
    "Bei mehr als sechs Stunden Arbeitszeit ist nicht nur die 30-Minuten-Stufe, sondern die 60-Minuten-Pause zu prüfen."
  ],
  "fallbeispiel": "Eine 17-jährige Auszubildende arbeitet montags bis donnerstags jeweils acht Stunden. Die Rechnung lautet 4 × 8 = 32 Stunden. Bis zur Wochenhöchstgrenze von 40 Stunden bleiben 8 Stunden; freitags sind daher höchstens 8 weitere Stunden möglich. Zusätzlich müssen die für die tägliche Arbeitszeit geltenden Pausen eingehalten werden.",
  "typische_fehler": "Die tägliche Höchstgrenze wird geprüft, die Wochenhöchstgrenze aber vergessen. Ebenso werden 4,5 Stunden und mehr als 6 Stunden verwechselt oder der Urlaubsanspruch ohne das Alter am 1. Januar bestimmt.",
  "verstaendnisfragen": [
    "Welche vier Zahlen solltest du zuerst notieren? 8 Stunden täglich, 40 Stunden wöchentlich, 30 Minuten Pause ab 4,5 Stunden und 60 Minuten bei mehr als 6 Stunden.",
    "Wovon hängt der Urlaub Jugendlicher ab? Vom Alter am 1. Januar; die Staffel beträgt 30, 27 oder 25 Werktage."
  ],
  "pruefungsbezug": "Rechne Wochenfälle sichtbar vor: bisherige Stunden addieren, von 40 abziehen und anschließend die Tagesgrenze sowie Pausen prüfen.",
  "merksatz": "Bei Jugendlichen zuerst Alter, dann 8/40, danach die passende Pause und den Urlaub prüfen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Tarifrecht und Mitbestimmung

**Datei:** `lf1-k4-tarif-mitbestimmung.kapitel.json` · SHA-256 `063c3e800dd32f3f7b6614da0246b874dfdba4dd580d8cb1647721b5e6b1cf8a`

**Konkreter Kapitelauftrag:** Ein Anliegen zu Arbeitsbedingungen dem passenden Vertretungsweg zuordnen; Tarifvertrag, Betriebsrat und JAV auseinanderhalten.

**Einordnung:** Wer deine Arbeitsbedingungen aushandelt — und wer im Betrieb mitreden darf.

### d1 · Wer verhandelt hier eigentlich?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Tarifvertragsarten und die Rolle der Tarifparteien erklären

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Wer verhandelt hier eigentlich?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Dein Gehalt wird in den meisten Branchen nicht zwischen dir und deinem Chef ausgehandelt, sondern zwischen einer {{begriff:gewerkschaft|Gewerkschaft}} und einem {{begriff:arbeitgeberverband|Arbeitgeberverband}}. Das Ergebnis ist ein {{begriff:tarifvertrag|Tarifvertrag}}. Möglich ist das durch die {{begriff:tarifautonomie|Tarifautonomie}} — ==der Staat hält sich aus den Verhandlungen heraus.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Was geregelt wird",
        "Typische Laufzeit"
      ],
      "zeilen": [
        {
          "zellen": [
            "Entgelttarifvertrag",
            "Löhne, Gehälter, Ausbildungsvergütungen",
            "12 bis 24 Monate"
          ]
        },
        {
          "zellen": [
            "Manteltarifvertrag",
            "Arbeitszeit, Urlaub, Kündigungsfristen, Zuschläge",
            "mehrere Jahre"
          ],
          "detail": "**Warum die Trennung sinnvoll ist:** Über Geld wird häufig verhandelt, über Grundsätze selten. Der Manteltarifvertrag läuft deshalb deutlich länger und muss nicht in jeder Lohnrunde neu aufgemacht werden."
        },
        {
          "zellen": [
            "Rahmentarifvertrag",
            "Eingruppierung in Entgeltgruppen",
            "mehrere Jahre"
          ]
        },
        {
          "zellen": [
            "Haustarifvertrag",
            "gilt nur für ein einzelnes Unternehmen",
            "unterschiedlich"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Entgelt** regelt das Geld, **Mantel** regelt den Rahmen, **Rahmen** regelt die Eingruppierung. Und ein **Haustarif** wird direkt mit einem einzelnen Unternehmen geschlossen, ohne Arbeitgeberverband.",
      "karteikarte": "Welche vier Tarifvertragsarten gibt es und was regelt jede?"
    },
    {
      "typ": "vertiefung",
      "titel": "Was passiert, wenn man sich nicht einigt?",
      "absaetze": [
        "Zunächst gilt die Friedenspflicht: Solange ein Tarifvertrag läuft, darf über seine Inhalte nicht gestreikt werden. Erst nach Ablauf und gescheiterten Verhandlungen wird der Arbeitskampf möglich.",
        "Die Gewerkschaft kann dann zum Streik aufrufen, die Arbeitgeberseite mit Aussperrung antworten. Häufig wird vorher eine Schlichtung versucht. Wichtig für dich: Als Auszubildender darfst du dich an einem rechtmäßigen Streik beteiligen — verpflichtet bist du dazu nicht."
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Arbeitsbedingungen können durch Gesetz, Vertrag und betriebliche Regelungen bestimmt werden.",
    "Tarifparteien verhandeln kollektiv über Arbeitsbedingungen."
  ],
  "erklaerung": "Tarifautonomie bedeutet, dass Gewerkschaften und Arbeitgeberverbände Tarifbedingungen ohne staatliche Einmischung aushandeln. Dabei erfüllen die Tarifarten unterschiedliche Zwecke: Entgelttarifverträge regeln die Vergütung, Manteltarifverträge allgemeine Arbeitsbedingungen, Rahmentarifverträge Gruppen und Tätigkeitsmerkmale, Haustarifverträge die Bedingungen eines einzelnen Betriebs.",
  "beispiele": [
    "Eine Verhandlung über die Höhe des Entgelts gehört in den Entgelttarifvertrag; Regeln zu Arbeitszeit oder Urlaub werden im Manteltarifvertrag verortet.",
    "Schließt ein einzelner Betrieb mit der Gewerkschaft eigene Bedingungen, liegt ein Haustarifvertrag vor. Das ist etwas anderes als eine allgemeine Vereinbarung eines Arbeitgeberverbands."
  ],
  "fallbeispiel": "In einer Aufgabe sollen vier Überschriften zugeordnet werden: ‚monatliche Vergütung‘, ‚allgemeine Arbeitsbedingungen‘, ‚Tätigkeitsgruppen‘ und ‚Regelung nur für Betrieb X‘. Die Lösung lautet Entgelttarifvertrag, Manteltarifvertrag, Rahmentarifvertrag und Haustarifvertrag. Entscheidend ist jeweils der Regelungsgegenstand, nicht die Länge des Dokuments.",
  "typische_fehler": "Tarifvertrag und Betriebsvereinbarung werden gleichgesetzt. Außerdem wird angenommen, der Staat setze jeden Tarifinhalt fest. Tarifautonomie beschreibt gerade die Verhandlung durch Gewerkschaften und Arbeitgeberseite.",
  "verstaendnisfragen": [
    "Wer sind die typischen Tarifparteien? Gewerkschaften und Arbeitgeberverbände; bei einem Haustarifvertrag kann der einzelne Arbeitgeber beteiligt sein.",
    "Woran erkennst du einen Entgelttarifvertrag? Sein Schwerpunkt liegt auf Vergütung beziehungsweise Entgelt."
  ],
  "pruefungsbezug": "Ordne Tarifarten über Schlüsselwörter zu: Entgelt = Geld, Mantel = allgemeine Bedingungen, Rahmen = Gruppen und Tätigkeiten, Haus = einzelner Betrieb.",
  "merksatz": "Tarifautonomie heißt: Gewerkschaft und Arbeitgeberseite handeln die Bedingungen selbst aus."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Wer schlägt wen?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das Günstigkeitsprinzip und die Rangfolge der Regelungen anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Wer schlägt wen?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Deine Arbeitsbedingungen stehen an mehreren Stellen gleichzeitig: im Gesetz, im Tarifvertrag, in einer Betriebsvereinbarung und in deinem eigenen Vertrag. Welche Regel gilt, wenn sie sich widersprechen? Dafür gibt es eine feste Rangfolge — und eine wichtige Ausnahme."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Rangfolge",
      "titel": "Von oben nach unten",
      "lead": "Höherrangiges Recht setzt den Mindeststandard. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Gesetz",
          "satz": "BBiG · JArbSchG · Arbeitszeitgesetz",
          "text": "Der unterste Boden. Was hier steht, kann durch nichts unterschritten werden — auch nicht durch einen Tarifvertrag."
        },
        {
          "nr": 2,
          "titel": "Tarifvertrag",
          "satz": "Gewerkschaft ↔ Arbeitgeberverband",
          "text": "Gilt für die Branche und darf das Gesetz nur verbessern. Er bindet allerdings nur, wenn beide Seiten tarifgebunden sind oder der Vertrag darauf verweist."
        },
        {
          "nr": 3,
          "titel": "Betriebsvereinbarung",
          "satz": "Arbeitgeber ↔ Betriebsrat",
          "text": "Gilt für den einzelnen Betrieb. Sie darf tariflich geregelte Themen grundsätzlich nicht anfassen — das ist der Tarifvorbehalt."
        },
        {
          "nr": 4,
          "titel": "Arbeits- oder Ausbildungsvertrag",
          "satz": "Betrieb ↔ du",
          "text": "Die individuelle Ebene. Sie kann alles darüber nur verbessern, nie verschlechtern."
        },
        {
          "nr": 5,
          "titel": "Ausnahme: Günstigkeitsprinzip",
          "satz": "besser gewinnt",
          "text": "Eine niedrigere Ebene setzt sich durch, wenn sie für dich günstiger ist. Steht im Tarif 27 Tage Urlaub und in deinem Vertrag 30, bekommst du 30. Umgekehrt gilt der Tarif."
        }
      ],
      "regel": "Kurzfassung: Nach unten hin darf nur verbessert werden. Wer schlechter regelt als die Ebene darüber, regelt gar nichts."
    },
    {
      "typ": "check",
      "frage": "Im Tarifvertrag stehen 28 Urlaubstage, im Ausbildungsvertrag 25. Wie viele Tage stehen der Auszubildenden zu?",
      "optionen": [
        {
          "text": "25, weil der eigene Vertrag konkreter ist",
          "richtig": false,
          "echo": "Konkreter heißt nicht stärker. Eine Einzelabrede darf vom Tarifvertrag nur nach oben abweichen — nach unten ist sie unwirksam."
        },
        {
          "text": "28, wegen des Günstigkeitsprinzips",
          "richtig": true,
          "echo": "Richtig. Die Vertragsklausel mit 25 Tagen ist unwirksam, weil sie ungünstiger ist als der Tarifvertrag. An ihre Stelle tritt die tarifliche Regelung mit 28 Tagen."
        },
        {
          "text": "26,5 als Mittelwert",
          "richtig": false,
          "echo": "Gemittelt wird im Arbeitsrecht nie. Es gilt entweder die eine oder die andere Regelung — und zwar die für den Beschäftigten günstigere."
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
    "Mehrere Regelungsebenen können denselben Arbeitsbereich betreffen.",
    "Eine rangniedrigere Regelung darf nicht automatisch schlechter sein."
  ],
  "erklaerung": "Die Grundrangfolge lautet Gesetz vor Tarifvertrag vor Betriebsvereinbarung vor Einzelvertrag. Das Günstigkeitsprinzip ist die wichtige Ausnahme: Eine rangniedrigere Regelung setzt sich durch, wenn sie für den Beschäftigten günstiger ist. Während der Laufzeit gilt außerdem die Friedenspflicht; erst danach kommen Streik und Aussperrung als tarifliche Druckmittel in Betracht.",
  "beispiele": [
    "Der Tarifvertrag sieht 28 Urlaubstage vor, der Arbeitsvertrag 30. Die günstigere Einzelregelung mit 30 Tagen bleibt bestehen.",
    "Stehen im Arbeitsvertrag nur 25 Urlaubstage, kann die schlechtere Vereinbarung den Tarifstandard nicht unterschreiten; es bleiben die 28 tariflichen Tage."
  ],
  "fallbeispiel": "Ein Betrieb ist tarifgebunden. Im Tarifvertrag stehen 28 Urlaubstage, im einzelnen Arbeitsvertrag 30. Zuerst wird die Rangfolge notiert: Tarifvertrag steht über Einzelvertrag. Dann wird die Günstigkeit verglichen: 30 ist für den Beschäftigten günstiger als 28. Daher gilt die rangniedrigere, aber günstigere Regelung.",
  "typische_fehler": "Die Rangfolge wird als starres ‚oben gewinnt immer‘ verstanden. Der Gegenfehler ist, jede Abweichung als günstiger zu bewerten, ohne denselben Regelungsgegenstand und die tatsächliche Verbesserung zu vergleichen.",
  "verstaendnisfragen": [
    "Was prüfst du nach dem Aufschreiben der Rangfolge? Ob die niedrigere Regelung im gleichen Bereich günstiger ist.",
    "Was bedeutet Friedenspflicht? Während der Laufzeit eines Tarifvertrags sollen die Tarifparteien über die geregelten Gegenstände nicht streiken oder aussperren."
  ],
  "pruefungsbezug": "Schreibe bei Fällen die vier Ebenen in der richtigen Reihenfolge auf und vergleiche erst danach die konkrete Vergütung, Arbeitszeit oder Urlaubstage.",
  "merksatz": "Die Rangfolge ordnet; das Günstigkeitsprinzip lässt die bessere Regelung der unteren Ebene gelten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d3 · Mitbestimmung im Betrieb

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aufgaben von Betriebsrat und Jugend- und Auszubildendenvertretung unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d3",
  "titel": "Mitbestimmung im Betrieb",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Tarifvertrag regelt die Branche, der {{begriff:betriebsrat|Betriebsrat}} den einzelnen Betrieb. Er wird von den Beschäftigten gewählt und hat je nach Thema unterschiedlich starke Rechte. Für dich besonders wichtig ist die {{begriff:jav|Jugend- und Auszubildendenvertretung}}."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Gremien",
      "titel": "Betriebsrat und JAV",
      "lead": "Sie arbeiten zusammen — aber nur eines von beiden kann Beschlüsse fassen.",
      "seiten": [
        {
          "name": "Betriebsrat",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Wählbar ab 5 ständigen wahlberechtigten Beschäftigten",
              "detail": "Er muss nicht gegründet werden — aber wenn die Belegschaft ihn will, darf der Arbeitgeber die Wahl nicht behindern."
            },
            {
              "text": "Echte Mitbestimmung in sozialen Angelegenheiten",
              "detail": "Arbeitszeitlage, Urlaubsgrundsätze, Überstunden, technische Überwachungseinrichtungen: Ohne Zustimmung geht hier nichts."
            },
            {
              "text": "Mitwirkung bei personellen Maßnahmen",
              "detail": "Bei Einstellungen, Versetzungen und Kündigungen muss er angehört werden. Eine Kündigung ohne Anhörung ist unwirksam."
            },
            {
              "text": "Schließt Betriebsvereinbarungen",
              "detail": "Die gelten unmittelbar für alle Beschäftigten des Betriebs."
            }
          ]
        },
        {
          "name": "Jugend- und Auszubildendenvertretung",
          "ton": "gold",
          "punkte": [
            {
              "text": "Ab 5 Beschäftigten unter 18 oder in Ausbildung",
              "detail": "Nach {{par:betrvg-60|§ 60 BetrVG}}. Wahlberechtigt sind alle unter 18 und alle Azubis; wählbar sind Beschäftigte unter 25 und alle Azubis, seit 2021 ohne Altersgrenze (§ 61 BetrVG)."
            },
            {
              "text": "Vertritt die Interessen der jungen Beschäftigten",
              "detail": "Ausbildungsqualität, Übernahme, Arbeitszeiten, Berufsschulfragen."
            },
            {
              "text": "Kein eigenes Beschlussrecht",
              "detail": "Das ist der entscheidende Unterschied. Die JAV bringt Anträge in den Betriebsrat ein — beschließen muss der Betriebsrat."
            },
            {
              "text": "Teilnahmerecht an Betriebsratssitzungen",
              "detail": "Bei Themen, die überwiegend junge Beschäftigte betreffen, hat sie dort auch Stimmrecht."
            }
          ]
        }
      ],
      "regel": "Der wichtigste Satz zum Merken: Die JAV vertritt, der Betriebsrat entscheidet."
    },
    {
      "typ": "achtung",
      "text": "Im öffentlichen Dienst heißen die Gremien anders: Dort gibt es statt des Betriebsrats den **Personalrat** und statt des Betriebsverfassungsgesetzes das Personalvertretungsrecht. Die Grundidee ist dieselbe, die Begriffe sind es nicht — und in der Prüfung wird nach dem richtigen Wort gefragt."
    },
    {
      "typ": "zuordnen",
      "lead": "Wer ist zuständig?",
      "kategorien": [
        "Tarifparteien",
        "Betriebsrat",
        "JAV"
      ],
      "aufgaben": [
        {
          "text": "Erhöhung der Ausbildungsvergütung für die ganze Branche.",
          "loesung": "Tarifparteien"
        },
        {
          "text": "Zustimmung zur Einführung einer neuen Zeiterfassungssoftware.",
          "loesung": "Betriebsrat"
        },
        {
          "text": "Antrag, dass Azubis am Berufsschultag früher gehen dürfen.",
          "loesung": "JAV"
        },
        {
          "text": "Abschluss einer Betriebsvereinbarung zur Gleitzeit.",
          "loesung": "Betriebsrat"
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
    "Der Betriebsrat vertritt die gesamte Belegschaft.",
    "Auszubildende und junge Beschäftigte können zusätzlich durch die JAV vertreten werden."
  ],
  "erklaerung": "Die Jugend- und Auszubildendenvertretung vertritt Beschäftigte unter 18 und Auszubildende. Sie nimmt Anliegen auf und bringt Anträge in den Betriebsrat ein. Der Betriebsrat besitzt die eigenen Beschluss- und Mitbestimmungsrechte und schließt Betriebsvereinbarungen. Die JAV vertritt also, der Betriebsrat entscheidet. Im öffentlichen Dienst ist der Personalrat die entsprechende Interessenvertretung.",
  "beispiele": [
    "Eine Frage zur Ausbildungsqualität kann die JAV aufnehmen und als Antrag in den Betriebsrat bringen; der Beschluss wird dort gefasst.",
    "Bei der Umstellung von Gleitzeit auf feste Kernzeiten ist der Betriebsrat wegen der Lage der Arbeitszeit zu beteiligen."
  ],
  "fallbeispiel": "Ein Betrieb will die Arbeitszeit von Gleitzeit auf feste Kernzeiten umstellen. Die Lage der Arbeitszeit betrifft eine soziale Angelegenheit und damit die Mitbestimmung des Betriebsrats. Die JAV kann die Interessen der Azubis einbringen, hat aber kein eigenes Beschlussrecht. Das Ergebnis wird in der Regel durch den Betriebsrat, etwa in einer Betriebsvereinbarung, festgelegt.",
  "typische_fehler": "JAV und Betriebsrat werden als gleichberechtigte Beschlussorgane behandelt. Ebenso wird die JAV nur auf Minderjährige beschränkt; sie vertritt auch Auszubildende, die 18 oder älter sind.",
  "verstaendnisfragen": [
    "Ab wann kann eine JAV gebildet werden? Nach § 60 BetrVG ab fünf Beschäftigten unter 18 Jahren oder in Ausbildung.",
    "Wer beschließt eine Betriebsvereinbarung? Der Betriebsrat; die JAV bringt die Anliegen der von ihr vertretenen Gruppe ein."
  ],
  "pruefungsbezug": "Bei Beteiligungsfällen zuerst die Personengruppe und dann das zuständige Organ bestimmen. Der Merksatz ‚JAV vertritt, Betriebsrat entscheidet‘ verhindert die häufigste Verwechslung.",
  "merksatz": "Die JAV bringt Azubi-Themen ein; der Betriebsrat besitzt das Beschluss- und Mitbestimmungsrecht."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Der Betrieb von innen

**Datei:** `lf1-k5-betrieb-innen.kapitel.json` · SHA-256 `f2f56fce66742807be2e8a13b570bf18d77d2dc6637d322d24ee953cef73b8ca`

**Konkreter Kapitelauftrag:** Den Weg einer Kundenanfrage durch die Abteilungen erklären; Zuständigkeiten, Weisungswege und Zielkonflikte sichtbar machen.

**Einordnung:** Produktionsfaktoren, Ziele, Aufbauorganisation — und wie weit deine Unterschrift reicht.

### e1 · Womit ein Betrieb arbeitet

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die betrieblichen Produktionsfaktoren benennen und zuordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e1",
  "titel": "Womit ein Betrieb arbeitet",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jeder Betrieb kombiniert dieselben Grundmittel, um eine Leistung zu erzeugen. Diese {{begriff:produktionsfaktoren|Produktionsfaktoren}} sind die betriebswirtschaftliche Antwort auf die Frage, was ein Unternehmen eigentlich braucht — und sie tauchen im Rahmenlehrplan ausdrücklich unter dem Blickwinkel der Nachhaltigkeit auf."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Faktor",
        "Was gemeint ist",
        "Beispiel im Büro"
      ],
      "zeilen": [
        {
          "zellen": [
            "Menschliche Arbeit",
            "ausführende Tätigkeit",
            "Rechnungen kontieren, Termine koordinieren"
          ]
        },
        {
          "zellen": [
            "Betriebsmittel",
            "was genutzt, aber nicht verbraucht wird",
            "Laptop, Gebäude, Software-Lizenz"
          ]
        },
        {
          "zellen": [
            "Werkstoffe",
            "was verbraucht oder eingebaut wird",
            "Papier, Toner, Handelsware"
          ]
        },
        {
          "zellen": [
            "Dispositive Arbeit",
            "planen, leiten, entscheiden, kontrollieren",
            "Budgetplanung, Personaleinsatz"
          ],
          "detail": "**Der vierte Faktor ist der besondere:** Er verbindet die drei anderen. Erst die dispositive Arbeit entscheidet, welche Werkstoffe mit welchen Betriebsmitteln von welchen Menschen bearbeitet werden. In manchen Lehrbüchern heißt er deshalb auch der kombinierende Faktor."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Beim Einsatz dieser Faktoren gilt das {{begriff:oekonomisches-prinzip|ökonomische Prinzip}}. Es hat zwei Ausprägungen, und die werden in der Prüfung gern vertauscht: ==Maximalprinzip== heißt, mit gegebenen Mitteln möglichst viel zu erreichen. ==Minimalprinzip== heißt, ein festes Ziel mit möglichst wenig Mitteln zu erreichen."
    },
    {
      "typ": "merke",
      "text": "Vier Faktoren: menschliche Arbeit, Betriebsmittel, Werkstoffe — und dispositive Arbeit, die die anderen drei kombiniert. Betriebsmittel werden **genutzt**, Werkstoffe werden **verbraucht**.",
      "karteikarte": "Nenne die vier betrieblichen Produktionsfaktoren und den Unterschied zwischen Betriebsmitteln und Werkstoffen."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "e1",
  "vorauswissen": [
    "Ein Betrieb kombiniert mehrere Mittel, um Leistungen zu erstellen.",
    "Wirtschaften bedeutet, knappe Mittel zielgerichtet einzusetzen."
  ],
  "erklaerung": "Zu den Produktionsfaktoren gehören menschliche Arbeit, Betriebsmittel, Werkstoffe und dispositive Arbeit. Betriebsmittel werden im Leistungsprozess genutzt, etwa Gebäude oder Laptops; Werkstoffe gehen in die Leistung ein oder werden verbraucht. Die dispositive Arbeit plant, entscheidet und steuert. Das ökonomische Prinzip beschreibt dazu das Verhältnis von Ziel und Mitteleinsatz: Beim Maximalprinzip ist der Mitteleinsatz gegeben, beim Minimalprinzip das Ziel.",
  "beispiele": [
    "Ein Laptop wird über längere Zeit für die Büroarbeit genutzt und ist deshalb ein Betriebsmittel; Papier und Toner werden verbraucht und sind Werkstoffe.",
    "Beim Maximalprinzip soll mit gegebenen Mitteln möglichst viel erreicht werden. Beim Minimalprinzip soll ein festes Ergebnis mit möglichst wenig Mitteln erreicht werden."
  ],
  "fallbeispiel": "Ein Büro hat ein festes Budget für die Bearbeitung eines Kundenauftrags. Der Laptop und die Räume bleiben nutzbar, Papier und Toner werden für den Auftrag eingesetzt, und eine Mitarbeitende plant die Reihenfolge der Arbeitsschritte. Die Zuordnung lautet Betriebsmittel, Werkstoffe und menschliche beziehungsweise dispositive Arbeit. Wird mit dem Budget die größtmögliche Zahl bearbeiteter Vorgänge angestrebt, liegt ein Maximalprinzip vor.",
  "typische_fehler": "Alles, was im Betrieb vorhanden ist, wird als Werkstoff bezeichnet. Entscheidend ist aber der Verbrauch im Leistungsprozess. Außerdem werden Maximal- und Minimalprinzip über die Wörter ‚mehr‘ und ‚weniger‘ statt über die gegebene Größe unterschieden.",
  "verstaendnisfragen": [
    "Was unterscheidet Betriebsmittel und Werkstoffe? Betriebsmittel werden genutzt und bleiben länger verfügbar; Werkstoffe werden verbraucht oder gehen in die Leistung ein.",
    "Was ist beim Minimalprinzip fest vorgegeben? Das angestrebte Ergebnis; minimiert werden die dafür eingesetzten Mittel."
  ],
  "pruefungsbezug": "Markiere in Zuordnungsaufgaben die Verben: ‚nutzen‘ weist auf Betriebsmittel, ‚verbrauchen‘ auf Werkstoffe. Beim ökonomischen Prinzip markiere, ob Mittel oder Ergebnis gegeben ist.",
  "merksatz": "Betriebsmittel bleiben, Werkstoffe gehen; Maximalprinzip maximiert das Ergebnis, Minimalprinzip minimiert die Mittel."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e2 · Wer wem etwas zu sagen hat

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Aufbauorganisation eines Betriebs lesen und darstellen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `vertiefung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e2",
  "titel": "Wer wem etwas zu sagen hat",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:aufbauorganisation|Aufbauorganisation}} beantwortet die Frage nach dem **Wer**: Welche Stellen gibt es, wie sind sie zu Abteilungen gebündelt, wer darf wem Weisungen erteilen. Dargestellt wird sie im {{begriff:organigramm|Organigramm}}. Ihr Gegenstück ist die {{begriff:ablauforganisation|Ablauforganisation}}, die nach dem **Wann und Wie** fragt."
    },
    {
      "typ": "grafik",
      "variante": "organigramm",
      "kopf": "Aufbauorganisation",
      "titel": "Nordlicht Bürobedarf GmbH",
      "lead": "Ein Einliniensystem mit Stabsstelle. Klick auf eine Stelle für die Erläuterung.",
      "ebenen": [
        {
          "stellen": [
            {
              "id": "gf",
              "name": "Geschäftsführung",
              "art": "leitung",
              "notiz": "Die Instanzenspitze. Sie trägt die dispositive Arbeit und vertritt den Betrieb nach außen."
            }
          ]
        },
        {
          "stab": [
            {
              "id": "recht",
              "name": "Rechtsabteilung",
              "art": "stab",
              "notiz": "Eine Stabsstelle berät, hat aber keine Weisungsbefugnis gegenüber den Abteilungen. Sie hängt seitlich an der Linie — genau daran erkennt man sie im Organigramm."
            }
          ],
          "stellen": [
            {
              "id": "einkauf",
              "name": "Einkauf",
              "art": "abteilung",
              "notiz": "Beschaffung von Handelsware und Betriebsmitteln. Zuständig für Lernfeld 4."
            },
            {
              "id": "vertrieb",
              "name": "Vertrieb",
              "art": "abteilung",
              "notiz": "Angebote, Aufträge, Kundenbeziehungen. Zuständig für die Lernfelder 3 und 5."
            },
            {
              "id": "verwaltung",
              "name": "Verwaltung",
              "art": "abteilung",
              "notiz": "Rechnungswesen, Personal, Organisation. Hier sind die meisten Kaufleute für Büromanagement zu Hause."
            }
          ]
        },
        {
          "stellen": [
            {
              "id": "buchhaltung",
              "name": "Buchhaltung",
              "art": "stelle",
              "eltern": "verwaltung",
              "notiz": "Erfasst die Wertströme des Betriebs — das ist Lernfeld 6."
            },
            {
              "id": "personal",
              "name": "Personal",
              "art": "stelle",
              "eltern": "verwaltung",
              "notiz": "Personalbeschaffung, Entgeltabrechnung, Personalakten — Lernfeld 8."
            },
            {
              "id": "assistenz",
              "name": "Assistenz",
              "art": "stelle",
              "eltern": "verwaltung",
              "notiz": "Termine, Korrespondenz, Veranstaltungen und Reisen — Lernfelder 2 und 12."
            }
          ]
        }
      ],
      "regel": "Einliniensystem: Jede Stelle hat genau einen direkten Vorgesetzten. Klar, aber langsam — jede Information muss den ganzen Dienstweg gehen."
    },
    {
      "typ": "vertiefung",
      "titel": "Einlinien-, Mehrlinien-, Stabliniensystem",
      "absaetze": [
        "Im **Einliniensystem** erhält jede Stelle Weisungen von genau einem Vorgesetzten. Das ist eindeutig und leicht zu kontrollieren, macht die Wege aber lang.",
        "Im **Mehrliniensystem** kann eine Stelle von mehreren Fachvorgesetzten Weisungen bekommen. Das ist schneller und fachlich besser, erzeugt aber Zuständigkeitskonflikte.",
        "Das **Stabliniensystem** ist der Kompromiss: eine klare Linie plus Stabsstellen, die beraten, aber nicht anweisen dürfen. Genau das zeigt das Organigramm oben."
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
    "Organisation verteilt Aufgaben und Zuständigkeiten.",
    "Aufbau und Ablauf beantworten unterschiedliche Fragen."
  ],
  "erklaerung": "Die Aufbauorganisation zeigt, wer wem zugeordnet ist und welche Stellen bestehen. Die Ablauforganisation beschreibt, wann und wie Arbeitsschritte aufeinanderfolgen. Stabsstellen beraten die Linienstellen, besitzen aber grundsätzlich keine eigene Weisungsbefugnis. Ein Organigramm wird deshalb nicht nur nach Kästchen, sondern nach Linien und Funktionen gelesen.",
  "beispiele": [
    "Ein Organigramm mit Geschäftsführung, Abteilungen und Unterstellungen beschreibt die Aufbauorganisation.",
    "Die Reihenfolge ‚Anfrage prüfen, Angebot erstellen, Auftrag bestätigen‘ beschreibt einen Ablauf und nicht die hierarchische Zuordnung. Eine Rechtsabteilung, die Fachstellen berät, kann als Stabsstelle eingeordnet werden."
  ],
  "fallbeispiel": "Im Organigramm hängt die Rechtsabteilung seitlich an der Geschäftsführung und ist mit mehreren Abteilungen verbunden. Die Linien zeigen Beratung, nicht automatisch Weisung. Deshalb ist sie als Stabsstelle zu lesen. Die Frage ‚Wer berichtet an wen?‘ gehört zur Aufbauorganisation; die Frage ‚In welcher Reihenfolge wird bearbeitet?‘ zur Ablauforganisation.",
  "typische_fehler": "Ablauf und Aufbau werden nach demselben Schema beantwortet. Außerdem wird eine Stabsstelle wegen ihrer Nähe zur Geschäftsführung als vorgesetzte Linie missverstanden.",
  "verstaendnisfragen": [
    "Welche Frage stellt die Aufbauorganisation? Wer ist wem zugeordnet beziehungsweise wer hat welche Stelle und Weisungsbeziehung?",
    "Darf eine Stabsstelle automatisch Anweisungen geben? Nein. Sie berät grundsätzlich, ohne eigene Weisungsbefugnis."
  ],
  "pruefungsbezug": "Lies Organigramme mit zwei Markierungen: vertikale Zuordnung für Aufbau, zeitliche beziehungsweise sachliche Reihenfolge für Ablauf. Seitliche Beratungsstellen als Stab prüfen.",
  "merksatz": "Aufbau fragt ‚Wer?‘, Ablauf fragt ‚Wann und wie?‘, Stab berät statt anzuweisen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### e3 · Wie weit deine Unterschrift reicht

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Prokura und Handlungsvollmacht voneinander abgrenzen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "e3",
  "titel": "Wie weit deine Unterschrift reicht",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Nicht jeder im Betrieb darf für ihn Verträge schließen. Der Rahmenlehrplan nennt das deinen eigenen Handlungsrahmen — juristisch geht es um Vertretungsvollmachten. Die beiden wichtigsten kaufmännischen Formen sind {{begriff:prokura|Prokura}} und {{begriff:handlungsvollmacht|Handlungsvollmacht}}."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Vollmachten",
      "titel": "Prokura gegen Handlungsvollmacht",
      "lead": "Beide erlauben, für den Betrieb zu handeln — aber in sehr unterschiedlichem Umfang.",
      "seiten": [
        {
          "name": "Prokura",
          "ton": "gold",
          "punkte": [
            {
              "text": "Umfang gesetzlich festgelegt und sehr weit",
              "detail": "Sie deckt fast alle Geschäfte ab, die ein Handelsgewerbe mit sich bringt — auch ungewöhnliche. Nach außen ist sie nicht beschränkbar."
            },
            {
              "text": "Nur vom Inhaber ausdrücklich erteilbar",
              "detail": "Nach {{par:hgb-48|§ 48 HGB}}. Eine stillschweigende Prokura gibt es nicht."
            },
            {
              "text": "Eintragung ins Handelsregister",
              "detail": "Deklaratorisch, also nur klarstellend — wirksam ist sie schon mit der Erteilung. Aber jeder Geschäftspartner kann sie im Register nachschlagen."
            },
            {
              "text": "Zeichnung mit ppa.",
              "detail": "Von lateinisch per procura autoritate. Wer so unterschreibt, gibt sich als Prokurist zu erkennen."
            },
            {
              "text": "Nicht erlaubt: Grundstücke veräußern, Bilanz unterzeichnen, Insolvenz anmelden",
              "detail": "Diese Geschäfte bleiben dem Inhaber vorbehalten. Grundstücksverkäufe nur mit ausdrücklicher Zusatzbefugnis."
            }
          ]
        },
        {
          "name": "Handlungsvollmacht",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Umfang: gewöhnliche Geschäfte",
              "detail": "Nach {{par:hgb-54|§ 54 HGB}} deckt sie das ab, was der Betrieb üblicherweise mit sich bringt — nichts Außergewöhnliches."
            },
            {
              "text": "Formlos erteilbar, auch stillschweigend",
              "detail": "Wer im Einkauf sitzt und regelmäßig bestellt, hat faktisch Handlungsvollmacht, auch ohne Schreiben."
            },
            {
              "text": "Keine Eintragung ins Handelsregister",
              "detail": "Deshalb ist sie für Außenstehende schwerer zu erkennen."
            },
            {
              "text": "Zeichnung mit i. V. oder i. A.",
              "detail": "In Vollmacht bei allgemeiner Handlungsvollmacht, im Auftrag bei enger begrenzten Befugnissen."
            },
            {
              "text": "Drei Stufen",
              "detail": "Allgemein für den ganzen Betrieb, Art-Vollmacht für einen bestimmten Geschäftsbereich, Spezial-Vollmacht für ein einzelnes Geschäft."
            }
          ]
        }
      ],
      "regel": "Faustregel: Prokura steht im Handelsregister und zeichnet mit ppa. Handlungsvollmacht steht nirgends und zeichnet mit i. V. oder i. A."
    },
    {
      "typ": "check",
      "frage": "Eine Auszubildende bestellt für ihre Abteilung regelmäßig Büromaterial. Welche Vertretungsmacht hat sie?",
      "optionen": [
        {
          "text": "Prokura",
          "richtig": false,
          "echo": "Prokura muss ausdrücklich vom Inhaber erteilt und ins Handelsregister eingetragen werden. Beides passiert bei einer Azubi-Bestellung nicht."
        },
        {
          "text": "Handlungsvollmacht, konkret eine Art-Vollmacht",
          "richtig": true,
          "echo": "Richtig. Sie handelt im Rahmen der gewöhnlichen Geschäfte eines abgegrenzten Bereichs. Diese Vollmacht kann formlos und sogar stillschweigend entstehen — dadurch, dass der Betrieb sie regelmäßig bestellen lässt."
        },
        {
          "text": "Gar keine, weil sie Auszubildende ist",
          "richtig": false,
          "echo": "Der Ausbildungsstatus schließt Vertretungsmacht nicht aus. Entscheidend ist, welche Aufgaben der Betrieb tatsächlich überträgt — und wie das für Außenstehende aussieht."
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
    "Eine Unterschrift kann den Betrieb rechtlich binden.",
    "Vollmachten unterscheiden sich nach Umfang und Erteilung."
  ],
  "erklaerung": "Die Prokura wird ausdrücklich vom Inhaber erteilt, ins Handelsregister eingetragen und mit ppa. gezeichnet. Sie umfasst nahezu alle Geschäfte eines Handelsgewerbes, aber nicht ohne besondere Ermächtigung die Veräußerung oder Belastung von Grundstücken. Die Handlungsvollmacht kann formlos erteilt werden, deckt gewöhnliche Geschäfte ab und wird mit i. V. oder i. A. gezeichnet.",
  "beispiele": [
    "Die Unterschrift ppa. signalisiert Prokura; i. V. oder i. A. weist auf Handlungsvollmacht hin. Die Schreibweise ersetzt aber nicht die Prüfung des tatsächlichen Umfangs.",
    "Ein Prokurist kann gewöhnliche Geschäfte des Handelsgewerbes vornehmen, darf aber ein Betriebsgrundstück nicht ohne besondere Ermächtigung verkaufen."
  ],
  "fallbeispiel": "Ein Prokurist verkauft ohne Rücksprache ein Betriebsgrundstück. Der Fall wird nicht nur über die Unterschrift gelöst: Prokura ist zwar weitreichend, die Veräußerung und Belastung von Grundstücken ist aber ausdrücklich ausgenommen. Ohne besondere Ermächtigung reicht die Prokura dafür nicht. Bei der Gegenüberstellung sind Umfang, Erteilung und Handelsregistereintragung zu prüfen.",
  "typische_fehler": "Prokura wird als grenzenlose Vollmacht verstanden. Umgekehrt wird Handlungsvollmacht wegen der Formlosigkeit als bedeutungslos angesehen. Beide Vollmachten binden im jeweiligen Umfang; sie unterscheiden sich vor allem in Reichweite, Erteilung und Publizität.",
  "verstaendnisfragen": [
    "Welche drei Achsen helfen beim Vergleich? Umfang, Art der Erteilung und Eintragung beziehungsweise Zeichnung.",
    "Was ist bei einem Grundstücksgeschäft trotz Prokura zusätzlich nötig? Eine besondere Ermächtigung."
  ],
  "pruefungsbezug": "Bei Vollmachtsfällen nicht nur ppa., i. V. oder i. A. ablesen. Erst Vollmachtsart bestimmen, dann Geschäft auf gewöhnlich oder ausgenommen prüfen.",
  "merksatz": "Prokura ist weit und eingetragen; Handlungsvollmacht ist formlos und auf gewöhnliche Geschäfte begrenzt."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Der Betrieb in der Wirtschaft

**Datei:** `lf1-k6-wirtschaftskreislauf.kapitel.json` · SHA-256 `c39490e3460f481a2f129b67c156ced21cfe6e26db003294ecf009c55556dde4`

**Konkreter Kapitelauftrag:** MAKELs Kauf von Material im Wirtschaftskreislauf verfolgen; Geld-/Güterstrom und nachhaltige Produktionsfaktoren unterscheiden.

**Einordnung:** Bedürfnisse, Arbeitsteilung und der Wirtschaftskreislauf — wo dein Betrieb im Ganzen steht.

### f1 · Warum überhaupt gewirtschaftet wird

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Bedürfnisse, Bedarf und Nachfrage voneinander abgrenzen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `tabelle-2`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f1",
  "titel": "Warum überhaupt gewirtschaftet wird",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Am Anfang jeder wirtschaftlichen Überlegung steht ein {{begriff:beduerfnis|Bedürfnis}}: das Gefühl eines Mangels. Da Bedürfnisse praktisch unbegrenzt sind, die Mittel zu ihrer Befriedigung aber knapp, muss gewirtschaftet werden. ==Knappheit ist der Grund, warum es Wirtschaft überhaupt gibt.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Stufe",
        "Bedeutung",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Bedürfnis",
            "Gefühl eines Mangels",
            "Ich hätte gern ein Notebook"
          ]
        },
        {
          "zellen": [
            "Bedarf",
            "Bedürfnis plus Kaufkraft",
            "Ich habe 900 € und will ein Notebook"
          ]
        },
        {
          "zellen": [
            "Nachfrage",
            "Bedarf, der am Markt auftritt",
            "Ich gehe in den Laden und kaufe"
          ],
          "detail": "**Warum die Kette für den Vertrieb zählt:** Werbung kann ein Bedürfnis wecken, aber ohne Kaufkraft wird daraus kein Bedarf — und ohne Marktzugang keine Nachfrage. Genau darum geht es später in Lernfeld 5."
        }
      ]
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Einteilung",
        "Arten",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Nach Dringlichkeit",
            "Existenz-, Kultur-, Luxusbedürfnis",
            "Brot · Kino · Sportwagen"
          ]
        },
        {
          "zellen": [
            "Nach Trägerschaft",
            "Individual- und Kollektivbedürfnis",
            "eigene Wohnung · Straßenbeleuchtung"
          ]
        },
        {
          "zellen": [
            "Güter nach Verfügbarkeit",
            "freie und wirtschaftliche Güter",
            "Atemluft · alles mit Preisschild"
          ]
        },
        {
          "zellen": [
            "Güter nach Verwendung",
            "Konsum- und Produktionsgüter",
            "Kaffee zu Hause · Kaffeemaschine im Betrieb"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Bedürfnis → Bedarf → Nachfrage. Der Unterschied zwischen den ersten beiden ist die **Kaufkraft**, der zwischen den letzten beiden der **Marktauftritt**.",
      "karteikarte": "Wie unterscheiden sich Bedürfnis, Bedarf und Nachfrage?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f1",
  "vorauswissen": [
    "Menschen haben mehr Wünsche, als mit den vorhandenen Mitteln gleichzeitig erfüllt werden können.",
    "Wirtschaften bedeutet, mit knappen Mitteln Bedürfnisse zu befriedigen."
  ],
  "erklaerung": "Ein Bedürfnis ist das Gefühl eines Mangels mit dem Wunsch, ihn zu beseitigen. Wird daraus Kaufkraft, entsteht Bedarf. Tritt dieser Bedarf am Markt tatsächlich auf, spricht man von Nachfrage. Die Stufen beschreiben also nicht drei verschiedene Wünsche, sondern drei Grade der wirtschaftlichen Konkretisierung.",
  "beispiele": [
    "Der Wunsch nach einem neuen Laptop ist zunächst ein Bedürfnis. Mit ausreichendem Geld wird er zum Bedarf; mit einer konkreten Suche und Bestellung am Markt zur Nachfrage.",
    "Luft kann als freies Gut gelten, während ein entgeltlich zu beschaffendes Büroprogramm ein wirtschaftliches Gut ist. Konsumgüter dienen der unmittelbaren Nutzung, Produktionsgüter der Leistungserstellung."
  ],
  "fallbeispiel": "Eine Auszubildende möchte ein Fahrrad, hat aber noch kein Geld dafür. Die Einordnung lautet Bedürfnis. Nach dem Sparen mit ausreichender Kaufkraft wird daraus Bedarf. Erst wenn sie im Geschäft konkret nach einem Modell fragt oder es bestellt, liegt Nachfrage vor. Die Kaufkraft trennt Bedürfnis und Bedarf; der tatsächliche Marktauftritt trennt Bedarf und Nachfrage.",
  "typische_fehler": "Bedürfnis und Bedarf werden als Synonyme benutzt. Ebenso wird jede Kaufabsicht schon als Nachfrage bezeichnet. Für die Nachfrage muss der Bedarf am Markt auftreten.",
  "verstaendnisfragen": [
    "Was kommt zum Bedürfnis hinzu, damit Bedarf entsteht? Kaufkraft.",
    "Was macht aus Bedarf Nachfrage? Das tatsächliche Auftreten am Markt, etwa durch eine konkrete Anfrage oder Bestellung."
  ],
  "pruefungsbezug": "Unterstreiche in einer Fallaufgabe die Signalwörter Wunsch, Kaufkraft und Marktauftritt. Daraus ergibt sich meist direkt die richtige Stufe.",
  "merksatz": "Bedürfnis + Kaufkraft = Bedarf; Bedarf am Markt = Nachfrage."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f2 · Arbeitsteilung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Arten und Wirkungen der Arbeitsteilung erklären

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f2",
  "titel": "Arbeitsteilung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Kein Betrieb stellt alles selbst her. {{begriff:arbeitsteilung|Arbeitsteilung}} bedeutet, dass ein Gesamtprozess in Teilaufgaben zerfällt, die verschiedene Personen oder Betriebe übernehmen. Das steigert die Produktivität erheblich — und erzeugt Abhängigkeit."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Was geteilt wird",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Berufsbildung",
            "Menschen spezialisieren sich auf Berufe",
            "Kauffrau für Büromanagement statt Alleskönner"
          ]
        },
        {
          "zellen": [
            "Betriebliche Arbeitsteilung",
            "Aufgaben innerhalb eines Betriebs",
            "Einkauf, Vertrieb, Buchhaltung getrennt"
          ]
        },
        {
          "zellen": [
            "Volkswirtschaftliche Arbeitsteilung",
            "Betriebe spezialisieren sich auf Stufen",
            "Rohstoff, Produktion, Handel"
          ]
        },
        {
          "zellen": [
            "Internationale Arbeitsteilung",
            "Länder spezialisieren sich",
            "Bauteile aus mehreren Ländern"
          ],
          "detail": "**Die Kehrseite ist Verwundbarkeit.** Je feiner die Arbeitsteilung, desto größer die Abhängigkeit von funktionierenden Lieferketten — und desto härter treffen Störungen. Der Rahmenlehrplan verlangt ausdrücklich, diese Wirkungen auch unter Nachhaltigkeitsgesichtspunkten zu beurteilen."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Was ist die wichtigste Voraussetzung dafür, dass Arbeitsteilung überhaupt funktioniert?",
      "optionen": [
        {
          "text": "Ein gemeinsames Rechtssystem",
          "richtig": false,
          "echo": "Hilfreich, aber nicht der Kern. Arbeitsteilung funktioniert auch über Rechtssysteme hinweg — internationale Lieferketten sind der beste Beweis."
        },
        {
          "text": "Tausch, und damit ein funktionierender Markt",
          "richtig": true,
          "echo": "Richtig. Wer sich spezialisiert, stellt nicht mehr her, was er selbst braucht. Er muss also tauschen können — meist über Geld als Tauschmittel. Ohne Markt wäre Spezialisierung sinnlos."
        },
        {
          "text": "Möglichst große Betriebe",
          "richtig": false,
          "echo": "Betriebsgröße ist eine Folge der Arbeitsteilung, keine Voraussetzung. Auch sehr kleine Betriebe sind hochspezialisiert und tauschen mit anderen."
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
    "Nicht jeder Betrieb erstellt alle Leistungen selbst.",
    "Spezialisierung verändert Produktivität und Abhängigkeit."
  ],
  "erklaerung": "Arbeitsteilung zerlegt einen Produktions- oder Geschäftsprozess in Teilaufgaben. Durch Spezialisierung steigt die Produktivität, weil Fähigkeiten und Abläufe gezielter eingesetzt werden können. Gleichzeitig entsteht Abhängigkeit: Jeder Beteiligte braucht die Leistungen der anderen. Damit die Teilprodukte zusammenfinden, ist Tausch über einen funktionierenden Markt erforderlich.",
  "beispiele": [
    "Im Büro bearbeitet eine Person den Posteingang, eine zweite erstellt Angebote und eine dritte prüft Rechnungen. Jede Aufgabe wird geübter, der Gesamtprozess hängt aber von allen Stationen ab.",
    "Ein Betrieb kauft eine Teilkomponente von einem anderen Unternehmen, statt sie selbst herzustellen. Die Spezialisierung kann die Produktivität erhöhen, schafft aber eine Abhängigkeit von Lieferung und Markt."
  ],
  "fallbeispiel": "Ein Unternehmen teilt den Auftragsprozess in Anfrage, Angebot, Bestellung und Rechnung auf. Die Mitarbeitenden werden an ihren Teilaufgaben schneller und sicherer. Fällt jedoch die Stelle für die Bestellung aus, stockt der Gesamtprozess. Die Lösung zeigt beide Wirkungen der Arbeitsteilung: höhere Produktivität und wachsende gegenseitige Abhängigkeit, die durch Tausch und Abstimmung aufgefangen werden muss.",
  "typische_fehler": "Arbeitsteilung wird nur als ‚mehr Personen‘ verstanden. Entscheidend ist die Aufteilung eines Prozesses in Teilaufgaben. Außerdem wird der Produktivitätsvorteil genannt, ohne die Abhängigkeit und die Notwendigkeit des Tauschs zu berücksichtigen.",
  "verstaendnisfragen": [
    "Warum kann Arbeitsteilung die Produktivität steigern? Weil sich Beteiligte spezialisieren und Abläufe gezielter bearbeiten.",
    "Warum braucht Arbeitsteilung einen Markt? Weil die spezialisierten Beteiligten ihre unterschiedlichen Leistungen tauschen müssen."
  ],
  "pruefungsbezug": "Nenne bei einer Bewertungsaufgabe immer beide Seiten: Produktivität als Vorteil, Abhängigkeit und Tauschbedarf als Folge.",
  "merksatz": "Spezialisierung macht schneller, Tausch verbindet die Spezialisten — und macht sie voneinander abhängig."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### f3 · Der Wirtschaftskreislauf

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** markt (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Den einfachen und den erweiterten Wirtschaftskreislauf darstellen

**Aufbauauftrag:** Modellannahmen, beobachtbare Daten und Wirkungskette verbinden; daraus eine begrenzte Empfehlung mit alternativer Erklärung entwickeln.

**Passender Gegenfall:** Eine Bedingung ändern oder eine andere Ursache der beobachteten Entwicklung prüfen.

**Darstellung:** Daten-/Szenarienvergleich; Aussage und Grenzen des vorhandenen Diagramms erläutern.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `zuordnen-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "f3",
  "titel": "Der Wirtschaftskreislauf",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der {{begriff:wirtschaftskreislauf|Wirtschaftskreislauf}} ist ein Modell: Es reduziert die gesamte Volkswirtschaft auf wenige Pole und die Ströme zwischen ihnen. Die zentrale Einsicht steckt in einem Satz: ==Jedem Güterstrom steht ein entgegengesetzter Geldstrom gegenüber.=="
    },
    {
      "typ": "grafik",
      "variante": "kreislauf",
      "kopf": "Modell",
      "titel": "Vom einfachen zum erweiterten Kreislauf",
      "lead": "Schalte die Pole nacheinander hinzu und sieh, wie das Modell wächst.",
      "pole": [
        {
          "id": "haushalte",
          "name": "Private Haushalte",
          "pos": "links"
        },
        {
          "id": "unternehmen",
          "name": "Unternehmen",
          "pos": "rechts"
        },
        {
          "id": "staat",
          "name": "Staat",
          "pos": "oben"
        },
        {
          "id": "banken",
          "name": "Banken",
          "pos": "unten"
        },
        {
          "id": "ausland",
          "name": "Ausland",
          "pos": "aussen"
        }
      ],
      "stufen": [
        {
          "name": "Einfacher Kreislauf",
          "text": "Nur zwei Pole. Haushalte stellen Arbeit bereit und erhalten dafür Einkommen; Unternehmen liefern Güter und erhalten dafür Konsumausgaben.",
          "pole": [
            "haushalte",
            "unternehmen"
          ],
          "stroeme": [
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "guter",
              "label": "Arbeitsleistung"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "geld",
              "label": "Löhne und Gehälter"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "guter",
              "label": "Güter und Dienstleistungen"
            },
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "geld",
              "label": "Konsumausgaben"
            }
          ]
        },
        {
          "name": "Mit Staat",
          "text": "Der Staat zieht Steuern von beiden Seiten ein und gibt Leistungen zurück — Infrastruktur, Bildung, Sozialleistungen, Subventionen.",
          "pole": [
            "haushalte",
            "unternehmen",
            "staat"
          ],
          "stroeme": [
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "guter",
              "label": "Arbeitsleistung"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "geld",
              "label": "Löhne und Gehälter"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "guter",
              "label": "Güter"
            },
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "geld",
              "label": "Konsumausgaben"
            },
            {
              "von": "haushalte",
              "nach": "staat",
              "art": "geld",
              "label": "Steuern"
            },
            {
              "von": "unternehmen",
              "nach": "staat",
              "art": "geld",
              "label": "Steuern"
            },
            {
              "von": "staat",
              "nach": "haushalte",
              "art": "guter",
              "label": "Sozialleistungen"
            },
            {
              "von": "staat",
              "nach": "unternehmen",
              "art": "guter",
              "label": "Subventionen, Aufträge"
            }
          ]
        },
        {
          "name": "Erweiterter Kreislauf",
          "text": "Banken sammeln Ersparnisse und geben sie als Kredite weiter. Das Ausland kommt über Importe und Exporte hinzu. Damit ist das Modell vollständig.",
          "pole": [
            "haushalte",
            "unternehmen",
            "staat",
            "banken",
            "ausland"
          ],
          "stroeme": [
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "guter",
              "label": "Arbeitsleistung"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "geld",
              "label": "Einkommen"
            },
            {
              "von": "unternehmen",
              "nach": "haushalte",
              "art": "guter",
              "label": "Güter"
            },
            {
              "von": "haushalte",
              "nach": "unternehmen",
              "art": "geld",
              "label": "Konsumausgaben"
            },
            {
              "von": "haushalte",
              "nach": "staat",
              "art": "geld",
              "label": "Steuern"
            },
            {
              "von": "unternehmen",
              "nach": "staat",
              "art": "geld",
              "label": "Steuern"
            },
            {
              "von": "staat",
              "nach": "haushalte",
              "art": "guter",
              "label": "Sozialleistungen"
            },
            {
              "von": "haushalte",
              "nach": "banken",
              "art": "geld",
              "label": "Ersparnisse"
            },
            {
              "von": "banken",
              "nach": "unternehmen",
              "art": "geld",
              "label": "Kredite"
            },
            {
              "von": "ausland",
              "nach": "unternehmen",
              "art": "guter",
              "label": "Importe"
            },
            {
              "von": "unternehmen",
              "nach": "ausland",
              "art": "guter",
              "label": "Exporte"
            }
          ]
        }
      ],
      "regel": "Prüfungsfrage Nummer eins: Zu jedem Güterstrom gehört ein Geldstrom in die Gegenrichtung. Wer einen Pfeil einzeichnet, muss den Gegenpfeil mitdenken."
    },
    {
      "typ": "zuordnen",
      "lead": "Güterstrom oder Geldstrom?",
      "kategorien": [
        "Güterstrom",
        "Geldstrom"
      ],
      "aufgaben": [
        {
          "text": "Ein Azubi arbeitet 8 Stunden im Betrieb.",
          "loesung": "Güterstrom"
        },
        {
          "text": "Der Betrieb überweist das Gehalt.",
          "loesung": "Geldstrom"
        },
        {
          "text": "Der Staat baut eine Straße.",
          "loesung": "Güterstrom"
        },
        {
          "text": "Ein Haushalt zahlt Einkommensteuer.",
          "loesung": "Geldstrom"
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Bei Kreislaufaufgaben zeichne zuerst die zwei Pole und die vier Pfeile des einfachen Kreislaufs — die sitzen dann sicher. Alles Weitere hängst du daran an. Und beschrifte jeden Pfeil: Ein unbeschrifteter Pfeil bringt in der Prüfung keinen Punkt."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "f3",
  "vorauswissen": [
    "Haushalte und Unternehmen tauschen Leistungen und Geld.",
    "Ein Güterstrom hat einen entgegengesetzten Geldstrom."
  ],
  "erklaerung": "Im einfachen Wirtschaftskreislauf stehen private Haushalte und Unternehmen gegenüber. Haushalte bieten Arbeitsleistung an und erhalten Löhne; Unternehmen liefern Güter und Dienstleistungen und erhalten Konsumausgaben. Der erweiterte Kreislauf ergänzt Staat, Banken und Ausland. Steuern, staatliche Leistungen, Ersparnisse, Kredite, Importe und Exporte erweitern die vier Grundströme.",
  "beispiele": [
    "Arbeitsleistung fließt vom Haushalt zum Unternehmen; Lohn fließt in der Gegenrichtung. Das ist ein Paar aus Güter- und Geldstrom.",
    "Beim Ausland gehören Import und Export zusammen. Bei Banken stehen Ersparnisse der Haushalte den Krediten an Unternehmen gegenüber."
  ],
  "fallbeispiel": "Eine Zeichnung soll den einfachen Kreislauf darstellen. Zuerst werden Haushalte und Unternehmen als zwei Pole eingetragen. Dann folgen vier Pfeile: Arbeitsleistung zum Unternehmen, Löhne zum Haushalt, Güter und Dienstleistungen zum Haushalt und Konsumausgaben zum Unternehmen. Erst danach werden im erweiterten Modell Staat, Banken und Ausland ergänzt; jeder Güterstrom erhält seinen entgegengesetzten Geldstrom.",
  "typische_fehler": "Geld- und Güterströme werden in dieselbe Richtung gezeichnet oder die vier Pfeile des einfachen Modells mit den Erweiterungen vermischt. Auch ein Pfeil ohne Beschriftung ist problematisch, weil die Stromart geprüft werden muss.",
  "verstaendnisfragen": [
    "Welche vier Ströme gehören in das einfache Modell? Arbeitsleistung, Löhne und Gehälter, Güter und Dienstleistungen sowie Konsumausgaben.",
    "Welche Pole ergänzt der erweiterte Kreislauf? Staat, Banken und Ausland."
  ],
  "pruefungsbezug": "Zeichne immer zuerst das einfache Zwei-Pole-Modell. Beschrifte jeden Pfeil als Güter- oder Geldstrom und ergänze die drei Erweiterungen erst im zweiten Schritt.",
  "merksatz": "Wo eine Leistung hinfließt, fließt eine Geldzahlung in die Gegenrichtung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k7 · Den Betrieb präsentieren

**Datei:** `lf1-k7-praesentieren.kapitel.json` · SHA-256 `aa3c38d0447e59020d33d21540740c0396a19c1fabbf66a6d853521c4401a786`

**Konkreter Kapitelauftrag:** Denselben Betrieb für neue Azubis und einen Lieferanten präsentieren; Informationsauswahl und Quellenbeleg begründen.

**Einordnung:** Quellen prüfen, Inhalt aufbauen, Regeln einhalten — und die eigene Präsentation bewerten.

### g1 · Quellen prüfen, bevor du sie benutzt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Informationsquellen recherchieren und ihre Validität beurteilen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g1",
  "titel": "Quellen prüfen, bevor du sie benutzt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Rahmenlehrplan verlangt ausdrücklich, die **Validität** von Informationen zu überprüfen — also ihre Belastbarkeit. Das ist mehr als googeln. {{begriff:quellenkritik|Quellenkritik}} heißt: vier Fragen an jede Quelle stellen, bevor sie in deine Präsentation kommt."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Frage",
        "Worauf du achtest"
      ],
      "zeilen": [
        {
          "zellen": [
            "Wer sagt es?",
            "Impressum, Autorenname, Institution. Anonyme Quellen sind keine Quellen"
          ]
        },
        {
          "zellen": [
            "Woher weiß die Person es?",
            "Eigene Erhebung, zitierte Studie oder nur abgeschrieben"
          ]
        },
        {
          "zellen": [
            "Wann wurde es veröffentlicht?",
            "Datum prüfen — bei Gesetzen und Zahlen entscheidend"
          ]
        },
        {
          "zellen": [
            "Wer profitiert davon?",
            "Werbung, Lobbyarbeit und Eigenwerbung sind keine neutralen Quellen"
          ],
          "detail": "**Das schließt die eigene Firmenwebsite nicht aus** — für die Selbstdarstellung des Betriebs ist sie sogar die beste Quelle. Du musst nur wissen, dass sie eine interessengeleitete ist, und darfst Werbeaussagen nicht als geprüfte Fakten weitergeben."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Für eine Betriebspräsentation sind die besten Quellen meist gar nicht im Netz: der Geschäftsbericht, das Organigramm aus K5, das Intranet — und Kolleginnen und Kollegen, die seit zwanzig Jahren dort arbeiten."
    },
    {
      "typ": "merke",
      "text": "Vier Fragen an jede Quelle: **Wer** sagt es, **woher** weiß er es, **wann** war das, **wem** nützt es. Wenn du eine davon nicht beantworten kannst, gehört die Information nicht in deine Präsentation.",
      "karteikarte": "Welche vier Fragen stellst du an jede Informationsquelle?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "g1",
  "vorauswissen": [
    "Eine Präsentation braucht nachvollziehbare und passende Informationen.",
    "Eine Quelle kann sachlich nützlich und zugleich interessengeleitet sein."
  ],
  "erklaerung": "Quellenkritik prüft nicht nur, ob ein Text professionell aussieht. Vier Fragen helfen: Wer sagt es? Woher weiß die Person oder Institution es? Wann wurde es veröffentlicht? Wem nützt die Aussage? Autor, Impressum, Erhebungsmethode und Veröffentlichungszeitpunkt zeigen die Einordnung; Werbung und Lobbymaterial können nützlich sein, sind aber nicht automatisch neutral.",
  "beispiele": [
    "Die eigene Firmenwebsite kann aktuelle Unternehmensdaten liefern. Weil das Unternehmen selbst von der Darstellung profitiert, muss die Quelle als interessengeleitet eingeordnet werden.",
    "Bei Gesetzen, Zahlen und Preisen wird das Veröffentlichungsdatum besonders wichtig. Eine alte Angabe darf nicht ungeprüft als aktuelle Information verwendet werden."
  ],
  "fallbeispiel": "Für eine Präsentation liegen ein Werbetext ohne Autor und eine Seite mit Institution, Impressum, Erhebungsmethode und Datum vor. Zuerst werden die vier Fragen auf beide Quellen angewendet. Der Werbetext kann als Unternehmenssicht verwendet werden, aber nicht als neutrale Bestätigung. Die zweite Quelle ist wegen nachvollziehbarer Herkunft, Methode und Zeitangabe besser prüfbar.",
  "typische_fehler": "Eine Quelle wird wegen eines professionellen Layouts für valide gehalten. Umgekehrt wird eine Firmenwebsite pauschal verworfen. Richtig ist, Herkunft und Interesse offenzulegen und die Quelle passend zur Aussage zu bewerten.",
  "verstaendnisfragen": [
    "Welche vier Fragen bilden die Quellenkritik? Wer, woher, wann und wem nützt die Aussage?",
    "Warum ist das Datum bei Preis- oder Rechtsangaben wichtig? Weil sich solche Angaben ändern können und eine alte Quelle den aktuellen Stand nicht belegt."
  ],
  "pruefungsbezug": "Notiere zu jeder verwendeten Quelle Autor oder Institution, Herkunft der Information, Datum und mögliches Interesse. So wird die Recherche im Vortrag nachvollziehbar.",
  "merksatz": "Wer, woher, wann, wem nützt — diese vier Fragen machen Quellen prüfbar."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### g2 · Aufbau und Gestaltung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine Präsentation aufbauen und die Gestaltungsregeln anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g2",
  "titel": "Aufbau und Gestaltung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine Präsentation hat eine feste Grundstruktur. Sie zu kennen spart Zeit, weil du nicht bei jedem Thema neu über den Ablauf nachdenken musst — sondern nur noch über den Inhalt."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Der Ablauf",
      "titel": "Fünf Phasen einer Präsentation",
      "lead": "Klick dich durch — jede Phase hat eine eigene Aufgabe.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Zielgruppe und Ziel klären",
          "satz": "vor der ersten Folie",
          "text": "Wer sitzt im Raum, was weiß die Person schon, was soll sie danach wissen oder tun? Ohne diese Antwort ist jede Folie geraten."
        },
        {
          "nr": 2,
          "titel": "Einstieg",
          "satz": "die ersten 30 Sekunden",
          "text": "Aufmerksamkeit gewinnen und den roten Faden ankündigen. Eine Zahl, eine Frage oder ein konkretes Beispiel wirken besser als eine Agenda-Folie."
        },
        {
          "nr": 3,
          "titel": "Hauptteil",
          "satz": "der rote Faden",
          "text": "Wenige Kernaussagen, jede mit einem Beleg. Nicht mehr als eine Aussage pro Folie — die Folie unterstützt dich, sie ersetzt dich nicht."
        },
        {
          "nr": 4,
          "titel": "Schluss",
          "satz": "Zusammenfassung und Ausblick",
          "text": "Die Kernbotschaft noch einmal, dann Raum für Fragen. Der letzte Satz bleibt hängen — überlass ihn nicht dem Zufall."
        },
        {
          "nr": 5,
          "titel": "Reflexion",
          "satz": "mit dem Kriterienkatalog",
          "text": "Nach der Präsentation bewerten, was funktioniert hat. Genau das verlangt der Rahmenlehrplan — und genau das überspringen die meisten."
        }
      ],
      "regel": "Der häufigste Fehler ist nicht schlechte Gestaltung, sondern eine ungeklärte Zielgruppe. Phase 1 entscheidet über alles Weitere."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Regel",
        "Konkret"
      ],
      "zeilen": [
        {
          "zellen": [
            "Eine Aussage pro Folie",
            "Die Überschrift formuliert die Aussage, nicht das Thema"
          ]
        },
        {
          "zellen": [
            "Wenig Text",
            "Stichworte statt Sätze — vorgelesene Folien sind der sicherste Weg zur Langeweile"
          ]
        },
        {
          "zellen": [
            "Lesbare Schrift",
            "Groß genug für die letzte Reihe, höchstens zwei Schriftarten"
          ]
        },
        {
          "zellen": [
            "Ruhige Gestaltung",
            "Einheitliche Farben, keine Effekte ohne Grund"
          ]
        },
        {
          "zellen": [
            "Diagramme statt Zahlenkolonnen",
            "Ein Balken sagt mehr als eine Tabelle mit 30 Werten"
          ],
          "detail": "**Aber die Achse muss bei null beginnen.** Ein abgeschnittener Nullpunkt lässt kleine Unterschiede riesig aussehen — das ist in einer Betriebspräsentation unseriös und in einer Prüfungspräsentation ein Abzug."
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
    "Eine Präsentation richtet sich an eine bestimmte Zielgruppe.",
    "Folien unterstützen den Vortrag, ersetzen ihn aber nicht."
  ],
  "erklaerung": "Ein klarer Präsentationsaufbau führt von Zielgruppe und Ziel über Einstieg und Hauptteil zum Schluss und zur Reflexion. Eine Folie sollte jeweils eine Aussage unterstützen. Diagramme müssen verständlich beschriftet werden; bei Diagrammachsen beginnt die Darstellung bei null. Lesbarkeit, ein roter Faden und ein passendes Verhältnis von Text und Vortrag sind wichtiger als möglichst viele Gestaltungseffekte.",
  "beispiele": [
    "Vor der Auswahl der Schrift und Farben wird geklärt, ob die Klasse einen Überblick oder eine Entscheidungshilfe braucht. Davon hängen Detailgrad und Fachsprache ab.",
    "Ein Diagramm mit einer Aussage pro Folie und einer bei null beginnenden Achse lässt Unterschiede nachvollziehbar erkennen. Die erklärenden Details gehören in den Vortrag."
  ],
  "fallbeispiel": "Eine Folie enthält fünf Aussagen, ein Diagramm mit abgeschnittener Achse und den vollständigen Vortragstext. Die Überarbeitung trennt die Aussagen auf passende Folien, setzt die Achse bei null an und kürzt den Text auf Stichwörter. Im Vortrag werden die Zusammenhänge erklärt; die Folie bleibt Orientierung statt Manuskript.",
  "typische_fehler": "Die Zielgruppe wird erst nach der Gestaltung berücksichtigt. Häufig sind Folien außerdem überfüllt oder Diagramme verzerren durch eine abgeschnittene Achse den Eindruck.",
  "verstaendnisfragen": [
    "Was ist vor dem Gestalten zu klären? Zielgruppe, Ziel und die zentrale Aussage der Präsentation.",
    "Warum soll eine Diagrammachse bei null beginnen? Damit Größenverhältnisse nicht optisch übertrieben oder verkürzt werden."
  ],
  "pruefungsbezug": "Prüfe Entwürfe in der Reihenfolge Zielgruppe, roter Faden, eine Aussage je Folie, Lesbarkeit und korrekte Diagrammdarstellung.",
  "merksatz": "Die Folie gibt Orientierung; der Vortrag erklärt die Aussage."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### g3 · Recht und Bewertung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Urheberrecht und Datenschutz bei Präsentationen berücksichtigen und einen Kriterienkatalog anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "g3",
  "titel": "Recht und Bewertung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Zwei Rechtsgebiete reden bei jeder Präsentation mit. Das {{begriff:urheberrecht|Urheberrecht}} schützt fremde Inhalte, der Datenschutz schützt Personen. ==Beides gilt auch für eine Schulpräsentation== — und erst recht, wenn sie im Betrieb gezeigt wird."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Rechtsgebiete",
      "titel": "Urheberrecht und Datenschutz",
      "lead": "Beide betreffen dieselbe Folie — aber aus unterschiedlichen Gründen.",
      "seiten": [
        {
          "name": "Urheberrecht",
          "ton": "gold",
          "punkte": [
            {
              "text": "Schützt Werke",
              "detail": "Texte, Fotos, Grafiken, Musik, Videos, Software — alles, was eine persönliche geistige Schöpfung ist."
            },
            {
              "text": "Ein Bild aus der Google-Suche ist nicht frei",
              "detail": "Die Suchmaschine zeigt es nur an. Rechte hat weiterhin der Urheber. Das ist der häufigste Fehler in Azubi-Präsentationen."
            },
            {
              "text": "Quellen angeben ersetzt keine Erlaubnis",
              "detail": "Ein Bildnachweis ist Pflicht, aber er macht eine unerlaubte Nutzung nicht erlaubt. Beides ist nötig."
            },
            {
              "text": "Sichere Wege",
              "detail": "Eigene Fotos, lizenzfreie Bilddatenbanken, Material des eigenen Betriebs oder ausdrücklich freie Lizenzen — Lizenzbedingungen trotzdem lesen."
            },
            {
              "text": "Firmenlogos sind zusätzlich markenrechtlich geschützt",
              "detail": "Das eigene Logo darfst du nach den Vorgaben des Corporate Design verwenden, fremde nicht ohne Weiteres."
            }
          ]
        },
        {
          "name": "Datenschutz",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Schützt Personen",
              "detail": "Alle Angaben, die sich auf eine identifizierbare Person beziehen — Name, Foto, Telefonnummer, Personalnummer."
            },
            {
              "text": "Fotos von Kolleginnen und Kollegen nur mit Einwilligung",
              "detail": "Und die Einwilligung ist freiwillig und widerruflich. Ein Gruppenfoto vom Betriebsfest ist kein Freibrief."
            },
            {
              "text": "Keine echten Personaldaten in Beispielen",
              "detail": "Wenn du eine Gehaltsabrechnung oder eine Kundenliste zeigen willst: anonymisieren oder erfinden."
            },
            {
              "text": "Datensparsamkeit",
              "detail": "Nur zeigen, was die Aussage wirklich braucht. Ein Organigramm funktioniert meist auch mit Funktionen statt Namen."
            },
            {
              "text": "Betriebsgeheimnisse bleiben drin",
              "detail": "Umsätze, Kundenlisten und Kalkulationen gehören nicht in eine Schulpräsentation — das ist zusätzlich deine Schweigepflicht aus § 13 BBiG."
            }
          ]
        }
      ],
      "regel": "Kurz: Urheberrecht fragt „darf ich dieses Werk benutzen?“, Datenschutz fragt „darf ich über diese Person sprechen?“"
    },
    {
      "typ": "absatz",
      "text": "Zum Schluss verlangt der Rahmenlehrplan etwas, das leicht zu übersehen ist: einen **Kriterienkatalog**, mit dem Präsentationen bewertet und reflektiert werden. Er wird vorher erstellt, nicht hinterher — sonst bewertet man nur den Eindruck."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kriterium",
        "Leitfrage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Inhalt",
            "War die Kernaussage klar und belegt?"
          ]
        },
        {
          "zellen": [
            "Struktur",
            "Gab es einen erkennbaren roten Faden?"
          ]
        },
        {
          "zellen": [
            "Medieneinsatz",
            "Haben die Folien unterstützt oder abgelenkt?"
          ]
        },
        {
          "zellen": [
            "Vortrag",
            "Sprechtempo, Blickkontakt, freie Rede?"
          ]
        },
        {
          "zellen": [
            "Zeit",
            "Wurde der Rahmen eingehalten?"
          ]
        },
        {
          "zellen": [
            "Rechtliches",
            "Quellen angegeben, Rechte geklärt?"
          ]
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Du findest über die Bildersuche ein passendes Foto und gibst darunter ordentlich die Quelle an. Ist das in Ordnung?",
      "optionen": [
        {
          "text": "Ja, mit Quellenangabe ist alles erlaubt",
          "richtig": false,
          "echo": "Ein verbreiteter Irrtum. Die Quellenangabe erfüllt eine eigene Pflicht, ersetzt aber nicht die Nutzungserlaubnis. Beides ist nötig."
        },
        {
          "text": "Nein, du brauchst zusätzlich eine Nutzungserlaubnis",
          "richtig": true,
          "echo": "Richtig. Das Urheberrecht schützt das Bild unabhängig davon, wo du es gefunden hast. Du brauchst eine Lizenz oder eine ausdrückliche Erlaubnis — und gibst zusätzlich die Quelle an. Sicherer sind eigene Fotos oder Material aus dem Betrieb."
        },
        {
          "text": "Ja, weil es nur eine Schulpräsentation ist",
          "richtig": false,
          "echo": "Für den Unterricht gibt es eng begrenzte gesetzliche Ausnahmen, aber sie decken keineswegs alles ab — und sobald die Präsentation im Betrieb gezeigt oder verschickt wird, greifen sie ohnehin nicht mehr."
        }
      ]
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "g3",
  "vorauswissen": [
    "Texte, Bilder, Grafiken, Musik und Videos können geschützt sein.",
    "Namen, Fotos und andere Angaben können personenbezogene Daten sein."
  ],
  "erklaerung": "Urheberrecht und Datenschutz beantworten unterschiedliche Fragen. Das Urheberrecht schützt Werke und klärt, ob ein Material genutzt werden darf; eine Quellenangabe ersetzt keine Nutzungserlaubnis. Der Datenschutz schützt Personen und ihre Daten. Fotos von Kolleginnen und Kollegen benötigen eine Einwilligung, und echte Personaldaten gehören nicht ungeprüft in Beispiele. Für die Bewertung wird der Kriterienkatalog vor der Präsentation festgelegt.",
  "beispiele": [
    "Ein Bild aus dem Internet wird nicht allein durch einen Bildnachweis frei nutzbar; die Nutzungserlaubnis muss zusätzlich geprüft werden.",
    "Im Organigramm kann statt des Namens die Funktionsbezeichnung ‚Leitung Einkauf‘ verwendet werden. So werden weniger personenbezogene Daten gezeigt."
  ],
  "fallbeispiel": "Eine Präsentation soll Namen aller Abteilungsleitungen und Umsatzzahlen des letzten Jahres zeigen. Namen sind personenbezogene Daten; aus Gründen der Datensparsamkeit werden zunächst nur Funktionen verwendet. Umsatzzahlen können Betriebsgeheimnisse sein und dürfen nur mit Freigabe oder aus einer ohnehin veröffentlichten Quelle aufgenommen werden. Zusätzlich wird für jedes Bild die Nutzungserlaubnis geprüft.",
  "typische_fehler": "Quellenangabe und Nutzungserlaubnis werden gleichgesetzt. Außerdem werden Datenschutz und Urheberrecht vermischt oder Kriterien erst nach dem Vortrag so gewählt, dass das Ergebnis besser aussieht.",
  "verstaendnisfragen": [
    "Was schützt das Urheberrecht, was der Datenschutz? Das Urheberrecht schützt Werke; der Datenschutz schützt Personen und zuordenbare Angaben.",
    "Wann wird der Kriterienkatalog erstellt? Vor der Präsentation, damit die Bewertung nachvollziehbar und nicht nachträglich angepasst wird."
  ],
  "pruefungsbezug": "Trenne bei jedem Material die Prüfungen: Darf ich dieses Werk nutzen? Und: Darf ich diese Person beziehungsweise dieses Datum zeigen? Danach Kriterienkatalog und Freigaben dokumentieren.",
  "merksatz": "Urheberrecht schützt Werke, Datenschutz schützt Personen; der Kriterienkatalog steht vor der Bewertung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
