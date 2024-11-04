import React, {useState, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";

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

    const location = useLocation();
    const midpoint = location.state?.midpoint; 
    
    return (
        <div>
            {midpoint ? (
                <div>
                    <h2>중간지점</h2>
                    <p>위도 : {midpoint.latitude}</p>
                    <p>경도 : {midpoint.longitude}</p>
                </div>
            ) : (
                <p>중간지점을 계산할수 없습니다.</p>
            )}

        </div>
    );
}

export default Resultpage;

{/* <div style={{position:'relative', width:'100vw', height:'100vh'}}>
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
            </div> */}