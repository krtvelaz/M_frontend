import _Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import WebStyleSymbol from '@arcgis/core/symbols/WebStyleSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { text } from 'stream/consumers';
import Color from '@arcgis/core/Color';
import { bell, marcadorPosicion } from '../../assets/img';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { string } from 'yup/lib/locale';
import { boolean } from 'yup';



const Map = () => {

    
    const layer = new FeatureLayer({
        url: `https://www.medellin.gov.co/mapas/rest/services/ServiciosSuministros_y_Servicios/BienesInmuebles/MapServer/1/query?where=CBML%3D10130340011&f=geojson`,
        // url: `https://medeinn-cms-ms.azurewebsites.net/api/v1/arcgis/events`,
        fields:[
            {
               name:"OBJECTID",
               alias : 'OBJECTID' ,
               defaultValue :null
            },
            {
               name: "cha_neighborhood",
               alias: "cha_neighborhood",
               length: 100,
               defaultValue: null
            },
            {
               name: "cha_name",
               alias: "cha_name",
               length: 100,
               defaultValue: null
            },
            {
               name: "cha_impact_type",
               alias: "cha_impact_type",
               length: 100,
               defaultValue: null
            },
            {
               name: "cha_commune",
               alias: "cha_commune",
               length: 100,
               defaultValue: null
            }
         ],
        // outFields: ['*'],
        renderer: new SimpleRenderer({
            symbol: new PictureMarkerSymbol({
                url: `${marcadorPosicion}`,
                width: '14px',
                height: '14px',
            }),
        }),
        popupTemplate: createPopupTemplate(),
    });

    console.log(layer);
    

    const map = new _Map({
        basemap: 'arcgis-light-gray',
        layers: [layer],
    });

    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-75.567, 6.217], //latitud y longitud
        zoom: 15,
        padding: {
            right: 380,
        },
    });

    function createPopupTemplate() {
        return {
            title: '{NOMBRE}',
            // title: `<img  src='https://images.pexels.com/photos/13220874/pexels-photo-13220874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='imagen reto'/>`,
            content: [
                {
                    type: 'text',
                    text: `
                    <img className='img-arcgis-content'  src='https://images.pexels.com/photos/13220874/pexels-photo-13220874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='imagen reto'/>
                    <h4>Nombre del reto implementado</h4>
                    <p >
                        <label >Ubicación:</label>
                        <label >Carrera 50 No.101 Sur 50</label>
                    </p>
                    <p>Tipo de impacto: Descripción del impacto y solución del reto. Acá puede incluirse un video o llevarlo a una página interna.</p>
                    `,
                },
            ],
        };
    }

    return <div id="viewDiv" className="w-100" style={{ height: 700 }} />;
};

export default Map;
