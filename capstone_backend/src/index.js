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

const app = express();
app.use(cors()); // CORS 설정
app.use(bodyParser.json());

// 나머지 코드..

const PORT = 4000;

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



//서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
