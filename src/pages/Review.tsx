import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import SemiSearch from "../components/withSearch/SemiSearch";
import styled from "styled-components";
import { useGetApi } from "../APIs/getApi";
import { usePostsApi } from "../APIs/postsApi";
import { getCamperToken } from "../instance/cookies";
import { IReviewPosts } from "../interfaces/Posts";
import { StrDay, StrMonth } from "../store/dateAtom";
import { InfoToast, InfoToast2 } from "../components/Toast/Toast";

export default function Review() {
  const [toastState, setToastState] = useState(false);
  const [toastState2, setToastState2] = useState(false);

  /* SemiSearch State */
  const [openSemi, setOpenSemi] = useState(false);

  const isLogin = getCamperToken();
  const Month = useRecoilValue(StrMonth);
  const Day = useRecoilValue(StrDay);

  const { campId } = useParams();

  //useQuery사용.
  const detailItem: any = useGetApi.useGetCampDetail(campId).data?.[0];

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;

    if (!imageLists) return;
    for (let i = 0; i < imageLists.length; i++) {
      setImageFiles((prev) => [...prev, imageLists[i]]);
    }

    for (let i = 0; i < imageLists?.length; i++) {
      const blobImage = URL.createObjectURL(imageLists[i]);
      setImagePreview((prev) => [...prev, blobImage]);
    }
  };

  const handleValid = (data: IReviewPosts) => {
    if (!campId) return;
    const formData = new FormData();
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
    setToastState(true);
    const timer = setTimeout(() => {
      navigate(-1);
    }, 1530);

    return () => {
      clearTimeout(timer);
    };
  };

  const handleDeleteImage = useCallback(
    (idx: number) => () => {
      setImagePreview((prev) => prev.filter((_, index) => index !== idx));
      console.log(imagePreview);
      setImageFiles((prev) =>
        Array.from(prev).filter((_: File, index: number) => index !== idx)
      );
    },
    []
  );

  useEffect(() => {
    if (imagePreview.length === 0) return;
    if (imagePreview.length > 3) {
      setToastState2(true);
      setImagePreview((prev) => prev.slice(0, 3));
      setImageFiles((prev: File[]) => prev.slice(0, 3));
    }
  }, [imagePreview]);

  return (
    <Wrapper>
      {openSemi == true ? (
        <SemiSearch openSemi={openSemi} setOpenSemi={setOpenSemi} />
      ) : null}
      {toastState == true ? (
        <InfoToast
          text={"리뷰 쓰기 완료"}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}

      {toastState2 == true ? (
        <InfoToast2
          text={"이미지는 3장까지 첨부가능합니다."}
          toastState2={toastState2}
          setToastState2={setToastState2}
        />
      ) : null}

      <Head>
        <div>
          <img
            src="/images/back.svg"
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>

        <HeadText>리뷰쓰기</HeadText>
      </Head>

      <ReviewImgBox>
        <img
          src={detailItem?.ImageUrl}
          alt="test"
          style={{ objectFit: "cover" }}
        />
        <TextBox>
          <CampName>{detailItem?.campName}</CampName>
          <CampLoca>{detailItem?.address}</CampLoca>
        </TextBox>
      </ReviewImgBox>

      <VisitDay>
        방문일선택
        <p
          style={{ textDecoration: "underline", marginLeft: "160px" }}
          onClick={() => setOpenSemi(true)}>
          2022.{Month}.{Day}
        </p>
        <RightArrow
          src="/images/review/rightArrow.svg"
          style={{ paddingTop: "3px" }}
        />
      </VisitDay>
      <Line />

      <RecoBox>
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
        <p style={{ color: "#5185A6" }}>최소 10자 | 최대 80자</p>
      </WriteHead>
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

          {imagePreview.map((image, idx) => (
            <PreviewDiv key={idx}>
              <PreviewImg>
                <img src={image} alt="reviewImg" />
                <CloseBtn
                  onClick={handleDeleteImage(idx)}
                  src="/images/mypage/closeimage.svg"
                  alt="closeBtn"
                />
              </PreviewImg>
            </PreviewDiv>
          ))}
        </ImgList>

        {isLogin ? (
          <StBtn>리뷰 남기기</StBtn>
        ) : (
          <StBtn style={{ backgroundColor: "#CCCCCC" }} disabled>
            로그인 후 이용해주세요
          </StBtn>
        )}
      </ReviewForm>
    </Wrapper>
  );
}
// width: ${(props) => props.theme.pixelToRem(375)};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const HeadText = styled.div`
  margin: auto;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  transform: translateX(-15px);
`;

const ReviewImgBox = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(170)};
  margin-top: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: contrast(55%);
  }
`;

const TextBox = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: -110px;
  gap: 5px;
`;

const CampName = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(22)};
  font-weight: 600;
  color: #fff;
`;

const CampLoca = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 500;
  color: #fff;
`;

const VisitDay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4.5fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  margin-top: 20px;
  margin: 20px;

  p {
    text-decoration: underline;
    font-size: ${(props) => props.theme.pixelToRem(16)};
  }
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
`;

//* recoBtn tap *//
const BestImgDiv = styled.label<{ isBest: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isBest ? "#024873" : "#EFEFEF")};
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  cursor: pointer;
  img {
    position: absolute;
  }
  div {
    width: ${(props) => props.theme.pixelToRem(80)};
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
  :focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const PreviewDiv = styled.div`
  position: relative;
`;

const PreviewImg = styled.div`
  position: absolute;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(22)};
  height: ${(props) => props.theme.pixelToRem(22)};
  transform: translateX(-55px);
  margin-top: 5px;
  position: absolute;
  z-index: 2;
`;

const BestBtnDiv = styled.div<{ isBest: Boolean }>`
  position: absolute;
  margin-top: 100px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isBest ? "#024873" : "#CCCCCC")};
`;

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

const GoodImgDiv = styled.label<{ isGood: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isGood ? "#024873" : "#EFEFEF")};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;

  img {
    position: absolute;
  }
`;

const GoodBtnDiv = styled.div<{ isGood: Boolean }>`
  margin-top: 100px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isGood ? "#024873" : "#CCCCCC")};
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

const BadImgDiv = styled.label<{ isBad: Boolean }>`
  min-width: ${(props) => props.theme.pixelToRem(62)};
  min-height: ${(props) => props.theme.pixelToRem(62)};
  width: ${(props) => props.theme.pixelToRem(62)};
  height: ${(props) => props.theme.pixelToRem(62)};
  border-radius: ${(props) => props.theme.pixelToRem(62)};
  background-color: ${(props) => (props.isBad ? "#024873" : "#EFEFEF")};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;

  img {
    position: absolute;
  }

  div {
    width: ${(props) => props.theme.pixelToRem(90)};
  }
`;

const BadBtnDiv = styled.div<{ isBad: Boolean }>`
  position: absolute;
  margin-top: 100px;
  margin-left: 5px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: ${(props) => (props.isBad ? "#024873" : "#CCCCCC")};
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
