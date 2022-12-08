import React, { useState } from "react";
import { usePostsApi } from "../APIs/postsApi";

//css
import styled from "styled-components";
import { IGetCampResult } from "../interfaces/get";

export default function TopicMap({ Camp }: { Camp: IGetCampResult }) {
  const [bookmarking, setBookMarking] = useState(false);
  const campick = usePostsApi.useCampingPicked();
  console.log("장용호", campick.data?.data);

  // console.log(data);
  const pick = (campId: number) => {
    campick.mutate(campId);
    window.alert("찜하기 완료");
    setBookMarking((prev) => !prev);
  };

  const unpick = (campId: number) => {
    campick.mutate(campId);
    window.alert("찜하기 취소");
    setBookMarking((prev) => !prev);
  };

  //onclick한번 / icon 3항.
  return (
    <>
      {bookmarking ? (
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
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CampImgBox = styled.div``;
