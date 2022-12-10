import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import KaKaomap from "../KaKaomap";
import NearestMap from "./NearestMap";
import NearPostMap from "./NearPostMap";

export default function Nearby() {
  const [campX, setCampX] = useState<number | undefined>();
  const [campY, setCampY] = useState<number | undefined>();

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
          // console.log(position);
          // console.log(`현재시간 : ${time}`);
          // console.log(`위도 : ${position.coords.latitude}`);
          // console.log(`경도 : ${position.coords.longitude}`);
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

  const nearPost: any = useGetApi.useGetDistance(campX!, campY!).data || [];
  // console.log("가까운캠프", nearPost?.nearCamp);
  // console.log(nearPost?.data?.nearCamp?.);

  return (
    <Wrapper>
      <TextBox>가장 가까운 캠핑장</TextBox>
      <PlanBox>
        <PlanWrapper>
          <MapBox>
            <NearPostMap />
          </MapBox>
          <RightBox>
            <DistanceText>
              {nearPost?.nearCamp?.distance
                ? nearPost?.nearCamp?.distance
                : "로딩중입니다"}
              km
            </DistanceText>
            <CampName>
              {nearPost?.nearCamp?.address
                ? nearPost?.nearCamp?.address
                : "로딩중입니다"}
            </CampName>
            <Induty>로딩중입니다.</Induty>
          </RightBox>
        </PlanWrapper>
        <Line></Line>
        <PlanWrapper>
          <MapBox>
            <KaKaomap />
          </MapBox>
          <RightBox>
            <DistanceText></DistanceText>
            <CampName></CampName>
          </RightBox>
        </PlanWrapper>
      </PlanBox>
      {/* <MapBox></MapBox> */}
    </Wrapper>
  );
}
{
  /* <NearestMap campX={campX} campY={campY} /> */
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
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  box-shadow: 15px;
  margin: 15px auto;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const Line = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: 1px;
  margin-left: 38px;
  /* background-color: #eee; */
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
  background-color: grey;
  /* margin: 20px 10px; */
`;

const RightBox = styled.div`
  margin-left: 16px;
  margin-top: 18px;
`;

const DistanceText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const CampName = styled.div`
  margin-top: 5px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #222;
`;

const Induty = styled.div`
  margin-top: 12px;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  width: 70px;
  height: 20px;

  text-align: center;
  padding: 2px;
`;
