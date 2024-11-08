import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';

const Resultpage = () => {
    const location = useLocation();
    const { midpoint, location1, location2, nearestLocation } = location.state || {};
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current && location1 && location2 && midpoint) {
            const map = mapRef.current;
            const bounds = new window.kakao.maps.LatLngBounds();

            //모든 위치를 경계 범위에 추가
            bounds.extend(new window.kakao.maps.LatLng(location1.latitude, location1.longitude));
            bounds.extend(new window.kakao.maps.LatLng(location2.latitude, location2.longitude));
            bounds.extend(new window.kakao.maps.LatLng(nearestLocation.latitude, nearestLocation.longitude));
            //모든 위치가 한번에 포함되도록 지도 레벨 조정
            map.setBounds(bounds);
        }
    }, [location1, location2, nearestLocation]);

    return (
        <Map center={{ lat: nearestLocation.latitude, lng: nearestLocation.longitude }} level={3} style={{ width: "100%", height: "100vh" }} onCreate={(map)=>(mapRef.current = map)}>
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
            {/* 중간장소 마커 */}
            {nearestLocation && (
                <MapMarker position={{ lat: nearestLocation.latitude, lng: nearestLocation.longitude }}>
                    <div style={{ color: "#000", borderRadius : "5px", background  :"white", padding : "5px" }}>가장 가까운 장소 : {nearestLocation.name}</div>
                </MapMarker>
            )}
        </Map>
    );
};

export default Resultpage;
