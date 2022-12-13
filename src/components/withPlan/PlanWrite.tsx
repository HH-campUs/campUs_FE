import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
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
import { isToast2 } from "../../store/toastAtom";

import { isModal, textValue } from "../../store/searchAtom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Datepicker from "../withSearch/Datepicker";
import { usePostsApi } from "../../APIs/postsApi";
import { getCamperToken } from "../../instance/cookies";
import { planOpenProps, ToastProps } from "../../interfaces/props";
import { IPostTravelPlan } from "../../interfaces/Posts";

function PlanWrite({ isPlan, setIsPlan }: planOpenProps) {
  /* toast boolean */
  const [toastState2, setToastState2] = useRecoilState(isToast2);
  const [openDate, setOpenDate] = useState(false);

  /* search api 에 사용될  keyword */
  const [sendDate, setSendDate] = useRecoilState(DateState);

  const selectDate = useRecoilValue(ExportDate);
  const selectYear = useRecoilValue(StrYear);
  const selectMonth = useRecoilValue(StrMonth);
  const selectDay = useRecoilValue(StrDay);

  const dateFolder = (event: MouseEvent) => {
    event.stopPropagation();
    setOpenDate(!openDate);
  };

  const isLogin = getCamperToken();
  //campId확인.
  /* const { campId } = useParams(); */
  const loca = useLocation();
  const state = loca.state as { campId: number };

  const planPost = usePostsApi.usePostTravelPlan();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostTravelPlan>();

  const handleValid = (data: IPostTravelPlan) => {
    const body = {
      campId: state.campId,
      date: sendDate,
      memo: data.memo,
    };
    planPost.mutate(body);
    setToastState2(true);
    setIsPlan(false);
  };

  return (
    <>
      <Container>
        <ModalBg
          isPlan={isPlan}
          onClick={() => {
            setIsPlan(false);
          }}
        />
        {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
        <SearchModal isPlan={isPlan} className="isSearch">
          {/* Headline + close btn */}
          <TopContainer>
            <SearchTitle>여행일정을 등록해볼까요?</SearchTitle>
            <CloseBtn
              src="/images/closeBtn.svg"
              onClick={() => {
                setIsPlan(false);
              }}
            />
          </TopContainer>
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
          <form onSubmit={handleSubmit(handleValid)}>
            {openDate == true ? null : (
              <StTextArea
                placeholder="자유롭게 내 일정에 메모를 입력해보세요"
                {...register("memo")}
              />
            )}
            <BtnContainer isPlan={isPlan}>
              <SearchBtn>일정 등록하기</SearchBtn>
            </BtnContainer>
          </form>
        </SearchModal>
      </Container>
    </>
  );
}

export default PlanWrite;
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
  overflow: hidden;
`;

/* Modal Background */
const ModalBg = styled.div<{ isPlan: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation-name: ${(props) => (props.isPlan == false ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
`;

/* Search bar */
const SearchModal = styled.div<{ isPlan: boolean }>`
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
    height: ${(props) => props.theme.pixelToRem(650)};
    left: 10;
    bottom: 0;
    padding: 25px 20px 39px;
    position: fixed;
    z-index: 100;
    //overflow: auto;
    animation: ${(props) => (props.isPlan == false ? slideOut : slideIn)};
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

const BtnContainer = styled.button<{ isPlan: boolean }>`
  width: ${(props) => props.theme.pixelToRem(337)};
  height: ${(props) => props.theme.pixelToRem(100)};
  margin: 0 auto;

  bottom: ${(props) => props.theme.pixelToRem(50)};
  background: transparent;
  border: none;
  justify-content: space-between;
  position: fixed;
  display: flex;
  animation: ${(props) => (props.isPlan == false ? fadeOut : fadeIn)};
  animation-duration: 0.3s;
`;

const StTextArea = styled.textarea`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(225)};
  padding: 14px 16px;
  border: 1px solid lightgray;
  resize: none;
  /* letter-spacing: 0px; */
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
