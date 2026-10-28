# lf9 · Liquidität sichern und Finanzierung vorbereiten

Quelle: `quellen/lf9.lernfeld.json`. Ausgangsstand Anwendung f041834; alle Auszüge sind Altbestand, keine neue Fachfreigabe. Lernfeldumfang: 6 Kapitel.

Jeden Abschnitt anhand 01_REDAKTIONSSTANDARD.md redigieren; Quellen und Rechenwege prüfen. Die folgenden Kapitelaufträge sind von ChatGPT formuliert. Die zitierten Ausgangstexte stammen unverändert aus dem Repo.

## k1 · Liquidität planen und sichern

**Datei:** `lf9-k1-liquiditaet.kapitel.json` · SHA-256 `28ecc784fbd6ed166cb670ea8c692071f25360ae72a22751e7968af93cfd8651`

**Konkreter Kapitelauftrag:** Einen zeitlich gegliederten Liquiditätsplan aufstellen; Zahlungstermin, Forderungseingang, Budget und Kennzahlen verbinden.

**Einordnung:** Am Gewinn ist noch keiner gestorben. An fehlendem Geld schon.

### b1 · Zwei Größen, die ständig verwechselt werden

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Liquidität und Rentabilität unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Zwei Größen, die ständig verwechselt werden",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:rentabilitaet|Rentabilität}} fragt: **Lohnt sich das?** {{begriff:liquiditaet|Liquidität}} fragt: **Kann ich am Freitag die Löhne zahlen?** ==Die zweite Frage bringt Betriebe um, nicht die erste.== Ein Auftrag kann glänzend kalkuliert sein und den Betrieb trotzdem in die Knie zwingen, wenn das Material sofort bezahlt werden muss und der Kunde erst in 60 Tagen überweist."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Fragen",
      "titel": "Lohnt es sich — oder ist Geld da?",
      "lead": "Zwei völlig verschiedene Größen. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Rentabilität",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Bezieht Gewinn auf eingesetztes Kapital",
              "detail": "Eine Erfolgsgröße aus der Buchführung. Sie sagt, ob sich der Einsatz gelohnt hat — rückblickend und rechnerisch."
            },
            {
              "text": "Zeitpunkt spielt keine Rolle",
              "detail": "Ein Ertrag zählt, sobald die Leistung erbracht ist. Ob das Geld schon geflossen ist, ändert am Gewinn nichts."
            },
            {
              "text": "Wird jährlich gemessen",
              "detail": "Über die Gewinn- und Verlustrechnung. Ein Jahr ist lang — dazwischen kann viel passieren."
            },
            {
              "text": "Fehlt sie, stirbt der Betrieb langsam",
              "detail": "Dauerhafte Verluste zehren das Eigenkapital auf. Das dauert Jahre und ist meist rechtzeitig sichtbar."
            }
          ]
        },
        {
          "name": "Liquidität",
          "ton": "gold",
          "punkte": [
            {
              "text": "Vergleicht Zahlungsmittel mit fälligen Zahlungen",
              "detail": "Eine Bestandsgröße im Hier und Jetzt. Sie kennt keine Periodenabgrenzung, nur Kontostand und Fälligkeit."
            },
            {
              "text": "Der Zeitpunkt ist alles",
              "detail": "Dieselben Beträge in anderer Reihenfolge entscheiden über zahlungsfähig oder nicht. Das ist der ganze Unterschied."
            },
            {
              "text": "Wird täglich gemessen",
              "detail": "Jeden Morgen aufs Neue. Deshalb ist der Liquiditätsplan ein laufendes Werkzeug und kein Jahresabschluss."
            },
            {
              "text": "Fehlt sie, ist sofort Schluss",
              "detail": "{{begriff:zahlungsunfaehigkeit|Zahlungsunfähigkeit}} ist ein Insolvenzgrund. Sie kann einen kerngesunden Betrieb binnen Wochen beenden."
            }
          ]
        }
      ],
      "regel": "Merksatz: Rentabilität entscheidet, ob der Betrieb einen Sinn hat. Liquidität entscheidet, ob er morgen noch existiert. Von beidem braucht man das Zweite zuerst."
    },
    {
      "typ": "merke",
      "text": "**Gewinn ist eine Rechengröße, Liquidität ein Kontostand.** Ein rentabler Betrieb kann zahlungsunfähig werden — umgekehrt hilft viel Geld auf dem Konto einem dauerhaft unrentablen Betrieb auch nicht.",
      "karteikarte": "Worin unterscheiden sich Rentabilität und Liquidität, und warum kann ein rentabler Betrieb insolvent werden?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Rentabilität und Liquidität beantworten unterschiedliche Fragen.",
    "Zeitpunkt und Höhe von Ein- und Auszahlungen entscheiden über Zahlungsfähigkeit."
  ],
  "erklaerung": "Rentabilität fragt, ob sich ein Geschäft lohnt; Liquidität fragt, ob fällige Zahlungen geleistet werden können. Ein Betrieb kann Gewinn erzielen und trotzdem zahlungsunfähig werden, wenn Kundenzahlungen später eingehen als Material, Löhne oder Steuern bezahlt werden müssen. Zahlungsunfähigkeit ist ein Insolvenzgrund und wirkt sofort.",
  "beispiele": [
    "Ein langer Zahlungsziel für Kunden kann die Liquidität belasten, obwohl die Leistung bereits als Ertrag und Gewinn erfasst ist.",
    "Eine planbare Steuervorauszahlung kann eine Auszahlungsspitze bilden, wenn gleichzeitig weitere Zahlungen fällig werden."
  ],
  "fallbeispiel": "Ein Betrieb hat hohen Gewinn, aber eine leere Kasse. Die Erklärung liegt in der Zeit: Der Gewinn entsteht mit der Leistung, die Liquidität mit der tatsächlichen Zahlung. Wenn Kunden spät zahlen und Material, Löhne sowie Steuern früher fällig sind, entsteht eine Lücke. Deshalb wird die Zahlungsfähigkeit separat geprüft.",
  "typische_fehler": "Gewinn und Geldbestand werden gleichgesetzt. Außerdem wird ein rentabler Betrieb automatisch für zahlungsfähig gehalten, obwohl die Zeitpunkte nicht passen.",
  "verstaendnisfragen": [
    "Welche Frage stellt Rentabilität, welche Liquidität? Rentabilität fragt nach dem wirtschaftlichen Lohn; Liquidität nach der Fähigkeit, fällige Zahlungen zu leisten.",
    "Warum kann Gewinn ohne Liquidität entstehen? Weil Erträge und Zahlungen zeitlich auseinanderfallen."
  ],
  "pruefungsbezug": "Bei Fallaufgaben zuerst klären, ob nach Erfolg oder nach Zahlung gefragt wird. Danach die zeitliche Lücke zwischen Ein- und Auszahlungen benennen.",
  "merksatz": "Gewinn sagt, ob es sich lohnt; Liquidität sagt, ob heute gezahlt werden kann."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Der Liquiditätsplan

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Liquiditätsplan lesen und beurteilen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Der Liquiditätsplan",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der {{begriff:liquiditaetsplan|Liquiditätsplan}} stellt je Periode die erwarteten Einzahlungen den Auszahlungen gegenüber und schreibt den Bestand fort. **Er rechnet mit Zahlungen, nicht mit Erträgen und Aufwendungen** — eine gestellte Rechnung taucht erst auf, wenn das Geld erwartet wird."
    },
    {
      "typ": "grafik",
      "variante": "liquiditaet",
      "kopf": "Sechs Monate",
      "titel": "Wann wird es eng?",
      "lead": "Schieb das Zahlungsziel der Kunden und sieh, was mit dem Bestand passiert. Die Summen bleiben dabei gleich.",
      "eingaben": {
        "start": {
          "label": "Anfangsbestand in €",
          "start": 40000,
          "min": 0,
          "max": 200000,
          "schritt": 5000
        },
        "ziel": {
          "label": "Kunden zahlen später (Tage)",
          "start": 0,
          "min": 0,
          "max": 90,
          "schritt": 30
        }
      },
      "monate": [
        {
          "name": "Jan",
          "ein": 95000,
          "aus": 88000
        },
        {
          "name": "Feb",
          "ein": 92000,
          "aus": 90000
        },
        {
          "name": "Mär",
          "ein": 88000,
          "aus": 112000
        },
        {
          "name": "Apr",
          "ein": 105000,
          "aus": 95000
        },
        {
          "name": "Mai",
          "ein": 98000,
          "aus": 91000
        },
        {
          "name": "Jun",
          "ein": 110000,
          "aus": 94000
        }
      ],
      "regel": "Beachte: Beim Verschieben ändert sich der Gesamtgewinn nicht um einen Cent — es ist dasselbe Geld, nur später. Ein Teil rutscht dabei hinter den geplanten Zeitraum; verloren ist er nicht, aber im März hilft er auch nicht. Genau daran gehen Betriebe mit vollen Auftragsbüchern zugrunde."
    },
    {
      "typ": "absatz",
      "text": "Der März ist in diesem Beispiel der kritische Monat: Eine große Auszahlung trifft auf normale Einnahmen. **Solche Spitzen sind planbar** — Steuervorauszahlung, Versicherungsbeitrag, Weihnachtsgeld stehen im Kalender, lange bevor sie fällig werden."
    },
    {
      "typ": "achtung",
      "text": "Ein Liquiditätsplan ist keine Buchführung. Er darf schätzen und muss dafür **rechtzeitig** vorliegen. Ein exakter Plan, der erst nach dem kritischen Monat fertig ist, hat keinen Wert."
    },
    {
      "typ": "check",
      "frage": "Der Betrieb erwartet für das Jahr einen Gewinn von 80.000 €. Im März fehlen laut Plan trotzdem 24.000 €. Wie ist das möglich?",
      "optionen": [
        {
          "text": "Der Gewinn muss falsch berechnet sein",
          "richtig": false,
          "echo": "Nicht nötig. Gewinn und Zahlungsfähigkeit sind zwei verschiedene Größen, die problemlos auseinanderfallen können."
        },
        {
          "text": "Gewinn und Zahlungszeitpunkte fallen auseinander",
          "richtig": true,
          "echo": "Richtig. Der Gewinn entsteht, sobald Leistungen erbracht sind — unabhängig davon, wann gezahlt wird. Fallen im März große Auszahlungen wie Steuervorauszahlung oder Materialrechnungen an, während die zugehörigen Kundenzahlungen erst später eingehen, entsteht eine Lücke. Der Jahresgewinn bleibt davon unberührt. Abhilfe schaffen eine Kreditlinie, kürzere Zahlungsziele für Kunden oder das Strecken eigener Zahlungen."
        },
        {
          "text": "Der Betrieb arbeitet unrentabel",
          "richtig": false,
          "echo": "Bei 80.000 € Gewinn gerade nicht. Genau das ist der Kern: Ein rentabler Betrieb kann zahlungsunfähig werden, wenn die Zeitpunkte nicht passen."
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
    "Ein Liquiditätsplan betrachtet Zahlungszeitpunkte.",
    "Erträge und Aufwendungen sind nicht dasselbe wie Ein- und Auszahlungen."
  ],
  "erklaerung": "Der Liquiditätsplan stellt erwartete Einzahlungen und Auszahlungen gegenüber. Abschreibungen gehören nicht hinein, wenn ihnen keine Auszahlung gegenübersteht. Große Auszahlungsspitzen wie Steuern und Sonderzahlungen werden früh eingeplant. Der Plan wird rollierend fortgeschrieben, damit kommende Unterdeckungen sichtbar werden.",
  "beispiele": [
    "Eine Kundenzahlung wird in dem Monat eingeplant, in dem sie voraussichtlich eingeht, nicht nur in dem Monat der Leistung.",
    "Eine Steuervorauszahlung wird als Auszahlungsspitze im betreffenden Zeitraum berücksichtigt; eine Abschreibung ohne Geldfluss nicht."
  ],
  "fallbeispiel": "Für März wird eine Unterdeckung von 24.000 € erwartet, weil eine Steuervorauszahlung mit der Zahlung des Weihnachtsgeldes zusammentrifft. Zuerst wird geprüft, ob die Lücke einmalig oder wiederkehrend ist. Die Spitze wird im Liquiditätsplan sichtbar gemacht und rechtzeitig mit einer Kreditlinie sowie Maßnahmen auf Ein- und Auszahlungsseite vorbereitet.",
  "typische_fehler": "Abschreibungen als Auszahlung eintragen oder nur die Jahresgesamtsumme statt die Fälligkeit betrachten. Auch ein Plan ohne regelmäßige Fortschreibung verliert seinen Nutzen.",
  "verstaendnisfragen": [
    "Was gehört in den Liquiditätsplan? Tatsächliche und erwartete Ein- und Auszahlungen mit ihren Zeitpunkten.",
    "Warum taucht eine Abschreibung dort nicht auf? Weil ihr keine Auszahlung gegenübersteht."
  ],
  "pruefungsbezug": "Trenne in Tabellen immer Zahlungen von Erträgen und Aufwendungen. Markiere Auszahlungsspitzen und rechne die Unterdeckung im betroffenen Zeitraum.",
  "merksatz": "Der Liquiditätsplan rechnet mit Geldbewegungen, nicht mit Buchungsbegriffen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Was man dagegen tun kann

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Maßnahmen zur Liquiditätssicherung ableiten

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `vertiefung-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Was man dagegen tun kann",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Liquidität lässt sich an drei Stellen beeinflussen: **Geld schneller hereinholen, Geld später hinausgeben, Reserve bereithalten.** Alle drei kosten etwas — deshalb ist die Reihenfolge wichtig."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Maßnahme",
        "Wirkung",
        "Preis dafür"
      ],
      "zeilen": [
        {
          "zellen": [
            "Skonto anbieten",
            "Kunden zahlen früher",
            "Erlösschmälerung"
          ],
          "detail": "**Wirkt schnell und zuverlässig**, kostet aber je nach Satz mehr, als vielen bewusst ist — aufs Jahr gerechnet ein zweistelliger Zinssatz. Trotzdem oft günstiger als ein Ausfall."
        },
        {
          "zellen": [
            "Konsequentes Mahnwesen",
            "Forderungen laufen nicht aus dem Ruder",
            "Arbeitszeit, ggf. Kundenärger"
          ]
        },
        {
          "zellen": [
            "{{begriff:factoring|Factoring}}",
            "Forderungen sofort zu Geld machen",
            "Gebühr, Abhängigkeit"
          ],
          "detail": "**Verschafft sofort Liquidität und nimmt je nach Vereinbarung das Ausfallrisiko ab.** Dafür geht ein Teil der Marge weg — und die Kunden merken es."
        },
        {
          "zellen": [
            "Eigene Zahlungsziele ausnutzen",
            "Geld bleibt länger im Betrieb",
            "kein Skontoabzug möglich"
          ],
          "detail": "**Der stille Zielkonflikt:** Wer das volle Zahlungsziel ausschöpft, verzichtet auf Skonto. Bei knapper Liquidität kann das trotzdem die richtige Entscheidung sein."
        },
        {
          "zellen": [
            "{{begriff:kontokorrentkredit|Kontokorrentkredit}}",
            "deckt kurzfristige Spitzen",
            "hoher Zinssatz"
          ],
          "detail": "**Für Spitzen gedacht, nicht für Dauerbedarf.** Wer die Linie dauerhaft ausschöpft, finanziert langfristigen Bedarf mit dem teuersten verfügbaren Geld."
        },
        {
          "zellen": [
            "{{begriff:leasing|Leasing}} statt Kauf",
            "keine große Einmalzahlung",
            "über die Laufzeit teurer"
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Erst die eigenen Abläufe, dann fremdes Geld.** Skonto, Mahnwesen und Zahlungsziele kosten weniger als jeder Kredit — und wirken bei knapper Kasse oft schneller.",
      "karteikarte": "Mit welchen Maßnahmen lässt sich die Liquidität verbessern, und welche sollte man zuerst prüfen?"
    },
    {
      "typ": "vertiefung",
      "titel": "Die drei Liquiditätsgrade",
      "absaetze": [
        "**Liquidität 1. Grades** setzt die flüssigen Mittel ins Verhältnis zu den kurzfristigen Verbindlichkeiten. Sie zeigt, was sofort verfügbar ist.",
        "**Liquidität 2. Grades** rechnet die kurzfristigen Forderungen hinzu — also das Geld, das absehbar eingeht. Dieser Grad wird in der Praxis am häufigsten betrachtet.",
        "**Liquidität 3. Grades** nimmt zusätzlich die Vorräte auf. Sie ist der weiteste Maßstab und zugleich der unschärfste, weil Vorräte sich nicht kurzfristig zu Geld machen lassen, ohne dass der Preis leidet.",
        "Für alle drei kursieren Faustwerte, die je nach Branche stark abweichen. Wichtiger als der absolute Wert ist die Entwicklung über die Zeit und der Vergleich mit ähnlichen Betrieben."
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Verbessert das die Liquidität sofort?",
      "kategorien": [
        "Ja, sofort",
        "Nein oder erst später"
      ],
      "aufgaben": [
        {
          "text": "Offene Forderungen konsequent anmahnen.",
          "loesung": "Ja, sofort"
        },
        {
          "text": "Die Verkaufspreise zum nächsten Jahr erhöhen.",
          "loesung": "Nein oder erst später"
        },
        {
          "text": "Eine große Maschine leasen statt kaufen.",
          "loesung": "Ja, sofort"
        },
        {
          "text": "Kosten senken, indem weniger Überstunden bezahlt werden.",
          "loesung": "Nein oder erst später"
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
    "Liquidität kann über Einzahlungen, Auszahlungen und Reserven beeinflusst werden.",
    "Fremdes Geld löst nicht automatisch ein dauerhaftes Strukturproblem."
  ],
  "erklaerung": "Drei Hebel verbessern die Liquidität: schneller einnehmen, später ausgeben und eine Reserve bereithalten. Dazu gehören konsequentes Mahnwesen, Skonto für schnelle Kundenzahlung, das Ausschöpfen eigener Zahlungsziele, das Verschieben nicht dringender Investitionen und Factoring. Der Kontokorrentkredit ist für kurzfristige Spitzen gedacht, flexibel, aber teuer; zuerst werden die eigenen Abläufe verbessert.",
  "beispiele": [
    "Ein Mahnwesen beschleunigt Einzahlungen, verursacht aber Arbeitsaufwand und kann Kunden verärgern.",
    "Leasing vermeidet eine große Einmalzahlung, ist über die Laufzeit aber teurer; der Kontokorrent deckt nur eine kurzfristige Spitze."
  ],
  "fallbeispiel": "Bei der Unterdeckung von 24.000 € wird rechtzeitig eine Kreditlinie in ausreichender Höhe vereinbart, weil sie nur für den beanspruchten Betrag und die tatsächliche Dauer Zinsen kostet. Parallel werden Forderungen angemahnt, Skonto angeboten, nicht dringende Investitionen verschoben und eigene Zahlungsziele ausgeschöpft. So wird die Ursache nicht allein mit teurem Fremdgeld überdeckt.",
  "typische_fehler": "Der Kontokorrent wird als Dauerfinanzierung eingesetzt oder nur die Kreditaufnahme betrachtet. Kosten von Skonto, Factoring, Mahnwesen und Leasing werden nicht gegeneinander abgewogen.",
  "verstaendnisfragen": [
    "Welche drei Hebel gibt es? Schneller einnehmen, später ausgeben, Reserve bereithalten.",
    "Wofür ist der Kontokorrentkredit gedacht? Für kurzfristige Liquiditätsspitzen, nicht für dauerhaften Bedarf."
  ],
  "pruefungsbezug": "Ordne Maßnahmen zuerst Einzahlungs- oder Auszahlungsseite zu und nenne dann ihre Kosten oder Nebenwirkungen.",
  "merksatz": "Erst Abläufe verbessern, dann fremdes Geld für die verbleibende Spitze nutzen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k2 · Woher das Geld kommt

**Datei:** `lf9-k2-finanzierungsarten.kapitel.json` · SHA-256 `8edeb84957058e19a5a00945f7be68f994d43fbf7cf46bc9a73a3a4e9b6d74ff`

**Konkreter Kapitelauftrag:** Mittelherkunft und Zahlungswirksamkeit mehrerer Finanzierungen erklären; Innen/Außen und Eigen/Fremd unabhängig ordnen.

**Einordnung:** Zwei Fragen genügen, um jede Finanzierung einzuordnen.

### b1 · Zwei Fragen, vier Felder

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Finanzierungsarten nach Herkunft und Rechtsstellung ordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `praxistipp-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Zwei Fragen, vier Felder",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Jede Finanzierung lässt sich mit zwei Fragen einordnen. **Erstens: Kommt das Geld von außen oder entsteht es im Betrieb?** **Zweitens: Ist es Eigen- oder Fremdkapital?** ==Wer diese beiden Fragen trennt, hat die ganze Systematik dieses Lernfelds.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "",
        "Eigenkapital",
        "Fremdkapital"
      ],
      "zeilen": [
        {
          "zellen": [
            "**Von außen**",
            "Einlagen, neue Gesellschafter",
            "Bankkredit, Anleihe, Lieferantenkredit"
          ],
          "detail": "**Beides ist {{begriff:aussenfinanzierung|Außenfinanzierung}}** — Kapital fließt in den Betrieb hinein. Der Unterschied liegt in der Rechtsstellung des Gebers: Miteigentümer oder Gläubiger."
        },
        {
          "zellen": [
            "**Von innen**",
            "einbehaltener Gewinn",
            "Rückstellungen"
          ],
          "detail": "**Beides ist {{begriff:innenfinanzierung|Innenfinanzierung}}** — es fließt kein Geld von außen zu, der Betrieb erwirtschaftet die Mittel selbst. Das ist die unauffälligste und oft wichtigste Finanzierungsquelle."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Herkunft** trennt innen von außen. **Rechtsstellung** trennt Eigen- von Fremdkapital. Beide Fragen sind unabhängig voneinander — es gibt alle vier Kombinationen.",
      "karteikarte": "Nach welchen zwei Kriterien werden Finanzierungsarten geordnet, und welche vier Kombinationen ergeben sich?"
    },
    {
      "typ": "praxistipp",
      "text": "In Prüfungen wird gern nach einem Beispiel für **Innenfinanzierung durch Fremdkapital** gefragt — das wirkt widersprüchlich. Die Antwort sind Rückstellungen: Der Betrieb behält Geld für eine künftige Verpflichtung im Haus, ohne dass jemand von außen etwas gibt."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Finanzierung kann nach Herkunft und Rechtsstellung geordnet werden.",
    "Eigen- und Fremdkapital wirken für Betrieb und Kapitalgeber unterschiedlich."
  ],
  "erklaerung": "Zwei Fragen ergeben eine Vierfeldertafel: Kommt das Kapital von innen oder außen, und handelt es sich um Eigen- oder Fremdkapital? Innenfinanzierung entsteht im Betrieb; Außenfinanzierung kommt von außen. Eigenkapital haftet und steht grundsätzlich unbefristet zur Verfügung; Fremdkapital wird verzinst und zurückgezahlt.",
  "beispiele": [
    "Eine Einlage der Inhaber ist Außen- und Eigenfinanzierung; ein Bankkredit Außen- und Fremdfinanzierung.",
    "Einbehaltener Gewinn ist Innen- und Eigenfinanzierung; Rückstellungen sind Innen- und Fremdfinanzierung, weil die Verpflichtung gegenüber Dritten besteht."
  ],
  "fallbeispiel": "Ein Betrieb ordnet vier Vorgänge ein: Einlage, Bankkredit, einbehaltener Gewinn und Rückstellung. Die Matrix wird in zwei Schritten gefüllt: Herkunft innen oder außen, dann Eigen oder fremd. So ergeben sich Außen/Eigen, Außen/Fremd, Innen/Eigen und Innen/Fremd; die Rückstellung landet trotz Innenfinanzierung bei Fremdkapital.",
  "typische_fehler": "Innenfinanzierung wird automatisch als Eigenkapital bezeichnet. Außerdem wird ‚von außen‘ mit ‚Fremdkapital‘ gleichgesetzt, obwohl eine Einlage Außen- und Eigenfinanzierung ist.",
  "verstaendnisfragen": [
    "Welche zwei Achsen hat die Systematik? Herkunft der Mittel und Rechtsstellung des Kapitalgebers.",
    "Warum sind Rückstellungen ein Prüfungsfall? Sie entstehen innen, sind aber Fremdkapital wegen der Verpflichtung gegenüber Dritten."
  ],
  "pruefungsbezug": "Zeichne vor der Zuordnung die Vierfeldertafel und entscheide Herkunft und Rechtsstellung getrennt.",
  "merksatz": "Innen oder außen sagt, woher das Geld kommt; Eigen oder fremd sagt, wem es rechtlich zugeordnet ist."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Innenfinanzierung

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Formen der Innenfinanzierung erklären

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Innenfinanzierung",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "{{begriff:innenfinanzierung|Innenfinanzierung}} kostet keine Zinsen, verlangt keine Sicherheiten und muss niemandem erklärt werden. ==Ihre Grenze ist ebenso klar: Sie ist nur so groß wie das, was der Betrieb selbst erwirtschaftet.=="
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Vier Quellen",
      "titel": "Geld, das im Betrieb entsteht",
      "lead": "Vier Wege, alle ohne Bank. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Einbehaltener Gewinn",
          "satz": "Selbstfinanzierung",
          "text": "Der Gewinn wird nicht ausgeschüttet, sondern bleibt im Betrieb. Die sauberste Form: Sie stärkt das Eigenkapital und verbessert damit zugleich die Aussicht auf künftige Kredite."
        },
        {
          "nr": 2,
          "titel": "Abschreibungsgegenwerte",
          "satz": "über die Verkaufspreise",
          "text": "Abschreibungen mindern den Gewinn, ohne dass Geld abfließt. Da sie über die Verkaufspreise wieder hereinkommen, steht dieser Betrag bis zur Ersatzbeschaffung zur Verfügung."
        },
        {
          "nr": 3,
          "titel": "{{begriff:rueckstellung|Rückstellungen}}",
          "satz": "Fremdkapital von innen",
          "text": "Für ungewisse Verpflichtungen wie Pensionen oder Prozesskosten wird Aufwand gebucht, das Geld bleibt aber vorerst im Betrieb. Bis zur Inanspruchnahme wirkt es wie ein zinsloser Kredit."
        },
        {
          "nr": 4,
          "titel": "Vermögensumschichtung",
          "satz": "Verkauf von Nichtbetriebsnotwendigem",
          "text": "Nicht mehr gebrauchte Maschinen, ungenutzte Grundstücke, Beteiligungen. Wirkt einmalig und ist deshalb kein tragfähiges Dauerkonzept."
        }
      ],
      "regel": "Vorsicht bei den Abschreibungsgegenwerten: Sie stehen nur zur Verfügung, wenn die Abschreibungen tatsächlich über die Preise verdient wurden. Bei Verlusten ist dieser Effekt eine Rechengröße ohne Deckung."
    },
    {
      "typ": "achtung",
      "text": "Innenfinanzierung ist **nicht kostenlos**, nur zinsfrei. Einbehaltener Gewinn steht den Inhabern nicht zur Verfügung — sie verzichten auf Ausschüttung und damit auf eine anderweitige Anlage. Diese entgangene Rendite ist der eigentliche Preis."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Innenfinanzierung bedeutet, dass Mittel im Betrieb entstehen.",
    "Nicht jede Innenfinanzierung ist zinsfrei ohne wirtschaftliche Kosten."
  ],
  "erklaerung": "Quellen der Innenfinanzierung sind einbehaltener Gewinn, Abschreibungsgegenwerte, Rückstellungen und Vermögensumschichtung. Es fließt kein neues Kapital von außen zu. Die Mittel stehen aber nur insoweit zur Verfügung, wie der entsprechende Vorgang tatsächlich liquide Mittel freisetzt oder im Betrieb hält.",
  "beispiele": [
    "Einbehaltener Gewinn stärkt die Eigenkapitalbasis, wenn er nicht ausgeschüttet wird.",
    "Beim Verkauf eines nicht betriebsnotwendigen Vermögensgegenstands entsteht eine Vermögensumschichtung; Rückstellungen halten Mittel bis zur späteren Inanspruchnahme im Betrieb."
  ],
  "fallbeispiel": "Ein Betrieb braucht 300.000 € für eine Anlage, will aber keine neuen Gesellschafter aufnehmen. Zuerst werden Gewinnausschüttung, nicht betriebsnotwendige Vermögenswerte und Abschreibungsgegenwerte geprüft. Reicht dies nicht, werden Leasing oder ein Förderdarlehen als Alternativen betrachtet. Die Reihenfolge schont Mitsprache und Liquidität, ohne die Entscheidung vorschnell an einen Kredit zu delegieren.",
  "typische_fehler": "Innenfinanzierung wird als kostenlos bezeichnet oder Abschreibungsgegenwerte automatisch als Bargeld behandelt. Auch die Vermögensumschichtung wird mit zusätzlichem Kapital verwechselt.",
  "verstaendnisfragen": [
    "Welche vier Quellen nennt der Inhalt? Einbehaltener Gewinn, Abschreibungsgegenwerte, Rückstellungen und Vermögensumschichtung.",
    "Warum ist Innenfinanzierung nicht einfach kostenlos? Sie ist zinsfrei, kann aber Ausschüttungsverzicht, entgangene Nutzung oder andere wirtschaftliche Kosten haben."
  ],
  "pruefungsbezug": "Nenne bei Finanzierungsfällen zuerst die eigenen Innenquellen und bewerte dann Liquidität, Zins und Mitsprache.",
  "merksatz": "Innenfinanzierung entsteht aus dem Betrieb — aber auch sie hat wirtschaftliche Grenzen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Eigen oder fremd

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eigen- und Fremdkapital gegenüberstellen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `merke-1`, `check-1`, `zuordnen-1`

**M01:** Kein kompakter Absatz vorhanden. Erweiterte Erklärung darf dennoch angeboten werden; siehe Technikauftrag. Keine Dummyabsätze einfügen.

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Eigen oder fremd",
  "inhalt": [
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Rechtsstellungen",
      "titel": "Miteigentümer oder Gläubiger",
      "lead": "Derselbe Betrag, völlig verschiedene Folgen. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Eigenkapital",
          "ton": "gold",
          "punkte": [
            {
              "text": "Keine feste Verzinsung",
              "detail": "Der Geber wird am Gewinn beteiligt. Läuft es schlecht, bekommt er nichts — das entlastet den Betrieb genau dann, wenn er es braucht."
            },
            {
              "text": "Unbefristet, keine Rückzahlung",
              "detail": "Es steht dauerhaft zur Verfügung. Kein Tilgungsplan, keine Fälligkeit, kein Anschlussrisiko."
            },
            {
              "text": "Haftet für Verluste",
              "detail": "Deshalb erhöht viel Eigenkapital die Kreditwürdigkeit: Es ist der Puffer, den die Bank vor ihrem eigenen Geld sehen will."
            },
            {
              "text": "Mitsprache",
              "detail": "Wer Eigenkapital gibt, redet mit. Genau das ist für viele Betriebsinhaber der entscheidende Nachteil."
            }
          ]
        },
        {
          "name": "Fremdkapital",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Fester Zins, unabhängig vom Erfolg",
              "detail": "Der Zins ist auch im Verlustjahr fällig. Das ist die Belastung, die in schlechten Zeiten am schwersten wiegt."
            },
            {
              "text": "Befristet, muss zurückgezahlt werden",
              "detail": "Mit festem Tilgungsplan. Läuft der Kredit aus, muss verlängert oder abgelöst werden — ein eigenes Risiko."
            },
            {
              "text": "Haftet nicht",
              "detail": "Der Gläubiger trägt kein unternehmerisches Risiko und verlangt deshalb Sicherheiten statt Gewinnbeteiligung."
            },
            {
              "text": "Keine Mitsprache",
              "detail": "Die Entscheidungsmacht bleibt ungeteilt — der große Vorteil gegenüber neuen Gesellschaftern."
            }
          ]
        }
      ],
      "regel": "Zinsen mindern den Gewinn und damit die Steuerlast, Ausschüttungen an Eigenkapitalgeber nicht. Fremdkapital ist deshalb auch steuerlich anders zu betrachten — allerdings nützt der Vorteil nur, wenn überhaupt Gewinn da ist."
    },
    {
      "typ": "merke",
      "text": "**Eigenkapital haftet, ist unbefristet und redet mit. Fremdkapital kostet Zinsen, ist befristet und schweigt.** Beides zusammen ergibt die Kapitalstruktur.",
      "karteikarte": "Welche vier Unterschiede bestehen zwischen Eigen- und Fremdkapital?"
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb bildet eine Rückstellung für einen laufenden Prozess. Wie ordnest du das ein?",
      "optionen": [
        {
          "text": "Außenfinanzierung mit Fremdkapital",
          "richtig": false,
          "echo": "Es fließt kein Geld von außen zu. Der Betrieb bucht lediglich Aufwand für eine Verpflichtung, deren Höhe noch ungewiss ist."
        },
        {
          "text": "Innenfinanzierung mit Fremdkapital",
          "richtig": true,
          "echo": "Richtig. Die Rückstellung ist Fremdkapital, weil sie eine Verpflichtung gegenüber Dritten abbildet. Zugleich ist sie Innenfinanzierung, weil kein Kapital von außen zufließt: Der Aufwand mindert den Gewinn, das Geld bleibt aber bis zur Inanspruchnahme im Betrieb und wirkt so lange wie ein zinsloser Kredit."
        },
        {
          "text": "Innenfinanzierung mit Eigenkapital",
          "richtig": false,
          "echo": "Innenfinanzierung stimmt, Eigenkapital nicht. Eine Rückstellung steht für eine Verpflichtung gegenüber einem Dritten und gehört damit zum Fremdkapital."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Innen oder außen, eigen oder fremd?",
      "kategorien": [
        "Innen/Eigen",
        "Innen/Fremd",
        "Außen/Eigen",
        "Außen/Fremd"
      ],
      "aufgaben": [
        {
          "text": "Der Gewinn wird nicht ausgeschüttet, sondern einbehalten.",
          "loesung": "Innen/Eigen"
        },
        {
          "text": "Die Bank gewährt ein Darlehen über 200.000 €.",
          "loesung": "Außen/Fremd"
        },
        {
          "text": "Ein neuer Gesellschafter zahlt eine Einlage ein.",
          "loesung": "Außen/Eigen"
        },
        {
          "text": "Für Pensionsverpflichtungen wird eine Rückstellung gebildet.",
          "loesung": "Innen/Fremd"
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
    "Eigenkapital und Fremdkapital werden nach der Rechtsstellung unterschieden.",
    "Finanzierung beeinflusst Haftung, Rückzahlung und Entscheidungsmacht."
  ],
  "erklaerung": "Eigenkapital haftet, ist unbefristet, hat Mitsprache und keine feste Verzinsung. Fremdkapital kostet unabhängig vom Erfolg Zinsen, ist befristet und vermittelt keine Mitsprache. Viel Eigenkapital verbessert die Kreditwürdigkeit, weil es als Haftungspuffer dient; Fremdkapital erhält dafür die Entscheidungsmacht der bisherigen Eigentümer eher ungeteilt.",
  "beispiele": [
    "Ein Eigenkapitalgeber erhält Einfluss und trägt das Verlustrisiko, verlangt aber keine feste Verzinsung.",
    "Ein Kreditgeber erhält Zinsen und Rückzahlung unabhängig vom Erfolg und verlangt häufig Sicherheiten, erhält aber keine laufende Mitsprache."
  ],
  "fallbeispiel": "Die Hausbank verlangt mehr Eigenkapital, die Inhaber wollen aber keine neuen Gesellschafter. Einbehaltener Gewinn kann die Eigenkapitalquote stärken, ohne neue Mitsprache zu schaffen. Zusätzlich werden Vermögensumschichtung, Leasing und ein Förderdarlehen geprüft. So werden Haftungspuffer, Kosten, Liquidität und Entscheidungsmacht gemeinsam bewertet.",
  "typische_fehler": "Eigenkapital wird als kostenlos bezeichnet oder Fremdkapital nur nach dem Zinssatz bewertet. Haftung, Befristung, Mitsprache und Kreditwürdigkeit gehören ebenfalls in die Abwägung.",
  "verstaendnisfragen": [
    "Warum verbessert Eigenkapital die Kreditwürdigkeit? Es haftet und dient Kreditgebern als Puffer.",
    "Was passiert mit dem Fremdkapitalzins bei Verlust? Der Zins bleibt grundsätzlich fällig, unabhängig vom Erfolg."
  ],
  "pruefungsbezug": "Vergleiche in Tabellen mindestens Haftung, Laufzeit, Verzinsung, Mitsprache und Rückzahlung.",
  "merksatz": "Eigenkapital trägt Risiko und gibt Einfluss; Fremdkapital verlangt Zins und Rückzahlung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k3 · Kreditarten und Kosten

**Datei:** `lf9-k3-kredite.kapitel.json` · SHA-256 `a4df14b085263f9885b9213f7033fcb9c7ed6be19b85de298f1cfdcda4320936`

**Konkreter Kapitelauftrag:** Kreditangebote für denselben Finanzierungsbedarf vergleichen; Auszahlung, Laufzeit, Zinsen und Gebühren getrennt zeigen.

**Einordnung:** Kurzfristiger Bedarf, kurzfristiger Kredit. Alles andere wird teuer.

### b1 · Die goldene Regel

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Kreditarten nach Fristigkeit und Zweck zuordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Die goldene Regel",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Die wichtigste Regel der Finanzierung heißt **Fristenkongruenz**: Langfristig gebundenes Vermögen wird langfristig finanziert, kurzfristiger Bedarf kurzfristig. ==Wer eine Maschine mit dem Kontokorrentkredit bezahlt, zahlt jahrelang den teuersten Zinssatz, den es gibt.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kreditart",
        "Frist",
        "Wofür gedacht"
      ],
      "zeilen": [
        {
          "zellen": [
            "Lieferantenkredit",
            "sehr kurz",
            "laufender Wareneinkauf"
          ],
          "detail": "**Das Zahlungsziel des Lieferers.** Scheinbar kostenlos — tatsächlich zahlt man den Preis in Form des verlorenen Skontos, und der ist aufs Jahr gerechnet hoch."
        },
        {
          "zellen": [
            "{{begriff:kontokorrentkredit|Kontokorrentkredit}}",
            "kurz",
            "Liquiditätsspitzen"
          ],
          "detail": "**Flexibel und teuer.** Zinsen fallen nur für den beanspruchten Betrag an, der Satz liegt aber deutlich über dem eines Darlehens. Wer die Linie dauerhaft ausschöpft, finanziert falsch."
        },
        {
          "zellen": [
            "{{begriff:darlehen|Darlehen}}",
            "mittel bis lang",
            "Maschinen, Fahrzeuge, Gebäude"
          ],
          "detail": "**Der Normalfall der Investitionsfinanzierung.** Fester Zins, fester Tilgungsplan, meist mit Sicherheiten unterlegt."
        },
        {
          "zellen": [
            "Förderdarlehen",
            "lang",
            "Investitionen, Gründung"
          ],
          "detail": "**Öffentlich gefördert**, oft mit günstigerem Zins, tilgungsfreien Anlaufjahren und teilweiser Haftungsfreistellung. Wird über die Hausbank beantragt, nicht direkt."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Fristenkongruenz:** Die Laufzeit des Kredits passt zur Nutzungsdauer des Finanzierten. Anlagevermögen langfristig, Umlaufvermögen kurzfristig.",
      "karteikarte": "Was besagt die Fristenkongruenz, und was passiert bei Verstoß dagegen?"
    },
    {
      "typ": "achtung",
      "text": "Der Lieferantenkredit wirkt gratis, weil keine Zinsen berechnet werden. Er kostet aber das entgangene Skonto — und dieser Satz liegt aufs Jahr hochgerechnet regelmäßig über dem eines Bankkredits. **Wer Skonto ziehen kann, sollte es tun, notfalls über den Kontokorrent.**"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Anlage- und Umlaufvermögen binden Kapital unterschiedlich lange.",
    "Die Finanzierungslaufzeit muss zur Nutzungsdauer passen."
  ],
  "erklaerung": "Fristenkongruenz bedeutet: langfristig gebundenes Vermögen wird langfristig finanziert, kurzfristiger Bedarf kurzfristig. Eine Maschine mit Kontokorrent zu finanzieren ist gefährlich, weil der kurzfristige und teure Kredit dauerhaft gebraucht wird und gekündigt werden kann. Der Lieferantenkredit wirkt zinsfrei, kostet aber das entgangene Skonto.",
  "beispiele": [
    "Eine Maschine wird mit einem langfristigen Darlehen finanziert; Vorräte können kurzfristig finanziert werden.",
    "Wer ein Skonto ziehen kann, vergleicht den Vorteil mit den Kosten eines kurzfristigen Kredits, statt den Lieferantenkredit automatisch als kostenlos anzusehen."
  ],
  "fallbeispiel": "Ein Betrieb möchte eine langfristig genutzte Maschine über den Kontokorrent bezahlen. Die Prüfung ergibt einen Fristenverstoß: Laufzeit und Nutzungsdauer passen nicht zusammen, der Zinssatz ist teuer und die Kreditlinie kann entfallen. Die Finanzierung wird auf ein langfristiges Darlehen umgestellt; der Kontokorrent bleibt für kurzfristige Spitzen.",
  "typische_fehler": "Der niedrigere Nominalzins oder die schnelle Verfügbarkeit wird betrachtet, ohne Laufzeit und Kündigungsrisiko einzubeziehen. Lieferantenkredit wird wegen fehlender Zinszeile für kostenlos gehalten.",
  "verstaendnisfragen": [
    "Was fordert Fristenkongruenz? Dass Kreditlaufzeit und Nutzungsdauer des finanzierten Vermögens zusammenpassen.",
    "Was kostet der scheinbar kostenlose Lieferantenkredit? Das entgangene Skonto."
  ],
  "pruefungsbezug": "Ordne zuerst Vermögen und Bindungsdauer zu, dann die passende Kreditlaufzeit. Beim Lieferantenkredit immer den Skontoverzicht prüfen.",
  "merksatz": "Langfristige Dinge brauchen langfristiges Geld; kurzfristige Kredite sind keine Dauerlösung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Zwei Tilgungsformen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Raten- und Annuitätendarlehen unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Zwei Tilgungsformen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Bei einem Darlehen wird nicht nur der Zins vereinbart, sondern auch **wie getilgt wird**. Die beiden gängigen Formen führen zu sehr unterschiedlichen Belastungen im Zeitverlauf."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Wege",
      "titel": "Ratendarlehen oder Annuität",
      "lead": "Gleiche Summe, gleicher Zins, andere Belastung. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Ratendarlehen",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Tilgung bleibt gleich",
              "detail": "Bei 100.000 € auf 10 Jahre werden jedes Jahr 10.000 € getilgt — unabhängig davon, wie hoch die Restschuld ist."
            },
            {
              "text": "Zins sinkt jedes Jahr",
              "detail": "Er wird auf die Restschuld gerechnet, und die wird kleiner. Deshalb sinkt auch die Gesamtbelastung von Jahr zu Jahr."
            },
            {
              "text": "Anfangs die höchste Belastung",
              "detail": "Genau dann, wenn eine neue Investition oft noch wenig einbringt. Das ist der praktische Nachteil."
            },
            {
              "text": "Insgesamt weniger Zinsen",
              "detail": "Weil schneller getilgt wird, sinkt die Restschuld früher — über die Laufzeit die günstigere Variante."
            }
          ]
        },
        {
          "name": "Annuitätendarlehen",
          "ton": "gold",
          "punkte": [
            {
              "text": "Rate bleibt gleich",
              "detail": "Jedes Jahr derselbe Betrag. Für die Planung der Liquidität ist das der entscheidende Vorteil."
            },
            {
              "text": "Zinsanteil sinkt, Tilgungsanteil steigt",
              "detail": "Innerhalb der gleichbleibenden Rate verschiebt sich das Verhältnis — anfangs viel Zins, später viel Tilgung."
            },
            {
              "text": "Gleichmäßige Belastung",
              "detail": "Planbar über die gesamte Laufzeit. Deshalb bei Gebäuden und langen Laufzeiten die übliche Form."
            },
            {
              "text": "Insgesamt mehr Zinsen",
              "detail": "Weil anfangs weniger getilgt wird, bleibt die Restschuld länger hoch. Der Preis für die Planbarkeit."
            }
          ]
        }
      ],
      "regel": "Merksatz: Beim Ratendarlehen bleibt die Tilgung gleich, bei der Annuität die Rate. Genau diese beiden Wörter werden in Prüfungen vertauscht."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Jahr",
        "Restschuld",
        "Zins 5 %",
        "Tilgung",
        "Rate"
      ],
      "zeilen": [
        {
          "zellen": [
            "1",
            "100.000",
            "5.000",
            "20.000",
            "25.000"
          ],
          "mono": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "zellen": [
            "2",
            "80.000",
            "4.000",
            "20.000",
            "24.000"
          ],
          "mono": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "zellen": [
            "3",
            "60.000",
            "3.000",
            "20.000",
            "23.000"
          ],
          "mono": [
            0,
            1,
            2,
            3,
            4
          ],
          "detail": "**Ratendarlehen über 5 Jahre.** Der Zins wird immer auf die Restschuld zu Beginn des Jahres gerechnet. Die Rate sinkt jedes Jahr um genau 5 % von 20.000 €, also um 1.000 €."
        },
        {
          "zellen": [
            "4",
            "40.000",
            "2.000",
            "20.000",
            "22.000"
          ],
          "mono": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "zellen": [
            "5",
            "20.000",
            "1.000",
            "20.000",
            "21.000"
          ],
          "mono": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Zins immer auf die Restschuld zu Jahresbeginn.** Beim Ratendarlehen sinkt die Rate gleichmäßig, bei der Annuität bleibt sie konstant und verschiebt sich nur innerlich.",
      "karteikarte": "Wie unterscheiden sich Raten- und Annuitätendarlehen, und welches ist über die Laufzeit günstiger?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b2",
  "vorauswissen": [
    "Tilgung reduziert die Restschuld.",
    "Zinsen werden auf die Restschuld zu Beginn der Periode berechnet."
  ],
  "erklaerung": "Beim Ratendarlehen bleibt die Tilgung gleich und die Rate sinkt, weil die Zinsen auf die sinkende Restschuld berechnet werden. Beim Annuitätendarlehen bleibt die Rate gleich; der Tilgungsanteil steigt im Zeitverlauf. Für jeden Tilgungsplan werden Restschuld, Zins, Tilgung und Rate getrennt notiert.",
  "beispiele": [
    "Beim Ratendarlehen sinkt die Rate von Periode zu Periode, obwohl die Tilgung gleich bleibt.",
    "Bei der Annuität bleibt die Rate gleich, während der Zinsanteil sinkt und der Tilgungsanteil steigt."
  ],
  "fallbeispiel": "Ein Ratendarlehen über 60.000 € läuft vier Jahre bei 6 %. Die jährliche Tilgung beträgt 60.000 € ÷ 4 = 15.000 €. Jahr 1: Zins 6 % von 60.000 € = 3.600 €, Rate 15.000 € + 3.600 € = 18.600 €. Restschuld 45.000 €. Jahr 2: Zins 6 % von 45.000 € = 2.700 €, Rate 15.000 € + 2.700 € = 17.700 €. Die Rate sinkt um 900 €.",
  "typische_fehler": "Der Zins wird auf den ursprünglichen Kredit statt auf die Restschuld zu Periodenbeginn gerechnet. Außerdem werden Ratentilgung und Annuität verwechselt.",
  "verstaendnisfragen": [
    "Was bleibt beim Ratendarlehen gleich? Die Tilgung.",
    "Wie setzt sich die Rate zusammen? Aus Tilgung plus Zins der jeweiligen Periode."
  ],
  "pruefungsbezug": "Lege die vier Spalten Restschuld, Zins, Tilgung und Rate an und rechne jede Periode einzeln.",
  "merksatz": "Ratendarlehen = gleiche Tilgung, sinkende Rate; Annuität = gleiche Rate, steigende Tilgung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Was ein Kredit wirklich kostet

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Kreditkosten beurteilen und vergleichen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `check-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Was ein Kredit wirklich kostet",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der genannte Zinssatz ist selten der ganze Preis. **Bearbeitungsgebühren, Bereitstellungszinsen, Kosten der Sicherheiten und ein etwaiges Disagio** gehören dazu. Vergleichbar werden Angebote erst über den Effektivzins, der all das einrechnet."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kostenbestandteil",
        "Wofür",
        "Beachten"
      ],
      "zeilen": [
        {
          "zellen": [
            "Nominalzins",
            "die Kapitalüberlassung",
            "sagt allein wenig aus"
          ]
        },
        {
          "zellen": [
            "Disagio",
            "Abschlag bei der Auszahlung",
            "senkt den Nominalzins optisch"
          ],
          "detail": "**Bei 98 % Auszahlung werden 100 % verzinst und zurückgezahlt.** Der Nominalzins wirkt dadurch niedriger, der Effektivzins nicht."
        },
        {
          "zellen": [
            "Bereitstellungszins",
            "für abgerufene, aber nicht genutzte Mittel",
            "bei Bauvorhaben relevant"
          ]
        },
        {
          "zellen": [
            "Kosten der Sicherheiten",
            "Notar, Grundbuch, Gutachten",
            "fallen einmalig an"
          ],
          "detail": "**Bei grundpfandrechtlicher Sicherung schnell vierstellig.** Sie gehören in den Vergleich, auch wenn sie nicht die Bank erhält."
        },
        {
          "zellen": [
            "Effektivzins",
            "alles zusammen",
            "die einzige Vergleichsgröße"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Vor jedem Bankgespräch gehören drei Dinge auf den Tisch: **Zweck, Betrag, Laufzeit** — und die Antwort auf die Frage, woraus zurückgezahlt werden soll. Wer das nicht beantworten kann, bekommt entweder keinen Kredit oder einen teuren."
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb finanziert eine Maschine mit zehn Jahren Nutzungsdauer über den Kontokorrentkredit. Was ist das Problem?",
      "optionen": [
        {
          "text": "Nichts — Hauptsache, die Maschine ist bezahlt",
          "richtig": false,
          "echo": "Kurzfristig funktioniert es, dauerhaft wird es teuer und riskant. Genau davor warnt die Fristenkongruenz."
        },
        {
          "text": "Verstoß gegen die Fristenkongruenz — teuer und jederzeit kündbar",
          "richtig": true,
          "echo": "Richtig. Langfristig gebundenes Vermögen wird mit dem teuersten kurzfristigen Kredit finanziert. Zwei Folgen: Erstens ist der Zinssatz deutlich höher als bei einem Darlehen, und das über Jahre. Zweitens ist die Kreditlinie kurzfristig kündbar oder kürzbar — dann müsste der Betrieb die Maschine sofort anders finanzieren. Richtig wäre ein Darlehen mit einer Laufzeit, die zur Nutzungsdauer passt."
        },
        {
          "text": "Der Kontokorrentkredit ist für Investitionen gesetzlich nicht zulässig",
          "richtig": false,
          "echo": "Ein rechtliches Verbot gibt es nicht. Das Problem ist rein kaufmännisch: falscher Preis und falsche Sicherheit der Finanzierung."
        }
      ]
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Kreditart passt?",
      "kategorien": [
        "Lieferantenkredit",
        "Kontokorrentkredit",
        "Darlehen"
      ],
      "aufgaben": [
        {
          "text": "Eine neue Produktionsanlage mit zwölf Jahren Nutzungsdauer.",
          "loesung": "Darlehen"
        },
        {
          "text": "Der Monat, in dem Steuervorauszahlung und Löhne zusammentreffen.",
          "loesung": "Kontokorrentkredit"
        },
        {
          "text": "Das Zahlungsziel von 30 Tagen beim Wareneinkauf.",
          "loesung": "Lieferantenkredit"
        },
        {
          "text": "Ein Firmenwagen, der fünf Jahre gefahren wird.",
          "loesung": "Darlehen"
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
    "Nominalzins und Gesamtkosten sind nicht identisch.",
    "Gebühren und Disagio beeinflussen den tatsächlichen Kreditpreis."
  ],
  "erklaerung": "Bearbeitungsgebühren, Bereitstellungszinsen, Sicherheitenkosten und ein Disagio gehören zu den Kreditkosten. Deshalb sind Angebote nur über den Effektivzins vergleichbar. Der Nominalzins allein zeigt nicht, wie viel Geld ausgezahlt und wie viel zurückgezahlt wird.",
  "beispiele": [
    "Bei einem Disagio wird weniger ausgezahlt, obwohl der volle Nennbetrag verzinst und zurückgezahlt wird.",
    "Zwei Angebote mit unterschiedlichem Nominalzins werden erst nach Einbeziehung von Gebühren und Disagio über den Effektivzins verglichen."
  ],
  "fallbeispiel": "Für 200.000 € bietet Bank A 4,2 % Nominalzins und 2 % Disagio, Bank B 4,6 % ohne Disagio. Bei A werden nur 196.000 € ausgezahlt, aber 200.000 € verzinst und zurückgezahlt. Deshalb reicht der niedrigere Nominalzins nicht; der Effektivzins und die weiteren Kosten entscheiden. Benötigt der Betrieb tatsächlich 200.000 €, verschärft das Disagio den Nachteil von A.",
  "typische_fehler": "Der niedrigere Nominalzins wird automatisch gewählt oder das Disagio nur als einmaligen Rabatt behandelt. Auch Sicherheiten- und Bereitstellungskosten werden vergessen.",
  "verstaendnisfragen": [
    "Warum ist der Effektivzins entscheidend? Er macht die Angebote einschließlich weiterer Kosten vergleichbar.",
    "Was bedeutet 2 % Disagio bei 200.000 €? Es werden 196.000 € ausgezahlt, der Nennbetrag 200.000 € bleibt aber zu verzinsen und zurückzuzahlen."
  ],
  "pruefungsbezug": "Vergleiche Kredite immer über Auszahlung, Rückzahlung, Gebühren, Disagio und Effektivzins; der Nominalzins ist nur ein Teil.",
  "merksatz": "Der Kreditpreis ist das, was die Finanzierung insgesamt kostet — nicht nur die Zahl neben ‚Zins‘."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k4 · Kreditsicherheiten

**Datei:** `lf9-k4-sicherheiten.kapitel.json` · SHA-256 `9cafcb2daa9b30fcd9734abb9ea6ba7e00048878015ba1710521b053f66b662f`

**Konkreter Kapitelauftrag:** Für einen Finanzierungsausfall die Wirkung von Sicherheiten erklären; Haftung, Besitz und Eigentum nicht gleichsetzen.

**Einordnung:** Die Bank glaubt an dich. Aber lieber schriftlich.

### b1 · Zwei Grundformen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Personen- und Sachsicherheiten unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Zwei Grundformen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Eine Kreditsicherheit verschafft dem Kreditgeber etwas, worauf er zurückgreifen kann, wenn nicht zurückgezahlt wird. ==Die Einteilung ist einfach: Steht dahinter ein **Mensch** oder eine **Sache**?=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Art",
        "Dahinter steht",
        "Beispiele"
      ],
      "zeilen": [
        {
          "zellen": [
            "Personensicherheit",
            "eine weitere Person haftet",
            "{{begriff:buergschaft|Bürgschaft}}, Schuldbeitritt, Garantie"
          ],
          "detail": "**Der Wert hängt vollständig an der Zahlungsfähigkeit dieser Person.** Eine Bürgschaft von jemandem ohne Vermögen ist juristisch wirksam und wirtschaftlich wertlos."
        },
        {
          "zellen": [
            "Sachsicherheit",
            "ein Gegenstand haftet",
            "{{begriff:grundschuld|Grundschuld}}, {{begriff:sicherungsuebereignung|Sicherungsübereignung}}, Pfandrecht, Zession"
          ],
          "detail": "**Unabhängig von der Person des Schuldners** — aber abhängig davon, was der Gegenstand im Ernstfall noch bringt. Eine Spezialmaschine ist schwer zu verwerten."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Daneben unterscheidet man **akzessorische** und **abstrakte** Sicherheiten. Akzessorisch heißt: Die Sicherheit hängt an der Forderung und erlischt mit ihr — so bei Bürgschaft und Hypothek. Abstrakt heißt: Sie besteht unabhängig weiter, wie bei der Grundschuld."
    },
    {
      "typ": "merke",
      "text": "**Person oder Sache** ist die erste Frage, **akzessorisch oder abstrakt** die zweite. Die zweite entscheidet, ob die Sicherheit nach Tilgung automatisch erlischt.",
      "karteikarte": "Wie unterscheiden sich Personen- und Sachsicherheiten, und was bedeutet akzessorisch?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Kredite können durch Personen oder Sachen gesichert werden.",
    "Akzessorisch bedeutet, dass eine Sicherheit an die Forderung gebunden ist."
  ],
  "erklaerung": "Personensicherheiten beruhen auf einer weiteren Person, Sachsicherheiten auf einem Gegenstand. Bei akzessorischen Sicherheiten hängt die Sicherheit an der Hauptforderung und erlischt mit ihr. Diese Grundsortierung kommt vor jeder Detailprüfung.",
  "beispiele": [
    "Eine Bürgschaft ist eine Personensicherheit; der Bürge steht für die Schuld eines Dritten ein.",
    "Eine Maschine oder ein Grundstück kann als Sachsicherheit dienen; bei der Bewertung wird ein Verwertungsabschlag berücksichtigt."
  ],
  "fallbeispiel": "Eine Bank verlangt für einen Kredit eine Sicherheit. Zuerst wird gefragt: Soll eine Person einstehen oder ein Gegenstand haften? Bei einer Bürgschaft wird die Person und ihre Form geprüft; bei einem Gegenstand Eigentum, Nutzung und realistischer Verwertungserlös. Erst danach wird die konkrete Sicherheit ausgewählt.",
  "typische_fehler": "Bürgschaft, Grundschuld und Sicherungsübereignung werden ohne die Grundsortierung verglichen. Außerdem wird der Nennwert eines Gegenstands mit seinem realistischen Verwertungserlös gleichgesetzt.",
  "verstaendnisfragen": [
    "Was unterscheidet Personen- und Sachsicherheit? Die eine steht auf einer Person, die andere auf einem Gegenstand.",
    "Was bedeutet akzessorisch? Die Sicherheit ist an die Forderung gebunden und erlischt mit ihr."
  ],
  "pruefungsbezug": "Beginne jede Sicherheitsaufgabe mit Person oder Sache und ergänze danach Akzessorietät, Form und Verwertung.",
  "merksatz": "Erst Person oder Sache sortieren, dann die konkrete Sicherheit prüfen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Die Bürgschaft

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** recht (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Die Bürgschaft und ihre Formen erklären

**Aufbauauftrag:** Anwendungsbereich und Voraussetzungen nennen, dann Tatsachen einzeln zuordnen und erst daraus die Rechtsfolge ableiten. Quelle und aktuellen Stand prüfen.

**Passender Gegenfall:** Genau eine Voraussetzung weglassen oder ändern; gleiche Oberfläche, andere Rechtsfolge begründen.

**Darstellung:** Kurzes Prüfschema und Gegenüberstellung der Fälle; kein unkommentiertes Paragraphenregister.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `achtung-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Die Bürgschaft",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Bei der {{begriff:buergschaft|Bürgschaft}} nach {{par:bgb-765|§ 765 BGB}} verpflichtet sich ein Dritter, für die Schuld eines anderen einzustehen. **Sie ist akzessorisch** — sie kann nie größer sein als die Hauptforderung und erlischt mit ihr."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Der Ablauf",
      "titel": "Wann muss der Bürge zahlen?",
      "lead": "Vier Stufen — die dritte entscheidet über alles. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Bürgschaftsvertrag",
          "satz": "§ 766 BGB · schriftlich",
          "text": "Die Erklärung des Bürgen bedarf der Schriftform. Eine mündliche Bürgschaft ist unwirksam — es sei denn, der Bürge ist Kaufmann und die Bürgschaft gehört zu seinem Handelsgewerbe."
        },
        {
          "nr": 2,
          "titel": "Hauptschuldner zahlt nicht",
          "satz": "Voraussetzung",
          "text": "Ohne Ausfall des Hauptschuldners passiert nichts. Der Bürge haftet nicht zusätzlich, sondern ersatzweise."
        },
        {
          "nr": 3,
          "titel": "Einrede der Vorausklage",
          "satz": "§ 771 BGB",
          "text": "Der gewöhnliche Bürge darf verlangen, dass der Gläubiger zuerst erfolglos gegen den Hauptschuldner vollstreckt. Diese Einrede ist der ganze Unterschied zwischen den beiden Bürgschaftsformen."
        },
        {
          "nr": 4,
          "titel": "Bürge zahlt",
          "satz": "und rückt nach",
          "text": "Zahlt der Bürge, geht die Forderung gegen den Hauptschuldner auf ihn über. Er kann sich also bei diesem holen, was er aufgewendet hat — sofern dort noch etwas zu holen ist."
        }
      ],
      "regel": "Im Geschäftsverkehr verlangen Banken fast immer die selbstschuldnerische Bürgschaft: Auf die Einrede der Vorausklage wird verzichtet, der Bürge kann sofort in Anspruch genommen werden."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Form",
        "Besonderheit",
        "Folge für den Bürgen"
      ],
      "zeilen": [
        {
          "zellen": [
            "Gewöhnliche Bürgschaft",
            "Einrede der Vorausklage besteht",
            "erst nach erfolgloser Vollstreckung"
          ]
        },
        {
          "zellen": [
            "Selbstschuldnerische Bürgschaft",
            "Verzicht auf die Einrede",
            "sofort in Anspruch zu nehmen"
          ],
          "detail": "**Der Regelfall bei Banken.** Der Bürge steht praktisch wie der Hauptschuldner da — deshalb ist genau hinzusehen, bevor unterschrieben wird."
        },
        {
          "zellen": [
            "Ausfallbürgschaft",
            "nur für den nachgewiesenen Ausfall",
            "günstigste Form für den Bürgen"
          ]
        },
        {
          "zellen": [
            "Mitbürgschaft",
            "mehrere Bürgen",
            "haften als Gesamtschuldner"
          ],
          "detail": "**Jeder haftet für das Ganze**, nicht nur für seinen Anteil. Der Gläubiger sucht sich aus, wen er in Anspruch nimmt."
        }
      ]
    },
    {
      "typ": "achtung",
      "text": "Nach {{par:hgb-350|§ 350 HGB}} gilt die Schriftform **nicht**, wenn die Bürgschaft für den Bürgen ein Handelsgeschäft ist. Ein Kaufmann kann sich also mündlich wirksam verbürgen. Das ist ein beliebter Prüfungsfall — und im Alltag ein erheblicher Unterschied."
    },
    {
      "typ": "check",
      "frage": "Ein Betriebsinhaber bürgt schriftlich selbstschuldnerisch für einen Kredit seines Betriebs. Der Betrieb zahlt nicht. Was kann die Bank tun?",
      "optionen": [
        {
          "text": "Erst gegen den Betrieb vollstrecken, dann den Bürgen belangen",
          "richtig": false,
          "echo": "Das wäre bei der gewöhnlichen Bürgschaft so. Durch den Zusatz „selbstschuldnerisch\" ist auf die Einrede der Vorausklage gerade verzichtet worden."
        },
        {
          "text": "Sofort den Bürgen in Anspruch nehmen",
          "richtig": true,
          "echo": "Richtig. Bei der selbstschuldnerischen Bürgschaft verzichtet der Bürge auf die Einrede der Vorausklage aus § 771 BGB. Die Bank muss also nicht erst erfolglos gegen den Hauptschuldner vollstrecken, sondern kann den Bürgen unmittelbar in Anspruch nehmen. Zahlt er, geht die Forderung gegen den Betrieb auf ihn über — praktisch bleibt er darauf aber oft sitzen."
        },
        {
          "text": "Nichts — die Bürgschaft ist mangels notarieller Form unwirksam",
          "richtig": false,
          "echo": "Für die Bürgschaft genügt Schriftform nach § 766 BGB, eine notarielle Beurkundung ist nicht nötig. Die Bürgschaft ist wirksam."
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
    "Der Bürge sichert die Schuld eines Dritten.",
    "Die Bürgschaft hat eigene Form- und Einredefragen."
  ],
  "erklaerung": "Nach § 765 BGB steht der Bürge für die Verbindlichkeit des Hauptschuldners ein. Nach § 766 BGB ist grundsätzlich Schriftform erforderlich; für einen Kaufmann kann § 350 HGB als Handelsgeschäft eine Ausnahme bilden. Bei der gewöhnlichen Bürgschaft kann der Bürge die Einrede der Vorausklage erheben. Bei der selbstschuldnerischen Bürgschaft verzichtet er darauf und kann sofort in Anspruch genommen werden.",
  "beispiele": [
    "Bei gewöhnlicher Bürgschaft muss der Gläubiger grundsätzlich zuerst erfolglos gegen den Hauptschuldner vorgehen.",
    "Bei selbstschuldnerischer Bürgschaft kann der Gläubiger den Bürgen unmittelbar in Anspruch nehmen; das ist im Bankgeschäft die Regel."
  ],
  "fallbeispiel": "Ein Kreditnehmer zahlt nicht. Bei gewöhnlicher Bürgschaft prüft der Bürge zunächst die Einrede der Vorausklage; bei selbstschuldnerischer Bürgschaft ist dieser Einwand ausgeschlossen. Vorher wird außerdem geprüft, ob die Bürgschaft formwirksam erklärt wurde oder bei einem Kaufmann als Handelsgeschäft die Ausnahme des § 350 HGB greift.",
  "typische_fehler": "Selbstschuldnerische und gewöhnliche Bürgschaft werden vertauscht oder jede mündliche Bürgschaft für unwirksam gehalten. Auch die Bindung an die Hauptforderung wird übersehen.",
  "verstaendnisfragen": [
    "Was ist der Unterschied bei der Inanspruchnahme? Bei gewöhnlicher Bürgschaft gibt es die Vorausklage; bei selbstschuldnerischer nicht.",
    "Welche Form gilt grundsätzlich? Schriftform nach § 766 BGB, mit der vorhandenen Handelsgeschäft-Ausnahme."
  ],
  "pruefungsbezug": "Prüfe Bürgschaft in der Reihenfolge Hauptforderung, Form, Vorausklage und Art der Bürgschaft.",
  "merksatz": "Selbstschuldnerisch heißt: Der Bürge verzichtet auf die Vorausklage."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Sachsicherheiten

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Sachsicherheiten dem passenden Zweck zuordnen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Sachsicherheiten",
  "inhalt": [
    {
      "typ": "tabelle",
      "spalten": [
        "Sicherheit",
        "Betrifft",
        "Wer behält was"
      ],
      "zeilen": [
        {
          "zellen": [
            "{{begriff:sicherungsuebereignung|Sicherungsübereignung}}",
            "bewegliche Sachen",
            "Eigentum zur Bank, Besitz beim Betrieb"
          ],
          "detail": "**Der entscheidende Vorteil:** Die Maschine sichert den Kredit und produziert trotzdem weiter. Beim Pfandrecht müsste sie übergeben werden — für Betriebsmittel unbrauchbar."
        },
        {
          "zellen": [
            "Pfandrecht",
            "bewegliche Sachen, Wertpapiere",
            "Besitz geht über"
          ],
          "detail": "**Deshalb im Betrieb selten** und vor allem für Wertpapiere und Depots gebräuchlich, die man ohnehin nicht in der Hand hält."
        },
        {
          "zellen": [
            "{{begriff:grundschuld|Grundschuld}}",
            "Grundstücke, Gebäude",
            "Eintrag im Grundbuch"
          ],
          "detail": "**Abstrakt**, also nicht an eine bestimmte Forderung gebunden. Nach Tilgung bleibt sie bestehen und kann für einen neuen Kredit weiterverwendet werden — das spart Notar- und Grundbuchkosten."
        },
        {
          "zellen": [
            "Hypothek",
            "Grundstücke, Gebäude",
            "Eintrag im Grundbuch"
          ],
          "detail": "**Akzessorisch**, also an eine bestimmte Forderung gebunden. Sinkt die Schuld, sinkt die Hypothek mit. In der Praxis wurde sie weitgehend von der Grundschuld verdrängt."
        },
        {
          "zellen": [
            "Forderungsabtretung",
            "Kundenforderungen",
            "Anspruch geht auf die Bank über"
          ],
          "detail": "**Zession.** Still bedeutet, dass die Kunden nichts erfahren; offen bedeutet, dass sie direkt an die Bank zahlen. Die stille Form ist im Geschäftsverkehr üblich, weil sie keine Fragen aufwirft."
        }
      ]
    },
    {
      "typ": "absatz",
      "text": "Für die Bank zählt neben der Rechtsform vor allem der **Verwertungserlös im Ernstfall**. Deshalb wird nie der volle Wert angesetzt, sondern ein Abschlag vorgenommen — bei Spezialmaschinen ein erheblicher, weil sich dafür kaum ein Käufer findet."
    },
    {
      "typ": "merke",
      "text": "**Sicherungsübereignung**: Eigentum zur Bank, Nutzung bleibt. **Grundschuld** ist abstrakt und wiederverwendbar, **Hypothek** akzessorisch. **Zession** überträgt Forderungen, still oder offen.",
      "karteikarte": "Welche Sachsicherheiten gibt es, und worin unterscheiden sich Grundschuld und Hypothek?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Sicherheit passt?",
      "kategorien": [
        "Bürgschaft",
        "Sicherungsübereignung",
        "Grundschuld",
        "Zession"
      ],
      "aufgaben": [
        {
          "text": "Ein Gabelstapler soll den Kredit sichern und weiter im Lager fahren.",
          "loesung": "Sicherungsübereignung"
        },
        {
          "text": "Der Inhaber steht persönlich für den Betriebskredit ein.",
          "loesung": "Bürgschaft"
        },
        {
          "text": "Das Betriebsgrundstück wird belastet.",
          "loesung": "Grundschuld"
        },
        {
          "text": "Offene Kundenrechnungen werden an die Bank übertragen.",
          "loesung": "Zession"
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
    "Sachsicherheiten geben der Bank Zugriff auf einen Gegenstand.",
    "Der Betrieb braucht Betriebsmittel oft weiter für seine Leistung."
  ],
  "erklaerung": "Bei der Sicherungsübereignung geht das Eigentum auf den Kreditgeber über, während der Betrieb den Besitz und die Nutzung behält. Das ist bei Maschinen sinnvoller als ein Pfand, bei dem der Besitz übergehen müsste. Die Grundschuld ist abstrakt und wiederverwendbar; die Hypothek ist akzessorisch. Banken bewerten nicht den vollen Wert, sondern den erwarteten Verwertungserlös nach Abschlag.",
  "beispiele": [
    "Ein Betrieb kann eine Maschine sicherungsübereignen und sie weiterhin zur Rückzahlung des Kredits einsetzen.",
    "Eine Grundschuld auf einem Betriebsgrundstück kann nach Tilgung für weitere Kredite wiederverwendbar sein; Notar- und Grundbuchkosten gehören in den Vergleich."
  ],
  "fallbeispiel": "Ein Betrieb braucht 150.000 € für neue Fahrzeuge. Zuerst wird die Sicherungsübereignung der Fahrzeuge geprüft, weil sie weiter genutzt werden können. Reicht der Wert nach Verwertungsabschlag nicht, kommen Grundschuld, Abtretung von Kundenforderungen oder eine selbstschuldnerische Bürgschaft in Betracht. Jede Variante wird nach Nutzung, Erlös, Kosten und Privatrisiko bewertet.",
  "typische_fehler": "Sicherungsübereignung wird mit Besitzübergabe verwechselt. Außerdem werden Grundschuld und Hypothek beide als akzessorisch bezeichnet oder der Abschlag der Bank nicht berücksichtigt.",
  "verstaendnisfragen": [
    "Warum wird eine Maschine sicherungsübereignet und nicht verpfändet? Der Betrieb behält den Besitz und kann sie weiter nutzen.",
    "Was ist der zentrale Unterschied zwischen Grundschuld und Hypothek? Die Grundschuld ist abstrakt und wiederverwendbar, die Hypothek akzessorisch."
  ],
  "pruefungsbezug": "Vergleiche Sachsicherheiten nach Nutzung, Eigentum, Verwertung, Kosten und Risiko; nicht nur nach dem Sicherungswort.",
  "merksatz": "Die beste Sachsicherheit sichert den Kredit und lässt den Betrieb weiterarbeiten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k5 · Leasing, Factoring und Alternativen

**Datei:** `lf9-k5-leasing.kapitel.json` · SHA-256 `5f663daae187d753219bee620dfd4d0f21f4af8f70655e5c96f9bf16607a8719`

**Konkreter Kapitelauftrag:** Kauf, Leasing und Factoring an Liquidität, Bilanzzuordnung und Kosten vergleichen; Vertragsannahmen ausdrücklich begrenzen.

**Einordnung:** Nicht alles, was man braucht, muss einem gehören.

### b1 · Leasing

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Leasing und Kauf gegenüberstellen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `achtung-1`, `merke-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Leasing",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Beim {{begriff:leasing|Leasing}} wird ein Gegenstand genutzt, ohne ihn zu kaufen. ==Der entscheidende Punkt für die Liquidität: Statt einer großen Einmalzahlung entstehen gleichmäßige Raten== — das Geld bleibt für anderes verfügbar."
    },
    {
      "typ": "grafik",
      "variante": "vergleich",
      "kopf": "Zwei Wege",
      "titel": "Kaufen oder leasen",
      "lead": "Dieselbe Maschine, andere Folgen für Bilanz und Konto. Jede Zeile anklicken.",
      "seiten": [
        {
          "name": "Kauf",
          "ton": "ruhig",
          "punkte": [
            {
              "text": "Große Einmalzahlung",
              "detail": "Der volle Betrag verlässt auf einen Schlag das Konto oder wird über ein Darlehen finanziert. Für die Liquidität der härteste Weg."
            },
            {
              "text": "Gegenstand steht in der Bilanz",
              "detail": "Er erscheint im Anlagevermögen und wird abgeschrieben. Die Bilanzsumme steigt, die Eigenkapitalquote sinkt rechnerisch."
            },
            {
              "text": "Eigentum von Anfang an",
              "detail": "Der Betrieb kann frei verfügen, umbauen, verkaufen — und die Sache als Sicherheit einsetzen."
            },
            {
              "text": "Über die Nutzungsdauer meist günstiger",
              "detail": "Es fällt keine Marge des Leasinggebers an. Wer die Sache lange nutzt, fährt mit Kauf besser."
            }
          ]
        },
        {
          "name": "Leasing",
          "ton": "gold",
          "punkte": [
            {
              "text": "Gleichmäßige Raten",
              "detail": "Planbar und liquiditätsschonend. Gerade für junge Betriebe oft der einzig gangbare Weg zu moderner Ausstattung."
            },
            {
              "text": "Meist nicht in der Bilanz des Nutzers",
              "detail": "Im typischen Fall — Vollamortisationsvertrag über eine Maschine **ohne Kauf- oder Verlängerungsoption**, kein Spezialleasing, feste Grundmietzeit zwischen 40 und 90 Prozent der Nutzungsdauer — wird der Gegenstand nach den steuerlichen Leasingerlassen dem Leasinggeber zugerechnet und dort bilanziert. Der Nutzer aktiviert dann weder die Maschine noch eine Darlehensschuld. Beim Kreditkauf würde zunächst die Bilanzsumme steigen und bei unverändertem Eigenkapital die Eigenkapitalquote sinken — diese Bilanzverlängerung entfällt im Leasingfall. Die Raten mindern aber Gewinn und Liquidität — Rentabilität und Liquiditätskennzahlen verändern sich trotzdem. **Gegenfall:** Darf der Nutzer die Maschine am Ende für 1.000 € kaufen, obwohl sie dann noch 40.000 € wert ist, wird sie trotz passender Mietzeit dem Leasingnehmer zugerechnet — er bilanziert sie wie einen Kauf."
            },
            {
              "text": "Raten sind Betriebsausgaben",
              "detail": "Sie mindern den Gewinn sofort in voller Höhe, während beim Kauf nur die Abschreibung wirkt. Der Vorteil ist eine Frage des Zeitpunkts, nicht der Gesamthöhe."
            },
            {
              "text": "Über die Laufzeit teurer",
              "detail": "Der Leasinggeber verdient an der Überlassung. Bequemlichkeit und Planbarkeit haben ihren Preis."
            }
          ]
        }
      ],
      "regel": "Die praktische Faustregel: Was schnell veraltet und regelmäßig ersetzt wird — Fahrzeuge, IT — spricht für Leasing. Was lange und unverändert genutzt wird, spricht für Kauf.",
      "standhinweis": "Die Zurechnung hängt vom Vertragstyp ab (ohne Option, mit Kauf- oder Verlängerungsoption, Spezialleasing). Die Grafik zeigt den vereinfachten Regelfall eines Vollamortisationsvertrags ohne Option nach dem Mobilien-Leasing-Erlass."
    },
    {
      "typ": "achtung",
      "text": "Am Ende der Laufzeit steht die entscheidende Frage: **Was passiert mit dem Gegenstand?** Rückgabe, Kauf zum Restwert oder Anschlussvertrag. Besonders bei Fahrzeugen sind Rückgabebedingungen und Kilometerbegrenzungen ein häufiger Streitpunkt — sie gehören vor Vertragsschluss geprüft."
    },
    {
      "typ": "merke",
      "text": "**Leasing schont die Liquidität und kostet über die Laufzeit mehr.** Es ist Nutzung, nicht Eigentum — deshalb taugt der Gegenstand auch nicht als eigene Sicherheit.",
      "karteikarte": "Welche Vor- und Nachteile hat Leasing gegenüber dem Kauf?"
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Kauf führt zu Eigentum, Leasing zunächst nur zur Nutzung.",
    "Liquidität und Gesamtkosten können in unterschiedliche Richtungen wirken."
  ],
  "erklaerung": "Beim Kauf erwirbt der Betrieb den Gegenstand, bindet aber sofort Kapital und belastet die Liquidität. Beim Leasing nutzt er ihn gegen regelmäßige Raten, bleibt aber ohne Eigentümerstellung. Leasing schont die Liquidität und ist planbar, über die Laufzeit aber meist teurer als der Kauf. Schnell veraltende Güter sprechen eher für Leasing, langlebige eher für Kauf.",
  "beispiele": [
    "Fahrzeuge, die nach kurzer Zeit technisch ersetzt werden, können wegen Planbarkeit und Aktualität geleast werden.",
    "Ein langlebiger Gegenstand kann über die Nutzungsdauer gekauft werden, weil keine Leasingmarge anfällt und Eigentum sowie Sicherungswert bleiben."
  ],
  "fallbeispiel": "Ein Betrieb vergleicht Leasing und Kauf. Beim Leasing werden alle Raten und der Restwert betrachtet; beim Kauf Kaufpreis, Finanzierungskosten und erwarteter Restwert. Danach werden Liquidität, Eigentum, Sicherheiten und Nutzungsdauer ergänzt. Die Entscheidung fällt nicht allein wegen der niedrigeren Monatsrate.",
  "typische_fehler": "Leasingrate und Kaufpreis werden direkt verglichen, ohne Laufzeit, Restwert und Finanzierungskosten einzubeziehen. Auch die fehlende Eigentümerstellung beim Leasing wird vergessen.",
  "verstaendnisfragen": [
    "Welche Hauptvorteile hat Leasing? Liquiditätsschonung, Planbarkeit und oft einfacherer Zugang.",
    "Welche Hauptnachteile hat Leasing? Höhere Gesamtkosten und kein Eigentum beziehungsweise kein eigener Sicherungswert."
  ],
  "pruefungsbezug": "Rechne beide Wege vollständig und bewerte anschließend Liquidität, Nutzungsdauer, Sicherheiten und Eigentum.",
  "merksatz": "Leasing schont heute die Liquidität; Kauf kann über die gesamte Nutzungsdauer günstiger sein."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Factoring

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Factoring erklären und seine Funktionen unterscheiden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Factoring",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Beim {{begriff:factoring|Factoring}} verkauft der Betrieb seine Forderungen an einen Dienstleister und bekommt sofort Geld. ==Aus einer Forderung mit 60 Tagen Zahlungsziel wird binnen weniger Tage Liquidität== — abzüglich einer Gebühr."
    },
    {
      "typ": "grafik",
      "variante": "kette",
      "kopf": "Drei Leistungen",
      "titel": "Was Factoring alles übernimmt",
      "lead": "Je nach Vertrag eine, zwei oder alle drei. Klick dich durch.",
      "schritte": [
        {
          "nr": 1,
          "titel": "Finanzierung",
          "satz": "sofort Geld",
          "text": "Der Factor zahlt den Rechnungsbetrag abzüglich Gebühr und eines Sicherheitseinbehalts sofort aus. Das ist die Kernfunktion und der Grund, warum Betriebe Factoring nutzen."
        },
        {
          "nr": 2,
          "titel": "Ausfallschutz",
          "satz": "echtes Factoring",
          "text": "Der Factor übernimmt das Risiko, dass der Kunde nicht zahlt. Beim unechten Factoring bleibt dieses Risiko beim Betrieb — dort ist es wirtschaftlich eher ein Kredit."
        },
        {
          "nr": 3,
          "titel": "Dienstleistung",
          "satz": "Debitorenbuchhaltung",
          "text": "Der Factor übernimmt Überwachung, Mahnwesen und Inkasso. Für kleine Betriebe oft der unterschätzte Nutzen, weil dafür Personal und Systeme entfallen."
        }
      ],
      "regel": "Echtes Factoring heißt: Der Factor trägt den Ausfall. Unechtes Factoring heißt: Der Betrieb trägt ihn weiter. Diese beiden Wörter entscheiden über den ganzen Charakter des Vertrags."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Vorteil",
        "Nachteil"
      ],
      "zeilen": [
        {
          "zellen": [
            "Sofortige Liquidität ohne Kredit",
            "Gebühr schmälert die Marge"
          ]
        },
        {
          "zellen": [
            "Ausfallrisiko kann abgegeben werden",
            "nur bei echtem Factoring"
          ]
        },
        {
          "zellen": [
            "Entlastung der Debitorenbuchhaltung",
            "Kontrolle über Kundenkontakt geht ab"
          ],
          "detail": "**Der weichste, aber wichtigste Punkt:** Wenn ein Dritter die Zahlungserinnerungen schreibt, prägt er den Ton gegenüber deinen Kunden. Bei langjährigen Beziehungen ist das heikel."
        },
        {
          "zellen": [
            "Planbare Zahlungseingänge",
            "nicht jede Forderung wird angekauft"
          ],
          "detail": "**Der Factor prüft die Bonität der Kunden** und lehnt schlechte Risiken ab. Ausgerechnet die Forderungen, die am meisten Sorgen machen, bleiben oft liegen."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Ein Betrieb hat volle Auftragsbücher, aber ständig Liquiditätsprobleme, weil Großkunden erst nach 60 Tagen zahlen. Was passt am besten?",
      "optionen": [
        {
          "text": "Ein langfristiges Darlehen aufnehmen",
          "richtig": false,
          "echo": "Das verstößt gegen die Fristenkongruenz. Der Bedarf entsteht kurzfristig und immer wieder aus dem Umlaufvermögen — dafür ist ein langfristiges Darlehen das falsche Werkzeug."
        },
        {
          "text": "Factoring prüfen, ergänzt um Skonto für schnelle Zahler",
          "richtig": true,
          "echo": "Richtig. Das Problem liegt in den Forderungslaufzeiten, also genau dort, wo Factoring ansetzt: Die Forderungen werden sofort zu Geld, und beim echten Factoring geht zusätzlich das Ausfallrisiko ab. Ergänzend wirkt Skonto, weil es Kunden zu früherer Zahlung bewegt. Beide Wege kosten Marge, weshalb vorher zu rechnen ist, ob die Ersparnis an Zinsen und Mahnaufwand das aufwiegt."
        },
        {
          "text": "Die Zahlungsziele einseitig auf 14 Tage verkürzen",
          "richtig": false,
          "echo": "Bei Großkunden ist das meist nicht durchsetzbar — sie diktieren die Konditionen. Wer es versucht, riskiert den Auftrag statt der Verspätung."
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
    "Factoring verkauft oder überträgt Forderungen an einen Factor.",
    "Finanzierung, Ausfallrisiko und Debitorenarbeit sind getrennte Funktionen."
  ],
  "erklaerung": "Factoring hat drei Funktionen: Finanzierung durch sofortige Auszahlung, Ausfallschutz durch Übernahme des Risikos und Dienstleistung durch Debitorenbuchhaltung, Mahnwesen und Inkasso. Beim echten Factoring übernimmt der Factor das Ausfallrisiko; beim unechten verbleibt es beim Betrieb. Der Factor prüft die Bonität und kauft nicht jede Forderung an.",
  "beispiele": [
    "Aus einer Forderung mit langem Zahlungsziel wird durch den Factor sofort Liquidität, abzüglich Gebühr und Sicherheitseinbehalt.",
    "Beim unechten Factoring muss der Betrieb bei Ausfall zurückzahlen; beim echten trägt der Factor das Risiko."
  ],
  "fallbeispiel": "Ein Betrieb hat offene Forderungen und benötigt Liquidität. Der Factor prüft die Kundenbonität, zahlt den Rechnungsbetrag abzüglich Gebühr und Sicherheitseinbehalt aus und übernimmt je nach Vertrag Mahnwesen und Ausfallrisiko. Erst die Unterscheidung echt oder unecht zeigt, ob der Betrieb bei Nichtzahlung endgültig entlastet ist.",
  "typische_fehler": "Factoring wird nur als Kredit oder nur als Inkasso verstanden. Außerdem wird echtes und unechtes Factoring über die Gebühren statt über das Ausfallrisiko unterschieden.",
  "verstaendnisfragen": [
    "Welche drei Funktionen hat Factoring? Finanzierung, Ausfallschutz und Dienstleistung.",
    "Wer trägt beim unechten Factoring den Ausfall? Der Betrieb."
  ],
  "pruefungsbezug": "Nenne zuerst die drei Funktionen und prüfe dann, wer das Ausfallrisiko trägt. Bonität und Gebühren ergänzen die Entscheidung.",
  "merksatz": "Factoring kann Geld, Risiko und Arbeit abnehmen — echt oder unecht entscheidet über das Risiko."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Die Auswahl begründen

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Eine Finanzierungsform begründet auswählen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `praxistipp-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Die Auswahl begründen",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Keine Finanzierungsform ist grundsätzlich besser. **Die Wahl folgt dem Zweck**, und vier Fragen führen fast immer zur richtigen Antwort."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Frage",
        "Wenn ja",
        "Wenn nein"
      ],
      "zeilen": [
        {
          "zellen": [
            "Ist der Bedarf dauerhaft?",
            "langfristige Finanzierung",
            "Kontokorrent oder Factoring"
          ]
        },
        {
          "zellen": [
            "Veraltet der Gegenstand schnell?",
            "Leasing",
            "Kauf"
          ]
        },
        {
          "zellen": [
            "Sind Sicherheiten vorhanden?",
            "Darlehen möglich",
            "Leasing oder Beteiligung prüfen"
          ],
          "detail": "**Ohne Sicherheiten wird ein Darlehen teuer oder unerreichbar.** Leasing braucht sie nicht in gleichem Maß, weil der Gegenstand dem Leasinggeber gehört."
        },
        {
          "zellen": [
            "Liegt das Problem bei den Forderungen?",
            "Factoring",
            "andere Ursache suchen"
          ]
        }
      ]
    },
    {
      "typ": "praxistipp",
      "text": "Prüfe zuerst, ob überhaupt zusätzliches Geld nötig ist. Oft liegt die Ursache in zu langen Zahlungszielen, zu hohen Lagerbeständen oder einem laschen Mahnwesen. **Diese drei Hebel kosten keine Zinsen** — und wirken schneller als jedes Bankgespräch."
    },
    {
      "typ": "merke",
      "text": "**Der Zweck bestimmt die Form:** dauerhaft langfristig, schnell veraltend Leasing, Forderungsproblem Factoring, Spitzen Kontokorrent.",
      "karteikarte": "Nach welchen vier Fragen wählt man die passende Finanzierungsform aus?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welche Form passt hier?",
      "kategorien": [
        "Leasing",
        "Factoring",
        "Darlehen",
        "Kontokorrent"
      ],
      "aufgaben": [
        {
          "text": "Zehn Firmenwagen, die alle drei Jahre getauscht werden.",
          "loesung": "Leasing"
        },
        {
          "text": "Ein Lagergebäude mit 30 Jahren Nutzungsdauer.",
          "loesung": "Darlehen"
        },
        {
          "text": "Offene Kundenforderungen mit 60 Tagen Zahlungsziel.",
          "loesung": "Factoring"
        },
        {
          "text": "Der eine Monat im Jahr, in dem Steuern und Weihnachtsgeld zusammenfallen.",
          "loesung": "Kontokorrent"
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
    "Finanzierungsentscheidungen verbinden Kosten, Liquidität und Nutzung.",
    "Zahlungsziele, Lager und Mahnwesen können vor einer Finanzierung verbessert werden."
  ],
  "erklaerung": "Vor jeder Finanzierung wird geprüft, ob das Problem in den eigenen Abläufen liegt: Zahlungsziele, Lagerbestand und Mahnwesen können Liquidität beeinflussen. Danach werden Kauf, Leasing oder Factoring nach Kosten, Risiko, Laufzeit und Bedarf verglichen. Die Begründung muss den konkreten Zweck und nicht nur ein einzelnes Vorteilskriterium nennen.",
  "beispiele": [
    "Bei schnell veraltenden Fahrzeugen wird Leasing mit der Nutzungsdauer und der Liquidität begründet, bei langlebigen Gütern Kauf mit Gesamtkosten und Eigentum.",
    "Bei offenen Forderungen wird erst Mahnwesen und Zahlungsziel geprüft, bevor Factoringgebühren akzeptiert werden."
  ],
  "fallbeispiel": "Ein Betrieb braucht acht Transporter. Werden sie nach drei bis vier Jahren getauscht, sprechen Aktualität und planbare Raten für Leasing. Bei acht bis zehn Jahren Nutzung spricht die geringere Gesamtkostenbelastung eher für Kauf. Zusätzlich werden Liquidität, Sicherheiten und Vertragsbedingungen wie Restwert und Rückgabe geprüft.",
  "typische_fehler": "Die Entscheidung wird nur mit der Monatsrate oder dem Ticketpreis begründet. Auch Vertragsdetails wie Restwert, Kilometerbegrenzung oder Nachforderungen werden übersehen.",
  "verstaendnisfragen": [
    "Welche Reihenfolge ist sinnvoll? Erst eigene Abläufe verbessern, dann Finanzierungsalternativen vergleichen.",
    "Welche zwei Nutzungssituationen nennt die Faustregel? Schnell veraltende Güter eher leasen, langlebige eher kaufen."
  ],
  "pruefungsbezug": "Formuliere eine Entscheidung mit Kosten, Liquidität, Nutzungsdauer, Risiko und Vertragsbedingungen; mindestens zwei nicht rein rechnerische Kriterien nennen.",
  "merksatz": "Eine Finanzierungsform ist nur passend, wenn Kosten, Liquidität und Nutzung zusammenpassen."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

## k6 · Investitionen beurteilen

**Datei:** `lf9-k6-investition.kapitel.json` · SHA-256 `4b1ae51fab8e91596990d01b1e22ffae5463e1540fc4dc16d859abd1cc3dd320`

**Konkreter Kapitelauftrag:** Eine Investition aus vergleichbaren Zahlungs-/Kostenannahmen beurteilen; rechnerischen Vorteil und betriebliche Risiken trennen.

**Einordnung:** Drei Rechenwege, drei verschiedene Antworten auf dieselbe Frage.

### b1 · Der Kostenvergleich

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** rechnen (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Einen Kostenvergleich durchführen

**Aufbauauftrag:** Gegebenes und Gesuchtes einschließlich Einheiten und Annahmen nennen; Bezugsgröße herleiten, jeden Rechenschritt erläutern, Ergebnis kontrollieren und betrieblich deuten.

**Passender Gegenfall:** Eine Bezugsgröße oder Kapazitätsannahme ändern; den abweichenden Rechenweg und die Folge ausdrücklich vergleichen.

**Darstellung:** Rechentabelle mit Größe, Rechnung, Ergebnis und Aussage; vorhandene Grafik erklären.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `merke-1`, `achtung-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b1",
  "titel": "Der Kostenvergleich",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der Kostenvergleich beantwortet die einfachste Frage: **Welche Anlage kostet im Jahr weniger?** ==Er taugt nur, wenn beide Anlagen dasselbe leisten== — bei unterschiedlichem Ausstoß muss auf Stückkosten umgerechnet werden."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Kostenart",
        "Berechnung",
        "Anlage A",
        "Anlage B"
      ],
      "zeilen": [
        {
          "zellen": [
            "Abschreibung",
            "(Anschaffung − Restwert) ÷ Nutzungsdauer",
            "16.000",
            "22.000"
          ],
          "mono": [
            2,
            3
          ],
          "detail": "**A: 80.000 € auf 5 Jahre. B: 110.000 € auf 5 Jahre.** Ohne Restwert entspricht die Abschreibung dem Wertverzehr je Jahr."
        },
        {
          "zellen": [
            "Kalkulatorische Zinsen",
            "durchschnittlich gebundenes Kapital × Zinssatz",
            "2.000",
            "2.750"
          ],
          "mono": [
            2,
            3
          ],
          "detail": "**Ohne Restwert ist das durchschnittlich gebundene Kapital die halbe Anschaffung**, weil der Wert gleichmäßig von voll auf null sinkt. Bei 5 % ergibt das für A: 40.000 × 5 % = 2.000 €. Mit Restwert gilt (Anschaffung + Restwert) ÷ 2 — bei 120.000 € und 20.000 € Restwert also 70.000 €."
        },
        {
          "zellen": [
            "Betriebskosten",
            "Energie, Wartung, Personal",
            "34.000",
            "26.000"
          ],
          "mono": [
            2,
            3
          ]
        },
        {
          "zellen": [
            "**Gesamtkosten je Jahr**",
            "",
            "**52.000**",
            "**50.750**"
          ],
          "mono": [
            2,
            3
          ],
          "detail": "**B ist trotz höherem Kaufpreis günstiger**, weil die niedrigeren Betriebskosten den höheren Kapitaleinsatz mehr als ausgleichen. Genau das ist die Aussage des Verfahrens."
        }
      ]
    },
    {
      "typ": "merke",
      "text": "**Kalkulatorische Zinsen rechnen mit dem durchschnittlich gebundenen Kapital** — ohne Restwert ist das der halbe Anschaffungswert, weil das Kapital gleichmäßig auf null sinkt; mit Restwert (Anschaffung + Restwert) ÷ 2. Das ist der meistvergessene Schritt.",
      "karteikarte": "Wie berechnet man die kalkulatorischen Zinsen im Kostenvergleich — ohne und mit Restwert?"
    },
    {
      "typ": "achtung",
      "text": "Der Kostenvergleich kennt **keine Erlöse**. Eine Anlage kann günstiger sein und trotzdem die schlechtere Entscheidung, wenn sie weniger produziert oder schlechtere Qualität liefert. Bei unterschiedlichen Mengen immer auf **Kosten je Stück** umrechnen."
    }
  ]
}
```

**Vorhandene ausführliche Fassung – original, nicht als fertiger Zieltext übernehmen:**

```json
{
  "abschnitt": "b1",
  "vorauswissen": [
    "Investitionen verursachen Anschaffungskosten und laufende Kosten.",
    "Statische Verfahren arbeiten mit Durchschnittswerten."
  ],
  "erklaerung": "Der Kostenvergleich betrachtet Abschreibung, kalkulatorische Zinsen und Betriebskosten. Die kalkulatorischen Zinsen beziehen sich auf das durchschnittlich gebundene Kapital, bei gleichmäßiger Wertminderung ohne Restwert also auf den halben Anschaffungswert. Bleibt am Ende ein Restwert R, beträgt das durchschnittlich gebundene Kapital (Anschaffungswert + R) ÷ 2. Bei unterschiedlichen Mengen werden Kosten je Stück verglichen.",
  "beispiele": [
    "Bei 120.000 € Anschaffung und acht Jahren Nutzungsdauer beträgt die jährliche Abschreibung 120.000 € ÷ 8 = 15.000 €.",
    "Bei gleichmäßigem Wertverzehr wird für die kalkulatorischen Zinsen das durchschnittliche Kapital angesetzt, nicht der volle Anfangswert."
  ],
  "fallbeispiel": "Eine Anlage kostet 120.000 €, läuft acht Jahre, hat keinen Restwert, der kalkulatorische Zinssatz beträgt 5 % und die Betriebskosten betragen 41.000 € jährlich. Abschreibung: 120.000 € ÷ 8 = 15.000 €. Durchschnittlich gebundenes Kapital: 60.000 €. Zinsen: 60.000 € × 5 % = 3.000 €. Gesamtkosten: 15.000 € + 3.000 € + 41.000 € = 59.000 € pro Jahr. Gegenfall mit 20.000 € Restwert: Abschreibung (120.000 € − 20.000 €) ÷ 8 = 12.500 €; durchschnittlich gebundenes Kapital (120.000 € + 20.000 €) ÷ 2 = 70.000 €; Zinsen 3.500 €; Gesamtkosten 12.500 € + 3.500 € + 41.000 € = 57.000 €.",
  "typische_fehler": "Die Abschreibung wird durch den falschen Zeitraum geteilt oder die Zinsen auf den vollen Anschaffungswert gerechnet. Bei verschiedenen Mengen werden Gesamtkosten statt Stückkosten verglichen.",
  "verstaendnisfragen": [
    "Welche drei Bestandteile enthält der Kostenvergleich? Abschreibung, kalkulatorische Zinsen und Betriebskosten.",
    "Worauf werden kalkulatorische Zinsen bei gleichmäßiger Wertminderung gerechnet? Auf das durchschnittlich gebundene Kapital: ohne Restwert die Hälfte der Anschaffung, mit Restwert (Anschaffung + Restwert) ÷ 2."
  ],
  "pruefungsbezug": "Schreibe die drei Kostenbestandteile hin, berechne das durchschnittliche Kapital und teile bei Mengenunterschieden auf Stück um.",
  "merksatz": "Kostenvergleich heißt: Abschreibung plus kalkulatorische Zinsen plus Betriebskosten."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b2 · Gewinn und Amortisation

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Gewinnvergleich und Amortisationsrechnung anwenden

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `grafik-1`, `tabelle-1`, `check-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b2",
  "titel": "Gewinn und Amortisation",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Der **Gewinnvergleich** stellt den Kosten die Erlöse gegenüber und beantwortet damit die Frage, die der Kostenvergleich offenlässt. Die {{begriff:amortisation|Amortisationsrechnung}} fragt etwas ganz anderes: **Wie lange dauert es, bis das Geld wieder drin ist?**"
    },
    {
      "typ": "grafik",
      "variante": "kalkulationsleiter",
      "kopf": "Die Leiter",
      "titel": "Vom Erlös zum Rückfluss",
      "lead": "Ändere die Werte und sieh, wie sich der jährliche Rückfluss verschiebt.",
      "richtungen": [
        "vorwaerts"
      ],
      "start": {
        "id": "erloes",
        "name": "Jahreserlös",
        "wert": 95000
      },
      "stufen": [
        {
          "id": "betrieb",
          "name": "Betriebskosten",
          "art": "zuschlag-absolut",
          "betrag": -34000,
          "ergebnis": "Deckungsbeitrag"
        },
        {
          "id": "zins",
          "name": "Kalkulatorische Zinsen",
          "art": "zuschlag-absolut",
          "betrag": -2000,
          "ergebnis": "Gewinn vor Abschreibung"
        },
        {
          "id": "afa",
          "name": "Abschreibung",
          "art": "zuschlag-absolut",
          "betrag": -16000,
          "ergebnis": "Gewinn",
          "marke": true
        }
      ],
      "regel": "Für die Amortisation zählt der Rückfluss, also Gewinn plus Abschreibung. Die Abschreibung ist Aufwand ohne Auszahlung — das Geld bleibt im Betrieb und steht für die Rückzahlung zur Verfügung."
    },
    {
      "typ": "absatz",
      "text": "**Amortisationsdauer = Anschaffungswert ÷ jährlicher Rückfluss.** Der Rückfluss ist dabei Gewinn **plus** Abschreibung — nicht der Gewinn allein. ==Diesen Zusatz vergisst in Prüfungen fast jeder.=="
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Verfahren",
        "Frage",
        "Entscheidung"
      ],
      "zeilen": [
        {
          "zellen": [
            "Kostenvergleich",
            "Welche kostet weniger?",
            "die mit den geringeren Jahreskosten"
          ]
        },
        {
          "zellen": [
            "Gewinnvergleich",
            "Welche bringt mehr Gewinn?",
            "die mit dem höheren Jahresgewinn"
          ],
          "detail": "**Setzt voraus, dass sich die Erlöse überhaupt zuordnen lassen.** Bei einer Maschine im Produktionsverbund ist das oft nicht möglich — dann bleibt nur der Kostenvergleich."
        },
        {
          "zellen": [
            "Rentabilitätsvergleich",
            "Welche verzinst das Kapital besser?",
            "die mit der höheren Rendite"
          ],
          "detail": "**Gewinn ÷ durchschnittlich gebundenes Kapital × 100.** Wichtig, wenn die Investitionen unterschiedlich viel Geld binden — der absolute Gewinn allein wäre dann irreführend."
        },
        {
          "zellen": [
            "{{begriff:amortisation|Amortisationsrechnung}}",
            "Wie schnell ist es wieder drin?",
            "die mit der kürzeren Dauer"
          ],
          "detail": "**Ein Risikomaß, kein Rentabilitätsmaß.** Je kürzer die Dauer, desto geringer das Risiko einer Fehlinvestition — über die Gesamtrendite sagt sie fast nichts."
        }
      ]
    },
    {
      "typ": "check",
      "frage": "Eine Anlage kostet 90.000 €, bringt 12.000 € Gewinn im Jahr und wird über 6 Jahre abgeschrieben. Wie hoch ist die Amortisationsdauer?",
      "optionen": [
        {
          "text": "7,5 Jahre — 90.000 geteilt durch 12.000",
          "richtig": false,
          "echo": "Hier wurde nur der Gewinn angesetzt. Der Rückfluss umfasst zusätzlich die Abschreibung, weil ihr keine Auszahlung gegenübersteht."
        },
        {
          "text": "3,3 Jahre — Rückfluss ist Gewinn plus Abschreibung",
          "richtig": true,
          "echo": "Richtig. Die jährliche Abschreibung beträgt 90.000 € geteilt durch 6 Jahre, also 15.000 €. Der Rückfluss ist damit 12.000 € Gewinn plus 15.000 € Abschreibung, zusammen 27.000 €. Die Amortisationsdauer beträgt 90.000 € geteilt durch 27.000 €, also rund 3,3 Jahre. Die Abschreibung zählt mit, weil sie den Gewinn mindert, ohne dass Geld abfließt."
        },
        {
          "text": "6 Jahre — so lange wird abgeschrieben",
          "richtig": false,
          "echo": "Die Nutzungsdauer ist eine Vorgabe für die Abschreibung, kein Ergebnis der Rechnung. Die Amortisationsdauer ergibt sich aus dem tatsächlichen Rückfluss."
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
    "Gewinn setzt Erlös und Kosten ins Verhältnis.",
    "Amortisation misst Rückflusszeit, nicht automatisch Rentabilität."
  ],
  "erklaerung": "Der Gewinnvergleich stellt Erlöse und Kosten gegenüber. Der Rentabilitätsvergleich setzt den Gewinn ins Verhältnis zum gebundenen Kapital. Die Amortisationsdauer lautet Anschaffungswert ÷ Rückfluss; der Rückfluss besteht aus Gewinn plus Abschreibung. Gewinn allein würde den Kapitalrückfluss unterschätzen.",
  "beispiele": [
    "Bei 78.000 € Erlös und 59.000 € Kosten beträgt der Jahresgewinn 19.000 €.",
    "Bei 19.000 € Gewinn und 15.000 € Abschreibung beträgt der Rückfluss 34.000 €; bei 120.000 € Anschaffung ergibt das 120.000 € ÷ 34.000 € ≈ 3,5 Jahre."
  ],
  "fallbeispiel": "Für dieselbe Anlage werden Gewinn, Rentabilität und Amortisation berechnet. Gewinn: 78.000 € − 59.000 € = 19.000 €. Rentabilität auf 60.000 € Durchschnittskapital: 19.000 € ÷ 60.000 € ≈ 31,7 %. Rückfluss: 19.000 € + 15.000 € = 34.000 €. Amortisation: 120.000 € ÷ 34.000 € ≈ 3,5 Jahre.",
  "typische_fehler": "Für die Amortisation wird nur der Gewinn verwendet oder die Rentabilität auf den Anschaffungswert statt auf das gebundene Kapital bezogen. Auch Gewinn und Rückfluss werden als identisch behandelt.",
  "verstaendnisfragen": [
    "Wie lautet die Amortisationsformel? Anschaffungswert ÷ Rückfluss.",
    "Was ist der Rückfluss? Gewinn plus Abschreibung."
  ],
  "pruefungsbezug": "Formel zuerst notieren, dann Gewinn, gebundenes Kapital und Rückfluss getrennt berechnen. Rundung nachvollziehbar angeben.",
  "merksatz": "Amortisation rechnet mit dem Rückfluss — und der enthält Gewinn plus Abschreibung."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.

### b3 · Was diese Verfahren nicht können

**Status:** Volltext neu zu redigieren. **Profilvorschlag:** prozess (heuristisch; vor Redaktion bestätigen).

**Lernziel:** Grenzen der statischen Verfahren benennen

**Aufbauauftrag:** Auftrag, Beteiligte, Befugnisse und Abhängigkeiten konkret machen; Ablauf bis zu prüfbarem Ergebnis und Kontrolle durchführen.

**Passender Gegenfall:** Eine Frist, Zuständigkeit oder Eingabe ändern; Anpassung des Ablaufs begründen.

**Darstellung:** Ausgefüllte Vorlage, Ablauf oder Zuständigkeitstabelle statt bloßer Methodenliste.

**Vorhandene Elemente einmal erhalten/gezielt korrigieren:** `tabelle-1`, `vertiefung-1`, `merke-1`, `zuordnen-1`

**Ausgangsmaterial der Kurzfassung – original, fachlich vor Übernahme prüfen:**

```json
{
  "typ": "abschnitt",
  "id": "b3",
  "titel": "Was diese Verfahren nicht können",
  "inhalt": [
    {
      "typ": "absatz",
      "text": "Alle vier Verfahren heißen **statisch**, weil sie mit Durchschnittswerten eines einzelnen Jahres rechnen. ==Sie ignorieren, dass ein Euro heute mehr wert ist als ein Euro in fünf Jahren.== Für den Alltag reicht das oft — man sollte nur wissen, wo die Grenze liegt."
    },
    {
      "typ": "tabelle",
      "spalten": [
        "Schwäche",
        "Was das bedeutet"
      ],
      "zeilen": [
        {
          "zellen": [
            "Zeitpunkt der Zahlungen bleibt unberücksichtigt",
            "späte Rückflüsse werden überbewertet"
          ],
          "detail": "**Dafür gibt es die dynamischen Verfahren** wie die Kapitalwertmethode, die jede Zahlung auf den heutigen Wert abzinst. Sie sind genauer und aufwendiger."
        },
        {
          "zellen": [
            "Nur ein Durchschnittsjahr wird betrachtet",
            "schwankende Erträge fallen unter den Tisch"
          ]
        },
        {
          "zellen": [
            "Zahlen sind Schätzungen",
            "das Ergebnis ist nur so gut wie die Annahme"
          ],
          "detail": "**Der praktisch wichtigste Punkt.** Die Rechnung wirkt exakt, beruht aber auf geschätzten Absatzmengen und Betriebskosten. Deshalb gehört zu jeder Investitionsrechnung eine Überlegung, wie sich das Ergebnis bei ungünstigeren Annahmen verändert."
        },
        {
          "zellen": [
            "Nicht messbares bleibt außen vor",
            "Qualität, Image, Arbeitssicherheit"
          ]
        }
      ]
    },
    {
      "typ": "vertiefung",
      "titel": "Wann sich der Aufwand einer dynamischen Rechnung lohnt",
      "absaetze": [
        "Je länger die Laufzeit und je ungleichmäßiger die Rückflüsse, desto größer der Fehler der statischen Verfahren. Bei einer Investition über zwölf Jahre mit stark schwankenden Erträgen führt die Durchschnittsbetrachtung leicht in die Irre.",
        "Die **Kapitalwertmethode** zinst alle künftigen Ein- und Auszahlungen auf den Zeitpunkt der Investition ab. Ist der Kapitalwert positiv, verzinst sich das eingesetzte Kapital höher als der angesetzte Zinssatz.",
        "Für kurze Laufzeiten und gleichmäßige Rückflüsse liefern die statischen Verfahren praktisch dasselbe Ergebnis bei deutlich weniger Aufwand. Deshalb sind sie im betrieblichen Alltag weit verbreitet — und deshalb stehen sie auch im Rahmenlehrplan."
      ]
    },
    {
      "typ": "merke",
      "text": "**Statische Verfahren rechnen mit einem Durchschnittsjahr und ohne Zinseszins.** Sie sind schnell und ausreichend genau bei kurzen Laufzeiten — bei langen führen sie in die Irre.",
      "karteikarte": "Warum heißen Kostenvergleich, Gewinnvergleich und Amortisationsrechnung statische Verfahren, und wo liegt ihre Grenze?"
    },
    {
      "typ": "zuordnen",
      "lead": "Welches Verfahren beantwortet die Frage?",
      "kategorien": [
        "Kostenvergleich",
        "Gewinnvergleich",
        "Amortisationsrechnung",
        "Rentabilitätsvergleich"
      ],
      "aufgaben": [
        {
          "text": "Nach wie vielen Jahren habe ich mein Geld zurück?",
          "loesung": "Amortisationsrechnung"
        },
        {
          "text": "Welche Maschine verursacht im Jahr weniger Kosten?",
          "loesung": "Kostenvergleich"
        },
        {
          "text": "Welche Investition verzinst das eingesetzte Kapital besser?",
          "loesung": "Rentabilitätsvergleich"
        },
        {
          "text": "Welche Anlage bringt bei gleichen Erlösen mehr Überschuss?",
          "loesung": "Gewinnvergleich"
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
    "Statische Verfahren vereinfachen die Zeit und verwenden Durchschnittswerte.",
    "Eine Rechnung kann nicht alle betrieblichen Entscheidungskriterien abbilden."
  ],
  "erklaerung": "Statische Verfahren berücksichtigen den Zeitwert des Geldes nicht und arbeiten mit einem Durchschnittsjahr. Die Amortisation ist deshalb ein Risikomaß, kein vollständiges Rentabilitätsmaß. Zusätzlich gehören Kapazitätsreserve, Qualität, Abhängigkeit vom Lieferer und Finanzierungssicherheit in die Beurteilung.",
  "beispiele": [
    "Eine kleinere Anlage kann sich schneller amortisieren, obwohl eine größere Anlage den höheren absoluten Gewinn erzielt.",
    "Bei langer Nutzungsdauer wird zusätzlich eine dynamische Rechnung erwogen, weil der Zeitwert des Geldes sonst fehlt."
  ],
  "fallbeispiel": "Anlage A kostet 80.000 € und amortisiert sich in 2,5 Jahren. Anlage B kostet 150.000 €, amortisiert sich in vier Jahren, bringt aber doppelt so viel Gewinn. Die Amortisation allein entscheidet nicht: A ist schneller und risikoärmer, B kann bei langer Nutzung den höheren Gewinn bringen. Deshalb werden Nutzungsdauer, Absatzprognose, Finanzierung und nicht messbare Kriterien ergänzt.",
  "typische_fehler": "Die kürzeste Amortisationsdauer wird automatisch als beste Investition gewählt. Ebenso wird ein Rechenergebnis als vollständig angesehen, ohne Grenzen der statischen Methode zu nennen.",
  "verstaendnisfragen": [
    "Was berücksichtigen statische Verfahren nicht? Den Zeitwert des Geldes.",
    "Warum ist Amortisation kein Rentabilitätsmaß? Sie misst nur die Rückflussdauer und nicht den Gewinn im Verhältnis zum Kapital."
  ],
  "pruefungsbezug": "Nenne nach jedem statischen Ergebnis mindestens die Methodegrenze und zwei qualitative Entscheidungskriterien.",
  "merksatz": "Zahlen ordnen die Investition; sie ersetzen nicht die Beurteilung von Risiko, Qualität und Zukunft."
}
```

**Konkrete Redaktionsentscheidung vor Einbau:**

- Jede wesentliche Aussage aus den beiden Auszügen zuordnen: Haupttext, optionales Detail, gemeinsames Basiselement oder belegte Berichtigung.
- Vorhandenen Musterfall vollständig lösen und kommentieren. Reicht der Fall nicht zum Abschnittslernziel, den Kapitelauftrag oben auf dieses Lernziel zuschneiden.
- Die zentrale Warum-Frage anhand des vorhandenen Hintergrundwissens entwickeln; fehlt eine tragfähige Begründung, gezielt fachlich recherchieren.
- Vorhandene Verständnisfragen als Frage und begründete verborgene Antwort trennen; keine sichere automatische Trennung an Satzzeichen.
- Mindestens eine erkennbare zusätzliche Verständnishilfe gegenüber der Kurzfassung belegen; Pflichtinhalte nicht in optionalen Details verstecken.
- Quellen/Jahreswerte prüfen, neue Verweise berufsrichtig auflösen und die tatsächlichen Testbelege in der Arbeitsliste vermerken.
