import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import Search from "../components/withSearch/Search";
import WeekWeather from "../components/WeekWeather";
import { useRecoilState } from "recoil";
import { isModal } from "../store/searchAtom";
//Css
import styled from "styled-components";

function Home() {
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const openModal = () => {
    setIsSearch(true);
  };

  const closeModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsSearch(false);
  };

  const backgroundArr = [
    "꿀보이스 김지원",
    "문공 어찌하여 목만오셨소",
    "갈고리 수집가 이민기",
    "리액트의 황제 임요한",
    "차에 안치영",
    "꿀벌대소동",
    "이상원말고 김상원",
    "재주많은 제주도민 최원선",
    "10세 20세 1세준",
    "김정현(박정현아님)",
  ];
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundPhrase = backgroundArr[randomIndex];

  return (
    <>
      <HeadText>
        {backgroundPhrase} <br></br> 캠프어스에서
      </HeadText>
      <SearchBar isSearch={isSearch} onClick={openModal}>
        <img src="/images/search.svg" alt="Search" />
        <span>캠핑 어디로 가시나요?</span>
      </SearchBar>

      <TextBox>
        <CampText>요즘 많이 찾는 캠핑장</CampText>
        <AllList>전체보기</AllList>
      </TextBox>
      <Carousel />
      <WeekWeather />
      <MytravelPlan />
      <Subject />
      <Nearby />
    </>
  );
}

export default Home;

const HeadText = styled.div`
  width: ${(props) => props.theme.pixelToRem(350)};
  height: ${(props) => props.theme.pixelToRem(80)};
  margin: 40px 71px 20px 20px;
  font-size: ${(props) => props.theme.pixelToRem(30)};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colorTheme.text};
`;

const SearchBar = styled.div<{ isSearch: Boolean }>`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 20px 20px 40px;
  padding: 16px 32px 16px 20px;
  border-radius: 10px;
  border: solid 1px #eee;
  background-color: #f5f5f5;

  span {
    width: ${(props) => props.theme.pixelToRem(249)};
    height: ${(props) => props.theme.pixelToRem(20)};
    margin: -22px 30px;
    font-size: ${(props) => props.theme.pixelToRem(16)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.theme.colorTheme.text3};
    display: flex;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const CampText = styled.div`
  font-weight: 500;
`;

const AllList = styled.div`
  font-size: 0.8rem;
  color: grey;
`;
