import sys,functools,socketserver,threading,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]
sys.path.insert(0,str(ROOT/'quellen'))
import community_korrekturen_test as b
import lernstand_sync_test as l
from playwright.sync_api import sync_playwright
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(b.Stiller,directory=str(b.DOCS))) as srv:
 threading.Thread(target=srv.serve_forever,daemon=True).start()
 url=f'http://127.0.0.1:{srv.server_address[1]}/'
 with sync_playwright() as p:
  browser=p.chromium.launch()
  def start(extra='',marks=None):
   c=browser.new_context(viewport={'width':390,'height':844},service_workers='block')
   c.add_init_script(b.FAKE_JS);c.add_init_script(l.LERN_JS)
   s=c.new_page();s.add_init_script(l.geraet(marks or []));s.add_init_script(extra);s.goto(url+'app.html#ich');s.wait_for_function('window.AP && AP.lernstandSync');return c,s
  # Existing account A is not yet successfully synced on this device; then account B signs in.
  c,s=start("FAKE.tabFehler.lernstand=1; FAKE.serverStand(FAKE.BEN,['B-eigen'],1); FAKE.db.profil.push({id:FAKE.BEN,anzeigename:'Ben',rolle:'azubi'});",[])
  s.wait_for_function("AP.lernstandSync.status().art==='offline'")
  s.evaluate("AP.stand.lesezeichen.push({zu:'A-privat',titel:'A-privat',lernfeld:'lf1'});AP.sofortSichern()")
  print('S01 vor Wechsel:',s.evaluate("({meta:localStorage.getItem('azubipass-lernsync'),lokal:AP.stand.lesezeichen.map(x=>x.zu),serverA:FAKE.db.lernstand.filter(z=>z.nutzer_id===FAKE.ICH)})"),flush=True)
  s.evaluate('FAKE.anmelden(FAKE.BEN_KONTO)')
  s.wait_for_function("AP.lernstandSync.status().art==='aktuell' && JSON.parse(localStorage.getItem('azubipass-lernsync')).nutzer===FAKE.BEN")
  result=s.evaluate("FAKE.db.lernstand.find(z=>z.nutzer_id===FAKE.BEN).daten.lesezeichen.map(x=>x.zu).sort()")
  print('S01 B-Server nach Wechsel:',result,'FREMDER_STAND_UEBERTRAGEN=', 'A-privat' in result,flush=True)
  c.close()
  # Keep the app open while learning on an actual chapter page in another tab.
  c,s=start('', ['Start'])
  s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  # Context init scripts seed mock/session on a new page; do not seed local progress for this tab.
  t=c.new_page();t.goto(url+'lf1.html')
  t.wait_for_function('window.AP && AP.stand')
  t.evaluate("AP.stand.lesezeichen.push({zu:'Kapitel-neu',titel:'Kapitel-neu',lernfeld:'lf1'});AP.sofortSichern()")
  print('S02 nach Kapiteländerung:',s.evaluate("JSON.parse(localStorage.getItem('azubipass:konto')).lesezeichen.map(x=>x.zu)"),flush=True)
  s.evaluate('AP.lernstandSync.abgleichen()');s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  print('S02 App nach manuellem Abgleich:',s.evaluate("AP.stand.lesezeichen.map(x=>x.zu)"),flush=True)
  s.evaluate("AP.stand.lesezeichen.push({zu:'App-neu',titel:'App-neu',lernfeld:'lf1'});AP.sofortSichern()")
  s.wait_for_function("FAKE.db.lernstand[0].version>=2")
  result=s.evaluate("({lokal:JSON.parse(localStorage.getItem('azubipass:konto')).lesezeichen.map(x=>x.zu),server:FAKE.db.lernstand[0].daten.lesezeichen.map(x=>x.zu)})")
  print('S02 nach nächster App-Änderung:',result,'KAPITELAENDERUNG_VERLOREN=', 'Kapitel-neu' not in result['lokal'] and 'Kapitel-neu' not in result['server'],flush=True)
  c.close()
  # A second real app tab advances the shared localStorage metadata. Mirror its
  # mock server row to the first tab so both talk to the same logical server.
  c,s=start('', ['Start'])
  s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  initial=s.evaluate("FAKE.db.lernstand")
  t=c.new_page();t.add_init_script("FAKE.db.lernstand="+json.dumps(initial))
  t.goto(url+'app.html#ich');t.wait_for_function("window.AP && AP.lernstandSync && AP.lernstandSync.status().art==='aktuell'")
  t.evaluate("AP.stand.lesezeichen.push({zu:'Tab2-neu',titel:'Tab2-neu',lernfeld:'lf1'});AP.sofortSichern()")
  t.wait_for_function("FAKE.db.lernstand[0].version>=2")
  snapshot=t.evaluate("FAKE.db.lernstand")
  s.evaluate("rows=>{FAKE.db.lernstand=rows}",snapshot)
  s.evaluate('AP.lernstandSync.abgleichen()');s.wait_for_function("AP.lernstandSync.status().art==='aktuell'")
  print('S03 Tab1 nach Abgleich mit gemeinsamem Stand v2:',s.evaluate("({stand:AP.stand.lesezeichen.map(x=>x.zu),meta:JSON.parse(localStorage.getItem('azubipass-lernsync'))})"),flush=True)
  s.evaluate("AP.stand.lesezeichen.push({zu:'Tab1-neu',titel:'Tab1-neu',lernfeld:'lf1'});AP.sofortSichern()")
  s.wait_for_function("FAKE.db.lernstand[0].version>=3")
  final=s.evaluate("FAKE.db.lernstand[0].daten.lesezeichen.map(x=>x.zu)")
  print('S03 Server nach Änderung in Tab1:',final,'TAB2_SERVERAENDERUNG_VERLOREN=', 'Tab2-neu' not in final,flush=True)
  c.close();browser.close()
