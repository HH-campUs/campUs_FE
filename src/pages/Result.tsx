import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";

import Up from "../components/Up";
import { isModal, textValue } from "../store/searchAtom";
import { showLo, selectLo } from "../store/locationAtom";
import { StrMonth, StrDay, DateState } from "../store/dateAtom";
import Search from "../components/withSearch/Search";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetCamp, useGetWeather } from "../APIs/getApi";
import { IGetCampResult } from "../interfaces/get";
import ResultBookmark from "../components/ResultBookmark";
import { getCamperToken } from "../instance/cookies";

function Result() {
  const nav = useNavigate();
  /* toast boolean */
  const [toastState, setToastState] = useState(false);

  /* data */
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [sortState, setSortState] = useState("lookUp");

  const Month = useRecoilValue(StrMonth);
  const Day = useRecoilValue(StrDay);

  const doNm = useRecoilValue(showLo);
  const pardo = useRecoilValue(selectLo);
  const date = useRecoilValue(DateState);
  const keyword = useRecoilValue(textValue);

  const isLogin = getCamperToken();

  /* weather api */
  const { WeatherData, isLoading, isError } = useGetWeather(pardo, date);

  console.log(WeatherData, isLoading, isError);

  /* camp result 무한스크롤 */

  const { campData, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetCamp(doNm, sortState);

  console.log("campData", campData);

  const { ref, inView } = useInView();

  /* handler */

  const WeatherHandler = () => {
    setIsWeather(!isWeather);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Wrapper>
        {isSearch == false ? undefined : <Search />}
        <ReSearch>
          <div
            onClick={() => {
              nav("/");
            }}
          >
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

        {isError == false ? (
          <WeatherModal
            isWeather={isWeather}
            onClick={WeatherHandler}
            style={{ transition: "all 0.5 ease-in-out" }}
          >
            <div className="top">
              <span>날씨</span>
              <span>{isWeather ? "펼치기" : "접기"}</span>
            </div>
            {/* 펼치기 전 */}
            <div className="isNotActive">
              <div className="secondSeparate">
                {/* 날씨 정보에 따른 조건부 이미지 로직 */}

                {/* 구름이 많이 낄 때 */}
                {WeatherData?.weather[0].clouds > 50 &&
                WeatherData?.weather[0].rain == null ? (
                  <img
                    src="/images/weatherIcon/img-cloudy.svg"
                    alt="weather-img"
                  />
                ) : /* 구름이 적게 낄 때 */
                WeatherData?.weather[0].clouds > 29 &&
                  WeatherData?.weather[0].clouds < 50 ? (
                  <img
                    src="/images/weatherIcon/img-cloud.svg"
                    alt="weather-img"
                  />
                ) : /* 적은 비가 내릴 때 */
                WeatherData?.weather[0].rain < 0.29 &&
                  WeatherData?.weather[0].rain > 0.01 ? (
                  <img
                    src="/images/weatherIcon/img-sunRain.svg"
                    alt="weather-img"
                  />
                ) : /* 많은 비가 내릴 때 */
                WeatherData?.weather[0].rain > 0.3 ? (
                  <img
                    src="/images/weatherIcon/img-rain.svg"
                    alt="weather-img"
                  />
                ) : /* 눈이 내릴 떄 */
                WeatherData?.weather[0].snow !== null ? (
                  <img
                    src="/images/weatherIcon/img-snow.svg"
                    alt="weather-img"
                  />
                ) : /* 눈과 비가 내릴 때 */
                WeatherData?.weather[0].snow !== null &&
                  WeatherData?.weather[0].rain !== null ? (
                  <img
                    src="/images/weatherIcon/img-snow.svg"
                    alt="weather-img"
                  />
                ) : (
                  /* 구름이 거의 끼지 않아 밝을 떄 */
                  <img
                    src="/images/weatherIcon/img-sunny.svg"
                    alt="weather-img"
                  />
                )}
                <div className="infoBox">
                  <span>{doNm}</span>
                  <span>
                    비올확률 {WeatherData?.weather[0].pop.toFixed(1) * 100}%
                  </span>
                </div>
              </div>
              <div className="thirdSeparate">
                <div className="temBox">
                  <div className="lowHigh">
                    <p>{WeatherData?.weather[0].min.toFixed(0)}</p>
                    <p>{WeatherData?.weather[0].max.toFixed(0)}</p>
                  </div>
                  <span>{WeatherData?.weather[0].day.toFixed(0)}</span>
                  <b>°</b>
                </div>
                <span>
                  {Month}월 {Day}일 낮 기준
                </span>
              </div>
            </div>

            {/* 펼치기 후 */}
            <div className="isActive">
              {/* 1층 */}
              <div className="firstFloor">
                <hr />
                <div className="tempGraph">
                  <img
                    src="/images/weatherIcon/icon-circleline.svg"
                    alt="circleline"
                  />
                  <img
                    src="/images/weatherIcon/icon-morning.svg"
                    alt="morning"
                  />
                  <img src="/images/weatherIcon/icon-lunch.svg" alt="lunch" />
                  <img src="/images/weatherIcon/icon-night.svg" alt="night" />
                  <span>{WeatherData?.weather[0].morn.toFixed(0)}°</span>
                  <span>{WeatherData?.weather[0].day.toFixed(0)}°</span>
                  <span>{WeatherData?.weather[0].night.toFixed(0)}°</span>
                </div>
                <div className="infoBox">
                  <div className="left">
                    <div className="climate">
                      <p>바람</p>
                      <p>습도</p>
                      <p>자외선지수</p>
                    </div>
                    <div className="climateNum">
                      <div>
                        <p>
                          {WeatherData?.weather[0].wind_speed.toFixed(0)}m/s
                        </p>
                        <p>{WeatherData?.weather[0].humidity}%</p>
                        <p>{WeatherData?.weather[0].uvi}</p>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    {/* wind_speed */}
                    {WeatherData?.weather[0].wind_speed.toFixed(0) > 5 ? (
                      <p style={{ color: "#eb4343" }}>
                        <b>·</b> 강풍으로 체감온도가 낮아요
                      </p>
                    ) : WeatherData?.weather[0].wind_speed.toFixed(0) < 5 &&
                      WeatherData?.weather[0].wind_speed.toFixed(0) > 2.9 ? (
                      <p style={{ color: "#fc9701" }}>
                        <b>·</b> 선선한 바람이 불어요
                      </p>
                    ) : (
                      <p style={{ color: "#27a80c" }}>
                        <b>·</b> 바람이 거의 불지 않아요
                      </p>
                    )}

                    {/* humidity */}
                    {WeatherData?.weather[0].humidity > 60 ? (
                      <p style={{ color: "#eb4343" }}>
                        <b>·</b> 습해서 불쾌지수가 올라가요
                      </p>
                    ) : WeatherData?.weather[0].humidity < 60 &&
                      WeatherData?.weather[0].humidity > 30 ? (
                      <p style={{ color: "#27a80c" }}>
                        <b>·</b> 캠프파이어 하기 딱 좋아요
                      </p>
                    ) : (
                      <p style={{ color: "#fc9701" }}>
                        <b>·</b> 수분크림을 꼭 챙기세요
                      </p>
                    )}

                    {/* uvi */}
                    {WeatherData?.weather[0].uvi > 4.9 ? (
                      <p style={{ color: "#eb4343" }}>
                        <b>·</b> 야외활동을 추천하지 않아요
                      </p>
                    ) : WeatherData?.weather[0].uvi < 5 &&
                      WeatherData?.weather[0].uvi == 3 ? (
                      <p style={{ color: "#fc9701" }}>
                        <b>·</b> 선크림은 꼭 발라주세요
                      </p>
                    ) : (
                      <p style={{ color: "#27a80c" }}>
                        <b>·</b> 활동하기 좋은 햇볕이에요
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* 2층 */}
              <hr />
              <div className="secondFloor">
                <div className="iconBox">
                  <img
                    src="/images/weatherIcon/icon-sunrise.svg"
                    alt="sunrise"
                  />
                  <span>{WeatherData?.weather[0].sunrise.slice(-7, -3)}am</span>
                  <span>일출</span>
                </div>
                <div className="iconBox">
                  <img src="/images/weatherIcon/icon-sunset.svg" alt="sunset" />
                  <span>{WeatherData?.weather[0].sunset.slice(-7, -3)}pm</span>
                  <span>일몰</span>
                </div>
                <div className="iconBox">
                  {WeatherData?.weather[0].snow !== null &&
                  WeatherData?.weather[0].rain == null ? (
                    <>
                      <img src="/images/weatherIcon/icon-snow.svg" alt="snow" />
                      <span>{WeatherData?.weather[0].snow}mm</span>
                      <span>적설량</span>
                    </>
                  ) : (
                    <>
                      <img src="/images/weatherIcon/icon-rain.svg" alt="rain" />
                      <span>
                        {WeatherData?.weather[0].rain == null
                          ? 0
                          : WeatherData?.weather[0].rain}
                        mm
                      </span>
                      <span>강수량</span>
                    </>
                  )}
                </div>
                <div className="iconBox">
                  <img src="/images/weatherIcon/icon-cloud.svg" alt="cloud" />
                  <span>{WeatherData?.weather[0].clouds}%</span>
                  <span>구름</span>
                </div>
              </div>
            </div>
          </WeatherModal>
        ) : (
          <NoWeather>
            <div className="top">
              <span>날씨</span>
            </div>
            <div className="isNotActive">
              <div className="inline">
                <img src="/images/icon-warning.svg" alt="warning" />
                날씨정보를 제공하지 않는 날짜입니다.
              </div>
              <span>(당일 +8일까지만 제공)</span>
            </div>
          </NoWeather>
        )}

        {/* Camp results */}

        <ResultContainer>
          <ResultTop>
            <div>
              <span className="result"> 검색결과 </span>
              <span className="total">
                ({campData?.pages[0].camps.total}개)
              </span>
            </div>
            <div>
              {sortState == "lookUp" ? (
                <span
                  className="popular"
                  onClick={() => setSortState("pickCount")}
                >
                  조회순
                </span>
              ) : sortState == "pickCount" ? (
                <span
                  className="popular"
                  onClick={() => setSortState("reviewCount")}
                >
                  인기순
                </span>
              ) : (
                <span
                  className="popular"
                  onClick={() => setSortState("lookUp")}
                >
                  리뷰순
                </span>
              )}
            </div>
          </ResultTop>
          {isSuccess && campData?.pages ? (
            /* page별로 map을 한 번 돌려서 2차원배열 구조로 되어있는~ */
            campData?.pages.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page?.camps.regionCamp.map((item: IGetCampResult) => (
                  <ResultBox key={item.campId}>
                    <ResultItem
                      onClick={() => nav(`/detail/${item.campId}/detail`)}
                    >
                      <ResultBookmark camp={item} />
                      <ResultImg src={item.ImageUrl} alt={item.ImageUrl} />
                      <InnerBg>
                        <span>
                          찜({item.pickCount}) 리뷰({item.reviewCount})
                        </span>
                      </InnerBg>
                    </ResultItem>
                    <CampSpan>
                      <span>{item.campName}</span>
                      <span>{item.induty}</span>
                    </CampSpan>
                    <DetailAddress>
                      <img src="/images/location.svg" alt="location" />
                      <span>
                        {item.address == ""
                          ? "등록된 주소가 없습니다.."
                          : item.address}
                      </span>
                    </DetailAddress>
                    {/* 시설 태그들 (max: 4) */}
                    <TagContainer onClick={() => setToastState(true)}>
                      {item.sbrsCl == ""
                        ? null
                        : item.sbrsCl
                            .split(",")
                            .slice(0, 4)
                            .map((word) => <div className="tag"> {word} </div>)}
                    </TagContainer>
                  </ResultBox>
                ))}
                <div
                  ref={ref}
                  style={{
                    width: "inherit",
                    height: "auto",
                    bottom: "20",
                  }}
                ></div>
              </React.Fragment>
            ))
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </ResultContainer>
        <div
          ref={ref}
          style={{ width: "inherit", height: "auto", bottom: "20" }}
        ></div>
        <Up />
      </Wrapper>
    </>
  );
}

export default Result;

/* result */
const Wrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pixelToRem(425)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  position: relative;
  flex-direction: column;
`;

const ReSearch = styled.div`
  width: 89%;
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

/* weather */

const WeatherModal = styled.div<{ isWeather: boolean }>`
  width: 89%;
  height: ${(props) =>
    props.isWeather == false
      ? props.theme.pixelToRem(116)
      : props.theme.pixelToRem(404)};
  flex-grow: 0;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: rgba(81, 133, 166, 0.13);
  transition: all 0.3s linear;
  overflow: hidden;
  z-index: 100;

  .top {
    width: 100%;
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
    width: 100%;
    height: ${(props) => props.theme.pixelToRem(81)};
    margin: 0 auto;
    padding: 10px;
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
          width: ${(props) => props.theme.pixelToRem(20)};
          height: ${(props) => props.theme.pixelToRem(34)};
          margin-top: 8px;
          margin-left: 78px;
          flex-direction: row;
          position: absolute;

          p:nth-child(1) {
            display: inline;
            position: absolute;

            ${(props) => props.theme.fontTheme.Caption2};
            color: ${(props) => props.theme.colorTheme.cold};
          }

          p:nth-child(2) {
            display: inline;
            position: absolute;
            top: 40%;
            text-align: right;
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
    width: 100%;
    height: ${(props) => props.theme.pixelToRem(298)};
    margin: 0 auto;
    padding: 10px;
    opacity: ${(props) => (props.isWeather == true ? 1 : 0)};
    transition: opacity 0.2s ease-in;

    hr {
      width: ${(props) => props.theme.pixelToRem(295)};
      height: ${(props) => props.theme.pixelToRem(1)};
      margin: -10px 10px;
      border: 0;
      background: ${(props) => props.theme.colorTheme.border} !important;
    }
    .firstFloor {
      width: 100%;
      height: ${(props) => props.theme.pixelToRem(193)};

      .tempGraph {
        width: inherit;
        height: ${(props) => props.theme.pixelToRem(97)};
        margin-top: 15px;
        margin-bottom: 5px;
        padding: 20px;

        img {
          display: flex;

          &:first-child {
            width: ${(props) => props.theme.pixelToRem(247)};
            margin: 0 auto;
            position: relative;
          }
          &:nth-child(2) {
            width: ${(props) => props.theme.pixelToRem(24)};
            margin-top: -12px;
            margin-left: -5px;
            position: absoulte;
          }
          &:nth-child(3) {
            width: ${(props) => props.theme.pixelToRem(24)};
            margin-top: -70px;
            margin-left: 125px;
            position: absoulte;
          }
          &:nth-child(4) {
            width: ${(props) => props.theme.pixelToRem(24)};
            margin-top: 20px;
            margin-left: 255px;
            position: absoulte;
          }
        }

        span {
          ${(props) => props.theme.fontTheme.Caption1};
          line-height: 1.29;
          letter-spacing: normal;
          text-align: center;
          position: absolute;
          display: flex;

          &:nth-child(5) {
            width: ${(props) => props.theme.pixelToRem(30)};
            margin-top: 3px;
            margin-left: -6px;
          }
          &:nth-child(6) {
            width: ${(props) => props.theme.pixelToRem(30)};
            margin-top: -44px;
            margin-left: 123px;
          }
          &:nth-child(7) {
            width: ${(props) => props.theme.pixelToRem(30)};
            margin-top: -1px;
            margin-left: 255px;
          }
        }
      }

      .infoBox {
        width: inherit;
        height: ${(props) => props.theme.pixelToRem(67)};
        margin-top: -14px;
        padding: 10px;
        justify-content: space-between;
        display: flex;

        .left {
          width: 45%;
          justify-content: space-between;

          .climate {
            width: ${(props) => props.theme.pixelToRem(62)};
            height: auto;
            ${(props) => props.theme.fontTheme.Caption2};
            flex-grow: 0;
            margin: 4px 0px 6px -5px;
            line-height: 1.29;
            letter-spacing: normal;
            text-align: left;
            flex-direction: column;
            display: flex;

            p {
              margin-top: 6px;
              display: flex;
            }
          }

          .climateNum {
            width: ${(props) => props.theme.pixelToRem(62)};
            height: auto;
            margin: -78px 52px 0px 81px;
            ${(props) => props.theme.fontTheme.Caption2};
            flex-grow: 0;
            line-height: 1.29;
            letter-spacing: normal;
            text-align: right;
            flex-direction: column;
            display: flex;

            p {
              margin-top: 6px;
              display: flex;
              color: ${(props) => props.theme.colorTheme.text2} !important;
            }
          }
        }

        .right {
          width: 55%;
          height: auto;
          margin: 4px -6px 6px -10px;
          ${(props) => props.theme.fontTheme.Caption1};
          flex-grow: 0;
          line-height: 1.29;
          letter-spacing: normal;
          text-align: right;
          display: inline;
          b {
            margin-top: -12px;
            margin-left: -15px;
            font-size: ${(props) => props.theme.pixelToRem(32)};
            position: absolute;
          }
          p {
            margin-top: 6px;
          }
        }
      }
    }
    .secondFloor {
      height: ${(props) => props.theme.pixelToRem(102)};
      padding: 25px;
      justify-content: space-around;
      gap: 23px;
      display: flex;
      .iconBox {
        width: ${(props) => props.theme.pixelToRem(60)};
        height: ${(props) => props.theme.pixelToRem(75)};
        flex-direction: column;
        text-align: center;

        img {
          width: ${(props) => props.theme.pixelToRem(26)};
        }

        span {
          margin: 0 auto;
          ${(props) => props.theme.fontTheme.Body2};
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
          display: inline-block;

          &:first-child {
            font-size: ${(props) => props.theme.pixelToRem(16)};
            color: #333;
            position: relative;
          }
          &:last-child {
            margin-top: 3px;
            font-size: ${(props) => props.theme.pixelToRem(14)};
            color: #797979;
          }
        }
        &:last-child {
          width: ${(props) => props.theme.pixelToRem(40)} !important;
        }
      }
    }
  }
`;

const NoWeather = styled.div`
  width: 89%;
  height: ${(props) => props.theme.pixelToRem(116)};
  flex-grow: 0;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: rgba(81, 133, 166, 0.13);
  transition: all 0.5s ease-out;
  z-index: 100;

  .top {
    width: 100%;
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
    height: ${(props) => props.theme.pixelToRem(81)};
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;

    .inline {
      margin-top: 10px;
      margin-left: 50px;
      margin-bottom: 6px;
      display: flex;
      img {
        margin-top: -5px;
        margin-left: -25px;
        width: ${(props) => props.theme.pixelToRem(22)};
        position: absolute;
        display: inline-block;
      }
      span:nth-child(1) {
        ${(props) => props.theme.fontTheme.Caption1};
        line-height: 1.29;
        letter-spacing: normal;
        position: absolute;
      }
    }
    span:nth-child(2) {
      margin: 0 auto;
      ${(props) => props.theme.fontTheme.Caption4};
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: ${(props) => props.theme.colorTheme.text2} !important;
    }
  }
`;

/* 결과 창 */
const ResultContainer = styled.div`
  width: 89%;
  height: auto;
  margin: 0 auto;
`;

const ResultTop = styled.div`
  width: 100%;
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
  width: 100%;
  height: inherit;
  flex-direction: column;
  display: flex;
`;

const ResultItem = styled.div`
  width: inherit;
  height: ${(props) => props.theme.pixelToRem(190)};
  margin: 27px 0 14px;
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
  width: 80px;
  height: ${(props) => props.theme.pixelToRem(24)};
  padding: 2px;
  margin-top: -34px;
  margin-left: 246px;
  border-radius: 4px;
  background-color: #000000;
  position: relative;

  span {
    margin-top: 3px;
    margin-left: 6px;
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
  width: 100%;
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
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(24)};
  margin: 12px 0 5px 4px;
  padding: 0;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: ${(props) => props.theme.pixelToRem(4)};
  display: flex;

  .tag {
    width: auto;
    height: ${(props) => props.theme.pixelToRem(24)};
    padding: 4px 10px;
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
