"""Gezielte Review-Proben gegen echte Clientmodule, nur nachgebildete Schnittstelle."""
import sys,functools,socketserver,threading,json,base64
from pathlib import Path
sys.path.insert(0,str(Path(sys.argv[1]).resolve()/'quellen'))
import community_korrekturen_test as basis
import community_bilder_test as bilder
from playwright.sync_api import sync_playwright
OUT=Path(__file__).resolve().parent
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(basis.Stiller,directory=str(basis.DOCS))) as srv:
 threading.Thread(target=srv.serve_forever,daemon=True).start()
 url=f'http://127.0.0.1:{srv.server_address[1]}/app.html#'
 with sync_playwright() as p:
  browser=p.chromium.launch()
  def seite(skript='',speicher=bilder.SPEICHER_JS,ziel='community'):
   c=browser.new_context(viewport={'width':390,'height':844},service_workers='block',locale='de-DE')
   for js in [basis.FAKE_JS,speicher,skript]:
    if js:c.add_init_script(js)
   s=c.new_page();s.goto(url+ziel);s.wait_for_function('window.AP && AP.community && AP.communityBeitraege');return c,s
  ID='00000000-0000-4000-a000-0000000c0001'
  setup=f"FAKE.bildBeitrag('{ID}', 2, 'Bildprüfung');"
  png=base64.b64encode(basis.png()).decode()
  for name,storage in [('gueltig',bilder.SPEICHER_JS.replace('new Blob(["x"],',f'new Blob([Uint8Array.from(atob("{png}"),c=>c.charCodeAt(0))],')),('beschaedigt',bilder.SPEICHER_JS)]:
   c,s=seite(setup,storage,'community/beitrag/'+ID)
   s.wait_for_function("document.querySelector('.cm-galerie img')?.complete")
   s.wait_for_timeout(200)
   data=s.evaluate("({breite:document.querySelector('.cm-galerie img').naturalWidth,fehler:document.body.innerText.includes('Das Bild konnte nicht geladen werden.'),wiederholen:[...document.querySelectorAll('button')].filter(x=>x.textContent==='Erneut versuchen').length})")
   print('DEKODIERUNG',name,json.dumps(data))
   if name=='beschaedigt':s.screenshot(path=str(OUT/'beschaedigtes-bild.png'),full_page=True)
   c.close()
  c,s=seite(ziel='community/schreiben')
  s.get_by_label('Titel').fill('Bereinigung nach Netzfehler');s.locator('form.cm-schreiben textarea').fill('Text')
  s.locator('form.cm-schreiben input[type=file][multiple]').set_input_files([{'name':f'b{i}.png','mimeType':'image/png','buffer':basis.png()} for i in (1,2,3)])
  s.evaluate("""(() => { const c=window.supabase.createClient(),orig=c.storage.from; FAKE.loeschversuche=[];
    c.storage.from=(b)=>{const o=orig(b),rm=o.remove;o.remove=(pfade)=>{FAKE.loeschversuche.push(...pfade);return Promise.resolve({data:null,error:{message:'Netzwerkfehler',statusCode:'500'}})};return o};
    FAKE.plan.beitrag_mit_anhaengen=['503']; })()""")
  s.get_by_role('button',name='Beitrag veröffentlichen').click();s.get_by_text('Wir konnten nicht prüfen, ob dein Beitrag veröffentlicht wurde.',exact=False).wait_for()
  s.get_by_role('button',name='Eingaben ändern').click();s.get_by_text('Du kannst deine Eingaben jetzt ändern.',exact=False).wait_for()
  old=s.evaluate('FAKE.aufrufe.beitrag_mit_anhaengen[0].p_vorgang')
  print('BEREINIGUNG_NACH_FEHLER',json.dumps(s.evaluate("({dateien:Object.keys(FAKE.db.dateien).length,versuche:FAKE.loeschversuche.length,text:document.querySelector('form.cm-schreiben').innerText.slice(-500)})"),ensure_ascii=False))
  s.get_by_label('Titel').fill('Neuer Titel nach Bereinigung');s.get_by_role('button',name='Beitrag veröffentlichen').click();s.wait_for_function("location.hash.startsWith('#community/beitrag/')")
  print('BEREINIGUNG_NACH_NEUVERSAND',json.dumps(s.evaluate("old=>({alteDateien:Object.keys(FAKE.db.dateien).filter(x=>x.includes(old)).length,versuche:FAKE.loeschversuche.length,kennungen:FAKE.aufrufe.beitrag_mit_anhaengen.map(x=>x.p_vorgang),beitraege:FAKE.db.beitrag.length})",old)))
  c.close();browser.close()
