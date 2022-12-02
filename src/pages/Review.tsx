import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { usePostsApi } from "../APIs/postsApi";
import { IReviewPosts } from "../interfaces/Posts";

export default function Review() {
  const reviewPost = usePostsApi.usePostReview();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IReviewPosts>();

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<FileList | any>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    //유사배열 -> 배열
    // (prev) => [...prev, ...Array.from(imageLists)]
    if (!imageLists) return;
    setImageFiles(imageLists);
    for (let i = 0; i < imageLists?.length; i++) {
      const blobImage = URL.createObjectURL(imageLists[i]);
      setImagePreview((prev) => [...prev, blobImage]);
    }
    if (imagePreview.length > 3) {
      window.alert("이미지는 3장까지 첨부가능합니다.");
      setImagePreview((prev) => prev.slice(0, 3));
    }
  };
  console.log(imagePreview);

  // e: React.ChangeEvent<HTMLInputElement>
  const handleValid = (data: IReviewPosts) => {
    const body = {
      reviewComment: data.reviewComment,
      reviewImg: imageFiles,
    };
    console.log(body);

    reviewPost.mutate(body);
  };

  return (
    <Wrapper>
      <Head>
        <img src="/images/back.svg" alt="back" style={{ marginLeft: "20px" }} />
        <HeadText>리뷰쓰기</HeadText>
      </Head>
      <ReviewImgBox>
        <img src="" alt="test" style={{ objectFit: "contain" }} />
        <TextBox>
          <Campname>노을공원 가족캠핑장</Campname>
          <CampLocation>충청남도 태안군 남면</CampLocation>
        </TextBox>
      </ReviewImgBox>
      <VisitDay>
        방문일선택
        <p style={{ textDecoration: "underline", marginLeft: "160px" }}>
          2022.19.99
        </p>
        <RightArrow src="/images/review/rightArrow.svg" />
      </VisitDay>
      <Line />
      <RecoBox>
        <Best>
          <ImgDiv>
            <img
              src="/images/review/best.svg"
              alt="best"
              style={{ marginRight: "-15px" }}
            />
            <img
              src="/images/review/emptybest.svg"
              alt="best"
              style={{ position: "relative", top: "-5px" }}
            />
          </ImgDiv>
          <p>최고!추천해요!</p>
        </Best>
        <Best>
          <ImgDiv>
            <img
              src="/images/review/Bethumbsup.svg"
              alt="best"
              style={{ position: "relative", top: "-5px" }}
            />
          </ImgDiv>

          <p>좋았어요!</p>
        </Best>
        <Best>
          <ImgDiv>
            <img src="/images/review/thumbdown.svg" alt="best" />
          </ImgDiv>

          <p>추천하지 않아요</p>
        </Best>
      </RecoBox>
      <ReviewTip>
        <HeadLine>
          <img src="/images/review/annotation-check.svg" alt="check" />
          <div>리뷰 작성 팁</div>
        </HeadLine>
        <Body>
          누구와 여행을 갔나요?<br></br>
          캠핑장과 주번 청결상태는 만족하셨나요?<br></br>
          그외 공용시설, 매너타임, 주차 등은 어땠나요?
        </Body>
      </ReviewTip>
      <WriteHead>
        <p>리뷰 쓰기</p>
        <p style={{ color: "#5185A6" }}>0자 | 최소 20자</p>
      </WriteHead>
      <ReviewForm onSubmit={handleSubmit(handleValid)}>
        <StTextArea
          {...register("reviewComment", {
            required: "리뷰를 작성해주세요.",
            minLength: {
              value: 20,
              message: "20자 이상 작성해주세요.",
            },
          })}
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
          {imagePreview.map((image, id) => (
            <img src={image} alt={`${image}-${id}`} key={id} />
          ))}
        </ImgList>
        <StBtn>리뷰 남기기</StBtn>
      </ReviewForm>
    </Wrapper>
  );
}
{
  /* <Delete onClick={() => handleDeleteImage(id)} /> */
}

const Wrapper = styled.div`
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  margin-right: 45px;
  /* margin-top: 10px; */
`;

const HeadText = styled.div`
  margin: auto;
  font-size: ${(props) => props.theme.pixelToRem(18)};
`;

const ReviewImgBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(170)};
  background-color: black;
  margin-top: 10px;
`;

const TextBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  margin-top: 40px;
`;

const Campname = styled.div`
  /* justify-content: center; */
  font-size: ${(props) => props.theme.pixelToRem(22)};
  color: white;
`;

const CampLocation = styled.div`
  /* justify-content: center; */
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: white;
  margin-top: 10px;
`;

const VisitDay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  margin-top: 20px;
  margin: 20px;
`;

const RightArrow = styled.img`
  margin-top: -3px;
`;

const Line = styled.div`
  border-bottom: 1px solid #eeeeee;
  width: 335px;
  margin: 0 auto;
`;

const RecoBox = styled.div`
  display: flex;
  margin-left: 17.5px;
  margin-top: 40px;
  /* background-color: red; */
  height: 100px;
  display: flex;
`;

const Best = styled.button`
  width: 120px;
  height: 100px;
  border: 0;
  background: none;
  /* background-color: red; */
  flex-direction: column;

  p {
    margin: 10px auto;
    /* padding: auto; */
    font-size: ${(props) => props.theme.pixelToRem(14)};
    color: grey;
    /* margin: auto; */
    /* background-color: red; */
    /* position: relative; */
  }
`;

const ImgDiv = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 62px;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 9px;
`;

// const Good = styled.button`
//   width: 100px;
//   height: 100px;
//   border: 1px solid red;
// `;

// const Bad = styled.button`
//   width: 100px;
//   height: 100px;
//   border: 1px solid red;
// `;

const ReviewTip = styled.div`
  width: 335px;
  height: 124px;
  margin: 40px auto;
  background-color: #f7f8fa;
  border-radius: ${(props) => props.theme.pixelToRem(14)};
`;

const HeadLine = styled.div`
  padding-top: 20px;
  padding-left: 15px;
  align-items: center;
  display: flex;
  color: #5185a6;

  div {
    margin-left: 5px;
  }
`;

const Body = styled.div`
  color: #5185a6;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  line-height: 20px;
  margin-left: 17px;
  margin-top: 5px;
`;

const WriteHead = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  margin-top: 20px;
  margin: 20px;

  p:first-child {
    font-size: ${(props) => props.theme.pixelToRem(18)};
  }

  p:last-child {
    font-size: ${(props) => props.theme.pixelToRem(12)};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ReviewForm = styled.form`
  width: 335px;
  margin: 0 auto;
`;

const StTextArea = styled.textarea`
  width: 335px;
  height: 225px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};
  padding-top: ${(props) => props.theme.pixelToRem(5)};

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

const StBtn = styled.button`
  width: 335px;
  height: 60px;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  border: 0.5px none grey;
  margin-top: 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #024873;
  color: white;
  cursor: pointer;
  margin-bottom: 30px;
`;
