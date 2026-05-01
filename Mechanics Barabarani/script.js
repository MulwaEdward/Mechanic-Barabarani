// script.js
let mechanicsDatabase = [];
let favs = JSON.parse(localStorage.getItem("mech_favs") || "[]");

// 1. FETCH API – LOAD JSON DATA
async function loadMechanics() {
 try {
    const res = await fetch("data/mechanics.json");
    const data = await res.json();
    mechanicsDatabase = data;
    showAllGarages(); // auto‑load when page ready
  } catch (err) {
    console.error("Failed to load mechanics:", err);
  }
}

// call this once
document.addEventListener("DOMContentLoaded", () => {
  loadMechanics();
});