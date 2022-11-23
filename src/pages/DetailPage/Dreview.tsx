import React from "react";
import styled from "styled-components";

function Dreview() {
  return (
    <Wrapper>
      <ReviewBox>
        <ReviewText>전체리뷰</ReviewText>
        <ReviewNum>123</ReviewNum>
        <ReviewIcon>
          <img src="/images/icon-review2.svg" />
        </ReviewIcon>
      </ReviewBox>
    </Wrapper>
  );
}

export default Dreview;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 50px;
  height: 500px;
`;

const ReviewBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-weight: bolder;
  justify-content: space-between;
  /* background-color: red; */
`;

const ReviewText = styled.div`
  font-size: 1.3rem;
`;

const ReviewNum = styled.div`
  color: #024873;
  font-size: 1rem;
  position: absolute;
  margin-left: 75px;
`;

const ReviewIcon = styled.div`
  margin-right: 30px;
  /* background-color: aliceblue; */
`;
