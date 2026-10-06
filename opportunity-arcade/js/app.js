
const App = (() => {
  const KEY = "opportunityArcadeProfiles";
  const CURRENT_KEY = "opportunityArcadeCurrentProfile";
  const defaults = {saved:[], achievements:[], searches:0, filterUses:0, viewed:0, checklist:{}};
  function readStorage(key,fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch{return fallback}}
  const profiles = readStorage(KEY,{});
  const current = readStorage(CURRENT_KEY,null);
  let profile = current?.id&&profiles[current.id]?.profile ? profiles[current.id].profile : null;
  let state = profile ? {...defaults,...(profiles[profile.id]?.state||{})} : {...defaults};
  function persist(){if(!profile)return;profiles[profile.id]={profile,state};localStorage.setItem(KEY,JSON.stringify(profiles));localStorage.setItem(CURRENT_KEY,JSON.stringify(profile));updateHUD()}
  function updateHUD(){const xp=(state.searches*20)+(state.filterUses*10)+(state.viewed*5)+(state.saved.length*10); const x=document.querySelector("#hud-xp"),b=document.querySelector("#hud-badges"),who=document.querySelector("#profile-trigger"); if(x)x.textContent=xp;if(b)b.textContent=state.achievements.length;document.querySelectorAll("#saved-count,#saved-count-hero").forEach(el=>el.textContent=state.saved.length);if(who)who.textContent=`${profile?.avatar||"👤"} ${profile?.name||"MY PROFILE"}`;const player=document.querySelector("#player-name");if(player)player.textContent=profile?.name||"PLAYER 1"}
  function save(id){if(state.saved.includes(id)){state.saved=state.saved.filter(x=>x!==id)}else{state.saved.push(id); if(state.saved.length>=5)unlock("SAVED 5")} persist(); return state.saved.includes(id)}
  function isSaved(id){return state.saved.includes(id)}
  function unlock(name){if(!state.achievements.includes(name)){state.achievements.push(name); persist(); toast(`🏆 ACHIEVEMENT UNLOCKED: ${name}`)}}
  function toast(msg){let el=document.getElementById("toast");if(!el){el=document.createElement("div");el.id="toast";el.className="hud";document.body.appendChild(el)}el.textContent=msg;setTimeout(()=>el.remove(),3500)}
  function markSearch(){state.searches++;if(state.searches>=1)unlock("FIRST SEARCH");persist()}
  function markView(){state.viewed++;if(state.viewed>=10)unlock("MISSION VIEWED");persist()}
  function initNav(){const btn=document.querySelector(".menu-btn"),links=document.querySelector("#nav-links");if(btn&&links)btn.addEventListener("click",()=>{const open=links.classList.toggle("open");btn.setAttribute("aria-expanded",open)})}
  function profileModal(){
    if(document.querySelector("#profile-modal"))return;
    const known=Object.values(profiles).map(x=>x.profile).filter(Boolean);
    const modal=document.createElement("div");modal.id="profile-modal";modal.className="profile-modal";document.body.classList.add("profile-locked");modal.innerHTML=`<div class="profile-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-title"><span class="eyebrow">PLAYER SETUP</span><h2 id="profile-title">WHO IS PLAYING?</h2><p class="muted">Choose a profile so your XP, saved posts and progress stay with you.</p>${known.length?`<div class="known-profiles"><strong>RETURNING PLAYERS</strong><div>${known.map(x=>`<button class="profile-choice" data-profile="${x.id}"><span>${x.avatar}</span><b>${esc(x.name)}</b></button>`).join("")}</div></div>`:""}<form id="profile-form"><label for="profile-name">Your name</label><input id="profile-name" maxlength="24" required autocomplete="name" placeholder="Enter your name"><fieldset><legend>Choose an avatar</legend><div class="avatar-options">${["🕹️","🚀","🎓","💡","🎨","⚡"].map((x,i)=>`<button type="button" class="avatar-choice${i===0?" active":""}" data-avatar="${x}" aria-label="Avatar ${i+1}" aria-pressed="${i===0}">${x}</button>`).join("")}</div></fieldset><button class="btn primary" type="submit">ENTER ARCADE</button></form></div>`;document.body.appendChild(modal);
    let avatar="🕹️";const form=modal.querySelector("#profile-form");
    modal.querySelectorAll("[data-avatar]").forEach(button=>button.addEventListener("click",()=>{avatar=button.dataset.avatar;modal.querySelectorAll("[data-avatar]").forEach(x=>{const active=x===button;x.classList.toggle("active",active);x.setAttribute("aria-pressed",active)})}));
    modal.querySelectorAll("[data-profile]").forEach(button=>button.addEventListener("click",()=>{const selected=profiles[button.dataset.profile];profile=selected.profile;state={...defaults,...selected.state};persist();modal.remove();document.body.classList.remove("profile-locked")}));
    form.addEventListener("submit",event=>{event.preventDefault();const name=modal.querySelector("#profile-name").value.trim();const id=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||`player-${Date.now()}`;const existing=profiles[id];profile={id,name:existing?.profile.name||name,avatar:existing?.profile.avatar||avatar};state={...defaults,...(existing?.state||{})};persist();modal.remove();document.body.classList.remove("profile-locked")});
  }
  function initProfile(){document.querySelector("#profile-trigger")?.addEventListener("click",profileModal);if(!profile)profileModal()}
  function init(){initNav();initProfile();updateHUD()}
  function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
  return {get state(){return state},persist,save,isSaved,unlock,markSearch,markView,toast,init,profileModal};
})();
document.addEventListener("DOMContentLoaded",App.init);
