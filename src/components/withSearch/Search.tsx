import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import { DateState, ExportDate } from "../../store/dateAtom";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import Datepicker from "./Datepicker";
import Location from "./Location";
import { isProps, searchData } from "../../interfaces/inSearch";

function Search({ isActive, setIsActive }: isProps) {
  const [inputValue, setInputValue] = useState<searchData>({
    selectInput: "",
    selectDate: "",
    selectLocation: "",
  });

  const selectDate = useRecoilValue(ExportDate);

  /*   useEffect(() => {
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
  }, []); */

  const { selectInput, selectLocation } = inputValue;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  /* SearchModal 작동 boolean  default: false */
  const ModalHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const searchHandler = () => {
    console.log(selectDate);
  };

  const resetHandler = () => {};

  return (
    <SearchModal style={{ transition: "all 0.5s ease-in" }}>
      <SearchModal className="isNotActive" onClick={ModalHandler}>
        <BiSearchAlt size="20" style={{ display: "inline-block" }} />
        <span>search</span>
      </SearchModal>

      {isActive && (
        <Container>
          <ModalBg onClick={ModalHandler} />
          {/* 모달창 밖 blur background 토글 기능 부여 (event bubbling 해결) */}
          <SearchModal className="isActive">
            <SearchLabel htmlFor="search">
              <BiSearchAlt size="20" style={{ display: "inline-block" }} />
            </SearchLabel>
            <SearchBox id="search" placeholder="Search" onChange={onChange} />
            <Datepicker />
            <Location />
            <BtnContainer>
              <ResetBtn onClick={searchHandler}> Reset </ResetBtn>
              <SearchBtn to="/Result" onClick={searchHandler}>
                Search
              </SearchBtn>
            </BtnContainer>
          </SearchModal>
        </Container>
      )}
    </SearchModal>
  );
}

export default Search;

const slideIn = keyframes`
  from {bottom: -500px; opacity: 0} 
    to {bottom: 0; opacity: 1}
`;

const slideOut = keyframes`
  from {bottom: 0px; opacity: 1} 
    to {bottom: -500px; opacity: 0}
`;

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}
`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
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
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
`;

const SearchModal = styled.div`
  margin: 10px auto;
  width: 370px;
  background-color: #ebebeb;
  border-radius: 13px;
  justify-content: center;
  align-content: center;
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
    height: 600px;
    left: 10;
    bottom: 0;
    padding: 10px;
    position: fixed;
    z-index: 100;
    overflow: auto;
    animation: ${slideIn};
    animation-duration: 0.7s;
  }
`;

const SearchBox = styled.input`
  width: inherit;
  height: 35px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  position: relative;
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
