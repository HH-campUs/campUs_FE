import { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading } from "./Loading";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export default function NearPostMap({
  campX,
  campY,
}: {
  campX: string;
  campY: string;
}) {
  const X = +campX;
  const Y = +campY;

  console.log(X, Y);

  useEffect(() => {
    const container = document.getElementById("nearmap");
    const options = {
      center: new kakao.maps.LatLng(Y, X),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(Y, X);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, []);

  return (
    <>
      <Wrapper id="nearmap"></Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
