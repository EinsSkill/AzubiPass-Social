# Bilder im Feed (Spec 07) · Claude, 21.10.2026

**Auftrag:** [07-feed-bilder.md](../07-feed-bilder.md) (ChatGPT, `beda3dc`), Auftrag Lukes vom 20.10.2026.
**Vorheriger Beitrag:** ChatGPT, Spec 07 und Übergabe `beda3dc`. **Rolle:** Umsetzung.
**Rückgabe an:** ChatGPT (gezieltes Review der Bildabläufe), danach Lukes (Freigabe Einspielen).
**Anwendungsstand:** `adfe785` (Code, Migrationen, Tests); dieser Commit: Bericht und Logs.
**`main`:** unverändert. **Live-Datenbank:** unverändert (53 Migrationen). **Paket:** zu.
**Nicht getan:** Migrationen eingespielt, Merge, Paketöffnung.

Technik und Migrationsplan: **[07-technik-plan-bilder.md](../07-technik-plan-bilder.md)** (Datenmodell, verbindliche
Quelle, G06, Kompatibilität, Einspielreihenfolge). Rohprotokolle: [2026-10-21-claude-bilder/](2026-10-21-claude-bilder/).

## 1 · Arbeitsannahmen (offen, von Lukes nicht einzeln bestätigt)

Bis zu 5 Bilder bei Frage, Tipp und Lernzettel (Lernzettel alternativ genau ein PDF); JPG/PNG/WebP; je Bild
höchstens 5 MiB, zusammen 25 MiB; optionale Bildbeschreibung (≤ 200 Zeichen) als Alternativtext; erstes Bild =
Feedbild. Gruppenbeiträge und Antworten ohne Anhänge.

## 2 · Was umgesetzt ist

| Bereich | Inhalt |
|---|---|
| Datenbank (4 Migrationen, < 5 KB, ohne DROP/DELETE) | `anhang` als verbindliche Zuordnung (RLS wie Beitrag), Altbestand übernommen, `beitrag_liste.anhaenge`, Speicher-Leseregel über Anhänge, `datei_in_gebrauch` über Anhänge; `beitrag_mit_anhaengen` + interne Prüfung `anhaenge_pruefen` (Sperre aller Objekte nach Name, Grenzen aus `storage.objects`); alter Ein-Datei-RPC schreibt Anhang 1 |
| Datenschicht | Upload nacheinander mit Kontoprüfung nach jedem Bild; Upload-Fehler = sicher nicht veröffentlicht; Klärung „verworfen“ entfernt alle Dateien des Vorgangs einzeln; Löschen entfernt alle Anhänge; `anhaenge()` für Moderation |
| Schreiben | Mehrfachauswahl ergänzt, Vorschau (Nummer, Name, Größe), Beschreibung, Entfernen/Nach vorn/Nach hinten, Gründe je Datei, Lernzettel Bilder/PDF, Rückfrage vor PDF-/Bildverlust, Fortschritt „Bild 2 von 4 …“, Sperre beim Senden |
| Feed / Detail | Feedbild im reservierten Rahmen, „1 / n“, Lazy-Abruf, max. 2 parallel, max. 24 Objektadressen; Galerie mit Nummern und Vorheriges/Nächstes; große Ansicht (Dialog, Escape, Fokus zurück); Bildfehler nur im Bildbereich |
| Moderation | „Datei prüfen“ lädt alle Anhänge, nie automatisch; gilt auch für eigene ausgeblendete Beiträge |

## 3 · Prüfungen

**Keine echte Konto-, Storage- oder Live-DB-Probe** (Migrationen nicht eingespielt, kein Testpasswort).

| Art | Prüfung | Ergebnis |
|---|---|---|
| lokal-sql | `anhang_test.sql` (neu): 0/1/5 Bilder, Reihenfolge, Spiegel, Wiederholung, 6 Bilder, 5 MiB + 1 Byte, Format, PDF an Frage, PDF + Bild, Lernzettel ohne Anhang, fremder Pfad, anderer Vorgang, Teilupload (kein Beitrag, kein Vorgang), alter RPC, G06 einzeln, direktes Schreiben, Lesen (andere Testerin / Paket zu / ausgeblendet / Autor / Team), Löschen, Invariante | ohne FEHLER ([Log](2026-10-21-claude-bilder/sql-anhang_test.log)) |
| lokal-sql | Altbestand: Stand vor den Migrationen mit Bild- und PDF-Lernzettel, dann einspielen | beide als Anhang 1, Invariante 0 ([Log](2026-10-21-claude-bilder/altbestand-uebernahme.log)) |
| lokal-sql | `konkurrenz.py` alle Fälle inkl. **bilder** (zwei echte Verbindungen): Veröffentlichen zuerst → Löschen von Bild 2 wartet, 0 gelöscht; Löschen von Bild 3 zuerst → Veröffentlichen wartet, abgelehnt, kein halber Beitrag; gleiche Kennung parallel → ein Beitrag | **65/65** ([Log](2026-10-21-claude-bilder/konkurrenz.log)) |
| lokal-sql | übrige sechs SQL-Suiten | ohne FEHLER |
| mock | `community_bilder_test.py` (neu) | **58/58**, axe ohne Verstöße in 7 Zuständen ([Log](2026-10-21-claude-bilder/community_bilder_test.log)) |
| mock | Gruppen / Lernstand / Korrekturen / Moderation | **47/47**, **90/90**, **97/97**, **128/128** |
| lokal | `funktionstest.py` / `lernkern_audit_test.py` / `pruefe.py --schnell` | **269/269** / in Ordnung / keine Fehler |

Abnahme-Tabelle der Spec §7, Abdeckung: alle Zeilen mock bzw. lokal-sql belegt. **Offen bis zum Einspielen:**
echter Upload über die Storage-API (Größenprüfung durch den Bucket, `metadata.size/mimetype`), Abläufe mit
echten Konten, alter PWA-Client gegen die neue Datenbank (nur lokal per SQL: alter RPC).

`community_korrekturen_test.py` nutzt jetzt den neuen RPC-Namen und die Pfade `…-1.png`. `community_schreiben_test.py`
(Livetest, braucht Testpasswort) ist im Dateiteil noch auf die alte Oberfläche ausgerichtet und muss vor dem
nächsten Livelauf angepasst werden.

## 4 · Für Lukes

1. **Arbeitsannahmen bestätigen oder ändern** (5 Bilder, 5 MiB, Bildbeschreibung).
2. **Einspielen freigeben**: die vier Migrationen sind mit der jetzigen Live-App verträglich und müssen **vor** dem Merge
   eingespielt werden.
3. Hinweis: Handyfotos sind oft größer als 5 MiB und werden dann abgelehnt. Eine automatische Verkleinerung im
   Browser wäre ein kleines Folgepaket.
4. Datenschutzabschnitt zu Beiträgen/Bildern muss vor der Paketöffnung ergänzt werden (bereits offener Punkt).
