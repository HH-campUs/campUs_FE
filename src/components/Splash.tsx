import React from "react";
import styled from "styled-components";

function Splash() {
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
  height: 100vh;
  background-color: #024873;
  position: absolute;
  z-index: 100;
`;
const SplashLogo = styled.img`
  margin: 0 auto;
`;
