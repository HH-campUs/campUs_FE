import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";

import "swiper/css";

import "../../style/swiper.css";

export default function NewReview() {
  const NewReview = useGetApi.useGetNewReview().data?.data || [];
  console.log("메인리뷰", NewReview);
  const navigation = useNavigate();

  const toDetail = (campId: number) => () => {
    navigation(`/detail/${campId}/review`);
  };

  return (
    <>
      <CarouselSwiper
        slidesPerView={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        className="mySwiper">
        {NewReview.map((item, reviewId) => (
          <MainBox key={reviewId}>
            <PfBox>
              <PfImg>
                <img src={item?.profileImg} alt="pfImg" />
              </PfImg>
              <div style={{ flexDirection: "column", marginLeft: "6.5px" }}>
                <NickBox>
                  <PfNick>{item?.nickname}</PfNick>
                  <PfCamp
                    title={item?.campName}
                    onClick={toDetail(item.campId)}>
                    {item?.campName}
                    <img src="/images/back.svg" alt="back" />
                  </PfCamp>
                </NickBox>
                <LocaBox>
                  <Date>&nbsp;{item?.createdAt.slice(0, 10)}</Date>
                </LocaBox>
              </div>
            </PfBox>
            <ReviewBox>
              <ReviewText
                title={item?.reviewComment}
                onClick={toDetail(item.campId)}>
                {item?.reviewComment}
              </ReviewText>
            </ReviewBox>
            <ImgFlex>
              {item?.reviewImg
                .toString()
                .split(",")
                .map((image: string, reviewId) => (
                  <ImgBox>
                    {item?.reviewImg ? (
                      <img src={image} alt="reviewImg" key={reviewId} />
                    ) : null}
                  </ImgBox>
                ))}
            </ImgFlex>
          </MainBox>
        ))}
      </CarouselSwiper>
    </>
  );
}

const CarouselSwiper = styled(Swiper)`
  width: ${(props) => props.theme.pixelToRem(475)};
  height: ${(props) => props.theme.pixelToRem(300)} !important;
  overflow: hidden;
  user-select: none;
`;

const MainBox = styled(SwiperSlide)`
  margin-top: 18px;
  margin-left: 20px;
  /* transform: translateX(20px); */
  width: ${(props) => props.theme.pixelToRem(268)} !important;
  height: ${(props) => props.theme.pixelToRem(256)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
`;

const PfBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: -185px -390px 0 20px !important;
  display: flex;
`;

const PfImg = styled.div`
  img {
    width: ${(props) => props.theme.pixelToRem(36.6)};
    height: ${(props) => props.theme.pixelToRem(40)};
    margin-top: -3px;
    border-radius: ${(props) => props.theme.pixelToRem(20)};
    object-fit: cover;
  }
`;
const NickBox = styled.div`
  width: 73%;
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PfNick = styled.div`
  color: #222;
  margin-left: 3px;
`;

const PfCamp = styled.div`
  margin-top: 50px;
  margin-left: -46px;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  ${(props) => props.theme.fontTheme.Caption2};
  color: #666666 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  justify-content: center;
  display: flex;
  position: absolute;

  img {
    width: ${(props) => props.theme.pixelToRem(16)};
    margin-top: -0.7px;
    transform: rotate(180deg);
  }
`;

const LocaBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(250)};
  display: flex;
  margin-top: 6px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const Date = styled.div``;

const ReviewBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(240)};
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: -24px;
  margin-left: 100px;
  line-height: 1.57;
  word-break: normal;
`;

const ReviewText = styled.div`
  width: 240px;
  margin-top: -29px;
  margin-left: -11px;
  word-break: break-all;
  text-align: left;
  position: absolute;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const ImgFlex = styled.div`
  margin-top: 132px;
  margin-left: -154px;
  width: ${(props) => props.theme.pixelToRem(77)};
  height: ${(props) => props.theme.pixelToRem(84)};
  display: flex;
  position: absolute;
`;

const ImgBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};

  img {
    width: ${(props) => props.theme.pixelToRem(70)};
    height: ${(props) => props.theme.pixelToRem(84)};
    border-radius: 8px;
    object-fit: cover;
  }
`;
