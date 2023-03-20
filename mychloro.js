// links for our flask API request
const poly_url = 'http://localhost:5000/api/polygons'
const url_1 = 'http://localhost:5000/api/countries'


// making request to API, get data and making a function
d3.json(poly_url).then(function(data_poly) {

  
  // // Create map function to create our map
    function createMap(countryMarkers, data_countries, data_poly){

  // making a request to map API and put it in a variable
      let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // making a layer of markers
        let countries = L.layerGroup(countryMarkers);
        
        // basemap layer
        let baseMaps = {
            "Street Map": street,
        };
        
        // overlay for markers
        let overlayMaps = {
            "Country Emmisions": countries,
        };
        

        // making a map
        let myMap = L.map("map-id", {
            center: [	31.1231, 70.7790],
            zoom: 3,
            layers: [street, countries]
        });
        
        
        // making control layer
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: true
            }).addTo(myMap);

        // making a choloropleth map
        geojson = L.choropleth(data_poly, {

            // Define which property in the features to use.
            valueProperty: "totCO2_2020",
        
            // Set the colour scale.
            scale: ['#FFEDA0','#FED976','#FEB24C', '#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#ff8080'],
            // The number of breaks in the step range
            steps: 300,
        
            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {

              // Border colour
              color: "#fff",
              weight: 1,
              fillOpacity: 0.8
            },
        
            // Binding a popup to each layer
            onEachFeature: function(feature, layer) {
              layer.bindPopup("<strong>Countries: </strong> " + feature.properties.ADMIN + "<strong><br />Emissions: </strong>" + feature.properties.totCO2_2020);
            }
            }).addTo(myMap);

        
          // making a function for color schemes
          function getColor(d) {
            return d > 1000 ? '#ff8080' :
                   d > 500  ? '#BD0026' :
                   d > 200  ? '#E31A1C' :
                   d > 100  ? '#FC4E2A' :
                   d > 50   ? '#FD8D3C' :
                   d > 20   ? '#FEB24C' :
                   d > 10   ? '#FED976' :
                              '#FFEDA0';
        }


        // defining the legend position
          var legend = L.control({position: 'bottomright'});

        // function for making legend
          legend.onAdd = function () {
          
              var div = L.DomUtil.create('div', 'info legend');
                  var grades = [0, 10, 20, 50, 100, 200, 500, 1000];
                  var limits = geojson.options.limits;
                    var colors = geojson.options.colors;
                  labels = [];
          
              // loop through our density intervals and generate a label with a colored square for each interval
              for (var i = 0; i < grades.length; i++) {
                  div.innerHTML +=
                      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
              }
          
              return div;
            };

            // adding the legend to map
            legend.addTo(myMap);
          


    }

    // function to create markers
    function createMarkers(data_countries) {

    // making an empty list to store markers
      let countryMarkers = [];

      // for loop to go through data
        for (let i = 0; i < data_countries.length; i++) {
            var marker = "<strong>Name: <strong/>" + data_countries[i].country + "<br><strong>Total Year 2020 Emissions (mmt): </strong>" + data_countries[i].totCO2_2020 + "<br><strong> Rank: </strong>" + data_countries[i].rank;
            var latlng = L.latLng(data_countries[i].latitude, data_countries[i].longitude);


            // making marker and pushing it into list
            countryMarkers.push(
                L.circle(latlng, {
                  stroke: true,
                  fillOpacity: 1,
                  color: "Black",
                  fillColor: "Black",
                  radius: data_countries[i].totCO2_2020 * 100
                }).bindTooltip(marker)
                );
        }

        // calling createMap function
        createMap(countryMarkers, data_countries, data_poly);

    
    }

    // making API call to our chloropleth data source
    d3.json(url_1).then(createMarkers);
          });
          