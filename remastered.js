const saveKey = 'pk-remastered-191';
const catalog = Object.values(entries);
function newLife() {
  return {days:5110, coins:0, job:'Beggar', skill:'Concentration', home:'Homeless',
    equipment:{}, levels:{}, xp:{}, unlocked:{}, memory:{}, hero:'', life:1,
    Evil:0, Angelic:0, orbs:{}, finished:false, paused:false, warp:true, devSpeed:1, clock:Date.now()};
}
let state = newLife();
try {Object.assign(state,JSON.parse(localStorage.getItem(saveKey)))} catch {}
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
const lifespan=()=>70*effect('Immortality')*effect('Super immortality');
const dead=()=>state.days>=lifespan()*365;
function rate(n){
  const e=entries[n];
  // Remastered adds a constant x3 to every task XP multiplier list (1.9.1).
  let gain=30*(1+(state.memory[n]||0)/10)*happy()*effect('Dark influence')*effect('Demon training')*effect('Divine Blessing')*effect("Angel's Guidance");
  if(e.income)gain*=effect('Productivity')*item('Personal squire');
  else gain*=effect('Concentration')*item('Book')*item('Study desk')*item('Library')*5**Object.keys(state.orbs).length;
  if(e.group==='Military')gain*=effect('Battle tactics')*item('Steel longsword')*(state.hero==='Isabella'?1.1:1);
  if(e.group==='The Arcane Association')gain*=effect('Mana control')*(state.hero==='Magnus'?1.1:1);
  if(n==='Strength')gain*=effect('Muscle memory')*item('Dumbbells');
  if(e.group==='Magic')gain*=item('Sapphire charm');
  if(e.group==='Dark magic')gain*=state.Evil;
  if(e.group==='Light magic')gain*=state.Angelic;
  return Math.round(gain);
}
function pay(n){return Math.round(entries[n].income*(1+Math.log10(level(n)+1))*effect("Demon's wealth")*effect('Bountiful Grace')*(entries[n].group==='Military'?effect('Strength'):1))}
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
  if(state.coins<0){state.coins=0;state.home='Homeless';state.equipment={}}
  gain(state.job,jobRate*days);gain(state.skill,skillRate*days);
}
function alignmentGain(side){return side==='Evil'?effect('Evil control')+effect('Blood meditation'):effect('Pure Heart')+effect('Spiritual Meditation')}
function choices(){
  if(age()<65||state.finished)return [];
  if(age()>=200&&state.orbs.Evil&&state.orbs.Angelic)return ['Ending'];
  const actions=['Rebirth'];
  if(age()>=200){
    const side=state.Evil?'Evil':state.Angelic?'Angelic':null;
    if(side){actions.push(side);if(age()>=300&&!state.orbs[side])actions.push(side+' orb')}
    else for(const path of ['Evil','Angelic'])if(!state.orbs[path])actions.push(path);
  }
  return actions;
}
function reset(action){
  if(!choices().includes(action))return;
  if(action==='Ending'){state.finished=true;return}
  let {hero,life,Evil,Angelic,orbs}=state;
  const memory={};
  if(action==='Rebirth')Object.assign(memory,state.levels);
  else if(action==='Evil'){Evil+=alignmentGain('Evil');Angelic=0}
  else if(action==='Angelic'){Angelic+=alignmentGain('Angelic');Evil=0}
  else {orbs={...orbs,[action.split(' ')[0]]:true};Evil=0;Angelic=0}
  state={...newLife(),hero,devSpeed:state.devSpeed,life:life+1,Evil,Angelic,orbs,memory};
}
function save(){try{localStorage.setItem(saveKey,JSON.stringify(state))}catch{statusText='Save unavailable in this browser.'}}
let tab='Jobs',chosen='Magnus',pending='',statusText='';
const screen=document.querySelector('#screen');
const fmt=n=>Math.floor(n).toLocaleString();
function sprite(i,size=54){
 return '<span aria-hidden="true" class="sprite" style="width:'+size+'px;height:'+size+'px;background-size:'+size*10+'px '+size*atlasRows+'px;background-position:'+(-size*(i%10))+'px '+(-size*Math.floor(i/10))+'px"></span>';
}
function portrait(){
 const alignment=state.Evil?'_evil':state.Angelic?'_angelic':'';
 const years=age();
 if(!dead() && years>=100 && !alignment){
   const x=state.hero==='Magnus'?'left':'right';
   return '<span role="img" aria-label="'+state.hero+', age '+years+'" class="centenarian" style="background-position:'+x+' center"></span>';
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
 const groups=tab==='Jobs'?['Common work','Military','The Arcane Association']:tab==='Skills'?['Fundamentals','Combat','Magic','Dark magic','Light magic']:['Properties','Misc'];
 return groups.filter(g=>g!=='Dark magic'||state.Evil).filter(g=>g!=='Light magic'||state.Angelic).map(g=>{
  let lockedShown=false;
  const rows=catalog.filter(e=>e.group===g).map(e=>{
   const n=e.name,missing=remaining(n);
   if(missing.length&&lockedShown)return '';
   if(missing.length)lockedShown=true;
   const selected=[state.job,state.skill,state.home].includes(n)||state.equipment[n];
   const xpNote=e.maxXp?' · '+fmt(rate(n))+' XP/day':'';
   const info=e.income?fmt(pay(n))+' coins/day':e.maxXp?(e.isPlusDescription?'+':'×')+effect(n).toFixed(2)+' '+e.description:'×'+e.effect+' '+(e.description||'Happiness');
   const action=e.income?'job':e.maxXp?'skill':g==='Properties'?'home':'gear';
   return '<button class="row '+(selected?'on':'')+'" data-act="'+action+':'+n+'" '+(missing.length?'disabled':'')+'>'+sprite(e.tile)+'<span><b>'+n+'</b><small>'+(missing.length?missing.join(' · '):info+xpNote)+'</small></span><span class="right">'+(e.maxXp?'<span>Lv. '+level(n)+'</span>'+meter(n):fmt(price(n))+' / day')+'</span></button>';
  }).join('');
  return '<h3>'+g+'</h3>'+rows;
 }).join('');
}
function amulet(){
 const side=state.Evil?'evil':'angelic';
 const art=age()>=300&&(state.Evil||state.Angelic)?'broken_'+side:age()>=200?'200_'+side+'_transparent':age()>=65?'65':age()>=45?'45':'25';
 const actions=choices();
 return sprite(artIndex['icons_amulet_'+art],90)+'<h2>Amulet</h2><p>'+ (age()<25?'The amulet appears at age 25.':age()<45?'A strange amulet has appeared.':age()<65?'The eye is stirring.': 'Choose what to carry into the next life.')+'</p>'+
 actions.map(a=>button('ask:'+a,a==='Rebirth'?'Touch the eye':a==='Ending'?'Bring the two orbs together':a.endsWith('orb')?'Take the '+a:'Embrace '+a+' (+'+alignmentGain(a).toFixed(2)+')')).join(' ')+
 (pending?'<div class="card"><p>'+(pending==='Rebirth'?'Your current levels become your next life’s XP memories.':pending==='Ending'?'Complete this journey with both orbs.':'This resets your current levels and XP memories. Your earned orbs carry forward.')+'</p>'+button('accept','Confirm '+pending)+' '+button('cancel','Keep playing')+'</div>':'')+
 '<p>Lives lived · '+state.life+'<br>Evil · '+state.Evil.toFixed(2)+'　Angelic · '+state.Angelic.toFixed(2)+'</p>'+Object.keys(state.orbs).map(o=>sprite(artIndex['icons_'+o.toLowerCase()+'orb'])+' '+o+' orb').join(' ');
}
function render(){draw();bindMotion();scheduleMotion()}
function draw(){
 if(!state.hero){screen.innerHTML='<h1>Choose your character</h1><div class="grid">'+['Magnus','Isabella'].map(n=>button('choose:'+n,sprite(artIndex['avatar_'+n.toLowerCase()+'_14'],96)+'<strong>'+n+'</strong><small>Age 14 · '+(n==='Magnus'?'Magic':'Military')+' jobs XP ×1.1</small>',chosen===n)).join('')+'</div><p>'+button('begin','Continue as '+chosen)+'</p><a href="./previous.html">Earlier prototype save</a>';return}
 const rested=Date.now()<(state.restedUntil||0)?' · Rested speed ×'+state.restedSpeed.toFixed(2):'';const top='<div class="card profile">'+portrait()+'<div><b>'+state.hero+'</b> · Life '+state.life+'<br><span data-clock>Age '+age()+' · '+Math.floor(state.days%365)+' days</span> · Lifespan '+Math.floor(lifespan())+'<br><span class="gold">◉ <span data-coins>'+fmt(state.coins)+'</span> · '+fmt(pay(state.job)-upkeep())+'/day</span><br>Happiness ×'+happy().toFixed(2)+rested+'</div></div>';
 if(state.finished){screen.innerHTML=top+sprite(artIndex.endgame,144)+'<h1>Both orbs recovered</h1><p>Your journey through Evil and Angelic magic is complete.</p>';return}
 if(dead())tab='Amulet';
 const nav=['Jobs','Skills','Shop',...(age()>=25?['Amulet']:[])];
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
 if(a==='choose')chosen=v;
 if(a==='begin'&&!state.hero)state.hero=chosen;
 if(a==='tab'){tab=v;pending=''}
 if(a==='ask'&&choices().includes(v))pending=v;
 if(a==='cancel')pending='';
 if(a==='accept'&&pending){reset(pending);pending='';tab='Jobs'}
 if(a==='pause')state.paused=!state.paused;
 if(a==='potion'&&['happiness','accelerating'].includes(v))drink(v);
 if(a==='devSpeed'&&[1,5,20].includes(Number(v)))state.devSpeed=Number(v);
 if(a==='warp')state.warp=!state.warp;
 if(entries[v]&&!remaining(v).length&&!dead()){
  if(['job','skill','home'].includes(a))state[a]=v;
  if(a==='gear'){if(state.equipment[v])delete state.equipment[v];else state.equipment[v]=true}
 }
 save();render();
};
advance();render();setInterval(()=>{advance();save();if(!document.querySelector('button:active'))render()},1000);
addEventListener('pagehide',()=>{advance();save()});
if(document.addEventListener)document.addEventListener('visibilitychange',()=>{if(!document.hidden){advance();render()}else{advance();save()}});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});







