import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import { Link, Outlet, useMatch } from "react-router-dom";
import Search from "../components/Search";

//Css
import styled from "styled-components";
import { width } from "@mui/system";

interface RouteState {
  state: {
    name: string;
  };
}

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

function Home() {
  //const { state } = useLocation();
  // const name = location.state as RouteState
  // 선택한 url로 갈시에 object받음. 아니면 null값.
  const [isActive, setIsActive] = useState(false);
  const popMatch = useMatch("/popping");
  const recommendedMatch = useMatch("/recommended");
  const popularMatch = useMatch("/popular");

  return (
    <>
      <Header />
      <Search
        style={{ margin: "150px" }}
        isActive={isActive}
        setIsActive={setIsActive}
      />

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
      <Footer />
    </>
  );
}

export default Home;

// useEffect(() => {
//   async function a() {
//     const res = await axios.get(
//       "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=gocamp&serviceKey=hxdpEFH4tR8PQCTY8sfFyV78s69uVxnI1z7AJkIgBlkk2kHb0WxnFqZjaLQ9sbfo%2B5C7c47t74J1aNmioNNrwg%3D%3D&_type=json"
//     );
//     console.log(res);
//   }
//   a();
// }, []);

// useEffect(() => {
//   async function b() {
//     const r = await axios.get(
//       "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=eixV3mOlRoqUyi%2BK9P6%2BS3BQMBXCroFM31lGc%2BOSp80JFNv7B8%2FiCEV49OSfF2bchwh5N7z50Sw8OQFWCkZbDg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20221108&base_time=0500&nx=55&ny=127"
//     );
//     console.log(r);
//   }
//   b();
// }, []);

// useEffect(() => {
//   async function c() {
//     const r = await axios.get(
//       "https://api.openweathermap.org/data/3.0/onecall?lat=35.146&lon=126.923&units=metric&exclude=current,minutely,hourly&lang=kr&appid=eb5460afac5d3494e2e739c0c59e0988"
//     );
//     console.log(r);
//   }
//   c();
// }, []);
