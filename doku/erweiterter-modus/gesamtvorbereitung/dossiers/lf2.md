# lf2 · Büroprozesse gestalten und Arbeitsvorgänge organisieren

Quelle: `quellen/lf2.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 6 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Der Arbeitsplatz

**Datei:** `lf2-k1-arbeitsplatz.kapitel.json` · SHA-256 `ac7b42875007b92dcfde976fb7569067984f9dc8b7deedefd60db3900fed5c54`

**Konkreter Kapitelauftrag:** Einen Büroarbeitsplatz mit konkreten Belastungen untersuchen; Ergonomie, Raumkonzept, mobiles Arbeiten und organisatorische Hilfe verbinden.

**Einordnung:** Acht Stunden am Tag. Da lohnt es sich, ihn richtig einzustellen.

### b1 · Was ein Arbeitsplatz braucht

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Anforderungen an einen Büroarbeitsplatz benennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Was ein Arbeitsplatz braucht",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein Büroarbeitsplatz ist mehr als Tisch und Stuhl. ==Die Umgebung entscheidet mit darüber, wie schnell jemand ermüdet und wie viele Fehler passieren.== {{begriff:ergonomie|Ergonomie}} bedeutet dabei immer: Die Arbeit wird an den Menschen angepasst, nicht umgekehrt."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Faktor",
        "Worauf es ankommt",
        "Wenn es fehlt"
      ],
      "zeilen": [
        {
          "zellen": [
            "Licht",
            "genug Helligkeit, blendfrei, Tageslicht",
            "Augen ermüden, Kopfschmerzen"
          ],
          "detail": "**Der Bildschirm steht seitlich zum Fenster** — nicht davor, sonst blendet es, und nicht mit dem Rücken dazu, sonst spiegelt es. Diese eine Regel löst die meisten Beschwerden."
        },
        {
          "zellen": [
            "Lärm",
            "möglichst wenig störende Geräusche",
            "Konzentration bricht ein"
          ],
          "detail": "**Für Bürotätigkeit gelten deutlich strengere Werte als in der Produktion**, weil geistige Arbeit empfindlicher auf Geräusche reagiert als körperliche."
        },
        {
          "zellen": [
            "Klima",
            "angenehme Temperatur, keine Zugluft",
            "Erkältungen, Unwohlsein"
          ]
        },
        {
          "zellen": [
            "Platz",
            "Bewegungsfläche, freie Verkehrswege",
            "Unfallgefahr, Enge"
          ],
          "detail": "**Verkehrswege müssen frei bleiben** — der Karton neben dem Schreibtisch ist im Alltag harmlos und im Brandfall ein Problem."
        },
        {
          "zellen": [
            "Farbe und Gestaltung",
            "ruhige Farben, Pflanzen",
            "Reizarmut, geringes Wohlbefinden"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Ergonomie heißt: Die Arbeit passt sich dem Menschen an.** Licht, Lärm, Klima, Platz und Gestaltung sind die fünf Stellschrauben eines Büroarbeitsplatzes.",
      "karteikarte": "Was bedeutet Ergonomie, und welche fünf Umgebungsfaktoren bestimmen einen Büroarbeitsplatz?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ein Arbeitsplatz beeinflusst Gesundheit und Leistungsfähigkeit.",
    "Ergonomie richtet die Arbeit am Menschen aus."
  ],
  "erklaerung": "Ergonomie betrachtet nicht nur den Stuhl, sondern die gesamte Arbeitssituation. Zu den fünf Umgebungsfaktoren gehören Licht, Lärm, Klima, Platz und Gestaltung. Ein guter Arbeitsplatz reduziert unnötige Belastungen und macht die Arbeitsmittel so erreichbar, dass die Tätigkeit dauerhaft ausgeführt werden kann.",
  "beispiele": [
    "Ein Bildschirmarbeitsplatz mit seitlichem Fenster, ausreichend Platz und passender Beleuchtung berücksichtigt Licht und Raum ebenso wie die Sitzposition.",
    "Eine laute Umgebung kann die Konzentration stören; neben der Gestaltung des Arbeitsplatzes gehört deshalb auch der Lärm in die Betrachtung."
  ],
  "fallbeispiel": "Bei der Prüfung eines neuen Arbeitsplatzes werden fünf Punkte nacheinander notiert: Licht, Lärm, Klima, Platz und Gestaltung. Erst danach wird über einzelne Möbel gesprochen. So wird nicht nur ein zu hoher Bildschirm korrigiert, während etwa Blendung oder fehlende Bewegungsfläche übersehen werden.",
  "typische_fehler": "Ergonomie wird auf einen höhenverstellbaren Stuhl reduziert. Ebenso wird nur die Körperhaltung betrachtet, obwohl Licht, Lärm, Klima, Platz und Gestaltung ebenfalls Belastungsfaktoren sind.",
  "verstaendnisfragen": [
    "Welche fünf Umgebungsfaktoren gehören zur Arbeitsplatzprüfung? Licht, Lärm, Klima, Platz und Gestaltung.",
    "Was ist der Grundgedanke der Ergonomie? Die Arbeit wird an den Menschen angepasst, nicht der Mensch dauerhaft an eine ungeeignete Arbeitssituation."
  ],
  "pruefungsbezug": "Nenne bei offenen Fragen nicht nur Möbel, sondern die vollständigen fünf Umgebungsfaktoren. Das zeigt, dass du den Arbeitsplatz ganzheitlich beurteilst.",
  "merksatz": "Ergonomie ist mehr als Sitzen: Licht, Lärm, Klima, Platz und Gestaltung gehören zusammen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Den Bildschirmarbeitsplatz einstellen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Bildschirmarbeitsplatz ergonomisch einrichten

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `praxistipp-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Den Bildschirmarbeitsplatz einstellen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Für den {{begriff:bildschirmarbeitsplatz|Bildschirmarbeitsplatz}} gibt es klare Vorgaben. Die wichtigste Faustregel lautet: **Ober-, Unter- und Beinbereich bilden jeweils einen rechten Winkel** — Ellenbogen, Hüfte und Knie liegen bei etwa 90 Grad."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Von unten nach oben",
      "titel": "In dieser Reihenfolge einstellen",
      "lead": "Wer oben anfängt, stellt dreimal nach. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Stuhlhöhe",
          "satz": "Füße flach am Boden",
          "text": "Ober- und Unterschenkel bilden etwa einen rechten Winkel, die Füße stehen vollständig auf dem Boden. Reicht der Stuhl nicht tief genug oder der Tisch nicht hoch genug, hilft eine Fußstütze."
        },
        {
          "nr": 2,
          "titel": "Tischhöhe",
          "satz": "Unterarme waagerecht",
          "text": "Die Unterarme liegen locker auf, die Schultern bleiben unten. Ein höhenverstellbarer Tisch erlaubt zusätzlich den Wechsel zwischen Sitzen und Stehen — genau der Wechsel ist das Ziel, nicht die eine perfekte Haltung."
        },
        {
          "nr": 3,
          "titel": "Bildschirm",
          "satz": "oberste Zeile auf oder unter Augenhöhe",
          "text": "Der Blick geht leicht nach unten, der Nacken bleibt entspannt. Der Sehabstand liegt bei üblichen Bildschirmgrößen etwa bei einer Armlänge, größere Bildschirme brauchen mehr."
        },
        {
          "nr": 4,
          "titel": "Tastatur und Maus",
          "satz": "nah am Körper",
          "text": "Vor der Tastatur bleibt eine Handballenauflage von rund zehn bis fünfzehn Zentimetern frei. Die Maus liegt direkt daneben, damit der Arm nicht dauerhaft ausgestreckt wird."
        }
      ],
      "regel": "Die beste Haltung ist die nächste: Kein Sitzen ist so gut, dass es acht Stunden am Stück trägt. Regelmäßiger Wechsel schlägt jede Einstellung."
    },
    {
      "typ": "praxistipp",
      "text": "Merk dir für die Prüfung die **Reihenfolge von unten nach oben**: Stuhl, Tisch, Bildschirm, Eingabegeräte. Wer den Bildschirm zuerst einstellt und danach den Stuhl höher dreht, fängt wieder von vorn an."
    },
    {
      "typ": "check",
      "frage": "Der Bildschirm steht direkt vor dem Fenster, weil dort das meiste Licht ist. Was sagst du?",
      "optionen": [
        {
          "text": "Gut so — viel Tageslicht ist ergonomisch erwünscht",
          "richtig": false,
          "echo": "Tageslicht ist erwünscht, diese Anordnung aber nicht. Das helle Fenster hinter dem Bildschirm zwingt die Augen zu ständigem Anpassen zwischen hell und dunkel."
        },
        {
          "text": "Ungünstig — der Bildschirm sollte seitlich zum Fenster stehen",
          "richtig": true,
          "echo": "Richtig. Steht der Bildschirm vor dem Fenster, blendet der helle Hintergrund. Steht er mit dem Rücken zum Fenster, spiegelt sich das Licht auf der Oberfläche. Beides ermüdet die Augen. Die Lösung ist die seitliche Anordnung, ergänzt um eine Blendschutzvorrichtung wie Jalousien."
        },
        {
          "text": "Egal — moderne Bildschirme sind entspiegelt",
          "richtig": false,
          "echo": "Entspiegelung hilft gegen Reflexionen, nicht gegen den Helligkeitsunterschied. Gegen ein sonnenbeschienenes Fenster im Rücken des Bildschirms kommt keine Beschichtung an."
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
    "Die Einstellung eines Arbeitsplatzes beginnt mit der Sitzposition.",
    "Jede Einstellung beeinflusst die nächste."
  ],
  "erklaerung": "Der Bildschirmarbeitsplatz wird von unten nach oben eingestellt: zuerst Stuhl, dann Tisch, Bildschirm, Tastatur und Maus. Füße stehen vollständig auf dem Boden, Ellenbogen, Hüfte und Knie bilden ungefähr rechte Winkel. Die oberste Bildschirmzeile liegt auf oder unter Augenhöhe, der Blick geht leicht nach unten und der Abstand beträgt etwa eine Armlänge. Der Bildschirm steht seitlich zum Fenster.",
  "beispiele": [
    "Reicht die Tischhöhe nicht für waagerechte Unterarme und lockere Schultern, kann eine Fußstütze helfen, statt die Sitzhaltung zu erzwingen.",
    "Ein Bildschirm auf einem Ordnerstapel kann zu hoch stehen. Die oberste Zeile gehört auf oder unter Augenhöhe; das Fenster sollte nicht hinter der Person liegen."
  ],
  "fallbeispiel": "Eine Kollegin hat Nacken- und Augenschmerzen. Der Bildschirm steht auf Ordnern, der Stuhl ist nicht verstellbar und das Fenster liegt hinter ihr. Die Korrektur erfolgt in der Reihenfolge: geeigneten Stuhl bereitstellen, Tischhöhe anpassen, Bildschirm auf Augenhöhe oder darunter ausrichten und den Arbeitsplatz mit seitlichem Fenster positionieren. Danach werden Tastatur und Maus nah am Körper angeordnet.",
  "typische_fehler": "Der Bildschirm wird zuerst eingestellt und der Stuhl danach verändert. Häufig wird die oberste Zeile zu hoch positioniert oder der Bildschirm direkt vor beziehungsweise mit dem Rücken zum Fenster gestellt.",
  "verstaendnisfragen": [
    "Warum wird von unten nach oben eingestellt? Weil Sitz- und Tischhöhe die spätere Bildschirmposition beeinflussen.",
    "Wo soll der Bildschirm zum Fenster stehen? Seitlich, damit direkte Blendung und Spiegelungen reduziert werden."
  ],
  "pruefungsbezug": "Schreibe die Reihenfolge vollständig aus: Stuhl, Tisch, Bildschirm, Tastatur, Maus. Ergänze rechte Winkel, Augenhöhe und seitlichen Fenstereinfall.",
  "merksatz": "Von unten nach oben einstellen: Stuhl, Tisch, Bildschirm, Tastatur, Maus."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Wer wofür verantwortlich ist

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Pflichten des Arbeitgebers im Arbeitsschutz erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wer wofür verantwortlich ist",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Arbeitsschutz ist keine Freundlichkeit des Arbeitgebers, sondern Pflicht. Kern ist die {{begriff:gefaehrdungsbeurteilung|Gefährdungsbeurteilung}} nach {{par:arbschg-5|§ 5 ArbSchG}}: Der Arbeitgeber muss ermitteln, welche Gefährdungen bestehen und welche Maßnahmen nötig sind — **und das schriftlich festhalten**."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Seiten",
      "titel": "Pflichten im Arbeitsschutz",
      "lead": "Schutz funktioniert nur, wenn beide mitmachen. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Arbeitgeber",
          "ton": "gold",
          "punkte": [
            {
              "text": "Gefährdungen beurteilen und dokumentieren",
              "detail": "Für jeden Arbeitsplatz, bei Änderungen erneut. Bei Bildschirmarbeit gehören ausdrücklich auch Augenbelastung und psychische Belastung dazu."
            },
            {
              "text": "Arbeitsplatz einrichten und ausstatten",
              "detail": "Geeignete Möbel, Beleuchtung, Bildschirme. Die Kosten trägt der Betrieb — Arbeitsschutz darf nicht auf Beschäftigte abgewälzt werden."
            },
            {
              "text": "Unterweisen",
              "detail": "Vor Aufnahme der Tätigkeit und danach regelmäßig, mindestens jährlich. Bei Jugendlichen gelten zusätzliche Vorschriften."
            },
            {
              "text": "Augenuntersuchung anbieten",
              "detail": "Bei Bildschirmarbeit ist eine angemessene Untersuchung der Augen anzubieten. Ist eine spezielle Sehhilfe für die Arbeit nötig, trägt sie der Arbeitgeber."
            }
          ]
        },
        {
          "name": "Beschäftigte",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Weisungen befolgen",
              "detail": "Schutzmaßnahmen sind keine Empfehlung. Wer sie ignoriert, verletzt seine arbeitsvertraglichen Pflichten."
            },
            {
              "text": "Gefahren melden",
              "detail": "Der defekte Stuhl, das lose Kabel, die abgelaufene Verlängerung. Wer es sieht, muss es melden — und darf deshalb keine Nachteile haben."
            },
            {
              "text": "Einrichtungen bestimmungsgemäß nutzen",
              "detail": "Der höhenverstellbare Tisch nützt nichts, wenn niemand ihn verstellt. Ausstattung wirkt nur, wenn sie auch genutzt wird."
            },
            {
              "text": "An Unterweisungen teilnehmen",
              "detail": "Sie sind Arbeitszeit und Pflicht, kein freiwilliges Angebot."
            }
          ]
        }
      ],
      "regel": "Die Jugend- und Auszubildendenvertretung und der Betriebsrat wachen darüber, dass diese Pflichten eingehalten werden — Arbeitsschutz ist ein Mitbestimmungsthema."
    },
    {
      "typ": "achtung",
      "text": "Für **Jugendliche unter 18** gelten schärfere Regeln aus dem {{begriff:jarbschg|Jugendarbeitsschutzgesetz}}: kürzere Arbeitszeit, längere Pausen, Beschäftigungsverbote für gefährliche Arbeiten. Wer noch keine 18 ist, darf im Betrieb nicht wie ein Erwachsener eingesetzt werden."
    },
    {
      "typ": "merke",
      "text": "{{par:arbschg-5|§ 5 ArbSchG}}: Der Arbeitgeber **beurteilt die Gefährdungen und dokumentiert sie**. Beschäftigte müssen die Maßnahmen befolgen und Gefahren melden.",
      "karteikarte": "Was verlangt die Gefährdungsbeurteilung, und welche Pflichten haben Arbeitgeber und Beschäftigte im Arbeitsschutz?"
    },
    {
      "typ": "zuordnen",
      "lead": "Wessen Pflicht ist das?",
      "kategorien": [
        "Arbeitgeber",
        "Beschäftigte"
      ],
      "aufgaben": [
        {
          "text": "Den wackeligen Bürostuhl in der Werkstatt melden.",
          "loesung": "Beschäftigte"
        },
        {
          "text": "Die Gefährdungsbeurteilung schriftlich festhalten.",
          "loesung": "Arbeitgeber"
        },
        {
          "text": "Eine Bildschirmbrille bezahlen, die nur für die Arbeit gebraucht wird.",
          "loesung": "Arbeitgeber"
        },
        {
          "text": "An der jährlichen Sicherheitsunterweisung teilnehmen.",
          "loesung": "Beschäftigte"
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
    "Arbeitsplatzmängel können Gefährdungen verursachen.",
    "Arbeitsschutz verbindet Verantwortung des Arbeitgebers mit Mitwirkung der Beschäftigten."
  ],
  "erklaerung": "Nach § 5 ArbSchG beurteilt der Arbeitgeber die Gefährdungen am Arbeitsplatz, leitet Schutzmaßnahmen ab und dokumentiert das Ergebnis. Bei Bildschirmarbeit gehören Augen, Körper und psychische Belastungen in die Betrachtung. Beschäftigte müssen Unterweisungen beachten und erkannte Gefahren melden. Für Jugendliche gelten zusätzlich die strengeren Regeln des Jugendarbeitsschutzgesetzes.",
  "beispiele": [
    "Meldet eine Beschäftigte Spiegelungen und Nackenbeschwerden, gehört der Arbeitsplatz in die Gefährdungsbeurteilung; die Mängel dürfen nicht nur individuell ausgeglichen werden.",
    "Bei einer minderjährigen Auszubildenden werden neben ergonomischen Fragen auch die Schutzgrenzen des JArbSchG geprüft."
  ],
  "fallbeispiel": "Eine neue Kollegin klagt nach zwei Wochen über Nacken- und Augenschmerzen. Die Ursache wird nicht allein bei ihr gesucht: Der Arbeitgeber muss die Gefährdung nach § 5 ArbSchG beurteilen und dokumentieren. Die Kollegin meldet die Mängel und befolgt Unterweisungen; der Arbeitgeber stellt geeignete Arbeitsmittel bereit und beseitigt die erkannte Belastung.",
  "typische_fehler": "Die Gefährdungsbeurteilung wird als Aufgabe der betroffenen Person angesehen. Ebenso wird die Meldung eines Mangels als ausreichend betrachtet, ohne die Verantwortung des Arbeitgebers für Beurteilung und Maßnahmen zu nennen.",
  "verstaendnisfragen": [
    "Wer ist für die Gefährdungsbeurteilung verantwortlich? Der Arbeitgeber.",
    "Was müssen Beschäftigte bei erkannten Gefahren tun? Sie melden die Gefahr und beachten die Unterweisungen und Schutzmaßnahmen."
  ],
  "pruefungsbezug": "Verbinde im Fall immer drei Elemente: Arbeitgeber beurteilt und dokumentiert, Beschäftigte melden und befolgen, Jugendliche werden zusätzlich nach JArbSchG geschützt.",
  "merksatz": "Der Arbeitgeber beurteilt die Gefährdung; Beschäftigte melden sie und wirken bei den Schutzmaßnahmen mit."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Zeit und Aufgaben planen

**Datei:** `lf2-k2-zeitmanagement.kapitel.json` · SHA-256 `ce7ed1b7a39bb48deda26a9605d999d3055fc4977907f068b26551ba29f59ab6`

**Konkreter Kapitelauftrag:** Einen Arbeitstag mit konkurrierenden Fristen planen; Wichtigkeit, Dringlichkeit, Zeitpuffer und Befugnisse an den Folgen erklären.

**Einordnung:** Der Tag hat acht Stunden. Verplanen kannst du fünf.

### b1 · Der Tag nach ALPEN

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Tag nach der ALPEN-Methode planen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Der Tag nach ALPEN",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:alpen-methode|ALPEN-Methode}} ist die bekannteste Tagesplanung — und der einzige Punkt, an dem die meisten scheitern, ist der Puffer. ==Wer acht Stunden verplant, hat nach der ersten Störung einen Plan, der nicht mehr stimmt.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Schritt",
        "Was passiert",
        "Häufiger Fehler"
      ],
      "zeilen": [
        {
          "zellen": [
            "**A** — Aufgaben notieren",
            "alles aufschreiben, was ansteht",
            "im Kopf behalten wollen"
          ],
          "detail": "**Erst auf Papier wird eine Aufgabe planbar.** Solange sie nur gedacht ist, kostet sie ständig Aufmerksamkeit, ohne dass sie erledigt wird."
        },
        {
          "zellen": [
            "**L** — Länge schätzen",
            "jeder Aufgabe eine Dauer geben",
            "systematisch zu optimistisch"
          ],
          "detail": "**Schätzungen sind fast immer zu kurz.** Wer seine eigenen Schätzungen eine Woche lang mit der Wirklichkeit vergleicht, lernt seinen persönlichen Faktor kennen."
        },
        {
          "zellen": [
            "**P** — Pufferzeiten",
            "nur rund 60 % verplanen",
            "den ganzen Tag füllen"
          ],
          "detail": "**Der Kern der Methode.** Etwa 40 Prozent bleiben frei für Störungen, Rückfragen und Unvorhergesehenes. Das ist keine Faulheit, sondern Erfahrung."
        },
        {
          "zellen": [
            "**E** — Entscheidungen",
            "Prioritäten setzen, kürzen, delegieren",
            "alles gleich wichtig nehmen"
          ]
        },
        {
          "zellen": [
            "**N** — Nachkontrolle",
            "abends prüfen und Offenes übertragen",
            "einfach aufhören"
          ],
          "detail": "**Ohne Nachkontrolle lernt die Planung nichts.** Erst der Abgleich zeigt, ob die Schätzungen stimmen und was ständig liegen bleibt."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Dazu kommt die {{begriff:tagesleistungskurve|Tagesleistungskurve}}: Die Leistungsfähigkeit ist am Vormittag am höchsten, fällt nach dem Mittag deutlich ab und steigt am späten Nachmittag noch einmal leicht an. **Schwierige Aufgaben gehören in das Vormittagshoch**, Routine wie Ablage und Post in das Tief."
    },
    {
      "typ": "merke",
      "text": "**ALPEN: Aufgaben, Länge, Puffer, Entscheidungen, Nachkontrolle.** Verplant wird nur etwa 60 Prozent des Tages — der Rest gehört den Störungen, die sicher kommen.",
      "karteikarte": "Wofür stehen die fünf Buchstaben der ALPEN-Methode, und wie viel Prozent des Tages sollten verplant werden?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ein Arbeitstag enthält planbare Aufgaben und ungeplante Störungen.",
    "Aufgaben unterscheiden sich nach Dauer und Leistungsanforderung."
  ],
  "erklaerung": "ALPEN steht für Aufgaben notieren, Länge schätzen, Puffer einplanen, Entscheidungen über Prioritäten treffen und am Ende nachkontrollieren. Nur etwa 60 Prozent des Tages werden fest verplant. Schwierige Aufgaben gehören in das Vormittagshoch der Tagesleistungskurve; Routineaufgaben passen eher in das Nachmittagstief.",
  "beispiele": [
    "Bei einer Auswertung werden zuerst Aufgabe und voraussichtliche Länge notiert, danach ein Zeitpuffer für Rückfragen und Telefonate freigelassen.",
    "Die Tagespost wird in einen festen Routineblock gelegt, während eine anspruchsvolle Auswertung in die leistungsstarke Vormittagsphase kommt."
  ],
  "fallbeispiel": "Eine Auswertung soll bis Freitag fertig sein und benötigt Zahlen aus zwei Abteilungen. Nach ALPEN werden alle Aufgaben notiert und geschätzt. Die Zahlen werden am Montag angefordert, erhalten eine eigene Wiedervorlage und eine Frist bis Mittwochmittag. Die Auswertung kommt in die Vormittagsstunden, die Tagespost in zwei Routineblöcke, und Donnerstag bleibt als Puffer. Am Tagesende werden offene Punkte übertragen.",
  "typische_fehler": "Der gesamte Tag wird zu 100 Prozent verplant oder der Puffer nur als freie Zeit ohne Zweck behandelt. Auch die Nachkontrolle wird oft ausgelassen, obwohl sie die Planung für die nächsten Tage verbessert.",
  "verstaendnisfragen": [
    "Wofür steht das P in ALPEN? Für Pufferzeiten, sodass nur etwa 60 Prozent fest verplant werden.",
    "Warum kommen schwierige Aufgaben in den Vormittag? Weil die Tagesleistungskurve dort ihr Hoch hat."
  ],
  "pruefungsbezug": "Nenne ALPEN ausgeschrieben und begründe den Puffer mit konkreten Störungen. Bei Fällen zusätzlich die Tagesleistungskurve auf die Aufgaben anwenden.",
  "merksatz": "ALPEN verhindert Überplanung: Aufgaben, Länge, Puffer, Entscheidungen, Nachkontrolle."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Wichtig ist nicht dasselbe wie dringend

**Status:** Pilot eingebaut; fachliche Gegenprüfung 28.10., technische Restpunkte offen. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aufgaben nach Wichtigkeit und Dringlichkeit einordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Wichtig ist nicht dasselbe wie dringend",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:eisenhower|Eisenhower-Matrix}} trennt zwei Dinge, die im Alltag ständig verwechselt werden. **Dringend** heißt: Es drängt zeitlich. **Wichtig** heißt: Es zahlt auf ein Ziel ein. ==Das Problem ist das Feld wichtig, aber nicht dringend — es wird dauerhaft verdrängt und rächt sich später.=="
    },
    {
      "typ": "grafik",
      "variante": "matrix",
      "kopf": "Vier Felder",
      "titel": "Wohin gehört welche Aufgabe?",
      "lead": "Aufgabe oben antippen, dann das passende Feld anklicken.",
      "achsen": {
        "x": "Dringlichkeit →",
        "y": "Wichtigkeit →"
      },
      "felder": [
        {
          "id": "sofort",
          "name": "Sofort selbst tun",
          "x": 1,
          "y": 1
        },
        {
          "id": "termin",
          "name": "Terminieren",
          "x": 0,
          "y": 1
        },
        {
          "id": "delegieren",
          "name": "Delegieren",
          "x": 1,
          "y": 0
        },
        {
          "id": "streichen",
          "name": "Streichen",
          "x": 0,
          "y": 0
        }
      ],
      "aufgaben": [
        {
          "text": "Angebot für Großkunden, Frist läuft heute ab",
          "feld": "sofort",
          "echo": "Wichtig für den Umsatz und zeitlich zwingend — das ist der klassische A-Fall, den niemand abgeben kann."
        },
        {
          "text": "Ablagesystem für das nächste Quartal überarbeiten",
          "feld": "termin",
          "echo": "Wichtig, aber ohne Zeitdruck. Genau solche Aufgaben verschwinden, wenn man sie nicht fest einplant — und rächen sich Monate später als Chaos."
        },
        {
          "text": "Kopierpapier nachbestellen, Vorrat fast leer",
          "feld": "delegieren",
          "echo": "Zeitlich dringend, aber inhaltlich anspruchslos. Solche Aufgaben gehören an jemanden, der sie genauso gut erledigen kann."
        },
        {
          "text": "Zum dritten Mal denselben Werbenewsletter durchlesen",
          "feld": "streichen",
          "echo": "Weder wichtig noch dringend. Der ehrlichste Umgang damit ist, ihn abzubestellen — Zeitdiebe verschwinden nicht durch bessere Planung."
        },
        {
          "text": "Reklamation eines langjährigen Kunden, seit gestern offen",
          "feld": "sofort",
          "echo": "Wichtig, weil eine Kundenbeziehung auf dem Spiel steht, und dringend, weil jeder weitere Tag den Ärger vergrößert."
        },
        {
          "text": "Eigene Fortbildung für das kommende Jahr planen",
          "feld": "termin",
          "echo": "Hoher Wert, kein Zeitdruck — deshalb landet sie zuverlässig ganz unten, wenn man ihr keinen festen Termin gibt."
        }
      ],
      "regel": "Das gefährlichste Feld ist oben links: wichtig, aber nicht dringend. Wer es ignoriert, arbeitet dauerhaft nur noch an Dringendem — und das ist genau die Beschreibung von Stress."
    },
    {
      "typ": "praxistipp",
      "text": "Delegieren heißt nicht abschieben. Wer eine Aufgabe abgibt, muss drei Dinge mitgeben: **das Ziel, die Frist und die Befugnis**. Fehlt eine davon, kommt die Aufgabe zurück — meist zum ungünstigsten Zeitpunkt."
    },
    {
      "typ": "absatz",
      "text": "Ergänzend hilft das {{begriff:pareto|Pareto-Prinzip}}: Ein kleiner Teil des Aufwands bringt den größten Teil des Ergebnisses. Als Denkhilfe brauchbar — **aber es ist eine Beobachtung, kein Naturgesetz.** Die Zahlen 80 und 20 sind Faustwerte, keine Rechengrößen."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "darstellung": "vollfassung",
  "ziel": "Du kannst Aufgaben anhand ihrer Folgen und Fristen priorisieren und erklären, wann du selbst handelst und wann du Zuständigkeiten klären musst.",
  "vorwissen_kurz": "**Dringlichkeit** beschreibt zeitlichen Handlungsdruck. **Wichtigkeit** beschreibt den Beitrag zu relevanten Zielen oder die Folgen, wenn die Aufgabe liegen bleibt. Maßgeblich ist der betriebliche Auftrag und deine Rolle — nicht, was dich persönlich am meisten interessiert.",
  "inhalt": [
    {
      "typ": "zwischentitel",
      "id": "c-warum",
      "text": "Warum das Lauteste nicht immer zuerst kommt"
    },
    {
      "typ": "absatz",
      "id": "c-warum-1",
      "text": "Im Büro verlangen oft mehrere Aufgaben gleichzeitig Aufmerksamkeit: Eine Nachricht ist als „dringend“ markiert, das Telefon klingelt, und eine Auswertung ist erst nächste Woche fällig. Wer nur auf Unterbrechungen reagiert, beginnt die Auswertung womöglich erst, wenn kaum noch Zeit bleibt. Die Aufgabe war schon vorher wichtig — sie war nur noch nicht unmittelbar dringend."
    },
    {
      "typ": "absatz",
      "id": "c-warum-2",
      "text": "Die {{begriff:eisenhower|Eisenhower-Matrix}} hilft, diese beiden Fragen getrennt zu beantworten. Zuerst: Welche Folgen hat es, wenn die Aufgabe nicht erledigt wird? Danach: Bis wann muss etwas geschehen, und welche Vorarbeiten brauchen Zeit? Erst dann wählst du eine Handlung. Die Matrix ist eine Entscheidungshilfe, kein Ersatz für Fachwissen oder betriebliche Zuständigkeit."
    },
    {
      "typ": "basis",
      "id": "c-matrix",
      "ref": "grafik-1"
    },
    {
      "typ": "zwischentitel",
      "id": "c-fall",
      "text": "Ein Vormittag bei MAKEL"
    },
    {
      "typ": "absatz",
      "id": "c-fall-1",
      "text": "Du unterstützt die Verwaltung, und vier Aufgaben liegen vor: Eine sachlich geprüfte Rechnung muss heute zur zuständigen Freigabe, damit die vereinbarte Skontofrist genutzt werden kann. Eine Präsentation für neue Auszubildende ist in zwei Wochen fällig; dafür fehlen noch Angaben aus zwei Abteilungen. Eine Rückfrage zur Bewirtung soll heute weitergeleitet werden. Und alte, nicht mehr verwendbare Werbeprospekte sollen „irgendwann“ sortiert werden."
    },
    {
      "typ": "tabelle",
      "id": "c-tabelle",
      "spalten": [
        "Aufgabe",
        "Begründete Einordnung",
        "Nächste Handlung in deiner Rolle"
      ],
      "zeilen": [
        {
          "zellen": [
            "Rechnung zur heutigen Freigabe weitergeben",
            "Wichtig und dringend: Frist und wirtschaftliche Folge (Skonto)",
            "Vollständigkeit prüfen und sofort an die befugte Person geben — eine fehlende Zahlungsbefugnis nicht selbst ersetzen."
          ]
        },
        {
          "zellen": [
            "Azubi-Präsentation vorbereiten",
            "Wichtig, noch nicht unmittelbar dringend",
            "Angaben heute anfordern und einen Bearbeitungstermin fest einplanen."
          ]
        },
        {
          "zellen": [
            "Bewirtungsrückfrage weiterleiten",
            "Zeitgebunden, aber geringer eigener Zielbeitrag",
            "Zuständige Person informieren; selbst nur kurz erledigen, wenn es Wichtigeres nicht verdrängt."
          ]
        },
        {
          "zellen": [
            "Unbrauchbare Prospekte sortieren",
            "Im Fall weder dringend noch wichtig",
            "Klären, ob die Aufgabe entfallen kann. Keine eigenmächtige Vernichtung aufbewahrungspflichtiger Unterlagen."
          ]
        }
      ]
    },
    {
      "typ": "zwischentitel",
      "id": "c-terminieren",
      "text": "Warum Terminieren mehr ist als Verschieben"
    },
    {
      "typ": "absatz",
      "id": "c-terminieren-1",
      "text": "„Mache ich später“ ist noch kein Plan. Ein Termin benennt dagegen einen bearbeitbaren nächsten Schritt und die dafür reservierte Zeit. Für die Präsentation forderst du heute die Angaben der Abteilungen an, vereinbarst eine Rückmeldung bis Mittwoch und erstellst am Donnerstag den Entwurf. So werden Abhängigkeiten sichtbar, bevor sie die Frist gefährden."
    },
    {
      "typ": "zwischentitel",
      "id": "c-delegieren",
      "text": "Warum Delegieren nicht automatisch erlaubt ist"
    },
    {
      "typ": "absatz",
      "id": "c-delegieren-1",
      "text": "Für dringende, weniger wichtige Aufgaben heißt die Empfehlung häufig „delegieren“. Als Auszubildende oder Auszubildender hast du aber nicht automatisch Weisungsbefugnis. Du kannst Zuständigkeiten klären, eine Aufgabe nach Absprache weitergeben oder deine Prioritäten mit der ausbildenden Person besprechen. Eine Methode verschafft keine Befugnis, die dir betrieblich nicht eingeräumt wurde."
    }
  ],
  "details": [
    {
      "id": "c-folge-frist",
      "kategorie": "grundlagen",
      "titel": "Folge und Frist",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "c-folge-frist-1",
          "text": "Eine Aufgabe ist nicht schon deshalb wichtig, weil sie aufwendig ist: Ein kurzer sicherheitsrelevanter Hinweis kann wichtiger sein als die lange optische Überarbeitung einer Präsentation. Ebenso ist eine Aufgabe nicht schon deshalb dringend, weil jemand dieses Wort benutzt. Frag nach der tatsächlichen Frist und der Folge einer Verzögerung. Gesetzliche und sicherheitsrelevante Pflichten dürfen dabei nicht nach Geschmack abgewertet werden."
        }
      ]
    },
    {
      "id": "c-drucker",
      "kategorie": "vergleich",
      "titel": "Wenn der Drucker für den Versand ausfällt",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "c-drucker-1",
          "text": "Ein leerer Toner gilt zunächst als Routine. Stoppt der Ausfall aber den heutigen Versand, ändern sich die Folgen: Die Behebung wird wichtig und dringend. Die Matrix ordnet nicht bestimmte Gegenstände ein, sondern bewertet eine konkrete Situation."
        }
      ]
    },
    {
      "id": "c-ueberlast",
      "kategorie": "sonderfall",
      "titel": "Alles scheint wichtig und dringend",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "c-ueberlast-1",
          "text": "Wenn mehrere Pflichten gleichzeitig nicht zu schaffen sind, reicht Umordnen nicht. Benenne Fristen, Aufwand und Folgen und lege der zuständigen Person konkrete Alternativen vor: Unterstützung, geänderter Umfang oder ein neuer Termin. Dauerhafte Überlastung ist nicht allein ein persönliches Planungsproblem — die Methode hilft vor allem, den Konflikt rechtzeitig sichtbar zu machen."
        }
      ]
    },
    {
      "id": "c-alpen",
      "kategorie": "zusammenhang",
      "titel": "ALPEN und Eisenhower",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "c-alpen-1",
          "text": "Eisenhower hilft bei der Entscheidung, welche Aufgaben Vorrang haben. ALPEN unterstützt die anschließende Tagesplanung mit Aufwandsschätzung, Puffer und Nachkontrolle. Beide Werkzeuge lösen unterschiedliche Teilprobleme."
        },
        {
          "typ": "verweis",
          "id": "c-alpen-2",
          "text": "Weiterlesen:",
          "ziele": [
            "k2-b1",
            "k2-b3",
            "lf13:k2"
          ]
        }
      ]
    },
    {
      "id": "c-pareto",
      "kategorie": "zusammenhang",
      "titel": "Das Pareto-Prinzip als Denkhilfe",
      "inhalt": [
        {
          "typ": "absatz",
          "id": "c-pareto-1",
          "text": "Ergänzend hilft das {{begriff:pareto|Pareto-Prinzip}}: Ein kleiner Teil des Aufwands bringt oft den größten Teil des Ergebnisses. Als Denkhilfe ist das brauchbar — **es ist aber eine Beobachtung, kein Naturgesetz.** Die Zahlen 80 und 20 sind Faustwerte, keine Rechengrößen."
        }
      ]
    }
  ],
  "verstaendnisfragen": [
    {
      "id": "c1",
      "frage": "Warum darf die Präsentation nicht warten, bis sie dringend wird?",
      "antwort": "Weil die Angaben aus anderen Abteilungen und die eigene Bearbeitung Zeit brauchen. Die Aufgabe ist bereits wichtig; frühes Terminieren und Anfordern der Angaben verhindert vermeidbaren Zeitdruck."
    },
    {
      "id": "c2",
      "frage": "Ist ein leerer Toner immer „dringend, aber unwichtig“?",
      "antwort": "Nein. Fällt ohne Drucker ein wichtiger Versand aus, hat die Behebung wesentliche Folgen und kann wichtig und dringend sein. Die Einordnung hängt vom Fall ab, nicht vom Wort „Toner“."
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

### b3 · Zeitdiebe

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Zeitdiebe erkennen und begrenzen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `merke-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Zeitdiebe",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:zeitdieb|Zeitdieb}} ist eine wiederkehrende Störung, die Zeit ohne Ergebnis verbraucht. Sie lassen sich selten abschaffen — aber fast immer begrenzen."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Zeitdieb",
        "Ursache",
        "Gegenmittel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ständige Benachrichtigungen",
            "jede Mail unterbricht sofort",
            "feste Zeiten fürs Postfach"
          ],
          "detail": "**Nach jeder Unterbrechung dauert es spürbar, bis man wieder im Thema ist.** Zwei bis drei feste Blöcke am Tag reichen für fast jede Bürotätigkeit."
        },
        {
          "zellen": [
            "Unangekündigte Besuche",
            "Tür steht immer offen",
            "stille Stunde vereinbaren"
          ]
        },
        {
          "zellen": [
            "Besprechungen ohne Tagesordnung",
            "Ziel und Ende unklar",
            "Tagesordnung und Zeitrahmen vorab"
          ],
          "detail": "**Ohne Tagesordnung dauert jede Besprechung genau so lange, wie Zeit eingeplant wurde.** Wer Beginn, Ziel und Ende festlegt, halbiert sie regelmäßig."
        },
        {
          "zellen": [
            "Suchen von Unterlagen",
            "keine einheitliche Ablage",
            "festes Ablagesystem, Kapitel 4"
          ]
        },
        {
          "zellen": [
            "Nicht Nein sagen können",
            "Prioritäten sind nicht geklärt",
            "Aufgaben mit Vorgesetzten priorisieren"
          ],
          "detail": "**Nein sagen ist keine Verweigerung.** Die sachliche Formulierung lautet: Was von den laufenden Aufgaben soll dafür warten?"
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Zeitmanagement schafft **keine** zusätzliche Zeit. Es verteilt die vorhandene besser. Wer dauerhaft mehr Aufgaben hat, als in die Arbeitszeit passen, hat kein Planungsproblem, sondern ein Kapazitätsproblem — und das löst keine Methode."
    },
    {
      "typ": "merke",
      "text": "Zeitdiebe werden **begrenzt, nicht abgeschafft**: feste Zeiten fürs Postfach, stille Stunde, Tagesordnung mit Zeitrahmen, einheitliche Ablage, geklärte Prioritäten.",
      "karteikarte": "Nenne vier typische Zeitdiebe im Büro und jeweils ein passendes Gegenmittel."
    },
    {
      "typ": "check",
      "frage": "Deine Chefin gibt dir eine neue dringende Aufgabe, obwohl dein Tag schon voll ist. Was ist die beste Reaktion?",
      "optionen": [
        {
          "text": "Zusagen und die anderen Aufgaben abends nacharbeiten",
          "richtig": false,
          "echo": "Das verschiebt das Problem nur und macht es unsichtbar. Auf Dauer entstehen Überstunden, Fehler und der Eindruck, alles gehe irgendwie."
        },
        {
          "text": "Zusagen und fragen, welche der laufenden Aufgaben dafür warten soll",
          "richtig": true,
          "echo": "Richtig. Damit machst du die Kapazitätsgrenze sichtbar, ohne die Aufgabe abzulehnen. Die Priorisierung trifft die Führungskraft — sie kennt den Gesamtzusammenhang. Wichtig ist, konkret zu benennen, was ansteht und wie lange es dauert."
        },
        {
          "text": "Ablehnen mit Verweis auf den vollen Tagesplan",
          "richtig": false,
          "echo": "Die Einschätzung stimmt womöglich, die Entscheidung steht dir aber nicht zu. Priorisieren ist Aufgabe der Führungskraft — du lieferst die Grundlage dafür."
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
    "Zeitmanagement verteilt vorhandene Zeit, es erzeugt keine neue.",
    "Wiederkehrende Störungen können organisatorisch begrenzt werden."
  ],
  "erklaerung": "Zeitdiebe sind wiederkehrende Störungen, die Zeit ohne Ergebnis verbrauchen. Sie werden begrenzt statt vollständig abgeschafft: etwa durch feste Zeiten für das Postfach, eine stille Stunde, Tagesordnungen mit Zeitrahmen, einheitliche Ablage und geklärte Prioritäten. Wenn dauerhaft mehr Aufgaben anfallen, als in die Arbeitszeit passen, liegt ein Kapazitätsproblem vor.",
  "beispiele": [
    "Statt E-Mails ständig zu öffnen, werden feste Postfachzeiten eingerichtet; die übrige Zeit bleibt für konzentrierte Aufgaben.",
    "Eine Besprechung erhält eine Tagesordnung und einen Zeitrahmen. So wird die Störung nicht geleugnet, aber begrenzt."
  ],
  "fallbeispiel": "Eine Mitarbeiterin wird ständig durch Postfach, spontane Rückfragen und unstrukturierte Besprechungen unterbrochen. Sie richtet feste Postfachzeiten ein, plant eine stille Stunde, versieht Besprechungen mit Tagesordnung und Zeitrahmen und nutzt die einheitliche Ablage. Bleibt die Aufgabenmenge trotzdem dauerhaft zu groß, muss die Kapazität mit der zuständigen Stelle geklärt werden; eine weitere Methode löst dieses Problem nicht.",
  "typische_fehler": "Zeitdiebe sollen vollständig verschwinden, oder Überlastung wird nur als persönliches Planungsversagen bewertet. Beides ignoriert, dass Störungen begrenzbar und Kapazitätsgrenzen real sind.",
  "verstaendnisfragen": [
    "Warum werden Zeitdiebe begrenzt und nicht einfach abgeschafft? Weil Rückfragen, Post und Abstimmungen zum Arbeitsalltag gehören.",
    "Woran erkennst du ein Kapazitätsproblem? Daran, dass dauerhaft mehr Aufgaben anfallen, als in die verfügbare Arbeitszeit passen."
  ],
  "pruefungsbezug": "Schlage bei Fallaufgaben konkrete Begrenzungen vor und nenne anschließend, ob die Restmenge ein Planungs- oder ein Kapazitätsproblem ist.",
  "merksatz": "Zeitmanagement verteilt Zeit; es ersetzt weder Puffer noch zusätzliche Kapazität."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Termine und Fristen im Griff

**Datei:** `lf2-k3-termine.kapitel.json` · SHA-256 `46bc7e363a6394e78dc214163522a38e504bc42daae37634bd6dbab693668f54`

**Konkreter Kapitelauftrag:** Eine Besprechung mit Vorarbeiten rückwärts planen; Termin, Frist, Wiedervorlage und Ergebnisprotokoll zusammenführen.

**Einordnung:** Ein vergessener Termin ist peinlich. Eine versäumte Frist kostet Geld.

### b1 · Termine planen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Termine planen und Terminarten unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Termine planen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Termine unterscheiden sich in einem Punkt, der alles andere bestimmt: **Wer darf sie verschieben?** ==Ein interner Besprechungstermin lässt sich verlegen, ein Gerichtstermin nicht.== Danach richtet sich, wie viel Puffer drumherum gehört."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Terminart",
        "Beispiel",
        "Verschiebbar?"
      ],
      "zeilen": [
        {
          "zellen": [
            "Fester Termin",
            "Kundenbesuch, Prüfung, Gerichtstermin",
            "nein oder nur mit Absprache"
          ],
          "detail": "**Diese Termine bilden das Gerüst des Kalenders.** Alles andere wird um sie herum geplant, nicht umgekehrt."
        },
        {
          "zellen": [
            "Beweglicher Termin",
            "interne Besprechung, Ablagezeit",
            "ja"
          ]
        },
        {
          "zellen": [
            "Wiederkehrender Termin",
            "Monatsabschluss, Teamrunde",
            "meist nicht sinnvoll"
          ],
          "detail": "**Serientermine gehören einmal richtig angelegt.** Wer sie jedes Mal neu einträgt, vergisst irgendwann einen — und merkt es erst, wenn er fehlt."
        },
        {
          "zellen": [
            "Frist",
            "Zahlungsziel, Widerspruchsfrist",
            "nein"
          ],
          "detail": "**Eine Frist ist kein Termin, sondern ein Stichtag mit Rechtsfolge.** Wer sie versäumt, verliert ein Recht — das ist der Unterschied zum vergessenen Meeting."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Feste Termine zuerst eintragen**, danach bewegliche einplanen. Fristen gehören nicht in denselben Topf wie Termine — sie brauchen eine eigene Überwachung.",
      "karteikarte": "Welche Terminarten gibt es, und warum werden feste Termine zuerst eingetragen?"
    },
    {
      "typ": "praxistipp",
      "text": "Trag bei auswärtigen Terminen immer die **Wegzeit mit ein**, in beide Richtungen. Ein Termin von 14 bis 15 Uhr in einer anderen Stadt blockiert nicht eine Stunde, sondern drei — und genau daran scheitern Tagespläne."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Termine haben einen festen Zeitpunkt; Fristen geben einen Zeitraum bis zu einem Ende vor.",
    "Die Verschiebbarkeit entscheidet darüber, wie viel Puffer nötig ist."
  ],
  "erklaerung": "Feste Termine werden zuerst in den Kalender eingetragen, bewegliche Termine danach darum herum geplant. Ein interner Besprechungstermin kann meist verlegt werden, ein Gerichtstermin nicht. Bei auswärtigen Terminen gehören Hin- und Rückweg in den Kalender. Fristen werden zusätzlich überwacht und nicht wie normale Termine behandelt.",
  "beispiele": [
    "Ein Termin von 14 bis 15 Uhr in einer anderen Stadt blockiert nicht nur die Besprechungsstunde, sondern auch die erforderliche Wegzeit in beide Richtungen.",
    "Ein fester Prüfungstermin kommt zuerst in den Kalender; eine interne Besprechung wird anschließend so gelegt, dass ausreichend Puffer bleibt."
  ],
  "fallbeispiel": "Für einen Termin in einer anderen Stadt werden 14 bis 15 Uhr als Gesprächszeit und jeweils eine Stunde Wegzeit benötigt. Im Kalender wird daher der Zeitraum von 13 bis 16 Uhr blockiert. Erst danach werden bewegliche Aufgaben eingetragen; eine Frist mit Rechtsfolge kommt zusätzlich in die Fristenkontrolle mit Vorfrist.",
  "typische_fehler": "Nur die eigentliche Besprechungszeit wird blockiert oder eine Frist wie ein einzelner Termin notiert. Ebenso wird ein verlegbarer interner Termin genauso starr behandelt wie ein nicht verschiebbarer Termin.",
  "verstaendnisfragen": [
    "Welche Termine kommen zuerst in den Kalender? Feste und nicht oder nur schwer verschiebbare Termine.",
    "Was gehört bei einem auswärtigen Termin zusätzlich hinein? Die Wegzeit für Hin- und Rückweg."
  ],
  "pruefungsbezug": "Begründe die Kalenderplanung mit Verschiebbarkeit, Wegzeit und Puffer. Trenne anschließend Terminplanung und Fristenkontrolle.",
  "merksatz": "Feste Termine zuerst, bewegliche darum herum; bei auswärtigen Terminen zählt der ganze Weg."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Die Wiedervorlage

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine Wiedervorlage einrichten und nutzen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Die Wiedervorlage",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:wiedervorlage|Wiedervorlage}} löst ein Problem, das jeder kennt: Ein Vorgang ist erledigt, **aber noch nicht abgeschlossen** — man wartet auf eine Antwort, eine Lieferung, eine Zahlung. Ohne System verschwindet er im Stapel und taucht erst wieder auf, wenn sich jemand beschwert."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Der Kreislauf",
      "titel": "So läuft eine Wiedervorlage",
      "lead": "Vier Schritte, danach beginnt es von vorn. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Vorgang abgeben",
          "satz": "mit Datum",
          "text": "Ein Vorgang wartet auf etwas von außen. Er bekommt ein Wiedervorlagedatum — nicht das Datum, an dem die Antwort erwartet wird, sondern das Datum, an dem nachgefasst werden soll."
        },
        {
          "nr": 2,
          "titel": "Einsortieren",
          "satz": "31 Tage, 12 Monate",
          "text": "Klassisch in eine Mappe mit einem Fach je Tag des laufenden Monats und je Monat des Jahres. Digital genauso: ein Ordner oder eine Aufgabe mit Fälligkeitsdatum."
        },
        {
          "nr": 3,
          "titel": "Täglich ziehen",
          "satz": "morgens, immer",
          "text": "Das Fach des Tages wird geleert und bearbeitet. Dieser Schritt ist der einzige, an dem das System scheitern kann — eine Wiedervorlage, in die niemand schaut, ist nur ein anderer Stapel."
        },
        {
          "nr": 4,
          "titel": "Erledigen oder neu legen",
          "satz": "der Kreis schließt sich",
          "text": "Ist die Antwort da, wird der Vorgang abgeschlossen und abgelegt. Ist sie es nicht, wird nachgefasst und ein neues Wiedervorlagedatum gesetzt."
        }
      ],
      "regel": "Der Monatswechsel ist der wunde Punkt: Am Ende des Monats wird das Fach des nächsten Monats auf die Tagesfächer verteilt. Wer das vergisst, verliert einen ganzen Monat an Vorgängen."
    },
    {
      "typ": "achtung",
      "text": "Eine Wiedervorlage ersetzt **keine** Fristenkontrolle. Sie erinnert daran, nachzufassen. Eine Frist mit Rechtsfolge gehört zusätzlich in ein eigenes Verzeichnis — mit einer Vorfrist, die deutlich vor dem letzten Tag liegt."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Viele Vorgänge sind bearbeitet, aber noch nicht abgeschlossen.",
    "Eine Erinnerung ist nicht dasselbe wie eine rechtliche Fristenkontrolle."
  ],
  "erklaerung": "Die klassische Wiedervorlage hat 31 Tagesfächer und 12 Monatsfächer. Ein Vorgang erhält ein Wiedervorlagedatum und wird dort einsortiert. Jeden Morgen wird das Tagesfach geleert: Eingegangene Antworten werden abgeschlossen und abgelegt; ausgebliebene Antworten führen zu einem Nachfassen und einem neuen Datum. Am Monatsende wird das Monatsfach des Folgemonats auf Tagesfächer verteilt. Rechtsfristen benötigen daneben eine eigene Kontrolle mit Vorfrist.",
  "beispiele": [
    "Nach einer Anfrage an einen Lieferer wird der Vorgang auf ein Wiedervorlagedatum gelegt. Ist die Antwort da, wird abgelegt; fehlt sie, wird nachgefasst.",
    "Eine Mängelrüge wird nicht nur in die Wiedervorlage gelegt, sondern zusätzlich in die Fristenkontrolle aufgenommen, weil Rechte daran hängen."
  ],
  "fallbeispiel": "Am 2. April wird eine Mängelrüge mit der Bitte um Stellungnahme binnen zehn Tagen verschickt. Am 20. April ist keine Antwort eingegangen. Organisatorisch hätte der Vorgang ein Wiedervorlagedatum mit Vorlauf sowie einen Eintrag in der Fristenkontrolle erhalten müssen. Jetzt wird sofort schriftlich nachgefasst und eine neue kurze Frist gesetzt; der Zugang sollte nachweisbar sein.",
  "typische_fehler": "Die Wiedervorlage wird als passiver Stapel verstanden oder nur am Monatsende angesehen. Außerdem wird sie als Ersatz für eine Fristenkontrolle behandelt, obwohl sie keine rechtlichen Fristfolgen überwacht.",
  "verstaendnisfragen": [
    "Was geschieht bei ausgebliebener Antwort? Der Vorgang wird nachgefasst und mit einem neuen Wiedervorlagedatum versehen.",
    "Welche Schwachstelle hat das System? Es funktioniert nur, wenn das Tagesfach tatsächlich jeden Morgen bearbeitet wird."
  ],
  "pruefungsbezug": "Beschreibe in der richtigen Reihenfolge: Datum setzen, einsortieren, Tagesfach leeren, erledigen oder nachfassen, neu terminieren. Bei Rechtsfolgen immer die zusätzliche Fristenkontrolle nennen.",
  "merksatz": "Wiedervorlage erinnert ans Nachfassen; die Fristenkontrolle schützt vor Rechtsverlust."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Fristen berechnen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Fristen berechnen und überwachen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Fristen berechnen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Fristen werden nicht nach Gefühl gerechnet. Die Grundregel: **Der Tag des Ereignisses zählt nicht mit.** Geht eine Rechnung am 3. Mai zu und beträgt das Zahlungsziel 30 Tage, beginnt die Frist am 4. Mai."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Regel",
        "Bedeutung",
        "Beispiel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ereignistag zählt nicht",
            "Fristbeginn ist der Folgetag",
            "Zugang 3. Mai → Beginn 4. Mai"
          ]
        },
        {
          "zellen": [
            "Wochen- und Monatsfristen",
            "enden am gleichnamigen Tag",
            "3. Mai + 1 Monat → 3. Juni"
          ],
          "detail": "**Bei Monatsfristen zählt der gleiche Kalendertag**, nicht 30 Tage. Fehlt dieser Tag im Zielmonat — etwa der 31. — endet die Frist am letzten Tag des Monats."
        },
        {
          "zellen": [
            "Wochenende und Feiertag",
            "Ende verschiebt sich nach hinten",
            "Ende Samstag → Ende Montag"
          ],
          "detail": "**Fällt das Fristende auf einen Samstag, Sonntag oder gesetzlichen Feiertag, endet die Frist am nächsten Werktag.** Das gilt für Fristen mit rechtlicher Wirkung, nicht automatisch für jede betriebliche Absprache."
        },
        {
          "zellen": [
            "Zugang zählt, nicht Absendung",
            "entscheidend ist der Eingang",
            "Poststempel hilft nicht"
          ],
          "detail": "**Deshalb der Eingangsstempel im {{begriff:posteingang|Posteingang}}.** Er beweist, wann eine Frist zu laufen begann — und ist im Streit oft das einzige Beweismittel."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Ereignistag zählt nicht, Zugang zählt, Wochenende schiebt nach hinten.** Und immer eine Vorfrist setzen — wer erst am letzten Tag anfängt, hat keine Reserve.",
      "karteikarte": "Nach welchen Regeln wird eine Frist berechnet, und was passiert, wenn das Fristende auf einen Sonntag fällt?"
    },
    {
      "typ": "check",
      "frage": "Eine Rechnung mit 14 Tagen Zahlungsziel geht am Donnerstag, 5. Juni zu. Wann endet die Frist?",
      "optionen": [
        {
          "text": "Am 18. Juni — 14 Tage ab dem 5. Juni",
          "richtig": false,
          "echo": "Der Tag des Zugangs zählt nicht mit. Gerechnet wird ab dem Folgetag, hier also ab dem 6. Juni."
        },
        {
          "text": "Am 19. Juni, sofern das ein Werktag ist",
          "richtig": true,
          "echo": "Richtig. Der Zugangstag am 5. Juni zählt nicht mit, die Frist beginnt am 6. Juni und endet nach 14 Tagen am 19. Juni. Fällt dieser Tag auf einen Samstag, Sonntag oder gesetzlichen Feiertag, verschiebt sich das Ende auf den nächsten Werktag. Praktisch würde man eine Vorfrist auf den 16. oder 17. Juni legen."
        },
        {
          "text": "Am 20. Juni — der letzte Tag zählt auch nicht mit",
          "richtig": false,
          "echo": "Der letzte Tag zählt vollständig mit. Nur der Tag des Ereignisses bleibt bei der Berechnung außen vor."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Termin oder Frist?",
      "kategorien": [
        "Termin",
        "Frist"
      ],
      "aufgaben": [
        {
          "text": "Teambesprechung am Dienstag um 10 Uhr.",
          "loesung": "Termin"
        },
        {
          "text": "Skonto nur bei Zahlung innerhalb von 10 Tagen.",
          "loesung": "Frist"
        },
        {
          "text": "Widerspruch gegen einen Mahnbescheid innerhalb von zwei Wochen.",
          "loesung": "Frist"
        },
        {
          "text": "Jährliches Mitarbeitergespräch im November.",
          "loesung": "Termin"
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
    "Fristen werden durch ein Ereignis ausgelöst, etwa Zugang oder Absendung.",
    "Der Ereignistag und das Fristende müssen getrennt behandelt werden."
  ],
  "erklaerung": "Bei der Fristberechnung zählt der Tag des Ereignisses nicht mit. Die Frist beginnt am folgenden Tag. Der letzte Tag zählt vollständig; fällt er auf Samstag, Sonntag oder Feiertag, verschiebt sich das Ende auf den nächsten Werktag. Maßgeblich ist bei Zugangssituationen der Eingang, nicht die Absendung. Eine Vorfrist schafft zusätzlich Handlungsspielraum.",
  "beispiele": [
    "Geht eine Rechnung am 3. Mai zu und beträgt das Zahlungsziel 30 Tage, beginnt die Frist am 4. Mai.",
    "Geht ein Angebot am Montag, 8. September, zu und gilt zwei Wochen, endet die Bindungsfrist am Montag, 22. September, wenn dieser Tag ein Werktag ist."
  ],
  "fallbeispiel": "Ein Angebot geht am Montag, 8. September, zu und gilt zwei Wochen. Der Zugangstag wird nicht mitgezählt, also beginnt die Frist am 9. September. Zwei Wochen führen zum Montag, 22. September. Weil dieser Tag ein Werktag ist, wird nicht verschoben. Für die interne Entscheidung wird zusätzlich eine Vorfrist etwa am 18. September gesetzt.",
  "typische_fehler": "Der Zugangstag wird mitgezählt, eine Monats- oder Wochenfrist wird pauschal in 30 Tage umgerechnet oder ein Wochenende nicht verschoben. Häufig wird außerdem die Absendung statt des Zugangs verwendet.",
  "verstaendnisfragen": [
    "Welcher Tag zählt bei der Fristberechnung nicht mit? Der Tag des Ereignisses beziehungsweise des Zugangs.",
    "Was passiert bei einem Fristende am Sonntag? Das Ende verschiebt sich auf den nächsten Werktag."
  ],
  "pruefungsbezug": "Schreibe vor jeder Rechnung drei Regeln hin: Ereignistag zählt nicht, Zugang ist maßgeblich, Wochenende oder Feiertag verschiebt. Danach erst den Kalender zählen.",
  "merksatz": "Ereignistag nicht zählen, Zugang prüfen, Wochenenden nach hinten schieben — und eine Vorfrist setzen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Ablegen und aufbewahren

**Datei:** `lf2-k4-ablage.kapitel.json` · SHA-256 `d081051f2b29dfe67c2527fd53c27a2f6893e6bdbaa2c4b7eea1546d441e824f`

**Konkreter Kapitelauftrag:** Ein geschäftliches Dokument vom Eingang bis zum Auffinden verfolgen; Klassifikation, Version, Zugriff und Aufbewahrung begründen.

**Einordnung:** Ablegen kann jeder. Wiederfinden ist die Kunst.

### b1 · Ordnungssysteme

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Ordnungssysteme unterscheiden und passend auswählen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Ordnungssysteme",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine {{begriff:registratur|Registratur}} ist nur so gut wie ihre Wiederauffindbarkeit. ==Der Prüfstein ist einfach: Findet eine Vertretung den Vorgang, ohne zu fragen?== Wenn nicht, ist das System zu persönlich gedacht."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "System",
        "Sortiert nach",
        "Passt für"
      ],
      "zeilen": [
        {
          "zellen": [
            "Alphabetisch",
            "Name, Firma",
            "Kunden-, Lieferanten-, Personalakten"
          ],
          "detail": "**Das gebräuchlichste System.** Wichtig sind einheitliche Regeln: Wird nach Nachname oder Firmenname sortiert, was passiert mit Umlauten und Artikeln? Ohne Festlegung ordnet jeder anders."
        },
        {
          "zellen": [
            "Numerisch",
            "laufende Nummer",
            "Rechnungen, Belege, Aufträge"
          ],
          "detail": "**Eindeutig und erweiterbar** — neue Vorgänge kommen immer hinten dran. Der Nachteil: Ohne Verzeichnis findet man nichts, weil die Nummer nichts über den Inhalt sagt."
        },
        {
          "zellen": [
            "Chronologisch",
            "Datum",
            "Kontoauszüge, Protokolle, Post"
          ]
        },
        {
          "zellen": [
            "Sachlich",
            "Thema, Sachgebiet",
            "Verträge, Projekte, Schriftwechsel"
          ],
          "detail": "**Am nächsten an der Denkweise der Nutzer** und zugleich am schwierigsten: Die Abgrenzung der Sachgebiete muss festgelegt sein, sonst passt ein Vorgang in drei Ordner."
        },
        {
          "zellen": [
            "Geografisch",
            "Region, Gebiet",
            "Vertriebsgebiete, Filialen"
          ]
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "In der Praxis werden Systeme **kombiniert**: erst sachlich nach Gebiet, darin alphabetisch nach Kunde, darin chronologisch nach Datum. Wichtig ist nur, dass die Reihenfolge festgelegt und für alle gleich ist."
    },
    {
      "typ": "merke",
      "text": "Fünf Systeme: **alphabetisch, numerisch, chronologisch, sachlich, geografisch.** Sie werden meist kombiniert — entscheidend ist eine schriftlich festgelegte, für alle gleiche Ordnung.",
      "karteikarte": "Welche fünf Ordnungssysteme gibt es in der Registratur, und wofür eignet sich jedes?"
    },
    {
      "typ": "praxistipp",
      "text": "Bevor abgelegt wird, wird **ausgesondert**. Entwürfe, Mehrfachkopien und überholte Fassungen gehören nicht in die Ablage. Wer alles aufhebt, macht das Wiederfinden schwerer, nicht sicherer."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Ablage soll Vorgänge geordnet und wiederauffindbar halten.",
    "Ein Ordnungssystem funktioniert nur, wenn alle es gleich anwenden."
  ],
  "erklaerung": "Die fünf Grundsysteme sind alphabetisch, numerisch, chronologisch, sachlich und geografisch. In der Praxis werden sie kombiniert, zum Beispiel sachlich, darin alphabetisch und darin chronologisch. Vor dem Ablegen wird ausgesondert: Entwürfe und Mehrfachkopien gehören nicht ohne Zweck in die Registratur. Der Prüfstein lautet, ob eine Vertretung den Vorgang ohne Rückfrage findet.",
  "beispiele": [
    "Kundenakten können zunächst sachlich nach Vorgangsart und innerhalb der Gruppe alphabetisch nach Firmennamen geordnet werden.",
    "Eingehende Vorgänge lassen sich chronologisch nach Datum oder numerisch nach einer laufenden Vorgangsnummer ablegen; entscheidend ist die schriftlich festgelegte Regel."
  ],
  "fallbeispiel": "In einem Team sortiert eine Person nach Firmenname, eine zweite nach Ansprechpartner und eine dritte nach Projekt. Bei einer Vertretung ist ein Vorgang nicht auffindbar. Die Lösung ist ein schriftlicher Ablageplan mit einem führenden System und festgelegten Unterteilungen. Danach werden Entwürfe und Mehrfachkopien ausgesondert und die Auffindbarkeit mit einem Vertretungstest geprüft.",
  "typische_fehler": "Ordnung wird mit persönlicher Gewohnheit verwechselt. Außerdem wird alles abgelegt, obwohl Entwürfe und Mehrfachkopien ausgesondert werden sollten.",
  "verstaendnisfragen": [
    "Welche fünf Grundsysteme gibt es? Alphabetisch, numerisch, chronologisch, sachlich und geografisch.",
    "Woran wird eine gute Ablage geprüft? Daran, ob eine Vertretung den Vorgang ohne Rückfrage findet."
  ],
  "pruefungsbezug": "Nenne bei einer Ablageaufgabe das Grundsystem, mögliche Kombinationen und die Notwendigkeit einer schriftlichen Regel.",
  "merksatz": "Die beste Ablage ist nicht die schönste, sondern die, in der eine Vertretung sofort findet, was sie braucht."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Wie lange aufbewahren?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Aufbewahrungsfristen zuordnen und ihren Beginn bestimmen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Wie lange aufbewahren?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Kaufleute dürfen Unterlagen nicht nach Gutdünken vernichten. {{par:hgb-257|§ 257 HGB}} regelt die handelsrechtliche, {{par:ao-147|§ 147 AO}} die steuerliche {{begriff:aufbewahrungsfrist|Aufbewahrungsfrist}}. Beide laufen parallel — **maßgeblich ist immer die längere**."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Unterlage",
        "Frist",
        "Grundlage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Handelsbücher, Inventare, Jahresabschlüsse, Bilanzen",
            "10 Jahre",
            "{{par:hgb-257|§ 257 HGB}}, {{par:ao-147|§ 147 AO}}"
          ],
          "mono": [
            1
          ],
          "detail": "**Die lange Frist gilt für alles, was den Jahresabschluss trägt** — einschließlich der Arbeitsanweisungen und Organisationsunterlagen, die zu seinem Verständnis nötig sind."
        },
        {
          "zellen": [
            "Buchungsbelege",
            "8 Jahre",
            "{{par:hgb-257|§ 257 HGB}}, {{par:ao-147|§ 147 AO}}"
          ],
          "mono": [
            1
          ],
          "detail": "**Rechnungen, Quittungen, Kontoauszüge und andere Buchungsbelege**: acht Jahre seit dem Vierten Bürokratieentlastungsgesetz (gültig ab 1. Januar 2025; auch für Belege, deren alte Frist da noch lief)."
        },
        {
          "zellen": [
            "Empfangene Handelsbriefe",
            "6 Jahre",
            "{{par:hgb-257|§ 257 HGB}}"
          ],
          "mono": [
            1
          ],
          "detail": "**Handelsbrief ist jedes Schreiben, das ein Handelsgeschäft betrifft** — Angebot, Auftrag, Reklamation, Kündigung. Interne Notizen gehören nicht dazu."
        },
        {
          "zellen": [
            "Kopien abgesandter Handelsbriefe",
            "6 Jahre",
            "{{par:hgb-257|§ 257 HGB}}"
          ],
          "mono": [
            1
          ]
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Die Frist beginnt **nicht mit dem Datum des Belegs**, sondern mit dem **Schluss des Kalenderjahres**, in dem die letzte Eintragung gemacht oder der Brief empfangen beziehungsweise abgesandt wurde. Ein Jahresabschluss für 2020 (zehn Jahre) darf also erst nach dem 31. Dezember 2030 vernichtet werden, eine 2024 verbuchte Rechnung (acht Jahre) erst nach dem 31. Dezember 2032."
    },
    {
      "typ": "grafik",
      "variante": "staffel",
      "kopf": "Der Fristbeginn",
      "titel": "Ab wann läuft die Aufbewahrung?",
      "lead": "Trag ein Jahr ein und sieh, wann frühestens vernichtet werden darf.",
      "eingaben": {
        "jahre": {
          "label": "Aufbewahrungsdauer in Jahren",
          "start": 10
        }
      },
      "stufen": [
        {
          "ab": 0,
          "frist": "keine Aufbewahrungspflicht",
          "termin": "Werbung, Entwürfe, interne Notizen",
          "monate": 0
        },
        {
          "ab": 6,
          "frist": "sechs Jahre",
          "termin": "empfangene und abgesandte Handelsbriefe",
          "monate": 3
        },
        {
          "ab": 8,
          "frist": "acht Jahre",
          "termin": "Buchungsbelege wie Rechnungen und Kontoauszüge",
          "monate": 4
        },
        {
          "ab": 10,
          "frist": "zehn Jahre",
          "termin": "Bücher, Inventare, Jahresabschlüsse",
          "monate": 6
        }
      ],
      "regel": "Der Beginn ist immer der 31. Dezember des Jahres, in dem der Vorgang abgeschlossen wurde. Deshalb wird in der Praxis erst im Januar ausgesondert — und zwar streng nach Jahrgang."
    },
    {
      "typ": "merke",
      "text": "**Zehn Jahre** für alles, was den Jahresabschluss trägt. **Sechs Jahre** für Handelsbriefe. Die Frist beginnt mit dem **Schluss des Kalenderjahres**, nicht mit dem Belegdatum.",
      "karteikarte": "Welche Aufbewahrungsfristen gelten für Jahresabschlüsse und für Handelsbriefe, und wann beginnen sie?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Aufbewahrungsfristen beginnen nicht automatisch am Belegdatum.",
    "Handels- und Jahresabschlussunterlagen haben unterschiedliche Fristen."
  ],
  "erklaerung": "Nach § 257 HGB und § 147 AO gelten zehn Jahre für Bücher, Inventare und Jahresabschlüsse, acht Jahre für Buchungsbelege wie Rechnungen (seit dem Vierten Bürokratieentlastungsgesetz, gültig ab 1. Januar 2025) und sechs Jahre für empfangene und abgesandte Handelsbriefe. Die Frist beginnt mit dem Schluss des Kalenderjahres, in dem die letzte Eintragung gemacht wurde, nicht mit dem Datum des Belegs. Ein Werbeprospekt ist kein Handelsbrief. Laufende Prüfungen oder offene Verfahren können der Vernichtung zusätzlich entgegenstehen.",
  "beispiele": [
    "Eine Eingangsrechnung vom 12. März 2024, die 2024 verbucht wurde, ist ein Buchungsbeleg: Die achtjährige Frist beginnt am 31. Dezember 2024, vernichtet werden darf frühestens ab 1. Januar 2033.",
    "Ein geschäftlicher Brief wird grundsätzlich sechs Jahre aufbewahrt; die Einordnung richtet sich nach seiner Funktion, nicht danach, ob er auf Papier oder digital vorliegt."
  ],
  "fallbeispiel": "Die Eingangsrechnung vom 12. März 2024 wurde im selben Jahr verbucht. Der Fristbeginn ist nicht der 12. März, sondern der Schluss des Kalenderjahres: 31. Dezember 2024. Für Buchungsbelege laufen acht Jahre bis zum Ablauf des 31. Dezember 2032. Frühestens ab 1. Januar 2033 darf vernichtet werden, sofern kein offenes Verfahren entgegensteht.",
  "typische_fehler": "Ab dem Belegdatum gerechnet, die Fristen von zehn, acht und sechs Jahren vertauscht oder ein Werbeprospekt als Handelsbrief behandelt. Auch die Bedeutung einer laufenden Prüfung wird übersehen.",
  "verstaendnisfragen": [
    "Wann beginnt die Aufbewahrungsfrist? Mit dem Schluss des Kalenderjahres, in dem die letzte Eintragung gemacht wurde.",
    "Welche Unterlagen nennt § 257 HGB mit zehn Jahren? Bücher, Inventare und Jahresabschlüsse."
  ],
  "pruefungsbezug": "Schreibe in jeder Fristrechnung zuerst ‚Schluss des Kalenderjahres‘. Danach Fristdauer bestimmen und erst am folgenden Tag die Vernichtung zulassen.",
  "merksatz": "Nicht das Belegdatum zählt, sondern der Jahresabschluss des Entstehungsjahres der letzten Eintragung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Digitale Ablage

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** information (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Anforderungen an digitale Ablage erklären

**Aufbauauftrag:** Betriebliche Informationsaufgabe mit Eingaben, Auswahlkriterien, nachvollziehbaren Schritten und Ergebnisprüfung durchführen.

**Passender Gegenfall:** Fehlende, widersprüchliche oder unberechtigt genutzte Information einführen; Umgang begründen.

**Darstellung:** Kleine Beispieltabelle oder vollständig ausgefülltes Dokument mit erklärten Entscheidungen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `vertiefung-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Digitale Ablage",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Ein {{begriff:dokumentenmanagement|Dokumentenmanagementsystem}} ersetzt den Aktenschrank — aber nur, wenn es {{begriff:revisionssicherheit|revisionssicher}} ist. ==Eine PDF-Datei auf einem Netzlaufwerk erfüllt das nicht, weil sie sich jederzeit überschreiben lässt.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Anforderung",
        "Was das heißt",
        "Praktisch"
      ],
      "zeilen": [
        {
          "zellen": [
            "Unveränderbar",
            "nachträgliche Änderung erkennbar",
            "Versionierung, Schreibschutz"
          ]
        },
        {
          "zellen": [
            "Vollständig",
            "nichts fehlt, nichts doppelt",
            "geregelter Erfassungsweg"
          ],
          "detail": "**Der häufigste Fehler ist die halbe Digitalisierung**: Ein Teil liegt im System, ein Teil im Papierordner, ein Teil im Postfach eines Kollegen. Dann ist nichts vollständig."
        },
        {
          "zellen": [
            "Nachvollziehbar",
            "wer hat wann was getan",
            "Protokollierung"
          ]
        },
        {
          "zellen": [
            "Auffindbar",
            "in angemessener Zeit lesbar",
            "Verschlagwortung, Volltextsuche"
          ],
          "detail": "**Hier liegt der eigentliche Gewinn.** Über Schlagworte findet man einen Vorgang in Sekunden, über Ordnerpfade nur, wenn man weiß, wie der Ablegende gedacht hat."
        },
        {
          "zellen": [
            "Maschinell auswertbar",
            "für die Betriebsprüfung",
            "Originalformat behalten"
          ],
          "detail": "**Eine eingescannte Rechnung als Bild reicht nicht**, wenn sie ursprünglich elektronisch war. Elektronisch empfangene Belege sind in ihrem Originalformat aufzubewahren."
        }
      ]
    },
    {
      "typ": "vertiefung",
      "titel": "Warum Papier ausdrucken das Problem nicht löst",
      "absaetze": [
        "Wird eine Rechnung elektronisch empfangen, ist sie auch elektronisch aufzubewahren. Ein Ausdruck ist kein gleichwertiger Ersatz, weil die maschinelle Auswertbarkeit verloren geht.",
        "Umgekehrt darf Papier unter bestimmten Voraussetzungen ersetzend eingescannt und danach vernichtet werden. Voraussetzung ist ein dokumentierter Ablauf, der die bildliche Übereinstimmung sichert — und dass niemand mitten im Prozess Ausnahmen macht.",
        "Für beides gilt: Der Betrieb muss den Ablauf schriftlich festhalten. Diese Verfahrensdokumentation ist bei einer Betriebsprüfung eines der ersten Dinge, nach denen gefragt wird."
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Kollege scannt Eingangsrechnungen ein, legt sie im DMS ab und wirft das Papier weg. Was fehlt?",
      "optionen": [
        {
          "text": "Nichts — digital ist digital",
          "richtig": false,
          "echo": "Der Ablauf kann richtig sein, aber nicht ohne Grundlage. Ersetzendes Scannen setzt einen dokumentierten und eingehaltenen Ablauf voraus."
        },
        {
          "text": "Eine schriftliche Verfahrensdokumentation des Scan-Ablaufs",
          "richtig": true,
          "echo": "Richtig. Ersetzendes Scannen ist zulässig, verlangt aber einen festgelegten und dokumentierten Ablauf: wer scannt, wie die bildliche Übereinstimmung geprüft wird, wie Fehler behandelt werden und wann das Papier vernichtet werden darf. Ohne diese Verfahrensdokumentation fehlt der Nachweis, und bei einer Betriebsprüfung wird genau danach gefragt."
        },
        {
          "text": "Das Papier muss zusätzlich zehn Jahre aufbewahrt werden",
          "richtig": false,
          "echo": "Gerade nicht — das wäre der Sinn des ersetzenden Scannens. Es fehlt nicht das Papier, sondern die dokumentierte Grundlage für sein Vernichten."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Aufbewahrungsfrist gilt?",
      "kategorien": [
        "10 Jahre",
        "6 Jahre",
        "Keine Pflicht"
      ],
      "aufgaben": [
        {
          "text": "Der Jahresabschluss 2025.",
          "loesung": "10 Jahre"
        },
        {
          "text": "Ein empfangenes Angebot eines Lieferers.",
          "loesung": "6 Jahre"
        },
        {
          "text": "Ein Werbeprospekt aus dem Posteingang.",
          "loesung": "Keine Pflicht"
        },
        {
          "text": "Das Inventar zum 31.12.2025.",
          "loesung": "10 Jahre"
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
    "Digitale Ablage ersetzt die gesetzlichen Aufbewahrungsfristen nicht.",
    "Elektronische Dokumente müssen in ihrer Nachprüfbarkeit erhalten bleiben."
  ],
  "erklaerung": "Eine digitale Ablage muss unveränderbar, vollständig, nachvollziehbar und auffindbar sein. Elektronisch empfangene Belege werden im Originalformat aufbewahrt, damit die maschinelle Auswertbarkeit erhalten bleibt. Für ersetzendes Scannen braucht es einen festgelegten Ablauf und eine Verfahrensdokumentation. Zugriffsrechte sind zusätzlich zu regeln, weil viele Unterlagen personenbezogene Daten enthalten.",
  "beispiele": [
    "Ein PDF-Ausdruck eines elektronisch eingegangenen Belegs genügt nicht, wenn dadurch das Originalformat und seine maschinelle Auswertbarkeit verloren gehen.",
    "Ein Dokumentenmanagementsystem protokolliert Bearbeitungsschritte und begrenzt Zugriffe; dadurch werden Nachvollziehbarkeit und Vertraulichkeit unterstützt."
  ],
  "fallbeispiel": "Ein Betrieb möchte nach der Umstellung auf ein Dokumentenmanagementsystem alle Papierbelege sofort vernichten. Vorher werden Unveränderbarkeit, Vollständigkeit, Nachvollziehbarkeit und Auffindbarkeit geprüft. Für das Scannen wird ein dokumentierter Ablauf festgelegt; elektronische Originale bleiben im Originalformat. Erst wenn diese Voraussetzungen und Zugriffsrechte geklärt sind, kann die Umstellung rechtssicher organisiert werden.",
  "typische_fehler": "Digital wird mit automatisch revisionssicher gleichgesetzt. Ein Scan ohne Verfahrensdokumentation, ein veränderbares Dokument oder ein Ausdruck statt des elektronischen Originals kann die Anforderungen verfehlen.",
  "verstaendnisfragen": [
    "Welche vier Eigenschaften muss die digitale Ablage erfüllen? Unveränderbar, vollständig, nachvollziehbar und auffindbar.",
    "Warum muss die Verfahrensdokumentation schriftlich festgelegt sein? Damit der Ablauf des ersetzenden Scannens und der Umgang mit Fehlern bei einer Prüfung nachvollziehbar sind."
  ],
  "pruefungsbezug": "Prüfe digitale Ablage nicht nur auf Speicherung, sondern auf Originalformat, Unveränderbarkeit, Protokollierung, Auffindbarkeit und geregelte Zugriffe.",
  "merksatz": "Digital ist nur dann belastbar, wenn Original, Inhalt, Bearbeitung und Zugriff nachvollziehbar bleiben."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Datenschutz und Datensicherheit

**Datei:** `lf2-k5-datenschutz.kapitel.json` · SHA-256 `3fa0a96ae09e39496cf40bcc48a068e34fd0ea3b59e44db380a67cad3573055b`

**Konkreter Kapitelauftrag:** Eine Betroffenenanfrage bearbeiten; Datenschutz und Datensicherheit unterscheiden, Zuständigkeit und Fristprüfung nachvollziehbar machen.

**Einordnung:** Zwei verschiedene Dinge — und beide gehen dich an.

### b1 · Was geschützt wird und warum

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Personenbezogene Daten erkennen und die Grundsätze der DSGVO anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `achtung-1`, `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Was geschützt wird und warum",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "**Datenschutz** schützt Menschen davor, dass mit ihren Daten etwas geschieht, das sie nicht wollen. **Datensicherheit** schützt die Daten selbst — vor Verlust, Diebstahl und Zerstörung. ==Datenschutz ohne Datensicherheit ist ein Versprechen ohne Deckung.=="
    },
    {
      "typ": "absatz",
      "text": "Geschützt sind {{begriff:personenbezogene-daten|personenbezogene Daten}}: alle Angaben, die sich auf eine bestimmte oder bestimmbare natürliche Person beziehen. Das ist weiter, als die meisten denken — auch eine Kundennummer, eine IP-Adresse oder ein Kfz-Kennzeichen gehört dazu, sobald sich damit eine Person zuordnen lässt."
    },
    {
      "typ": "achtung",
      "text": "Daten von **Unternehmen** sind keine personenbezogenen Daten. Die Firmenanschrift der Meyer GmbH fällt nicht unter die DSGVO — der Name des dortigen Einkäufers und seine Durchwahl aber schon."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Die Grundsätze",
      "titel": "Vier Regeln aus Art. 5 DSGVO",
      "lead": "Sie gelten für jede Verarbeitung, ohne Ausnahme. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Rechtmäßigkeit",
          "satz": "Art. 6 DSGVO",
          "text": "Ohne Rechtsgrundlage ist jede Verarbeitung verboten. In Betracht kommen Einwilligung, Vertragserfüllung, rechtliche Verpflichtung oder ein überwiegendes berechtigtes Interesse. Das Verbot ist die Regel, die Erlaubnis die Ausnahme."
        },
        {
          "nr": 2,
          "titel": "Zweckbindung",
          "satz": "erhoben wofür?",
          "text": "Daten dürfen nur für den Zweck genutzt werden, für den sie erhoben wurden. Eine Adresse aus einer Bestellung darf nicht ohne Weiteres für Werbung verwendet werden — das ist ein anderer Zweck."
        },
        {
          "nr": 3,
          "titel": "Datenminimierung",
          "satz": "so wenig wie möglich",
          "text": "Erhoben wird nur, was für den Zweck wirklich nötig ist. Das Geburtsdatum für einen Newsletter ist es nicht, die Telefonnummer bei einer reinen E-Mail-Bestellung auch nicht."
        },
        {
          "nr": 4,
          "titel": "Speicherbegrenzung",
          "satz": "so kurz wie möglich",
          "text": "Daten werden gelöscht, sobald der Zweck erfüllt ist. Gegenläufig wirken die gesetzlichen Aufbewahrungsfristen aus Kapitel 4 — dann wird nicht gelöscht, sondern für die weitere Nutzung gesperrt."
        }
      ],
      "regel": "Dazu kommen Richtigkeit, Integrität und Vertraulichkeit sowie die Rechenschaftspflicht: Der Betrieb muss die Einhaltung nicht nur schaffen, sondern auch nachweisen können."
    },
    {
      "typ": "merke",
      "text": "**Verbot mit Erlaubnisvorbehalt:** Jede Verarbeitung ist verboten, außer es gibt eine Rechtsgrundlage nach {{par:dsgvo-6|Art. 6 DSGVO}}. Zweckbindung, Datenminimierung und Speicherbegrenzung gelten immer.",
      "karteikarte": "Was bedeutet „Verbot mit Erlaubnisvorbehalt\", und welche Rechtsgrundlagen nennt Art. 6 DSGVO?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Daten können sich auf Menschen oder auf rein sachliche Dinge beziehen.",
    "Datenschutz und Datensicherheit verfolgen unterschiedliche Schutzziele."
  ],
  "erklaerung": "Datenschutz schützt Menschen und ihr Recht, über die Verwendung personenbezogener Daten mitzubestimmen. Datensicherheit schützt Daten vor Verlust, Veränderung, Zerstörung und unbefugtem Zugriff, unabhängig davon, ob sie personenbezogen sind. Personenbezogene Daten beziehen sich auf bestimmte oder bestimmbare natürliche Personen; Beschäftigtendaten fallen darunter, reine Unternehmensdaten nicht. Jede Verarbeitung braucht nach Art. 6 DSGVO eine Rechtsgrundlage.",
  "beispiele": [
    "Die Frage, ob eine Bestelladresse überhaupt für Werbung genutzt werden darf, ist Datenschutz. Die verschlüsselte Festplatte schützt die gespeicherten Daten und gehört zur Datensicherheit.",
    "Eine getrennt aufbewahrte Datensicherung schützt vor Datenverlust; Zweckbindung und Datenminimierung regeln dagegen, wofür personenbezogene Daten verarbeitet werden."
  ],
  "fallbeispiel": "Eine Kollegin verschickt eine Einladung an 80 Kunden und setzt alle Adressen in das An-Feld. Jede Empfängerin und jeder Empfänger sieht die Adressen der anderen. Das ist eine Datenschutzverletzung, weil personenbezogene Kontaktdaten gegenüber Dritten offengelegt wurden. Der Vorfall wird unverzüglich intern gemeldet, dokumentiert und auf erforderliche weitere Maßnahmen geprüft; korrekt wäre das Blindkopie-Feld oder ein Einzelversand gewesen.",
  "typische_fehler": "Datenschutz wird mit einem Passwort oder einer Sicherungskopie gleichgesetzt. Umgekehrt wird Datensicherheit nur bei Personendaten gesehen. Außerdem wird angenommen, jede Verarbeitung sei erlaubt, sobald die Daten im Betrieb vorhanden sind.",
  "verstaendnisfragen": [
    "Was ist der Kernunterschied? Datenschutz entscheidet, ob und wozu Daten verarbeitet werden dürfen; Datensicherheit schützt die Daten vor Beeinträchtigungen.",
    "Was bedeutet Verbot mit Erlaubnisvorbehalt? Ohne Rechtsgrundlage nach Art. 6 DSGVO darf die Verarbeitung nicht stattfinden."
  ],
  "pruefungsbezug": "Nenne in einer Antwort immer je zwei Beispiele für Datenschutz und Datensicherheit. Prüfe danach Rechtsgrundlage, Zweck und Schutzmaßnahmen getrennt.",
  "merksatz": "Datenschutz schützt den Menschen hinter den Daten; Datensicherheit schützt die Daten selbst."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Was Betroffene verlangen können

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Rechte betroffener Personen benennen

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Was Betroffene verlangen können",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Wer von einer Verarbeitung betroffen ist, hat durchsetzbare Rechte. ==Im Büroalltag ist vor allem eines wichtig: Solche Anfragen haben Fristen und dürfen nicht auf dem Stapel liegen bleiben.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Recht",
        "Was verlangt werden kann",
        "Grundlage"
      ],
      "zeilen": [
        {
          "zellen": [
            "Auskunft",
            "welche Daten, wozu, wie lange, an wen",
            "{{par:dsgvo-15|Art. 15 DSGVO}}"
          ],
          "detail": "**Einschließlich einer Kopie der Daten.** Das ist das am häufigsten geltend gemachte Recht — und das, an dem Betriebe am häufigsten scheitern, weil sie selbst nicht wissen, wo überall Daten liegen."
        },
        {
          "zellen": [
            "Berichtigung",
            "falsche Daten korrigieren",
            "DSGVO"
          ]
        },
        {
          "zellen": [
            "Löschung",
            "Daten entfernen lassen",
            "{{par:dsgvo-17|Art. 17 DSGVO}}"
          ],
          "detail": "**Die Löschung entfällt, soweit Aufbewahrungspflichten entgegenstehen.** Dann werden die Daten für jede weitere Verwendung gesperrt und erst nach Fristablauf gelöscht."
        },
        {
          "zellen": [
            "Einschränkung",
            "Verarbeitung vorläufig stoppen",
            "DSGVO"
          ]
        },
        {
          "zellen": [
            "Datenübertragbarkeit",
            "Daten in gängigem Format erhalten",
            "DSGVO"
          ]
        },
        {
          "zellen": [
            "Widerspruch",
            "gegen Verarbeitung widersprechen",
            "DSGVO"
          ],
          "detail": "**Bei Direktwerbung gilt der Widerspruch ohne Begründung und ausnahmslos.** Danach darf die Person nicht mehr beworben werden — dafür wird eine Sperrliste geführt."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Eine Auskunftsanfrage ist **kein Kundenanliegen wie jedes andere**. Sie ist fristgebunden: Die Antwort muss unverzüglich, spätestens innerhalb eines Monats kommen. Nur bei komplexen oder sehr vielen Anfragen darf die Frist um weitere zwei Monate verlängert werden — und das muss der betroffenen Person innerhalb des ersten Monats mit Begründung mitgeteilt werden (Art. 12 Abs. 3 DSGVO). Wer sie liegen lässt, riskiert eine Beschwerde bei der Aufsichtsbehörde."
    },
    {
      "typ": "check",
      "frage": "Ein ehemaliger Kunde verlangt, dass ihr alle seine Daten löscht. Es gibt noch Rechnungen aus dem letzten Jahr. Wie reagierst du?",
      "optionen": [
        {
          "text": "Alles sofort löschen — er hat das Recht darauf",
          "richtig": false,
          "echo": "Das Löschrecht gilt nicht unbegrenzt. Gegen die Löschung stehen hier die handels- und steuerrechtlichen Aufbewahrungsfristen für die Rechnungen."
        },
        {
          "text": "Werbedaten löschen, Rechnungen sperren und nach Fristablauf löschen",
          "richtig": true,
          "echo": "Richtig. Das Löschrecht aus Art. 17 DSGVO tritt zurück, soweit gesetzliche Aufbewahrungspflichten bestehen. Die Rechnungen müssen also bis zum Ablauf der Frist aufbewahrt, dürfen aber für keinen anderen Zweck mehr genutzt werden — sie werden gesperrt. Alles, wofür keine Pflicht besteht, etwa Werbe- und Kontaktdaten, ist zu löschen. Über beides ist der Kunde zu informieren."
        },
        {
          "text": "Ablehnen — wegen der Aufbewahrungsfristen geht gar nichts",
          "richtig": false,
          "echo": "Zu pauschal. Die Fristen betreffen nur die aufbewahrungspflichtigen Unterlagen. Werbe- und Kontaktdaten fallen nicht darunter und sind zu löschen."
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
    "Betroffene Personen können Einfluss auf die Verarbeitung ihrer Daten nehmen.",
    "Das Löschrecht steht nicht isoliert neben gesetzlichen Aufbewahrungspflichten."
  ],
  "erklaerung": "Zu den Betroffenenrechten gehören Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Bei einer Auskunft geht es auch um Zweck, Speicherdauer und Empfänger. Das Löschrecht entfällt, soweit eine gesetzliche Aufbewahrungspflicht entgegensteht; dann werden die Daten für die weitere Verwendung gesperrt und erst nach Ablauf der Frist gelöscht.",
  "beispiele": [
    "Eine Person kann Auskunft darüber verlangen, ob und welche Daten verarbeitet werden, zu welchem Zweck und wie lange.",
    "Eine unrichtige Adresse wird berichtigt. Eine Rechnung darf dagegen wegen der Aufbewahrungspflicht nicht einfach gelöscht werden; sie wird gesperrt und später gelöscht."
  ],
  "fallbeispiel": "Eine Kundin verlangt die sofortige Löschung aller Daten, der Betrieb muss eine Rechnung aber noch aufbewahren. Zuerst werden die Datenarten getrennt betrachtet. Die Rechnung bleibt wegen der Aufbewahrungspflicht gespeichert, wird für andere Verwendungen gesperrt und nach Ablauf der Frist gelöscht. Für Daten ohne entgegenstehende Pflicht wird das Löschbegehren separat geprüft.",
  "typische_fehler": "Alle Rechte werden als gleichbedeutend mit Löschung verstanden. Ebenso wird die Aufbewahrungspflicht als Erlaubnis für jede weitere Nutzung missverstanden; Sperrung und Zweckbindung bleiben bestehen.",
  "verstaendnisfragen": [
    "Welche Rechte gehören zum Grundkatalog? Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit und Widerspruch.",
    "Was geschieht bei entgegenstehender Aufbewahrungspflicht? Die Daten werden nicht sofort gelöscht, sondern für die weitere Verwendung gesperrt."
  ],
  "pruefungsbezug": "Ordne ein Betroffenenbegehren zuerst dem verlangten Recht zu und prüfe danach Ausnahmen, besonders die Aufbewahrungspflicht beim Löschrecht.",
  "merksatz": "Löschen ist ein Recht, aber Aufbewahrungspflichten können es zeitweise durch Sperrung begrenzen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Wie im Alltag geschützt wird

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Technische und organisatorische Maßnahmen unterscheiden

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `praxistipp-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Wie im Alltag geschützt wird",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:tom|Technische und organisatorische Maßnahmen}} sind das, was aus dem Gesetz Praxis macht. **Technisch** ist alles, was Technik erledigt; **organisatorisch** alles, was Menschen und Regeln erledigen. {{par:dsgvo-32|Art. 32 DSGVO}} verlangt beides, angemessen zum Risiko."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Hebel",
      "titel": "Technik und Organisation",
      "lead": "Beides zusammen wirkt, einzeln kaum. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Technisch",
          "ton": "gold",
          "punkte": [
            {
              "text": "Zugriffsrechte nach Bedarf",
              "detail": "Jeder sieht nur, was er für seine Aufgabe braucht. Der Praktikant im Einkauf braucht keinen Zugriff auf Personalakten."
            },
            {
              "text": "Verschlüsselung",
              "detail": "Auf Datenträgern und beim Versand. Ein verschlüsselter verlorener Laptop ist ein Sachschaden, ein unverschlüsselter ist eine Datenpanne."
            },
            {
              "text": "Datensicherung",
              "detail": "Regelmäßig, automatisch und getrennt vom Original. Eine Sicherung, die noch nie zurückgespielt wurde, ist keine Sicherung, sondern eine Hoffnung."
            },
            {
              "text": "Automatische Bildschirmsperre",
              "detail": "Greift auch dann, wenn jemand den Arbeitsplatz vergisst zu sperren. Technik fängt menschliche Nachlässigkeit ab."
            }
          ]
        },
        {
          "name": "Organisatorisch",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Verpflichtung der Beschäftigten",
              "detail": "Schriftlich auf Vertraulichkeit verpflichtet, bevor der Zugriff eingerichtet wird. Gilt auch für Auszubildende und Aushilfen."
            },
            {
              "text": "Clean Desk und verschlossene Schränke",
              "detail": "Personalunterlagen liegen nicht offen auf dem Schreibtisch, wenn der Raum verlassen wird. Der einfachste und meistvergessene Schutz."
            },
            {
              "text": "Besucherregelung",
              "detail": "Fremde bewegen sich nicht unbegleitet durch Büros. Der freundliche Handwerker im Serverraum ist ein Sicherheitsproblem."
            },
            {
              "text": "Sichere Vernichtung",
              "detail": "Aktenvernichter mit passender Sicherheitsstufe statt Papierkorb. Bei Personaldaten reicht der einfache Streifenschnitt nicht."
            }
          ]
        }
      ],
      "regel": "Der Betrieb führt zusätzlich ein {{begriff:verarbeitungsverzeichnis|Verzeichnis von Verarbeitungstätigkeiten}} — es ist der erste Nachweis, den eine Aufsichtsbehörde anfordert."
    },
    {
      "typ": "praxistipp",
      "text": "Die drei häufigsten Datenpannen im Büro sind unspektakulär: **offener E-Mail-Verteiler statt Blindkopie**, Unterlagen im Drucker liegen gelassen, und die Mail an den falschen Empfänger mit ähnlichem Namen. Alle drei kosten keine Technik, nur Aufmerksamkeit."
    },
    {
      "typ": "merke",
      "text": "**Technisch** sind Zugriffsrechte, Verschlüsselung, Sicherung, Bildschirmsperre. **Organisatorisch** sind Verpflichtung, Clean Desk, Besucherregelung, sichere Vernichtung.",
      "karteikarte": "Nenne je drei technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten."
    },
    {
      "typ": "zuordnen",
      "lead": "Technisch oder organisatorisch?",
      "kategorien": [
        "Technisch",
        "Organisatorisch"
      ],
      "aufgaben": [
        {
          "text": "Der Bildschirm sperrt sich nach fünf Minuten automatisch.",
          "loesung": "Technisch"
        },
        {
          "text": "Neue Beschäftigte werden schriftlich auf Vertraulichkeit verpflichtet.",
          "loesung": "Organisatorisch"
        },
        {
          "text": "Personalakten stehen in einem abschließbaren Schrank.",
          "loesung": "Organisatorisch"
        },
        {
          "text": "Die Festplatte des Dienstlaptops ist verschlüsselt.",
          "loesung": "Technisch"
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
    "Schutz entsteht aus technischen und organisatorischen Maßnahmen gemeinsam.",
    "Viele Alltagsfehler entstehen durch falsche Empfänger oder zu weitgehende Zugriffe."
  ],
  "erklaerung": "Technische Maßnahmen wie Verschlüsselung, Zugriffsschutz und Datensicherung wirken nur zusammen mit organisatorischen Regeln wie Unterweisung, Zuständigkeiten und dokumentierten Abläufen. Im Alltag werden Adressfelder, Freigaben, Aufbewahrung und Zugriffsrechte bewusst geprüft. Ein Vorfall wird unverzüglich gemeldet und intern dokumentiert; danach wird das Risiko für weitere Melde- oder Informationspflichten bewertet.",
  "beispiele": [
    "Beim Versand an viele Empfänger wird BCC oder ein Einzelversand genutzt, damit die Adressen nicht offengelegt werden.",
    "Eine getrennte Datensicherung hilft bei Verlust; eine Unterweisung zum Serienversand verhindert, dass der Fehler wiederholt wird."
  ],
  "fallbeispiel": "Nach dem Versand einer offenen Kundenliste wird der Vorfall intern gemeldet. Die zuständige Datenschutzstelle prüft, welche Daten sichtbar waren, dokumentiert den Vorgang und bewertet das Risiko. Anschließend werden die Mitarbeitenden zum Serienversand unterwiesen und — soweit möglich — technische Begrenzungen für das An-Feld eingerichtet.",
  "typische_fehler": "Nur technische Mittel werden angeschafft, ohne Regeln und Schulung zu ändern. Oder ein Vorfall wird still korrigiert, ohne Meldung, Dokumentation und Risikoprüfung.",
  "verstaendnisfragen": [
    "Warum müssen technische und organisatorische Maßnahmen zusammenwirken? Technik kann einen Regel- oder Bedienfehler nicht allein verhindern; Organisation legt Zuständigkeit und Verhalten fest.",
    "Was ist nach einer versehentlichen Offenlegung der erste organisatorische Schritt? Unverzüglich intern melden und den Vorfall dokumentieren."
  ],
  "pruefungsbezug": "Nenne bei einem Alltagsfall konkrete technische und organisatorische Maßnahmen und beschreibe die Reihenfolge Meldung, Dokumentation, Risikoprüfung und Nachbesserung.",
  "merksatz": "Sichere Daten brauchen Technik, Regeln und aufmerksames Verhalten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Informationen beschaffen und aufbereiten

**Datei:** `lf2-k6-information.kapitel.json` · SHA-256 `1449e72451fa25fba0c98145218d0882dd66b29c6cd3644559439e78555e06b2`

**Konkreter Kapitelauftrag:** Zwei widersprechende Informationsquellen zu einer Entscheidung auswerten; Aktualität, Herkunft und Unsicherheit transparent darstellen.

**Einordnung:** Die Information ist da. Die Frage ist, ob du ihr trauen kannst.

### b1 · Woher die Information kommt

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** information (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Interne und externe Informationsquellen unterscheiden

**Aufbauauftrag:** Betriebliche Informationsaufgabe mit Eingaben, Auswahlkriterien, nachvollziehbaren Schritten und Ergebnisprüfung durchführen.

**Passender Gegenfall:** Fehlende, widersprüchliche oder unberechtigt genutzte Information einführen; Umgang begründen.

**Darstellung:** Kleine Beispieltabelle oder vollständig ausgefülltes Dokument mit erklärten Entscheidungen.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Woher die Information kommt",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die {{begriff:informationsbeschaffung|Informationsbeschaffung}} beginnt mit einer Frage, die oft übersprungen wird: **Was genau will ich wissen?** ==Wer unscharf sucht, findet zu viel und entscheidet am Ende doch aus dem Bauch.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Quelle",
        "Art",
        "Typisch dafür"
      ],
      "zeilen": [
        {
          "zellen": [
            "Statistiken und Auswertungen des Betriebs",
            "intern",
            "Umsätze, Verbrauch, Fehlzeiten"
          ],
          "detail": "**Fast immer die beste erste Quelle** — sie ist kostenlos, aktuell und betrifft genau den eigenen Betrieb. Sie wird trotzdem regelmäßig übersehen."
        },
        {
          "zellen": [
            "Vorgänge, Akten, Protokolle",
            "intern",
            "frühere Entscheidungen, Verträge"
          ]
        },
        {
          "zellen": [
            "Kolleginnen und Kollegen",
            "intern",
            "Erfahrungswissen, Zuständigkeiten"
          ],
          "detail": "**Die schnellste Quelle, aber die flüchtigste.** Was mündlich erfragt wurde, gehört schriftlich festgehalten — sonst ist es beim nächsten Mal wieder weg."
        },
        {
          "zellen": [
            "Gesetze, Behörden, IHK",
            "extern",
            "Rechtsfragen, Vorschriften"
          ]
        },
        {
          "zellen": [
            "Fachliteratur, Verbände, Statistikämter",
            "extern",
            "Branchendaten, Vergleichswerte"
          ]
        },
        {
          "zellen": [
            "Internetsuche",
            "extern",
            "schneller Einstieg, unsichere Güte"
          ],
          "detail": "**Der bequemste und riskanteste Weg.** Suchergebnisse sind nach Auffindbarkeit sortiert, nicht nach Richtigkeit — und wer eine Seite betreibt, hat meist ein Interesse."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Erst intern, dann extern.** Und vor der Suche das Ziel festlegen: Was will ich wissen, wofür brauche ich es, wie genau muss es sein?",
      "karteikarte": "Welche internen und externen Informationsquellen gibt es, und warum wird zuerst intern gesucht?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Eine Informationssuche braucht ein klares Ziel.",
    "Interne und externe Quellen beantworten unterschiedliche Fragen."
  ],
  "erklaerung": "Vor der Suche wird geklärt: Was soll bekannt sein, wofür wird die Information benötigt und wie genau muss sie sein? Interne Quellen sind oft kostenlos, aktuell und auf den eigenen Betrieb bezogen. Für rechtliche Fragen ist der Gesetzestext die maßgebliche Quelle. Texte von KI-Werkzeugen können ein Such- oder Strukturierungshilfsmittel sein, ersetzen aber keine überprüfte Quelle.",
  "beispiele": [
    "Für den tatsächlichen Verbrauch von Büromaterial werden interne Auswertungen und Vorgänge herangezogen; für einen Marktvergleich werden zusätzlich externe Angebote eingeholt.",
    "Bei einer Frage zu einer gesetzlichen Frist wird der Gesetzestext geprüft, statt eine ungeprüfte Zusammenfassung als Beleg zu verwenden."
  ],
  "fallbeispiel": "Die Geschäftsführung möchte wissen, ob sich ein Wechsel des Büromaterial-Lieferers lohnt. Zuerst werden Artikelgruppen, Zeitraum und Entscheidungskriterien festgelegt. Intern werden Verbrauch, gezahlte Preise und Reklamationen ermittelt. Extern werden vergleichbare Angebote mit identischen Artikeln, Mengen und Terminen eingeholt. So beantwortet die Recherche das konkrete Ziel statt wahllos Daten zu sammeln.",
  "typische_fehler": "Die Suche beginnt ohne Ziel oder nur mit einer einzelnen Internetquelle. Eine KI-Antwort wird als Beleg übernommen, obwohl Zahlen und Paragrafen nicht anhand einer maßgeblichen Quelle geprüft wurden.",
  "verstaendnisfragen": [
    "Welche Fragen stehen vor der Recherche? Was will ich wissen, wofür und in welcher Genauigkeit?",
    "Welche Quelle ist bei einer Rechtsfrage maßgeblich? Der Gesetzestext."
  ],
  "pruefungsbezug": "Formuliere zu Beginn das Informationsziel und trenne interne Primärdaten, externe Vergleichsdaten und rechtliche Originalquellen.",
  "merksatz": "Erst das Ziel klären, dann die passende Quelle wählen und ihren Inhalt prüfen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Kann man der Quelle trauen?

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Quellen auf Verlässlichkeit prüfen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Kann man der Quelle trauen?",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:quellenkritik|Quellenkritik}} ist keine akademische Übung. ==Eine falsche Zahl in einem Angebot kostet Geld, ein veralteter Paragraf kostet mehr.== Vier Fragen genügen für den Alltag."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Vier Fragen",
      "titel": "Prüfen, bevor du es weitergibst",
      "lead": "Fällt eine Antwort schlecht aus, brauchst du eine zweite Quelle. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Wer sagt das?",
          "satz": "Urheber erkennbar?",
          "text": "Behörde, Verband, Fachverlag oder anonymer Blog? Fehlt ein Impressum oder ein Autor, ist das schon die Antwort. Bei Rechtsfragen ist die amtliche Quelle die einzige, auf die man sich stützen sollte."
        },
        {
          "nr": 2,
          "titel": "Wann?",
          "satz": "Stand des Inhalts",
          "text": "Gesetze, Beitragssätze und Fristen ändern sich. Eine Seite ohne Datum ist bei solchen Angaben wertlos, weil man nicht weiß, welchen Rechtsstand sie abbildet."
        },
        {
          "nr": 3,
          "titel": "Warum?",
          "satz": "Interesse des Urhebers",
          "text": "Ein Anbietervergleich auf der Seite eines Anbieters ist Werbung. Das macht ihn nicht automatisch falsch, aber es erklärt, was betont und was weggelassen wird."
        },
        {
          "nr": 4,
          "titel": "Steht es woanders auch?",
          "satz": "zweite Quelle",
          "text": "Bei allem, was Geld oder Recht betrifft, gilt das Vier-Augen-Prinzip auch für Quellen. Zwei unabhängige Belege sind der übliche Maßstab."
        }
      ],
      "regel": "Faustregel: Je größer die Folge einer falschen Information, desto härter die Prüfung. Für die Wahl des Konferenzraums genügt eine Quelle, für eine Vertragsklausel nicht."
    },
    {
      "typ": "achtung",
      "text": "**Texte von KI-Werkzeugen sind keine Quelle.** Sie können beim Sortieren und Formulieren helfen, aber jede Zahl, jeder Paragraf und jede Frist gehört an der Originalquelle nachgeprüft — Gesetzestext, Behörde, Fachverlag."
    },
    {
      "typ": "check",
      "frage": "Du sollst die aktuelle Höhe einer gesetzlichen Frist ermitteln. Welche Quelle nimmst du?",
      "optionen": [
        {
          "text": "Das erste Suchergebnis einer Ratgeberseite",
          "richtig": false,
          "echo": "Ratgeberseiten sind oft älter, als sie aussehen, und geben Rechtsstände wieder, die längst überholt sind. Für Rechtsfragen ist das zu unsicher."
        },
        {
          "text": "Den Gesetzestext in der amtlichen Fassung, ergänzt um eine Fachquelle",
          "richtig": true,
          "echo": "Richtig. Bei Rechtsfragen ist der Gesetzestext selbst die maßgebliche Quelle, weil nur er den aktuellen Stand verbindlich wiedergibt. Eine Fachquelle wie IHK, Verband oder Fachverlag hilft beim Verstehen und dient als zweiter Beleg. Wichtig ist außerdem, den Abrufzeitpunkt festzuhalten — bei späteren Rückfragen weiß man dann, welcher Stand zugrunde lag."
        },
        {
          "text": "Eine Kollegin fragen, die den Fall schon einmal hatte",
          "richtig": false,
          "echo": "Als Einstieg gut und schnell — aber Erfahrungswissen bildet den Stand von damals ab. Für eine verbindliche Auskunft muss die Frist am Gesetzestext geprüft werden."
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
    "Eine Quelle kann richtig, veraltet, interessengeleitet oder unbelegt sein.",
    "Die Tragweite eines Fehlers bestimmt die Strenge der Prüfung."
  ],
  "erklaerung": "Quellenkritik fragt: Wer ist der Urheber? Wann wurde die Information veröffentlicht oder aktualisiert? Warum wird sie veröffentlicht und welches Interesse steht dahinter? Steht die Aussage auch in einer unabhängigen zweiten Quelle? Je größer die rechtlichen oder finanziellen Folgen, desto sorgfältiger müssen Aktualität, Zuständigkeit und Bestätigung geprüft werden.",
  "beispiele": [
    "Ein Artikel ohne Autor und Impressum ist bei einer finanziell wichtigen Entscheidung vorsichtig zu behandeln und durch eine zweite Quelle zu prüfen.",
    "Ein Angebot eines Lieferers ist eine Quelle für dessen Konditionen, aber nicht automatisch ein neutraler Vergleich. Art, Menge und Termin müssen mit anderen Angeboten übereinstimmen."
  ],
  "fallbeispiel": "Eine Zahl aus dem Internet soll in eine Entscheidungsvorlage übernommen werden. Zuerst werden Urheber, Datum und Interesse geprüft. Dann wird eine unabhängige zweite Quelle gesucht. Fehlt eine Bestätigung oder ist die Angabe veraltet, wird sie nicht als gesicherte Entscheidungsgrundlage verwendet; der offene Prüfstatus wird dokumentiert.",
  "typische_fehler": "Nur das Veröffentlichungsdatum wird geprüft oder eine bekannte Institution automatisch für fehlerfrei gehalten. Auch eine zweite Quelle ist nicht hilfreich, wenn sie dieselbe ungeprüfte Aussage nur übernimmt.",
  "verstaendnisfragen": [
    "Welche vier Prüfsteine gehören zur Quellenkritik? Urheber, Aktualität, Interesse und Bestätigung durch eine unabhängige Quelle.",
    "Wann muss besonders streng geprüft werden? Wenn ein Fehler rechtliche oder finanzielle Folgen haben kann."
  ],
  "pruefungsbezug": "Abarbeite die vier Fragen sichtbar und bewerte die Quelle nicht nur mit ‚gut‘ oder ‚schlecht‘, sondern passend zum Zweck.",
  "merksatz": "Je folgenreicher die Aussage, desto strenger die Prüfung von Wer, Wann, Warum und Bestätigung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Aufbereiten für den Empfänger

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Informationen empfängergerecht aufbereiten

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Aufbereiten für den Empfänger",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine Information nützt erst, wenn der Empfänger sie versteht und benutzen kann. Die entscheidende Frage lautet: **Wer bekommt das, und was soll er damit tun?** Eine Geschäftsführung braucht die Entscheidung, eine Sachbearbeitung die Einzelheiten."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Form",
        "Passt für",
        "Regel"
      ],
      "zeilen": [
        {
          "zellen": [
            "Tabelle",
            "Vergleich mehrerer Größen",
            "eine Sortierung, klare Einheiten"
          ],
          "detail": "**Die unterschätzte Form.** Für einen sauberen Vergleich von drei Angeboten schlägt eine Tabelle jedes Diagramm — sie zeigt die Zahlen selbst statt ihres Bildes."
        },
        {
          "zellen": [
            "Säulen- oder Balkendiagramm",
            "Größen nebeneinander",
            "Achse bei null beginnen"
          ],
          "detail": "**Eine abgeschnittene Achse verzerrt den Eindruck erheblich** — aus einem Unterschied von drei Prozent wird optisch eine Verdopplung. Das ist der häufigste Darstellungsfehler überhaupt."
        },
        {
          "zellen": [
            "Liniendiagramm",
            "Entwicklung über Zeit",
            "gleichmäßige Zeitabstände"
          ]
        },
        {
          "zellen": [
            "Kreisdiagramm",
            "Anteile an einem Ganzen",
            "wenige Segmente, Summe 100 %"
          ],
          "detail": "**Nur sinnvoll bei wenigen Teilen.** Ab etwa sechs Segmenten ist eine Tabelle lesbarer, weil sich ähnlich große Kreisstücke nicht mehr unterscheiden lassen."
        },
        {
          "zellen": [
            "Kurzbericht",
            "Entscheidungsvorlage",
            "Ergebnis zuerst, Details danach"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Schreib das **Ergebnis in den ersten Satz**, nicht in den letzten. Wer eine Entscheidungsvorlage liest, will zuerst wissen, was empfohlen wird — die Begründung danach. Die Reihenfolge aus dem Schulaufsatz funktioniert im Betrieb nicht."
    },
    {
      "typ": "merke",
      "text": "**Empfängergerecht heißt: passende Form, richtige Tiefe, Ergebnis zuerst.** Bei Diagrammen die Achse immer bei null beginnen — sonst täuscht das Bild.",
      "karteikarte": "Welche Darstellungsform passt wofür, und warum muss die Achse eines Säulendiagramms bei null beginnen?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Darstellung passt am besten?",
      "kategorien": [
        "Tabelle",
        "Liniendiagramm",
        "Kreisdiagramm"
      ],
      "aufgaben": [
        {
          "text": "Umsatzentwicklung der letzten zwölf Monate.",
          "loesung": "Liniendiagramm"
        },
        {
          "text": "Anteile von vier Produktgruppen am Gesamtumsatz.",
          "loesung": "Kreisdiagramm"
        },
        {
          "text": "Drei Angebote mit Preis, Lieferzeit und Zahlungsbedingungen.",
          "loesung": "Tabelle"
        },
        {
          "text": "Krankenstand je Quartal über drei Jahre.",
          "loesung": "Liniendiagramm"
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
    "Die Darstellungsform muss zur Aussage und zum Empfänger passen.",
    "Ein Diagramm kann durch Gestaltung einen falschen Eindruck erzeugen."
  ],
  "erklaerung": "Tabellen eignen sich für genaue Vergleiche, Säulen- oder Balkendiagramme für Größen nebeneinander, Linien für Entwicklungen über die Zeit und Kreise für Anteile an einem Ganzen bei wenigen Segmenten. In Entscheidungsvorlagen steht das Ergebnis im ersten Satz. Bei Säulendiagrammen beginnt die Wertachse bei null; Einheiten und Zeitabstände müssen erkennbar sein.",
  "beispiele": [
    "Ein Angebotsvergleich mit mehreren Einstandspreisen wird als Tabelle dargestellt, weil konkrete Werte verglichen werden.",
    "Die Entwicklung eines Verbrauchs über mehrere Monate passt in ein Liniendiagramm; ein Kreisdiagramm wäre nur bei wenigen Anteilen an einem Ganzen sinnvoll."
  ],
  "fallbeispiel": "Die Geschäftsführung soll über einen Liefererwechsel entscheiden. Der Kurzbericht beginnt mit der Empfehlung. Darunter steht eine Tabelle mit Einstandspreisen je Anbieter und qualitativen Kriterien wie Liefertreue und Service. Auf ein Diagramm wird verzichtet, weil die Tabelle die konkreten Zahlen genauer zeigt; die zugrunde liegenden Quellen und Annahmen werden genannt.",
  "typische_fehler": "Die Form wird nach Geschmack statt nach Aussage gewählt. Häufig fehlen Einheiten, die Zeitabstände sind ungleich oder die Wertachse beginnt nicht bei null und übertreibt dadurch kleine Unterschiede.",
  "verstaendnisfragen": [
    "Welche Form zeigt eine Entwicklung über die Zeit? Ein Liniendiagramm.",
    "Wo steht das Ergebnis in einer Entscheidungsvorlage? Im ersten Satz, danach folgen Begründung, Vergleich und Quellen."
  ],
  "pruefungsbezug": "Begründe jede Darstellungsform mit ihrer Funktion und prüfe bei Diagrammen Achse, Einheit, Zeitabstand und Lesbarkeit.",
  "merksatz": "Die Form folgt der Frage: Tabelle vergleicht genau, Linie zeigt Verlauf, Kreis zeigt wenige Anteile."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
