# Erweiterter Modus · Umsetzungsbericht (Piloten A–C)

**Datum:** 28.10.2026 · **Umsetzung:** Claude · **Grundlage:** ChatGPT-Spec
„AzubiPass · Erweiterter Modus · Umsetzungsgrundlage“ (`CLAUDE_UEBERGABE.md`,
von Lukes übergeben) · **Basis:** `main` @ `d0cfb8a` · **Branch:**
`erweiterter-modus-2026-10-28` · **Status:** nicht gemergt, nicht live.

## Ergebnis

Modell 3 ist umgesetzt: Jeder Abschnitt hat einen eigenen Einstieg
„Ausführlicher verstehen“, das Kapitel hat „Ganzes Kapitel ausführlich lesen“.
Beide Wege zeigen denselben Inhalt. Neues Quellformat 2 („Vollfassung“) ersetzt
beim Öffnen die erklärenden Absätze der Kurzfassung; interaktive Blöcke werden
in die Vollfassung **verschoben** (nicht kopiert) und behalten Kennung und
Lernstand. Optionale Details in vier Kategorien, Verständnisfragen mit
verborgenen Antworten, Suchtreffer mit Deep Link, Zustand nur in der Sitzung.
Keine Datenbankänderung, kein KI-Chat, kein Abo, kein neuer Lernstandswert.

Piloten:

| | Kapitel · Abschnitt | Inhalt |
|---|---|---|
| A | LF4 K3 b1 Angebotsvergleich | Bezugskalkulation 1.000 → 900 → 882 → 922 €, B 930 €; Details Grundwert, ohne Skonto (940 €), skontierbare Beträge, Liquidität |
| B | LF3 K2 b2 Antrag und Annahme | §§ 145/147/148/150 BGB, drei Antworten im Vergleich; Details Anfrage, Frist, Schweigen, Auftragserfassung |
| C | LF2 K2 b2 Eisenhower | Fallzuordnung mit nächster Handlung; Details Folgefrist, Drucker, Überlast, ALPEN, Pareto |

## Geänderte Dateien

- `quellen/vertiefung.py` (neu): Vertragsprüfung, Renderer, Suchtexte.
- `quellen/build.py`: Abschnitts- und Kapitelschalter, Basisblock-Hüllen, Kurztext-Markierung; Alteinträge erhalten je Abschnitt einen eigenen Schalter.
- `quellen/build_app.py`: 22 neue Sucheinträge (Haupttext, Details, Fragen — ohne Antworten).
- `quellen/azubipass.js`: Abschnitts-/Kapitelzustand, Fokusführung, Deep Links (`?ansicht=ausfuehrlich&detail=…`); fehlende Beschriftungen an vier Grafik-Eingaben ergänzt (vorher axe-Verstöße).
- `quellen/azubipass.css`: Vollfassung, Details, Fragen, Mobil, reduzierte Bewegung.
- `quellen/gemeinsam.json`: § 148 und § 150 BGB (Wortlaut gesetze-im-internet.de).
- Drei Pilotkapitel, `quellen/erweiterter_modus_test.py` (neu), `doku/kapitel-format.md` (Vertrag und Migration), neu gebautes `docs/`.

## Abweichungen und Entscheidungen

- Begleitdateien der Spec (`abschnittsvertrag.entwurf.json`, `redaktionsplan-160-kapitel.csv`, `abnahme.json`, Branch `spec/erweiterter-modus-2026-10-27`) liegen nicht im Repository. Umgesetzt wurde allein nach `CLAUDE_UEBERGABE.md`.
- Blockarten `rechenweg` und `fallvergleich` sind als `tabelle` (mit `fazit`) abgebildet — gleiche Darstellung, kein zweiter Tabellentyp.
- Pilot C: Der Pareto-Absatz der Kurzfassung wäre durch die Vollfassung ersetzt worden; er bleibt als Detail „Grundlagen: Pareto“ erhalten.
- LF4 K3: Die bisherige automatische Einleitung entfällt, weil b1 jetzt eine Vollfassung ist und deren Ziel diese Rolle übernimmt.
- Pilot A: Die vorhandene Kalkulationsleiter rechnet mit anderen Beispielwerten (1.050 € / 45 €); ein Satz in der Vollfassung weist darauf hin.
- Alteinträge („Mehr Erklärung“) sind weiterhin nicht im Suchindex.
- Ohne JavaScript bleibt die Kurzfassung sichtbar; Kapitel benötigen ohnehin JS.

## Testbelege

- `erweiterter_modus_test.py`: statisch, Vertrag (A24: sieben Fehlerfälle brechen mit Datei/Abschnitt ab) und Browser A01–A23, A25–A26; Kennungen von Checks/Karten/Optionen gegen `d0cfb8a` unverändert, keine doppelten DOM-IDs, axe-core 4.10.2 auf allen drei Piloten ohne Verstoß — **alles in Ordnung**.
- `funktionstest.py` 269/269 · `lernkern_audit_test.py` OK · `industriekaufleute_test.py` 8.271/0 · `lernstand_sync`, `community_korrekturen`, `moderation`, `gruppen`, `bilder`, `community_passwort` bestanden · `pruefe.py --schnell` lf1–lf4: keine Fehler.
- Sichtprüfung Desktop und Handy (390 px). Nachgebessert: Betragsspalte und Rechenschritte in der Pilot-A-Tabelle brechen nicht mehr um.

## Grenzen

- Nur drei Abschnitte haben eine Vollfassung; alle übrigen zeigen weiter den Alt-Zusatz.
- Fachliche Pilottexte sind von Claude geprüft, aber noch nicht gegengelesen (ChatGPT/Lukes).
- Breite Tabellen scrollen auf dem Handy waagerecht (bestehendes Verhalten, mit Schatten-Hinweis).

## Nächster Schritt

1. Lukes/ChatGPT prüfen die Piloten (lf4.html#k3, lf3.html#k2, lf2.html#k2 auf dem Branch).
2. Lukes entscheidet über den Merge.
3. Danach redaktionelle Chargen nach demselben Vertrag.
