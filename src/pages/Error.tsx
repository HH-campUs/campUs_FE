import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Error() {
  const nav = useNavigate();
  return (
    <Wrapper>
      음. 뭔가 문제가 생긴 것 같아요
      <Circle>
        <img src="/images/signup/icon-check.svg" alt="check" />
      </Circle>
      <Welcomee>
        <h2>음. 뭔가 문제가 생긴 것 같아요</h2>
        <p className="sub">다시 돌아가실 수 있게 도와드릴게요</p>
      </Welcomee>
      <MainBtn onClick={() => nav("/")}>메인으로 가기</MainBtn>
    </Wrapper>
  );
}

export default Error;

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

const Welcomee = styled.div`
  width: ${(props) => props.theme.pixelToRem(142)};
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
    margin: 7px -24px 0;
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

const MainBtn = styled.button`
  margin: 100px auto 0;
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
  color: #fff !important;
  font-size: ${(props) => props.theme.pixelToRem(17)};
  ${(props) => props.theme.fontTheme.Subtitle3};
  line-height: 1.22;
  letter-spacing: normal;
  text-align: center;
`;
