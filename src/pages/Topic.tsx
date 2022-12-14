import React, { useState, useEffect } from "react";

import { useRecoilState } from "recoil";

import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useGetTopicInfinite } from "../APIs/getApi";
import { useInView } from "react-intersection-observer";

//css
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NoIdPickToast } from "../components/Toast/Toast";

import { IGetCampResult } from "../interfaces/get";
import TopicBookmark from "../components/TopicBookmark";
import { getCamperToken } from "../instance/cookies";
import Sunset from "../components/TopicHead/Sunset";
import Animal from "../components/TopicHead/Animal";
import Equipment from "../components/TopicHead/Equipment";
import Fishing from "../components/TopicHead/Fishing";
import Circle from "../components/TopicHead/Circle";

function Topic() {
  /* toast boolean */
  const [toastState, setToastState] = useState(false);

  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [sortState, setSortState] = useState("lookUp");
  const { topicId } = useParams();

  const isLogin = getCamperToken();

  //infiniteScroll
  const { campTopic, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetTopicInfinite(topicId!, sortState);

  console.log("campTopic", campTopic);

  const [ref, isView] = useInView();

  // <div>
  // {sortState == "lookUp" ? (
  //   <span
  //     className="popular"
  //     onClick={() => setSortState("pickCount")}
  //   >
  //     조회순
  //   </span>
  // ) : sortState == "pickCount" ? (
  //   <span
  //     className="popular"
  //     onClick={() => setSortState("reviewCount")}
  //   >
  //     인기순
  //   </span>
  // ) : (
  //   <span
  //     className="popular"
  //     onClick={() => setSortState("lookUp")}
  //   >
  //     리뷰순
  //   </span>
  // )}

  useEffect(() => {
    if (isView && hasNextPage) {
      fetchNextPage();
    }
  }, [isView]);

  return (
    <>
      {isSearch == false ? null : <Search />}

      {toastState == true ? (
        <NoIdPickToast toastState={toastState} setToastState={setToastState} />
      ) : null}

      <TopContainer>
        <ImgCover />

        <BackBtn onClick={() => navigate(`/`)}>
          <img src="/images/back.svg" alt="back" />
        </BackBtn>

        <div>
          {topicId == "1" ? (
            <Sunset />
          ) : topicId == "2" ? (
            <Animal />
          ) : topicId == "3" ? (
            <Equipment />
          ) : (
            <Fishing />
          )}
        </div>
        <Circle />
      </TopContainer>

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 전체 </span>
            <span className="total">
              ({campTopic?.pages[0]?.campTopic?.total} 개)
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="popular">인기순</span>
            <img src="/images/topic/openclose.svg" alt="downArrow" />
          </div>
        </ResultTop>
        <CampMap>
          {isSuccess && campTopic?.pages ? (
            campTopic?.pages.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page?.campTopic?.topicCamp?.map((item: IGetCampResult) => (
                  <ResultBox key={item.campId}>
                    <TopicBookmark Camp={item} />
                    <ResultItem
                      onClick={() => navigate(`/detail/${item.campId}/detail`)}>
                      <CampImg>
                        <img src={item.ImageUrl} alt={item.campName} />
                        <ReviewInfo>
                          <div>
                            찜({item.pickCount}) 리뷰({item.reviewCount})
                          </div>
                        </ReviewInfo>
                      </CampImg>
                      <CampName title={item.campName}>{item.campName}</CampName>
                      <AddressName title={item.address}>
                        {item.address}
                      </AddressName>

                      <Induty>{item.induty}</Induty>
                    </ResultItem>
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

const TopContainer = styled.div`
  height: ${(props) => props.theme.pixelToRem(266)};
  border-bottom-left-radius: ${(props) => props.theme.pixelToRem(12)};
  border-bottom-right-radius: ${(props) => props.theme.pixelToRem(12)};
  background-size: cover;
  object-fit: cover;
  position: relative;
`;

const ImgCover = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(266)};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => props.theme.pixelToRem(15)};
  z-index: 1;
  position: absolute;
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
  z-index: 2;
  cursor: pointer;

  img {
    display: inline-block;
  }
`;

const ResultContainer = styled.div``;

const ResultTop = styled.div`
  width: 90%;
  height: ${(props) => props.theme.pixelToRem(22)};
  margin-top: ${(props) => props.theme.pixelToRem(24)};
  margin-left: ${(props) => props.theme.pixelToRem(20)};
  justify-content: space-between;
  display: flex;

  .result {
    font-family: Pretendard;
    font-size: ${(props) => props.theme.pixelToRem(18)};
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
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
    color: #666;
  }

  .popular {
    font-family: Pretendard;
    font-size: ${(props) => props.theme.pixelToRem(12)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    color: #666;
  }

  img {
    padding: 5px;
  }
`;

const CampMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResultBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(162)};
  height: ${(props) => props.theme.pixelToRem(290)};
  margin: 20px 12px;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ResultItem = styled.div`
  width: ${(props) => props.theme.pixelToRem(162)};
  height: ${(props) => props.theme.pixelToRem(139)};
  border-radius: 10px;
`;

const CampImg = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: ${(props) => props.theme.pixelToRem(196)};
    border-radius: ${(props) => props.theme.pixelToRem(8)};
    object-fit: cover;
  }
`;

const CampName = styled.div`
  margin: 10px 0 4px;
  color: #222;
  font-weight: 600;
  font-size: ${(props) => props.theme.pixelToRem(16)};
`;

const AddressName = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(5)};
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: #666;
`;

const Induty = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: #666;
  margin-top: 15px;
  display: flex;
`;

const ReviewInfo = styled.div`
  position: absolute;
  width: ${(props) => props.theme.pixelToRem(97)};
  height: ${(props) => props.theme.pixelToRem(24)};
  padding: 5px 15px;
  opacity: 0.5;
  border-radius: ${(props) => props.theme.pixelToRem(4)};
  background-color: #000;
  right: ${(props) => props.theme.pixelToRem(8)};
  top: ${(props) => props.theme.pixelToRem(164)};
  justify-content: center;
  display: flex;

  div {
    font-size: ${(props) => props.theme.pixelToRem(12)};
    color: #fff;
  }
`;

const FloatingBtn = styled.button`
  position: fixed;
  right: ${(props) => props.theme.pixelToRem(45)};
  bottom: 100px;
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: #fff;
  cursor: pointer;
  z-index: 10;
  border: 1px solid #eee;
`;

const UpArrow = styled.img``;
