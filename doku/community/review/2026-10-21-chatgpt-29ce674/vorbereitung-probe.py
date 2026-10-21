"""Echte Bildvorbereitung mit angehaltener Dekodierung; Server nur nachgebildet."""
import sys, functools, socketserver, threading, base64, json
from pathlib import Path
sys.path.insert(0,str(Path(sys.argv[1]).resolve()/'quellen'))
import community_korrekturen_test as basis
import community_bilder_test as bilder
from playwright.sync_api import sync_playwright
OUT=Path(__file__).resolve().parent
HALTEN="""(() => {const alt=window.createImageBitmap.bind(window); window.bildWartet=[];
window.createImageBitmap=(...a)=>new Promise((ja,nein)=>bildWartet.push(()=>alt(...a).then(ja,nein)));
window.bilderWeiter=()=>{let a=bildWartet.splice(0);a.forEach(f=>f());return a.length;};})();"""
with socketserver.TCPServer(('127.0.0.1',0),functools.partial(basis.Stiller,directory=str(basis.DOCS))) as srv:
 threading.Thread(target=srv.serve_forever,daemon=True).start()
 with sync_playwright() as p:
  browser=p.chromium.launch()
  def neu():
   ctx=browser.new_context(viewport={'width':390,'height':844},service_workers='block',locale='de-DE')
   for js in [basis.FAKE_JS,bilder.SPEICHER_JS.replace('%PNG64%',base64.b64encode(basis.png()).decode()),HALTEN]:ctx.add_init_script(js)
   s=ctx.new_page();s.goto(f'http://127.0.0.1:{srv.server_address[1]}/app.html#community/schreiben');s.get_by_label('Titel').wait_for()
   s.get_by_label('Titel').fill('Foto wird vorbereitet');s.locator('form.cm-schreiben textarea').fill('Dieser Text bleibt erhalten.')
   data=basis.png()+b'\0'*(5242881-len(basis.png()))
   s.locator('form.cm-schreiben input[type=file][multiple]').set_input_files([{'name':'foto.png','mimeType':'image/png','buffer':data}])
   s.wait_for_function('bildWartet.length===1')
   return ctx,s
  def stand(s):return s.evaluate("({bilder:document.querySelectorAll('.cm-bildwahl').length,senden:document.querySelector('form.cm-schreiben button[type=submit]').disabled,auswahl:document.querySelector('input[type=file][multiple]').disabled,status:document.querySelector('.cm-vorbereitung').textContent,titel:document.querySelector('form.cm-schreiben input[type=text]').value})")
  c,s=neu();print('NORMAL_VORHER',json.dumps(stand(s)));s.evaluate('bilderWeiter()');s.wait_for_function('document.querySelectorAll(".cm-bildwahl").length===1');print('NORMAL_NACHHER',json.dumps(stand(s)));c.close()
  c,s=neu();s.evaluate("location.hash='#heute'");s.wait_for_function("document.querySelector('#community').hidden")
  s.evaluate("location.hash='#community/schreiben'");s.get_by_label('Titel').wait_for();print('WIEDERKEHR_VORHER',json.dumps(stand(s)))
  s.get_by_label('Titel').fill('Neuer Titel im wieder geöffneten Formular')
  s.locator('form.cm-schreiben textarea').fill('Neuer Text im wieder geöffneten Formular')
  print('WIEDERKEHR_NEUE_EINGABE',json.dumps(stand(s)))
  s.evaluate('bilderWeiter()');s.wait_for_timeout(1000);print('WIEDERKEHR_NACHHER',json.dumps(stand(s)))
  s.screenshot(path=str(OUT/'vorbereitung-wiederkehr.png'),full_page=True)
  s.evaluate("location.hash='#heute'");s.wait_for_function("document.querySelector('#community').hidden");s.evaluate("location.hash='#community/schreiben'");s.get_by_label('Titel').wait_for();print('ERNEUT_OEFFNEN',json.dumps(stand(s)));c.close()
  c,s=neu();s.evaluate("FAKE.db.profil.push({id:FAKE.BEN,anzeigename:'Ben',rolle:'azubi'});FAKE.anmelden(FAKE.BEN_KONTO)");s.wait_for_timeout(300);s.evaluate('bilderWeiter()');s.wait_for_timeout(500)
  print('KONTOWECHSEL',json.dumps(s.evaluate("({bilder:document.querySelectorAll('.cm-bildwahl').length,alteNamen:document.body.innerText.includes('foto.jpg'),uploads:FAKE.hoch.reihe.length,rpc:FAKE.aufrufe.beitrag_mit_anhaengen?.length||0})")));c.close();browser.close()
