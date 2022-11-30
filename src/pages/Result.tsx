import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";

/* import {} from "../store/dateAtom"; */
import { showLo, ExportLocation } from "../store/locationAtom";
import { StrMonth, StrDay } from "../store/dateAtom";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetApi, useGetCamp } from "../APIs/getApi";
import { campArray } from "../interfaces/get";

//bookmark icon

function Result() {
  const nav = useNavigate();

  /* data */
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [bookmarking, setBookMarking] = useState(false);

  const doNm = useRecoilValue(showLo);
  const Month = useRecoilValue(StrMonth);
  const Day = useRecoilValue(StrDay);

  const getWeather = useGetApi.useGetWeather().data;
  const getCamp = useGetApi.useGetCampResult().data;
  const { ref, inView } = useInView();

  console.log(getCamp?.regionCamp);

  const { campData, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetCamp(doNm);

  console.log(campData);

  const WeatherHandler = () => {
    setIsWeather(!isWeather);
  };

  const picking = () => {
    setBookMarking((prev) => !prev);
    console.log("asdfads");
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
            {Month}월 {Day}일 &nbsp; | &nbsp; {doNm}
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
              <span>{doNm}</span>
              <span>
                비올확률 {getWeather?.weather[0].pop.toFixed(1) * 100}%
              </span>
            </div>
          </div>
          <div className="thirdSeparate">
            <div className="temBox">
              <div className="lowHigh">
                <p>{getWeather?.weather[0].min.toFixed(0)}</p>
                <p>{getWeather?.weather[0].max.toFixed(0)}</p>
              </div>
              <span>{getWeather?.weather[0].day.toFixed(0)}</span>
              <b>°</b>
            </div>
            <span>
              {Month}월 {Day}일 낮 기준
            </span>
          </div>
        </div>
      </WeatherModal>

      <WeatherModal
        className="isActive"
        style={{ transition: "all 0.5s ease-in-out" }}
        onClick={WeatherHandler}>
        <div className="secondSeparate">
          <img src="/images/sunRain.svg" alt="weather-img" />
          <div className="infoBox">
            <span>{doNm}</span>
            <span>비올확률 {getWeather?.weather[0].pop * 100}%</span>
          </div>
        </div>
        <div className="thirdSeparate">
          <div className="temBox">
            <div className="lowHigh">
              <p>{getWeather?.weather[0].min.toFixed(0)}</p>
              <p>{getWeather?.weather[0].max.toFixed(0)}</p>
            </div>
            <span>{getWeather?.weather[0].day.toFixed(0)}</span>
            <b>°</b>
          </div>
          <span>
            {Month}월 {Day}일 낮 기준
          </span>
        </div>
      </WeatherModal>

      {/* Camp results */}

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 검색결과 </span>
            <span className="total"> ({getCamp?.total}개)</span>
          </div>
          <div>
            <span className="popular">인기순</span>
          </div>
        </ResultTop>
        {/* {isSuccess && campData?.pages ? (
          campData?.pages.map((item: campResult) => (
            <ResultBox key={item.campId}>
              <ResultItem onClick={() => nav(`/detail/:id`)}>
                <ResultImg src={item.ImageUrl} alt={item.ImageUrl} />
                <InnerBg>
                  <span>
                    찜({item.pickCount}) 리뷰({item.reviewCount}){" "}
                  </span>
                </InnerBg>
              </ResultItem>
              <CampSpan>
                <span>{item.campName}</span>
                <span>{item.induty}</span>
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
          ))
        ) : (
          <div> </div>
        )}
 */}
        {/* 북마크 재료 */}

        {/* {bookmarking ? (
          <BookmarkBorderIcon onClick={picking}>
            <img src="/images/picked2.svg" alt="Bookmarked" />
          </BookmarkBorderIcon>
        ) : (
          <Bookmark onClick={picking}>
            <img src="/images/pick1.svg" alt="Bookmark" />
          </Bookmark>
        )} */}

        {getCamp?.regionCamp.map((item: any) => (
          <ResultBox key={item.campId}>
            <ResultItem onClick={() => nav(`/detail/:id`)}>
              <ResultImg src={item.ImageUrl} alt={item.ImageUrl} />
              <InnerBg>
                <span>
                  찜({item.pickCount}) 리뷰({item.reviewCount}){" "}
                </span>
              </InnerBg>
            </ResultItem>
            <CampSpan>
              <span>{item.campName}</span>
              <span>{item.induty}</span>
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
      <div ref={ref} style={{ width: "inherit", height: "auto" }}></div>
    </>
  );
}

export default Result;

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

  /* 접혔을 떄의 날씨 정보 (simple) */
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

        .lowHigh {
          width: ${(props) => props.theme.pixelToRem(15)};
          height: ${(props) => props.theme.pixelToRem(34)};
          margin-top: 8px;
          margin-left: 70px;
          flex-direction: row;
          position: absolute;
          p:nth-child(1) {
            display: flex;
            ${(props) => props.theme.fontTheme.Caption2};
            color: ${(props) => props.theme.colorTheme.cold};
          }

          p:nth-child(2) {
            display: flex;
            position: absolute;
            margin-top: 2px;
            margin-left: 4px;
            ${(props) => props.theme.fontTheme.Caption2};
            color: ${(props) => props.theme.colorTheme.hot};
          }
        }

        span:nth-child(2) {
          ${(props) => props.theme.fontTheme.Subtitle3};
          font-size: ${(props) => props.theme.pixelToRem(40)} !important;
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
        display: inline-block;
        position: relative;
      }
    }
  }

  /* 펼쳤을 때의 날씨 정보 (detail) */
  .isActive {
    width: inherit;
    height: ${(props) => props.theme.pixelToRem(217)};
  }
`;

/* 결과 창 */
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

const Bookmark = styled.div`
  position: absolute;
  margin-left: 150px;
  margin-top: 10px;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  margin-left: 150px;
  margin-top: 10px;
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
