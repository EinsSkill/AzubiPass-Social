# Technischer Anschluss und Migration

## Bestehenden Einbau nutzen

Format 2 aus `quellen/vertiefung.py` weiterverwenden. Hauptblöcke: `zwischentitel`, `absatz`, `tabelle`, `liste`, `basis`, `verweis`. Details: `absatz`, `tabelle`, `liste`, `verweis`. Jeder neue Inhaltsblock, jede Zwischenüberschrift sowie jedes Detail und jede Frage benötigt eine eigene gültige, im Kapitel eindeutige `id`. Quellen und Fragen nach dem tatsächlich dokumentierten Format. Kein paralleler Renderer und keine Rückkehr zum alten Schemaentwurf.

`basis`-Referenzen sind lokal zum Originalabschnitt: beispielsweise `grafik-1` oder `tabelle-2`. Nummeriert wird nach Typ in der bisherigen Reihenfolge. Die Dossiers listen die tatsächlichen Schlüssel. Ein Originalelement genau einmal platzieren und beim Schließen an die ursprüngliche Stelle zurückgeben. Neue Texteinschübe dürfen bestehende Aufgabenkennungen nicht verschieben. Falls neue Aufgaben oder Basisblöcke nötig werden, Stabilität der bisher positionsabhängigen Kennungen zuerst klären.

## E01 · ausdrückliche ungültige Darstellung ablehnen

Vollständiger Befund: `doku/audit/review-2026-10-28-erweiterter-modus-chatgpt.md`. Tippfehler `vollfasung` darf nicht als Legacy durchrutschen. Vor dem Filtern die vorhandenen Format-/Darstellungskennzeichen validieren. Echtes Legacy ohne neues Kennzeichen bleibt während der Migration erlaubt. Negative Fälle mit Datei und Abschnitt; gültige gemischte Kapitel weiter akzeptieren. Kein künstlicher Dummyabsatz als Formatmarker.

## E02 · reproduzierbare Detail-Links

Explizite `ansicht`-/`detail`-Parameter erhalten beziehungsweise beim bewussten Ansichtswechsel konsistent aktualisieren. Normaler Aufruf ohne diese Parameter bleibt nach Reload kompakt. Kopieren oder Neuladen eines Detail-Links öffnet dasselbe Ziel. Unbekannte Detailkennung harmlos behandeln; andere Suchparameter nicht pauschal entfernen. Das bisherige gegenteilige Testergebnis ist anzupassen, nicht als Erfüllung stabiler Links auszugeben.

## M01 · vorhandene Abschnitte ohne Absatz

Bei der Gesamtinventur fällt auf: Zahlreiche Abschnitte enthalten Tabellen, Grafiken, Warnungen oder Aufgaben, aber keinen Block vom Typ `absatz`. Die vollständige Liste steht in `migrationshindernisse.json`. Der derzeitige Validator lehnt bei genau diesen Abschnitten jede Vollfassung ab: „die Kurzfassung hat keinen Absatz, den die Vollfassung ersetzen könnte“.

**Produktvorgabe:** Auch diese Abschnitte brauchen einen erklärenden erweiterten Modus. Der kompakte Tabellen-/Grafikinhalt bleibt als Einstieg sinnvoll. Die Vollfassung fügt die erforderliche zusammenhängende Erklärung hinzu und platziert die vorhandenen Elemente einmal. Es muss nichts verschwinden, nur weil kein Grundabsatz vorhanden ist.

**Umsetzungsspielraum:** Die Annahme „mindestens ein Absatz“ gezielt auflösen und die Render-/Verschiebelogik am tatsächlichen DOM prüfen. Das bestehende Format kann genügen; keine neue Formatnummer nur für diesen Fall nötig. Leere Absätze, versteckte Platzhalter und inhaltslose Texte sind keine Lösung. Nicht die Kurzfassung pauschal mit Zusatztexten aufblähen, um den Validator zu umgehen.

**Abnahme:** Je ein echtes tabellenbasiertes und grafik-/aufgabenbasiertes Beispiel aus der Hindernisliste redigieren; geöffnet vollständige Erklärung plus jedes Originalelement einmal, geschlossen ursprünglicher kompakter Aufbau. Geänderte Eingaben/Antworten bleiben über mehrfaches Umschalten erhalten. Keine doppelten IDs, alle Suchziele sichtbar erreichbar. Validierung eines wirklich leeren oder strukturell ungültigen Volltextes weiter streng.

## M02 · Erhaltung wirklich nachweisen

Die Inventur weist alle Originalblöcke einschließlich Hash und lokalem Basisschlüssel aus. Diese Hashes sind Ausgangsbelege, keine Vorgabe, fachlich falsche Inhalte unverändert zu lassen. Bei redaktioneller Korrektur Original und Ziel mit Änderungsgrund zuordnen. Vorhandene Grafik-/Check-/Karteninstanz im DOM genau einmal; kein zweiter Lernstand. Fachkorrekturen können eine gezielte Inhaltsänderung erfordern, aber Ansichtswechsel allein darf keine Antwort zurücksetzen.

Abschnitts-IDs, Kapitel-IDs und bisherige Fragmentlinks beibehalten. Neue Abschnitte erhalten neue stabile IDs und eigene Lernziele; alte IDs nicht wiederverwenden. Berufstrennung auch in Suchindex, Links und Sitzungszuständen prüfen.

## M03 · große Inhalte und Offline

Nach der Gesamtredaktion entstehen deutlich größere Lernfeldseiten. Auf mindestens dem größten fertigen Lernfeld Mobilstart, Umschalten, Suche und Speicher-/Cacheumfang messen; reale Werte berichten. Nicht alle Details auf einmal als sichtbaren Text rendern. Keine zusätzliche Netzabfrage für das Öffnen benötigen.

Echte Offlineprobe: normale App mit aktivem Service Worker laden, vollständigen Cacheaufbau abwarten, Netzwerk abschalten, App neu öffnen, ein zuvor gecachtes anderes Kapitel samt Volltext/Detail/Suchtreffer aufrufen. Ein Test mit blockierten Service Workern und ohne Requests beim Aufklappen belegt nur „kein Nachladen beim Öffnen“.

Bei Regenerierung Quelltext, HTML, Index und Cacheversion konsistent halten. Kein Live-Deployment zur Prüfung erforderlich; Offlineabnahme kann auf lokalem geeignetem Ursprung erfolgen. Druckausgabe auf Doppeltext prüfen, bestehendes Verhalten nicht still verändern.

## Aufwand abgrenzen

Keine Cloudspeicherung für Offen-/Geschlossenzustände, keine neue Datenbank, kein automatischer KI-Dienst und keine neue Fortschrittsmetrik. Hauptarbeit ist die Redaktion; Renderer nur an konkreten Hindernissen erweitern. Die Hinterlegung aller Details in einem festen Acht-Felder-Raster ist nicht das Ziel.
