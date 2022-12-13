import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { isToast, isToast2 } from "../store/toastAtom";

import { usePostsApi } from "../APIs/postsApi";
import { getCamperToken } from "../instance/cookies";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";
import { InfoToast, NoIdPickToast, NavToast } from "../components/Toast/Toast";

export default function ResultBookmark({ camp }: { camp: IGetCampResult }) {
  const [toastState, setToastState] = useRecoilState(isToast);
  const [toastState2, setToastState2] = useRecoilState(isToast2);

  const campick = usePostsApi.useCampingPicked();

  const pick = (campId: number) => {
    campick.mutate(campId);
    if (!isLogin) return setToastState(true);
    else {
      setToastState(true);
    }
  };

  const unpick = (campId: number) => {
    campick.mutate(campId);
    setToastState2(true);
  };

  const isLogin = getCamperToken();

  //onclick한번 / icon 3항.
  return (
    <>
      {camp.status ? (
        <CampImgBox>
          <BookmarkBorderIcon
            onClick={(e) => {
              e.stopPropagation();
              unpick(camp.campId);
            }}
          >
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
            }}
          >
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
