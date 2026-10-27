#!/usr/bin/env python3
"""
AzubiPass · Was alle Bauwerkzeuge wissen müssen.

Hier steht nur, was sonst in build.py, build_landing.py, build_app.py und
pruefe.py mehrfach identisch stünde. Der Grund ist nicht Sparsamkeit, sondern
Sicherheit: Läuft der Ausgabepfad oder der Seitenkopf an einer der Stellen
auseinander, schreibt ein Skript still etwas anderes — ohne Fehlermeldung. So
etwas findet man erst, wenn eine Seite alt aussieht und niemand weiß, warum.
"""

import hashlib
import html
import json
import shutil
from pathlib import Path

HIER = Path(__file__).parent

# Gebaute Seiten landen in ../docs. Der Name ist nicht frei gewählt: GitHub
# Pages liefert entweder die Wurzel eines Branches aus oder genau den Ordner
# /docs. Mit diesem Namen fällt der Umweg über einen zweiten Branch oder eine
# Bau-Automatik weg — hochladen genügt.
def _ausgabe():
    docs, alt = HIER.parent / "docs", HIER.parent / "seite"
    if docs.is_dir():
        return docs
    if alt.is_dir():                 # älterer Stand: nicht plötzlich zwei Ausgaben
        return alt
    docs.mkdir(parents=True, exist_ok=True)
    return docs


AUSGABE = _ausgabe()

# Alles, was mehrere Seiten gemeinsam benutzen: Stil, Verhalten, Schriften,
# Suchindex, Karten. Getrennt ausgeliefert statt in jede Seite kopiert — sonst
# stünden dieselben anderthalb Megabyte vierzehnmal auf der Platte und der
# Browser lädt sie vierzehnmal statt einmal.
MITTEL = AUSGABE / "mittel"

MARKE = "AzubiPass"
FARBE_HELL = "#F5F5F0"

GOOGLE_LINK = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">'''


def veroeffentliche(*namen):
    """Kopiert Quelldateien unverändert nach mittel/ und gibt ihre Adressen zurück.

    Kopieren statt Einbetten: Dieselbe CSS in vierzehn Seiten hineinzuschreiben
    kostet den Browser vierzehn Downloads für eine Datei, die sich nie
    unterscheidet."""
    MITTEL.mkdir(parents=True, exist_ok=True)
    # Die freigegebenen Originale bleiben an genau einer Stelle im Repository.
    for name in ("azubipass-logo.png", "azubipass-symbol.png"):
        shutil.copyfile(HIER.parent / "doku" / "marke" / name, MITTEL / name)
    for name in namen:
        shutil.copyfile(HIER / name, MITTEL / name)
    return [f"mittel/{name}" for name in namen]


def markenbild():
    return ('<img class="markenlogo" src="mittel/azubipass-logo.png" '
            'width="2172" height="724" alt="AzubiPass">')


def symbolkopf():
    return '''<link rel="icon" href="mittel/symbol-v1-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="mittel/symbol-v1-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="mittel/symbol-v1-180.png">'''


def schriftkopf():
    """Gibt die Kopfzeilen für die Schriften zurück.

    Sobald schriften.py einmal gelaufen ist, liegen die Schnitte in mittel/ und
    die Seite fragt niemanden mehr. Solange die Datei fehlt, bleibt der
    Google-Weg: Die Seite soll nicht in Georgia dastehen, nur weil ein Schritt
    vergessen wurde — build.py meldet es dann aber deutlich."""
    if (MITTEL / "schriften.css").exists():
        return '<link rel="stylesheet" href="mittel/schriften.css">'
    return GOOGLE_LINK


def schriften_lokal():
    return (MITTEL / "schriften.css").exists()


def kopf(titel, beschreibung, stile=(), skripte=()):
    """Der komplette <head> einer Seite — überall derselbe.

    viewport-fit=cover zusammen mit den env(safe-area-*)-Regeln in der CSS ist
    das, was die App auf Geräten mit Aussparung nicht unter die Uhr rutschen
    lässt. Die App verwendet unabhängig vom Gerät die helle Darstellung."""
    verweise = "\n".join(f'<link rel="stylesheet" href="{s}">' for s in stile)
    programme = "\n".join(f'<script src="{s}" defer></script>' for s in skripte)
    return f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(titel)} · {MARKE}</title>
<meta name="description" content="{html.escape(beschreibung)}">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="{FARBE_HELL}">
<link rel="manifest" href="manifest.webmanifest">
{symbolkopf()}
<meta name="apple-mobile-web-app-title" content="{MARKE}">
{schriftkopf()}
{verweise}
{programme}'''


# Strichzeichnungen für die Tab-Leiste. Gleiche Bauart wie die Marken im Text:
# 1,5 px Strich, keine Flächen — damit sie neben der Schrift nicht laut werden.
TABS = [
    ("heute", "Heute", "M4 10.5 12 4l8 6.5V20H4z"),
    ("lernen", "Lernen", "M4 5h5.5A2.5 2.5 0 0 1 12 7.5V20a2.2 2.2 0 0 0-2.2-2H4zm16 0h-5.5A2.5 2.5 0 0 0 12 7.5V20a2.2 2.2 0 0 1 2.2-2H20z"),
    ("ueben", "Üben", "M9 8h11v11H9zM5.5 5H16M4 8.5v8"),
    ("ich", "Ich", "M12 12.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4zM4.5 20.5a7.5 7.5 0 0 1 15 0"),
]

LUPE = ('<svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">'
        '<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.6"/>'
        '<path d="M16.3 16.3 21 21" stroke="currentColor" stroke-width="1.6" '
        'stroke-linecap="round"/></svg>')


def tableiste(aktiv=""):
    """Die vier Hauptbereiche, unten, auf jeder Seite gleich.

    Die Adressen zeigen immer auf app.html — steht man schon dort, behandelt der
    Browser das als reinen Sprung innerhalb der Seite und lädt nichts neu. So
    braucht es nur eine Leiste statt einer für die App und einer für die
    Lernzettel."""
    knoepfe = []
    for schluessel, name, pfad in TABS:
        an = " an" if schluessel == aktiv else ""
        jetzt = ' aria-current="page"' if an else ""
        knoepfe.append(
            f'<a class="tab{an}" href="app.html#{schluessel}"{jetzt}>'
            f'<svg viewBox="0 0 24 24" width="23" height="23" fill="none" aria-hidden="true">'
            f'<path d="{pfad}" stroke="currentColor" stroke-width="1.5" '
            f'stroke-linecap="round" stroke-linejoin="round"/></svg>'
            f'<span>{name}</span></a>')
    return ('<nav class="tableiste" aria-label="Hauptbereiche">'
            + "".join(knoepfe) + '</nav>')


# ---------------------------------------------------------------- Ausbildungsgänge

_REGISTRY = None


def registry():
    """Die Berufsregistry aus ausbildungsgaenge.json (einmal gelesen).

    Reihenfolge, Lehrjahr, Lernfeldnummer und Kurzformen kommen von hier – nicht
    aus den Ziffern im Dateinamen. Aus „ik2024-lf01“ ließe sich sonst die
    Nummer 202401 lesen (doku/industriekaufleute/03-umsetzung-und-abnahme.md §2)."""
    global _REGISTRY
    if _REGISTRY is None:
        datei = HIER / "ausbildungsgaenge.json"
        if datei.exists():
            _REGISTRY = json.loads(datei.read_text(encoding="utf-8"))
        else:
            _REGISTRY = {"standard": "kfb", "berufe": []}
    return _REGISTRY


def berufe():
    return registry().get("berufe", [])


def lernfeld_eintrag(lf_id):
    """(beruf, eintrag) für eine Lernfeld-ID – oder (None, None), wenn die
    Registry das Lernfeld nicht kennt."""
    for b in berufe():
        for e in b.get("lernfelder", []):
            if e["id"] == lf_id:
                return b, e
    return None, None


def beruf_von(lf_id):
    """Kurzkennung des Berufs („kfb“ oder „ik“). Unbekannte Lernfelder gehören
    zum Standardberuf – so bleibt der Bestand ohne Registry-Eintrag sichtbar."""
    b, _ = lernfeld_eintrag(lf_id)
    return b["kurz"] if b else registry().get("standard", "kfb")


def _gemeinsam_fuer(lf_id, basis):
    """Der gemeinsame Speicher des Berufs.

    Büromanagement liest wie bisher gemeinsam.json. Andere Berufe lesen ihre
    eigene Datei und übernehmen aus gemeinsam.json nur, was dort ausdrücklich
    unter „uebernehmen“ steht – Rechtsgrundlagen sollen nicht stillschweigend
    von einem Beruf auf den anderen vererbt werden."""
    b, _ = lernfeld_eintrag(lf_id)
    name = (b or {}).get("gemeinsam", "gemeinsam.json")
    datei = basis / name
    gem = json.loads(datei.read_text(encoding="utf-8")) if datei.exists() else {}
    if name == "gemeinsam.json":
        return gem
    alt_datei = basis / "gemeinsam.json"
    alt = json.loads(alt_datei.read_text(encoding="utf-8")) if alt_datei.exists() else {}
    raus = {"begriffe": {}, "paragraphen": {}}
    for feld in ("begriffe", "paragraphen"):
        for kennung in (gem.get("uebernehmen") or {}).get(feld, []):
            if kennung not in alt.get(feld, {}):
                raise KeyError(f"{name}: übernommener Eintrag {feld}:{kennung} "
                               f"steht nicht in gemeinsam.json")
            raus[feld][kennung] = alt[feld][kennung]
        raus[feld].update(gem.get(feld, {}))
    return raus


def lade(lernfeld_datei):
    """Liest eine Lernfeld-Datei samt ihrer Kapitel und dem gemeinsamen Speicher.

    Steht hier und nicht in build.py, weil build_app.py dieselben Daten braucht.
    Zweimal geladen hieße: zwei Stellen, an denen der gemeinsame Speicher anders
    zusammengesetzt werden könnte."""
    pfad = Path(lernfeld_datei)
    lf = json.loads(pfad.read_text(encoding="utf-8"))
    basis = pfad.parent

    # Gemeinsamer Speicher zuerst, lernfeldeigene Einträge überschreiben ihn
    gem = _gemeinsam_fuer(lf["id"], basis)
    for feld in ("begriffe", "paragraphen"):
        zusammen = dict(gem.get(feld, {}))
        zusammen.update(lf.get(feld, {}))
        lf[feld] = zusammen
    lf["beruf"] = beruf_von(lf["id"])

    kapitel_daten, fehlend = [], []
    for eintrag in lf["kapitel"]:
        kap = basis / eintrag["datei"]
        if not kap.exists():
            fehlend.append(eintrag["datei"])
            continue
        kapitel_daten.append(json.loads(kap.read_text(encoding="utf-8")))
    return lf, kapitel_daten, fehlend


def lernfeld_dateien():
    """Alle Lernfeld-Dateien im Quellenordner, in stabiler Reihenfolge.

    Bekannte Lernfelder in der Reihenfolge der Registry (Beruf für Beruf),
    unbekannte dahinter wie früher nach der Ziffernfolge im Namen. Die Datei
    heißt dabei nicht zwingend wie die ID: buchfuehrung.lernfeld.json trägt
    die ID „buchfuehrung“, steht aber an der Stelle von LF 6."""
    rang = {}
    for i, b in enumerate(berufe()):
        for j, e in enumerate(b.get("lernfelder", [])):
            rang[e["id"]] = (i, j)

    def schluessel(p):
        kennung = p.name[:-len(".lernfeld.json")]
        if kennung in rang:
            return (0,) + rang[kennung] + (p.name,)
        ziffern = "".join(c for c in kennung if c.isdigit())
        return (1, 0 if ziffern else 1, int(ziffern) if ziffern else 0, p.name)
    return sorted(HIER.glob("*.lernfeld.json"), key=schluessel)


def rechtliches():
    """Die Angaben aus rechtliches.json — oder ein leeres Gerüst mit Platzhaltern."""
    datei = HIER / "rechtliches.json"
    if datei.exists():
        return json.loads(datei.read_text(encoding="utf-8"))
    return {}


def nur_privat():
    """Persönliches, nichtkommerzielles Projekt ohne vollständige
    Anbieterkennzeichnung."""
    return bool(rechtliches().get("nur_privat"))


def fussleiste():
    """Impressum und Datenschutz sind in Deutschland Pflicht, sobald die Seite
    geschäftsmäßig betrieben wird — und dann von jeder Unterseite aus mit zwei
    Klicks erreichbar. Deshalb hängen sie an jeder Seite, nicht nur an der
    Startseite.

    Im persönlichen, nichtkommerziellen Modus heißt die Seite ehrlich
    „Hinweise" statt „Impressum": Ein Link namens Impressum, hinter dem keins
    steht, ist schlechter als keiner."""
    erste = "Hinweise" if nur_privat() else "Impressum"
    return ('<footer class="fussleiste">'
            f'<a href="impressum.html">{erste}</a>'
            '<a href="datenschutz.html">Datenschutz</a>'
            f'<span class="markenfuss">{markenbild()}</span>'
            '</footer>')


# ---------------------------------------------------------------- Zwischenspeicher

SW_VORLAGE = '''/* AzubiPass · Zwischenspeicher
   Erzeugt von quellen/gemeinsames.py — nicht von Hand bearbeiten.

   Eine Fassung = ein Speicher mit genau den Dateien dieses Baus. Jede Datei
   hat einen Prüfwert (SHA-256). Installiert wird nur, wenn ALLE Dateien
   ankommen und ALLE Prüfwerte stimmen – sonst bleibt die bisherige Fassung
   unverändert in Betrieb, und beim nächsten Besuch wird es neu versucht.
   Später wird nichts aus dem Netz in den Speicher einer Fassung nachgefüllt:
   So kann es kein Gemisch aus zwei Fassungen geben (Gesamtaudit A04).

   Bewusst ohne skipWaiting: Eine neue Fassung übernimmt nicht mitten im Lesen,
   sondern meldet sich in der App und wartet, bis jemand sie anfordert. */

var SPEICHER = "azubipass-%VERSION%";
var VORRAT = %DATEIEN%;

function hex(puffer) {
  return Array.prototype.map.call(new Uint8Array(puffer), function (b) {
    return ("0" + b.toString(16)).slice(-2);
  }).join("");
}

function holen(pfad, pruefwert) {
  return fetch(new Request(pfad, { cache: "reload" })).then(function (antwort) {
    if (!antwort.ok) throw new Error(pfad + ": " + antwort.status);
    return antwort.arrayBuffer().then(function (puffer) {
      return crypto.subtle.digest("SHA-256", puffer).then(function (wert) {
        if (hex(wert) !== pruefwert) throw new Error(pfad + ": andere Fassung");
        return [pfad, new Response(puffer, { status: 200, headers: antwort.headers })];
      });
    });
  });
}

self.addEventListener("install", function (e) {
  var namen = Object.keys(VORRAT);
  e.waitUntil(
    Promise.all(namen.map(function (n) { return holen(n, VORRAT[n]); }))
      .then(function (alle) {
        return caches.open(SPEICHER).then(function (c) {
          return Promise.all(alle.map(function (x) { return c.put(x[0], x[1]); }));
        });
      })
      .catch(function (fehler) {
        // Halbe Fassung wegwerfen; die Installation scheitert sichtbar.
        return caches.delete(SPEICHER).then(function () { throw fehler; });
      })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (namen) {
    return Promise.all(namen.map(function (n) {
      return n !== SPEICHER && n.indexOf("azubipass-") === 0 ? caches.delete(n) : null;
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) {
  if (e.data === "uebernehmen") self.skipWaiting();
});

/* Weg einer Anfrage relativ zum Geltungsbereich, so wie er im VORRAT steht
   ("./" für die Startseite). null = gehört nicht zu dieser App. */
function vorratsName(url) {
  var basis = new URL(self.registration.scope).pathname;
  if (url.pathname.indexOf(basis) !== 0) return null;
  var rest = decodeURIComponent(url.pathname.slice(basis.length));
  return rest === "" ? "./" : rest;
}

/* Gesamtaudit G01: Eine Datei, die zu dieser Fassung gehört, aber im Speicher
   fehlt (entfernt, Speicher geleert), kommt nur aus dem Netz, wenn ihr
   Prüfwert genau passt – dann wird sie auch wieder abgelegt. Sonst gibt es
   einen klaren Hinweis statt einer Datei aus einer anderen Fassung. */
function fehltImSpeicher(c, anfrage, name) {
  return holen(name, VORRAT[name]).then(function (x) {
    return c.put(x[0], x[1].clone()).then(function () { return x[1]; }, function () { return x[1]; });
  }).catch(function () {
    if (anfrage.mode === "navigate") {
      return new Response(
        '<!doctype html><html lang="de"><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>AzubiPass</title><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 20px;line-height:1.5">' +
        '<h1 style="font-size:1.4rem">Diese Seite fehlt im Offline-Speicher</h1>' +
        '<p>Die gespeicherte Fassung der App ist unvollständig. Öffne die App mit Internetverbindung neu, dann wird sie wieder vollständig geladen.</p>' +
        '<p><a href="./">Zur Startseite</a></p></body></html>',
        { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response("", { status: 503, statusText: "Nicht in dieser Fassung verfuegbar" });
  });
}

self.addEventListener("fetch", function (e) {
  var anfrage = e.request;
  if (anfrage.method !== "GET") return;
  var url = new URL(anfrage.url);
  if (url.origin !== self.location.origin) return;
  var name = vorratsName(url);

  e.respondWith(caches.open(SPEICHER).then(function (c) {
    // Nur aus der eigenen Fassung – nie aus einem anderen Speicher.
    return c.match(anfrage, { ignoreSearch: true }).then(function (treffer) {
      if (treffer) return treffer;
      // Gehört zur Fassung, fehlt aber: nur mit passendem Prüfwert.
      if (name !== null && Object.prototype.hasOwnProperty.call(VORRAT, name)) {
        return fehltImSpeicher(c, anfrage, name);
      }
      // Nicht im Vorrat: durchreichen, aber nicht in diese Fassung legen.
      return fetch(anfrage).catch(function () {
        return anfrage.mode === "navigate" ? c.match("app.html") : Response.error();
      });
    });
  }));
});
'''


def zwischenspeicher_schreiben():
    """Schreibt docs/sw.js mit allen Dateien, die die App offline braucht,
    jeweils mit SHA-256-Prüfwert. Läuft am Ende jedes Bauschritts, damit die
    Prüfwerte zum tatsächlich geschriebenen Stand passen. Die Kennung der
    Fassung folgt aus den Prüfwerten: gleicher Inhalt, gleiche Fassung."""
    def wert(pfad):
        return hashlib.sha256(pfad.read_bytes()).hexdigest()
    vorrat = {}
    for p in sorted(AUSGABE.glob("*.html")):
        vorrat[p.name] = wert(p)
    if (AUSGABE / "manifest.webmanifest").exists():
        vorrat["manifest.webmanifest"] = wert(AUSGABE / "manifest.webmanifest")
    if MITTEL.is_dir():
        for p in sorted(MITTEL.iterdir()):
            if p.is_file():
                vorrat["mittel/" + p.name] = wert(p)
    if "index.html" in vorrat:
        vorrat["./"] = vorrat["index.html"]
    fassung = hashlib.sha256(json.dumps(vorrat, sort_keys=True).encode()).hexdigest()[:16]
    (AUSGABE / "sw.js").write_text(
        SW_VORLAGE.replace("%VERSION%", fassung)
                  .replace("%DATEIEN%", json.dumps(vorrat, ensure_ascii=False, indent=2, sort_keys=True)),
        encoding="utf-8")
    return list(vorrat)
