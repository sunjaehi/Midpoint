import React, { useState } from 'react';

const AutoCompleteSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.trim()) {
            const ps = new window.kakao.maps.services.Places();
            ps.keywordSearch(input, (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setSuggestions(data); // 검색 결과 설정
                } else {
                    setSuggestions([]);
                }
            });
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.place_name);
        setSuggestions([]);
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', position: 'relative' }}>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={query}
                onChange={handleInputChange}
                style={{ padding: '10px', fontSize: '16px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            {suggestions.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px', background: 'white', maxHeight: '200px', overflowY: 'auto', position: 'absolute', width: '100%', zIndex: 10 }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ padding: '10px', cursor: 'pointer' }}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoCompleteSearch;
