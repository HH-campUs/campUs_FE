import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";

import { isModal, textValue } from "../store/searchAtom";
import { showLo, selectLo } from "../store/locationAtom";
import { StrMonth, StrDay, DateState } from "../store/dateAtom";
import Search from "../components/withSearch/Search";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSearchCamp } from "../APIs/getApi";
import { IGetCampResult } from "../interfaces/get";

function Keyword() {
  const nav = useNavigate();

  /* data */

  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [bookmarking, setBookMarking] = useState(false);

  const Month = useRecoilValue(StrMonth);
  const Day = useRecoilValue(StrDay);

  const doNm = useRecoilValue(showLo);
  const pardo = useRecoilValue(selectLo);
  const date = useRecoilValue(DateState);
  const keyword = useRecoilValue(textValue);

  /* camp result 무한스크롤 */

  const { campData, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useSearchCamp(keyword);
  console.log(campData);

  const { ref, inView } = useInView();

  /* handler */

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
      {isSearch == false ? undefined : <Search />}

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
            {Month}월 {Day}일 &nbsp; | &nbsp; {keyword}
          </span>
        </div>
      </ReSearch>

      {/* Weather modal */}

      {/* 여기서 문제... pardo값을 받게 되었을 때 잘나오지만 만약 pardo 값을 인자로 넣지
      않는다면..?  => undefined 값이 나오게 된다잉.. 그렇다고 이 값을 여기에 맞추기엔 pardo
      값을 정확히 입력하고, 날짜가 날씨를 지원하지 않는 거라면 Query Option 으로 isError일때, 
      다른 컴포넌트가 나오게 처리해야된다.. 그렇다면?? 조건문을 중첩해서 써도 되지 않을까?
      => 이거 질문해야겠다 시부레,.. */}

      {/* 일단 키워드가 있고 없고 해도 잘 안됩니당 */}

      <NoWeather>
        <div className="top">
          <span>날씨</span>
        </div>
        <div className="isNotActive">
          <div className="inline">
            <img src="/images/icon-warning.svg" alt="warning" />
            키워드 검색은 날씨 정보를 제공하지 않습니다.
          </div>
          <span>(지역 검색을 이용해 보세요!)</span>
        </div>
      </NoWeather>

      {/* Camp results */}

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 검색결과 </span>
            <span className="total"> ({campData?.pages[0].camps.total}개)</span>
          </div>
          <div>
            <span className="popular">인기순</span>
          </div>
        </ResultTop>
        {isSuccess && campData?.pages ? (
          campData?.pages.map((page) => (
            <React.Fragment key={page.currentPage}>
              {page?.camps.regionCamp.map((item: IGetCampResult) => (
                <ResultBox key={item.campId}>
                  <ResultItem
                    onClick={() =>
                      nav(`/detail/:${item.campId}`, {
                        state: {
                          campId: `${item.campId}`,
                        },
                      })
                    }>
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
                  {/* 시설 태그들 (max: 4) */}
                  <TagContainer>
                    {item.sbrsCl
                      .split(",")
                      .slice(0, 4)
                      .map((word) => (
                        <div className="tag"> {word} </div>
                      ))}
                  </TagContainer>
                </ResultBox>
              ))}
            </React.Fragment>
          ))
        ) : (
          <div>데이터가 없습니다</div>
        )}
      </ResultContainer>
      <div ref={ref} style={{ width: "inherit", height: "auto" }}></div>
    </>
  );
}

export default Keyword;

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

/* weather */

const NoWeather = styled.div`
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
