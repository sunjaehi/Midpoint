import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Wrapper} from '@googlemaps/react-wrapper';
import config from "../apikey";

    // const { Kakao } = window;

    // const handleKeyPress = (e) => {
    //     if (e.key === "Enter") setKeyword(searchInputValue);
    // };
    <Wrapper apiKey="config.API_KEY1" libraries={"places"}>
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
export default Inputpage;