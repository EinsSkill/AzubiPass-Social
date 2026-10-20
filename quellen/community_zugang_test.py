#!/usr/bin/env python3
"""
AzubiPass · Test des Community-Zugangs (Anmeldung, Mail-Code, Profil, Regeln)

    COMMUNITY_TEST_PASSWORT=… COMMUNITY_TEST_CODE=DEMO-… \\
    COMMUNITY_TEST_NEU=test-neu1@…,test-neu2@…,test-neu3@…,test-neu4@… \\
    python3 community_zugang_test.py [--bilder ORDNER]

Spielt die Fälle aus doku/community/02-anmeldung-profil.md im echten Browser
gegen das echte Supabase-Projekt durch. Nur dort, wo eine echte Mail nötig
wäre, wird die Antwort des Mailservers ersetzt:

  - „Link senden" (POST /auth/v1/otp) antwortet ohne Versand mit Erfolg oder
    mit 429 – Supabase verschickt ohne eigenen Mailversand nichts an Testkonten.
  - „Mit Code anmelden" (POST /auth/v1/verify) bekommt eine ECHTE Sitzung
    zurück, die vorher per Passwort für dasselbe Testkonto geholt wurde.

Alles andere – Profil lesen, Profil anlegen, Zugangscode, Namensprüfung,
Abmelden – geht unverändert an Supabase. COMMUNITY_TEST_NEU braucht neun
Konten OHNE Profil; nach dem Lauf haben sie eins (Konten neu anlegen, siehe
supabase/README.md).

Rückgabewert 1 bei einem Fehler.
"""

import functools
import http.server
import json
import os
import socketserver
import sys
import threading
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

DOCS = Path(__file__).resolve().parent.parent / "docs"
SUPABASE = "https://pjbxozskvuhxtrotqpkr.supabase.co"
SCHLUESSEL = "sb_publishable_USAutB__rzLYPaBkbOJ6WQ_K13tabfq"
ANNA = "demo-anna@azubipass.invalid"

fehler = []


def pruefe(bedingung, text, wert=""):
    print(f"  {'OK  ' if bedingung else 'FEHL'} {text}" + (f"  {wert}" if wert != "" else ""))
    if not bedingung:
        fehler.append(text)


class Stiller(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def echte_sitzung(mail, pw):
    """Holt eine echte Sitzung per Passwort – als Antwort für den Mail-Code."""
    anfrage = urllib.request.Request(
        SUPABASE + "/auth/v1/token?grant_type=password",
        data=json.dumps({"email": mail, "password": pw}).encode(),
        headers={"apikey": SCHLUESSEL, "Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(anfrage, timeout=20) as a:
        return a.read().decode()


def main():
    pw = os.environ.get("COMMUNITY_TEST_PASSWORT")
    beta = os.environ.get("COMMUNITY_TEST_CODE")
    neu = [x.strip() for x in os.environ.get("COMMUNITY_TEST_NEU", "").split(",") if x.strip()]
    bilder = None
    if "--bilder" in sys.argv:
        bilder = Path(sys.argv[sys.argv.index("--bilder") + 1])
        bilder.mkdir(parents=True, exist_ok=True)
    if not pw or not beta or len(neu) < 9:
        print("COMMUNITY_TEST_PASSWORT, COMMUNITY_TEST_CODE und neun Konten ohne Profil in COMMUNITY_TEST_NEU setzen.")
        return 2

    # Anzeigenamen aus den Kontonamen ableiten – so bleibt jeder Lauf eindeutig.
    namen = [m.split("@")[0].replace("-", " ").title() for m in neu]

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
            ctx.on("request", lambda r: anfragen.append((r.method, r.url, r.post_data)))

            def bild(name):
                if bilder:
                    seite.screenshot(path=str(bilder / f"{name}.png"), full_page=True)

            def h1(erwartet=None):
                """Überschrift der Community-Ansicht. Mit erwartet wird bis zu
                20 s gewartet, bis sie erscheint – Ansichten wechseln erst nach
                der Antwort des Servers."""
                if erwartet:
                    try:
                        seite.wait_for_function("(t) => { const h = document.querySelector('#community h1');"
                                                " return h && h.textContent.trim() === t; }", arg=erwartet, timeout=20000)
                    except Exception:
                        pass
                else:
                    seite.wait_for_function("document.querySelector('#community h1') && "
                                            "!/geprüft/.test(document.querySelector('#community h1').textContent)")
                return seite.inner_text("#community h1").strip()

            def ist(erwartet):
                return h1(erwartet) == erwartet

            def gesperrt_da():
                """Seit Spec 05 (13.10.2026): Neue Klassenkonten stehen nicht in
                beitraege_tester – nach der Zugangsprüfung kommt die Paketsperre."""
                return ist("Community") and seite.is_visible("text=Beiträge sind für die Klassen-Beta noch nicht freigeschaltet.")

            def profilseite():
                """Seit C04 startet die Community mit „Beiträge“; Profil, Regeln
                und Abmelden liegen unter #community/profil."""
                seite.evaluate("location.hash = '#community/profil'")
                return ist("Profil")

            def abmelden_ui():
                profilseite()
                seite.click("#community >> text=Abmelden")

            def rest_anfragen():
                return [a for a in anfragen if "/rest/v1/" in a[1]]

            def konto():
                return seite.evaluate("localStorage.getItem('azubipass:konto')")

            def sitzung_schluessel():
                return seite.evaluate("Object.keys(localStorage).filter(k => k.indexOf('azubipass-sitzung') === 0)")

            def mit_passwort(mail):
                seite.evaluate("""async ([m, p]) => { const c = await AP.community.verbinden();
                  const r = await c.auth.signInWithPassword({ email: m, password: p });
                  if (r.error) throw new Error(r.error.message); }""", [mail, pw])

            def ziele_mindestens_44(name):
                klein = seite.evaluate("""() => {
                  const raus = [];
                  const sel = '#community button, #community a, #community input:not([type=checkbox]), '
                            + '#community select, #community label.cm-haken, dialog[open] button';
                  document.querySelectorAll(sel).forEach(e => {
                    const r = e.getBoundingClientRect();
                    if (!r.width || !r.height || getComputedStyle(e).visibility === 'hidden') return;
                    if (r.height < 44 || r.width < 44) raus.push((e.textContent || e.tagName).trim().slice(0, 40)
                      + ' ' + Math.round(r.width) + '×' + Math.round(r.height));
                  });
                  return raus; }""")
                pruefe(not klein, f"Tippziele ≥ 44 × 44 px ({name})", klein)

            # ---------------------------------------------------------- Heute, Ich
            print("Einstiege")
            seite.goto(basis + "app.html#heute")
            seite.wait_for_selector(".hm-gemeinsam")
            konto_vorher = konto()
            seite.evaluate("""() => { AP.stand.lesezeichen.push({zu:'lf1.html#k1', titel:'Prüfmarke', lernfeld:'lf1'});
                                      AP.sichern(); }""")
            seite.wait_for_timeout(600)
            konto_vorher = konto()
            text = seite.inner_text(".hm-gemeinsam")
            pruefe("Gemeinsam lernen" in text and "Zur Community" in text, "Heute zeigt „Gemeinsam lernen“ mit „Zur Community“")
            pruefe(seite.get_attribute(".hm-gemeinsam a", "href") == "app.html#community", "Heute-Link führt in die Community")
            pruefe(not rest_anfragen(), "Heute lädt keine Community-Daten", len(rest_anfragen()))
            bild("01-heute")
            seite.goto(basis + "app.html#ich")
            seite.wait_for_selector("#ich a[href='app.html#community']")
            pruefe("Community" in seite.inner_text("#ich a[href='app.html#community']"), "Ich hat die Zeile „Community“")
            bild("02-ich")

            # ---------------------------------------------------------- A ohne Sitzung
            print("Anmeldung (A)")
            seite.click("#ich a[href='app.html#community']")
            pruefe(ist("In der Community anmelden"), "Ohne Sitzung: Anmeldung", h1())
            pruefe(seite.get_attribute(".tab[href='app.html#ich']", "aria-current") == "page", "Tab „Ich“ bleibt aktiv")
            pruefe(not rest_anfragen(), "Ohne Sitzung keine Community-Datenabfrage", len(rest_anfragen()))
            pruefe(seite.evaluate("document.activeElement.tagName") == "H1", "Fokus auf der Überschrift")
            bild("03-anmeldung")
            ziele_mindestens_44("Anmeldung")
            seite.click("text=Anmeldelink senden")
            pruefe(seite.is_visible("text=Gib deine E-Mail-Adresse ein."), "Leere Adresse wird erklärt")
            pruefe(seite.evaluate("document.activeElement.type") == "email", "Fokus springt ins E-Mail-Feld")
            seite.fill("#community input[type=email]", "kein-at-zeichen")
            seite.click("text=Anmeldelink senden")
            pruefe(seite.is_visible("text=Prüfe deine E-Mail-Adresse."), "Ungültige Adresse wird erklärt")

            # Offline während des Versands
            seite.fill("#community input[type=email]", ANNA)
            otp_vorher = len([a for a in anfragen if "/auth/v1/otp" in a[1]])
            ctx.set_offline(True)             # die Ansicht wechselt sofort, ohne Klick
            pruefe(ist("Community") and seite.is_visible("text=Du bist offline. Zum Anmelden"),
                   "Verbindung weg: sofort Offline-Hinweis statt Formular")
            pruefe(len([a for a in anfragen if "/auth/v1/otp" in a[1]]) == otp_vorher, "Offline geht keine Anfrage raus")
            bild("04-offline")
            # „Verbindung prüfen“ von Hand, solange noch offline: bleibt beim Hinweis
            seite.click("text=Verbindung prüfen")
            pruefe(seite.is_visible("text=Du bist offline. Zum Anmelden"), "„Verbindung prüfen“ ohne Netz bleibt ehrlich offline")
            ctx.set_offline(False)        # das online-Ereignis prüft von selbst neu
            pruefe(ist("In der Community anmelden"), "Wieder online: zurück bei der Anmeldung")
            pruefe(seite.input_value("#community input[type=email]") == ANNA, "Eingetippte Adresse ist noch da")

            # Versand: zu häufig, dann erfolgreich – und Doppelklick
            seite.route("**/auth/v1/otp**", lambda r: r.fulfill(status=429, content_type="application/json",
                        body=json.dumps({"code": 429, "error_code": "over_email_send_rate_limit",
                                         "msg": "email rate limit exceeded"})))
            seite.click("text=Anmeldelink senden")
            seite.wait_for_selector("text=Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut.")
            pruefe(True, "Zu häufiger Versand wird verständlich gemeldet")
            seite.unroute("**/auth/v1/otp**")
            seite.route("**/auth/v1/otp**", lambda r: r.fulfill(status=200, content_type="application/json", body="{}"))
            otp_vorher = len([a for a in anfragen if "/auth/v1/otp" in a[1]])
            seite.dblclick("text=Anmeldelink senden")
            pruefe(ist("Schau in dein E\u2011Mail\u2011Postfach"), "Nach dem Versand: Postfach-Hinweis", h1())
            pruefe(len([a for a in anfragen if "/auth/v1/otp" in a[1]]) - otp_vorher == 1, "Doppelklick sendet nur einen Link")
            pruefe(ANNA in seite.inner_text("#community"), "Adresse steht im Hinweis")

            # ---------------------------------------------------------- B · Code
            print("Mail-Code (B)")
            bild("05-postfach")
            pflicht_code = seite.evaluate("document.querySelector('#community .cm-feld .cm-pflicht').textContent")
            pruefe(pflicht_code == "Pflicht bei Anmeldung mit Code",
                   "Code-Feld: „Pflicht bei Anmeldung mit Code“ (Entscheidung 12.10.)", pflicht_code)
            ziele_mindestens_44("Postfach")
            feld = "#community input[autocomplete=one-time-code]"
            pruefe(seite.get_attribute(feld, "inputmode") == "numeric", "Codefeld öffnet die Zifferntastatur")
            for falsch in ("12345", "abcdef", "1234567"):
                seite.fill(feld, falsch)
                seite.click("text=Mit Code anmelden")
                pruefe(seite.is_visible("text=Der Anmeldecode besteht aus sechs Ziffern."), f"„{falsch}“ wird abgewiesen")
            seite.route("**/auth/v1/otp**", lambda r: r.fulfill(status=429, content_type="application/json",
                        body=json.dumps({"code": 429, "msg": "rate limit"})))
            seite.click("text=Link erneut senden")
            seite.wait_for_selector("text=Du hast gerade einen Link angefordert. Warte kurz und versuch es erneut.")
            pruefe(True, "Erneut senden respektiert die Wartezeit")
            seite.unroute("**/auth/v1/otp**")
            # echter Server, falscher Code mit führender Null
            seite.fill(feld, "012 345")
            seite.click("text=Mit Code anmelden")
            seite.wait_for_selector("text=Der Code ist abgelaufen oder stimmt nicht. Lass dir einen neuen schicken.")
            koerper = [a[2] for a in anfragen if "/auth/v1/verify" in a[1]][-1] or ""
            pruefe('"token":"012345"' in koerper.replace(" ", ""), "Führende Null bleibt erhalten (echter Server lehnt ab)")
            seite.route("**/auth/v1/verify**", lambda r: r.fulfill(status=429, content_type="application/json",
                        body=json.dumps({"code": 429, "msg": "rate limit"})))
            seite.fill(feld, "123456")
            seite.click("text=Mit Code anmelden")
            seite.wait_for_selector("text=Zu viele Versuche in kurzer Zeit. Warte einen Moment und versuch es erneut.")
            pruefe(True, "Zu viele Code-Versuche werden gemeldet")
            seite.unroute("**/auth/v1/verify**")
            seite.click("text=E-Mail-Adresse ändern")
            pruefe(ist("In der Community anmelden") and seite.input_value("#community input[type=email]") == ANNA,
                   "„Adresse ändern“ führt mit Adresse zurück")

            # Erfolgreicher Code: echte Sitzung für ein Konto ohne Profil
            n1 = neu[0]
            sitzung1 = echte_sitzung(n1, pw)
            seite.fill("#community input[type=email]", n1)
            seite.route("**/auth/v1/otp**", lambda r: r.fulfill(status=200, content_type="application/json", body="{}"))
            seite.click("text=Anmeldelink senden")
            h1()
            seite.route("**/auth/v1/verify**", lambda r: r.fulfill(status=200, content_type="application/json", body=sitzung1))
            seite.fill(feld, "000123")
            seite.click("text=Mit Code anmelden")
            pruefe(ist("Dein Community-Profil"), "Richtiger Code ohne Profil → Profil anlegen", h1())
            seite.unroute("**/auth/v1/verify**")
            seite.unroute("**/auth/v1/otp**")

            # ---------------------------------------------------------- D · Profil
            print("Profil anlegen (D)")
            pruefe(not seite.is_checked("text=Ich bin mindestens 16 Jahre alt."), "Alter nicht vorausgewählt")
            pruefe(not seite.is_checked("text=Ich akzeptiere die Community-Regeln."), "Regeln nicht vorausgewählt")
            pruefe(seite.input_value("#community select") == "", "Lehrjahr steht auf „Keine Angabe“")
            bild("06-profil")
            ziele_mindestens_44("Profil")
            # Tastaturreihenfolge
            seite.focus("#community input.cm-mono")
            folge = []
            for _ in range(8):
                folge.append(seite.evaluate("""() => { const a = document.activeElement;
                  const l = a.labels && a.labels[0];
                  if (!l) return a.textContent.trim();
                  const t = l.querySelector('span:not(.cm-pflicht)');
                  return ((t ? t.firstChild : l.firstChild).textContent).trim(); }"""))
                seite.keyboard.press("Tab")
            erwartet = ["Beta-Zugangscode", "Anzeigename", "Lehrjahr (optional)", "Ich bin mindestens 16 Jahre alt.",
                        "Ich akzeptiere die Community-Regeln.", "Community-Regeln lesen", "Profil anlegen",
                        "Später weiterlernen"]
            pruefe(folge == erwartet, "Tastaturreihenfolge wie in der Spec", folge)

            seite.click("text=Profil anlegen")
            ueb = seite.inner_text(".cm-uebersicht")
            pruefe(all(t in ueb for t in ("Gib deinen Beta-Zugangscode ein.", "2 bis 30 Zeichen",
                                         "ab 16 Jahren", "Community-Regeln")), "Fehlerübersicht nennt alle vier Fehler")
            pruefe(seite.evaluate("document.activeElement.classList.contains('cm-mono')"), "Fokus auf dem ersten Fehler")
            pruefe(seite.get_attribute("#community input.cm-mono", "aria-invalid") == "true", "Fehler am Feld markiert")
            bild("07-profil-fehler")

            # Regeln lesen: Dialog, Escape, Fokus zurück, kein Haken
            seite.click("text=Community-Regeln lesen")
            seite.wait_for_selector("dialog[open]")
            pruefe(seite.locator("dialog[open] .cm-regelliste li").count() == 8, "Regeldialog zeigt acht Regeln")
            bild("08-regeln")
            ziele_mindestens_44("Regeln")
            seite.keyboard.press("Escape")
            seite.wait_for_selector("dialog", state="detached")
            pruefe(seite.evaluate("document.activeElement.textContent.trim()") == "Community-Regeln lesen",
                   "Escape schließt, Fokus zurück am Link")
            pruefe(not seite.is_checked("text=Ich akzeptiere die Community-Regeln."), "Lesen setzt keinen Haken")

            # Falscher Beta-Code (echter Server)
            seite.fill("#community input.cm-mono", "FALSCH-123")
            seite.fill("#community input[maxlength='60']", namen[0])
            seite.select_option("#community select", "2")
            seite.check("text=Ich bin mindestens 16 Jahre alt.")
            seite.check("text=Ich akzeptiere die Community-Regeln.")
            seite.click("text=Profil anlegen")
            seite.wait_for_selector("text=Dieser Beta-Zugangscode ist nicht gültig oder nicht mehr verfügbar.")
            pruefe(seite.input_value("#community input[maxlength='60']") == namen[0]
                   and seite.input_value("#community select") == "2", "Übrige Eingaben bleiben erhalten")
            # Belegter Name (echter Server)
            seite.fill("#community input.cm-mono", beta)
            seite.fill("#community input[maxlength='60']", "anna (demo)")
            seite.click("text=Profil anlegen")
            seite.wait_for_selector("text=Dieser Anzeigename ist schon vergeben. Wähle einen anderen.")
            pruefe(True, "Belegter Anzeigename (andere Schreibweise) wird erkannt")
            # Doppelklick, echte Anlage
            seite.fill("#community input[maxlength='60']", namen[0])
            vorher = len([a for a in anfragen if "rpc/profil_anlegen" in a[1]])
            seite.dblclick("text=Profil anlegen")
            pruefe(gesperrt_da(), "Nach der Anlage: Paketsperre (Klassenkonto)", h1())
            pruefe(len([a for a in anfragen if "rpc/profil_anlegen" in a[1]]) - vorher == 1, "Doppelklick legt nur einmal an")
            pruefe(seite.is_visible("text=Dein Profil ist angelegt."), "Erfolgsmeldung")
            pruefe(beta not in seite.content(), "Beta-Zugangscode steht nirgends mehr auf der Seite")
            bild("09-beitraege")
            ziele_mindestens_44("Beiträge")
            pruefe(profilseite() and namen[0] in seite.inner_text("#community") and "2. Lehrjahr" in seite.inner_text("#community"),
                   "Eigenes Profil unter „Profil“")
            pruefe(seite.is_visible("text=Hier findest du dein Community-Profil und die Regeln.")
                   and not seite.is_visible("text=noch nicht verfügbar")
                   and seite.locator("#community a[href='#community']", has_text="Zu Beiträgen").count() == 0,
                   "Profilseite: freigegebene Einleitung; bei Paketsperre kein Weg in die Beiträge")
            bild("09-profil")
            ziele_mindestens_44("Profil")

            # Wiederkehrend: Neu laden, kein zweites Profil
            seite.reload()
            pruefe(ist("Profil") and not seite.is_visible("text=Beta-Zugangscode"), "Wiederkehrend: kein Beta-Code nötig")
            # Unbekanntes Ziel nach Login
            seite.goto(basis + "app.html#community/gruppe/00000000-0000-0000-0000-000000000000")
            pruefe(ist("Community") and seite.is_visible("text=Dieser Inhalt ist für dich nicht verfügbar."), "Unbekanntes Ziel: neutraler Hinweis, keine Daten")
            seite.goto(basis + "app.html#community")
            h1()
            # Profil lässt sich nicht lesen – ist nicht „kein Profil“
            seite.route("**/rest/v1/profil?**", lambda r: r.abort())
            seite.goto(basis + "app.html#heute")
            seite.goto(basis + "app.html#community")
            seite.wait_for_selector("text=Dein Profil konnte nicht geladen werden. Versuch es erneut.", timeout=60000)
            pruefe(not seite.is_visible("text=Beta-Zugangscode"), "Profil-Lesefehler führt nicht zur Profilanlage")
            seite.unroute("**/rest/v1/profil?**")
            seite.click("text=Erneut versuchen")
            pruefe(gesperrt_da(), "„Erneut versuchen“ lädt das Profil")

            # Abmelden
            abmelden_ui()
            pruefe(ist("In der Community anmelden"), "Abmelden führt zur Anmeldung")
            pruefe(namen[0] not in seite.inner_text("body"), "Nach dem Abmelden kein Profilname mehr sichtbar")
            pruefe(not sitzung_schluessel(), "Sitzung aus dem Speicher entfernt", sitzung_schluessel())
            pruefe(konto() == konto_vorher, "Lernstand unverändert (Konto identisch)")

            # ---------------------------------------------------------- Zwei Tabs
            print("Zwei Tabs, unklarer Ausgang")
            mit_passwort(neu[1])
            zweite = ctx.new_page()
            zweite.goto(basis + "app.html#community")
            seite.goto(basis + "app.html#community")
            for s_, name in ((seite, namen[1]), (zweite, namen[1] + " b")):
                s_.wait_for_selector("text=Dein Community-Profil")
                s_.fill("#community input.cm-mono", beta)
                s_.fill("#community input[maxlength='60']", name)
                s_.check("text=Ich bin mindestens 16 Jahre alt.")
                s_.check("text=Ich akzeptiere die Community-Regeln.")
            seite.click("text=Profil anlegen")
            seite.wait_for_selector("text=Dein Profil ist angelegt.")
            zweite.click("text=Profil anlegen")
            zweite.wait_for_selector("text=Dein Profil ist angelegt.")
            zp = zweite.evaluate("AP.community.profil(true).then(p => p && p.anzeigename)")
            pruefe(zp == namen[1], "Zweiter Tab übernimmt das Profil aus dem ersten, keine zweite Anlage", zp)
            zweite.close()
            abmelden_ui()
            h1()

            # Antwort geht verloren, Profil entsteht trotzdem – Nachsehen findet es
            def antwort_weg(route):
                route.fetch()          # die Anfrage erreicht Supabase …
                route.abort()          # … die Antwort kommt nie an
            mit_passwort(neu[2])
            seite.goto(basis + "app.html#heute")
            seite.goto(basis + "app.html#community")
            seite.wait_for_selector("text=Dein Community-Profil")
            seite.fill("#community input.cm-mono", beta)
            seite.fill("#community input[maxlength='60']", namen[2])
            seite.check("text=Ich bin mindestens 16 Jahre alt.")
            seite.check("text=Ich akzeptiere die Community-Regeln.")
            seite.route("**/rest/v1/rpc/profil_anlegen**", antwort_weg)
            seite.click("text=Profil anlegen")
            seite.wait_for_selector("text=Dein Profil ist angelegt.")
            pruefe(True, "Verlorene Antwort: Profil wird gefunden statt doppelt angelegt")
            seite.unroute("**/rest/v1/rpc/profil_anlegen**")
            abmelden_ui()
            h1()

            # Antwort weg UND Nachsehen scheitert: ehrlich „unklar“
            mit_passwort(neu[3])
            seite.goto(basis + "app.html#heute")
            seite.goto(basis + "app.html#community")
            seite.wait_for_selector("text=Dein Community-Profil")
            seite.fill("#community input.cm-mono", beta)
            seite.fill("#community input[maxlength='60']", namen[3])
            seite.check("text=Ich bin mindestens 16 Jahre alt.")
            seite.check("text=Ich akzeptiere die Community-Regeln.")
            seite.route("**/rest/v1/rpc/profil_anlegen**", antwort_weg)
            seite.route("**/rest/v1/profil?**", lambda r: r.abort())
            seite.click("text=Profil anlegen")
            # supabase-js wiederholt fehlgeschlagene Abrufe selbst – das dauert gut 10 s.
            seite.wait_for_selector("text=Wir konnten nicht prüfen, ob dein Profil angelegt wurde. Prüfe den Status erneut.",
                                    timeout=60000)
            pruefe(True, "Unklarer Ausgang wird weder Erfolg noch Fehlschlag genannt")
            bild("10-unklar")
            seite.unroute("**/rest/v1/rpc/profil_anlegen**")
            seite.unroute("**/rest/v1/profil?**")
            seite.click("text=Profilstatus prüfen")
            pruefe(gesperrt_da() and profilseite() and namen[3] in seite.inner_text("#community"), "„Profilstatus prüfen“ findet das Profil")
            seite.click("#community >> text=Abmelden")
            h1()

            # ---------------------------------------------------------- Review 12.10.
            print("Kontowechsel, späte Antworten, Unterbrechungen (Review 12.10.)")

            def d_ausfuellen(s_, name, code=None):
                s_.wait_for_selector("text=Dein Community-Profil")
                s_.fill("#community input.cm-mono", code or beta)
                s_.fill("#community input[maxlength='60']", name)
                s_.check("text=Ich bin mindestens 16 Jahre alt.")
                s_.check("text=Ich akzeptiere die Community-Regeln.")

            def d_leer(s_):
                return (s_.input_value("#community input.cm-mono") == ""
                        and s_.input_value("#community input[maxlength='60']") == ""
                        and not s_.is_checked("text=Ich bin mindestens 16 Jahre alt.")
                        and not s_.is_checked("text=Ich akzeptiere die Community-Regeln."))

            def titel_in(s_, erwartet, warte=20000):
                try:
                    s_.wait_for_function("(t) => { const h = document.querySelector('#community h1');"
                                         " return h && h.textContent.trim() === t; }", arg=erwartet, timeout=warte)
                    return True
                except Exception:
                    return False

            # Pflichtangaben als Text und für Bildschirmleser
            mit_passwort(neu[4])
            seite.goto(basis + "app.html#heute")
            seite.goto(basis + "app.html#community")
            seite.wait_for_selector("text=Dein Community-Profil")
            pflicht = seite.evaluate("""() => [...document.querySelectorAll('#community .cm-feld')].map(b => {
                const e = b.querySelector('input, select');
                return [b.textContent.includes('Pflicht'), e.getAttribute('aria-required') === 'true'];
              })""")
            pruefe(pflicht == [[True, True], [True, True], [False, False], [True, True], [True, True]],
                   "Pflichtfelder textlich und per aria-required markiert, Lehrjahr nicht", pflicht)

            # Fehler verschwinden nach der Korrektur
            seite.click("text=Profil anlegen")
            pruefe(seite.locator(".cm-uebersicht li").count() == 4, "Vier Fehler nach leerem Absenden")
            seite.fill("#community input.cm-mono", "IRGENDWAS")
            pruefe(seite.locator(".cm-uebersicht li").count() == 3
                   and not seite.is_visible("text=Gib deinen Beta-Zugangscode ein."), "Code eingetragen: Fehler weg, Übersicht aktualisiert")
            seite.check("text=Ich bin mindestens 16 Jahre alt.")
            seite.check("text=Ich akzeptiere die Community-Regeln.")
            pruefe(seite.locator(".cm-uebersicht").count() == 0
                   and seite.is_visible("text=Dein Anzeigename muss 2 bis 30 Zeichen lang sein."),
                   "Nur noch ein Fehler: Feldfehler bleibt, Übersicht verschwindet")
            # Zeichen zählen wie die Datenbank: 30 Codepunkte, 60 UTF-16-Einheiten
            seite.fill("#community input[maxlength='60']", "𝔄" * 30)
            pruefe(not seite.is_visible("text=Dein Anzeigename muss 2 bis 30 Zeichen lang sein."),
                   "30 Zeichen außerhalb der Grundebene gelten als 30, nicht 60")
            # 31 Codepunkte in 60 UTF-16-Einheiten (mehr lässt maxlength nicht zu)
            seite.fill("#community input[maxlength='60']", "𝔄" * 29 + "ab")
            pruefe(seite.is_visible("text=Dein Anzeigename muss 2 bis 30 Zeichen lang sein."), "31 Zeichen sind zu viel")
            seite.fill("#community input.cm-mono", "")
            pruefe(seite.is_visible("text=Gib deinen Beta-Zugangscode ein."), "Geleertes Feld zeigt den Fehler wieder")

            # Regeldialog hält den Fokus
            seite.click("text=Community-Regeln lesen")
            seite.wait_for_selector("dialog[open]")
            for _ in range(6):
                seite.keyboard.press("Tab")
            pruefe(seite.evaluate("!!document.activeElement.closest('dialog')"), "Tab bleibt im Regeldialog")
            seite.keyboard.press("Escape")
            seite.wait_for_selector("dialog", state="detached")

            # Abmelden in einem anderen Tab: Entwurf verschwindet
            d_ausfuellen(seite, "Entwurf X")
            zweite = ctx.new_page()
            zweite.goto(basis + "app.html#heute")
            zweite.wait_for_function("window.AP && AP.community")
            zweite.evaluate("AP.community.abmelden()")
            pruefe(titel_in(seite, "In der Community anmelden"), "Abmelden im anderen Tab: dieser Tab zeigt die Anmeldung")
            pruefe("Entwurf X" not in seite.content(), "Entwurf des alten Kontos ist aus der Seite verschwunden")
            mit_passwort(neu[5])
            pruefe(titel_in(seite, "Dein Community-Profil") and d_leer(seite), "Anderes Konto bekommt ein leeres Formular")

            # Kontowechsel ohne Abmelden (anderer Tab meldet ein anderes Konto an)
            d_ausfuellen(seite, "Entwurf Y")
            zweite.evaluate("""async ([m, p]) => { const c = await AP.community.verbinden();
                const r = await c.auth.signInWithPassword({ email: m, password: p });
                if (r.error) throw new Error(r.error.message); }""", [neu[6], pw])
            seite.wait_for_timeout(1500)
            pruefe(titel_in(seite, "Dein Community-Profil") and d_leer(seite) and "Entwurf Y" not in seite.content(),
                   "Kontowechsel im anderen Tab: Entwurf wird verworfen")
            zweite.close()

            # Späte Antwort nach Abmelden darf nichts mehr anzeigen
            gehalten = []
            seite.route("**/rest/v1/rpc/profil_anlegen**", lambda r: gehalten.append(r))
            d_ausfuellen(seite, namen[6])
            seite.click("text=Profil anlegen")
            seite.wait_for_function("() => true")
            for _ in range(40):
                if gehalten: break
                seite.wait_for_timeout(100)
            dritte = ctx.new_page()
            dritte.goto(basis + "app.html#heute")
            dritte.wait_for_function("window.AP && AP.community")
            dritte.evaluate("AP.community.abmelden()")
            dritte.close()
            pruefe(titel_in(seite, "In der Community anmelden"), "Abmelden während der Anfrage: Anmeldung erscheint sofort")
            if gehalten:
                gehalten[0].continue_()
            seite.wait_for_timeout(2500)
            pruefe(ist("In der Community anmelden") and not seite.is_visible("text=Dein Profil ist angelegt."),
                   "Späte Erfolgsantwort des alten Kontos wird verworfen")
            seite.unroute("**/rest/v1/rpc/profil_anlegen**")

            # Offline während des Versands
            seite.route("**/auth/v1/otp**", lambda r: gehalten.append(r))
            gehalten.clear()
            seite.fill("#community input[type=email]", "jemand@azubipass.invalid")
            seite.click("text=Anmeldelink senden")
            for _ in range(40):
                if gehalten: break
                seite.wait_for_timeout(100)
            ctx.set_offline(True)
            try:
                seite.wait_for_selector("text=Du bist offline. Zum Anmelden", timeout=3000)
            except Exception:
                pass
            pruefe(seite.is_visible("text=Du bist offline. Zum Anmelden"), "Verbindung bricht beim Versand ab: sofort offline")
            if gehalten:
                gehalten[0].fulfill(status=200, content_type="application/json", body="{}")
            seite.wait_for_timeout(800)
            pruefe(not seite.is_visible("text=Schau in dein"), "Kein falscher Erfolg nach der Unterbrechung")
            ctx.set_offline(False)
            pruefe(titel_in(seite, "In der Community anmelden"), "Wieder online: kein automatisches Nachsenden")
            seite.unroute("**/auth/v1/otp**")

            # Offline während der Profilanlage – die Anlage kam aber an
            mit_passwort(neu[7])
            pruefe(titel_in(seite, "Dein Community-Profil"), "Neues Konto ohne Profil: Profilanlage")
            gehalten.clear()
            seite.route("**/rest/v1/rpc/profil_anlegen**", lambda r: gehalten.append(r))
            d_ausfuellen(seite, namen[7])
            seite.click("text=Profil anlegen")
            for _ in range(40):
                if gehalten: break
                seite.wait_for_timeout(100)
            ctx.set_offline(True)
            try:
                seite.wait_for_selector("text=Du bist offline. Zum Anmelden", timeout=3000)
            except Exception:
                pass
            pruefe(seite.is_visible("text=Du bist offline. Zum Anmelden"), "Verbindung bricht bei der Anlage ab: sofort offline")
            if gehalten:
                gehalten[0].fetch()           # die Anlage erreicht den Server …
                gehalten[0].abort()           # … die Antwort geht unterwegs verloren
            seite.unroute("**/rest/v1/rpc/profil_anlegen**")
            ctx.set_offline(False)            # das online-Ereignis prüft neu
            pruefe(gesperrt_da() and profilseite() and namen[7] in seite.inner_text("#community"),
                   "Nach der Unterbrechung: Profil gefunden, keine zweite Anlage")
            n_profile = seite.evaluate("""async () => { const c = await AP.community.verbinden();
                const r = await c.from('profil').select('id').eq('anzeigename', %s); return (r.data || []).length; }""" % json.dumps(namen[7]))
            pruefe(n_profile == 1, "Profil genau einmal vorhanden", n_profile)

            # Leeres Ergebnis ist kein Erfolg
            seite.click("#community >> text=Abmelden")
            h1()
            mit_passwort(neu[8])
            titel_in(seite, "Dein Community-Profil")
            seite.route("**/rest/v1/rpc/profil_anlegen**", lambda r: r.fulfill(status=200, content_type="application/json", body="null"))
            leer_profil = {"n": 0}
            def leeres_profil(r):
                leer_profil["n"] += 1
                r.fulfill(status=200, content_type="application/json", body="[]",
                          headers={"content-range": "*/0"})
            seite.route("**/rest/v1/profil?**", leeres_profil)
            d_ausfuellen(seite, "Nie Angelegt")
            seite.click("text=Profil anlegen")
            seite.wait_for_selector("text=Dein Profil konnte nicht angelegt werden. Versuch es erneut.", timeout=20000)
            pruefe(not seite.is_visible("text=Dein Profil ist angelegt."), "Ohne geladenes Profil kein Erfolg")
            seite.unroute("**/rest/v1/rpc/profil_anlegen**")
            seite.unroute("**/rest/v1/profil?**")

            # Direktlink bei Sitzung ohne Profil: Profilanlage, keine Inhaltsabrufe
            vorher_rest = len(rest_anfragen())
            seite.goto(basis + "app.html#community/gruppe/00000000-0000-0000-0000-000000000000")
            pruefe(titel_in(seite, "Dein Community-Profil"), "Direktlink ohne Profil führt zur Profilanlage")
            seite.reload()
            pruefe(titel_in(seite, "Dein Community-Profil"), "Auch nach Neuladen")
            fremd = [a[1] for a in rest_anfragen()[vorher_rest:]
                     if any(t in a[1] for t in ("/beitrag", "/gruppe", "/mitglied", "/antwort", "/wochenaufgabe", "/aufgabe"))]
            pruefe(not fremd, "Keine Abrufe von Beiträgen, Gruppen oder Aufgaben", fremd[:3])

            # Profil wird geladen … (unterscheidbar von der Sitzungsprüfung)
            gehalten.clear()
            seite.route("**/rest/v1/profil?**", lambda r: gehalten.append(r))
            seite.goto(basis + "app.html#heute")
            seite.goto(basis + "app.html#community")
            for _ in range(50):
                if gehalten: break
                seite.wait_for_timeout(100)
            pruefe(seite.inner_text("#community h1").strip() == "Profil wird geladen …", "Ladezustand „Profil wird geladen …“",
                   seite.inner_text("#community h1").strip())
            for g in gehalten:
                g.continue_()
            seite.unroute("**/rest/v1/profil?**")
            pruefe(titel_in(seite, "Dein Community-Profil"), "Danach die passende Ansicht")
            pruefe(seite.evaluate("document.activeElement.tagName") == "H1", "Fokus auf der neuen Überschrift")

            # 320 px auch im Profilformular
            seite.set_viewport_size({"width": 320, "height": 640})
            ueber = seite.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            pruefe(ueber <= 0, "Profilformular bei 320 px ohne seitliches Scrollen", ueber)
            seite.set_viewport_size({"width": 390, "height": 844})

            # Abmelden ohne Antwort vom Server
            seite.route("**/auth/v1/logout**", lambda r: r.abort())
            seite.click("#community >> text=Abmelden")
            pruefe(titel_in(seite, "In der Community anmelden") and not sitzung_schluessel(),
                   "Abmelden ohne Serverantwort meldet trotzdem lokal ab")
            seite.unroute("**/auth/v1/logout**")

            # ---------------------------------------------------------- Mail-Link
            print("Mail-Link")
            seite.goto(basis + "app.html?anmeldung=1&error=access_denied&error_code=otp_expired"
                       "&error_description=Email+link+is+invalid+or+has+expired#community")
            seite.wait_for_selector("text=Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken.")
            pruefe("error" not in seite.url and "#community" in seite.url, "Abgelaufener Link: Hinweis, Adresse aufgeräumt", seite.url)
            seite.goto(basis + "app.html?anmeldung=1&code=00000000-0000-0000-0000-000000000000#community")
            seite.wait_for_selector("text=Dieser Anmeldelink ist nicht mehr gültig. Lass dir einen neuen Link schicken.")
            pruefe("code=" not in seite.url, "Link aus anderem Browser oder schon benutzt: klarer Rückweg", seite.url)
            pruefe(ist("In der Community anmelden"), "Keine Endlosschleife, Anmeldung steht bereit")

            # ---------------------------------------------------------- Heute offline
            print("Offline und schmales Display")
            seite.goto(basis + "app.html#heute")
            seite.wait_for_selector(".hm-gemeinsam")
            ctx.set_offline(True)
            seite.wait_for_function("document.querySelector('.hm-gemeinsam').textContent.includes('Community braucht Internet')")
            pruefe(True, "Heute sagt offline, dass die Community Internet braucht")
            pruefe(seite.is_visible(".hm-kapitel"), "Lernen bleibt auf Heute erreichbar")
            ctx.set_offline(False)
            seite.set_viewport_size({"width": 320, "height": 640})
            seite.goto(basis + "app.html#community")
            h1()
            ueber = seite.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            pruefe(ueber <= 0, "Bei 320 px kein seitliches Scrollen", ueber)
            pruefe(konto() == konto_vorher, "Lernstand am Ende unverändert")

            browser.close()

    print()
    print("Alles in Ordnung." if not fehler else f"{len(fehler)} Fehler: " + "; ".join(fehler))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
