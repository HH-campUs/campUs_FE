import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import NearestMap from "./NearestMap";
import NearPostMap from "./NearPostMap";

import { IGetCampResult } from "../../interfaces/get";
import { Loading } from "./Loading";

export default function Nearby() {
  const [campX, setCampX] = useState<number>();
  const [campY, setCampY] = useState<number>();
  console.log(campX, campY);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCampX(position.coords.latitude);
          setCampY(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("사용이 불가능합니다.");
    }
  }, []);

  useEffect(() => {
    if (campX && campY) {
      setTimeout(() => {
        refetch();
      }, 1);
    }
  }, [campX, campY]);

  const {
    data: nearPost,
    refetch,
    isLoading,
  }: any = useGetApi.useGetDistance(+campY!, +campX!) || [];
  // console.log(nearPost[0].X);

  //로딩중 화면 처리 구상.
  return (
    <Wrapper>
      <TextBox>가장 가까운 캠핑장</TextBox>

      <PlanBox>
        {nearPost?.[0] ? null : <Loading></Loading>}

        {nearPost?.map((item: IGetCampResult, i: number) => (
          <PlanWrapper>
            <MapBox>
              {i === 0 ? (
                <NearPostMap campX={item?.X} campY={item?.Y} />
              ) : (
                <NearestMap campX={item?.X} campY={item?.Y} />
              )}
            </MapBox>
            <RightBox>
              <DistanceText>
                {item?.distance?.toString().slice(0, 3)}km
              </DistanceText>
              <CampName>{item?.campName}</CampName>
              <MapFlex>
                {item?.induty.split(",").map((item, i) => (
                  <Induty key={i}>
                    <Dutycc></Dutycc>
                    {item}
                  </Induty>
                ))}
              </MapFlex>
            </RightBox>
          </PlanWrapper>
        ))}
      </PlanBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 20px;
  margin-top: 40px;
  font-weight: 500;
  width: 100%;
  flex-direction: column;
`;

const TextBox = styled.div`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  font-weight: 600;
`;

const PlanBox = styled.div`
  width: 90%;
  height: ${(props) => props.theme.pixelToRem(264)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  box-shadow: 15px;
  position: relative;
  flex-direction: column;
  border: 1px solid #eee;
`;

const Line = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: 1px;
  margin-left: 38px;
  border-bottom: 1px solid #eee;
`;

const PlanWrapper = styled.div`
  margin: 18px 16px;
  display: flex;
`;

const MapBox = styled.div`
  position: relative;
  width: ${(props) => props.theme.pixelToRem(100)};
  height: ${(props) => props.theme.pixelToRem(100)} !important;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
`;

const RightBox = styled.div`
  width: 60%;
  margin-left: 16px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const DistanceText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const CampName = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  color: #222;
`;

const MapFlex = styled.div`
  display: flex;
  transform: translateX(-5px);
`;

const Induty = styled.div`
  margin-left: 5px;
  margin-top: 12px;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  display: flex;
  text-align: center;
  align-items: center;
  padding: 2px;
`;

const Dutycc = styled.div`
  margin-right: 5px;
  width: ${(props) => props.theme.pixelToRem(8)};
  height: ${(props) => props.theme.pixelToRem(8)};
  background-color: #024873;
  border-radius: 8px;
`;
