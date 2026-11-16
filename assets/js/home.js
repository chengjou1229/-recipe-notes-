'use strict';
const notebook=window.FoodNotebook;
let selected='全部';
document.getElementById('hero-illustration').innerHTML=notebook.illustration('tomato-eggs');
function renderCards(){
 const query=document.getElementById('search').value.trim().toLowerCase();
 const list=window.RECIPES.filter(r=>(selected==='全部'||notebook.read(r.id).status===selected)&&(r.name+' '+r.category+' '+r.ingredients.join(' ')).toLowerCase().includes(query));
 const done=window.RECIPES.filter(r=>notebook.read(r.id).status==='已完成').length;
 document.getElementById('summary').textContent=`${window.RECIPES.length} 道想學的料理 · ${done} 道已完成`;
 document.getElementById('recipe-grid').innerHTML=list.length?list.map((r,i)=>`<a class="card" href="recipe.html?id=${encodeURIComponent(r.id)}" aria-label="開啟${notebook.escape(r.name)}的食譜簡報"><div class="card-art" style="--tint:${r.tint}"><span class="badge">${notebook.read(r.id).status}</span>${notebook.illustration(r.id)}<span class="illustration-label">料理示意插圖</span></div><div class="card-body"><span class="card-kicker">${r.english}</span><h3>${r.name}</h3><p>${r.description}</p><div class="card-meta"><span>◷ ${notebook.duration(r)}</span><span>♧ 一人份</span></div><div class="card-link"><span>開始學這道料理</span><span aria-hidden="true">↗</span></div></div></a>`).join(''):'<p class="empty">這裡還沒有符合的食譜。<br>試試其他關鍵字，或切換到「全部食譜」。</p>';
}
document.querySelectorAll('[data-status]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.status;document.querySelectorAll('[data-status]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderCards();}));
document.getElementById('search').addEventListener('input',renderCards);
window.addEventListener('pageshow',renderCards);window.addEventListener('storage',renderCards);renderCards();
