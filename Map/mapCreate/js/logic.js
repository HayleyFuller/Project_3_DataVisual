// Initialize the map
var map = L.map('map').setView([47.238138, -120.289762], 8);

// Add a base layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

// Fetch the GeoJSON data and create features
var queryUrl = 'https://data.wa.gov/resource/f6w7-q2d2.geojson';

var elecVehicleData;
var elecVehicle;
var colorMappings = {
  'TESLA': "#ff0000",       // RED
  'HONDA': "#00ff00",       // GREEN
  'NISSAN': "#0000ff",      // BLUE
  'VOLKSWAGEN': "#ff8000",  // ORANGE
  'AUDI': "#ff00aa",        // PINK
  'FORD': "#5500ff",        // PURPLE
  'KIA': "#ffff00",         // YELLOW
  'BMW': "#f5f5f5",         // WHITE
  'CHEVROLET': "#ffff00",   // YELLOW
  'JEEP': "#470024",        // DEEP RED
  'CHRYSLER': "#fff4f9",    // Very pale (mostly white) pink
  'TOYOTA': "#00ffff",      // Pure (or mostly pure) cyan.
  'PORSCHE': "#274e13",     // DEEP GREEN
  'VOLVO': "#0f3c64",       // DEEP BLUE
  'POLESTAR': "#cc9a00",    // Strong yellow
  'HYUNDAI': "#ccd000"      // Random
};

d3.json(queryUrl).then(function (data) {
  elecVehicleData = data.features;
  createFeatures(elecVehicleData);
});

// Create main map
function createFeatures(elecVehicleData) {
  elecVehicle = L.geoJSON(elecVehicleData, {
    pointToLayer: function (feature, latlng) {
      var colorIndex = feature.properties.make;
      var color = colorMappings[colorIndex] || "#wcd123"; // default

      return L.circleMarker(latlng, {
        color: color,
        weight: 0.3,
        radius: 6,
        opacity: 0.5,
        fillOpacity: 0.5
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + "VEHICLE ID: " + feature.properties.dol_vehicle_id + "</h3><hr><p>" + "MODEL: " + feature.properties.make + " / " + feature.properties.model + "</p><hr><p>" + "Ev_type: " + feature.properties.ev_type + "</p>");
    }
  }).addTo(map);

  updateMap();
}

// Update map
function updateMap() {
  var makerSelectedValue = document.getElementById('makerFilter-option').value;
  var evTypeSelectedValue = document.getElementById('ev_typeFilter-option').value;

  if (map.hasLayer(elecVehicle)) {
    map.removeLayer(elecVehicle);
  }

  var filteredFeatures = elecVehicleData.filter(function (feature) {
    if (makerSelectedValue && evTypeSelectedValue) {
      return feature.properties.make === makerSelectedValue && feature.properties.ev_type === evTypeSelectedValue;
    } else if (makerSelectedValue) {
      return feature.properties.make === makerSelectedValue;
    } else if (evTypeSelectedValue) {
      return feature.properties.ev_type === evTypeSelectedValue;
    } else {
      return true;
    }
  });

  elecVehicle = L.geoJSON(filteredFeatures, {
    pointToLayer: function (feature, latlng) {
      var colorIndex = feature.properties.make;
      var color = colorMappings[colorIndex] || "#wcd123"; // default

      return L.circleMarker(latlng, {
        color: color,
        weight: 0.3,
        radius: 6,
        opacity: 0.5,
        fillOpacity: 0.5
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + "VEHICLE ID: " + feature.properties.dol_vehicle_id + "</h3><hr><p>" + "MODEL: " + feature.properties.make + " / " + feature.properties.model + "</p><hr><p>" + "Ev_type: " + feature.properties.ev_type + "</p>");
    }
  }).addTo(map);
}
