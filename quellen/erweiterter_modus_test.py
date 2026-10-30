#!/usr/bin/env python3
"""
AzubiPass · Abnahme Erweiterter Modus (A01–A26 der Übergabe vom 27.10.2026)

    python3 erweiterter_modus_test.py
    AXE_PFAD=…/axe.min.js python3 erweiterter_modus_test.py   # mit Barrierefreiheitsscan

Prüft die drei Piloten (LF 4 K3 b1, LF 3 K2 b2, LF 2 K2 b2) und den Altbestand
im gebauten Stand unter docs/. Läuft gegen einen lokalen Server, Service Worker
blockiert. A24 (Vertrag) wird direkt gegen vertiefung.pruefe geprüft.
Rückgabewert 1 bei einem Fehler.
"""

import copy
import functools
import http.server
import json
import os
import re
import socketserver
import subprocess
import sys
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

HIER = Path(__file__).resolve().parent
DOCS = HIER.parent / "docs"
sys.path.insert(0, str(HIER))
import vertiefung  # noqa: E402

fehler = []


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Diener(http.server.SimpleHTTPRequestHandler):
    anfragen = []

    def log_message(self, *a):
        pass

    def do_GET(self):
        Diener.anfragen.append(self.path)
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


ZUSTAND = """(sel) => {
  const s = document.querySelector(sel);
  const voll = document.getElementById(s.getAttribute('aria-controls'));
  const kurz = []; let n = s.nextElementSibling;
  while (n && n.tagName !== 'H3' && !n.classList.contains('zus')) {
    if (n.classList.contains('kurztext')) kurz.push(n.hidden); n = n.nextElementSibling; }
  return { expanded: s.getAttribute('aria-expanded'), text: s.textContent.trim(),
           offen: !voll.hidden, kurztextVersteckt: kurz.length ? kurz.every(Boolean) : null,
           detailsOffen: voll.querySelectorAll('details[open]').length };
}"""


def zustand(pg, kapitel, abschnitt):
    return pg.evaluate(ZUSTAND, f'#{kapitel} .abschnitt-schalter[aria-controls^="{kapitel}-{abschnitt}-"]:not(.abschnitt-schalter-ende)')


def schalter(kapitel, abschnitt):
    return f'#{kapitel} .abschnitt-schalter[aria-controls^="{kapitel}-{abschnitt}-"]:not(.abschnitt-schalter-ende)'


def statisch():
    print("Statisch · Ausgabe, Kennungen, Index")
    # Kapitelschalter nur dort, wo es etwas zu vertiefen gibt (A05)
    ohne, mit = 0, 0
    for seite in sorted(DOCS.glob("*.html")):
        t = seite.read_text(encoding="utf-8")
        for m in re.finditer(r'<section class="kapitel" id="(k\d+)"(.*?)</section>', t, re.S):
            hat_k = 'class="detail-schalter"' in m.group(2)
            hat_a = 'class="abschnitt-schalter"' in m.group(2)
            if hat_k != hat_a:
                ohne += 1
            mit += 1
    pruefe(ohne == 0, f"A05 Kapitelschalter genau dann, wenn ein Abschnitt vertiefbar ist ({mit} Kapitel)", ohne)

    # Alle Lernfeldseiten (beide Berufe) aus den Registern
    seiten = sorted(json.loads(r.read_text(encoding="utf-8"))["id"] + ".html" for r in HIER.glob("*.lernfeld.json"))

    # Keine doppelten DOM-IDs auf allen Lernfeldseiten
    for name in seiten:
        t = (DOCS / name).read_text(encoding="utf-8")
        ids = re.findall(r'\sid="([^"]+)"', t)
        doppelt = sorted({i for i in ids if ids.count(i) > 1})
        pruefe(not doppelt, f"{name}: keine doppelte DOM-ID", doppelt[:4])

    # Übungs-/Kartenkennungen gegenüber main (Basis d0cfb8a): keine alte Kennung fehlt,
    # Reihenfolge der alten bleibt; neue Hauptabschnitte dürfen neue Kennungen ergänzen.
    def teilfolge(alt, neu):
        it = iter(neu)
        return all(x in it for x in alt)
    for name in seiten:
        try:
            alt = subprocess.run(["git", "show", f"d0cfb8a:docs/{name}"], cwd=HIER.parent,
                                 capture_output=True, text=True, check=True).stdout
        except Exception:
            print(f"  (übersprungen: d0cfb8a nicht im Repo) {name}")
            continue
        neu = (DOCS / name).read_text(encoding="utf-8")
        muster = r'class="(?:check rein|karte|zuordnen rein|frage|zu-reihe)" id="([^"]+)"'
        a, n = re.findall(muster, alt), re.findall(muster, neu)
        fehlt = sorted(set(a) - set(n))
        pruefe(not fehlt and teilfolge(a, n), f"{name}: alte Kennungen erhalten ({len(a)} alt, {len(n) - len(a)} neu)", fehlt[:3])
        oa, on = re.findall(r'data-option-id="([^"]+)"', alt), re.findall(r'data-option-id="([^"]+)"', neu)
        pruefe(not (set(oa) - set(on)) and teilfolge(oa, on), f"{name}: alte Antwort-Kennungen erhalten")

    # A26: Jede Vollfassungsebene hat einen Suchtreffer und umgekehrt
    suche = json.loads((DOCS / "mittel" / "suche.json").read_text(encoding="utf-8"))
    ziele = {e["zu"] for e in suche if "ansicht=ausfuehrlich" in e["zu"]}
    erwartet = set()
    for name in seiten:
        t = (DOCS / name).read_text(encoding="utf-8")
        for m in re.finditer(r'<div class="vollfassung" id="(k\d+)-([a-z0-9]+)-voll"(.*?)<button class="abschnitt-schalter abschnitt-schalter-ende"', t, re.S):
            kap, ab, innen = m.groups()
            erwartet.add(f"{name}?ansicht=ausfuehrlich#{kap}-{ab}")
            for d in re.findall(r'data-detail="([^"]+)"', innen):
                erwartet.add(f"{name}?ansicht=ausfuehrlich&detail={d}#{kap}-{ab}")
    pruefe(ziele == erwartet, f"A26 Suchindex und HTML synchron ({len(erwartet)} Ziele)",
           sorted(ziele ^ erwartet)[:3])
    # Eine Antwort gilt nur dann als verraten, wenn ihr Text im Index steht, aber nirgends sonst
    # sichtbar auf der Seite (gleichlautende Sätze aus dem Haupttext verraten nichts).
    antworten, verraten = [], []
    for name in seiten:
        t = (DOCS / name).read_text(encoding="utf-8")
        eigene = [re.sub(r"<[^>]+>", "", x)[:60] for x in
                  re.findall(r'<details class="vf-antwort"><summary>Antwort anzeigen</summary><p>(.*?)</p>', t)]
        sichtbar = re.sub(r"<[^>]+>", " ", re.sub(r'<details class="vf-antwort">.*?</details>', " ", t, flags=re.S))
        sichtbar = re.sub(r"\s+", " ", sichtbar)
        antworten += eigene
        verraten += [a for a in eigene if a[:50] not in sichtbar and any(a[:50] in e["x"] for e in suche)]
    pruefe(antworten and not verraten, f"A13 Antworten stehen nicht im Suchindex ({len(antworten)} Antworten)", verraten[:2])

    # A25: Inhalte der Muster
    lf4 = (DOCS / "lf4.html").read_text(encoding="utf-8")
    pruefe("922,00 €" in lf4 and "930 €" in lf4 and "940 €" in lf4 and "920 €" in lf4,
           "A25 Pilot A: 922 / 930 / 940 / Fehlrechnung 920 enthalten")
    lf3 = (DOCS / "lf3.html").read_text(encoding="utf-8")
    pruefe("§ 150 Abs. 2 BGB" in lf3 and "Ablehnung, verbunden mit einem neuen Antrag" in lf3,
           "A25 Pilot B: abändernde Annahme = Ablehnung + neuer Antrag")
    lf2 = (DOCS / "lf2.html").read_text(encoding="utf-8")
    pruefe("nicht automatisch Weisungsbefugnis" in lf2 and "Wenn der Drucker für den Versand ausfällt" in lf2,
           "A25 Pilot C: Befugnisgrenze und situationsabhängiger Gegenfall")
    pruefe("Das Pareto-Prinzip als Denkhilfe" in lf2,
           "Pilot C: Pareto-Absatz der Kurzfassung bleibt in der Vollfassung erreichbar")


def vertrag():
    print("A24 · Vertrag bricht den Build mit Fundstelle ab")
    ch = json.loads((HIER / "lf4-k3-angebotsvergleich.kapitel.json").read_text(encoding="utf-8"))
    lf = {"id": "lf4"}
    vf_ids = {x["abschnitt"] for x in ch["ausfuehrlich"]["abschnitte"] if vertiefung.ist_vollfassung(x)}
    angenommen = set(vertiefung.pruefe(ch, lf, "lf4-k3"))
    pruefe("b1" in angenommen and angenommen == vf_ids, f"Gültiger Pilot und alle aktuellen Vollfassungen angenommen {sorted(angenommen)}")

    def faellt(aendern, text):
        c = copy.deepcopy(ch)
        e = [x for x in c["ausfuehrlich"]["abschnitte"] if x.get("darstellung") == "vollfassung"][0]
        aendern(c, e)
        try:
            vertiefung.pruefe(c, lf, "lf4-k3-angebotsvergleich.kapitel.json")
            pruefe(False, text, "kein Abbruch")
        except vertiefung.Vertragsfehler as f:
            meldung = str(f)
            pruefe("lf4-k3-angebotsvergleich.kapitel.json" in meldung, text, meldung.strip().split(": ", 1)[-1][:70])

    faellt(lambda c, e: e.update(abschnitt="b9"), "Fehlender Abschnitt")
    faellt(lambda c, e: e["inhalt"].append({"typ": "absatz", "id": "a-warum-1", "text": "x"}), "Doppelte id")
    faellt(lambda c, e: e["inhalt"].append({"typ": "html", "id": "neu", "text": "x"}), "Unbekannte Blockart")
    faellt(lambda c, e: e["inhalt"].append({"typ": "basis", "id": "neu", "ref": "grafik-7"}), "basis-Verweis ins Leere")
    faellt(lambda c, e: e["inhalt"].append({"typ": "basis", "id": "neu", "ref": "grafik-1"}), "basis-Verweis doppelt")
    faellt(lambda c, e: c["ausfuehrlich"].pop("format"), "format 2 fehlt")
    faellt(lambda c, e: e["verstaendnisfragen"][0].pop("antwort"), "Frage ohne getrennte Antwort")
    faellt(lambda c, e: e["details"][0].update(kategorie="extra"), "Unbekannte Detailkategorie")
    faellt(lambda c, e: e["details"][3]["inhalt"][1].update(ziele=["lf99:k1"]), "Verweis auf unbekanntes Lernfeld")
    faellt(lambda c, e: e["details"][3]["inhalt"][1].update(ziele=["ik2024-lf04:k01"]), "Verweis in fremden Beruf")
    faellt(lambda c, e: c["ausfuehrlich"]["abschnitte"].append({"abschnitt": "b1", "erklaerung": "alt"}),
           "Vollfassung und Alteintrag für denselben Abschnitt")
    faellt(lambda c, e: e["inhalt"].__setitem__(slice(None), [x for x in e["inhalt"] if x["typ"] != "absatz"]),
           "M01 streng: Vollfassung ohne eigenen Absatz")
    faellt(lambda c, e: e["inhalt"].__setitem__(slice(None), [x for x in e["inhalt"] if x.get("ref") != "merke-1"]),
           "M02 Originalblock ohne Platz in der Vollfassung")
    faellt(lambda c, e: c["ausfuehrlich"].update(format=3), "E01 unbekanntes format")

    print("G03 · E01 · Fehlerhafte Kennzeichnung bricht ab, echtes Altformat bleibt")
    for datei, lfid in (("lf4-k3-angebotsvergleich.kapitel.json", "lf4"),
                        ("lf3-k2-vertrag.kapitel.json", "lf3"),
                        ("lf2-k2-zeitmanagement.kapitel.json", "lf2")):
        c = json.loads((HIER / datei).read_text(encoding="utf-8"))
        for art, aendern in (("Tippfehler vollfasung", lambda e: e.update(darstellung="vollfasung")),
                             ("Kennzeichen fehlt", lambda e: e.pop("darstellung"))):
            c2 = copy.deepcopy(c)
            e = [x for x in c2["ausfuehrlich"]["abschnitte"] if x.get("darstellung") == "vollfassung"][0]
            ab = e["abschnitt"]
            aendern(e)
            try:
                vertiefung.pruefe(c2, {"id": lfid}, datei)
                pruefe(False, f"E01 {datei} · {art}", "kein Abbruch")
            except vertiefung.Vertragsfehler as f:
                m = str(f)
                pruefe(datei in m and f"Abschnitt {ab}" in m, f"E01 {datei} · {art}: Abbruch mit Datei und Abschnitt",
                       m.strip().split(": ", 1)[-1][:60])
    # Altformat bleibt gültig und liefert keine Vollfassung: feste Testfixture aus einem
    # echten Kapitel, dessen ausfuehrlich-Block durch einen Eintrag im alten Format ersetzt wird
    alt = copy.deepcopy(ch)
    alt["ausfuehrlich"] = {"einleitung": "Alte Einleitung.",
                           "abschnitte": [{"abschnitt": "b1", "vorauswissen": ["Vorwissen."],
                                           "erklaerung": "Alte Erklärung.", "beispiele": ["Beispiel."],
                                           "merksatz": "Merksatz."}]}
    pruefe(vertiefung.pruefe(alt, {"id": "lf4"}, "fixture-altformat") == {}, "E01 Altformat (Fixture) bleibt gültig, keine Vollfassung")
    # Im gebauten Lerninhalt kein Python-Objekttext aus Fragen
    roh = "".join((DOCS / f).read_text(encoding="utf-8") for f in ("lf2.html", "lf3.html", "lf4.html"))
    pruefe("{'id':" not in roh and "'frage':" not in roh, "E01 Kein Objekttext im erzeugten Lerninhalt")


def browser(w):
    axe = os.environ.get("AXE_PFAD")
    with sync_playwright() as p:
        b = p.chromium.launch()
        ktx = b.new_context(viewport={"width": 1280, "height": 800}, service_workers="block", locale="de-DE")
        pg = ktx.new_page()
        seitenfehler = []
        pg.on("pageerror", lambda e: seitenfehler.append(str(e)))

        # ------------------------------------------------ A01 Altbestand
        print("A01 · Altbestand")
        # erstes noch nicht umgestelltes Kapitel suchen (Altzusatz „-mehr“)
        alt_ziel = None
        for r in sorted(HIER.glob("*.lernfeld.json")):
            name = json.loads(r.read_text(encoding="utf-8"))["id"] + ".html"
            m = re.search(r'id="(k\d+)-([a-z0-9]+)-mehr"', (DOCS / name).read_text(encoding="utf-8"))
            if m:
                alt_ziel = (name, m.group(1), m.group(2))
                break
        if alt_ziel is None:
            print("  (übersprungen: kein Altbestand mehr auf den Seiten; Altformat wird im Vertragstest per Fixture geprüft)")
        else:
            name, kap, ab = alt_ziel
            pg.goto(f"{w}/{name}#{kap}")
            pg.wait_for_selector(f"#{kap}:not([hidden])")
            s = schalter(kap, ab)
            pruefe(pg.locator(s).count() == 1, f"Altabschnitt hat einen Abschnittsschalter ({name} {kap}-{ab})")
            pg.click(s)
            z = pg.evaluate(f"() => !document.getElementById('{kap}-{ab}-mehr').hidden")
            pruefe(z, "Altzusatz „Mehr Erklärung“ öffnet sich weiterhin")
            pruefe(pg.evaluate(f"() => document.querySelectorAll('#{kap} p.rein:not([hidden])').length > 0"),
                   "Grundtext bleibt sichtbar (Altzusatz ergänzt, ersetzt nicht)")
            pg.click(s)

        # ------------------------------------------------ A02–A04, A08 Pilot A
        print("A02–A04 · Abschnitt und Kapitel")
        pg.goto(f"{w}/lf4.html#k3")
        pg.wait_for_selector("#k3:not([hidden])")
        alle = pg.locator("#k3 .abschnitt-schalter:not(.abschnitt-schalter-ende)").count()
        pruefe(pg.locator("#k3 .detail-schalter").inner_text().strip() == "Ganzes Kapitel ausführlich lesen",
               "Kapitelschalter-Text kompakt")
        # A08 vorbereiten: Grafik markieren und Wert ändern
        pg.evaluate("""() => { const g = document.querySelector('#k3 .basis-block[data-basis="grafik-1"] .sig');
            g.__marke = 'gleich'; const i = g.querySelector('input'); if (i) { i.value = '15';
            i.dispatchEvent(new Event('input', {bubbles: true})); } }""")
        vorher = pg.evaluate("() => { const i = document.querySelector('#k3 .basis-block .sig input'); return i ? i.value : null; }")
        pg.click(schalter("k3", "b1"))
        z1 = zustand(pg, "k3", "b1")
        z2 = zustand(pg, "k3", "b2")
        pruefe(z1["offen"] and z1["expanded"] == "true" and z1["text"] == "Kompakt anzeigen", "A02 Pilot A offen, Schalter „Kompakt anzeigen“", z1)
        pruefe(z1["kurztextVersteckt"] is True, "A02 Erklärende Kurzabsätze werden ersetzt")
        pruefe(not z2["offen"], "A02 Nachbarabschnitt bleibt kompakt")
        stand = pg.locator("#k3 .vertiefung-stand").inner_text().strip()
        pruefe(stand == f"1 von {alle} Abschnitten ausführlich geöffnet", "Mischzustand wird benannt", stand)
        info = pg.evaluate("""() => { const g = document.querySelector('#k3 .sig[data-grafik="kalkulationsleiter"]');
            const i = g.querySelector('input');
            return { inVoll: !!g.closest('.vollfassung'), marke: g.__marke, wert: i ? i.value : null,
                     anzahl: document.querySelectorAll('#k3 .sig[data-grafik="kalkulationsleiter"]').length }; }""")
        pruefe(info["inVoll"] and info["marke"] == "gleich" and info["anzahl"] == 1,
               "A08 Grafik in die Vollfassung verschoben – dieselbe Instanz, genau einmal", info)
        pruefe(info["wert"] == vorher, "A08 Eingabewert der Grafik bleibt erhalten", info["wert"])

        pg.click("#k3 .detail-schalter")
        offen = [zustand(pg, "k3", a) for a in ("b1", "b2", "b3")]
        pruefe(all(x["offen"] for x in offen), "A03 Alle Hauptvertiefungen offen")
        pruefe(sum(x["detailsOffen"] for x in offen) == 0, "A03 Details und Antworten bleiben zu")
        pruefe(pg.locator("#k3 .detail-schalter").inner_text().strip() == "Ganzes Kapitel kompakt lesen"
               and pg.locator("#k3 .vertiefung-stand").inner_text().strip() == "",
               "A03 Kapitelschalter „kompakt lesen“, kein Mischtext")
        pg.click(schalter("k3", "b2"))
        stand = pg.locator("#k3 .vertiefung-stand").inner_text().strip()
        pruefe(stand == f"{alle - 1} von {alle} Abschnitten ausführlich geöffnet"
               and zustand(pg, "k3", "b1")["offen"] and zustand(pg, "k3", "b3")["offen"],
               "A04 Einen schließen: Rest bleibt offen, Mischtext stimmt", stand)
        pg.click("#k3 .detail-schalter")   # öffnet b2 wieder (nicht alle offen)
        pg.click("#k3 .detail-schalter")   # schließt alle
        info = pg.evaluate("""() => { const g = document.querySelector('#k3 .sig[data-grafik="kalkulationsleiter"]');
            const i = g.querySelector('input'); return { inVoll: !!g.closest('.vollfassung'),
            marke: g.__marke, wert: i ? i.value : null }; }""")
        pruefe(not info["inVoll"] and info["marke"] == "gleich" and info["wert"] == vorher,
               "A08 Beim Schließen zurück an den alten Platz, Zustand erhalten", info)

        # ------------------------------------------------ A06, A07, A19
        print("A06 · A07 · A19 · Details, Antworten, Rückweg")
        pg.click(schalter("k3", "b1"))
        pg.click("#k3-b1-d-a-ohne-skonto > summary")
        pruefe(pg.evaluate("() => document.getElementById('k3-b1-d-a-ohne-skonto').open"), "A06 Detail lässt sich öffnen")
        pg.click(schalter("k3", "b1"))
        pg.click(schalter("k3", "b1"))
        pruefe(not pg.evaluate("() => document.getElementById('k3-b1-d-a-ohne-skonto').open"),
               "A06 Nach Schließen/Öffnen des Abschnitts ist das Detail wieder zu")
        ant = "#k3-b1-f-a1 details.vf-antwort"
        pruefe(not pg.evaluate(f"() => document.querySelector('{ant}').open"), "A07 Antwort zunächst verborgen")
        pg.click(f"{ant} > summary")
        pg.wait_for_timeout(100)   # toggle-Ereignis ist asynchron
        pruefe(pg.evaluate(f"() => document.querySelector('{ant}').open")
               and pg.inner_text(f"{ant} > summary").strip() == "Antwort ausblenden",
               "A07 Antwort bewusst aufklappbar, Beschriftung folgt")
        pruefe(pg.evaluate("() => !Object.keys(AP.stand).some(k => /vf|vollfassung/i.test(k))"),
               "A07/A10 Kein neuer Lernstandseintrag durch die Ansicht")
        # A19: am Ende zurückschalten (per Tastatur)
        pg.focus("#k3-b1-voll .abschnitt-schalter-ende")
        pg.keyboard.press("Enter")
        r = pg.evaluate("""() => { const h = document.getElementById('k3-b1'); const t = h.getBoundingClientRect().top;
            const a = document.activeElement; return { top: t, h: innerHeight,
            fokusStart: a.matches('.abschnitt-schalter:not(.abschnitt-schalter-ende)') && a.dataset.abschnitt === 'b1',
            fokusVersteckt: !!a.closest('[hidden]'), y: scrollY }; }""")
        pruefe(r["fokusStart"] and not r["fokusVersteckt"], "A19 Fokus auf dem sichtbaren Abschnittsschalter", r)
        pruefe(0 <= r["top"] < r["h"] and r["y"] > 100, "A19 Überschrift im Blick, nicht an den Seitenanfang gesprungen", r)

        # ------------------------------------------------ A09, A10 Check in Pilot B
        print("A09 · A10 · Check und Lernstand")
        pg.goto(f"{w}/lf3.html#k2")
        pg.wait_for_selector("#k2:not([hidden])")
        cid = pg.evaluate("() => document.querySelector('#k2 .check').id")
        pg.click(f"#{cid} .opt[data-richtig='1']")
        vorher = pg.evaluate("() => JSON.stringify(AP.kapitelfach('lf3','k2').checks)")
        for _ in range(3):
            pg.click(schalter("k2", "b2"))
            pg.click("#k2 .detail-schalter")
        nachher = pg.evaluate("() => JSON.stringify(AP.kapitelfach('lf3','k2').checks)")
        pruefe(vorher == nachher and cid in vorher, "A09 Antwort im Lernstand unverändert nach mehrfachem Wechsel", nachher[:80])
        pruefe(pg.locator(f"[id='{cid}']").count() == 1, "A09 Check genau einmal im Dokument")
        pruefe(pg.evaluate(f"() => document.querySelector('#{cid}').classList.contains('fertig') || !!document.querySelector('#{cid} .opt.richtig, #{cid} .opt[aria-pressed=\"true\"], #{cid} .opt.gewaehlt')"),
               "A09 Beantworteter Check zeigt weiter seinen Zustand")

        # ------------------------------------------------ A17, A18 Sitzung
        print("A17 · A18 · Kapitelwechsel und Neuladen")
        pg.goto(f"{w}/lf4.html#k3")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.click(schalter("k3", "b1"))
        pg.goto(f"{w}/lf4.html#k4")
        pg.wait_for_selector("#k4:not([hidden])")
        pg.evaluate("() => { location.hash = '#k3'; }")
        pg.wait_for_selector("#k3:not([hidden])")
        pruefe(zustand(pg, "k3", "b1")["offen"], "A17 Öffnung bleibt beim Kapitelwechsel in der Seite erhalten")
        pg.reload()
        pg.wait_for_selector("#k3:not([hidden])")
        pruefe(not zustand(pg, "k3", "b1")["offen"], "A18 Nach Neuladen wieder kompakt")

        # ------------------------------------------------ A11–A15 Links
        print("A11–A15 · Such- und Direktlinks")
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(150)
        z = zustand(pg, "k3", "b1")
        pruefe(z["offen"] and z["detailsOffen"] == 0, "A11 Treffer Hauptvertiefung öffnet genau den Abschnitt")
        pruefe(pg.evaluate("() => location.search") == "?ansicht=ausfuehrlich" and pg.evaluate("() => location.hash") == "#k3-b1",
               "E02 Direktlink: Ansicht bleibt in der Adresse, Fragment bleibt")
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich&detail=a-ohne-skonto#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(200)
        r = pg.evaluate("""() => { const d = document.getElementById('k3-b1-d-a-ohne-skonto');
            const t = d.getBoundingClientRect().top; return { offen: d.open, top: t, h: innerHeight,
            andere: document.querySelectorAll('#k3-b1-voll details.vf-detail[open]').length }; }""")
        pruefe(r["offen"] and r["andere"] == 1 and 0 <= r["top"] < r["h"], "A12 Detailtreffer öffnet genau dieses Detail im Blick", r)
        # G07 / E02: Neuladen und erneutes Öffnen der kopierten Adresse
        kopiert = pg.evaluate("() => location.href")
        pruefe("detail=a-ohne-skonto" in kopiert, "G07 Detailparameter bleibt in der Adresse", kopiert)
        pg.reload()
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(200)
        pruefe(pg.evaluate("() => document.getElementById('k3-b1-d-a-ohne-skonto').open")
               and zustand(pg, "k3", "b1")["offen"], "G07 Nach Neuladen derselbe Detailbereich offen")
        pg.goto("about:blank")
        pg.goto(kopiert)
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(200)
        pruefe(pg.evaluate("() => document.getElementById('k3-b1-d-a-ohne-skonto').open"),
               "G07 Kopierte Adresse in neuem Aufruf öffnet dasselbe Ziel")
        # Bewusstes Schließen entfernt nur Ansicht/Detail, andere Parameter bleiben
        pg.goto(f"{w}/lf4.html?quelle=test&ansicht=ausfuehrlich&detail=a-ohne-skonto#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(200)
        pg.click(schalter("k3", "b1"))
        pruefe(pg.evaluate("() => location.search") == "?quelle=test" and not zustand(pg, "k3", "b1")["offen"],
               "E02 Schließen entfernt nur ansicht/detail, fremde Parameter bleiben",
               pg.evaluate("() => location.search"))
        pg.reload()
        pg.wait_for_selector("#k3:not([hidden])")
        pruefe(not zustand(pg, "k3", "b1")["offen"], "G07 Danach Neuladen kompakt")
        # Sprung an eine andere Stelle entfernt die Parameter ebenfalls
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.evaluate("() => { location.hash = '#k4'; }")
        pg.wait_for_selector("#k4:not([hidden])")
        pruefe(pg.evaluate("() => location.search") == "", "E02 Sprung zu anderem Ziel entfernt die Parameter")
        # Unbekannte Detailkennung bleibt harmlos
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich&detail=gibtsnicht#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(150)
        pruefe(zustand(pg, "k3", "b1")["offen"] and zustand(pg, "k3", "b1")["detailsOffen"] == 0,
               "G07 Unbekanntes Detail: nur der Abschnitt öffnet")
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich&detail=a1#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(200)
        r = pg.evaluate("""() => { const f = document.getElementById('k3-b1-f-a1');
            return { sichtbar: !f.closest('[hidden]'), antwortZu: !f.querySelector('details').open,
                     top: f.getBoundingClientRect().top, h: innerHeight }; }""")
        pruefe(r["sichtbar"] and r["antwortZu"] and 0 <= r["top"] < r["h"], "A13 Fragetreffer: Frage sichtbar, Antwort zu", r)
        pg.goto("about:blank")
        pg.goto(f"{w}/lf4.html#k3-b2")
        pg.wait_for_selector("#k3:not([hidden])")
        pruefe(not zustand(pg, "k3", "b1")["offen"] and pg.evaluate("() => location.hash") == "#k3-b2",
               "A14 Alter Abschnittslink gültig, Ansicht kompakt")
        fehler_vorher = len(seitenfehler)
        pg.goto(f"{w}/lf4.html?ansicht=ausfuehrlich&detail=gibt-es-nicht#k3-b1")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(150)
        pruefe(zustand(pg, "k3", "b1")["offen"] and len(seitenfehler) == fehler_vorher,
               "A15 Unbekanntes Detail: gültiger Abschnitt offen, kein Fehler")

        # ------------------------------------------------ A16 Berufstrennung
        print("A16 · Berufe getrennt")
        pg.goto(f"{w}/ik2024-lf03.html#k02")
        pg.wait_for_selector("#k02:not([hidden])")
        pruefe(pg.locator(".vollfassung").count() == 0 and pg.evaluate("() => document.body.dataset.lernfeld") == "ik2024-lf03",
               "A16 IK-Seite zeigt keine KfB-Vollfassung; Zustand hängt an der Seite des Berufs")

        # ------------------------------------------------ A20 Tastatur, axe
        print("A20 · Tastatur und Barrierefreiheit")
        pg.goto(f"{w}/lf2.html#k2")
        pg.wait_for_selector("#k2:not([hidden])")
        pg.focus(schalter("k2", "b2"))
        pg.keyboard.press("Enter")
        z = zustand(pg, "k2", "b2")
        pruefe(z["offen"] and z["expanded"] == "true", "A20 Abschnittsschalter per Enter")
        pg.keyboard.press("Space")
        pruefe(not zustand(pg, "k2", "b2")["offen"], "A20 … und per Leertaste wieder zu")
        pg.keyboard.press("Enter")
        pg.focus("#k2-b2-d-c-drucker > summary")
        pg.keyboard.press("Enter")
        pruefe(pg.evaluate("() => document.getElementById('k2-b2-d-c-drucker').open"), "A20 Detail per Tastatur")
        if axe:
            for seite, kap in (("lf2.html", "k2"), ("lf3.html", "k2"), ("lf4.html", "k3")):
                pg.goto(f"{w}/{seite}#{kap}")
                pg.wait_for_selector(f"#{kap}:not([hidden])")
                pg.click(f"#{kap} .detail-schalter")
                pg.evaluate("() => document.querySelectorAll('.vollfassung details').forEach(d => d.open = true)")
                pg.wait_for_timeout(700)   # Kartenwende-/Einblendanimationen abwarten
                pg.add_script_tag(path=axe)
                v = pg.evaluate("""async (k) => { const r = await axe.run(document.getElementById(k),
                    { runOnly: ['wcag2a', 'wcag2aa'] }); return r.violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.map(n => n.target.join(' ') + ' ' + ((n.any[0]||{}).message||'')).join(' ; ')); }""", kap)
                pruefe(not v, f"A20 axe WCAG A/AA ohne Verstoß · {seite} offen", v)
        else:
            print("  (axe übersprungen: AXE_PFAD nicht gesetzt)")

        # ------------------------------------------------ A21 Breite
        print("A21 · 320 und 375 px")
        for breite in (320, 375):
            k = b.new_context(viewport={"width": breite, "height": 700}, service_workers="block", locale="de-DE")
            q = k.new_page()
            for seite, kap in (("lf2.html", "k2"), ("lf3.html", "k2"), ("lf4.html", "k3")):
                q.goto(f"{w}/{seite}#{kap}")
                q.wait_for_selector(f"#{kap}:not([hidden])")
                q.click(f"#{kap} .detail-schalter")
                q.evaluate("() => document.querySelectorAll('.vollfassung details').forEach(d => d.open = true)")
                q.wait_for_timeout(100)
                sw = q.evaluate("document.documentElement.scrollWidth")
                pruefe(sw <= breite, f"A21 {seite} bei {breite} px alles offen ohne Seitenüberlauf", sw)
            k.close()

        # ------------------------------------------------ A22 Bewegung reduziert
        print("A22 · Reduzierte Bewegung")
        k = b.new_context(viewport={"width": 1280, "height": 800}, service_workers="block",
                          locale="de-DE", reduced_motion="reduce")
        q = k.new_page()
        q.goto(f"{w}/lf4.html#k3")
        q.wait_for_selector("#k3:not([hidden])")
        q.click(schalter("k3", "b1"))
        pruefe(zustand(q, "k3", "b1")["offen"], "A22 Bedienung bei reduzierter Bewegung unverändert")
        k.close()

        # ------------------------------------------------ A23 kein Netz beim Aufklappen
        print("A23 · Kein Netzabruf beim Aufklappen")
        pg.goto(f"{w}/lf4.html#k3")
        pg.wait_for_selector("#k3:not([hidden])")
        pg.wait_for_timeout(300)
        n = len(Diener.anfragen)
        pg.click("#k3 .detail-schalter")
        pg.evaluate("() => document.querySelectorAll('.vollfassung details').forEach(d => d.open = true)")
        pg.wait_for_timeout(300)
        pruefe(len(Diener.anfragen) == n, "A23 Alle Inhalte liegen in der Seite (keine Anfrage)", Diener.anfragen[n:][:3])

        pruefe(not seitenfehler, "Keine Skriptfehler im gesamten Lauf", seitenfehler[:2])
        b.close()


def main():
    statisch()
    vertrag()
    handler = functools.partial(Diener, directory=str(DOCS))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        browser(f"http://127.0.0.1:{srv.server_address[1]}")
    print()
    if fehler:
        print(f"{len(fehler)} Fehler:")
        for f in fehler:
            print("  ·", f)
        sys.exit(1)
    print("Alles in Ordnung.")


if __name__ == "__main__":
    main()
