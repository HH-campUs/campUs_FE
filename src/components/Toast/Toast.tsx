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

export const NavPickToast = () => {
  const nav = useNavigate();
  return (
    <NavToast>
      <p>찜목록에 추가되었습니다.</p>
      <img
        src="/images/back.svg"
        alt="nav"
        onClick={() => nav("/mypage/mypick")}
      />
    </NavToast>
  );
};

export const NoIdPickToast = () => {
  const nav = useNavigate();
  return (
    <NavToast>
      <p>로그인을 해야 이용할 수 있습니다.</p>
      <img src="/images/back.svg" alt="nav" onClick={() => nav("/login")} />
    </NavToast>
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

const ToastAlert = styled.div<{ toastState: boolean }>`
  width: ${(props) => props.theme.pixelToRem(350)};
  height: ${(props) => props.theme.pixelToRem(60)};
  margin: 0 auto;
  bottom: ${(props) => props.theme.pixelToRem(30)};
  ${(props) => props.theme.fontTheme.Body2};
  color: ${(props) => props.theme.colorTheme.textWhite};
  background-color: #272727d8;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: fixed;
  display: flex;
  z-index: 1000;
  animation-name: ${(props) => (props.toastState == true ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
`;

const NavToast = styled.div`
  padding: 20px;
  justify-content: space-between;
`;
