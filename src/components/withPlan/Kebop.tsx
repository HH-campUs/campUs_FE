import React, { useState } from "react";
import styled from "styled-components";
import { usePostsApi } from "../../APIs/postsApi";

function Kebop({ tripId }: any) {
  const [openMore, setOpenMore] = useState(false);
  const [isPlan, setIsPlan] = useState(true);

  const deleteId = usePostsApi.useDeleteTravelPlan();

  const unPlan = () => {
    deleteId.mutate(tripId);
    setOpenMore(false);
    console.log(tripId);
  };
  return (
    <>
      <img
        src="/images/icon-more.svg"
        alt="more"
        style={{
          width: "6%",
          marginTop: "-52px",
          marginLeft: "328px",
          position: "relative",
        }}
        onClick={() => setOpenMore(!openMore)}
      />
      {openMore == true ? (
        <BtnBox>
          <div onClick={() => setIsPlan(true)}>수정하기</div>
          <div onClick={unPlan}>삭제</div>
        </BtnBox>
      ) : null}
    </>
  );
}

export default Kebop;

const BtnBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(94)};
  flex-grow: 0;
  margin-top: 30px;
  margin-left: 250px;

  border-radius: 10px;
  box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.18);
  background-color: #fff;
  display: flex;
  position: absolute;
  flex-direction: column;

  div {
    width: ${(props) => props.theme.pixelToRem(85)};
    height: ${(props) => props.theme.pixelToRem(47)};
    margin-left: 1px;
    background-color: transparent;
    text-align: right;
    ${(props) => props.theme.fontTheme.Caption1};
    line-height: 1.29;
    letter-spacing: normal;
    color: ${(props) => props.theme.colorTheme.text2};

    &:first-child {
      margin-top: -2px;
      padding-top: 18px;
      padding-right: 15px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    &:last-child {
      margin-top: 3px;
      padding-top: 13px;
      padding-right: 15px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
`;
