import React from "react";
import styled from "styled-components";

//template widht = 915px.
//큰도화지
const Root = styled.div`
  position: relative;
  z-index: 0;
  box-sizing: border-box;
`;
//레프트
const LeftTemplate = styled.div`
  width: 440px;
  height: 1000px;
  margin-left: -457.5px;
  background-color: black;
`;
//라이트
const RightContainer = styled.div`
  @media screen and (min-width: 915px) {
    max-width: 475px;
    height: 1000px;
    margin-left: -17.5px;
  }
  @media screen and (min-width: 475px) {
    max-width: 475px;
    left: 50%;
    margin-left: 437.5px;
  }
`;

export default function Layout(props: any) {
  return (
    <Root>
      <LeftTemplate />
      <RightContainer />
    </Root>
  );
}
