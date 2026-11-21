const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root={}, storage={};const ctx={assert,console,window:{scrollY:0},document:{querySelector:()=>root},navigator:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},addEventListener(){},setInterval(){}};
vm.createContext(ctx);for(const file of ['balance.js','remastered.js'])vm.runInContext(fs.readFileSync(require('path').join(__dirname,file),'utf8'),ctx);
vm.runInContext(`
assert(screen.innerHTML.includes('New Game'));assert(screen.innerHTML.includes('disabled'));launchView='playing';state.hero='Magnus';
state.happinessUntil=Date.now()+60000;state.acceleratingUntil=state.happinessUntil;
assert.equal(happy(),1);assert.equal(daysPerSecond(Date.now()),5);migrateVoid(state);assert(!('happinessUntil' in state)&&!('acceleratingUntil' in state));
assert.equal(catalog.filter(e=>e.group!=="City contracts"&&e.income&&!voidCatalog.includes(e)).length,20);
assert.equal(catalog.filter(e=>e.group!=="Advanced arcana"&&e.group!=="Advanced Angelic"&&e.group!=="Advanced dark magic"&&e.group!=="Augmentations"&&e.maxXp&&!e.income&&!voidCatalog.includes(e)).length,23);
assert.equal(catalog.filter(e=>!e.rank&&!e.side&&!voidCatalog.includes(e)&&e.group!=="City housing"&&e.expense!==undefined).length,17);
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
assert(heartForge().includes('Create Void Heart')&&!heartForge().includes('disabled'));
state.days--;assert(heartForge().includes('disabled'));state.days++;
const lastLife=JSON.stringify(state);
for(const orbs of [{},{Evil:true},{Angelic:true}]){
 state.orbs=orbs;assert(!amulet().includes('data-act="ask:Void Heart"'));assert(!choices().includes('Void Heart'));
}
state=JSON.parse(lastLife);delete state.orbs.Evil;assert(!choices().includes('Void Heart'));
state=JSON.parse(lastLife);reset('Void Heart');assert.equal(age(),14);assert.equal(state.Void,0);assert(remaining('Absolute Wish').length);
const firstHeartLife=JSON.stringify(state);
state.life=52;
for(const task of ['Beggar','Concentration','Void Influence','Corrupted']){
 state.voidHeart=false;const baseline=rate(task);state.voidHeart=true;assert.equal(rate(task),52*baseline);state.superHeart=true;assert.equal(rate(task),104*baseline);state.superHeart=false;
}
state.Evil=50000;assert(remaining('Void Influence').length);state.Evil=0;state.Void=1;assert.equal(remaining('Void Influence').length,0);state.Void=0;
const initialLife=lifespan(),initialJobRate=rate('Beggar');
state.Void=500;assert.equal(lifespan(),initialLife);assert.equal(rate('Beggar'),initialJobRate*501);
state.Void=2000;assert.equal(lifespan(),initialLife);
const normalMagic=rate('Mana control');state.superHeart=true;assert(rate('Mana control')>normalMagic);
state=JSON.parse(firstHeartLife);
state.days=199*365;assert(!choices().includes('Embrace Void'));state.days=200*365;assert.equal(voidGain(),1);reset('Embrace Void');
assert.equal(state.Void,1);assert(remaining('Absolute Wish').length);assert.deepEqual(Object.keys(state.memory),[]);
for(const skill of voidCatalog.filter(e=>e.group==='Void Manipulation')){
 state.Void=skill.requirements.Void;Object.assign(state.levels,skill.requirements);assert.equal(remaining(skill.name).length,0);
 for(const [name,target] of Object.entries(skill.requirements)){
   if(name==='Void'){state.Void=target-1;assert(remaining(skill.name).length);state.Void=target}else{state.levels[name]=target-1;assert(remaining(skill.name).length);state.levels[name]=target;}
 }
}
state.Void=74;state.levels['Void Amplification']=3000;assert(remaining('Mind Seize').length);
state.Void=75;state.levels={};assert.equal(remaining('Mind Seize').length,0);
state.levels={};state.Void=1;
assert(state.voidHeart&&state.voidPath&&age()===14);assert.deepEqual(Object.keys(state.orbs),[]);assert(portrait().includes('void-forms.svg'));
tab='Shop';assert(!list().includes('Town Ruler'));tab='Jobs';assert(!list().includes('Corrupted')&&list().includes('Age 14/200'));tab='Skills';assert(!list().includes('skill:Absolute Wish'));
assert.equal(voidCatalog.filter(e=>e.group==='The Void').length,8);assert.equal(voidCatalog.filter(e=>e.group==='Void Manipulation').length,8);
for(const e of voidCatalog){for(const key of Object.keys(e.requirements))assert(entries[key]||['Age','Evil','Coins','Void'].includes(key))}
state.days=199*365;assert(remaining('Corrupted').length);state.days=200*365;assert(remaining('Corrupted').length);state.levels.Imperator=99;assert(remaining('Corrupted').length);state.levels.Imperator=100;state.Void=24;assert(remaining('Corrupted').length);state.Void=25;assert.equal(remaining('Corrupted').length,0);
assert(remaining('Void Fiend').length);state.levels['Void Influence']=3000;state.levels['Void Slave']=200;state.Void=150;assert.equal(remaining('Void Fiend').length,0);
state.Void=1000;state.levels['Void Reaver']=100;state.acquiredBasics['Planar sanctum']=true;state.acquiredBasics.Chronometer=true;state.shopEarnings['Void Realm']=shopThreshold(entries['Void Realm']);state.coins=shopThreshold(entries['Void Realm'])*.999999;assert(remaining('Void Realm').length);state.coins=shopThreshold(entries['Void Realm']);assert.equal(remaining('Void Realm').length,0);
tab='Shop';state.equipment.Book=true;
state.unlocked.Book=true;
assert(list().includes('<b>Book</b><small>'+String.fromCharCode(215)+entries.Book.effect+' '+entries.Book.description+'</small>'));
delete state.equipment.Book;
state.days=200*365;const evilBefore=state.Evil;state.Void=10;state.levels['Absolute Wish']=4;tab='Skills';assert(list().includes('+1.1 Void gain'));assert.equal(voidGain(),1.1);reset('Embrace Void');assert.equal(state.Void,11.1);assert.equal(state.Evil,evilBefore);assert(state.voidHeart);assert.equal(age(),14);
for(const [name,,target] of relicRequirements('Second Heart')){
 if(name==='Age')state.days=target*365;else if(name!=='Void')state.levels[name]=target;
}
assert(!choices().includes('Second Heart'));state.Void=1599;reset('Second Heart');assert(!state.heartPair);state.Void=1600;state.days=350*365-1;assert(!choices().includes('Second Heart'));state.days++;assert(choices().includes('Second Heart'));reset('Second Heart');assert(state.heartPair&&!state.superHeart&&age()===14);
assert.deepEqual(choices(),['Super Void Heart']);const lifeBefore=state.life;reset('Super Void Heart');
assert(state.superHeart&&!state.heartPair&&state.life===lifeBefore);assert(!choices().includes('Super Void Heart'));
state.days=200*365;reset('Rebirth');assert(state.superHeart&&state.Void===1600);
state.days=1300*365;state.Void=2100;assert.deepEqual(choices(),['Embrace Void','Rebirth']);
Object.assign(state,{crossedRift:true,chrono:5,job:'Night courier',home:'Transit bunk',skill:'Neural link',levels:{'Void Fiend':100,'Neural link':70}});
migrateVoid(state);assert(state.superHeart&&state.Void===2100&&level('Void Fiend')===100);assert.equal(state.job,'Beggar');assert.equal(state.skill,'Concentration');assert.equal(state.home,'Homeless');assert(!('Neural link' in state.levels));
assert(migrateVoid({orbs:{Void:true}}).voidHeart);
Object.assign(state,newLife(),{hero:'Magnus',Evil:1});assert.equal(pathTheme(),'evil');
state.Evil=0;state.Angelic=1;assert.equal(pathTheme(),'angelic');
state.voidPath=true;assert.equal(pathTheme(),'');
state.voidHeart=true;assert.equal(pathTheme(),'void');
assert.equal(fmt(1e25),'10 Septillion');assert.equal(fmt(1e15),'1 Quadrillion');assert.equal(fmt(-1.25e18),'-1.25 Quintillion');assert.equal(fmt(999999999),'1 Billion');
for(const chapter of [{},{voidPath:true,voidHeart:true},{voidPath:true,voidHeart:true,superHeart:true}]){
 state={...newLife(),hero:'Magnus',...chapter};state.days=lifespan()*365;state.levels[state.skill]=12;state.xp[state.skill]=42;
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
state.Angelic=49;assert(remaining('Sacred Knowledge').length);state.Angelic=50;assert.equal(remaining('Sacred Knowledge').length,0);state.Angelic=0;assert(remaining('Sacred Knowledge').length);
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
 state.acquiredBasics={Mansion:true,Library:true};state[side]=1;assert(list().includes(home)&&!list().includes(relic));state[side]=25;assert(list().includes(relic));state[side]=0;assert(!list().includes(home)&&!list().includes(relic));
}
for(const [side,seal] of [['Evil','Obsidian seal'],['Angelic','Ivory seal']]){
 state={...newLife(),hero:'Magnus',[side]:24,coins:60000,paused:true};
 const swordAt=shopThreshold(entries['Steel longsword']);
 assert(swordAt>state.coins);
 const equipment=()=>list().split('<h3>Equipment</h3>')[1];
 assert(equipment().includes('Coins 60,000/'+swordAt.toLocaleString()));
 state.coins=swordAt;assert(equipment().includes('gear:Steel longsword')&&!equipment().includes('gear:'+seal));
 screen.onclick({target:{closest:()=>({dataset:{act:'gear:Steel longsword'}})}});assert(state.equipment['Steel longsword']);
 state[side]=25;assert(!equipment().includes('gear:'+seal));
 const home=side==='Evil'?'Ashen keep':'Dawn sanctuary';
 for(const [basic,reward,action] of [['Library',seal,'gear'],['Mansion',home,'home']]){
   const threshold=shopThreshold(entries[reward]);state.coins=threshold-1;
   assert(list().includes(action+':'+basic)&&!list().includes(action+':'+reward));
   state.coins++;assert(!list().includes(action+':'+reward));
   const tap=n=>screen.onclick({target:{closest:()=>({dataset:{act:action+':'+n}})}});
   tap(reward);assert(state.home!==reward&&!state.equipment[reward]);
   tap(basic);tap(basic);const rows=list();assert(rows.includes(action+':'+reward)&&rows.indexOf(action+':'+basic)<rows.indexOf(action+':'+reward));
 }
}
state={...newLife(),hero:'Magnus',coins:1e15};
state.voidHeart=true;state.paused=true;state.coins=1e18;
state.acquiredBasics={Mansion:true,Library:true};
 creditShopEarnings(1e18,215);recordShopUnlocks();
 assert(!level('Archmage')&&!list().includes('home:Town Ruler')&&!list().includes('gear:Observatory'));assert(!state.shopEarnings['Town Ruler']&&!state.shopEarnings.Observatory);
 state={...newLife(),hero:'Magnus',coins:1e18,voidHeart:true,paused:true};
 for(const e of catalog.filter(e=>e.rank))state.levels[e.rank]=e.requirements[e.rank];
const postBasic=catalog.filter(e=>e.rank||voidShopItem(e));
const shopTap=(action,name)=>screen.onclick({target:{closest:()=>({dataset:{act:action+':'+name}})}});
for(const e of postBasic){assert(!list().includes(':'+e.name+'"'));assert(remaining(e.name).length)}
assert(nextVoidShop().includes('Select Planar sanctum')&&nextVoidShop().includes('Chronometer'));
for(const [basic,action] of [['Mansion','home'],['Library','gear']]){
 shopTap(action,basic);
 for(const e of postBasic.filter(e=>e.prerequisite===basic))assert(remaining(e.name).length);
 for(let i=0;i<7;i++){creditShopEarnings(1e18,215);recordShopUnlocks()}
 for(const e of postBasic.filter(e=>e.prerequisite===basic)){
   const rows=list();assert(rows.indexOf(action+':'+e.name)>rows.indexOf(action+':'+basic));
   assert(shopThreshold(e)>shopThreshold(entries[basic]));
 }
 if(basic==='Mansion')assert(!list().includes('gear:Star chart')&&!list().includes('gear:Observatory'));
}
assert(!list().includes('Town Ruler')&&!list().includes('Void Armor'));
shopTap('home','Planar sanctum');creditShopEarnings(1e18,215);recordShopUnlocks();assert(!state.shopEarnings['Town Ruler']&&!state.shopEarnings.Observatory);shopTap('gear','Chronometer');
assert(state.acquiredBasics['Planar sanctum']&&state.acquiredBasics.Chronometer);
state.Void=1600;for(const e of voidCatalog.filter(e=>e.group==='The Void'))state.levels[e.name]=1000;
for(let i=0;i<7;i++){creditShopEarnings(1e18,215);recordShopUnlocks()}
assert(list().includes('Town Ruler')&&list().includes('Void Armor'));assert.deepEqual(list().match(new RegExp('<h3>.*?</h3>','g')),['<h3>Properties</h3>','<h3>Equipment</h3>']);
for(const hero of ['Magnus','Isabella']){
 for(const side of ['Evil','Angelic']){
   state={...newLife(),hero,[side]:1};state.days=lifespan()*365;
   assert.equal(portrait(),sprite(artIndex['avatar_'+hero.toLowerCase()+'_dead_'+side.toLowerCase()],76));
 }
 state={...newLife(),hero,voidHeart:true,voidPath:true,Evil:1};state.days=lifespan()*365-1;assert(portrait().includes('void-forms.svg'));
 state.days++;assert(portrait().includes('void-skeletons.webp'));assert(portrait().includes(hero==='Isabella'?'right center':'left center'));
 reset('Rebirth');assert(portrait().includes('void-forms.svg'));
}
state={...newLife(),hero:'Magnus'};tab='Jobs';assert(list().includes('Beggar 0/10'));assert(!list().includes('job:Farmer'));assert(!list().includes('Fisherman'));
state.levels.Beggar=10;assert(list().includes('job:Farmer')&&list().includes('Farmer 0/10')&&!list().includes('Fisherman'));
state={...newLife(),hero:'Magnus'};tab='Skills';const firstSkills=list();assert(firstSkills.includes('skill-requirement')&&!firstSkills.includes('Next unlock'));assert(!firstSkills.includes('skill:Productivity'));
for(const section of ['Jobs','Shop']){tab=section;assert(list().includes('required-lock.png')&&!list().includes('Next unlock')&&!list().includes(String.fromCodePoint(0x1f512)))}
state={...newLife(),hero:'Magnus',coins:1e14};tab='Shop';assert(!list().includes('Astral tower'));
state.acquiredBasics={Mansion:true,Library:true};
for(const e of catalog.filter(e=>e.rank)){
 state.shopEarnings[e.name]=shopThreshold(e);state.levels[e.rank]=e.requirements[e.rank]-1;assert(!list().includes(':'+e.name+'"'));
 state.levels[e.rank]++;assert(list().includes(':'+e.name+'"'));
}
for(const side of ['Evil','Angelic','Void']){
 state={...newLife(),hero:'Magnus',voidHeart:side==='Void',voidPath:side==='Void',days:201*365};
 state.levels['Alignment Resonance']=100;reset(side==='Void'?'Embrace Void':side);assert.equal(state[side],1.06);
}
state.levels['Alignment Resonance']=6000;assert(effect('Alignment Resonance')<1.2);
state={...newLife(),hero:'Magnus',job:'Legendary knight',levels:{'Mana control':1000,'Battle tactics':1000},unlocked:{'Legendary knight':true}};
migrateVoid(state);tab='Jobs';assert.equal(state.job,'Beggar');assert(!list().includes('job:Legendary knight'));
state.levels['Holy knight']=9;assert(remaining('Legendary knight').length);
state.levels['Holy knight']=10;assert(list().includes('job:Legendary knight'));
state={...newLife(),hero:'Magnus'};
for(const n of ['Concentration','Immortality','Chairman','Legendary knight']){
 state.levels[n]=3000;assert.equal(threshold(n),Math.round(entries[n].maxXp*3001*1.01**3000));
}
for(const n of ['Void Influence','Astral Body','Corrupted','Imperator']){
 const boundary=entries[n].income?200:2000;
 state.levels[n]=boundary;const before=threshold(n);state.levels[n]++;assert(threshold(n)>before);
}
state={...newLife(),hero:'Magnus',Void:100,voidHeart:true};const gainBefore=voidGain();const xpBefore=rate('Beggar');state.superHeart=true;assert.equal(voidGain(),gainBefore*2);assert.equal(rate('Beggar'),xpBefore*2);
state={...newLife(),hero:'Magnus'};
for(const l of [0,100,500,3400,10000]){
 state.levels['Temporal Dimension']=l;
 assert.equal(effect('Temporal Dimension'),1+25*Math.log1p(l/1000));
 assert.equal(threshold('Temporal Dimension'),thresholdAt('Temporal Dimension',l));
}
state={...newLife(),hero:'Magnus',paused:false,warp:false};launchView='playing';
const speedTestStart=state.days;state.clock=Date.now()-1000;advance();assert(Math.abs(state.days-speedTestStart-5)<.1);
state.paused=true;const pausedAge=state.days;state.clock=Date.now()-300000;advance();assert.equal(state.days,pausedAge);
state={...newLife(),hero:'Magnus',levels:{'Time warping':1000,'Temporal Dimension':3400,'Time Loop':2000,'Eternal Vigil':2000,'Astral Body':1200,'Immortality':1500,'Super immortality':500}};
const originalStep=step;let countedSteps=0;step=d=>{countedSteps++;originalStep(d)};
state.clock=Date.now()-300000;advance();step=originalStep;
assert(countedSteps<=1201);assert(Number.isFinite(state.days)&&Number.isFinite(state.coins));assert(state.days>14*365);
for(const e of voidCatalog.filter(e=>e.group==='The Void'&&e.name!=='Corrupted')){
 for(const key of Object.keys(e.requirements))assert.notEqual(entries[key]?.group,'Advanced arcana');
}
assert(entries['Town Ruler'].effect>entries['Planar sanctum'].effect);
state={...newLife(),hero:'Magnus',voidHeart:true,levels:{'All Seeing Eye':2500,Imperator:100,Corrupted:100}};
assert(pay('Corrupted')>pay('Imperator'));
state={...newLife(),hero:'Magnus',voidHeart:true,home:'Town Ruler',equipment:{Observatory:true},acquiredBasics:{Mansion:true,Library:true}};
migrateVoid(state);assert.equal(state.home,'Town Ruler');assert(state.equipment.Observatory);assert(state.acquiredBasics['Planar sanctum']&&state.acquiredBasics.Chronometer);
state={...newLife(),hero:'Magnus',voidHeart:true,voidPath:true,Void:999,coins:1e30,acquiredBasics:{Mansion:true,Library:true,'Planar sanctum':true,Chronometer:true}};
for(const name of ['Corrupted','Void Slave','Void Fiend','Abyss Anomaly','Void Wraith'])state.levels[name]=1000;
for(let i=0;i<10;i++){creditShopEarnings(1e30,1000);recordShopUnlocks()}
for(const name of ['Void Realm','Void Universe','Void Orb','Void Dust']){assert(remaining(name).length);assert(!state.shopEarnings[name]);assert(!state.unlocked[name])}
assert(nextVoidShop().includes('Void Reaver')&&nextVoidShop().includes('1,000'));
assert(state.unlocked['Void Blade']);assert(state.unlocked['Pocket Dimension']);
for(const [name,job,l,resource] of [['Void Realm','Void Reaver',100,1000],['Void Orb','Void Lord',100,1200],['Void Universe','Abyss God',100,1600],['Void Dust','Abyss God',250,1600]]){
 state.Void=resource-1;state.levels[job]=l;
 assert(voidMilestoneRequirements(entries[name]).length);
 state.Void=resource;state.levels[job]=l-1;assert(voidMilestoneRequirements(entries[name]).length);
 state.levels[job]=l;assert.equal(voidMilestoneRequirements(entries[name]).length,0);
 creditShopEarnings(1e30,1000);recordShopUnlocks();assert.equal(remaining(name).length,0);
}
for(const e of voidCatalog.filter(e=>e.group==='The Void')){
 state={...newLife(),hero:'Magnus',voidHeart:true,Void:e.requirements.Void-1,days:200*365};
 for(const [key,value] of Object.entries(e.requirements))if(key!=='Void'&&key!=='Age')state.levels[key]=value;
 assert(remaining(e.name).length);state.Void=e.requirements.Void;assert.equal(remaining(e.name).length,0);
}
state={...newLife(),hero:'Magnus',voidHeart:true,voidEconomyVersion:0,Void:911,job:'Void Wraith',home:'Void Universe',equipment:{'Void Dust':true},coins:1e30};
const savedCoins=state.coins;reviewVoidEconomy();assert(state.paused&&state.voidEconomyReview&&upkeepNotice.includes('Review'));
assert.equal(state.coins,savedCoins);assert.equal(state.home,'Void Universe');assert(state.equipment['Void Dust']);
launchView='playing';screen.onclick({target:{closest:()=>({dataset:{act:'pause'}})}});assert(!state.paused&&!state.voidEconomyReview);reviewVoidEconomy();assert(!state.paused);
state={...newLife(),hero:'Magnus',voidHeart:true,Void:800,job:'Void Wraith',levels:{'Void Wraith':250,'All Seeing Eye':15000,Bargaining:15000,Brainwashing:15000}};
assert(price('Void Universe')+price('Void Dust')>pay('Void Wraith')*10);
state={...newLife(),hero:'Magnus',voidHeart:true,Void:1600,job:'Abyss God',home:'Void Universe',levels:{'Abyss God':250,'All Seeing Eye':8000,Bargaining:4000,Brainwashing:8000,'Abyss Manipulation':8000}};
for(const e of shopEntries.filter(voidShopItem))if(e.group==='Void equipment')state.equipment[e.name]=true;
assert(upkeep()/pay(state.job)>.3&&upkeep()/pay(state.job)<.8);
const alignedPairs=[['Dark Knowledge','Sacred Knowledge',50],['Infernal Influence','Celestial Influence',100],['Time Loop','Eternal Vigil',200],['Evil Incarnate','Grace Incarnate',300]];
for(const [dark,light,gate] of alignedPairs){
 assert.equal(entries[dark].effect,entries[light].effect);
 for(const [name,side] of [[dark,'Evil'],[light,'Angelic']]){
  state={...newLife(),hero:'Magnus',[side]:gate-1};assert(remaining(name).length);state[side]=gate;assert.equal(remaining(name).length,0);
  assert(relicRequirements(side).some(([n])=>n===name));
 }
}
state={...newLife(),hero:'Magnus',voidHeart:true,Void:800,levels:{'Void Embodiment':400}};
assert.equal(voidGain(),2);const originalEvilEffect=entries['Evil control'].effect;entries['Evil control'].effect=99;assert.equal(voidGain(),2);entries['Evil control'].effect=originalEvilEffect;
const homes=['Mansion','Ashen keep','Astral tower','Celestial citadel','Planar sanctum','Town Ruler','City Ruler','Nation Ruler','Pocket Dimension','Void Realm','Void Universe'];
for(let i=1;i<homes.length;i++){assert(entries[homes[i]].effect>entries[homes[i-1]].effect);assert(entries[homes[i]].expense>entries[homes[i-1]].expense)}
state={...newLife(),hero:'Magnus',voidEconomyVersion:1,job:'Chairman',home:'Planar sanctum',equipment:{Chronometer:true},coins:1e20};
reviewVoidEconomy();assert(state.paused&&state.voidEconomyReview);assert.equal(state.voidEconomyVersion,2);assert.equal(state.coins,1e20);
console.log('Verified base progression, orb collectibles and cumulative skill XP, Void jobs, Heart, legacy conversion and Void collection.');
`,ctx);
