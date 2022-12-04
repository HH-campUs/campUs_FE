import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import { useNavigate } from "react-router-dom";

//css
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Subject() {
  const navigate = useNavigate();
  const [isWeather, setIsWeather] = useState(false);

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
                      <Loca>부산광역시</Loca>
                      <PopPercent>강수확률 2%</PopPercent>
                    </CenterInfo>
                    <TempInfo>
                      <MinMax>
                        <p style={{ color: "blue" }}>2</p>
                        <p style={{ color: "red" }}>18</p>
                      </MinMax>
                      <Regular>18</Regular>
                    </TempInfo>
                  </WeatherInfo>
                  <DayInfo>12월 32일 기준</DayInfo>

                  <IconBox>
                    <IconOne>
                      <img
                        src="/images/Sunset.svg"
                        alt="sunset"
                        style={{
                          display: "block",
                          margin: "auto",
                          paddingBottom: "5px",
                        }}
                      />
                      <Score>0000</Score>
                      <Detail>풍속</Detail>
                    </IconOne>
                    <IconTwo>
                      <img
                        src="/images/Sunset.svg"
                        alt="sunset"
                        style={{
                          display: "block",
                          margin: "auto",
                          paddingBottom: "5px",
                        }}
                      />
                      <Score>0000</Score>
                      <Detail>미세먼지</Detail>
                    </IconTwo>
                    <IconThree>
                      <img
                        src="/images/Sunset.svg"
                        alt="sunset"
                        style={{
                          display: "block",
                          margin: "auto",
                          paddingBottom: "5px",
                        }}
                      />
                      <Score>0000</Score>
                      <Detail>일몰</Detail>
                    </IconThree>
                    <IconFour>
                      <img
                        src="/images/Sunset.svg"
                        alt="sunset"
                        style={{
                          display: "block",
                          margin: "auto",
                          paddingBottom: "5px",
                        }}
                      />
                      <Score>0000</Score>
                      <Detail>자외선지수</Detail>
                    </IconFour>
                  </IconBox>
                  <GoCampBtn>부산 캠핑장 둘러보기</GoCampBtn>
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
  width: ${(props) => props.theme.pixelToRem(375)};
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
    padding-bottom: 200px;
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
`;

const DayInfo = styled.div`
  margin-left: 320px;
  font-size: 0.9rem;
  position: relative;
  top: -20px;
  color: grey;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 405px;
  margin-left: 30px;
  border-top: 1px solid lightgray;
  padding-top: 10px;
`;

const IconOne = styled.div`
  text-align: center;
  align-items: center;
`;
const IconTwo = styled.div`
  text-align: center;
  align-items: center;
`;
const IconThree = styled.div`
  text-align: center;
  align-items: center;
`;
const IconFour = styled.div`
  text-align: center;
  align-items: center;
`;

const Score = styled.div`
  padding-bottom: 5px;
`;

const Detail = styled.div`
  color: grey;
`;

const GoCampBtn = styled.button`
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
