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
import { semiOpenProps } from "../../interfaces/props";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SemiSearch({ openSemi, setOpenSemi }: semiOpenProps) {
  const notify = () => {
    toast.success("This is a test success", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useRecoilState(StartDate);

  /* search api 에 사용될  keyword */
  const [sendDate, setSendDate] = useRecoilState(DateState);

  const selectDate = useRecoilValue(ExportDate);
  const selectYear = useRecoilValue(StrYear);
  const selectMonth = useRecoilValue(StrMonth);
  const selectDay = useRecoilValue(StrDay);

  return (
    <>
      <Container>
        <ModalBg
          openSemi={openSemi}
          onClick={() => {
            setOpenSemi(false);
          }}
        />
        {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
        <SearchModal openSemi={openSemi} className="isSearch">
          <ToastContainer />
          {/* Headline + close btn */}
          <TopContainer>
            <SearchTitle>어디로 가시나요?</SearchTitle>
            <CloseBtn
              src="/images/closeBtn.svg"
              onClick={() => {
                setOpenSemi(false);
              }}
            />
          </TopContainer>

          <DateInfo>
            {/* 데이트 피커 */}
            <DateContainer>
              <Datepicker openDate={true} setOpenDate={setOpenDate} />
            </DateContainer>
          </DateInfo>
          <BtnContainer openSemi={openSemi}>
            <SearchBtn
              onClick={() => {
                setOpenSemi(false);
              }}>
              검색하기
            </SearchBtn>
          </BtnContainer>
        </SearchModal>
      </Container>
    </>
  );
}

export default SemiSearch;
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
`;

/* Modal Background */
const ModalBg = styled.div<{ openSemi: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation-name: ${(props) => (props.openSemi == false ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
`;

/* Search bar */
const SearchModal = styled.div<{ openSemi: boolean }>`
  width: 23.438rem;
  background-color: #ffffff;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  justify-content: center;
  align-content: center;
  bottom: 0;
  /* position없으면 위치속성 안먹음. */
  /* transform -> 위치작용 */
  position: relative;
  z-index: 100;
  &.isSearch {
    height: ${(props) => props.theme.pixelToRem(566)};
    left: 10;
    bottom: 0;
    padding: 25px 20px 39px;
    position: fixed;
    z-index: 100;
    //overflow: auto;
    animation: ${(props) => (props.openSemi == false ? slideOut : slideIn)};
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

/* datepicker 열기전에 정보 보여주는 */
const DateInfo = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(360)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid ${(props) => props.theme.pixelToRem(1)} #e3e3e3;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  display: flex;
`;

const DateContainer = styled.div`
  margin-top: -76px;
  position: absolute;
`;

const BtnContainer = styled.button<{ openSemi: boolean }>`
  width: ${(props) => props.theme.pixelToRem(337)};
  height: ${(props) => props.theme.pixelToRem(100)};
  margin: 0 auto;

  bottom: ${(props) => props.theme.pixelToRem(50)};
  background: transparent;
  border: none;
  justify-content: space-between;
  position: fixed;
  display: flex;
  animation: ${(props) => (props.openSemi == false ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
`;

const SearchBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(60)};
  margin-top: 50px !important;
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
