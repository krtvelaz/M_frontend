import _Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import { marcadorPosicion } from '../../assets/img';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import { useEffect, useRef, useState } from 'react';

const Map = () => {
    const ref = useRef(false);
    const [ view , set_view ] = useState<MapView>();
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                id: 15,
                properties: {
                    cha_name: 'RETO PRUEBA?????',
                    cha_impact_type: '',
                    cha_commune: 'SANTA ELENA',
                    cha_neighborhood: 'LA LOMA',
                },
                geometry: { type: 'Point', coordinates: [-75.58997744, 6.219193414] },
            },
            {
                type: 'Feature',
                id: 15,
                properties: {
                    cha_name: 'RETO PRUEBA',
                    cha_impact_type: 'asdasdasdasd',
                    cha_commune: 'SANTA ELENA',
                    cha_neighborhood: 'LA LOMA',
                },
                geometry: { type: 'Point', coordinates: [-75.58997744, 6.219193414] },
            },
           
        ],
    };

    const blob = new Blob([JSON.stringify(geojson)], {
        type: 'application/json',
    });

    const url = URL.createObjectURL(blob);

    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            const geojsonLayer = new GeoJSONLayer({
                url: 'https://medeinn-cms-ms.azurewebsites.net/api/v1/arcgis/challenges',
                renderer: new SimpleRenderer({
                    symbol: new PictureMarkerSymbol({
                        url: `${marcadorPosicion}`,
                        width: '14px',
                        height: '14px',
                    }),
                }),
                popupTemplate: createPopupTemplate(),
            });
            const _map = new _Map({
                basemap: 'arcgis-light-gray',
                layers: [geojsonLayer],
            });
            const _view = new MapView({
                container: 'viewDiv',
                map: _map,
                center: [-75.567, 6.217], //latitud y longitud
                zoom: 8,
                padding: {
                    right: 380,
                },
            });
            set_view(_view);
        }
    }, [ref.current]);


    function createPopupTemplate() {
        return {
            content: [
                {
                    type: 'text',
                    text: `
                    <img className='img-arcgis-content'  src='https://images.pexels.com/photos/13220874/pexels-photo-13220874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='imagen reto'/>
                    <h4>{cha_name}</h4>
                    <p >
                        <label >Ubicación:</label>
                        <label >{cha_commune} - {cha_neighborhood}</label>
                    </p>
                    <p>Tipo de impacto: {cha_impact_type}</p>
                    `,
                },
            ],
        };
    }

    return <div id="viewDiv" className="w-100" style={{ height: 700 }} />;
};

export default Map;
