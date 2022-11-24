import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Splash() {
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  });

  return isShow ? (
    <SplashBg>
      <SplashLogo src="/images/kakaopf.jpeg" />
    </SplashBg>
  ) : (
    <></>
  );
}
export default Splash;

const SplashBg = styled.div`
  width: 100vw;
  max-width: 473px;
  height: 100vh;
  background-color: #024873;
  position: absolute;
  z-index: 100;
`;
const SplashLogo = styled.img`
  margin: 0 auto;
`;
