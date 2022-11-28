import React from "react";
import styled from "styled-components";
import CarouselSub from "../Hook/CarouselSub";

export default function Subject() {
  return (
    <Wrapper>
      <span>캠핑 제대로 즐기기</span>

      <CarouselSub />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 40px;
  font-weight: 500;
`;
