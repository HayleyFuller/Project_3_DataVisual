// logic.js

// Initialize the map
var map = L.map('map').setView([47.238138, -120.289762], 8);

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

      var colorIndex = feature.properties.make;

      var color;
      if (colorIndex === 'TESLA') {
        color = "#ff0000"; // RED
      } else if (colorIndex === 'HONDA') {
        color = "#00ff00"; // GREEN
      } else if (colorIndex === 'NISSAN') {
        color = "#0000ff"; // BLUE
      } else if (colorIndex === 'VOLKSWAGEN') {
        color = "#ff8000"; // ORANGE
      } else if (colorIndex === 'AUDI') {
        color = "#ff00aa"; // PINK
      } else if (colorIndex === 'FORD') {
        color = "#5500ff"; // PURPLE
      } else if (colorIndex === 'KIA') {
        color = "#ffff00"; // YELLOW
      } else if (colorIndex === 'BMW') {
        color = "#f5f5f5"; // white
      } else if (colorIndex === 'CHEVROLET') {
        color = "#ffff00"; // YELLOW
      } else if (colorIndex === 'JEEP') {
        color = "#470024"; // DEEP RED
      } else if (colorIndex === 'CHRYSLER') {
        color = "#fff4f9"; // Very pale (mostly white) pink
      } else if (colorIndex === 'TOYOTA') {
        color = "#00ffff"; // Pure (or mostly pure) cyan.
      } else if (colorIndex === 'PORSCHE') {
        color = "#274e13"; // DEEP GREEN
      } else if (colorIndex === 'VOLVO') {
        color = "#0f3c64"; // DEEP BLUE
      } else if (colorIndex === 'POLESTAR') {
        color = "#cc9a00"; // Strong yellow
      } else {
        color = "#000000"; // BLACK
      }
      
      return L.circleMarker(latlng, {
        color: color,
        weight: 0.3,
        opacity: 0.5,
        fillOpacity: 1
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + "VEHICLE ID: " + feature.properties.dol_vehicle_id + "</h3><hr><p>" + "MODEL: " + feature.properties.make + " / " +feature.properties.model + "</p><hr><p>" + "Year: " + feature.properties.model_year + "</p>");
    }
  }).addTo(map);
}
