import { useSetRecoilState } from "recoil";

import { isToast, isToast2 } from "../store/toastAtom";
import { getCamperToken } from "../instance/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ICampingPicked } from "../interfaces/Posts";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";
import { instance } from "../instance/instance";

export default function ResultBookmark({ camp }: { camp: IGetCampResult }) {
  const setToastState = useSetRecoilState(isToast);
  const setToastState2 = useSetRecoilState(isToast2);

  const isLogin = getCamperToken();

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
    if (!isLogin) return setToastState(true);
    else {
      setToastState(true);
    }
  };

  const unpick = (campId: number) => {
    pickMutate.mutate(campId);
    setToastState2(true);
  };

  //onclick한번 / icon 3항.
  return (
    <>
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
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const BookmarkBorderIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CampImgBox = styled.div`
  z-index: 1;
`;
