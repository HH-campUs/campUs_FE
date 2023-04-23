import React from "react";
import styled from "styled-components";

export const Loading = () => {
  return (
    <Background>
      <LoadingText></LoadingText>
      <img src="/assets/spinner.gif" alt="Spinner" width="200" height="200" />
    </Background>
  );
};

const Background = styled.div`
  margin-top: 30px;
  position: absolute;
  width: 100%;
  background: #ffffffb7;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
