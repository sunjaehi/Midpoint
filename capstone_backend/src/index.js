// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors()); // CORS 설정
app.use(bodyParser.json());

// 나머지 코드..

const PORT = 4000;
const KAKAO_API_KEY = '6204ad0ff0932f6be87b31f62451d1cf';

//중간 지점을 계산하는 함수
const calculateMidpoint = (location1, location2) => {
  const midLatitude = (location1.latitude + location2.latitude) / 2;
  const midLongitude = (location1.longitude + location2.longitude) / 2;
  return {
    latitude : midLatitude,
    longitude : midLongitude
  };
};
app.use((req, res, next) => {
  console.log("Request received: ", req.method, req.url, req.body);
  next();
})
// /calculate-midpoint 엔드포인트 설정
app.post('/calculate-midpoint', (req, res) => {
  const { location1, location2 } = req.body;

  // location1과 location2가 전달된 구조가 올바른지 확인
  console.log("Received location1:", location1);
  console.log("Received location2:", location2);

  // 각 위치에 latitude와 longitude가 포함되어 있는지 확인
  if (
    !location1 || !location2 ||
    typeof location1.latitude !== 'number' || typeof location1.longitude !== 'number' ||
    typeof location2.latitude !== 'number' || typeof location2.longitude !== 'number'
  ) {
    console.log("Invalid request data format:", req.body);
    return res.status(400).json({ error: "Invalid request data" });
  }

  // 중간 지점 계산
  const midpoint = calculateMidpoint(location1, location2);
  res.json({ midpoint });
});
app.post('/nearest-location', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    console.log("Invalid request data format: ", req.body);
    return res.status(400).json({error: "Invalid request data" });
  }
  try {
    //Kakao Local API 요청
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
      headers : {
        Authorization : `KakaoAK ${KAKAO_API_KEY}`
      },
      params : {
        category_group_code : 'SW8',
        x : longitude,
        y : latitude,
        radius : 2000,
        sort : 'distance'
      }
    });

    const locations = response.data.documents;
    const nearestLocation = locations.length > 0 ? locations[0] : null;

    if (nearestLocation) {
      res.json({
        name : nearestLocation.place_name,
        address : nearestLocation.road_address_name || nearestLocation.address_name,
        distance : nearestLocation.distance
      });
    } else {
      res.json({ message : "지하철역이나 건물을 찾을 수 없습니다."});
    }
  } catch (error) {
    console.error("Error fetching nearest location:",error);
    res.status(500).json({error:"Failed to fetch nearest location"});
  }
});



//서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
