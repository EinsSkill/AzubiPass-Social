#!/usr/bin/env python3
"""
AzubiPass · Beiträge lesen (C04/C05) – Test im echten Browser gegen Supabase

    COMMUNITY_TEST_PASSWORT=… python3 community_beitraege_test.py [--bilder ORDNER]

Abnahmefälle aus doku/community/04-beitraege.md (Version 1). Legt mit den
Demo-Konten Anna und Ben echte Testbeiträge an (Titel beginnen mit „[Test]“),
lässt das Team-Testkonto einen ausblenden und räumt am Ende alles wieder auf.

Zwei Arten von Fällen, im Bericht getrennt markiert:
  [echt]  läuft vollständig gegen Supabase
  [mock]  eine einzelne Antwort wird im Browser abgefangen, angehalten oder
          verworfen (Netzfehler, späte Antworten) – der Rest ist echt

Passwort steht bewusst nicht im Repo. Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import json
import re
import urllib.parse
import os
import socketserver
import sys
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
ANNA = "demo-anna@azubipass.invalid"
BEN = "demo-ben@azubipass.invalid"
TEAM = "test-neu1@azubipass.invalid"      # Rolle „team“, siehe supabase/README.md
PRAEFIX = "[Test] "

fehler = []


def pruefe(bedingung, text, wert="", art="echt"):
    print(f"  {'OK  ' if bedingung else 'FEHL'} [{art}] {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


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
  bild: () => new Promise((ja) => {
    const cv = document.createElement('canvas'); cv.width = 120; cv.height = 80;
    const g = cv.getContext('2d'); g.fillStyle = '#1B4332'; g.fillRect(0, 0, 120, 80);
    g.fillStyle = '#C9A227'; g.fillRect(10, 10, 40, 6);
    cv.toBlob((b) => ja(new File([b], 'lernzettel.png', { type: 'image/png' })), 'image/png');
  })
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
            ctx.on("request", lambda r: anfragen.append((r.method, r.url)))
            seite.goto(basis + "app.html#heute")
            seite.wait_for_function("window.AP && AP.community")
            seite.evaluate(JS_HILFE)
            ev = lambda js, *a: seite.evaluate(js, *a)

            def bild(name):
                if bilder:
                    seite.screenshot(path=str(bilder / f"{name}.png"), full_page=True)

            def als(mail):
                ev("([m, p]) => T.anmelden(m, p)", [mail, pw])

            def ab():
                ev("() => AP.community.abmelden().catch(() => {})")

            def titel(erwartet, warte=20000):
                try:
                    seite.wait_for_function("(t) => { const h = document.querySelector('#community h1');"
                                            " return h && h.textContent.trim() === t; }", arg=erwartet, timeout=warte)
                    return True
                except Exception:
                    return False

            def h1():
                return seite.inner_text("#community h1").strip()

            def oeffne(hash_):
                seite.evaluate("(h) => { location.hash = h; }", hash_)

            def zeilen():
                return seite.evaluate("[...document.querySelectorAll('#community .cm-beitraege a[data-id]')].map(a => a.textContent)")

            def warte_liste():
                seite.wait_for_function("() => { const b = document.querySelector('#community .cm-liste');"
                                        " return b && !b.hasAttribute('aria-busy'); }", timeout=20000)

            def neu_laden_ui(hash_="#community"):
                seite.goto(basis + "app.html" + hash_)
                seite.wait_for_function("window.AP && AP.community")
                seite.evaluate(JS_HILFE)

            # ------------------------------------------------ Aufräumen alter Läufe
            for konto in (ANNA, BEN):
                als(konto)
                eigene = ev("""async (praefix) => { const c = await AP.community.verbinden();
                    const u = (await c.auth.getUser()).data.user.id;
                    const r = await c.from('beitrag').select('id, titel').eq('autor_id', u).like('titel', praefix + '%');
                    return r.data || []; }""", PRAEFIX)
                for b in eigene:
                    ev("(id) => AP.community.beitragLoeschen(id).catch(() => {})", b["id"])
                for g in ev("() => AP.community.gruppen(true)"):
                    if g["name"] == "Testgruppe Beiträge":
                        ev("(g) => AP.community.gruppeVerlassen(g)", g["id"])
                ab()

            # ------------------------------------------------ Testdaten
            print("Testdaten anlegen")
            als(ANNA)
            def neu(e):
                r = ev("async (e) => T.versuch(async () => { if (e.bild) e.datei = await T.bild(); delete e.bild;"
                       " return AP.community.veroeffentlichen(e); })", e)
                pruefe(r["ok"], "Beitrag angelegt: " + e["titel"], r.get("fehler", ""))
                return r.get("wert")
            P_frage = neu({"art": "frage", "titel": PRAEFIX + "Wie buche ich Skonto?", "lernfeld": "buchfuehrung",
                           "kapitel": "k5", "text": "Zeile eins\nZeile zwei mit <b>fett</b> & <img src=x onerror=alert(1)>"})
            P_lf = neu({"art": "tipp", "titel": PRAEFIX + "Tipp zum Ausbildungsvertrag", "lernfeld": "lf1"})
            P_alt = neu({"art": "tipp", "titel": PRAEFIX + "Alte Zuordnung", "lernfeld": "lf6", "kapitel": "k9"})
            P_lz = neu({"art": "lernzettel", "titel": PRAEFIX + "Lernzettel Bilanz", "bild": True})
            lang = PRAEFIX + "Ünïcødé-Titel mit 𝔄𝔅ℭ und sehr langen Wörtern wie Umsatzsteuervoranmeldungszeitraum zum Testen"
            P_mentor = neu({"art": "frage", "titel": lang, "anMentoren": True, "lernfeld": "lf7"})
            P_versteckt = neu({"art": "tipp", "titel": PRAEFIX + "Wird ausgeblendet"})
            g = ev("() => T.versuch(() => AP.community.gruppeGruenden({name:'Testgruppe Beiträge', beschreibung:'', offen:false}))")
            gid = g.get("wert")
            P_gruppe = neu({"art": "frage", "titel": PRAEFIX + "Nur in der Gruppe", "gruppe": gid})
            # Drei Beiträge in einem Befehl: gleiche Erstellungszeit an der Seitengrenze.
            r = ev("""async (praefix) => T.versuch(async () => { const c = await AP.community.verbinden();
                const z = ['A', 'B', 'C'].map(x => ({ art: 'tipp', titel: praefix + 'Seite ' + x, lernfeld: 'lf13' }));
                const r = await c.from('beitrag').insert(z).select('id, erstellt_am');
                if (r.error) throw r.error; return r.data; })""", PRAEFIX)
            pruefe(r["ok"] and len(set(x["erstellt_am"] for x in r["wert"])) == 1,
                   "Drei Beiträge mit exakt gleicher Erstellungszeit", r.get("fehler", ""))
            neu({"art": "tipp", "titel": PRAEFIX + "Seite D", "lernfeld": "lf13"})
            neu({"art": "tipp", "titel": PRAEFIX + "Seite E", "lernfeld": "lf13"})
            ab()
            als(BEN)
            a1 = ev("(b) => AP.community.antwortSchreiben(b, 'Erste Antwort von Ben')", P_frage)
            a2 = ev("(b) => AP.community.antwortSchreiben(b, 'Zweite Antwort:\\nmit Umbruch')", P_frage)
            ev("(b) => AP.community.hilfreich(b, true)", P_frage)
            ab()
            als(ANNA)
            ev("(a) => AP.community.besteAntwort(a, true)", a2)
            ab()
            als(TEAM)
            r = ev("(b) => T.versuch(() => (async () => { const f = await AP.community.moderationFall('beitrag', b);   return AP.community.entscheiden({ id: AP.community.neueVorgangskennung(), art: 'beitrag', ziel: b, aktion: \"ausblenden\",     meldungen: f.meldungen.map(m => m.id), version: f.version, intern: \"Testinhalt (automatischer Test)\",     autorText: \"Dein Testinhalt wurde für einen automatischen Test ausgeblendet.\", kategorie: \"sonstiges\" }); })())", P_versteckt)
            pruefe(r["ok"], "Team blendet einen Testbeitrag aus", r.get("fehler", ""))
            ab()

            # ------------------------------------------------ Seitennavigation (Datenschicht)
            print("Stabile Seitennavigation")
            als(BEN)
            r = ev("""async () => { const gesehen = []; let weiter = null, runden = 0;
                do { const s = await AP.community.beitragSeite({ gruppe: 'alle', ohneAusgeblendete: true,
                       art: 'tipp', lernfeld: 'lf13', anzahl: 2, nach: weiter || undefined });
                     s.zeilen.forEach(z => gesehen.push(z.titel)); weiter = s.weiter; runden++; }
                while (weiter && runden < 10);
                return gesehen; }""")
            test_seiten = sorted(t for t in r if t.startswith(PRAEFIX + "Seite"))
            pruefe(test_seiten == [PRAEFIX + "Seite " + x for x in "ABCDE"] and len(r) == len(set(r)),
                   "Seiten zu je 2: alle fünf, keiner doppelt, keiner fehlt (3 mit gleicher Zeit)", r)
            r = ev("""async () => { const c = await AP.community.verbinden();
                const alle = (await c.from('beitrag_liste').select('id, titel, erstellt_am').eq('lernfeld', 'lf13').eq('art', 'tipp')
                   .like('titel', '[Test] Seite%').order('erstellt_am', {ascending:false})).data;
                // Zum Vergleich die alte Zeitnavigation (nur erstellt_am < letzte Zeit):
                // Seitengröße 4: die Grenze liegt mitten in den drei gleichzeitigen Beiträgen.
                const s1 = alle.slice(0, 4); const rest = alle.filter(z => z.erstellt_am < s1[3].erstellt_am);
                return s1.length + rest.length; }""")
            pruefe(r < 5, "Gegenprobe: die alte Zeitnavigation hätte hier einen Beitrag verloren", f"{r} von 5")

            # ------------------------------------------------ C04 Übersicht
            print("C04 Übersicht")
            ab_hier = len(anfragen)
            neu_laden_ui("#community")
            pruefe(titel("Beiträge"), "Startpunkt der Community ist „Beiträge“", h1())
            warte_liste()
            alle = zeilen()
            pruefe(PRAEFIX + "Wie buche ich Skonto?" in alle and lang in alle, "Allgemeine Testbeiträge stehen in der Liste")
            pruefe(PRAEFIX + "Nur in der Gruppe" not in alle, "Gruppenbeitrag nicht in C04")
            pruefe(PRAEFIX + "Wird ausgeblendet" not in alle, "Ausgeblendeter Beitrag nicht in C04")
            zeile_text = seite.evaluate("""(t) => { const a = [...document.querySelectorAll('#community .cm-beitraege a[data-id]')]
                .find(x => x.textContent === t); return a.closest('li').innerText; }""", PRAEFIX + "Wie buche ich Skonto?")
            pruefe("Frage" in zeile_text and "LF6, Kapitel 5" in zeile_text and "Gelöst" in zeile_text.replace("GELÖST", "Gelöst")
                   and "2 Antworten" in zeile_text and "1 hilfreich" in zeile_text and "Anna (Demo)" in zeile_text,
                   "Zeile: Art, Zuordnung, Gelöst, Name, Antworten, hilfreich", zeile_text.replace("\n", " | "))
            zeile_m = seite.evaluate("""(t) => [...document.querySelectorAll('#community .cm-beitraege a[data-id]')]
                .find(x => x.textContent === t).closest('li').innerText""", lang)
            pruefe("AN MENTOR:INNEN" in zeile_m.upper() and "0 Antworten" in zeile_m, "„An Mentor:innen“ als Text", zeile_m.replace("\n", " | "))
            pruefe(not seite.locator("#community img").count(), "Keine Bilder in der Übersicht")
            pruefe(not any("/storage/v1/" in u for _, u in anfragen[ab_hier:]), "Keine Dateiabrufe für die Übersicht")
            pruefe(seite.get_attribute("#community a.cm-haupt:has-text('Beitrag schreiben')", "href") == "#community/schreiben",
                   "„Beitrag schreiben“ führt zu C06 (Spec 05)")
            pruefe(not seite.is_visible("#community >> text=Filter zurücksetzen"), "Ohne Filter kein „Filter zurücksetzen“")
            bild("01-beitraege")

            # Filter
            seite.focus("#community select >> nth=0")
            seite.select_option("#community select >> nth=0", "lernzettel")
            warte_liste()
            z = zeilen()
            pruefe(z and all("Lernzettel" in seite.evaluate("(t) => [...document.querySelectorAll('#community .cm-beitraege a[data-id]')].find(x => x.textContent === t).closest('li').querySelector('.cm-zeile-oben').innerText", t) for t in z),
                   "Filter Beitragsart: nur Lernzettel", z[:3])
            pruefe(seite.evaluate("document.activeElement.tagName") == "SELECT", "Fokus bleibt im Filter")
            pruefe("Beitr" in seite.inner_text("#community .cm-ergebnis"), "Ergebnis wird kurz gemeldet", seite.inner_text("#community .cm-ergebnis"))
            seite.select_option("#community select >> nth=1", "lf13")
            warte_liste()
            pruefe(seite.is_visible("#community .cm-leer >> text=Zu diesen Filtern gibt es keine Beiträge."), "Keine Treffer: eigener Text")
            bild("02-filter-leer")
            seite.click("#community .cm-liste >> text=Filter zurücksetzen")
            warte_liste()
            pruefe(seite.input_value("#community select >> nth=0") == "" and len(zeilen()) >= 8, "Filter zurücksetzen zeigt wieder alles")

            # Weitere Beiträge laden – mit kleiner Seite, damit es im Test passiert.
            seite.evaluate("AP.community.CFG.seite = 2")
            seite.select_option("#community select >> nth=0", "tipp")
            seite.select_option("#community select >> nth=1", "lf13")
            warte_liste()
            pruefe(len(zeilen()) == 2 and seite.is_visible("text=Weitere Beiträge laden"), "Erste Seite: 2 Beiträge und „Weitere Beiträge laden“")
            seite.click("text=Weitere Beiträge laden")
            seite.wait_for_function("document.querySelectorAll('#community .cm-beitraege a[data-id]').length === 4")
            pruefe(seite.evaluate("document.activeElement.textContent") == "Weitere Beiträge laden", "Fokus bleibt beim Auslöser")
            pruefe("2 weitere Beiträge geladen." in seite.inner_text("#community .cm-ergebnis"), "Nachladen wird angekündigt")
            # Fehler beim Nachladen [mock]
            seite.route("**/rest/v1/beitrag_liste?**", lambda r: r.abort() if "or=" in r.request.url else r.continue_())
            seite.click("text=Weitere Beiträge laden")
            seite.wait_for_selector("text=Weitere Beiträge konnten nicht geladen werden.")
            pruefe(len(zeilen()) == 4, "Fehler beim Nachladen: geladene Zeilen bleiben", art="mock")
            bild("03-nachladen-fehler")
            seite.unroute("**/rest/v1/beitrag_liste?**")
            seite.click("text=Weitere Beiträge laden")
            seite.wait_for_function("document.querySelectorAll('#community .cm-beitraege a[data-id]').length === 5")
            z = zeilen()
            pruefe(sorted(z) == [PRAEFIX + "Seite " + x for x in "ABCDE"] and not seite.is_visible("text=Weitere Beiträge laden"),
                   "Wiederholen: alle fünf ohne Doppelte, dann kein Knopf mehr", z)

            # Zurück aus dem Detail: Filter, Zeilen und Position
            seite.set_viewport_size({"width": 390, "height": 420})
            seite.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            y_vorher = seite.evaluate("window.scrollY")
            ziel_titel = z[-1]
            seite.click(f"#community .cm-beitraege a:text-is('{ziel_titel}')")
            pruefe(titel(ziel_titel), "Detail geöffnet", h1())
            seite.click("text=‹ Zurück zu Beiträgen")
            pruefe(titel("Beiträge"), "„Zurück zu Beiträgen“ führt zur Liste")
            warte_liste()
            seite.wait_for_timeout(300)
            pruefe(seite.input_value("#community select >> nth=0") == "tipp" and seite.input_value("#community select >> nth=1") == "lf13"
                   and len(zeilen()) == 5, "Filter und geladene Zeilen sind wieder da (neu geladen)", zeilen())
            pruefe(seite.evaluate("document.activeElement.textContent") == ziel_titel, "Fokus auf dem zuletzt geöffneten Beitrag",
                   seite.evaluate("document.activeElement.textContent"))
            y_nachher = seite.evaluate("window.scrollY")
            pruefe(abs(y_nachher - y_vorher) < 40, "Scrollposition wiederhergestellt", (y_vorher, y_nachher))
            seite.set_viewport_size({"width": 390, "height": 844})
            seite.evaluate("AP.community.CFG.seite = 30")

            # Fehler beim ersten Laden [mock]
            seite.route("**/rest/v1/beitrag_liste?**", lambda r: r.abort())
            seite.click("#community .cm-filter >> text=Filter zurücksetzen")
            seite.wait_for_selector("text=Die Beiträge konnten nicht geladen werden. Versuch es erneut.")
            pruefe(seite.is_visible("#community >> text=Zu Lernen"), "Listenfehler: Text, Erneut versuchen, Zu Lernen", art="mock")
            bild("04-liste-fehler")
            seite.unroute("**/rest/v1/beitrag_liste?**")
            seite.click("#community >> text=Erneut versuchen")
            warte_liste()
            pruefe(len(zeilen()) >= 8, "Erneut versuchen lädt die Liste", art="mock")

            # ------------------------------------------------ C05 Detail
            print("C05 Detail")
            oeffne("#community/beitrag/" + P_frage)
            pruefe(titel(PRAEFIX + "Wie buche ich Skonto?"), "Beitragstitel ist die Hauptüberschrift", h1())
            seite.wait_for_selector("#community .cm-antwort")
            text_html = seite.evaluate("document.querySelector('#community .cm-detail .cm-text').innerHTML")
            text_txt = seite.evaluate("document.querySelector('#community .cm-detail .cm-text').innerText")
            pruefe("&lt;b&gt;" in text_html and "<b>" not in text_html and "<img" not in text_html,
                   "HTML-Zeichen erscheinen als Text, nichts wird ausgeführt", text_html[:80])
            pruefe("Zeile eins\nZeile zwei" in text_txt, "Zeilenumbrüche bleiben erhalten")
            antw = seite.evaluate("[...document.querySelectorAll('#community .cm-antwort')].map(x => x.innerText)")
            pruefe(len(antw) == 2 and "BESTE ANTWORT" in antw[0].upper() and "Zweite Antwort" in antw[0] and "Erste" in antw[1],
                   "Beste Antwort zuerst, dann zeitlich", [a.replace("\n", " | ") for a in antw])
            pruefe(seite.is_visible("#community >> text=2 Antworten") and seite.is_visible("#community >> text=1 hilfreich"),
                   "Antwortzahl und hilfreich als Anzeige")
            pruefe(seite.get_attribute("#community >> text=Kapitel in Lernen öffnen", "href") == "buchfuehrung.html#k5",
                   "„Kapitel in Lernen öffnen“ zum echten Kapitel")
            pruefe(not seite.locator("#community button:has-text('hilfreich'), #community button:has-text('Melden'), "
                                     "#community button:has-text('Antworten')").count(),
                   "Keine Platzhalter-Knöpfe für Hilfreich, Melden, Antworten")
            kopf = seite.inner_text("#community .cm-kopf")
            pruefe("Für alle in der Community" in kopf and "GELÖST" in kopf.upper(), "Ziel und „Gelöst“ im Kopf", kopf.replace("\n", " | "))
            bild("05-detail-frage")

            oeffne("#community/beitrag/" + P_lf)
            pruefe(titel(PRAEFIX + "Tipp zum Ausbildungsvertrag"), "Tipp geöffnet")
            pruefe(seite.get_attribute("#community >> text=Lernfeld in Lernen öffnen", "href") == "lf1.html",
                   "Nur Lernfeld zugeordnet: „Lernfeld in Lernen öffnen“")
            seite.wait_for_selector("text=Noch keine Antworten.")
            pruefe(True, "Leer: „Noch keine Antworten.“")
            oeffne("#community/beitrag/" + P_alt)
            pruefe(titel(PRAEFIX + "Alte Zuordnung"), "Beitrag mit veralteter Zuordnung geöffnet")
            pruefe(not seite.locator("#community a:has-text('in Lernen öffnen')").count(), "Veraltete Kennung: kein toter Lernlink")

            oeffne("#community/beitrag/" + P_lz)
            pruefe(titel(PRAEFIX + "Lernzettel Bilanz"), "Lernzettel geöffnet")
            seite.wait_for_selector("#community img.cm-bild")
            img = seite.evaluate("(() => { const i = document.querySelector('#community img.cm-bild');"
                                 " return [i.src.slice(0, 5), i.alt, i.naturalWidth]; })()")
            pruefe(img[0] == "blob:" and "Lernzettel Bilanz" in img[1], "Bild über angemeldeten Abruf, mit Beschriftung", img)
            pruefe(seite.get_attribute("#community >> text=Bild öffnen", "href").startswith("blob:"), "„Bild öffnen“ erst nach berechtigtem Abruf")
            pruefe(not any("/object/sign/" in u for _, u in anfragen), "Keine signierten Links mehr")
            bild("06-detail-lernzettel")
            # Datei-Fehler [mock]
            seite.route("**/storage/v1/object/**", lambda r: r.abort())
            oeffne("#community")
            titel("Beiträge")
            oeffne("#community/beitrag/" + P_lz)
            seite.wait_for_selector("text=Die Datei konnte nicht geladen werden.")
            pruefe(seite.is_visible("#community .cm-text") or seite.is_visible("#community .cm-antworten"),
                   "Dateifehler sperrt den Rest des Beitrags nicht", art="mock")
            pruefe(not seite.locator("#community >> text=Bild öffnen").count(), "Ohne Abruf keine Dateiaktion", art="mock")
            seite.unroute("**/storage/v1/object/**")
            seite.click("#community .cm-datei >> text=Erneut versuchen")
            seite.wait_for_selector("#community img.cm-bild")
            pruefe(True, "Erneut versuchen lädt die Datei mit neuer Rechteprüfung", art="mock")
            # Antworten-Fehler [mock]
            seite.route("**/rest/v1/antwort?**", lambda r: r.abort())
            oeffne("#community/beitrag/" + P_frage)
            seite.wait_for_selector("text=Die Antworten konnten nicht geladen werden.")
            pruefe(seite.is_visible("#community .cm-text") and not seite.is_visible("text=0 Antworten"),
                   "Antwortfehler: Beitrag bleibt, keine erfundene Nullantwort", art="mock")
            seite.unroute("**/rest/v1/antwort?**")
            seite.click("#community .cm-antworten >> text=Erneut versuchen")
            seite.wait_for_selector("#community .cm-antwort")
            pruefe(True, "Antworten separat neu geladen", art="mock")
            # Detail-Fehler [mock]
            seite.route("**/rest/v1/beitrag_liste?**", lambda r: r.abort())
            oeffne("#community/beitrag/" + P_lf)
            seite.wait_for_selector("text=Der Beitrag konnte nicht geladen werden. Versuch es erneut.")
            pruefe(not seite.is_visible("text=Dieser Inhalt ist für dich nicht verfügbar."), "Netzfehler ist nicht „nicht verfügbar“", art="mock")
            bild("07-detail-fehler")
            seite.unroute("**/rest/v1/beitrag_liste?**")
            seite.click("#community >> text=Erneut versuchen")
            pruefe(titel(PRAEFIX + "Tipp zum Ausbildungsvertrag"), "Erneut versuchen lädt den Beitrag", art="mock")

            # Nicht verfügbar: gelöscht/unbekannt, fremd ausgeblendet, Gruppe
            for ziel, name in (("00000000-0000-4000-8000-000000000000", "unbekannte ID"),
                               (P_versteckt, "fremder ausgeblendeter Beitrag"), (P_gruppe, "Gruppenbeitrag (Gruppen kommen später)")):
                oeffne("#community/beitrag/" + ziel)
                seite.wait_for_selector("text=Dieser Inhalt ist für dich nicht verfügbar.")
                inhalt = seite.inner_text("#community")
                pruefe("[Test]" not in inhalt and "Anna" not in inhalt, "Nicht verfügbar ohne fremde Angaben: " + name)
            bild("08-nicht-verfuegbar")
            oeffne("#community/gruppe/irgendwas")
            seite.wait_for_selector("text=Dieser Inhalt ist für dich nicht verfügbar.")
            pruefe(True, "Unbekanntes Ziel: neutraler Rückweg")

            # Profil
            oeffne("#community")
            titel("Beiträge")
            seite.click("#community >> text=Profil")
            pruefe(titel("Profil") and seite.is_visible("#community >> text=Abmelden")
                   and seite.is_visible("#community >> text=Community-Regeln lesen"), "„Profil“: Profil, Regeln, Abmelden")

            # ------------------------------------------------ Ausgeblendet im eigenen Kontext
            print("Ausgeblendet, Direktlink, Kontowechsel")
            ab()
            als(ANNA)
            oeffne("#community/beitrag/" + P_versteckt)
            seite.wait_for_selector("text=Dieser Beitrag ist ausgeblendet.")
            pruefe(not seite.locator("#community .cm-antworten, #community .cm-datei").count(),
                   "Eigener ausgeblendeter Beitrag: Hinweis, keine Antworten, keine Datei")
            bild("09-ausgeblendet")
            oeffne("#community/beitrag/" + P_gruppe)
            seite.wait_for_selector("text=Dieser Inhalt ist für dich nicht verfügbar.")
            pruefe(True, "Gruppenbeitrag auch für Mitglied noch nicht in dieser Phase")

            # Späte Antwort nach Kontowechsel [mock]: Annas ausgeblendeter Beitrag darf nie bei Ben erscheinen.
            gehalten = []
            seite.route("**/rest/v1/beitrag_liste?**", lambda r: gehalten.append(r))
            oeffne("#community")
            titel("Beiträge")
            oeffne("#community/beitrag/" + P_versteckt)
            for _ in range(80):
                if gehalten: break
                seite.wait_for_timeout(100)
            andere = ctx.new_page()
            andere.goto(basis + "app.html#heute")
            andere.wait_for_function("window.AP && AP.community")
            andere.evaluate("""async ([m, p]) => { const c = await AP.community.verbinden();
                const r = await c.auth.signInWithPassword({ email: m, password: p }); if (r.error) throw new Error(r.error.message); }""", [BEN, pw])
            andere.close()
            seite.wait_for_timeout(1500)
            seite.unroute("**/rest/v1/beitrag_liste?**")
            for g_ in gehalten:
                try: g_.continue_()
                except Exception: pass
            seite.wait_for_timeout(2500)
            inhalt = seite.inner_text("#community")
            pruefe("Wird ausgeblendet" not in inhalt and "ausgeblendet." not in inhalt,
                   "Späte Antwort für Anna erscheint nach dem Wechsel zu Ben nicht", inhalt[:120].replace("\n", " | "), art="mock")

            # Direktlink ohne Sitzung: Anmeldung, keine Inhaltsabrufe, danach Ziel
            ab()
            neu_laden_ui("#community/beitrag/" + P_frage)
            pruefe(titel("In der Community anmelden"), "Direktlink ohne Sitzung: Anmeldung")
            vorher = len(anfragen)
            pruefe(not [u for _, u in anfragen[vorher - 30:] if "beitrag_liste" in u and P_frage in u],
                   "Vor der Anmeldung kein Abruf des Beitrags")
            als(BEN)
            pruefe(titel(PRAEFIX + "Wie buche ich Skonto?"), "Nach der Anmeldung: das gemerkte Ziel", h1())
            pruefe(seite.url.endswith("#community/beitrag/" + P_frage), "Adresse zeigt das Ziel", seite.url)

            # Kontowechsel verwirft Filter
            oeffne("#community")
            titel("Beiträge")
            warte_liste()
            seite.select_option("#community select >> nth=0", "frage")
            warte_liste()
            ab()
            titel("In der Community anmelden")
            als(ANNA)
            titel("Beiträge")
            warte_liste()
            pruefe(seite.input_value("#community select >> nth=0") == "", "Anderes Konto: Filter des vorigen Kontos verworfen")

            # ------------------------------------------------ Offline
            print("Offline, schmal, Tippziele")
            oeffne("#community/beitrag/" + P_lz)
            seite.wait_for_selector("#community img.cm-bild")
            ctx.set_offline(True)
            seite.wait_for_selector("text=Du bist offline. Für die Community brauchst du Internet. Lernen und Üben kannst du weiter nutzen.")
            inhalt = seite.inner_text("#community")
            pruefe("Lernzettel Bilanz" not in inhalt and not seite.locator("#community img").count(),
                   "Offline: keine Beitrags- oder Dateidaten mehr sichtbar")
            bild("10-offline")
            ctx.set_offline(False)
            pruefe(titel(PRAEFIX + "Lernzettel Bilanz"), "Wieder online: Zugang und Beitrag neu geprüft")

            # 320 px, lange Unicode-Titel
            seite.set_viewport_size({"width": 320, "height": 640})
            oeffne("#community/beitrag/" + P_mentor)
            titel(lang)
            ueber = seite.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            pruefe(ueber <= 0, "Detail mit langem Unicode-Titel bei 320 px ohne seitliches Scrollen", ueber)
            bild("11-detail-320")
            oeffne("#community")
            titel("Beiträge")
            warte_liste()
            ueber = seite.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            pruefe(ueber <= 0, "Übersicht bei 320 px ohne seitliches Scrollen", ueber)
            klein = seite.evaluate("""() => [...document.querySelectorAll('#community button, #community a, #community select')]
                .filter(e => e.offsetParent !== null).map(e => [e.textContent.trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)])
                .filter(x => x[1] < 44)""")
            pruefe(not klein, "Alle Bedienelemente mindestens 44 px hoch", klein[:4])
            bild("12-beitraege-320")
            seite.set_viewport_size({"width": 390, "height": 844})

            # Tastatur: Reihenfolge Zurück, Profil, Filter, Beiträge
            seite.evaluate("document.querySelector('#community h1').focus()")
            folge = []
            for _ in range(5):
                seite.keyboard.press("Tab")
                folge.append(seite.evaluate("(document.activeElement.textContent || document.activeElement.tagName).trim().slice(0, 25)"))
            pruefe(folge[0] == "Beitrag schreiben" and folge[1].startswith("Alle"),
                   "Nach der Überschrift: „Beitrag schreiben“, dann der Filter", folge)

            # ------------------------------------------------ G02 [mock]: Rückkehr nach >120 Beiträgen
            print("Rückkehr nach mehr als 120 Beiträgen (G02)")
            # 150 simulierte Beiträge, je drei mit gleicher Erstellungszeit. Der
            # Server wird für die Liste nachgebildet: Sortierung erstellt_am, id
            # absteigend, limit und or-Cursor wie PostgREST.
            import uuid as _uuid
            unecht = []
            for i in range(150):
                t = "2026-10-01T10:%02d:00+00:00" % (59 - i // 3)
                unecht.append({"id": str(_uuid.UUID(int=10**6 + i)), "autor_id": "00000000-0000-4000-8000-0000000000aa",
                               "gruppe_id": None, "art": "tipp", "titel": "Auditbeitrag %d" % (i + 1), "text": "",
                               "lernfeld": None, "kapitel": None, "datei_pfad": None, "datei_art": None,
                               "an_mentoren": False, "geloest": False, "versteckt": False, "erstellt_am": t,
                               "bearbeitet_am": None, "autor_name": "Test", "autor_rolle": "azubi", "autor_lehrjahr": None,
                               "gruppe_name": None, "antworten": 0, "hilfreich_zahl": 0, "von_mir_hilfreich": False})
            unecht.sort(key=lambda z: (z["erstellt_am"], z["id"]), reverse=True)
            def liste_unecht(route):
                url = urllib.parse.urlparse(route.request.url)
                q = urllib.parse.parse_qs(url.query)
                if "id" in q:
                    zid = q["id"][0].replace("eq.", "")
                    z = [x for x in unecht if x["id"] == zid]
                    einzeln = "vnd.pgrst.object" in (route.request.headers.get("accept") or "")
                    route.fulfill(status=200, content_type="application/json",
                                  body=json.dumps((z[0] if z else None) if einzeln else z))
                    return
                zeilen = list(unecht)
                if "or" in q:
                    m = re.search(r'erstellt_am\.lt\."([^"]+)",and\(erstellt_am\.eq\."([^"]+)",id\.lt\.([0-9a-f-]+)\)', q["or"][0])
                    zeit, _, zid = m.group(1), m.group(2), m.group(3)
                    zeilen = [z for z in zeilen if z["erstellt_am"] < zeit or (z["erstellt_am"] == zeit and z["id"] < zid)]
                n = int(q.get("limit", ["30"])[0])
                route.fulfill(status=200, content_type="application/json", body=json.dumps(zeilen[:n]))
            seite.route("**/rest/v1/beitrag_liste?**", liste_unecht)
            seite.route("**/rest/v1/antwort?**", lambda r: r.fulfill(status=200, content_type="application/json", body="[]"))
            oeffne("#community/profil")
            titel("Profil")
            oeffne("#community")
            titel("Beiträge")
            warte_liste()
            for _ in range(4):
                vorher_n = len(zeilen())
                seite.click("text=Weitere Beiträge laden")
                seite.wait_for_function("(n) => document.querySelectorAll('#community .cm-beitraege a[data-id]').length > n", arg=vorher_n)
            z150 = zeilen()
            pruefe(len(z150) == 150 and len(set(z150)) == 150 and not seite.is_visible("text=Weitere Beiträge laden"),
                   "150 Beiträge über fünf Seiten, keiner doppelt", len(z150), art="mock")
            seite.click("#community .cm-beitraege a:text-is('Auditbeitrag 140')")
            titel("Auditbeitrag 140")
            seite.click("text=‹ Zurück zu Beiträgen")
            titel("Beiträge")
            warte_liste()
            seite.wait_for_timeout(400)
            z_nachher = zeilen()
            pruefe(len(z_nachher) == 150 and z_nachher == z150, "Nach der Rückkehr wieder alle 150 in gleicher Reihenfolge", len(z_nachher), art="mock")
            pruefe(seite.evaluate("document.activeElement.textContent") == "Auditbeitrag 140",
                   "Fokus auf dem zuletzt geöffneten Beitrag 140", seite.evaluate("document.activeElement.textContent"), art="mock")
            # Leer-Zustand mit Filter: einmal sichtbar, für Bildschirmleser angesagt
            seite.unroute("**/rest/v1/beitrag_liste?**")
            seite.unroute("**/rest/v1/antwort?**")
            seite.select_option("#community select >> nth=0", "lernzettel")
            seite.select_option("#community select >> nth=1", "lf13")
            warte_liste()
            sichtbar = seite.evaluate("""() => [...document.querySelectorAll('#community *')].filter(e => e.children.length === 0
                && e.textContent.trim() === 'Zu diesen Filtern gibt es keine Beiträge.'
                && e.getBoundingClientRect().width > 2).length""")
            status = seite.evaluate("document.querySelector('#community .cm-ergebnis').textContent")
            pruefe(sichtbar == 1 and status == "Zu diesen Filtern gibt es keine Beiträge.",
                   "Leer mit Filter: einmal sichtbar, Status für Bildschirmleser gesetzt", (sichtbar, status))
            seite.click("#community .cm-filter >> text=Filter zurücksetzen")
            warte_liste()

            # ------------------------------------------------ Abmelden: späte Antwort (R2) [mock]
            print("Späte Abmeldeantwort (R2)")
            oeffne("#community/profil")
            titel("Profil")
            ev("() => { window.__frei = null; window.__echt = AP.community.abmelden;"
               " AP.community.abmelden = () => new Promise(ja => { window.__frei = ja; }); }")
            seite.click("#community >> text=Abmelden")
            ev("async () => { const c = await AP.community.verbinden(); await c.auth.signOut({ scope: 'local' }); }")
            titel("In der Community anmelden")
            als(BEN)
            oeffne("#community/profil")
            pruefe(titel("Profil") and seite.is_visible("#community >> text=Ben (Demo)"), "Ben angemeldet und sichtbar", art="mock")
            ev("() => { window.__frei(); AP.community.abmelden = window.__echt; }")
            seite.wait_for_timeout(800)
            pruefe(h1() == "Profil" and seite.is_visible("#community >> text=Ben (Demo)"),
                   "Alte Abmelde-Antwort entfernt Ben nicht aus der Ansicht", h1(), art="mock")
            pruefe(ev("() => AP.community.kontoJetzt()") is not None, "Bens Sitzung besteht weiter", art="mock")

            # ------------------------------------------------ Aufräumen
            print("Aufräumen")
            ab()
            als(ANNA)
            for b in ev("""async (praefix) => { const c = await AP.community.verbinden();
                    const u = (await c.auth.getUser()).data.user.id;
                    return ((await c.from('beitrag').select('id').eq('autor_id', u).like('titel', praefix + '%')).data || []); }""", PRAEFIX):
                ev("(id) => AP.community.beitragLoeschen(id).catch(() => {})", b["id"])
            if gid:
                ev("(g) => AP.community.gruppeVerlassen(g).catch(() => {})", gid)
            rest = ev("""async (praefix) => { const c = await AP.community.verbinden();
                return ((await c.from('beitrag_liste').select('id').like('titel', praefix + '%')).data || []).length; }""", PRAEFIX)
            pruefe(rest == 0, "Keine Testbeiträge übrig", rest)
            ab()
            browser.close()

    print()
    print("Alles in Ordnung." if not fehler else f"{len(fehler)} Fehler: " + "; ".join(fehler))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
