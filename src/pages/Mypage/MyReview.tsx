import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";
import { useMyPageApi } from "../../APIs/myPageApi";
import styled from "styled-components";
import { IGetMyReview } from "../../interfaces/MyPage";
import MyReviewUpdate from "./MyReviewUpdate";
import { useState } from "react";

import ReviewMap from "./ReviewMap";

import { IGetMyInfo } from "../../interfaces/MyPage";

export default function MyReview() {
  const isLogin = getCamperToken();
  const navigate = useNavigate();

  const myReviewDummy = useMyPageApi.useGetMyReview();
  const myReview = myReviewDummy.data?.data;

  const checkPf: IGetMyInfo = useMyPageApi.useGetMyPage().data?.data;

  return (
    <Wrapper>
      {isLogin ? (
        <WrapperFirst>
          <ReviewHead>
            <LeftText>
              내 리뷰 전체 <span>{checkPf?.Review?.length}</span>
            </LeftText>
            <RightIcon src="/images/mypage/reviewwrite.svg" alt="write" />
          </ReviewHead>

          {myReview &&
            myReview?.map((item: IGetMyReview, i: number) => (
              <ReviewMap
                key={item.reviewId}
                checkPf={checkPf}
                myReview={item}
              />
            ))}
        </WrapperFirst>
      ) : (
        <>
          <NotiBox>
            <div>
              <img src="/images/mypage/newreview.svg" alt="tent" />
            </div>
            <PickText>아직 작성한 리뷰가 없어요!</PickText>
            <PickBtn
              onClick={() => {
                navigate("/result");
              }}
            >
              다녀온 캠핑장 구경가기
            </PickBtn>
          </NotiBox>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  min-height: ${(props) => props.theme.pixelToRem(500)};
  overflow-y: scroll;
`;

const WrapperFirst = styled.div`
  margin-bottom: 230px;
  width: 100%;
`;

const ReviewHead = styled.div`
  margin-top: 28px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  width: 85%;
`;

const LeftText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;

  span {
    font-size: ${(props) => props.theme.pixelToRem(18)};
    color: #5185a6;
  }
`;

const RightIcon = styled.img``;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.pixelToRem(227)};
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
`;

const PickText = styled.div`
  margin-top: 10px;
  ${(props) => props.theme.pixelToRem(14)};
  color: #909090;
`;

const PickBtn = styled.button`
  margin-top: 30px;
  width: ${(props) => props.theme.pixelToRem(227)};
  height: ${(props) => props.theme.pixelToRem(47)};
  border: solid 1px #222;
  background-color: #fff;
  border-radius: ${(props) => props.theme.pixelToRem(50)};
  cursor: pointer;
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
