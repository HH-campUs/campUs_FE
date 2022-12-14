import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  ToastProps,
  ToastProps2,
  ToastProps3,
  ToastProps4,
  ToastProps5,
} from "../../interfaces/props";

/* toast custom hook */

export const InfoToast = ({ text, toastState, setToastState }: ToastProps) => {
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

/* 한페이지에 토스트 2개 */
export const InfoToast2 = ({
  text,
  toastState2,
  setToastState2,
}: ToastProps2) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState2(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ToastAlert2 toastState2={toastState2}>
      <p>{text}</p>
    </ToastAlert2>
  );
};

export const InfoToast3 = ({
  text,
  toastState3,
  setToastState3,
}: ToastProps3) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState3(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ToastAlert3 toastState3={toastState3}>
      <p>{text}</p>
    </ToastAlert3>
  );
};

/* 검색 에러 토스트 */
export const SearchToast = ({
  text,
  toastState3,
  setToastState3,
}: ToastProps3) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState3(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <SearchAlert toastState3={toastState3}>
      <p>{text}</p>
    </SearchAlert>
  );
};

/* 검색 초기화 토스트 */
export const ResetToast = ({
  text,
  toastState4,
  setToastState4,
}: ToastProps4) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState4(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ResetAlert toastState4={toastState4}>
      <p>{text}</p>
    </ResetAlert>
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
        onClick={(e) => {
          e.stopPropagation();
          nav(`${url}`);
        }}
      />
    </NaviToast>
  );
};

/* 한페이지에서 바로가기 토스트를 2개 사용해야될 때 */
export const NavToast2 = ({
  text,
  url,
  toastState2,
  setToastState2,
}: ToastProps2) => {
  const nav = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState2(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <NaviToast2 toastState2={toastState2}>
      <p>{text}</p>
      <img
        src="/images/whiteBack.svg"
        alt="nav"
        onClick={(e) => {
          e.stopPropagation();
          nav(`${url}`);
        }}
      />
    </NaviToast2>
  );
};

/* Id가 없어요 */
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
      <span
        onClick={(e) => {
          e.stopPropagation();
          nav("/login");
        }}>
        로그인
        <img src="/images/whiteBack.svg" alt="nav" />
      </span>
    </CenterAlert>
  );
};

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}

`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const SearchAlert = styled.div<{ toastState3: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  left: 20%;
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
  animation-name: ${(props) => (props.toastState3 == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

const ResetAlert = styled.div<{ toastState4: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  left: 20%;
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
  animation-name: ${(props) => (props.toastState4 == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

const ToastAlert = styled.div<{ toastState: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  left: 20%;
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

const ToastAlert2 = styled.div<{ toastState2: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  left: 20%;
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
  animation-name: ${(props) => (props.toastState2 == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

const ToastAlert3 = styled.div<{ toastState3: boolean }>`
  width: ${(props) => props.theme.pixelToRem(243)};
  height: ${(props) => props.theme.pixelToRem(48)};
  margin: 0 auto;
  left: 20%;
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
  animation-name: ${(props) => (props.toastState3 == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

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
  padding: 20px;
  left: ${(props) => props.theme.pixelToRem(21)};
  bottom: 10%;
  position: absoulte;
  border-radius: 10px;
  justify-content: space-between !important;

  img {
    transform: rotate(180deg);
  }
`;

const NaviToast2 = styled(ToastAlert2)`
  width: ${(props) => props.theme.pixelToRem(351)};
  padding: 20px;
  left: ${(props) => props.theme.pixelToRem(21)};
  bottom: 10%;
  position: absoulte;
  border-radius: 10px;
  justify-content: space-between !important;

  img {
    transform: rotate(180deg);
  }
`;
