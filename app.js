let productData = {};
let lastRefresh = 'Not loaded yet.';

const img = {
  fajita:'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80',
  tuna:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
  eggs:'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
  veg:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  chicken:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  wrap:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
  potato:'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=80',
  salad:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  soup:'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
  couscous:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'
};
const ingredientAliases = {
  chicken:['chicken'], peppers:['peppers','pepper'], rice:['rice'], onions:['onions','onion'], lemon:['lemon'], tuna:['tuna'], cucumber:['cucumber'], chickpeas:['chickpeas','chickpea'], herbs:['herbs','herb'], eggs:['eggs','egg'], tomatoes:['tomatoes','tomato'], spinach:['spinach'], courgettes:['courgettes','courgette'], potatoes:['potatoes','potato'], wraps:['wraps','wrap'], salad:['salad'], lentils:['lentils','lentil'], couscous:['couscous'], tofu:['tofu']
};
const icons = {tofu:'🍱',chicken:'🍗',peppers:'🫑',rice:'🍚',onions:'🧅',lemon:'🍋',tuna:'🐟',cucumber:'🥒',chickpeas:'🫘',herbs:'🌿',eggs:'🥚',tomatoes:'🍅',spinach:'🥬',courgettes:'🥒',potatoes:'🥔',wraps:'🌯',salad:'🥗',lentils:'🫘',couscous:'🌾'};

const dinnerRecipes = [
 {title:'Sticky tofu and broccoli rice bowls',cal:405,time:25,dairy:'none',score:.38,img:img.veg,items:{tofu:1,rice:1,spinach:1,lemon:1,herbs:1},steps:['Crisp tofu in a non-stick pan with soy, ginger or chilli if you have it.','Serve with rice and greens.','Finish with lemon and herbs.']},
 {title:'Chicken fajita rice bowls',cal:430,time:25,dairy:'none',score:1,img:img.fajita,items:{chicken:1,peppers:1,rice:1,onions:2,lemon:1},steps:['Pan-fry chicken, peppers and onion with paprika and chilli.','Serve over fluffy rice.','Finish with lemon and herbs.']},
 {title:'Tuna, cucumber and chickpea crunch bowls',cal:360,time:10,dairy:'none',score:.4,img:img.tuna,items:{tuna:1,cucumber:1,chickpeas:2,lemon:1,herbs:1},steps:['Drain tuna and chickpeas.','Mix with cucumber, lemon and herbs.','Add salad leaves if you have them.']},
 {title:'Tomato chickpea shakshuka-style eggs',cal:390,time:20,dairy:'none',score:.5,img:img.eggs,items:{eggs:1,tomatoes:1,chickpeas:1,spinach:1,onions:1},steps:['Simmer onion, tomatoes and chickpeas.','Wilt spinach.','Crack eggs in and cook until set.']},
 {title:'Courgette, tomato and spinach rice pan',cal:410,time:22,dairy:'none',score:.35,img:img.veg,items:{courgettes:3,tomatoes:1,spinach:1,rice:1,onions:1},steps:['Fry onion and courgette.','Add tomatoes and simmer.','Serve with rice and herbs.']},
 {title:'Chicken and baby potato traybake',cal:460,time:35,dairy:'none',score:1.1,img:img.chicken,items:{chicken:1,potatoes:1,peppers:1,onions:2,lemon:1},steps:['Roast chicken, potatoes, peppers and onions.','Finish with lemon.','Keep oil light to stay low-cal.']},
 {title:'Egg, spinach and pepper wraps',cal:370,time:12,dairy:'none',score:.45,img:img.wrap,items:{eggs:1,spinach:1,peppers:1,wraps:1},steps:['Scramble eggs with spinach and peppers.','Fill wraps.','Add chilli sauce or lemon if wanted.']},
 {title:'Loaded tuna jacket-style potatoes',cal:420,time:30,dairy:'none',score:.8,img:img.potato,items:{potatoes:1,tuna:1,cucumber:1,lemon:1},steps:['Cook potatoes until fluffy.','Mix tuna with cucumber and lemon.','Load potatoes and season well.']}
];
const lunchRecipes = [
 {title:'Tofu rainbow wrap boxes',cal:315,time:12,dairy:'none',score:.28,img:img.wrap,items:{tofu:1,wraps:1,salad:1,cucumber:1,peppers:1},steps:['Slice tofu and crisp or use cold smoked tofu.','Pack into wraps with salad, cucumber and peppers.','Add chilli sauce, lemon or herbs.']},
 {title:'Chicken salad wrap boxes',cal:330,time:10,dairy:'none',score:.55,img:img.wrap,items:{chicken:1,wraps:1,salad:1,cucumber:1,lemon:1},steps:['Use leftover cooked chicken or batch-cook one pack.','Fill wraps with salad, cucumber and lemony dressing.','Pack with extra salad on the side.']},
 {title:'Tuna cucumber rice pots',cal:350,time:8,dairy:'none',score:.35,img:img.tuna,items:{tuna:1,rice:1,cucumber:1,lemon:1},steps:['Use cooked rice from dinner prep.','Top with drained tuna and cucumber.','Finish with lemon and pepper.']},
 {title:'Chickpea chopped salad',cal:310,time:10,dairy:'none',score:.25,img:img.salad,items:{chickpeas:1,salad:1,cucumber:1,peppers:1,lemon:1,herbs:1},steps:['Drain chickpeas.','Chop cucumber, peppers and salad.','Toss with lemon and herbs.']},
 {title:'Egg and spinach lunch wraps',cal:340,time:12,dairy:'none',score:.4,img:img.eggs,items:{eggs:1,wraps:1,spinach:1},steps:['Boil or scramble eggs.','Add spinach and seasoning.','Wrap tightly for a filling lunch.']},
 {title:'Tomato lentil soup tubs',cal:290,time:20,dairy:'none',score:.3,img:img.soup,items:{lentils:1,tomatoes:1,onions:1,spinach:1},steps:['Simmer lentils, tomatoes and onion.','Stir through spinach at the end.','Batch into lunch tubs.']},
 {title:'Couscous pepper crunch bowls',cal:320,time:8,dairy:'none',score:.32,img:img.couscous,items:{couscous:1,peppers:1,cucumber:1,chickpeas:1,lemon:1},steps:['Soak couscous with hot water.','Mix with peppers, cucumber and chickpeas.','Add lemon and herbs.']}
];

async function loadPrices(){
  const r = await fetch('/api/prices'); const data = await r.json();
  productData = data.products || {}; lastRefresh = data.lastRefresh || 'Loaded'; generatePlan();
}
async function refreshPrices(){
  const r = await fetch('/api/refresh',{method:'POST'}); const data = await r.json();
  if(data.error){alert(data.error);return;} productData = data.products || {}; lastRefresh = data.lastRefresh || 'Refreshed'; generatePlan();
}
async function importPrices(){
  try{const pasted=JSON.parse(document.getElementById('jsonFeed').value); const data=pasted.products?pasted:{lastRefresh:new Date().toISOString(),products:pasted}; await fetch('/api/prices',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); await loadPrices(); alert('Saved. Small Bites has swallowed the new prices.');}
  catch(e){alert('That JSON is not valid.');}
}

function getExcludedTerms(){
  return document.getElementById('excludedFoods').value
    .split(/[\n,]+/)
    .map(x=>x.trim().toLowerCase())
    .filter(Boolean);
}
function recipeContainsExcluded(recipe, excluded){
  if(!excluded.length) return false;
  const ingredientWords = Object.keys(recipe.items).flatMap(k => [k, productData[k]?.name || '', ...(ingredientAliases[k] || [])]).join(' ').toLowerCase();
  const haystack = `${recipe.title} ${ingredientWords} ${recipe.steps.join(' ')}`.toLowerCase();
  return excluded.some(term => haystack.includes(term));
}
function filterExcluded(list, excluded){
  return list.filter(recipe => !recipeContainsExcluded(recipe, excluded));
}
function sortRecipes(list,strategy){const plan=[...list]; if(strategy==='budget')plan.sort((a,b)=>a.score-b.score); if(strategy==='calorie')plan.sort((a,b)=>a.cal-b.cal); if(strategy==='speed')plan.sort((a,b)=>a.time-b.time); return plan;}
function addItems(basket,recipes){for(const meal of recipes){for(const [k,q] of Object.entries(meal.items)) basket[k]=(basket[k]||0)+q;}}
function mealCards(meals){return meals.map(m=>`<article class="meal"><div class="meal-img" style="background-image:url('${m.img}')"><span class="chip">${m.time} min</span></div><div class="meal-body"><h3>${m.title}</h3><div class="tags"><span class="tag">${m.cal} kcal</span><span class="tag">${m.dairy==='none'?'dairy-free':'low dairy'}</span><span class="tag">easy</span></div><ol class="steps">${m.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div></article>`).join('');}
function waitroseSearch(k,p){return (p&&p.url) || `https://www.waitrose.com/ecom/shop/search?&searchTerm=${encodeURIComponent((p&&p.name)||k)}`;}
function generatePlan(){
  if(!Object.keys(productData).length) return;
  const n=+document.getElementById('meals').value, lunchCount=+document.getElementById('lunches').value, servings=+document.getElementById('servings').value, budget=+document.getElementById('budget').value, strategy=document.getElementById('strategy').value;
  const excluded=getExcludedTerms();
  const availableDinners=filterExcluded(dinnerRecipes, excluded);
  const availableLunches=filterExcluded(lunchRecipes, excluded);
  const dinners=sortRecipes(availableDinners,strategy).slice(0,n), lunches=sortRecipes(availableLunches,strategy).slice(0,lunchCount), basket={}; addItems(basket,dinners); addItems(basket,lunches);
  const excludedNote = excluded.length ? `<div class="exclusion-note">Excluded: ${excluded.join(', ')}${dinners.length<n || lunches.length<lunchCount ? ' — fewer recipe options are available with these exclusions.' : ''}</div>` : '';
  const all=[...dinners,...lunches]; let totalCal=all.reduce((s,m)=>s+m.cal,0), totalTime=all.reduce((s,m)=>s+m.time,0);
  document.getElementById('mealGrid').innerHTML=(dinners.length?mealCards(dinners):'<p class="source">No dinner recipes match your exclusions.</p>') + excludedNote; document.getElementById('lunchGrid').innerHTML=lunches.length?mealCards(lunches):'<p class="source">No lunch recipes match your exclusions.</p>';
  let total=0, offerCount=0;
  const rows=Object.entries(basket).map(([k,q])=>{const p=productData[k]||{name:k,price:0,offer:'Missing price',pack:'',url:waitroseSearch(k)}; const packs=Math.ceil(q/servings); const line=(p.price||0)*packs; total+=line; if(p.offer)offerCount++; const offer=p.offer||p.liveStatus||'Check live'; return `<tr><td><div class="item"><span class="thumb">${icons[k]||'🛒'}</span><div><b>${p.name}</b><br><span class="source">${p.pack||''}</span></div></div></td><td>${q} units<br><span class="source">~${packs} pack(s)</span></td><td><b>£${line.toFixed(2)}</b></td><td><span class="offer">${offer}</span></td><td><a class="waitrose" target="_blank" rel="noreferrer" href="${waitroseSearch(k,p)}">Waitrose ↗</a></td></tr>`;}).join('');
  document.getElementById('shopBody').innerHTML=rows; const left=budget-total, klass=left>=0?'ok':'warn';
  document.getElementById('summary').innerHTML=`<div class="metric"><small>Estimated total</small><b>£${total.toFixed(2)}</b></div><div class="metric"><small>Budget left</small><b class="${klass}">£${left.toFixed(2)}</b></div><div class="metric"><small>Meals planned</small><b>${dinners.length}+${lunches.length}</b></div><div class="metric"><small>Avg calories</small><b>${all.length?Math.round(totalCal/all.length):0}</b></div><div class="metric"><small>Offers used</small><b>${offerCount}</b></div>`;
  document.getElementById('shopTotal').textContent=`£${total.toFixed(2)}`; document.getElementById('dinnerTotal').textContent=`${dinners.length} recipes`; document.getElementById('lunchTotal').textContent=`${lunches.length} recipes`;
  document.getElementById('sourceNote').textContent=`Price data: ${lastRefresh}. Waitrose prices and availability can vary by postcode, slot and account offers.`;
}
loadPrices();
