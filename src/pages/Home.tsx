import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearby";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
//Css
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
//색상변경해서 메인카드 / 캠핑장목록UI 에 사용할 것.
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; //empty
import BookmarkIcon from "@mui/icons-material/Bookmark"; //filled

function Home() {
  //const { state } = useLocation();
  // const name = location.state as RouteState

  // 선택한 url로 갈시에 object받음. 아니면 null값.
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
      <Carousel />
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
