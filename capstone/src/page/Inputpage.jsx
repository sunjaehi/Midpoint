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

const AutoCompleteSearch = () => {
    const navigate = useNavigate();
    const navigateToResult = () => {
        navigate("/Resultpage");
    }

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);

    const handleInputChange = (e, setQuery) => {
        const input = e.target.value;
        setQuery(input);

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

    const handleSuggestionClick = (suggestion, setQuery) => {
        setQuery(suggestion.place_name);
        setSuggestions([]);
    };

    return (
        <div style={{background : '#FFF7D1', height:'100vh'}}>
            <div style={{textAlign : 'center', fontSize : '30px', fontWeight:'lighter', paddingTop:'60px'}}>
                원하는 장소를 입력해주세요
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', paddingTop : '50px'}}>
                {/* 검색창 1 */}
                <div style={{ width: '400px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="원하는 장소를 입력해주세요"
                        value={query1}
                        onChange={(e) => handleInputChange(e, setQuery1)}
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
                                    onClick={() => handleSuggestionClick(suggestion, setQuery1)}
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
                        onChange={(e) => handleInputChange(e, setQuery2)}
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
                                    onClick={() => handleSuggestionClick(suggestion, setQuery2)}
                                    style={{ padding: '10px', cursor: 'pointer' }}
                                >
                                    {suggestion.place_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
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

export default AutoCompleteSearch;
