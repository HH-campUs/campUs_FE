import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Splash() {
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, []);

  return isShow ? (
    <Root>
      <LeftTemplate />
      <RightTemplate>
        <SplashBg></SplashBg>
      </RightTemplate>
    </Root>
  ) : (
    <></>
  );
}
export default Splash;

const SplashBg = styled.div`
  width: 100vw;
  max-width: 475px;
  height: 100vh;
  background-color: #2481bb;
`;
const SplashLogo = styled.img`
  margin: 0 auto;
`;

const Root = styled.div`
  width: 100vw;
  //width: 915px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  touch-action: none;
  -ms-overflow-style: none;
  z-index: 100;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
//left
const LeftTemplate = styled.div`
  width: 440px;
  min-height: 650px;
  border: soild 1px black;
  background-color: grey;

  @media screen and (max-width: 915px) {
    display: none;
  }
`;
//right
const RightTemplate = styled.div`
  //background-color: teal;
  width: 475px;
  //height: 500px;
  max-width: 475px;

  @media screen and (min-width: 915px) {
    max-width: 475px;
    //margin-left: -17.5px;
  }
`;
