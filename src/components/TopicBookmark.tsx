import React, { useState } from "react";
import { usePostsApi } from "../APIs/postsApi";
import { useRecoilState } from "recoil";
import { isToast, isToast2 } from "../store/toastAtom";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ICampingPicked } from "../interfaces/Posts";
import { instance } from "../instance/instance";

export default function TopicMap({ Camp }: { Camp: IGetCampResult }) {
  /* toast State */
  const [toastState, setToastState] = useRecoilState(isToast);
  const [toastState2, setToastState2] = useRecoilState(isToast2);

  //찜하기 query
  const queryClient = useQueryClient();
  const mutateFn = async (payload: ICampingPicked) => {
    const { data } = await instance.put(`/camps/${payload}/pick`);
    return data;
  };

  const pickMutate = useMutation(mutateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("찜하기 실패했습니다."),
  });

  const pick = (campId: number) => {
    pickMutate.mutate(campId);
    setToastState(true);
    console.log("좋아요", Camp.status);
  };

  const unpick = (campId: number) => {
    pickMutate.mutate(campId);
    setToastState2(true);
  };

  //onclick한번 / icon 3항.
  return (
    <>
      {Camp.status ? (
        <CampImgBox>
          <BookmarkBorderIcon
            onClick={() => {
              unpick(Camp.campId);
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
            onClick={() => {
              pick(Camp.campId);
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

const CampImgBox = styled.div``;
