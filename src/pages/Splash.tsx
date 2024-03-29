import { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import lottie from "../style/lottie.json";

function Splash() {
  const [isShow, setIsShow] = useState<boolean>(true);

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
      document.body.style.overflow = "unset";
    }, 2500);
  }, []);

  return isShow ? (
    <Root>
      <LeftTemplate />
      <RightTemplate>
        <SplashBg>
          <SplashLogo>
            <div style={{ top: "-10%", left: "10%", position: "absolute" }}>
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
            <img src="/images/mypage/campUs logo-white.svg" alt="logo" />
          </SplashLogo>
          <SpanBottom>모바일 환경 사용을 권장합니다. </SpanBottom>
        </SplashBg>
      </RightTemplate>
    </Root>
  ) : (
    <></>
  );
}
export default Splash;

/* splash background */
const SplashBg = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pixelToRem(475)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: 100vh;
  padding: 0 auto;
  background-color: ${(props) => props.theme.colorTheme.main};
  position: fixed;
  overflow: hidden;
`;

/* lottie & campUs logo */
const SplashLogo = styled.div`
  width: ${(props) => props.theme.pixelToRem(290)};
  height: ${(props) => props.theme.pixelToRem(290)};
  margin: 0 auto;
  top: 25%;
  left: -7%;
  position: relative;
  display: flex;

  img {
    width: ${(props) => props.theme.pixelToRem(90)};
    top: 70%;
    left: 46%;
    position: absolute;
  }
`;

const SpanBottom = styled.div`
  top: 86%;
  left: 32.7%;
  font-size: ${(props) => props.theme.pixelToRem(13)};
  font-weight: regular;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  position: absolute;
`;

const Root = styled.div`
  width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #e2e7eb;
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
  width: ${(props) => props.theme.pixelToRem(475)};
  min-height: 650px;
  border: soild 1px black;

  @media screen and (max-width: 915px) {
    display: none;
  }
`;

//right
const RightTemplate = styled.div`
  width: 475px;
  min-width: 375px;
  position: relative;

  @media screen and (min-width: 915px) {
    max-width: 475px;
  }
`;
