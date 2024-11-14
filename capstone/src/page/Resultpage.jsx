import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';


const Resultpage = () => {
    const location = useLocation();
    const mapRef = useRef();
    const { midpoint, location1, location2, nearestPlace, drivingTime1, drivingTime2 } = location.state || {};  // nearestPlace 추가
    const markerImage = "https://img.icons8.com/?size=100&id=13778&format=png&color=000000";

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
        console.log("Driving Time : ", drivingTime1);
        console.log("Driving Time2 : ", drivingTime2);
    },[nearestPlace, drivingTime1, drivingTime2]);

    return (
        <Map
            center={{ lat: midpoint.latitude, lng: midpoint.longitude }}
            style={{ width: "100%", height: "100vh" }}
            onCreate={handleMapLoad} // 지도가 생성될 때 handleMapLoad 호출
        >
            {/* 장소 1 마커 */}
            {location1 && (
                <CustomOverlayMap position={{ lat: location1.latitude, lng: location1.longitude }}>
                    <div style={{ color: "#000", borderRadius: "5px", background: "white", padding: "5px" }}>
                        장소 1 : {location1.name}
                    </div>
                </CustomOverlayMap>
            )}
            {/* 장소 2 마커 */}
            {location2 && (
                <CustomOverlayMap position={{ lat: location2.latitude, lng: location2.longitude }}>
                    <div style={{ color: "#000", borderRadius: "5px", background: "white", padding: "5px" }}>
                        장소 2 : {location2.name}
                    </div>
                </CustomOverlayMap>
            )}
            {/* 중간지점 마커
            {midpoint && (
                <MapMarker position={{ lat: midpoint.latitude, lng: midpoint.longitude }}>
                    <div style={{ color: "red" }}>중간 지점</div>
                </MapMarker>
            )} */}
            {/* 가장 가까운 장소 마커 */}
            <MapMarker 
    position={{
        lat: parseFloat(nearestPlace.latitude),
        lng: parseFloat(nearestPlace.longitude),
    }}
    image={{
        src : markerImage,
        size : {
            width : 50,
            height : 55,
        },
    }}
/>

{nearestPlace && (
    <CustomOverlayMap position={{
        lat: parseFloat(nearestPlace.latitude),
        lng: parseFloat(nearestPlace.longitude),
    }}
    yAnchor={3.3}
    >
        <div>
            <a 
                href={nearestPlace.place_url}
                target='_blank'
                rel='noreferrer'
                style={{ color: "#6A42C2", fontSize: "15px", fontWeight: "bold", borderRadius: "5px", background: "white", padding: "5px" }}
            >
                Midpoint : {nearestPlace.place_name}
            </a>
        </div>
    </CustomOverlayMap>
)}

            <Polyline 
                path={[
                    [
                        {lat : location1.latitude, lng : location1.longitude},
                        {lat : nearestPlace.latitude, lng : nearestPlace.longitude},
                        {lat : location2.latitude, lng : location2.longitude},
                    ]
                ]}
                strokeWeight={8}
                strokeColor={'#6A42C2'}
                strokeOpacity={0.7}
                strokeStyle={'solid'}
            />
            {drivingTime1 && (
                <CustomOverlayMap position={{
                    lat : nearestPlace.latitude,
                    lng : nearestPlace.longitude
                }}
                yAnchor={4.5}
                >
                    <div style={{ background : "#fff", color : "#333", padding : "5px", borderRadius : "5px", fontWeight : "bold"}}>
                        🚗 장소 1 ➜ Midpoint : {drivingTime1}분
                    </div>
                </CustomOverlayMap>
            )}
            {drivingTime2 && (
                <CustomOverlayMap position={{
                    lat : nearestPlace.latitude,
                    lng : nearestPlace.longitude
                }}
                yAnchor={-0.5}
                >
                    <div style={{ background : "white", padding : "5px", borderRadius : "5px", fontWeight : "bold"}}>
                        🚗 장소 2 ➜ Midpoint : {drivingTime2}분
                    </div>
                </CustomOverlayMap>
            )}
        </Map>
    );
};

export default Resultpage;
