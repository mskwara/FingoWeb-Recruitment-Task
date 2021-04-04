import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
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
        {positions &&
            positions.map((position, index) => (
                <Marker
                    position={{ lat: position.lat, lng: position.lng }}
                    title={position.time}
                    key={index}
                />
            ))}
    </GoogleMap>
));

export default MapViewer;
