// Read-only counterchecks against the application's original evaluator.
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.resolve(__dirname, '../../..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'docs/mittel/aufgaben.json')));
const mem = new Map();
const ctx = {window:{AP:{beruf:()=> 'ik',probeklausurSchluessel:()=> 'review-ik-2'}},localStorage:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)},fetch:async()=>({json:async()=>data}),console};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'quellen/aufgaben.js'),'utf8'),ctx);
(async()=>{
 const P=ctx.window.APK.pruefstand; await P.laden();
 const cases=[];
 function test(id,base,answers,expectedScore,note){
  const b=data.bausteine.find(b=>b.id===id),w={...base};
  for(const [k,f] of Object.entries(b.abgeleitet||{})) w[k]=P.rechne(f,w);
  const a=Object.fromEntries(answers.map((v,i)=>[i,String(v)]));
  mem.set('review-ik-2',JSON.stringify({v:1,aufgaben:[id],werte:{[id]:w},antworten:{[id]:a}}));
  const result=P.bewerte(id);
  if(result.punkte!==expectedScore) throw Error(id+': unexpected score '+result.punkte);
  cases.push({id,base,derived:w,answers,expectedObservedScore:expectedScore,note,result});
 }
 test('ik2024-lf08-k06-01',{preis:26,var:12,menge:150,fix:300},[14,2100,1800],4,'Correct DB answers');
 test('ik2024-lf08-k06-01',{preis:26,var:12,menge:150,fix:300},[15,2250,1950],3,'I07 accepted consistent follow-through');
 test('ik2024-lf08-k06-01',{preis:26,var:12,menge:150,fix:300},[15,2240,1900],0,'Inconsistent answers rejected');
 test('ik2024-lf04-k04-01',{lep:1000,rabatt:10,skonto:2,fracht:20},[910,911.8],3,'Own target price used for skonto');
 test('ik2024-lf05-k04-02',{netto_basis:1000},[1100,209],1,'19% of own incorrect net');
 test('ik2024-lf08-k02-02',{fix:6000,var:3,menge:1000},[9100,9.1],2,'Own total divided by given quantity');
 test('ik2024-lf13-k04-02',{vorher:20,nachher:10},[12,60],2,'Own percentage-point change');
 test('ik2024-lf06-k07-02',{fix:1500,var:15,db:5,mehr:40},[300,200],4,'Correct: displayed quantity 340, profit 200');
 test('ik2024-lf06-k07-02',{fix:1500,var:15,db:5,mehr:40},[310,200],2,'Wrong threshold, correct profit at displayed quantity');
 test('ik2024-lf06-k07-02',{fix:1500,var:15,db:5,mehr:40},[310,250],0,'I11 fixed: no credit for profit at undisplayed quantity');
 test('ik2024-lf10-k02-04',{ak:10000,nd:5,jahre:2},[2000,6000],4,'I03: continued acquisition cost');
 test('ik2024-lf10-k02-04',{ak:10000,nd:5,jahre:2},[2100,5800],3,'Consistent depreciation follow-through');
 test('ik2024-lf12-k05-04',{grund:2500,zulage:200,lst:310,vl:40},[2750,550,1890,1800],6,'I09: full payroll example');
 test('ik2024-lf12-k05-04',{grund:2500,zulage:200,lst:310,vl:40},[2800,560,1930,1840],5,'Own gross consistently propagated');
 let depreciationVariants=0, payrollVariants=0;
 for(const ak of [10000,15000,20000]) for(const nd of [4,5]) for(const jahre of [2,3]) {
  const b=data.bausteine.find(b=>b.id==='ik2024-lf10-k02-04'),w={ak,nd,jahre};
  for(const [k,f] of Object.entries(b.abgeleitet)) w[k]=P.rechne(f,w);
  if(w.afa!==ak/nd || w.grenze!==ak*(nd-jahre)/nd) throw Error('Depreciation formula mismatch');
  depreciationVariants++;
 }
 for(let grund=2400;grund<=3000;grund+=100) for(const zulage of [100,200,300]) for(const lst of [250,300,350,400]) for(const vl of [20,40]) {
  const b=data.bausteine.find(b=>b.id==='ik2024-lf12-k05-04'),w={grund,zulage,lst,vl};
  for(const [k,f] of Object.entries(b.abgeleitet)) w[k]=P.rechne(f,w);
  const gross=grund+zulage+50, sv=Math.round(gross*20)/100;
  if(w.brutto!==gross || w.sv!==sv || w.netto!==gross-lst-sv || w.auszahlung!==grund+zulage-lst-sv-vl) throw Error('Payroll formula mismatch');
  payrollVariants++;
 }
 const taskIds=['ik2024-lf04-k04-01','ik2024-lf05-k04-02','ik2024-lf06-k07-02','ik2024-lf08-k02-02','ik2024-lf08-k06-01','ik2024-lf10-k02-04','ik2024-lf12-k05-04','ik2024-lf13-k04-02'];
 const matches=taskIds.map(id=>{
  const stem=id.replace(/-\d+$/,'');
  const source=JSON.parse(fs.readFileSync(path.join(root,'quellen',stem+'.aufgaben.json'))).bausteine.find(b=>b.id===id);
  const built=data.bausteine.find(b=>b.id===id);
  const fields=['variablen','abgeleitet','anzeige','eingabe'];
  const equal=fields.every(k=>JSON.stringify(source[k])===JSON.stringify(built[k]));
  if(!equal) throw Error(id+': source/build mismatch');
  return {id,sourceBuildMatch:equal};
 });
 console.log(JSON.stringify({applicationCommit:'7b93c0afd28491ee20105c4782f816b8ac14ec45',engine:'Original quellen/aufgaben.js in Node VM; no browser',depreciationVariants,payrollVariants,cases,matches},null,2));
})();
