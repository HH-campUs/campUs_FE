import React, { useState } from "react";
import styled from "styled-components";
import { usePostsApi } from "../APIs/postsApi";
import { IPickedCamp } from "../interfaces/Posts";
import { InfoToast } from "./Toast/Toast";

export default function MyPickDelete({ pick }: { pick: IPickedCamp }) {
  const campick = usePostsApi.useCampingPicked();
  const [toastState, setToastState] = useState(false);

  const unpick = (campId: number) => {
    campick.mutate(campId);
    window.alert("찜하기삭제");
    // setToastState(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <Delete
        src="/images/mypage/deletewhite.svg"
        onClick={() => {
          unpick(pick.campId);
        }}
        style={{ width: "32px", height: "32px" }}
      />
      <CampImg>
        <img src={pick.ImageUrl} alt="img" />
      </CampImg>
    </div>
  );
}

const CampImg = styled.div`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.pixelToRem(8)};

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: ${(props) => props.theme.pixelToRem(8)};
  }
`;

const Toast = styled.div`
  margin-left: 50px;
`;

const Delete = styled.img`
  /* position: relative; */
  position: absolute;
  right: 0;
  /* transform: translateX(900%); */

  /* margin-right: 25px; */
  cursor: pointer;
  /* background-color: red; */
  /* margin-top: 10px; */
`;
