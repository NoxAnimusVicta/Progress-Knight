const artwork = ['Farmer','Fisherman','Miner','Squire','Concentration','Productivity','Bargaining','Strength','Homeless','Tent','Wooden hut','Book'];
function illustration(name) {
  const late = ['Knight','Archmage','Dark Path','Light Path'].indexOf(name);
  if (late >= 0) {
    const position = (late % 2)*100+'% '+Math.floor(late/2)*100+'%';
    return '<span aria-hidden="true" class="art late" style="background-position:'+position+'"></span>';
  }
  const tile = artwork.indexOf(name);
  if (tile < 0) return '';
  return '<span class="art" aria-hidden="true" style="background-position:'+(-52*(tile%4))+'px '+(-52*Math.floor(tile/4))+'px"></span>';
}

function chooseHero(){if(!s.hero){screenEl.innerHTML='<h1>Choose your character</h1><p>Begin at age fourteen. Your calling shapes what you learn fastest.</p><div class="grid">'+['Magnus','Isabella'].map((n,i)=>'<button class="hero '+(choice===n?'on':'')+'" data-act="choose:'+n+'"><img src="'+n+'.png" alt=""><section><strong>'+n+'</strong><small>'+['Student of the arcane arts','Aspiring knight of the realm'][i]+'</small><br><span class="gold">'+['Magic','Military'][i]+' jobs XP ×1.1</span></section></button>').join('')+'</div><button class="primary" data-act="begin">Begin as '+choice+' →</button>';return}
}
// Each prerequisite names an activity and its required level in the current life.
const careers = [
 ['Common work','Beggar',2],['Common work','Farmer',5,'Beggar',3],['Common work','Fisherman',12,'Farmer',8],['Common work','Miner',30,'Fisherman',10],['Common work','Blacksmith',80,'Miner',16,'Strength',8],['Common work','Merchant',240,'Blacksmith',18,'Bargaining',16],['Common work','Master Merchant',720,'Merchant',25,'Productivity',25],
 ['Military','Squire',13,'Strength',5],['Military','Footman',32,'Squire',8],['Military','Veteran',70,'Footman',12,'Battle Tactics',8],['Military','Knight',145,'Veteran',16],['Military','Captain',320,'Knight',20,'Battle Tactics',18],['Military','General',850,'Captain',25,'Leadership',16],
 ['Arcane Association','Arcane Student',10,'Concentration',8],['Arcane Association','Apprentice Mage',35,'Arcane Student',10,'Meditation',6],['Arcane Association','Mage',100,'Apprentice Mage',15,'Mana Control',10],['Arcane Association','Archmage',300,'Mage',20,'Mana Control',18],['Arcane Association','Council Elder',950,'Archmage',24,'Longevity',12],
 ['Dark Path','Acolyte of Ash',160,'Shadow Lore',8],['Dark Path','Dread Knight',580,'Acolyte of Ash',18,'Knight',12],['Dark Path','Gatekeeper',1500,'Dread Knight',24,'Soulbinding',15],
 ['Light Path','Dawnkeeper',220,'Radiance',8],['Light Path','Seraph',800,'Dawnkeeper',18,'Archmage',12],['Light Path','Herald of Dawn',2200,'Seraph',24,'Grace',15]
];
const training = [
 ['Fundamentals','Concentration','Skill XP'],['Fundamentals','Productivity','Job XP'],['Fundamentals','Bargaining','Reduced upkeep'],['Fundamentals','Discipline','All XP','Concentration',15,'Productivity',12],
 ['Combat','Strength','Military pay'],['Combat','Battle Tactics','Military XP','Strength',10],['Combat','Leadership','All income','Battle Tactics',15,'Knight',8],
 ['Magic','Meditation','Arcane XP','Concentration',8],['Magic','Mana Control','Arcane pay','Meditation',10],['Magic','Longevity','Extra years','Mana Control',15],
 ['Dark Path','Shadow Lore','Dark job XP'],['Dark Path','Soulbinding','All XP','Shadow Lore',18,'Acolyte of Ash',12],
 ['Light Path','Radiance','Light job XP'],['Light Path','Grace','All XP','Radiance',18,'Dawnkeeper',12]
];
const homes=[['Homeless',0,1],['Tent',13,1.4],['Wooden hut',89,2],['Cottage',220,3],['Townhouse',550,4.5],['Estate',1300,7]];
const gear=[['Book',9,'Skill XP ×1.5'],['Dumbbells',45,'Strength XP ×1.5'],['Personal Squire',179,'All job XP ×2'],['Steel Longsword',240,'Military XP ×2'],['Sapphire Charm',360,'Arcane XP ×2'],['Study Desk',610,'Skill XP ×2']];
const rites=[
 ['The whisper at dusk','Dark Path','Answer the whisper',1,'Knight',15,'Meditation',12,6000],
 ['The black gate','Dark Path','Break the black seal',1,'Gatekeeper',18,'Soulbinding',20,85000],
 ['The first light','Light Path','Kindle the lantern',2,'Archmage',18,'Longevity',10,45000],
 ['The last vigil','Light Path','Restore the dawn',2,'Herald of Dawn',24,'Grace',25,180000]
];
const key='personal-knight-v1';
const fresh=()=>({version:2,hero:'',day:0,coins:0,job:'Beggar',skill:'Concentration',xp:{},home:0,equipment:{},life:1,memory:{},rite:0,paused:false,speed:1,time:Date.now()});
let s=fresh(),choice='Magnus',tab='Jobs',notice='';
try{
 const old=JSON.parse(localStorage.getItem(key));
 if(old){s={...s,...old};if(old.version!==2){
   s.equipment=old.book?{Book:true}:{};
   s.rite=old.chapter>=1?2:0;
   s.version=2;notice='Your earlier career and remembered levels carried forward.';
 }}
}catch{}
const level=n=>Math.floor(Math.sqrt((s.xp[n]||0)/8));
const factor=(n,k=.025)=>1+level(n)*k;
const age=()=>14+Math.floor(s.day/365);
const limit=()=>70+Math.min(100,level('Longevity')*2);
const ended=()=>age()>=limit()||s.rite===4;
const money=n=>Math.floor(n).toLocaleString();
const jobMap=new Map(careers.map(x=>[x[1],x]));
const baseLife=()=>s.life-1;
const remembered=n=>1+(s.memory[n]||0)*.1;
const has=n=>!!s.equipment[n];
const discount=()=>factor('Bargaining',.035);
const cost=()=> (homes[s.home][1]+gear.reduce((a,[n,p])=>a+(has(n)?p:0),0))/discount();
function income(n=s.job){
 const [group,,pay]=jobMap.get(n);
 const specialty=group==='Military'?factor('Strength'):group==='Arcane Association'?factor('Mana Control'):1;
 return pay*(1+level(n)*.08)*specialty*factor('Leadership');
}
function rate(n,isJob){
 let x=homes[s.home][2]*remembered(n)*factor('Discipline',.015)*factor('Soulbinding',.02)*factor('Grace',.02);
 if(!isJob)return x*factor('Concentration')*(has('Book')?1.5:1)*(has('Study Desk')?2:1)*(n==='Strength'&&has('Dumbbells')?1.5:1);
 const group=jobMap.get(n)[0];x*=factor('Productivity')*(has('Personal Squire')?2:1);
 if(group==='Military')x*=factor('Battle Tactics')*(has('Steel Longsword')?2:1)*(s.hero==='Isabella'?1.1:1);
 if(group==='Arcane Association')x*=factor('Meditation')*(has('Sapphire Charm')?2:1)*(s.hero==='Magnus'?1.1:1);
 if(group==='Dark Path')x*=factor('Shadow Lore');
 if(group==='Light Path')x*=factor('Radiance');
 return x;
}
function day(){
 if(s.coins+income()<cost()){s.home=0;s.equipment={};notice='Your coin ran out. Paid upkeep ended.'}
 s.coins+=income()-cost();
 const work=rate(s.job,true),study=rate(s.skill,false);
 s.xp[s.job]=(s.xp[s.job]||0)+work;s.xp[s.skill]=(s.xp[s.skill]||0)+study;s.day++;
}
function save(){try{localStorage.setItem(key,JSON.stringify(s))}catch{notice='This browser could not save your progress.'}}
function advance(){
 const now=Date.now(),ticks=Math.min(86400,Math.floor((now-s.time)/1000));
 if(ticks<=0)return;
 s.time=now-(now-s.time)%1000;
 if(s.hero&&!s.paused)for(let i=0;i<ticks*s.speed*4&&!ended();i++)day();
 save();
}
function rebirth(){
 if(age()<30||s.rite===4)return;
 for(const n in s.xp)s.memory[n]=Math.max(s.memory[n]||0,level(n));
 s={...fresh(),hero:s.hero,life:s.life+1,memory:s.memory,rite:s.rite,speed:s.speed};
 tab='Jobs';notice='Your new life begins with the learning bonuses from your best levels.';
}
function needs(entry){
 const list=[];
 if(entry[0]==='Dark Path'&&s.rite<1)list.push('Answer the whisper');
 if(entry[0]==='Light Path'&&s.rite<3)list.push('Kindle the lantern');
 for(let i=3;i<entry.length;i+=2){if(level(entry[i])<entry[i+1])list.push(entry[i]+' '+level(entry[i])+'/'+entry[i+1])}
 return list;
}
function riteNeeds(){
 const [,,,l,j,jl,k,kl,c]=rites[s.rite],list=[];
 if(baseLife()<l)list.push('Rebirths '+baseLife()+'/'+l);
 if(level(j)<jl)list.push(j+' '+level(j)+'/'+jl);
 if(level(k)<kl)list.push(k+' '+level(k)+'/'+kl);
 if(s.coins<c)list.push(money(s.coins)+'/'+money(c)+' coins');
 return list;
}
function completeRite(){if(s.rite<4&&!riteNeeds().length){s.coins-=rites[s.rite][8];s.rite++;notice=['The dark arts are open.','The black seal is broken.','The dawn arts are open.','The dawn returns.'][s.rite-1]}}
const btn=(a,label,active=false,locked=false)=>'<button data-act="'+a+'" class="'+(active?'on':'')+'" '+(locked?'disabled':'')+'>'+label+'</button>';
function row(action,name,info,side,active,locked=false){return '<button class="row '+(active?'on':'')+'" data-act="'+action+'" '+(locked?'disabled':'')+'>'+illustration(name)+'<span><b>'+name+'</b><small>'+info+'</small></span><span class="right">'+side+'</span></button>'}
function meter(n){
 const l=level(n),earned=(s.xp[n]||0)-8*l*l,needed=8*(2*l+1);
 return 'Lv. '+l+'<div class="bar"><i style="width:'+100*earned/needed+'%"></i></div>';
}
function skillEffect(n,label){
 if(n==='Longevity')return '+'+(limit()-70)+' years of life';
 const value=n==='Bargaining'?1/discount():factor(n,n==='Discipline'?.015:['Grace','Soulbinding'].includes(n)?.02:.025);
 return label+' ×'+value.toFixed(2);
}
function activities(isJob){
 let last='',html='';
 for(const entry of isJob?careers:training){
  const [g,n,e]=entry,missing=needs(entry);
  if(g!==last){html+='<h3>'+g+'</h3>';last=g}
  const active=n===(isJob?s.job:s.skill);
  const available=active||!missing.length;
  const info=isJob?money(income(n))+' coins/day':skillEffect(n,e);
  html+=row((isJob?'job:':'skill:')+n,n,available?info+' · '+rate(n,isJob).toFixed(1)+' XP/day':missing.join(' · '),meter(n),active,!available);
 }
 return html;
}
function shop(){return '<h3>Property</h3>'+homes.map(([n,c,h],i)=>row('home:'+i,n,'×'+h+' learning',money(c/discount())+' / day',s.home===i)).join('')+'<h3>Equipment</h3>'+gear.map(([n,c,e])=>row('gear:'+n,n,e,money(c/discount())+' / day',has(n))).join('')}
function paths(){
 const [title,path,act,,,,,,c]=rites[s.rite],missing=riteNeeds();
 return illustration(path)+'<h2>'+title+'</h2><p>'+['A voice calls from beyond the fields. Master steel and still your mind to hear it.','Rise through the dark order and bind the soul of its gatekeeper.','Carry what you learned into a second rebirth. The Arcane Association guards the first spark.','Train among the dawnkeepers and bring the light home.'][s.rite]+'</p>'+row('path',act,missing.join(' · ')||'Ready to complete',money(c)+' coins',false,!!missing.length)+'<p>Rites completed '+s.rite+' / 4</p>';
}
function legacy(){
 const records=Object.keys({...s.memory,...s.xp}).sort((a,b)=>level(b)-level(a));
 return '<h2>Rebirth</h2><p>From age 30 you can start a new life. Your coin, property and current levels reset. Each best level gives that activity 10% faster XP in future lives. Completed rites carry forward.</p>'+btn('confirmRebirth',age()<30?'Available at age 30':'Review next life',false,age()<30)+'<h3>Learning carried into the next life</h3>'+records.map(n=>'<p>'+n+' · best level '+Math.max(level(n),s.memory[n]||0)+' · ×'+(1+.1*Math.max(level(n),s.memory[n]||0)).toFixed(1)+' XP</p>').join('');
}
const screenEl=document.querySelector('#screen');let reviewing=false;
function render(){
 if(!s.hero){chooseHero();return}
 let body='';
 if(s.rite===4)body=illustration('Light Path')+'<h1>The dawn returns.</h1><p>'+s.hero+' restored the dawn in life '+s.life+'. All four rites are complete.</p>';
 else if(reviewing||ended())body='<h2>'+ (ended()?'A life remembered':'Begin another life?')+'</h2><p>Your best levels and completed rites carry forward. Your coin and equipment return to zero.</p>'+btn('rebirth','Begin life '+(s.life+1))+(ended()?'':btn('cancel','Keep playing'));
 else if(tab==='Shop')body=shop();else if(tab==='Paths')body=paths();else if(tab==='Legacy')body=legacy();else body=activities(tab==='Jobs');
  const nav=['Jobs','Skills','Shop','Paths','Legacy'];
 const next=careers.find(e=>e.slice(3).some((v,i)=>i%2===0&&v===s.job)&&needs(e).length);
 const target=next?'<small>Next promotion · '+next[1]+' · '+needs(next).join(' · ')+'</small>':'';
 screenEl.innerHTML='<section class="card profile"><img src="'+s.hero+'.png" alt=""><div><h2>'+s.hero+'</h2>Life '+s.life+' · Age '+age()+' · Day '+s.day%365+' · Lifespan '+limit()+'<br><span class="gold">◉ '+money(s.coins)+' · '+(income()-cost()).toFixed(1)+' / day</span></div></section>'+(!ended()?'<section class="card"><b>Working · '+s.job+'</b>'+meter(s.job)+'<b>Training · '+s.skill+'</b>'+meter(s.skill)+target+'</section><nav>'+nav.map(n=>btn('tab:'+n,n,n===tab)).join('')+'</nav>':'')+'<section class="card">'+body+'</section>'+(!ended()?'<nav>'+btn('pause',s.paused?'Resume':'Pause')+btn('speed','Speed ×'+s.speed)+'</nav>':'')+'<footer>'+(notice||'Saved on this device.')+'</footer>';
}
screenEl.onclick=e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 advance();const [a,v]=b.dataset.act.split(':');
 if(a==='choose')choice=v;
 if(a==='begin'){s.hero=choice;s.time=Date.now()}
 if(a==='rebirth'){rebirth();reviewing=false}
 if(!ended()){
  if(a==='tab'){tab=v;reviewing=false}
  if(a==='job'&&!needs(jobMap.get(v)).length)s.job=v;
  if(a==='skill'&&!needs(training.find(x=>x[1]===v)).length)s.skill=v;
  if(a==='home')s.home=Number(v);
  if(a==='gear')s.equipment[v]=!has(v);
  if(a==='path')completeRite();
  if(a==='confirmRebirth')reviewing=true;
  if(a==='cancel')reviewing=false;
  if(a==='pause')s.paused=!s.paused;
  if(a==='speed')s.speed=s.speed===1?5:1;
 }
 save();render();
};
advance();render();
setInterval(()=>{advance();if(s.hero&&!document.querySelector('button:active'))render()},1000);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

