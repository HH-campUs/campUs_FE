import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { IPickedCamp } from "../interfaces/Posts";

import { ICampingPicked } from "../interfaces/Posts";
import { instance } from "../instance/instance";

export default function MyPickDelete({ pick }: { pick: IPickedCamp }) {
  const queryClient = useQueryClient();
  const mutateFn = async (payload: ICampingPicked) => {
    const { data } = await instance.put(`/camps/${payload}/pick`);
    return data;
  };

  const pickMutate = useMutation(mutateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("찜하기 실패했습니다."),
  });

  const unpick = (campId: number) => {
    pickMutate.mutate(campId);
    window.alert("찜하기삭제");
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

const Delete = styled.img`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
