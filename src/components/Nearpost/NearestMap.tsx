import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

declare global {
  interface Window {
    kakao: any;
  }
}
// eb71fe40472032a8657d1ae10c054221
//스크립트로 kakao maps api를 심으면, window전역 객체에 들어가게 된다.
//함수형 컴포넌트는 이를 인식 할 수 없음. 이에 아래와 같이 지정.
const { kakao } = window;

export default function NearestMap(
  { campX }: { campX: number | undefined },
  { campY }: { campY: number | undefined }
) {
  if (!campX) return;
  useEffect(() => {
    //지도 담을 영역 지정.
    const container = document.getElementById("nearestmap");
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.57),
      level: 5,
    };
    // 지도에 마커와 인포윈도우를 표시하는 함수.
    function displayMarker(locPosition: string, message: string | JSX.Element) {
      // 마커를 생성

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
    var locPosition = new kakao.maps.LatLng(campX, campY),
      message = "";
    displayMarker(locPosition, message);
    const map = new kakao.maps.Map(container, options);
  }, []);

  return <Wrapper id="nearestmap"></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
