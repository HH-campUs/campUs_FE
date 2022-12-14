import axios from "axios";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const DetailMap = () => {
  const { campId } = useParams();

  const detailItem = useGetApi.useGetCampDetail(campId)?.data?.[0];
  const X = +detailItem?.X!;
  const Y = +detailItem?.Y!;

  useEffect(() => {
    const mapContainer = document.getElementById("KaKaomap"),
      mapOption = {
        center: new kakao.maps.LatLng(Y, X),
        level: 4,
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(Y, X);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [X]);

  return <Wrapper id="KaKaomap"></Wrapper>;
};

export default DetailMap;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
