// 不需套件的資料、路徑與簡報狀態檢查；畫面排版仍需瀏覽器驗證。
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=__dirname;
function context(id,blocked=false){
 const elements=new Map(),store=new Map();
 const element=key=>{if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',value:'',disabled:false,dataset:{},listeners:{},addEventListener(k,f){this.listeners[k]=f;},focus(){},querySelectorAll(){return [];}});return elements.get(key);};
 const c={console,URLSearchParams,Date,location:{search:'?id='+id},localStorage:{getItem(k){if(blocked)throw Error('blocked');return store.get(k)||null;},setItem(k,v){if(blocked)throw Error('blocked');store.set(k,v);}},document:{getElementById:element,querySelectorAll(){return [];},addEventListener(){}},addEventListener(){}};
 c.window=c;vm.createContext(c);
 for(const file of ['recipes.js','recipe.js'])vm.runInContext(fs.readFileSync(path.join(root,'assets/js',file),'utf8'),c);
 return {c,element,store};
}
for(const id of ['tomato-eggs','brownie','creme-brulee']){
 const {c,element}=context(id);const recipe=c.RECIPES.find(r=>r.id===id);
 assert.equal(recipe.time.total,recipe.time.prep+recipe.time.cook+recipe.time.wait);
 assert.match(element('slide').innerHTML,/食材準備/);
 assert.equal(element('previous').disabled,true);
 element('next').listeners.click();assert.match(element('slide').innerHTML,/流程總覽/);
 for(let i=0;i<recipe.steps.length+2;i++)element('next').listeners.click();
 assert.match(element('slide').innerHTML,/我的實作心得/);assert.equal(element('next').disabled,true);
 element('note').value='<script>test</script> 真實心得';element('note').listeners.input();element('status').value='練習中';element('status').listeners.change();element('save').listeners.click();
 assert.equal(c.FoodNotebook.read(id).status,'練習中');assert.equal(c.FoodNotebook.read(id).note,'<script>test</script> 真實心得');
 assert.equal(c.FoodNotebook.read('other').status,'想學');
 element('previous').listeners.click();element('next').listeners.click();assert.equal(element('note').value,'<script>test</script> 真實心得');
 assert(!element('slide').innerHTML.includes('<script>test</script>'));
}
const blocked=context('tomato-eggs',true);assert.equal(blocked.c.FoodNotebook.save('test',{}),false);assert.equal(blocked.c.FoodNotebook.read('test').status,'想學');
assert.match(context('unknown').element('main').innerHTML,/找不到這道食譜/);
for(const file of ['index.html','recipe.html']){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 for(const [,link] of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g))if(!/^https?:/.test(link))assert(fs.existsSync(path.join(root,link)),`Missing ${link}`);
}
console.log('PASS: 3 recipes, slide order and boundaries, note save and isolation, plain-text rendering, blocked storage, unknown recipe, asset links. Browser layout not covered.');
