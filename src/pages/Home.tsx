import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import Search from "../components/withSearch/Search";
import WeekWeather from "../components/WeekWeather";

//Css
import styled from "styled-components";

function Home() {
  const [isActive, setIsActive] = useState(false);
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
