import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import KaKaomap from "../KaKaomap";
import NearPostMap from "./NearPostMap";

export default function Nearby() {
  const [campX, setCampX] = useState<number>();
  const [campY, setCampY] = useState<number>();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const time = new Date(position.timestamp);
          setCampX(position.coords.latitude);
          setCampY(position.coords.longitude);

          console.log(position);
          // console.log(`현재시간 : ${time}`);
          console.log(`위도 : ${position.coords.latitude}`);
          console.log(`경도 : ${position.coords.longitude}`);
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
  };
  const nearPost = useGetApi.useGetDistance(campX!, campY!);
  console.log(nearPost);

  return (
    <Wrapper>
      <TextBox>가장 가까운 캠핑장</TextBox>
      <PlanBox>
        <PlanWrapper>
          <MapBox>
            {/* <KaKaomap /> */}
            <NearPostMap />
          </MapBox>

          <RightBox>
            <DistanceText>10km | 20분</DistanceText>
            <LocationName>캠핑장 이름 적는곳</LocationName>
            <HashTag>운동시설</HashTag>
          </RightBox>
        </PlanWrapper>
      </PlanBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 40px 20px;
  font-weight: 500; //temporary
  width: 100%;
  /* width: ${(props) => props.theme.pixelToRem(375)}; */
  flex-direction: column;
`;

const TextBox = styled.div`
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  font-weight: 600;
`;

const PlanBox = styled.div`
  width: 80%;
  height: ${(props) => props.theme.pixelToRem(264)};
  border-radius: 10px;
  box-shadow: 15px;
  background-color: whitesmoke;
  margin: 15px auto;
  font-size: 13px;
  display: flex;
  position: relative;
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
  background-color: grey;
  /* margin: 20px 10px; */
`;

const RightBox = styled.div`
  margin-left: 16px;
`;

const DistanceText = styled.div``;

const LocationName = styled.div`
  margin-top: 10px;
`;

const HashTag = styled.div`
  margin-top: 10px;
  font-size: 15px;
  width: 70px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid grey;
  text-align: center;
  padding: 2px;
`;

const CenterLine = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: ${(props) => props.theme.pixelToRem(1)};
  background-color: red;
`;
