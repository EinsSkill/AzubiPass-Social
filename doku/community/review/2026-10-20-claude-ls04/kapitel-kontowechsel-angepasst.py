import sys,functools,socketserver,threading,json
from pathlib import Path
ROOT=Path(sys.argv[1]);sys.path.insert(0,str(ROOT/'quellen'))
import community_korrekturen_test as b
import lernstand_sync_test as l
from playwright.sync_api import sync_playwright
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(b.Stiller,directory=str(ROOT/'docs'))) as srv:
 threading.Thread(target=srv.serve_forever,daemon=True).start(); url=f'http://127.0.0.1:{srv.server_address[1]}/'
 with sync_playwright() as p:
  browser=p.chromium.launch();c=browser.new_context(service_workers='block')
  c.add_init_script(b.FAKE_JS);c.add_init_script(l.LERN_JS)
  s=c.new_page();s.add_init_script("localStorage.setItem('azubipass-sitzung','{}');FAKE.serverStand(FAKE.BEN, ['B-eigen'], 1);")
  s.goto(url+'app.html#ich');s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  k=c.new_page();k.goto(url+'lf1.html#k3');feld=k.locator('#k3 .frage textarea').first;feld.wait_for()
  feld.fill('A private Antwort');k.locator('#k3 .frage textarea').nth(1).fill('A weitere private Antwort');k.evaluate('AP.sofortSichern()')
  s.wait_for_function("AP.stand.fortschritt['lf1-k3'] && Object.values(AP.stand.fortschritt['lf1-k3'].test).some(e=>e.t==='A private Antwort')")
  s.evaluate('AP.lernstandSync.abgleichen()');s.wait_for_function("FAKE.db.lernstand.some(z=>z.nutzer_id===FAKE.ICH && z.daten.fortschritt['lf1-k3'])")
  s.evaluate('FAKE.anmelden(FAKE.BEN_KONTO)');s.wait_for_function("AP.lernstandSync.status().art==='aktuell' && JSON.parse(localStorage.getItem('azubipass-lernsync')).nutzer===FAKE.BEN")
  k.wait_for_timeout(1500); k.wait_for_function("!JSON.stringify(AP.stand.fortschritt['lf1-k3'] || {}).includes('A private')")
  print('Nach Wechsel zu B, Kapitelstand:',k.evaluate("AP.stand.fortschritt['lf1-k3'] || null"),flush=True)
  print('Sichtbare Antworten aus A:',k.locator('#k3 .frage textarea').evaluate_all('(els) => els.map(e=>e.value)'),feld.input_value(),flush=True)
  feld.fill('B neue Antwort');k.evaluate('AP.sofortSichern()')
  print('Lokaler B-Stand nach Weitertippen:',k.evaluate("(AP.stand.fortschritt['lf1-k3'] || {}).test || null"),flush=True)
  s.wait_for_timeout(700)
  s.evaluate('AP.kontoAuffrischen(); AP.lernstandSync.abgleichen()');s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  s.wait_for_timeout(500)
  daten=s.evaluate("FAKE.db.lernstand.find(z=>z.nutzer_id===FAKE.BEN).daten")
  print('Serverstand B:',json.dumps(daten.get('fortschritt',{}).get('lf1-k3')),flush=True)
  leak='A weitere private Antwort' in json.dumps(daten)
  print('ERGEBNIS:', 'FEHL: unangetastete Antwort von A in Konto B' if leak else 'OK: keine alte Antwort von A in Konto B',flush=True)
  c.close();browser.close()
  sys.exit(1 if leak else 0)
