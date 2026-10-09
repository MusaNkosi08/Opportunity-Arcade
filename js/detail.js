
(async()=>{
 const root=document.querySelector("#detail-root"),p=new URLSearchParams(location.search),id=p.get("id");
 if(!id){root.innerHTML='<div class="empty"><h2>MISSION NOT FOUND</h2><a class="btn" href="opportunities.html">RETURN TO QUESTS</a></div>';return}
 const data=await (await fetch("data/opportunities.json")).json(),o=data.find(x=>x.id===id);
 if(!o){root.innerHTML='<div class="empty"><h2>MISSION NOT FOUND</h2><a class="btn" href="opportunities.html">RETURN TO QUESTS</a></div>';return}
 App.markView();sessionStorage.setItem("recent:"+id,Date.now());
 const saved=App.isSaved(id), checks=App.state.checklist[id]||[];
 root.innerHTML=`<section class="detail-header section"><div><span class="eyebrow">MISSION DOSSIER · OFFICIAL SOURCE</span><h1>${esc(o.title)}</h1><p class="muted">${esc(o.organisation)} · ${esc(o.location)}</p><div class="tag-row"><span class="tag">${ICONS[o.category]} ${o.category}</span><span class="tag magenta">${o.experience.toUpperCase()}</span></div></div><div class="card arcade-panel"><strong>APPLICATION STATUS</strong><div style="font-size:18px;margin-top:8px">${countdown(o.closingDate)}</div><p class="muted">${o.closingDate?`Deadline: ${esc(o.closingDate)}`:"No closing date published by the provider"}</p></div></section>
 <div class="alert danger"><strong>⚠ VERIFY BEFORE APPLYING</strong><br>Opportunity Arcade links to the provider's official page. Confirm current eligibility, availability and deadline there. Never pay or share passwords/OTPs.</div>
 <section class="mission-grid section"><div>
 <article class="card"><h2>MISSION BRIEFING</h2><p>${esc(o.description)}</p><p><strong>Required qualifications:</strong> ${o.qualifications.map(esc).join("; ")}</p></article>
 <article class="card section"><h2>MISSION REQUIREMENTS</h2><ul class="checklist">${o.requirements.map(x=>`<li>☑ ${esc(x)}</li>`).join("")}</ul></article>
 <article class="card section"><h2>LEVEL STEPS</h2><ol class="steps">${o.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></article>
 <article class="card section"><h2>PRE-FLIGHT CHECKLIST</h2><div class="checklist">${o.steps.map((x,i)=>`<li><label><input type="checkbox" data-check="${i}" ${checks.includes(i)?"checked":""}> ${esc(x)}</label></li>`).join("")}</div></article>
 </div><aside>
 <article class="card"><h2>LOADOUT</h2><ul class="checklist">${o.documents.map(x=>`<li>□ ${esc(x)}</li>`).join("")}</ul></article>
 <article class="card section"><h2>MISSION INFO</h2><p><b>Added:</b> ${esc(o.dateAdded)}</p><p><b>Updated:</b> ${esc(o.lastUpdated)}</p><p><b>Organisation:</b> ${esc(o.organisationDetails)}</p><div class="card-actions"><button class="btn ${saved?"saved":""}" id="save-detail">${saved?"★ SAVED":"☆ SAVE"}</button><button class="btn" id="share">SHARE</button></div></article>
 <article class="card section"><h2>START MISSION</h2><p>Verify the application link before leaving Opportunity Arcade.</p><button class="btn primary" id="apply">START MISSION</button></article>
 </aside></section>`;
 document.querySelector("#save-detail").addEventListener("click",e=>{const s=App.save(o.id);e.textContent=s?"★ SAVED":"☆ SAVE"});
 document.querySelector("#share").addEventListener("click",async()=>{const share={title:o.title,text:`${o.title} at ${o.organisation}`,url:location.href};if(navigator.share)await navigator.share(share);else{await navigator.clipboard.writeText(location.href);App.toast("LINK COPIED TO CLIPBOARD")}})
 document.querySelector("#apply").addEventListener("click",()=>{if(confirm("Open the official provider page in a new tab? Verify the current details before applying.")){App.markMission();window.open(o.applicationUrl,"_blank","noopener,noreferrer")}});
 document.querySelectorAll("[data-check]").forEach(c=>c.addEventListener("change",()=>{App.state.checklist[id]=[...document.querySelectorAll("[data-check]:checked")].map(x=>Number(x.dataset.check));App.persist()}));
})();
