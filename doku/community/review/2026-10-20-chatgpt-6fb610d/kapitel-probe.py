import sys,functools,socketserver,threading,json
from pathlib import Path
ROOT=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[4]
sys.path.insert(0,str(ROOT/'quellen'))
import community_korrekturen_test as b
import lernstand_sync_test as l
from playwright.sync_api import sync_playwright
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(b.Stiller,directory=str(ROOT/'docs'))) as srv:
 threading.Thread(target=srv.serve_forever,daemon=True).start()
 url=f'http://127.0.0.1:{srv.server_address[1]}/'
 with sync_playwright() as p:
  browser=p.chromium.launch()
  c=browser.new_context(viewport={'width':390,'height':844},service_workers='block')
  c.add_init_script(b.FAKE_JS);c.add_init_script(l.LERN_JS)
  t=c.new_page();t.goto(url+'lf1.html#k1')
  t.locator('#k1 .frage textarea').first.wait_for()
  t.locator('#k1 .frage textarea').first.fill('Antwort vor Abgleich')
  t.evaluate('AP.sofortSichern()')
  q=t.locator('#k1 .frage').first.get_attribute('id')
  print('Vorher:',t.evaluate("({stand:AP.stand.fortschritt['lf1-k1'].test,roh:JSON.parse(localStorage.getItem('azubipass:konto')).fortschritt['lf1-k1'].test})"),flush=True)
  s=c.new_page();s.add_init_script("localStorage.setItem('azubipass-sitzung','{}')")
  s.goto(url+'app.html#ich');s.wait_for_function("window.AP && AP.lernstandSync && AP.lernstandSync.status().art==='aktuell'")
  # Another tab makes a normal, unrelated local change.
  s.evaluate("AP.stand.lesezeichen.push({zu:'andere-aenderung',titel:'andere-aenderung',lernfeld:'lf1'});AP.sofortSichern()")
  t.wait_for_function("JSON.parse(localStorage.getItem('azubipass:konto')).lesezeichen.some(x=>x.zu==='andere-aenderung')")
  t.wait_for_timeout(200)
  t.locator('#k1 .frage textarea').first.fill('Neue Antwort nach Abgleich')
  t.evaluate('AP.sofortSichern()')
  print('Eingabefeld:',t.locator('#k1 .frage textarea').first.input_value(),flush=True)
  print('Danach:',t.evaluate("({stand:AP.stand.fortschritt['lf1-k1'].test,roh:JSON.parse(localStorage.getItem('azubipass:konto')).fortschritt['lf1-k1'].test})"),flush=True)
  t.reload();t.locator('#k1 .frage textarea').first.wait_for()
  print('Nach Neuladen:',t.locator('#k1 .frage textarea').first.input_value(),flush=True)
  c.close();browser.close()
