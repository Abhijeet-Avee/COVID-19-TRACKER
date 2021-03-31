import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer} from 'react-leaflet';
import MapCoord from './MapCoord';
import { showDataOnMap } from './util';

function Map({ countries , casesType, center, zoom }) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapCoord center={center}/>
                {/*Loop through countries and draw circles on the screen */}
                {showDataOnMap(countries,casesType)}
            </LeafletMap>
        </div>
    )
};

export default Map;

//The MapContainer component is responsible for creating the Leaflet Map instance and providing it to its child components, using a React Context.
//Except for its children, MapContainer props are immutable: changing them after they have been set a first time will have no effect on the Map instance or its container.
// That's why we need to create a separate component MapCoord to justify the map
// according to the chagned coordinates!!!
