const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root={}, storage={};const ctx={assert,console,document:{querySelector:()=>root},navigator:{},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v},addEventListener(){},setInterval(){}};
vm.createContext(ctx);for(const file of ['balance.js','remastered.js'])vm.runInContext(fs.readFileSync(require('path').join(__dirname,file),'utf8'),ctx);
vm.runInContext(`
state.hero='Magnus';
assert.equal(catalog.filter(e=>e.income).length,20);
assert.equal(catalog.filter(e=>e.maxXp&&!e.income).length,23);
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
 const first=side==='Evil'?'Dark influence':'Divine Blessing';assert.equal(remaining(first).length,0);
 state.days=299*365;assert(!choices().includes(side+' orb'));state.days=300*365;reset(side+' orb');assert(state.orbs[side]);
}
state.days=200*365;reset('Ending');assert(state.finished);render();assert(screen.innerHTML.includes('Both orbs recovered'));
console.log('Release catalog, earned promotion, screenshot balances, rebirth memory, both arc transitions and ending passed.');
`,ctx);

