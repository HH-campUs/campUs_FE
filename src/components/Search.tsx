import React, { useState, useEffect, useRef, MouseEvent } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { BiSearchAlt } from "react-icons/bi";

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

  return (
    <SearchModal style={{ transition: "all 0.5s ease-in-out" }}>
      {isActive ? (
        /* SearchModal - Active */
        <SearchModal className="isActive">
          <SearchLabel htmlFor="search">
            <BiSearchAlt size="20" style={{ display: "inline-block" }} />
          </SearchLabel>
          <SearchBox id="search" placeholder="Search" />
          <BtnContainer>
            <SearchBtn onClick={ModalHandler}> Reset </SearchBtn>
            <SearchBtn onClick={ModalHandler}> Search </SearchBtn>
          </BtnContainer>
        </SearchModal>
      ) : (
        /* SearchModal - Inactive (default) */
        <SearchModal className="isNotActive" onClick={ModalHandler}>
          <BiSearchAlt size="20" style={{ display: "inline-block" }} />
          <span>search</span>
        </SearchModal>
      )}
    </SearchModal>
  );
}

export default Search;

const SearchModal = styled.div`
  margin: 10px auto;
  width: 335px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;

  &.isNotActive {
    height: 35px;
    padding: 10px;
    font-size: 1rem;
    color: #797979;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isActive {
    height: 567px;
    padding: 10px;
  }
`;
const SearchBox = styled.input`
  width: inherit;
  height: 35px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  justify-content: left;
  display: flex;

  &::placeholder {
    font-size: 1rem;
    color: #797979;
  }

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  width: inherit;
  height: 35px;
  justify-content: left;
  display: flex;
`;

const BtnContainer = styled.button`
  width: 90%;
  height: 10%;
  margin: 0 auto;
  top: 442px;
  background: transparent;
  border: none;
  justify-content: space-between;
  position: relative;
  display: flex;
`;

const SearchBtn = styled.button`
  width: 130px;
  height: 43px;
  font-size: 1rem;
  background-color: #8d8d8d;
  border-radius: 13px;
`;
