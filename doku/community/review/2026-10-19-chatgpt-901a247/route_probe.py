import sys, functools, socketserver, threading, json
from pathlib import Path
REPO = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[4]
sys.path.insert(0, str(REPO / 'quellen'))
import community_moderation_test as m
from playwright.sync_api import sync_playwright

handler = functools.partial(m.basis.Stiller, directory=str(m.basis.DOCS))
with socketserver.TCPServer(('127.0.0.1', 0), handler) as srv:
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for target, state in [(t,z) for t in ['heute', 'lernen', 'ueben', 'ich', 'suche', 'unbekannt', 'community/meldungen'] for z in ['offen','sendet','unklar']]:
            c = b.new_context(service_workers='block', viewport={'width':390,'height':844})
            c.add_init_script(m.basis.FAKE_JS)
            c.add_init_script(m.MOD_JS)
            s = c.new_page()
            s.goto(f'http://127.0.0.1:{srv.server_address[1]}/app.html#community/beitrag/{m.B1}')
            s.get_by_role('button', name='Antwort von Ben melden').wait_for()
            s.get_by_role('button', name='Antwort von Ben melden').click()
            s.locator('dialog textarea').fill('Privater Hinweis von Anna')
            s.locator('dialog').get_by_label('Spam').check()
            if state != 'offen':
                s.evaluate('(z) => FAKE.plan.meldung_senden = [z]', 'halten' if state == 'sendet' else 'spaet')
                s.locator('dialog').get_by_role('button',name='Meldung senden').click()
                if state == 'sendet':
                    s.wait_for_function('(FAKE.gehalten.meldung_senden || []).length === 1')
                else:
                    s.get_by_text('Wir konnten nicht prüfen, ob deine Meldung gesendet wurde.',exact=False).wait_for()
            s.evaluate('(target) => location.hash = target', target)
            s.wait_for_function('(target) => location.hash === "#" + target',arg=target)
            s.wait_for_timeout(300)
            print(json.dumps({'target':target, 'state':state, **s.evaluate('''() => ({
                area:document.documentElement.dataset.bereich,
                open:document.querySelectorAll('dialog[open]').length,
                hint: [...document.querySelectorAll('textarea')].map(x=>x.value).filter(x=>x.includes('Privater Hinweis'))
            })''')}, ensure_ascii=False))
            c.close()
        b.close()
