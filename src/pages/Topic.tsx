import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";

import Bg from "../static/testpic.jpg";
import { useGetApi } from "../APIs/getApi";
import { usePostsApi } from "../APIs/postsApi";
import { useGetTopicInfinite } from "../APIs/getApi";
import { useInView } from "react-intersection-observer";
import { ICampingPicked } from "../interfaces/Posts";

import TopicMap from "../components/TopicMap";
//css
import { BiChevronDown } from "react-icons/bi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IGetCampResult, pickedCamp } from "../interfaces/get";

function Topic() {
  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const getCamp = useGetApi.useGetTopicResult().data;
  const { topicId } = useParams<{ topicId?: string }>();
  // console.log(topicId);

  //infiniteScroll
  const { campTopic, fetchNextPage, isSuccess, hasNextPage, refetch } =
    useGetTopicInfinite(topicId!);
  console.log(campTopic);

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
              <React.Fragment key={page.nextPage}>
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

// {isSuccess && campData?.pages ? (
//   /* page별로 map을 한 번 돌려서 2차원배열 구조로 되어있는~ */
//   campData?.pages.map((page) => (
//     <React.Fragment key={page.currentPage}>
//       {page?.camps.map((item: IGetCampResult) => (
//         <ResultBox key={item.campId}>
//           <ResultItem
//             onClick={() =>
//               nav(`/detail/:${item.campId}`, {
//                 state: {
//                   campId: `${item.campId}`,
//                 },
//               })
//             }>
//             <ResultImg src={item.ImageUrl} alt={item.ImageUrl} />
//             <InnerBg>
//               <span>
//                 찜({item.pickCount}) 리뷰({item.reviewCount}){" "}
//               </span>
//             </InnerBg>
//           </ResultItem>
//           <CampSpan>
//             <span>{item.campName}</span>
//             <span>{item.induty}</span>
//           </CampSpan>
//           <DetailAddress>
//             <img src="/images/location.svg" alt="location" />
//             <span>{item.address}</span>
//           </DetailAddress>
//           <TagContainer>
//             <div className="tag"> 운동시설 </div>
//             <div className="tag"> 장작판매 </div>
//             <div className="tag"> 물놀이장 </div>
//             <div className="tag"> 마트/편의점 </div>
//           </TagContainer>
//         </ResultBox>

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

// const ScrollTop = () => {
//   const [contentNo] = useRecoilState<number>(mainContent);
//   const [getMainScrollRef] = useRecoilState<HTMLDivElement | null>(
//   mainScrollRef
//   );
//   const handleClick = () => {
//window.scrollTo({ left: 0, top: 0, behavior: "smooth" });//
// };
// return (
// <Portal>
// <icons.ArrowTurnUp
// onClick={handleClick}
// className={cls(
// "fixed right-3 bottom-10 w-12 h-12 rounded-full shadow-lg flex justify-center items-center cursor-pointer",
// contrastColorNos.includes(contentNo) ? "text-white" : "text-black"
// )}
// />
// </Portal>
// );
// };

// interface Dummy {
//   ImgUrl?: string;
//   reviewNum: number;
//   name: string;
//   location: string;
//   address: string;
// }

// const DummyData: Array<Dummy> = [
//   {
//     ImgUrl: "https://img.sbs.co.kr/newimg/news/20170117/201015461_1280.jpg",
//     reviewNum: 50,
//     name: "모여봐요 동물의 숲",
//     location: "닌텐도 뀨뀨",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg",
//     reviewNum: 240,
//     name: "강원도로 갈까유",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2022%2F04%2Fmakoto-shinkai-new-anime-movie-suzume-no-tojimari-first-video-visual-teaser-ft.jpg?w=960&cbr=1&q=90&fit=max",
//     reviewNum: 53,
//     name: "모이자",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "http://newsimg.hankookilbo.com/2019/10/30/201910301882016576_6.jpg",
//     reviewNum: 342,
//     name: "모홍홍 숲",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl: "https://pbs.twimg.com/media/EbXmXe2VAAUKd_B.jpg",
//     reviewNum: 231,
//     name: "롤하고 싶당",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F08%2Fblackpink-animal-crossing-new-horrizsons-island-info-2.jpg?q=75&w=800&cbr=1&fit=max",
//     reviewNum: 30,
//     name: "동물의 숲",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "https://m.nongmin.com/upload/bbs/202207/20220712165858408/20220712165858408.jpg",
//     reviewNum: 42,
//     name: "모 숲",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
//   {
//     ImgUrl:
//       "https://cdn.eyesmag.com/content/uploads/posts/2020/03/31/animal-crossing-new-horizons-instagram-fashion-09-9d86eeb1-c87b-414d-849d-45431d21561c.jpg",
//     reviewNum: 341,
//     name: "부잉",
//     location: "닌텐도 어딘가에 있겠지 임마",
//     address: "대한민국 어딘가 ~",
//   },
// ];
