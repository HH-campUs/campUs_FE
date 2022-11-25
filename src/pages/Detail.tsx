import React, { useState, useRef } from "react";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, Outlet, useMatch } from "react-router-dom";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; //empty
import BookmarkIcon from "@mui/icons-material/Bookmark"; //filled
import { fontSize } from "@mui/system";

function Detail() {
  const announceMatch = useMatch("/detail/:id/announce");
  const detailMatch = useMatch("/detail/:id/detail");
  const reviewMatch = useMatch("/detail/:id/review");

  //recoil?
  const [bookmark, setBookMark] = useState(true);
  const marking = () => {
    setBookMark((prev) => !prev);
  };

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
      {/* <AddtripBtn>내 여행일정 저장</AddtripBtn> */}
      <IconBox>
        <PickImg onClick={marking}>
          {bookmark ? (
            <BookmarkBorderIcon sx={{ width: "35px", height: "35px" }} />
          ) : (
            <BookmarkIcon sx={{ width: "35px", height: "35px" }} />
          )}
          <IconText>찜하기</IconText>
        </PickImg>
        <PlanImg>
          <img src="/images/icon-plan.svg" />
          <IconText style={{ marginLeft: "-5.5px" }}>일정추가</IconText>
        </PlanImg>
        <ReviewImg>
          <img src="/images/icon-review2.svg" />
          <IconText style={{ marginLeft: "-3px" }}>리뷰작성</IconText>
        </ReviewImg>
        <ShareImg>
          <img src="/images/icon-share.svg" />
          <IconText style={{ marginLeft: "-3px" }}> 공유하기</IconText>
        </ShareImg>
      </IconBox>
      <WFcBox>
        <WeatherBox>
          <Calendar>
            <img
              src="/images/Calendar.svg"
              alt="calendar"
              style={{ height: "20px" }}
            />
            <p>12월 20일~</p>
          </Calendar>
          <RecoWeather>캠핑 추천 날씨</RecoWeather>
          <DetailWeather>부산북구 날씨 상세</DetailWeather>
        </WeatherBox>
        <FcBox>
          <FcTextBox>
            <FcLeft>시설요약</FcLeft>
            <Right>전체보기</Right>
          </FcTextBox>
          <FcIconBox>ICon Will be added</FcIconBox>
        </FcBox>
      </WFcBox>

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

// const AddtripBtn = styled.button`
//   width: 120px;
//   height: 30px;
//   margin-top: -40px;
//   margin-left: 300px;
//   font-size: 1rem;
//   border: none;
//   padding-top: 6px;
//   display: flex;
//   background-color: #024873;
//   color: whitesmoke;
// `;

const IconBox = styled.div`
  width: 80%;
  height: 100px;
  margin-top: 10px;
  margin-left: 50px;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid lightgray;
`;

const PickImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 30px;
`;

const PlanImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  height: 35px;
`;

const ReviewImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  height: 35px;
`;

const ShareImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
  height: 35px;
`;

const IconText = styled.div`
  width: 100px;
  font-size: 0.8rem;
  margin-top: 10px;
`;

const WFcBox = styled.div`
  width: 80%;
  margin-left: 60px;
  justify-content: space-around;
`;

const WeatherBox = styled.div`
  display: flex;
  /* background-color: lightgrey; */
  height: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  margin: auto;
  padding: 10px; ;
`;

const Calendar = styled.div`
  display: flex;
  gap: 10px;
  width: 33%;
  align-items: center;
  border-right: 1px solid black;
  font-size: 0.8rem;
`;

const RecoWeather = styled.div`
  width: 33%;
  border-right: 1px solid black;
  font-size: 0.8rem;
`;

const DetailWeather = styled.div`
  width: 33%;
  font-size: 0.8rem;
  text-decoration: underline;
`;

const FcBox = styled.div`
  margin-top: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const FcTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FcLeft = styled.div`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 1.2rem;
  font-weight: bolder;
`;

const FcIconBox = styled.div`
  margin-top: 20px;
  display: flex;
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
