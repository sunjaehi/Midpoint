import React, { useState } from 'react';
import styled from 'styled-components';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Custombutton = styled.button`
    border-radius : 10px;
    border : none;
    background-color : #FFD09B;
    color: black;
    box-shadow : 0 4px 8px rgba(0,0,0,0.2);
    
    &:hover {
        background-color: #FFD060;
        color : black;
    }
    &:active {
        background-color: #FFD060;
        color : black;
    }
`;

const Inputpage = () => {
    const navigate = useNavigate();
    // const navigateToMid = () => {
    //     navigate("/Resultpage");
    // }

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);

    //선택한 장소의 정보 저장
    const [selectedPlace1, setSelectedPlace1] = useState(null);
    const [selectedPlace2, setSelectedPlace2] = useState(null);

    const [categoryCode, setCategoryCode] = useState('');

    const handleInputChange = (e, setQuery, setSelectedPlace) => {
        const input = e.target.value;
        setQuery(input);
        setSelectedPlace(null);

        if (input.trim()) {
            const ps = new window.kakao.maps.services.Places();
            ps.keywordSearch(input, (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setSuggestions(data);
                } else {
                    setSuggestions([]);
                }
            });
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion, setQuery, setSelectedPlace) => {
        setQuery(suggestion.place_name);
        setSelectedPlace(suggestion);
        setSuggestions([]);
    };

    const getCoordinates = async (place) => {
        return new Promise((resolve, reject) => {
            if (!place) {
                reject("No place selected");
                return;
            }
            resolve({
                latitude : parseFloat(place.y),
                longitude : parseFloat(place.x),
            });
        });
    };


    const navigateToResult = async () => {
        try {
            const location1 = await getCoordinates(selectedPlace1);
            const location2 = await getCoordinates(selectedPlace2);

            console.log("Location 1:", location1);  // 좌표 확인
            console.log("Location 2:", location2);  // 좌표 확인

            if (!categoryCode) {
                alert("카테고리 그룹 코드를 선택하세요!");
                return;
            }

            const response = await fetch('http://localhost:4000/calculate-midpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location1, location2, categoryCode })
            });

            const data = await response.json();
            console.log("Response from server:", data);

            if (data.midpoint) {
                navigate("/Resultpage", {
                     state: {
                        midpoint: data.midpoint,
                        location1 : {...location1, name : selectedPlace1.place_name},
                        location2 : {...location2, name : selectedPlace2.place_name},
                        nearestPlace : data.nearestPlace, // nearestPlace 데이터 추가
                        drivingTime1 : data.drivingTime1,
                        drivingTime2 : data.drivingTime2
                     }
                    });
            } else {
                console.error("Midpoint calculation failed:", data.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error in navigateToResult:", error);
        }
    };


    return (
        <div style={{background : '#FFF7D1', height:'100vh'}}>
            <div style={{textAlign : 'center', fontSize : '30px', fontWeight:'lighter', paddingTop:'60px', fontWeight : "bold"}}>
                MidPoint
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', paddingTop : '50px'}}>
                {/* 검색창 1 */}
                <div style={{ width: '400px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="원하는 장소를 입력해주세요"
                        value={query1}
                        onChange={(e) => handleInputChange(e, setQuery1, setSelectedPlace1)}
                        onFocus={()=>setActiveInput(1)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            width: '100%',
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            height: '50px'
                        }}
                    />
                    {activeInput === 1 && suggestions.length > 0 && (
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: 'white',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            position: 'absolute',
                            width: '100%',
                            zIndex: 10
                        }}>
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion, setQuery1, setSelectedPlace1)}
                                    style={{ padding: '10px', cursor: 'pointer' }}
                                >
                                    {suggestion.place_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 검색창 2 */}
                <div style={{ width: '400px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="원하는 장소를 입력해주세요"
                        value={query2}
                        onChange={(e) => handleInputChange(e, setQuery2, setSelectedPlace2)}
                        onFocus={()=>setActiveInput(2)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            width: '100%',
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            height: '50px'
                        }}
                    />
                    {activeInput === 2 && suggestions.length > 0 && (
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: 'white',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            position: 'absolute',
                            width: '100%',
                            zIndex: 10
                        }}>
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion, setQuery2, setSelectedPlace2)}
                                    style={{ padding: '10px', cursor: 'pointer' }}
                                >
                                    {suggestion.place_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div style={{display:'flex', justifyContent:'center', paddingTop:'30px'}}>
                <select 
                    value={categoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                    style={{
                        padding : '10px',
                        fontSize : '16px',
                        borderRadius : '10px',
                        border : '1px solid #ddd',
                        width : '300px'
                    }}
                >
                    <option value="">카테고리 선택</option>
                    <option value="MT1">대형마트</option>
                    <option value="CS2">편의점</option>
                    <option value="PS3">어린이집, 유치원</option>
                    <option value="SC4">학교</option>
                    <option value="AC5">학원</option>
                    <option value="PK6">주차장</option>
                    <option value="OL7">주유소</option>
                    <option value="SW8">지하철역</option>
                    <option value="BK9">은행</option>
                    <option value="CT1">문화시설</option>
                    <option value="AG2">중개업소</option>
                    <option value="PO3">공공기관</option>
                    <option value="AT4">관광명소</option>
                    <option value="AD5">숙박</option>
                    <option value="FD6">음식점</option>
                    <option value="CE7">카페</option>
                    <option value="HP8">병원</option>
                    <option value="PM9">약국</option>
                </select>
            </div>
            <Row style={{marginTop:'80px', display : 'flex', justifyContent : 'center', gap : '300px'}}>
                <Custombutton type='button' value="input" style={{width:'200px', height:'40px', padding:'0'}}>
                    장소 추가하기
                </Custombutton>
                <Custombutton type='button' value="submit" style={{width:'200px', height:'40px', padding:'0'}} onClick={navigateToResult}>
                    장소 검색하기
                </Custombutton>
            </Row>
        </div>
    );
};

export default Inputpage;