
import React, { useState, useEffect } from "react";

import { useRecoilState } from "recoil";

import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";

import { useGetTopicInfinite } from "../APIs/getApi";
import { useInView } from "react-intersection-observer";

//css
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NoIdPickToast } from "../components/Toast/Toast";

import { IGetCampResult } from "../interfaces/get";
import TopicBookmark from "../components/TopicBookmark";

function Topic() {
  /* toast boolean */
  const [toastState, setToastState] = useState(false);

  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const { topicId } = useParams();
  // const userId = useRecoilValue(idState);
  // console.log(userId);

  const loca = useLocation();
  const state = loca.state as { topicImg: string; id: number };
  const bg = state.topicImg;

  //infiniteScroll
  const { campTopic, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetTopicInfinite(topicId!);

  console.log("camp", campTopic);
  const [ref, isView] = useInView();

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


      <ImgCover onClick={() => navigate(`/`)} />

      <TopContainer bg={bg}>
        <BackBtn>
          <img src="/images/back.svg" alt="back" />
        </BackBtn>
      </TopContainer>
      {/* <div style={{ position: "absolute" , transform}}>
        <TextTitle>일몰명소</TextTitle>
        <MidTextBox>
          <MidText>일몰 명소 캠핑장 추천</MidText>
          <NextPage>애견동반</NextPage>
        </MidTextBox>
      </div> */}

      <ResultContainer>
        <ResultTop>
          <div>
            <span className="result"> 전체 </span>
            <span className="total"> (개)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="popular">인기순</span>
            <img src="/images/topic/openclose.svg" alt="downArrow" />
          </div>
        </ResultTop>
        {/*
         */}
        <CampMap>
          {isSuccess && campTopic?.pages ? (
            campTopic?.pages.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page?.campTopic?.topicCamp?.map((item: IGetCampResult) => (
                  <ResultBox key={item.campId}>
                    <TopicBookmark Camp={item} />
                    <ResultItem
                      onClick={() =>
                        navigate(`/detail/${item.campId}`, {
                          state: {
                            campId: `${item.campId}`,
                          },
                        })
                      }
                    >
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

const TopContainer = styled.div<{ bg: string }>`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(266)};
  border-bottom-left-radius: ${(props) => props.theme.pixelToRem(12)};
  border-bottom-right-radius: ${(props) => props.theme.pixelToRem(12)};
  background-image: url(${(props) => props.bg});
  background-size: cover;
  /* background-repeat: no-repeat; */
  object-fit: cover;
`;
const ImgCover = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
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

  img {
    display: inline-block;
  }
`;

const TextTitle = styled.div``;

const MidTextBox = styled.div``;

const MidText = styled.div``;

const NextPage = styled.div``;

const ResultContainer = styled.div``;

const ResultTop = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
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

  /* width: 375px; */
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
  img {
    width: 100%;
    height: ${(props) => props.theme.pixelToRem(196)};
    border-radius: ${(props) => props.theme.pixelToRem(8)};
    /* display: block; */
    object-fit: cover;
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
  background-color: white;
  cursor: pointer;
  z-index: 10;
  border: 1px solid #eee;
`;

const UpArrow = styled.img``;
