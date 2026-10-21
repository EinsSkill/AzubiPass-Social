import threading,time,uuid,json,os
from concurrent.futures import ThreadPoolExecutor
import psycopg
from psycopg.types.json import Jsonb
cfg=dict(host=os.environ.get('PGHOST','127.0.0.1'),port=int(os.environ.get('PGPORT','54331')),dbname=os.environ.get('PGDATABASE','ap_review_2d2f478'),user='postgres')
u=str(uuid.uuid4())
with psycopg.connect(**cfg,autocommit=True) as root:
 root.execute("insert into auth.users(id,email,aud,role)values(%s,%s,'authenticated','authenticated')",(u,'sync-'+u+'@test.invalid'))
 root.execute("insert into public.zugangscode(code,bezeichnung)values('TEST-CAS-1','CAS')")
 with root.transaction():
  root.execute("select set_config('request.jwt.claims',%s,true)",(json.dumps({'sub':u,'role':'authenticated'}),))
  root.execute('set local role authenticated')
  root.execute("select public.profil_anlegen('CASProbe',2::smallint,'TESTCAS1',true,true)")
 def login(c):
  c.execute("select set_config('request.jwt.claims',%s,true)",(json.dumps({'sub':u,'role':'authenticated'}),));c.execute('set local role authenticated')
 def pair(basis,first,second):
  c=psycopg.connect(**cfg);login(c)
  r1=c.execute('select public.lernstand_speichern(%s,%s)',(Jsonb({'version':3,'fortschritt':{},'probe':first}),basis)).fetchone()[0]
  started=threading.Event()
  def another():
   with psycopg.connect(**cfg) as other:
    login(other);started.set()
    return other.execute('select public.lernstand_speichern(%s,%s)',(Jsonb({'version':3,'fortschritt':{},'probe':second}),basis)).fetchone()[0]
  with ThreadPoolExecutor() as ex:
   future=ex.submit(another);started.wait();time.sleep(.1)
   print('Basis',basis,'zweite Verbindung wartet:',not future.done(),flush=True)
   c.commit();r2=future.result(timeout=10)
  c.close();print('Basis',basis,'Ergebnisse:',json.dumps([r1,r2]),flush=True)
 pair(0,'erste Anlage','zweite Anlage')
 pair(1,'erste Änderung','zweite Änderung')
 root.execute('delete from auth.users where id=%s',(u,));root.execute("delete from public.zugangscode where code='TEST-CAS-1'")
 print('Rückstände:',root.execute('select count(*)from public.lernstand where nutzer_id=%s',(u,)).fetchone()[0],flush=True)
