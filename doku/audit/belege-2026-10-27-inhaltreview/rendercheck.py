"""Render unchanged sources into a temporary directory and compare all pages."""
import contextlib
import io
import json
from pathlib import Path
import shutil
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'quellen'))
import gemeinsames as common
import build

original = common.AUSGABE
rows = []
log = io.StringIO()
with tempfile.TemporaryDirectory(prefix='azubipass-review-') as temporary:
    target = Path(temporary)
    (target / 'mittel').mkdir()
    shutil.copyfile(original / 'mittel/schriften.css', target / 'mittel/schriften.css')
    common.AUSGABE = target
    common.MITTEL = target / 'mittel'
    build.AUSGABE = target
    with contextlib.redirect_stdout(log):
        for source in common.lernfeld_dateien():
            rendered = build.baue(source)
            actual = rendered.read_text()
            rows.append({
                'file': rendered.name,
                'identical': actual == (original / rendered.name).read_text(),
                'stand_hints': actual.count('class="standhinweis'),
                'review_markers': actual.count('class="pruefmarke'),
            })
HERE = Path(__file__).parent
(HERE / 'rendercheck.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
(HERE / 'rendercheck.txt').write_text(log.getvalue())
print(f'{sum(row["identical"] for row in rows)}/{len(rows)} pages byte-identical')
if not all(row['identical'] for row in rows):
    raise SystemExit(1)
