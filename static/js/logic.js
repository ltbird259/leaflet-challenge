
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
"2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// send request to the query URL
d3.json(queryUrl, function(data) {
  
  createFeatures(data.features);
});

function createFeatures(earthquakedata) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

function size(mag){
    if (mag <= 0){
        return 1000
    }
    else {
        return mag * 30000;
    }
  
}

function markerstyle(mag){
    var floatmag = parseFloat(mag)
  if (floatmag <= 0){
    return 'green'
  } else if (floatmag <= 1) {
    return 'yellow'
  } else if (floatmag <= 2){
    return 'orange'
  } else if (floatmag <= 3) {
    return 'red'
  } else if (floatmag <= 4) {
    return 'black' 
  } else if (floatmag == 1.3600000000000001) {
      'black'
  } else {
    return 'pink' //to catch errors
  }
}

  var earthquakes = L.geoJSON(earthquakedata, {
    pointToLayer: function(earthquakedata, latlng){
      return L.circle(latlng,{
        radius: size(earthquakedata.properties.mag),
        color: markerstyle(earthquakedata.properties.mag),
        fillOpacity:.3
      });
    },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: 'pk.eyJ1Ijoia3Jicm93MDAiLCJhIjoiY2s2bnV2aDY0MTR0YzNlbnllenZzczk5diJ9.doyA7MQtVklp1Stbxu6Q7g'
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: 'pk.eyJ1Ijoia3Jicm93MDAiLCJhIjoiY2s2bnV2aDY0MTR0YzNlbnllenZzczk5diJ9.doyA7MQtVklp1Stbxu6Q7g'
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};
