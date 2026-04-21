 //JSON data
 const mechanics = [
    { id: 1, name: "Nairobi Garage Motors", town: "Nairoboi", phone: "0711159499", whatsapp: "0799900000", spec: "Brakes & Suspension", available: true, rating: 4},
    { id: 2, name: "Mombasa Quick Fix", town: "Mombasa", phone: "0712345679", whatsapp: "0123456790", spec: "Engine", available: true, rating: 5 },
    { id: 3, name: "Kisumu Roadside", town: "Kisumu", phone: "01122334455", whatsapp: "01122334455", spec: "General", available: false, rating: 3}
 ];
 //Map & searching
 const searchInput = document.getElementById("searchInput");
 const mapDiv = document.getElementById("map");

 //map helper
 function showMapFor(town) {
   mapDiv.innerHTML = `
   <p class="text-xs text-center">Map ya <strong>${town}</strong> - inakuja map za karibu</p>`;
 }

 //utility function
 function filterMechanics(term, onlyAvailable = false) {
    let list = mechanics.filter(m) =>
        m.name.toLowerCase().includes(term.toLowerCase()) ||
        m.toLowerCase().includes(term.toLowerCase())
    );
    if (onlyAvailable )
 }