#!/usr/bin/env python3
"""
AzubiPass · App

    python3 build_app.py

Läuft nach build.py und macht aus den einzelnen Lernzetteln eine App:

    app.html               Startseite, Lernen, Üben, Suche, Ich
    manifest.webmanifest   damit sie sich auf den Homescreen legen lässt
    sw.js                  Zwischenspeicher, damit sie ohne Netz läuft
    mittel/inhalt.json     Lernfelder, Kapitel, Karten, Quizfragen und Vokabelblöcke
    mittel/suche.json      Volltext — getrennt, weil er nur beim Suchen gebraucht wird
    mittel/aufgaben.json   Aufgabenbausteine, Kontenplan und Belege der Probeklausur
    mittel/symbol.*        App-Symbol
    impressum.html         Pflichtangaben nach § 5 DDG
    datenschutz.html       Pflichtangaben nach Art. 13 DSGVO

Ein eigener Schritt und kein zweites Bausystem: Er liest nur, was die
Kapiteldateien ohnehin enthalten.
"""

import base64
import html
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

from build import karten_sammeln, option_ids
from gemeinsames import (AUSGABE, LUPE, MARKE, MITTEL, fussleiste, kopf, lade,
                         lernfeld_dateien, rechtliches, schriften_lokal,
                         tableiste, veroeffentliche, zwischenspeicher_schreiben)

HIER = Path(__file__).parent
PLATZHALTER = "BITTE_AUSFUELLEN"


# ---------------------------------------------------------------- Text

def klartext(s):
    """Nimmt die Auszeichnung heraus — für Suche und Vorschau."""
    s = str(s or "")
    s = re.sub(r"\{\{(?:begriff|par):[a-z0-9-]+\|(.+?)\}\}", r"\1", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"(?<!\w)\*(.+?)\*(?!\w)", r"\1", s)
    s = re.sub(r"==(.+?)==", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()


def lernfeld_aliases(lf):
    """Geläufige Kurzformen für Lernfeldreihen und die Volltextsuche."""
    if lf["id"] == "buchfuehrung":
        return ["LF6", "Lernfeld 6", "Rechnungswesen", "Buchhaltung", "FiBu"]
    treffer = re.fullmatch(r"lf(\d+)", lf["id"])
    return ["LF" + treffer.group(1)] if treffer else [lf["id"]]


def bausteintext(b):
    """Alles, was in einem Baustein steht, als Fließtext."""
    t = b.get("typ")
    if t in ("absatz", "merke", "achtung", "praxistipp"):
        return [b.get("text", ""), b.get("karteikarte", "")]
    if t == "tabelle":
        raus = list(b.get("spalten", []))
        for z in b.get("zeilen", []):
            raus += list(z.get("zellen", [])) + [z.get("detail", "")]
        return raus
    if t == "vertiefung":
        return [b.get("titel", "")] + list(b.get("absaetze", []))
    if t == "check":
        return [b.get("frage", "")] + [o.get("text", "") for o in b.get("optionen", [])]
    if t == "zuordnen":
        return [b.get("lead", "")] + [a.get("text", "") for a in b.get("aufgaben", [])]
    if t == "grafik":
        return [b.get("titel", ""), b.get("lead", ""), b.get("regel", "")]
    return []


# ---------------------------------------------------------------- Sammeln

def quiz_sammeln(lf, kapitel_daten):
    """Die Checks und Zuordnungen als Übungsvorrat.

    Sie sind längst geschrieben — mit Frage, richtiger Antwort und einer
    Rückmeldung zu jeder falschen. Nur benutzt hat sie bisher niemand außerhalb
    des Kapitels, in dem sie stehen."""
    raus = []
    for ch in kapitel_daten:
        for a in ch["bloecke"]:
            zahl = {"c": 0, "z": 0}
            for b in a["inhalt"]:
                ort = f'{lf["id"]}-{ch["id"]}-{a["id"]}'
                gemeinsam = {
                    "lernfeld": lf["id"], "lernfeldTitel": lf["titel"],
                    "kapitel": f'K{ch["nummer"]} · {ch["titel"]}',
                    "zu": f'{lf["id"]}.html#{ch["id"]}',
                }
                if b["typ"] == "check":
                    zahl["c"] += 1
                    quiz_id = f'{ort}-c{zahl["c"]}'
                    ids = option_ids(b["optionen"], quiz_id)
                    raus.append(dict(gemeinsam, art="check", id=quiz_id,
                                     frage=b["frage"],
                                     optionen=[{"id": ids[i], "text": o["text"],
                                                "richtig": bool(o.get("richtig")),
                                                "echo": o["echo"]}
                                               for i, o in enumerate(b["optionen"])]))
                elif b["typ"] == "zuordnen":
                    zahl["z"] += 1
                    raus.append(dict(gemeinsam, art="zuordnen", id=f'{ort}-z{zahl["z"]}',
                                     frage=b["lead"],
                                     kategorien=b["kategorien"],
                                     aufgaben=[{"text": x["text"], "loesung": x["loesung"]}
                                               for x in b["aufgaben"]]))
    return raus


def tests_sammeln(lf, kapitel_daten):
    """Die offenen Selbsttestfragen. Ein Rechner kann sie nicht bewerten — aber
    „das wusste ich nicht" ist eine Selbsteinschätzung, und die ist für die
    Schwachstellenliste die ehrlichste Quelle, die es gibt."""
    return [{
        "id": f'{lf["id"]}-{ch["id"]}-t{i}',
        "frage": klartext(f["frage"]),
        "typ": f["typ"],
        "lernfeld": lf["id"], "lernfeldTitel": lf["titel"],
        "kapitel": f'K{ch["nummer"]} · {ch["titel"]}',
        "zu": f'{lf["id"]}.html#{ch["id"]}',
    } for ch in kapitel_daten for i, f in enumerate(ch["selbsttest"], 1)]


def suche_sammeln(lf, kapitel_daten):
    """Ein Eintrag pro Abschnitt — fein genug, um an die Stelle zu springen,
    grob genug, dass die Datei nicht ausufert."""
    raus = []
    aliases = lernfeld_aliases(lf)
    lernfeld_label = aliases[0] + " · " + lf["titel"]
    lernfeld_suchtext = " ".join(aliases) + " " + lf["titel"]
    for ch in kapitel_daten:
        for a in ch["bloecke"]:
            stuecke = []
            for b in a["inhalt"]:
                stuecke += [klartext(x) for x in bausteintext(b) if x]
            raus.append({
                "t": klartext(a["titel"]),
                "x": lernfeld_suchtext + " " + " ".join(s for s in stuecke if s),
                "lf": lf["id"], "lft": lernfeld_label,
                "k": f'K{ch["nummer"]} · {klartext(ch["titel"])}',
                "zu": f'{lf["id"]}.html#{ch["id"]}-{a["id"]}',
            })
        raus.append({
            "t": "Zusammenfassung",
            "x": lernfeld_suchtext + " "
                 + " ".join(klartext(s) for s in ch["zusammenfassung"])
                 + " " + klartext(ch["pruefungstipp"]),
            "lf": lf["id"], "lft": lernfeld_label,
            "k": f'K{ch["nummer"]} · {klartext(ch["titel"])}',
            "zu": f'{lf["id"]}.html#{ch["id"]}',
        })
    return raus


def begriffe_sammeln(lf):
    """Begriffe und Paragraphen liegen zentral — daraus wird ein Lexikon,
    ohne dass jemand eine Zeile nachpflegt."""
    raus = []
    for art, feld in (("Begriff", "begriffe"), ("Gesetzestext", "paragraphen")):
        for schluessel, e in lf.get(feld, {}).items():
            raus.append({"art": art, "id": schluessel,
                         "titel": e["titel"], "text": e["text"]})
    return raus


def vokabeln_lesen():
    """Lädt Grundwortschatz und getrennte Testlisten mit stabilen IDs."""
    datei = HIER / "vokabeln.json"
    if not datei.exists():
        return []
    quelle = json.loads(datei.read_text(encoding="utf-8"))
    bloecke, ids = [], set()
    for block in quelle.get("bloecke", []):
        eintrag = {
            "id": block["id"],
            "art": block.get("art", "basis"),
            "titel": block["titel"],
            "beschreibung": block.get("beschreibung", ""),
            "vokabeln": [],
        }
        for wort in block.get("vokabeln", []):
            if not wort.get("id") or wort["id"] in ids:
                raise ValueError(f"Vokabel-ID fehlt oder doppelt: {wort.get('id')}")
            if not wort.get("en") or not wort.get("de"):
                raise ValueError(f"Vokabel unvollständig: {wort.get('id')}")
            ids.add(wort["id"])
            eintrag["vokabeln"].append({
                "id": wort["id"],
                "en": wort["en"],
                "de": wort["de"],
                "beispiel": wort.get("beispiel", ""),
                "hinweis": wort.get("hinweis", ""),
                "alternativen": [str(x).strip() for x in wort.get("alternativen", [])
                                  if str(x).strip()],
            })
        if eintrag["vokabeln"]:
            bloecke.append(eintrag)
    return bloecke


# ---------------------------------------------------------------- Aufgabenvorrat
#
# Aus den *.aufgaben.json, dem Kontenplan und den Belegvorlagen wird eine
# einzige Datei für die App. Sie liegt unter mittel/ und wandert dadurch
# automatisch in den Offline-Vorrat — dieselbe Mechanik wie bei den Kapiteln.
#
# Der Build prüft dabei alles, was sich vorher prüfen lässt: Kontonummern,
# Belegverweise, Begriffe, Aufgabentypen und Formeln. Fällt hier etwas auf,
# bricht er ab. Ein Tippfehler in einer Kontonummer soll nicht erst dem
# Prüfling um Mitternacht auffallen.


class Aufgabenfehler(Exception):
    """Etwas in den Aufgabendaten stimmt nicht — mit Ansage, nicht mit Traceback."""


BELEGE = HIER / "belege"

ANZEIGE_BLOECKE = {"text", "tabelle", "anlage"}
EINGABE_BLOECKE = {"zahl", "auswahl", "zuordnung", "reihenfolge", "buchungssatz", "textfeld"}
FORMEL_FUNKTIONEN = {"runde", "abrunden", "aufrunden", "min", "max", "abs"}

# Dieselbe Zerlegung wie der Rechner in aufgaben.js. Hier wird nur geprüft, was
# vorkommen darf — gerechnet wird ausschließlich im Browser, damit es nicht zwei
# Rechner gibt, die auseinanderlaufen können.
MARKEN = re.compile(r"\s*(\d+\.?\d*|[A-Za-z_][A-Za-z0-9_]*|>=|<=|==|!=|&&|\|\||[-+*/(),<>])")


def formel_pruefen(ausdruck, bekannt, wo):
    """Nur Zahlen, bekannte Größen, freigegebene Zeichen und Funktionen."""
    rest, pos = str(ausdruck), 0
    while pos < len(rest):
        treffer = MARKEN.match(rest, pos)
        if not treffer:
            raise Aufgabenfehler(
                f"{wo}: unverständlicher Ausdruck „{ausdruck}“ ab Zeichen {pos + 1}")
        marke = treffer.group(1)
        pos = treffer.end()
        if marke[0].isdigit():
            continue
        if marke[0].isalpha() or marke[0] == "_":
            folgt = MARKEN.match(rest, pos)
            if folgt and folgt.group(1) == "(":
                if marke not in FORMEL_FUNKTIONEN:
                    raise Aufgabenfehler(f"{wo}: unbekannte Funktion „{marke}“ in „{ausdruck}“")
            elif marke not in bekannt:
                raise Aufgabenfehler(f"{wo}: unbekannte Größe „{marke}“ in „{ausdruck}“")
    return True


def kontenplan_lesen():
    datei = HIER / "musterunternehmen.json"
    if not datei.exists():
        return [], {}
    daten = json.loads(datei.read_text(encoding="utf-8"))
    konten, index = [], {}

    def schluessel(s):
        s = str(s).lower()
        for alt, neu in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss")):
            s = s.replace(alt, neu)
        return re.sub(r"[^a-z0-9]", "", s)

    for klasse in daten.get("kontenplan", {}).get("klassen", []):
        for k in klasse.get("konten", []):
            eintrag = {"nr": k["nr"], "name": k["name"], "klasse": klasse["nummer"]}
            if k.get("alias"):
                eintrag["alias"] = k["alias"]
            konten.append(eintrag)
            index[k["nr"]] = eintrag
            index[schluessel(k["name"])] = eintrag
            for a in k.get("alias", []):
                index[schluessel(a)] = eintrag
    index["#schluessel"] = schluessel
    return konten, index


def konto_aufloesen(bezeichner, index):
    if bezeichner in (None, ""):
        return None
    roh = str(bezeichner).strip()
    return index.get(roh) or index.get(index["#schluessel"](roh))


def belegvorlagen():
    """Die HTML-Vorlagen und ihre Vorgaben. Ohne Ordner: keine Belege, kein Fehler."""
    if not BELEGE.is_dir():
        return {}, {}
    steuer = {}
    steuerdatei = BELEGE / "belege.json"
    if steuerdatei.exists():
        steuer = json.loads(steuerdatei.read_text(encoding="utf-8")).get("vorlagen", {})
    vorlagen = {}
    for pfad in sorted(BELEGE.glob("*.html")):
        name = pfad.stem
        s = steuer.get(name, {})
        roh = pfad.read_text(encoding="utf-8")
        # Der erklärende Kopfkommentar muss weg, bevor irgendetwas gesucht wird:
        # Er nennt die Wiederholungsmarken beispielhaft, und der Renderer würde
        # sonst dieses Beispiel füllen statt der echten Tabellenzeile.
        roh = re.sub(r"^\s*<!--.*?-->\s*", "", roh, count=1, flags=re.DOTALL)
        vorlagen[name] = {
            "html": roh,
            "marke": s.get("wiederholung", {}).get("marke"),
            "saldo_fortschreiben": bool(s.get("saldo_fortschreiben")),
        }
    return vorlagen, steuer


def beleg_fuellen(anlage, steuer, wo):
    """Vorgaben und Aufgabendaten zu einem flachen Satz Platzhalterwerte.

    Die Aufgabe nennt nur, worauf es fachlich ankommt. Rechnungsdatum, IBAN und
    Kundennummer stehen trotzdem auf dem Papier — die kommen aus belege.json.
    Werte können selbst noch {platzhalter} enthalten; die füllt erst der Browser
    mit den gewürfelten Zahlen."""
    s = steuer.get(anlage["beleg"], {})
    daten = dict(anlage.get("daten") or {})
    quelle = s.get("wiederholung", {}).get("quelle")
    marke = s.get("wiederholung", {}).get("marke")

    roh = daten.pop(quelle, None) if quelle else None
    if roh is None and marke:
        einzeln = daten.pop(marke, None)
        if isinstance(einzeln, str):
            roh = [{"text": einzeln}]
        elif isinstance(einzeln, dict):
            roh = [einzeln]
    zeilen = []
    for eintrag in (roh or []):
        zeile = dict(s.get("zeilen_vorgaben") or {})
        zeile.update(eintrag if isinstance(eintrag, dict) else {"text": eintrag})
        # Eine Zeile, die ihre Seite nennt, legt ihren Betrag auf diese Seite.
        seite = zeile.pop("art", None)
        if seite and "betrag" in zeile:
            zeile[seite] = zeile.pop("betrag")
        zeilen.append({k: str(v) for k, v in zeile.items()})

    werte = dict(s.get("vorgaben") or {})
    werte.update(daten)
    return {"werte": {k: str(v) for k, v in werte.items()}, "zeilen": zeilen}


def aufgaben_sammeln(lf, kapitel_daten, konten_index, vorlagen, steuer):
    """Alle *.aufgaben.json eines Lernfelds prüfen und einsammeln."""
    kapitel_info = {k["id"]: k for k in kapitel_daten}
    begriffe = set(lf.get("begriffe", {}))
    paragraphen = set(lf.get("paragraphen", {}))
    verweis = re.compile(r"\{\{(begriff|par):([a-z0-9-]+)\|")

    kapitel_raus, bausteine_raus = [], []
    for pfad in sorted(HIER.glob("*.aufgaben.json")):
        datei = json.loads(pfad.read_text(encoding="utf-8"))
        if datei.get("lernfeld") != lf["id"]:
            continue
        kap = datei.get("kapitel")
        if kap not in kapitel_info:
            raise Aufgabenfehler(
                f"{pfad.name}: Kapitel „{kap}“ steht nicht in {lf['id']}.lernfeld.json")

        eigene = []
        for b in datei.get("bausteine", []):
            wo = f"{pfad.name} · {b.get('id', '?')}"
            for feld in ("id", "operator", "anforderungsbereich", "punkte",
                         "dauer_min", "eingabe", "bewertung"):
                if b.get(feld) in (None, ""):
                    raise Aufgabenfehler(f"{wo}: Feld „{feld}“ fehlt")
            if "hinweis_konto" in b:
                raise Aufgabenfehler(
                    f"{wo}: hinweis_konto ist ein Merkzettel und gehört nicht in den "
                    f"fertigen Bestand — Konto im Kontenplan ergänzen und Feld entfernen")

            # Formeln: nur bekannte Größen
            bekannt = set(b.get("variablen") or {})
            for name, formel in (b.get("abgeleitet") or {}).items():
                formel_pruefen(formel, bekannt, wo)
                bekannt.add(name)
            if b.get("pruefung_variablen"):
                formel_pruefen(b["pruefung_variablen"], bekannt, wo)

            # Anzeige: bekannte Blöcke, vorhandene Belege
            for a in b.get("anzeige") or []:
                if a.get("block") not in ANZEIGE_BLOECKE:
                    raise Aufgabenfehler(f"{wo}: unbekannter Anzeigeblock „{a.get('block')}“")
                if a.get("beleg"):
                    if a["beleg"] not in vorlagen:
                        raise Aufgabenfehler(
                            f"{wo}: Beleg „{a['beleg']}“ hat keine Vorlage unter quellen/belege/")
                    a["beleg_gefuellt"] = beleg_fuellen(a, steuer, wo)

            # Eingabe: bekannte Blöcke, auflösbare Konten, prüfbare Lösungen
            for e in b.get("eingabe") or []:
                if e.get("block") not in EINGABE_BLOECKE:
                    raise Aufgabenfehler(f"{wo}: unbekannter Eingabeblock „{e.get('block')}“")
                if e["block"] == "zahl" and isinstance(e.get("loesung"), str):
                    formel_pruefen(e["loesung"], bekannt, wo)
                if e["block"] == "buchungssatz":
                    for zeile in e.get("loesung") or []:
                        for seite in ("soll", "haben"):
                            if zeile.get(seite) in (None, ""):
                                continue
                            if not konto_aufloesen(zeile[seite], konten_index):
                                raise Aufgabenfehler(
                                    f"{wo}: Konto „{zeile[seite]}“ steht nicht im Kontenplan")
                        if isinstance(zeile.get("betrag"), str):
                            formel_pruefen(zeile["betrag"], bekannt, wo)

            # Verweise auf Begriffe und Paragraphen
            for art, kennung in verweis.findall(json.dumps(b, ensure_ascii=False)):
                vorhanden = begriffe if art == "begriff" else paragraphen
                if kennung not in vorhanden:
                    raise Aufgabenfehler(
                        f"{wo}: Verweis {art}:{kennung} steht nicht in {lf['id']}.lernfeld.json")

            eigene.append(dict(b, lernfeld=lf["id"], kapitel=kap,
                               konten_als=datei.get("konten_als", "nummer")))

        if not eigene:
            continue
        info = kapitel_info[kap]
        kapitel_raus.append({
            "schluessel": f'{lf["id"]}:{kap}',
            "lernfeld": lf["id"], "lernfeldTitel": lf["titel"],
            "kapitel": kap, "nummer": info["nummer"], "titel": info["titel"],
            "zu": f'{lf["id"]}.html#{kap}',
            "bausteine": len(eigene),
            "punkte": sum(b["punkte"] for b in eigene),
            "minuten": sum(b["dauer_min"] for b in eigene),
        })
        bausteine_raus += eigene
    return kapitel_raus, bausteine_raus


def aufgaben_schreiben(kapitel, bausteine, konten, vorlagen):
    kennungen = [b["id"] for b in bausteine]
    doppelt = {k for k in kennungen if kennungen.count(k) > 1}
    if doppelt:
        raise Aufgabenfehler("Doppelte Baustein-Kennungen: " + ", ".join(sorted(doppelt)))
    daten = {
        "gebaut": datetime.now().isoformat(timespec="seconds"),
        "kapitel": kapitel,
        "bausteine": bausteine,
        "kontenplan": konten,
        "belege": vorlagen,
    }
    (MITTEL / "aufgaben.json").write_text(
        json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return daten


# ---------------------------------------------------------------- Symbol

def symbole():
    """Leitet Browser-/PWA-Icons aus dem freigegebenen Original ab.

    Creme trägt das grüne Zeichen auch unter einer Systemmaske. Der Abstand
    hält die sichtbare Form innerhalb des sicheren Maskable-Bereichs.
    Immer neu rendern: Vorhandene PNGs dürfen keine alte Marke festhalten."""
    daten = base64.b64encode((MITTEL / "azubipass-symbol.png").read_bytes()).decode("ascii")
    groessen = [(f"symbol-v1-{px}.png", px) for px in (32, 180, 192, 512)]
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise SystemExit("Playwright fehlt — die freigegebenen App-Icons konnten nicht gebaut werden.")

    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, px in groessen:
            seite = b.new_page(viewport={"width": px, "height": px},
                               device_scale_factor=1)
            seite.set_content(
                '<body style="margin:0;background:#F5F5F0;display:grid;'
                'place-items:center;width:100vw;height:100vh">'
                f'<img src="data:image/png;base64,{daten}" alt="" '
                'style="display:block;width:84%;height:84%;object-fit:contain"></body>')
            seite.locator("img").evaluate("img => img.decode()")
            seite.screenshot(path=str(MITTEL / name))
            seite.close()
        b.close()
    for alt in ("symbol.svg", "symbol-180.png", "symbol-192.png", "symbol-512.png"):
        (MITTEL / alt).unlink(missing_ok=True)
    print(f"  Markensymbole: {len(groessen)} PNG aus der freigegebenen Symboldatei")
    return True


# ---------------------------------------------------------------- Rechtstexte

def rechtsseite(titel, beschreibung, inhalt, stil, kernel):
    return f'''<!DOCTYPE html>
<html lang="de">
<head>
{kopf(titel, beschreibung, stile=[stil], skripte=[kernel])}
</head>
<body data-bereich="">
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf auf-papier">
  <a class="zurueck" href="app.html#ich" aria-label="Zurück">
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
  <div class="kopf-meta">{html.escape(titel)}</div>
  <span style="width:44px"></span>
</header>
<main id="inhalt" class="schirm rechtstext">
{inhalt}
</main>
{fussleiste()}
{tableiste()}
</body>
</html>'''


def luecken(r):
    """Alle Felder, die noch auf ihren Wert warten.

    Im persönlichen, nichtkommerziellen Modus keine."""
    if r.get("nur_privat"):
        return []
    fehlt = []
    a = r.get("anbieter", {})
    for feld in ("name", "strasse", "plz_ort", "email"):
        if not a.get(feld) or a.get(feld) == PLATZHALTER:
            fehlt.append(f"anbieter.{feld}")
    return fehlt


def warnkasten(fehlt):
    if not fehlt:
        return ""
    return ('<div class="box achtung"><div class="bk">Noch nicht veröffentlichungsfertig</div>'
            '<p>In <code>quellen/rechtliches.json</code> fehlen noch: '
            + html.escape(", ".join(fehlt)) +
            '. Ohne vollständige Anbieterkennzeichnung darf diese Seite in '
            'Deutschland nicht geschäftsmäßig betrieben werden.</p></div>')


def privatkasten():
    """Steht auf der Hinweisseite im persönlichen, nichtkommerziellen Modus.

    Sie erklärt sichtbar, dass öffentliche Einsehbarkeit nicht mit einem
    geschäftsmäßigen Angebot verwechselt werden soll."""
    return ('<div class="box praxis"><div class="bk">Persönliches Open-Source-Lernprojekt</div>'
            '<p>Diese Seite und ihr Quellcode dürfen öffentlich angesehen, '
            'geteilt und als Projekt gezeigt werden. Es gibt keinen Verkauf, '
            'keine Werbung und kein Tracking. Lernen und Üben funktionieren ohne '
            'Nutzerkonto; nur die Community-Beta braucht eins.</p>'
            '<p>Der Modus <code>nur_privat</code> ist ausschließlich für ein '
            'persönliches, nichtkommerzielles Angebot gedacht. Vor einer '
            'geschäftsmäßigen oder kommerziellen Veröffentlichung muss er in '
            '<code>quellen/rechtliches.json</code> auf <code>false</code> '
            'gestellt und die Anbieterkennzeichnung vollständig ergänzt '
            'werden.</p></div>')


def impressum(r, fehlt):
    a = r.get("anbieter", {})

    def zeile(wert):
        return html.escape(wert) if wert and wert != PLATZHALTER else \
            '<em style="color:var(--warn-schrift)">— fehlt noch —</em>'

    kontakt = f'<p>E-Mail: {zeile(a.get("email"))}</p>'
    if a.get("telefon"):
        kontakt += f'<p>Telefon: {html.escape(a["telefon"])}</p>'
    ust = (f'<h2>Umsatzsteuer-Identifikationsnummer</h2><p>{html.escape(a["umsatzsteuer_id"])}</p>'
           if a.get("umsatzsteuer_id") else "")

    schriften = "".join(
        f'<li>{html.escape(s["name"])} — {html.escape(s["rechte"])}, '
        f'{html.escape(s["lizenz"])} (<a href="{html.escape(s["web"])}" '
        f'rel="noopener noreferrer" target="_blank">Lizenztext</a>)</li>'
        for s in r.get("schriften", []))

    privat = bool(r.get("nur_privat"))
    if privat:
        kopf_teil = f'''{privatkasten()}
  <div class="schirm-kopf">
    <h1>Hinweise</h1>
    <p>Wer das gebaut hat, worauf du dich verlassen kannst und worauf nicht.</p>
  </div>

  <h2>Betrieben von</h2>
  <p>{zeile(a.get("name"))} — persönliches, nichtkommerzielles Lernprojekt.</p>'''
    else:
        kopf_teil = f'''
  <div class="schirm-kopf">
    <h1>Impressum</h1>
    <p>Angaben nach § 5 Digitale-Dienste-Gesetz (DDG).</p>
  </div>

  <h2>Anbieter</h2>
  <p>{zeile(a.get("name"))}<br>
     {zeile(a.get("strasse"))}<br>
     {zeile(a.get("plz_ort"))}<br>
     {html.escape(a.get("land", "Deutschland"))}</p>

  <h2>Kontakt</h2>
  {kontakt}

  <h2>Verantwortlich für den Inhalt</h2>
  <p>{zeile(a.get("name"))}, Anschrift wie oben.</p>
  {ust}'''

    return warnkasten(fehlt) + kopf_teil + f'''

  <h2>Keine Verbindung zu IHK, AkA oder Prüfungsausschüssen</h2>
  <p>AzubiPass ist ein persönliches, nichtkommerzielles Lernprojekt. Es besteht <strong>keine</strong>
     Verbindung zu einer Industrie- und Handelskammer, zur Aufgabenstelle für
     kaufmännische Abschluss- und Zwischenprüfungen (AkA) oder zu einem
     Prüfungsausschuss. Die Inhalte sind weder amtlich noch von einer dieser
     Stellen geprüft oder freigegeben. Genannte Marken- und Kennzeichenrechte
     stehen ihren jeweiligen Inhabern zu.</p>

  <h2>Haftung für Inhalte</h2>
  <p>Die Lerninhalte wurden nach bestem Wissen erstellt. Für ihre Richtigkeit,
     Vollständigkeit und Aktualität wird keine Gewähr übernommen — insbesondere
     nicht dafür, dass die dargestellte Rechtslage zum Zeitpunkt des Lesens noch
     gilt. Die Inhalte ersetzen keine Rechts-, Steuer- oder Berufsberatung. Ein
     Prüfungserfolg wird nicht zugesichert.</p>

  <h2>Haftung für Links</h2>
  <p>Diese Seite verweist nur an wenigen Stellen auf fremde Seiten. Für deren
     Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der
     Verlinkung waren keine Rechtsverstöße erkennbar. Wird ein Verstoß bekannt,
     wird der Link entfernt.</p>

  <h2>Urheberrecht</h2>
  <p>{html.escape(r.get("inhalt", {}).get("lizenz_hinweis",
        "Die Inhalte dieser Seite unterliegen dem deutschen Urheberrecht."))}
     Zitierte Gesetzestexte sind nach § 5 UrhG gemeinfrei.</p>

  <h2>Verwendete Schriften</h2>
  <ul>{schriften}</ul>
  <p>Die Schriftdateien werden von dieser Seite selbst ausgeliefert. Beim Aufruf
     geht keine Anfrage an Google.</p>
'''


COMMUNITY_FELDER = ("supabase_vertragspartner", "supabase_garantien", "mailversand",
                    "frist_unvollstaendig", "frist_protokolle", "frist_sicherungen")


def community_luecken(r):
    """Was für die Datenschutzerklärung der Community noch fehlt – unabhängig
    von nur_privat: Sobald es Konten gibt, muss die Erklärung vollständig sein."""
    c = r.get("community", {})
    if not c.get("aktiv"):
        return []
    fehlt = [f"community.{k}" for k in COMMUNITY_FELDER
             if not c.get(k) or c.get(k) == PLATZHALTER]
    a = r.get("anbieter", {})
    for feld in ("strasse", "plz_ort", "email"):
        if not a.get(feld) or a.get(feld) == PLATZHALTER:
            fehlt.append(f"anbieter.{feld}")
    return fehlt


def datenschutz(r, fehlt):
    """Datenschutzerklärung. Mit Community nach dem Entwurf von ChatGPT
    (doku/community/uebergabe.md, Review vom 12.10.2026), Lücken sichtbar
    markiert. Ohne Community die bisherige Fassung."""
    a = r.get("anbieter", {})
    h = r.get("hosting", {})
    auf = r.get("aufsicht", {})
    c = r.get("community", {})

    def wert(x):
        return html.escape(x) if x and x != PLATZHALTER else \
            '<em style="color:var(--warn-schrift)">— fehlt noch —</em>'

    if not c.get("aktiv"):
        return datenschutz_ohne_konten(r, fehlt)

    luecken_c = community_luecken(r)
    kasten = ""
    if luecken_c:
        kasten = ('<div class="box achtung"><div class="bk">Noch nicht veröffentlichungsfertig</div>'
                  '<p>Für die Community fehlen in <code>quellen/rechtliches.json</code> noch: '
                  + html.escape(", ".join(luecken_c)) +
                  '. Bis dahin ist diese Erklärung unvollständig.</p></div>')

    return warnkasten(fehlt) + kasten + f'''
  <div class="schirm-kopf">
    <h1>Datenschutz</h1>
    <p>Datenschutzerklärung – AzubiPass und AzubiPass Social. Informationen nach
       Art. 13 der Datenschutz-Grundverordnung.</p>
  </div>

  <h2>Verantwortlicher</h2>
  <p>{wert(a.get("name"))}<br>{wert(a.get("strasse"))}<br>{wert(a.get("plz_ort"))}<br>
     E-Mail: {wert(a.get("email"))}</p>

  <h2>Lernen und Üben</h2>
  <p>Lernen und Üben funktionieren ohne Community-Konto. Dein Lernstand bleibt im
     lokalen Speicher deines Browsers und wird nicht automatisch an den
     Community-Server übertragen. Dazu gehören beispielsweise bearbeitete Kapitel,
     Antworten, Karteikarten und Lesezeichen.</p>
  <p>Du kannst diese Daten unter „Ich" zurücksetzen oder durch Löschen der
     Websitedaten entfernen. Sicherungsdateien werden auf deinem Gerät erzeugt.</p>

  <h2>Aufruf der Website</h2>
  <p>AzubiPass wird über {html.escape(h.get("dienst", "GitHub Pages"))} bereitgestellt
     ({html.escape(h.get("anbieter", ""))}, {html.escape(h.get("anschrift", ""))}).
     GitHub verarbeitet beim Seitenaufruf technische Zugriffsdaten, insbesondere
     IP-Adresse und Informationen zur Anfrage und zum verwendeten Gerät. Dies dient
     der Bereitstellung und Sicherheit der Website. Grundlage ist
     {html.escape(h.get("grundlage", "Art. 6 Abs. 1 lit. f DSGVO"))}.</p>
  <p>GitHub verarbeitet Daten auch in den USA und beschreibt hierfür unter anderem
     das EU-US Data Privacy Framework in seiner Datenschutzerklärung. Die dort
     erläuterten Aufbewahrungskriterien gelten für seine Verarbeitung.</p>

  <h2>Community-Konto und Anmeldung</h2>
  <p>Für die Community verarbeiten wir deine E-Mail-Adresse, eine interne Konto-ID
     sowie technische Anmelde- und Sitzungsinformationen. Die Anmeldung erfolgt
     über einen E-Mail-Link oder einen Anmeldecode aus der E-Mail.</p>
  <p>Für das Community-Profil verarbeiten wir deinen Anzeigenamen, optional dein
     Lehrjahr, deine Rolle, die Zuordnung zur Beta-Freischaltung sowie Angaben zur
     Alters- und Regelbestätigung und zum Erstellungszeitpunkt.</p>
  <p>Die erforderliche Kontoverarbeitung dient der Bereitstellung der von dir
     gewünschten Community und beruht auf Art. 6 Abs. 1 lit. b DSGVO. Technische
     Sicherheitsmaßnahmen dienen dem Schutz vor Missbrauch und beruhen auf
     Art. 6 Abs. 1 lit. f DSGVO.</p>
  <p>Ohne die erforderlichen Angaben ist kein Community-Profil möglich. Dein
     Lehrjahr ist freiwillig. Lernen und Üben bleiben unabhängig davon nutzbar.</p>

  <h2>Sichtbarkeit und Mindestalter</h2>
  <p>Anzeigename, optionales Lehrjahr und Rolle sind für freigeschaltete
     Community-Mitglieder lesbar. Deine E-Mail-Adresse, dein Beta-Zugang und deine
     Altersbestätigung werden anderen Mitgliedern nicht angezeigt.</p>
  <p>Die Community richtet sich an Personen ab 16 Jahren. Bei der Profilanlage
     bestätigst du das Mindestalter. Ein Geburtsdatum wird hierfür nicht
     abgefragt.</p>
  <p>Beiträge und Lerngruppen sind im hier beschriebenen Zugangspaket noch nicht
     verfügbar. Vor ihrer Einführung werden diese Informationen ergänzt.</p>

  <h2>Supabase und E-Mail-Versand</h2>
  <p>Für Konten, Anmeldung und Community-Profile verwenden wir Supabase. Die
     Projektdatenbank befindet sich in {html.escape(c.get("datenbank_region", ""))}.</p>
  <p>Vertragspartner: {wert(c.get("supabase_vertragspartner"))}. Supabase verarbeitet
     Daten nach dem für das Projekt geltenden Auftragsverarbeitungsvertrag und setzt
     Unterauftragnehmer ein. Internationale Verarbeitung kann trotz der gewählten
     Datenbankregion stattfinden. Maßgebliche Garantien und weitere Informationen:
     {wert(c.get("supabase_garantien"))}.</p>
  <p>Anmeldemails werden über {wert(c.get("mailversand"))} versendet. Dafür erhält
     der Anbieter die Empfängeradresse und die für Zustellung und Anmeldung
     erforderlichen Informationen.</p>

  <h2>Speicherung auf deinem Gerät</h2>
  <p>Die App speichert Lernstand und erforderliche Sitzungsinformationen im Browser.
     Die Sitzung ermöglicht, angemeldet zu bleiben. Das Abmelden entfernt die
     lokalen Sitzungsinformationen; dein lokaler Lernstand bleibt erhalten.</p>
  <p>Soweit diese Speicherung für die ausdrücklich gewünschten Funktionen unbedingt
     erforderlich ist, erfolgt sie auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG.</p>

  <h2>Speicherdauer und Löschung</h2>
  <p>Konten und Profile werden für die Dauer der Community-Nutzung gespeichert. Für
     unvollständige Registrierungen gilt {wert(c.get("frist_unvollstaendig"))}.
     Technische Protokolle werden nach {wert(c.get("frist_protokolle"))} gelöscht;
     Sicherungskopien nach {wert(c.get("frist_sicherungen"))}.</p>
  <p>Eine Kontolöschung kannst du über die oben genannte Kontaktadresse anfordern.
     Gesetzliche Aufbewahrungspflichten oder erforderliche Maßnahmen zur
     Rechtsverteidigung können einer sofortigen vollständigen Löschung
     entgegenstehen.</p>

  <h2>Deine Rechte</h2>
  <p>Du kannst nach den gesetzlichen Voraussetzungen Auskunft, Berichtigung,
     Löschung, Einschränkung und Datenübertragbarkeit verlangen. Gegen
     Verarbeitungen auf Grundlage berechtigter Interessen besteht ein
     Widerspruchsrecht.</p>
  <p>Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren,
     beispielsweise der {html.escape(auf.get("name", ""))}
     (<a href="{html.escape(auf.get("web", ""))}" rel="noopener noreferrer"
      target="_blank">{html.escape(auf.get("web", ""))}</a>).</p>
  <p>Die App verwendet keine Werbe- oder Reichweitenanalyse und trifft keine
     automatisierten Entscheidungen mit rechtlicher oder vergleichbar erheblicher
     Wirkung. Die Schriften werden lokal bereitgestellt.</p>

  <p class="stand">Stand: {date.today().strftime("%d.%m.%Y")}</p>
'''


def datenschutz_ohne_konten(r, fehlt):
    """Bisherige Fassung für den Fall ohne Community (community.aktiv = false)."""
    a = r.get("anbieter", {})
    h = r.get("hosting", {})
    auf = r.get("aufsicht", {})
    name = a.get("name") if a.get("name") != PLATZHALTER else "— fehlt noch —"

    return warnkasten(fehlt) + f'''
  <div class="schirm-kopf">
    <h1>Datenschutz</h1>
    <p>Informationen nach Art. 13 der Datenschutz-Grundverordnung.</p>
  </div>

  <div class="box praxis"><div class="bk">Das Wichtigste zuerst</div>
    <p>Dein Lernfortschritt bleibt auf deinem Gerät. Er wird nicht übertragen,
       nicht ausgewertet und nicht gespeichert, wo ich ihn sehen könnte. Es gibt
       keine Konten, keine Anmeldung, kein Tracking und keine Werbung.</p></div>

  <h2>Verantwortlicher</h2>
  {'<p>' + html.escape(name) + ' — persönliches, nichtkommerzielles Lernprojekt. '
   'Die App verarbeitet keinen Lernstand auf einem Server.</p>'
   if r.get("nur_privat") else
   f'<p>{html.escape(name)}<br>{html.escape(a.get("strasse", ""))}<br>'
   f'{html.escape(a.get("plz_ort", ""))}<br>'
   f'E-Mail: {html.escape(a.get("email", ""))}</p>'}

  <h2>Aufruf der Seite (Server-Protokolle)</h2>
  <p>Die Seite wird bei {html.escape(h.get("anbieter", ""))} gehostet
     ({html.escape(h.get("dienst", ""))}, {html.escape(h.get("anschrift", ""))}).
     Beim Aufruf verarbeitet der Anbieter technisch notwendige Zugriffsdaten,
     darunter deine IP-Adresse, Datum und Uhrzeit, die abgerufene Datei und den
     verwendeten Browser. Diese Verarbeitung ist zum sicheren und störungsfreien
     Betrieb erforderlich; Rechtsgrundlage ist
     {html.escape(h.get("grundlage", "Art. 6 Abs. 1 lit. f DSGVO"))}
     (berechtigtes Interesse am Betrieb der Seite). Auf Dauer und Umfang dieser
     Protokolle habe ich keinen Einfluss; sie liegen beim Anbieter. Soweit dabei
     Daten in die USA übermittelt werden, stützt sich der Anbieter auf das
     EU-US Data Privacy Framework.</p>

  <h2>Speicherung auf deinem Gerät (localStorage)</h2>
  <p>Die App legt deinen Lernstand im lokalen Speicher deines Browsers ab:
     welche Kapitel du gelesen hast, welche Antworten du angeklickt hast, was du
     in die Selbsttest-Felder geschrieben hast, den Stand deiner Karteikarten,
     deine Lesezeichen und die Tage, an denen du gelernt hast.</p>
  <p>Diese Daten verlassen dein Gerät nicht. Es handelt sich um Speicherung, die
     für den von dir ausdrücklich gewünschten Dienst unbedingt erforderlich ist
     — ohne sie wäre nach jedem Schließen alles weg. Sie ist deshalb nach
     § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei; ein Cookie-Banner gibt es hier
     bewusst nicht, weil es nichts einzuwilligen gäbe.</p>
  <p>Du löschst diese Daten jederzeit selbst: in der App unter „Ich" über
     <em>Alles zurücksetzen</em> oder in den Einstellungen deines Browsers über
     das Löschen der Websitedaten. Unter „Ich" kannst du sie außerdem als Datei
     sichern und wieder einspielen — diese Datei entsteht auf deinem Gerät und
     wird nirgendwohin geschickt.</p>

  <h2>Schriften</h2>
  <p>Alle Schriften liegen auf dem Server dieser Seite und werden von dort
     geladen. Es besteht keine Verbindung zu Google Fonts oder einem anderen
     externen Dienst.</p>

  <h2>Keine Weitergabe, keine Auswertung</h2>
  <p>Es findet keine Reichweitenmessung statt, es sind keine Analysedienste,
     sozialen Netzwerke, Karten oder Videodienste eingebunden, und es werden
     keine Daten an Dritte weitergegeben oder für automatisierte
     Entscheidungen einschließlich Profiling verwendet.</p>

  <h2>Deine Rechte</h2>
  <p>Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung
     (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
     (Art. 20) und Widerspruch (Art. 21 DSGVO). Da ich außer den beim Hoster
     anfallenden Protokollen keine personenbezogenen Daten verarbeite, kann ich
     zu deinem Lernstand allerdings gar keine Auskunft geben — ich habe ihn
     nicht.</p>
  <p>Unabhängig davon steht dir ein Beschwerderecht bei einer
     Datenschutz-Aufsichtsbehörde zu, etwa bei der
     {html.escape(auf.get("name", ""))}
     (<a href="{html.escape(auf.get("web", ""))}" rel="noopener noreferrer"
      target="_blank">{html.escape(auf.get("web", ""))}</a>).</p>

  <p class="stand">Stand: {date.today().strftime("%d.%m.%Y")}</p>
'''


# ---------------------------------------------------------------- App-Seite

def app_seite(stil, kernel, appjs, aufgabenjs, lernfelder, communityjs, ansichtjs, beitraegejs, moderationjs):
    """Die Schale. Der Inhalt der fünf Schirme entsteht im Browser aus
    inhalt.json — hier steht nur das Gerüst, damit die Seite auch ohne
    JavaScript etwas Sinnvolles zeigt."""
    ohne_js = "".join(
        f'<li><a class="reihe" href="{lf["seite"]}"><span class="reihe-oben">'
        f'<span class="reihe-titel">{html.escape(lf["titel"])}</span></span></a></li>'
        for lf in lernfelder)
    return f'''<!DOCTYPE html>
<html lang="de">
<head>
{kopf("Lernen", "Alle Lernfelder für Kaufleute für Büromanagement — Fortschritt, "
      "Karteikarten und Suche, auch ohne Netz.", stile=[stil],
      skripte=[kernel, communityjs, ansichtjs, beitraegejs, moderationjs, aufgabenjs, appjs])}
</head>
<body data-bereich="heute">
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf auf-papier" id="kopf">
  <button class="zurueck" id="zurueck" aria-label="Zurück" hidden>
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <div class="kopf-meta" id="kopfMeta">{MARKE}</div>
  <a class="kopf-suche" href="#suche" aria-label="Suchen">{LUPE}</a>
</header>

<main id="inhalt">
  <section class="schirm" id="heute"></section>
  <section class="schirm" id="lernen" hidden></section>
  <section class="schirm" id="ueben" hidden></section>
  <section class="schirm" id="suche" hidden></section>
  <section class="schirm" id="ich" hidden></section>
  <section class="schirm" id="community" hidden></section>
  <noscript>
    <div class="schirm">
      <div class="schirm-kopf"><h1>{MARKE}</h1>
      <p>Für Fortschritt, Karteikarten und Suche braucht diese Seite JavaScript.
         Die Lernzettel selbst kannst du auch ohne lesen:</p></div>
      <ul class="liste-schlicht">{ohne_js}</ul>
    </div>
  </noscript>
</main>
{fussleiste()}
{tableiste()}
</body>
</html>'''


# ---------------------------------------------------------------- Manifest & SW

def manifest():
    return json.dumps({
        "name": f"{MARKE} · Lernzettel",
        "short_name": MARKE,
        "description": "Lernzettel und Prüfungstraining für Kaufleute für Büromanagement.",
        "start_url": "app.html",
        "scope": "./",
        "display": "standalone",
        "orientation": "portrait-primary",
        "lang": "de",
        "dir": "ltr",
        "background_color": "#F5F5F0",
        "theme_color": "#12301F",
        "categories": ["education"],
        "icons": [
            {"src": "mittel/symbol-v1-192.png", "sizes": "192x192", "type": "image/png",
             "purpose": "any maskable"},
            {"src": "mittel/symbol-v1-512.png", "sizes": "512x512", "type": "image/png",
             "purpose": "any maskable"},
        ],
        "shortcuts": [
            {"name": "Weiterlernen", "url": "app.html#heute"},
            {"name": "Karteikarten", "url": "app.html#ueben"},
            {"name": "Suche", "url": "app.html#suche"},
        ],
    }, ensure_ascii=False, indent=2)


# Der Zwischenspeicher (sw.js) entsteht in gemeinsames.py, nach jedem Bauschritt.


# ---------------------------------------------------------------- Community-Regeln

def community_regeln():
    """Liest den freigegebenen Regeltext aus doku/community/03-community-regeln.md.

    Eine Quelle: ChatGPT und Lukes pflegen den Text dort, die App zeigt genau
    ihn – ab „## Unsere Community-Regeln", ohne die Metadaten darüber."""
    datei = HIER.parent / "doku" / "community" / "03-community-regeln.md"
    text = datei.read_text(encoding="utf-8")
    if "## Unsere Community-Regeln" not in text:
        raise SystemExit(f"{datei}: Abschnitt „## Unsere Community-Regeln“ fehlt.")
    teil = text.split("## Unsere Community-Regeln", 1)[1]
    einleitung, regeln, aktuell = [], [], None
    for zeile in teil.splitlines():
        z = zeile.strip()
        if not z:
            continue
        m = re.match(r"^\d+\.\s+\*\*(.+?)\*\*\s*$", z)
        if m:
            aktuell = {"titel": m.group(1).strip(), "text": ""}
            regeln.append(aktuell)
        elif aktuell is not None:
            aktuell["text"] = (aktuell["text"] + " " + z).strip()
        else:
            einleitung.append(z)
    if len(regeln) != 8:
        raise SystemExit(f"{datei}: erwartet 8 Regeln, gefunden {len(regeln)}.")
    return {"einleitung": " ".join(einleitung), "regeln": regeln,
            "quelle": "doku/community/03-community-regeln.md"}


# ---------------------------------------------------------------- Aufbau

def baue():
    if not schriften_lokal():
        print("ACHTUNG: mittel/schriften.css fehlt — erst schriften.py laufen lassen.\n")

    MITTEL.mkdir(parents=True, exist_ok=True)
    stil, kernel, appjs, aufgabenjs, verhalten, communityjs, ansichtjs, beitraegejs, moderationjs, _ = veroeffentliche(
        "azubipass.css", "kern.js", "app.js", "aufgaben.js", "azubipass.js",
        # supabase.js wird nicht eingebunden, sondern erst bei Bedarf von
        # community.js nachgeladen – liegt aber im Zwischenspeicher bereit.
        "community.js", "community-ansicht.js", "community-beitraege.js", "community-moderation.js", "supabase.js")

    konten, konten_index = kontenplan_lesen()
    belege, belege_steuer = belegvorlagen()

    lernfelder, karten, quiz, tests, suche, begriffe = [], [], [], [], [], {}
    pk_kapitel, pk_bausteine = [], []
    cfg = json.loads((HIER / "landing.config.json").read_text(encoding="utf-8"))
    vokabelbloecke = vokabeln_lesen()

    for datei in lernfeld_dateien():
        lf, kapitel_daten, fehlend = lade(datei)
        if not kapitel_daten:
            continue
        seite = AUSGABE / f'{lf["id"]}.html'
        if not seite.exists():
            print(f"  übersprungen (nicht gebaut): {lf['id']}")
            continue

        k, b = aufgaben_sammeln(lf, kapitel_daten, konten_index, belege, belege_steuer)
        pk_kapitel += k
        pk_bausteine += b
        nummer = next((x["nr"] for x in cfg["lernfelder"]
                       if x.get("quelle") == datei.name), None)
        kurz = lernfeld_aliases(lf)[0]

        lernfelder.append({
            "id": lf["id"],
            "titel": lf["titel"],
            "nummer": nummer,
            "kurz": kurz,
            "seite": f'{lf["id"]}.html',
            "minuten": sum(k.get("minuten", 0) for k in kapitel_daten),
            "kapitel": [{"id": k["id"], "nummer": k["nummer"], "titel": k["titel"],
                         "minuten": k.get("minuten", 0)} for k in kapitel_daten],
        })
        karten += karten_sammeln(lf, kapitel_daten)
        quiz += quiz_sammeln(lf, kapitel_daten)
        tests += tests_sammeln(lf, kapitel_daten)
        suche += suche_sammeln(lf, kapitel_daten)
        for e in begriffe_sammeln(lf):
            begriffe[e["id"]] = e

    inhalt = {
        "gebaut": datetime.now().isoformat(timespec="seconds"),
        "pruefung": cfg["pruefung"]["naechster_termin"],
        "pruefungName": cfg["pruefung"]["bezeichnung"],
        "lernfelder": lernfelder,
        "karten": karten,
        "quiz": quiz,
        "tests": tests,
        "begriffe": sorted(begriffe.values(), key=lambda e: e["titel"].lower()),
        "vokabeln": vokabelbloecke,
        "communityRegeln": community_regeln(),
    }
    (MITTEL / "inhalt.json").write_text(
        json.dumps(inhalt, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (MITTEL / "suche.json").write_text(
        json.dumps(suche, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    aufgaben_schreiben(pk_kapitel, pk_bausteine, konten, belege)

    symbole()
    (AUSGABE / "manifest.webmanifest").write_text(manifest(), encoding="utf-8")
    # Direkt im Home-Menü starten, auch an der Wurzel der Projektseite.
    # app.html bleibt für bestehende Links und installierte Apps erhalten.
    app = app_seite(stil, kernel, appjs, aufgabenjs, lernfelder, communityjs, ansichtjs, beitraegejs, moderationjs)
    for name in ("index.html", "app.html"):
        (AUSGABE / name).write_text(app, encoding="utf-8")

    # Was der Build einmal erzeugt hat und heute nicht mehr erzeugt, räumt er
    # selbst weg. docs/ ist Ausgabe — dort von Hand aufzuräumen hieße, sich beim
    # nächsten Bau darauf zu verlassen, dass es jemand wieder tut.
    for veraltet in ("vorschau-aufgaben.html", "entwurf-start.html"):
        pfad = AUSGABE / veraltet
        if pfad.exists():
            pfad.unlink()
            print(f"  entfernt (kein Bauergebnis mehr): {veraltet}")

    r = rechtliches()
    fehlt = luecken(r)
    titel = "Hinweise" if r.get("nur_privat") else "Impressum"
    (AUSGABE / "impressum.html").write_text(
        rechtsseite(titel, "Wer das gebaut hat und worauf du dich verlassen kannst."
                    if r.get("nur_privat") else "Anbieterkennzeichnung nach § 5 DDG.",
                    impressum(r, fehlt), stil, kernel), encoding="utf-8")
    (AUSGABE / "datenschutz.html").write_text(
        rechtsseite("Datenschutz", "Wie diese Seite mit Daten umgeht.",
                    datenschutz(r, fehlt), stil, kernel), encoding="utf-8")

    # Vorrat für den Zwischenspeicher: alles, was die App offline braucht –
    # mit Prüfwert je Datei (Gesamtaudit A04). build_landing.py schreibt ihn
    # nach seinem Teil erneut, damit die Prüfwerte zum fertigen Stand passen.
    dateien = zwischenspeicher_schreiben()

    gewicht = sum((AUSGABE / d).stat().st_size for d in dateien
                  if d != "./" and (AUSGABE / d).exists())
    print(f"  {len(lernfelder)} Lernfelder · {len(karten)} Karten · {len(quiz)} Übungen · "
          f"{len(suche)} Suchabschnitte · {len(inhalt['begriffe'])} Begriffe")
    print(f"  Probeklausur: {len(pk_kapitel)} Kapitel mit Aufgaben · "
          f"{len(pk_bausteine)} Bausteine · "
          f"{sum(b['punkte'] for b in pk_bausteine)} Punkte · "
          f"{len(konten)} Konten · {len(belege)} Belegvorlagen")
    print(f"  App gebaut → app.html, manifest, sw.js ({len(dateien)} Dateien, "
          f"{gewicht // 1024} kB offline)")

    if fehlt:
        print("\n  ACHTUNG: Die Seite ist noch nicht veröffentlichungsfertig.")
        print("  In quellen/rechtliches.json fehlt: " + ", ".join(fehlt))
        print("  Ohne diese Angaben darf sie nicht geschäftsmäßig betrieben werden.")
        return 1
    luecken_c = community_luecken(r)
    if luecken_c:
        print("  Datenschutz (Community) unvollständig, es fehlt: " + ", ".join(luecken_c))
    if r.get("nur_privat"):
        print("\n  Hinweis: nur_privat steht auf true — öffentlich vorzeigbares,")
        print("  persönliches und nichtkommerzielles Lernprojekt. Vor geschäftsmäßiger")
        print("  oder kommerzieller Veröffentlichung auf false stellen und Angaben ergänzen.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(baue())
    except Aufgabenfehler as fehler:
        print("\n  ABBRUCH: Die Aufgabendaten sind nicht in Ordnung.")
        print(f"  {fehler}")
        print("  Nichts wurde geschrieben, was davon abhängt. Erst die Quelle")
        print("  unter quellen/ berichtigen, dann neu bauen.")
        sys.exit(1)
