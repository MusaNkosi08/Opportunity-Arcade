
// Save/bookmark functionality is implemented in app.js and rendered through render.js.
// This module exposes the same inventory model for future integrations.
window.Inventory = {get:()=>App.state.saved, clear:()=>{App.state.saved=[];App.persist()}};
