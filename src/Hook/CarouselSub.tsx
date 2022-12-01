import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSizeHook";
import styled from "styled-components";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ImgBox } from "../components/MytravelPlan";
import { Navigate, useNavigate } from "react-router-dom";

const imageList = [
  "https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg",
  "https://blog.kakaocdn.net/dn/BGT7X/btqUzvTqi5h/flp39GdJH0GU6mo7cTbbhk/img.jpg",
  "https://blog.kakaocdn.net/dn/bWnmfv/btqUBwqZvwA/3CiXGt3SR0TXoOveRJxV91/img.jpg",
  "https://blog.kakaocdn.net/dn/XsLCO/btqUL8PQLwp/NZWCU2jAYKkKSXwcohBKTK/img.jpg",
  "https://blog.kakaocdn.net/dn/bG3iVL/btqUvCZPaRL/ofIjkNWJP1mj2bOG9fie51/img.jpg",
];

export default function CarouselSub() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [bookmarking, setBookMarking] = useState(false);

  // const picking = () => {
  //   setBookMarking((prev) => !prev);
  //   console.log("asdfads");
  // };

  const { ref, width, height } = useCarouselSize();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  // /camps/:topicId?
  //첫번째 인자- 동적변경되는부분
  const handleClick = (id: string) => () => {
    navigate(`/camps/${id}`);
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
              <CarouselImg
                src={"/images/subject/image6.jpg"}
                alt="img"
                width={width}
                draggable={false}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>애견 동반</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image4.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>장비 대여</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image2.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>
            <BoxEx>
              <CaroText>겨울 낚시</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image1.jpg"}
                alt="img"
                width={width}
              />
            </BoxEx>
          </CaroImgBox>
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

//carousel 한칸씩 되게는 할수가 없나?

const CarouselViewer = styled.div`
  width: 475px;
  height: 200px !important;
  overflow: hidden;
  user-select: none;
  margin-top: 15px;
`;

const CarouselSlider = styled.div`
  display: flex;
  position: relative;
`;

// const CarouselSlide = styled.div`
//   flex-shrink: 0;
//   display: block;
//   position: relative;
// `;

const CaroImgBox = styled.div`
  display: flex;
  gap: 1.2rem;
  /* filter: blur(0.5px); */
`;

const CarouselImg = styled.img`
  width: 160px;
  height: 200px;
  margin: auto;
  /* border: 1px solid red; */
  border-radius: 1rem;
  object-fit: cover;
  margin: auto;
  transition: all 0.3s ease;
  flex: none;
`;

const BoxEx = styled.div`
  position: relative;
  width: 160px;
  /* background-color: red; */
`;

const New = styled.div`
  font-size: 1rem;
  position: absolute;
  color: black;
  padding: 3px;
  border-radius: 13px;
  border: 1px solid whitesmoke;
  background-color: whitesmoke;
  margin: 10px;
`;

const CaroText = styled.div`
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  position: absolute;
  color: whitesmoke;
  font-weight: 400;
  font-size: 1rem;
  /* justify-content: center;
  align-items: center;
  text-align: center; */
`;

{
  /* <CarouselImg
            draggable={false}
            src={"/images/subject/image5.jpg"}
            alt="img"
            width={width}
          /> */
}