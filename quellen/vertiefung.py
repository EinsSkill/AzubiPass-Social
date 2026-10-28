"""
AzubiPass · Erweiterter Modus (Format 2)

Eine *Vollfassung* ist die ausführliche Darstellung eines bestehenden
Abschnitts. Sie hängt an dessen Abschnitts-ID und ersetzt beim Aufklappen die
erklärenden Absätze der Kurzfassung — Grafiken, Checks, Merke-Karten und
Hinweise bleiben genau einmal im Dokument und behalten Kennung und Lernstand.

Quelldaten (im Kapitel unter ``ausfuehrlich``)::

    "ausfuehrlich": {
      "format": 2,
      "abschnitte": [
        { "abschnitt": "b1", "darstellung": "vollfassung", ... },   # neu
        { "abschnitt": "b2", "erklaerung": "...", ... }              # Altformat
      ]
    }

Altbestand ohne ``darstellung: "vollfassung"`` wird unverändert vom bisherigen
Renderer als Zusatz („Mehr Erklärung“) behandelt. Eine Vollfassung, die nicht
zum Vertrag passt, bricht den Build mit Datei und Abschnitt ab: Ein still leer
gerenderter Abschnitt würde Lernenden den Grundtext wegnehmen.

Vertrag und Migration: doku/kapitel-format.md, Abschnitt „Erweiterter Modus“.
"""

import html
import json
import re
from pathlib import Path

HIER = Path(__file__).parent

# Blockarten im Haupttext und in Details. Bewusst klein: Tabelle und Absatz
# tragen Rechenwege und Fallvergleiche schon heute; eine eigene Rechenweg-Art
# hätte nur dieselbe Tabelle unter neuem Namen gebracht.
HAUPTBLOECKE = {"zwischentitel", "absatz", "tabelle", "liste", "basis", "verweis"}
DETAILBLOECKE = {"absatz", "tabelle", "liste", "verweis"}

KATEGORIEN = {
    "grundlagen": "Grundlagen nachlesen",
    "vergleich": "Fälle vergleichen",
    "sonderfall": "Sonderfall verstehen",
    "zusammenhang": "Zusammenhang entdecken",
}

# Was eine Vollfassung aus der Kurzfassung übernehmen darf. Nur, was eine
# eigene Funktion oder einen eigenen Lernstand hat — Absätze ersetzt sie.
BASIS_TYPEN = {"grafik", "check", "zuordnen", "merke", "tabelle",
               "achtung", "praxistipp", "vertiefung"}

# Felder, die es nur in Vollfassungen gibt (E01-Erkennung ohne Kennzeichen).
FORMAT2_FELDER = {"inhalt", "details", "ziel", "vorwissen_kurz", "quellen"}

KENNUNG = re.compile(r"^[a-z0-9][a-z0-9-]{0,40}$")


class Vertragsfehler(SystemExit):
    pass


def _fehler(datei, abschnitt, text):
    raise Vertragsfehler(f"\nFEHLER Erweiterter Modus · {datei} · Abschnitt {abschnitt}: {text}\n")


def ist_vollfassung(eintrag):
    return isinstance(eintrag, dict) and eintrag.get("darstellung") == "vollfassung"


def basis_schluessel(abschnitt):
    """Kennungen der übernehmbaren Kurzfassungsblöcke: typ-n in der
    ursprünglichen Reihenfolge, z. B. grafik-1, check-1. Nur die Reihenfolge
    innerhalb desselben Typs zählt — ein neuer Absatz verschiebt nichts."""
    zaehler, raus = {}, []
    for b in abschnitt.get("inhalt", []):
        t = b.get("typ")
        zaehler[t] = zaehler.get(t, 0) + 1
        raus.append(f"{t}-{zaehler[t]}" if t in BASIS_TYPEN else None)
    return raus


# ---------------------------------------------------------------- Prüfung

def _ziel_aufloesen(ziel, lf, ch, datei, abschnitt, cache):
    """Verweisziel „lf9:k1“ oder „lf4:k3-b3“ oder „k3-b3“ (dieselbe Seite).

    Gibt (href, Beschriftung) zurück. Unbekannte Ziele brechen ab — ein toter
    Link in einem Lerntext ist eine Behauptung, die nicht stimmt."""
    m = re.match(r"^(?:([a-z0-9-]+):)?(k\d+)(?:-([a-z0-9]+))?$", str(ziel or ""))
    if not m:
        _fehler(datei, abschnitt, f"Verweisziel „{ziel}“ hat nicht die Form lf:kapitel[-abschnitt]")
    lf_id, kap, ab = m.group(1) or lf["id"], m.group(2), m.group(3)
    if lf_id not in cache:
        pfad = next(HIER.glob(f"{lf_id}.lernfeld.json"), None)
        if pfad is None:
            _fehler(datei, abschnitt, f"Verweisziel „{ziel}“: Lernfeld {lf_id} gibt es nicht")
        daten = json.loads(pfad.read_text(encoding="utf-8"))
        kapitel = {}
        for e in daten["kapitel"]:
            kp = HIER / e["datei"]
            if kp.exists():
                kapitel[e["id"]] = json.loads(kp.read_text(encoding="utf-8"))
        cache[lf_id] = (daten, kapitel)
    daten, kapitel = cache[lf_id]
    if _beruf(lf_id) != _beruf(lf["id"]):
        _fehler(datei, abschnitt, f"Verweisziel „{ziel}“ liegt in einem anderen Beruf")
    zk = kapitel.get(kap)
    if not zk:
        _fehler(datei, abschnitt, f"Verweisziel „{ziel}“: Kapitel {kap} gibt es in {lf_id} nicht")
    titel = f'{daten.get("kurztitel", lf_id)} · K{zk["nummer"]} {zk["titel"]}'
    anker = kap
    if ab:
        za = next((a for a in zk["bloecke"] if a["id"] == ab), None)
        if not za:
            _fehler(datei, abschnitt, f"Verweisziel „{ziel}“: Abschnitt {ab} gibt es nicht")
        titel += f' · {za["titel"]}'
        anker = f"{kap}-{ab}"
    href = f"#{anker}" if lf_id == lf["id"] else f"{lf_id}.html#{anker}"
    return href, titel


def _beruf(lf_id):
    return "ik" if lf_id.startswith("ik") else "kfb"


def _bloecke_pruefen(bloecke, erlaubt, datei, abschnitt, ids, wo):
    if not isinstance(bloecke, list) or not bloecke:
        _fehler(datei, abschnitt, f"{wo}: inhalt muss eine nicht leere Liste sein")
    for i, b in enumerate(bloecke, 1):
        t = b.get("typ") if isinstance(b, dict) else None
        if t not in erlaubt:
            _fehler(datei, abschnitt, f"{wo}, Block {i}: unbekannte oder hier nicht erlaubte Art „{t}“")
        bid = b.get("id")
        if not bid or not KENNUNG.match(str(bid)):
            _fehler(datei, abschnitt, f"{wo}, Block {i}: fehlende oder ungültige id „{bid}“")
        if bid in ids:
            _fehler(datei, abschnitt, f"{wo}: id „{bid}“ ist im Kapitel doppelt")
        ids.add(bid)
        if t in ("absatz", "zwischentitel") and not str(b.get("text", "")).strip():
            _fehler(datei, abschnitt, f"{wo}, Block {bid}: text fehlt")
        if t == "tabelle":
            sp = b.get("spalten")
            if not sp or not b.get("zeilen"):
                _fehler(datei, abschnitt, f"{wo}, Tabelle {bid}: spalten und zeilen sind Pflicht")
            for z in b["zeilen"]:
                if len(z.get("zellen", [])) != len(sp):
                    _fehler(datei, abschnitt, f"{wo}, Tabelle {bid}: eine Zeile hat nicht {len(sp)} Zellen")
        if t == "liste" and not b.get("punkte"):
            _fehler(datei, abschnitt, f"{wo}, Liste {bid}: punkte fehlen")
        if t == "verweis":
            if not b.get("ziele"):
                _fehler(datei, abschnitt, f"{wo}, Verweis {bid}: ziele fehlen")


def pruefe(ch, lf, datei, cache=None):
    """Prüft alle Vollfassungen eines Kapitels. Gibt {abschnitt: eintrag} zurück."""
    cache = {} if cache is None else cache
    eigene = ch.get("ausfuehrlich")
    if not isinstance(eigene, dict):
        return {}
    # Review E01: Kennzeichen prüfen, bevor gefiltert wird. Ein Tippfehler in
    # „darstellung“ oder ein Format-2-Eintrag ohne Kennzeichen darf nicht still
    # im Altformat-Renderer landen. Echte Alteinträge (ohne Kennzeichen, ohne
    # Format-2-Felder) bleiben erlaubt.
    if "format" in eigene and eigene["format"] != 2:
        _fehler(datei, "–", f"unbekanntes format {eigene['format']!r} unter ausfuehrlich (erlaubt: 2)")
    for e in eigene.get("abschnitte", []):
        if not isinstance(e, dict):
            continue
        ab_e = e.get("abschnitt", "–")
        if "darstellung" in e and e["darstellung"] != "vollfassung":
            _fehler(datei, ab_e, f"unbekannte darstellung „{e['darstellung']}“ (erlaubt: vollfassung)")
        if not ist_vollfassung(e):
            neu = sorted(k for k in FORMAT2_FELDER if k in e)
            fragen = e.get("verstaendnisfragen")
            if isinstance(fragen, list) and any(isinstance(f, dict) for f in fragen):
                neu.append("verstaendnisfragen als Objekte")
            if neu:
                _fehler(datei, ab_e, "Eintrag mit Format-2-Feldern (" + ", ".join(neu) +
                        ") ohne darstellung \"vollfassung\"")
    eintraege = [e for e in eigene.get("abschnitte", []) if ist_vollfassung(e)]
    if not eintraege:
        return {}
    if eigene.get("format") != 2:
        _fehler(datei, "–", "Vollfassungen verlangen \"format\": 2 unter ausfuehrlich")

    basis = {a["id"]: a for a in ch["bloecke"]}
    ids, raus = set(), {}
    for e in eintraege:
        ab = e.get("abschnitt")
        if ab not in basis:
            _fehler(datei, ab, "verweist auf keinen bestehenden Abschnitt")
        if ab in raus:
            _fehler(datei, ab, "hat zwei Vollfassungen")
        if sum(1 for x in eigene["abschnitte"] if x.get("abschnitt") == ab) > 1:
            _fehler(datei, ab, "hat zusätzlich einen Alteintrag — beide schließen sich aus")
        _bloecke_pruefen(e.get("inhalt"), HAUPTBLOECKE, datei, ab, ids, "Haupttext")

        erlaubte = {k for k in basis_schluessel(basis[ab]) if k}
        genutzt = set()
        for b in e["inhalt"]:
            if b["typ"] == "basis":
                ref = b.get("ref")
                if ref not in erlaubte:
                    _fehler(datei, ab, f"basis-Verweis „{ref}“ gibt es in der Kurzfassung nicht "
                                       f"(möglich: {', '.join(sorted(erlaubte)) or 'keine'})")
                if ref in genutzt:
                    _fehler(datei, ab, f"basis-Verweis „{ref}“ steht doppelt — ein Block lebt nur einmal")
                genutzt.add(ref)
        # M01: Eine Kurzfassung ohne Absatz (nur Tabelle, Grafik, Check …) darf
        # trotzdem eine Vollfassung haben — dann ersetzt sie nichts, sondern
        # erklärt und holt die Originale einmal heran. Streng bleibt: Die
        # Vollfassung selbst muss erklärenden Text enthalten, und jedes
        # Original mit eigener Funktion wird genau einmal platziert (M02:
        # beim Umschalten darf nichts verloren gehen oder doppelt erscheinen).
        if not any(x.get("typ") == "absatz" for x in e["inhalt"]):
            _fehler(datei, ab, "die Vollfassung enthält keinen erklärenden Absatz")
        fehlend = sorted(erlaubte - genutzt)
        if fehlend:
            _fehler(datei, ab, "Originalblöcke ohne Platz in der Vollfassung: " + ", ".join(fehlend))

        for d in e.get("details", []):
            did = d.get("id")
            if not did or not KENNUNG.match(str(did)) or did in ids:
                _fehler(datei, ab, f"Detail mit fehlender, ungültiger oder doppelter id „{did}“")
            ids.add(did)
            if d.get("kategorie") not in KATEGORIEN:
                _fehler(datei, ab, f"Detail {did}: kategorie muss eine von {', '.join(KATEGORIEN)} sein")
            if not str(d.get("titel", "")).strip():
                _fehler(datei, ab, f"Detail {did}: titel fehlt")
            _bloecke_pruefen(d.get("inhalt"), DETAILBLOECKE, datei, ab, ids, f"Detail {did}")

        for f in e.get("verstaendnisfragen", []):
            fid = f.get("id")
            if not fid or not KENNUNG.match(str(fid)) or fid in ids:
                _fehler(datei, ab, f"Verständnisfrage mit fehlender, ungültiger oder doppelter id „{fid}“")
            ids.add(fid)
            if not str(f.get("frage", "")).strip() or not str(f.get("antwort", "")).strip():
                _fehler(datei, ab, f"Verständnisfrage {fid}: frage und antwort sind getrennt Pflicht")

        for q in e.get("quellen", []):
            if not q.get("titel"):
                _fehler(datei, ab, "Quelle ohne titel")
        for b in [x for x in e["inhalt"]] + [x for d in e.get("details", []) for x in d["inhalt"]]:
            if b["typ"] == "verweis":
                for ziel in b["ziele"]:
                    _ziel_aufloesen(ziel, lf, ch, datei, ab, cache)
        raus[ab] = e
    return raus


# ---------------------------------------------------------------- Ausgabe

def _liste(b, inline, lf):
    tag = "ol" if b.get("nummeriert") else "ul"
    punkte = "".join(f"<li>{inline(p, lf)}</li>" for p in b["punkte"])
    return f'<{tag} class="vf-liste">{punkte}</{tag}>'


def _verweis(b, inline, lf, ch, datei, abschnitt, cache):
    links = []
    for ziel in b["ziele"]:
        href, titel = _ziel_aufloesen(ziel, lf, ch, datei, abschnitt, cache)
        links.append(f'<li><a href="{html.escape(href)}">{html.escape(titel)}</a></li>')
    text = f'<p>{inline(b["text"], lf)}</p>' if b.get("text") else ""
    return f'<div class="vf-verweis">{text}<ul>{"".join(links)}</ul></div>'


def _block(b, inline, tabelle, lf, ch, datei, abschnitt, ort, cache):
    t = b["typ"]
    if t == "zwischentitel":
        return f'<h4 class="vf-zt" id="{ort}-{b["id"]}">{inline(b["text"], lf)}</h4>'
    if t == "absatz":
        return f'<p>{inline(b["text"], lf)}</p>'
    if t == "tabelle":
        fazit = f'<p class="vf-fazit">{inline(b["fazit"], lf)}</p>' if b.get("fazit") else ""
        return tabelle(b, lf).replace(' rein"', '"') + fazit
    if t == "liste":
        return _liste(b, inline, lf)
    if t == "verweis":
        return _verweis(b, inline, lf, ch, datei, abschnitt, cache)
    if t == "basis":
        hinweis = f'<p class="vf-basis-hinweis">{inline(b["hinweis"], lf)}</p>' if b.get("hinweis") else ""
        # Platzhalter: Das Skript holt den Originalblock hierher, solange die
        # Vollfassung offen ist, und stellt ihn beim Schließen zurück. Ohne
        # Skript bleibt der Block an seinem Platz in der Kurzfassung.
        return (f'{hinweis}<div class="vf-basis" data-basis="{html.escape(b["ref"])}">'
                f'<p class="vf-basis-ohne-js">Die Darstellung dazu steht weiter unten in der Kurzfassung.</p></div>')
    raise ValueError(t)


def vollfassung(ch, a, eintrag, lf, inline, tabelle, datei, cache):
    """HTML der Vollfassung eines Abschnitts, zunächst verborgen."""
    ab = a["id"]
    ort = f'{ch["id"]}-{ab}'
    teile = []
    if eintrag.get("ziel"):
        teile.append(f'<p class="vf-ziel"><span>Ziel</span>{inline(eintrag["ziel"], lf)}</p>')
    if eintrag.get("vorwissen_kurz"):
        teile.append(f'<p class="vf-vorwissen">{inline(eintrag["vorwissen_kurz"], lf)}</p>')
    for b in eintrag["inhalt"]:
        teile.append(_block(b, inline, tabelle, lf, ch, datei, ab, ort, cache))

    details = []
    for d in eintrag.get("details", []):
        innen = "".join(_block(b, inline, tabelle, lf, ch, datei, ab, ort, cache) for b in d["inhalt"])
        details.append(
            f'<details class="vf-detail" id="{ort}-d-{d["id"]}" data-detail="{d["id"]}">'
            f'<summary><span class="vf-kat">{KATEGORIEN[d["kategorie"]]}:</span> '
            f'{inline(d["titel"], lf)}</summary><div class="vf-detail-inhalt">{innen}</div></details>')
    if details:
        teile.append(f'<div class="vf-details">{"".join(details)}</div>')

    fragen = []
    for f in eintrag.get("verstaendnisfragen", []):
        fragen.append(
            f'<div class="vf-frage" id="{ort}-f-{f["id"]}" data-detail="{f["id"]}">'
            f'<p class="vf-frage-text">{inline(f["frage"], lf)}</p>'
            f'<details class="vf-antwort"><summary>Antwort anzeigen</summary>'
            f'<p>{inline(f["antwort"], lf)}</p></details></div>')
    if fragen:
        teile.append(f'<div class="vf-fragen"><h4 class="vf-zt">Zum Weiterdenken</h4>{"".join(fragen)}</div>')

    if eintrag.get("quellen"):
        qs = []
        for q in eintrag["quellen"]:
            t = html.escape(q["titel"])
            if q.get("url"):
                t = f'<a href="{html.escape(q["url"])}" rel="noopener" target="_blank">{t}</a>'
            if q.get("bezug"):
                t += f' — {html.escape(q["bezug"])}'
            qs.append(f"<li>{t}</li>")
        teile.append(f'<div class="vf-quellen"><span>Quellen</span><ul>{"".join(qs)}</ul></div>')

    return (f'<div class="vollfassung" id="{ort}-voll" hidden>{"".join(teile)}'
            f'<button class="abschnitt-schalter abschnitt-schalter-ende" type="button" '
            f'aria-expanded="true" aria-controls="{ort}-voll" data-abschnitt="{ab}">'
            f'Kompakt anzeigen</button></div>')


# ---------------------------------------------------------------- Suche

def suchtexte(ch, klartext):
    """Suchdatensätze aus Vollfassungen: Haupttext, je Detail, je Frage.

    Antworten werden nicht indexiert — die Suche soll keine Lösung verraten.
    Jeder Datensatz nennt das Ziel als (abschnitt, detail-id oder None, art)."""
    eigene = ch.get("ausfuehrlich")
    if not isinstance(eigene, dict) or eigene.get("format") != 2:
        return []
    raus = []
    for e in eigene.get("abschnitte", []):
        if not ist_vollfassung(e):
            continue
        ab = e["abschnitt"]

        def texte(bloecke):
            out = []
            for b in bloecke:
                if b["typ"] in ("absatz", "zwischentitel"):
                    out.append(b["text"])
                elif b["typ"] == "tabelle":
                    out += b["spalten"] + [c for z in b["zeilen"] for c in z["zellen"]]
                    if b.get("fazit"):
                        out.append(b["fazit"])
                elif b["typ"] == "liste":
                    out += b["punkte"]
            return " ".join(klartext(x) for x in out if x)

        haupt = " ".join(filter(None, [klartext(e.get("ziel", "")),
                                       klartext(e.get("vorwissen_kurz", "")),
                                       texte(e["inhalt"])]))
        raus.append((ab, None, "haupt", haupt, None))
        for d in e.get("details", []):
            raus.append((ab, d["id"], "detail", texte(d["inhalt"]),
                         f'{KATEGORIEN[d["kategorie"]]}: {klartext(d["titel"])}'))
        for f in e.get("verstaendnisfragen", []):
            raus.append((ab, f["id"], "frage", klartext(f["frage"]), klartext(f["frage"])))
    return raus
