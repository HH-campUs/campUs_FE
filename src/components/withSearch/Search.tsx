import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  StartDate,
  DateState,
  ExportDate,
  ExportYear,
  ExportMonth,
  ExportDay,
  StrDay,
  StrMonth,
  StrYear,
} from "../../store/dateAtom";
import { selectLo, showLo } from "../../store/locationAtom";
import { isModal, textValue } from "../../store/searchAtom";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Datepicker from "./Datepicker";
import Location from "./Location";
import { isProps, searchData } from "../../interfaces/inSearch";
import { InfoToast } from "../Toast/Toast";

function Search() {
  /* toast boolean */
  const [toastState, setToastState] = useState(false);

  /* search Modal 여닫는 boolean */
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useRecoilState(StartDate);

  /* search api 에 사용될  keyword */
  const [inputValue, setInputValue] = useRecoilState(textValue);
  /* camp api 에 사용될 address */
  const [locationValue, setLocationValue] = useRecoilState(showLo);
  /* weather api에 사용될 pardo & dt */
  const [sendLocation, setSendLocation] = useRecoilState(selectLo);
  const [sendDate, setSendDate] = useRecoilState(DateState);

  const selectDate = useRecoilValue(ExportDate);
  const selectYear = useRecoilValue(StrYear);
  const selectMonth = useRecoilValue(StrMonth);
  const selectDay = useRecoilValue(StrDay);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  /* SearchModal 작동 boolean  default: false */

  const closeModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsSearch(false);
    document.body.style.overflow = "unset";
  };

  const dateFolder = (event: MouseEvent) => {
    event.stopPropagation();
    setOpenDate(!openDate);
  };

  const resetHandler = () => {
    setInputValue("");
    setLocationValue("");
    setSendLocation("");
    setStartDate(new Date());
  };

  return (
    <>
      <Container>
        {toastState == true ? (
          <InfoToast
            text={"검색어가 부족해요."}
            toastState={toastState}
            setToastState={setToastState}
          />
        ) : null}
        <ModalBg isSearch={isSearch} onClick={closeModal} />
        {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
        <SearchModal isSearch={isSearch} className="isSearch">
          {/* Headline + close btn */}
          <TopContainer>
            <SearchTitle>어디로 가시나요?</SearchTitle>
            <CloseBtn src="/images/closeBtn.svg" onClick={closeModal} />
          </TopContainer>

          {/* Input text */}
          <SearchLabel htmlFor="search"></SearchLabel>
          <SearchBox
            id="search"
            value={inputValue}
            placeholder={
              sendLocation == ""
                ? "예) 가평"
                : "지역 선택 시 검색어는 추가할 수 없습니다."
            }
            onChange={onChange}
            disabled={sendLocation == "" ? false : true}
            sendLocation={sendLocation}
          />
          <DropContainer>
            <DateInfo openDate={openDate}>
              <InfoBox onClick={dateFolder} />
              <SubTitle onClick={dateFolder}>떠나고 싶은 날</SubTitle>
              <DateText onClick={dateFolder}>
                {selectMonth}월 {selectDay}일
              </DateText>

              {/* 데이트 피커 */}
              <DateContainer>
                {openDate ? (
                  <Datepicker openDate={openDate} setOpenDate={setOpenDate} />
                ) : null}
              </DateContainer>
            </DateInfo>

            <Location inputValue={inputValue} setInputValue={setInputValue} />
          </DropContainer>
          <BtnContainer isSearch={isSearch}>
            <ResetBtn onClick={resetHandler}>
              <img src="/images/reset.svg" alt="reset" />
            </ResetBtn>
            {inputValue == "" && sendLocation == "" ? (
              <DisabledBtn
                onClick={() => {
                  setToastState(true);
                }}>
                검색하기
              </DisabledBtn>
            ) : inputValue == "" && sendLocation !== "" ? (
              <SearchBtn to="/result" onClick={closeModal}>
                검색하기
              </SearchBtn>
            ) : (
              <SearchBtn to="/keyword" onClick={closeModal}>
                검색하기
              </SearchBtn>
            )}
          </BtnContainer>
        </SearchModal>
      </Container>
    </>
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
  /* fixed 하면 같이 올라감 폰에서 */
  position: fixed;
  display: flex;
  overflow: hidden;
`;

/* Modal Background */
const ModalBg = styled.div<{ isSearch: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation-name: ${(props) => (props.isSearch == false ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
  position: fixed;
  overflow: hidden;
`;

/* Search bar */
const SearchModal = styled.div<{ isSearch: boolean }>`
  width: 93%;
  background-color: #ffffff;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  justify-content: center;
  align-content: center;
  bottom: 0;
  /* position없으면 위치속성 안먹음. */
  /* transform -> 위치작용 */
  position: relative;
  z-index: 1000;
  &.isSearch {
    height: 90%;
    max-height: 43rem;

    left: 10;
    bottom: 0;
    padding: 25px 20px 39px;
    position: fixed;
    z-index: 100;
    animation: ${(props) => (props.isSearch == false ? slideOut : slideIn)};
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

const SearchBox = styled.input<{ sendLocation: string }>`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin-top: -13px;
  padding: 15px 20px 15px 55px;
  border-radius: 10px;
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: ${(props) =>
    props.sendLocation == ""
      ? props.theme.colorTheme.textWhite
      : props.theme.colorTheme.disabled};
  background-image: url("/images/search.svg");
  background-repeat: no-repeat;
  background-position: ${(props) => props.theme.pixelToRem(23)} center;

  &:focus {
    outline: none;
  }

  ::placeholder {
    ${(props) => props.theme.fontTheme.Subtitle3};
    font-size: ${(props) => props.theme.pixelToRem(13)} !important;
    color: #797979 !important;
    letter-spacing: normal;
    font-family: Pretendard;
    text-align: left;
    line-height: normal;
    letter-spacing: normal;
  }
`;

const SearchLabel = styled.label`
  width: inherit;
  height: 35px;
  justify-content: left;
  display: flex;
`;

const DropContainer = styled.div`
  width: 90%;
  height: ${(props) => props.theme.pixelToRem(443)};
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
`;

/* datepicker 열기전에 정보 보여주는 */
const DateInfo = styled.div<{ openDate: boolean }>`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) =>
    props.openDate == false
      ? props.theme.pixelToRem(70)
      : props.theme.pixelToRem(414)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid ${(props) => props.theme.pixelToRem(1)} #e3e3e3;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  transition: all 0.4s ease;
  display: flex;
`;

const InfoBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(330)};
  height: ${(props) => props.theme.pixelToRem(68)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  margin-top: -25px;
  margin-left: -18px;
  position: fixed;
  display: flex;
  background-color: transparent;
  z-index: 100;
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

const DateContainer = styled.div`
  margin-top: -8px;
  position: absolute;
`;

const LocationText = styled(DateText)`
  width: auto !important;
  margin-left: 40px !important;
  img {
    position: absolute;
  }
`;

const BtnContainer = styled.button<{ isSearch: boolean }>`
  width: ${(props) => props.theme.pixelToRem(337)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin: 0 auto;
  bottom: ${(props) => props.theme.pixelToRem(50)};
  background: transparent;
  border: none;
  justify-content: space-between;
  position: fixed;
  display: flex;
  animation: ${(props) => (props.isSearch == false ? slideOut : slideIn)};
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
  outline: 0;
  border: none;
  color: #fff !important;
`;

const DisabledBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(251)};
  height: 100%;
  padding: 14px 0;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  color: ${(props) => props.theme.colorTheme.textWhite};
  flex-grow: 0;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: ${(props) => props.theme.colorTheme.primary30};
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Body2};
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  outline: 0;
  border: none;
  color: #fff !important;

  &:disabled {
    background-color: ${(props) => props.theme.colorTheme.primary30};
  }
`;
