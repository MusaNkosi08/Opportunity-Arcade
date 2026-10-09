
(async function(){
 const grid=document.querySelector("#opportunities-grid"); if(!grid)return;
 const loading=document.querySelector("#loading"),empty=document.querySelector("#empty"),count=document.querySelector("#result-count"),search=document.querySelector("#search"),loc=document.querySelector("#location"),sort=document.querySelector("#sort");
 let data=[];
 try{const res=await fetch("data/opportunities.json");data=await res.json()}catch(e){loading.innerHTML="LOAD ERROR — CHECK DATA FILE";return}
 const locations=[...new Set(data.map(o=>o.location))].sort();locations.forEach(x=>{const op=document.createElement("option");op.value=x;op.textContent=x;loc.appendChild(op)});
 const params=new URLSearchParams(location.search);
 if(params.get("q"))search.value=params.get("q");
 if(params.get("category"))document.querySelector(`[data-category="${CSS.escape(params.get("category"))}"]`)?.classList.add("active");
 if(params.get("saved"))document.querySelector("[data-saved]")?.classList.add("active");
 let activeCats=new Set(params.get("category")?[params.get("category")]:[]), activeLevels=new Set(), deadline="",savedOnly=params.get("saved")==="1";
 function apply(){
  let q=search.value.trim().toLowerCase(), l=loc.value;
  let out=data.filter(o=>(!q||`${o.title} ${o.organisation} ${o.description}`.toLowerCase().includes(q))&&(!activeCats.size||activeCats.has(o.category))&&(!activeLevels.size||activeLevels.has(o.experience))&&(!l||o.location===l)&&(!savedOnly||App.isSaved(o.id)));
    const now=new Date(); if(deadline==="week")out=out.filter(o=>o.closingDate&&new Date(o.closingDate+"T23:59:59")-now<=7*864e5&&new Date(o.closingDate+"T23:59:59")>=now);
    if(deadline==="month")out=out.filter(o=>o.closingDate&&new Date(o.closingDate+"T23:59:59")-now<=31*864e5&&new Date(o.closingDate+"T23:59:59")>=now);
    if(sort.value==="closing")out.sort((a,b)=>(a.closingDate||"9999-12-31").localeCompare(b.closingDate||"9999-12-31")); else if(sort.value==="alpha")out.sort((a,b)=>a.title.localeCompare(b.title)); else out.sort((a,b)=>b.dateAdded.localeCompare(a.dateAdded));
  grid.innerHTML=out.map(card).join("");bindSaveButtons(grid);count.textContent=`${out.length} QUEST${out.length===1?"":"S"} AVAILABLE`;empty.hidden=out.length>0;loading.hidden=true;
  document.querySelector("#sr-status").textContent=`${out.length} quests available`;
 }
 function interaction(){App.markSearch();apply()}
 search.addEventListener("input",interaction);loc.addEventListener("change",interaction);sort.addEventListener("change",apply);
 document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>{const v=b.dataset.category;b.classList.toggle("active");b.classList.contains("active")?activeCats.add(v):activeCats.delete(v);App.state.filterUses++;if(App.state.filterUses>=6)App.unlock("FILTER MASTER");App.persist();apply()}));
 document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>{const v=b.dataset.level;b.classList.toggle("active");b.classList.contains("active")?activeLevels.add(v):activeLevels.delete(v);App.state.filterUses++;App.persist();apply()}));
 document.querySelectorAll("[data-deadline]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-deadline]").forEach(x=>x.classList.remove("active"));b.classList.add("active");deadline=b.dataset.deadline;App.state.filterUses++;App.persist();apply()}));
 document.querySelector("[data-saved]")?.addEventListener("click",e=>{savedOnly=!savedOnly;e.currentTarget.classList.toggle("active",savedOnly);apply()});
 function reset(){activeCats.clear();activeLevels.clear();deadline="";savedOnly=false;search.value="";loc.value="";document.querySelectorAll(".filter-chip").forEach(x=>x.classList.remove("active"));apply()}
 document.querySelector("#reset").addEventListener("click",reset);document.querySelector("#empty-reset").addEventListener("click",reset);
 window.addEventListener("pageshow",apply);apply();
})();
