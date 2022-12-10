import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const DetailMap = () => {
  const loca = useLocation();

  const state = loca.state as { campId: number };


  const detailItem = useGetApi.useGetCampDetail(state.campId)?.data;

  const checkItem = detailItem?.detailCamp?.[0];

  function itemCall() {}

  setTimeout(itemCall, 3000);

  useEffect(() => {
    if (!checkItem) return;

    var X = +checkItem?.X;
    var Y = +checkItem?.Y;

    const mapContainer = document.getElementById("KaKaomap"),
      mapOption = {
        center: new kakao.maps.LatLng(X, Y),
        level: 4,
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(X, 128.2965596);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [checkItem?.X]);

  return <Wrapper id="KaKaomap"></Wrapper>;
};

export default DetailMap;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
