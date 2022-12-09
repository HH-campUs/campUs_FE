import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ToastProps } from "../../interfaces/props";

/* toast (just info) custom hook */
export const InfoToast = ({ text, toastState, setToastState }: ToastProps) => {
  const [toastAni, setToastAni] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ToastAlert toastState={toastState}>
      <p>{text}</p>
    </ToastAlert>
  );
};

/* 바로가기 토스트 */
export const NavToast = ({
  text,
  url,
  toastState,
  setToastState,
}: ToastProps) => {
  const nav = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <NaviToast toastState={toastState}>
      <p>{text}</p>
      <img
        src="/images/whiteBack.svg"
        alt="nav"
        onClick={() => nav(`${url}`)}
      />
    </NaviToast>
  );
};

export const NoIdPickToast = ({
  text,
  toastState,
  setToastState,
}: ToastProps) => {
  const nav = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <CenterAlert toastState={toastState}>
      <img src="/images/icons/icon-info.svg" />

      <p>{text}</p>
      <span>
        로그인
        <img
          src="/images/whiteBack.svg"
          alt="nav"
          onClick={() => nav("/login")}
        />
      </span>
    </CenterAlert>
  );
};
/* 여행일정 */
/* export const NavPlanToast = ({
  text,
  toastState,
  setToastState,
}: ToastProps) => {
  const nav = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <NaviToast toastState={toastState}>
      <p>여행일정 등록을 완료했어요.</p>
      <img
        src="/images/whiteBack.svg"
        alt="nav"
        onClick={() => nav(`/mypage/myplan`)}
      />
    </NaviToast>
  );
}; */

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}

`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const ToastAlert = styled.div<{ toastState: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  bottom: ${(props) => props.theme.pixelToRem(30)};
  ${(props) => props.theme.fontTheme.Caption2};
  line-height: 1.29;
  letter-spacing: normal;
  color: ${(props) => props.theme.colorTheme.textWhite};
  background-color: #272727d8;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: fixed;
  z-index: 1000;
  animation-name: ${(props) => (props.toastState == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

const InfoAlert = styled(ToastAlert)``;

const CenterAlert = styled(ToastAlert)`
  width: ${(props) => props.theme.pixelToRem(245)};
  height: ${(props) => props.theme.pixelToRem(124)};
  border-radius: 10px;
  margin: 0 auto;
  bottom: 45% !important;
  left: 20%;
  flex-direction: column;

  img:first-child {
    position: absolute;
    margin-top: -56px;
  }
  img:last-child {
    width: 8%;
    position: absolute;

    margin: 0 10px 0 0;
    transform: rotate(180deg);
  }
  p {
    margin-top: 10px;
    position: absolute;
  }
  span {
    margin-top: 70px;
  }
`;

const NaviToast = styled(ToastAlert)`
  width: ${(props) => props.theme.pixelToRem(351)};
  bottom: 10%;
  transform: translateX(6%);
  padding: 20px;
  border-radius: 10px;
  justify-content: space-between !important;

  img {
    transform: rotate(180deg);
  }
`;
