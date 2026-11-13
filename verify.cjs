const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root={}, storage={};const ctx={assert,console,window:{scrollY:0},document:{querySelector:()=>root},navigator:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},addEventListener(){},setInterval(){}};
vm.createContext(ctx);for(const file of ['balance.js','remastered.js'])vm.runInContext(fs.readFileSync(require('path').join(__dirname,file),'utf8'),ctx);
vm.runInContext(`
state.hero='Magnus';
assert.equal(catalog.filter(e=>e.group!=="City contracts"&&e.income&&!voidCatalog.includes(e)).length,20);
assert.equal(catalog.filter(e=>e.group!=="Advanced Angelic"&&e.group!=="Augmentations"&&e.maxXp&&!e.income&&!voidCatalog.includes(e)).length,23);
assert.equal(catalog.filter(e=>!e.side&&!voidCatalog.includes(e)&&e.group!=="City housing"&&e.expense!==undefined).length,17);
for(const e of catalog)assert.equal(typeof e.tile,'number');
for(let i=0;i<1000&&level('Beggar')<10;i++)step(1);
assert(remaining('Farmer').length===0);assert(state.coins>0);assert(level('Concentration')>0);
state.levels={Farmer:18,Fisherman:10,Miner:0,Squire:20,Strength:15,Concentration:26,Productivity:17,Bargaining:7};
assert.deepEqual(['Farmer','Fisherman','Miner','Squire'].map(pay),[21,31,40,13]);assert.equal(effect('Concentration'),1.26);assert.equal(effect('Productivity'),1.17);
assert.deepEqual(['Book','Tent','Wooden hut','Dumbbells','Personal squire'].map(price),[9,13,89,45,179]);
state.days=64*365;assert(!choices().length);state.days=65*365;reset('Rebirth');assert.equal(state.memory.Farmer,18);
for(const side of ['Evil','Angelic']){
 state.days=200*365;assert(choices().includes(side));reset(side);assert.equal(state[side],1);assert.deepEqual(Object.keys(state.memory),[]);
 assert(!entries['Good Orb']&&!entries['Evil Orb']);assert.equal(alignmentGain(side),1);
 tab='Skills';const pathName=side==='Evil'?'Dark magic':'Light magic';
 const pathSkills=catalog.filter(e=>e.group===pathName);assert.equal(pathSkills.length,6);
 const skillMenu=list();for(const skill of pathSkills)assert.equal(skillMenu.includes('data-act="skill:'+skill.name+'"'),remaining(skill.name).length===0);
 const first=side==='Evil'?'Dark influence':'Divine Blessing';assert.equal(remaining(first).length,0);
 state.days=299*365;assert(!choices().includes(side+' orb'));state.days=300*365;reset(side+' orb');assert(!state.orbs[side]);
 for(const [name,,target] of relicRequirements(side)){if(name===side)state[side]=target;else if(name!=='Age')state.levels[name]=Math.max(target,200)}
 for(const [name,,target] of relicRequirements(side)){if(name==='Age')state.days=299*365;else if(name===side)state[side]=target-1;else state.levels[name]=target-1;
 assert(!choices().includes(side+' orb'));if(name==='Age')state.days=300*365;else if(name===side)state[side]=target;else state.levels[name]=Math.max(target,200)}
 reset(side+' orb');assert(state.orbs[side]);
}
const normal={...state.orbs};state.orbs={};const skillBase=rate('Concentration'),jobBase=rate('Beggar');
state.orbs={Evil:true};assert.equal(rate('Concentration'),skillBase*5);
state.orbs=normal;assert.equal(rate('Concentration'),skillBase*25);assert.equal(rate('Beggar'),jobBase);
assert(state.voidPath&&!state.voidHeart);assert(!portrait().includes('void-forms.svg'));
tab='Jobs';assert(!list().includes('Rift keeper'));tab='Shop';assert(!list().includes('Watch hut'));
tab='Skills';assert(!list().includes('Absolute Wish'));state.days=lifespan()*365-1;
assert(!choices().includes('Void Heart'));state.days++;assert(choices().includes('Void Heart'));
const lastLife=JSON.stringify(state);delete state.orbs.Evil;assert(!choices().includes('Void Heart'));
state=JSON.parse(lastLife);reset('Void Heart');assert.equal(age(),14);assert.equal(state.Void,0);assert(remaining('Absolute Wish').length);
state.days=199*365;assert(!choices().includes('Embrace Void'));state.days=200*365;assert.equal(voidGain(),1);reset('Embrace Void');
assert.equal(state.Void,1);assert(!remaining('Absolute Wish').length);assert.deepEqual(Object.keys(state.memory),[]);
for(const skill of voidCatalog.filter(e=>e.group==='Void Manipulation')){
 const target=skill.requirements.Void;state.Void=target-0.01;assert(remaining(skill.name).length);state.Void=target;assert(!remaining(skill.name).length);
}
state.Void=1;
assert(state.voidHeart&&state.voidPath&&age()===14);assert.deepEqual(Object.keys(state.orbs),[]);assert(portrait().includes('void-forms.svg'));
tab='Shop';assert(!list().includes('Town Ruler'));tab='Jobs';assert(!list().includes('Corrupted'));tab='Skills';assert(list().includes('Absolute Wish'));
assert.equal(voidCatalog.filter(e=>e.group==='The Void').length,8);assert.equal(voidCatalog.filter(e=>e.group==='Void Manipulation').length,7);
for(const e of voidCatalog){for(const key of Object.keys(e.requirements))assert(entries[key]||['Age','Evil','Coins','Void'].includes(key))}
state.days=999*365;assert(remaining('Corrupted').length);state.days=1000*365;assert.equal(remaining('Corrupted').length,0);
assert(remaining('Void Fiend').length);state.levels.Brainwashing=3000;state.levels['Void Slave']=200;assert.equal(remaining('Void Fiend').length,0);
state.coins=entries['Void Realm'].expense*100-1;assert(remaining('Void Realm').length);state.coins++;assert.equal(remaining('Void Realm').length,0);
tab='Shop';state.equipment.Book=true;
state.unlocked.Book=true;
assert(list().includes('<b>Book</b><small>'+String.fromCharCode(215)+entries.Book.effect+' '+entries.Book.description+'</small>'));
delete state.equipment.Book;
state.days=200*365;const evilWithoutWish=heartEvilGain();state.levels['Absolute Wish']=4;assert.equal(heartEvilGain(),evilWithoutWish);tab='Skills';assert(list().includes('+1.4 Void gain'));assert.equal(voidGain(),1.4);reset('Embrace Void');assert.equal(state.Void,2.4);assert(state.voidHeart);assert.equal(age(),14);
for(const [name,,target] of relicRequirements('Second Heart')){
 if(name==='Age')state.days=target*365;else if(name!=='Void')state.levels[name]=target;
}
assert(!choices().includes('Second Heart'));state.Void=499;reset('Second Heart');assert(!state.heartPair);state.Void=500;reset('Second Heart');assert(state.heartPair&&!state.superHeart&&age()===14);
assert.deepEqual(choices(),['Super Void Heart']);const lifeBefore=state.life;reset('Super Void Heart');
assert(state.superHeart&&!state.heartPair&&state.life===lifeBefore);assert(!choices().includes('Super Void Heart'));
state.days=200*365;reset('Rebirth');assert(state.superHeart&&state.Void===500);
state.days=600*365;state.levels={'Void Fiend':100,'Mind Seize':150};state.Void=1999;assert(!choices().includes('Cross the Rift'));
state.Void=2000;state.days=599*365;assert(!choices().includes('Cross the Rift'));state.days=600*365;
state.levels['Void Fiend']=99;assert(!choices().includes('Cross the Rift'));state.levels['Void Fiend']=100;
state.levels['Mind Seize']=149;assert(!choices().includes('Cross the Rift'));state.levels['Mind Seize']=150;
state.levels['Absolute Wish']=48;assert.equal(voidGain(),11.6);reset('Cross the Rift');assert(state.crossedRift);assert(!choices().includes('Cross the Rift'));
assert.equal(state.job,'Night courier');assert.equal(state.skill,'Neural link');assert.equal(state.home,'Transit bunk');
const cityRate=rate(state.skill);const records=state.orbs;state.orbs={};assert.equal(rate(state.skill),cityRate);state.orbs=records;
state.levels['Neural link']=10;state.levels['Night courier']=15;assert.equal(remaining('Relay technician').length,0);
reset('Embrace Void');assert.equal(state.Void,2006);assert.deepEqual(Object.keys(state.memory),[]);assert(state.crossedRift&&state.job==='Night courier'&&state.home==='Transit bunk');
for(const step of chronoSteps){
 const lives=state.life;state.days=step.age*365;Object.assign(state.levels,step.skills);
 const last=Object.keys(step.skills).pop();state.levels[last]--;assert(!choices().includes(step.action));state.levels[last]++;
 reset(step.action);assert.equal(state.life,lives+1);assert.equal(age(),14);
}
assert.equal(state.chrono,3);assert(state.memory['Relay technician']>=15);
assert(!choices().includes('Fuse Continuum Heart'));const oldLife=state.life;
reset('Transmit construct');assert.equal(state.chrono,4);reset('Fuse Continuum Heart');assert.equal(state.chrono,5);assert.equal(state.life,oldLife);
assert(!choices().includes('Fuse Continuum Heart'));state.days=200*365;assert.equal(voidGain(),4);reset('Embrace Void');assert.equal(state.chrono,5);assert.deepEqual(Object.keys(state.memory),[]);
assert(migrateVoid({orbs:{Void:true}}).voidHeart);
Object.assign(state,newLife(),{hero:'Magnus',Evil:1});assert.equal(pathTheme(),'evil');
state.Evil=0;state.Angelic=1;assert.equal(pathTheme(),'angelic');
state.voidPath=true;assert.equal(pathTheme(),'');
state.voidHeart=true;assert.equal(pathTheme(),'void');
state.crossedRift=true;assert.equal(pathTheme(),'');
assert(fmt(1e25).length<12);
for(const chapter of [{},{voidPath:true,voidHeart:true},{voidPath:true,voidHeart:true,superHeart:true,crossedRift:true}]){
 state={...newLife(),hero:'Magnus',...chapter};cityLoadout(state);state.days=lifespan()*365;state.levels[state.skill]=12;state.xp[state.skill]=42;
 render();assert.equal(tab,'Amulet');
 for(const section of ['Jobs','Skills','Shop','Amulet','Skills']){
  screen.onclick({target:{closest:()=>({dataset:{act:'tab:'+section}})}});
  render();assert.equal(tab,section);
 }
 assert(screen.innerHTML.includes('42 / '));assert.equal(level(state.skill),12);
}
for(const [key,heading] of [['Evil','Advanced dark magic'],['Angelic','Advanced Angelic'],['Void','Void Manipulation']]){
 state={...newLife(),hero:'Magnus',voidPath:true,voidHeart:true};tab='Skills';assert(!list().includes('<h3>'+heading+'</h3>'));
 state[key]=key==='Void'?1:5000;assert(list().includes('<h3>'+heading+'</h3>'));assert(!list().includes('<h3>Advanced arcana</h3>'));
}
state.Angelic=4999;assert(remaining('Sacred Knowledge').length);state.Angelic=5000;assert.equal(remaining('Sacred Knowledge').length,0);state.Angelic=0;assert(remaining('Sacred Knowledge').length);
state={...newLife(),hero:'Magnus'};tab='Jobs';assert(!list().includes('skill:Astral Body'));assert(!list().includes('job:Astral scholar'));
state.levels.Mage=10;assert(!list().includes('job:Astral scholar'));state.levels.Chairman=120;state.levels['Super immortality']=9;assert(!showAdvancedMagic());state.levels['Super immortality']=10;assert(list().includes('job:Astral scholar'));
for(const name of ['Astral scholar','Astral Body','Archmage','All Seeing Eye','Chronomancer','Temporal Dimension','Imperator','Brainwashing']){
 const e=entries[name];tab=e.income?'Jobs':'Skills';
 for(const [key,target] of Object.entries(e.requirements)){
   Object.assign(state.levels,e.requirements);state.levels[key]=target-1;delete state.unlocked[name];
   assert(remaining(name).length,key+' must gate '+name);
 }
 Object.assign(state.levels,e.requirements);assert.equal(remaining(name).length,0);
 const action=(e.income?'job:':'skill:')+name;assert(list().includes('data-act="'+action+'"'));
 screen.onclick({target:{closest:()=>({dataset:{act:action}})}});assert.equal(state[e.income?'job':'skill'],name);
}
state={...newLife(),hero:'Magnus',coins:1e15};tab='Shop';assert(!list().includes('Town Ruler')&&!list().includes('Ashen keep'));
for(const [side,home,relic] of [['Evil','Ashen keep','Obsidian seal'],['Angelic','Dawn sanctuary','Ivory seal']]){
 state[side]=1;assert(list().includes(home)&&!list().includes(relic));state[side]=25;assert(list().includes(relic));state[side]=0;assert(!list().includes(home)&&!list().includes(relic));
}
state.voidHeart=true;assert(list().includes('Town Ruler')&&list().includes('Void Armor'));assert.deepEqual(list().match(new RegExp('<h3>.*?</h3>','g')),['<h3>Properties</h3>','<h3>Equipment</h3>']);
console.log('Verified base progression, orb collectibles and cumulative skill XP, Void jobs, Heart, legacy conversion and Void collection.');
`,ctx);
