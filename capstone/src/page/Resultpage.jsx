import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Resultpage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mapRef = useRef();
    const { midpoint, location1, location2 } = location.state || {};

    useEffect(() => {
        // if (!midpoint || !location1 || !location2) {
        //     // 필요한 데이터가 없으면 InputPage로 리다이렉트
        //     navigate('/');
        //     return;
        // }

        if (mapRef.current && location1 && location2 && midpoint) {
            const map = mapRef.current;
            const bounds = new window.kakao.maps.LatLngBounds();

            bounds.extend(new window.kakao.maps.LatLng(location1.latitude, location1.longitude));
            bounds.extend(new window.kakao.maps.LatLng(location2.latitude, location2.longitude));
            bounds.extend(new window.kakao.maps.LatLng(midpoint.latitude, midpoint.longitude));

            map.setBounds(bounds);
        }
    }, [midpoint, location1, location2]);

    return (
        <Map center={{ lat: midpoint.latitude, lng: midpoint.longitude }} level={3} style={{ width: "100%", height: "100vh" }} onCreate={(map)=>(mapRef.current = map)}>
            {/* 장소 1 마커 */}
            {location1 && (
                <MapMarker position={{ lat: location1.latitude, lng: location1.longitude }}>
                    <div style={{ color: "#000", borderRadius : "5px", background : "white", padding : "5px" }}>장소 1 : {location1.name}</div>
                </MapMarker>
            )}
            {/* 장소 2 마커 */}
            {location2 && (
                <MapMarker position={{ lat: location2.latitude, lng: location2.longitude }}>
                    <div style={{ color: "#000", borderRadius : "5px", background : "white", padding : "5px" }}>장소 2 : {location2.name}</div>
                </MapMarker>
            )}
            {/* 중간지점 마커 */}
            {midpoint && (
                <MapMarker position={{ lat: midpoint.latitude, lng: midpoint.longitude }}>
                    <div style={{ color: "red" }}>중간 지점</div>
                </MapMarker>
            )}
        </Map>
    );
};

export default Resultpage;
