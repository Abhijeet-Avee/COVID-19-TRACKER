import {useMap} from 'react-leaflet';

function MapCoord({center}) {
        const map = useMap();
        map.setView(center,map.getZoom());
        return null;
}

export default MapCoord;

//This component uses the useMap()  of the leaflet to 
// enable us to set the view of map using setView()
//thus, re-positioning the map according to the served coordinates!!