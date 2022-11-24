import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";
import { BiSearchAlt } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetApi } from "../APIs/getApi";

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

  const getWeather = useGetApi.useGetWeather().data?.weather[0];
  console.log(getWeather);

  return (
    <>
      <ReSearch>
        <div
          onClick={() => {
            nav(-1);
          }}>
          <img src="/images/back.svg" alt="back" />
          검색조건
        </div>
        <div>12월 20일 | 충청남도</div>
      </ReSearch>

      {/* Weather modal */}

      {/*   {isWeather == false ? (
        <WeatherModal
          className="isNotActive"
          style={{ transition: "all 0.5s ease-in-out" }}
          onClick={WeatherHandler}>
          <img src="/images/sunRain.svg" alt="weather img" />
          <div className="secondSeparate">
            <div className="infoBox">
              <div className="local">{getWeather.pardo}</div>
              <div className="date">12월 20일 9:52</div>
            </div>
            <div className="tempBox">
              <div className="tem">{ getWeather.day }°</div>
              <div className="temHL">{getWeather.min}/{ getWeather.max}°</div>
            </div>
          </div>
          <div className="thirdSeparate">
            <img src="/images/pop.svg" alt="pop" />
            <span>{getWeather.pop * 100}%</span>
          </div>
          <FaChevronUp />
        </WeatherModal>
      ) : (
        <WeatherModal
          className="isActive"
          style={{ transition: "all 0.5s ease-in-out" }}
          onClick={WeatherHandler}>
          <img src="/images/sunRain.svg" alt="weather img" />
          16°
        </WeatherModal>
      )} */}

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
              <InnerBg>찜(20) 리뷰({item.reviewNum})</InnerBg>
            </ResultItem>
            <CampSpan>
              <span>{item.location}</span>
              <span>일반야영장 | 글램핑</span>
            </CampSpan>
            <DetailAddress>
              <img src="/images/location.svg" alt="location" />
              <span>{item.address}</span>
            </DetailAddress>
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

const ReSearch = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 15px auto;
  padding: 15px 20px 15px 14px;
  border-radius: 10px;
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: #fff;
  justify-content: space-between;
  display: flex;

  ${(props) => props.theme.fontTheme.Subtitle3};
  font-family: Pretendard;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #222 !important;
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

const WeatherModal = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  flex-grow: 0;
  margin: 0 auto;
  padding: 14px 17px 9px 11px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: rgba(81, 133, 166, 0.13);
  justify-content: space-around;

  transition: all 0.5s ease-out;

  z-index: 100;

  &.isNotActive {
    height: ${(props) => props.theme.pixelToRem(90)};
    flex-direction: row;
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
      display: inline-block;
    }

    .secondSeparate {
      width: 60%;
      height: 100%;
      flex-direction: column;
      display: flex;
      .infoBox {
        color: #333 !important;
        font-family: Pretendard;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        flex-direction: row;
        display: flex;

        .local {
          ${(props) => props.theme.fontTheme.Subtitle3};
        }

        .date {
          ${(props) => props.theme.fontTheme.Caption2};
        }
      }

      .tempBox {
        font-family: Pretendard;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #333;
        flex-direction: row;
        display: flex;
        .tem {
          font-size: 40px;
        }

        .temHL {
          font-size: 14px;
          margin-top: 30px;
        }
      }
    }

    .thirdSeparate {
      width: 20%;
      flex-direction: column;
      display: flex;
      img {
        width: ${(props) => props.theme.pixelToRem(24)};
        height: ${(props) => props.theme.pixelToRem(24)};
        flex-grow: 0;
        margin: 0 5px 6px;
      }

      span {
        ${(props) => props.theme.fontTheme.Subtitle3};
        font-family: Pretendard;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #333 !important;
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
    font-family: Pretendard;
    font-size: 14px;
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
  width: 100px;
  height: 24px;
  flex-grow: 0;
  margin-top: -34px;
  margin-left: 220px;
  padding: 4px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #fff;
  opacity: 0.6;
  border-radius: 4px;
  background-color: #000;
  position: absoulte;
  z-index: 2;
`;

const CampSpan = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  justify-content: space-between;
  flex: display;

  span {
    font-family: Pretendard;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    ${(props) => props.theme.fontTheme.Subtitle4};

    &:nth-child(1) {
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
  img {
    width: ${(props) => props.theme.pixelToRem(20)};
    height: ${(props) => props.theme.pixelToRem(20)};
  }

  span {
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
