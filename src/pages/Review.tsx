import { getPaginationItemUtilityClass } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { useGetApi } from "../APIs/getApi";
import { usePostsApi } from "../APIs/postsApi";
import { getCamperToken } from "../instance/cookies";
import { IReviewPosts } from "../interfaces/Posts";

export default function Review() {
  const isLogin = getCamperToken();
  //campId확인.
  const loca = useLocation();
  const state = loca.state as { campId: number };
  const { campId } = useParams();

  //useQuery사용.
  const detailItem = useGetApi.useGetCampDetail(state.campId).data;
  const checkItem = detailItem?.detailCamp![0];

  //버튼클릭 색상 변경
  const [bestStatus, setBestStatus] = useState(false);
  const handleBestButton = () => {
    console.log("best?", bestStatus);
    setBestStatus((prev) => !prev);
    setGoodStatus(false);
    setBadStatus(false);
  };

  const [goodStatus, setGoodStatus] = useState(false);
  const handleGoodButton = () => {
    console.log("good?", goodStatus);
    setBestStatus(false);
    setGoodStatus((prev) => !prev);
    setBadStatus(false);
  };

  const [badStatus, setBadStatus] = useState(false);
  const handleBadButton = () => {
    console.log("bad?", badStatus);
    setBestStatus(false);
    setGoodStatus(false);
    setBadStatus((prev) => !prev);
  };

  //추천 data 백 전달.
  const [value, setValue] = useState<string>("");
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();
  const reviewPost = usePostsApi.usePostReview();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewPosts>();

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<FileList | any>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    console.log(imageLists);
    if (!imageLists) return;
    setImageFiles(imageLists);
    for (let i = 0; i < imageLists?.length; i++) {
      const blobImage = URL.createObjectURL(imageLists[i]);
      setImagePreview((prev) => [...prev, blobImage]);
    }
    if (imagePreview.length > 3) {
      console.log("30", imagePreview);
      window.alert("이미지는 3장까지 첨부가능합니다.");
      setImagePreview((prev) => prev.slice(0, 3));
    }
  };

  const handleValid = (data: IReviewPosts) => {
    if (!campId) return;
    const formData = new FormData();
    console.log(imageFiles);
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("reviewImg", imageFiles[i]);
    }
    const body = {
      reviewImg: formData,
      reviewComment: data.reviewComment,
      likeStatus: value,
      campId: campId,
    };
    reviewPost.mutate(body);
  };

  //[1, 최고!추천해요! / 2,좋았어요! / 3,추천하지 않아요]
  return (
    <Wrapper>
      <Head>
        <div>
          <img
            src="/images/back.svg"
            alt="back"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>

        <HeadText>리뷰쓰기</HeadText>
      </Head>
      <TextBox>
        {/* <Campname>{checkItem?.campName}</Campname>
        <CampLocation>{checkItem?.address}</CampLocation> */}
      </TextBox>

      <ReviewImgBox>
        <img
          src={checkItem?.ImageUrl}
          alt="test"
          style={{ objectFit: "cover" }}
        />
      </ReviewImgBox>

      <VisitDay>
        방문일선택
        <p style={{ textDecoration: "underline", marginLeft: "160px" }}>
          2022.19.99
        </p>
        <RightArrow src="/images/review/rightArrow.svg" />
      </VisitDay>
      <Line />
      {/* div */}
      <RecoBox>
        {/* 라벨 */}
        <BestImgDiv isBest={bestStatus}>
          <img
            src="/images/review/emptybest.svg"
            alt="best"
            style={{
              top: "50%",
              transform: "translateY(calc(-50% - 3px)) translateX(3px)",
            }}
          />
          <img
            src="/images/review/best.svg"
            alt="best"
            style={{
              top: "50%",
              transform: "translateY(calc(-50% + 3px)) translateX(-6px)",
            }}
          />
          <BestInput
            type="radio"
            name="reco"
            value="1"
            onChange={radioHandler}
            checked={bestStatus}
            onClick={handleBestButton}
          />
          <BestBtnDiv isBest={bestStatus}>최고!추천해요!</BestBtnDiv>
        </BestImgDiv>

        <GoodImgDiv isGood={goodStatus}>
          <img
            src="/images/review/Bethumbsup.svg"
            alt="best"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <GoodInput
            type="radio"
            name="reco"
            value="2"
            onChange={radioHandler}
            checked={goodStatus}
            onClick={handleGoodButton}
          />
          <GoodBtnDiv isGood={goodStatus}>좋았어요!</GoodBtnDiv>
        </GoodImgDiv>

        <BadImgDiv isBad={badStatus}>
          <img
            src="/images/review/thumbdown.svg"
            alt="best"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <BadInput
            type="radio"
            name="reco"
            value="3"
            onChange={radioHandler}
            checked={badStatus}
            onClick={handleBadButton}
          />
          <BadBtnDiv isBad={badStatus}>추천하지 않아요</BadBtnDiv>
        </BadImgDiv>
      </RecoBox>

      <ReviewTip>
        <HeadLine>
          <img src="/images/review/annotation-check.svg" alt="check" />
          <div>리뷰 작성 팁</div>
        </HeadLine>
        <Body>
          누구와 여행을 갔나요?<br></br>
          캠핑장과 주변 청결상태는 만족하셨나요?<br></br>
          그외 공용시설, 매너타임, 주차 등은 어땠나요?
        </Body>
      </ReviewTip>
      <WriteHead>
        <p>리뷰 쓰기</p>
        <p style={{ color: "#5185A6" }}>최소 20자</p>
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
            <img src={image} alt="reviewImg" key={id} />
          ))}
        </ImgList>
        {/* 여기 toast알람 들어가야함. */}
        {isLogin ? (
          <StBtn>리뷰 남기기</StBtn>
        ) : (
          <StBtn>로그인 후 이용해주세요</StBtn>
        )}
        {/* 여기 toast알람 들어가야함. */}
      </ReviewForm>
    </Wrapper>
  );
}
{
  /* <Delete onClick={() => handleDeleteImage(id)} /> */
}

const Wrapper = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
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
  margin-top: 10px;
  /* align-items: center; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: contrast(55%);

    /* position: relative; */
    /* z-index: 10; */
  }
`;

const TextBox = styled.div`
  background-color: red;
  /* justify-content: center; */
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 55px;

  /* margin-left: 110px; */
`;

const Campname = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(22)};

  color: #fff;
`;

const CampLocation = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};

  color: #fff;
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
  width: ${(props) => props.theme.pixelToRem(335)};
  margin: 0 auto;
`;

const RecoBox = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 15%;
  height: ${(props) => props.theme.pixelToRem(100)};
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
`;

//* recoBtn tap *//
// ${(props) => (props.value == 1 ? "#024873" : "lightgray")};
const BestImgDiv = styled.label<{ isBest: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isBest ? "#024873" : "lightgray")};
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;

  img {
    position: absolute;
  }
`;

const BestInput = styled.input`
  width: ${(props) => props.theme.pixelToRem(120)};
  height: ${(props) => props.theme.pixelToRem(100)};
  border: 0;
  background: none;
  background-color: none;
  display: flex;
  display: none;
  flex-direction: column;
  cursor: pointer;
  :focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const BestBtnDiv = styled.div<{ isBest: Boolean }>`
  /* display: flex; */
  /* width: 250px; */
  margin-top: 100px;

  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isBest ? "#024873" : "lightgray")};
`;

/* ${(props) => (props.isActive ? "#024873" : "lightgray")}; */

const GoodInput = styled.input`
  width: ${(props) => props.theme.pixelToRem(120)};
  height: ${(props) => props.theme.pixelToRem(100)};
  border: 0;
  background: none;
  background-color: none;
  display: flex;
  display: none;
  flex-direction: column;
  cursor: pointer;
  :active {
    border: none !important;
    box-shadow: none !important;
  }

  :focus {
    border: none !important;
    box-shadow: none !important;
  }
`;

/* ${(props) => (props.isGood ? "#024873" : "lightgray")}; */
const GoodImgDiv = styled.label<{ isGood: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isGood ? "#024873" : "lightgray")};

  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;

  img {
    position: absolute;
  }
`;
// ${(props) => (props.isGood ? "#024873" : "grey")};
const GoodBtnDiv = styled.div<{ isGood: Boolean }>`
  margin-top: 100px;
  margin-left: 7px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isGood ? "#024873" : "lightgray")};
`;

const BadInput = styled.input`
  width: ${(props) => props.theme.pixelToRem(120)};
  height: ${(props) => props.theme.pixelToRem(100)};
  border: 0;
  background: none;
  background-color: none;
  display: flex;
  display: none;
  flex-direction: column;
  cursor: pointer;
  :active {
    border: none !important;
    box-shadow: none !important;
  }
`;

// ${(props) => (props.isBad ? "#024873" : "grey")};
const BadBtnDiv = styled.div<{ isBad: Boolean }>`
  margin-top: 100px;
  margin-left: -9px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isBad ? "#024873" : "lightgray")};
`;

/* ${(props) => (props.isBad ? "#024873" : "lightgray")}; */
const BadImgDiv = styled.label<{ isBad: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isBad ? "#024873" : "lightgray")};

  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;

  img {
    position: absolute;
  }
`;

//** RecoBtn tab 끝 */
const ReviewTip = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(124)};
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
  line-height: ${(props) => props.theme.pixelToRem(20)};
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
  width: ${(props) => props.theme.pixelToRem(335)};
  margin: 0 auto;
`;

const StTextArea = styled.textarea`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(225)};
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
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(60)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
  border: 0.5px none grey;
  margin-top: 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #024873;
  color: white;
  cursor: pointer;
  margin-bottom: 30px;
`;
