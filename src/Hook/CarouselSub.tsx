import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSizeHook";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

export default function CarouselSub() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width, height } = useCarouselSize();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  // const { id } = useParams();

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

  const handleClick = (id: number) => () => {
    navigate(`/topic/${id}`, {
      state: {
        topicImg: `${imageList[id - 1].img}`,
        id: `${imageList[id - 1].id}`,
      },
    });
  };

  return (
    <>
      <CarouselViewer
        ref={ref}
        className="w-full max-w-lg"
        style={{
          height,
          overflow: hide ? "hidden" : "visible",
        }}
      >
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
          })}
        >
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
              />
            </BoxEx>
          </CaroImgBox>
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

const CarouselViewer = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  height: ${(props) => props.theme.pixelToRem(210)} !important;
  overflow: hidden;
  user-select: none;
  margin-top: 18px; ;
`;

const CarouselSlider = styled.div`
  display: flex;
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
`;

const CarouselImg = styled.img`
  width: ${(props) => props.theme.pixelToRem(140)};
  height: ${(props) => props.theme.pixelToRem(202)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  object-fit: cover;
  transition: all 0.3s ease;
  flex: none;
`;

const BoxEx = styled.div`
  position: relative;
  width: ${(props) => props.theme.pixelToRem(156)};
`;

const New = styled.div`
  width: ${(props) => props.theme.pixelToRem(40)};
  height: ${(props) => props.theme.pixelToRem(16)};
  font-size: 0.8rem;
  padding-left: 6px;
  padding-top: 2px;
  position: absolute;
  color: black;
  border-radius: ${(props) => props.theme.pixelToRem(14)};
  background-color: #fff;
  margin: 10px;
  z-index: 2;
`;

const CaroText = styled.div`
  right: 40%;
  bottom: ${(props) => props.theme.pixelToRem(14)};
  position: absolute;
  color: #fff;
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  z-index: 2;
`;
