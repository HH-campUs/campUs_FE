import React, { useState, useRef } from "react";
import styled from "styled-components";

import Ddetail from "../components/DetailPage/Ddetail";
import Dreview from "../components/DetailPage/Dreview";
import Dannounce from "../components/DetailPage/Dannounce";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, Outlet, useMatch } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  margin: 0 auto;
  width: 83%;
  height: 300px;
  border-radius: 10px;
  background-image: url("http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg");
`;

const MiddleContainer = styled.div`
  margin-top: 15px;
  margin-left: 50px;
  width: 95%;
  height: 120px;
  display: flex;
  flex-direction: column;
`;

const UpperWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
`;

const Left = styled.div`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 1.5rem;
`;

const Right = styled.div`
  margin-top: 10px;
  margin-left: 65px;
  font-size: 13px;
  color: grey;
`;

const DownWrapper = styled.div`
  margin: 30px 5px;
  display: flex;
  text-align: center;
  align-items: center;

  p {
    font-size: 0.9rem;
    color: grey;
  }
`;

const PickBox = styled.div`
  display: flex;
  gap: 5px;
  height: 50px;
  text-align: center;
  margin-top: -55px;
`;

const Pick = styled.p`
  margin-left: 60px;
  margin-top: 15px;
  color: grey;
  font-size: 0.8rem;
`;

const Review = styled.p`
  font-size: 0.8rem;
  text-decoration: underline;
  margin-top: 15px;
  color: grey;
`;

const AddtripBtn = styled.button`
  width: 120px;
  height: 30px;
  margin-top: -40px;
  margin-left: 300px;
  font-size: 1rem;
  border: none;
  padding-top: 6px;
  display: flex;
  background-color: #024873;
  color: whitesmoke;
`;

const Tabs = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 30px 45px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.bgColor};
  padding: 7px 0px;
  border-bottom: ${(props) => (props.isActive ? "3px solid black" : "none")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

function Detail() {
  const announceMatch = useMatch("/detail/:id/announce");
  const detailMatch = useMatch("/detail/:id/detail");
  const reviewMatch = useMatch("/detail/:id/review");

  return (
    <Wrapper>
      <MainImage />
      <MiddleContainer>
        <UpperWrapper>
          <Left>노을공원 가족캠핑장</Left>
          <Right>일반야영장 | 글램핑</Right>
        </UpperWrapper>
        <DownWrapper>
          <div>
            <LocationOnIcon />
          </div>
          <p>서울 마포구 하늘공원로 108-1</p>
        </DownWrapper>
      </MiddleContainer>
      <PickBox>
        <Pick>찜(30)</Pick>
        <Review>리뷰(790)</Review>
      </PickBox>
      <AddtripBtn>내 여행일정 저장</AddtripBtn>
      <Tabs>
        <Tab isActive={Boolean(announceMatch)}>
          <Link to="/detail/:id/announce"> 공지사항 </Link>
        </Tab>
        <Tab isActive={Boolean(detailMatch)}>
          <Link to="/detail/:id/detail"> 상세정보</Link>
        </Tab>
        <Tab isActive={Boolean(reviewMatch)}>
          <Link to="/detail/:id/review"> 리뷰</Link>
        </Tab>
      </Tabs>
      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
}

export default Detail;
