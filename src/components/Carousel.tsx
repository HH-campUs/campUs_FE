import { Swiper, SwiperSlide } from "swiper/react";

//css
import "swiper/css";

import "../style/swiper.css";
import styled from "styled-components";
import { useGetApi } from "../APIs/getApi";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const navigate = useNavigate();

  const campLook = useGetApi.useGetSort()?.data?.MostList?.[0].look || [];
  const campReview = useGetApi.useGetSort()?.data?.MostList?.[1]?.review || [];
  const campPick = useGetApi.useGetSort()?.data?.MostList?.[2]?.pick || [];

  const handleClick = (campId: string | undefined) => () => {
    navigate(`/detail/${campId}/detail`);
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
        <Outline>
          <ImgCover onClick={handleClick(campLook?.campId)} />

          <CarouselImg src={campLook?.ImageUrl} alt="img" />
          <CrTextBox>
            <CampName>{campLook?.campName}</CampName>
          </CrTextBox>
          <ReviewInfo>
            <NumText>
              찜({campLook?.pickCount}) 리뷰({campLook?.reviewCount})
            </NumText>
          </ReviewInfo>
        </Outline>
        <Outline>
          <ImgCover onClick={handleClick(campReview?.campId)} />
          <CarouselImg src={campReview?.ImageUrl} alt="img" />
          <CrTextBox>
            <CampName>{campReview?.campName}</CampName>
          </CrTextBox>
          <ReviewInfo>
            <NumText>
              찜({campReview?.pickCount}) 리뷰({campReview?.reviewCount})
            </NumText>
          </ReviewInfo>
        </Outline>
        <Outline>
          <ImgCover onClick={handleClick(campPick?.campId)} />
          <CarouselImg src={campPick?.ImageUrl} alt="img" />
          <CrTextBox>
            <CampName>{campPick?.campName}</CampName>
          </CrTextBox>
          <ReviewInfo>
            <NumText>
              찜({campPick?.pickCount}) 리뷰({campPick?.reviewCount})
            </NumText>
          </ReviewInfo>
        </Outline>
      </CarouselSwiper>
    </>
  );
}

const CarouselSwiper = styled(Swiper)`
  width: ${(props) => props.theme.pixelToRem(475)};
  max-width: ${(props) => props.theme.pixelToRem(475)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(318)} !important;
  overflow: hidden;
  user-select: none;
`;

const Outline = styled(SwiperSlide)`
  width: ${(props) => props.theme.pixelToRem(214)};
  height: ${(props) => props.theme.pixelToRem(260)};
  position: relative;
  margin-top: ${(props) => props.theme.pixelToRem(18)};
  margin-left: ${(props) => props.theme.pixelToRem(10)};
  margin-right: ${(props) => props.theme.pixelToRem(0)} !important;
`;

const ImgCover = styled.div`
  width: ${(props) => props.theme.pixelToRem(214)};
  height: ${(props) => props.theme.pixelToRem(260)};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => props.theme.pixelToRem(15)};
  z-index: 1;
  position: absolute;
  cursor: pointer;
`;

const CarouselImg = styled.img`
  width: ${(props) => props.theme.pixelToRem(214)} !important;
  height: 100%;
  border-radius: ${(props) => props.theme.pixelToRem(15)};
  object-fit: cover;
  transition: all 0.3s ease;
  flex: none;
`;

const CrTextBox = styled.div`
  padding: 5px;
  position: absolute;
  top: 175px;
  margin-left: -70px;
  color: #ffffff;
  z-index: 5;
`;

const CampName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 16px;
`;

const ReviewInfo = styled.div`
  font-size: 1rem;
  position: absolute;
  border-radius: 0.4rem;
  margin-top: 205px;
  margin-left: -106px;
  z-index: 5;
`;

const NumText = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  position: absoulte;
`;
