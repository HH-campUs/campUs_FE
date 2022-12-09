import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import lottie from "../style/lottie.json";
import { FaAccusoft } from "react-icons/fa";

function Splash() {
  const [isShow, setIsShow] = useState<boolean>(true);

  /* lottie animation */
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const mustSplashPathName = ["/"];
    if (mustSplashPathName.includes(window.location.pathname)) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }

    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, []);

  return isShow ? (
    <Root>
      <LeftTemplate />
      <RightTemplate>
        <SplashBg>
          <SplashLogo>
            <div style={{ top: "-60%", left: "-41%", position: "absolute" }}>
              <Lottie options={defaultOptions} height={600} width={600} />
            </div>
            <img src="/images/logo.svg" alt="logo" />
          </SplashLogo>
        </SplashBg>
      </RightTemplate>
    </Root>
  ) : (
    <></>
  );
}
export default Splash;

const SplashBg = styled.div`
  width: 100%;
  max-width: 475px;
  height: 100vh;
  padding: 0 auto;
  background-color: ${(props) => props.theme.colorTheme.main};
`;
const SplashLogo = styled.div`
  width: 290px;
  height: 290px;
  margin: 0 auto;
  top: 25%;
  left: -7%;
  position: relative;
  display: flex;

  img {
    width: 10rem;
    top: 80%;
    left: 34%;
    position: absolute;
  }
`;

const Root = styled.div`
  width: 100vw;
  //width: 915px;
  /* margin-top: 200px; */
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
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
  &::-webkit-scrollbar {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: none;
  }
`;
//left
const LeftTemplate = styled.div`
  width: 475px;
  min-height: 650px;
  border: soild 1px black;
  background-color: white;

  @media screen and (max-width: 915px) {
    display: none;
  }
`;
//right
const RightTemplate = styled.div`
  //background-color: teal;
  width: 475px;
  //height: 500px;
  min-width: 375px;
  position: relative;

  @media screen and (min-width: 915px) {
    max-width: 475px;
    //margin-left: -17.5px;
  }
`;
