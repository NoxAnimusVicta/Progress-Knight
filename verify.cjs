const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root={}, storage={};const ctx={assert,console,document:{querySelector:()=>root},navigator:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},addEventListener(){},setInterval(){}};
vm.createContext(ctx);for(const file of ['balance.js','remastered.js'])vm.runInContext(fs.readFileSync(require('path').join(__dirname,file),'utf8'),ctx);
vm.runInContext(`
state.hero='Magnus';
assert.equal(catalog.filter(e=>e.income&&e.group!=="Void work").length,20);
assert.equal(catalog.filter(e=>e.maxXp&&!e.income&&e.group!=="Void magic").length,23);
assert.equal(catalog.filter(e=>e.expense!==undefined).length,17);
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
 const skillMenu=list();for(const skill of pathSkills)assert(skillMenu.includes('data-act="skill:'+skill.name+'"'));
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
state.days=200*365;reset('Ending');assert(state.finished);render();assert(screen.innerHTML.includes('Both orbs recovered'));
reset('Void');assert(state.voidPath&&!state.finished);assert.equal(age(),14);
for(const hero of ['Magnus','Isabella']){state.hero=hero;const portraits=new Set();for(const years of [14,30,65,100]){state.days=years*365;portraits.add(portrait().split('style=')[1])}assert.equal(portraits.size,4)}
assert.equal(remaining('Rift scout').length,1);state.levels['Rift keeper']=20;assert.equal(remaining('Rift scout').length,0);
state.levels['Rift scout']=30;state.levels['Rift weaving']=12;assert.equal(remaining('Breach warden').length,0);
state.levels['Breach warden']=40;state.levels['Void resonance']=20;assert.equal(remaining('Void regent').length,0);
state.days=399*365;assert(!choices().includes('Void Heart'));state.days=400*365;reset('Void Heart');assert(!state.voidHeart);for(const [name,,target] of relicRequirements('Void'))if(name!=='Age')state.levels[name]=target;
 for(const [name,,target] of relicRequirements('Void')){if(name==='Age')state.days=399*365;else state.levels[name]=target-1;assert(!choices().includes('Void Heart'));if(name==='Age')state.days=400*365;else state.levels[name]=target}
 reset('Void Heart');assert(state.voidHeart&&state.orbs.Angelic&&state.orbs.Evil&&state.voidPath);
state.days=200*365;state.levels['Void Heart']=10;state.levels['Void attunement']=20;assert.equal(voidGain(),4);reset('Collect Void');assert.equal(state.Void,4);assert(state.voidHeart);assert.equal(age(),14);
for(const [name,,target] of relicRequirements('Second Heart')){
 if(name==='Age')state.days=target*365;else if(name!=='Banked Void')state.levels[name]=target;
}
assert(!choices().includes('Second Heart'));state.Void=499;reset('Second Heart');assert(!state.heartPair);state.Void=500;reset('Second Heart');assert(state.heartPair&&!state.superHeart&&age()===14);
assert.deepEqual(choices(),['Super Void Heart']);const lifeBefore=state.life;reset('Super Void Heart');
assert(state.superHeart&&!state.heartPair&&state.life===lifeBefore);assert(!choices().includes('Super Void Heart'));
state.days=200*365;reset('Rebirth');assert(state.superHeart&&state.Void===500);
state.days=600*365;state.levels={'Void regent':100,'Void Heart':150};state.Void=1999;assert(!choices().includes('Cross the Rift'));
state.Void=2000;state.days=599*365;assert(!choices().includes('Cross the Rift'));state.days=600*365;
state.levels['Void regent']=99;assert(!choices().includes('Cross the Rift'));state.levels['Void regent']=100;
state.levels['Void Heart']=149;assert(!choices().includes('Cross the Rift'));state.levels['Void Heart']=150;
assert.equal(voidGain(),96);reset('Cross the Rift');assert(state.crossedRift);assert(!choices().includes('Cross the Rift'));
reset('Collect Void');assert.equal(state.Void,2096);assert.equal(state.memory['Void Heart'],150);assert(state.crossedRift);
assert(migrateVoid({orbs:{Void:true}}).voidHeart);
console.log('Verified base progression, orb collectibles and cumulative skill XP, Void jobs, Heart, legacy conversion and Void collection.');
`,ctx);
