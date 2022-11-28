import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";

/* import {} from "../store/dateAtom"; */
import { showLo, ExportLocation } from "../store/locationAtom";
import { StrMonth, StrDay } from "../store/dateAtom";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { Link, useNavigate, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import { FaChevronUp } from "react-icons/fa";
import { useGetApi } from "../APIs/getApi";

//bookmark icon
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Result() {
  const nav = useNavigate();

  /* data */
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const locationValue = useRecoilValue(showLo);
  const Month = useRecoilValue(StrMonth);
  const Day = useRecoilValue(StrDay);

  const getWeather = useGetApi.useGetWeather().data;
  const getCamp = useGetApi.useGetCampResult();
  const [ref, inView] = useInView();

  /* 무한스크롤 테스트 */
  /*   const { fetchNextPage, isSuccess, campData, error } =
    useGetApi.useGetCampResult();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]); */

  const ModalHandler = () => {
    setIsActive(!isActive);
  };

  const WeatherHandler = () => {
    setIsWeather(!isWeather);
  };

  return (
    <>
      {isSearch == false ? null : <Search />}

      {/*  */}
      <ReSearch>
        <div
          onClick={() => {
            nav("/");
          }}>
          <div style={{ position: "relative" }}>
            <img src="/images/back.svg" alt="back" />
            <span style={{ width: "60px" }}>검색조건</span>
          </div>
        </div>
        <div>
          <span style={{ width: "160px", marginLeft: "-150px" }}>
            {Month}월 {Day}일 &nbsp; | &nbsp; {locationValue}
          </span>
        </div>
      </ReSearch>

      {/* Weather modal */}

      <WeatherModal>
        <div className="top">
          <span>날씨</span>
          <span>펼치기</span>
        </div>
        <div className="isNotActive" onClick={WeatherHandler}>
          <div className="secondSeparate">
            <img src="/images/sunRain.svg" alt="weather-img" />
            <div className="infoBox">
              <span>{locationValue}</span>
              <span>비올확률 {getWeather?.weather[0].pop * 100}%</span>
            </div>
          </div>
          <div className="thirdSeparate">
            <div className="temBox">
              <span>{(getWeather?.weather[0].day).toFixed()}</span>
              <b>°</b>
            </div>
            <span>
              {Month}월 {Day}일 낮 기준
            </span>
          </div>
        </div>
      </WeatherModal>

      {/* <WeatherModal
        className="isActive"
        style={{ transition: "all 0.5s ease-in-out" }}
        onClick={WeatherHandler}>
        <img src="/images/sunRain.svg" alt="weather img" />
        16°
      </WeatherModal> */}

      {/* Camp results */}

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 검색결과 </span>
            <span className="total"> (000개)</span>
          </div>
          <div>
            <span className="popular">인기순</span>
          </div>
        </ResultTop>
        {DummyData.map((item, i) => (
          <ResultBox key={i}>
            <ResultItem onClick={() => nav(`/detail/:id`)}>
              <ResultImg src={item.ImgUrl} alt={item.name} />
              <InnerBg>
                <span>찜(20) 리뷰({item.reviewNum})</span>
              </InnerBg>
            </ResultItem>
            <CampSpan>
              <span>{item.location}</span>
              <span>일반야영장 | 글램핑</span>
            </CampSpan>
            <DetailAddress>
              <img src="/images/location.svg" alt="location" />
              <span>{item.address}</span>
            </DetailAddress>
            <TagContainer>
              <div className="tag"> 운동시설 </div>
              <div className="tag"> 장작판매 </div>
              <div className="tag"> 물놀이장 </div>
              <div className="tag"> 마트/편의점 </div>
            </TagContainer>
          </ResultBox>
        ))}
      </ResultContainer>
      <div ref={ref} style={{ width: "inherit", height: "" }}></div>
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
    reviewNum: 5,
    name: "모여봐요 동물의 숲",
    location: "닌텐도 뀨뀨",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg",
    reviewNum: 24,
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
    reviewNum: 34,
    name: "모홍홍 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl: "https://pbs.twimg.com/media/EbXmXe2VAAUKd_B.jpg",
    reviewNum: 23,
    name: "롤하고 싶당",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F08%2Fblackpink-animal-crossing-new-horrizsons-island-info-2.jpg?q=75&w=800&cbr=1&fit=max",
    reviewNum: 3,
    name: "동물의 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://m.nongmin.com/upload/bbs/202207/20220712165858408/20220712165858408.jpg",
    reviewNum: 2,
    name: "모 숲",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
  {
    ImgUrl:
      "https://cdn.eyesmag.com/content/uploads/posts/2020/03/31/animal-crossing-new-horizons-instagram-fashion-09-9d86eeb1-c87b-414d-849d-45431d21561c.jpg",
    reviewNum: 41,
    name: "부잉",
    location: "닌텐도 어딘가에 있겠지 임마",
    address: "대한민국 어딘가 ~",
  },
];

/* result */

const ReSearch = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 15px auto;
  padding: 15px 20px 15px 14px;
  border-radius: 10px;
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: #fff;
  justify-content: space-between;
  position: relative;
  display: flex;

  ${(props) => props.theme.fontTheme.Subtitle3};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #222 !important;

  span {
    margin-top: 2px;
    position: absolute;
  }
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
`;

const SearchModal = styled.div`
  margin: 10px auto;
  width: ${(props) => props.theme.pixelToRem(335)};
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

/* weather */

const WeatherContainer = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(35)};
  border-top-left-radius: ${(props) => props.theme.pixelToRem(10)};
  border-top-right-radius: ${(props) => props.theme.pixelToRem(10)};
  border-bottom: solid 1px ${(props) => props.theme.colorTheme.border};
  justify-content: space-between;
`;

const WeatherModal = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(116)};
  flex-grow: 0;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: rgba(81, 133, 166, 0.13);
  transition: all 0.5s ease-out;
  z-index: 100;

  .top {
    width: ${(props) => props.theme.pixelToRem(335)};
    height: ${(props) => props.theme.pixelToRem(35)};
    border-top-left-radius: ${(props) => props.theme.pixelToRem(10)};
    border-top-right-radius: ${(props) => props.theme.pixelToRem(10)};
    border-bottom: solid 1px ${(props) => props.theme.colorTheme.border};
    justify-content: space-between;
    display: flex;

    span {
      margin: 11px;
      ${(props) => props.theme.fontTheme.Caption4};
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
    }
  }

  .isNotActive {
    width: inherit;
    margin: 0 auto;
    padding: 10px;
    height: ${(props) => props.theme.pixelToRem(81)};
    justify-content: space-between;
    display: flex;
    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }

    img {
      width: ${(props) => props.theme.pixelToRem(62)};
      height: ${(props) => props.theme.pixelToRem(62)};
      flex-grow: 0;
      margin: 0 13px 5px 0;
      border-radius: ${(props) => props.theme.pixelToRem(10)};
    }

    .secondSeparate {
      width: 60%;
      height: 100%;
      flex-direction: row;
      display: flex;

      .infoBox {
        margin-left: -12px;
        text-align: left;
        flex-direction: column;
        display: flex;

        span:nth-child(1) {
          ${(props) => props.theme.fontTheme.Subtitle4};
        }

        span:nth-child(2) {
          margin-top: 5px;
          ${(props) => props.theme.fontTheme.Caption2};
          color: ${(props) => props.theme.colorTheme.text2} !important;
        }
      }
    }

    .thirdSeparate {
      width: 50%;
      flex-direction: column;
      text-align: right;

      .temBox {
        padding-right: 8px;
        span:nth-child(1) {
          ${(props) => props.theme.fontTheme.Subtitle3};
          font-size: ${(props) => props.theme.pixelToRem(40)};
          line-height: normal;
          letter-spacing: normal;
          display: inline-block;
          position: relative;
        }
        b {
          ${(props) => props.theme.fontTheme.Subtitle3};
          font-size: ${(props) => props.theme.pixelToRem(20)} !important;
          display: inline-block;
          position: absolute;
        }
      }

      span:nth-child(2) {
        ${(props) => props.theme.fontTheme.Caption4};
        line-height: normal;
        letter-spacing: normal;
      }
    }
  }

  &.isActive {
    height: ${(props) => props.theme.pixelToRem(217)};
  }
`;

const ResultContainer = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: auto;
  margin: 0 auto;
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
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: #797979;
  }

  .popular {
    margin-top: 4px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: right;
    color: #797979;
    display: flex;
  }
`;

const ResultBox = styled.div`
  margin: 0 auto;
  height: inherit;
  flex-direction: column;
  display: flex;
`;

const ResultItem = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(190)};
  margin: 20px 0 14px;
  border-radius: 8px;
  position: relative;
`;

const ResultImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 13px;
  display: block;
  object-fit: cover;
`;

const InnerBg = styled.div`
  width: ${(props) => props.theme.pixelToRem(90)};
  height: ${(props) => props.theme.pixelToRem(24)};
  margin-top: -34px;
  margin-left: 230px;
  border-radius: 4px;
  background-color: #0000005e;
  position: relative;

  span {
    margin-top: 3px;
    margin-left: 6px;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    position: absolute;
    display: flex;
  }
`;

const CampSpan = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  justify-content: space-between;
  display: flex;

  span {
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    ${(props) => props.theme.fontTheme.Subtitle2};

    &:nth-child(1) {
      margin-top: -4px;
      margin-left: 1px;
      line-height: 1.22;
      text-align: left;
    }

    &:nth-child(2) {
      font-size: 12px !important;
      font-weight: normal;
      text-align: right;
      color: #666 !important;
    }
  }
`;

const DetailAddress = styled.div`
  margin-left: 1px;
  display: flex;

  img {
    width: ${(props) => props.theme.pixelToRem(20)};
    height: ${(props) => props.theme.pixelToRem(20)};
    margin-top: 8px;
  }

  span {
    margin-top: 10px;
    margin-left: 3px;
    font-size: ${(props) => props.theme.pixelToRem(14)};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: #666;
  }
`;
const TagContainer = styled.div`
  width: ${(props) => props.theme.pixelToRem(331)};
  height: ${(props) => props.theme.pixelToRem(24)};
  margin: 12px 0 0 4px;
  padding: 0;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: ${(props) => props.theme.pixelToRem(4)};
  display: flex;

  .tag {
    width: ${(props) => props.theme.pixelToRem(66)};
    height: ${(props) => props.theme.pixelToRem(24)};
    flex-grow: 0;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border-radius: 20px;
    border: solid 1px #dbdbdb;
    display: flex;

    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #222;
  }
`;
