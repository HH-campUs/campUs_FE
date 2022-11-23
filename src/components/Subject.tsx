import React from "react";
import styled from "styled-components";
import Carousel from "./Carousel";

export default function Subject() {
  return (
    <Wrapper>
      <TextBox>주제별</TextBox>
      {/* 캐루셀 별로 사이즈가 필요한 것 같은데 조정안되나? */}
      <Carousel />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 10px 20px 10px;
  font-weight: 500; //temporary
`;

const TextBox = styled.div`
  margin-bottom: 10px;
`;
