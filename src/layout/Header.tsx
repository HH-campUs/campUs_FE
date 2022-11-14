import React from "react";
import styled from "styled-components";

export default function Header() {
  return <Wrapper>campUs</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //position: relative;
  //z-index: 10010;
  padding: 14px 0px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 475px;
  height: 55px;

  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-position: center center;
`;
