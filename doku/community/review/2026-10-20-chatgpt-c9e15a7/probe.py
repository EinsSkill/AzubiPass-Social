import sys,functools,http.server,socketserver,threading,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]
sys.path.insert(0,str(ROOT/'quellen'))
import community_korrekturen_test as b
import community_gruppen_test as g
from playwright.sync_api import sync_playwright
out=Path(__file__).resolve().parent
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(b.Stiller,directory=str(b.DOCS))) as server:
 threading.Thread(target=server.serve_forever,daemon=True).start()
 with sync_playwright() as p:
  browser=p.chromium.launch()
  def page(ziel='heute',extra=''):
   c=browser.new_context(viewport={'width':390,'height':844},service_workers='block')
   c.add_init_script(b.FAKE_JS);c.add_init_script(g.GRUPPEN_JS)
   c.add_init_script("FAKE.aufgabeAnlegen(null,'Private Wochenaufgabe');"+extra)
   s=c.new_page();s.goto(f'http://127.0.0.1:{server.server_address[1]}/app.html#{ziel}')
   s.wait_for_function('window.AP && AP.communityGruppen');return c,s
  c,s=page();s.locator('.hm-aufgabe').wait_for()
  print('Heute vor Logout:',s.locator('.hm-aufgabe').inner_text(),flush=True)
  s.evaluate('FAKE.anmelden(null)');s.wait_for_timeout(100)
  print('Heute nach Logout noch sichtbar:',s.locator('.hm-aufgabe').is_visible(),flush=True)
  s.screenshot(path=str(out/'heute-logout.png'));c.close()
  c,s=page();s.locator('.hm-aufgabe').wait_for();c.set_offline(True);s.wait_for_timeout(100)
  print('Heute nach Offline noch sichtbar:',s.locator('.hm-aufgabe').is_visible(),flush=True);c.close()
  c,s=page(extra="FAKE.tabHalten.aufgabe_liste=1;")
  s.wait_for_function('(FAKE.gehalten.aufgabe_liste||[]).length>0')
  s.evaluate('FAKE.anmelden(null); FAKE.freigeben("aufgabe_liste")')
  s.wait_for_timeout(150)
  print('Späte Aufgabe nach Logout sichtbar:',s.locator('.hm-aufgabe').count(),flush=True);c.close()
  c,s=page('community/gruppe/'+g.G1, "FAKE.db.mitglied.push({gruppe_id:'"+g.G1+"',nutzer_id:FAKE.ICH,rolle:'mitglied'});")
  s.get_by_role('heading',name='Offene Lerngruppe',exact=True).wait_for()
  print('Gruppencode normales Mitglied:',s.locator('.cm-gruppencode').inner_text(),flush=True);c.close()
  c,s=page('community/gruppen',"FAKE.teamwerden();")
  s.get_by_role('heading',name='Lerngruppen',exact=True).wait_for()
  s.screenshot(path=str(out/'gruppen.png'));c.close()
  browser.close()
