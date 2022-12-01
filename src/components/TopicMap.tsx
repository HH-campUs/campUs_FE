import React, { useState } from "react";
import { usePostsApi } from "../APIs/postsApi";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";

export default function TopicMap({ Camp }: { Camp: IGetCampResult }) {
  const [bookmarking, setBookMarking] = useState(false);
  const campick = usePostsApi.useCampingPicked();

  const pick = (campId: number) => {
    campick.mutate(campId);
    console.log(campId);
    window.alert("찜하기 완료");
    setBookMarking((prev) => !prev);
  };

  const unpick = (campId: number) => {
    campick.mutate(campId);
    window.alert("찜하기 취소");
    console.log(campId);
    setBookMarking((prev) => !prev);
  };

  return (
    <>
      {bookmarking ? (
        <CampImgBox>
          <BookmarkBorderIcon
            onClick={() => {
              unpick(Camp.campId);
            }}
          >
            <img src="/images/picked2.svg" alt="Bookmarked" />
          </BookmarkBorderIcon>
        </CampImgBox>
      ) : (
        <CampImgBox>
          <Bookmark
            onClick={() => {
              pick(Camp.campId);
            }}
          >
            <img src="/images/pick1.svg" alt="Bookmark" />
          </Bookmark>
        </CampImgBox>
      )}
    </>
  );
}

const Bookmark = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
`;

const ResultItem = styled.div`
  width: ${(props) => props.theme.pixelToRem(160)};
  height: ${(props) => props.theme.pixelToRem(139)};
  /* font-size: ${(props) => props.theme.pixelToRem(16)}; */
  border-radius: 10px;
`;

const CampImgBox = styled.div``;

const CampImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* display: block; */
  object-fit: cover;
`;
