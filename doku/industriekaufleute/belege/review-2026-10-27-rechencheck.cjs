const fs = require('fs');
const vm = require('vm');
const root = require('path').resolve(__dirname, '../../..') + '/';
const data = JSON.parse(fs.readFileSync(root+'docs/mittel/aufgaben.json'));
const mem = new Map();
const ctx = {window:{AP:{beruf:()=> 'ik',probeklausurSchluessel:()=> 'review-ik'}},localStorage:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)},fetch:async()=>({json:async()=>data}),console};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+'quellen/aufgaben.js','utf8'),ctx);
(async()=>{
 const P=ctx.window.APK.pruefstand; await P.laden();
 const bs=data.bausteine.filter(b=>/^ik2024-lf(05|08|10|12)-/.test(b.id));
 let draws=0,numericTasks=0,fullAnswers=0; const errors=[];
 function assess(b,w,answers){mem.set('review-ik',JSON.stringify({v:1,aufgaben:[b.id],werte:{[b.id]:w},antworten:{[b.id]:answers}}));return P.bewerte(b.id);}
 for(const b of bs){
  if(!b.variablen)continue;
  const numeric=b.eingabe.every(e=>e.block==='zahl'); if(numeric)numericTasks++;
  for(let i=0;i<100;i++){
   const w=P.werteZiehen(b,'review-'+i);draws++;
   if(Object.values(w).some(v=>typeof v==='number'&&!Number.isFinite(v))) errors.push(b.id+': nonfinite');
   if(numeric){const answers=Object.fromEntries(b.eingabe.map((e,j)=>[j,String(typeof e.loesung==='number'?e.loesung:w[e.loesung]).replace('.',',')]));const a=assess(b,w,answers);if(a.punkte!==b.punkte)errors.push(b.id+': '+JSON.stringify(a));else fullAnswers++;}
  }
 }
 const cases=[];
 function check(id,base,expected,answers){const b=bs.find(b=>b.id===id),w={...base};for(const[k,f]of Object.entries(b.abgeleitet||{}))w[k]=P.rechne(f,w);for(const[k,v]of Object.entries(expected))if(Math.abs(w[k]-v)>1e-8)errors.push(id+': expected '+k+'='+v+', got '+w[k]);cases.push({id,base,expected,actual:expected&&Object.fromEntries(Object.keys(expected).map(k=>[k,w[k]])),score:answers?assess(b,w,answers):null});return {b,w};}
 const h=check('ik2024-lf10-k02-02',{material:10,fertigung:4,gemein:5,vertrieb:3,stueck:200},{hk:19,bestand:3800},{0:'20',1:'4000'});
 check('ik2024-lf05-k07-03',{ak:4800,monat:4},{jahresafa:1200,monate:9,erstjahr:900});
 check('ik2024-lf08-k05-01',{mek:80,mgk:5,fl:60,fgk:50,vwvt:8},{hk:174,sk:187.92},{0:'175',1:'189'});
 check('ik2024-lf10-k06-03',{ab:5000,ein1:20000,aus1:40000,ein2:55000,aus2:25000},{luecke:15000,feb:15000},{0:'16000',1:'14000'});
 check('ik2024-lf12-k05-02',{richtsatz:18,vorgabe:6,stueck:90},{minutenfaktor:0.3,lohn:162},{0:'0,4',1:'216'});
 check('ik2024-lf12-k07-02',{urlaub:30,monate:2,genommen:3},{anteil:5,rest:2},{0:'6',1:'3'});
 check('ik2024-lf08-k06-01',{preis:26,var:12,menge:150,fix:300},{db:14,gesamt_db:2100,ergebnis:1800},{0:'15',1:'2250',2:'1950'});
 const out={engine:'unchanged quellen/aufgaben.js in Node VM; no DOM/browser',draws,numericTasks,fullAnswers,errors,cases};
 console.log(JSON.stringify(out,null,2));
 if(errors.length)process.exitCode=1;
})();
