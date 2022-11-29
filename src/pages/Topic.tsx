import React, { useState } from "react";
import { useRecoilState } from "recoil";

import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Datepicker from "../components/withSearch/Datepicker";
import { BiChevronDown } from "react-icons/bi";
import Bg from "../static/testpic.jpg";
import { useGetApi } from "../APIs/getApi";

import { useInfiniteQuery } from "@tanstack/react-query";

//css
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

//페이지별로 나누고 id값을사용하는데 api를어케활용하지?
//1. topic에 맞게 한번에 불러오는 데이터 확인(ex)애완전용 1000개)
//2, 더불러오기ui생성 -> useInfiniteQuery 데이터그룹요청기다리기, getNextparam
//다음요청 위치 정보 반환, fetchNextPage함수호출(덮어쓰기안할거면인자사용금지)
//3.

function Topic() {
  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const nav = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [topic, isTopic] = useState(false);

  const getCamp = useGetApi.useGetTopicResult().data;
  // console.log(getCamp?.total);

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
            <span className="total"> ({getCamp?.total}개)</span>
          </div>
          <div>
            <span className="popular">
              인기순
              <BiChevronDown size="30" style={{ display: "inlineBox" }} />
            </span>
          </div>
        </ResultTop>
        {getCamp?.topicCamp.map((Camp, campId) => (
          <ResultBox key={campId}>
            <ResultItem onClick={() => nav(`/detail`)}>
              <CampName>{Camp.campName}</CampName>
              <CampImg src={Camp.ImageUrl} alt={Camp.campName} />
            </ResultItem>
            <ResultDetail>
              <LocationOnIcon />
              {Camp.address}
            </ResultDetail>
            <ResultDetail2>{Camp.featureNm}</ResultDetail2>
          </ResultBox>
        ))}

        <button onClick={toZero}>floatingBtn</button>
      </ResultContainer>
    </>
  );
}

export default Topic;

/* dummy data */

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

const CampImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* display: block; */
  object-fit: cover;
`;

const CampName = styled.div`
  /* transform: translate(50%, -200%); */
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
  //
`;

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
