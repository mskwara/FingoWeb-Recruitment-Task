import { memo } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polyline,
} from "@react-google-maps/api";

const containerStyle = {
    width: "600px",
    height: "400px",
};

const MapViewer = ({ positions }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY, // change variable in .env file
    });

    return (
        <>
            {!isLoaded && <p>Loading the map...</p>}
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={
                        positions.length > 0
                            ? { lat: positions[0].lat, lng: positions[0].lng } // first received position
                            : { lat: -34.397, lng: 150.644 } // some default position
                    }
                    zoom={12}
                >
                    {positions.length > 0 && (
                        <>
                            <Marker
                                position={positions[0]}
                                title={"Start: " + positions[0].time}
                            />
                            <Polyline path={positions} strokeColor="#00FF00" />
                            <Marker
                                position={positions[positions.length - 1]}
                                title={
                                    "End: " +
                                    positions[positions.length - 1].time
                                }
                            />
                        </>
                    )}
                </GoogleMap>
            )}
            {loadError && <p>An error occured while trying to load the map.</p>}
        </>
    );
};

export default memo(MapViewer);
