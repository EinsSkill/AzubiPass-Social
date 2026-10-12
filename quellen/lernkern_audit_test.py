#!/usr/bin/env python3
"""
AzubiPass · Regressionstests zum Gesamtaudit vom 12.10.2026

    python3 lernkern_audit_test.py [--nur A01,A05,A04]

Prüft die Korrekturen am Lernkern im echten Browser (Chromium), ohne Netz nach
außen und ohne Konten:

  A01  Beschädigte Sicherungen werden abgelehnt, der Lernstand bleibt, Ich und
       der Import bleiben bedienbar; gültige und alte Sicherungen werden
       weiter zusammengeführt. Auch schon gespeicherte kaputte Einträge legen
       die Ansicht nicht mehr lahm.
  A05  Ein Lesezeichen übersteht ein sofortiges Neuladen (0 und 100 ms).
  A04  Der Zwischenspeicher installiert nur vollständig und mit passenden
       Prüfwerten, behält bei einem Fehlschlag die alte Fassung und füllt
       nichts aus einer anderen Fassung nach.

Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import json
import re
import socketserver
import sys
import tempfile
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
fehler = []


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Diener(http.server.SimpleHTTPRequestHandler):
    """Liefert docs/ aus; einzelne Pfade lassen sich für den Test ersetzen."""
    ersatz = {}            # "/lf13.html" → (status, bytes, typ)

    def log_message(self, *a):
        pass

    def do_GET(self):
        pfad = self.path.split("?")[0]
        if pfad in Diener.ersatz:
            status, inhalt, typ = Diener.ersatz[pfad]
            self.send_response(status)
            self.send_header("Content-Type", typ)
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(inhalt)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    handler = functools.partial(Diener, directory=str(DOCS))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        w = f"http://127.0.0.1:{srv.server_address[1]}"

        with sync_playwright() as p:
            b = p.chromium.launch()

            nur = sys.argv[sys.argv.index("--nur") + 1].split(",") if "--nur" in sys.argv else ["A01", "A05", "A04"]

            if "A01" in nur:
                # ------------------------------------------------ A01
                print("A01 · Sicherung einspielen")
                ktx = b.new_context(viewport={"width": 1280, "height": 720}, service_workers="block", locale="de-DE")
                pg = ktx.new_page()
                seitenfehler = []
                pg.on("pageerror", lambda e: seitenfehler.append(str(e)))
                pg.goto(f"{w}/app.html#ich")
                pg.wait_for_selector("text=Sicherung einspielen")
                # Ausgangsstand mit etwas Inhalt
                pg.evaluate("""() => { const s = AP.stand;
                    s.fortschritt['lf4-k6'] = { ziele: ['b1'], checks: {}, zuordnen: {}, test: {}, fertig: true };
                    s.lesezeichen.push({ zu: 'lf4.html#k6', titel: 'K6', lernfeld: 'lf4' });
                    s.karten['lf4-k6-b1-m1'] = { fach: 3, faellig: '2026-10-20', fehler: 0 };
                    localStorage.setItem('azubipass:konto', JSON.stringify(s)); }""")
                pg.goto(f"{w}/app.html#ich")
                pg.wait_for_selector("text=Sicherung einspielen")
                vorher = pg.evaluate("localStorage.getItem('azubipass:konto')")

                tmp = Path(tempfile.mkdtemp())
                def einspielen(name, inhalt):
                    datei = tmp / name
                    datei.write_text(inhalt if isinstance(inhalt, str) else json.dumps(inhalt), encoding="utf-8")
                    pg.set_input_files("#ich input[type=file]", str(datei))
                    # Die Meldung steht in der Gruppe „Deine Daten“, neben dem Dateifeld.
                    sel = "() => { const f = document.querySelector('#ich input[type=file]');" \
                          " const g = f && f.closest('section, .feldgruppe'); const m = g && g.querySelector('.meldung');" \
                          " return m && m.textContent.trim() ? m.textContent.trim() : null; }"
                    try:
                        pg.wait_for_function(sel, timeout=5000)
                    except Exception:
                        return "(keine Meldung – Import abgebrochen)"
                    return pg.evaluate(sel) or ""

                kaputt = [
                    ("lesezeichen-null.json", {"fortschritt": {}, "lesezeichen": [None]}),
                    ("aktivitaet-zahl.json", {"fortschritt": {}, "aktivitaet": 42}),
                    ("karte-null.json", {"fortschritt": {}, "karten": {"x": None}}),
                    ("fortschritt-null.json", {"fortschritt": {"lf1-k1": None}}),
                    ("ziele-objekt.json", {"fortschritt": {"lf1-k1": {"ziele": {"a": 1}}}}),
                    ("zuletzt-zahl.json", {"fortschritt": {}, "zuletzt": 5}),
                    ("keine-sicherung.json", "[1, 2, 3]"),
                    ("kein-json.json", "{ das ist kein json"),
                ]
                for name, inhalt in kaputt:
                    seitenfehler.clear()
                    pg.goto(f"{w}/app.html#ich")
                    pg.wait_for_selector("text=Sicherung einspielen")
                    text = einspielen(name, inhalt)
                    pg.wait_for_timeout(1200)
                    nachher = pg.evaluate("localStorage.getItem('azubipass:konto')")
                    pruefe("Nichts geändert." in text and nachher == vorher and not seitenfehler,
                           f"{name}: abgelehnt, Speicher unverändert, kein Skriptfehler", text[:90])
                pg.reload()
                try:
                    pg.wait_for_selector("text=Sicherung einspielen", timeout=5000)
                except Exception:
                    pass
                pruefe(pg.locator("#ich input[type=file]").count() == 1, "Ich und Import bleiben nach Ablehnungen erreichbar")

                # Gültige Sicherung in einen frischen Browser, dann eine alte v1-Datei dazu
                gueltig = json.loads(vorher)
                gueltig["vokabeln"] = {"grund-buero-appointment": {"fach": 2, "faellig": "2026-10-15", "fehler": 1}}
                frisch_ktx = b.new_context(viewport={"width": 1280, "height": 720}, service_workers="block", locale="de-DE")
                pg2 = frisch_ktx.new_page()
                pg2.on("pageerror", lambda e: seitenfehler.append(str(e)))
                seitenfehler.clear()
                pg2.goto(f"{w}/app.html#ich")
                pg2.wait_for_selector("text=Sicherung einspielen")
                (tmp / "gueltig.json").write_text(json.dumps(gueltig), encoding="utf-8")
                pg2.set_input_files("#ich input[type=file]", str(tmp / "gueltig.json"))
                pg2.wait_for_selector("text=Eingespielt und mit dem zusammengeführt")
                k = pg2.evaluate("JSON.parse(localStorage.getItem('azubipass:konto'))")
                pruefe(k["fortschritt"].get("lf4-k6", {}).get("fertig") is True
                       and k["karten"].get("lf4-k6-b1-m1", {}).get("fach") == 3
                       and k["vokabeln"].get("grund-buero-appointment", {}).get("fach") == 2
                       and any(e["zu"] == "lf4.html#k6" for e in k["lesezeichen"]) and not seitenfehler,
                       "Gültige Sicherung: Fortschritt, Karten, Vokabeln, Lesezeichen übernommen (sofort gespeichert)")
                v1 = {"version": 1, "fortschritt": {"lf2-k1": {"ziele": ["b2"], "checks": {"0": 1}}},
                      "lesezeichen": [{"zu": "lf2.html#k1", "titel": "LF2 K1"}]}
                (tmp / "v1.json").write_text(json.dumps(v1), encoding="utf-8")
                pg2.goto(f"{w}/app.html#ich")
                pg2.wait_for_selector("text=Sicherung einspielen")
                pg2.set_input_files("#ich input[type=file]", str(tmp / "v1.json"))
                pg2.wait_for_selector("text=Eingespielt und mit dem zusammengeführt")
                k = pg2.evaluate("JSON.parse(localStorage.getItem('azubipass:konto'))")
                pruefe(k["version"] == 3 and "lf2-k1" in k["fortschritt"] and "lf4-k6" in k["fortschritt"]
                       and len(k["lesezeichen"]) == 2 and k["lesezeichen"][1].get("lernfeld") == "",
                       "Alte v1-Sicherung wird zusammengeführt und auf v3 gebracht", [e["zu"] for e in k["lesezeichen"]])
                frisch_ktx.close()

                # Schon gespeicherter kaputter Stand (aus einer alten Fassung) –
                # vor dem Laden der Seite eingesetzt, damit nichts ihn überschreibt.
                seitenfehler.clear()
                ktx.close()
                ktx = b.new_context(viewport={"width": 1280, "height": 720}, service_workers="block", locale="de-DE")
                ktx.add_init_script("""if (!sessionStorage.getItem('gesetzt')) { sessionStorage.setItem('gesetzt', '1');
                    localStorage.setItem('azubipass:konto', JSON.stringify({
                    version: 3, fortschritt: { 'lf1-k1': { ziele: [null, 'b1'], fertig: 'ja' } },
                    lesezeichen: [null, { zu: 'lf1.html#k1' }, { zu: 'lf1.html#k1' }], aktivitaet: 42,
                    karten: { x: null, y: { fach: 'drei' } }, vokabeln: [], quiz: { a: 5 }, zuletzt: 'lf1' })); }""")
                pg = ktx.new_page()
                pg.on("pageerror", lambda e: seitenfehler.append(str(e)))
                pg.goto(f"{w}/app.html#ich")
                pg.wait_for_selector("text=Sicherung einspielen", timeout=8000)
                pg.goto(f"{w}/app.html#heute")
                pg.wait_for_timeout(600)
                pruefe(not seitenfehler, "Kaputter gespeicherter Stand: Ich und Heute ohne Skriptfehler", seitenfehler[:2])
                sauber = pg.evaluate("JSON.stringify(AP.stand)")
                pruefe('null' not in sauber.replace('"zuletzt":null', '').replace('"pruefungstermin":null', '').replace('"geaendertAm":null', '')
                       and '"fach":1' in sauber and pg.evaluate("AP.stand.lesezeichen.length") == 1,
                       "… und wird beim Laden bereinigt", sauber[:160])
                ktx.close()

            if "A05" in nur:
                # ------------------------------------------------ A05
                print("A05 · Speichern bei sofortigem Neuladen")
                for warte in (0, 100):
                    k5 = b.new_context(viewport={"width": 1280, "height": 720}, service_workers="block", locale="de-DE")
                    p5 = k5.new_page()
                    p5.goto(f"{w}/lf4.html#k6")
                    p5.wait_for_selector("#merken:not([hidden])")
                    p5.click("#merken")
                    if warte:
                        p5.wait_for_timeout(warte)
                    p5.reload()
                    p5.wait_for_selector("#merken:not([hidden])")
                    gemerkt = p5.evaluate("JSON.parse(localStorage.getItem('azubipass:konto') || '{}').lesezeichen || []")
                    pruefe(any(e.get("zu") == "lf4.html#k6" for e in gemerkt)
                           and p5.get_attribute("#merken", "aria-pressed") == "true",
                           f"Lesezeichen bleibt nach Neuladen nach {warte} ms", len(gemerkt))
                    k5.close()
                # Schnelle Folge: zweite Änderung innerhalb des Bündels, dann sofort weg
                k5 = b.new_context(viewport={"width": 1280, "height": 720}, service_workers="block", locale="de-DE")
                p5 = k5.new_page()
                p5.goto(f"{w}/lf4.html#k6")
                p5.wait_for_selector("#merken:not([hidden])")
                p5.click("#merken")
                p5.evaluate("() => { AP.stand.pruefungstermin = '2027-05-04'; AP.sichern(); }")
                p5.goto(f"{w}/app.html#heute")
                k = p5.evaluate("JSON.parse(localStorage.getItem('azubipass:konto'))")
                pruefe(k.get("pruefungstermin") == "2027-05-04" and k["lesezeichen"],
                       "Zweite Änderung kurz danach wird beim Verlassen der Seite geschrieben")
                k5.close()

            if "A04" in nur:
                # ------------------------------------------------ A04
                print("A04 · Zwischenspeicher")
                sw_text = (DOCS / "sw.js").read_text(encoding="utf-8")
                vorrat = json.loads(re.search(r"var VORRAT = (\{.*?\});", sw_text, re.S).group(1))
                pruefe(len(vorrat) > 40 and all(re.fullmatch(r"[0-9a-f]{64}", v) for v in vorrat.values()),
                       "Jede Datei im Vorrat hat einen SHA-256-Prüfwert", len(vorrat))

                def sw_zustand(seite):
                    return seite.evaluate("""async () => {
                        const r = await navigator.serviceWorker.getRegistration();
                        const namen = (await caches.keys()).filter(n => n.startsWith('azubipass-'));
                        const inhalt = {};
                        for (const n of namen) inhalt[n] = (await (await caches.open(n)).keys()).length;
                        return { aktiv: !!(r && r.active), wartet: !!(r && r.waiting), speicher: inhalt }; }""")

                def warte_sw(seite, bedingung, sek=20):
                    for _ in range(sek * 4):
                        z = sw_zustand(seite)
                        if bedingung(z):
                            return z
                        seite.wait_for_timeout(250)
                    return sw_zustand(seite)

                # 1. Erste Installation mit fehlender Datei: nichts wird aktiv
                Diener.ersatz = {"/lf13.html": (503, b"weg", "text/html")}
                k4 = b.new_context(viewport={"width": 1280, "height": 720}, locale="de-DE")
                p4 = k4.new_page()
                p4.goto(f"{w}/app.html#heute")
                p4.wait_for_timeout(4000)
                z = sw_zustand(p4)
                pruefe(not z["aktiv"] and not z["speicher"], "Fehlende Datei bei der Erstinstallation: keine halbe Fassung aktiv", z)

                # 2. Datei wieder da: vollständige Installation
                Diener.ersatz = {}
                p4.reload()
                z = warte_sw(p4, lambda z: z["aktiv"] and z["speicher"])
                pruefe(z["aktiv"] and list(z["speicher"].values()) == [len(vorrat)],
                       "Danach vollständig installiert: alle Dateien im Speicher", z)
                speicher_alt = list(z["speicher"])[0]

                # 3. Andere Kapiteldatei unter derselben Adresse: kommt nicht in die Fassung
                original = (DOCS / "lf13.html").read_bytes()
                Diener.ersatz = {"/lf13.html": (200, original.replace(b"</body>", b"<!-- AUDIT-FASSUNG-ZWEI --></body>"), "text/html")}
                p4.goto(f"{w}/lf13.html")
                p4.wait_for_timeout(800)
                pruefe("AUDIT-FASSUNG-ZWEI" not in p4.content(), "Online geöffnet: das Kapitel kommt aus der eigenen Fassung")
                gemischt = p4.evaluate("""async (n) => { const c = await caches.open(n);
                    const r = await c.match('lf13.html'); return r ? (await r.text()).includes('AUDIT-FASSUNG-ZWEI') : null; }""", speicher_alt)
                pruefe(gemischt is False, "Keine Datei einer anderen Fassung im Speicher", gemischt)

                # 4. Neue Fassung, bei der eine Datei nicht zum Prüfwert passt: alte bleibt
                neu_vorrat = dict(vorrat)
                neu_vorrat["lf13.html"] = "0" * 64           # neue Fassung erwartet eine andere lf13.html
                sw_v2 = sw_text.replace(re.search(r"var SPEICHER = \"azubipass-[^\"]+\";", sw_text).group(0),
                                        'var SPEICHER = "azubipass-testv2";')
                sw_v2 = re.sub(r"var VORRAT = \{.*?\};", "var VORRAT = " + json.dumps(neu_vorrat) + ";", sw_v2, flags=re.S)
                Diener.ersatz = {"/sw.js": (200, sw_v2.encode(), "application/javascript")}
                p4.goto(f"{w}/app.html#heute")
                p4.evaluate("navigator.serviceWorker.getRegistration().then(r => r && r.update()).catch(() => {})")
                p4.wait_for_timeout(4000)
                z = sw_zustand(p4)
                pruefe(z["aktiv"] and list(z["speicher"]) == [speicher_alt] and not z["wartet"],
                       "Fehlschlag der neuen Fassung: alte Fassung bleibt intakt und aktiv", z)

                # 5. Offline mit zwei Tabs: beide lesen aus der intakten Fassung
                Diener.ersatz = {}
                zweite = k4.new_page()
                zweite.goto(f"{w}/app.html#lernen")
                k4.set_offline(True)
                p4.goto(f"{w}/lf13.html#k2")
                zweite.goto(f"{w}/buchfuehrung.html#k1")
                ok1 = p4.locator("main, article, section").count() > 0 and "lf13" in p4.url
                ok2 = zweite.locator("main, article, section").count() > 0
                pruefe(ok1 and ok2, "Offline: zwei Tabs öffnen Kapitel aus dem Speicher")
                k4.set_offline(False)
                k4.close()
            b.close()

    print()
    print("Alles in Ordnung." if not fehler else f"{len(fehler)} Fehler: " + "; ".join(fehler))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
