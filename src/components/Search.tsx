import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import Datepicker from "./Datepicker";
import { isProps, searchData } from "../interfaces/inSearch";

function Search({ isActive, setIsActive }: isProps) {
  const [inputValue, setInputValue] = useState<searchData>({
    selectInput: "",
    selectDate: "",
    selectLocation: "",
  });

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
    `;
    return () => {
      const sY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(sY || "0", 10) * -1);
    };
  }, []);

  const { selectInput, selectDate, selectLocation } = inputValue;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  /* SearchModal 작동 boolean  default: false */
  const ModalHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <SearchModal style={{ transition: "all 0.5s ease-in" }}>
      {isActive ? (
        <Container>
          {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
          <ModalBg onClick={ModalHandler} />
          <SearchModal
            className="isActive"
            style={{ transition: "all 0.5s ease-in-out" }}>
            <SearchLabel htmlFor="search">
              <BiSearchAlt size="20" style={{ display: "inline-block" }} />
            </SearchLabel>
            <SearchBox id="search" placeholder="Search" onChange={onChange} />
            <Datepicker />
            <BtnContainer>
              <ResetBtn onClick={ModalHandler}> Reset </ResetBtn>
              <SearchBtn to="/Result"> Search </SearchBtn>
            </BtnContainer>
          </SearchModal>
        </Container>
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  transition: all 0.5s ease-in-out;
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
`;

const SearchModal = styled.div`
  margin: 10px auto;
  width: 370px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-content: center;
  transition: all 0.5s ease-out;

  z-index: 100;

  &.isNotActive {
    height: 35px;
    padding: 5px;
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
    position: fixed;
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
  top: 102px;
  background: transparent;
  border: none;
  justify-content: space-between;
  position: relative;
  display: flex;
`;

const ResetBtn = styled.button`
  width: 130px;
  height: 43px;
  font-size: 1rem;
  background-color: #8d8d8d;
  border-radius: 13px;
`;

const SearchBtn = styled(Link)`
  width: 130px;
  height: 43px;
  font-size: 1rem;
  text-align: center;
  background-color: #8d8d8d;
  border-radius: 13px;

  :active {
    background-color: #3b3b3b;
  }
`;
