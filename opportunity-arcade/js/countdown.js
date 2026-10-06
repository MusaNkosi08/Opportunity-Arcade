
// Live countdown refresh. Cards re-render every minute so deadline labels stay current.
setInterval(()=>{document.querySelectorAll(".countdown").forEach(()=>location.pathname.endsWith("opportunities.html")&&window.dispatchEvent(new Event("deadlineRefresh")))},60000);
