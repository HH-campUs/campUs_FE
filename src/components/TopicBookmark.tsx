import React, { useState } from "react";
import { usePostsApi } from "../APIs/postsApi";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ICampingPicked } from "../interfaces/Posts";
import { instance } from "../instance/instance";

export default function TopicMap({ Camp }: { Camp: IGetCampResult }) {
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
    window.alert("찜하기 완료");
    console.log("좋아요", Camp.status);
  };

  const unpick = (campId: number) => {
    pickMutate.mutate(campId);
    window.alert("찜하기 취소");
  };

  return (
    <>
      {Camp.status ? (
        <CampImgBox>
          <BookmarkBorderIcon
            onClick={() => {
              unpick(Camp.campId);
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
            onClick={() => {
              pick(Camp.campId);
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
  cursor: pointer;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CampImgBox = styled.div``;
