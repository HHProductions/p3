// links for our flask API request
const poly_url = 'http://localhost:5000/api/polygons'
const url_1 = 'http://localhost:5000/api/countries'


// making request to API, get data and making a function
d3.json(poly_url).then(function(data_poly) {



  // making a request to map API and put it in a variable
  // making a map
  let map = L.map("map-id", {
      center: [	31.1231, 70.7790],
      zoom: 3,
  });


  var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(data_poly).addTo(map);

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.totCO2_2020),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(data_poly, {style: style}).addTo(map);

var geojson;


function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });
  info.update(layer.feature.properties);

  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}


function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}



function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

geojson = L.geoJson(data_poly, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Total Emissions Year 2020</h4>' +  (props ?
        '<b>' + props.ADMIN + '</b><br />' + props.totCO2_2020 + ' CO2 / mmt<sup>2</sup>'
        : 'Hover over a Country');
};

info.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

          });
          
