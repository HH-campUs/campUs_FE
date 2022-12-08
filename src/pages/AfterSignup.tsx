import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function AfterSignup() {
  const nav = useNavigate();
  return (
    <Wrapper>
      <Circle>
        <img src="/images/signup/icon-check.svg" alt="check" />
      </Circle>

      <Welcome>
        <h2>회원가입 완료!</h2>
        <p className="sub">캠프어스에 오신 걸 환영해요</p>
      </Welcome>

      <Container>
        <img src="/images/signup/icon-1.svg" alt="1" />
        <img src="/images/signup/icon-2.svg" alt="2" />
        <img src="/images/signup/icon-3.svg" alt="3" />
        <img src="/images/signup/icon-more.svg" alt="3" />
      </Container>
      <span>
        지금 바로 캠프어스에서 가고 싶은 캠핑장을 검색하고 다양한 기능을
        만나보세요!
      </span>

      <MainBtn onClick={() => nav("/")}>메인으로 가기</MainBtn>
    </Wrapper>
  );
}

export default AfterSignup;

const Wrapper = styled.div`
  width: 100%;
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: calc(100vh - 3rem);
  overflow-x: hidden;
  flex-direction: column;
`;

const Circle = styled.div`
  width: ${(props) => props.theme.pixelToRem(64)};
  height: ${(props) => props.theme.pixelToRem(64)};
  border-radius: 35px;
  margin: 180px auto 0;
  padding: 26px 18px 20px;
  background-color: #adc2ce;
  position: relative;
  img {
    margin-top: -4px;
    margin-left: -3px;
    position: absoulte;
  }
`;

const Welcome = styled.div`
  width: ${(props) => props.theme.pixelToRem(156)};
  height: ${(props) => props.theme.pixelToRem(26)};
  margin: 20px auto 20px;
  font-size: 22px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #222;

  .sub {
    margin: 5px auto 0;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    color: #666;
    position: absolute;
  }
`;

const Container = styled.div`
  width: ${(props) => props.theme.pixelToRem(210)};
  height: ${(props) => props.theme.pixelToRem(200)};
  margin: 50px auto 0;
  justify-content: center;
  flex-direction: column;
  display: flex;

  img {
    height: ${(props) => props.theme.pixelToRem(36)};
    &:first-child {
      width: ${(props) => props.theme.pixelToRem(149)};
      margin: 5px auto;
    }
    &:nth-child(2) {
      margin: 5px auto;
    }
    &:nth-child(3) {
      margin: 5px auto;
    }
    :last-child {
      width: 12%;
      margin: 10px auto;
    }
  }

  .sub {
    width: ${(props) => props.theme.pixelToRem(269)};
    height: ${(props) => props.theme.pixelToRem(44)};
    margin: 20px auto;
    ${(props) => props.theme};
    font-size: 16px;
    font-weight: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: #222;
  }
`;

const MainBtn = styled.button`
  margin: 60px auto 35px;
  width: 327px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 19px 100px;
  border-radius: 10px;
  background-color: #024873;
  border: none;
  color: #fff;
`;
