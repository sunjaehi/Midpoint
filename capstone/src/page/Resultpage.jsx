import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Resultpage = () => {
    const location = useLocation();
    const mapRef = useRef();
    const { midpoint, location1, location2, nearestPlace } = location.state || {};  // nearestPlace 추가

    const handleMapLoad = (map) => {
        mapRef.current = map;

        if (location1 && location2 && midpoint) {
            const bounds = new window.kakao.maps.LatLngBounds();

            bounds.extend(new window.kakao.maps.LatLng(location1.latitude, location1.longitude));
            bounds.extend(new window.kakao.maps.LatLng(location2.latitude, location2.longitude));
            bounds.extend(new window.kakao.maps.LatLng(midpoint.latitude, midpoint.longitude));

            if (nearestPlace) {
                bounds.extend(new window.kakao.maps.LatLng(nearestPlace.latitude, nearestPlace.longitude));
            }

            map.setBounds(bounds); // 모든 위치가 보이도록 범위 설정
        }
    };

    useEffect(() => {
        console.log("nearestPlace : ", nearestPlace);

    },[nearestPlace]);

    return (
        <Map
            center={{ lat: midpoint.latitude, lng: midpoint.longitude }}
            style={{ width: "100%", height: "100vh" }}
            onCreate={handleMapLoad} // 지도가 생성될 때 handleMapLoad 호출
        >
            {/* 장소 1 마커 */}
            {location1 && (
                <MapMarker position={{ lat: location1.latitude, lng: location1.longitude }}>
                    <div style={{ color: "#000", borderRadius: "5px", background: "white", padding: "5px" }}>
                        장소 1 : {location1.name}
                    </div>
                </MapMarker>
            )}
            {/* 장소 2 마커 */}
            {location2 && (
                <MapMarker position={{ lat: location2.latitude, lng: location2.longitude }}>
                    <div style={{ color: "#000", borderRadius: "5px", background: "white", padding: "5px" }}>
                        장소 2 : {location2.name}
                    </div>
                </MapMarker>
            )}
            {/* 중간지점 마커
            {midpoint && (
                <MapMarker position={{ lat: midpoint.latitude, lng: midpoint.longitude }}>
                    <div style={{ color: "red" }}>중간 지점</div>
                </MapMarker>
            )} */}
            {/* 가장 가까운 장소 마커 */}
            {nearestPlace && (
                <MapMarker position={{
                    lat: parseFloat(nearestPlace.latitude),
                    lng: parseFloat(nearestPlace.longitude),
                    }}>
                    <div style={{ color: "blue", borderRadius: "5px", background: "white", padding: "5px" }}>
                        가장 가까운 장소 : {nearestPlace.place_name}
                    </div>
                </MapMarker>
            )}
        </Map>
    );
};

export default Resultpage;
