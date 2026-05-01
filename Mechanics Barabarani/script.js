// script.js
let mechanicsDatabase = [];
const FAVS_KEY = "mech_favs";

// ==============================
// 1. LOAD DATA (Fetch API)
// ==============================
async function loadMechanics() {
  try {
    const res = await fetch("data/mechanics.json");
    const data = await res.json();
    mechanicsDatabase = data;
    showAllGarages(); // auto‑load all on page ready
  } catch (err) {
    console.error("Failed to load mechanics:", err);
  }
}

// ==============================
// 2. SEARCH / FILTER BY CITY & SERVICE
// ==============================
function searchGarages() {
  const city = document.getElementById("cityFilter").value.trim().toLowerCase();
  const service = document.getElementById("serviceFilter").value.trim().toLowerCase();

  const list = mechanicsDatabase.filter((m) => {
    const cityMatch = city
      ? (m.city || "").toLowerCase().includes(city)
      : true;
    const serviceMatch = service
      ? m.services.some((s) => s.toLowerCase().includes(service))
      : true;
    return cityMatch && serviceMatch;
  });

  renderGarages(list, "garagesList");
}

function showAllGarages() {
  renderGarages(mechanicsDatabase, "garagesList");
}

// ==============================
// 3. RENDER GARAGES (cards)
// ==============================
function renderGarages(list, listId) {
  const container = document.getElementById(listId);
  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="text-center p-8 text-gray-500 bg-white rounded shadow-sm">
        Hakuna garaji yanapatikana.
      </div>
    `;
    return;
  }

  const favs = getFavs();
  container.innerHTML = list.map((m) => {
    const stars = "★".repeat(Math.round(m.rating)) + "☆".repeat(5 - Math.round(m.rating));
    const heart = favs.includes(m.id) ? "❤️" : "🤍";

    return `
      <div class="bg-white p-4 rounded border border-gray-200 shadow-sm">
        <h4 class="text-sm font-bold text-gray-800">${m.name}</h4>
        <p class="text-xs text-gray-600">${m.city}</p>
        <p class="text-xs text-gray-500">Serikali: ${m.services.join(", ")}</p>
        <p class="text-sm text-yellow-600">${stars} (${m.rating.toFixed(1)})</p>
        <button
          onclick="emergencyMechanics(${m.id})"
          class="text-xs text-red-600 hover:underline"
        >
          🚨 Emergency
        </button>
        <button
          onclick="toggleFavorite(${m.id})"
          class="text-xs text-blue-600 hover:underline"
        >
          ${heart} Favourite
        </button>
      </div>
    `;
  }).join("");
}

// ==============================
// 4. FAVOURITES (localStorage)
// ==============================
function getFavs() {
  const str = localStorage.getItem(FAVS_KEY);
  return str ? JSON.parse(str) : [];
}

function saveFavs(list) {
  localStorage.setItem(FAVS_KEY, JSON.stringify(list));
}

function toggleFavorite(id) {
  const favs = getFavs();
  const index = favs.indexOf(id);
  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }
  saveFavs(favs);
  showAllGarages();
}

function loadFavorites() {
  const favs = getFavs();
  if (!favs.length) {
    alert("Hakuna fure‑mbega.");
    return;
  }
  const list = mechanicsDatabase.filter((m) => favs.includes(m.id));
  renderGarages(list, "garagesList");
}

function clearStorage() {
  localStorage.clear();
  alert("Favourites na data zimefutwa kikamilifu.");
  renderGarages([], "garagesList");
}

// ==============================
// 5. EMERGENCY / CLOSEST MECHANICS
// ==============================
function emergencyMechanics(id) {
  let list = mechanicsDatabase.filter((m) => m.available);
  if (id) {
    const cardMekani = mechanicsDatabase.find((m) => m.id === id);
    if (cardMekani) {
      list = [cardMekani, ...list.filter((m) => m.id !== id)];
    }
  }

  list = list.slice(0, 5); // first 5 available

  const container = document.getElementById("emergencyList");
  container.innerHTML = list
    .map((m) => {
      const stars = "★".repeat(Math.round(m.rating)) + "☆".repeat(5 - Math.round(m.rating));
      return `
        <div class="bg-white p-4 rounded border border-red-300 shadow">
          <h4 class="text-sm font-bold text-gray-800">${m.name}</h4>
          <p class="text-xs text-gray-600">Mji: ${m.city}</p>
          <p class="text-xs text-gray-500">Serikali: ${m.services.join(", ")}</p>
          <p class="text-xs text-gray-700">${stars} (${m.rating.toFixed(1)})</p>
          <div class="mt-1">
            <a href="tel:${m.phone}" class="text-xs text-green-600">📞 Piga simu</a>
            <span class="mx-2">|</span>
            <a href="https://wa.me/${m.phone}" class="text-xs text-teal-600">📲 Ongea kwa WhatsApp</a>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("emergencySection").classList.remove("hidden");
}

// ==============================
// 6. SAJILI MEKANI (Register Mechanic – mock admin)
// ==============================
function sajiliMekani() {
  const name = document.getElementById("mechName").value.trim();
  const phone = document.getElementById("mechPhone").value.trim();
  const city = document.getElementById("mechCity").value.trim();
  const details = document.getElementById("mechDetails").value.trim();

  if (!name || !phone || !city || !details) {
    alert("Tafadhali jaza sehemu zote.");
    return;
  }

  // Simple phone validation helper (Kenyan 2547XXXXXXXX)
  if (!isValidPhone(phone)) {
    alert("Tafadhali weka namba ya simu ya Kenya (2547XXXXXXXX).");
    return;
  }

  const newMekani = {
    id: mechanicsDatabase.length + 1,
    name,
    city,
    services: ["general"],
    rating: 4.0,
    available: true,
    phone,
  };

  mechanicsDatabase.push(newMekani);
  showAllGarages();
  alert("Mechanic amesajiliwa kwa mafanikio!");

  // reset form
  document.getElementById("mechName").value = "";
  document.getElementById("mechPhone").value = "";
  document.getElementById("mechCity").value = "";
  document.getElementById("mechDetails").value = "";
}

// Simple phone validation helper
function isValidPhone(phone) {
  const regex = /^2547\d{8}$/; // 2547XXXXXXXX (10 digits after 254)
  return regex.test(phone.trim());
}

// 7. BOOT THE APP ON PAGE LOAD
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  loadMechanics(); // fetch JSON and show all garages
});