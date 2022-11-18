import React, { useEffect } from "react";

//스크립트로 kakao maps api를 심으면, window전역 객체에 들어가게 된다.
//함수형 컴포넌트는 이를 인식 할 수 없음. 이에 아래와 같이 지정.
const { kakao } = window;

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
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "300px",
        height: "300px",
      }}
    ></div>
  );
}
