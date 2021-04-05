import { useState, useCallback, memo } from "react";
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

const MyComponent = ({ positions }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY, // change variable in .env file
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={
                positions.length > 0
                    ? { lat: positions[0].lat, lng: positions[0].lng } // first received position
                    : { lat: -34.397, lng: 150.644 } // some default position
            }
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
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
                        title={"End: " + positions[positions.length - 1].time}
                    />
                </>
            )}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default memo(MyComponent);
