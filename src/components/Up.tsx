import React from "react";
import styled from "styled-components";

function Up() {
  const toZero = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <FloatingBtn onClick={toZero}>
      <UpArrow src="/images/uparrow.svg" />
    </FloatingBtn>
  );
}

export default Up;

const FloatingBtn = styled.button`
  position: fixed;
  right: ${(props) => props.theme.pixelToRem(45)};
  bottom: 100px;
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: white;
  cursor: pointer;
  z-index: 1;
  border: 1px solid #eee;
`;

const UpArrow = styled.img``;
