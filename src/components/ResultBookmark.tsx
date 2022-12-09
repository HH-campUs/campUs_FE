import React, { useState } from "react";
import { usePostsApi } from "../APIs/postsApi";
import { getCamperToken } from "../instance/cookies";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";
import { InfoToast, NoIdPickToast, NavToast } from "../components/Toast/Toast";

import { ToastProps } from "../interfaces/props";

export default function ResultBookmark({ camp }: { camp: IGetCampResult }) {
  const [toastState, setToastState] = useState(false);

  const campick = usePostsApi.useCampingPicked();

  const pick = (campId: number) => {
    campick.mutate(campId);
    /* window.alert("찜하기 완료"); */
    setToastState(true);
  };

  const unpick = (campId: number) => {
    campick.mutate(campId);
    /* window.alert("찜하기 취소"); */
  };

  const isLogin = getCamperToken();

  //onclick한번 / icon 3항.
  return (
    <>
      {isLogin == true ? (
        <NoIdPickToast
          text={"로그인 후 찜하기가 가능해요."}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : toastState == true ? (
        <NavToast
          text={"찜목록에 추가되었어요."}
          url={"/mypage/mypick"}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}
      {camp.status ? (
        <CampImgBox>
          <BookmarkBorderIcon
            onClick={(e) => {
              e.stopPropagation();
              unpick(camp.campId);
            }}>
            <img
              src="/images/picked2.svg"
              alt="Bookmarked"
              style={{ width: "36px", height: "36px" }}
            />
          </BookmarkBorderIcon>
        </CampImgBox>
      ) : (
        <CampImgBox>
          <Bookmark
            onClick={(e) => {
              e.stopPropagation();
              pick(camp.campId);
            }}>
            <img
              src="/images/pick1.svg"
              alt="Bookmark"
              style={{ width: "36px", height: "36px" }}
            />
          </Bookmark>
        </CampImgBox>
      )}
    </>
  );
}

const Bookmark = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CampImgBox = styled.div`
  z-index: 1;
`;
