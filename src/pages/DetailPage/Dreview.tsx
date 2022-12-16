import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

import { IGetCampReview } from "../../interfaces/get";

function Dreview() {
  const navigate = useNavigate();
  const { campId } = useParams();

  const detailItem = useGetApi?.useGetCampDetail(campId).data?.[0];

  /* 문제 해결 중 리뷰카운트 새로고침해야적용됨*/

  const reviewItem = useGetApi?.useGetCampReview(campId).data?.data || [];

  return (
    <Wrapper>
      <ReviewBox>
        <ReviewText>전체리뷰</ReviewText>
        <ReviewNum>{detailItem?.reviewCount}</ReviewNum>
        <ReviewIcon onClick={() => navigate(`/review/${campId}/`)}>
          <img src="/images/mypage/reviewwrite.svg" />
        </ReviewIcon>
      </ReviewBox>
      <ReviewList>
        {reviewItem?.map((item: IGetCampReview, i: number) => (
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
              <ReviewText title={item?.reviewComment}>
                {item?.reviewComment}
              </ReviewText>
            </CommentBox>
            <ImgFlex>
              {item?.reviewImg
                .toString()
                .split(",")
                .map((image: string, campId: number) => (
                  <ImgBox>
                    {item?.reviewImg ? (
                      <img src={image} alt="reviewImg" key={campId} />
                    ) : null}
                  </ImgBox>
                ))}
            </ImgFlex>
          </ReviewMap>
        ))}
      </ReviewList>
    </Wrapper>
  );
}

export default Dreview;

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(21)};
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: ${(props) => props.theme.pixelToRem(600)};
`;

const ReviewBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bolder;
  justify-content: space-between;
`;

const ReviewList = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const ReviewText = styled.div`
  width: 84%;
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
  cursor: pointer;
`;

//
const ReviewMap = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid #eee;
  flex-direction: column;
`;

const PfBox = styled.div`
  width: 100%;
  padding: 5px 18px 5px 30px;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const PfImg = styled.div`
  display: flex;

  img {
    width: ${(props) => props.theme.pixelToRem(40)};
    height: ${(props) => props.theme.pixelToRem(40)};
    border-radius: ${(props) => props.theme.pixelToRem(20)};
    object-fit: cover;
  }
`;

const PfDetail = styled.div`
  width: 100%;
  display: flex;
  margin-left: 8px;
  justify-content: space-between;
`;

const NickBox = styled.div`
  width: 100%;
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
  justify-content: flex-end;
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
  width: 100%;
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 10px;
  margin-left: 10px;
  line-height: 1.57;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImgFlex = styled.div`
  margin-top: 14px;
  margin-left: 30px;
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
    width: ${(props) => props.theme.pixelToRem(80)};
    height: ${(props) => props.theme.pixelToRem(84)};
    aspect-ratio: 1/1;
  }
`;
