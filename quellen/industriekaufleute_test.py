#!/usr/bin/env python3
"""
AzubiPass · Prüfungen für den Ausbildungsgang Industriekaufleute (2024).

Läuft ohne Browser und ohne Netz. Prüft zwei Dinge getrennt:

1. Inhalt – jedes vorhandene Industriekapitel gegen doku/kapitel-format.md
   und den Plan (doku/industriekaufleute/): Pflichtfelder, Lernziele an
   echten Abschnitten, Langfassung je Abschnitt, Mengenregeln (höchstens
   eine Grafik, ein Check, eine Zuordnung, zwei Achtung-Kästen), Merksatz
   mit Karteikarte in jedem Abschnitt, alle Begriffs- und Paragraphen-
   verweise auflösbar, Aufgaben vollständig und eindeutig.
2. Trennung – Registry, Build-Reihenfolge, Aliase und Berufszuordnung in
   den gebauten Dateien (setzt voraus, dass build_app.py gelaufen ist).

Aufruf:  python industriekaufleute_test.py
"""

import json
import re
import sys
from pathlib import Path

from gemeinsames import AUSGABE, HIER, lade, lernfeld_dateien, lernfeld_eintrag, registry

VERWEIS = re.compile(r"\{\{(begriff|par):([a-z0-9-]+)\|")
fehler, ok = [], 0


def pruefe(bedingung, text):
    global ok
    if bedingung:
        ok += 1
    else:
        fehler.append(text)


def ik_lernfelder():
    return [p for p in lernfeld_dateien() if p.name.startswith("ik2024-")]


# ---------------------------------------------------------------- 1 · Inhalt

def kapitel_pruefen(lf, ch, eintrag):
    wo = f'{lf["id"]}/{ch.get("id")}'
    for feld in ("id", "lernfeld", "nummer", "titel", "untertitel", "minuten",
                 "lernziele", "bloecke", "zusammenfassung", "selbsttest", "pruefungstipp"):
        pruefe(ch.get(feld) not in (None, "", []), f"{wo}: Feld {feld} fehlt")
    pruefe(ch.get("id") == eintrag["id"], f"{wo}: id passt nicht zur Lernfelddatei")
    pruefe(ch.get("lernfeld") == lf["id"], f"{wo}: lernfeld passt nicht")
    pruefe(re.fullmatch(r"k\d\d", ch.get("id", "")) is not None, f"{wo}: Kapitelkennung nicht kNN")

    abschnitte = [a for a in ch["bloecke"] if a.get("typ") == "abschnitt"]
    ids = [a["id"] for a in abschnitte]
    pruefe(3 <= len(abschnitte) <= 5, f"{wo}: {len(abschnitte)} Abschnitte (3–5 erwartet)")
    pruefe(len(ids) == len(set(ids)), f"{wo}: doppelte Abschnittskennung")
    pruefe(len(ch["lernziele"]) >= 3, f"{wo}: weniger als drei Lernziele")
    for z in ch["lernziele"]:
        pruefe(z.get("abschnitt") in ids, f"{wo}: Lernziel {z.get('id')} zeigt auf keinen Abschnitt")

    lang = {x.get("abschnitt"): x for x in (ch.get("ausfuehrlich") or {}).get("abschnitte", [])}
    for a in abschnitte:
        x = lang.get(a["id"])
        pruefe(x is not None, f"{wo}: Langfassung für {a['id']} fehlt")
        if x:
            for feld in ("erklaerung", "fallbeispiel", "typische_fehler", "merksatz"):
                pruefe(bool(x.get(feld)), f"{wo}/{a['id']}: Langfassung ohne {feld}")
            pruefe(len(x.get("beispiele") or []) >= 2, f"{wo}/{a['id']}: weniger als zwei Beispiele")
            pruefe(len(x.get("verstaendnisfragen") or []) >= 2,
                   f"{wo}/{a['id']}: weniger als zwei Verständnisfragen")
        merke = [b for b in a["inhalt"] if b["typ"] == "merke"]
        pruefe(len(merke) >= 1, f"{wo}/{a['id']}: kein Merksatz")
        for m in merke:
            pruefe(bool(m.get("karteikarte")), f"{wo}/{a['id']}: Merksatz ohne Karteikarte")

    alle = [b for a in abschnitte for b in a["inhalt"]]
    zahl = lambda t: sum(1 for b in alle if b["typ"] == t)
    pruefe(zahl("grafik") <= 1, f"{wo}: {zahl('grafik')} Grafiken (höchstens 1)")
    pruefe(zahl("check") <= 1, f"{wo}: {zahl('check')} Checks (höchstens 1)")
    pruefe(zahl("zuordnen") <= 1, f"{wo}: {zahl('zuordnen')} Zuordnungen (höchstens 1)")
    pruefe(zahl("achtung") <= 2, f"{wo}: {zahl('achtung')} Achtung-Kästen (höchstens 2)")
    for b in alle:
        if b["typ"] == "check":
            richtige = sum(1 for o in b["optionen"] if o.get("richtig"))
            pruefe(richtige == 1, f"{wo}: Check mit {richtige} richtigen Antworten")
            pruefe(all(o.get("echo") for o in b["optionen"]), f"{wo}: Check-Option ohne Echo")
        if b["typ"] == "zuordnen":
            pruefe(all(x["loesung"] in b["kategorien"] for x in b["aufgaben"]),
                   f"{wo}: Zuordnung mit unbekannter Lösung")
        if b["typ"] == "grafik":
            for feld in ("titel", "kopf", "lead"):
                pruefe("{{" not in str(b.get(feld, "")), f"{wo}: Verweis im Grafikfeld {feld}")
    pruefe("{{" not in ch["titel"] + ch["untertitel"], f"{wo}: Verweis im Titel")

    roh = json.dumps(ch, ensure_ascii=False)
    for art, kennung in VERWEIS.findall(roh):
        speicher = lf["begriffe"] if art == "begriff" else lf["paragraphen"]
        pruefe(kennung in speicher, f"{wo}: Verweis {art}:{kennung} nicht im Speicher")
    pruefe("TODO" not in roh and "XXX" not in roh, f"{wo}: Rohplatzhalter im Text")


def aufgaben_pruefen(lf, ch, gesehen):
    wo = f'{lf["id"]}/{ch["id"]}'
    datei = HIER / f'{lf["id"]}-{ch["id"]}.aufgaben.json'
    pruefe(datei.exists(), f"{wo}: Aufgabendatei fehlt")
    if not datei.exists():
        return
    d = json.loads(datei.read_text(encoding="utf-8"))
    pruefe(d.get("lernfeld") == lf["id"] and d.get("kapitel") == ch["id"],
           f"{wo}: Aufgabendatei verweist auf falsches Kapitel")
    pruefe(len(d.get("bausteine", [])) >= 2, f"{wo}: weniger als zwei Aufgaben")
    afb = {b.get("anforderungsbereich") for b in d.get("bausteine", [])}
    pruefe({1, 2, 3} <= afb, f"{wo}: Aufgaben decken nicht AFB I, II und III ab ({sorted(afb)})")
    for b in d.get("bausteine", []):
        bid = b.get("id", "")
        pruefe(bid.startswith(f'{lf["id"]}-{ch["id"]}-'), f"{wo}: Aufgabenkennung {bid} ohne Präfix")
        pruefe(bid not in gesehen, f"{wo}: doppelte Aufgabenkennung {bid}")
        gesehen.add(bid)
        pruefe(bool(b.get("erklaerung")), f"{wo}/{bid}: Erklärung fehlt")
        bew = b.get("bewertung", {})
        for vn, vd in (b.get("variablen") or {}).items():
            pruefe(set(vd) <= {"von", "bis", "schritt"}, f"{wo}/{bid}: Variable {vn} mit unbekannten Feldern {sorted(set(vd))}")
        for e in b.get("eingabe", []):
            if e["block"] == "auswahl":
                r = sum(1 for o in e["optionen"] if o.get("richtig"))
                pruefe(r >= 1 and (e.get("mehrfach") or r == 1), f"{wo}/{bid}: Auswahl mit {r} richtigen")
                pruefe(all(o.get("echo") for o in e["optionen"]), f"{wo}/{bid}: Option ohne Echo")
            if e["block"] == "zuordnung":
                pruefe(all(x["loesung"] in e["ziele"] for x in e["elemente"]),
                       f"{wo}/{bid}: Zuordnung mit unbekanntem Ziel")
            if e["block"] == "zahl":
                pruefe("label" in e, f"{wo}/{bid}: Zahlfeld ohne label")
                pruefe("{" not in e.get("label", ""),
                       f"{wo}/{bid}: Platzhalter im label werden nicht gefüllt")
                ff = e.get("folgefehler_aus")
                if ff is not None:
                    pruefe(isinstance(ff, list) and all(
                        any(x.get("block") == "zahl" and x.get("loesung") == n for x in b["eingabe"])
                        for n in ff), f"{wo}/{bid}: folgefehler_aus muss eine Liste vorhandener Zahlfeld-Lösungen sein")
                    # Folgefehler greift nur, wenn das Ergebnis rechnerisch auf
                    # dem Zwischenwert aufbaut — sonst läuft die Regel ins Leere.
                    abg = b.get("abgeleitet") or {}

                    def haengt_ab(name, ziel, tiefe=0):
                        f = abg.get(name, "")
                        if tiefe > 10 or not f:
                            return False
                        namen = set(re.findall(r"[a-z_][a-z0-9_]*", f))
                        return ziel in namen or any(haengt_ab(n, ziel, tiefe + 1) for n in namen if n in abg)
                    if isinstance(ff, list):
                        pruefe(all(haengt_ab(e.get("loesung"), n) for n in ff),
                               f"{wo}/{bid}: Lösung {e.get('loesung')} baut nicht auf {ff} auf")
            if e["block"] == "buchungssatz":
                zeilen = e.get("loesung") or []
                pruefe(len(zeilen) >= 2 and e.get("zeilen", 0) >= len(zeilen),
                       f"{wo}/{bid}: Buchungssatz braucht mindestens zwei Lösungszeilen und genug Eingabezeilen")
                pruefe(all((z.get("soll") is None) != (z.get("haben") is None) for z in zeilen),
                       f"{wo}/{bid}: jede Buchungszeile hat genau eine Seite")
                je = bew.get("punkte_je_zeile")
                if je is not None:
                    pruefe(abs(je * len(zeilen) - b["punkte"]) < 1e-9 or len(b["eingabe"]) > 1,
                           f"{wo}/{bid}: punkte_je_zeile × Zeilen ≠ Punkte")
            if e["block"] == "textfeld":
                pruefe(bew.get("art") == "selbstbewertung" and bew.get("musterloesung")
                       and bew.get("raster"), f"{wo}/{bid}: Textfeld ohne Musterlösung und Raster")
                if bew.get("raster"):
                    pruefe(sum(x["punkte"] for x in bew["raster"]) == b["punkte"],
                           f"{wo}/{bid}: Raster ergibt nicht die Punktzahl")


def inhalt():
    gesehen = set()
    for datei in ik_lernfelder():
        lf, kapitel, fehlend = lade(datei)
        _, eintrag = lernfeld_eintrag(lf["id"])
        pruefe(eintrag is not None, f"{lf['id']}: nicht in der Registry")
        pruefe(not fehlend, f"{lf['id']}: Kapiteldateien fehlen: {', '.join(fehlend)}")
        ids = {k["id"]: k for k in lf["kapitel"]}
        for ch in kapitel:
            kapitel_pruefen(lf, ch, ids.get(ch["id"], {}))
            aufgaben_pruefen(lf, ch, gesehen)
    return gesehen


# ---------------------------------------------------------------- 2 · Trennung

def trennung():
    r = registry()
    kurz = [b["kurz"] for b in r["berufe"]]
    pruefe(kurz == ["kfb", "ik"], "Registry: Berufe kfb und ik erwartet")
    namen = [p.name for p in lernfeld_dateien()]
    kfb = [n for n in namen if not n.startswith("ik2024-")]
    pruefe(kfb[-1] == "buchfuehrung.lernfeld.json" and kfb[0] == "lf1.lernfeld.json",
           "Reihenfolge Büromanagement verändert")
    ik = [n for n in namen if n.startswith("ik2024-")]
    pruefe(ik == sorted(ik), "Industrie-Lernfelder nicht in Reihenfolge 1–13")

    from build_app import lernfeld_aliases
    pruefe(lernfeld_aliases({"id": "ik2024-lf06"})[0] == "LF6", "Alias für ik2024-lf06 nicht LF6")
    pruefe("Buchhaltung" not in lernfeld_aliases({"id": "ik2024-lf06"}),
           "Industrie-LF6 trägt Buchführungsalias")
    pruefe(lernfeld_aliases({"id": "buchfuehrung"})[0] == "LF6", "Buchführung verliert Alias LF6")
    pruefe(lernfeld_aliases({"id": "lf10"})[0] == "LF10", "Alias lf10 verändert")

    inhalt_datei = AUSGABE / "mittel" / "inhalt.json"
    if not inhalt_datei.exists():
        fehler.append("docs/mittel/inhalt.json fehlt – erst build_app.py")
        return
    d = json.loads(inhalt_datei.read_text(encoding="utf-8"))
    pruefe({b["kurz"] for b in d["berufe"]} == {"kfb", "ik"}, "inhalt.json: Berufe fehlen")
    for liste in ("lernfelder", "karten", "quiz", "tests", "begriffe"):
        pruefe(all(e.get("beruf") in ("kfb", "ik") for e in d[liste]),
               f"inhalt.json: {liste} ohne Berufsangabe")
    for e in d["lernfelder"] + d["karten"] + d["quiz"] + d["tests"]:
        lfid = e.get("id") if "seite" in e else e.get("lernfeld")
        erwartet = "ik" if str(lfid).startswith("ik2024-") else "kfb"
        if e["beruf"] != erwartet:
            fehler.append(f"inhalt.json: {lfid} falsch dem Beruf {e['beruf']} zugeordnet")
            break
    else:
        ok_alle()
    pruefe(sum(1 for l in d["lernfelder"] if l["beruf"] == "kfb") == 13,
           "Büromanagement hat nicht mehr 13 Lernfelder")
    ik_pr = next(b for b in d["berufe"] if b["kurz"] == "ik")
    pruefe(ik_pr["pruefung"] is None, "Industrie übernimmt den Büromanagement-Prüfungstermin")
    pruefe(all(v.get("beruf") in ("kfb", "ik", "alle") for v in d["vokabeln"]),
           "Vokabelblock ohne Berufsangabe")

    suche = json.loads((AUSGABE / "mittel" / "suche.json").read_text(encoding="utf-8"))
    pruefe(all(s.get("beruf") in ("kfb", "ik") for s in suche), "suche.json ohne Berufsangabe")
    auf = json.loads((AUSGABE / "mittel" / "aufgaben.json").read_text(encoding="utf-8"))
    pruefe(all(k.get("beruf") in ("kfb", "ik") for k in auf["kapitel"]),
           "aufgaben.json: Kapitel ohne Berufsangabe")
    pruefe(all((b["beruf"] == "ik") == b["lernfeld"].startswith("ik2024-") for b in auf["bausteine"]),
           "aufgaben.json: Baustein falsch zugeordnet")


def ok_alle():
    global ok
    ok += 1


if __name__ == "__main__":
    kennungen = inhalt()
    trennung()
    for f in fehler:
        print("  FEHL ", f)
    print(f"\n  {ok} Prüfungen bestanden, {len(fehler)} Fehler. "
          f"{len(kennungen)} Industrie-Aufgaben geprüft.")
    sys.exit(1 if fehler else 0)
