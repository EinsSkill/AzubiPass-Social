import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const root=process.argv[2]?pathToFileURL(process.argv[2].replace(/\/$/,'')+'/'):new URL('../azubipass-review/',import.meta.url);
const evidence=process.argv[3]?pathToFileURL(process.argv[3].replace(/\/$/,'')+'/'):new URL('../evidence/',import.meta.url);
const db=new PGlite({extensions:{pgcrypto}});
await db.waitReady;
await db.exec(await fs.readFile(new URL('supabase/tests/lokal/supabase_grundlage.sql',root),'utf8'));
const files=(await fs.readdir(new URL('supabase/migrations/',root))).filter(x=>x.endsWith('.sql')).sort();
for(const f of files){
 await db.exec(await fs.readFile(new URL('supabase/migrations/'+f,root),'utf8'));
 if(f==='20261021100000_anhang_1.sql'){
  console.log('ZWISCHENSTAND nach anhang_1');
  const q=(await fs.readFile(new URL('migration-zwischenstand-1.sql',evidence),'utf8')).replace(/^\\set.*$/gm,'');
  for(const r of await db.exec(q))if(r.rows?.length)console.log(JSON.stringify(r.rows));
 }
}
console.log('ENDSTAND nach anhang_4');
const q=(await fs.readFile(new URL('migration-zwischenstand-2.sql',evidence),'utf8')).replace(/^\\set.*$/gm,'');
for(const r of await db.exec(q))if(r.rows?.length)console.log(JSON.stringify(r.rows));
console.log('VOLLSTAENDIGER ANHANGTEST (beabsichtigte ERGEBNIS-Ausnahme rollt Testdaten zurück)');
try{await db.exec(await fs.readFile(new URL('supabase/tests/anhang_test.sql',root),'utf8'));console.log('WARNUNG: keine ERGEBNIS-Ausnahme');}
catch(e){if(e.message.includes('ERGEBNIS:'))console.log(e.message);else throw e;}
await db.close();
console.log('SAUBERE GEGENPROBE: neue isolierte Datenbank, alle Migrationen ohne Zwischenpublikation');
const clean=new PGlite({extensions:{pgcrypto}});
await clean.waitReady;
console.log('Postgresversion',JSON.stringify((await clean.query('select version()')).rows));
await clean.exec(await fs.readFile(new URL('supabase/tests/lokal/supabase_grundlage.sql',root),'utf8'));
for(const f of files)await clean.exec(await fs.readFile(new URL('supabase/migrations/'+f,root),'utf8'));
try{await clean.exec(await fs.readFile(new URL('supabase/tests/anhang_test.sql',root),'utf8'));console.log('WARNUNG: keine ERGEBNIS-Ausnahme');}
catch(e){if(e.message.includes('ERGEBNIS:')){console.log(e.message);if(e.message.includes('FEHLER:')||!e.message.includes('invariante=0'))process.exitCode=1;}else throw e;}
await clean.close();
