import React, { useState } from "react";
import { Link, useNavigate, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/Datepicker";
import { BiSearchAlt } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
//bookmark icon
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Result() {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);

  const ModalHandler = () => {
    setIsActive(!isActive);
  };

  const WeatherHandler = () => {
    setIsWeather(!isWeather);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* const { selectInput, selectDate, selectLocation } = event.target;
  setInputValue({event.target.value|); */
  };

  return (
    <>
      <SearchModal style={{ transition: "all 0.5s ease-in" }}>
        {isActive ? (
          <Container>
            <ModalBg>
              <SearchModal
                className="isActive"
                style={{ transition: "all 0.5s ease-in-out" }}
              >
                <SearchLabel htmlFor="search"></SearchLabel>
                <SearchBox
                  id="search"
                  placeholder="Search"
                  onChange={onChange}
                />
                <Datepicker />
                <BtnContainer>
                  <ResetBtn onClick={ModalHandler}> Reset </ResetBtn>
                  <SearchBtn to="/Result" onClick={ModalHandler}>
                    Search
                  </SearchBtn>
                </BtnContainer>
              </SearchModal>
            </ModalBg>
          </Container>
        ) : (
          /* SearchModal - Inactive (default) */
          <SearchModal className="isNotActive" onClick={ModalHandler}>
            <div>지역 : 어디어디</div>
            <div>날짜 : 날짜날짜</div>
          </SearchModal>
        )}
      </SearchModal>

      {/* Weather modal */}
      <WeatherModal>
        {isWeather ? (
          <WeatherModal
            className="isActive"
            style={{ transition: "all 0.5s ease-in-out" }}
          >
            <div onClick={WeatherHandler}>
              <FaChevronUp />
            </div>
          </WeatherModal>
        ) : (
          <WeatherModal
            className="isNotActive"
            style={{ transition: "all 0.5s ease-in-out" }}
            onClick={WeatherHandler}
          >
            <img src="../../public/ex.png" />
            <div>오늘의 날씨는 ~~ 이러이러 하다~</div>
            <FaChevronDown />
          </WeatherModal>
        )}
      </WeatherModal>

      <ResultContainer>
        <ResultTop>
          <div>검색결과 (000개)</div>
          <div>인기순</div>
        </ResultTop>
        {DummyData.map((item, i) => (
          <ResultBox key={i}>
            <ResultItem onClick={() => nav(`/detail/:id`)}>
              <ResultImg src={item.ImgUrl} alt={item.name} />
              <ResultSpan>리뷰({item.reviewNum})</ResultSpan>
            </ResultItem>
            <ResultDetail>{item.location}</ResultDetail>
            <ResultDetail>{item.address}</ResultDetail>
          </ResultBox>
        ))}
      </ResultContainer>
    </>
  );
}

export default Result;

/* dummy data */

interface Dummy {
  ImgUrl?: string;
  reviewNum: number;
  name: string;
  location: string;
  address: string;
}

const DummyData: Array<Dummy> = [
  {
    ImgUrl: "https://img.sbs.co.kr/newimg/news/20170117/201015461_1280.jpg",
    reviewNum: 50,
    name: "모여봐요 동물의 숲",
    location: "닌텐도 뀨뀨",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg",
    reviewNum: 240,
    name: "강원도로 갈까유",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2022%2F04%2Fmakoto-shinkai-new-anime-movie-suzume-no-tojimari-first-video-visual-teaser-ft.jpg?w=960&cbr=1&q=90&fit=max",
    reviewNum: 53,
    name: "모이자",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "http://newsimg.hankookilbo.com/2019/10/30/201910301882016576_6.jpg",
    reviewNum: 342,
    name: "모홍홍 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl: "https://pbs.twimg.com/media/EbXmXe2VAAUKd_B.jpg",
    reviewNum: 231,
    name: "롤하고 싶당",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F08%2Fblackpink-animal-crossing-new-horrizsons-island-info-2.jpg?q=75&w=800&cbr=1&fit=max",
    reviewNum: 30,
    name: "동물의 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://m.nongmin.com/upload/bbs/202207/20220712165858408/20220712165858408.jpg",
    reviewNum: 42,
    name: "모 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://cdn.eyesmag.com/content/uploads/posts/2020/03/31/animal-crossing-new-horizons-instagram-fashion-09-9d86eeb1-c87b-414d-849d-45431d21561c.jpg",
    reviewNum: 341,
    name: "부잉",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
];

/* result */

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  transition: all 0.5s ease-in-out;
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
`;

const SearchModal = styled.div`
  margin: 10px auto;
  width: 370px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-content: center;

  transition: all 0.5s ease-out;

  z-index: 100;

  &.isNotActive {
    height: 65px;
    padding: 5px;
    font-size: 1rem;
    color: #797979;
    justify-content: space-between !important;
    display: flex;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isActive {
    height: 567px;
    padding: 10px;
  }
`;

const SearchBox = styled.input`
  width: inherit;
  height: 35px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  justify-content: left;
  display: flex;

  &::placeholder {
    font-size: 1rem;
    color: #797979;
  }

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  width: inherit;
  height: 35px;
  justify-content: left;
  display: flex;
`;

const BtnContainer = styled.button`
  width: 90%;
  height: 10%;
  margin: 0 auto;
  top: 102px;
  background: transparent;
  border: none;
  justify-content: space-between;
  position: relative;
  display: flex;
`;

const ResetBtn = styled.button`
  width: 130px;
  height: 43px;
  font-size: 1rem;
  background-color: #8d8d8d;
  border-radius: 13px;
`;

const SearchBtn = styled(Link)`
  width: 130px;
  height: 43px;
  font-size: 1rem;
  text-align: center;
  background-color: #8d8d8d;
  border-radius: 13px;

  :active {
    background-color: #3b3b3b;
  }
`;

/* weather */

const WeatherModal = styled.div`
  margin: 10px auto;
  width: 370px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-content: center;

  transition: all 0.5s ease-out;

  z-index: 100;

  &.isNotActive {
    height: 100px;
    padding: 5px;
    font-size: 1rem;
    color: #797979;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }

    img {
      display: inline-block;
    }
  }

  &.isActive {
    height: 367px;
    padding: 10px;
  }
`;

const ResultContainer = styled.div`
  margin: 0;
  padding: 50px;
  flex: 1 1 0%;
`;

const ResultTop = styled.div`
  width: inherit;
  padding: {
    top: 10px;
    left: 10px;
    right: 10px;
  }
  justify-content: space-between;
  display: flex;
`;

const ResultBox = styled.div`
  margin: 0 auto;
  height: auto;
  flex-direction: column;
  display: flex;
`;

const ResultItem = styled.div`
  width: 370px;
  height: 140px;
  margin: 20px auto;
  border-radius: 10px;
  position: relative;
`;

const ResultImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 13px;
  display: block;
  object-fit: cover;
`;

const ResultSpan = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(75%, -200%);
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.911);
  font-size: 1rem;
  position: absoulte;
  z-index: 2;
`;

const ResultDetail = styled.div`
  width: 370px;
  height: 60px;
  margin-bottom: -20px;
  background-color: transparent;
  font-size: 1rem;
  color: black;
`;
