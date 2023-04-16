import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";
import { useMyPageApi } from "../../APIs/myPageApi";
import styled from "styled-components";
import { IGetMyReview } from "../../interfaces/MyPage";

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
              }}>
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
