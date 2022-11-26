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
import { BiSearchAlt } from "react-icons/bi";

function Home() {
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const openModal = () => {
    setIsSearch(true);
  };

  return (
    <>
      {isSearch == false ? null : <Search />}
      <SearchModal isSearch={isSearch} onClick={openModal}>
        <BiSearchAlt size="20" style={{ display: "inline-block" }} />
        <span>search</span>
      </SearchModal>

      <HeadText>
        즐거운 겨울캠핑은 <br></br> 캠프어스에서
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

const SearchModal = styled.div<{ isSearch: Boolean }>`
  margin: 10px auto;
  width: 23.438rem;
  background-color: #ffffff;
  font-family: "Pretendard-Regular";
  border-radius: 13px;
  justify-content: center;
  align-content: center;
  z-index: 100;
  height: 35px;
  padding: 5px;
  font-size: 1rem;
  color: #797979;
  span {
    margin-left: 10px;
    font-size: 1.4rem;
  }
`;

const HeadText = styled.div`
  margin: 20px;
  font-family: "Pretendard-Regular";
  font-weight: bold;
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
