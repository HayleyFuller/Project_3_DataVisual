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
  'HYUNDAI': "#ccd000",     // Random
};

d3.json(queryUrl).then(function(data) {
  elecVehicleData = data.features;
  createFeatures(elecVehicleData);
});

///////////////////////////////////////////////////////////////////
// Make filter
fetch(queryUrl)
  .then(response => response.json())
  .then(data => {
    const features = data.features;
    const uniqueMakes = new Set();
    const uniqueStates = new Set();

    features.forEach(feature => {
      const properties = feature.properties;
      const make = properties.make;
      const state = properties.state;
      uniqueMakes.add(make);
      uniqueStates.add(state);
    });

    const makerFilter = document.getElementById('makerFilter-option');
    uniqueMakes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.text = make;
      makerFilter.appendChild(option);
    });
    const stateFilter = document.getElementById('stateFilter-option');
    uniqueStates.forEach(state => {
      const option = document.createElement('option');
      option.value =state;
      option.text = state;
      stateFilter.appendChild(option);
    });
  })
  .catch(error => console.error('Error:', error));

////////////////////////////////////////////////////////////////
// Create main map
function createFeatures(elecVehicleData) { 
  // Create the feature layer and set the style and interaction
  elecVehicle = L.geoJSON(elecVehicleData, {
    pointToLayer: function (feature, latlng) {

      var colorIndex = feature.properties.make;

      var color = colorMappings[colorIndex] || "#wcd123"; // default

      return L.circleMarker(latlng, {
        color: color,
        weight: 0.3,
        radius : 6,
        opacity: 0.5,
        fillOpacity: 0.5
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + "VEHICLE ID: " + feature.properties.dol_vehicle_id + "</h3><hr><p>" + "MODEL: " + feature.properties.make + " / " +feature.properties.model + "</p><hr><p>" + "Year: " + feature.properties.model_year + "</p>");
    }
  }).addTo(map);
}

/////////////////////////////////////////////////////////////////
// Update map
function updateMap() {
  // select
  var makerSelectedValue = document.getElementById('makerFilter-option').value;
  var stateSelectedValue = document.getElementById('stateFilter-option').value;
  // remove
  if (map.hasLayer(elecVehicle)) {
    map.removeLayer(elecVehicle);
  }
  
  // build filter
  var filteredFeatures = elecVehicleData.filter(function(feature) {
    return feature.properties.make === makerSelectedValue && feature.properties.state === stateSelectedValue;
  });

  // create new map
  if (filteredFeatures.length > 0) {
  elecVehicle = L.geoJSON(filteredFeatures, {
    pointToLayer: function (feature, latlng) {
      var colorIndex = feature.properties.make;

      var color = colorMappings[colorIndex] || "#wcd123"; // default

      return L.circleMarker(latlng, {
        color: color,
        weight: 0.3,
        radius : 6,
        opacity: 0.5,
        fillOpacity: 0.5
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + "VEHICLE Detail: " + feature.properties + "</h3>");
    }
  }).addTo(map);
 }// select back to all vehicle
  else {
    elecVehicle = L.geoJSON( elecVehicleData, {
      pointToLayer: function (feature, latlng) {

      var colorIndex = feature.properties.make;

      var color = colorMappings[colorIndex] || "#wcd123"; // default
        
        return L.circleMarker(latlng, {
          color: color,
          weight: 0.3,
          radius : 6,
          opacity: 0.5,
          fillOpacity: 0.5
        });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3>" + "VEHICLE Detail: " + feature.properties + "</h3>");
      }
    }).addTo(map);
  }
}