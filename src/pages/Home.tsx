import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { BiSearchAlt } from "react-icons/bi";

function Home() {
  const [isActive, setIsActive] = useState(false);

  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const openModal = (event: any) => {
    event.stopPropagation();
    setIsSearch(true);
  };

  const closeModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsSearch(false);
  };

  const backgroundArr = [
    "꿀보이스 김지원",
    "문공 어찌하여 목만오셨소",
    "꿀벌대소동",
    "이상원말고 김상원",
    "재주많은 제주도민 최원선",
  ];
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundPhrase = backgroundArr[randomIndex];

  return (
    <>
      {isSearch == false ? null : <Search />}
      <SearchModal className="isNotActive" onClick={openModal}>
        <BiSearchAlt size="20" style={{ display: "inline-block" }} />
        <span>search</span>
      </SearchModal>

      <HeadText>
        {backgroundPhrase} <br></br> 캠프어스에서
      </HeadText>
      {/* <Search isActive={isActive} setIsActive={setIsActive} /> */}
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

const SearchModal = styled.div`
  margin: 10px auto;
  width: 23.438rem;
  background-color: #ffffff;
  border-radius: 13px;
  justify-content: center;
  align-content: center;
  z-index: 100;
  &.isNotActive {
    height: 35px;
    padding: 5px;
    font-size: 1rem;
    color: #797979;
    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }
`;

const HeadText = styled.div`
  margin: 20px;
  font-size: 2rem;
  line-height: 1.4;
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
