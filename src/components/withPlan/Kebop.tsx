import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { usePostsApi } from "../../APIs/postsApi";

import { IGetTravelPlan } from "../../interfaces/MyPage";
import { semiOpenProps } from "../../interfaces/props";
import PlanUpdate from "../../components/withPlan/PlanUpdate";
import { updateState } from "../../store/profileAtoms";
import { InfoToast } from "../../components/Toast/Toast";


function Kebop({ tripId }: any) {
  const [toastState, setToastState] = useState(false);

  const [openMore, setOpenMore] = useState(false);
  const [isPlan, setIsPlan] = useState(false);

  const deleteId = usePostsApi.useDeleteTravelPlan();
  console.log(tripId);
  const updatePlan = () => {
    setOpenMore(false);
    setIsPlan(true);
  };
  const unPlan = () => {
    alert(`${tripId} 번이 지워졌습니다.`);
    deleteId.mutate(tripId);
    setToastState(true);
    setOpenMore(false);
    console.log(tripId);
  };
  return (
    <>
      {toastState == true ? (
        <InfoToast
          text={"여행일정가 삭제되었어요."}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}
      {isPlan == false ? null : (
        <PlanUpdate isPlan={isPlan} setIsPlan={setIsPlan} tripId={tripId} />
      )}
      <img
        src="/images/icon-more.svg"
        alt="more"
        style={{
          width: "6%",
          height: "40px",
          marginTop: "2px",
          left: "93%",
          position: "relative",
        }}
        onClick={() => setOpenMore(!openMore)}
      />
      {openMore == true ? (
        <>
          <BtnContainer />
          <PatchBtn onClick={updatePlan}>수정하기</PatchBtn>
          <DeleteBtn onClick={unPlan}>삭제</DeleteBtn>
        </>
      ) : null}
    </>
  );
}

export default Kebop;

const BtnContainer = styled.div`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(87)};
  flex-grow: 0;
  margin-top: 30px;
  left: 72%;
  border: none;
  box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  position: absolute;
  z-index: 20;
`;

const PatchBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(47)};
  flex-grow: 0;
  margin-top: 30px;
  padding-right: 10px;
  left: 72%;
  ${(props) => props.theme.fontTheme.Caption1};
  color: ${(props) => props.theme.colorTheme.text2};
  border: none;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  text-align: right;
  //box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.18);
  background-color: #fff;
  position: absolute;
  z-index: 31;
`;

const DeleteBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(47)};
  flex-grow: 0;
  margin-top: 70px;
  padding-right: 10px;
  left: 72%;
  ${(props) => props.theme.fontTheme.Caption1};
  color: ${(props) => props.theme.colorTheme.text2};
  border: none;
  border-radius: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  text-align: right;

  //box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.18);
  background-color: #fff;
  position: absolute;
  z-index: 30;
`;
