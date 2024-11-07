const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
const KAKAO_API_KEY = '6204ad0ff0932f6be87b31f62451d1cf';

// 중간 지점을 계산하는 함수
const calculateMidpoint = (location1, location2) => {
  const midLatitude = (location1.latitude + location2.latitude) / 2;
  const midLongitude = (location1.longitude + location2.longitude) / 2;
  return {
    latitude: midLatitude,
    longitude: midLongitude
  };
};

// 중간지점과 가장 가까운 장소를 찾는 함수
const findNearestLocation = async (latitude, longitude) => {
  const categories = ['SW8', 'AT4', 'CE7']; // 지하철역, 관광명소, 카페
  let nearestLocation = null;
  let minDistance = Infinity;

  for (const category of categories) {
    try {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`
        },
        params: {
          category_group_code: category,
          x: longitude,
          y: latitude,
          radius: 2000,
          sort: 'distance'
        }
      });

      const locations = response.data.documents;
      if (locations.length > 0) {
        const location = locations[0]; // 가장 가까운 장소
        const distance = parseFloat(location.distance);
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = {
            name: location.place_name,
            latitude: parseFloat(location.y),
            longitude: parseFloat(location.x),
            address: location.road_address_name || location.address_name,
            distance: distance
          };
        }
      }
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error.message);
      // 상태 코드와 오류 응답 출력
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
  }

  return nearestLocation;
};

// /calculate-midpoint 엔드포인트 설정
app.post('/calculate-midpoint', async (req, res) => {
  const { location1, location2 } = req.body;

  if (!location1 || !location2 ||
      typeof location1.latitude !== 'number' || typeof location1.longitude !== 'number' ||
      typeof location2.latitude !== 'number' || typeof location2.longitude !== 'number') {
    console.log("Invalid request data format:", req.body);
    return res.status(400).json({ error: "Invalid request data" });
  }

  const midpoint = calculateMidpoint(location1, location2);

  try {
    const nearestLocation = await findNearestLocation(midpoint.latitude, midpoint.longitude);

    if (nearestLocation) {
      res.json({
        midpoint,
        nearestLocation
      });
    } else {
      res.status(404).json({ message: "가까운 장소를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("Error finding nearest location:", error.message);
    res.status(500).json({ error: "Failed to find nearest location" });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
