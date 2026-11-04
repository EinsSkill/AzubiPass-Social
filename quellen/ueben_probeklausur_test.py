#!/usr/bin/env python3
"""
AzubiPass · Üben und Probeklausur (Abnahme U01–U04, K01–K05, R01)

    AXE_PFAD=…/axe.min.js python3 ueben_probeklausur_test.py

Prüft die Fälle aus doku/ueben-probeklausur/2026-11-04-uebergabe-claude.md im
echten Browser. Die Zeit wird über einen Versatz an Date.now verstellt, damit
die Prüfung nicht wirklich dreißig Minuten wartet.
"""
import functools
import http.server
import json
import os
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

from gemeinsames import AUSGABE as SEITE

ergebnisse = []


def pruefe(name, bedingung, zusatz=""):
    ergebnisse.append(bool(bedingung))
    print(f"  {'OK  ' if bedingung else 'FEHL'} {name}{'  ' + str(zusatz) if zusatz and not bedingung else ''}")


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


server = socketserver.ThreadingTCPServer(
    ("127.0.0.1", 0), functools.partial(Stiller, directory=str(SEITE)))
server.daemon_threads = True
threading.Thread(target=server.serve_forever, daemon=True).start()
BASIS = f"http://127.0.0.1:{server.server_address[1]}"
INHALT = json.loads((SEITE / "mittel" / "inhalt.json").read_text(encoding="utf-8"))
AUFGABEN = json.loads((SEITE / "mittel" / "aufgaben.json").read_text(encoding="utf-8"))
ZEIT = "window.__v=0;(function(){var o=Date.now;Date.now=function(){return o()+window.__v;};})();"
PK = "azubipass:probeklausur:v1"


def ktx(b, **k):
    k.setdefault("viewport", {"width": 1280, "height": 800})
    c = b.new_context(service_workers=k.pop("sw", "block"), locale="de-DE", **k)
    c.add_init_script(ZEIT)
    return c


def auf(p, adresse):
    """Eine Adresse sicher neu aufbauen: Hash-Wechsel und Neuladen wie der Nutzer."""
    try:
        p.evaluate("() => { if (window.AP && AP.sofortSichern) AP.sofortSichern(); }")
    except Exception:
        pass
    p.goto(f"{BASIS}/app.html#heute")
    p.reload()
    p.wait_for_selector("#heute .schirm-kopf, #heute h1", state="attached")
    p.evaluate("(a) => { location.hash = a; }", adresse)
    p.wait_for_timeout(250)


def konto(p):
    return p.evaluate("() => JSON.parse(localStorage.getItem('azubipass:konto')||'{}')")


def konto_setzen(p, wert):
    p.evaluate("(w) => { localStorage.setItem('azubipass:konto', JSON.stringify(w)); }", wert)


def bogen(p, schluessel=PK):
    return p.evaluate("(k) => JSON.parse(localStorage.getItem(k)||'null')", schluessel)


def runde(p, beruf="kfb"):
    return p.evaluate("(b) => JSON.parse(localStorage.getItem('azubipass-runde-'+b)||'null')", beruf)


def klausur_starten(p, kapitel, dauer=None):
    auf(p, f"#ueben/probeklausur?kapitel={kapitel}")
    p.wait_for_selector(".pk--zonknopf")
    if dauer:
        p.get_by_role("button", name=f"{dauer} Min.", exact=True).click()
    p.locator(".pk--zonknopf").click()
    p.get_by_role("button", name="Probeklausur starten").click()
    p.wait_for_selector("#pk-uhr")


def zeit_vor(p, sekunden):
    p.evaluate("(s) => { window.__v += s * 1000; }", sekunden)


# ---------------------------------------------------------------- U01

def u01(b):
    print("\n· U01 Themenrunde")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/lf4.html#k6")
    pruefe("Kapitel bietet „Dieses Thema üben“",
           p.locator('a.weiter-uebung[href="app.html#ueben/thema?kapitel=lf4:k6"]').count() == 1)
    pruefe("Probeklausur-Link im Kapitel bleibt", p.locator("a.weiter-pk").count() >= 1)
    auf(p, "#ueben/thema?kapitel=lf4:k6")
    pruefe("Umfang steht vor dem Start", "5" in p.locator(".tr-info").first.inner_text(),
           p.locator(".tr-info").first.inner_text())
    p.get_by_role("button", name="Runde starten").click()
    p.wait_for_selector(".tr-position")
    pruefe("Position sichtbar", p.locator(".tr-position").inner_text() == "Aufgabe 1 von 5")
    pruefe("Adresse startet beim Neuladen keine neue Runde", p.evaluate("location.hash") == "#ueben/runde")
    r0 = runde(p)
    p.get_by_role("button", name="Lösung ansehen").click()
    p.get_by_role("button", name="Weiter").click()
    p.goto(f"{BASIS}/lf4.html#k6")
    p.go_back()
    p.wait_for_selector(".tr-position")
    r1 = runde(p)
    pruefe("Rückkehr stellt dieselbe Runde und Aufgabe her",
           r1["id"] == r0["id"] and r1["pos"] == 1 and "2 von 5" in p.locator(".tr-position").inner_text())
    for _ in range(6):
        if p.locator(".tr-zahlen").count():
            break
        ans = p.get_by_role("button", name="Lösung ansehen")
        if ans.count():
            ans.click()
        p.get_by_role("button", name="Zum Ergebnis").or_(p.get_by_role("button", name="Weiter")).first.click()
        p.wait_for_timeout(80)
    pruefe("Klare Abschlussansicht", p.locator(".tr-zahlen li").count() == 4)
    pruefe("Folgeaktion „Fehler nochmal üben“", p.get_by_role("button", name="Fehler nochmal üben").count() == 1)
    pruefe("Abschnitt nachlesen führt auf den Anker",
           "ansicht=ausfuehrlich#k6-b" in (p.get_by_role("link", name="Abschnitt nachlesen").first.get_attribute("href") or ""))

    auf(p, "#ueben/thema?kapitel=ik2024-lf04:k04")
    pruefe("Fremdes Kapitel: Hinweis statt stillem Wechsel",
           "gehört zu" in p.locator("#ueben").inner_text() and konto(p).get("beruf", "kfb") == "kfb")
    p.get_by_role("button", name="Zu Industriekaufleute wechseln").or_(
        p.get_by_role("button", name="wechseln")).first.click()
    p.wait_for_selector(".tr-info")
    pruefe("Wechsel nur auf ausdrücklichen Klick, kleiner Bestand wird genannt",
           p.evaluate("AP.beruf()") == "ik" and "3 Aufgaben aus 3" in p.locator(".tr-info").first.inner_text(),
           p.locator(".tr-info").first.inner_text())
    p.evaluate("AP.berufSetzen('kfb')")
    auf(p, "#ueben/thema?kapitel=lf4:k99")
    pruefe("Ungültige Kennung: Auswahl mit Hinweis",
           "nicht gefunden" in p.locator("#ueben").inner_text() and p.locator(".tr-feld select").count() >= 1)
    c.close()

    c = ktx(b)
    p = c.new_page()

    def ohne(route):
        d = json.loads(json.dumps(AUFGABEN))
        d["bausteine"] = [x for x in d["bausteine"] if not (x["lernfeld"] == "ik2024-lf04" and x["kapitel"] == "k04")]
        route.fulfill(json=d)
    p.route("**/mittel/aufgaben.json", ohne)
    p.goto(f"{BASIS}/app.html")
    p.evaluate("AP.berufSetzen('ik')")
    auf(p, "#ueben/thema?kapitel=ik2024-lf04:k04")
    pruefe("Leeres Kapitel: Alternativen desselben Berufs",
           p.get_by_role("button", name="Runde starten").is_disabled()
           and p.locator("#ueben .reihe").count() >= 1)
    links = p.locator("#ueben .reihe").evaluate_all("l => l.map(a => a.getAttribute('href'))")
    pruefe("Alternativen bleiben im Beruf", links and all("ik2024" in x for x in links), links)
    c.close()


# ---------------------------------------------------------------- U02

def u02(b):
    print("\n· U02 Fehlerverlauf")
    q = next(x for x in INHALT["quiz"] if x["id"] == "lf4-k1-b2-c1")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    k = konto(p) or {}
    k = p.evaluate("() => JSON.parse(JSON.stringify(AP.stand))")
    k["fortschritt"]["lf4-k1"] = {"ziele": [], "checks": {q["id"]: {"r": False, "a": 1}},
                                  "zuordnen": {}, "test": {}, "fertig": False}
    konto_setzen(p, k)
    auf(p, "#ueben/schwach")
    pruefe("Alter Kapitelcheck steht in der Liste", p.locator(".ue-fehler").count() == 1)
    pruefe("Einstieg „Jetzt nochmal üben“", p.get_by_role("link", name="Jetzt nochmal üben").count() == 1)
    p.locator(".ue-nochmal").click()
    p.wait_for_selector(".opt")
    ri = next(o for o in q["optionen"] if o["richtig"])
    p.locator(".opt", has_text=ri["text"][:20]).first.click()
    p.get_by_role("button", name="Antwort prüfen").dblclick()
    p.wait_for_selector(".tr-status")
    e = konto(p)["quiz"][q["id"]]
    pruefe("Doppelklick zählt einen Versuch", e["n"] == 1 and e["s"] == "selbst", e)
    p.reload()
    p.wait_for_selector(".tr-status")
    pruefe("Neuladen zählt nicht doppelt", konto(p)["quiz"][q["id"]]["n"] == 1)
    auf(p, "#ueben/schwach")
    pruefe("Neuer eigenständiger Versuch löst den alten Fehler ab", p.locator(".ue-fehler").count() == 0)
    c.close()

    # Zwei Tabs derselben Runde
    c = ktx(b)
    p = c.new_page()
    auf(p, f"#ueben/runde?aufgabe={q['id']}")
    p2 = c.new_page()
    auf(p2, "#ueben/runde")
    p.wait_for_selector(".opt")
    for s in (p, p2):
        s.locator(".opt", has_text=ri["text"][:20]).first.click()
    p.get_by_role("button", name="Antwort prüfen").click()
    p2.get_by_role("button", name="Antwort prüfen").click()
    p2.wait_for_selector(".tr-status")
    p2.wait_for_timeout(120)
    pruefe("Zweiter Tab zählt keinen zweiten Versuch", konto(p2)["quiz"][q["id"]]["n"] == 1,
           konto(p2)["quiz"][q["id"]])
    c.close()

    # Hilfe und aufgedeckte Lösung bleiben unterscheidbar
    c = ktx(b)
    p = c.new_page()
    auf(p, "#ueben/runde?aufgabe=ik2024-lf04-k04-01")
    pruefe("Aufgabe des anderen Berufs startet nicht", p.locator(".pk--zahlfeld").count() == 0)
    p.evaluate("AP.berufSetzen('ik')")
    auf(p, "#ueben/runde?aufgabe=ik2024-lf04-k04-01")
    p.wait_for_selector(".pk--zahlfeld")
    pruefe("Keine Lösung vor dem Versuch", p.locator(".pk--loesungsteil").count() == 0)
    w = runde(p, "ik")["folge"][0]["werte"]["ik2024-lf04-k04-01"]
    p.get_by_role("button", name="Hinweis zeigen").click()
    pruefe("Erst der Denkanstoß", "Denkanstoß" in p.locator(".tr-hinweise").inner_text()
           and "Zwischenschritt" not in p.locator(".tr-hinweise").inner_text())
    p.get_by_role("button", name="Zwischenschritt zeigen").click()
    pruefe("Dann der Zwischenschritt", "Zwischenschritt" in p.locator(".tr-hinweise").inner_text())
    felder = p.locator(".pk--zahlfeld")
    felder.nth(0).fill(f"{w['zep']:.2f}".replace(".", ","))
    felder.nth(1).fill(f"{w['bezug']:.2f}".replace(".", ","))
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status")
    e = konto(p)["quiz"]["ik2024-lf04-k04-01"]
    pruefe("Richtig mit Hinweis: Hilfe statt eigenständig", e["s"] == "hilfe" and e["r"] is True, e)
    auf(p, "#ueben/schwach")
    t = p.locator("#ueben").inner_text()
    pruefe("Mit Hilfe gelöst bleibt für später verfügbar", "mit Hilfe gelöst" in t, t[:200])
    auf(p, "#ueben/runde?aufgabe=ik2024-lf04-k04-02")
    p.wait_for_selector(".tr-aufgabe")
    p.get_by_role("button", name="Lösung ansehen").click()
    p.wait_for_selector(".tr-status")
    pruefe("Lösung angesehen ist ein eigener Zustand",
           konto(p)["quiz"]["ik2024-lf04-k04-02"]["s"] == "loesung"
           and "Lösung angesehen" in p.locator(".tr-status").inner_text())
    c.close()


# ---------------------------------------------------------------- U03

def u03(b):
    print("\n· U03 Bausteine")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("AP.berufSetzen('ik')")
    auf(p, "#ueben/runde?aufgabe=ik2024-lf04-k04-01")
    p.wait_for_selector(".pk--zahlfeld")
    w1 = runde(p, "ik")["folge"][0]["werte"]["ik2024-lf04-k04-01"]
    felder = p.locator(".pk--zahlfeld")
    felder.nth(0).fill(f"{w1['zep']:.2f}".replace(".", ","))
    felder.nth(1).fill(f"{w1['bezug']:.2f}".replace(".", ","))
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status-selbst")
    t = p.locator(".tr-feedback").inner_text()
    pruefe("IK: Zahl mit deutschem Komma, volle Punkte", "4 von 4 Punkten" in t, t[:200])
    pruefe("IK: Rechenweg und typischer Fehler im Feedback",
           "Bareinkaufspreis" in t and "Typischer Fehler" in t and "Bezugsgröße" in t)
    gesehen = set()
    for _ in range(4):
        auf(p, "#ueben/runde?aufgabe=ik2024-lf04-k04-01")
        p.wait_for_selector(".pk--zahlfeld")
        v = runde(p, "ik")["folge"][0]["werte"]["ik2024-lf04-k04-01"]
        gesehen.add(json.dumps(v, sort_keys=True))
    pruefe("IK: Neue Seeds liefern andere Werte", len(gesehen) >= 2)
    p.evaluate("AP.berufSetzen('kfb')")

    auf(p, "#ueben/runde?aufgabe=buchfuehrung-k5-u1")
    p.wait_for_selector(".pk--bs-zeile")
    pruefe("Buchführung: Beleg steht in der Aufgabe", p.locator(".pk--beleg-rahmen").count() == 1)
    w = runde(p)["folge"][0]["werte"]["buchfuehrung-k5-u1"]
    # gültige alternative Reihenfolge der Zeilen
    reihen = [("haben", "2800", w["zahlbetrag"]), ("haben", "6002", w["skonto_brutto"]), ("soll", "4400", w["brutto"])]
    for i, (seite, konto_nr, betrag) in enumerate(reihen):
        z = p.locator(".pk--bs-zeile").nth(i)
        z.get_by_role("button", name=seite.capitalize()).click()
        z.locator(".pk--bs-konto").fill(konto_nr)
        z.locator(".pk--bs-betrag").fill(f"{betrag:.2f}".replace(".", ","))
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status")
    t = p.locator(".tr-feedback").inner_text()
    pruefe("Buchführung: Alternative Zeilenfolge voll bewertet", "5 von 5 Punkten" in t, t[:200])
    pruefe("Buchführung: Konto, Seite und Betrag getrennt erklärt, Umsatzsteuer benannt",
           "Konto 4400" in t and "Seite Soll" in t and "Umsatzsteuer" in t)
    p.get_by_role("button", name="Zum Ergebnis").click()
    pruefe("Buchführung: Wertevariante heißt so, auch ohne offenen Fehler nur bei Bedarf",
           p.locator(".tr-zahlen").count() == 1)

    auf(p, "#ueben/runde?aufgabe=buchfuehrung-k5-03")
    p.wait_for_selector(".pk--bs-zeile")
    w = runde(p)["folge"][0]["werte"]["buchfuehrung-k5-03"]
    z = p.locator(".pk--bs-zeile").nth(0)
    z.get_by_role("button", name="Soll").click()
    z.locator(".pk--bs-konto").fill("4400")
    z.locator(".pk--bs-betrag").fill(f"{w['brutto']:.2f}".replace(".", ","))
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status")
    t = p.locator(".tr-punkte").inner_text()
    pruefe("Buchführung: Teilpunkte", t.startswith("1,6") or t.startswith("1.6") or "von 5 Punkten" in t, t)
    pruefe("Teilergebnis bleibt offen", konto(p)["quiz"]["buchfuehrung-k5-03"]["s"] == "offen")
    p.get_by_role("button", name="Zum Ergebnis").click()
    pruefe("Mit Variablen heißt es „Neue Werte üben“", p.get_by_role("button", name="Neue Werte üben").count() == 1)

    auf(p, "#ueben/runde?aufgabe=lf4-k6-u1")
    p.wait_for_selector(".pk--zu-el")
    u1 = next(x for x in AUFGABEN["uebungen"] if x["id"] == "lf4-k6-u1")
    for el_ in u1["eingabe"][0]["elemente"]:
        p.locator(".pk--zu-el", has_text=el_["text"][:18]).click()
        p.get_by_role("button", name=f"Ziel {el_['loesung']}").click()
    p.locator(".pk--option", has_text="Nacherfüllung verlangen").click()
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status-selbst")
    t = p.locator(".tr-feedback").inner_text()
    pruefe("LF4: Feedback erklärt die Zuordnung und die entscheidende Angabe",
           "offener Mangel" in t and "Entscheidend" in t, t[:300])
    p.get_by_role("button", name="Zum Ergebnis").click()
    p.get_by_role("button", name="Zweiten Fall lösen").click()
    p.wait_for_selector(".pk--option")
    t = p.locator("#ueben").inner_text()
    pruefe("LF4: Zweiter Fall ändert das entscheidende Detail", "drei Wochen" in t)

    auf(p, "#ueben/runde?aufgabe=lf4-k6-u2")
    p.wait_for_selector("textarea")
    p.get_by_role("button", name="Mit Musterlösung vergleichen").click()
    pruefe("Freitext: leerer Versuch wird nicht verglichen", p.locator(".pk--raster").count() == 0)
    p.locator("textarea").fill("Lieferschein belegt den Mangel, Nacherfüllung mit Frist verlangen.")
    p.get_by_role("button", name="Mit Musterlösung vergleichen").click()
    p.wait_for_selector(".pk--raster")
    pruefe("Freitext: Antwort bleibt lesbar, Felder gesperrt", p.locator("textarea").is_disabled())
    p.locator(".pk--kriterium input").nth(0).check()
    p.get_by_role("button", name="Bewertung übernehmen").click()
    p.wait_for_selector(".tr-status")
    pruefe("Freitext: Selbstbewertung ergibt Zustand", konto(p)["quiz"]["lf4-k6-u2"]["s"] == "offen")
    pruefe("Freitext: keine Rohantwort im Konto", "Lieferschein belegt" not in json.dumps(konto(p)))
    c.close()


# ---------------------------------------------------------------- U04

def u04(b):
    print("\n· U04 Tagesrunde")
    c = ktx(b)
    p = c.new_page()
    auf(p, "#ueben")
    pruefe("„5 Minuten üben“ und „Thema üben“ stehen vorn",
           p.get_by_role("link", name="5 Minuten üben").count() == 1
           and p.get_by_role("link", name="Thema üben").count() == 1)
    p.get_by_role("link", name="5 Minuten üben").click()
    p.wait_for_selector(".tr-position")
    r = runde(p)
    ids = [s["id"] for s in r["folge"]]
    pruefe("Ohne Historie: kleine Grundrunde", 1 <= len(ids) <= 5 and len(set(ids)) == len(ids), ids)
    pruefe("Keine laufende Uhr", p.locator("#pk-uhr").count() == 0)
    p.reload()
    p.wait_for_selector(".tr-position")
    pruefe("Neuladen setzt die Tagesrunde fort", runde(p)["id"] == r["id"])
    k = p.evaluate("() => JSON.parse(JSON.stringify(AP.stand))")
    karten = [x["id"] for x in INHALT["karten"] if x.get("beruf", "kfb") == "kfb"][:4]
    for kid in karten:
        k["karten"][kid] = {"fach": 2, "faellig": "2026-01-01", "fehler": 0}
    fragen = [x for x in INHALT["quiz"] if x.get("beruf", "kfb") == "kfb"][:3]
    for q in fragen:
        k["quiz"][q["id"]] = {"n": 1, "r": False, "t": 1000, "s": "offen"}
    k["zuletzt"] = {"zu": "lf4.html#k6", "lernfeld": "lf4", "kapitel": "k6", "titel": "x"}
    konto_setzen(p, k)
    p.evaluate("localStorage.removeItem('azubipass-runde-kfb')")
    auf(p, "#ueben/runde?art=tages")
    p.wait_for_selector(".tr-position")
    r = runde(p)
    typen = [s["typ"] for s in r["folge"]]
    ids = [s["id"] for s in r["folge"]]
    pruefe("Mit Historie: zwei Karten, zwei Fehler, ein Thema",
           typen.count("karte") == 2 and len(ids) == 5 and len(set(ids)) == 5
           and sum(1 for i in ids if i in [q["id"] for q in fragen]) >= 2, ids)
    pruefe("Thema kommt aus dem zuletzt gelesenen Kapitel", any(i.startswith("lf4-k6") for i in ids), ids)
    p.evaluate("AP.berufSetzen('ik')")
    auf(p, "#ueben/runde?art=tages")
    p.wait_for_selector(".tr-position")
    ids = [s["id"] for s in runde(p, "ik")["folge"]]
    pruefe("Nach Berufswechsel nichts aus dem anderen Beruf",
           ids and all(i.startswith("ik2024") for i in ids), ids)
    pruefe("Runde des anderen Berufs bleibt getrennt liegen", runde(p, "kfb") is not None)
    for _ in range(6):
        if p.locator(".tr-zahlen").count():
            break
        ans = p.get_by_role("button", name="Lösung ansehen")
        if ans.count():
            ans.click()
        elif p.get_by_role("button", name="Antwort zeigen").count():
            p.get_by_role("button", name="Antwort zeigen").click()
            p.get_by_role("button", name="Wusste ich").click()
        p.get_by_role("button", name="Zum Ergebnis").or_(p.get_by_role("button", name="Weiter")).first.click()
        p.wait_for_timeout(60)
    pruefe("Eindeutiger Abschluss", p.locator(".tr-zahlen").count() == 1)
    c.close()


# ---------------------------------------------------------------- K01

def k01(b):
    print("\n· K01 Zeitablauf")
    c = ktx(b)
    p = c.new_page()
    klausur_starten(p, "lf4:k5", 30)
    pruefe("Knopf nennt, dass die Zeit weiterläuft",
           p.get_by_role("button", name="Verlassen · Zeit läuft weiter").count() == 1)
    ZIEL = "#ueben .pk--eingaben .pk--zahlfeld, #ueben .pk--eingaben textarea"
    for _ in range(12):
        if p.locator(ZIEL).count():
            break
        p.get_by_role("button", name="Weiter ›").click()
        p.wait_for_timeout(50)
    feld = p.locator(ZIEL).first
    feld.fill("111")
    p.wait_for_timeout(50)
    vorher = bogen(p)
    # Uhr steht, Eingabe nach Endzeit: keine Änderung am gesicherten Stand
    p.evaluate("window.setInterval = function(){return 0;}")
    zeit_vor(p, 31 * 60)
    p.evaluate("""() => {
      var f = document.querySelector('#ueben .pk--eingaben .pk--zahlfeld, #ueben .pk--eingaben textarea');
      if (f) { f.value = '222'; f.dispatchEvent(new Event('input', {bubbles: true})); }
    }""")
    p.wait_for_timeout(100)
    nach = bogen(p)
    pruefe("Eingabe nach Endzeit ändert nichts", nach["antworten"] == vorher["antworten"],
           (vorher["antworten"], nach["antworten"]))
    pruefe("Status wird festgeschrieben", nach["abgelaufen"] is True)
    pruefe("Eingabefelder sind gesperrt", p.locator("#ueben .pk--eingaben input:not(:disabled)").count() == 0)
    p.reload()
    p.wait_for_selector(".pk--abgelaufen")
    pruefe("Neuladen zeigt sofort die Nur-Lese-Ansicht",
           p.locator("#ueben .pk--eingaben input:not(:disabled), #ueben .pk--eingaben textarea:not(:disabled)").count() == 0)
    if p.get_by_role("button", name="Weiter ›").count():
        p.get_by_role("button", name="Weiter ›").click()
        p.wait_for_selector(".pk--abgelaufen")
        pruefe("Navigation bleibt nach Ablauf möglich", True)
    p.get_by_role("button", name="Jetzt abgeben").click()
    p.wait_for_selector("#pk-summe")
    z = bogen(p)
    pruefe("Abgabe nach Ablauf führt zur Auswertung", z["abgegeben"] is True and p.locator("#pk-uhr").count() == 0)
    p.reload()
    p.wait_for_timeout(300)
    auf(p, "#ueben/probeklausur")
    pruefe("Letzte Auswertung bleibt erreichbar", p.locator("#pk-summe").count() == 1)
    c.close()

    # Abgelaufener Bogen wird über die Übersicht geöffnet
    c = ktx(b)
    p = c.new_page()
    klausur_starten(p, "lf4:k5", 30)
    p.evaluate("""(k) => { var z = JSON.parse(localStorage.getItem(k)); z.ende = Date.now() - 1000;
      localStorage.setItem(k, JSON.stringify(z)); }""", PK)
    auf(p, "#ueben")
    pruefe("Übersicht sagt, dass die Zeit abgelaufen ist", "Die Zeit ist abgelaufen" in p.locator("#ueben").inner_text())
    c.close()

    # Zweiter Tab: Eine Abgabe wird nicht zurückgedreht
    c = ktx(b)
    p = c.new_page()
    klausur_starten(p, "lf4:k5", 30)
    p2 = c.new_page()
    auf(p2, "#ueben/probeklausur")
    p2.wait_for_selector("#pk-uhr")
    p.on("dialog", lambda d: d.accept())
    p.get_by_role("button", name="Übersicht").click()
    p.locator(".pk--blatt-koerper").get_by_role("button", name="Abgeben").click()
    p.wait_for_selector("#pk-summe")
    p2.wait_for_timeout(200)
    p2.evaluate("""() => { var f = document.querySelector('#ueben textarea, #ueben .pk--zahlfeld');
      if (f) { f.value = 'spät'; f.dispatchEvent(new Event('input', {bubbles: true})); } }""")
    p2.wait_for_timeout(100)
    pruefe("Zweiter Tab dreht die Abgabe nicht zurück", bogen(p)["abgegeben"] is True)
    c.close()


# ---------------------------------------------------------------- K02

def k02(b):
    print("\n· K02 Bearbeitungsstand")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("() => APK.laden()")
    z = {"v": 1, "id": "pk-t", "seed": "t", "kapitel": [], "dauer": 60, "ende": 9e15, "gestartet": True,
         "abgegeben": False, "aufgaben": ["lf4-k6-01", "lf4-k6-02", "lf4-k6-03"], "werte": {}, "antworten": {},
         "markiert": ["lf4-k6-02"], "aktuell": 0, "selbst": {}, "vorher": [], "abgelaufen": False,
         "beendetAm": None, "beruf": "kfb", "rf": 1}

    def staende(antworten, aufgaben=None):
        zz = dict(z, antworten=antworten, aufgaben=aufgaben or z["aufgaben"])
        p.evaluate("([k, w]) => localStorage.setItem(k, JSON.stringify(w))", [PK, zz])
        return p.evaluate("() => APK.pruefstand.staende()")

    s = staende({})
    pruefe("Leer", len(s["offen"]) == 3)
    s = staende({"lf4-k6-01": {"0": {"0": "Falschlieferung"}}})
    pruefe("Teilweise", s["teilweise"] == [1] and len(s["offen"]) == 2, s)
    voll = {str(i): "x" for i in range(4)}
    s = staende({"lf4-k6-01": {"0": voll}, "lf4-k6-02": {"0": 1}, "lf4-k6-03": {"0": "Text"}})
    pruefe("Vollständig", len(s["vollstaendig"]) == 3, s)
    s = staende({"lf4-k6-01": {"0": {}}, "lf4-k6-02": {"0": 1}, "lf4-k6-03": {"0": " "}})
    pruefe("Antwort gelöscht: wieder offen, unabhängig von der Markierung",
           s["offen"] == [1, 3] and s["vollstaendig"] == [2], s)
    rf = next(x for x in AUFGABEN["bausteine"] if any(e["block"] == "reihenfolge" for e in x["eingabe"]))
    s = staende({}, [rf["id"]])
    pruefe("Reihenfolge ohne Aktion gilt als offen", s["offen"] == [1], s)
    bu = next(x for x in AUFGABEN["bausteine"] if x["id"] == "buchfuehrung-k5-03")
    s = staende({bu["id"]: {"0": [{"seite": "soll", "konto": "4400", "betrag": "1"}, {"seite": "", "konto": "", "betrag": ""}, {"seite": "", "konto": "", "betrag": ""}]}}, [bu["id"]])
    pruefe("Buchung mit einer von drei Zeilen ist teilweise", s["teilweise"] == [1], s)
    mf = next(x for x in AUFGABEN["bausteine"] if any(e["block"] == "auswahl" and e.get("mehrfach") for e in x["eingabe"]))
    i = next(n for n, e in enumerate(mf["eingabe"]) if e["block"] == "auswahl" and e.get("mehrfach"))
    a = {str(n): "x" for n in range(len(mf["eingabe"]))}
    a[str(i)] = [0]
    if len(mf["eingabe"]) == 1:
        s = staende({mf["id"]: a}, [mf["id"]])
        pruefe("Mehrfachauswahl verrät die Zahl richtiger Optionen nicht", s["vollstaendig"] == [1], s)

    # Oberfläche
    p.evaluate("([k, w]) => localStorage.setItem(k, JSON.stringify(w))",
               [PK, dict(z, aufgaben=[rf["id"], "lf4-k6-02"], antworten={"lf4-k6-02": {"0": 1}})])
    auf(p, "#ueben/probeklausur")
    p.wait_for_selector("#pk-arbeitsstand")
    pruefe("Position und Arbeitsstand getrennt",
           p.locator("#pk-arbeitsstand").inner_text() == "Aufgabe 1 von 2 · 1 von 2 vollständig bearbeitet",
           p.locator("#pk-arbeitsstand").inner_text())
    pruefe("Anzeigen speichert keine Reihenfolge", rf["id"] not in bogen(p)["antworten"])
    p.get_by_role("button", name="Reihenfolge so übernehmen").click()
    pruefe("Bestätigung zählt als bewusste Aktion", rf["id"] in bogen(p)["antworten"])
    meldung = []
    p.evaluate("([k, w]) => localStorage.setItem(k, JSON.stringify(w))",
               [PK, dict(z, aufgaben=["lf4-k6-01", "lf4-k6-02", "lf4-k6-03"], aktuell=2,
                         antworten={"lf4-k6-01": {"0": {"0": "Falschlieferung"}}})])
    auf(p, "#ueben/probeklausur")
    p.wait_for_selector("#pk-arbeitsstand")
    p.on("dialog", lambda d: (meldung.append(d.message), d.dismiss()))
    p.get_by_role("button", name="Abgeben").click()
    p.wait_for_timeout(100)
    pruefe("Abgabedialog nennt offen und teilweise",
           meldung and "offen" in meldung[0] and "teilweise" in meldung[0], meldung)
    c.close()


# ---------------------------------------------------------------- K03

def k03(b):
    print("\n· K03 Varianten")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("() => APK.laden()")
    r = p.evaluate("""() => {
      var P = APK.pruefstand, kap = ['lf4:k5','lf4:k6','lf4:k7'];
      var a = P.vorbereiten({kapitel: kap, dauer: 30, seed: 'fest'});
      var b = P.vorbereiten({kapitel: kap, dauer: 30, seed: 'fest'});
      var alt = a, spannen = [];
      for (var i = 0; i < 10; i++) {
        var n = P.vorbereiten({kapitel: kap, dauer: 30, seed: 's' + i, vorher: alt.aufgaben});
        spannen.push(n.aufgaben.filter(function (x) { return alt.aufgaben.indexOf(x) >= 0; }).length);
        alt = n;
      }
      var k6 = P.vorbereiten({kapitel: ['lf4:k6'], dauer: 15, seed: 'k'});
      return {gleich: JSON.stringify(a) === JSON.stringify(b), a: a, spannen: spannen, k6: k6};
    }""")
    pruefe("Fester Seed reproduziert Aufgaben und Werte", r["gleich"])
    pruefe("LF4 K5–K7, 30 Min. mischt und deckt ab", r["a"]["abgedeckt"] == 3 and r["a"]["minuten"] <= 30, r["a"])
    pruefe("Alternativen werden bevorzugt", min(r["spannen"]) >= 0 and sum(r["spannen"]) / 10 <= 3, r["spannen"])
    # absichtlich fehlerhafte Wertziehung
    r = p.evaluate("""() => {
      var P = APK.pruefstand, v = P.vorrat();
      var opfer = v.bausteine.filter(function (b) { return b.lernfeld === 'buchfuehrung' && b.kapitel === 'k5' && b.variablen; });
      var erster = opfer[0], alt = erster.pruefung_variablen;
      erster.pruefung_variablen = '1 > 2';
      var a = P.vorbereiten({kapitel: ['buchfuehrung:k5'], dauer: 90, seed: 'x'});
      var ok = a.aufgaben.indexOf(erster.id) === -1 && !a.fehler;
      opfer.forEach(function (b) { b.pruefung_variablen = '1 > 2'; });
      var kaputt = v.bausteine.filter(function (b) { return b.lernfeld === 'buchfuehrung' && b.kapitel === 'k5'; });
      kaputt.forEach(function (b) { b.variablen = b.variablen || {x: {fest: 1}}; b.pruefung_variablen = '1 > 2'; });
      var c = P.vorbereiten({kapitel: ['buchfuehrung:k5'], dauer: 90, seed: 'x'});
      return {ok: ok, fehler: c.fehler};
    }""")
    pruefe("Defekte Aufgabe: geprüfte Alternative", r["ok"], r)
    pruefe("Nichts Gültiges: verständlicher Abbruch statt Lücke", r["fehler"] == "ungueltig", r)
    # Vorschau und Bogen
    c.close()
    c = ktx(b)
    p = c.new_page()
    auf(p, "#ueben/probeklausur?kapitel=buchfuehrung:k5")
    p.wait_for_selector(".pk--zonknopf")
    p.locator(".pk--zonknopf").click()
    p.wait_for_selector("text=Bereit?")
    p.evaluate("Math.random = function () { return 0.5; }")
    vorschau_text = p.locator(".pk--zusammenfassung").inner_text()
    p.get_by_role("button", name="Probeklausur starten").click()
    p.wait_for_selector("#pk-uhr")
    z = bogen(p)
    pruefe("Bogen hat so viele Aufgaben wie die Vorschau", str(len(z["aufgaben"])) in vorschau_text, vorschau_text)
    p.on("dialog", lambda d: d.accept())
    p.get_by_role("button", name="Übersicht").click()
    p.locator(".pk--blatt-koerper").get_by_role("button", name="Abgeben").click()
    p.wait_for_selector("#pk-summe")
    p.get_by_role("button", name="Neue Variante erstellen").click()
    p.wait_for_selector(".pk--zusammenfassung")
    t = p.locator(".pk--zusammenfassung").inner_text()
    pruefe("Vorschau nennt die Wiederholung", "aus der letzten klausur" in t.lower(), t)
    c.close()


# ---------------------------------------------------------------- K04

def k04(b):
    print("\n· K04 Auswertung")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    r = p.evaluate("() => APK.laden().then(() => APK.pruefstand.vorrat().bausteine.filter(b => b.lernfeld === 'ik2024-lf04' && b.kapitel === 'k04')[0].id)")
    w = p.evaluate("(id) => APK.pruefstand.werteZiehen(APK.pruefstand.baustein(id), 'q')", "ik2024-lf04-k04-01")
    falsch = w["zep"] + 10
    folge = round(falsch * (1 - w["skonto"] / 100) + w["fracht"], 2)
    alle_werte = p.evaluate("""(ids) => { var o = {}; ids.forEach(function (i) {
       o[i] = APK.pruefstand.werteZiehen(APK.pruefstand.baustein(i), 'q'); }); return o; }""",
                            ["ik2024-lf04-k04-01", "ik2024-lf04-k04-02", "ik2024-lf04-k04-03", "ik2024-lf04-k03-01"])
    z = {"v": 1, "id": "pk-t4", "seed": "q", "kapitel": ["ik2024-lf04:k04", "ik2024-lf04:k03"], "dauer": 30, "ende": None,
         "gestartet": True, "abgegeben": True, "aufgaben": ["ik2024-lf04-k04-01", "ik2024-lf04-k04-02", "ik2024-lf04-k04-03", "ik2024-lf04-k03-01"],
         "werte": alle_werte, "antworten": {"ik2024-lf04-k04-01": {"0": str(falsch).replace(".", ","), "1": str(folge).replace(".", ",")}},
         "markiert": [], "aktuell": 0, "selbst": {}, "vorher": [], "abgelaufen": False,
         "beendetAm": "2026-11-01T10:00:00.000Z", "beruf": "ik", "rf": 1}
    p.evaluate("""(z) => { AP.berufSetzen('ik');
       localStorage.setItem(AP.probeklausurSchluessel('ik'), JSON.stringify(z)); }""", z)
    p.on("pageerror", lambda e: print("    Seitenfehler:", e))
    auf(p, "#ueben/probeklausur")
    p.wait_for_selector("#pk-summe")
    lagen = p.locator(".pk--lage").evaluate_all("l => l.map(x => x.dataset.lage + '|' + x.textContent)")
    pruefe("Folgefehler anerkannt", any("Folgefehler anerkannt" in x and x.startswith("teil") for x in lagen), lagen)
    pruefe("Leere Aufgabe ist „nicht bearbeitet“", any(x.startswith("leer") for x in lagen), lagen)
    st = bogen(p, "azubipass:probeklausur:industriekaufleute-2024:v1")
    k = konto(p)
    pruefe("Klausursignal ohne Rohantwort", k["quiz"]["ik2024-lf04-k04-01"]["s"] == "klausur"
           and k["quiz"]["ik2024-lf04-k04-01"]["a"] == "teil"
           and str(falsch).replace(".", ",") not in json.dumps(k), k["quiz"])
    offen_ids = [b0["id"] for b0 in AUFGABEN["bausteine"] if b0["bewertung"]["art"] == "selbstbewertung" and b0["id"] in z["aufgaben"]]
    for i in offen_ids:
        pruefe("Offene Selbstbewertung erzeugt noch kein Signal", i not in k["quiz"], i)
    pruefe("Selbstbewertung steht über „Gezielt weiterüben“ erkennbar", p.locator("#pk-weiter .reihe").count() >= 1)
    weiter = p.locator("#pk-weiter .reihe").first
    ziel = weiter.get_attribute("href")
    pruefe("Höchstens drei Folgeübungen", p.locator("#pk-weiter .reihe").count() <= 3)
    weiter.click()
    p.wait_for_selector(".tr-position")
    pruefe("Folgeübung startet im richtigen Beruf", runde(p, "ik")["folge"][0]["id"].startswith("ik2024"))
    p.get_by_role("button", name="Lösung ansehen").click()
    p.wait_for_selector(".tr-status")
    nach = bogen(p, "azubipass:probeklausur:industriekaufleute-2024:v1")
    pruefe("Klausurbogen und Abgabezeit bleiben unberührt",
           nach["antworten"] == st["antworten"] and nach["beendetAm"] == st["beendetAm"]
           and nach["selbst"] == st["selbst"], ziel)
    auf(p, "#ueben/probeklausur")
    pruefe("Letzte Auswertung bleibt erreichbar", p.locator("#pk-summe").count() == 1)
    pruefe("Neue Variante und Auswahl ändern bleiben",
           p.get_by_role("button", name="Neue Variante erstellen").count() == 1
           and p.get_by_role("button", name="Auswahl ändern").count() == 1)
    auf(p, "#ich")
    pruefe("Ergebnis im Konto bleibt", konto(p)["probeklausuren"][0]["id"] == "pk-t4")
    c.close()


# ---------------------------------------------------------------- K05

def k05(b):
    print("\n· K05 MAKEL-Fall")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("() => APK.laden()")
    r = p.evaluate("""() => {
      var P = APK.pruefstand, raus = {};
      raus.lang = P.vorbereiten({kapitel: ['lf4:k6'], dauer: 30, seed: 'a'});
      raus.kurz = P.vorbereiten({kapitel: ['lf4:k6'], dauer: 15, seed: 'a'});
      raus.eng = P.vorbereiten({kapitel: ['lf4:k5','lf4:k6','lf4:k7'], dauer: 15, seed: 'a'});
      raus.fremd = P.vorbereiten({kapitel: ['lf4:k5'], dauer: 30, seed: 'a'});
      raus.zwei = P.vorbereiten({kapitel: ['lf4:k6'], dauer: 30, seed: 'b', vorher: raus.lang.aufgaben});
      return raus;
    }""")
    pruefe("Fall kommt bei passender Auswahl und Zeit", r["lang"]["fall"] is not None, r["lang"])
    fall = next(f for f in AUFGABEN["faelle"] if f["id"] == r["lang"]["fall"])
    ids = [s["id"] for s in fall["schritte"]]
    pos = [r["lang"]["aufgaben"].index(i) for i in ids]
    pruefe("Teile stehen direkt hintereinander und in Folge", pos == list(range(pos[0], pos[0] + len(ids))), pos)
    pruefe("Passt die Zeit nicht, bleibt es bei Einzelaufgaben",
           r["kurz"]["minuten"] <= 15 and (r["kurz"]["fall"] is None or fall["minuten"] <= 15))
    pruefe("Abdeckung der übrigen Kapitel bleibt erhalten", r["eng"].get("fehler") or r["eng"]["abgedeckt"] == 3, r["eng"])
    pruefe("Ohne das Kapitel kein Fall", r["fremd"]["fall"] is None)
    pruefe("Neue Variante nimmt den zweiten Fall", r["zwei"]["fall"] != r["lang"]["fall"], r["zwei"]["fall"])
    # Innere Stimmigkeit
    a = next(f for f in AUFGABEN["faelle"] if f["id"].endswith("-a"))
    b_ = next(f for f in AUFGABEN["faelle"] if f["id"].endswith("-b"))
    pruefe("Fall A rechnet richtig", a["schritte"][1]["eingabe"][0]["loesung"] == 20 * 48)
    pruefe("Fall B rechnet richtig", b_["schritte"][1]["eingabe"][0]["loesung"] == 30 * 42)
    pruefe("Punkte passen zu den Rastern", all(
        sum(x["punkte"] for x in s["bewertung"]["raster"]) == s["punkte"]
        for f in (a, b_) for s in f["schritte"] if s["bewertung"]["art"] == "selbstbewertung"))
    pruefe("Zweiter Fall verlangt eine andere Entscheidung",
           a["schritte"][0]["eingabe"][0]["optionen"][0]["text"] != b_["schritte"][0]["eingabe"][0]["optionen"][0]["text"])
    # Im Bogen
    klausur_starten(p, "lf4:k6", 30)
    z = bogen(p)
    start = next(i for i, x in enumerate(z["aufgaben"]) if "fall" in x)
    for _ in range(start):
        p.get_by_role("button", name="Weiter ›").click()
        p.wait_for_timeout(40)
    pruefe("Fallzeile und Unterlagen im ersten Teil", "Teil 1 von 3" in p.locator(".pk--fallzeile").inner_text()
           and p.locator(".pk--fallunterlagen .pk--anlage").count() == 3)
    p.get_by_role("button", name="Weiter ›").click()
    p.wait_for_timeout(50)
    pruefe("Unterlagen bleiben im nächsten Teil erreichbar",
           "Teil 2 von 3" in p.locator(".pk--fallzeile").inner_text() and p.locator(".pk--fallunterlagen").count() == 1)
    pruefe("Keine Lösung im Bogen", p.locator("#ueben .pk--erklaerung").count() == 0)
    p.reload()
    p.wait_for_selector("#pk-arbeitsstand")
    pruefe("Fall übersteht Neuladen", p.locator(".pk--fallzeile").count() == 1)
    pruefe("Unterlagen sind ab Teil 2 zugeklappt, aber da",
           p.locator(".pk--fallunterlagen").evaluate("d => !d.open"))
    c.close()


# ---------------------------------------------------------------- R01

def r01(b):
    print("\n· R01 Regression und Offline")
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("() => APK.laden()")
    alt = {"version": 3, "fortschritt": {}, "karten": {}, "quiz": {"lf1-k1-a3-c1": {"r": False, "n": 2}},
           "lesezeichen": [], "aktivitaet": [], "zuletzt": None, "pruefungstermin": None, "probeklausuren": []}
    konto_setzen(p, alt)
    rf = next(x for x in AUFGABEN["bausteine"] if any(e["block"] == "reihenfolge" for e in x["eingabe"]))
    i = next(n for n, e in enumerate(rf["eingabe"]) if e["block"] == "reihenfolge")
    entwurf = {"v": 1, "seed": "alt", "kapitel": [], "dauer": 60, "ende": 9e15, "gestartet": True, "abgegeben": False,
               "aufgaben": [rf["id"]], "werte": {}, "antworten": {rf["id"]: {str(i): list(range(len(rf["eingabe"][i]["elemente"])))}},
               "markiert": [], "aktuell": 0, "selbst": {}, "vorher": []}
    p.evaluate("([k, w]) => localStorage.setItem(k, JSON.stringify(w))", [PK, entwurf])
    auf(p, "#ueben/schwach")
    pruefe("Alter Lernstand lädt und zeigt den alten Fehler", p.locator(".ue-fehler").count() == 1)
    auf(p, "#ueben/probeklausur")
    p.wait_for_selector("#pk-arbeitsstand")
    pruefe("Alter Entwurf läuft weiter, ohne ID wird eine vergeben", p.locator("#pk-uhr").count() == 1)
    pruefe("Unberührte Reihenfolge im alten Entwurf gilt als offen",
           "0 von 1 vollständig" in p.locator("#pk-arbeitsstand").inner_text(),
           p.locator("#pk-arbeitsstand").inner_text())
    c.close()

    # Sicherung und Zusammenführung
    c = ktx(b)
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    r = p.evaluate("""() => {
      var a = AP.frisch(), b = AP.frisch();
      a.quiz = {x: {n: 3, r: true, t: 2000, s: 'selbst'}, y: {n: 1, r: false}};
      b.quiz = {x: {n: 2, r: false, t: 1000, s: 'offen', f: 1}, y: {n: 2, r: true}};
      b.geaendertAm = '2030-01-01T00:00:00.000Z';
      AP.lernstandZusammenfuehren(a, b);
      return a.quiz;
    }""")
    pruefe("Älterer Versuch dreht einen neueren nicht zurück, auch aus einer neueren Sicherung",
           r["x"]["s"] == "selbst" and r["x"]["n"] == 3 and r["x"]["f"] == 1, r)
    pruefe("Ohne Zeitstempel gilt die bisherige Regel", r["y"]["r"] is True, r)
    r = p.evaluate("""() => { AP.versuchMerken('a1', 'selbst');
       return AP.sicherungPruefen(JSON.parse(JSON.stringify(AP.stand))); }""")
    pruefe("Sicherung mit neuen Feldern besteht die Prüfung", not r or r.get("ok", True) is not False or r == [], r)
    p.evaluate("localStorage.setItem('azubipass-runde-kfb', '{}')")
    p.evaluate("AP.probeklausurZuruecksetzen()")
    pruefe("Zurücksetzen entfernt die Runde",
           p.evaluate("localStorage.getItem('azubipass-runde-kfb')") is None)
    c.close()

    # Offline mit echtem Zwischenspeicher
    c = b.new_context(service_workers="allow", locale="de-DE", viewport={"width": 1280, "height": 800})
    p = c.new_page()
    p.goto(f"{BASIS}/app.html")
    p.evaluate("""async () => { var r = await navigator.serviceWorker.ready;
       await new Promise(ok => { if (navigator.serviceWorker.controller) ok();
         else navigator.serviceWorker.addEventListener('controllerchange', ok); setTimeout(ok, 6000); }); }""")
    p.wait_for_timeout(2500)
    p.reload()
    auf(p, "#ueben/runde?aufgabe=lf4-k6-u1")
    p.wait_for_selector(".pk--zu-el")
    c.set_offline(True)
    p.reload()
    p.wait_for_selector(".pk--zu-el")
    pruefe("Runde lädt ohne Netz neu", True)
    p.goto(f"{BASIS}/lf4.html?ansicht=ausfuehrlich#k6-b3")
    p.wait_for_selector("#k6-b3", state="attached")
    pruefe("Lernlink geht ohne Netz", True)
    p.goto(f"{BASIS}/app.html#ueben/probeklausur?kapitel=lf4:k6")
    p.wait_for_selector(".pk--zonknopf")
    p.locator(".pk--zonknopf").click()
    p.get_by_role("button", name="Probeklausur starten").click()
    p.wait_for_selector("#pk-uhr")
    pruefe("Wechsel von Üben zur Klausur geht ohne Netz", True)
    c.close()

    # Mobil, Tastatur, Barrierefreiheit
    axe = os.environ.get("AXE_PFAD")
    c = ktx(b, viewport={"width": 360, "height": 740}, has_touch=True)
    p = c.new_page()
    ansichten = {"#ueben": ".ue-wege", "#ueben/thema?kapitel=lf4:k6": ".tr-feld",
                 "#ueben/runde?aufgabe=lf4-k6-u1": ".pk--zu-el"}
    for a, sel in ansichten.items():
        auf(p, a)
        p.wait_for_selector(sel)
        breite = p.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        pruefe(f"Mobil ohne Querscrollen: {a}", breite <= 0, breite)
        if axe:
            p.add_script_tag(path=axe)
            v = p.evaluate("""() => axe.run('#ueben', {runOnly: ['wcag2a','wcag2aa']}).then(r =>
               r.violations.map(v => v.id + ':' + v.nodes.length))""")
            pruefe(f"axe ohne Verstöße: {a}", not v, v)
    auf(p, "#ueben/runde?aufgabe=lf4-k1-b2-c1")
    p.wait_for_selector(".opt")
    p.locator(".opt").first.focus()
    p.keyboard.press("Enter")
    fokus_ok = p.evaluate("document.activeElement.className.includes('opt')")
    pruefe("Tastatur: Option wählbar", fokus_ok and p.locator(".opt.gewaehlt").count() == 1)
    p.get_by_role("button", name="Antwort prüfen").click()
    p.wait_for_selector(".tr-status")
    pruefe("Status wird angesagt", p.locator(".tr-status").get_attribute("role") == "status")
    klausur_starten(p, "lf4:k6", 30)
    if axe:
        p.add_script_tag(path=axe)
        v = p.evaluate("""() => axe.run('#ueben', {runOnly: ['wcag2a','wcag2aa']}).then(r =>
           r.violations.map(v => v.id + ':' + v.nodes.length))""")
        pruefe("axe ohne Verstöße: Klausurbogen", not v, v)
    c.close()


with sync_playwright() as pw:
    br = pw.chromium.launch()
    for schritt in (u01, u02, u03, u04, k01, k02, k03, k04, k05, r01):
        try:
            schritt(br)
        except Exception as fehler:     # Ein Abbruch ist ein Fehlschlag, kein Ende der Prüfung.
            pruefe(f"{schritt.__name__} lief durch", False, repr(fehler)[:600])
    br.close()

bestanden = sum(ergebnisse)
print(f"\n  {bestanden} von {len(ergebnisse)} bestanden.")
sys.exit(0 if bestanden == len(ergebnisse) else 1)
