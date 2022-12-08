import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectLo, showLo } from "../store/locationAtom";
import { DateState } from "../store/dateAtom";
import { Link } from "react-router-dom";
import { useRecommendWeather } from "../APIs/getApi";
import styled, { keyframes } from "styled-components";

import { useNavigate } from "react-router-dom";

//css
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Subject() {
  const navigate = useNavigate();
  const [isWeather, setIsWeather] = useState(false);

  const { RecommendData, isLoading, isError } = useRecommendWeather();
  const recommendData = RecommendData?.recommend[0];

  /* 캠핑 조회 address */
  const [locationValue, setLocationValue] = useRecoilState(showLo);
  /* 날씨 조회 pardo, dt */
  const [sendLocation, setSendLocation] = useRecoilState(selectLo);
  const [sendDate, setSendDate] = useRecoilState(DateState);

  /* 토요일의 추천 장소의 캠핑장 결과창으로 전송했을 때 필요한 requests 
  렌더링 시 깔아주면 검색창에 default로 깔리는 걸 방지하여 Link 를 눌렀을
  때만 보내지게 함수로 설정 */

  const exportData = () => {
    setLocationValue(recommendData.name);
    setSendLocation(recommendData.pardo);
    setSendDate(recommendData.dt);
  };

  console.log(recommendData);

  const isModal = () => {
    setIsWeather((prev) => !prev);
    console.log("modal", "modal");
  };

  return (
    <>
      <WeatherModal>
        <WeatherModal>
          <img src="/images/mainSunRain.svg" alt="weather" />
          <ContentText>이번주 날씨 가장 좋은 곳 어디지? </ContentText>
          <KeyboardArrowRightIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={isModal}
          />
        </WeatherModal>
        {isWeather && (
          <Container onClick={isModal}>
            <div></div>
            <Wrapper>
              <WeatherModal className="isActive">
                <ModalBox>
                  <TextBox>
                    <TextSub>이번주 날씨 가장 좋은 곳</TextSub>
                    <TextSec>다가오는 토요일의 날씨를 보여드립니다.</TextSec>
                  </TextBox>
                  <WeatherInfo>
                    <Icon>
                      <img src="/images/Sunny.svg" alt="sunny" />
                    </Icon>
                    <CenterInfo>
                      <Loca>{recommendData.name}</Loca>
                      <PopPercent>비올확률 {recommendData.pop}%</PopPercent>
                    </CenterInfo>
                    <TempInfo>
                      <MinMax>
                        <p style={{ color: "blue" }}>{recommendData.min}</p>
                        <p style={{ color: "red" }}>{recommendData.max}</p>
                      </MinMax>
                      <Regular>
                        {recommendData.day.toFixed(0)}
                        <p>°</p>
                      </Regular>
                    </TempInfo>
                  </WeatherInfo>
                  <DayInfo>
                    {recommendData.dt.slice(4, 6)}월
                    {recommendData.dt.slice(6, 8)}일 낮 기준
                  </DayInfo>
                  <DetailInfo>
                    <hr />
                    <div className="tempGraph">
                      <img
                        src="/images/weatherIcon/icon-circleline.svg"
                        alt="circleline"
                      />
                      <img
                        src="/images/weatherIcon/icon-morning.svg"
                        alt="morning"
                      />
                      <img
                        src="/images/weatherIcon/icon-lunch.svg"
                        alt="lunch"
                      />
                      <img
                        src="/images/weatherIcon/icon-night.svg"
                        alt="night"
                      />
                      <span>{recommendData.morn.toFixed(0)}°</span>
                      <span>{recommendData.day.toFixed(0)}°</span>
                      <span>{recommendData.night.toFixed(0)}°</span>
                    </div>
                    <div className="infoBox">
                      <div className="left">
                        <div className="climate">
                          <p>바람</p>
                          <p>습도</p>
                          <p>자외선지수</p>
                        </div>
                        <div className="climateNum">
                          <div>
                            <p>{recommendData.wind_speed.toFixed(0)}m/s</p>
                            <p>{recommendData.humidity}%</p>
                            <p>{recommendData.uvi}</p>
                          </div>
                        </div>
                      </div>
                      <div className="right">
                        {/* wind_speed */}
                        {recommendData.wind_speed.toFixed(0) > 5 ? (
                          <p style={{ color: "#eb4343" }}>
                            <b>·</b> 강풍으로 체감온도가 낮아요
                          </p>
                        ) : recommendData.wind_speed.toFixed(0) < 5 &&
                          recommendData.wind_speed.toFixed(0) > 2.9 ? (
                          <p style={{ color: "#fc9701" }}>
                            <b>·</b> 다소 선선한 바람이 불어요
                          </p>
                        ) : (
                          <p style={{ color: "#27a80c" }}>
                            <b>·</b> 바람이 거의 불지 않아요
                          </p>
                        )}

                        {/* humidity */}
                        {recommendData.humidity > 60 ? (
                          <p style={{ color: "#eb4343" }}>
                            <b>·</b> 많이 습해서 불쾌지수가 올라가요
                          </p>
                        ) : recommendData.humidity < 60 &&
                          recommendData.humidity > 30 ? (
                          <p style={{ color: "#27a80c" }}>
                            <b>·</b> 캠프파이어 하기 딱 좋아요
                          </p>
                        ) : (
                          <p style={{ color: "#fc9701" }}>
                            <b>·</b> 수분크림을 꼭 챙기세요
                          </p>
                        )}

                        {/* uvi */}
                        {recommendData.uvi > 4.9 ? (
                          <p style={{ color: "#eb4343" }}>
                            <b>·</b> 야외활동을 추천하지 않아요
                          </p>
                        ) : recommendData.uvi < 5 && recommendData.uvi == 3 ? (
                          <p style={{ color: "#fc9701" }}>
                            <b>·</b> 썬크림은 꼭 발라주세요
                          </p>
                        ) : (
                          <p style={{ color: "#27a80c" }}>
                            <b>·</b> 활동하기 좋은 햇볕이에요
                          </p>
                        )}
                      </div>
                    </div>
                  </DetailInfo>

                  <GoCampBtn to="/result" onClick={exportData}>
                    {recommendData.name} 캠핑장 둘러보기
                  </GoCampBtn>
                </ModalBox>
              </WeatherModal>
            </Wrapper>
          </Container>
        )}
      </WeatherModal>
    </>
  );
}

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}
`;

const slideIn = keyframes`
  from {bottom: -500px; opacity: 0} 
    to {bottom: 0; opacity: 1}
`;

const ContentText = styled.div`
  margin-left: 10px;
  color: whitesmoke;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  transition: all 0.5s ease-in-out;
`;

const WeatherModal = styled.div`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(60)};
  background-color: #85a8e6;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  &.isActive {
    height: 25rem;
    width: ${(props) => props.theme.pixelToRem(475)};

    bottom: 0;
    position: relative;
    z-index: 100;
    animation: ${slideIn};
    animation-duration: 0.7s;
    background-color: white;
    flex-direction: column;
    border-radius: 1rem 1rem 0 0;
    padding-bottom: 300px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  position: fixed;
  display: flex;
  transition: all 0.5s ease-in-out;
  justify-content: center;
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);

  & > div:first-child {
    width: 475px;
    min-height: 650px;
    @media screen and (max-width: 915px) {
      display: none;
    }
  }
  & > div:last-child {
    width: 475px;
    max-width: 475px;

    @media screen and (min-width: 915px) {
      max-width: 475px;
    }
  }
`;

const ModalBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.div`
  font-size: 1rem;
  height: 500px;
  margin-left: 30px;
`;

const TextSub = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const TextSec = styled.div`
  margin-top: 7px;
  font-size: 0.8rem;
  color: grey;
`;

const WeatherInfo = styled.div`
  height: 100px;
  display: flex;
  margin-top: 20px;
`;

const Icon = styled.div`
  margin-left: 50px;
`;

const CenterInfo = styled.div`
  margin-left: 0.75rem;
  margin-top: 5px;
`;

const Loca = styled.div`
  font-size: 1.2rem;
`;

const PopPercent = styled.div`
  font-size: 0.9rem;
  margin-top: 5px;
  font-weight: 200;
`;

const TempInfo = styled.div`
  margin-left: 150px;
  margin-top: 5px;
  display: flex;
`;

const MinMax = styled.div`
  flex-direction: column;
  text-align: center;
`;

const Regular = styled.div`
  margin-left: 5px;
  font-size: 2.2rem;
  p {
    font-size: ${(props) => props.theme.pixelToRem(20)};
    display: inline-block;
    position: absolute;
  }
`;

const DayInfo = styled.div`
  margin-left: 320px;
  font-size: 0.9rem;
  position: relative;
  top: -20px;
  color: grey;
`;

const DetailInfo = styled.div`
  height: ${(props) => props.theme.pixelToRem(193)};

  .tempGraph {
    width: inherit;
    height: ${(props) => props.theme.pixelToRem(97)};
    margin-top: 15px;
    margin-bottom: 5px;
    padding: 20px;

    img {
      display: flex;

      &:first-child {
        width: ${(props) => props.theme.pixelToRem(247)};
        margin: 0 auto;
        position: relative;
      }
      &:nth-child(2) {
        width: ${(props) => props.theme.pixelToRem(24)};
        margin-top: -12px;
        margin-left: 73px;
        position: absoulte;
      }
      &:nth-child(3) {
        width: ${(props) => props.theme.pixelToRem(24)};
        margin-top: -70px;
        margin-left: 204px;
        position: absoulte;
      }
      &:nth-child(4) {
        width: ${(props) => props.theme.pixelToRem(24)};
        margin-top: 20px;
        margin-left: 335px;
        position: absoulte;
      }
    }

    span {
      ${(props) => props.theme.fontTheme.Caption1};
      line-height: 1.29;
      letter-spacing: normal;
      text-align: center;
      position: absolute;
      display: flex;

      &:nth-child(5) {
        width: ${(props) => props.theme.pixelToRem(30)};
        margin-top: 1px;
        margin-left: 80px;
      }
      &:nth-child(6) {
        width: ${(props) => props.theme.pixelToRem(30)};
        margin-top: -44px;
        margin-left: 209px;
      }
      &:nth-child(7) {
        width: ${(props) => props.theme.pixelToRem(30)};
        margin-top: -3px;
        margin-left: 345px;
      }
    }
  }

  .infoBox {
    width: inherit;
    height: ${(props) => props.theme.pixelToRem(67)};
    margin-top: -14px;
    padding: 10px;
    justify-content: space-between;
    display: flex;

    .left {
      width: 45%;
      justify-content: space-between;

      .climate {
        width: ${(props) => props.theme.pixelToRem(62)};
        height: auto;
        ${(props) => props.theme.fontTheme.Caption2};
        flex-grow: 0;
        margin: 4px 0px 6px -5px;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: left;
        flex-direction: column;
        display: flex;

        p {
          margin-top: 6px;
          display: flex;
        }
      }

      .climateNum {
        width: ${(props) => props.theme.pixelToRem(62)};
        height: auto;
        margin: -78px 52px 0px 81px;
        ${(props) => props.theme.fontTheme.Caption2};
        flex-grow: 0;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: right;
        flex-direction: column;
        display: flex;

        p {
          margin-top: 6px;
          display: flex;
          color: ${(props) => props.theme.colorTheme.text2} !important;
        }
      }
    }

    .right {
      width: 55%;
      height: auto;
      margin: 4px -6px 6px -10px;
      ${(props) => props.theme.fontTheme.Caption1};
      flex-grow: 0;
      line-height: 1.29;
      letter-spacing: normal;
      text-align: right;
      display: inline;
      b {
        margin-top: -12px;
        margin-left: -15px;
        font-size: ${(props) => props.theme.pixelToRem(32)};
        position: absolute;
      }
      p {
        margin-top: 6px;
      }
    }
  }
`;
const GoCampBtn = styled(Link)`
  width: 405px;
  height: 60px;
  font-size: 1.1rem;
  border: 0.5px none grey;
  margin-top: 40px;
  margin-left: 30px;
  border-radius: 8px;
  padding: 15px;
  color: white;
  background-color: #5185a6;
  cursor: pointer;
`;
