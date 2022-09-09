import _Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

const Map = () => {
  const map = new _Map({
    basemap: "arcgis-navigation" // Basemap layer service
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-74.297333, 4.570868], //Longitude, latitude
    zoom: 5
  });
  const places = ["Choose a place type...", "Parks and Outdoors", "Coffee shop", "Gas station", "Food", "Hotel"];
  const select = document.createElement("select");
      select.setAttribute("class", "esri-widget esri-select");
      select.setAttribute("style", "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em");

    places.forEach(function(p){
      const option = document.createElement("option");
      option.value = p;
      option.innerHTML = p;
      select.appendChild(option);
    });
    view.ui.add(select, "top-right");
    const locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
   
    
      
  return <div id="viewDiv" className="w-100" style={{ height: 500 }} />;
}

export default Map
