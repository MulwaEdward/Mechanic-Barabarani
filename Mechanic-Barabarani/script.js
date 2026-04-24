// Simple data (you can later load from mechanics.json)
const mechanics = [
  {
    id: 1,
    name: "Nairobi Garage Motors",
    town: "Nairobi",
    phone: "0700123456",
    whatsApp: "0700123456",
    spec: "Brakes & Suspension",
    available: true,
    rating: 4,
  },
  {
    id: 2,
    name: "Mombasa Quick Fix",
    town: "Mombasa",
    phone: "0710123456",
    whatsApp: "0710123456",
    spec: "Engine",
    available: true,
    rating: 5,
  },
  {
    id: 3,
    name: "Kisumu Roadside",
    town: "Kisumu",
    phone: "0720123456",
    whatsApp: "0720123456",
    spec: "General",
    available: false,
    rating: 3,
  },
];

// Elements
const searchInput = document.getElementById("searchInput");
const mapDiv = document.getElementById("map");

// Filter by town/name
function filterMechanics(term, onlyAvailable = false) {
  let list = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(term.toLowerCase()) ||
      m.town.toLowerCase().includes(term.toLowerCase())
  );
  if (onlyAvailable) list = list.filter((m) => m.available);
  return list;
}

// Simple phone validator (for Jest)
function isValidPhone(phone) {
  return /^\+?254\d{9}$/.test(phone) || /^\+?0?7\d{8}$/.test(phone);
}

// Render list
function render(list) {
  const container = document.getElementById("mechanicsList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p class='bg-white p-3 rounded text-center'>No matching garages found.</p>";
    return;
  }

  list.forEach((m) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow";

    card.innerHTML = `
      <h2 class="text-lg font-bold">${m.name}</h2>
      <p>${m.town} – ${m.spec}</p>
      <p>Available: <strong>${m.available ? "Yes" : "No"}</strong></p>
      <p>Rating: ${m.rating}/5 ⭐</p>

      <button onclick="alert('Call: ${m.phone}')" class="text-sm px-3 py-1 bg-blue-600 text-white rounded mr-2">
        Call
      </button>
      <button onclick="alert('WhatsApp: ${m.whatsApp}')" class="text-sm px-3 py-1 bg-green-600 text-white rounded">
        WhatsApp
      </button>
    `;

    container.appendChild(card);
  });
}

// Search (by town or name)
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.trim();
  const matches = term ? filterMechanics(term) : mechanics;
  render(matches);

  if (term && matches.length > 0) {
    mapDiv.innerHTML = `<p class="text-sm text-center">Map of nearby <strong>${matches[0].town}</strong> garages</p>`;
  } else {
    mapDiv.innerHTML = `<p class="text-sm text-center">Set a town to see map of nearby garages</p>`;
  }
});

// "Use My Location" (demo version)
document.getElementById("useLocation").addEventListener("click", () => {
  alert("Demo: using Nairobi as your location.");
  searchInput.value = "Nairobi";
  searchInput.dispatchEvent(new Event("input"));
});

// Emergency button – closest & available only
document.getElementById("emergencyBtn").addEventListener("click", () => {
  const emergencyList = filterMechanics("", true); // only available
  render(emergencyList);
  mapDiv.innerHTML = `<p class="text-sm text-center">Emergency mode: only available nearby garages</p>`;
});

// Initial render
render(mechanics);