import React, { useState, useEffect, useRef, MouseEvent } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

interface isProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Search Modal 작동 여부 default = "false" */

function Search({ isActive, setIsActive }: isProps) {
  /* SearchModal 작동 boolean */
  const ModalHandler = () => {
    setIsActive(!isActive);
  };

  return <SearchModal></SearchModal>;
}

export default Search;

const SearchModal = styled.div`
  width: 335px;
  height: 55px;
  background-color: #ebebeb;
  border-radius: 13px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;

  span {
    font-size: 16px;
    color: #797979;
    margin-left: 40px;
  }

  &_isNotActive {
    height: 55px;
  }

  &_isActive {
    height: 567px;
  }
`;

const SearchModal_isNotActive = styled(SearchModal)`
  width: 335px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
    color: #797979;
    margin-left: 40px;
    // display: flex;
  }
`;

const SearchModal_isActive = styled(SearchModal)`
  width: 335px;
  height: 567px;
  background-color: #ebebeb;
`;
