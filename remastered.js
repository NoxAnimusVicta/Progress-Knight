const saveKey = 'pk-remastered-191';
for(const [name,tile,income,maxXp,requirements] of [
 ['Rift keeper',0,1200,800,{}],['Rift scout',1,3600,1600,{'Rift keeper':20}],
 ['Breach warden',2,10800,3200,{'Rift scout':30,'Rift weaving':12}],
 ['Void regent',3,32400,6400,{'Breach warden':40,'Void resonance':20}]
])entries[name]={name,tile,income,maxXp,requirements,group:'Void work'};
for(const [name,tile,effect,description,maxXp,requirements] of [
 ['Timelessness',4,.01,'lifespan',800,{}],['Rift weaving',5,.025,'Void job XP',900,{}],
 ['Void resonance',6,.025,'Void wages',1200,{'Rift weaving':12}],
 ['Void attunement',7,.05,'Void collected',1500,{'Void resonance':12}],
 ['Void Heart',8,.10,'Void collected',2000,{}]
])entries[name]={name,tile,effect,description,maxXp,requirements,group:'Void magic'};
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
function cityLoadout(s){
 if(!s.crossedRift)return;
 if(entries[s.job]?.group!=='City contracts'){s.job='Night courier';s.equipment={}}
 if(entries[s.skill]?.group!=='Augmentations')s.skill='Neural link';
 if(entries[s.home]?.group!=='City housing')s.home='Transit bunk';
}
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
function migrateVoid(s){
 removeOrbTraining(s);
 cityLoadout(s);
 if(s.orbs?.Void){s.voidHeart=true;delete s.orbs.Void}
 return s;
}
migrateVoid(state);
function level(name){return state.levels[name] || 0}
function threshold(name){const l=level(name);return Math.round(entries[name].maxXp*(l+1)*1.01**l)}
function effect(name){
  const l=level(name), log=Math.log1p(l);
  if(['Bargaining','Intimidation','Healing Aura'].includes(name))return Math.max(.1,1-log/Math.log(7)/10);
  if(['Immortality','Super immortality'].includes(name))return 1+log/Math.log(33);
  if(name==='Time warping')return 1+log/Math.log(13);
  if(['Blood meditation','Spiritual Meditation'].includes(name))return l*entries[name].effect;
  return 1+l*entries[name].effect;
}
const item=n=>state.equipment[n] ? entries[n].effect : 1;
const potionActive=kind=>Date.now()<(state[kind+'Until']||0);
function drink(kind){if(!potionActive(kind))state[kind+'Until']=Date.now()+600000}
const happy=()=>(potionActive('happiness')?2:1)*entries[state.home].effect*effect('Meditation')*item('Butler');
const age=()=>Math.floor(state.days/365);
const lifespan=()=>70*(state.crossedRift?effect('Life support'):1)*effect('Immortality')*effect('Super immortality')*(state.voidPath?effect('Timelessness'):1);
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
  if(e.group==='Void work')gain*=effect('Rift weaving');
  if(e.group==='Void magic')gain*=1+state.Void/10;
  if(n==='Strength')gain*=effect('Muscle memory')*item('Dumbbells');
  if(e.group==='Magic')gain*=item('Sapphire charm');
  if(e.group==='Dark magic')gain*=state.Evil;
  if(e.group==='Light magic')gain*=state.Angelic;
  return Math.round(gain);
}
function pay(n){return Math.round(entries[n].income*(state.crossedRift?effect('Circuit design'):1)*(entries[n].group==='Void work'?effect('Void resonance'):1)*(1+Math.log10(level(n)+1))*effect("Demon's wealth")*effect('Bountiful Grace')*(entries[n].group==='Military'?effect('Strength'):1))}
function price(n){return Math.round(entries[n].expense*effect('Bargaining')*effect('Intimidation')*effect('Healing Aura'))}
function upkeep(){return Object.keys(state.equipment).reduce((sum,n)=>sum+price(n),price(state.home))}
function gain(n,amount){
  state.xp[n]=(state.xp[n]||0)+amount;
  while(state.xp[n]>=threshold(n)){state.xp[n]-=threshold(n);state.levels[n]=level(n)+1}
}
function remaining(n){
  if(state.unlocked[n])return [];
  const missing=Object.entries(entries[n].requirements).flatMap(([key,target])=>{
    const value=key==='Coins'?state.coins:['Evil','Angelic'].includes(key)?state[key]:level(key);
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
function voidGain(){return Math.floor(age()/200*effect('Void attunement')*effect('Void Heart')*(state.superHeart?2:1)*(state.chrono===5?2:1))}
// All levels are earned in the life in which the relic is claimed.
function relicRequirements(path){
 if(path==='Second Heart')return [['Age',age(),500],['Void regent',level('Void regent'),75],['Void attunement',level('Void attunement'),125],['Void Heart',level('Void Heart'),100],['Banked Void',state.Void,500]];
 if(path==='Rift')return [['Age',age(),600],['Void regent',level('Void regent'),100],['Void Heart',level('Void Heart'),150],['Banked Void',state.Void,2000]];
 if(path==='Void')return [['Age',age(),400],['Void regent',level('Void regent'),50],...catalog.filter(e=>e.group==='Void magic'&&e.name!=='Void Heart').map(e=>[e.name,level(e.name),e.name==='Void attunement'?100:50])];
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
  if(state.finished)return state.orbs.Evil&&state.orbs.Angelic&&!state.voidPath?['Void']:[];
  if(state.voidPath&&state.heartPair&&!state.superHeart)return ['Super Void Heart'];
  if(age()<65)return [];
  if(state.voidPath&&state.superHeart&&!state.crossedRift&&relicReady('Rift'))return ['Cross the Rift','Collect Void','Rebirth'];
  if(state.voidPath&&state.voidHeart&&!state.superHeart&&relicReady('Second Heart'))return ['Second Heart','Collect Void','Rebirth'];
  if(state.voidPath)return !state.voidHeart&&state.orbs.Evil&&state.orbs.Angelic&&relicReady('Void')?['Void Heart','Rebirth']:state.voidHeart&&age()>=200?['Collect Void','Rebirth']:['Rebirth'];
  
  const actions=['Rebirth'];
  if(age()>=200&&state.orbs.Evil&&state.orbs.Angelic)return ['Ending'];
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
  if(action==='Ending'){state.finished=true;return}
  let {hero,life,Evil,Angelic,orbs}=state;
  const memory={};
  if(upgrade||action==='Rebirth'||(action==='Collect Void'&&state.crossedRift)){
    Object.assign(memory,state.levels);
    if(state.chrono>=2)for(const [name,previous] of Object.entries(state.memory))memory[name]=Math.max(previous,memory[name]||0);
  }
  else if(action==='Evil'){Evil+=alignmentGain('Evil');Angelic=0}
  else if(action==='Angelic'){Angelic+=alignmentGain('Angelic');Evil=0}
  if(action==='Collect Void')state.Void+=voidGain();
  else if(action==='Second Heart')state.heartPair=true;
  else if(action==='Void Heart')state.voidHeart=true;
  else if(action.endsWith(' orb')){orbs={...orbs,[action.split(' ')[0]]:true};Evil=0;Angelic=0}
  state={...newLife(),hero,chrono:state.chrono,crossedRift:state.crossedRift,heartPair:state.heartPair,superHeart:state.superHeart,Void:state.Void,voidHeart:state.voidHeart,voidPath:state.voidPath||action==='Void',devSpeed:state.devSpeed,life:life+1,Evil,Angelic,orbs,memory};
  cityLoadout(state);
}
function save(){try{localStorage.setItem(saveKey,JSON.stringify(state))}catch{statusText='Save unavailable in this browser.'}}
let tab='Jobs',chosen='Magnus',pending='',statusText='';
const screen=document.querySelector('#screen');
const fmt=n=>Math.floor(n).toLocaleString();
function sprite(i,size=54){
 return '<span aria-hidden="true" class="sprite" style="width:'+size+'px;height:'+size+'px;background-size:'+size*10+'px '+size*atlasRows+'px;background-position:'+(-size*(i%10))+'px '+(-size*Math.floor(i/10))+'px"></span>';
}
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
 return '<h2>'+ (state.chrono>=4?'Observatory relay':'Relay terminal')+'</h2>'+art+'<h3>'+chronoNames[state.chrono]+'</h3><p>'+notes[state.chrono]+'</p><p>Banked Void · '+fmt(state.Void)+' · Augment XP ×'+(1+state.Void/10).toFixed(1)+' · Orb bonuses sealed</p>'+progress+
 actions.map(a=>button('ask:'+a,labels[a]||a)).join(' ')+(pending?'<section class="card"><p>'+confirm+'</p>'+button('accept','Confirm')+' '+button('cancel','Cancel')+'</section>':'');

}
function portrait(){
 if(state.crossedRift||state.voidPath){
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
 return 5*state.devSpeed*rested*(potionActive('accelerating')?2:1)*(state.warp?effect('Time warping'):1);
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
 const groups=state.crossedRift?[{Jobs:'City contracts',Skills:'Augmentations',Shop:'City housing'}[tab]]:tab==='Jobs'?['Common work','Military','The Arcane Association',...(state.voidPath?['Void work']:[])]:tab==='Skills'?['Fundamentals','Combat','Magic','Dark magic','Light magic',...(state.voidPath?['Void magic']:[])]:['Properties','Misc'];
 return groups.filter(g=>g!=='Dark magic'||state.Evil).filter(g=>g!=='Light magic'||state.Angelic).map(g=>{
  let lockedShown=false;
  const rows=catalog.filter(e=>e.group===g&&(e.name!=='Void Heart'||state.voidHeart)).map(e=>{
   const n=e.name,missing=remaining(n);
   if(missing.length&&lockedShown&&g!=='Dark magic'&&g!=='Light magic')return '';
   if(missing.length)lockedShown=true;
   const selected=[state.job,state.skill,state.home].includes(n)||state.equipment[n];
   const xpNote=e.maxXp?' · '+fmt(rate(n))+' XP/day':'';
   const info=e.income?fmt(pay(n))+(state.crossedRift?' credits/day':' coins/day'):e.maxXp?(e.isPlusDescription?'+':'×')+effect(n).toFixed(2)+' '+e.description:'×'+e.effect+' '+(e.description||'Happiness');
   const action=e.income?'job':e.maxXp?'skill':(g==='Properties'||g==='City housing')?'home':'gear';
   return '<button class="row '+(selected?'on':'')+'" aria-pressed="'+Boolean(selected)+'" data-act="'+action+':'+n+'" '+(missing.length?'disabled':'')+'>'+(state.crossedRift?cityIcon(e.tile,54):g.startsWith('Void ')?voidArt(e.tile,54,n):sprite(e.tile))+'<span><b>'+n+'</b><small>'+(missing.length?missing.join(' · '):info+xpNote)+'</small></span><span class="right">'+(action==='gear'?(selected?'On · ':'Off · '):'')+(e.maxXp?'<span>Lv. '+level(n)+'</span>'+meter(n):fmt(price(n))+' / day')+'</span></button>';
  }).join('');
  return '<h3>'+g+'</h3>'+rows;
 }).join('');
}
const amuletStory = {
  "found": "<h3>ON YOUR 25TH BIRTHDAY...</h3><p>You stumble across a strange looking amulet.</p><p>It does not look like it has any worth on the market given that it's made from cheap-looking copper. However, you feel a weird urge to keep the amulet, so you slip it into your pocket for safekeeping.</p>",
  "etching": "<h3>ON YOUR 45TH BIRTHDAY...</h3><p>You feel the amulet shiver uncontrollably in your pocket.</p><p>You take it out and the constant shivering suddenly stops. More to your bizarre surprise, you notice a strange etching on the centre of the amulet.</p>",
  "eye": "<h3>ON YOUR 65TH BIRTHDAY...</h3><p>You once again encounter the strange, unexplained shivering from your amulet.</p><p>But this time, a living eyeball emerges from the centre. Although terribly frightened, you realise you do not have many years to live left anyway so you consider touching the eye to see what happens.</p>",
  "paths": "<h3>ON YOUR 200TH BIRTHDAY...</h3><p>The moment you hit the grand age of 200, you hear an ominous hum coming from the amulet.</p><p>A mouth emerges from its surface and begins to cackle, and proceeds to say: 'So you've made it this far... Are you ready to embrace evil?</p><p>Will you succumb to the allure of darkness, wielding its destructive powers? Or will you resist its temptations and embark on a path of light, using your abilities to foster harmony?</p>",
  "evil": "<h3>ON YOUR 200TH BIRTHDAY...</h3><p>The moment you hit the grand age of 200, the ominous hum is coming back.</p><p>You can choose to become more evil than never...</p><p>Or keep your current evil level but increase your XP bonus....</p>",
  "angelic": "<h3>ON YOUR 200TH BIRTHDAY...</h3><p>The moment you hit the grand age of 200, the ominous hum is coming back.</p><p>You can choose to become more angelic than never...</p><p>Or keep your current angelic level but increase your XP bonus....</p>",
  "broken": "<h3>ON YOUR 300TH BIRTHDAY...</h3><p>Many ages have passed, and the amulet has endured the test of time, only to finally break apart.</p><p>You attempt to separate the center from the remaining debris of the amulet.</p>",
  "ending": "<h3>The legend seems to be true...</h3><p>You have completed both arcs and gathered the two orbs. You have already completed a long journey.</p><p>Stay tuned for the upcoming evolutions and the next realm....</p>"
};
let inspectingAmulet=false;
function amulet(){
 if(state.voidPath){
   const available=choices();
   const titles={'Cross the Rift':'Step through the rift','Void Heart':'Fuse the Evil and Angelic Orbs','Second Heart':'Draw out the second Heart','Super Void Heart':'Combine both Void Hearts','Collect Void':'Collect '+voidGain()+' Void',Rebirth:'Touch the eye'};
   const passages={
     'Void Heart':'You press the Evil Orb into one socket of the amulet and the Angelic Orb into the other. The red light beats first. The white answers. When the two beats fall together, a small violet heart stirs between your hands.',
     'Cross the Rift':'The knock comes again. This time you answer. A thin line opens in the glass of the amulet, wide enough for a hand, then a shoulder. You step through carrying the memory of every year it took to get here.',
     'Second Heart':'For a lifetime you have heard a second beat just behind your own. You open the amulet. Beside the first Heart, another has taken shape around a grain of Void.',
     'Super Void Heart':'You cradle one Heart in each hand. They beat against one another until you turn the second to fit the first. The seam closes. Somewhere beyond the amulet, something knocks once in reply.'
   };
   const title=state.superHeart?'Super Void Heart':state.heartPair?'Two Void Hearts':'Void Heart';
   const story=state.crossedRift?'You have crossed the rift. Collecting Void now carries this life’s job and skill levels into the next as XP memories.':state.superHeart?'The Super Void Heart doubles every Void collection. Across the rift, something answers its beat.':state.heartPair?'Two Hearts rest in the amulet. Turn them together to seal the bond.':state.voidHeart?'The fused orbs beat as one. Bank Void and master the path again to grow a second Heart.':'The Evil Orb warms your palm. The Angelic Orb draws cold against it. The amulet has a socket for each.';
   const details=pending==='Cross the Rift'?'Enter the neon city in this life. Both orb XP bonuses go dormant. The Super Void Heart carries over, and collecting Void also preserves XP memories.':pending==='Super Void Heart'?'The two Hearts become one. Void collection doubles permanently. This life continues.':pending==='Collect Void'&&state.crossedRift?'Bank the Void and begin a new life with your current levels as XP memories.':pending==='Rebirth'?'Begin a new life with your current levels as XP memories.':'Begin a new life. Current levels and XP memories reset. Banked Void and permanent bonuses carry over.';
   return '<h2>'+title+'</h2>'+voidArt(8,90,title)+'<p>'+story+'</p><p>Void collected · '+fmt(state.Void)+'<br>Void skill XP ×'+(1+state.Void/10).toFixed(1)+'</p>'+
     (!state.voidHeart?relicProgress('Void'):!state.heartPair&&!state.superHeart?relicProgress('Second Heart'):state.superHeart&&!state.crossedRift?relicProgress('Rift'):'')+
     available.map(a=>button('ask:'+a,titles[a])).join(' ')+
     (pending?'<section class="card"><p>'+(passages[pending]||titles[pending])+'</p><p>'+details+'</p>'+button('accept','Confirm '+pending)+' '+button('cancel','Keep playing')+'</section>':'');


 }
 const side=state.Evil?'evil':'angelic';
 const art=age()>=300&&(state.Evil||state.Angelic)?'broken_'+side:age()>=200?'200_'+side+'_transparent':age()>=65?'65':age()>=45?'45':'25';
 const actions=choices();
 const years=age();
 const chapter=actions.includes('Ending')?'ending':years>=300&&(state.Evil||state.Angelic)?'broken':years>=200?(state.Evil?'evil':state.Angelic?'angelic':'paths'):years>=65?'eye':years>=45?'etching':'found';
 const inspection=years<65?'<p>Nothing happens...</p>':chapter==='eye'?"<p>By touching the eyeball, you will be reborn and have to restart life again, losing all your levels and coins.</p><p>However, you will gain xp multipliers for your jobs and skills equivalent to 1 + the max level of the skill or job / 10 :</p>"+'<p>Concentration · ×'+(1+level('Concentration')/10).toFixed(1)+' XP</p>'+ "<p>This means you will learn everything again much more quickly than you did in your previous life.</p><p>Something tells you that the amulet might transform even further after living for 2 whole centuries...</p>":'';
 const artwork=sprite(artIndex['icons_amulet_'+art],90);
 return '<h2>Amulet</h2>'+(inspection?button('inspect',artwork+'<br>Inspect amulet'):artwork)+amuletStory[chapter]+
 (state.Evil&&!state.orbs.Evil?relicProgress('Evil'):state.Angelic&&!state.orbs.Angelic?relicProgress('Angelic'):'')+
 (inspectingAmulet?inspection:'')+
 actions.map(a=>button('ask:'+a,a==='Rebirth'?'Touch the eye':a==='Ending'?'Bring the two orbs together':a.endsWith('orb')?sprite(artIndex['icons_'+a.split(' ')[0].toLowerCase()+'orb'],44)+' Claim '+(a==='Angelic orb'?'Angelic Orb':'Evil Orb')+' · ×5 skill XP':'Embrace '+a+' (+'+alignmentGain(a).toFixed(2)+')')).join(' ')+
 (pending?'<div class="card"><p>'+(pending==='Rebirth'?'Your current levels become your next life’s XP memories.':pending==='Ending'?'Complete this journey with both orbs.':'This resets your current levels and XP memories. Your earned orbs carry forward.')+'</p>'+button('accept','Confirm '+pending)+' '+button('cancel','Keep playing')+'</div>':'')+
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
 if(state.finished){screen.innerHTML=top+sprite(artIndex.endgame,144)+'<h1>Both orbs recovered</h1><p>Your journey through Evil and Angelic magic is complete.</p>'+amuletStory.ending+button('ask:Void','Embrace the Void')+(pending==='Void'?'<p>Start a new life at age 14 with both orbs. Master Void jobs and skills to claim the Void Heart from age 400.</p>'+button('accept','Enter the Void')+' '+button('cancel','Stay here'):'');return}
 if(dead())tab='Amulet';
 const nav=['Jobs','Skills','Shop',...(age()>=25||state.voidPath?['Amulet']:[])];
 screen.innerHTML=top+'<nav>'+nav.map(t=>button('tab:'+t,t,t===tab)).join('')+'</nav><section class="card">'+(tab==='Amulet'?amulet():list())+'</section><footer>'+state.job+' · Lv. '+level(state.job)+'　'+state.skill+' · Lv. '+level(state.skill)+'<p>'+button('pause',state.paused?'Resume':'Pause')+' '+(level('Time warping')?button('warp','Time warping '+(state.warp?'on':'off')):'')+'</p>'+['happiness','accelerating'].map(k=>button('potion:'+k,(k==='happiness'?'Happiness':'Speed')+' ×2 · '+(potionActive(k)?Math.ceil((state[k+'Until']-Date.now())/1000)+'s':'10 min'),potionActive(k))).join(' ')+'<p>Developer speed　'+[1,5,20].map(v=>button('devSpeed:'+v,v+'×',state.devSpeed===v)).join(' ')+'</p><p><a href="./previous.html">Earlier prototype save</a></p>'+statusText+'</footer>';
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
 if(entries[v]&&!remaining(v).length&&!dead()){
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








