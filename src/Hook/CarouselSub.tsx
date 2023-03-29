import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "../style/swiper.css";

export default function CarouselSub() {
  const navigate = useNavigate();

  const imageList = [
    {
      text: "일몰명소",
      img: "/images/subject/image6.webp",
      id: 1,
    },
    {
      text: "애견동반",
      img: "/images/subject/image4.webp",
      id: 2,
    },
    {
      text: "장비대여",
      img: "/images/subject/image2.webp",
      id: 3,
    },
    {
      text: "겨울낚시",
      img: "/images/subject/image5.webp",
      id: 4,
    },
  ];

  const handleClick = (topicId: number) => () => {
    navigate(`/topic/${topicId}`, {
      state: {
        topicImg: `${imageList[topicId - 1].img}`,
        id: `${imageList[topicId - 1].id}`,
      },
    });
  };

  return (
    <>
      <CarouselSwiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        className="mySwiper">
        <BoxEx>
          <New>NEW</New>
          <CaroText>일몰 명소</CaroText>
          <ImgCover onClick={handleClick(1)} />
          <CarouselImg src={"/images/subject/image6.jpg"} alt="img" />
        </BoxEx>

        <BoxEx>
          <CaroText>애견동반</CaroText>
          <ImgCover onClick={handleClick(2)} />
          <CarouselImg src={"/images/subject/image4.jpg"} alt="img" />
        </BoxEx>

        <BoxEx>
          <CaroText>장비대여</CaroText>
          <ImgCover onClick={handleClick(3)} />
          <CarouselImg src={"/images/subject/image2.jpg"} alt="img" />
        </BoxEx>
        <BoxEx>
          <CaroText>겨울 낚시</CaroText>
          <ImgCover onClick={handleClick(4)} />
          <CarouselImg src={"/images/subject/image5.jpg"} alt="img" />
        </BoxEx>
      </CarouselSwiper>
    </>
  );
}

const CarouselSwiper = styled(Swiper)`
  width: ${(props) => props.theme.pixelToRem(475)};
  height: ${(props) => props.theme.pixelToRem(210)} !important;
  overflow: hidden;
  user-select: none;
  margin-top: 18px; ;
`;

const ImgCover = styled.div`
  width: ${(props) => props.theme.pixelToRem(140)};
  height: ${(props) => props.theme.pixelToRem(202)};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  z-index: 1;
  position: absolute;
  cursor: pointer;
`;

const CarouselImg = styled.img`
  width: ${(props) => props.theme.pixelToRem(140)} !important;
  height: ${(props) => props.theme.pixelToRem(202)} !important;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  object-fit: cover;
  transition: all 0.3s ease;
  flex: none;
`;

const BoxEx = styled(SwiperSlide)`
  position: relative;
  width: ${(props) => props.theme.pixelToRem(156)};
  margin-right: 7px !important;
`;

const New = styled.div`
  width: ${(props) => props.theme.pixelToRem(40)};
  height: ${(props) => props.theme.pixelToRem(16)};
  margin-top: -165px !important;
  margin-left: -80px !important;
  font-size: 0.8rem;
  padding-left: 2px;
  padding-top: 2px;
  position: absolute;
  color: black;
  border-radius: ${(props) => props.theme.pixelToRem(14)};
  background-color: #fff;
  z-index: 2;
`;

const CaroText = styled.div`
  right: 33%;
  bottom: ${(props) => props.theme.pixelToRem(14)};
  position: absolute;
  color: #fff;
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  z-index: 2;
`;
