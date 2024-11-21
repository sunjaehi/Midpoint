const express = require('express'); // express : 웹프레임워크, 서버 생성(클라이언트가 요청한 작업을 수행하거나 데이터 반환)
const cors = require('cors'); // cors는 서버와 클라이언트가 다른 도메인에 있는 경우, 클라이언트가 서버의 데이터를 사용할 수 있도록 해줌
const bodyParser = require('body-parser'); // body-parser는 클라이언트가 서버에 보낸 POST요청의 데이터를 처리
const axios = require('axios'); // axios는 HTTP요청을 쉽게 만들 수 있게 도와주는 라이브러리 외부 API와 통신할 때 사용

const app = express();
app.use(cors()); // CORS 설정
app.use(bodyParser.json());

const PORT = 4000;
const KAKAO_API_KEY = '43621e0871a5db75caebb339570f5139';

// 중간 지점을 계산하는 함수
const calculateMidpoint = (location1, location2) => {
  const midLatitude = (location1.latitude + location2.latitude) / 2;
  const midLongitude = (location1.longitude + location2.longitude) / 2;
  return {
    latitude: midLatitude,
    longitude: midLongitude,
  };
};

app.use((req, res, next) => {
  console.log("Request received: ", req.method, req.url, req.body);
  next();
});

// Kakao API를 통해 카테고리의 장소를 검색하는 함수
const searchNearbyPlace = async (latitude, longitude, categoryGroupCode) => {
  
  const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${categoryGroupCode}&x=${longitude}&y=${latitude}&radius=2000&sort=distance`;
  
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });

    if (response.data && response.data.documents.length > 0) {
      return {
        ...response.data.documents[0], // 가장 가까운 장소 반환, ...(spread 연산자)는 객체나 배열의 내용을 분해하여 포함하거나 복사할 때 사용
        latitude : response.data.documents[0].y,
        longitude : response.data.documents[0].x,

      };
    } else {
      console.error("No places found for category:", categoryGroupCode);
      return null;
    }
  } catch (error) {
    console.error('Error searching nearby place:', error.message);
    return null;
  }
};

// Kakao내비 API를 통한 이동 시간 요청
const getDrivingTime = async (start, end) => {
  const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${encodeURIComponent(start.longitude)},${encodeURIComponent(start.latitude)}&destination=${encodeURIComponent(end.longitude)},${encodeURIComponent(end.latitude)}&priority=RECOMMEND`;
  
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });
    
    // duration 값 확인
    if (response.data?.routes?.[0]?.summary?.duration) {
      const drivingTime = response.data.routes[0].summary.duration;
      return Math.floor(drivingTime / 60); // 초를 분으로 변환
    } else {
      console.warn("No duration data found in response.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching driving time:', error.response?.data || error.message);
    return null;
  }
};

// /calculate-midpoint 엔드포인트 설정
app.post('/calculate-midpoint', async (req, res) => { // app.post()는 HTTP POST 요청을 특정 경로로 받아들이고 요청에 대한 처리
  const { location1, location2, categoryCode } = req.body;

  console.log("Received location1:", location1);
  console.log("Received location2:", location2);
  console.log("selected categoryCode: ", categoryCode);

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

  // 중간좌표 근처의 카페, 관광명소, 지하철역 검색
  try {
    // const cafe = await searchNearbyPlace(midpoint.latitude, midpoint.longitude, 'CE7');
    // const touristAttraction = await searchNearbyPlace(midpoint.latitude, midpoint.longitude, 'AT4');
    // const subwayStation = await searchNearbyPlace(midpoint.latitude, midpoint.longitude, 'SW8');

    const nearestPlace = await searchNearbyPlace(midpoint.latitude, midpoint.longitude, categoryCode);

    const drivingTime1 = nearestPlace ? await getDrivingTime(location1, nearestPlace) : null;
    const drivingTime2 = nearestPlace ? await getDrivingTime(location2, nearestPlace) : null;

    res.json({
      midpoint,
      nearestPlace,
      drivingTime1,
      drivingTime2
    });
  } catch (error) {
    console.error("Error finding nearest places:", error.message);
    res.status(500).json({ error: "Failed to find nearest places" });
  }
  
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
