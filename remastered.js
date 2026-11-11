const saveKey = 'pk-remastered-191';
// Tables and prerequisites from Symb1/progress_knight_2 at c099d6f.
const voidCatalog=[
 {"name":"Corrupted","maxXp":100000000000000,"income":25000000,"group":"The Void","tile":0,"requirements":{"Age":1000}},
 {"name":"Void Slave","maxXp":650000000000000,"income":200000000,"group":"The Void","tile":1,"requirements":{"Corrupted":30}},
 {"name":"Void Fiend","maxXp":18000000000000000,"income":600000000,"group":"The Void","tile":2,"requirements":{"Brainwashing":3000,"Void Slave":200}},
 {"name":"Abyss Anomaly","maxXp":18000000000000000,"income":1200000000,"group":"The Void","tile":3,"requirements":{"Mind Seize":3000,"Void Fiend":200}},
 {"name":"Void Wraith","maxXp":180000000000000000,"income":5000000000,"group":"The Void","tile":4,"requirements":{"Temporal Dimension":3400,"Abyss Anomaly":300}},
 {"name":"Void Reaver","maxXp":2600000000000000000,"income":25000000000,"group":"The Void","tile":5,"requirements":{"Void Amplification":3400,"Void Wraith":250}},
 {"name":"Void Lord","maxXp":28000000000000000000,"income":100000000000,"group":"The Void","tile":6,"requirements":{"Void Symbiosis":3800,"Void Reaver":150}},
 {"name":"Abyss God","maxXp":400000000000000000000,"income":1000000000000,"group":"The Void","tile":7,"requirements":{"Void Embodiment":4700,"Void Lord":750}},
 {"name":"Absolute Wish","maxXp":100,"effect":0.005,"description":"Evil Gain","group":"Void Manipulation","tile":0,"requirements":{"Void Slave":25,"Chairman":300}},
 {"name":"Void Amplification","maxXp":100,"effect":0.01,"description":"The Void XP","group":"Void Manipulation","tile":1,"requirements":{"Void Slave":100,"Absolute Wish":3000}},
 {"name":"Mind Seize","maxXp":100,"effect":0.0006,"description":"Reduced Happiness","group":"Void Manipulation","tile":2,"requirements":{"Void Amplification":3000}},
 {"name":"Ceaseless Abyss","maxXp":100,"effect":0.000585,"description":"Longer Lifespan","group":"Void Manipulation","tile":3,"requirements":{"Void Influence":4000,"Abyss Anomaly":50}},
 {"name":"Void Symbiosis","maxXp":100,"effect":0.0015,"description":"Ability XP","group":"Void Manipulation","tile":4,"requirements":{"Ceaseless Abyss":3500,"Void Reaver":50}},
 {"name":"Void Embodiment","maxXp":100,"effect":0.0025,"description":"Evil Gain","group":"Void Manipulation","tile":5,"requirements":{"Dark influence":4600,"Void Lord":50}},
 {"name":"Abyss Manipulation","maxXp":100,"effect":-0.01,"description":"Reduced Expenses","group":"Void Manipulation","tile":6,"requirements":{"Abyss God":350,"Dark influence":6000,"Void Influence":6000}},
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
 {"name":"Adept Mage","maxXp":10000000,"income":9500,"group":"Advanced arcana","tile":0,"requirements":{"Mana control":700,"Apprentice mage":10}},
 {"name":"Archmage","maxXp":10000000000,"income":350000,"group":"Advanced arcana","tile":1,"requirements":{"Mana control":1200,"Master wizard":10}},
 {"name":"Chronomancer","maxXp":2000000000000,"income":1000000,"group":"Advanced arcana","tile":2,"requirements":{"Mana control":1500,"Meditation":1500,"Archmage":25}},
 {"name":"Imperator","maxXp":9000000000000000,"income":60000000,"group":"Advanced arcana","tile":3,"requirements":{"All Seeing Eye":3000,"Concentration":3000,"Chairman":666}},
 {"name":"All Seeing Eye","maxXp":100,"effect":0.0027,"description":"T.A.A Pay","group":"Advanced arcana","tile":4,"requirements":{"Mana control":2500,"Chairman":100}},
 {"name":"Temporal Dimension","maxXp":100,"effect":0.025,"description":"Gamespeed","group":"Advanced arcana","tile":5,"requirements":{"Chronomancer":25}},
 {"name":"Brainwashing","maxXp":100,"effect":-0.01,"description":"Reduced Expenses","group":"Advanced arcana","tile":6,"requirements":{"Imperator":100}},
 {"name":"Astral Body","maxXp":100,"effect":0.0035,"description":"Longer lifespan","group":"Advanced arcana","tile":7,"requirements":{"Archmage":10}},
 {"name":"Dark Knowledge","maxXp":100,"effect":0.003,"description":"Class XP","group":"Advanced dark magic","tile":0,"requirements":{"Evil":5000}},
 {"name":"Void Influence","maxXp":100,"effect":0.0028,"description":"All XP","group":"Advanced dark magic","tile":1,"requirements":{"Evil":50000}},
 {"name":"Time Loop","maxXp":100,"effect":0.001,"description":"Gamespeed","group":"Advanced dark magic","tile":2,"requirements":{"Evil":2500000}},
 {"name":"Evil Incarnate","maxXp":100,"effect":0.0004,"description":"Ability XP","group":"Advanced dark magic","tile":3,"requirements":{"Evil":1000000000}}
];
for(const entry of voidCatalog)entries[entry.name]=entry;
for(const [name,tile,income,maxXp,requirements] of [
 ['Night courier',0,12,120,{}],['Relay technician',1,90,500,{'Night courier':15,'Neural link':10}],
 ['Grid engineer',2,460,1500,{'Relay technician':25,'Circuit design':20}]
])entries[name]={name,tile,income,maxXp,requirements,group:'City contracts'};
for(const [name,tile,effect,description,maxXp,requirements] of [
 ['Neural link',3,.03,'training XP',120,{}],['Circuit design',4,.04,'contract pay',300,{'Neural link':10}],
 ['Life support',5,.04,'lifespan',500,{'Circuit design':15}]
])entries[name]={name,tile,effect,description,maxXp,requirements,group:'Augmentations'};
entries['Transit bunk']={name:'Transit bunk',tile:6,expense:0,effect:1,requirements:{},group:'City housing'};
entries['Skyline apartment']={name:'Skyline apartment',tile:7,expense:60,effect:2,requirements:{'Relay technician':5},group:'City housing'};
const heartCost=400;
function cityLoadout(s){
 if(!s.crossedRift)return;
 if(entries[s.job]?.group!=='City contracts'){s.job='Night courier';s.equipment={}}
 if(entries[s.skill]?.group!=='Augmentations')s.skill='Neural link';
 if(entries[s.home]?.group!=='City housing')s.home='Transit bunk';
}
const baseLore = {
  "Beggar": "The baker leaves the back step dry for you. On good mornings he leaves a heel of bread there too.",
  "Farmer": "You learn the weight of rain by the way the barley bends.",
  "Fisherman": "While the village sleeps, you mend yesterday’s nets by touch.",
  "Miner": "You can hear a hollow seam one tap before the pick breaks through.",
  "Blacksmith": "People recognise your work by the little crescent your hammer leaves in a hinge.",
  "Merchant": "By winter you know which villages will trade flour for lamp oil.",
  "Squire": "The knight remembers the charge. You remember which buckle nearly failed.",
  "Footman": "At dusk you can find your place in the line by the sound of the boots beside you.",
  "Veteran footman": "The recruits watch your hands when the first horn sounds.",
  "Knight": "A village sends a horse for you before it sends word to the crown.",
  "Veteran knight": "You walk the field before dawn and count the places a frightened rider might fall.",
  "Elite knight": "Your orders arrive sealed. The stable hands have already saddled your horse.",
  "Holy knight": "Someone ties a strip of linen to your bridle for every soldier you bring home.",
  "Legendary knight": "Children play at being you in towns you have never visited.",
  "Student": "The first spell you copy is a light small enough to read the second by.",
  "Apprentice mage": "Your master lets you wind the clock whose hands run backwards.",
  "Mage": "The tower gives you a key and asks that you record everything you hear behind its door.",
  "Wizard": "A candle burns blue for three days before you find the error in the margin.",
  "Master wizard": "Former pupils send you their impossible questions. Some arrive decades before they are posted.",
  "Chairman": "At the head of the long table, you finally recognise the handwriting in the oldest minutes.",
  "Concentration": "You follow a single rain drop down the pane while the whole room argues.",
  "Productivity": "Lay out tomorrow’s tools before you put out tonight’s lamp.",
  "Bargaining": "A patient silence has bought you more than a clever speech.",
  "Meditation": "You sit until the chapel bell sounds like part of the wind.",
  "Strength": "By harvest the water pails hang straight from your hands.",
  "Battle tactics": "On a kitchen table, beans and a salt cellar become a hill worth defending.",
  "Muscle memory": "Your hands remember the knot after your tongue forgets its name.",
  "Mana control": "Hold a spark between finger and thumb until the paper beneath it stays cool.",
  "Immortality": "The physician counts your pulse twice, then asks to borrow your notebook.",
  "Time warping": "For one breath you hear both ends of the bell stroke.",
  "Super immortality": "The tree you planted as a child has fallen. You plant another in its place.",
  "Dark influence": "People lower their voices before you enter the room.",
  "Intimidation": "The toll keeper returns your coin and lifts the bar himself.",
  "Evil control": "You teach the thing behind your temper to wait for a word.",
  "Demon training": "Your shadow finishes the exercise after you have laid the sword down.",
  "Blood meditation": "Under your palm, the red stone keeps time with a slower pulse.",
  "Demon's wealth": "In your counting house the scales tip before the last coin lands.",
  "Divine Blessing": "A traveller lights a candle for you in a town whose name you never learned.",
  "Healing Aura": "The fever breaks while you are changing the water at the bedside.",
  "Pure Heart": "You return a purse anonymously. Years later its owner does the same.",
  "Angel's Guidance": "You wake with the last line of a prayer you heard only once.",
  "Spiritual Meditation": "At the end of the vigil you can pick out every voice in the chorus.",
  "Bountiful Grace": "One sack of grain feeds the whole street. The miller quietly brings another.",
  "Homeless": "A stone warmed by the bakery wall marks your place for the night.",
  "Tent": "For the first time you can listen to rain without getting up.",
  "Wooden hut": "You cut a notch in the doorpost for the first winter you spend here.",
  "Cottage": "Thyme grows between the kitchen step and the well.",
  "House": "There is a second chair by the fire, even when you live alone.",
  "Large house": "Morning reaches the east bedroom long before it finds the kitchen.",
  "Small palace": "From the balcony you can still make out the road where you started.",
  "Grand palace": "It takes the lamplighter half an hour to cross your courtyard.",
  "Mansion": "There is a room here for every life you remember.",
  "Book": "Someone before you has argued with the author in the margins.",
  "Dumbbells": "The iron is worn smooth exactly where your fingers settle.",
  "Personal squire": "Your squire can tell from the mud on your boots which kit to lay out.",
  "Steel longsword": "The balance point sits a finger’s breadth above the guard.",
  "Butler": "You reach for your travelling coat and find the torn cuff already mended.",
  "Sapphire charm": "Held to the light, its blue centre turns as slowly as a tide.",
  "Study desk": "A shallow groove in the wood keeps your quill from rolling.",
  "Library": "At last the note that baffled you at fourteen has a book to answer it."
};
const catalog = Object.values(entries);
function newLife() {
  return {days:5110, coins:0, job:'Beggar', skill:'Concentration', home:'Homeless',
    equipment:{}, levels:{}, xp:{}, unlocked:{}, memory:{}, hero:'', life:1,
    voidPath:false, voidHeart:false, heartPair:false, superHeart:false, crossedRift:false, chrono:0, Void:0, Evil:0, Angelic:0, orbs:{}, finished:false, paused:false, warp:true, devSpeed:1, clock:Date.now()};
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
function migrateVoid(s){
 migrateOldVoidTasks(s);
 removeOrbTraining(s);
 cityLoadout(s);
 if(s.orbs?.Void){s.voidHeart=true;delete s.orbs.Void}
 if(s.voidHeart){
   s.voidPath=true;
   delete s.orbs.Evil;delete s.orbs.Angelic;
 }else if(s.orbs?.Evil&&s.orbs.Angelic){
   s.voidPath=true;s.finished=false;

 }
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
const potionActive=kind=>Date.now()<(state[kind+'Until']||0);
function drink(kind){if(!potionActive(kind))state[kind+'Until']=Date.now()+600000}
const happy=()=>(potionActive('happiness')?2:1)*entries[state.home].effect*effect('Meditation')*item('Butler')/effect('Mind Seize');
const age=()=>Math.floor(state.days/365);
const lifespan=()=>70*(state.crossedRift?effect('Life support'):1)*effect('Immortality')*effect('Super immortality')*effect('Astral Body')*effect('Ceaseless Abyss');
const dead=()=>state.days>=lifespan()*365;
function rate(n){
  const e=entries[n];
  if(state.crossedRift){
    const recall=state.chrono>=1?2:1;
    const heartBonus=e.group==='Augmentations'?1+state.Void/10:1;
    return Math.round(30*(1+recall*(state.memory[n]||0)/10)*happy()*effect('Neural link')*heartBonus);
  }
  // Remastered adds a constant x3 to every task XP multiplier list (1.9.1).
  let gain=30*(1+(state.memory[n]||0)/10)*happy()*effect('Dark influence')*effect('Demon training')*effect('Divine Blessing')*effect("Angel's Guidance");
  if(e.income)gain*=effect('Productivity')*item('Personal squire');
  else gain*=effect('Concentration')*item('Book')*item('Study desk')*item('Library')*(state.orbs.Evil?5:1)*(state.orbs.Angelic?5:1);
  if(e.group==='Military')gain*=effect('Battle tactics')*item('Steel longsword')*(state.hero==='Isabella'?1.1:1);
  if(e.group==='The Arcane Association')gain*=effect('Mana control')*(state.hero==='Magnus'?1.1:1);
  gain*=effect('Void Influence');
  if(e.income)gain*=effect('Dark Knowledge');
  else gain*=effect('Void Symbiosis')*item('Void Blade')*effect('Evil Incarnate');
  if(e.group==='The Void')gain*=effect('Void Amplification')*item('Void Armor')*item('Void Dust');
  if(e.group==='Advanced dark magic')gain*=state.Evil;
  if(e.group==='Fundamentals')gain*=item("Mind's Eye");
  if(e.group==='Advanced arcana'&&e.income)gain*=effect('Mana control');
  if(e.group==='Magic'||(e.group==='Advanced arcana'&&!e.income))gain*=item('Observatory');
  if(e.group==='Void Manipulation')gain*=(1+state.Void/10)*item('Void Necklace')*item('Void Orb');
  if(n==='Strength')gain*=effect('Muscle memory')*item('Dumbbells');
  if(e.group==='Magic')gain*=item('Sapphire charm');
  if(e.group==='Dark magic')gain*=state.Evil;
  if(e.group==='Light magic')gain*=state.Angelic;
  return Math.round(gain);
}
function pay(n){return Math.round(entries[n].income*(state.crossedRift?effect('Circuit design'):1)*(['Advanced arcana','The Arcane Association'].includes(entries[n].group)?effect('All Seeing Eye'):1)*(1+Math.log10(level(n)+1))*effect("Demon's wealth")*effect('Bountiful Grace')*(entries[n].group==='Military'?effect('Strength'):1))}
function price(n){return Math.round(entries[n].expense*effect('Bargaining')*effect('Intimidation')*effect('Healing Aura')*effect('Brainwashing')*effect('Abyss Manipulation'))}
function upkeep(){return Object.keys(state.equipment).reduce((sum,n)=>sum+price(n),price(state.home))}
function gain(n,amount){
  state.xp[n]=(state.xp[n]||0)+amount;
  while(state.xp[n]>=threshold(n)){state.xp[n]-=threshold(n);state.levels[n]=level(n)+1}
}
function remaining(n){
  if(n==='Absolute Wish'&&(state.voidHeart||(state.orbs.Evil&&state.orbs.Angelic)))return [];
  if(state.unlocked[n])return [];
  const missing=Object.entries(entries[n].requirements).flatMap(([key,target])=>{
    const value=key==='Age'?age():key==='Coins'?state.coins:['Evil','Angelic'].includes(key)?state[key]:level(key);
    return value>=target?[]:[key+' '+Math.floor(value).toLocaleString()+'/'+target.toLocaleString()];
  });
  if(!missing.length)state.unlocked[n]=true;
  return missing;
}
function step(days){
  days=Math.min(days,Math.max(0,lifespan()*365-state.days));
  if(!days||state.finished)return;
  const jobRate=rate(state.job),skillRate=rate(state.skill),net=pay(state.job)-upkeep();
  state.days+=days;state.coins+=net*days;
  if(state.coins<0){state.coins=0;state.home=state.crossedRift?'Transit bunk':'Homeless';state.equipment={}}
  gain(state.job,jobRate*days);gain(state.skill,skillRate*days);
}
function alignmentGain(side){return side==='Evil'?(effect('Evil control')+effect('Blood meditation')):(effect('Pure Heart')+effect('Spiritual Meditation'))}
function voidGain(){
 if(state.crossedRift)return Math.floor(age()/200*(state.superHeart?2:1)*(state.chrono===5?2:1));
 return Math.floor(level('Absolute Wish')*effect('Void Embodiment')*(state.superHeart?2:1));
}
function heartEvilGain(){
 return (1+.01*level('Evil control'))*(1+.01*level('Blood meditation'))*effect('Absolute Wish')*effect('Void Embodiment');
}
// All levels are earned in the life in which the relic is claimed.
function relicRequirements(path){
 if(path==='Second Heart')return [['Age',age(),500],['Void Slave',level('Void Slave'),75],['Absolute Wish',level('Absolute Wish'),125],['Void Amplification',level('Void Amplification'),100],['Banked Void',state.Void,500]];
 if(path==='Rift')return [['Age',age(),600],['Void Fiend',level('Void Fiend'),100],['Mind Seize',level('Mind Seize'),150],['Banked Void',state.Void,2000]];
 if(path==='Void')return [['Age',age(),400],['Void to spend',state.Void,heartCost],['Evil Orb',Number(!!state.orbs.Evil),1],['Angelic Orb',Number(!!state.orbs.Angelic),1]];
 const group=path==='Evil'?'Dark magic':'Light magic';
 return [['Age',age(),300],[path,state[path],400],...catalog.filter(e=>e.group===group).map(e=>[e.name,level(e.name),e.name==="Demon's wealth"||e.name==='Bountiful Grace'?100:50])];
}
function relicReady(path){return relicRequirements(path).every(([,current,target])=>current>=target)}
function relicProgress(path){
 const name=path==='Void'?'Void Heart':path==='Second Heart'?'Second Void Heart':path==='Rift'?'Cross the Rift':path+' Orb';
 return '<section class="card"><h3>'+name+' requirements</h3><ul>'+relicRequirements(path).map(([label,current,target])=>'<li>'+(current>=target?'✓ ':'')+label+' · '+fmt(current)+' / '+target+'</li>').join('')+'</ul></section>';
}
const chronoSteps=[
 {action:'Record imprint',name:'Personality Imprint',age:65,skills:{'Relay technician':15,'Neural link':30},benefit:'Doubles the XP bonus from remembered levels.'},
 {action:'Link imprints',name:'Continuity Archive',age:120,skills:{'Grid engineer':25,'Circuit design':50},benefit:'Reboots remember the highest level recorded across your archived lives.'},
 {action:'Complete construct',name:'Chrono Personality Construct',age:200,skills:{'Grid engineer':75,'Neural link':100,'Life support':65},benefit:'Your construct can carry your identity through a one-way relay into another universe.'}
];
const chronoNames=['Unrecorded',...chronoSteps.map(step=>step.name),'Chrono Personality Construct','Continuum Heart'];
function cityChoices(){
 const actions=[];
 const step=chronoSteps[state.chrono];
 if(step&&age()>=step.age&&Object.entries(step.skills).every(([n,v])=>level(n)>=v))actions.push(step.action);
 if(state.chrono===3)actions.push('Transmit construct');
 if(state.chrono===4&&state.superHeart)actions.push('Fuse Continuum Heart');
 if(age()>=65)actions.push('Rebirth');
 if(age()>=200)actions.push('Collect Void');
 return actions;
}
function choices(){
  if(state.crossedRift)return cityChoices();

  if(state.voidPath&&state.heartPair&&!state.superHeart)return ['Super Void Heart'];
  if(age()<65)return [];
  if(state.voidPath&&state.superHeart&&!state.crossedRift&&relicReady('Rift'))return ['Cross the Rift','Collect Void','Rebirth'];
  if(state.voidPath&&state.voidHeart&&!state.superHeart&&relicReady('Second Heart'))return ['Second Heart','Collect Void','Rebirth'];
  if(state.voidPath){
    const actions=['Rebirth'];
    if(state.voidHeart&&age()>=200)actions.unshift('Collect Void');
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
  if(action==='Transmit construct'||action==='Fuse Continuum Heart'){state.chrono++;return}
  const upgrade=state.crossedRift&&chronoSteps[state.chrono]?.action===action;
  if(upgrade)state.chrono++;
  if(action==='Cross the Rift'){state.crossedRift=true;cityLoadout(state);return}
  if(action==='Super Void Heart'){state.superHeart=true;state.heartPair=false;return}

  let {hero,life,Evil,Angelic,orbs}=state;
  const memory={};
  if(upgrade||action==='Rebirth'||(action==='Collect Void'&&state.crossedRift)){
    Object.assign(memory,state.levels);
    if(state.chrono>=2)for(const [name,previous] of Object.entries(state.memory))memory[name]=Math.max(previous,memory[name]||0);
  }
  else if(action==='Evil'){Evil+=alignmentGain('Evil');Angelic=0}
  else if(action==='Angelic'){Angelic+=alignmentGain('Angelic');Evil=0}
  if(action==='Rebirth'&&state.voidPath&&!state.voidHeart)state.Void+=voidGain();
  if(action==='Collect Void'){state.Void+=voidGain();if(state.voidHeart&&!state.crossedRift)Evil+=heartEvilGain()}
  else if(action==='Second Heart')state.heartPair=true;
  else if(action==='Void Heart'){state.voidHeart=true;state.Void-=heartCost;orbs={};Evil=0;Angelic=0}
  else if(action.endsWith(' orb')){orbs={...orbs,[action.split(' ')[0]]:true};Evil=0;Angelic=0}
  state={...newLife(),hero,chrono:state.chrono,crossedRift:state.crossedRift,heartPair:state.heartPair,superHeart:state.superHeart,Void:state.Void,voidHeart:state.voidHeart,voidPath:state.voidPath||Boolean(orbs.Evil&&orbs.Angelic),devSpeed:state.devSpeed,life:life+1,Evil,Angelic,orbs,memory};
  cityLoadout(state);
}
function save(){try{localStorage.setItem(saveKey,JSON.stringify(state))}catch{statusText='Save unavailable in this browser.'}}
let tab='Jobs',chosen='Magnus',pending='',statusText='';
const screen=document.querySelector('#screen');
const fmt=n=>Math.floor(n).toLocaleString();
function sprite(i,size=54){
 return '<span aria-hidden="true" class="sprite" style="width:'+size+'px;height:'+size+'px;background-size:'+size*10+'px '+size*atlasRows+'px;background-position:'+(-size*(i%10))+'px '+(-size*Math.floor(i/10))+'px"></span>';
}
function estateArt(tile){return '<span aria-hidden="true" style="display:inline-block;flex:none;width:54px;height:54px;background:url(./void-estates.webp) '+tile*50+'% 0/300% 100%"></span>'}
function voidArt(tile,size,label){
 return '<span role="img" aria-label="'+label+'" style="display:inline-block;flex:none;border-radius:6px;width:'+size+'px;height:'+size+'px;background:url(./void-icons.webp) '+(tile%3*50)+'% '+(Math.floor(tile/3)*50)+'%/300% 300%"></span>';
}
function cityIcon(tile,size){
 return '<span aria-hidden="true" style="display:inline-block;flex:none;width:'+size+'px;height:'+size+'px;border-radius:4px;background:url(./neon-city.webp) '+(tile%3*50)+'% '+(Math.floor(tile/3)*50)+'%/300% 300%"></span>';
}
function cityTerminal(){
 const step=chronoSteps[state.chrono],actions=cityChoices();
 const notes=[
  'The receiver answers in your own voice. Inside the amulet, a copper wheel turns backwards. Each time the eye sent you back, it wrote a little of you into the glass.',
  'You play your imprint beside a recording from the last life. Both voices remember the same room. Only one remembers how to fix the relay.',
  'The archive finishes a sentence before you speak. For the first time, you ask the terminal who woke up on the other side of the eye.',
  'Your construct answers with your oldest memory. A signal arrives from a universe with no local copy of you. The relay is wide enough for one transmission.',
  'Under a motionless white sun, a relay clicks on inside an empty observatory. Your construct has made the crossing. In its palm, the Super Void Heart still beats.',
  'Two pulses settle into one. The observatory prints your name onto a clock that has never had hands. The Continuum Heart doubles the Void you bank here.'
 ];
 const labels={'Collect Void':'Bank '+voidGain()+' Void and reboot',Rebirth:'Reboot with XP memories'};
 const idx=Math.min(state.chrono,2)+(state.chrono===5?1:0);
 const art='<span aria-hidden="true" style="display:inline-block;width:76px;height:76px;background:url(./chronotech.webp) '+(idx%2*100)+'% '+(Math.floor(idx/2)*100)+'%/200% 200%"></span>';
 const needs=step?[['Age',age(),step.age],...Object.entries(step.skills).map(([name,target])=>[name,level(name),target])]:[];
 const progress=step?'<h3>'+step.name+'</h3><p>'+step.benefit+'</p><ul>'+needs.map(([n,v,t])=>'<li>'+(v>=t?'✓ ':'')+n+' · '+v+' / '+t+'</li>').join('')+'</ul>':'';
 const confirm=pending==='Transmit construct'?'Enter the Still Observatory. Your current life continues, and your city uplink stays active.':pending==='Fuse Continuum Heart'?'Bind the completed construct to the Super Void Heart. Its existing bonuses carry into the Continuum Heart. This life continues.':'Start a new life at age 14 with XP memories'+(pending==='Collect Void'?' and '+voidGain()+' more Void':'')+(step?.action===pending?' and the '+step.name:'')+'?';
 return '<h2>'+ (state.chrono>=4?'Observatory relay':'Relay terminal')+'</h2>'+art+'<h3>'+chronoNames[state.chrono]+'</h3><p>'+notes[state.chrono]+'</p><p>Banked Void · '+fmt(state.Void)+' · Augment XP ×'+(1+state.Void/10).toFixed(1)+' · Void Heart lineage</p>'+progress+
 actions.map(a=>button('ask:'+a,labels[a]||a)).join(' ')+(pending?'<section class="card"><p>'+confirm+'</p>'+button('accept','Confirm')+' '+button('cancel','Cancel')+'</section>':'');

}
function portrait(){
 if(state.crossedRift||state.voidHeart){
   const city=state.crossedRift;
   const years=age(),stage=years>=100?4:years>=65?3:years>=45?2:years>=30?1:0;
   const row=state.hero==='Isabella'?100:0;
   return '<span role="img" aria-label="'+state.hero+(city?' · Night Shift · age ':' · Void · age ')+years+'" style="display:inline-block;flex:none;width:76px;height:76px;border-radius:5px;background:url(./'+(city?'city-portraits.webp':'void-forms.svg')+') '+(stage*25)+'% '+row+'%/500% 200%"></span>';
 }
 const alignment=state.Evil?'_evil':state.Angelic?'_angelic':'';
 const years=age();
 if(!dead() && years>=100 && !alignment){
   const variant=state.hero==='Isabella'?' isabella-100':'';
   return '<span role="img" aria-label="'+state.hero+', age '+years+'" class="centenarian'+variant+'"></span>';
 }
 const stage=dead()?'dead':years>=100?120:years>=65?60:years>=45?45:years>=30?30:14;
 return sprite(artIndex['avatar_'+state.hero.toLowerCase()+'_'+stage+alignment],76);
}
function button(a,label,on=false){return '<button data-act="'+a+'" class="'+(on?'on':'')+'">'+label+'</button>'}
function meter(n){
 const fraction=(state.xp[n]||0)/threshold(n);
 return '<div class="bar xp-track" data-meter="'+n+'"><i style="transform:scaleX('+fraction+')"></i></div>';
}
function daysPerSecond(now){
 const rested=now<(state.restedUntil||0)?state.restedSpeed:1;
 return 5*state.devSpeed*rested*(potionActive('accelerating')?2:1)*(state.warp?effect('Time warping')*effect('Temporal Dimension')*effect('Time Loop'):1);
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
function list(){
 const groups=state.crossedRift?[{Jobs:'City contracts',Skills:'Augmentations',Shop:'City housing'}[tab]]:tab==='Jobs'?['Common work','Military','The Arcane Association',...(state.voidHeart?['Advanced arcana','The Void']:[])]:tab==='Skills'?['Fundamentals','Combat','Magic','Dark magic','Light magic',...(state.voidHeart?['Advanced arcana','Advanced dark magic']:[]),...(state.voidPath?['Void Manipulation']:[])]:['Properties',...(state.voidHeart?['Void properties','Void equipment']:[]),'Misc'];
 return groups.filter(g=>g!=='Dark magic'||state.Evil).filter(g=>g!=='Light magic'||state.Angelic).map(g=>{
  let lockedShown=false;
  const rows=catalog.filter(e=>e.group===g&&(g!=='Advanced arcana'||Boolean(e.income)===(tab==='Jobs'))&&(g!=='Void Manipulation'||state.voidHeart||e.name==='Absolute Wish')).map(e=>{
   const n=e.name,missing=remaining(n);
   if(missing.length&&lockedShown&&!voidCatalog.includes(e)&&g!=='Dark magic'&&g!=='Light magic')return '';
   if(missing.length)lockedShown=true;
   const selected=[state.job,state.skill,state.home].includes(n)||state.equipment[n];
   const xpNote=e.maxXp?' · '+fmt(rate(n))+' XP/day':'';
   const info=e.income?fmt(pay(n))+(state.crossedRift?' credits/day':' coins/day'):e.maxXp?(e.isPlusDescription?'+':'×')+effect(n).toFixed(2)+' '+e.description:'×'+e.effect+' '+(e.description||'Happiness');
   const action=e.income?'job':e.maxXp?'skill':(g==='Properties'||g==='City housing'||g==='Void properties')?'home':'gear';
   return '<button class="row '+(selected?'on':'')+'" aria-pressed="'+Boolean(selected)+'" data-act="'+action+':'+n+'" '+(missing.length?'disabled':'')+'>'+(state.crossedRift?cityIcon(e.tile,54):g==='Void properties'?estateArt(e.tile%3):voidCatalog.includes(e)?voidArt(e.tile%8,54,n):sprite(e.tile))+'<span><b>'+n+'</b>'+(selected&&baseLore[n]?'<small>'+baseLore[n]+'</small>':'')+'<small>'+(missing.length?missing.join(' · '):info+xpNote)+'</small></span><span class="right">'+(action==='gear'?(selected?'On · ':'Off · '):'')+(e.maxXp?'<span>Lv. '+level(n)+'</span>'+meter(n):fmt(price(n))+' / day')+'</span></button>';
  }).join('');
  return '<h3>'+g+'</h3>'+rows;
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
function amulet(){
 if(state.voidPath){
   const available=choices();
   const titles={'Cross the Rift':'Step through the rift','Void Heart':'Fuse amulet and orbs · 400 Void','Second Heart':'Draw out the second Heart','Super Void Heart':'Combine both Void Hearts','Collect Void':'Collect '+voidGain()+' Void',Rebirth:state.voidHeart?'Rebirth through the Heart':'Touch the eye · bank '+voidGain()+' Void'};
   const passages={
     'Void Heart':'You pour the Void through the eye, a measure for every year of this long life. The copper softens around the two stones. The chain slips through your fingers as a violet heart takes its first beat beneath your ribs.',
     'Cross the Rift':'The knock comes again. This time you answer. A thin line opens in the glass of the amulet, wide enough for a hand, then a shoulder. You step through carrying the memory of every year it took to get here.',
     'Second Heart':'For a lifetime you have heard a second beat just behind your own. You open the amulet. Beside the first Heart, another has taken shape around a grain of Void.',
     'Super Void Heart':'You cradle one Heart in each hand. They beat against one another until you turn the second to fit the first. The seam closes. Somewhere beyond the amulet, something knocks once in reply.'
   };
   const title=state.superHeart?'Super Void Heart':state.heartPair?'Two Void Hearts':state.voidHeart?'Void Heart':'The twin sockets';
   const story=state.crossedRift?'You have crossed the rift. Collecting Void now carries this life’s job and skill levels into the next as XP memories.':state.superHeart?'The Super Void Heart doubles every Void collection. Across the rift, something answers its beat.':state.heartPair?'Two Hearts rest in the amulet. Turn them together to seal the bond.':state.voidHeart?'The fused orbs beat as one. Bank Void and master the path again to grow a second Heart.':'Held apart, the two orbs cast ordinary shadows. Held together, they leave a darkness that stays on your fingers. Train Absolute Wish. Each level earned this life banks one Void when you touch the eye to be reborn. At age 400, the copper can hold both stones.';
   const details=pending==='Void Heart'?'Spend 400 Void and consume the amulet and both orbs. Both orb XP bonuses end. Be reborn at 14 with the Void Heart and '+fmt(state.Void-heartCost)+' Void. Current levels, possessions and XP memories reset.':pending==='Cross the Rift'?'Enter the neon city in this life. The Super Void Heart carries over, and collecting Void also preserves XP memories.':pending==='Super Void Heart'?'The two Hearts become one. Void collection doubles permanently. This life continues.':pending==='Collect Void'&&state.crossedRift?'Bank the Void and begin a new life with your current levels as XP memories.':pending==='Rebirth'?'Begin a new life with your current levels as XP memories.':'Begin a new life. Current levels and XP memories reset. Banked Void and permanent bonuses carry over.';
   return '<h2>'+title+'</h2>'+(state.voidHeart?voidArt(8,90,title):sprite(artIndex.icons_amulet_65,76)+sprite(artIndex.icons_angelicorb,50)+sprite(artIndex.icons_evilorb,50))+'<p>'+story+'</p><p>Void collected · '+fmt(state.Void)+(state.voidHeart?'<br>Void skill XP ×'+(1+state.Void/10).toFixed(1):'')+'</p>'+
     (!state.voidHeart?relicProgress('Void'):!state.heartPair&&!state.superHeart?relicProgress('Second Heart'):state.superHeart&&!state.crossedRift?relicProgress('Rift'):'')+
     available.map(a=>button('ask:'+a,titles[a]+(a==='Collect Void'&&state.voidHeart?' · +'+heartEvilGain().toFixed(2)+' Evil':''))).join(' ')+
     (pending?'<section class="card"><p>'+(passages[pending]||titles[pending])+'</p><p>'+details+'</p>'+button('accept','Confirm '+pending)+' '+button('cancel','Keep playing')+'</section>':'');


 }
 const side=state.Evil?'evil':'angelic';
 const art=age()>=300&&(state.Evil||state.Angelic)?'broken_'+side:age()>=200?'200_'+side+'_transparent':age()>=65?'65':age()>=45?'45':'25';
 const actions=choices();
 const years=age();
 const chapter=years>=300&&(state.Evil||state.Angelic)?'broken':years>=200?(state.Evil?'evil':state.Angelic?'angelic':'paths'):years>=65?'eye':years>=45?'etching':'found';
 const inspection=years<65?'<p>The lid holds fast under your thumb.</p>':chapter==='eye'?'<p>Touch the eye to wake at fourteen. Your coins and equipment stay behind. Each remembered job or skill grants ×(1 + its level / 10) XP in your next life.</p><p>Concentration · ×'+(1+level('Concentration')/10).toFixed(1)+' next life. Around the rim are two hundred small notches.</p>':'';
 const artwork=sprite(artIndex['icons_amulet_'+art],90);
 return '<h2>Amulet</h2>'+(inspection?button('inspect',artwork+'<br>Inspect amulet'):artwork)+amuletStory[chapter]+
 (state.Evil&&!state.orbs.Evil?relicProgress('Evil'):state.Angelic&&!state.orbs.Angelic?relicProgress('Angelic'):'')+
 (inspectingAmulet?inspection:'')+
 actions.map(a=>button('ask:'+a,a==='Rebirth'?'Touch the eye':a.endsWith('orb')?sprite(artIndex['icons_'+a.split(' ')[0].toLowerCase()+'orb'],44)+' Claim '+(a==='Angelic orb'?'Angelic Orb':'Evil Orb')+' · ×5 skill XP':'Embrace '+a+' (+'+alignmentGain(a).toFixed(2)+')')).join(' ')+
 (pending?'<div class="card"><p>'+(pending==='Rebirth'?'Your current levels become your next life’s XP memories.':'This resets your current levels and XP memories. Your earned orbs carry forward.')+'</p>'+button('accept','Confirm '+pending)+' '+button('cancel','Keep playing')+'</div>':'')+
 '<p>Lives lived · '+state.life+'<br>Evil · '+state.Evil.toFixed(2)+'　Angelic · '+state.Angelic.toFixed(2)+'</p>'+Object.keys(state.orbs).map(o=>sprite(artIndex['icons_'+o.toLowerCase()+'orb'])+' '+o+' orb').join(' ');
}
function render(){draw();bindMotion();scheduleMotion()}
function draw(){
 if(document.body)document.body.classList.toggle('city',!!state.crossedRift);
 if(!state.hero){
   const cards=['Magnus','Isabella'].map(name=>{
     const selected=chosen===name;
     const talent=name==='Magnus'?'Magic':'Military';
     const portrait=sprite(artIndex['avatar_'+name.toLowerCase()+'_14'],72);
     return `<button type="button" class="candidate ${selected?'on':''}" aria-pressed="${selected}" data-act="choose:${name}">${portrait}<span><strong>${name}</strong><small>Age 14</small><small class="talent">${talent} jobs XP ×1.1</small></span><span class="mark" aria-hidden="true">${selected?'✓':''}</span></button>`;
   }).join('');
   screen.innerHTML=`<section class="launch"><h1>Choose your character</h1><div class="roster">${cards}</div><button type="button" class="primary" data-act="begin">Continue as ${chosen}</button></section>`;
   return;
 }
 const rested=Date.now()<(state.restedUntil||0)?' · Rested speed ×'+state.restedSpeed.toFixed(2):'';const top='<div class="card profile">'+portrait()+'<div><b>'+state.hero+'</b> · Life '+state.life+'<br><span data-clock>Age '+age()+' · '+Math.floor(state.days%365)+' days</span> · Lifespan '+Math.floor(lifespan())+'<br><span class="gold">◉ <span data-coins>'+fmt(state.coins)+'</span> · '+fmt(pay(state.job)-upkeep())+' net/day</span><br>Happiness ×'+happy().toFixed(2)+rested+'</div></div>';
 if(state.crossedRift){
   if(dead())tab='Amulet';
   const where=tab==='Amulet'?'Terminal':tab==='Jobs'?'Contracts':tab==='Skills'?'Augments':'Housing';
   const tabs=[['Jobs','Contracts'],['Skills','Augments'],['Shop','Housing'],['Amulet','Terminal']];
   screen.innerHTML=top.replace('◉','₡')+'<div class="city-banner">'+cityIcon(8,66)+(state.chrono>=4?'<div><small>CITY UPLINK ACTIVE</small><h1>Still Observatory</h1></div>':'<div><small>RIFT DISTRICT</small><h1>Night Shift</h1></div>')+'</div><nav>'+tabs.map(([key,label])=>button('tab:'+key,label,where===label)).join('')+'</nav><section class="card">'+(tab==='Amulet'?cityTerminal():list())+'</section><footer>'+button('pause',state.paused?'Resume':'Pause')+' · Test speed '+[1,5,20].map(v=>button('devSpeed:'+v,v+'×',state.devSpeed===v)).join(' ')+'</footer>';
   return;
 }

 if(dead())tab='Amulet';
 const nav=['Jobs','Skills','Shop',...(age()>=25||state.voidPath?['Amulet']:[])];
 screen.innerHTML=top+'<nav>'+nav.map(t=>button('tab:'+t,t==='Amulet'&&state.voidHeart?'Heart':t,t===tab)).join('')+'</nav><section class="card">'+(tab==='Amulet'?amulet():list())+'</section><footer>'+state.job+' · Lv. '+level(state.job)+'　'+state.skill+' · Lv. '+level(state.skill)+'<p>'+button('pause',state.paused?'Resume':'Pause')+' '+(level('Time warping')?button('warp','Time warping '+(state.warp?'on':'off')):'')+'</p>'+['happiness','accelerating'].map(k=>button('potion:'+k,(k==='happiness'?'Happiness':'Speed')+' ×2 · '+(potionActive(k)?Math.ceil((state[k+'Until']-Date.now())/1000)+'s':'10 min'),potionActive(k))).join(' ')+'<p>Developer speed　'+[1,5,20].map(v=>button('devSpeed:'+v,v+'×',state.devSpeed===v)).join(' ')+'</p><p><a href="./previous.html">Earlier prototype save</a></p>'+statusText+'</footer>';
}
function advance(){
 const now=Date.now(),elapsed=Math.max(0,(now-state.clock)/1000);state.clock=now;
 if(state.hero&&!state.paused&&!state.finished){
    if(elapsed>900){
    state.restedUntil=now+30000;
    state.restedSpeed=1.5+Math.min(6.5,elapsed/7200);
    return;
  }
  let days=Math.min(elapsed,300)*daysPerSecond(now);
  while(days>0&&!dead()){const slice=Math.min(5,days);step(slice);days-=slice}
 }
}
screen.onclick=e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;advance();
 const [a,v]=b.dataset.act.split(':');
 if(a==='inspect')inspectingAmulet=!inspectingAmulet;
 if(a==='tab'||a==='accept')inspectingAmulet=false;
 if(a==='choose')chosen=v;
 if(a==='begin'&&!state.hero)state.hero=chosen;
 if(a==='tab'){tab=v;pending=''}
 if(a==='ask'&&choices().includes(v)){pending=v;if(v==='Rebirth')inspectingAmulet=true}
 if(a==='cancel')pending='';
 if(a==='accept'&&pending){reset(pending);tab=state.crossedRift||['Second Heart','Super Void Heart','Cross the Rift'].includes(pending)?'Amulet':'Jobs';pending=''}
 if(a==='pause')state.paused=!state.paused;
 if(a==='potion'&&['happiness','accelerating'].includes(v))drink(v);
 if(a==='devSpeed'&&[1,5,20].includes(Number(v)))state.devSpeed=Number(v);
 if(a==='warp')state.warp=!state.warp;
 if(entries[v]&&(!voidCatalog.includes(entries[v])||state.voidHeart||(v==='Absolute Wish'&&state.orbs.Evil&&state.orbs.Angelic))&&!remaining(v).length&&!dead()){
  if(['job','skill'].includes(a))state[a]=v;
  if(a==='home')state.home=state.home===v?(state.crossedRift?'Transit bunk':'Homeless'):v;
  if(a==='gear'){if(state.equipment[v])delete state.equipment[v];else state.equipment[v]=true}
 }
 save();render();
};
let pressingControl=false;
if(screen.addEventListener){
 screen.addEventListener('pointerdown',e=>{pressingControl=Boolean(e.target.closest('button'))});
 for(const event of ['pointerup','pointercancel','blur'])addEventListener(event,()=>{pressingControl=false});
}
advance();render();setInterval(()=>{advance();save();if(!pressingControl&&!document.querySelector('button:active'))render()},1000);
addEventListener('pagehide',()=>{advance();save()});
if(document.addEventListener)document.addEventListener('visibilitychange',()=>{if(!document.hidden){advance();render()}else{advance();save()}});








