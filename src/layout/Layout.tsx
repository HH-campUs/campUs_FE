import React from "react";
import styled from "styled-components";

export default function Layout(props: any) {
  return (
    <Root>
      <LeftTemplate />
      <RightTemplate children={props.children} />
    </Root>
  );
}

//Root template width = 915px.
const Root = styled.div`
  width: 100%;
  //width: 915px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`;
//left
const LeftTemplate = styled.div`
  width: 440px;
  min-height: 650px;
  border: soild 1px black;
  background-color: grey;

  @media screen and (max-width: 915px) {
    display: none;
    //margin-left: -17.5px;
  }
`;
//right
const RightTemplate = styled.div`
  //background-color: teal;
  width: 475px;
  //height: 500px;
  max-width: 475px;
  border: 0.5px solid whitesmoke;

  @media screen and (min-width: 915px) {
    max-width: 475px;
    //margin-left: -17.5px;
  }
  // @media screen and (min-width: 475px) {
  //left: 50%;
  // margin-left: -237.5px;
  //   max-width: 475px;
  // background-color: blue;
  //}
`;
