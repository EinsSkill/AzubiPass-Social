"""Read-only snapshot check. Usage: python pruefung.py /path/to/repo"""
from pathlib import Path
import contextlib
import io
import json
import shutil
import subprocess
import sys
import tempfile

root = Path(sys.argv[1]).resolve()
source = root / "quellen"
sys.path.insert(0, str(source))
import vertiefung
import build_app
import build
import gemeinsames

rows, search = [], []
for path in sorted(source.glob("*.lernfeld.json")):
    lf = json.loads(path.read_text())
    chapters, sections, full = [], 0, 0
    for registered in lf["kapitel"]:
        chapter = json.loads((source / registered["datei"]).read_text())
        chapters.append(chapter)
        sections += sum(b.get("typ") == "abschnitt" for b in chapter["bloecke"])
        full += len(vertiefung.pruefe(chapter, lf, registered["datei"], {}))
    rows.append({"lernfeld": lf["id"], "kapitel": len(chapters), "abschnitte": sections, "vollfassungen": full})
    search += build_app.suche_sammeln(lf, chapters)
wanted = {e["zu"] for e in search if "ansicht=ausfuehrlich" in e["zu"]}
actual = {e["zu"] for e in json.loads((root / "docs/mittel/suche.json").read_text())
          if "ansicht=ausfuehrlich" in e["zu"]}

testfile = source / "erweiterter_modus_test.py"
testsource = testfile.read_text().replace("from playwright.sync_api import sync_playwright", "")
testsource = testsource.split('if __name__ == "__main__":')[0]
scope = {"__file__": str(testfile), "__name__": "review_without_browser"}
testlog = io.StringIO()
with contextlib.redirect_stdout(testlog):
    exec(compile(testsource, str(testfile), "exec"), scope)
    scope["statisch"]()
    scope["vertrag"]()

ik = subprocess.run([sys.executable, str(source / "industriekaufleute_test.py")],
                    cwd=root, capture_output=True, text=True)

rendered = []
buildlog = io.StringIO()
with tempfile.TemporaryDirectory(prefix="azubipass-review-render-") as directory:
    out = Path(directory)
    middle = out / "mittel"
    middle.mkdir()
    fonts = root / "docs/mittel/schriften.css"
    if fonts.exists():
        shutil.copyfile(fonts, middle / fonts.name)
    # Original renderer and publisher; redirect all output to a disposable directory.
    build.AUSGABE = out
    gemeinsames.AUSGABE = out
    gemeinsames.MITTEL = middle
    with contextlib.redirect_stdout(buildlog):
        for lfpath in build.lernfeld_dateien():
            generated = build.baue(lfpath)
            rendered.append({"seite": generated.name,
                             "bytegleich": generated.read_bytes() == (root / "docs" / generated.name).read_bytes()})

result = {
    "datum": "2026-11-02",
    "snapshot": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip(),
    "umfang": {"lernfelder": len(rows), "kapitel": sum(r["kapitel"] for r in rows),
               "abschnitte": sum(r["abschnitte"] for r in rows),
               "vollfassungen": sum(r["vollfassungen"] for r in rows)},
    "lernfelder": rows,
    "suchziele": {"soll": len(wanted), "ist": len(actual), "fehlend": sorted(wanted-actual), "ueberzaehlig": sorted(actual-wanted)},
    "modus_statisch_und_vertrag": {"ok": testlog.getvalue().count("  OK"), "fehler": scope["fehler"], "log": testlog.getvalue()},
    "ik_test": {"exitcode": ik.returncode, "ausgabe": ik.stdout, "stderr": ik.stderr},
    "renderer": rendered,
    "grenzen": ["Kein Browser/axe/Offline-Lauf", "Kein vollständiges fachliches Lesen aller 602 Texte", "Keine neue vollständige RLP-Prüfung", "Originalfunktionen und vorhandene Tests sind keine unabhängige Sachprüfung aller Inhalte"]
}
assert result["umfang"] == {"lernfelder": 26, "kapitel": 161, "abschnitte": 602, "vollfassungen": 602}
assert wanted == actual and not scope["fehler"] and ik.returncode == 0
assert len(rendered) == 26 and all(r["bytegleich"] for r in rendered)
print(json.dumps(result, ensure_ascii=False, indent=2))
