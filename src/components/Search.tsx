import React, { useState, useEffect, useRef, MouseEvent } from "react";
import axios from "axios";
import styled from "styled-components";

/* Search Modal 작동 여부 default = "false" */

function Search() {
  /* SearchModal 작동 boolean */
  const [isActive, setIsActive] = useState(false);
  const ModalHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {isActive == false ? (
        <SearchModal_isNotActive
          onClick={ModalHandler}
          style={{ transition: "height ease-in-out 0.5s" }}>
          <span> Search </span>
        </SearchModal_isNotActive>
      ) : (
        <SearchModal_isActive> </SearchModal_isActive>
      )}
    </>
  );
}

export default Search;

const ModalBlur = styled.div`
  width: 100vh;
  height: 100vh;
  background-color: #00000067;
`;

const SearchModal = styled.div`
  width: 335px;
  background-color: #ebebeb;
  border-radius: 13px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  justify-content: center;
  align-items: center;
`;

const SearchModal_isNotActive = styled(SearchModal)`
  width: 335px;
  height: 55px;
  //padding: 5px;
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
