let allMaterials=[];
const $=id=>document.getElementById(id);
const search=$("search"), category=$("category"), list=$("materials");
async function loadData(){
  const response=await fetch("data/materials.json");
  allMaterials=await response.json();
  $("totalCount").textContent=allMaterials.length;
  const cats=[...new Set(allMaterials.map(m=>m.category))].sort();
  cats.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;category.appendChild(o)});
  render();
}
function render(){
  const q=search.value.trim().toLowerCase(), c=category.value;
  const items=allMaterials.filter(m=>(c==="all"||m.category===c)&&[m.name,m.category,m.formula].join(" ").toLowerCase().includes(q));
  $("resultCount").textContent=`${items.length} of ${allMaterials.length} materials`;
  list.innerHTML="";
  if(!items.length){list.innerHTML='<div class="empty">No matching material found. Try another name or reset the filter.</div>';return;}
  items.forEach(m=>{
    const b=document.createElement("button");b.className="material-card";b.type="button";
    const symbol=m.name.split(/[\s(]/)[0].slice(0,2).toUpperCase();
    b.innerHTML=`<span class="symbol">${symbol}</span><span class="card-main"><strong></strong><small></small></span><span class="epsilon"></span><span class="arrow">›</span>`;
    b.querySelector("strong").textContent=m.name;
    b.querySelector("small").textContent=m.category;
    b.querySelector(".epsilon").textContent=`εr ${m.epsilon}`;
    b.addEventListener("click",()=>showDetails(m));
    list.appendChild(b);
  });
}
function showDetails(m){
 $("detailName").textContent=m.name;$("detailDescription").textContent=m.description;
 $("detailCategory").textContent=m.category;$("detailEpsilon").textContent=m.epsilon;
 $("detailLoss").textContent=m.loss;$("detailFrequency").textContent=m.frequency;
 $("detailSource").innerHTML="";
 const a=document.createElement("a");a.href=m.sourceUrl;a.textContent=m.source;a.target="_blank";a.rel="noopener";$("detailSource").appendChild(a);
 $("detailDialog").showModal();
}
search.addEventListener("input",render);category.addEventListener("change",render);
$("reset").addEventListener("click",()=>{search.value="";category.value="all";render()});
$("closeDialog").addEventListener("click",()=>$("detailDialog").close());
$("detailDialog").addEventListener("click",e=>{if(e.target===$("detailDialog"))$("detailDialog").close()});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
window.addEventListener("online",()=>{$("connection").textContent="Online • cached"});
window.addEventListener("offline",()=>{$("connection").textContent="Offline mode"});
loadData().catch(()=>{list.innerHTML='<div class="empty">Could not load the local database. Re-open the installed app after its first setup.</div>'});
