import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Splash() {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 3000);
  });

  return (
    <SplashBg>
      <SplashLogo />
    </SplashBg>
  );
}

export default Splash;

const SplashBg = styled.div`
  width: 100%;
  max-width: 473px;
  height: 100%;
  background-color: #024873;
  position: absolute;
  z-index: 100;
`;
const SplashLogo = styled.img`
  margin: 0 auto;
`;
