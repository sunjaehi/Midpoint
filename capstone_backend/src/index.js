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
const bodyparser = require('body-parser');

const app = express();
const PORT = 4000;

//JSON 형식의 요청 본문을 파싱할 수 있도록 설정
app.use(bodyparser.json());

//중간 지점을 계산하는 함수
const calculateMidpoint = (location1, location2) => {
  const midLatitude = (location1.latitude + location2.latitude) / 2;
  const midLongitude = (location1.longitude + location2.longitude) / 2;
  return {
    latitude : midLatitude,
    longitude : midLongitude
  };
};

// /calculate-midpoint 엔드포인트 설정
app.post('/calculate-midpoint', (req,res) => {
  const { location1, location2 } = req.body;

  //유효한 요청인지 확인
  if (!location1 || location2) {
    return res.status(400).json({error : "Invalid request data"});
  }
  //중간 지점 계산
  const midpoint = calculateMidpoint(location1, location2);

  //JSON 형식으로 중간 지점을 응답
  res.json({midpoint});
});

//서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
