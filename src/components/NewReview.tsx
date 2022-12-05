import React from "react";
import styled from "styled-components";

export default function NewReview() {
  return (
    <Wrapper>
      <Title>새로 올라온 리뷰</Title>
      <MainBox></MainBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 20px;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(20)};
  font-weight: 600;
  color: #333;
`;

const MainBox = styled.div`
  margin-left: 20px;
  margin-top: 18px;
  width: ${(props) => props.theme.pixelToRem(288)};
  height: ${(props) => props.theme.pixelToRem(256)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
`;
