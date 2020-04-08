var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
  };
  function styleSet(mag){
    if (mag > 5){
      return 'red'
    } else if (mag > 4) {
      return 'orange'
    } else if (mag > 3){
      return 'blue'
    } else if (mag > 2) {
      return 'yellow'
    } else if (mag > 1) {
      return 'green' 
    } else {
      return 'purple'
    }
  }

function markerSize(magnitude) {
    return magnitude *5;
  }



  countries.forEach(country => {

    // Conditionals for countries points
    var color = "";
    if (country.points > 200) {
      color = "yellow";
    }
    else if (country.points > 100) {
      color = "blue";
    }
    else if (country.points > 90) {
      color = "green";
    }
    else {
      color = "red";
    }
  
    // Add circles to map
    L.circle(country.location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: country.points * 1500
    }).bindPopup("<h1>" + country.name + "</h1> <hr> <h3>Points: " + country.points + "</h3>").addTo(myMap);
  })
  