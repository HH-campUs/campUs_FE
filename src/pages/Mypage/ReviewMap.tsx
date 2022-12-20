import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { instance } from "../../instance/instance";

import { IGetMyReview } from "../../interfaces/MyPage";
import MyReviewUpdate from "./MyReviewUpdate";

import { IGetMyInfo } from "../../interfaces/MyPage";

const ReviewMap = ({
  checkPf,
  myReview,
}: {
  checkPf: IGetMyInfo;
  myReview: IGetMyReview;
}) => {
  const [openRevised, setOpenRevised] = useState(false);
  const [update, SetUpdate] = useState(false);

  //Open modal
  const revised = () => {
    console.log("openRevised", openRevised);
    setOpenRevised((prev) => !prev);
  };

  const openUpdate = () => {
    console.log("update", update);

    SetUpdate((prev) => !prev);
  };

  //Close modal
  const closeUpdate = () => {
    setOpenRevised(false);
    SetUpdate(false);
  };

  //Review 삭제
  const queryClient = useQueryClient();
  const mutateFn = async (reviewId: number) => {
    const { data } = await instance.delete(`/reviews/${reviewId}`);
    return data;
  };

  const reviewDelete = useMutation(mutateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("삭제에 실패했습니다."),
  });

  const delReview = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      reviewDelete.mutate(myReview.reviewId);
      window.alert("삭제되었습니다");
    }
  };
  return (
    <ReviewMapContainer>
      <PfBox>
        <PfImg>
          <img src={checkPf?.profileImg} alt="pfImg" />
        </PfImg>
        <div
          style={{
            flexDirection: "column",
            marginLeft: "6.5px",
            display: "flex",
            width: "100%",
          }}>
          <NickBox>
            <PfNick>{checkPf?.nickname}</PfNick>
            <ReviewUpdate>
              <img src="/images/icon-more.svg" alt="more" onClick={revised} />
              {openRevised === true ? (
                <BtnBox>
                  <div onClick={openUpdate}>수정하기</div>
                  <div onClick={delReview}>삭제</div>
                </BtnBox>
              ) : null}

              <div></div>
            </ReviewUpdate>
            {update && (
              <MyReviewUpdate
                review={myReview}
                openUpdate={openUpdate}
                closeUpdate={closeUpdate}
              />
            )}
          </NickBox>
          <LocaBox>
            <CampLoca>{myReview?.campName} </CampLoca>
            <Date>&nbsp;{myReview?.createdAt.slice(0, 10)}</Date>
          </LocaBox>
        </div>
      </PfBox>
      <ReviewBox>
        <ReviewText>{myReview?.reviewComment}</ReviewText>
      </ReviewBox>
      <ImgFlex>
        {myReview?.reviewImg
          .toString()
          .split(",")
          .map((image: string, i: number) => (
            <ImgBox>
              {myReview?.reviewImg ? <img src={image} alt="" key={i} /> : null}
            </ImgBox>
          ))}
      </ImgFlex>
    </ReviewMapContainer>
  );
};

export default ReviewMap;

const ReviewMapContainer = styled.div`
  margin-top: 16px;
  margin-left: 20px;
  width: 90%;
  height: fit-content;
  max-height: ${(props) => props.theme.pixelToRem(258)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
  background-color: #f8f8f8;
  flex-direction: column;
`;

const PfBox = styled.div`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: 18px 0 0 20px;
  display: flex;
`;

const PfImg = styled.div`
  img {
    width: ${(props) => props.theme.pixelToRem(36.6)};
    height: ${(props) => props.theme.pixelToRem(40)};
    border-radius: ${(props) => props.theme.pixelToRem(20)};
    object-fit: cover;
  }
`;

const NickBox = styled.div`
  margin-top: 3px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const PfNick = styled.div`
  color: #222;
`;

const LocaBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(250)};
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const CampLoca = styled.div``;

const Date = styled.div`
  margin-left: 5px;
`;

const ReviewBox = styled.div`
  width: 87%;
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 15px;
  margin-left: 18px;
  line-height: 1.57;
  word-break: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewText = styled.div`
  width: fit-content;
`;

const ImgFlex = styled.div`
  margin-top: 14px;
  margin-left: 20px;
  width: ${(props) => props.theme.pixelToRem(77)};
  height: ${(props) => props.theme.pixelToRem(84)};
  display: flex;
  margin-bottom: 15px;
`;

const ImgBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};

  img {
    width: ${(props) => props.theme.pixelToRem(77)};
    height: ${(props) => props.theme.pixelToRem(84)};
    aspect-ratio: 1/1;
  }
`;

//modal

const ReviewUpdate = styled.div`
  margin-right: 40px;
  position: relative;
  img {
    cursor: pointer;
  }
`;

const BtnBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(94)};
  flex-grow: 0;
  right: 55%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 10px;
  box-shadow: 4px 4px 15px 0 rgba(0, 0, 0, 0.18);
  background-color: #fff;
  display: flex;
  position: absolute;
  flex-direction: column;
  cursor: pointer;

  div {
    cursor: pointer;
    width: ${(props) => props.theme.pixelToRem(85)};
    height: ${(props) => props.theme.pixelToRem(47)};
    margin-left: 1px;
    background-color: transparent;
    text-align: right;
    ${(props) => props.theme.fontTheme.Caption1};
    line-height: 1.29;
    letter-spacing: normal;
    color: ${(props) => props.theme.colorTheme.text2};

    &:first-child {
      margin-top: -2px;
      padding-top: 18px;
      padding-right: 15px;
    }
    &:last-child {
      margin-top: 3px;
      padding-top: 13px;
      padding-right: 15px;
    }
  }
`;
