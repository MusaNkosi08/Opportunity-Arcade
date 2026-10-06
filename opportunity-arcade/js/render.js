
const ICONS={Jobs:"💼",Learnerships:"🎓",Internships:"🚀",Bursaries:"💰",Courses:"📚","Career Events":"🎪"};
function daysUntil(date){return date?Math.ceil((new Date(date+"T23:59:59")-new Date())/86400000):null}
function countdown(date){
 const d=daysUntil(date); if(d===null)return `<span class="countdown">OPEN · VERIFY DEADLINE</span>`;
 if(d<0)return `<span class="countdown closed">EXPIRED</span>`;
 if(d===0)return `<span class="countdown soon">CLOSING TODAY</span>`;
 return `<span class="countdown ${d<7?"soon":""}">${d} DAY${d===1?"":"S"} REMAINING</span>`;
}
function card(o){
 return `<article class="card op-card">
  <div class="tag-row"><span class="tag">${ICONS[o.category]||"◆"} ${o.category}</span><span class="tag ${o.experience==="Advanced"?"magenta":""}">${o.experience.toUpperCase()}</span></div>
  <h3>${esc(o.title)}</h3><div class="org">${esc(o.organisation)}</div>
  <div class="muted">📍 ${esc(o.location)}</div><div>${countdown(o.closingDate)}</div>
  <p class="desc">${esc(o.description)}</p>
  <div class="card-actions"><a class="btn small" href="opportunity.html?id=${encodeURIComponent(o.id)}">VIEW DETAILS</a><button class="btn small save-btn ${App.isSaved(o.id)?"saved":""}" data-save="${o.id}" aria-pressed="${App.isSaved(o.id)}">${App.isSaved(o.id)?"★ SAVED":"☆ SAVE"}</button></div>
 </article>`;
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function bindSaveButtons(root=document){root.querySelectorAll("[data-save]").forEach(btn=>btn.addEventListener("click",()=>{const saved=App.save(btn.dataset.save);btn.classList.toggle("saved",saved);btn.setAttribute("aria-pressed",saved);btn.textContent=saved?"★ SAVED":"☆ SAVE"}))}
