import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

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
  color: ${(props) => props.theme.textColor};
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-position: center center;
`;

//const RightTemplate = styled.div``;
// const Container = styled.div`
//   @media screen and (min-width: 915px) {
//     max-width: 475px;
//     margin-left: -17.5px;
//   }
//   @media screen and (min-width: 475px) {
//     max-width: 475px;
//     left: 50%;
//     margin-left: 437.5px;
//   }
// `;

export default function Header() {
  return <Wrapper>campUs</Wrapper>;
}
