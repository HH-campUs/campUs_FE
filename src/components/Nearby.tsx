import React from "react";
import styled from "styled-components";
import { ImgBox } from "./MytravelPlan";

const Wrapper = styled.div`
  margin: 20px 10px 20px 10px;
  font-weight: 500; //temporary
  height: 200px; //temporary 수정해야함. 끝에짤리는이슈있음.
`;

const TextBox = styled.div`
  margin-bottom: 10px;
`;

const PlanBox = styled.div`
  width: 380px;
  height: 120px;
  border-radius: 15px;
  box-shadow: 15px;
  background-color: whitesmoke;
  margin: 15px auto;
  font-size: 13px;
  display: flex;
`;

const Distance = styled.div`
  margin: 20px 10px;
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

export default function Nearby() {
  return (
    <Wrapper>
      <TextBox>가장 가까운 캠핑장</TextBox>
      <PlanBox>
        <ImgBox />
        <Distance>
          <DistanceText>10km | 20분</DistanceText>
          <LocationName>캠핑장 이름 적는곳</LocationName>
          <HashTag>반려동물</HashTag>
        </Distance>
      </PlanBox>
    </Wrapper>
  );
}
