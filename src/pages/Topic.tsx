import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";

import Bg from "../static/testpic.jpg";
import { useGetTopicInfinite } from "../APIs/getApi";
import { useInView } from "react-intersection-observer";

import TopicMap from "../components/TopicMap";
//css
import { BiChevronDown } from "react-icons/bi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IGetCampResult, pickedCamp } from "../interfaces/get";
import { idState } from "../store/loginAtom";

function Topic() {
  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  // const getCamp = useGetApi.useGetTopicResult().data;
  const { topicId } = useParams<{ topicId?: string }>();
  const userId = useRecoilValue(idState);
  // console.log(topicId);

  //infiniteScroll
  const { campTopic, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetTopicInfinite(topicId!);
  console.log(userId);

  const [ref, isView] = useInView();

  useEffect(() => {
    if (isView && hasNextPage) {
      fetchNextPage();
    }
  }, [isView]);

  return (
    <>
      {isSearch == false ? null : <Search />}

      <TopContainer>
        <BackBtn onClick={() => navigate(`/`)}>
          <img src="/images/back.svg" alt="back" />
        </BackBtn>
      </TopContainer>

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 검색결과 </span>
            <span className="total"> (개)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="popular">인기순</span>
            <BiChevronDown size="30" style={{ paddingBottom: "5px" }} />
          </div>
        </ResultTop>

        <CampMap>
          {isSuccess && campTopic?.pages ? (
            campTopic?.pages.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page?.campTopic.map((item: IGetCampResult) => (
                  <ResultBox key={item.campId}>
                    <TopicMap Camp={item} />

                    <ResultItem
                      onClick={() => navigate(`/detail/${item.campId}`)}
                    >
                      <CampImg src={item.ImageUrl} alt={item.campName} />
                      <CampName title={item.campName}>{item.campName}</CampName>
                    </ResultItem>
                    <ResultDetail>
                      <LocationOnIcon sx={{ height: "1.2rem" }} />
                      <AddressName title={item.address}>
                        {item.address}
                      </AddressName>
                    </ResultDetail>
                    <ResultDetail2>{item.featureNm}</ResultDetail2>
                  </ResultBox>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </CampMap>
        <div ref={ref} style={{ width: "inherit", height: "auto" }}></div>

        <FloatingBtn onClick={toZero}>
          <UpArrow src="/images/uparrow.svg" />
        </FloatingBtn>
      </ResultContainer>
    </>
  );
}

export default Topic;

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
  /* object-fit: contain; */
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
  padding: 35px;
  /* background-color: antiquewhite; */
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

const CampMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  /* background-color: red; */
  /* width: 375px; */
`;

const ResultBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(180)};
  margin: 20px 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Bookmark = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
`;

const ResultItem = styled.div`
  width: ${(props) => props.theme.pixelToRem(160)};
  height: ${(props) => props.theme.pixelToRem(139)};
  /* font-size: ${(props) => props.theme.pixelToRem(16)}; */
  border-radius: 10px;
`;

const CampImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* display: block; */
  object-fit: cover;
`;

const CampName = styled.div`
  margin-top: 10px;
  color: black;
  font-weight: bold;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  position: absolute;
`;

const AddressName = styled.div``;

const ResultDetail = styled.div`
  height: 60px;
  margin-top: 30px;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: black;
  align-self: flex-start;
  display: flex;
  align-items: center;
`;

const ResultDetail2 = styled.div`
  height: 60px;
  /* margin-top: -20px; */
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: black;
  align-self: flex-start;

  //
`;

const FloatingBtn = styled.button`
  position: fixed;
  right: ${(props) => props.theme.pixelToRem(45)};
  bottom: 100px;
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: white;
  /* justify-content: center; */
  /* align-items: center; */
  cursor: pointer;
  z-index: 10;
  border: 0.5px solid grey;
`;

const UpArrow = styled.img``;
