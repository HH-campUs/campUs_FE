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

// const X = "126.8785375";
// const Y = "37.5693167";

const X = "33.450701";
const Y = "126.570667";

var marker = new kakao.maps.Marker({
  position: markerPosition,
});
var markerPosition = new kakao.maps.LatLng(X, Y);
var marker = new kakao.maps.Marker({ position: markerPosition });

export default function KaKaomap() {
  useEffect(() => {
    //지도 담을 영역 지정.
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.57),
      level: 3,
    };
    //지도생성, 객체리턴
    const map = new kakao.maps.Map(container, options);
    marker.setMap(map);
  }, []);

  return <Wrapper id="map"></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

//캠핑장좌표 예시.
