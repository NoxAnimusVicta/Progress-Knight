const saveKey = 'pk-remastered-191';
// Tables and prerequisites from Symb1/progress_knight_2 at c099d6f.
const voidCatalog=[
 {"name":"Corrupted","maxXp":100000000000000,"income":25000000,"group":"The Void","tile":0,"requirements":{"Age":250}},
 {"name":"Void Slave","maxXp":650000000000000,"income":200000000,"group":"The Void","tile":1,"requirements":{"Corrupted":30}},
 {"name":"Void Fiend","maxXp":18000000000000000,"income":600000000,"group":"The Void","tile":2,"requirements":{"Brainwashing":3000,"Void Slave":200}},
 {"name":"Abyss Anomaly","maxXp":18000000000000000,"income":1200000000,"group":"The Void","tile":3,"requirements":{"Mind Seize":3000,"Void Fiend":200}},
 {"name":"Void Wraith","maxXp":180000000000000000,"income":5000000000,"group":"The Void","tile":4,"requirements":{"Temporal Dimension":3400,"Abyss Anomaly":300}},
 {"name":"Void Reaver","maxXp":2600000000000000000,"income":25000000000,"group":"The Void","tile":5,"requirements":{"Void Amplification":3400,"Void Wraith":250}},
 {"name":"Void Lord","maxXp":28000000000000000000,"income":100000000000,"group":"The Void","tile":6,"requirements":{"Void Symbiosis":3800,"Void Reaver":150}},
 {"name":"Abyss God","maxXp":400000000000000000000,"income":1000000000000,"group":"The Void","tile":7,"requirements":{"Void Embodiment":4700,"Void Lord":750}},
 {"name":"Absolute Wish","maxXp":100,"description":"Void gain","group":"Void Manipulation","tile":0,"requirements":{"Void Slave":25,"Chairman":300}},
 {"name":"Void Amplification","maxXp":100,"effect":0.01,"description":"The Void XP","group":"Void Manipulation","tile":1,"requirements":{"Void Slave":100,"Absolute Wish":3000}},
 {"name":"Mind Seize","maxXp":100,"effect":0.0006,"description":"Reduced Happiness","group":"Void Manipulation","tile":2,"requirements":{"Void Amplification":3000}},
 {"name":"Ceaseless Abyss","maxXp":100,"effect":0.000585,"description":"Longer Lifespan","group":"Void Manipulation","tile":3,"requirements":{"Void Influence":4000,"Abyss Anomaly":50}},
 {"name":"Void Symbiosis","maxXp":100,"effect":0.0015,"description":"Ability XP","group":"Void Manipulation","tile":4,"requirements":{"Ceaseless Abyss":3500,"Void Reaver":50}},
 {"name":"Void Embodiment","maxXp":100,"effect":0.0025,"description":"Void gain","group":"Void Manipulation","tile":5,"requirements":{"Void Amplification":4600,"Void Lord":50}},
 {"name":"Abyss Manipulation","maxXp":100,"effect":-0.01,"description":"Reduced Expenses","group":"Void Manipulation","tile":6,"requirements":{"Abyss God":350,"Void Amplification":6000,"Void Influence":6000}},
 {"name":"Town Ruler","expense":35000000,"effect":120,"group":"Void properties","tile":0,"requirements":{"Coins":3500000000}},
 {"name":"City Ruler","expense":1100000000,"effect":500,"group":"Void properties","tile":1,"requirements":{"Coins":110000000000}},
 {"name":"Nation Ruler","expense":13000000000,"effect":1200,"group":"Void properties","tile":2,"requirements":{"Coins":1300000000000}},
 {"name":"Pocket Dimension","expense":49000000000,"effect":5000,"group":"Void properties","tile":3,"requirements":{"Coins":4900000000000}},
 {"name":"Void Realm","expense":121000000000,"effect":15000,"group":"Void properties","tile":4,"requirements":{"Coins":12100000000000}},
 {"name":"Void Universe","expense":2000000000000,"effect":30000,"group":"Void properties","tile":5,"requirements":{"Coins":200000000000000}},
 {"name":"Observatory","expense":140000000,"effect":5,"description":"Magic XP","group":"Void equipment","tile":0,"requirements":{"Coins":14000000000}},
 {"name":"Mind's Eye","expense":3250000000,"effect":10,"description":"Fundamentals XP","group":"Void equipment","tile":1,"requirements":{"Coins":325000000000}},
 {"name":"Void Necklace","expense":28050000000,"effect":3,"description":"Void Manipulation XP","group":"Void equipment","tile":2,"requirements":{"Coins":2805000000000}},
 {"name":"Void Armor","expense":197050000000,"effect":3,"description":"The Void XP","group":"Void equipment","tile":3,"requirements":{"Coins":19705000000000}},
 {"name":"Void Blade","expense":502050000000,"effect":3,"description":"Ability XP","group":"Void equipment","tile":4,"requirements":{"Coins":50205000000000}},
 {"name":"Void Orb","expense":1202050000000,"effect":3,"description":"Void Manipulation XP","group":"Void equipment","tile":5,"requirements":{"Coins":120205000000000}},
 {"name":"Void Dust","expense":25002050000000,"effect":3,"description":"The Void XP","group":"Void equipment","tile":6,"requirements":{"Coins":2500205000000000}},
 {"name":"Astral scholar","maxXp":1500000000000,"income":4000000,"group":"Advanced arcana","tile":0,"requirements":{"Chairman":120,"Super immortality":10}},
 {"name":"Archmage","maxXp":6000000000000,"income":16000000,"group":"Advanced arcana","tile":1,"requirements":{"Astral scholar":25,"Astral Body":50}},
 {"name":"Chronomancer","maxXp":24000000000000,"income":64000000,"group":"Advanced arcana","tile":2,"requirements":{"Archmage":25,"All Seeing Eye":50}},
 {"name":"Imperator","maxXp":9000000000000000,"income":256000000,"group":"Advanced arcana","tile":3,"requirements":{"Chronomancer":50,"Temporal Dimension":100}},
 {"name":"All Seeing Eye","maxXp":100,"effect":0.0027,"description":"T.A.A Pay","group":"Advanced arcana","tile":4,"requirements":{"Archmage":10}},
 {"name":"Temporal Dimension","maxXp":100,"effect":0.025,"description":"Gamespeed","group":"Advanced arcana","tile":5,"requirements":{"Chronomancer":25}},
 {"name":"Brainwashing","maxXp":100,"effect":-0.01,"description":"Reduced Expenses","group":"Advanced arcana","tile":6,"requirements":{"Imperator":100}},
 {"name":"Astral Body","maxXp":100,"effect":0.0035,"description":"Longer lifespan","group":"Advanced arcana","tile":7,"requirements":{"Astral scholar":10}},
 {"name":"Dark Knowledge","maxXp":100,"effect":0.003,"description":"Class XP","group":"Advanced dark magic","tile":0,"requirements":{"Evil":5000}},
 {"name":"Void Influence","maxXp":100,"effect":0.0028,"description":"All XP","group":"Void Manipulation","tile":1,"requirements":{"Void":1}},
 {"name":"Time Loop","maxXp":100,"effect":0.001,"description":"Gamespeed","group":"Advanced dark magic","tile":2,"requirements":{"Evil":2500000}},
 {"name":"Evil Incarnate","maxXp":100,"effect":0.0004,"description":"Ability XP","group":"Advanced dark magic","tile":3,"requirements":{"Evil":1000000000}}
];
// Angelic counterparts use the same thresholds and effects as the advanced Evil skills.
for(const [name,mirror,art] of [
 ['Sacred Knowledge','Dark Knowledge','Divine Blessing'],
 ['Celestial Influence','Void Influence',"Angel's Guidance"],
 ['Eternal Vigil','Time Loop','Pure Heart'],
 ['Grace Incarnate','Evil Incarnate','Bountiful Grace']
]){
 const source=voidCatalog.find(entry=>entry.name===mirror);
 entries[name]={...source,name,group:'Advanced Angelic',tile:entries[art].tile,requirements:{Angelic:mirror==='Void Influence'?50000:source.requirements.Evil}};
}
const pathResource={'Dark magic':'Evil','Advanced dark magic':'Evil','Light magic':'Angelic','Advanced Angelic':'Angelic','Void Manipulation':'Void'};
function ownsSkillPath(s,group){
 const key=pathResource[group];
 return !key||(s[key]>0&&(key!=='Void'||s.voidHeart));
}
for(const entry of voidCatalog)entries[entry.name]=entry;
// Paired alignment rewards share their economy and unlock thresholds.
for(const [side,home,relic,homeTile,relicTile] of [
 ['Evil','Ashen keep','Obsidian seal',0,2],
 ['Angelic','Dawn sanctuary','Ivory seal',1,3]
]){
 entries[home]={name:home,group:'Properties',side,tile:homeTile,expense:1200,effect:4.25,requirements:{[side]:1,Coins:120000}};
 entries[relic]={name:relic,group:'Misc',side,tile:relicTile,expense:600,effect:1.25,description:side+' skill XP',requirements:{[side]:25,Coins:60000}};
}
entries['Alignment Resonance']={
 name:'Alignment Resonance',group:'Advanced arcana',tile:entries['Meditation'].tile,
 maxXp:100,effect:0.005,description:'Alignment gain',requirements:{Archmage:25}
};
for(const [name,group,art,rank,required,expense,effect,description] of [
 ['Astral tower','Properties','Small palace','Astral scholar',10,6000000,85,'Happiness'],
 ['Celestial citadel','Properties','Grand palace','Archmage',25,45000000,225,'Happiness'],
 ['Planar sanctum','Properties','Mansion','Chronomancer',50,180000000,360,'Happiness'],
 ['Star chart','Misc','Book','Astral scholar',10,500000,1.2,'Advanced Magic skill XP'],
 ['Astral lens','Misc','Sapphire charm','Archmage',25,6000000,1.35,'Advanced Magic skill XP'],
 ['Chronometer','Misc','Study desk','Chronomancer',50,45000000,1.5,'Advanced Magic skill XP']
]){
 entries[name]={name,group,tile:entries[art].tile,rank,expense,effect,description,requirements:{[rank]:required,Coins:100*expense}};
}
const catalog = Object.values(entries);
function newLife() {
  return {days:5110, coins:0, job:'Beggar', skill:'Concentration', home:'Homeless',
    equipment:{}, levels:{}, xp:{}, unlocked:{}, memory:{}, hero:'', life:1,
    voidPath:false, voidHeart:false, heartPair:false, superHeart:false,  Void:0, Evil:0, Angelic:0, orbs:{}, finished:false, paused:false, warp:true, devSpeed:1, clock:Date.now()};
}
let state = newLife();
try {Object.assign(state,JSON.parse(localStorage.getItem(saveKey)))} catch {}
function removeOrbTraining(s){
 for(const name of ['Good Orb','Evil Orb']){
   if(s.skill===name)s.skill='Concentration';
   for(const key of ['levels','xp','memory','unlocked'])if(s[key])delete s[key][name];
 }
}
function migrateOldVoidTasks(s){
 if(s.job==='Adept Mage')s.job='Astral scholar';
 for(const key of ['xp','levels','memory','unlocked']){
   const values=s[key];
   if(values&&Object.hasOwn(values,'Adept Mage')){
     values['Astral scholar']=key==='unlocked'?true:Math.max(values['Astral scholar']||0,values['Adept Mage']);
     delete values['Adept Mage'];
   }
 }
 const aliases={'Rift keeper':'Corrupted','Rift scout':'Void Slave','Breach warden':'Void Fiend','Void regent':'Abyss God','Rift weaving':'Void Amplification','Void resonance':'Mind Seize','Void attunement':'Absolute Wish','Timelessness':'Astral Body','Void Heart':'Void Embodiment','Watch hut':'Town Ruler','Veiled cloister':'City Ruler','Chasm keep':'Nation Ruler'};
 for(const [old,name] of Object.entries(aliases)){
   for(const field of ['levels','xp','memory']){
     const data=s[field];if(data&&Object.hasOwn(data,old)){data[name]=Math.max(data[name]||0,data[old]);delete data[old]}
   }
   if(s.unlocked)delete s.unlocked[old];
   if(s.job===old)s.job='Beggar';
   if(s.skill===old)s.skill='Concentration';
   if(s.home===old)s.home='Homeless';
 }
}
function retireCity(s){
 const retired=['Night courier','Relay technician','Grid engineer','Neural link','Circuit design','Life support','Transit bunk','Skyline apartment'];
 if(s.crossedRift===true){
   for(const [field,fallback] of [['job','Beggar'],['skill','Concentration'],['home','Homeless']]){
     if(retired.includes(s[field]))s[field]=fallback;
   }
   for(const field of ['levels','xp','memory','equipment','unlocked']){
     if(s[field])for(const name of retired)delete s[field][name];
   }
 }
 delete s.crossedRift;delete s.chrono;
}
function migrateVoid(s){
 delete s.happinessUntil;delete s.acceleratingUntil;
 migrateOldVoidTasks(s);
 removeOrbTraining(s);
 retireCity(s);
 if(s.orbs?.Void){s.voidHeart=true;delete s.orbs.Void}
 if(s.voidHeart){
   s.voidPath=true;
   delete s.orbs.Evil;delete s.orbs.Angelic;
 }else if(s.orbs?.Evil&&s.orbs.Angelic){
   s.voidPath=true;s.finished=false;

 }
 if(entries[s.skill]?.group==='Void Manipulation'&&(!s.voidHeart||Object.entries(entries[s.skill].requirements).some(([key,target])=>(key==='Void'?s.Void:(s.levels?.[key]||0))<target)))s.skill='Concentration';
 if(entries[s.skill]&&!ownsSkillPath(s,entries[s.skill].group))s.skill='Concentration';
 return s;
}
migrateVoid(state);
function level(name){return state.levels[name] || 0}
function threshold(name){const l=level(name);return Math.round(entries[name].maxXp*(l+1)*1.01**l)}
function effect(name){
  const l=level(name), log=Math.log1p(l);
  if(['Bargaining','Intimidation','Healing Aura','Brainwashing','Abyss Manipulation'].includes(name))return Math.max(.1,1-log/Math.log(7)/10);
  if(['Immortality','Super immortality'].includes(name))return 1+log/Math.log(33);
  if(name==='Time warping')return 1+log/Math.log(13);
  if(['Blood meditation','Spiritual Meditation'].includes(name))return l*entries[name].effect;
  return 1+l*entries[name].effect;
}
const item=n=>state.equipment[n] ? entries[n].effect : 1;
const happy=()=>entries[state.home].effect*effect('Meditation')*item('Butler')/effect('Mind Seize');
const age=()=>Math.floor(state.days/365);
const heartXpMultiplier=()=>state.voidHeart?state.life*(state.superHeart?2:1):1;
const lifespan=()=>70*effect('Immortality')*effect('Super immortality')*effect('Astral Body')*effect('Ceaseless Abyss');
const dead=()=>state.days>=lifespan()*365;
function rate(n){
  const e=entries[n];
  // Remastered adds a constant x3 to every task XP multiplier list (1.9.1).
  let gain=30*heartXpMultiplier()*(1+(state.memory[n]||0)/10)*happy()*effect('Dark influence')*effect('Demon training')*effect('Divine Blessing')*effect("Angel's Guidance");
  if(e.income)gain*=effect('Productivity')*item('Personal squire');
  else gain*=effect('Concentration')*item('Book')*item('Study desk')*item('Library')*(state.orbs.Evil?5:1)*(state.orbs.Angelic?5:1);
  if(e.group==='Military')gain*=effect('Battle tactics')*item('Steel longsword')*(state.hero==='Isabella'?1.1:1);
  if(e.group==='The Arcane Association'||(e.group==='Advanced arcana'&&e.income))gain*=effect('Mana control')*(state.hero==='Magnus'?1.1:1);
  gain*=(state.voidHeart&&state.Void>=1?effect('Void Influence'):1)*effect('Celestial Influence');
  if(e.income)gain*=effect('Dark Knowledge')*effect('Sacred Knowledge');
  else gain*=effect('Void Symbiosis')*item('Void Blade')*effect('Evil Incarnate')*effect('Grace Incarnate');
  if(e.group==='Advanced arcana'&&!e.income)gain*=item('Star chart')*item('Astral lens')*item('Chronometer');
  if(e.group==='The Void')gain*=effect('Void Amplification')*item('Void Armor')*item('Void Dust');
  if(e.group==='Advanced dark magic')gain*=state.Evil;
  if(e.group==='Fundamentals')gain*=item("Mind's Eye");
  if(e.group==='Magic'||(e.group==='Advanced arcana'&&!e.income))gain*=item('Observatory');
  if(e.group==='Void Manipulation')gain*=Math.max(1,state.Void)*item('Void Necklace')*item('Void Orb');
  if(n==='Strength')gain*=effect('Muscle memory')*item('Dumbbells');
  if(e.group==='Magic'||(e.group==='Advanced arcana'&&!e.income))gain*=item('Sapphire charm');
  if(pathResource[e.group]==='Evil')gain*=item('Obsidian seal');
  if(pathResource[e.group]==='Angelic')gain*=item('Ivory seal');
  if(e.group==='Dark magic')gain*=state.Evil;
  if(e.group==='Light magic'||e.group==='Advanced Angelic')gain*=state.Angelic;
  return Math.round(gain);
}
function pay(n){return Math.round(entries[n].income*(['Advanced arcana','The Arcane Association'].includes(entries[n].group)?effect('All Seeing Eye'):1)*(1+Math.log10(level(n)+1))*effect("Demon's wealth")*effect('Bountiful Grace')*(entries[n].group==='Military'?effect('Strength'):1))}
function price(n){return Math.round(entries[n].expense*effect('Bargaining')*effect('Intimidation')*effect('Healing Aura')*effect('Brainwashing')*effect('Abyss Manipulation'))}
function upkeep(){return Object.keys(state.equipment).reduce((sum,n)=>sum+price(n),price(state.home))}
const recentGains=new Map();
let showLevelFeedback=true;
try{showLevelFeedback=localStorage.getItem('pk-level-feedback')!=='off'}catch{}
function levelGainLabel(name){
 const gain=recentGains.get(name);
 if(!showLevelFeedback||!gain||gain.life!==state.life||Date.now()-gain.time>1800)return '';
 const previous=state.memory[name]||0;
 return previous>0&&gain.from<=previous&&level(name)>previous?'Past life surpassed':'+'+(level(name)-gain.from)+' Lv.';
}
function gain(n,amount){
  const from=level(n);
  state.xp[n]=(state.xp[n]||0)+amount;
  while(state.xp[n]>=threshold(n)){state.xp[n]-=threshold(n);state.levels[n]=level(n)+1}
  if(showLevelFeedback&&level(n)>from&&!document.hidden){
    const last=recentGains.get(n),now=Date.now();
    const start=last&&last.life===state.life&&now-last.time<300?last.from:from;
    recentGains.set(n,{from:start,life:state.life,time:now});
  }
}
const shopEntries=catalog.filter(e=>e.expense!==undefined);
function voidShopItem(e){return e.group==='Void properties'||e.group==='Void equipment'}
function shopThreshold(e){return voidShopItem(e)?100*price(e.name):e.requirements.Coins}
function recordShopUnlocks(){
 for(const e of shopEntries){
   if(state.unlocked[e.name]||(voidShopItem(e)&&!state.voidHeart))continue;
   remaining(e.name);
 }
}
function nextVoidShop(){
 const lines=[];
 for(const [group,label] of [['Void properties','Next property'],['Void equipment','Next equipment']]){
   const next=shopEntries.find(e=>e.group===group&&remaining(e.name).length);
   if(next)lines.push('<p>'+label+' · '+next.name+'<br>'+state.coins.toLocaleString(undefined,{maximumFractionDigits:0})+' / '+shopThreshold(next).toLocaleString()+' coins</p>');
 }
 return lines.length?'<section class="card"><h3>Void shop unlocks</h3>'+lines.join('')+'</section>':'';
}
function remaining(n){
  const side=entries[n].side;
  if(side&&state[side]<entries[n].requirements[side])return [side+' '+formatVoid(state[side])+' / '+entries[n].requirements[side]];
  if(!ownsSkillPath(state,entries[n].group))return [pathResource[entries[n].group]+' required'];
  const voidSkill=entries[n].group==='Void Manipulation';
  if(!voidSkill&&state.unlocked[n])return [];
  const missing=Object.entries(entries[n].requirements).flatMap(([key,target])=>{
    if(key==='Coins')target=shopThreshold(entries[n]);
    const value=key==='Age'?age():key==='Coins'?state.coins:['Void','Evil','Angelic'].includes(key)?state[key]:level(key);
    return value>=target?[]:[key+' '+Math.floor(value).toLocaleString()+'/'+target.toLocaleString()];
  });
  if(!voidSkill&&!missing.length)state.unlocked[n]=true;
  return missing;
}
function step(days){
  days=Math.min(days,Math.max(0,lifespan()*365-state.days));
  if(!days||state.finished)return;
  recordShopUnlocks();
  const jobRate=rate(state.job),skillRate=rate(state.skill),net=pay(state.job)-upkeep();
  state.days+=days;state.coins+=net*days;
  if(state.coins<0){
    const fallback='Homeless';
    const released=[...(state.home!==fallback?[state.home]:[]),...Object.keys(state.equipment)];
    state.coins=0;state.home=fallback;state.equipment={};
    if(released.length)upkeepNotice='Insufficient funds for upkeep. Released: '+released.join(', ')+'.';
  }
  gain(state.job,jobRate*days);gain(state.skill,skillRate*days);
  recordShopUnlocks();
}
function embraceLabel(path,gain){return 'Embrace '+path+' (+'+gain.toFixed(2)+')'}
function alignmentPayout(base){return roundVoid(base*effect('Alignment Resonance'))}
function alignmentGain(side){return alignmentPayout(side==='Evil'?(effect('Evil control')+effect('Blood meditation')):(effect('Pure Heart')+effect('Spiritual Meditation')))}
// Bank in hundredths so small payouts accumulate exactly at relic thresholds.
function roundVoid(value){return Number(value.toFixed(2))}
function formatVoid(value){return value.toLocaleString(undefined,{maximumFractionDigits:2})}
function voidGain(){
 return state.voidHeart?alignmentPayout((1+level('Absolute Wish')*entries['Spiritual Meditation'].effect+level('Void Embodiment')*entries['Evil control'].effect)*(state.superHeart?2:1)):0;
}
// All levels are earned in the life in which the relic is claimed.
function relicRequirements(path){
 if(path==='Second Heart')return [['Age',age(),350],['Void Slave',level('Void Slave'),100],...voidCatalog.filter(e=>e.group==='Void Manipulation').map(e=>[e.name,level(e.name),e.name==='Abyss Manipulation'?100:50]),['Void',state.Void,800]];
 if(path==='Void')return [['End of this life',Number(dead()),1],['Evil Orb',Number(!!state.orbs.Evil),1],['Angelic Orb',Number(!!state.orbs.Angelic),1]];
 const group=path==='Evil'?'Dark magic':'Light magic';
 return [['Age',age(),300],[path,state[path],400],...catalog.filter(e=>e.group===group).map(e=>[e.name,level(e.name),e.name==="Demon's wealth"||e.name==='Bountiful Grace'?100:50])];
}
function relicReady(path){return relicRequirements(path).every(([,current,target])=>current>=target)}
function relicProgress(path){
 const name=path==='Void'?'Void Heart':path==='Second Heart'?'Second Void Heart':path+' Orb';
 return '<section class="card"><h3>'+name+' requirements</h3><ul>'+relicRequirements(path).map(([label,current,target])=>'<li>'+(current>=target?'✓ ':'')+label+' · '+(label.includes('Void')?formatVoid(current):fmt(current))+' / '+target+'</li>').join('')+'</ul></section>';
}
function choices(){

  if(state.voidPath&&state.heartPair&&!state.superHeart)return ['Super Void Heart'];
  if(age()<65)return [];
  if(state.voidPath&&state.voidHeart&&!state.superHeart&&relicReady('Second Heart'))return ['Second Heart','Embrace Void','Rebirth'];
  if(state.voidPath){
    const actions=['Rebirth'];
    if(state.voidHeart&&age()>=200)actions.unshift('Embrace Void');
    if(!state.voidHeart&&relicReady('Void'))actions.unshift('Void Heart');
    return actions;
  }
  
  const actions=['Rebirth'];

  if(age()>=200){
    const side=state.Evil?'Evil':state.Angelic?'Angelic':null;
    if(side){actions.push(side);if(!state.orbs[side]&&relicReady(side))actions.push(side+' orb')}
    else for(const path of ['Evil','Angelic'])if(!state.orbs[path])actions.push(path);
  }
  return actions;
}
function reset(action){
  if(!choices().includes(action))return;
  if(action==='Super Void Heart'){state.superHeart=true;state.heartPair=false;return}

  let {hero,life,Evil,Angelic,orbs}=state;
  const memory={};
  if(action==='Rebirth'){
    Object.assign(memory,state.levels);
  }
  else if(action==='Evil'){Evil+=alignmentGain('Evil');Angelic=0}
  else if(action==='Angelic'){Angelic+=alignmentGain('Angelic');Evil=0}
  if(action==='Embrace Void')state.Void=roundVoid(state.Void+voidGain());
  else if(action==='Second Heart')state.heartPair=true;
  else if(action==='Void Heart'){state.voidHeart=true;orbs={};Evil=0;Angelic=0}
  else if(action.endsWith(' orb')){orbs={...orbs,[action.split(' ')[0]]:true};Evil=0;Angelic=0}
  state={...newLife(),hero,heartPair:state.heartPair,superHeart:state.superHeart,Void:state.Void,voidHeart:state.voidHeart,voidPath:state.voidPath||Boolean(orbs.Evil&&orbs.Angelic),devSpeed:state.devSpeed,life:life+1,Evil,Angelic,orbs,memory};
}
function save(){if(launchView!=='playing')return;try{localStorage.setItem(saveKey,JSON.stringify(state))}catch{statusText='Save unavailable in this browser.'}}
let lastDeathShown=null;
let upkeepNotice='',idleNotice='';
let launchView='menu';
let tab='Jobs',chosen='Magnus',pending='',statusText='';
const screen=document.querySelector('#screen');
const compactNumber=new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:2});
function fmt(value){
 if(Math.abs(value)>=1e15)return value.toExponential(2);
 return Math.abs(value)>=1e6?compactNumber.format(value):Math.floor(value).toLocaleString();
}
function pathTheme(){
 if(state.voidHeart)return 'void';
 if(state.voidPath)return '';
 if(state.Evil)return 'evil';
 if(state.Angelic)return 'angelic';
 return '';
}
let alignmentUI=true;
try{alignmentUI=localStorage.getItem('pk-alignment-ui')!=='off'}catch{}

function sprite(i,size=54){
 return '<span aria-hidden="true" class="sprite" style="width:'+size+'px;height:'+size+'px;background-size:'+size*10+'px '+size*atlasRows+'px;background-position:'+(-size*(i%10))+'px '+(-size*Math.floor(i/10))+'px"></span>';
}
function alignmentArt(tile){
 return '<span aria-hidden="true" class="sprite" style="width:54px;height:54px;background-image:url(./alignment-shop.webp);background-size:108px 108px;background-position:'+(-54*(tile%2))+'px '+(-54*Math.floor(tile/2))+'px"></span>';
}
function catalogArt(entry){
 const index=voidCatalog.indexOf(entry);
 return '<span aria-hidden="true" class="sprite" style="width:54px;height:54px;background-image:url(./void-catalog.webp);background-size:432px 270px;background-position:'+(-54*(index%8))+'px '+(-54*Math.floor(index/8))+'px"></span>';
}
function voidArt(tile,size,label){
 return '<span role="img" aria-label="'+label+'" style="display:inline-block;flex:none;border-radius:6px;width:'+size+'px;height:'+size+'px;background:url(./void-icons.webp) '+(tile%3*50)+'% '+(Math.floor(tile/3)*50)+'%/300% 300%"></span>';
}
function portrait(){
 if(dead()&&state.voidHeart){
   const position=state.hero==='Isabella'?'right':'left';
   return '<span role="img" aria-label="'+state.hero+' · Void skeleton" style="display:inline-block;flex:none;width:76px;height:76px;border-radius:5px;background:url(./void-skeletons.webp) '+position+' center/200% 100%"></span>';
 }
 if(state.voidHeart){
   const years=age(),stage=years>=100?4:years>=65?3:years>=45?2:years>=30?1:0;
   const row=state.hero==='Isabella'?100:0;
   return '<span role="img" aria-label="'+state.hero+' · Void · age '+years+'" style="display:inline-block;flex:none;width:76px;height:76px;border-radius:5px;background:url(./void-forms.svg) '+(stage*25)+'% '+row+'%/500% 200%"></span>';
 }
 const alignment=state.Evil?'_evil':state.Angelic?'_angelic':'';
 const years=age();
 if(!dead() && years>=100 && !alignment){
   const variant=state.hero==='Isabella'?' isabella-100':'';
   return '<span role="img" aria-label="'+state.hero+', age '+years+'" class="centenarian'+variant+'"></span>';
 }
 const stage=dead()?'dead':years>=100?120:years>=65?60:years>=45?45:years>=30?30:14;
 const prefix='avatar_'+state.hero.toLowerCase()+'_';
 const tile=artIndex[prefix+stage+alignment]??artIndex[prefix+stage];
 return sprite(tile,76);
}
function button(action,label,selected=false){
 const isToggle=['tab','devSpeed','warp'].includes(action.split(':')[0]);
 const pressed=isToggle?' aria-pressed="'+Boolean(selected)+'"':'';
 return '<button data-act="'+action+'" class="'+(selected?'on':'')+'"'+pressed+'>'+label+'</button>';
}
function meter(n){
 const fraction=(state.xp[n]||0)/threshold(n);
 return '<div class="bar xp-track" data-meter="'+n+'"><i style="transform:scaleX('+fraction+')"></i></div>';
}
function daysPerSecond(now){
 const rested=now<(state.restedUntil||0)?state.restedSpeed:1;
 return 5*state.devSpeed*rested*(state.warp?effect('Time warping')*effect('Temporal Dimension')*effect('Time Loop')*effect('Eternal Vigil'):1);
}

let animatedBars=[], clockLabel, coinLabel, animationId;
function bindMotion(){
 if(!screen.querySelectorAll)return;
 animatedBars=Array.from(screen.querySelectorAll('[data-meter]')).filter(el=>{
   const n=el.dataset.meter;
   return n===state.job||n===state.skill;
 }).map(el=>{
   const n=el.dataset.meter;
   return {el,n,speed:rate(n),maximum:threshold(n)};
 });
 clockLabel=screen.querySelector('[data-clock]');
 coinLabel=screen.querySelector('[data-coins]');
}
function paintMotion(timestamp){
 if(!clockLabel)return;
 const now=Date.now();
 const elapsed=state.paused||dead()||state.finished?0:Math.max(0,Math.min(1,(now-state.clock)/1000));
 const days=Math.min(elapsed*daysPerSecond(now),Math.max(0,lifespan()*365-state.days));
 const date=state.days+days;
 clockLabel.textContent='Age '+Math.floor(date/365)+' · '+Math.floor(date%365)+' days';
 coinLabel.textContent=fmt(Math.max(0,state.coins+days*(pay(state.job)-upkeep())));
 for(const {el,n,speed,maximum} of animatedBars){
   let progress=(state.xp[n]||0)+days*speed;
   let limit=maximum, shownLevel=level(n);
   while(progress>=limit){
     progress-=limit;
     shownLevel++;
     limit=Math.round(entries[n].maxXp*(shownLevel+1)*1.01**shownLevel);
   }
   const label=el.previousElementSibling;
   if(label)label.textContent='Lv. '+shownLevel;
   el.firstElementChild.style.transform='scaleX('+progress/limit+')';
 }
}
function scheduleMotion(){
 if(typeof requestAnimationFrame==='undefined'||document.hidden||animationId!=null)return;
 const frame=t=>{
   animationId=undefined;
   if(document.hidden)return;
   paintMotion(t);
   if(state.hero&&!state.paused&&!dead()&&!state.finished)animationId=requestAnimationFrame(frame);
 };
 animationId=requestAnimationFrame(frame);
}
function showAdvancedMagic(){
 return (level('Chairman')>=120&&level('Super immortality')>=10)||catalog.some(e=>e.group==='Advanced arcana'&&(state.job===e.name||state.skill===e.name||state.unlocked[e.name]||level(e.name)>0));
}
function list(){
 const sections={Jobs:[['Common','Common work'],['Military','Military'],['Arcane','The Arcane Association',...(showAdvancedMagic()?['Advanced arcana']:[])],['Void',...(state.voidHeart?['The Void']:[])]],
    Skills:['Fundamentals','Combat','Magic',...(showAdvancedMagic()?['Advanced arcana']:[]),'Dark magic','Advanced dark magic','Light magic','Advanced Angelic','Void Manipulation'].map(group=>[group==='Advanced arcana'?'Advanced Magic':group,group]),
    Shop:[['Properties','Properties',...(state.voidHeart?['Void properties']:[])],['Equipment','Misc',...(state.voidHeart?['Void equipment']:[])]]};
 return sections[tab].map(([heading,...groups])=>{
  const candidates=catalog.filter(e=>groups.includes(e.group)&&ownsSkillPath(state,e.group)&&(e.group!=='Advanced arcana'||Boolean(e.income)===(tab==='Jobs'))&&(!e.rank||level(e.rank)>=e.requirements[e.rank])&&(!e.side||state[e.side]>=e.requirements[e.side]));
  if(heading==='Advanced Magic'){
   const order=['Astral Body','All Seeing Eye','Alignment Resonance','Temporal Dimension','Brainwashing'];
   candidates.sort((a,b)=>order.indexOf(a.name)-order.indexOf(b.name));
  }
  if(tab==='Shop')candidates.sort((a,b)=>shopThreshold(a)-shopThreshold(b));
  let preview='';
  const rows=candidates.map(e=>{
   const missing=remaining(e.name);
   if(missing.length){
     if(!preview)preview='<div class="skill-requirement"><img src="./required-lock.png" alt=""><div><b>REQUIRED</b><small>'+missing.join('　')+'</small></div></div>';
     return '';
   }
   const n=e.name,g=e.group;
   const selected=[state.job,state.skill,state.home].includes(n)||state.equipment[n];
   const feedback=selected&&e.maxXp?levelGainLabel(n):'';
   const xpNote=e.maxXp?(dead()?' · '+fmt(state.xp[n]||0)+' / '+fmt(threshold(n))+' XP':' · '+fmt(rate(n))+' XP/day'):'';
   const info=(n==='Absolute Wish'||n==='Void Embodiment')?('+'+voidGain()+' '+e.description):e.income?fmt(pay(n))+' coins/day':e.maxXp?(e.isPlusDescription?'+':'×')+effect(n).toFixed(2)+' '+e.description:'×'+e.effect+' '+(e.description||'Happiness');
   const action=e.income?'job':e.maxXp?'skill':(g==='Properties'||g==='Void properties')?'home':'gear';
   return '<button class="row '+(selected?'on':'')+(feedback?' recent-level':'')+'" aria-pressed="'+Boolean(selected)+'" data-act="'+action+':'+n+'">'+(e.side&&e.expense!==undefined?alignmentArt(e.tile):voidCatalog.includes(e)?catalogArt(e):sprite(e.tile))+'<span><b>'+n+'</b><small>'+(info+xpNote)+'</small></span><span class="right">'+(action==='gear'?(selected?'On · ':'Off · '):selected?(feedback?'<small class="row-status level-gain">'+feedback+'</small>':'<small class="row-status">✓ Active</small>'):'')+(e.maxXp?'<span>Lv. '+level(n)+'</span>'+meter(n):fmt(price(n))+' / day')+'</span></button>';
  }).join('');
  return rows||preview?'<h3>'+heading+'</h3>'+rows+preview:'';
 }).join('');
}
const amuletStory={
 found:'<h3>The copper eye · Age 25</h3><p>A peddler takes your last bent penny for a copper eye. That night you find the penny under your pillow. The eye is still around your neck.</p>',
 etching:'<h3>The inscription · Age 45</h3><p>The copper ticks against your collarbone. Under the tarnish is a date in your handwriting. It is the day you turned fourteen.</p>',
 eye:'<h3>A familiar room · Age 65</h3><p>The lid opens. Through it you see a narrow bed, a patched blanket, and your own young hand reaching for the morning light.</p>',
 paths:'<h3>Two centuries</h3><p>Two voices come through the eye. One belongs to someone you once fed. The other belongs to someone who feared you. Each remembers a different life you could have lived.</p>',
 evil:'<h3>The debt</h3><p>In the copper you can see every door that opened because its keeper feared your name. A red bead gathers on the rim. There is room for more.</p>',
 angelic:'<h3>The vigil</h3><p>The eye opens onto a bedside vigil. A stranger holds the lamp exactly as you taught her. The white spark above the wick follows you home.</p>',
 broken:'<h3>The setting cracks · Age 300</h3><p>A hairline split runs across the copper. Underneath, a stone has taken the colour of this life. The last thread holding it fast gives a little each time you practise your craft.</p>'
};
let inspectingAmulet=false;
function heartForge(){
 if(state.voidHeart||!state.orbs.Evil||!state.orbs.Angelic)return '';
 const ready=choices().includes('Void Heart');
 const needs=relicRequirements('Void').filter(([,value,target])=>value<target)
   .map(([label,value,target])=>label==='End of this life'?label:label.endsWith('Orb')?label:label+' '+formatVoid(value)+' / '+target);
 return '<section class="card"><button class="primary" data-act="ask:Void Heart" '+(ready?'':'disabled')+'>Create Void Heart</button><p>'+
   (ready?'Ready to fuse · consumes the amulet and both orbs.':'Requires · '+needs.join(' · '))+'</p></section>';
}
function amulet(){
 if(state.voidPath){
   const available=choices();
   const titles={'Void Heart':'Create Void Heart','Second Heart':'Draw out the second Heart','Super Void Heart':'Combine both Void Hearts','Embrace Void':embraceLabel('Void',voidGain()),Rebirth:'Rebirth with XP memories'};
   const passages={
     'Void Heart':'As your last breath leaves you, you press the two orbs into the copper eye. The copper softens around the two stones. The chain slips through your fingers as a violet heart takes its first beat beneath your ribs.',
     'Second Heart':'For a lifetime you have heard a second beat just behind your own. You open the amulet. Beside the first Heart, another has taken shape around a grain of Void.',
     'Super Void Heart':'You cradle one Heart in each hand. They beat against one another until you turn the second to fit the first. The seam closes.'
   };
   const title=state.superHeart?'Super Void Heart':state.heartPair?'Two Void Hearts':state.voidHeart?'Void Heart':'The twin sockets';
   const story=state.superHeart?'The Super Void Heart doubles your life-based XP bonus and your Void gain.':state.heartPair?'Two Hearts rest in the amulet. Turn them together to seal the bond.':state.voidHeart?'The fused orbs beat as one. From age 200, Embrace Void to gain Void and unlock Void Manipulation skills.':'The stones draw close whenever your pulse falters. At the end of this life, set them both into the copper eye to create the Void Heart.';
   const details=pending==='Void Heart'?'Consume the amulet and both orbs. Both orb XP bonuses end. Be reborn at 14 with the Void Heart. Current levels, possessions and XP memories reset.':pending==='Super Void Heart'?'The two Hearts become one. All job and skill XP becomes twice your life number. Void gain doubles permanently. This life continues.':pending==='Embrace Void'?'Gain '+voidGain()+' Void. Current levels and all previous XP memories are cleared.':pending==='Rebirth'?'Begin a new life with your current levels as XP memories.':'Begin a new life. Current levels and XP memories reset. Void and permanent bonuses carry over.';
   return '<h2>'+title+'</h2>'+(state.voidHeart?voidArt(8,90,title):sprite(artIndex.icons_amulet_65,76)+sprite(artIndex.icons_angelicorb,50)+sprite(artIndex.icons_evilorb,50))+'<p>'+story+'</p><p>Void · '+formatVoid(state.Void)+(state.voidHeart?'<br>Heart · all XP ×'+fmt(heartXpMultiplier())+'<br>Void · Void skill XP ×'+formatVoid(Math.max(1,state.Void)):'')+'</p>'+
     (!state.voidHeart?heartForge():!state.heartPair&&!state.superHeart?relicProgress('Second Heart'):'')+
     (state.voidHeart?nextVoidShop():'')+
     available.filter(a=>a!=='Void Heart').map(a=>button('ask:'+a,titles[a])).join(' ')+
     (pending?'<section class="card"><p>'+(passages[pending]||titles[pending])+'</p><p>'+details+'</p>'+button('accept',pending==='Embrace Void'?'Confirm Void':('Confirm '+pending))+' '+button('cancel','Keep playing')+'</section>':'');


 }
 const side=state.Evil?'evil':'angelic';
 const art=age()>=300&&(state.Evil||state.Angelic)?'broken_'+side:age()>=200?'200_'+side+'_transparent':age()>=65?'65':age()>=45?'45':'25';
 const actions=choices();
 const years=age();
 const chapter=years>=300&&(state.Evil||state.Angelic)?'broken':years>=200?(state.Evil?'evil':state.Angelic?'angelic':'paths'):years>=65?'eye':years>=45?'etching':'found';
 const inspection=years<65?'<p>The lid holds fast under your thumb.</p>':chapter==='eye'?'<p>Touch the eye to wake at fourteen. Your coins and equipment stay behind. Each remembered job or skill grants ×(1 + its level / 10) XP in your next life.</p><p>Concentration · ×'+(1+level('Concentration')/10).toFixed(1)+' next life. Around the rim are two hundred small notches.</p>':'';
 const artwork=sprite(artIndex['icons_amulet_'+art],90);
 return '<h2>Amulet</h2>'+(inspection?button('inspect',artwork+'<br>Inspect amulet'):artwork)+amuletStory[chapter]+heartForge()+
 (state.Evil&&!state.orbs.Evil?relicProgress('Evil'):state.Angelic&&!state.orbs.Angelic?relicProgress('Angelic'):'')+
 (inspectingAmulet?inspection:'')+
 actions.map(a=>button('ask:'+a,a==='Rebirth'?'Touch the eye':a.endsWith('orb')?sprite(artIndex['icons_'+a.split(' ')[0].toLowerCase()+'orb'],44)+' Claim '+(a==='Angelic orb'?'Angelic Orb':'Evil Orb')+' · ×5 skill XP':embraceLabel(a,alignmentGain(a)))).join(' ')+
 (pending?'<div class="card"><p>'+(pending==='Rebirth'?'Your current levels become your next life’s XP memories.':'This resets your current levels and XP memories. Your earned orbs carry forward.')+'</p>'+button('accept',pending==='Embrace Void'?'Confirm Void':('Confirm '+pending))+' '+button('cancel','Keep playing')+'</div>':'')+
 '<p>Lives lived · '+state.life+'<br>Evil · '+state.Evil.toFixed(2)+'　Angelic · '+state.Angelic.toFixed(2)+'</p>'+Object.keys(state.orbs).map(o=>sprite(artIndex['icons_'+o.toLowerCase()+'orb'])+' '+o+' orb').join(' ');
}
function render(){
 const focus=document.activeElement;
 const action=screen.contains?.(focus)?focus?.dataset?.act:null;
 draw();if(launchView==='playing'){bindMotion();scheduleMotion();}
 if(action){
   const replacement=Array.from(screen.querySelectorAll('button[data-act]')).find(b=>b.dataset.act===action);
   replacement?.focus({preventScroll:true});
 }
}
function draw(){
 if(launchView==='menu'){
   screen.innerHTML='<section class="launch main-menu"><img src="./icon-192.png" width="96" height="96" alt=""><h1>Progress Knight</h1><button type="button" class="primary" data-act="continue" '+(state.hero?'':'disabled')+'>Continue</button>'+(state.hero?'<p>'+state.hero+' · Life '+state.life+' · Age '+age()+'</p>':'')+'<button type="button" data-act="new-game">New Game</button></section>';
   return;
 }
 if(launchView==='playing'&&state.hero&&dead()&&lastDeathShown!==state){
   lastDeathShown=state;
   tab='Amulet';
   pending='';
 }

 const theme=pathTheme();
 if(document.body){
   document.body.dataset.path=alignmentUI?theme:'';
 }

 if(launchView==='characters'){
   const cards=['Magnus','Isabella'].map(name=>{
     const selected=chosen===name;
     const talent=name==='Magnus'?'Magic':'Military';
     const portrait=sprite(artIndex['avatar_'+name.toLowerCase()+'_14'],72);
     return `<button type="button" class="candidate ${selected?'on':''}" aria-pressed="${selected}" data-act="choose:${name}">${portrait}<span><strong>${name}</strong><small>Age 14</small><small class="talent">${talent} jobs XP ×1.1</small></span><span class="mark" aria-hidden="true">${selected?'✓':''}</span></button>`;
   }).join('');
   screen.innerHTML=`<section class="launch"><h1>Choose your character</h1><div class="roster">${cards}</div><button type="button" class="primary" data-act="begin">Continue as ${chosen}</button><button type="button" data-act="back-menu">Back</button></section>`;
   return;
 }
 const notice=[upkeepNotice,idleNotice].filter(Boolean).map(t=>'<p>'+t+'</p>').join('');
 const noticePanel=notice?'<aside class="card">'+notice+button('dismiss-notice','Dismiss')+'</aside>':'';
 const rested=Date.now()<(state.restedUntil||0)?' · Rested speed ×'+state.restedSpeed.toFixed(2):'';const top='<div class="card profile">'+portrait()+'<div>'+(theme?'<small class="path-stat">'+({evil:'Evil · '+fmt(state.Evil),angelic:'Angelic · '+fmt(state.Angelic),void:'Void · '+formatVoid(state.Void)})[theme]+'</small>':'')+'<b>'+state.hero+'</b> · Life '+state.life+'<br><span data-clock>Age '+age()+' · '+Math.floor(state.days%365)+' days</span> · Lifespan '+Math.floor(lifespan())+'<br><span class="gold">◉ <span data-coins>'+fmt(state.coins)+'</span> · '+fmt(pay(state.job)-upkeep())+' net/day</span><br>Happiness ×'+happy().toFixed(2)+rested+'</div></div>';
 const nav=['Jobs','Skills','Shop',...(age()>=25||state.voidPath?['Amulet']:[])];
 screen.innerHTML='<div class="play-controls">'+top+'<nav aria-label="Game sections">'+nav.map(t=>button('tab:'+t,t==='Amulet'&&state.voidHeart?'Heart':t,t===tab)).join('')+'</nav></div>'+noticePanel+'<section class="card">'+(tab==='Amulet'?amulet():list())+'</section><footer>'+state.job+' · Lv. '+level(state.job)+'　'+state.skill+' · Lv. '+level(state.skill)+'<p>'+button('pause',state.paused?'Resume':'Pause')+' '+(level('Time warping')?button('warp','Time warping '+(state.warp?'on':'off'),state.warp):'')+'</p>'+'<p>Developer speed　'+[1,5,20].map(v=>button('devSpeed:'+v,v+'×',state.devSpeed===v)).join(' ')+'</p>'+statusText+'</footer>';
}
function advance(){
 if(launchView!=='playing')return;
 const now=Date.now(),elapsed=Math.max(0,(now-state.clock)/1000);state.clock=now;
 if(state.hero&&!state.paused&&!state.finished){
  const startDays=state.days;
  let days=Math.min(elapsed,300)*daysPerSecond(now);
  while(days>0&&!dead()){const slice=Math.min(5,days);step(slice);days-=slice}
  if(elapsed>300){
    const seconds=Math.min(30,elapsed-300);
    state.restedUntil=now+seconds*1000;
    state.restedSpeed=1.5+Math.min(6.5,elapsed/7200);
    idleNotice='Away progress: '+fmt(state.days-startDays)+' game days credited. Rested speed ×'+state.restedSpeed.toFixed(2)+' for '+Math.ceil(seconds)+' seconds.';
  }
 }
}
screen.onclick=e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 const [a,v]=b.dataset.act.split(':');
 if(launchView!=='playing'){
   if(a==='continue'&&state.hero){launchView='playing';advance();save()}
   else if(a==='new-game'){
     if(state.hero&&!window.confirm('Start a new game? Your current save will be overwritten when you begin with your new character.'))return;
     chosen='Magnus';launchView='characters';
   }else if(a==='back-menu')launchView='menu';
   else if(a==='choose'&&launchView==='characters')chosen=v;
   else if(a==='begin'&&launchView==='characters'){
     const fresh={...newLife(),hero:chosen};
     try{localStorage.setItem(saveKey,JSON.stringify(fresh))}catch{window.alert('Could not save the new game. Please try again.');return}
     state=fresh;launchView='playing';tab='Jobs';pending='';statusText='';idleNotice='';upkeepNotice='';inspectingAmulet=false;recentGains.clear();
   }
   render();return;
 }
 advance();
 if(a==='dismiss-notice'){upkeepNotice='';idleNotice=''}
 if(a==='inspect')inspectingAmulet=!inspectingAmulet;
 if(a==='tab'||a==='accept')inspectingAmulet=false;
 const switchWhileScrolled=a==='tab'&&tab!==v&&window.scrollY>0;
 if(a==='tab'){tab=v;pending=''}
 if(a==='ask'&&choices().includes(v)){pending=v;if(v==='Rebirth')inspectingAmulet=true}
 if(a==='cancel')pending='';
 if(a==='accept'&&pending){reset(pending);tab=['Second Heart','Super Void Heart'].includes(pending)?'Amulet':'Jobs';pending=''}
 if(a==='pause')state.paused=!state.paused;
 if(a==='devSpeed'&&[1,5,20].includes(Number(v)))state.devSpeed=Number(v);
 if(a==='warp')state.warp=!state.warp;
 if(entries[v]&&(!voidCatalog.includes(entries[v])||state.voidHeart||entries[v].group==='Advanced dark magic'||entries[v].group==='Advanced arcana')&&!remaining(v).length&&!dead()){
  if(['job','skill'].includes(a))state[a]=v;
  if(a==='home')state.home=state.home===v?('Homeless'):v;
  if(a==='gear'){if(state.equipment[v])delete state.equipment[v];else state.equipment[v]=true}
 }
 save();render();
 if(switchWhileScrolled){
   const controls=screen.querySelector('.play-controls');
   const panel=screen.querySelector('.play-controls ~ section.card');
   if(panel){
     const delta=panel.getBoundingClientRect().top-controls.getBoundingClientRect().bottom;
     if(delta<0)window.scrollBy(0,delta);
   }
 }
};
let pressingControl=false;
if(screen.addEventListener){
 screen.addEventListener('pointerdown',e=>{pressingControl=Boolean(e.target.closest('button'))});
 for(const event of ['pointerup','pointercancel','blur'])addEventListener(event,()=>{pressingControl=false});
}
render();setInterval(()=>{if(launchView!=='playing')return;advance();save();if(!pressingControl&&!document.querySelector('button:active'))render()},1000);
addEventListener('pagehide',()=>{advance();save()});
if(document.addEventListener)document.addEventListener('visibilitychange',()=>{if(!document.hidden){advance();render()}else{advance();save()}});








