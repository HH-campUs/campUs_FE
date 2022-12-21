import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";
import { useMyPageApi } from "../../APIs/myPageApi";
import { useNavigate } from "react-router-dom";

import "swiper/css";

import "../../style/swiper.css";

export default function NewReview() {
  const NewReview = useGetApi.useGetNewReview().data?.data || [];
  console.log("메인리뷰", NewReview);
  const [hide, setHide] = useState(true);
  const navigation = useNavigate();

  const toDetail = (campId: number) => () => {
    navigation(`/detail/${campId}/review`);
  };

  const imageList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <CarouselSwiper
        slidesPerView={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
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
                    onClick={toDetail(item.campId)}
                  >
                    {item?.campName}
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
                onClick={toDetail(item.campId)}
              >
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
      {/* <CarouselSlider
            className="flex"
            style={{
              transform: `translateX(${-currentIndex * width + transX}px)`,
              transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
            }}
            {...registDragEvent({
              onDragChange: (deltaX) => {
                setTransX(inrange(deltaX, -width, width));
              },
              onDragEnd: (deltaX) => {
                const maxIndex = imageList.length;
  
                if (deltaX < -100)
                  setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
                if (deltaX > 100)
                  setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));
  
                setTransX(0);
              },
            })}>
            {NewReview.map((item, reviewId) => (
              <CaroImgBox key={reviewId}>
                <Wrapper draggable="true">
                  <MainBox>
                    <PfBox>
                      <PfImg>
                        <img src={item?.profileImg} alt="pfImg" />
                      </PfImg>
                      <div
                        style={{ flexDirection: "column", marginLeft: "6.5px" }}>
                        <NickBox>
                          <PfNick>{item?.nickname}</PfNick>
                          <PfCamp
                            title={item?.campName}
                            onClick={toDetail(item.campId)}>
                            {item?.campName}
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
                </Wrapper>
              </CaroImgBox>
            ))}
          </CarouselSlider> */}
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
  width: ${(props) => props.theme.pixelToRem(268)} !important;
  height: ${(props) => props.theme.pixelToRem(256)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
`;

const PfBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: -178px -390px 0 20px !important;
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
const NickBox = styled.div`
  width: 73%;
  display: flex;
  justify-content: space-between;
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
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
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
  margin-top: -65px;
  margin-left: 100px;
  line-height: 1.57;
  word-break: normal;
`;

const ReviewText = styled.div`
  width: 240px;
  word-break: break-all;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const ImgFlex = styled.div`
  margin-top: 69px;
  margin-left: -150px;
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
