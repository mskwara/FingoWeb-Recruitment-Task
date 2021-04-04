import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
} from "react-google-maps";

const MapViewer = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({ positions }) => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={
            positions && positions.length > 0
                ? { lat: positions[0].lat, lng: positions[0].lng } // first received position
                : { lat: -34.397, lng: 150.644 } // some default position
        }
    >
        {positions && (
            <>
                <Marker
                    position={positions[0]}
                    title={"Start: " + positions[0].time}
                />
                <Polyline path={positions} strokeColor="#00FF00" />
                <Marker
                    position={positions[positions.length - 1]}
                    title={"End: " + positions[positions.length - 1].time}
                />
            </>
        )}
    </GoogleMap>
));

export default MapViewer;
