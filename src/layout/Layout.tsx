import React from "react";
import Lottie from "react-lottie";
import pcLottie from "../style/pcLottie.json";
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
  /* height: 100vh; */
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`;
//left
const LeftTemplate = styled.div`
  width: 475px;
  min-height: 650px;
  background-color: transparent;

  @media screen and (max-width: 915px) {
    display: none;
    //margin-left: -17.5px;
  }
`;

const SplashLogo = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  height: inherit;
  margin-top: 200px;
  display: flex;
`;
//right
/* 반응형 - max-width: 475px, min-width: 375px */
const RightTemplate = styled.div`
  //background-color: teal;
  width: ${(props) => props.theme.pixelToRem(475)};
  //height: 500px;
  min-width: ${(props) => props.theme.pixelToRem(375)};

  @media screen and (min-width: ${(props) => props.theme.pixelToRem(915)}) {
    max-width: ${(props) => props.theme.pixelToRem(475)};
    //margin-left: -17.5px;
  }
`;
