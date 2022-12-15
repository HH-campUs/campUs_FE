import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "../style/swiper.css";

export default function CarouselSub() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);

  const { topicId } = useParams();

  const imageList = [
    {
      text: "일몰명소",
      img: "/images/subject/image6.jpg",
      id: 1,
    },
    {
      text: "애견동반",
      img: "/images/subject/image4.jpg",
      id: 2,
    },
    {
      text: "장비대여",
      img: "/images/subject/image2.jpg",
      id: 3,
    },
    {
      text: "겨울낚시",
      img: "/images/subject/image5.jpg",
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
      {/* <CarouselViewer
        ref={ref}
        className="w-full max-w-lg"
        style={{
          height,
          overflow: hide ? "hidden" : "visible",
        }}>
        <CarouselSlider
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
              const maxIndex = imageList.length - 1;

              if (deltaX < -100)
                setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
              if (deltaX > 100)
                setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

              setTransX(0);
            },
          })}>
          <CaroImgBox>
            <BoxEx>
              <New>NEW</New>
              <CaroText>일몰 명소</CaroText>
              <ImgCover onClick={handleClick(1)} />
              <CarouselImg
                src={"/images/subject/image6.jpg"}
                alt="img"
                width={width}
                draggable={false}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>애견동반</CaroText>
              <ImgCover onClick={handleClick(2)} />
              <CarouselImg
                draggable={false}
                src={"/images/subject/image4.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>장비대여</CaroText>
              <ImgCover onClick={handleClick(3)} />
              <CarouselImg
                draggable={false}
                src={"/images/subject/image2.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>
            <BoxEx>
              <CaroText>겨울 낚시</CaroText>
              <ImgCover onClick={handleClick(4)} />
              <CarouselImg
                draggable={false}
                src={"/images/subject/image5.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>
          </CaroImgBox>
        </CarouselSlider>
      </CarouselViewer> */}
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

const CarouselSlider = styled(SwiperSlide)`
  width: ${(props) => props.theme.pixelToRem(214)};
  height: ${(props) => props.theme.pixelToRem(260)};
  position: relative;
  margin-top: ${(props) => props.theme.pixelToRem(18)};
  margin-left: ${(props) => props.theme.pixelToRem(10)};
  margin-right: ${(props) => props.theme.pixelToRem(0)} !important;
`;

const CaroImgBox = styled.div`
  display: flex;
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
