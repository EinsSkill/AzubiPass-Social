# lf7 · Gesprächssituationen gestalten

Quelle: `quellen/lf7.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 4 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Wie Kommunikation funktioniert

**Datei:** `lf7-k1-grundlagen.kapitel.json` · SHA-256 `17c517a5decf70fd501cab412386f0a22dadc105ac8984569144e31a7bc5a9fa`

**Konkreter Kapitelauftrag:** Eine fehlgeschlagene Nachricht aus Sender-, Empfänger- und Kanalsicht untersuchen; Beobachtung und Vermutung trennen.

**Einordnung:** Vom Gedanken zum Verstandenen — und was unterwegs verloren geht.

### a1 · Der Weg einer Nachricht

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Das Sender-Empfänger-Modell erklären und Störquellen benennen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a1",
  "titel": "Der Weg einer Nachricht",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:kommunikation|Kommunikation}} ist nicht gelungen, weil etwas gesagt wurde, sondern erst, wenn beim Empfänger ankommt, was gemeint war. ==Zwischen beidem liegen vier Stationen==, und an jeder kann die Nachricht sich verändern."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Das Grundmodell",
      "titel": "Sender, Kanal, Empfänger",
      "lead": "Vier Schritte, vier Fehlerquellen. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Der Sender hat einen Gedanken",
          "satz": "noch ohne Worte",
          "text": "Was gemeint ist, existiert zunächst nur im Kopf. Schon hier entscheidet sich, ob der Gedanke überhaupt klar ist — unklare Gedanken lassen sich nicht klar sagen."
        },
        {
          "nr": 2,
          "titel": "Er verschlüsselt ihn",
          "satz": "Kodierung",
          "text": "Der Gedanke wird in Worte, Tonfall und Gesten übersetzt. Der Sender benutzt dabei sein eigenes Wörterbuch aus Erfahrung, Beruf und Herkunft."
        },
        {
          "nr": 3,
          "titel": "Die Nachricht läuft über einen Kanal",
          "satz": "Gespräch · Telefon · Mail",
          "text": "Jeder Kanal lässt etwas weg. Am Telefon fehlt die Mimik, in der Mail zusätzlich der Tonfall. Genau deshalb eskalieren Mails schneller als Gespräche."
        },
        {
          "nr": 4,
          "titel": "Der Empfänger entschlüsselt",
          "satz": "Dekodierung",
          "text": "Er übersetzt zurück — mit seinem Wörterbuch, nicht mit deinem. Erst hier entsteht die Bedeutung, und sie muss nicht die gemeinte sein."
        }
      ],
      "regel": "Die Nachricht, die ankommt, wird vom Empfänger gemacht — nicht vom Sender. Deshalb ist Nachfragen keine Schwäche, sondern die einzige Kontrolle, die es gibt."
    },
    {
      "typ": "merke",
      "text": "Gemeint ist nicht gesagt, gesagt ist nicht gehört, gehört ist nicht verstanden. Wer sicher sein will, lässt sich das Verstandene wiederholen.",
      "karteikarte": "Welche vier Stationen durchläuft eine Nachricht, und wo entsteht ihre Bedeutung?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "a1",
  "vorauswissen": [
    "Eine Nachricht beginnt mit einem Gedanken oder Anliegen des Senders.",
    "Sender und Empfänger können dieselben Wörter mit unterschiedlichen Erfahrungen verbinden."
  ],
  "ablauf": [
    "Der Sender entwickelt einen Gedanken.",
    "Er kodiert ihn in Worte, Tonfall und Gesten.",
    "Die Nachricht läuft über einen Kanal.",
    "Der Empfänger dekodiert sie mit seinem eigenen Deutungsrahmen."
  ],
  "erklaerung": "Die Bedeutung einer Nachricht entsteht nicht vollständig beim Senden. Schon ein unklarer Gedanke, eine unpassende Formulierung oder ein Kanal, der wichtige Signale weglässt, kann die Botschaft verändern. Beim Empfänger wird das Empfangene mit eigenen Erfahrungen entschlüsselt. Nachfragen und Zusammenfassen sind deshalb die Kontrolle, ob Gemeintes und Verstandenes übereinstimmen.",
  "beispiele": [
    "Eine kurze E-Mail kann sachlich gemeint sein, aber ohne Tonfall beim Empfänger härter ankommen.",
    "Ein Fachbegriff kann beim Sender selbstverständlich wirken, beim Empfänger aber eine andere Bedeutung oder gar keine klare Vorstellung auslösen."
  ],
  "fallbeispiel": "Eine Ausbilderin sagt: ‚Das brauche ich möglichst bald.‘ Der Sender meint vielleicht heute, der Empfänger versteht innerhalb der Woche. Der Fehler liegt nicht zwingend in der Absicht, sondern in der unklaren Kodierung. Die sichere Lösung lautet: ‚Meinst du heute bis 16 Uhr oder reicht morgen?‘ Damit wird die Dekodierung überprüft.",
  "typische_fehler": "Der Sender setzt voraus, dass seine Absicht automatisch angekommen ist. Ebenso falsch ist die Annahme, eine ausführliche Nachricht sei immer klarer; zusätzliche Wörter können die eigentliche Handlungsaufforderung verdecken.",
  "verstaendnisfragen": [
    "An welcher Stelle wird die Bedeutung endgültig hergestellt? Beim Empfänger während der Dekodierung.",
    "Warum ist Nachfragen keine Schwäche? Weil nur so geprüft wird, ob die entschlüsselte Bedeutung der gemeinten entspricht."
  ],
  "pruefungsbezug": "Die Begriffe Gedanke, Kodierung, Kanal und Dekodierung in der richtigen Reihenfolge erklären und an einer konkreten Störung anwenden.",
  "merksatz": "Gemeint ist nicht automatisch gesagt, gesagt nicht gehört und gehört nicht automatisch verstanden."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a2 · Drei Kanäle gleichzeitig

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Verbale, nonverbale und paraverbale Anteile unterscheiden

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a2",
  "titel": "Drei Kanäle gleichzeitig",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Wer spricht, sendet auf drei Kanälen zugleich. Der Wortlaut ist dabei der schwächste — ==widersprechen sich Wort und Körper, glaubt der Empfänger dem Körper==."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kanal",
        "Was dazugehört",
        "Wirkung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Verbal",
            "die Worte selbst",
            "trägt den Sachinhalt"
          ],
          "detail": "**Der einzige Kanal, den man vollständig steuern kann** — und der, auf den sich fast alle konzentrieren. Genau darum entstehen die meisten Missverständnisse auf den anderen beiden."
        },
        {
          "zellen": [
            "Paraverbal",
            "Lautstärke, Tempo, Betonung, Pausen",
            "färbt die Aussage"
          ],
          "detail": "**Probier es an einem Satz:** „Das haben Sie ja schön gemacht.“ Je nach Betonung ist das ein Lob oder ein Vorwurf. Der Wortlaut ist identisch."
        },
        {
          "zellen": [
            "Nonverbal",
            "Mimik, Gestik, Haltung, Blick, Abstand",
            "entscheidet über Glaubwürdigkeit"
          ],
          "detail": "**Am Telefon fällt dieser Kanal weg** — deshalb wirkt der paraverbale dort doppelt so stark. Lächeln hört man tatsächlich, weil es die Stimme verändert."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Eine Kollegin sagt mit verschränkten Armen und knappem Ton: „Kein Problem, mache ich.“ Was nimmt der Empfänger wahr?",
      "optionen": [
        {
          "text": "Zustimmung, weil sie es so gesagt hat",
          "richtig": false,
          "echo": "Der Wortlaut sagt Zustimmung, Körper und Ton sagen etwas anderes. Bei einem solchen Widerspruch glaubt der Empfänger fast nie den Worten."
        },
        {
          "text": "Einen Widerspruch — und er glaubt dem Körper",
          "richtig": true,
          "echo": "Richtig. Verbal, paraverbal und nonverbal widersprechen sich. In diesem Fall gewinnt der nonverbale Kanal, weil er als weniger steuerbar und damit ehrlicher gilt. Sinnvoll wäre jetzt, den Widerspruch anzusprechen statt ihn zu überhören."
        },
        {
          "text": "Nichts Besonderes, Körpersprache ist Auslegungssache",
          "richtig": false,
          "echo": "Einzelne Gesten sind tatsächlich mehrdeutig. Ein Widerspruch zwischen Wort und Auftreten ist aber etwas anderes — er wird zuverlässig bemerkt, auch wenn er selten benannt wird."
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
    "Verbal, paraverbal und nonverbal beschreiben unterschiedliche Teile derselben Kommunikation.",
    "Ein Kanal kann den anderen bestätigen oder ihm widersprechen."
  ],
  "erklaerung": "Verbal sind die Wörter. Paraverbal sind Lautstärke, Tempo, Betonung und Pausen. Nonverbal sind Mimik, Gestik, Haltung, Blick und Abstand. In einem Gespräch wirken die drei Ebenen gleichzeitig. Widersprechen sie sich, wird häufig der weniger bewusst steuerbare Ton oder die Körpersprache als glaubwürdiger wahrgenommen.",
  "beispiele": [
    "Der Satz ‚Das haben Sie ja schön gemacht‘ kann durch Betonung als Lob oder Vorwurf verstanden werden.",
    "‚Kein Problem, mache ich‘ mit verschränkten Armen und knappem Ton sendet eine andere Wirkung als derselbe Satz mit offenem Blick und ruhiger Stimme."
  ],
  "fallbeispiel": "Eine Kollegin sagt ‚Kein Problem, mache ich‘, verschränkt aber die Arme und antwortet knapp. Verbal klingt die Zusage positiv; paraverbal und nonverbal wirken zurückhaltend. Der Empfänger sollte den Widerspruch nicht einfach als Zustimmung verbuchen, sondern offen klären: ‚Ich höre eine Zusage, bin aber unsicher, ob es gerade zeitlich passt.‘",
  "typische_fehler": "Nur den Wortlaut wiederholen und Ton sowie Körpersprache ignorieren. Umgekehrt darf eine einzelne Geste nicht als sichere Absicht behandelt werden; entscheidend ist das Zusammenspiel und die anschließende Klärung.",
  "verstaendnisfragen": [
    "Was gehört zum paraverbalen Kanal? Lautstärke, Tempo, Betonung und Pausen.",
    "Was sollte bei widersprüchlichen Signalen geschehen? Nicht vorschnell interpretieren, sondern die Wahrnehmung ansprechen und nachfragen."
  ],
  "pruefungsbezug": "In Situationen nicht nur den Kanal nennen, sondern die Wirkung erklären: Welches Signal widerspricht welchem und wie kann die Person den Widerspruch klären?",
  "merksatz": "Worte sagen etwas, Ton färbt es und Körpersprache macht die Wirkung sichtbar."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### a3 · Wenn es hakt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Kommunikationsstörungen erkennen und Regeln anwenden

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "a3",
  "titel": "Wenn es hakt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine {{begriff:kommunikationsstoerung|Kommunikationsstörung}} ist alles, was sich zwischen Gemeintes und Verstandenes schiebt. Die meisten sind banal und genau deshalb wirksam."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Störung",
        "Beispiel",
        "Was hilft"
      ],
      "zeilen": [
        {
          "zellen": [
            "Äußere Störung",
            "Lärm, schlechte Verbindung, Unterbrechungen",
            "Raum wechseln, Termin verschieben"
          ]
        },
        {
          "zellen": [
            "Sprachliche Störung",
            "Fachbegriffe, Abkürzungen, Schachtelsätze",
            "in der Sprache des Gegenübers reden"
          ]
        },
        {
          "zellen": [
            "Persönliche Störung",
            "Zeitdruck, Ärger, Müdigkeit",
            "benennen statt überspielen"
          ]
        },
        {
          "zellen": [
            "Beziehungsstörung",
            "alter Konflikt, Misstrauen, Hierarchie",
            "Beziehung vor Sache klären"
          ],
          "detail": "**Die hartnäckigste Sorte.** Solange die Beziehung gestört ist, kommt kein Sachargument durch — der Empfänger hört nicht, *was* gesagt wird, sondern *wer* es sagt. Deshalb bringt es nichts, sachlich nachzulegen; es macht es meist schlimmer."
        },
        {
          "zellen": [
            "Wahrnehmungsstörung",
            "Vorurteil, erster Eindruck, Erwartung",
            "bewusst nachfragen statt annehmen"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Sechs Regeln, die fast jedes Gespräch verbessern: ausreden lassen, in der Sprache des anderen sprechen, konkret statt allgemein bleiben, {{begriff:ich-botschaft|Ich-Botschaften}} verwenden, das Verstandene zusammenfassen — und beim Thema bleiben, statt alte Punkte aufzurollen."
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Art von Störung liegt vor?",
      "kategorien": [
        "Äußere",
        "Sprachliche",
        "Persönliche",
        "Beziehungsstörung"
      ],
      "aufgaben": [
        {
          "text": "Der Kunde versteht die Abkürzungen aus deiner Abteilung nicht.",
          "loesung": "Sprachliche"
        },
        {
          "text": "Im Großraumbüro telefonieren nebenan drei Kollegen.",
          "loesung": "Äußere"
        },
        {
          "text": "Du hast gleich Feierabend und willst das Gespräch hinter dich bringen.",
          "loesung": "Persönliche"
        },
        {
          "text": "Seit dem Streit letzte Woche nimmt sie dir nichts mehr ab.",
          "loesung": "Beziehungsstörung"
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
    "Kommunikationsstörungen können an der Umgebung, der Sprache, der Person oder der Beziehung liegen.",
    "Eine passende Gegenmaßnahme setzt an der tatsächlichen Ursache an."
  ],
  "erklaerung": "Eine äußere Störung wird durch Lärm oder Unterbrechungen verursacht. Sprachliche Störungen entstehen durch Fachbegriffe oder komplizierte Formulierungen. Zeitdruck, Ärger und Müdigkeit wirken persönlich. Bei einer Beziehungsstörung wird die Sache durch Misstrauen oder einen alten Konflikt überlagert. Wahrnehmungsstörungen entstehen, wenn Vorurteile oder Erwartungen die Deutung lenken.",
  "beispiele": [
    "Im Großraumbüro hilft bei einer äußeren Störung ein Raumwechsel oder ein späterer Termin.",
    "Wenn ein Kunde Abkürzungen nicht versteht, muss die Sprache angepasst werden; bei einem alten Konflikt muss zuerst die Beziehungsebene geklärt werden."
  ],
  "fallbeispiel": "Ein Kollege reagiert seit Wochen abweisend auf sachliche E-Mails. Eine noch längere Mail würde die Ursache wahrscheinlich nicht lösen. Die Situation spricht für eine Beziehungsstörung. Sinnvoller ist ein persönliches Gespräch, in dem die Wahrnehmung angesprochen und anschließend wieder die Sachfrage geklärt wird.",
  "typische_fehler": "Alle Störungen mit mehr Sachinformationen bekämpfen oder eine persönliche Belastung als Unwillen bewerten. Besonders bei Beziehungsstörungen führt sachliches Nachlegen ohne Klärung häufig zu weiterer Distanz.",
  "verstaendnisfragen": [
    "Warum ist eine Beziehungsstörung besonders hartnäckig? Weil der Empfänger die Sache durch die belastete Beziehung bewertet.",
    "Welche sechs Regeln helfen fast immer? Ausreden lassen, verständlich sprechen, konkret bleiben, Ich-Botschaften verwenden, Verständnis zusammenfassen und beim Thema bleiben."
  ],
  "pruefungsbezug": "Störungstyp, konkretes Beispiel und passende Gegenmaßnahme gemeinsam nennen. Nur die Kategorie aufzuzählen reicht bei Fallaufgaben nicht.",
  "merksatz": "Erst die Störung erkennen, dann die passende Ebene klären — mehr Argumente sind nicht immer die Lösung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Was in einer Nachricht steckt

**Datei:** `lf7-k2-modelle.kapitel.json` · SHA-256 `0fcb79542bdd21fab3f3100e4578ea89c5eb45e66e344673d1b621561517127d`

**Konkreter Kapitelauftrag:** Denselben Satz auf mehreren Ebenen deuten; Rückfrage statt sicherer Zuschreibung fremder Absichten formulieren.

**Einordnung:** Vier Botschaften auf einmal — und fünf Regeln, die immer gelten.

### b1 · Vier Botschaften in einem Satz

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die vier Seiten einer Nachricht unterscheiden und anwenden

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Vier Botschaften in einem Satz",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Friedemann Schulz von Thun hat beschrieben, dass jede Nachricht ==vier Botschaften gleichzeitig== enthält. Der Sender spricht mit vier Schnäbeln, der Empfänger hört mit vier Ohren — und beide betonen selten dasselbe. Genau daraus entstehen die meisten Missverständnisse im Büro."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Vier Seiten",
      "titel": "„Der Drucker ist schon wieder leer.“",
      "lead": "Ein einziger Satz, gesagt von einer Kollegin. Vier Botschaften. Jede anklicken.",
      "seiten": [
        {
          "name": "Sachinhalt · Worüber ich informiere",
          "ton": "gold",
          "punkte": [
            {
              "text": "Im Drucker ist kein Papier mehr.",
              "detail": "Die reine Tatsache, überprüfbar, ohne Wertung. Diese Ebene ist die einzige, über die sich streiten lässt, ohne dass es persönlich wird."
            },
            {
              "text": "„schon wieder“ deutet auf Wiederholung",
              "detail": "Auch ein sachliches Detail — es sagt, dass der Zustand nicht zum ersten Mal auftritt."
            }
          ]
        },
        {
          "name": "Selbstoffenbarung · Was ich von mir zeige",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Mich stört das.",
              "detail": "Jede Nachricht verrät etwas über den Sender — hier Ärger oder Erschöpfung. Der Sender will das meist gar nicht mitteilen, tut es aber unvermeidlich."
            },
            {
              "text": "Ich achte darauf, dass Dinge funktionieren.",
              "detail": "Auch das ist Selbstoffenbarung: ein Bild davon, wie jemand sich selbst sieht und gesehen werden möchte."
            }
          ]
        },
        {
          "name": "Beziehung · Wie ich zu dir stehe",
          "ton": "rot",
          "punkte": [
            {
              "text": "Ich traue dir zu, dass du dich kümmerst.",
              "detail": "Wohlwollend gehört. Diese Ebene wird fast nie ausgesprochen und trotzdem immer mitgehört — an Tonfall, Blick und Wortwahl."
            },
            {
              "text": "Oder: Du bist dafür zuständig und hast es versäumt.",
              "detail": "Derselbe Satz, feindlich gehört. Wer auf diesem Ohr empfindlich ist, hört fast überall einen Vorwurf — und reagiert entsprechend."
            }
          ]
        },
        {
          "name": "Appell · Wozu ich dich bringen will",
          "ton": "gold",
          "punkte": [
            {
              "text": "Füll bitte Papier nach.",
              "detail": "Der Wunsch, der hinter der Nachricht steht. Er wird häufig nicht ausgesprochen, weil eine direkte Bitte unhöflich wirken könnte."
            },
            {
              "text": "Genau das ist die Falle.",
              "detail": "Ein unausgesprochener Appell wird oft nicht erkannt — und der Sender ärgert sich dann, dass nichts passiert ist, obwohl er nie darum gebeten hat."
            }
          ]
        }
      ],
      "regel": "Merkhilfe: Sachinhalt = worüber. Selbstoffenbarung = was ich von mir preisgebe. Beziehung = was ich von dir halte. Appell = was du tun sollst."
    },
    {
      "typ": "merke",
      "text": "Der Sender entscheidet, auf welcher Seite er **sendet** — der Empfänger, auf welcher er **hört**. Sind das verschiedene, entsteht ein Missverständnis, obwohl beide ehrlich sind.",
      "karteikarte": "Welche vier Seiten hat eine Nachricht nach Schulz von Thun?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "titel": "Die vier Seiten unterscheiden",
  "erklaerung": "Der Sachinhalt beschreibt, worüber gesprochen wird. Die Selbstoffenbarung zeigt etwas über die sprechende Person. Die Beziehungsseite signalisiert, wie der Sender den Empfänger sieht. Der Appell enthält den Wunsch, dass der Empfänger etwas tut, lässt oder versteht.",
  "beispiel": "Bei „Die Rechnung ist noch nicht raus“ lautet der Sachinhalt: Die Rechnung wurde nicht versendet. Als Selbstoffenbarung kann mitschwingen, dass die Person unter Zeitdruck steht. Auf der Beziehungsebene kann der Satz als Vorwurf gehört werden; als Appell bedeutet er möglicherweise: Bitte kümmere dich darum.",
  "typische_fehler": "Nur die Sachebene zu hören und die Reaktion des Gegenübers deshalb als übertrieben abzutun. Umgekehrt ist es genauso problematisch, eine vermutete Beziehungsaussage als sichere Absicht zu behandeln.",
  "merksatz": "Eine Nachricht hat mehrere Seiten; welche Seite ankommt, entscheidet der Empfänger mit."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Warum das im Büro ständig passiert

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Missverständnisse mit dem Vier-Ohren-Modell erklären

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Warum das im Büro ständig passiert",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die häufigste Konstellation: Der Sender meint den **Sachinhalt**, der Empfänger hört auf dem **Beziehungsohr**. Der eine sagt „Die Rechnung ist noch nicht raus“ und meint eine Information — der andere hört „Du arbeitest zu langsam“."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Empfänger hört vor allem auf",
        "Typische Reaktion",
        "Was hilft"
      ],
      "zeilen": [
        {
          "zellen": [
            "Sachohr",
            "fragt nach Details, wirkt kühl",
            "Beziehungssignale bewusst dazugeben"
          ]
        },
        {
          "zellen": [
            "Beziehungsohr",
            "fühlt sich schnell angegriffen",
            "Wertschätzung ausdrücklich aussprechen"
          ],
          "detail": "**Das empfindlichste Ohr** — und in Betrieben mit Hierarchie das aktivste. Wer weiß, dass sein Gegenüber so hört, sagt den Sachverhalt und die Beziehungsbotschaft getrennt: erst „Wir arbeiten hier gut zusammen“, dann die Kritik."
        },
        {
          "zellen": [
            "Selbstoffenbarungsohr",
            "analysiert den anderen statt zuzuhören",
            "zurück zur Sache lenken"
          ]
        },
        {
          "zellen": [
            "Appellohr",
            "erledigt sofort alles, auch Ungefragtes",
            "klar sagen, ob etwas zu tun ist"
          ],
          "detail": "**Der freundliche Dauerstress.** Wer alles als Auftrag hört, arbeitet ständig Dinge ab, um die niemand gebeten hat — und ist irgendwein überlastet, ohne dass jemand es bemerkt hat."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Dein Ausbilder sagt beim Vorbeigehen: „Der Ordner steht seit gestern hier.“ Du antwortest sofort gereizt. Auf welchem Ohr hast du gehört?",
      "optionen": [
        {
          "text": "Sachohr",
          "richtig": false,
          "echo": "Auf dem Sachohr hättest du die Information aufgenommen — ein Ordner steht seit gestern da — und höchstens nachgefragt. Eine gereizte Reaktion deutet auf etwas anderes."
        },
        {
          "text": "Beziehungsohr",
          "richtig": true,
          "echo": "Richtig. Du hast einen Vorwurf gehört: „Du räumst nicht auf.“ Ob er gemeint war, weiß nur der Sender. Genau deshalb lohnt hier die Rückfrage — „Soll ich den wegräumen?“ klärt Appell und Beziehung in einem Satz."
        },
        {
          "text": "Appellohr",
          "richtig": false,
          "echo": "Auf dem Appellohr hättest du den Ordner wortlos weggeräumt. Gereiztheit entsteht dort, wo eine Botschaft über die Beziehung gehört wird."
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
  "titel": "Missverständnisse Schritt für Schritt klären",
  "erklaerung": "Wenn Sender und Empfänger verschiedene Seiten betonen, entsteht ein Missverständnis. Eine gute Klärung trennt deshalb Beobachtung und Deutung: Erst wird wiederholt, was tatsächlich gehört wurde. Danach wird gefragt, was gemeint war, und erst dann wird über eine Lösung gesprochen.",
  "beispiel": "Eine Ausbilderin sagt: „Das ist heute aber spät.“ Statt sofort zu widersprechen, kann der Azubi fragen: „Meinst du, dass die Aufgabe heute noch fertig werden soll?“ So wird aus einer vermuteten Kritik ein klärbarer Arbeitsauftrag.",
  "typische_fehler": "Ironie oder Tonfall als Beweis für die Absicht des anderen zu nehmen. Ein weiterer Fehler ist, sofort die eigene Verteidigung zu starten, bevor die konkrete Erwartung geklärt ist.",
  "merksatz": "Beobachtung wiederholen, Bedeutung erfragen, Auftrag vereinbaren."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Fünf Regeln, die immer gelten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Axiome von Watzlawick auf Gesprächssituationen beziehen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Fünf Regeln, die immer gelten",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Paul Watzlawick hat fünf Grundannahmen formuliert, die {{begriff:watzlawick|Axiome}} heißen — also Sätze, die nicht bewiesen werden, sondern vorausgesetzt. Für die Prüfung zählt vor allem das erste."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Axiom",
        "Bedeutung",
        "Im Büro"
      ],
      "zeilen": [
        {
          "zellen": [
            "Man kann nicht nicht kommunizieren",
            "Auch Schweigen ist eine Botschaft",
            "Wer eine Mail nicht beantwortet, sagt damit etwas"
          ],
          "detail": "**Das bekannteste und prüfungsrelevanteste Axiom.** Es bedeutet: Es gibt kein Verhalten, das keine Mitteilung wäre. Wegsehen, Schweigen, den Raum verlassen — alles wird gedeutet, ob man will oder nicht."
        },
        {
          "zellen": [
            "Jede Kommunikation hat Inhalts- und Beziehungsaspekt",
            "Die Beziehung bestimmt, wie der Inhalt verstanden wird",
            "Derselbe Satz vom Freund oder vom Chef"
          ]
        },
        {
          "zellen": [
            "Kommunikation ist von Interpunktion abhängig",
            "Jeder sieht seinen Beitrag als Reaktion",
            "„Ich melde mich nicht, weil du nie antwortest“"
          ],
          "detail": "**Der klassische Teufelskreis.** Beide halten sich für die reagierende Seite und den anderen für die auslösende. Wer den Kreis durchbrechen will, muss auf die Schuldfrage verzichten."
        },
        {
          "zellen": [
            "Kommunikation ist digital und analog",
            "Worte sind eindeutig, Körpersprache ist deutungsoffen",
            "Ein Lächeln kann vieles heißen"
          ]
        },
        {
          "zellen": [
            "Kommunikation ist symmetrisch oder komplementär",
            "Auf Augenhöhe oder mit Gefälle",
            "Kollege gegen Vorgesetzter"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "Wenn du dir nur einen Satz aus diesem Kapitel merkst, dann diesen: **Man kann nicht nicht kommunizieren.** Auch wer nichts sagt, sendet — und wird gedeutet.",
      "karteikarte": "Was besagt das erste Axiom von Watzlawick, und was folgt daraus für den Büroalltag?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Seite der Nachricht ist gemeint?",
      "kategorien": [
        "Sachinhalt",
        "Selbstoffenbarung",
        "Beziehung",
        "Appell"
      ],
      "aufgaben": [
        {
          "text": "„Die Lieferung kommt am Dienstag.“",
          "loesung": "Sachinhalt"
        },
        {
          "text": "„Ich bin damit gerade überfordert.“",
          "loesung": "Selbstoffenbarung"
        },
        {
          "text": "„Können Sie das bis morgen erledigen?“",
          "loesung": "Appell"
        },
        {
          "text": "„Auf Sie ist eben Verlass.“",
          "loesung": "Beziehung"
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
  "titel": "Das Modell praktisch nutzen",
  "erklaerung": "Das Modell ist kein Etikett, mit dem man Menschen dauerhaft auf ein bestimmtes Ohr festlegt. Es ist eine Gesprächshilfe. In schwierigen Situationen kannst du bewusst auf allen vier Seiten prüfen und anschließend eine klare Ich-Botschaft mit einer konkreten Bitte formulieren.",
  "beispiel": "Statt „Du hörst mir nie zu“ ist hilfreicher: „Als ich gerade unterbrochen wurde, habe ich den Eindruck bekommen, dass mein Punkt noch nicht angekommen ist. Kann ich den Gedanken kurz zu Ende erklären?“ Die Beobachtung bleibt überprüfbar und der Appell ist verständlich.",
  "typische_fehler": "Das Modell als Diagnose für den Charakter des Gegenübers zu verwenden oder vier Begriffe aufzuzählen, ohne die Situation zu klären. In der Prüfung zählt die Anwendung auf den konkreten Satz.",
  "merksatz": "Das Modell soll ein Gespräch öffnen, nicht den anderen festlegen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Gespräche führen

**Datei:** `lf7-k3-gespraeche.kapitel.json` · SHA-256 `0b555de2ad07d663d767d00ac7f551fc3da0c4d3aae743168fd1b48e77a0218e`

**Konkreter Kapitelauftrag:** Ein Beratungs-/Klärungsgespräch mit offenen und geschlossenen Fragen entwickeln; jeden Wechsel der Frageform begründen.

**Einordnung:** Phasen, Fragen, Zuhören — was ein Gespräch von einem Wortwechsel unterscheidet.

### c1 · Die Phasen eines Gesprächs

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ein Gespräch entlang seiner Phasen vorbereiten und führen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c1",
  "titel": "Die Phasen eines Gesprächs",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein geführtes Gespräch unterscheidet sich von einem zufälligen Wortwechsel durch eines: Es hat einen Ablauf. Die {{begriff:gespraechsphasen|fünf Phasen}} gelten für das Kundengespräch ebenso wie für das Personalgespräch."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Fünf Phasen",
      "titel": "Vom Ziel bis zur Nachbereitung",
      "lead": "Die meiste Arbeit liegt außerhalb des Gesprächs. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Vorbereitung",
          "satz": "Ziel · Informationen · Rahmen",
          "text": "Was will ich am Ende erreicht haben? Welche Unterlagen brauche ich, wer nimmt teil, wie viel Zeit ist da? Ohne Ziel lässt sich hinterher nicht sagen, ob das Gespräch erfolgreich war."
        },
        {
          "nr": 2,
          "titel": "Eröffnung",
          "satz": "Kontakt herstellen",
          "text": "Begrüßung, kurzer persönlicher Einstieg, dann der Rahmen: Anlass, Ablauf, Zeit. Diese Phase wird oft übersprungen — und fehlt dann am Ende, wenn es unangenehm wird."
        },
        {
          "nr": 3,
          "titel": "Kernphase",
          "satz": "Informationen austauschen",
          "text": "Anliegen klären, Fragen stellen, zuhören, Argumente austauschen. Hier gilt die wichtigste Regel: erst verstehen, dann überzeugen."
        },
        {
          "nr": 4,
          "titel": "Abschluss",
          "satz": "Ergebnis festhalten",
          "text": "Zusammenfassen, was vereinbart wurde — wer macht was bis wann. Wer diesen Schritt auslässt, hat später zwei verschiedene Erinnerungen an dasselbe Gespräch."
        },
        {
          "nr": 5,
          "titel": "Nachbereitung",
          "satz": "Notiz · Wiedervorlage",
          "text": "Gesprächsnotiz anlegen, Termine eintragen, Zugesagtes anstoßen. Das ist der Teil, an dem sich Verlässlichkeit tatsächlich entscheidet."
        }
      ],
      "regel": "Der Abschluss ist die am häufigsten übersprungene Phase — und die, aus der die meisten späteren Konflikte entstehen."
    },
    {
      "typ": "merke",
      "text": "Ein Gespräch ohne Ziel ist ein Gespräch ohne Ergebnis. Formuliere vorher einen Satz: „Am Ende soll … feststehen.“",
      "karteikarte": "Welche fünf Phasen hat ein geführtes Gespräch?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "c1",
  "vorauswissen": [
    "Ein Gespräch hat mindestens einen Anlass, ein Ziel und Beteiligte.",
    "Die Gesprächsphasen geben Orientierung, sind aber kein starres Drehbuch."
  ],
  "hintergrundwissen": "Die Phasen helfen, Beziehung und Sachaufgabe miteinander zu verbinden. Eine gute Eröffnung schafft Sicherheit, die Kernphase klärt Informationen und der Abschluss übersetzt das Gespräch in konkrete nächste Schritte.",
  "ablauf": [
    "Ziel, Fakten, Beteiligte und Zeit vorbereiten.",
    "Begrüßen, Anlass und Ablauf transparent machen.",
    "Anliegen klären, Informationen austauschen und Verständnis prüfen.",
    "Ergebnis, Zuständigkeit und Termin zusammenfassen.",
    "Notiz erstellen und Wiedervorlage setzen."
  ],
  "beispiele": [
    "Vor einem Lieferantengespräch werden Bestellung, Liefertermin und gewünschte Lösung bereitgelegt.",
    "Nach einem internen Gespräch wird festgehalten: Anna prüft die Rechnung bis Mittwoch, Ben informiert den Lieferanten am Donnerstag."
  ],
  "fallbeispiel": "Ein Kunde beschwert sich über eine verspätete Lieferung. Nach der Begrüßung wird der Anlass benannt, dann werden Bestellnummer und zugesagter Termin geklärt. Am Ende fasst die Mitarbeiterin zusammen, was geprüft wird und bis wann der Kunde eine Rückmeldung erhält.",
  "typische_fehler": "Zu früh in die Lösung springen, den Gesprächsrahmen nicht klären oder ohne Vereinbarung enden. Freundlichkeit allein ersetzt keine klare Zuständigkeit.",
  "verstaendnisfragen": [
    "Warum ist die Vorbereitung wichtig? Sie verhindert, dass im Gespräch wesentliche Fakten fehlen.",
    "Warum muss der Abschluss ausgesprochen werden? Damit beide Seiten dasselbe Ergebnis mitnehmen."
  ],
  "pruefungsbezug": "In Situationsaufgaben sollten Phase, konkrete Formulierung und Zweck zusammen genannt werden.",
  "merksatz": "Ziel setzen, Kontakt herstellen, klären, vereinbaren, nachbereiten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c2 · Fragen, die weiterbringen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Fragetechniken gezielt einsetzen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c2",
  "titel": "Fragen, die weiterbringen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Wer fragt, führt — aber nur mit der richtigen Art von Frage. Die Grundunterscheidung ist einfach: ==Offene Fragen öffnen, geschlossene schließen.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Fragetyp",
        "Beispiel",
        "Wozu"
      ],
      "zeilen": [
        {
          "zellen": [
            "Offene Frage",
            "„Wie stellen Sie sich das vor?“",
            "Informationen sammeln, Gespräch öffnen"
          ],
          "detail": "**{{begriff:offene-frage|Offene Fragen}} beginnen mit W** — wer, was, wie, wann, wo, warum. Sie liefern mehr als eine Antwort und zeigen dem Gegenüber, dass seine Sicht zählt. In der Eröffnungs- und Kernphase das Mittel der Wahl."
        },
        {
          "zellen": [
            "Geschlossene Frage",
            "„Passt Ihnen Dienstag?“",
            "absichern, entscheiden, abschließen"
          ],
          "detail": "**{{begriff:geschlossene-frage|Geschlossene Fragen}} lassen nur ja oder nein zu.** Am Anfang eines Gesprächs würgen sie es ab, am Ende bringen sie es zum Abschluss."
        },
        {
          "zellen": [
            "Alternativfrage",
            "„Lieber Dienstag oder Donnerstag?“",
            "Entscheidung erleichtern"
          ]
        },
        {
          "zellen": [
            "Kontrollfrage",
            "„Habe ich Sie richtig verstanden, dass …?“",
            "Verständnis prüfen"
          ]
        },
        {
          "zellen": [
            "Suggestivfrage",
            "„Das sehen Sie doch sicher auch so?“",
            "besser vermeiden"
          ],
          "detail": "**Sie legt die Antwort in den Mund** und erzeugt Zustimmung ohne Überzeugung. Der Gesprächspartner merkt es meist — und das kostet Vertrauen. Dieselbe Falle wie beim Fragebogen in Lernfeld 5."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Kunde ruft an und beschreibt unklar ein Problem. Womit steigst du ein?",
      "optionen": [
        {
          "text": "Geschlossene Frage: „Ist das Gerät kaputt?“",
          "richtig": false,
          "echo": "Zu früh. Eine geschlossene Frage liefert ein Wort und verengt sofort auf deine Vermutung — womöglich auf die falsche."
        },
        {
          "text": "Offene Frage: „Was genau passiert, wenn Sie es einschalten?“",
          "richtig": true,
          "echo": "Richtig. Offene Fragen bringen in dieser Phase die meisten Informationen und zeigen dem Kunden, dass du zuhörst. Geschlossene Fragen kommen später, wenn es ums Eingrenzen und Entscheiden geht."
        },
        {
          "text": "Suggestivfrage: „Sie haben es sicher schon neu gestartet?“",
          "richtig": false,
          "echo": "Sie legt eine Antwort nahe und macht es dem Kunden peinlich, zu widersprechen. Wenn er es nicht getan hat, sagt er es jetzt eher nicht — und ihr sucht am falschen Ende."
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
  "vorauswissen": "Offene Fragen sammeln Informationen, geschlossene Fragen sichern Entscheidungen. Die Frageform muss zur Gesprächsphase passen.",
  "hintergrundwissen": "Fragen steuern Aufmerksamkeit. Offene Fragen lassen dem Gegenüber Raum; geschlossene, Alternativ- und Kontrollfragen grenzen ein und sichern ab. Suggestivfragen wirken lenkend und können Vertrauen beschädigen.",
  "ablauf": [
    "Zuerst offen nach Situation und Anliegen fragen.",
    "Aussage mit Kontrollfrage spiegeln.",
    "Mit geschlossenen oder alternativen Fragen konkrete Auswahl sichern.",
    "Vereinbarung in eigenen Worten bestätigen."
  ],
  "beispiele": [
    "Offen: ‚Was ist seit gestern genau passiert?‘ Danach kontrollierend: ‚Habe ich richtig verstanden, dass der Fehler nur beim Drucken auftritt?‘",
    "Alternativfrage: ‚Sollen wir die Ersatzlieferung Dienstag oder Mittwoch anstoßen?‘ Sie hilft beim Abschluss, ohne eine einzige Lösung aufzuzwingen."
  ],
  "fallbeispiel": "Ein Kunde sagt nur ‚Die Bestellung stimmt nicht‘. Statt ‚Fehlt Ihnen ein Paket?‘ fragt die Mitarbeiterin offen, welche Abweichung er festgestellt hat. Erst danach grenzt sie mit konkreten Kontrollfragen ein, welche Position betroffen ist.",
  "typische_fehler": "Geschlossene Fragen am Anfang, mehrere Fragen auf einmal oder Suggestivfragen wie ‚Das war doch sicher Ihr Fehler?‘. Dadurch fehlen Informationen oder das Gegenüber geht in Verteidigung.",
  "verstaendnisfragen": [
    "Wann ist eine geschlossene Frage sinnvoll? Wenn eine Information bestätigt oder eine Entscheidung abgeschlossen werden soll.",
    "Warum sind Kontrollfragen wertvoll? Sie decken Missverständnisse auf, bevor eine falsche Lösung vereinbart wird."
  ],
  "pruefungsbezug": "Nicht nur den Fragetyp benennen, sondern erklären, warum er an dieser Stelle passt.",
  "merksatz": "Offen erkunden, kontrollierend sichern, geschlossen entscheiden."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### c3 · Zuhören und telefonieren

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aktiv zuhören und Gespräche am Telefon sicher führen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "c3",
  "titel": "Zuhören und telefonieren",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:aktives-zuhoeren|Aktives Zuhören}} bedeutet, das Zuhören sichtbar zu machen: nachfragen, mit eigenen Worten zusammenfassen, das Gefühl dahinter ansprechen. Es kostet zwanzig Sekunden und verhindert die meisten Missverständnisse aus Kapitel 1."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Statt",
        "Besser",
        "Warum"
      ],
      "zeilen": [
        {
          "zellen": [
            "„Verstehe.“",
            "„Sie brauchen die Lieferung also vor Freitag?“",
            "prüft, statt zu unterstellen"
          ]
        },
        {
          "zellen": [
            "„Das stimmt nicht.“",
            "„Ich sehe das anders, weil …“",
            "{{begriff:ich-botschaft|Ich-Botschaft}} statt Vorwurf"
          ]
        },
        {
          "zellen": [
            "„Sie sind zu spät dran.“",
            "„Mir fehlt die Rückmeldung, um weiterzuarbeiten.“",
            "beschreibt Wirkung statt Person"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Am Telefon fällt der nonverbale Kanal weg — der paraverbale trägt dann alles. Deshalb gelten dort ein paar Regeln zusätzlich."
    },
    {
      "typ": "praxistipp",
      "text": "Telefonleitfaden: Mit **Betrieb, Name und Gruß** melden. Stift und Notiz bereitlegen, **bevor** du abhebst. Namen des Anrufers notieren und im Gespräch verwenden. Beim Verbinden ankündigen, zu wem und warum. Kann niemand helfen, **selbst zurückrufen** statt den Anrufer erneut anrufen zu lassen. Und zum Schluss das Ergebnis wiederholen — am Telefon hat niemand etwas mitgelesen."
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Fragetechnik liegt vor?",
      "kategorien": [
        "Offen",
        "Geschlossen",
        "Alternativ",
        "Suggestiv"
      ],
      "aufgaben": [
        {
          "text": "„Wie ist das Problem entstanden?“",
          "loesung": "Offen"
        },
        {
          "text": "„Möchten Sie Rechnung oder Lastschrift?“",
          "loesung": "Alternativ"
        },
        {
          "text": "„Sind Sie damit einverstanden?“",
          "loesung": "Geschlossen"
        },
        {
          "text": "„Sie wollen doch sicher die größere Menge?“",
          "loesung": "Suggestiv"
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
  "vorauswissen": "Aktives Zuhören bedeutet nicht nur schweigen, sondern Verständnis sichtbar und überprüfbar zu machen.",
  "hintergrundwissen": "Menschen reagieren nicht allein auf Sachinformationen, sondern auch auf Gefühle und Erwartungen. Paraphrasieren, Nachfragen und das Benennen von Emotionen senken Missverständnisse, ohne vorschnell zu bewerten.",
  "ablauf": [
    "Ausreden lassen und Kernaussage aufnehmen.",
    "Mit eigenen Worten zusammenfassen.",
    "Unklare Punkte nachfragen und Gefühl vorsichtig spiegeln.",
    "Nächsten Schritt bestätigen; am Telefon zusätzlich Namen, Rückrufnummer und Anliegen notieren."
  ],
  "beispiele": [
    "‚Wenn ich Sie richtig verstehe, fehlt die Rechnung für Auftrag 4711.‘ Das prüft den Inhalt, ohne Schuld zuzuweisen.",
    "Am Telefon: ‚Ich notiere: Rückruf bis 15 Uhr unter dieser Nummer, richtig?‘ So wird die Vereinbarung hörbar gesichert."
  ],
  "fallbeispiel": "Eine verärgerte Kollegin spricht schnell und unterbricht sich. Die Mitarbeiterin lässt sie ausreden, fasst die drei konkreten Probleme zusammen und fragt, welches zuerst gelöst werden soll. Dadurch wird aus dem Ärger eine bearbeitbare Priorität.",
  "typische_fehler": "Nebenbei E-Mails schreiben, sofort rechtfertigen, Gefühle kleinreden oder eine Lösung versprechen, bevor der Sachverhalt geklärt ist.",
  "verstaendnisfragen": [
    "Was ist der Unterschied zwischen Wiederholen und Paraphrasieren? Paraphrasieren gibt den Sinn in eigenen Worten wieder und prüft dadurch das Verständnis.",
    "Was muss am Telefon zusätzlich gesichert werden? Identität beziehungsweise Kontaktdaten, Anliegen, Vereinbarung und Rückmeldezeitpunkt."
  ],
  "pruefungsbezug": "Bewertet wird meist, ob die Gesprächsführung konkrete Formulierungen und einen nachvollziehbaren nächsten Schritt enthält.",
  "merksatz": "Zuhören, spiegeln, klären, vereinbaren – dann erst handeln."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Schwierige Gespräche und Feedback

**Datei:** `lf7-k4-schwierig.kapitel.json` · SHA-256 `de6249459fd9230459fd87900849bc29f38ad477dde28733dc60c61b2cdc9d0d`

**Konkreter Kapitelauftrag:** Eine Reklamation in ein lösungsorientiertes Gespräch überführen; Konfliktursachen, Feedback und eigene Zuständigkeitsgrenze zeigen.

**Einordnung:** Reklamation, Konflikt, Rückmeldung — und wo Kulturen sich unterscheiden.

### d1 · Die Reklamation

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ein Reklamationsgespräch strukturiert führen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d1",
  "titel": "Die Reklamation",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine {{begriff:reklamation|Reklamation}} ist rechtlich ein Mängelanspruch — im Gespräch aber vor allem ein Beziehungsereignis. Der Kunde ist verärgert, und ==Ärger lässt sich nicht mit Argumenten auflösen==. Wer sofort sachlich antwortet, verstärkt ihn."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Fünf Schritte",
      "titel": "Das Reklamationsgespräch",
      "lead": "Die Reihenfolge entscheidet. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Ausreden lassen",
          "satz": "nicht unterbrechen",
          "text": "Der Ärger muss raus, bevor irgendetwas anderes möglich ist. Jede Unterbrechung setzt den Kunden zurück auf Anfang — und verlängert das Gespräch."
        },
        {
          "nr": 2,
          "titel": "Verständnis zeigen",
          "satz": "den Ärger anerkennen",
          "text": "„Das kann ich verstehen, das wäre mir auch unangenehm.“ Das ist kein Schuldeingeständnis, sondern eine Aussage über die Lage. Genau hier kippt das Gespräch — oder nicht."
        },
        {
          "nr": 3,
          "titel": "Sachverhalt klären",
          "satz": "offene Fragen",
          "text": "Erst jetzt zur Sache: Was genau ist passiert, wann, mit welcher Bestellung? Vorher gestellte Sachfragen wirken wie Ausweichen."
        },
        {
          "nr": 4,
          "titel": "Lösung anbieten",
          "satz": "konkret mit Termin",
          "text": "Was geschieht, durch wen, bis wann. „Wir kümmern uns“ ist keine Lösung. Wenn du nicht entscheiden darfst, sag, wer entscheidet und wann er sich meldet."
        },
        {
          "nr": 5,
          "titel": "Nachfassen",
          "satz": "prüfen, ob es gewirkt hat",
          "text": "Der Schritt, den fast alle auslassen — und der einzige, an den der Kunde sich erinnert. Ein kurzer Anruf drei Tage später macht aus einem Beschwerdeführer einen Stammkunden."
        }
      ],
      "regel": "Reihenfolge merken: erst Gefühl, dann Sache. Wer mit Schritt 3 anfängt, hat den Kunden schon verloren."
    },
    {
      "typ": "achtung",
      "text": "Nie mitschimpfen und nie Kollegen belasten — „Da hat die Kollegin wieder geschlafen“ wirkt kurz entlastend und beschädigt dauerhaft das Vertrauen in den ganzen Betrieb. Nach außen bist du der Betrieb, nicht du selbst."
    },
    {
      "typ": "merke",
      "text": "Ein gut bearbeiteter Beschwerdeführer ist danach oft treuer als ein Kunde, der nie ein Problem hatte — weil er erlebt hat, dass du auch dann verlässlich bist, wenn etwas schiefgeht.",
      "karteikarte": "In welcher Reihenfolge führst du ein Reklamationsgespräch, und warum steht das Sachliche nicht am Anfang?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "d1",
  "vorauswissen": [
    "Eine Reklamation betrifft sachlich einen Mangel, aber auch die Beziehung zum Kunden.",
    "Ärger kann die Aufnahmefähigkeit für sachliche Argumente zunächst blockieren."
  ],
  "ablauf": [
    "Kunden ausreden lassen.",
    "Verständnis für den Ärger zeigen, ohne vorschnell Schuld einzugestehen.",
    "Sachverhalt mit offenen Fragen klären.",
    "Konkrete Lösung mit Zuständigkeit und Termin anbieten.",
    "Nachfassen und prüfen, ob die Lösung angekommen ist."
  ],
  "erklaerung": "Die Reihenfolge beginnt bewusst nicht mit der Sachfrage. Wer den Kunden unterbricht oder sofort mit einer Rechtfertigung antwortet, verstärkt den Ärger. Erst wenn die emotionale Lage anerkannt ist, kann der konkrete Vorgang geklärt und eine verbindliche Lösung vereinbart werden.",
  "beispiele": [
    "Statt den Kunden bei der ersten Beschwerde zu unterbrechen, wird sein Anliegen vollständig aufgenommen und anschließend zusammengefasst.",
    "‚Wir prüfen die Bestellung heute und melden uns bis 15 Uhr‘ ist konkreter als ‚Wir kümmern uns darum‘, weil Handlung und Termin feststehen."
  ],
  "fallbeispiel": "Ein Kunde beschwert sich über eine verspätete Lieferung. Die Mitarbeiterin lässt ihn ausreden und erkennt an, dass die Situation ärgerlich ist. Danach fragt sie nach Bestellnummer und zugesagtem Termin. Sie vereinbart, dass sie den Lieferstatus prüft und bis 15 Uhr zurückruft. Drei Tage später fragt sie nach, ob die Lösung funktioniert hat.",
  "typische_fehler": "Mit der Sachklärung beginnen, Kollegen vor dem Kunden beschuldigen oder eine Lösung versprechen, für die keine Zuständigkeit besteht. Ein pauschales ‚Wir kümmern uns‘ ersetzt weder Termin noch Verantwortung.",
  "verstaendnisfragen": [
    "Warum steht das Gefühl vor der Sache? Weil ein verärgerter Kunde sachliche Argumente sonst als Ausweichen hören kann.",
    "Was macht eine Lösung verbindlich? Sie benennt, was geschieht, wer handelt und bis wann."
  ],
  "pruefungsbezug": "Die fünf Schritte in der richtigen Reihenfolge nennen und bei einem Fall jeweils mit einer konkreten Formulierung oder Handlung begründen.",
  "merksatz": "Erst Gefühl, dann Sache: ausreden lassen, anerkennen, klären, lösen, nachfassen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d2 · Feedback geben und nehmen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Feedback nach festen Regeln geben und annehmen

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d2",
  "titel": "Feedback geben und nehmen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:feedback|Feedback}} ist eine Rückmeldung über wahrgenommenes Verhalten — nicht über einen Menschen. ==Der Unterschied zwischen „Sie sind unzuverlässig“ und „Der Bericht kam zwei Tage nach dem Termin“== ist der Unterschied zwischen Angriff und Rückmeldung."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Rollen",
      "titel": "Geben und Annehmen",
      "lead": "Feedback hat auf beiden Seiten Regeln. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Feedback geben",
          "ton": "gold",
          "punkte": [
            {
              "text": "Beschreibend statt bewertend",
              "detail": "Sag, was du beobachtet hast, nicht was du daraus schließt. „Du warst dreimal zu spät“ ist überprüfbar, „Du nimmst das nicht ernst“ ist eine Unterstellung."
            },
            {
              "text": "Konkret statt allgemein",
              "detail": "„Immer“ und „nie“ sind fast nie wahr und lösen sofort Widerspruch aus. Nenne eine Situation, ein Datum, ein Beispiel."
            },
            {
              "text": "Zeitnah",
              "detail": "Feedback zu einem drei Monate alten Vorgang hilft niemandem und wirkt wie gesammelter Groll."
            },
            {
              "text": "Unter vier Augen",
              "detail": "Kritik vor anderen zwingt den Empfänger, sein Gesicht zu wahren — er muss sich verteidigen, auch wenn du recht hast."
            },
            {
              "text": "Ich-Botschaften verwenden",
              "detail": "„Mir fehlt die Rückmeldung“ statt „Sie melden sich nie“. Die eigene Wahrnehmung kann niemand bestreiten, eine Behauptung über den anderen schon."
            }
          ]
        },
        {
          "name": "Feedback annehmen",
          "ton": "gruen",
          "punkte": [
            {
              "text": "Zuhören, nicht rechtfertigen",
              "detail": "Die erste Regel und die schwerste. Rechtfertigen unterbricht den Geber und sorgt dafür, dass du die Hälfte nicht hörst."
            },
            {
              "text": "Nachfragen bei Unklarheit",
              "detail": "„Kannst du mir ein Beispiel nennen?“ ist erlaubt und hilfreich — es ist keine Verteidigung, sondern Verständnissicherung."
            },
            {
              "text": "Bedanken",
              "detail": "Auch für unangenehmes Feedback. Wer Kritik übt, geht ein Risiko ein; wer sie abwehrt, bekommt beim nächsten Mal keine mehr — und erfährt Probleme erst, wenn sie groß sind."
            },
            {
              "text": "Später entscheiden, was du übernimmst",
              "detail": "Feedback ist ein Angebot, kein Urteil. Du musst es nicht sofort annehmen — aber auch nicht sofort zurückweisen."
            }
          ]
        }
      ],
      "regel": "Beide Rollen haben dieselbe Grundlage: Es geht um Verhalten in einer Situation, nicht um die Person."
    },
    {
      "typ": "check",
      "frage": "Welche Rückmeldung entspricht den Feedbackregeln?",
      "optionen": [
        {
          "text": "„Du bist immer so unorganisiert.“",
          "richtig": false,
          "echo": "Zwei Fehler auf einmal: „immer“ ist eine unhaltbare Verallgemeinerung, „unorganisiert“ bewertet die Person statt ein Verhalten. Der Empfänger wird sich verteidigen, nicht zuhören."
        },
        {
          "text": "„Die letzten zwei Protokolle kamen nach dem Termin — mir fehlt dadurch die Grundlage für den Versand.“",
          "richtig": true,
          "echo": "Richtig. Beschreibend, konkret, mit Zeitbezug und als Ich-Botschaft formuliert. Der Empfänger erfährt, was passiert ist und welche Folge es hatte — beides lässt sich nicht bestreiten und ist damit besprechbar."
        },
        {
          "text": "„Alle finden, dass du zu langsam arbeitest.“",
          "richtig": false,
          "echo": "Feedback aus zweiter Hand im Namen anonymer Dritter. Es ist weder überprüfbar noch klärbar — und beschädigt zusätzlich das Verhältnis zu allen Kollegen."
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
    "Feedback bezieht sich auf wahrgenommenes Verhalten in einer Situation.",
    "Eine Ich-Botschaft beschreibt die eigene Wahrnehmung statt die Person zu bewerten."
  ],
  "erklaerung": "Gutes Feedback bleibt überprüfbar und bearbeitbar. Deshalb werden konkrete Beobachtungen, Zeitbezug und Wirkung genannt, statt Eigenschaften wie ‚unzuverlässig‘ zu behaupten. Beim Annehmen geht es zunächst um Zuhören und Nachfragen; ob man die Rückmeldung vollständig übernimmt, kann danach entschieden werden.",
  "beispiele": [
    "‚Die letzten zwei Protokolle kamen nach dem Termin; mir fehlt dadurch die Grundlage für den Versand‘ beschreibt Verhalten und Wirkung.",
    "‚Du bist immer unorganisiert‘ bewertet die Person und verallgemeinert mit ‚immer‘; die Aussage lädt eher zur Verteidigung als zur Lösung ein."
  ],
  "fallbeispiel": "Ein Bericht kommt zwei Tage nach dem vereinbarten Termin. Statt ‚Du bist unzuverlässig‘ sagt die Führungskraft: ‚Der Bericht kam am Mittwoch statt am Montag. Mir fehlte dadurch die Grundlage für den Versand. Wie können wir den nächsten Termin sichern?‘ Die Rückmeldung benennt Beobachtung, Wirkung und einen nächsten Schritt.",
  "typische_fehler": "Verallgemeinerungen wie ‚immer‘ und ‚nie‘, Feedback vor anderen oder Kritik aus zweiter Hand. Beim Annehmen wird häufig sofort gerechtfertigt, bevor das konkrete Beispiel überhaupt verstanden ist.",
  "verstaendnisfragen": [
    "Warum ist ‚Ich-Botschaft‘ hilfreich? Sie beschreibt die eigene Wahrnehmung und Wirkung, statt eine unbeweisbare Eigenschaft der Person zu behaupten.",
    "Was sollte man bei unklarem Feedback tun? Zuhören und um ein konkretes Beispiel bitten."
  ],
  "pruefungsbezug": "Bei der Bewertung jede Rückmeldung auf beschreibend, konkret, zeitnah, unter vier Augen und Ich-Botschaft prüfen. Beim Annehmen Zuhören, Nachfragen und Bedanken nennen.",
  "merksatz": "Feedback beschreibt Verhalten in einer Situation, nicht den Wert oder Charakter eines Menschen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### d3 · Andere Länder, andere Regeln

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** kommunikation (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Interkulturelle Besonderheiten berücksichtigen und Gespräche bewerten

**Aufbauauftrag:** Ziel und beobachtbaren Sachverhalt klären; einen kurzen Dialog entwickeln und Wirkung sowie Alternative jeder zentralen Reaktion erklären.

**Passender Gegenfall:** Eine andere plausible Deutung oder Gesprächslage zulassen; Verständnisrückfrage statt Gedankenlesen.

**Darstellung:** Kommentierter Dialog oder Fallvergleich; vorhandene Kommunikationsgrafik einmal nutzen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `tabelle-2`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "d3",
  "titel": "Andere Länder, andere Regeln",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Rahmenlehrplan verlangt ausdrücklich, interkulturelle Besonderheiten zu berücksichtigen. {{begriff:interkulturelle-kommunikation|Interkulturelle Kommunikation}} bedeutet nicht, Länderlisten auswendig zu lernen — sondern zu wissen, ==auf welchen Feldern Unterschiede überhaupt auftreten==."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Feld",
        "Worin sich Kulturen unterscheiden",
        "Folge im Geschäftsalltag"
      ],
      "zeilen": [
        {
          "zellen": [
            "Direktheit",
            "offene Kritik oder Andeutung",
            "Ein „schwierig“ kann ein Nein sein"
          ],
          "detail": "**Der häufigste Stolperstein für deutsche Betriebe.** In vielen Kulturen gilt ein direktes Nein als unhöflich; ausgedrückt wird es durch Zögern, Ausweichen oder ein sehr höfliches „wir prüfen das“. Wer das als Zustimmung liest, wartet vergeblich."
        },
        {
          "zellen": [
            "Zeitverständnis",
            "Termin als Zusage oder als Orientierung",
            "Pünktlichkeit wird unterschiedlich streng gesehen"
          ]
        },
        {
          "zellen": [
            "Hierarchie",
            "Entscheidung im Team oder an der Spitze",
            "Der Gesprächspartner darf womöglich nichts entscheiden"
          ]
        },
        {
          "zellen": [
            "Beziehung vor Sache",
            "erst Vertrauen, dann Geschäft",
            "Small Talk ist nicht Zeitverschwendung, sondern Teil der Verhandlung"
          ]
        },
        {
          "zellen": [
            "Körpersprache",
            "Abstand, Blickkontakt, Begrüßung",
            "Was Nähe zeigt, kann Aufdringlichkeit bedeuten"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Die brauchbarste Haltung ist nicht Wissen, sondern Zurückhaltung im Deuten: Wenn dich etwas irritiert, ist die erste Erklärung selten die richtige. Nachfragen statt interpretieren — und im Zweifel förmlicher bleiben, als du müsstest."
    },
    {
      "typ": "absatz",
      "text": "Zum Schluss verlangt der Lehrplan etwas, das nach der Präsentation aus Lernfeld 1 bekannt vorkommt: einen **Kriterienkatalog zur Beurteilung von Gesprächssituationen**. Er wird vorher aufgestellt, nicht hinterher."
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
            "Vorbereitung",
            "War das Ziel vorher klar? Lagen die Unterlagen bereit?"
          ]
        },
        {
          "zellen": [
            "Gesprächsführung",
            "Wurden offene Fragen gestellt? Wurde ausreden gelassen?"
          ]
        },
        {
          "zellen": [
            "Zuhören",
            "Wurde zusammengefasst und nachgefragt?"
          ]
        },
        {
          "zellen": [
            "Sprache",
            "Verständlich, ohne Fachjargon, in Ich-Botschaften?"
          ]
        },
        {
          "zellen": [
            "Ergebnis",
            "Steht am Ende fest, wer was bis wann tut?"
          ]
        },
        {
          "zellen": [
            "Nachbereitung",
            "Wurde eine Notiz erstellt und Zugesagtes angestoßen?"
          ]
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Feedbackregel wird verletzt?",
      "kategorien": [
        "Nicht beschreibend",
        "Nicht konkret",
        "Nicht zeitnah",
        "Nicht unter vier Augen"
      ],
      "aufgaben": [
        {
          "text": "„Du bist unzuverlässig.“",
          "loesung": "Nicht beschreibend"
        },
        {
          "text": "„Im März lief da schon mal was schief.“",
          "loesung": "Nicht zeitnah"
        },
        {
          "text": "Kritik im Meeting vor acht Kollegen.",
          "loesung": "Nicht unter vier Augen"
        },
        {
          "text": "„Irgendwie klappt das mit dir nie so richtig.“",
          "loesung": "Nicht konkret"
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
    "Interkulturelle Kommunikation betrifft unterschiedliche Erwartungen, nicht starre Länderklischees.",
    "Gesprächsqualität kann anhand vorher festgelegter Kriterien bewertet werden."
  ],
  "erklaerung": "Unterschiede können bei Direktheit, Zeitverständnis, Hierarchie, Beziehungsaufbau und Körpersprache liegen. Eine höfliche oder ausweichende Antwort darf nicht vorschnell als Zustimmung gelesen werden. Die sichere Haltung ist, Irritationen nachzufragen und Vereinbarungen ausdrücklich zu sichern. Ein Kriterienkatalog macht außerdem die spätere Gesprächsbewertung nachvollziehbar.",
  "beispiele": [
    "‚Das ist sehr interessant, wir schauen uns das an‘ kann in einem interkulturellen Kontext eine höfliche Zurückhaltung statt einer Zusage bedeuten; eine konkrete Rückfrage schafft Klarheit.",
    "Wenn Entscheidungen in einer Organisation an der Spitze getroffen werden, muss geprüft werden, ob der Gesprächspartner überhaupt entscheiden darf."
  ],
  "fallbeispiel": "Ein ausländischer Geschäftspartner antwortet auf einen Terminvorschlag ausweichend und meldet sich nicht mehr. Statt die Antwort als feste Zusage zu behandeln, fragt die Mitarbeiterin freundlich nach und bietet zwei konkrete Termine mit einer Rückmeldefrist an. Danach bewertet sie das Gespräch anhand von Vorbereitung, Gesprächsführung, Zuhören, Sprache, Ergebnis und Nachbereitung.",
  "typische_fehler": "Kulturunterschiede als feste Eigenschaften einzelner Länder behandeln oder eine ungewohnte Reaktion sofort negativ bewerten. Ebenso problematisch ist eine Nachbereitung ohne Kriterien, bei der nur das persönliche Gefühl zählt.",
  "verstaendnisfragen": [
    "Welche Haltung hilft bei interkulturellen Irritationen? Zurückhaltend deuten und nachfragen statt vorschnell interpretieren.",
    "Warum wird der Kriterienkatalog vor dem Gespräch erstellt? Damit die Bewertung nicht nachträglich an eine gewünschte Schlussfolgerung angepasst wird."
  ],
  "pruefungsbezug": "Nicht Länderlisten auswendig aufsagen, sondern ein Feld der möglichen Unterschiede erklären und eine sichere Gesprächsreaktion formulieren. Bei der Bewertung Kriterien und Beobachtung verbinden.",
  "merksatz": "Nicht vorschnell deuten: Unterschiede prüfen, Vereinbarungen sichern, Gespräch anhand klarer Kriterien bewerten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
