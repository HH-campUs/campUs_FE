import Lottie from "react-lottie";
import pcLottie from "../style/lottie.json";
import styled from "styled-components";
import Footer from "./Footer";

export default function Layout(props: any) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pcLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Root>
      <LeftTemplate>
        <SplashLogo>
          <Lottie options={defaultOptions} height={300} width={300} />
          <img src="/images/img-campUs-logo-navy.svg" alt="logo" />
          <SpanBottom>
            {" "}
            캠프어스는 <br></br> 모바일 환경에 최적화되어있습니다.{" "}
          </SpanBottom>
        </SplashLogo>
      </LeftTemplate>
      <RightTemplate>
        <div style={{ marginBottom: "40px" }}>{props.children}</div>
        <Footer />
      </RightTemplate>
    </Root>
  );
}

//Root template width = 915px.
//스크롤 땡겨지는거 막기

const Root = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #e2e7eb;
`;

//left
const LeftTemplate = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  min-height: 650px;
  background-color: transparent;

  @media screen and (max-width: 915px) {
    display: none;
  }
`;

const SplashLogo = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  height: inherit;
  margin-top: 20px;
  left: -4%;
  position: absolute;
  display: flex;
  img {
    width: ${(props) => props.theme.pixelToRem(140)};
    top: 82%;
    left: 36%;
    position: absolute;
  }
`;
const SpanBottom = styled.div`
  top: 100%;
  left: 36%;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  font-weight: regular;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colorTheme.primary1};
  position: absolute;
  display: flex;
`;

//right
/* 반응형 - max-width: 475px, min-width: 375px */
const RightTemplate = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  background-color: #ffffff;

  @media screen and (min-width: ${(props) => props.theme.pixelToRem(915)}) {
    max-width: ${(props) => props.theme.pixelToRem(475)};
  }
`;
