import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useMyPageApi } from "../../APIs/myPageApi";
import { instance } from "../../instance/instance";

import { IGetMyReview } from "../../interfaces/MyPage";

export default function MyReviewUpdate({ review }: { review: IGetMyReview }) {
  const [openRevised, setOpenRevised] = useState(false);
  const [update, SetUpdate] = useState(false);
  const [reviewComment, setReviewComment] = useState(review.reviewComment);
  const [previewImage, setPreviewImage] = useState([]);
  console.log(review.reviewImg);
  console.time();

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

  //input입력
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewComment(event.target.value);
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
      reviewDelete.mutate(review.reviewId);
      window.alert("삭제되었습니다");
    }
  };

  //수정하기. reviewId , reviewImg, reviewComment, likeStatus(x) - body값
  const updateFn = async (reviewId: number) => {
    const { data } = await instance.put(`/reviews/${reviewId}`, {
      // payload.reviewComment
    });
    return data;
  };

  const reviewUpdate = useMutation(updateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("수정에 실패했습니다."),
  });

  const updateReview = () => {
    if (window.confirm("수정 하시겠습니까?") === true) {
      // reviewUpdate.mutate(reviewId);
    }
  };

  return (
    <>
      {update ? (
        <UpdateContainer>
          <UpdateBox>
            <TitleBox>
              <Title>리뷰 수정하기</Title>
              <CloseBtn
                src="/images/closeBtn.svg"
                alt="close"
                onClick={closeUpdate}
              />
            </TitleBox>
            <ContentBox>
              <ReviewText>
                <input
                  onChange={onChangeHandler}
                  type="text"
                  value={reviewComment}
                />
              </ReviewText>
              <ReviewImg>
                <ImgFlex>
                  {review.reviewImg
                    .toString()
                    .split(",")
                    .map((image: string, i: number) => (
                      <ImgBox>
                        {review.reviewImg ? (
                          <img src={image} alt="" key={i} />
                        ) : null}
                      </ImgBox>
                    ))}
                </ImgFlex>
              </ReviewImg>
            </ContentBox>
          </UpdateBox>
        </UpdateContainer>
      ) : null}
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
    </>
  );
}

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

const slideIn = keyframes`
  from {bottom: -300px; opacity: 0} 
    to {bottom: 0; opacity: 1}
`;

const UpdateContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: blue; */
  background-color: rgba(0, 0, 0, 0.55);
  /* backdrop-filter: blur(3px); */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const UpdateBox = styled.div`
  width: 80%;
  height: 350px;
  border: 1px solid #666;
  background-color: #f8f8f8;
  border-radius: 8px;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  animation: ${slideIn};
  animation-duration: 0.7s;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 25%;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  ${(props) => props.theme.pixelToRem(22)};
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(25)};
  height: ${(props) => props.theme.pixelToRem(25)};
  cursor: pointer;
`;

const ContentBox = styled.div`
  width: 80%;
  height: 250px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const ReviewText = styled.div``;

const ReviewImg = styled.div``;

const ImgFlex = styled.div`
  margin-top: 14px;
  margin-left: 20px;
  width: ${(props) => props.theme.pixelToRem(77)};
  height: ${(props) => props.theme.pixelToRem(84)};
  display: flex;
`;

const ImgBox = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};

  img {
    width: ${(props) => props.theme.pixelToRem(77)};
    height: ${(props) => props.theme.pixelToRem(84)};
    aspect-ratio: 1/1;
    /* border: 1px solid lightgray; */
  }
`;
