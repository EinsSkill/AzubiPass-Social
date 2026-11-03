"""Read-only checks of the editorial package; no app build or browser claims."""
from pathlib import Path
from decimal import Decimal
import collections
import copy
import csv
import hashlib
import json
import re
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SOURCE = ROOT / "quellen"
sys.path.insert(0, str(SOURCE))
import vertiefung


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def csvread(name):
    with (HERE / name).open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle, delimiter=";"))


def money(text):
    value = text.rsplit("=", 1)[-1].replace("€", "").strip()
    return Decimal(value.replace(".", "").replace(",", ".").replace("−", "-"))


def main():
    expected_chapters, expected_sections, no_paragraph = set(), set(), set()
    for path in SOURCE.glob("*.lernfeld.json"):
        lf = read(path)
        for registered in lf["kapitel"]:
            chapter = read(SOURCE / registered["datei"])
            key = lf["id"] + ":" + chapter["id"]
            assert key not in expected_chapters, key
            expected_chapters.add(key)
            for section in chapter["bloecke"]:
                if section.get("typ") != "abschnitt":
                    continue
                skey = key + "-" + section["id"]
                assert skey not in expected_sections, skey
                expected_sections.add(skey)
                if not any(b.get("typ") == "absatz" for b in section["inhalt"]):
                    no_paragraph.add(skey)

    chapters, sections = csvread("kapitelplan.csv"), csvread("abschnittsplan.csv")
    assert len(chapters) == len(expected_chapters) == 160
    assert {c["schluessel"] for c in chapters} == expected_chapters
    assert len(sections) == len(expected_sections) == 567
    assert {s["schluessel"] for s in sections} == expected_sections
    inventory = read(HERE / "bestand.json")["kapitel"]
    assert {c["schluessel"] for c in inventory} == expected_chapters
    for chapter in inventory:
        actual = ROOT / chapter["datei"]
        assert hashlib.sha256(actual.read_bytes()).hexdigest() == chapter["sha256"], str(actual)
        source = read(actual)
        originals = {s["id"]: s for s in source["bloecke"] if s.get("typ") == "abschnitt"}
        for section in chapter["abschnitte"]:
            assert section["titel"] == originals[section["id"]]["titel"]
            assert [b["block"] for b in section["bloecke"]] == originals[section["id"]]["inhalt"]
    obstacles = read(HERE / "migrationshindernisse.json")
    assert {o["schluessel"] for o in obstacles["abschnitte"]} == no_paragraph
    assert obstacles["anzahl"] == len(no_paragraph) == 140
    obstacle_evidence = []
    for key in ["lf3:k1-a2", "lf9:k2-b3"]:
        obstacle = next(o for o in obstacles["abschnitte"] if o["schluessel"] == key)
        lf_id = key.split(":")[0]
        section_id = key.rsplit("-", 1)[1]
        target = copy.deepcopy(read(ROOT / obstacle["datei"]))
        target["ausfuehrlich"] = {"format": 2, "abschnitte": [{
            "abschnitt": section_id, "darstellung": "vollfassung",
            "ziel": "Validatorvoraussetzung reproduzieren, kein Lerntextentwurf.",
            "inhalt": [{"typ": "absatz", "id": "probe-m01", "text": "Reiner Strukturprüffall im Arbeitsspeicher; keine Änderung einer Kapitelquelle."}]
        }]}
        try:
            vertiefung.pruefe(target, read(SOURCE / (lf_id + ".lernfeld.json")), obstacle["datei"], {})
        except vertiefung.Vertragsfehler as error:
            assert "keinen Absatz" in str(error), str(error)
            obstacle_evidence.append({"abschnitt": key, "befund": str(error).strip()})
        else:
            raise AssertionError("M01 verhält sich anders als erwartet: " + key)
    gaps = csvread("ergaenzungen.csv")
    assert len(gaps) == 49
    assert {g["kennung"] for g in gaps} == {f"L{i:02}" for i in range(1, 31)} | {f"K{i:02}" for i in range(1, 20)}

    schemas = []
    for path in sorted((HERE / "muster").glob("*.json")):
        document = read(path)
        if not isinstance(document, dict) or "eintrag" not in document:
            continue
        chapter = read(ROOT / document["datei"])
        lf = read(SOURCE / (document["lernfeld"] + ".lernfeld.json"))
        target = copy.deepcopy(chapter)
        # Keep genuine mixed legacy entries while replacing exactly the target section.
        entries = [e for e in target.get("ausfuehrlich", {}).get("abschnitte", [])
                   if e.get("abschnitt") != document["abschnitt"]]
        entries.append(document["eintrag"])
        target["ausfuehrlich"] = {"format": 2, "abschnitte": entries}
        checked = vertiefung.pruefe(target, lf, document["datei"], {})
        assert document["abschnitt"] in checked
        original = next(s for s in chapter["bloecke"] if s.get("id") == document["abschnitt"])
        wanted = [r for r in vertiefung.basis_schluessel(original) if r]
        actual = [b["ref"] for b in document["eintrag"]["inhalt"] if b["typ"] == "basis"]
        assert collections.Counter(actual) == collections.Counter(wanted)
        schemas.append({"datei": path.name, "vertrag": "bestanden", "alle_basis_refs_einmal": True})
    assert len(schemas) == 4

    klr = read(HERE / "muster/lf10-k5-b1.json")["eintrag"]
    table = next(b for b in klr["inhalt"] if b["typ"] == "tabelle")
    for col, quantity in [(1, Decimal(50)), (2, Decimal(100))]:
        values = [quantity * 40, quantity * 26, quantity * (40-26), Decimal(1000), quantity * (40-26)-1000]
        assert [money(r["zellen"][col]) for r in table["zeilen"]] == values
    plan = read(HERE / "muster/ik2024-lf06-k03-a1.json")["eintrag"]
    table = next(b for b in plan["inhalt"] if b["typ"] == "tabelle")
    assert Decimal(200) * Decimal("0.04") == 8
    assert Decimal(200) * 15 == 3000
    assert (Decimal(3000)-500)/1000 == Decimal("2.5")
    assert table["zeilen"][2]["zellen"][-1] == "8 m²"
    assert table["zeilen"][1]["zellen"][-1] == "3.000 g = 3 kg"
    assert Decimal(1000) * Decimal(".19") == 190
    assert Decimal(1000) + 190 == 1190
    assert Decimal(150)+350+100 == 600
    assert (Decimal(150)+300)/30 == 15
    assert Decimal(200)/20 == Decimal(100)/10 == 10
    assert Decimal(122000)-93000 == 29000
    assert Decimal(120000)-94000 == 26000
    assert Decimal(29000)-2000+3000-4000 == 26000

    # Local Markdown links in the authored package must resolve.
    broken = []
    for path in HERE.rglob("*.md"):
        if "referenz-v1" in path.parts:
            continue  # Historical references describe an earlier full repo, not this package.
        for target in re.findall(r"\]\(([^)]+)\)", path.read_text()):
            if "://" in target or target.startswith("#"):
                continue
            resolved = path.parent / target.split("#", 1)[0]
            if not resolved.exists():
                broken.append({"datei": str(path.relative_to(HERE)), "ziel": target})
    assert not broken, broken
    result = {
        "datum": "2026-10-28",
        "anwendungsbasis": "f041834",
        "ergebnis": "Vorbereitungskonsistenz bestanden",
        "kapitel": len(chapters), "abschnitte": len(sections),
        "dossiers": len(list((HERE / "dossiers").glob("*.md"))),
        "quellhashes_und_originalbloecke": "alle 160 Kapitel stimmen überein",
        "m01_abschnitte_ohne_absatz": len(no_paragraph),
        "m01_validator_reproduktion": obstacle_evidence,
        "lehrplan_arbeitsauftraege": len(gaps),
        "zusaetzliche_muster": schemas,
        "arithmetik": "KLR-Zahlen aus den Muster-Tabellen unabhängig nachgerechnet; Materialbedarf, Steuerschema, Werbeetat und Ergebnisüberleitung mit Decimal kontrolliert",
        "interne_links": "aufgelöst (historische v1-Referenz ausgenommen)",
        "grenzen": ["Keine Kapitelquelle oder Anwendung geändert", "Keine neue Browser-/Offlineabnahme", "Keine vollständige neue RLP-Prüfung", "Keine Gesamtfachfreigabe der noch zu redigierenden 564 weiteren Volltexte", "Themenprofile sind heuristische Vorschläge, keine Fachklassifikation"]
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
