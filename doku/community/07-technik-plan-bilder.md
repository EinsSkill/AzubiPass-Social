# 07 · Technikplan Bilder im Feed

> Stand: 21.10.2026 · Autor: Claude · Grundlage: [07-feed-bilder.md](07-feed-bilder.md) (ChatGPT), Auftrag Lukes 20.10.2026
> Status: **lokal umgesetzt und getestet, nicht live eingespielt.** Einspielen erst nach Lukes' Freigabe dieses Plans.

## 1 · Arbeitsannahmen (aus der Spec übernommen, nicht von Lukes einzeln bestätigt)

- Frage und Tipp: 0–5 Bilder. Lernzettel: 1–5 Bilder **oder** genau ein PDF. Gruppenbeiträge und Antworten: keine Anhänge (unverändert).
- JPG, PNG, WebP; je Bild höchstens 5 MiB (5.242.880 Bytes), zusammen höchstens 25 MiB.
- Optionale Bildbeschreibung je Bild, höchstens 200 Zeichen, dient als Alternativtext.
- Das erste Bild ist das Feedbild; die Reihenfolge ist vor dem Senden änderbar.

## 2 · Datenmodell

| Element | Entscheidung |
|---|---|
| **`public.anhang`** (neu) | `beitrag_id` → `beitrag` (cascade), `position` 1–5, `pfad` (unique), `art` bild/pdf, `groesse` 1–5 MiB, `beschreibung` ≤ 200; PK (`beitrag_id`, `position`) |
| Verbindliche Quelle | **`anhang`**. `beitrag.datei_pfad/datei_art` bleiben nur als **Spiegel von Anhang 1** für ältere App-Versionen. Beides schreiben ausschließlich die zwei Veröffentlichungs-RPCs in derselben Transaktion; es gibt keine Rechte, `anhang` oder die Spiegelspalten direkt zu schreiben. Invariante im Test: Spiegel = Anhang 1 (0 Abweichungen). |
| Altbestand | Jeder Beitrag mit `datei_pfad` bekommt seine Datei als Anhang 1. Speicherobjekte werden weiterverwendet, nichts neu hochgeladen. |
| Lesen | RLS `anhang`: lesbar genau dann, wenn der Beitrag für die fragende Person sichtbar ist (Regeln von `beitrag`: Profil, Paket, Gruppe, ausgeblendet nur Autor:in/Team). `beitrag_liste` bekommt die Spalte `anhaenge` (geordnete JSON-Liste). |
| Speicher | Lesen fremder Dateien nur, wenn ein sichtbarer Beitrag sie als **Anhang** führt (vorher: `datei_pfad`). Privater Bucket, angemeldeter Abruf, keine signierten oder öffentlichen Links – unverändert. |
| Dateikennung | `‹konto›/‹vorgang›-‹n›.‹endung›` (n = Position 1–5). Die Vorgangskennung ist zugleich die Beitrags-ID. Geänderte Auswahl ⇒ alter Vorgang wird geklärt, neue Kennung (bestehender G03-Ablauf). |

## 3 · Veröffentlichen

`beitrag_mit_anhaengen(p_vorgang, p_art, p_titel, p_text, p_lernfeld, p_kapitel, p_an_mentoren, p_anhaenge jsonb)`:

1. Profil, Paket, Vorgangskennung wie `beitrag_veroeffentlichen` (Wiederholung ⇒ derselbe Beitrag, Anhänge unverändert; verworfen ⇒ abgelehnt).
2. `anhaenge_pruefen` (intern, keine Kontorechte): **alle Speicherobjekte nach Name sortiert `FOR SHARE` sperren** (G06, feste Reihenfolge), Pfad muss zum Konto **und** zum Vorgang passen; danach Art und Größe **aus `storage.objects`** (nicht vom Client), Format, ≤ 5 Bilder, ≤ 25 MiB, PDF nur einzeln bei Lernzetteln, Lernzettel nicht ohne Anhang.
3. Beitrag und alle Anhänge in **einer** Transaktion. Fehlt eine Datei (z. B. drittes Bild nicht hochgeladen), entsteht nichts – auch kein verbrauchter Vorgang.

Alter Weg `beitrag_veroeffentlichen` (eine Datei, alte App-Versionen): bleibt, legt die Datei zusätzlich als Anhang 1 an.

Client (`community.js`): Bilder nacheinander hochladen, nach jedem Upload Kontobindung prüfen, dann RPC. Upload-Fehler vor der RPC ⇒ sicher nicht veröffentlicht („Die Bilder konnten nicht vollständig hochgeladen werden. Deine Auswahl ist noch da.“). RPC-Ausgang unklar ⇒ bestehende G03-Klärung. Bei „verworfen“ werden alle Dateien des Vorgangs einzeln entfernt (bekannte Pfade + alles im eigenen Ordner, was mit der Vorgangskennung beginnt). Ein Fehler beim Entfernen lässt Dateien privat liegen; der nächste Klärungsaufruf versucht es erneut.

## 4 · Löschen und G06

- `datei_in_gebrauch`: Objekt sperren (`FOR UPDATE`), dann Verwendung in `anhang` **oder** im Spiegel prüfen. Die Löschregel des Speichers nutzt das weiterhin.
- Beitrag löschen: Anhänge fallen per cascade, danach entfernt der Client jede Datei einzeln; was nicht gelöscht werden konnte, kommt als `dateiPfade` zurück (wiederholbar).
- Sammellöschung mehrerer Dateien in einem Aufruf vermeidet der Client bewusst. Täte es ein anderer Client, könnte die Datenbank eine Verklemmung erkennen und einen der beiden Aufrufe zurückrollen (40P01, sicher abgelehnt) – G06 bliebe auch dann erhalten.

## 5 · Oberfläche

- Schreiben: „Bilder hinzufügen (optional)“ bzw. bei Lernzetteln „Bilder“ / „PDF“; Mehrfachauswahl ergänzt, Abbrechen ändert nichts; Vorschau mit Nummer, Name, Größe, Beschreibung, „Entfernen“/„Nach vorn“/„Nach hinten“ (44 px); Gründe je abgelehnter Datei; PDF- bzw. Bildverlust beim Wechsel nur nach Rückfrage; Fortschritt „Bild 2 von 4 wird hochgeladen …“; alles gesperrt während des Sendens.
- Feed: erstes Bild in reserviertem Rahmen, „1 / n“, Abruf erst nahe am sichtbaren Bereich, höchstens zwei Abrufe gleichzeitig, begrenzter Bestand an Objektadressen (24, ferne zuerst frei); PDF als Hinweis „PDF-Lernzettel“.
- Detail: Bild 1 sofort, weitere bei Auswahl (nummeriert, Vorheriges/Nächstes); große Ansicht als Dialog mit „Schließen“, Escape, Fokus zurück; Bildfehler nur im Bildbereich mit „Erneut versuchen“.
- Moderation und eigene ausgeblendete Inhalte: „Datei prüfen“ lädt alle Anhänge (vorher eine Datei), nicht automatisch.
- Kontowechsel: Entwurf samt Vorschauen verworfen und freigegeben; laufende Uploads setzen nicht fort; späte Downloads werden freigegeben.

## 6 · Kompatibilität und Einspielen

| Stand | Verhalten |
|---|---|
| Datenbank neu, App alt (jetziges `main`) | funktioniert: alter RPC schreibt Anhang 1, Speicher-Leseregel über Anhänge (Altbestand übernommen), alte App zeigt das erste Bild im Detail |
| App neu, Datenbank alt | Veröffentlichen mit Bildern scheitert (RPC fehlt) ⇒ **erst Datenbank einspielen, dann mergen** |

Einspielreihenfolge (je < 5 KB): `20261021100000_anhang_1` → `…100005_anhang_2` → `…100007_anhang_3` → `…100010_anhang_4`. Nur `create`, `create or replace`, `alter policy`, `insert … on conflict do nothing`; kein `DROP`, kein `DELETE`.

## 7 · Bekannte Grenzen

- Das Format prüft der Server über den beim Hochladen gemeldeten Typ (wie bisher die Bucket-Regel); den Dateiinhalt selbst prüft niemand.
- Ältere App-Versionen zeigen bei Mehrbild-Beiträgen nur das erste Bild.
- Handyfotos über 5 MiB werden abgelehnt; eine Verkleinerung im Browser ist nicht Teil dieses Pakets.
