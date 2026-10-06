
(async()=>{
 const res=await fetch("data/opportunities.json"),data=await res.json();
 const featured=data.filter(o=>!o.closingDate||new Date(o.closingDate)>=new Date()).slice(0,3);
 const f=document.querySelector("#featured");f.innerHTML=featured.map(card).join("");bindSaveButtons(f);
 const d=document.querySelector("#deadlines");d.innerHTML=data.filter(o=>!o.closingDate||new Date(o.closingDate)>=new Date()).sort((a,b)=>(a.closingDate||"9999-12-31").localeCompare(b.closingDate||"9999-12-31")).slice(0,5).map((o,i)=>`<div><span>${String(i+1).padStart(2,"0")}</span><span>${esc(o.title)}</span><b>${countdown(o.closingDate)}</b></div>`).join("");
})();
