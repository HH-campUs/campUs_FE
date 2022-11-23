import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import {
  DateState,
  ExportDate,
  ExportYear,
  ExportMonth,
  ExportDay,
} from "../../store/dateAtom";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import Datepicker from "./Datepicker";
import Location from "./Location";
import { isProps, searchData } from "../../interfaces/inSearch";

function Search({ isActive, setIsActive }: isProps) {
  const [inputValue, setInputValue] = useState<searchData>({
    selectInput: "",
    selectDate: "",
    selectLocation: "",
  });

  const [openDate, setOpenDate] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const selectDate = useRecoilValue(ExportDate);
  const selectYear = useRecoilValue(ExportYear);
  const selectMonth = useRecoilValue(ExportMonth);
  const selectDay = useRecoilValue(ExportDay);

  const { selectInput, selectLocation } = inputValue;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  /* SearchModal 작동 boolean  default: false */
  const ModalHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const DateFolder = () => {
    setOpenDate(!openDate);
  };

  const searchHandler = () => {
    console.log(selectDate);
  };

  const resetHandler = () => {};

  /* 추후에 모달 열리고 ModalBg에서 scroll x */
  /*   useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
    `;
    return () => {
      const sY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(sY || "0", 10) * -1);
    };
  }, []); */

  return (
    <SearchModal style={{ transition: "all 0.5s ease-in" }}>
      <SearchModal className="isNotActive" onClick={ModalHandler}>
        <BiSearchAlt size="20" style={{ display: "inline-block" }} />
        <span>search</span>
      </SearchModal>

      {isActive && (
        <Container>
          <ModalBg onClick={ModalHandler} />
          {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
          <SearchModal className="isActive">
            {/* Headline + close btn */}
            <TopContainer>
              <SearchTitle>어디로 가시나요?</SearchTitle>
              <CloseBtn src="/images/closeBtn.svg" onClick={ModalHandler} />
            </TopContainer>
            <SearchLabel htmlFor="search"></SearchLabel>
            <SearchBox
              id="search"
              placeholder="강원도 캠핑장"
              onChange={onChange}
            />

            <DateInfo onClick={DateFolder}>
              <SubTitle>떠나고 싶은 날</SubTitle>
              <DateText>
                {selectMonth}월 {selectDay}일
              </DateText>
            </DateInfo>
            {/* 데이트 피커 */}
            {openDate ? <Datepicker /> : null}
            {/* <DateContainer></DateContainer> */}

            <Location />

            <BtnContainer>
              <ResetBtn onClick={searchHandler}>
                <img src="/images/reset.svg" alt="reset" />
              </ResetBtn>
              <SearchBtn to="/Result" onClick={searchHandler}>
                검색하기
              </SearchBtn>
            </BtnContainer>
          </SearchModal>
        </Container>
      )}
    </SearchModal>
  );
}

export default Search;
/* animations */
const slideIn = keyframes`
  from {bottom: -500px; opacity: 0} 
    to {bottom: 0; opacity: 1}
`;

const slideOut = keyframes`
  from {bottom: 0px; opacity: 1} 
    to {bottom: -500px; opacity: 0}
`;

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}
`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  transition: all 0.5s ease-in-out;
`;

/* Modal Background */
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
`;

/* Search bar */
const SearchModal = styled.div`
  margin: 10px auto;
  width: 23.438rem;
  background-color: #ffffff;
  border-radius: 13px;
  justify-content: center;
  align-content: center;
  z-index: 100;

  &.isNotActive {
    height: 35px;
    padding: 5px;
    font-size: 1rem;
    color: #797979;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isActive {
    height: 43rem;
    left: 10;
    bottom: 0;
    padding: 25px 20px 39px;
    position: fixed;
    z-index: 100;
    //overflow: auto;
    animation: ${slideIn};
    animation-duration: 0.7s;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TopContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const SearchTitle = styled.div`
  ${(props) => props.theme.fontTheme.Headerline1}
  display: inline-block;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(24)};
  height: ${(props) => props.theme.pixelToRem(24)};
  display: inline-block;
`;

const SearchBox = styled.input`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin-top: -13px;
  padding: 15px 20px 15px 55px;
  border-radius: 10px;
  border: solid 1px #eee;
  background-color: #f5f5f5;
  background-image: url("/images/search.svg");
  background-repeat: no-repeat;
  background-position: ${(props) => props.theme.pixelToRem(23)} center;

  &:focus {
    outline: none;
  }

  ::placeholder {
    ${(props) => props.theme.fontTheme.Subtitle3};
    color: #797979 !important;
    letter-spacing: normal;
    font-family: Pretendard;
    text-align: left;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    font-style: normal;
  }
`;

const SearchLabel = styled.label`
  width: inherit;
  height: 35px;
  justify-content: left;
  display: flex;
`;

const DateContainer = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: auto;
  margin: 16px 0 62px;
  padding: 25px 0;
  border-radius: 10px;
  border: solid 1px #e3e3e3;
  background-color: #fff;
`;

/* datepicker 열기전에 정보 보여주는 */
const DateInfo = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(70)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid ${(props) => props.theme.pixelToRem(1)} #e3e3e3;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  display: flex;
`;

const SubTitle = styled.div`
  width: 116px;
  height: 20px;

  font-family: Pretendard;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: ${(props) => props.theme.pixelToRem(-0.5)};
  text-align: left;
  color: #333;
`;

const DateText = styled.div`
  width: 124px;
  height: 20px;
  font-family: Pretendard;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: ${(props) => props.theme.pixelToRem(-0.5)};
  text-align: right;
  color: #333;
`;

const LocationInfo = styled(DateInfo)``;

const SubLocation = styled(SubTitle)``;

const LocationText = styled(DateText)`
  width: auto !important;
  margin-left: 40px !important;
  img {
    position: absolute;
  }
`;

const BtnContainer = styled.button`
  width: ${(props) => props.theme.pixelToRem(337)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 0 auto;
  bottom: ${(props) => props.theme.pixelToRem(50)};
  background: transparent;
  border: none;
  justify-content: space-between;
  position: fixed;
  display: flex;
`;

const ResetBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(70)};
  height: 100%;
  flex-grow: 0;
  margin: 0 14px 0 0;
  opacity: 0.74;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  border: solid 1px #e2e2e2;

  /* :active {

  } */
`;

const SearchBtn = styled(Link)`
  width: ${(props) => props.theme.pixelToRem(251)};
  height: 100%;
  padding: 14px 0;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  color: ${(props) => props.theme.colorTheme.textWhite};
  flex-grow: 0;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: ${(props) => props.theme.colorTheme.primary1};
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Body2};
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff !important;
  /* :active {
    background-color: #3b3b3b;
  } */
`;
