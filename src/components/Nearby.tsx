import React from "react";
import styled from "styled-components";
import KaKaomap from "./KaKaomap";
import { ImgBox } from "./MytravelPlan";

export default function Nearby() {
  return (
    <Wrapper>
      <TextBox>가장 가까운 캠핑장</TextBox>
      <PlanBox>
        <MapBox>
          <KaKaomap height={80} />
        </MapBox>
        <Distance>
          <DistanceText>10km | 20분</DistanceText>
          <LocationName>캠핑장 이름 적는곳</LocationName>
          <HashTag>반려동물</HashTag>
        </Distance>
      </PlanBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 10px 20px 10px;
  font-weight: 500; //temporary
  height: 200px;
`;

const TextBox = styled.div`
  margin-bottom: 10px;
`;

const PlanBox = styled.div`
  width: 380px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 15px;
  background-color: whitesmoke;
  margin: 15px auto;
  font-size: 13px;
  display: flex;
  position: relative;
`;

const MapBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: grey;
  /* margin: 20px 10px; */
`;

const Distance = styled.div`
  margin: 20px 20px;
  padding: 5px;
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
