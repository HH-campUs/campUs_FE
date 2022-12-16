import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { useMyPageApi } from "../../APIs/myPageApi";
import { instance, postInstance } from "../../instance/instance";

import { IReviewPosts } from "../../interfaces/Posts";

import { IGetMyReview } from "../../interfaces/MyPage";
import { IEditReviewPosts } from "../../interfaces/Posts";
import { useNavigate } from "react-router-dom";

export default function MyReviewUpdate({
  review,
  openUpdate,
  closeUpdate,
}: {
  review: IGetMyReview;
  openUpdate: () => void;
  closeUpdate: () => void;
}) {
  const [reviewComment, setReviewComment] = useState(review?.reviewComment);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<(File | string)[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    if (review?.reviewImg.length > 0) {
      console.log("review", review?.reviewImg);
      setImagePreview(review?.reviewImg.split(","));
      setImageFiles(review?.reviewImg.split(","));
    }
  }, []);

  // useEffect(() => {
  //   if (imagePreview.length === 0) return;
  //   if (imagePreview.length > 3) {
  //     window.alert("이미지는 3장까지 첨부가능합니다.");
  //     setImagePreview((prev) => prev.slice(0, 3));
  //     setImageFiles((prev: File[]) => prev.slice(0, 3));
  //   }
  // }, [imagePreview]);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewPosts>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    console.log("이미지리스트", imageLists);
    if (!imageLists) return;

    for (let i = 0; i < imageLists.length; i++) {
      setImageFiles((prev) => [...prev, imageLists[i]]);
    }

    for (let i = 0; i < imageLists?.length; i++) {
      const blobImage = URL.createObjectURL(imageLists[i]);
      setImagePreview((prev) => [...prev, blobImage]);
    }
  };

  const complete = () => {
    navigation("/mypage/myreview");
    closeUpdate();
  };

  const handleValid = (data: IReviewPosts) => {
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("reviewImg", imageFiles[i]);
    }
    const body = {
      reviewImg: formData,
      reviewComment: data.reviewComment,
      reviewId: review?.reviewId,
    };
    reviewUpdate.mutate(body);
    complete();
  };

  //*토스트
  // // setToastState(true);
  // const timer = setTimeout(() => {
  //   navigate(-1);
  // }, 1530);

  // return () => {
  // clearTimeout(timer);
  // };

  //수정하기. reviewId , reviewImg, reviewComment, likeStatus(x) - body값
  const updateFn = async (payload: IEditReviewPosts) => {
    const fd = payload.reviewImg;
    fd?.append("reviewComment", payload.reviewComment);
    const { data } = await postInstance.put(`/reviews/${payload.reviewId}`, fd);
    return data;
  };
  const queryClient = useQueryClient();

  const reviewUpdate = useMutation(updateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("수정에 실패했습니다."),
  });

  const handleDeleteImage = useCallback(
    (idx: number) => () => {
      setImagePreview((prev) => prev.filter((_, index) => index !== idx));
      setImageFiles((prev) =>
        Array.from(prev).filter(
          (_: string | File, index: number) => index !== idx
        )
      );
    },
    []
  );

  return (
    <>
      <UpdateContainer>
        <UpdateBox>
          <TitleBox>
            <Title>리뷰 수정</Title>
            <CloseBtn
              src="/images/closeBtn.svg"
              alt="close"
              onClick={closeUpdate}
            />
          </TitleBox>
          <MinMax>
            <p style={{ color: "#5185A6" }}>최소 10자 | 최대 80자</p>
          </MinMax>
          <ContentBox>
            <ReviewForm onSubmit={handleSubmit(handleValid)}>
              <StTextArea
                {...register("reviewComment", {
                  required: "리뷰를 작성해주세요.",
                  minLength: {
                    value: 10,
                    message: "10자 이상 작성해주세요.",
                  },
                  maxLength: {
                    value: 80,
                    message: "80자 이하로 작성해주세요.",
                  },
                })}
                defaultValue={review.reviewComment}
              />

              <Error>{errors.reviewComment?.message}</Error>
              <ImgList>
                <Upload>
                  <img src="/images/review/camera.svg" alt="camera" />
                  <span>사진업로드</span>
                  <ImgInput
                    type="file"
                    multiple
                    accept="image/*"
                    Content-Type="multipart/form-data"
                    onChange={onChange}
                  />
                </Upload>
                {imagePreview &&
                  imagePreview?.map((image: string, i: number) => (
                    <Images key={i}>
                      <img src={image} alt="img" />
                      <XIcon>
                        <img
                          src="/images/mypage/closeimage.svg"
                          alt="xicon"
                          onClick={handleDeleteImage(i)}
                        />
                      </XIcon>
                    </Images>
                  ))}
              </ImgList>

              <CancleBtn onClick={closeUpdate}>취소</CancleBtn>
              <StBtn>리뷰 남기기</StBtn>
            </ReviewForm>
          </ContentBox>
        </UpdateBox>
      </UpdateContainer>
    </>
  );
}

{
  /* <ReviewUpdate>
        <img src="/images/icon-more.svg" alt="more" onClick={revised} />
        {openRevised === true ? (
          <BtnBox>
            <div onClick={openUpdate}>수정하기</div>
            <div onClick={delReview}>삭제</div>
          </BtnBox>
        ) : null}

        <div></div>
      </ReviewUpdate>  */
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
  height: 120vh;
  background-color: rgba(0, 0, 0, 0.55);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
`;

const UpdateBox = styled.div`
  width: 90%;
  height: ${(props) => props.theme.pixelToRem(472)};
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 10px;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  animation: ${slideIn};
  animation-duration: 0.7s;
  position: absolute;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  top: 15%;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(22)};
  color: #222;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(25)};
  height: ${(props) => props.theme.pixelToRem(25)};
  cursor: pointer;
`;

const MinMax = styled.div`
  width: 95%;
  margin-top: 20px;
  text-align: right;
  font-size: ${(props) => props.theme.pixelToRem(12)};
`;

const ContentBox = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(280)};
  border-radius: 10px;
`;

const ReviewText = styled.div``;

const ReviewImg = styled.div``;

//form

const ReviewForm = styled.form`
  width: 90%;
  margin: 0 auto;
`;

const StTextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(198)};
  padding: 14px 16px;
  border: 1px solid lightgray;
  resize: none;
  /* letter-spacing: 0px; */
`;

const Error = styled.div`
  font-size: 0.75rem;
  color: red;
`;

const ImgList = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};
  padding-top: ${(props) => props.theme.pixelToRem(5)};
  /* object-fit: cover; */

  img {
    width: 100%;
    aspect-ratio: 1/1;
    /* border: 1px solid lightgray; */
  }
`;

const ImgInput = styled.input`
  display: none;
`;

const Upload = styled.label`
  cursor: pointer;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1/1;

  img {
    width: 30px;
    height: 30px;
  }

  span {
    /* margin-top: 5px; */
    font-size: ${(props) => props.theme.pixelToRem(12)};
    color: grey;
  }
`;

const Images = styled.div``;

const XIcon = styled.div`
  width: ${(props) => props.theme.pixelToRem(22)};
  position: absolute;
  margin-left: 14%;
  bottom: 145px;
`;

const CancleBtn = styled.button`
  margin-top: 10px;
  width: 38%;
  height: ${(props) => props.theme.pixelToRem(50)};
  border: 0.5px none grey;
  background-color: #adc2ce;
  color: #fff;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  cursor: pointer;
`;

const StBtn = styled.button`
  margin-left: 10px;
  margin-top: 10px;
  width: 58%;
  height: ${(props) => props.theme.pixelToRem(50)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: 0.5px none grey;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #024873;
  color: #fff;
  cursor: pointer;
`;
