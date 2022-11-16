import React, { useState } from "react";
import styled from "styled-components";
import Datepicker from "../components/Datepicker";
import { BiSearchAlt } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Detail() {
  return (
    <>
      <MainImage />
      <HashTagContainer>
        <HashTag>반려동물</HashTag>
        <HashTag>글램핑</HashTag>
        <HashTag>빨리 나가 놀고싶다.</HashTag>
      </HashTagContainer>
      <MiddleContainer>
        <LeftWrapper>
          <h2>키미노..나마에와..★</h2>
          <div className="pContainer">
            <p>홋카이도</p>
            <p>1월에 갑니다..maybe</p>
          </div>
        </LeftWrapper>
        <WeatherImg />
      </MiddleContainer>
      <AddtripBtn>내 일정 추가하기</AddtripBtn>
      <RadioContainer>
        <label>
          <RadioBtn type="radio" name="detail" checked />
          <BtnLabel>상세정보</BtnLabel>
        </label>
        <label>
          <RadioBtn type="radio" name="detail" />
          <BtnLabel>리뷰</BtnLabel>
        </label>
        <label>
          <RadioBtn type="radio" name="detail" />
          <BtnLabel>공지사항</BtnLabel>
        </label>
      </RadioContainer>
      <BottomContainer></BottomContainer>
    </>
  );
}

export default Detail;

const MainImage = styled.div`
  margin: 0 auto;
  width: 83%;
  height: 300px;
  border-radius: 10px;
  background-image: url("http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg");
`;

const HashTagContainer = styled.div`
  margin: 0 50px;
  width: 80%;
  height: 60px;
  flex-direction: row;
  float: left;
  position: relative;
`;

const HashTag = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  padding: 6px;
  font-size: 0.8rem;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 13px;
`;

const MiddleContainer = styled.div`
  margin-left: 50px;
  width: 95%;
  height: 120px;
  display: flex;
`;

const LeftWrapper = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333333;
  }

  .pContainer {
    margin: 10px auto;
    flex-direction: column;
    p {
      margin-right: 10px;
      font-size: 1rem;
      color: #535353;
      display: inline-block;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
`;

const WeatherImg = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 80px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  display: flex;
`;

const AddtripBtn = styled.button`
  width: 250px;
  height: 30px;
  margin: 0 auto;
  margin-top: -40px;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  display: flex;
`;

const RadioContainer = styled.div`
  width: 475px;
  height: 50px;
  flex-direction: row;
  display: flex;
`;

const BtnLabel = styled.div`
  width: 150px;
  height: 50%;
  font-size: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
`;

const RadioBtn = styled.input.attrs({ type: "radio" })`
  width: inherit;
  display: none;

  &:checked {
    display: inline-black;
    background: none;
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
  &:checked + ${BtnLabel} {
    background: none;
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  height: auto;
`;
