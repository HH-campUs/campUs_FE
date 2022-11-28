import React, { useState } from "react";
import { useRecoilState } from "recoil";

import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { Link, useNavigate, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";
import { BiChevronDown } from "react-icons/bi";
import Bg from "../static/testpic.jpg";
import { useGetApi } from "../APIs/getApi";

//bookmark icon
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Topic() {
  const nav = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [topic, isTopic] = useState(false);

  const getCamp = useGetApi.useGetTopicResult();

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
      {isSearch == false ? null : <Search />}

      <TopContainer>
        <BackBtn onClick={() => nav(`/`)}>
          <img src="/images/back.svg" alt="back" />
        </BackBtn>
      </TopContainer>

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 검색결과 </span>
            <span className="total"> (000개)</span>
          </div>
          <div>
            <span className="popular">
              인기순{" "}
              <BiChevronDown size="30" style={{ display: "inlineBox" }} />
            </span>
          </div>
        </ResultTop>
        {DummyData.map((item, i) => (
          <ResultBox key={i}>
            <ResultItem onClick={() => nav(`/detail`)}>
              <ResultImg src={item.ImgUrl} alt={item.name} />
              <ResultSpan>리뷰({item.reviewNum})</ResultSpan>
            </ResultItem>
            <ResultDetail>{item.location}</ResultDetail>
            <ResultDetail2>{item.address}</ResultDetail2>
          </ResultBox>
        ))}
      </ResultContainer>
    </>
  );
}

export default Topic;

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

const TopContainer = styled.div`
  width: auto;
  max-width: ${(props) => props.theme.pixelToRem(475)};
  height: ${(props) => props.theme.pixelToRem(300)};
  margin: 0 auto;
  border-bottom-left-radius: ${(props) => props.theme.pixelToRem(12)};
  border-bottom-right-radius: ${(props) => props.theme.pixelToRem(12)};
  background-image: url(${Bg});
  background-size: cover;
`;

const BackBtn = styled.div`
  width: ${(props) => props.theme.pixelToRem(32)};
  height: ${(props) => props.theme.pixelToRem(32)};
  margin: 30px 15px;
  padding: 4px;
  border-radius: ${(props) => props.theme.pixelToRem(25)};
  background-color: rgba(255, 255, 255, 0.5);
  object-fit: contain;
  position: absolute;

  img {
    display: inline-block;
  }
`;

const ResultContainer = styled.div`
  margin: 0;
  padding: 35px;
  flex: 1 1 0%;
`;

const ResultTop = styled.div`
  width: inherit;
  margin-top: 40px;
  padding: {
    top: 10px;
    left: 10px;
    right: 10px;
  }
  justify-content: space-between;
  display: flex;

  .result {
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #333;
  }

  .total {
    font-family: Pretendard;
    font-size: ${(props) => props.theme.pixelToRem(14)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: #797979;
  }

  .popular {
    font-family: Pretendard;
    font-size: ${(props) => props.theme.pixelToRem(14)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: right;
    color: #797979;
    display: inline-block;
  }
`;

const ResultBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(180)};
  height: auto;
  margin: 30px 10px;
  height: auto;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  display: inline-block;
  align-items: top;
`;

const ResultItem = styled.div`
  width: ${(props) => props.theme.pixelToRem(160)};
  height: ${(props) => props.theme.pixelToRem(139)};
  border-radius: 10px;
`;

const ResultImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: block;
  object-fit: cover;
`;

const ResultSpan = styled.div`
  transform: translate(50%, -200%);
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.911);
  font-size: ${(props) => props.theme.pixelToRem(16)};
  position: absoulte;
  z-index: 2;
`;

const ResultDetail = styled.div`
  height: 60px;
  margin-top: 10px;
  background-color: transparent;
  font-size: 1rem;
  color: black;
`;

const ResultDetail2 = styled.div`
  height: 60px;
  margin-top: -20px;
  background-color: transparent;
  font-size: 1rem;
  color: black;
`;
