import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';
import "leaflet.featuregroup.subgroup";


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);


      let myMap = L.map("mapid").setView([props.lat, props.lon], props.zoom)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(myMap);


      function chooseColor(name) {
        switch (name) {
          case "Brooklyn":
            return "#bac7be";
          case "Bronx":
            return "#8d99ae";
          case "Manhattan":
            return "#a0ced9";
          case "Queens":
            return "#cc8b86";
          case "Staten Island":
            return "#f5cb5c";
          default:
            return "#a0ced9";
        }
      }

      var geoJson = L.geoJson(props.pins, {
        style: function (feature) {
          return {
            color: "white",
            fillColor: chooseColor(feature.properties.name),
            fillOpacity: 0.8,
            weight: 1.5
          };
        },      
        onEachFeature: function (feature, layer) {
          layer.on({
            mouseover: function (event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function (event) {
              geoJson.resetStyle(event.target);
            },
            click: function (event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          layer.bindTooltip("<p><b>" + feature.properties.name + "</b></p>");
          // var label = L.marker(layer.getBounds().getCenter(), {
          //   icon: L.divIcon({
          //     className: 'label',
          //     html: feature.properties.state_code,
          //     iconSize: [20, 10]
          //   })
          // }).addTo(myMap);
        }
      }).addTo(myMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id = "map-container2"> </div>; 
};