import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import Search from "../components/withSearch/Search";

import { isModal } from "../store/searchAtom";
import WeekWeather from "../components/WeekWeather";

//Css
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";

function Home() {
  const [isActive, setIsActive] = useState(false);

  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const popMatch = useMatch("/popping");
  const recommendedMatch = useMatch("/recommended");
  const popularMatch = useMatch("/popular");

  const openModal = (event: any) => {
    event.stopPropagation();
    setIsSearch(true);
  };

  const closeModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsSearch(false);
  };

  return (
    <>
      {isSearch == false ? null : <Search />}
      <SearchModal className="isNotActive" onClick={openModal}>
        <BiSearchAlt size="20" style={{ display: "inline-block" }} />
        <span>search</span>
      </SearchModal>

      {/* 이것도 component화 시켜야하나? */}
      <Tabs>
        <Tab isActive={popMatch !== null}>
          <Link to="/popping"> 요즘뜨는곳 </Link>
        </Tab>
        <Tab isActive={recommendedMatch !== null}>
          <Link to="/recommended"> 추천 캠핑장</Link>
        </Tab>
        <Tab isActive={popularMatch !== null}>
          <Link to="/popular"> 가장 인기</Link>
        </Tab>
      </Tabs>
      <Outlet />
  return (
    <>
      <HeadText>
        즐거운 겨울캠핑은 <br></br> 캠프어스에서
      </HeadText>
      <Search isActive={isActive} setIsActive={setIsActive} />
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


/* Search bar */
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

//isDarkatom변경없을시에는 lightTheme - textColor-white
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 10px;
  gap: 10px;

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

  //isDarkatom변경없을시에는 lightTheme - textColor-white
  // const Tabs = styled.div
`;
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   margin: 25px 10px;
//   gap: 10px;
// `;

// const Tab = styled.span<{ isActive: boolean }>`
//   text-align: center;
//   text-transform: uppercase;
//   font-size: 12px;
//   font-weight: 400;
//   background-color: ${(props) => props.theme.bgColor};
//   //rgba(0, 0, 0, 0.5);
//   padding: 7px 0px;
//   border-radius: 10px;
//   color: ${(props) =>
//     props.isActive ? props.theme.accentColor : props.theme.textColor};
//   a {
//     display: block;
//   }
// `;

{
  /* <Tabs>
<Tab isActive={popMatch !== null}>
  <Link to="/popping"> 요즘뜨는곳 </Link>
</Tab>
<Tab isActive={recommendedMatch !== null}>
  <Link to="/recommended"> 추천 캠핑장</Link>
</Tab>
<Tab isActive={popularMatch !== null}>
  <Link to="/popular"> 가장 인기</Link>
</Tab> 
</Tabs>
      <Outlet />*/
}
