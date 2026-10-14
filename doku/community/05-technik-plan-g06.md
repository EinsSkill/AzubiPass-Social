# 05 · Technikplan G06 – Dateischutz an allen Wegen

> Status: PLAN · Stand: 2026-10-14 · Autor: Claude
>
> Antwort auf `review/2026-10-14-chatgpt-review-g03-g05.md`, Befund G06.
> **Nichts eingespielt.** Einspielen erst nach Lukes' Freigabe. G07, G08 und
> C01 sind reine Client-Korrekturen und im selben Commit umgesetzt (siehe
> Übergabe); dieser Plan betrifft nur die Datenbank.

## Befund bestätigt

- **Fall A (Löschen gegen Veröffentlichen):** Die Löschregel ruft
  `datei_in_gebrauch(name)` auf, **bevor** DELETE auf die Zeilensperre der
  laufenden Veröffentlichung wartet. Nach dem Warten prüft PostgreSQL die
  Regel nicht neu, weil die Zeile selbst nicht geändert wurde (nur
  `FOR SHARE` gesperrt). Mein Kommentar „volatile, damit die Löschregel nach
  einer Sperrwartezeit … sieht“ war falsch. Ob der eingesetzte Storage-Dienst
  den Fall auslösen kann, hängt von seiner Version ab (ChatGPT: v1.28.0 ja,
  master sperrt vorher) – der Schutz darf davon nicht abhängen.
- **Fall B (alter direkter Weg):** `authenticated` darf weiter direkt in
  `beitrag` einfügen, mit `datei_pfad` (Grant aus `rechte.sql`, Regel aus
  `paketsperre_regeln.sql`). Dieser Weg prüft weder Existenz noch Sperre der
  Datei. Die App nutzt ihn nur für Gruppenbeiträge in `community_test.py`.
- Live-Bestand am 14.10. (lesend): 0 Dateien im Bucket, 0 Beiträge ohne
  Datei, 0 Dateien ohne Beitrag, 0 Gruppenbeiträge. Auf `storage.objects`
  liegt Supabases Trigger `protect_objects_delete`: direktes SQL-DELETE geht
  ohnehin nicht, Löschen läuft über die Storage-API mit den Regeln der
  angemeldeten Person.

## Änderung 1 · Sperren, dann prüfen

`datei_in_gebrauch` wird plpgsql und erwirbt **zuerst** die Zeilensperre auf
dem Speicherobjekt, **danach** prüft es den Beitrag. In READ COMMITTED sieht
jede neue Anweisung in einer `volatile`-Funktion den bis dahin
festgeschriebenen Stand:

```sql
create or replace function public.datei_in_gebrauch(p_pfad text) returns boolean
language plpgsql volatile security definer set search_path = '' as $$
begin
  if split_part(p_pfad, '/', 1) <> (select auth.uid())::text then return false; end if;
  -- 1. Warten, bis eine laufende Veröffentlichung (FOR SHARE) festgeschrieben ist.
  perform 1 from storage.objects
   where bucket_id = 'lernzettel' and name = p_pfad for update;
  -- 2. Erst jetzt den Beitrag prüfen – neue Anweisung, neuer Stand.
  return exists (select 1 from public.beitrag where datei_pfad = p_pfad);
end $$;
```

- **Veröffentlichen zuerst:** DELETE ruft die Regel auf → Funktion wartet auf
  die Sperre → nach COMMIT sieht sie den Beitrag → Regel verweigert, Datei
  bleibt.
- **Löschen zuerst:** Die Funktion hält die Sperre bis zum Ende der
  Löschtransaktion; `beitrag_veroeffentlichen` wartet bei `FOR SHARE` und
  findet danach keine Zeile mehr → „Die Datei ist nicht hochgeladen.“, kein
  Beitrag.
- `postgres` (Funktionseigner) hat UPDATE auf `storage.objects` (geprüft),
  `FOR UPDATE` ist also erlaubt. Die Sperre gehört zur Transaktion der Person,
  die löscht, und endet mit ihr.
- Gilt unabhängig davon, ob der Storage-Dienst vorher selbst sperrt.

## Änderung 2 · Alter direkter Weg ohne Datei

Regel „beitrag: selbst veröffentlichen“ zusätzlich: `datei_pfad is null and
gruppe_id is not null`. Allgemeine Beiträge und alle Beiträge mit Datei gehen
nur noch über `beitrag_veroeffentlichen` (mit Datei-Sperre). Der Grant bleibt,
damit `community_test.py` Gruppen-Textbeiträge weiter anlegen kann; Gruppen
mit Lernzetteln bekommen ihre RPC mit der Gruppen-Spec.

Alternative (strenger): Insert-Grant ganz entziehen und den Gruppentest
bis zur Gruppen-Spec auf „ausstehend“ setzen. Ich empfehle Änderung 2, weil
sie den Befund schließt und nichts Bestehendes bricht.

## Migration

Eine Datei `…_dateischutz_sperre.sql` (< 2 KB): Funktion ersetzen, Regel
ändern. Keine Datenänderung, Altbestand ist leer.

## Abnahme

Echte Datenbank, zwei Verbindungen (`supabase/tests/dateischutz_g06_test.sql`
plus ein kleines Python-Skript mit zwei Sitzungen, da ein SQL-Skript allein
keine Parallelität hat):

1. A veröffentlicht in offener Transaktion, B löscht → B wartet, nach
   A-COMMIT: 0 gelöschte Zeilen, Beitrag und Datei vorhanden.
2. B löscht in offener Transaktion, A veröffentlicht → A wartet, nach
   B-COMMIT: Fehler „nicht hochgeladen“, kein Beitrag, keine Datei.
3. Beides mit geschlossener Paketsperre (Klassenkonto) → Veröffentlichen
   abgelehnt, Löschen der eigenen unbenutzten Datei möglich.
4. Direktes INSERT mit `datei_pfad` oder ohne Gruppe → von der Regel abgelehnt;
   Gruppen-Textbeitrag weiter möglich.
5. Ende zu Ende über die Storage-API (`remove`) gegen das Projekt mit einem
   Testkonto, beide Reihenfolgen, soweit sich die Reihenfolge von außen
   erzwingen lässt (Veröffentlichung über SQL-Verbindung offen halten,
   `remove` per API).

Testdaten werden danach entfernt; Ergebnisse echt/simuliert getrennt.
