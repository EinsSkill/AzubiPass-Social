const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '../../..');
const data = JSON.parse(fs.readFileSync(path.join(root,'docs/mittel/aufgaben.json')));
const mem = new Map();
const ctx = {window:{AP:{beruf:()=> 'kfb',probeklausurSchluessel:()=> 'review-kfb'}},localStorage:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)},fetch:async()=>({json:async()=>data}),console};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'quellen/aufgaben.js'),'utf8'),ctx);
(async()=>{
 const P=ctx.window.APK.pruefstand;await P.laden();const errors=[],cases=[];
 const task=data.bausteine.find(b=>b.id==='buchfuehrung-k6-06');
 const source=JSON.parse(fs.readFileSync(path.join(root,'quellen/k6-umsatzsteuer.aufgaben.json'))).bausteine.find(b=>b.id===task.id);
 const sameSource=Object.keys(source).every(k=>JSON.stringify(task[k])===JSON.stringify(source[k]));
 if(!sameSource)errors.push('source/build task content differs');
 function evalTask(b,base){const w={...base};for(const[k,f]of Object.entries(b.abgeleitet||{}))w[k]=P.rechne(f,w);return w;}
 function assess(b,w,answer){mem.set('review-kfb',JSON.stringify({v:1,aufgaben:[b.id],werte:{[b.id]:w},antworten:{[b.id]:answer}}));return P.bewerte(b.id).punkte;}
 const fmt=n=>(n/100).toFixed(2).replace('.',',');
 let checked=0;
 for(let n=1000;n<=6000;n+=100){
  const w=evalTask(task,{netto:n});
  // Independent integer-cent arithmetic, not the source formula evaluator.
  const gross=n*119,discount=Math.round(gross*2/100),netDiscount=n*2,taxDiscount=discount-netDiscount,payment=gross-discount;
  const expected={brutto:gross,skonto_brutto:discount,skonto_netto:netDiscount,vst_korrektur:taxDiscount,zahlbetrag:payment};
  for(const[k,c]of Object.entries(expected))if(Math.abs(w[k]*100-c)>0.000001)errors.push(`${n}: ${k}`);
  const answer=[{seite:'soll',konto:'4400',betrag:fmt(gross)},{seite:'haben',konto:'2800',betrag:fmt(payment)},{seite:'haben',konto:'6001',betrag:fmt(netDiscount)},{seite:'haben',konto:'2600',betrag:fmt(taxDiscount)}];
  const score=assess(task,w,{0:answer}),reversed=assess(task,w,{0:[...answer].reverse()});
  if(score!==6||reversed!==6)errors.push(`${n}: correct booking score ${score}/${reversed}`);
  if(gross!==payment+netDiscount+taxDiscount)errors.push(`${n}: unbalanced`);
  if([1000,2500,6000].includes(n))cases.push({netto:n,expected_eur:Object.fromEntries(Object.entries(expected).map(([k,v])=>[k,v/100])),score,reversed});
  checked++;
 }
 // Check reproducible random draws and their bounds as used by the original app.
 for(let i=0;i<1000;i++){const w=P.werteZiehen(task,'skonto-'+i);if(w.netto<1000||w.netto>6000||w.netto%100)errors.push('random range');}
 const w=evalTask(task,{netto:1000});
 const wrong=[{seite:'soll',konto:'4400',betrag:'1190,00'},{seite:'haben',konto:'2800',betrag:'1166,20'},{seite:'haben',konto:'6001',betrag:'23,80'}];
 const wrongScore=assess(task,w,{0:wrong});if(wrongScore>=6)errors.push('missing tax correction accepted fully');
 const payroll=JSON.parse(fs.readFileSync(path.join(root,'quellen/k7-personal.kapitel.json')));
 const graphics=payroll.bloecke.flatMap(b=>b.inhalt||[]).filter(b=>b.typ==='grafik');
 const ladder=graphics.find(b=>b.variante==='kalkulationsleiter');
 let current=ladder.start.wert;const deductions={};
 for(const s of ladder.stufen){let amount;
  if(s.art==='abzug')amount=current*s.satz/100;
  else if(s.art==='abzug-vom-start')amount=ladder.start.wert*s.satz/100;
  else if(s.art==='abzug-von')amount=deductions[s.basis]*s.satz/100;
  else throw Error('unknown stage');
  deductions[s.id]=amount;current-=amount;
 }
 if(Math.abs(current-1850.25)>1e-8)errors.push('payroll ladder net');
 const booking=graphics.find(b=>b.variante==='t-konto');
 const balances=Object.fromEntries(booking.konten.map(k=>[k.id,0]));
 for(const t of booking.vorfaelle){const debit=t.soll.reduce((s,z)=>s+z.betrag,0),credit=t.haben.reduce((s,z)=>s+z.betrag,0);if(Math.abs(debit-credit)>1e-8)errors.push('payroll unbalanced '+t.text);for(const z of t.soll)balances[z.konto]+=z.betrag;for(const z of t.haben)balances[z.konto]-=z.betrag;}
 for(const k of ['vlst','vsv','vnetto'])if(Math.abs(balances[k]||0)>1e-8)errors.push('liability not zero '+k);
 const payrollExpected={employee_sv:3000*(8.75+9.3+1.3+1.8)/100,employer_sv:3000*(8.75+9.3+1.3+1.8)/100,net:3000-450-24.75-40.50-634.50,cost:3000+634.50};
 // Independent account closing, with positive debit balances.
 const close={rent:12000,sales:-35000,bank:50000,equity:-27000,guv:0,sbk:0};
 for(const [d,c,a]of [['guv','rent',12000],['sales','guv',35000],['guv','equity',23000],['sbk','bank',50000],['equity','sbk',50000]]){close[d]+=a;close[c]-=a;}
 if(Object.values(close).some(n=>n!==0))errors.push('closing balances');
 const investment={depreciation:(120000-20000)/8,averageCapital:(120000+20000)/2,interest:(120000+20000)/2*.05};investment.total=investment.depreciation+investment.interest+41000;
 const travel={tuesday:14,wednesday:28-28*.2-28*.4,thursday:14-28*.2};travel.total=Object.values(travel).reduce((a,b)=>a+b,0);
 console.log(JSON.stringify({application:'8166b36',engine:'original aufgaben.js in Node VM, no browser',all_new_task_values:checked,random_draws:1000,source_build_content_identical:sameSource,cases,missing_tax_score:wrongScore,payrollExpected,payroll_ladder_net:current,payroll_balances:balances,closing_balances:close,investment,travel,errors},null,2));
 if(errors.length)process.exitCode=1;
})();
