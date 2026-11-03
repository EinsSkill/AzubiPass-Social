"""Read-only review evidence against f041834; no browser needed.

Run from any cwd: python doku/audit/belege/2026-10-28-erweiterter-modus-review.py
Outputs JSON to stdout. Contract-typo and consumed-URL cases reproduce findings;
they are not claims that these behaviors satisfy the specification.
"""
import contextlib
import copy
from decimal import Decimal
import io
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "quellen"))
import build
import vertiefung

test_path = ROOT / "quellen/erweiterter_modus_test.py"
test_source = test_path.read_text().replace(
    "from playwright.sync_api import sync_playwright", ""
)
test_source = test_source[:test_source.rfind('if __name__')]
ns = {"__file__": str(test_path), "__name__": "review_static"}
exec(compile(test_source, str(test_path), "exec"), ns)
out = io.StringIO()
with contextlib.redirect_stdout(out):
    ns["statisch"]()
    ns["vertrag"]()

negative = []
for stem, ab in [
    ("lf4-k3-angebotsvergleich", "b1"),
    ("lf3-k2-vertrag", "b2"),
    ("lf2-k2-zeitmanagement", "b2"),
]:
    chapter = json.loads((ROOT / "quellen" / (stem + ".kapitel.json")).read_text())
    entry = next(e for e in chapter["ausfuehrlich"]["abschnitte"] if e["abschnitt"] == ab)
    entry["darstellung"] = "vollfasung"  # one deliberately misspelled field
    result = vertiefung.pruefe(chapter, {"id": chapter["lernfeld"]}, stem)
    section = next(a for a in chapter["bloecke"] if a["id"] == ab)
    legacy = build.detail_zusatz(
        section, build._ausfuehrlich_karte(chapter).get(ab), {"id": chapter["lernfeld"]}
    )
    negative.append({
        "chapter": stem,
        "mutation": 'darstellung = "vollfasung"',
        "validator_returned": list(result),
        "expected": "Build error with file and section",
        "observed": "No error; legacy fallback instead of full rendering",
        "raw_question_objects": "&#x27;" in legacy or "{'id':" in legacy,
        "goal_survives": entry["ziel"] in legacy,
        "legacy_excerpt": legacy[:900],
    })

js = r"""
const fs=require('fs'),vm=require('vm');
const code=fs.readFileSync('quellen/azubipass.js','utf8');
const start=code.indexOf('  function tiefeAnwenden(');
const end=code.indexOf('\n  /* Wo im Kapitel',start);
let address;
const section={};const detail={tagName:'DETAILS',open:false};
const target={tagName:'H3',id:'k3-b1'};
const registry=new Map([[section,{oeffne:()=>({ziel:{querySelector:()=>detail}})}]]);
const ctx={tiefeVerlangt:{detail:'a-ohne-skonto'},vertiefungen:registry,
 CSS:{escape:x=>x},location:{pathname:'/lf4.html',hash:'#k3-b1'},
 history:{replaceState:(a,b,url)=>{address=url}}};
vm.createContext(ctx);
vm.runInContext(code.slice(start,end)+'\nthis.test=tiefeAnwenden;',ctx);
ctx.test(section,target);
process.stdout.write(JSON.stringify({
 original_function:true,environment:'Node VM, minimal DOM stubs; not a browser test',
 opened_detail:detail.open,address_after_opening:address,
 retains_view_parameter:address.includes('ansicht='),
 retains_detail_parameter:address.includes('detail=')
}));
"""
link = json.loads(subprocess.check_output(["node", "-e", js], cwd=ROOT, text=True))
base = Decimal("1000")
discounted = base * Decimal(".90")
cash = discounted * Decimal(".98")
math = {
    "target_price": str(discounted),
    "cash_price": str(cash),
    "purchase_price": str(cash + 40),
    "alternative": "930.00",
    "without_skonto": str(discounted + 40),
    "wrong_added_percentages": str(base * Decimal(".88") + 40),
}
assert cash + 40 == 922 and discounted + 40 == 940
assert not ns["fehler"]
print(json.dumps({
    "reviewed_application": "f041834",
    "handover_checkout": subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=ROOT, text=True
    ).strip(),
    "static_original_suite_errors": ns["fehler"],
    "static_original_suite_log": out.getvalue(),
    "E01_contract_typo_reproduction": negative,
    "E02_link_reproduction": link,
    "pilot_A_independent_decimal_calculation": math,
    "limitations": ["No independently executed browser or axe scan", "No live or PWA offline test"],
}, ensure_ascii=False, indent=2))
