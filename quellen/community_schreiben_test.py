#!/usr/bin/env python3
"""
AzubiPass · Beitrag schreiben, Antworten, beste Antwort, Paketsperre (Spec 05)

    COMMUNITY_TEST_PASSWORT=… AXE_PFAD=…/axe.min.js python3 community_schreiben_test.py [--bilder ORDNER]

Abnahmefälle aus doku/community/05-schreiben-antworten.md (Version 1) und
doku/community/05-technik-plan.md. Legt mit Anna und Ben echte Testbeiträge
an (Titel beginnen mit „[Test05]“) und räumt am Ende alles wieder auf.
test-neu2 ist ein normales Klassenkonto mit Profil: Es steht nicht in
beitraege_tester und muss gesperrt bleiben.

  [echt]  läuft vollständig gegen Supabase
  [mock]  eine einzelne Antwort wird im Browser abgefangen, angehalten oder
          verworfen (verlorene Antwort, Serverablehnung) – der Rest ist echt

Passwort steht bewusst nicht im Repo. Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import json
import os
import socketserver
import struct
import sys
import threading
import zlib
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
# axe-core 4.10.2 (npm), Pfad über AXE_PFAD – liegt bewusst nicht im Repo.
AXE = Path(os.environ.get("AXE_PFAD", "node_modules/axe-core/axe.min.js"))
ANNA = "demo-anna@azubipass.invalid"
BEN = "demo-ben@azubipass.invalid"
TEAM = "test-neu1@azubipass.invalid"
KLASSE = "test-neu2@azubipass.invalid"     # Profil, aber nicht freigeschaltet
PRAEFIX = "[Test05] "
RPC_B = "**/rest/v1/rpc/beitrag_mit_anhaengen*"
RPC_A = "**/rest/v1/rpc/antwort_senden*"
SPEICHER = "**/storage/v1/object/lernzettel/**"

fehler = []


def pruefe(bedingung, text, wert="", art="echt"):
    print(f"  {'OK  ' if bedingung else 'FEHL'} [{art}] {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def png(w=40, h=30):
    zeile = b"\x00" + b"\x1b\x43\x32" * w
    roh = zeile * h
    def stueck(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    return (b"\x89PNG\r\n\x1a\n" + stueck(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
            + stueck(b"IDAT", zlib.compress(roh)) + stueck(b"IEND", b""))


JS_HILFE = """
window.T = {
  versuch: async (fn) => { try { return { ok: true, wert: await fn() }; }
                           catch (e) { return { ok: false, fehler: e.message, art: e.art }; } },
  anmelden: async (mail, pw) => {
    const c = await AP.community.verbinden();
    const r = await c.auth.signInWithPassword({ email: mail, password: pw });
    if (r.error) throw new Error(r.error.message);
    return r.data.user.id;
  },
  roh: async (fn) => { const c = await AP.community.verbinden(); return fn(c); }
};
"""


def main():
    pw = os.environ.get("COMMUNITY_TEST_PASSWORT")
    if not pw:
        print("COMMUNITY_TEST_PASSWORT setzen.")
        return 2
    bilder = None
    if "--bilder" in sys.argv:
        bilder = Path(sys.argv[sys.argv.index("--bilder") + 1])
        bilder.mkdir(parents=True, exist_ok=True)
    PNG = png()

    handler = functools.partial(Stiller, directory=str(DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        basis = f"http://127.0.0.1:{srv.server_address[1]}/"

        with sync_playwright() as p:
            browser = p.chromium.launch()
            ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                      service_workers="block", locale="de-DE")
            seite = ctx.new_page()
            anfragen = []
            ctx.on("request", lambda r: anfragen.append((r.method, r.url, r.post_data if r.method == "POST" and "/rest/v1/rpc/" in r.url else None)))
            dialoge = []
            seite.on("dialog", lambda d: (dialoge.append(d.type), d.accept()))
            seite.goto(basis + "app.html#heute")
            seite.wait_for_function("window.AP && AP.community")
            seite.evaluate(JS_HILFE)
            ev = lambda js, *a: seite.evaluate(js, *a)

            def bild(name):
                if bilder:
                    seite.screenshot(path=str(bilder / f"{name}.png"), full_page=True)

            def als(mail):
                return ev("([m, p]) => T.anmelden(m, p)", [mail, pw])

            def ab():
                ev("() => AP.community.abmelden().catch(() => {})")

            def titel(erwartet, warte=20000):
                try:
                    seite.wait_for_function("(t) => { const h = document.querySelector('#community h1');"
                                            " return h && h.textContent.trim() === t; }", arg=erwartet, timeout=warte)
                    return True
                except Exception:
                    return False

            def text_da(t, warte=20000):
                try:
                    seite.wait_for_function("(t) => document.querySelector('#community').textContent.includes(t)",
                                            arg=t, timeout=warte)
                    return True
                except Exception:
                    return False

            def oeffne(h):
                ev("(h) => { location.hash = h; }", h)

            laeufe = [0]
            def neu_laden(h):
                laeufe[0] += 1                 # eigene Adresse: sonst nur ein Sprung im Dokument
                seite.goto(basis + f"app.html?n={laeufe[0]}" + h)
                seite.wait_for_function("window.AP && AP.community")
                seite.evaluate(JS_HILFE)

            def feld(name):
                return seite.locator("xpath=//*[@id='community']//div[contains(@class,'cm-feld')]"
                                     f"[label[normalize-space(text())='{name}']]//*[self::input or self::textarea or self::select]").first

            def art(wert):
                seite.check(f"#community input[name=cm-beitragsart][value={wert}]")

            def senden():
                seite.click("#community button[type=submit]")

            def c06():
                oeffne("#community/schreiben")
                return titel("Beitrag schreiben")

            def detail_id():
                return ev("() => (location.hash.match(/beitrag\\/([0-9a-f-]{36})/) || [])[1] || null")

            def zahl_beitraege(titel_):
                r = ev("""async (t) => T.roh(async (c) => (await c.from('beitrag').select('id').eq('titel', t)).data || [])""", titel_)
                return len(r)

            def eigene_loeschen(nur_dateien=False):
                ev("""async ([praefix, nurDateien]) => { const c = await AP.community.verbinden();
                    const u = (await c.auth.getUser()).data.user.id;
                    const r = await c.from('beitrag').select('id').eq('autor_id', u).like('titel', praefix + '%');
                    if (!nurDateien) for (const b of (r.data || [])) await AP.community.beitragLoeschen(b.id).catch(() => {});
                    const l = await c.storage.from('lernzettel').list(u, { limit: 100 });
                    const frei = (l.data || []).map(x => u + '/' + x.name);
                    const ref = (await c.from('beitrag').select('datei_pfad').eq('autor_id', u)).data || [];
                    const benutzt = new Set(ref.map(x => x.datei_pfad));
                    const weg = frei.filter(x => !benutzt.has(x));
                    if (weg.length) await c.storage.from('lernzettel').remove(weg); }""", [PRAEFIX, nur_dateien])

            # ------------------------------------------------ Aufräumen alter Läufe
            for konto in (ANNA, BEN):
                als(konto)
                eigene_loeschen()
                ab()

            # ================================================ Paketsperre
            print("Paketsperre")
            als(ANNA)
            r = ev("(e) => T.versuch(() => AP.community.veroeffentlichen(e))",
                   {"art": "frage", "titel": PRAEFIX + "Sichtbar nur für Tester", "text": "Geheim für die Klasse"})
            pruefe(r["ok"], "Tester:in veröffentlicht über die neue RPC", r.get("fehler", ""))
            P_tester = r.get("wert")
            pruefe(ev("() => AP.community.beitraegeFrei()") is True, "beitraege_frei() für Anna: true")
            ab()
            als(KLASSE)
            pruefe(ev("() => AP.community.beitraegeFrei()") is False, "beitraege_frei() für Klassenkonto: false")
            r = ev("() => T.roh(async (c) => (await c.from('beitrag_liste').select('id, titel')).data)")
            pruefe(r == [], "Direkte API: Klassenkonto liest keine Beiträge", len(r or []))
            r = ev("(id) => T.roh(async (c) => (await c.from('antwort').select('id').eq('beitrag_id', id)).data)", P_tester)
            pruefe(r == [], "Direkte API: keine Antworten")
            r = ev("""() => T.versuch(() => AP.community.veroeffentlichen({ art: 'frage', titel: '[Test05] Klasse', text: 'x' }))""")
            pruefe(not r["ok"] and r.get("art") == "gesperrt", "Direkte API: Veröffentlichen gesperrt", r)
            r = ev("(id) => T.versuch(() => AP.community.antwortSchreiben(id, 'Hallo'))", P_tester)
            pruefe(not r["ok"], "Direkte API: Antworten gesperrt", r.get("fehler"))
            r = ev("""() => T.roh(async (c) => { const u = (await c.auth.getUser()).data.user.id;
                const f = new File([new Uint8Array([137,80,78,71])], 'x.png', { type: 'image/png' });
                const r = await c.storage.from('lernzettel').upload(u + '/sperre.png', f);
                return r.error ? 'abgelehnt' : 'hochgeladen'; })""")
            pruefe(r == "abgelehnt", "Direkte API: kein Upload in den eigenen Ordner", r)
            r = ev("() => T.roh(async (c) => (await c.from('beitrag').insert({ art: 'tipp', titel: '[Test05] direkt', text: '' })).error ? 'abgelehnt' : 'angelegt')")
            pruefe(r == "abgelehnt", "Direkte API: auch der alte Insert ist gesperrt", r)
            # Oberfläche
            ab_hier = len(anfragen)
            neu_laden("#community")
            pruefe(text_da("Beiträge sind für die Klassen-Beta noch nicht freigeschaltet."), "UI: Sperrhinweis statt Übersicht")
            pruefe(seite.locator("#community a:has-text('Zu Lernen')").count() >= 1
                   and seite.locator("#community a:has-text('Profil')").count() >= 1
                   and seite.locator("#community button:has-text('Abmelden')").count() == 1,
                   "UI: Zu Lernen, Profil, Regeln und Abmelden bleiben")
            for ziel in ("#community/beitrag/" + str(P_tester), "#community/schreiben"):
                oeffne(ziel)
                seite.wait_for_timeout(300)
                pruefe(text_da("noch nicht freigeschaltet") and not text_da("Geheim", 500) and not text_da("Sichtbar nur", 500)
                       and seite.locator("#community form").count() == 0,
                       "UI: Direktlink endet gesperrt ohne Daten: " + ziel.split("/")[1])
            beitragsabfragen = [u for m, u, _ in anfragen[ab_hier:] if "/rest/v1/beitrag" in u or "/rest/v1/antwort" in u
                                or "/storage/v1/" in u]
            pruefe(not beitragsabfragen, "UI: keine einzige Beitrags-, Antwort- oder Dateiabfrage", beitragsabfragen[:3])
            oeffne("#community/profil")
            pruefe(titel("Profil") and seite.locator("#community a:has-text('Zu Beiträgen')").count() == 0,
                   "Profil bleibt erreichbar, ohne Weg in gesperrte Beiträge")
            bild("01-gesperrt")
            ab()

            # ================================================ C06 Formular
            print("C06 Formular")
            als(ANNA)
            neu_laden("#community")
            titel("Beiträge")
            pruefe(c06(), "C06 über #community/schreiben")
            pruefe(text_da("Für alle in der Community") and text_da("Stell eine Frage oder teile einen Lernzettel oder Tipp."),
                   "Ziel und Einleitung")
            pruefe(seite.is_checked("#community input[value=frage]"), "Frage ist vorausgewählt")
            pruefe(seite.is_visible("text=Frage an Mentor:innen richten") and feld("Bilder hinzufügen (optional)").is_visible()
                   and not feld("PDF-Datei").is_visible(), "Bei Frage: Mentor:innen-Option, Bilder optional, kein PDF")
            ab_hier = len(anfragen)
            senden()
            seite.wait_for_selector("#community .cm-uebersicht")
            ueb = seite.inner_text("#community .cm-uebersicht")
            pruefe("Bitte prüfe deine Eingaben:" in ueb and "Der Titel braucht 3 bis 120 Zeichen." in ueb
                   and "Gib einen Text für deine Frage ein." in ueb, "Leeres Absenden: Fehlerübersicht mit beiden Feldern", ueb.replace("\n", " | "))
            pruefe(ev("() => document.activeElement.classList.contains('cm-uebersicht')"), "Fokus auf der Fehlerübersicht")
            pruefe(feld("Titel").get_attribute("aria-invalid") == "true", "aria-invalid am Titel")
            pruefe(not [u for m, u, _ in anfragen[ab_hier:] if "/rest/v1/" in u], "Lokale Prüfung: keine Serveranfrage")
            feld("Titel").fill("Wie")
            pruefe(seite.locator("#community .cm-uebersicht li").count() == 1 and feld("Titel").get_attribute("aria-invalid") is None,
                   "Korrektur entfernt den Fehler ohne neue Übersicht")
            # Längen in Codepunkten (Nicht-BMP)
            feld("Titel").fill("𝔄" * 121)
            z = seite.inner_text("#community .cm-zaehler >> nth=0")
            pruefe(z == "121 / 120 Zeichen" and text_da("Der Titel braucht 3 bis 120 Zeichen."), "121 Codepunkte (Nicht-BMP): Zählung und Fehler", z)
            pruefe("Der Titel braucht" in ev("() => document.querySelector('#community .cm-schreiben .cm-nur-vorlesen').textContent"),
                   "Grenzverletzung wird angesagt")
            feld("Titel").fill("𝔄" * 120)
            pruefe(seite.inner_text("#community .cm-zaehler >> nth=0") == "120 / 120 Zeichen"
                   and feld("Titel").get_attribute("aria-invalid") is None, "120 Codepunkte: gültig")
            feld("Text").fill("x" * 4001)
            pruefe(text_da("Der Text darf höchstens 4000 Zeichen lang sein."), "4001 Zeichen Text: Fehler")
            feld("Text").fill("   \n  ")
            art("tipp")
            senden()
            pruefe(text_da("Gib einen Text für deinen Tipp ein."), "Tipp: Text nur aus Leerzeichen ist leer")
            # Lernzettel
            art("lernzettel")
            # Spec 07: Lernzettel mit Bildern (Standard) oder einem PDF
            pruefe(seite.is_visible("text=Beschreibung (optional)") and feld("Bilder").is_visible()
                   and not seite.is_visible("text=Frage an Mentor:innen richten"), "Lernzettel: Beschreibung optional, Bilder, keine Mentor:innen")
            pruefe(feld("Beschreibung (optional)").get_attribute("aria-required") is None, "Beschreibung ohne aria-required")
            pruefe(text_da("Bis zu 5 Bilder. JPG, PNG oder WebP") and text_da("Keine echten IHK-Prüfungsaufgaben"), "Bild-Hilfe und Uploadhinweis")
            senden()
            pruefe(text_da("Wähle mindestens ein Bild für deinen Lernzettel oder wechsle zu PDF."), "Lernzettel ohne Anhang: Fehler")
            ab_hier = len(anfragen)
            feld("Bilder").set_input_files({"name": "notiz.txt", "mimeType": "text/plain", "buffer": b"hallo"})
            pruefe(text_da("notiz.txt: Dieses Bildformat wird nicht unterstützt."), "Falscher Typ: Fehler mit Dateiname")
            feld("Bilder").set_input_files({"name": "kontenrahmen.png", "mimeType": "image/png", "buffer": PNG})
            pruefe(text_da("1 von 5 Bildern ausgewählt."), "Bild ausgewählt, Vorschau")
            seite.check("#community input[name=cm-lz-modus][value=pdf]")
            seite.click("dialog button:has-text('Bilder entfernen')")
            feld("PDF-Datei").set_input_files({"name": "genau.pdf", "mimeType": "application/pdf", "buffer": b"%PDF" + b"\0" * (5242880 - 4)})
            pruefe(text_da("Ausgewählt: genau.pdf") and feld("PDF-Datei").get_attribute("aria-invalid") is None, "PDF exakt 5 MiB: zulässig")
            pruefe(not [u for m, u, _ in anfragen[ab_hier:] if "/storage/v1/" in u], "Kein Upload bei Dateiauswahl")
            seite.click("#community button:has-text('PDF entfernen')")
            pruefe(text_da("Keine Datei ausgewählt.") and ev("() => document.activeElement.type") == "file",
                   "PDF entfernen, Fokus auf der Dateiauswahl")
            seite.check("#community input[name=cm-lz-modus][value=bilder]")
            # Lernfeld / Kapitel
            pruefe(not feld("Kapitel (optional)").is_visible(), "Kapitel erst nach Lernfeld")
            feld("Lernfeld (optional)").select_option("buchfuehrung")
            kap = ev("() => [...document.querySelectorAll('#community select')][1].options.length")
            pruefe(kap > 1, "Kapitel aus dem geladenen Katalog", kap)
            feld("Kapitel (optional)").select_option(index=2)
            feld("Lernfeld (optional)").select_option("lf1")
            pruefe(feld("Kapitel (optional)").input_value() == "" and
                   seite.is_visible("text=Das Kapitel wurde zurückgesetzt, weil du das Lernfeld gewechselt hast."),
                   "Lernfeldwechsel setzt Kapitel sichtbar zurück")
            bild("02-c06-fehler")
            # Tastaturreihenfolge (Frage, frisches Formular)
            seite.click("#community button:has-text('Abbrechen')")
            seite.wait_for_selector("dialog.cm-dialog")
            pruefe(seite.inner_text("dialog.cm-dialog h2") == "Deine Eingaben wurden noch nicht gesendet. Möchtest du sie verwerfen?"
                   and ev("() => document.activeElement.textContent") == "Weiter schreiben", "Abbrechen: Rückfrage, Fokus auf „Weiter schreiben“")
            seite.keyboard.press("Escape")
            seite.wait_for_timeout(200)
            pruefe(seite.locator("dialog.cm-dialog").count() == 0 and feld("Titel").input_value() == "𝔄" * 120
                   and ev("() => document.activeElement.textContent") == "Abbrechen", "Escape: weiter schreiben, Eingaben bleiben, Fokus zurück")
            seite.click("#community button:has-text('Abbrechen')")
            seite.click("dialog.cm-dialog button:has-text('Eingaben verwerfen')")
            pruefe(titel("Beiträge"), "Eingaben verwerfen: zurück zu Beiträgen")
            c06()
            pruefe(feld("Titel").input_value() == "" and seite.is_checked("#community input[value=frage]"), "Danach leeres Formular")
            seite.click("#community button:has-text('Abbrechen')")
            pruefe(titel("Beiträge") and seite.locator("dialog.cm-dialog").count() == 0, "Ohne Eingaben: Abbrechen ohne Rückfrage")
            c06()
            ev("document.querySelector('#community h1').focus()")
            folge = []
            for _ in range(10):
                seite.keyboard.press("Tab")
                folge.append(ev("() => { const a = document.activeElement; return a.type === 'radio' ? 'radio:' + a.value : a.type === 'checkbox' ? 'checkbox:' + a.closest('label').textContent.trim()"
                                " : (a.closest('.cm-feld') && a.closest('.cm-feld').querySelector('label') ? a.closest('.cm-feld').querySelector('label').firstChild.textContent : a.textContent).trim(); }"))
            erwartet = ["radio:frage", "Titel", "Text", "Lernfeld (optional)", "", "Beitrag veröffentlichen", "Abbrechen"]
            # Die Mentor:innen-Checkbox liegt im Label; ihr Text kommt über das Label.
            pruefe(folge[0] == "radio:frage" and folge[1] == "Titel" and folge[2] == "Text" and folge[3] == "Lernfeld (optional)"
                   and "Mentor" in folge[4] and folge[5] == "Beitrag veröffentlichen" and folge[6] == "Abbrechen",
                   "Tastatur: Art, Titel, Text, Lernfeld, Mentor:innen, Absenden, Abbrechen", folge[:7])

            # ================================================ Veröffentlichen (echt)
            print("Veröffentlichen")
            T_frage = PRAEFIX + "Was ist der Unterschied zwischen Skonto und Rabatt?"
            feld("Titel").fill(T_frage)
            feld("Text").fill("Zeile eins\nZeile <b>zwei</b>")
            feld("Lernfeld (optional)").select_option("buchfuehrung")
            seite.check("#community input[type=checkbox]")
            senden()
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            P_frage = detail_id()
            pruefe(text_da("Dein Beitrag wurde veröffentlicht.") and titel(T_frage), "Erfolg: C05 des eigenen Beitrags mit Bestätigung")
            pruefe(text_da("Zeile <b>zwei</b>") and seite.locator("#community .cm-text b").count() == 0, "Text als Klartext")
            pruefe("AN MENTOR:INNEN" in seite.inner_text("#community .cm-kopf").upper(), "Mentor:innen-Kennzeichnung gesendet")
            pruefe(zahl_beitraege(T_frage) == 1, "Genau ein Beitrag in der Datenbank")
            body = [json.loads(b) for m, u, b in anfragen if "rpc/beitrag_mit_anhaengen" in u and b]
            pruefe(body and body[-1]["p_vorgang"] == P_frage and body[-1]["p_an_mentoren"] is True,
                   "Vorgangskennung ist die Beitrags-ID")
            seite.go_back()
            pruefe(titel("Beiträge"), "Zurück aus C05 führt nicht ins Formular")
            # Mentor:innen nur bei Frage
            c06()
            seite.check("#community input[type=checkbox]")
            art("tipp")
            T_tipp = PRAEFIX + "Tipp: Konten immer zuerst benennen"
            feld("Titel").fill(T_tipp)
            feld("Text").fill("Hilft beim Buchungssatz.")
            senden()
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            P_tipp = detail_id()
            body = [json.loads(b) for m, u, b in anfragen if "rpc/beitrag_mit_anhaengen" in u and b][-1]
            pruefe(body["p_an_mentoren"] is False and body["p_art"] == "tipp", "Mentor:innen-Option bei Tipp nicht mitgesendet")
            # Lernzettel mit Bild
            c06()
            art("lernzettel")
            T_lz = PRAEFIX + "Lernzettel Kontenrahmen"
            feld("Titel").fill(T_lz)
            feld("Bilder").set_input_files({"name": "kontenrahmen.png", "mimeType": "image/png", "buffer": PNG})
            senden()
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=30000)
            P_lz = detail_id()
            seite.wait_for_selector("#community img.cm-bild", timeout=20000)
            pfad = ev("(id) => T.roh(async (c) => (await c.from('anhang').select('pfad').eq('beitrag_id', id).eq('position', 1).single()).data.pfad)", P_lz)
            pruefe(pfad.endswith("/" + P_lz + "-1.png"), "Lernzettel: Anhang 1 unter ‹konto›/‹vorgang›-1.png, Bild sichtbar", pfad)
            # Doppelklick
            c06()
            T_doppel = PRAEFIX + "Doppelklick-Frage"
            feld("Titel").fill(T_doppel)
            feld("Text").fill("Nur einmal bitte.")
            seite.dblclick("#community button[type=submit]")
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            pruefe(zahl_beitraege(T_doppel) == 1, "Doppelklick: genau ein Beitrag")

            # ================================================ Unklarer Ausgang (mock)
            print("Unklarer Ausgang")
            def verlieren(route):            # erreicht den Server, Antwort geht verloren
                route.fetch()
                route.abort("failed")
            c06()
            T_verl = PRAEFIX + "Antwort geht verloren"
            feld("Titel").fill(T_verl)
            feld("Text").fill("Ist trotzdem angekommen.")
            seite.route(RPC_B, verlieren)
            senden()
            pruefe(text_da("Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde. Prüfe den Status, bevor du erneut sendest."),
                   "Verlorene Antwort: unklarer Ausgang statt Fehlschlag", art="mock")
            seite.unroute(RPC_B)
            pruefe(seite.is_disabled("#community button[type=submit]") and seite.is_visible("#community button:has-text('Status prüfen')"),
                   "Erneut senden gesperrt, „Status prüfen“ da", art="mock")
            bild("03-unklar")
            seite.click("#community button:has-text('Status prüfen')")
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            pruefe(text_da("Dein Beitrag wurde veröffentlicht.") and zahl_beitraege(T_verl) == 1,
                   "Status prüfen findet den Beitrag – genau einmal", art="mock")
            # Lernzettel: verlorene Antwort löscht die Datei nicht
            c06()
            art("lernzettel")
            T_lzv = PRAEFIX + "Lernzettel, Antwort verloren"
            feld("Titel").fill(T_lzv)
            feld("Bilder").set_input_files({"name": "z.png", "mimeType": "image/png", "buffer": PNG})
            seite.route(RPC_B, verlieren)
            ab_hier = len(anfragen)
            senden()
            text_da("Wir konnten nicht prüfen", 30000)
            seite.unroute(RPC_B)
            entfernt = [u for m, u, _ in anfragen[ab_hier:] if m == "DELETE" and "/storage/v1/" in u]
            seite.click("#community button:has-text('Status prüfen')")
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            try:
                seite.wait_for_selector("#community img.cm-bild", timeout=15000)
                bild_da = True
            except Exception:
                bild_da = False
            pruefe(bild_da and not entfernt, "Lernzettel: Datei bleibt bei unklarem Ausgang, Bild lädt", art="mock")
            # Nicht angekommen → leerer Status bleibt unklar (G03), „Erneut senden“ mit derselben Kennung
            c06()
            T_nicht = PRAEFIX + "Kam nie an"
            feld("Titel").fill(T_nicht)
            feld("Text").fill("Erst beim zweiten Mal.")
            seite.route(RPC_B, lambda r: r.abort("failed"))
            senden()
            text_da("Wir konnten nicht prüfen")
            seite.unroute(RPC_B)
            erste = [json.loads(b)["p_vorgang"] for m, u, b in anfragen if "rpc/beitrag_mit_anhaengen" in u and b][-1]
            seite.click("#community button:has-text('Status prüfen')")
            pruefe(text_da("Der Beitrag wurde noch nicht gefunden. Der Ausgang ist weiterhin unklar.")
                   and feld("Titel").input_value() == T_nicht and seite.is_disabled("#community button[type=submit]"),
                   "Status ohne Treffer: Ausgang bleibt unklar, Eingaben bleiben gesperrt (G03)", art="mock")
            seite.click("#community button:has-text('Erneut senden')")
            seite.wait_for_function("() => location.hash.startsWith('#community/beitrag/')", timeout=20000)
            pruefe(detail_id() == erste and zahl_beitraege(T_nicht) == 1, "Wiederholung mit derselben Vorgangskennung", art="mock")
            # Sichere Ablehnung mit Datei: Datei wird bereinigt
            c06()
            art("lernzettel")
            feld("Titel").fill(PRAEFIX + "Wird abgelehnt")
            feld("Bilder").set_input_files({"name": "a.png", "mimeType": "image/png", "buffer": PNG})
            seite.route(RPC_B, lambda r: r.fulfill(status=400, content_type="application/json",
                        body=json.dumps({"code": "P0001", "message": "Die Datei ist nicht hochgeladen.", "details": None, "hint": None})))
            senden()
            pruefe(text_da("Dein Beitrag wurde nicht veröffentlicht. Deine Eingaben sind noch da."), "Serverablehnung: sicher fehlgeschlagen", art="mock")
            seite.unroute(RPC_B)
            seite.wait_for_timeout(800)
            hoch = [u for m, u, _ in anfragen if m == "POST" and "/storage/v1/object/lernzettel/" in u][-1]
            name = hoch.split("/lernzettel/")[1]
            liste = ev("(n) => T.roh(async (c) => (await c.storage.from('lernzettel').list(n.split('/')[0], { search: n.split('/')[1] })).data.length)", name)
            pruefe(liste == 1, "Sicher abgelehnt: Datei bleibt bis zur Klärung des Vorgangs (G03)", art="mock")
            # Spam-Bremse und Sperre vom Server
            seite.route(RPC_B, lambda r: r.fulfill(status=400, content_type="application/json",
                        body=json.dumps({"code": "P0001", "message": "Du hast in der letzten Stunde schon 20 Beiträge veröffentlicht. Kurz durchatmen."})))
            art("frage")
            feld("Text").fill("Text")
            senden()
            pruefe(text_da("Du hast gerade viele Beiträge veröffentlicht. Versuch es später erneut.") and feld("Titel").input_value() != "",
                   "Spam-Bremse: eigener Text, Eingaben bleiben", art="mock")
            liste = ev("(n) => T.roh(async (c) => (await c.storage.from('lernzettel').list(n.split('/')[0], { search: n.split('/')[1] })).data.length)", name)
            pruefe(liste == 0, "Geänderte Eingaben: alter Vorgang verworfen, seine Datei entfernt (G03)", art="mock")
            seite.unroute(RPC_B)
            seite.route(RPC_B, lambda r: r.fulfill(status=400, content_type="application/json",
                        body=json.dumps({"code": "P0001", "message": "Beiträge sind für die Klassen-Beta noch nicht freigeschaltet."})))
            feld("Text").fill("Text 2")
            senden()
            pruefe(text_da("Beiträge sind für die Klassen-Beta noch nicht freigeschaltet."), "Sperre vom Server: gesperrte Ansicht", art="mock")
            seite.unroute(RPC_B)

            # ================================================ Kontowechsel zwischen Upload und Veröffentlichen
            print("Kontowechsel, offline, Neuladen")
            neu_laden("#community/schreiben")
            titel("Beitrag schreiben")
            art("lernzettel")
            T_wechsel = PRAEFIX + "Darf nie unter Ben erscheinen"
            feld("Titel").fill(T_wechsel)
            feld("Bilder").set_input_files({"name": "w.png", "mimeType": "image/png", "buffer": PNG})
            gehalten = []
            seite.route(SPEICHER, lambda r: gehalten.append(r) if r.request.method == "POST" else r.continue_())
            ab_hier = len(anfragen)
            senden()
            for _ in range(50):
                if gehalten:
                    break
                seite.wait_for_timeout(100)
            als(BEN)
            seite.wait_for_timeout(500)
            gehalten[0].continue_()
            seite.wait_for_timeout(2500)
            seite.unroute(SPEICHER)
            rpc = [u for m, u, _ in anfragen[ab_hier:] if "rpc/beitrag_mit_anhaengen" in u]
            pruefe(not rpc and zahl_beitraege(T_wechsel) == 0, "Kontowechsel nach Upload: kein Veröffentlichen", art="mock")
            pruefe(not text_da(T_wechsel, 300), "Ben sieht keinen Entwurf von Anna", art="mock")
            c06()
            pruefe(feld("Titel").input_value() == "", "C06 unter Ben ist leer", art="mock")
            ab()
            als(ANNA)
            eigene_loeschen(nur_dateien=True)  # die verwaiste Datei im eigenen Ordner
            # Offline vor dem Senden
            neu_laden("#community/schreiben")
            titel("Beitrag schreiben")
            feld("Titel").fill(PRAEFIX + "Offline-Entwurf")
            feld("Text").fill("Bleibt im Tab.")
            ctx.set_offline(True)
            pruefe(text_da("Du bist offline. Für die Community brauchst du Internet. Deine Eingaben bleiben in diesem geöffneten Tab."),
                   "Offline: Hinweis, Eingaben bleiben im Tab")
            ctx.set_offline(False)             # „online“ prüft von selbst erneut
            pruefe(titel("Beitrag schreiben") and feld("Titel").input_value() == PRAEFIX + "Offline-Entwurf"
                   and feld("Text").input_value() == "Bleibt im Tab.", "Wieder online: Entwurf ist zurück")
            # Neuladen mit Entwurf: Browser-Rückfrage, so weit möglich
            dialoge.clear()
            seite.reload()
            pruefe("beforeunload" in dialoge, "Neuladen mit Entwurf: Browser fragt nach", dialoge)
            seite.wait_for_function("window.AP && AP.community")
            seite.evaluate(JS_HILFE)

            # ================================================ Antworten (echt)
            print("Antworten")
            ab()
            als(BEN)
            neu_laden("#community/beitrag/" + P_frage)
            titel(T_frage)
            text_da("Noch keine Antworten.")
            pruefe(seite.locator("#community .cm-loesen").count() == 0, "Fremde Frage: keine Lösungsknöpfe")
            seite.click("#community button:has-text('Antwort schreiben')")
            pruefe(ev("() => document.activeElement.tagName") == "TEXTAREA", "„Antwort schreiben“: Fokus im Feld")
            pruefe(seite.inner_text("#community .cm-antwortform .cm-zaehler") == "0 / 2000 Zeichen", "Zählung 0 / 2000")
            seite.click("#community button:has-text('Antwort senden')")
            pruefe(text_da("Die Antwort braucht 1 bis 2000 Zeichen."), "Leere Antwort: Fehler")
            feld("Deine Antwort").fill("ä" * 2001)
            seite.click("#community button:has-text('Antwort senden')")
            pruefe(feld("Deine Antwort").get_attribute("aria-invalid") == "true", "2001 Zeichen: Fehler")
            feld("Deine Antwort").fill("Skonto ist ein Preisnachlass für schnelle Zahlung, Rabatt ein sofortiger Nachlass.")
            seite.click("#community button:has-text('Antwort senden')")
            pruefe(text_da("Deine Antwort wurde gesendet.") and text_da("1 Antwort"), "Antwort gesendet und frisch geladen")
            pruefe(ev("() => document.activeElement.classList.contains('cm-antwort')"), "Fokus auf der neuen Antwort")
            pruefe(seite.is_visible("#community button:has-text('Antwort schreiben')"), "Formular geschlossen, Eingabe geleert")
            # verlorene Antwort
            seite.click("#community button:has-text('Antwort schreiben')")
            feld("Deine Antwort").fill("Zweite Antwort, Antwort geht verloren")
            seite.route(RPC_A, verlieren)
            seite.click("#community button:has-text('Antwort senden')")
            pruefe(text_da("Wir konnten nicht prüfen, ob deine Antwort gesendet wurde. Prüfe den Status, bevor du erneut sendest."),
                   "Antwort verloren: unklarer Ausgang", art="mock")
            seite.unroute(RPC_A)
            seite.click("#community button:has-text('Status prüfen')")
            pruefe(text_da("Deine Antwort wurde gesendet.") and text_da("2 Antworten"), "Status prüfen: gesendet, genau einmal", art="mock")
            # Nachladen scheitert nach bestätigtem Senden
            seite.click("#community button:has-text('Antwort schreiben')")
            feld("Deine Antwort").fill("Dritte Antwort")
            seite.route("**/rest/v1/antwort?*", lambda r: r.abort("failed"))
            seite.click("#community button:has-text('Antwort senden')")
            pruefe(text_da("Deine Antwort wurde gesendet. Die Antworten konnten noch nicht neu geladen werden."),
                   "Nachladen scheitert: Erfolg bleibt stehen", art="mock")
            seite.unroute("**/rest/v1/antwort?*")
            seite.click("#community .cm-antworten button:has-text('Erneut versuchen')")
            pruefe(text_da("3 Antworten"), "Lese-Wiederholung zeigt sie", art="mock")
            # Abbrechen mit Text
            seite.click("#community button:has-text('Antwort schreiben')")
            feld("Deine Antwort").fill("Noch nicht fertig")
            seite.click("#community .cm-antwortform button:has-text('Abbrechen')")
            seite.click("dialog.cm-dialog button:has-text('Eingaben verwerfen')")
            seite.wait_for_timeout(200)
            pruefe(seite.is_visible("#community button:has-text('Antwort schreiben')")
                   and ev("() => document.activeElement.textContent") == "Antwort schreiben", "Antwort verwerfen: Fokus zurück")
            antworten = ev("(id) => T.roh(async (c) => (await c.from('antwort').select('id, text').eq('beitrag_id', id)).data)", P_frage)
            pruefe(len(antworten) == 3, "Drei Antworten in der Datenbank", len(antworten))
            A_eins = [a["id"] for a in antworten if a["text"].startswith("Skonto")][0]
            r = ev("(a) => T.versuch(() => AP.community.besteAntwort(a, true))", A_eins)
            pruefe(not r["ok"], "Direkte API: Ben darf bei Annas Frage keine beste Antwort setzen", r.get("fehler"))
            ev("(b) => AP.community.antwortSchreiben(b, 'Antwort auf einen Tipp')", P_tipp)
            ab()

            # ================================================ Beste Antwort
            print("Beste Antwort")
            als(ANNA)
            neu_laden("#community/beitrag/" + P_frage)
            titel(T_frage)
            text_da("3 Antworten")
            pruefe(seite.locator("#community button:has-text('Als beste Antwort markieren')").count() == 3,
                   "Fragestellerin: Knopf an jeder sichtbaren Antwort")
            knopf = seite.locator(f"#community li[data-id='{A_eins}'] .cm-loesen")
            seite.route("**/rest/v1/rpc/beste_antwort_setzen*", lambda r: r.abort("failed"))
            knopf.click()
            # G05: Abbruch heißt „unklar“ – der Stand wird neu geladen, die Beschriftung folgt ihm.
            seite.wait_for_function("(id) => { const b = document.querySelector(`#community li[data-id='${id}'] .cm-loesen`);"
                                    " return b && !b.disabled && b.textContent === 'Als beste Antwort markieren'; }", arg=A_eins, timeout=15000)
            pruefe("GELÖST" not in seite.inner_text("#community .cm-kopf").upper(), "Abbruch vor Ausführung: Stand neu geladen, unverändert", art="mock")
            seite.unroute("**/rest/v1/rpc/beste_antwort_setzen*")
            knopf.click()
            seite.wait_for_function("(id) => { const b = document.querySelector(`#community li[data-id='${id}'] .cm-loesen`);"
                                    " return b && b.textContent === 'Markierung entfernen'; }", arg=A_eins, timeout=15000)
            erste = seite.locator("#community .cm-antwort").first
            pruefe("BESTE ANTWORT" in erste.inner_text().upper() and erste.get_attribute("data-id") == A_eins,
                   "Markiert: „Beste Antwort“ als Text, steht oben")
            seite.wait_for_function("() => /gelöst/i.test(document.querySelector('#community .cm-kopf').textContent)", timeout=10000)
            pruefe(True, "Kopf zeigt „Gelöst“ nach Serverbestätigung")
            pruefe(ev("() => document.activeElement.textContent") == "Markierung entfernen", "Fokus bleibt an der Antwort")
            bild("04-beste-antwort")
            seite.click(f"#community li[data-id='{A_eins}'] .cm-loesen")
            seite.wait_for_function("(id) => { const b = document.querySelector(`#community li[data-id='${id}'] .cm-loesen`);"
                                    " return b && b.textContent === 'Als beste Antwort markieren'; }", arg=A_eins, timeout=15000)
            seite.wait_for_function("() => !/gelöst/i.test(document.querySelector('#community .cm-kopf').textContent)", timeout=10000)
            pruefe(True, "Markierung entfernt, „Gelöst“ weg")
            neu_laden("#community/beitrag/" + P_tipp)
            titel(T_tipp)
            text_da("1 Antwort")
            pruefe(seite.locator("#community .cm-loesen").count() == 0, "Tipp: keine beste Antwort")
            tipp_a = ev("(id) => T.roh(async (c) => (await c.from('antwort').select('id').eq('beitrag_id', id)).data[0].id)", P_tipp)
            r = ev("(a) => T.versuch(() => AP.community.besteAntwort(a, true))", tipp_a)
            pruefe(not r["ok"] and "nur bei Fragen" in (r.get("fehler") or ""), "Direkte API: beste Antwort nur bei Fragen", r.get("fehler"))
            ab()
            als(TEAM)
            ev("(a) => (async () => { const f = await AP.community.moderationFall('antwort', a);   return AP.community.entscheiden({ id: AP.community.neueVorgangskennung(), art: 'antwort', ziel: a, aktion: \"ausblenden\",     meldungen: f.meldungen.map(m => m.id), version: f.version, intern: \"Testinhalt (automatischer Test)\",     autorText: \"Dein Testinhalt wurde für einen automatischen Test ausgeblendet.\", kategorie: \"sonstiges\" }); })()", A_eins)
            ab()
            als(ANNA)
            r = ev("(a) => T.versuch(() => AP.community.besteAntwort(a, true))", A_eins)
            pruefe(not r["ok"] and "Ausgeblendete" in (r.get("fehler") or ""), "Direkte API: ausgeblendete Antwort nicht markierbar", r.get("fehler"))
            neu_laden("#community/beitrag/" + P_frage)
            text_da("2 Antworten")
            pruefe(seite.locator(f"#community li[data-id='{A_eins}']").count() == 0, "Ausgeblendete Antwort nicht in der Liste")

            # ================================================ Barrierefreiheit
            print("Barrierefreiheit")
            def axe(name):
                if not AXE.exists():
                    pruefe(False, "axe-core nicht gefunden: " + str(AXE))
                    return
                seite.add_script_tag(path=str(AXE))
                r = ev("""async () => { const r = await axe.run('#community', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] });
                    return r.violations.map(v => v.id + ': ' + v.nodes.length); }""")
                pruefe(not r, "axe (WCAG A/AA) ohne Verstöße: " + name, r)
            seite.click("#community button:has-text('Antwort schreiben')")
            axe("C05 mit Antwortformular")
            c06()
            axe("C06 leer")
            senden()
            seite.wait_for_selector("#community .cm-uebersicht")
            axe("C06 mit Fehlern")
            art("lernzettel")
            axe("C06 Lernzettel")
            for breite in (320, 1280):
                seite.set_viewport_size({"width": breite, "height": 900})
                klein = ev("""() => [...document.querySelectorAll('#community button, #community a, #community select, #community input, #community textarea, #community label.cm-haken')]
                    .filter(e => e.offsetParent !== null && !(e.closest('label.cm-haken') && e.tagName === 'INPUT'))
                    .map(e => [(e.textContent || e.type).trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)])
                    .filter(x => x[1] < 44)""")
                pruefe(not klein, f"{breite} px: alle Bedienelemente mindestens 44 px hoch", klein[:4])
                breit = ev("() => document.documentElement.scrollWidth <= window.innerWidth")
                pruefe(breit, f"{breite} px: kein seitliches Scrollen")
            bild("05-c06-320")
            seite.set_viewport_size({"width": 390, "height": 844})

            # ------------------------------------------------ Aufräumen
            print("Aufräumen")
            seite.click("#community button:has-text('Abbrechen')")
            if seite.locator("dialog.cm-dialog").count():
                seite.click("dialog.cm-dialog button:has-text('Eingaben verwerfen')")
            for konto in (ANNA, BEN):
                ab()
                als(konto)
                eigene_loeschen()
            r = ev("(t) => T.roh(async (c) => (await c.from('beitrag').select('id').like('titel', t + '%')).data.length)", PRAEFIX)
            pruefe(r == 0, "Keine Testbeiträge übrig", r)
            ab()
            browser.close()

    print()
    if fehler:
        print(f"{len(fehler)} Fehler: " + "; ".join(fehler))
        return 1
    print("Alles in Ordnung.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
