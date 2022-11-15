import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import { Link, Outlet, useMatch } from "react-router-dom";
import Search from "../components/Search";

//Css
import styled from "styled-components";

interface RouteState {
  state: {
    name: string;
  };
}

function Home() {
  //const { state } = useLocation();
  // const name = location.state as RouteState
  // 선택한 url로 갈시에 object받음. 아니면 null값.
  const [isActive, setIsActive] = useState(false);
  const popMatch = useMatch("/popping");
  const recommendedMatch = useMatch("/recommended");
  const popularMatch = useMatch("/popular");
  //isActive={isActive} setIsActive={setIsActive}
  return (
    <>
      <Search isActive={isActive} setIsActive={setIsActive} />

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
      <Carousel />
      <MytravelPlan />
      <Subject />
      <Nearby />
    </>
  );
}

export default Home;

//isDarkatom변경없을시에는 lightTheme - textColor-white
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 10px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.bgColor};
  //rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
