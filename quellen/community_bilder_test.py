#!/usr/bin/env python3
"""
AzubiPass · Bilder im Feed (Spec 07) – Oberfläche [mock]

    AXE_PFAD=…/axe.min.js python3 community_bilder_test.py

Die echten Module laufen gegen die nachgebildete Schnittstelle aus
community_korrekturen_test.py (RPC beitrag_mit_anhaengen, Speicher mit
upload/list/remove/download). Zusätzlich hier: steuerbare Uploads (halten,
scheitern) und Downloads (zählen, gleichzeitige messen, scheitern).
Die Serverseite prüfen supabase/tests/anhang_test.sql und konkurrenz.py bilder.
Keine Zugangsdaten, kein echtes Konto, kein echter Speicher.
"""

import functools
import socketserver
import sys
import threading

from playwright.sync_api import sync_playwright

import community_korrekturen_test as basis

pruefe = basis.pruefe

SPEICHER_JS = r"""
(() => {
  const F = window.FAKE;
  const c = window.supabase.createClient();
  const orig = c.storage.from;
  F.hoch = { reihe: [], halten: 0, gehalten: [], scheitern: {} };      // scheitern[nr] = true → n-ter Upload schlägt fehl
  F.runter = { anzahl: 0, jetzt: 0, max: 0, pfade: [], scheitern: 0, verzoegerung: 60 };
  let hochNr = 0;
  c.storage.from = (b) => {
    const o = orig(b);
    const up = o.upload;
    o.upload = (pfad, datei, opt) => {
      hochNr++;
      F.hoch.reihe.push(pfad);
      const nr = hochNr;
      const weiter = () => F.hoch.scheitern[nr]
        ? Promise.resolve({ data: null, error: { message: "Netzwerkfehler beim Hochladen", statusCode: "500" } })
        : up(pfad, datei, opt);
      if (F.hoch.halten > 0) { F.hoch.halten--; return new Promise(ja => F.hoch.gehalten.push(() => ja(weiter()))); }
      return weiter();
    };
    o.download = (pfad) => {
      F.runter.anzahl++; F.runter.jetzt++; F.runter.max = Math.max(F.runter.max, F.runter.jetzt); F.runter.pfade.push(pfad);
      return new Promise(ja => setTimeout(() => {
        F.runter.jetzt--;
        if (F.runter.scheitern > 0) { F.runter.scheitern--; ja({ data: null, error: { message: "Fehler", statusCode: "500" } }); return; }
        ja({ data: new Blob(["x"], { type: "image/png" }), error: null });
      }, F.runter.verzoegerung));
    };
    return o;
  };
  F.hochFreigeben = () => { const g = F.hoch.gehalten; F.hoch.gehalten = []; g.forEach(f => f()); return g.length; };
  F.bildBeitrag = (id, n, titel, zeit) => {
    const anh = Array.from({ length: n }, (_, i) => ({ position: i + 1, pfad: F.BEN + "/" + id + "-" + (i + 1) + ".png", art: "bild",
      beschreibung: i === 0 ? "Kontenrahmen als Foto" : "" }));
    anh.forEach(a => { F.db.dateien[a.pfad] = true; });
    F.db.beitrag.push({ id, autor_id: F.BEN, art: "tipp", titel, text: "Mit Bildern.", erstellt_am: zeit || new Date().toISOString(),
      datei_pfad: anh[0].pfad, datei_art: "bild", anhaenge: anh });
  };
})();
"""


def main():
    PNG = basis.png()
    GROSS = PNG + b"\0" * (5242880 - len(PNG))          # exakt 5 MiB
    handler = functools.partial(basis.Stiller, directory=str(basis.DOCS))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{srv.server_address[1]}/"
        with sync_playwright() as p:
            browser = p.chromium.launch()

            def neue_seite(ziel="heute", vorher="", breite=390):
                ctx = browser.new_context(viewport={"width": breite, "height": 844}, service_workers="block", locale="de-DE")
                ctx.add_init_script(basis.FAKE_JS)
                ctx.add_init_script(SPEICHER_JS)
                if vorher:
                    ctx.add_init_script(vorher)
                s = ctx.new_page()
                s.goto(url + "app.html#" + ziel)
                s.wait_for_function("window.AP && AP.community && AP.communityBeitraege")
                return ctx, s

            def ev(s, js, arg=None):
                return s.evaluate(js, arg)

            def warte(s, text, timeout=6000):
                s.get_by_text(text, exact=False).first.wait_for(timeout=timeout)

            def axe(s, name, wurzel="#community"):
                if not basis.AXE.exists():
                    print(f"  ---- [mock] axe übersprungen ({name})")
                    return
                s.add_script_tag(path=str(basis.AXE))
                v = s.evaluate("""async (w) => (await axe.run(document.querySelector(w),
                    { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ':' + x.nodes.length)""", wurzel)
                pruefe(not v, f"axe ohne WCAG-Verstöße: {name}", ", ".join(v))

            def bild(name, inhalt=None, typ="image/png"):
                return {"name": name, "mimeType": typ, "buffer": inhalt if inhalt is not None else PNG}

            def formular(s, titel="Frage mit Bild", text="Siehe Screenshot.", art=None):
                ev(s, "location.hash = '#community/schreiben'")
                s.get_by_label("Titel").wait_for()
                if art:
                    s.get_by_label(art, exact=True).check()
                s.get_by_label("Titel").fill(titel)
                if text is not None:
                    s.locator("form.cm-schreiben textarea").fill(text)

            def bilder_waehlen(s, dateien):
                s.locator("form.cm-schreiben input[type=file][multiple]").set_input_files(files=dateien)

            def namen(s):
                return ev(s, "[...document.querySelectorAll('.cm-bildwahl-name')].map(x => x.textContent.split(' · ')[1])")

            def senden(s):
                s.get_by_role("button", name="Beitrag veröffentlichen").click()

            def rpc(s, i=0):
                return ev(s, f"(FAKE.aufrufe.beitrag_mit_anhaengen || [])[{i}] || null")

            print("Frage ohne Bild / mit 1 Bild / Tipp mit 5 Bildern")
            ctx, s = neue_seite()
            formular(s, "Frage ohne Bild")
            senden(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = rpc(s)
            pruefe(a and a["p_anhaenge"] == [] and ev(s, "FAKE.hoch.reihe.length") == 0, "Ohne Bild: kein Upload, leere Anhangsliste")
            ctx.close()
            ctx, s = neue_seite()
            formular(s, "Frage mit einem Bild")
            bilder_waehlen(s, [bild("screenshot.png")])
            pruefe(namen(s) == ["screenshot.png"] and s.get_by_text("1 von 5 Bildern ausgewählt.").count() == 1, "Vorschau mit Name, Zähler")
            pruefe(ev(s, "FAKE.hoch.reihe.length") == 0, "Kein Upload bei der Auswahl")
            axe(s, "Formular mit einem Bild")
            senden(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = rpc(s)
            ich, v = ev(s, "FAKE.ICH"), a["p_vorgang"]
            pruefe(a["p_art"] == "frage" and [x["pfad"] for x in a["p_anhaenge"]] == [f"{ich}/{v}-1.png"], "Pfad ‹konto›/‹vorgang›-1.png")
            warte(s, "Dein Beitrag wurde veröffentlicht.")
            s.locator(".cm-galerie img.cm-bild").wait_for()
            pruefe(ev(s, "document.querySelector('.cm-galerie img.cm-bild').alt") == "Bild 1 von 1 zum Beitrag „Frage mit einem Bild“",
                   "Alternativtext ohne Beschreibung neutral")
            ctx.close()

            ctx, s = neue_seite()
            formular(s, "Fünf Bilder", art="Tipp")
            bilder_waehlen(s, [bild(f"b{i}.png") for i in (1, 2, 3)])
            bilder_waehlen(s, [bild("b4.png"), bild("b5.png")])
            pruefe(namen(s) == ["b1.png", "b2.png", "b3.png", "b4.png", "b5.png"], "Erneute Auswahl ergänzt", namen(s))
            pruefe(s.locator("form.cm-schreiben input[type=file][multiple]").is_disabled(), "Bei 5 Bildern keine weitere Auswahl")
            # umsortieren und beschreiben
            s.get_by_role("button", name="Bild 3 nach vorn").click()
            s.get_by_role("button", name="Bild 2 nach vorn").click()
            pruefe(namen(s)[0] == "b3.png", "„Nach vorn“ zweimal: b3 ist Bild 1", namen(s))
            pruefe(ev(s, "document.activeElement && document.activeElement.textContent") in ("Nach vorn", "Entfernen", "Nach hinten"),
                   "Fokus bleibt bei den Bildaktionen")
            s.get_by_label("Bildbeschreibung für Bild 1 (optional)").fill("Kontenrahmen, Klasse 4")
            s.get_by_role("button", name="Bild 5 entfernen").click()
            s.get_by_role("button", name="Bild 1 nach hinten").click()
            s.get_by_role("button", name="Bild 2 nach vorn").click()
            pruefe(namen(s) == ["b3.png", "b1.png", "b2.png", "b4.png"], "Entfernen und Hin-und-zurück", namen(s))
            bilder_waehlen(s, [bild("b6.png")])
            ev(s, """window._texte = []; const k = [...document.querySelectorAll('form.cm-schreiben button[type=submit]')][0];
                     new MutationObserver(() => window._texte.push(k.textContent)).observe(k, { childList: true, characterData: true, subtree: true });""")
            ev(s, "FAKE.hoch.halten = 1")
            senden(s)
            s.wait_for_function("FAKE.hoch.gehalten.length === 1")
            pruefe(s.get_by_role("button", name="Bild 1 entfernen").is_disabled() and
                   s.get_by_label("Bildbeschreibung für Bild 1 (optional)").is_disabled() is False and
                   s.get_by_label("Bildbeschreibung für Bild 1 (optional)").evaluate("e => e.readOnly"),
                   "Während des Sendens: Auswahl, Reihenfolge und Beschreibung gesperrt")
            axe(s, "Formular beim Hochladen")
            ev(s, "FAKE.hochFreigeben()")
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            texte = ev(s, "window._texte || []")
            pruefe("Bild 2 von 5 wird hochgeladen …" in texte and "Beitrag wird veröffentlicht …" in texte, "Fortschritt „Bild 2 von 5 …“", texte[:3])
            a = rpc(s)
            v = a["p_vorgang"]
            pruefe([x["pfad"].split("-")[-1] for x in a["p_anhaenge"]] == ["1.png", "2.png", "3.png", "4.png", "5.png"]
                   and a["p_anhaenge"][0]["beschreibung"] == "Kontenrahmen, Klasse 4", "Fünf Anhänge mit Beschreibung an Bild 1")
            pruefe(ev(s, "FAKE.hoch.reihe") == [x["pfad"] for x in a["p_anhaenge"]], "Hochgeladen in der gewählten Reihenfolge")
            ctx.close()

            print("Grenzen in der Oberfläche")
            ctx, s = neue_seite()
            formular(s)
            bilder_waehlen(s, [bild(f"x{i}.png") for i in range(1, 7)])
            pruefe(len(namen(s)) == 5 and s.get_by_text("Du kannst höchstens 5 Bilder hinzufügen.").count() >= 1, "6 Bilder: 5 übernommen, Hinweis")
            s.get_by_role("button", name="Bild 5 entfernen").click()
            s.get_by_role("button", name="Bild 4 entfernen").click()
            bilder_waehlen(s, [bild("anim.gif", typ="image/gif"), bild("genau.png", GROSS), bild("zu-gross.png", GROSS + b"\0")])
            pruefe(s.get_by_text("anim.gif: Dieses Bildformat wird nicht unterstützt. Wähle JPG, PNG oder WebP.").count() >= 1
                   and s.get_by_text("zu-gross.png: Dieses Bild ist größer als 5 MiB.").count() >= 1, "Format und +1 Byte mit Grund abgelehnt")
            pruefe(namen(s) == ["x1.png", "x2.png", "x3.png", "genau.png"], "Exakt 5 MiB zulässig, gültige Auswahl bleibt", namen(s))
            axe(s, "Formular mit Bildfehlern")
            ctx.close()

            print("Lernzettel: Bilder, PDF, ohne Anhang, Artwechsel")
            ctx, s = neue_seite()
            formular(s, "Lernzettel ohne Anhang", text="", art="Lernzettel")
            senden(s)
            warte(s, "Wähle mindestens ein Bild für deinen Lernzettel oder wechsle zu PDF.")
            pruefe(rpc(s) is None, "Ohne Anhang abgelehnt, nichts gesendet")
            s.get_by_label("Frage", exact=True).check()
            bilder_waehlen(s, [bild("f1.png"), bild("f2.png")])
            s.get_by_label("Lernzettel", exact=True).check()
            pruefe(namen(s) == ["f1.png", "f2.png"], "Frage → Lernzettel: Bilder bleiben")
            s.get_by_label("PDF", exact=True).check()
            warte(s, "Die 2 ausgewählten Bilder werden entfernt.")
            s.locator("dialog").get_by_role("button", name="Abbrechen").click()
            s.wait_for_function("!document.querySelector('dialog')")
            pruefe(s.get_by_label("Bilder", exact=True).is_checked() and namen(s) == ["f1.png", "f2.png"], "Abbrechen: Bilder bleiben, Modus Bilder",
                   [s.get_by_label("Bilder", exact=True).count(), namen(s)])
            s.get_by_label("PDF", exact=True).check()
            s.locator("dialog").get_by_role("button", name="Bilder entfernen").click()
            s.wait_for_function("!document.querySelector('dialog')")
            pruefe(namen(s) == [] and s.get_by_label("PDF-Datei").is_visible(), "Bestätigt: Bilder entfernt, PDF-Auswahl sichtbar",
                   [namen(s), s.get_by_label("PDF-Datei").count(), s.locator("dialog").count()])
            s.get_by_label("PDF-Datei").set_input_files(files=[bild("skript.pdf", b"%PDF-1.4 test", "application/pdf")])
            s.get_by_label("Tipp", exact=True).check()
            warte(s, "Die ausgewählte PDF-Datei „skript.pdf“ wird entfernt.")
            axe(s, "Rückfrage PDF entfernen", "dialog")
            s.keyboard.press("Escape")
            s.wait_for_function("!document.querySelector('dialog')")
            pruefe(s.get_by_label("Lernzettel", exact=True).is_checked() and s.get_by_text("Ausgewählt: skript.pdf").count() == 1,
                   "Escape: Lernzettel und PDF bleiben",
                   [s.get_by_label("Lernzettel", exact=True).is_checked(), s.get_by_text("Ausgewählt: skript.pdf").count()])
            s.get_by_label("Titel").fill("Lernzettel als PDF")
            senden(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            a = rpc(s)
            pruefe(a["p_art"] == "lernzettel" and len(a["p_anhaenge"]) == 1 and a["p_anhaenge"][0]["pfad"].endswith("-1.pdf"), "PDF-Lernzettel gesendet")
            s.get_by_role("link", name="PDF öffnen").wait_for()
            pruefe(True, "Detail: PDF wie bisher („PDF öffnen“)")
            ctx.close()

            print("Teilupload, Wiederholung, unklarer Ausgang")
            ctx, s = neue_seite()
            formular(s, "Drei Bilder, drittes scheitert")
            bilder_waehlen(s, [bild("t1.png"), bild("t2.png"), bild("t3.png")])
            ev(s, "FAKE.hoch.scheitern[3] = true")
            senden(s)
            warte(s, "Die Bilder konnten nicht vollständig hochgeladen werden. Deine Auswahl ist noch da.")
            pruefe(rpc(s) is None and namen(s) == ["t1.png", "t2.png", "t3.png"], "Kein Beitrag, Auswahl noch da")
            senden(s)
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            pruefe(ev(s, "FAKE.aufrufe.beitrag_mit_anhaengen.length") == 1 and ev(s, "FAKE.db.beitrag.length") == 1
                   and len(rpc(s)["p_anhaenge"]) == 3, "Zweiter Versuch: dieselbe Kennung, ein Beitrag mit drei Anhängen")
            ctx.close()
            ctx, s = neue_seite()
            formular(s, "Unklar und verworfen")
            bilder_waehlen(s, [bild("u1.png"), bild("u2.png"), bild("u3.png")])
            ev(s, "FAKE.plan.beitrag_mit_anhaengen = ['503']")
            senden(s)
            warte(s, "Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.")
            pruefe(ev(s, "FAKE.entfernt.length") == 0, "Unklar: keine Datei entfernt")
            s.get_by_role("button", name="Eingaben ändern").click()
            warte(s, "Du kannst deine Eingaben jetzt ändern.")
            v = rpc(s)["p_vorgang"]
            ich = ev(s, "FAKE.ICH")
            pruefe(sorted(ev(s, "FAKE.entfernt")) == [f"{ich}/{v}-{i}.png" for i in (1, 2, 3)], "„Verworfen“: alle drei Dateien entfernt",
                   ev(s, "FAKE.entfernt"))
            ctx.close()
            ctx, s = neue_seite()
            formular(s, "Doppelklick")
            bilder_waehlen(s, [bild("d1.png")])
            ev(s, "FAKE.hoch.halten = 1")
            senden(s)
            s.get_by_role("button", name="Bild 1 von 1 wird hochgeladen …").click(force=True)
            ev(s, "FAKE.hochFreigeben()")
            s.wait_for_function("location.hash.indexOf('#community/beitrag/') === 0")
            pruefe(ev(s, "FAKE.aufrufe.beitrag_mit_anhaengen.length") == 1 and ev(s, "FAKE.hoch.reihe.length") == 1, "Doppelklick: ein Upload, ein Aufruf")
            ctx.close()

            print("Kontowechsel während des Uploads")
            ctx, s = neue_seite()
            formular(s, "Konto A")
            bilder_waehlen(s, [bild("k1.png"), bild("k2.png")])
            urls = ev(s, "[...document.querySelectorAll('.cm-bildwahl-vorschau')].map(i => i.src)")
            ev(s, "FAKE.hoch.halten = 1")
            senden(s)
            s.wait_for_function("FAKE.hoch.gehalten.length === 1")
            ev(s, "FAKE.db.profil.push({ id: FAKE.BEN, anzeigename: 'Ben', rolle: 'azubi' }); FAKE.anmelden(FAKE.BEN_KONTO)")
            s.wait_for_timeout(300)
            ev(s, "FAKE.hochFreigeben()")
            s.wait_for_timeout(500)
            pruefe(rpc(s) is None and ev(s, "FAKE.hoch.reihe.length") == 1, "Nach Wechsel: kein weiterer Upload, keine Veröffentlichung")
            geht = ev(s, "(async (u) => { try { await (await fetch(u)).blob(); return true; } catch (e) { return false; } })", urls[0])
            pruefe(geht is False, "Vorschauadressen von Konto A freigegeben")
            ctx.close()

            print("Feed: Vorschau, Lazy-Abruf, große Ansicht")
            erzeugen = "; ".join(f"FAKE.bildBeitrag('00000000-0000-4000-a000-0000000c{i:04d}', {1 if i % 3 else 3}, 'Bildtipp {i}', "
                                 f"new Date(Date.now() - {i} * 60000).toISOString())" for i in range(1, 16))
            ctx, s = neue_seite("community", vorher=erzeugen)
            s.locator(".cm-feedbild").first.wait_for()
            s.wait_for_timeout(800)
            n1 = ev(s, "FAKE.runter.anzahl")
            pruefe(0 < n1 < 15, "Nur Bilder nahe am sichtbaren Bereich geladen", n1)
            pruefe(ev(s, "FAKE.runter.max") <= 2, "Höchstens zwei Abrufe gleichzeitig", ev(s, "FAKE.runter.max"))
            pruefe(ev(s, "FAKE.runter.pfade.every(p => /-1\\.png$/.test(p))"), "Im Feed nur das erste Bild je Beitrag")
            pruefe(s.get_by_text("1 / 3").count() >= 1, "Mehrere Bilder: „1 / 3“")
            hoehen = ev(s, "[...document.querySelectorAll('.cm-feedbild-rahmen')].slice(0, 3).map(r => r.getBoundingClientRect().height)")
            pruefe(all(h == hoehen[0] and h > 100 for h in hoehen), "Bildplatz reserviert (gleiche Höhe vor/nach dem Laden)", hoehen)
            axe(s, "Feed mit Bildern")
            ev(s, "window.scrollTo(0, document.body.scrollHeight)")
            s.wait_for_timeout(1500)
            pruefe(ev(s, "FAKE.runter.anzahl") > n1, "Beim Scrollen werden weitere geladen", ev(s, "FAKE.runter.anzahl"))
            ev(s, "window.scrollTo(0, 0)")
            s.wait_for_timeout(200)
            knopf = s.locator(".cm-feedbild-knopf[aria-label*='(1 von 3)']").first
            pruefe("groß ansehen" in knopf.get_attribute("aria-label"), "Bildknopf mit Textnamen", knopf.get_attribute("aria-label"))
            knopf.click()
            s.locator("dialog.cm-grossbild").wait_for()
            pruefe(s.get_by_role("heading", name="Bild 1 von 3").count() == 1, "Antippen öffnet Beitrag und große Ansicht")
            axe(s, "Große Ansicht", "dialog.cm-grossbild")
            s.get_by_role("button", name="Nächstes Bild").last.click()
            s.get_by_role("heading", name="Bild 2 von 3").wait_for()
            s.keyboard.press("Escape")
            s.wait_for_function("!document.querySelector('dialog.cm-grossbild')")
            pruefe(ev(s, "document.activeElement && document.activeElement.classList.contains('cm-galerie-buehne')"), "Escape schließt, Fokus zurück zum Bild")
            pruefe(ev(s, "document.querySelector('.cm-galerie-nummer[aria-pressed=true]').textContent") == "2", "Galerie steht auf dem zuletzt gesehenen Bild")
            axe(s, "Detail mit Galerie")
            s.get_by_role("button", name="‹ Zurück zu Beiträgen").click()
            s.locator(".cm-feedbild").first.wait_for()
            s.wait_for_timeout(300)
            pruefe(ev(s, "document.activeElement && document.activeElement.dataset.id") is not None, "Zurück: Fokus auf dem Ursprungsbeitrag")
            ctx.close()

            print("Detail: weitere Bilder erst bei Auswahl, Bildfehler")
            ctx, s = neue_seite("community/beitrag/00000000-0000-4000-a000-0000000c0001",
                                vorher="FAKE.bildBeitrag('00000000-0000-4000-a000-0000000c0001', 4, 'Vier Bilder');")
            s.locator(".cm-galerie img.cm-bild").wait_for()
            s.wait_for_timeout(300)
            pruefe(ev(s, "FAKE.runter.anzahl") == 1, "Nur Bild 1 geladen")
            pruefe(ev(s, "document.querySelector('.cm-galerie img.cm-bild').alt") == "Kontenrahmen als Foto", "Beschreibung als Alternativtext")
            ev(s, "FAKE.runter.scheitern = 1")
            s.get_by_role("button", name="Bild 3", exact=True).click()
            warte(s, "Das Bild konnte nicht geladen werden.")
            pruefe(s.get_by_role("heading", name="Vier Bilder").count() == 1 and s.get_by_role("button", name="Antwort schreiben").count() == 1,
                   "Bildfehler betrifft nur den Bildbereich")
            s.get_by_role("button", name="Erneut versuchen").click()
            s.wait_for_function("document.querySelector('.cm-galerie img.cm-bild')")
            pruefe(ev(s, "FAKE.runter.pfade.slice(-1)[0].endsWith('-3.png')") and ev(s, "FAKE.runter.anzahl") == 3, "Erneut versuchen lädt Bild 3 neu")
            ctx.close()

            print("Teamfall und eigener ausgeblendeter Beitrag: alle Anhänge erst auf „Datei prüfen“")
            import community_moderation_test as mod
            ANH = f"""(() => {{ const F = window.FAKE;
              F.db.anhang = [1, 2, 3].map(i => ({{ beitrag_id: '{mod.B1}', position: i, pfad: F.BEN + '/{mod.B1}-' + i + '.png', art: 'bild', beschreibung: '' }}))
                .concat([1, 2].map(i => ({{ beitrag_id: '{mod.B2}', position: i, pfad: F.ICH + '/{mod.B2}-' + i + '.png', art: 'bild', beschreibung: '' }})));
              const altFall = F.logik.moderation_fall;
              F.logik.moderation_fall = (a) => {{ const r = altFall(a); if (r.data) {{ r.data.beitrag.datei_pfad = F.BEN + '/{mod.B1}-1.png'; r.data.beitrag.datei_art = 'bild'; }} return r; }};
              const altEigen = F.logik.eigener_inhalt;
              F.logik.eigener_inhalt = (a) => {{ const r = altEigen(a); if (r.data) {{ r.data.datei_pfad = F.ICH + '/{mod.B2}-1.png'; r.data.datei_art = 'bild'; }} return r; }};
            }})();"""
            ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block", locale="de-DE")
            for skript in (basis.FAKE_JS, SPEICHER_JS, mod.MOD_JS, mod.TEAM_JS, ANH):
                ctx.add_init_script(skript)
            s = ctx.new_page()
            s.goto(url + "app.html#community/moderation/fall/beitrag/" + mod.B1)
            s.get_by_role("button", name="Datei prüfen").wait_for()
            pruefe(ev(s, "FAKE.runter.anzahl") == 0, "Fallüberblick lädt keine Datei automatisch")
            s.get_by_role("button", name="Datei prüfen").click()
            s.get_by_role("link", name="Bild 3 öffnen").wait_for()
            pruefe(ev(s, "FAKE.runter.anzahl") == 3 and s.locator(".cm-datei img.cm-bild").count() == 3, "Team: alle drei Anhänge geprüft")
            ctx.close()
            ctx = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block", locale="de-DE")
            for skript in (basis.FAKE_JS, SPEICHER_JS, mod.MOD_JS, ANH):
                ctx.add_init_script(skript)
            s = ctx.new_page()
            s.goto(url + "app.html#community/eigener-inhalt/beitrag/" + mod.B2)
            s.get_by_role("button", name="Datei prüfen").wait_for()
            s.get_by_role("button", name="Datei prüfen").click()
            s.get_by_role("link", name="Bild 2 öffnen").wait_for()
            pruefe(ev(s, "FAKE.runter.anzahl") == 2, "Eigener ausgeblendeter Beitrag: beide Anhänge über den Sonderweg")
            ctx.close()

            print("320 px")
            ctx, s = neue_seite(breite=320)
            formular(s, "Schmal")
            bilder_waehlen(s, [bild("s1.png"), bild("s2.png")])
            pruefe(ev(s, "document.documentElement.scrollWidth <= 320"), "Kein waagerechtes Scrollen bei 320 px", ev(s, "document.documentElement.scrollWidth"))
            groessen = ev(s, "[...document.querySelectorAll('.cm-bildwahl-aktionen button')].map(b => [b.offsetWidth, b.offsetHeight])")
            pruefe(all(w >= 44 and h >= 44 for w, h in groessen), "Bildaktionen mindestens 44 × 44 px", groessen[:3])
            ctx.close()

            browser.close()

    print()
    print(f"{'Alles bestanden' if not basis.fehler else str(len(basis.fehler)) + ' Fehler'}")
    return 1 if basis.fehler else 0


if __name__ == "__main__":
    sys.exit(main())
