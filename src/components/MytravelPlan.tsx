import React from "react";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRecoilValue } from "recoil";
import { LoginState } from "../store/loginAtom";
import { Navigate, useNavigate } from "react-router-dom";

export default function MytravelPlan() {
  const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TextBox>
        <MyPlan>내 여행일정</MyPlan>
        <AllList>전체보기</AllList>
      </TextBox>

      {/* div는 최대 넓이를 가짐. */}
      {isLogin ? (
        <PlanBox>
          <ImgBox />
          <PlaceName>
            <PlaceBox>
              <Campname className="isLogin">
                캠핑장 이름두줄해도 아이콘안밀려남
              </Campname>
              <Dday>D-16</Dday>
            </PlaceBox>
            <Location>
              <LocationOnIcon />
              <span>강원도 어디?</span>
              <img
                src="/images/Calendar.svg"
                alt="Calendar"
                style={{ marginLeft: "20px" }}
              />
              <span>2022.12.28(달력)</span>
            </Location>
          </PlaceName>
        </PlanBox>
      ) : (
        <>
          <CloseBox>
            <Carlendar>
              <img src="/images/travelplan/calendarplan.svg" alt="carlendar" />
            </Carlendar>
            <CloseText>
              <p
                onClick={() => {
                  navigate("/login");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                로그인
              </p>
              &nbsp;
              <p>하고 내 여행일정을 등록해 보세요</p>
            </CloseText>
          </CloseBox>

          <HiddenBox></HiddenBox>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 40px;
  width: 375px;
  /* margin: 20px 10px 20px 10px; */
`;

const TextBox = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyPlan = styled.div`
  font-weight: 500;
`;

const AllList = styled.div`
  font-size: 0.8rem;
  color: grey;
`;

const PlanBox = styled.div`
  width: 375;
  height: 120px;
  border-radius: 15px;
  box-shadow: 15px;
  background-color: whitesmoke;
  font-size: 13px;
  display: flex;
`;

const CloseBox = styled.div`
  width: 375px;
  height: 120px;
  border-radius: 15px;
  box-shadow: 15px;
  /* background-color: whitesmoke; */
  background-color: rgba(150, 150, 150, 0.8);
  font-size: 13px;
  display: flex;
  z-index: 3;
  position: absolute;
`;

const Carlendar = styled.div`
  margin: auto;
`;

const CloseText = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px;
  margin-top: 54px;
  /* margin: auto; */
  font-size: 1rem;
  color: whitesmoke;
  font-weight: 550;
`;

const HiddenBox = styled.div`
  width: 375px;
  height: 120px;
  border-radius: 15px;
  box-shadow: 15px;
  /* background-color: whitesmoke; */
  background-color: rgba(100, 100, 100, 0.1);
  margin: 15px auto;
  font-size: 13px;
  display: flex;
  position: relative;
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
  font-size: 1rem;

  islogin {
    background-color: grey;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

const Dday = styled.div`
  width: 66px;
  height: 26px;
  margin-top: 5px;
  margin-left: 30px;
  border-radius: 1rem;
  background-color: #5185a6;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
`;
