import React from "react";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
          <PlaceBox>
            <Campname>캠핑장 이름두줄해놓으면 아래 아이콘밀려남</Campname>
            <Dday>D-16</Dday>
          </PlaceBox>
          <Location>
            {/* component화. */}
            <LocationOnIcon /> <span>강원도 어디?</span>
            <LocationOnIcon /> <span>2022.12.28(달력)</span>
          </Location>
        </PlaceName>
      </PlanBox>
    </Wrapper>
  );
}

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
  width: 260px;
  height: 70px;
  justify-content: space-between;
`;

const PlaceBox = styled.div`
  display: flex;
  height: 50px;
`;

const Campname = styled.div`
  width: 180px;
  margin-top: 5px;
  margin-left: 10px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

const Dday = styled.div`
  width: 50px;
  height: 20px;
  margin-top: 5px;
  margin-left: 30px;

  border-radius: 8px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
