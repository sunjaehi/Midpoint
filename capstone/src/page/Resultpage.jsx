import React, {useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function Resultpage() {
    const [state, setState] = useState({
        center:{lat: 37.6159738, lng: 127.0115837},
        
    });
    const [level, setLevel] = useState(5);
    const mapRef = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        const map = mapRef.current;
        const currentLat = map.getCenter().getLat();
        const currentLng = map.getCenter().getLng();

    }

    return (
        <div>
            <div style={{position:'relative', width:'100vw', height:'100vh'}}>
                <Map    
                    center={state.center}
                    style={{width:"100%", height:"100%"}}
                    level={level}
                    ref={mapRef}
                >
                    <MapMarker
                        position={state.center}
                        image={{
                            src:"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                            size:{width: 30, height:45},
                        }}
                    />
                </Map>
            </div>

        </div>
    );
}

export default Resultpage;