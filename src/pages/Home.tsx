import { useState } from "react";
import Carousel from "../components/Carousel";

import MytravelPlan from "../components/MytravelPlan";
import Subject from "../components/Subject";
import Nearby from "../components/Nearpost/Nearby";
import Search from "../components/withSearch/Search";
import WeekWeather from "../components/WeekWeather";
import { useRecoilState } from "recoil";
import { isModal } from "../store/searchAtom";
import NewReview from "../components/withReview/NewReview";
import { NoIdPickToast } from "../components/Toast/Toast";

//Css
import styled from "styled-components";

function Home() {
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  /* toast boolean */
  const [toastState, setToastState] = useState(false);

  const openModal = () => {
    setIsSearch(true);
    document.body.style.overflow = "hidden";
  };

  const backgroundArr = ["겨울캠핑은"];

  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundPhrase = backgroundArr[randomIndex];

  return (
    <Wrapper>
      {/* 찜하기 알림 토스트 */}

      {toastState === true ? (
        <NoIdPickToast
          text={"로그인 후 찜하기가 가능해요."}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}
      {isSearch === false ? null : <Search />}

      <HeadText>
        {backgroundPhrase} <br></br> 캠프어스에서
      </HeadText>
      <SearchBar isSearch={isSearch} onClick={openModal}>
        <img src="/images/search.svg" alt="Search" width="20" height="20" />
        <span>캠핑 어디로 가시나요?</span>
      </SearchBar>

      <TextBox>
        <CampText>요즘 많이 찾는 캠핑장</CampText>
      </TextBox>
      <Carousel />
      <WeekWeather />
      <MytravelPlan />
      <Subject />
      <Nearby />
      <Title>새로 올라온 리뷰</Title>
      <NewReview />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  width: 100%;
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: calc(100vh - 3rem);
  overflow-x: hidden;
  flex-direction: column;
`;

const HeadText = styled.div`
  width: 20px auto 0;
  height: ${(props) => props.theme.pixelToRem(80)};
  margin: 84px 20px 20px;
  font-size: ${(props) => props.theme.pixelToRem(30)};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colorTheme.text};
`;

const SearchBar = styled.div<{ isSearch: Boolean }>`
  width: 91.5%;
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 20px 20px 0 20px;
  padding: 16px 32px 16px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px #eee;
  background-color: #f5f5f5;

  span {
    width: ${(props) => props.theme.pixelToRem(249)};
    height: ${(props) => props.theme.pixelToRem(20)};
    margin: -22px 30px;
    font-size: ${(props) => props.theme.pixelToRem(16)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.theme.colorTheme.text3};
    display: flex;
  }
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.pixelToRem(40)};
  margin-left: ${(props) => props.theme.pixelToRem(20)};
  font-size: ${(props) => props.theme.pixelToRem(20)};
  color: #333;
  font-weight: 600;
`;

const CampText = styled.div`
  ${(props) => props.theme.fontTheme.Headline1};
  line-height: normal;
  letter-spacing: normal;
  color: #333 !important;
`;

const Title = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  font-weight: 600;
  color: #333;
`;
