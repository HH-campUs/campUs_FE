import React from "react";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { width } from "@mui/system";
import { Hidden } from "@mui/material";

const Wrapper = styled.div`
  margin: 20px 10px 20px 10px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyPlan = styled.div`
  font-weight: 500;
`;

const AllList = styled.div`
  font-size: small;
  color: ${(props) => props.theme.textColor};
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

export const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: grey;
  margin: 20px 10px;
`;

const PlaceName = styled.div`
  margin: 20px 0px;
  width: 210px;
  height: 70px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

const Dday = styled.div`
  width: 50px;
  height: 20px;
  margin: 20px;
  border-radius: 10px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MytravelPlan() {
  return (
    <Wrapper>
      <TextBox>
        <MyPlan>내 여행일정</MyPlan>
        <AllList>전체보기</AllList>
      </TextBox>

      {/* div는 최대 넓이를 가짐. */}
      <PlanBox>
        <ImgBox />
        <PlaceName>
          <div style={{ width: 180 }}>
            캠핑장 이름두줄해놓으면 아래 아이콘밀려남
          </div>

          <Location>
            {/* component화. */}
            <LocationOnIcon /> <span>강원도 어디?</span>
            <LocationOnIcon /> <span>2022.12.28(달력)</span>
          </Location>
        </PlaceName>
        <Dday>
          <span>D-16</span>
        </Dday>
      </PlanBox>
    </Wrapper>
  );
}
