// logic.js

// Initialize the map
var map = L.map('map').setView([45, -110], 5);

// Add a base layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

// Fetch the GeoJSON data and create features
var queryUrl = 'https://data.wa.gov/resource/f6w7-q2d2.geojson';

d3.json(queryUrl).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(elecVehicleData) { 
  // Create the feature layer and set the style and interaction
  var elecVehicle = L.geoJSON(elecVehicleData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        color: "#000",
        weight: 0.3,
        opacity: 0.5,
        fillOpacity: 1
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.model + "</h3><hr><p>" + feature.properties.ev_type + "</p><hr><p>" + "Year: " + feature.properties.model_year + "</p>");
    }
  }).addTo(map);
}
