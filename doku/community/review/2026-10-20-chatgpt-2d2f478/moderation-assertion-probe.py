import sys,inspect
from pathlib import Path
PROJECT=Path(__file__).resolve().parents[4]
sys.path.insert(0,str(PROJECT/'quellen'))
import community_moderation_test as m
original=m.pruefe
for folder in ([Path(sys.argv[1]),PROJECT] if len(sys.argv)>1 else [PROJECT]):
 m.basis.DOCS=folder/'docs'
 def check(ok,name,*args):
  if name=='Hinweis der Meldung sichtbar, ohne Namen':
   s=inspect.currentframe().f_back.f_locals['s']
   print(folder,'Originalassertion:',ok,'Route:',s.url,'H1:',s.locator('#community h1').text_content(),flush=True)
   s.get_by_text('Telefonnummer im Text',exact=True).wait_for()
   print(folder,'nach Warten aufs Detail:',s.get_by_text('Telefonnummer im Text').count(),flush=True)
   raise SystemExit(0)
  return original(ok,name,*args)
 m.pruefe=check
 try:m.main()
 except SystemExit:pass
