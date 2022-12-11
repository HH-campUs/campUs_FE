import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

import { IGetCampReview } from "../../interfaces/get";

function Dreview() {
  const navigate = useNavigate();
  const loca = useLocation();
  const state = loca.state as { campId: number };

  const detailItem = useGetApi?.useGetCampDetail(state.campId).data;
  const checkItem = detailItem?.detailCamp?.[0];

  //1. 타입 옵셔널 체이닝 확인
  //2. 쿼리문의 타입 확인
  //3. undefiend = !로 해결

  const reviewItem = useGetApi?.useGetCampReview(state.campId);
  const reviewMap = reviewItem?.data?.data || [];

  return (
    <Wrapper>
      <ReviewBox>
        <ReviewText>전체리뷰</ReviewText>
        <ReviewNum>{checkItem?.reviewCount}</ReviewNum>
        <ReviewIcon
          onClick={() =>
            navigate(`/review/${state.campId}/`, {
              state: {
                campId: `${state.campId}`,
              },
            })
          }
        >
          <img src="/images/mypage/reviewwrite.svg" />
        </ReviewIcon>
      </ReviewBox>
      {reviewMap?.map((item: IGetCampReview, i: number) => (
        <ReviewMap key={i}>
          <PfBox>
            <PfImg>
              <img src={item?.profileImg} alt="pfImg" />
            </PfImg>
            <PfDetail>
              <NickBox>
                <PfNick>{item?.nickname}</PfNick>
                <Date>{item?.createdAt.slice(0, 10)}</Date>
              </NickBox>

              <Recommend>
                {item?.likeStatus === 1 ? (
                  <YesRe> 최고!추천해요!</YesRe>
                ) : item?.likeStatus === 2 ? (
                  <GoodRe>좋았어요!</GoodRe>
                ) : (
                  <BadRe>추천하지 않아요</BadRe>
                )}
              </Recommend>
            </PfDetail>
          </PfBox>
          <CommentBox>
            <ReviewText>{item?.reviewComment}</ReviewText>
          </CommentBox>
          <ImgFlex>
            {item?.reviewImg
              .toString()
              .split(",")
              .map((image: string, i: number) => (
                <ImgBox>
                  <img src={image} alt="reviewImg" key={i} />
                </ImgBox>
              ))}
          </ImgFlex>
        </ReviewMap>
      ))}
    </Wrapper>
  );
}

export default Dreview;

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(31)};
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: ${(props) => props.theme.pixelToRem(600)};
`;

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
  justify-content: space-between;
`;

const ReviewText = styled.div`
  margin-left: ${(props) => props.theme.pixelToRem(20)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
`;

const ReviewNum = styled.div`
  color: #024873;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  position: absolute;
  margin-left: ${(props) => props.theme.pixelToRem(90)};
`;

const ReviewIcon = styled.div`
  margin-right: ${(props) => props.theme.pixelToRem(20)};
  margin-top: ${(props) => props.theme.pixelToRem(2)};
`;

const ReviewMap = styled.div`
  margin-top: 16px;
  margin-left: 20px;
  /* margin-bottom: 250px; */
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(258)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border-bottom: 1px solid #eee;
  /* background-color: #f8f8f8; */
  flex-direction: column;
`;

const PfBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: 18px 18px 0 22px;
  display: flex;
  /* background-color: red; */
`;

const PfImg = styled.div`
  img {
    width: ${(props) => props.theme.pixelToRem(36.6)};
    height: ${(props) => props.theme.pixelToRem(40)};
    border-radius: ${(props) => props.theme.pixelToRem(20)};
    object-fit: cover;
  }
`;

const PfDetail = styled.div`
  width: ${(props) => props.theme.pixelToRem(275)};
  display: flex;
  margin-left: 8px;
  justify-content: space-between;
`;

const NickBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(250)};
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const PfNick = styled.div`
  color: #222;
`;

const Date = styled.div`
  margin-top: 5px;
  color: #666;
`;

const Recommend = styled.div`
  align-items: center;
  text-align: center;
  margin-top: 3px;
  /* right: 0; */
`;

const YesRe = styled.div`
  width: ${(props) => props.theme.pixelToRem(96)};
  height: ${(props) => props.theme.pixelToRem(26)};
  background-color: #fa845f;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  border-radius: ${(props) => props.theme.pixelToRem(20)};
  color: #ffffff;
  padding-top: 6px;
`;

const GoodRe = styled.div`
  width: ${(props) => props.theme.pixelToRem(69)};
  height: ${(props) => props.theme.pixelToRem(26)};
  background-color: #ff9d2a;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  border-radius: ${(props) => props.theme.pixelToRem(20)};
  color: #ffffff;
  padding-top: 6px;
`;

const BadRe = styled.div`
  width: ${(props) => props.theme.pixelToRem(100)};
  height: ${(props) => props.theme.pixelToRem(26)};
  background-color: #bab8b0;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  border-radius: ${(props) => props.theme.pixelToRem(20)};
  color: #ffffff;
  padding-top: 6px;
`;
const CommentBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 15px;
  margin-left: 18px;
  line-height: 1.57;
`;

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
