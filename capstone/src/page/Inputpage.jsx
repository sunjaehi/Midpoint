import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Wrapper} from '@googlemaps/react-wrapper';

    // const { Kakao } = window;

    // const handleKeyPress = (e) => {
    //     if (e.key === "Enter") setKeyword(searchInputValue);
    // };
    <Wrapper apiKey={"AIzaSyBPb-VNURqSH9BuPgtRvyCUC-FyQ4vg2Ao"} libraries={"places"}>
        <googlemap></googlemap>
    </Wrapper>

    const Inputpage = () => {
        const [map, setMap] = useState(null);
        const ref = useRef();

        useEffect(()=> {
            const newMap = new window.google.maps.Map(ref.current, {
                center : {lat : 37.569227, lng : 126.9777256},
                zoom:15,
            });
            setMap(newMap);
        },[]);
        return (
            <div ref={ref} id="map" style={{width:'100%', height:'100vh'}}>
                
            </div>
            
        );
    }
// AIzaSyDTupQgS7W5wExZHkOeaJnt7yG1vJejBAk
export default Inputpage;