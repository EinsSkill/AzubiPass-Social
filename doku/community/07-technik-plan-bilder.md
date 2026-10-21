# 07 · Technikplan Bilder im Feed

> Stand: 21.10.2026, **Fassung 2** nach [Review adfe785](review/2026-10-21-chatgpt-review-adfe785.md) (B01–B03) · Autor: Claude
> Grundlage: [07-feed-bilder.md](07-feed-bilder.md) (ChatGPT), Auftrag Lukes 20.10.2026, Freigabe Lukes 21.10.2026 (Chat, 11:59)

## 1 · Vorgaben

Lukes hat am 21.10.2026 mit ChatGPTs Empfehlung „fünf Bilder, maximal 5 MiB nach automatischer Verkleinerung
und optionale Bildbeschreibung“ seine Freigabe gegeben. Claude versteht das als Bestätigung dieser Vorgaben
(Dokumentation in `entscheidungen.md` bleibt ChatGPT/Lukes vorbehalten).

- Frage und Tipp: 0–5 Bilder. Lernzettel: 1–5 Bilder **oder** genau ein PDF. Gruppenbeiträge und Antworten: keine Anhänge (unverändert).
- JPG, PNG, WebP; je Bild höchstens 5 MiB (5.242.880 Bytes), zusammen höchstens 25 MiB.
- Optionale Bildbeschreibung je Bild, höchstens 200 Zeichen, dient als Alternativtext.
- Das erste Bild ist das Feedbild; die Reihenfolge ist vor dem Senden änderbar.
- **Automatische Verkleinerung** (Fassung 2): Jedes gewählte Bild wird im Browser dekodiert (nicht lesbar ⇒
  gleich abgelehnt). Bis 5 MiB bleibt es unverändert. Größere Bilder werden als JPEG neu kodiert, zuerst nur
  mit leichter Kompression bei langer Kante bis 3200 px, erst danach kleiner (2560/2048/1600 px). Hinweis am
  Bild: „Automatisch verkleinert (vorher … MB). Prüfe in der Vorschau, ob Schrift noch lesbar ist.“ HEIC wird
  umgewandelt, wenn der Browser es lesen kann. Der Server prüft unverändert 5 MiB je Datei.

## 2 · Datenmodell

| Element | Entscheidung |
|---|---|
| **`public.anhang`** (neu) | `beitrag_id` → `beitrag` (cascade), `position` 1–5, `pfad` (unique), `art` bild/pdf, `groesse` 1–5 MiB, `beschreibung` ≤ 200; PK (`beitrag_id`, `position`) |
| Verbindliche Quelle | **`anhang`**. `beitrag.datei_pfad/datei_art` bleiben nur als **Spiegel von Anhang 1** für ältere App-Versionen. Ein Trigger (`beitrag_anhang_aus_spiegel`, nach jedem Insert mit Datei) legt Anhang 1 an – damit schreibt auch der unveränderte alte Ein-Datei-RPC vollständig. Der neue RPC ergänzt alle Anhänge in derselben Transaktion. Keine Rechte, `anhang` oder die Spiegelspalten direkt zu schreiben. Invariante im Test: Spiegel = Anhang 1 (0 Abweichungen). |
| Altbestand | Jeder Beitrag mit `datei_pfad` bekommt seine Datei als Anhang 1. Speicherobjekte werden weiterverwendet, nichts neu hochgeladen. |
| Lesen | RLS `anhang`: lesbar genau dann, wenn der Beitrag für die fragende Person sichtbar ist (Regeln von `beitrag`: Profil, Paket, Gruppe, ausgeblendet nur Autor:in/Team). `beitrag_liste` bekommt die Spalte `anhaenge` (geordnete JSON-Liste). |
| Speicher | Lesen fremder Dateien, wenn ein sichtbarer Beitrag sie als **Anhang oder im Spiegel** führt. Der Spiegel ist immer Anhang 1; die Umstellung kann so nichts unlesbar machen, was vorher lesbar war. Privater Bucket, angemeldeter Abruf, keine signierten oder öffentlichen Links – unverändert. |
| Dateikennung | `‹konto›/‹vorgang›-‹n›.‹endung›` (n = Position 1–5). Die Vorgangskennung ist zugleich die Beitrags-ID. Geänderte Auswahl ⇒ alter Vorgang wird geklärt, neue Kennung (bestehender G03-Ablauf). |

## 3 · Veröffentlichen

`beitrag_mit_anhaengen(p_vorgang, p_art, p_titel, p_text, p_lernfeld, p_kapitel, p_an_mentoren, p_anhaenge jsonb)`:

1. Profil, Paket, Vorgangskennung wie `beitrag_veroeffentlichen` (Wiederholung ⇒ derselbe Beitrag, Anhänge unverändert; verworfen ⇒ abgelehnt).
2. `anhaenge_pruefen` (intern, keine Kontorechte): **alle Speicherobjekte nach Name sortiert `FOR SHARE` sperren** (G06, feste Reihenfolge), Pfad muss zum Konto **und** zum Vorgang passen; danach Art und Größe **aus `storage.objects`** (nicht vom Client), Format, ≤ 5 Bilder, ≤ 25 MiB, PDF nur einzeln bei Lernzetteln, Lernzettel nicht ohne Anhang.
3. Beitrag und alle Anhänge in **einer** Transaktion. Fehlt eine Datei (z. B. drittes Bild nicht hochgeladen), entsteht nichts – auch kein verbrauchter Vorgang.

Alter Weg `beitrag_veroeffentlichen` (eine Datei, alte App-Versionen): bleibt unverändert; Anhang 1 entsteht über den Trigger.

Client (`community.js`): Bilder nacheinander hochladen, nach jedem Upload Kontobindung prüfen, dann RPC. Upload-Fehler vor der RPC ⇒ sicher nicht veröffentlicht („Die Bilder konnten nicht vollständig hochgeladen werden. Deine Auswahl ist noch da.“). RPC-Ausgang unklar ⇒ bestehende G03-Klärung. Bei „verworfen“ werden alle Dateien des Vorgangs einzeln entfernt (alles im eigenen Ordner, was mit der Vorgangskennung beginnt). **B02:** Endstatus und Bereinigung sind getrennt. Maßgeblich ist, was der Speicher danach noch auflistet (Fehlerobjekt, abgelehnter Aufruf und still nicht gelöschtes Objekt zählen gleich). Bleibt etwas liegen, merkt sich das Gerät die Vorgangskennung je Konto (`azubipass-reste`), Beiträge-Übersicht und Schreibformular zeigen „Von einem abgebrochenen Versuch liegen noch hochgeladene Dateien …“ mit **„Jetzt entfernen“**. Referenzierte Dateien schützt weiter die Löschregel (`datei_in_gebrauch`).

## 4 · Löschen und G06

- `datei_in_gebrauch`: Objekt sperren (`FOR UPDATE`), dann Verwendung in `anhang` **oder** im Spiegel prüfen. Die Löschregel des Speichers nutzt das weiterhin.
- Beitrag löschen: Anhänge fallen per cascade, danach entfernt der Client jede Datei einzeln; was nicht gelöscht werden konnte, kommt als `dateiPfade` zurück (wiederholbar).
- Sammellöschung mehrerer Dateien in einem Aufruf vermeidet der Client bewusst. Täte es ein anderer Client, könnte die Datenbank eine Verklemmung erkennen und einen der beiden Aufrufe zurückrollen (40P01, sicher abgelehnt) – G06 bliebe auch dann erhalten.

## 5 · Oberfläche

- Schreiben: „Bilder hinzufügen (optional)“ bzw. bei Lernzetteln „Bilder“ / „PDF“; Mehrfachauswahl ergänzt, Abbrechen ändert nichts; Vorschau mit Nummer, Name, Größe, Beschreibung, „Entfernen“/„Nach vorn“/„Nach hinten“ (44 px); Gründe je abgelehnter Datei; PDF- bzw. Bildverlust beim Wechsel nur nach Rückfrage; Fortschritt „Bild 2 von 4 wird hochgeladen …“; alles gesperrt während des Sendens.
- Feed: erstes Bild in reserviertem Rahmen, „1 / n“, Abruf erst nahe am sichtbaren Bereich, höchstens zwei Abrufe gleichzeitig, begrenzter Bestand an Objektadressen (24, ferne zuerst frei); PDF als Hinweis „PDF-Lernzettel“.
- Detail: Bild 1 sofort, weitere bei Auswahl (nummeriert, Vorheriges/Nächstes); große Ansicht als Dialog mit „Schließen“, Escape, Fokus zurück; Bildfehler nur im Bildbereich mit „Erneut versuchen“.
- **B03:** Auch ein gelungener Download, den der Browser nicht darstellen kann (Bild-`error`), führt in Feed, Galerie und großer Ansicht zu „Das Bild konnte nicht geladen werden.“ + „Erneut versuchen“; die Objektadresse wird freigegeben, der nächste Versuch ruft neu ab.
- Moderation und eigene ausgeblendete Inhalte: „Datei prüfen“ lädt alle Anhänge (vorher eine Datei), nicht automatisch.
- Kontowechsel: Entwurf samt Vorschauen verworfen und freigegeben; laufende Uploads setzen nicht fort; späte Downloads werden freigegeben.

## 6 · Kompatibilität und Einspielen (Fassung 2, B01)

**Live eingespielt am 21.10.2026 (Versionen wie unten).** **Reihenfolge – Schreibweg zuerst, Leseregel zuletzt** (je < 5 KB; nur `create`, `create or replace`, `create trigger`,
`alter policy`, `insert … on conflict do nothing`; kein `DROP`, kein `DELETE`):

| Schritt | Datei | Wirkung |
|---|---|---|
| 1 | `20261021112229_anhang_1` | Tabelle + RLS, **Trigger Anhang 1 aus Spiegel**, Altbestand übernehmen. `create trigger` wartet auf laufende Schreibtransaktionen; ab dann bekommt jeder Insert mit Datei Anhang 1. |
| 2 | `…112241_anhang_2` | `beitrag_liste.anhaenge`, `datei_in_gebrauch` (Anhang oder Spiegel) |
| 3 | `…112301_anhang_3` | `anhaenge_pruefen` (intern) |
| 4 | `…112317_anhang_4` | `beitrag_mit_anhaengen` |
| 5 | `…112322_anhang_5` | Nachzügler übernehmen, **dann** Speicher-Leseregel (Anhang oder Spiegel) |

Abnahme (`konkurrenz.py migration`, zwei echte Verbindungen): alter Aufruf über Schritt 1 offen (Schritt 1 wartet), alte
Veröffentlichung vor und nach jedem Schritt ⇒ alle haben Anhang 1, Spiegelinvariante 0, Ben liest jede Datei. Gegenprobe
mit der Fassung `adfe785`: 3 von 6 ohne Anhang, Ben liest 3 Dateien nicht (B01 reproduziert).

| Stand | Verhalten |
|---|---|
| Datenbank neu, App alt (jetziges `main`) | funktioniert: alter RPC unverändert, Trigger schreibt Anhang 1, Leseregel liest auch den Spiegel, alte App zeigt das erste Bild |
| App neu, Datenbank alt | Veröffentlichen mit Bildern scheitert (RPC fehlt) ⇒ **erst Datenbank einspielen, dann mergen** |

## 7 · Bekannte Grenzen

- Das Format prüft der Server über den beim Hochladen gemeldeten Typ (wie bisher die Bucket-Regel); den Dateiinhalt selbst prüft niemand.
- Ältere App-Versionen zeigen bei Mehrbild-Beiträgen nur das erste Bild.
- Die Verkleinerung braucht einen Browser, der das Bild dekodieren kann; was er nicht lesen kann, wird abgelehnt.
- Reste eines abgebrochenen Versuchs merkt sich nur das Gerät, auf dem er lief.
