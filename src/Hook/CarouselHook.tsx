import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSizeHook";
import styled from "styled-components";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const imageList = [
  "https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg",
  "https://blog.kakaocdn.net/dn/BGT7X/btqUzvTqi5h/flp39GdJH0GU6mo7cTbbhk/img.jpg",
  "https://blog.kakaocdn.net/dn/bWnmfv/btqUBwqZvwA/3CiXGt3SR0TXoOveRJxV91/img.jpg",
  "https://blog.kakaocdn.net/dn/XsLCO/btqUL8PQLwp/NZWCU2jAYKkKSXwcohBKTK/img.jpg",
  "https://blog.kakaocdn.net/dn/bG3iVL/btqUvCZPaRL/ofIjkNWJP1mj2bOG9fie51/img.jpg",
];

export default function Carousel() {
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
          {imageList.map((url, i) => (
            <CarouselSlide key={i} className="flex-shrink-0">
              <CarouselImg
                draggable={false}
                src={url}
                alt="img"
                width={width}
              />

              {/* {bookmarking ? (
                <Bookmark
                  sx={{ position: "relative", left: "-30px", top: "-160px" }}
                  onClick={picking}
                />
              ) : (
                <BookmarkBorderIcon
                  sx={{ position: "relative", left: "-30px", top: "-160px" }}
                  onClick={picking}
                />
              )} */}
            </CarouselSlide>
          ))}
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

const CarouselViewer = styled.div`
  width: 475px;
  height: 200px !important;
  overflow: hidden;

  user-select: none;
`;

const CarouselSlider = styled.div`
  display: flex;
`;

const CarouselSlide = styled.div`
  flex-shrink: 0;
  display: block;
  position: relative;
`;

const CarouselImg = styled.img`
  width: 200px;
  height: 200px;
  padding-left: 10px;
  border-radius: 1px solid;
  object-fit: contain;
  transition: all 0.3s ease;
  flex: none;
`;
