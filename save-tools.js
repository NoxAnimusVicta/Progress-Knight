const backupFormat = 'progress-knight-personal-remastered';
const el = id => document.getElementById(id);
const report = message => { el('backup-status').textContent = message; };
let restoreCandidate = null;

function makeBackup() {
  advance();
  return {format:backupFormat, version:1, exportedAt:new Date().toISOString(), campaign:structuredClone(state)};
}

function readBackup(text) {
  const file = JSON.parse(text);
  if (file?.format !== backupFormat || file.version !== 1) throw Error('Choose a version 1 personal Remastered backup.');
  const src = file.campaign;
  const plain = obj => obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  if (!plain(src)) throw Error('Missing campaign.');
  removeOrbTraining(src);
  const dst = newLife();
  function check(ok, field) { if (!ok) throw Error('Invalid backup field: '+field); }
  function numeric(v, max=Number.MAX_SAFE_INTEGER) { return Number.isFinite(v) && v>=0 && v<=max; }
  for (const field of ['days','coins','life','Evil','Angelic','clock']) {
    check(numeric(src[field]),field); dst[field]=src[field];
  }
  check(dst.days>=5110 && Number.isSafeInteger(dst.life) && dst.life>=1,'age or life');
  for(const field of ['paused','warp','finished']) {
    check(typeof src[field]==='boolean',field); dst[field]=src[field];
  }
  check(['','Magnus','Isabella'].includes(src.hero),'character'); dst.hero=src.hero;
  check([1,5,20].includes(src.devSpeed??1),'developer speed');dst.devSpeed=src.devSpeed??1;
  check(typeof (src.voidPath??false)==='boolean','Void path');dst.voidPath=src.voidPath??false;
  const hasEntry=n=>typeof n==='string' && Object.hasOwn(entries,n);
  for(const [field,test] of [['job',e=>e.income],['skill',e=>e.maxXp&&!e.income],['home',e=>['Properties','City housing'].includes(e.group)]]) {
    check(hasEntry(src[field])&&test(entries[src[field]]),field);dst[field]=src[field];
  }
  for(const field of ['equipment','unlocked','levels','xp','memory','orbs']){
    check(plain(src[field]),field);
    for(const [name,value] of Object.entries(src[field])){
      if(field==='orbs')check(['Evil','Angelic','Void'].includes(name)&&value===true,field);
      else {
        check(hasEntry(name),field);
        if(field==='equipment')check(entries[name].group==='Misc'&&value===true,field);
        else if(field==='unlocked')check(value===true,field);
        else if(field==='xp')check(entries[name].maxXp&&numeric(value,1e100),field);
        else check(entries[name].maxXp&&Number.isInteger(value)&&numeric(value,30000),field);
      }
      dst[field][name]=value;
    }
  }
  for(const field of ['restedSpeed','restedUntil','happinessUntil','acceleratingUntil']){
    if(src[field]!==undefined){check(numeric(src[field],field==='restedSpeed'?8:Number.MAX_SAFE_INTEGER),field);dst[field]=src[field];}
  }
  check(!dst.restedUntil||dst.restedSpeed>=1,'rested speed');
  check(typeof (src.voidHeart??false)==='boolean','Void Heart');
  dst.voidHeart=src.voidHeart??false;
  for(const key of ['heartPair','superHeart','crossedRift']){
    check(typeof (src[key]??false)==='boolean',key);dst[key]=src[key]??false;
  }
  check(!dst.crossedRift||dst.superHeart,'rift progression');
  check(!(dst.heartPair&&dst.superHeart)&&(!(dst.heartPair||dst.superHeart)||(dst.voidHeart&&dst.voidPath)),'Heart progression');
  check(Number.isSafeInteger(src.Void??0)&&numeric(src.Void??0),'Void');
  dst.Void=src.Void??0;
  return migrateVoid(dst);
}

el('export-save').onclick=()=>{
  const file=makeBackup();
  const url=URL.createObjectURL(new Blob([JSON.stringify(file,null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;
  link.download='Progress-Knight-'+(state.hero||'new')+'-life-'+state.life+'-'+file.exportedAt.slice(0,10)+'.json';
  document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),60000);
  report('Backup prepared. Keep the downloaded JSON file in Files.');
};
function clearCandidate(){restoreCandidate=null;el('confirm-restore').hidden=true;el('cancel-restore').hidden=true;}
el('import-file').onchange=async event=>{
  clearCandidate();
  const file=event.target.files[0];event.target.value='';if(!file)return;
  try{
    if(file.size>1024*1024)throw Error('Backup is too large.');
    restoreCandidate=readBackup(await file.text());
    const s=restoreCandidate;
    report((s.hero||'New character')+' · Life '+s.life+' · Age '+Math.floor(s.days/365)+'. Restore this backup over the current campaign?');
    el('confirm-restore').hidden=false;el('cancel-restore').hidden=false;
  }catch(error){report(error.message);}
};
el('cancel-restore').onclick=()=>{clearCandidate();report('Restore cancelled.');};
el('confirm-restore').onclick=()=>{
  if(!restoreCandidate)return;
  const restored={...restoreCandidate,clock:Date.now()};
  try{localStorage.setItem(saveKey,JSON.stringify(restored));}
  catch{report('Restore failed. Device storage is unavailable.');return;}
  state=restored;pending='';tab='Jobs';chosen=state.hero||'Magnus';clearCandidate();render();
  report('Backup restored.');
};

async function startUpdates(){
  if(!('serviceWorker' in navigator))return;
  const manager=navigator.serviceWorker;
  let controlled=!!manager.controller, reloadPending=false;
  function safeReload(){
    if(!reloadPending||el('save-tools').open||pending)return;
    advance();
    try{localStorage.setItem(saveKey,JSON.stringify(state));}catch{return;}
    reloadPending=false;location.reload();
  }
  manager.addEventListener('controllerchange',()=>{
    if(controlled){reloadPending=true;safeReload();}
    controlled=true;
  });
  el('save-tools').addEventListener('toggle',safeReload);
  const registration=await manager.register('./sw.js',{updateViaCache:'none'});
  function accept(){registration.waiting?.postMessage({type:'activate-release'});}
  function observe(worker){
    if(!worker)return;
    worker.addEventListener('statechange',()=>{if(worker.state==='installed')accept();});
  }
  registration.addEventListener('updatefound',()=>observe(registration.installing));
  observe(registration.installing);accept();
  let lastCheck=0;
  function check(){
    safeReload();
    if(!navigator.onLine||document.hidden||Date.now()-lastCheck<30000)return;
    lastCheck=Date.now();registration.update().then(accept).catch(()=>{});
  }
  addEventListener('online',check);document.addEventListener('visibilitychange',check);
  setInterval(check,60000);check();
}
startUpdates().catch(()=>{});
