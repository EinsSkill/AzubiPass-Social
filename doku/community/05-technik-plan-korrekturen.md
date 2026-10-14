# 05 · Technik-Plan Korrekturen G03–G05

Stand 14.10.2026 · Claude · Gegenprüfung des ChatGPT-Reviews zu Spec 05 und
Plan zur Freigabe durch Lukes **vor** dem Einspielen. Nichts eingespielt,
nichts umgesetzt, Sperre zu.

**Geprüfter Stand:** `community-zugang` @ `237a62a` – unverändert seit dem
Review, keine fremden Änderungen. `main` unverändert `0c472bb`.

**Grundlage:** Code unter `quellen/` und `supabase/migrations/`. Der Bericht
`Review_Spec05_237a62a.md`, die Prüfbelege und Spec 06 lagen mir **nicht** vor
(weder als Anhang noch im Repo). Die Befunde sind deshalb gegen die
Beschreibung in Lukes' Übergabe und den Code geprüft, nicht gegen die
ChatGPT-Testfälle. Bitte die Dateien unter `doku/community/review/` ablegen,
dann gleiche ich die fünf Fälle vor der Umsetzung ab.

---

## G03 · Unklarer Ausgang und Dateibereinigung – **bestätigt**

### Befund im Code

1. **Oberfläche, Beitrag** (`community-beitraege.js`, `statusPruefen`, Z. 1228 ff.)
   und **Antwort** (Z. 754 ff.): Liefert `beitragStatus`/`antwortStatus` `null`,
   wird `zustand = null` gesetzt und „Dein Beitrag wurde nicht veröffentlicht“
   angezeigt. Ein leerer Lesezugriff beweist das nicht – die ursprüngliche
   Anfrage kann auf dem Server noch laufen und danach festschreiben.
2. **Neue Kennung danach:** Jede Eingabe setzt `veraendert = true`
   (`merke()`, Z. 1117; Antwort Z. 686). Beim nächsten Senden entsteht eine
   neue UUID (Z. 1266 / 781). Schreibt das verspätete Original noch fest,
   gibt es **zwei** Beiträge bzw. Antworten.
3. **Datenschicht** (`community.js`, `veroeffentlichen`, Z. 580 ff.):
   `uebersetzen()` stuft nur Fetch-Abbrüche als `"netz"` ein. Eine RPC-Antwort
   mit HTTP 503 (oder 502/504, Gateway-Timeout) ohne Postgres-Code wird zu
   `"server"`, gilt als „sicher abgelehnt“, und bei leerem Status wird die Datei
   gelöscht. Läuft die Anfrage noch, entsteht ein Beitrag mit verwaister
   `datei_pfad` – oder der Upload ist umsonst.
4. **Server, zusätzlich gefunden:** Die Speicherregel „lernzettel: eigene
   löschen“ erlaubt das Löschen einer Datei, auf die ein Beitrag zeigt.
   `beitrag_veroeffentlichen` prüft die Datei nur mit `exists` ohne Sperre –
   ein gleichzeitiges Löschen kann zwischen Prüfung und Festschreiben fallen.

### Korrektur

**a) Versandstand.** Beim Senden wird ein unveränderliches Objekt gebildet
(`Object.freeze`): `vorgang, art, titel, text, lernfeld, kapitel, anMentoren,
datei` bzw. `vorgang, beitrag, text`. Freigabeprüfung, Upload, RPC und jede
Wiederholung verwenden **nur** diesen Stand (siehe G04).

**b) Zustände** (Beitrag und Antwort gleich):

| Zustand | Eingaben | Knöpfe | Kennung |
|---|---|---|---|
| `sendet` | gesperrt | Senden/Abbrechen gesperrt, „Zurück“ frei | fest |
| `abgelehnt` (sicher) | frei | Senden | bleibt, solange nichts geändert wird |
| `unklar` | **gesperrt** | „Status prüfen“, „Erneut senden“, „Eingaben ändern“ | fest |
| `geklaert: verworfen` | frei | Senden | neue Kennung beim nächsten Senden |

- **Status prüfen** liest nur. Treffer ⇒ Erfolg. Kein Treffer ⇒ Zustand
  bleibt `unklar`, Text: „Wir haben deinen Beitrag noch nicht gefunden. Er
  kann noch ankommen. Sende ihn unverändert erneut – er wird nicht doppelt
  veröffentlicht.“ (Antwort sinngemäß). **Keine** Fehlschlagbehauptung.
- **Erneut senden** schickt denselben Versandstand mit derselben Kennung.
  Das ist durch `on conflict (id) do nothing` schon heute sicher: Ist das
  Original angekommen, kommt dessen ID zurück; sonst wird es angelegt.
- **Eingaben ändern** ruft die neue RPC `vorgang_klaeren` (unten). Antwort
  `angelegt` ⇒ Erfolg (Beitrag öffnen). Antwort `verworfen` ⇒ endgültig: das
  Original kann nicht mehr ankommen, Eingaben werden freigegeben, die Datei
  darf weg, Text „Dein Beitrag wurde nicht veröffentlicht. Du kannst deine
  Eingaben jetzt ändern.“ Scheitert der Aufruf selbst ⇒ bleibt `unklar`.
- **Abbrechen/Zurück** im Zustand `unklar` verwirft weiter nichts.

Die drei neuen Texte sind von mir formuliert – bitte von ChatGPT/Lukes
bestätigen lassen.

**c) Fehlereinstufung** (`community.js`, neue Funktion `sicherAbgelehnt(f)`):
„sicher nicht ausgeführt“ nur, wenn die Antwort einen Postgres-SQLSTATE trägt,
der die Transaktion beendet hat (`P0001`, Klasse `22`, `23`, `42`, `57014`)
oder HTTP 401/403/429 ohne Postgres-Code. **Alles andere** – Fetch-Abbruch,
HTTP 0/408/5xx, `PGRST`-Verbindungscodes, unbekannte Antworten – ist
`"unklar"`. Gilt für `beitrag_veroeffentlichen`, `antwort_senden` und
`beste_antwort_setzen` (G05).

**d) Dateibereinigung:** Die Datenschicht löscht **nie** mehr selbst nach
einem Fehler. Gelöscht wird nur, nachdem `vorgang_klaeren` `verworfen`
geliefert hat, oder nach sicherer Ablehnung **und** Änderung der Eingaben
(dann ebenfalls erst `vorgang_klaeren`, danach löschen). Schlägt das Löschen
fehl, bleibt die Datei im eigenen, privaten Ordner liegen – unschön, aber
ohne Datenschutzfolge.

### Datenbank (zur Freigabe)

Neue Migration `…_vorgang_endstatus.sql` (unter 5 KB):

```sql
-- Endstatus pro Vorgangskennung: Wer zuerst einträgt, gewinnt. Der
-- Primärschlüssel serialisiert gleichzeitige Aufrufe.
create table public.vorgang (
  id          uuid primary key,
  autor_id    uuid not null references auth.users on delete cascade,
  art         text not null check (art in ('beitrag', 'antwort')),
  zustand     text not null check (zustand in ('angelegt', 'verworfen')),
  erstellt_am timestamptz not null default now()
);
alter table public.vorgang enable row level security;   -- keine Regeln: nur über Funktionen
revoke all on public.vorgang from anon, authenticated;

create function public.vorgang_klaeren(p_vorgang uuid, p_art text) returns text
language plpgsql security definer set search_path = '' as $$
declare ich uuid := (select auth.uid()); v public.vorgang;
begin
  if ich is null then raise exception 'Bitte melde dich zuerst an.'; end if;
  if p_art not in ('beitrag', 'antwort') then raise exception 'Unbekannte Art.'; end if;
  insert into public.vorgang (id, autor_id, art, zustand)
  values (p_vorgang, ich, p_art, 'verworfen') on conflict (id) do nothing;
  select * into v from public.vorgang where id = p_vorgang;
  if v.autor_id is distinct from ich or v.art <> p_art then
    raise exception 'Diese Vorgangskennung ist schon vergeben.';
  end if;
  return v.zustand;          -- 'angelegt' | 'verworfen'
end $$;
revoke all on function public.vorgang_klaeren(uuid, text) from public, anon;
grant execute on function public.vorgang_klaeren(uuid, text) to authenticated;
```

`vorgang_klaeren` prüft die Paketsperre bewusst **nicht**: Klären muss auch
nach dem Schließen möglich sein, legt aber nie Inhalte an.

**`beitrag_veroeffentlichen` / `antwort_senden`** (replace, Signatur gleich):
nach der bestehenden Prüfung „Kennung gehört schon einem eigenen Beitrag ⇒
dessen ID zurück“ und **vor** dem Insert:

```sql
insert into public.vorgang (id, autor_id, art, zustand)
values (p_vorgang, ich, 'beitrag', 'angelegt') on conflict (id) do nothing;
select * into v from public.vorgang where id = p_vorgang;
if v.autor_id is distinct from ich or v.art <> 'beitrag' then
  raise exception 'Diese Vorgangskennung ist schon vergeben.';
end if;
if v.zustand = 'verworfen' then
  raise exception 'Dieser Vorgang wurde abgebrochen.';
end if;
```

Schlägt danach etwas fehl (Spam-Bremse, Prüfregel), rollt die Transaktion die
Zeile mit zurück – der Vorgang bleibt offen und kann wiederholt werden.

Dazu in `beitrag_veroeffentlichen` die Dateiprüfung mit Zeilensperre:
`perform 1 from storage.objects where bucket_id = 'lernzettel' and name =
p_datei_pfad for share; if not found then raise …`.

**Speicherregel** „lernzettel: eigene löschen“ ersetzen – zusätzlich
`and not exists (select 1 from public.beitrag b where b.datei_pfad =
objects.name)`. Wirkung: Eine Datei, auf die ein Beitrag zeigt, lässt sich
nicht löschen. `beitragLoeschen` löscht schon heute erst den Beitrag, dann
die Datei – unverändert lauffähig. Zusammen mit `for share` blockiert ein
gleichzeitiges Löschen bis zum Festschreiben und scheitert dann.

`vorgang` wächst um eine Zeile pro Sendung. Für die Beta unerheblich;
Aufräumen (z. B. `verworfen` älter als 30 Tage) später separat.

### Abnahmefälle G03

1. RPC bricht ab (Fetch-Fehler), Status leer ⇒ bleibt `unklar`, keine
   „nicht veröffentlicht“-Meldung, Felder gesperrt, Datei nicht gelöscht.
2. RPC antwortet 503 ohne Postgres-Code ⇒ `unklar`, **kein** Löschaufruf an
   den Speicher (Mock zählt `remove`-Aufrufe = 0).
3. „Erneut senden“ nach 1. sendet dieselbe Kennung und denselben Inhalt
   (Mock vergleicht beide Anfragekörper byte-gleich).
4. Verspätetes Original: erster Aufruf wird verzögert und landet nach dem
   Statusabruf ⇒ nach „Erneut senden“ genau **ein** Beitrag (echter Fall).
5. „Eingaben ändern“ mit `verworfen` ⇒ Felder frei; ein danach eintreffender
   Aufruf mit der alten Kennung scheitert mit „abgebrochen“; neuer Versand
   bekommt neue Kennung; Datei der alten Kennung gelöscht (echter Fall).
6. „Eingaben ändern“, Original schon angelegt ⇒ `angelegt`, Beitrag öffnet
   sich, kein zweiter Beitrag.
7. `vorgang_klaeren` mit fremder Kennung ⇒ Fehler, nichts verändert.
8. Sichere Ablehnung (`P0001` Spam-Bremse) ⇒ „nicht veröffentlicht“,
   Eingaben frei, unveränderter Neuversuch nutzt dieselbe Kennung und die
   schon hochgeladene Datei.
9. Speicher: Datei eines bestehenden Beitrags lässt sich vom Autor nicht
   löschen; nach `beitragLoeschen` schon.
10. Alle fünf ChatGPT-Fälle aus den Prüfbelegen (sobald sie vorliegen).

---

## G04 · Eingaben während des Sendens – **bestätigt**

### Befund im Code

- Während `sendet` sperrt `darstellen()` nur „Senden“ und „Abbrechen“
  (Z. 1183 ff., Antwort Z. 700 ff.). Titel, Text, Art, Lernfeld, Kapitel,
  Mentoren-Häkchen, Dateiauswahl, „Datei entfernen“ und das Antwortfeld
  bleiben bedienbar.
- Bei Erfolg wird der ganze Entwurf verworfen (`fertig`, Z. 1298;
  `gesendet`, Z. 725) – nachträgliche Eingaben gehen verloren.
- Die Freigabeprüfung (`beitraegeFrei()`, Z. 1273) liegt **vor**
  `veroeffentlichen`. Gelesen wird aus dem lebenden Entwurf `g` (= `e`), den
  `merke()` bei jeder Eingabe überschreibt – gesendet wird also, was nach der
  Prüfung im Feld steht, nicht was validiert wurde.

### Korrektur

- Versandstand wie unter G03 a) – einmal beim Absenden gebildet, danach nur
  noch gelesen.
- Neue Hilfsfunktion `eingabenSperren(form, an)`: Textfelder `readOnly` +
  `aria-readonly` (bleiben lesbar und fokussierbar), Auswahl, Radio,
  Häkchen, Dateiauswahl und „Datei entfernen“ `disabled`. Hinweis im
  Statusbereich: „Während des Sendens kannst du deine Eingaben nicht
  ändern.“ (neuer Text, bitte bestätigen).
- Gesperrt in `sendet`, `pruefen` und `unklar`; frei nach sicherer Ablehnung
  oder nach `verworfen`. `merke()` schreibt in gesperrtem Zustand nicht.
- Beim Neuzeichnen von C06 (z. B. zurück über den Verlauf) wird die Sperre
  aus `e.zustand` wiederhergestellt.
- Erreichbar bleiben: „‹ Zurück zu Beiträgen“, Tab-Leiste, „Zu Lernen“,
  Profil. Der Vorgang läuft im Hintergrund weiter wie heute.

### Abnahmefälle G04

1. Während Freigabeprüfung, Upload und RPC sind alle Eingaben gesperrt
   (Sichtprüfung + `readOnly`/`disabled` je Feld).
2. Mock verzögert `beitraege_frei`; ein per Skript geänderter Feldwert wird
   nicht gesendet – RPC-Körper entspricht dem validierten Stand.
3. Nach Erfolg geht nichts verloren, was nicht gesendet wurde (es konnte
   nichts eingegeben werden).
4. Nach sicherer Ablehnung sind die Felder wieder bearbeitbar, Fokus auf der
   Meldung.
5. Zurück-Navigation und Lernen-Tab sind während des Sendens bedienbar; bei
   Rückkehr nach C06 ist die Sperre noch aktiv, solange der Vorgang läuft.
6. Antwortformular: dieselben Fälle 1, 3, 4.
7. axe-core ohne neue Verstöße; Screenreader-Ansage der Sperre.

---

## G05 · Beste Antwort nach verlorener Bestätigung – **bestätigt**

### Befund im Code

- `beste_antwort(p_antwort)` schaltet um (`if a.beste then … false else …
  true`, Migration `20261013151520`). Ging nur die Bestätigung verloren,
  macht der zweite Klick die erste Aktion rückgängig.
- `loesenKnopf` (Z. 599 ff.) gibt den Knopf nach jedem Fehler mit alter
  Beschriftung frei – auch bei Verbindungsabbruch, wo der Server schon
  umgeschaltet haben kann. Ein Mock-Test (`community_schreiben_test.py`
  Z. 593) prüft genau diesen Abbruch, erwartet aber das heutige Verhalten.
- Nachladefehler nach Erfolg werden verschluckt (`function () {}`, Z. 616):
  „Gelöst“ im Kopf kann veraltet stehen bleiben.

### Korrektur

**Datenbank** (gleiche Migration, zur Freigabe):

```sql
create function public.beste_antwort_setzen(p_antwort uuid, p_beste boolean)
returns boolean language plpgsql security definer set search_path = '' as $$
declare ich uuid := (select auth.uid()); a public.antwort; b public.beitrag;
begin
  if not public.beitraege_frei() then
    raise exception 'Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.';
  end if;
  if p_beste is null then raise exception 'Gewünschter Zustand fehlt.'; end if;
  select * into a from public.antwort where id = p_antwort;
  if a.id is null then raise exception 'Diese Antwort gibt es nicht mehr.'; end if;
  select * into b from public.beitrag where id = a.beitrag_id for update;  -- serialisiert
  if b.autor_id is distinct from ich then
    raise exception 'Nur wer gefragt hat, kann die beste Antwort wählen.';
  end if;
  if b.art <> 'frage' then raise exception 'Eine beste Antwort gibt es nur bei Fragen.'; end if;
  select * into a from public.antwort where id = p_antwort;             -- nach der Sperre neu
  if a.beste = p_beste then return p_beste; end if;                      -- schon so: nichts tun
  if p_beste then
    if b.versteckt or a.versteckt then
      raise exception 'Ausgeblendete Inhalte können nicht als beste Antwort markiert werden.';
    end if;
    update public.antwort set beste = false where beitrag_id = b.id and beste;
    update public.antwort set beste = true  where id = a.id;
    update public.beitrag set geloest = true where id = b.id;
  else
    update public.antwort set beste = false where id = a.id;
    update public.beitrag set geloest = false where id = b.id;
  end if;
  return p_beste;
end $$;
revoke all on function public.beste_antwort_setzen(uuid, boolean) from public, anon;
grant execute on function public.beste_antwort_setzen(uuid, boolean) to authenticated;

drop function public.beste_antwort(uuid);   -- kein Umschalt-Weg mehr
```

Das `drop` ist sicher, weil nichts live ist; die drei Testdateien, die
`besteAntwort` aufrufen, werden im selben Schritt umgestellt.

**Datenschicht:** `besteAntwort(antwortId, beste)` – `beste` ist Pflicht
(boolean), sonst Fehler `"eingabe"`. Fehlereinstufung nach G03 c).

**Oberfläche** (`loesenKnopf`):

- Gewünschter Zustand = Gegenteil des zuletzt **bestätigten** `a.beste`.
- Bei `unklar`: Knopf bleibt gesperrt, Hinweis „Wir prüfen, ob die
  Markierung geändert wurde …“, dann Antworten und Beitrag neu laden. Der
  geladene Zustand entscheidet die Beschriftung. Kein stilles Freigeben mit
  alter Beschriftung.
- Nachladen scheitert (nach Erfolg oder nach `unklar`): sichtbare Meldung
  „Der aktuelle Stand konnte nicht geladen werden.“ mit „Erneut laden“
  (Fokus dorthin), Markier-Knöpfe gesperrt, bis ein Stand geladen ist.
  Neuer Text, bitte bestätigen.
- Sichere Ablehnung: wie heute, alter Zustand bleibt, Meldung
  „Die Markierung konnte nicht geändert werden. Versuch es erneut.“

### Abnahmefälle G05

1. Setzen, Bestätigung geht verloren (Mock lässt RPC durch, bricht Antwort
   ab) ⇒ nach Nachladen „Markierung entfernen“; erneuter Klick sendet
   `p_beste = false` bewusst – kein versehentliches Zurücknehmen.
2. Zweimal `beste_antwort_setzen(a, true)` ⇒ beide `true`, genau eine
   beste Antwort, `geloest = true` (echter Fall).
3. Andere Antwort setzen, während eine markiert ist ⇒ Wechsel, Index
   `antwort_eine_beste` nie verletzt; zwei gleichzeitige Aufrufe ⇒ ein
   Endzustand ohne Fehler 23505 (echter Fall, parallel).
4. Nachladen scheitert ⇒ sichtbare Meldung, Knöpfe gesperrt, „Erneut
   laden“ stellt den Stand her.
5. Bestehende Fälle: nur Fragesteller, nur Fragen, ausgeblendet nicht
   setzbar, Zurücknehmen ausgeblendeter Markierung möglich, Paketsperre.
6. `beste_antwort(uuid)` existiert nicht mehr.

---

## Datenbankänderungen auf einen Blick (nichts eingespielt)

| Änderung | Art |
|---|---|
| Tabelle `vorgang` + RLS ohne Regeln | neu |
| RPC `vorgang_klaeren(uuid, text)` | neu |
| `beitrag_veroeffentlichen`, `antwort_senden` | ersetzt, Signatur gleich (Vorgangszeile, `for share`) |
| Speicherregel „lernzettel: eigene löschen“ | ersetzt (nicht, solange ein Beitrag darauf zeigt) |
| RPC `beste_antwort_setzen(uuid, boolean)` | neu |
| RPC `beste_antwort(uuid)` | entfernt |

Einspielen in zwei Teilen unter 5 KB (bekannte MCP-Grenze), danach
`regeln_test.sql` und alle Python-Tests. `supabase/README.md` bekommt einen
Abschnitt „Vorgangskennung und Endstatus“.

## Noch nicht dokumentierte Entscheidungen (für `entscheidungen.md`, Lukes)

- ChatGPT empfiehlt, meine ergänzten Texte aus dem Spec-05-Bericht zu
  übernehmen (Prüfansicht, Freigabefehler, Dateizeile, Kapitel-Hinweis usw.).
- ChatGPT empfiehlt, die lokale Datei beim Artwechsel im Entwurf zu behalten
  (nicht gesendet, Hinweis sichtbar).
- Neu aus diesem Plan: drei Texte zu G03, einer zu G04, zwei zu G05 (oben
  jeweils als „bitte bestätigen“ markiert).

## Bezug zu Spec 06 (Melden und Moderation)

Spec 06 lag mir nicht vor. Absehbar ist: Melden ist ebenfalls eine Aktion mit
möglicherweise verlorener Bestätigung. Die Muster hier – fester Versandstand,
Vorgangskennung, „gewünschten Zustand setzen statt umschalten“ – sollten dort
gleich gelten. Ich prüfe das, sobald die Spec im Repo liegt.

## Reihenfolge nach Freigabe

1. Migration einspielen, `regeln_test.sql` erweitern (Fälle G03 5–7, 9;
   G05 2, 3, 6).
2. `community.js`: `sicherAbgelehnt`, `vorgangKlaeren`, kein Löschen nach
   Fehler, `besteAntwort(id, beste)`.
3. `community-beitraege.js`: Versandstand, `eingabenSperren`, Zustände
   `unklar`/„Eingaben ändern“, `loesenKnopf`.
4. Tests: `community_schreiben_test.py` um die Mock-Fälle, bestehende
   `besteAntwort`-Aufrufe in drei Testdateien umstellen; volle Testreihe.
