import React, { useState } from "react";
import styled from "styled-components";
import Kebop from "../../components/withPlan/Kebop";
import SemiSearch from "../../components/withSearch/SemiSearch";
import PlanUpdate from "../../components/withPlan/PlanUpdate";

import { usePostsApi } from "../../APIs/postsApi";
import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";
import { IGetTravelPlan } from "../../interfaces/MyPage";
import { useMyPageApi } from "../../APIs/myPageApi";

export default function MyPlan() {
  const [onOff, setOnOff] = useState(false);
  const [isPlan, setIsPlan] = useState(false);

  const isLogin = getCamperToken();
  const navigate = useNavigate();

  const checkbox = document.getElementById("toggle") as HTMLInputElement | null;

  const toggle = () => {
    if (checkbox?.checked == true)
      return (checkbox.checked = false), setOnOff(false);
    else if (checkbox?.checked == false)
      return (checkbox.checked = true), setOnOff(true);
  };

  const Trips = useMyPageApi.useGetMyPage().data?.data.Trip;
  console.log(Trips);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked === false) {
      setOnOff(false);
    } else if (e.target.checked === true) {
      setOnOff(true);
    }
  };

  const DdayCalculator = (date: string) => {
    const planDay = new Date(
      date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8)
    );

    const today = new Date();
    const gap = planDay.getTime() - today.getTime();
    const result = Math.floor(gap / (1000 * 60 * 60 * 24) + 1);

    console.log(result, typeof result);
    return result;
  };

  return (
    <>
     {isPlan == false ? null : (
        <PlanUpdate isPlan={isPlan} setIsPlan={setIsPlan} />
      )}
      <TotalContainer>
        <ToggleBtn onOff={onOff}>
          <input type="checkbox" id="toggle" onChange={onChangeText} hidden />

          <span className="offSpan" onClick={toggle}>
            다가올 여행
          </span>
          <span className="onSpan" onClick={toggle}>
            지난여행
          </span>
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton" />
          </label>
        </ToggleBtn>
        <Wrapper>
          {isLogin ? (
            <>
              {onOff == false ? (
                <>
                  {Trips?.map((trip: IGetTravelPlan) => (
                    <PlanBox key={trip.Camp?.tripId}>
                      <img
                        src={trip.Camp?.ImageUrl}
                        alt="img"
                        onClick={() => {
                          navigate(`/detail/${trip.Camp?.campId}/detail`);
                        }}
                      />
                      <Dday>D - {DdayCalculator(trip.date)}</Dday>
                      <div className="infoBox">
                        <span>{trip.Camp?.address}</span>
                        <span>{trip.Camp?.campName}</span>
                        <span>떠나는 날짜</span>
                        <span>
                          {trip.date.slice(2, 4)}.{trip.date.slice(4, 6)}.
                          {trip.date.slice(6, 8)}
                        </span>
                        <Memo>{trip.memo}</Memo>
                      </div>

                      <Kebop tripId={trip.tripId} setIsPlan={setIsPlan} />
                    </PlanBox>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  {Trips?.map((trip: IGetTravelPlan) => (
                    <PlanBox key={trip.Camp?.tripId}>
                      <img src={trip.Camp?.ImageUrl} alt="img" />

                      <div className="infoBox">
                        <span>{trip.Camp?.address}</span>
                        <span>{trip.Camp?.campName}</span>
                        <span>떠나는 날짜</span>
                        <span>
                          {trip.date.slice(2, 4)}.{trip.date.slice(4, 6)}.
                          {trip.date.slice(6, 8)}
                        </span>
                        <Memo>{trip.memo}</Memo>
                      </div>

                      <Kebop tripId={trip.tripId} setIsPlan={setIsPlan} />
                    </PlanBox>
                  ))}{" "}
                </>
              )}
            </>
          ) : (
            <>
              <NotiBox>
                <div>
                  <img src="/images/mypage/myplan.svg" alt="tent" />
                </div>
                <PickText>아직 저장한 여행이 없어요!</PickText>
                <PickBtn
                  onClick={() => {
                    navigate("/topic/1");
                  }}>
                  가장 가까운 캠핑장 구경가기
                </PickBtn>
              </NotiBox>
            </>
          )}
        </Wrapper>
      </TotalContainer>
    </>
  );
}
// ${(props) => props.theme.pixelToRem(45)};
const FloatingBtn = styled.button`
  position: fixed;
  right: 13%;
  bottom: 13%;
  width: ${(props) => props.theme.pixelToRem(50)};
  height: ${(props) => props.theme.pixelToRem(50)};
  border-radius: ${(props) => props.theme.pixelToRem(50)};
  background-color: #adc2ce;
  cursor: pointer;
  z-index: 10;
  border: 1px solid #eee;
`;

const TotalContainer = styled.div`
  width: 100%;
  position: absolute;
`;

const ToggleBtn = styled.div<{ onOff: boolean }>`
  width: 100%;
  margin-left: -20px;

  .toggleSwitch {
    width: ${(props) => props.theme.pixelToRem(335)};
    height: ${(props) => props.theme.pixelToRem(48)};
    display: block;
    position: relative;
    border-radius: 26px;
    background-color: #5185a6;
    cursor: pointer;
    margin: 30px;
  }

  .toggleSwitch .toggleButton {
    width: 150px;
    height: 38px;
    position: absolute;
    top: 49%;
    left: 1.7%;
    transform: translateY(-50%);
    border-radius: 37px;
    background: #ffffff;
    z-index: 1;
  }

  #toggle:checked ~ .toggleSwitch .toggleButton {
    left: calc(100% - 156px);
    background: #fff;
  }

  .toggleSwitch,
  .toggleButton {
    transition: all 0.14s ease-in;
  }

  .offSpan {
    margin-top: 14px;
    margin-left: 70px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => (props.onOff == true ? "#ffffff" : "#000000")};
    z-index: 2;
    position: absolute;
    transition: color 0.2s ease-in-out;
    /* background-color: red; */
  }

  .onSpan {
    margin-top: 14px;
    margin-left: 258px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => (props.onOff == true ? "#000000" : "#ffffff")};
    z-index: 2;
    position: absolute;
    transition: color 0.2s ease-in-out;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 63vh;

  padding: 20px;
  overflow-y: scroll;
`;

const PlanBox = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pixelToRem(360)};
  height: ${(props) => props.theme.pixelToRem(150)};
  margin: 0 auto 18px;
  border-radius: 10px;
  border: solid 1px #eee;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  img {
    width: ${(props) => props.theme.pixelToRem(118)};
    height: ${(props) => props.theme.pixelToRem(150)};
    border-radius: 10px;
    position: relative;
  }

  .infoBox {
    padding: 14px 14px 10px 14px;
    text-align: left;
    flex-direction: column;
    display: flex;
    span {
      :first-child {
        width: ${(props) => props.theme.pixelToRem(106)};
        height: ${(props) => props.theme.pixelToRem(14)};
        ${(props) => props.theme.fontTheme.Caption4};
        color: ${(props) => props.theme.colorTheme.text2};
        line-height: normal;
        letter-spacing: normal;
      }
      :nth-child(2) {
        width: ${(props) => props.theme.pixelToRem(140)};
        height: ${(props) => props.theme.pixelToRem(18)};
        margin-top: 4px;
        ${(props) => props.theme.fontTheme.Caption1};
        line-height: normal;
        letter-spacing: normal;
      }
      :nth-child(3) {
        width: auto;
        height: ${(props) => props.theme.pixelToRem(14)};
        margin-top: 12px;
        margin-bottom: 3px;
        ${(props) => props.theme.fontTheme.Caption4};
        color: ${(props) => props.theme.colorTheme.text2};
        line-height: normal;
        letter-spacing: normal;
      }
      :last-child {
        width: ${(props) => props.theme.pixelToRem(106)};
        height: ${(props) => props.theme.pixelToRem(14)};
        margin-top: 40px;
        ${(props) => props.theme.fontTheme.Caption1};
        line-height: normal;
        letter-spacing: normal;
      }
    }
  }
`;

const Dday = styled.div`
  width: ${(props) => props.theme.pixelToRem(66)};
  height: ${(props) => props.theme.pixelToRem(26)};
  flex-grow: 0;
  margin: 10px 0px 0 25px;
  padding: 3px 15px;
  border-radius: 17px;
  border: solid 2px #fff;
  background-color: #024873;
  position: absolute;
  display: flex;

  ${(props) => props.theme.fontTheme.Caption1};
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colorTheme.textWhite};
`;

const Memo = styled.div`
  width: ${(props) => props.theme.pixelToRem(198)};
  height: ${(props) => props.theme.pixelToRem(32)};
  margin: 94px 0 0 0;
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Caption4};
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colorTheme.text2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  position: absolute;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 227px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
`;

const PickText = styled.div`
  margin-top: 10px;
  ${(props) => props.theme.pixelToRem(14)};
  color: #909090;
`;

const PickBtn = styled.button`
  margin-top: 30px;
  width: 227px;
  height: 47px;
  border: solid 1px #222;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
`;
