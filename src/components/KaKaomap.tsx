import { height } from "@mui/system";
import React, { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}
//스크립트로 kakao maps api를 심으면, window전역 객체에 들어가게 된다.
//함수형 컴포넌트는 이를 인식 할 수 없음. 이에 아래와 같이 지정.
const { kakao } = window;

const X = "33.450701";
const Y = "126.570667";

// { height }: { height: number }
export default function KaKaomap() {
  useEffect(() => {
    //지도 담을 영역 지정.
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.57),
      level: 5,
    };

    // 지도에 마커와 인포윈도우를 표시하는 함수.
    function displayMarker(locPosition: string, message: string | JSX.Element) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        console.log(lat, lon);
        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = "내 위치";

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "지원하지 않는 환경입니다.";
      displayMarker(locPosition, message);
    }

    //지도생성, 객체리턴
    const map = new kakao.maps.Map(container, options);
  }, []);

  return <Wrapper id="map"></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

//캠핑장좌표 예시.

// var mapContainer = document.getElementById("map"), // 지도를 표시할 div
//   mapOption = {
//     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//     level: 10, // 지도의 확대 레벨
//   };

// var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
// if (navigator.geolocation) {
//   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//   navigator.geolocation.getCurrentPosition(function (position) {
//     var lat = position.coords.latitude, // 위도
//       lon = position.coords.longitude; // 경도

//     var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//       message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

//     // 마커와 인포윈도우를 표시합니다
//     displayMarker(locPosition, message);
//   });
// } else {
//   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

//   var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
//     message = "사용할수 없어요";

//   displayMarker(locPosition, message);
// }

// // 지도에 마커와 인포윈도우를 표시하는 함수입니다
// function displayMarker(locPosition, message) {
//   // 마커를 생성합니다
//   var marker = new kakao.maps.Marker({
//     map: map,
//     position: locPosition,
//   });

//   var iwContent = message, // 인포윈도우에 표시할 내용
//     iwRemoveable = true;

//   // 인포윈도우를 생성합니다
//   var infowindow = new kakao.maps.InfoWindow({
//     content: iwContent,
//     removable: iwRemoveable,
//   });

//   // 인포윈도우를 마커위에 표시합니다
//   infowindow.open(map, marker);

//   // 지도 중심좌표를 접속위치로 변경합니다
//   map.setCenter(locPosition);
// }
