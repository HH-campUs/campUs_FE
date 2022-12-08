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
  margin-left: 20px;

  span {
    font-size: ${(props) => props.theme.pixelToRem(20)};
    font-weight: 600;
    color: #333;
  }
`;
