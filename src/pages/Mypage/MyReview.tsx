import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";
import { useMyPageApi } from "../../APIs/myPageApi";
import { IReviewRead } from "../../interfaces/Posts";
import styled from "styled-components";
import { IGetMyReview } from "../../interfaces/MyPage";

export default function MyReview() {
  const isLogin = getCamperToken();
  const navigate = useNavigate();

  const myReviewDummy = useMyPageApi.useGetMyReview();
  const myReview = myReviewDummy.data?.data;

  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const checkReview = checkPf?.Review;

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

          {myReview?.map((item: IGetMyReview, i: number) => (
            <ReviewMap key={i}>
              <PfBox>
                <PfImg>
                  <img src={checkPf?.profileImg} alt="pfImg" />
                </PfImg>
                <div style={{ flexDirection: "column", marginLeft: "6.5px" }}>
                  <NickBox>
                    <PfNick>{checkPf?.nickname}</PfNick>
                    <ReviewUpdate>수정</ReviewUpdate>
                  </NickBox>
                  <LocaBox>
                    <CampLoca>{item?.campName} </CampLoca>
                    <Date>&nbsp;{item?.createdAt.slice(0, 10)}</Date>
                  </LocaBox>
                </div>
              </PfBox>
              <ReviewBox>
                <ReviewText>{item?.reviewComment}</ReviewText>
              </ReviewBox>
              <ImgFlex>
                {item?.reviewImg
                  .toString()
                  .split(",")
                  .map((image: string, i: number) => (
                    <ImgBox>
                      {item?.reviewImg ? (
                        <img src={image} alt="" key={i} />
                      ) : null}
                    </ImgBox>
                  ))}
              </ImgFlex>
            </ReviewMap>
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
                navigate("/topic/1");
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
`;

const LeftText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;

  span {
    font-size: ${(props) => props.theme.pixelToRem(18)};
    color: #5185a6;
  }
`;

const RightIcon = styled.img`
  margin-right: 20px;
`;
// ${(props) => props.theme.pixelToRem(335)};
const ReviewMap = styled.div`
  margin-top: 16px;
  margin-left: 20px;
  /* margin-bottom: 250px; */
  width: 90%;

  height: ${(props) => props.theme.pixelToRem(258)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
  background-color: #f8f8f8;
  flex-direction: column;
`;
// ${(props) => props.theme.pixelToRem(300)};
const PfBox = styled.div`
  width: 91%;
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: 18px 18px 0 22px;
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
//${(props) => props.theme.pixelToRem(250)}; */
const NickBox = styled.div`
  width: 100%;
  /* max-width: ${(props) => props.theme.pixelToRem(340)}; */
  justify-content: space-between;
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const PfNick = styled.div`
  color: #222;
`;

const ReviewUpdate = styled.div`
  color: #5185a6;
`;

const LocaBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(250)};
  display: flex;
  margin-top: 6px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const CampLoca = styled.div``;

const Date = styled.div`
  margin-left: 5px;
`;

const ReviewBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 15px;
  margin-left: 18px;
  line-height: 1.57;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
