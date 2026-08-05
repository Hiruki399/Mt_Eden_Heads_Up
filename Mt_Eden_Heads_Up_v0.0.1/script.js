// Variable mapElement allows to locate the .map css
const mapElement = document.querySelector('.map');
// The map variable sets the coordinates for a marker
const map = L.map(mapElement).setView([-36.877, 174.764], 14);
// Downloads the tiles for the map. 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maximum zoom level
    maxZoom: 19,
    // Gets the copyrights so that it is usable
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//Adds all the above to the map instantly
}).addTo(map);