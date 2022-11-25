import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSize";

//css
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const imageList = [
  "https://images.unsplash.com/photo-1607908560428-36ff9e0363b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1628087235616-4e146afcd061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1571983890292-5d10b2f19d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
];

const imageList2 = [
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

  const picking = () => {
    setBookMarking((prev) => !prev);
    console.log("asdfads");
  };

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
              <Outline>
                {bookmarking ? (
                  <BookmarkBorderIcon onClick={picking}>
                    <img src="/images/picked2.svg" alt="Bookmarked" />
                  </BookmarkBorderIcon>
                ) : (
                  <Bookmark onClick={picking}>
                    <img src="/images/pick1.svg" alt="Bookmark" />
                  </Bookmark>
                )}
                <CarouselImg
                  draggable={false}
                  src={url}
                  alt="img"
                  width={width}
                />
                <ReviewNum>
                  <NumText> 리뷰(99.9)</NumText>
                </ReviewNum>
                <CrTextBox>
                  <CampName>캠핑장 이름자리</CampName>
                  <CampLoca>
                    <LocationOnIcon /> <p>경기 가평군 조종면</p>
                  </CampLoca>
                </CrTextBox>
              </Outline>
            </CarouselSlide>
          ))}
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

const CarouselViewer = styled.div`
  width: 475px;
  height: 300px !important;
  overflow: hidden;
  user-select: none;
  /* background-color: aquamarine; */
`;

const CarouselSlider = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CarouselSlide = styled.div`
  /* flex-shrink: 0;
  display: block;
  position: relative; */
`;

const Outline = styled.div`
  width: 200px;
  height: 255px;
  position: relative;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5px;
  margin-top: 20px;
`;

const CarouselImg = styled.img`
  width: 190px;
  height: 180px;
  /* padding-left: 10px; */
  padding: auto;
  border-radius: 15px;
  object-fit: cover;
  transition: all 0.3s ease;
  flex: none;
`;

const Bookmark = styled.div`
  position: absolute;
  margin-left: 150px;
  margin-top: 10px;
`;
const BookmarkBorderIcon = styled.div`
  position: absolute;
  margin-left: 150px;
  margin-top: 10px;
`;

const ReviewNum = styled.div`
  font-size: 1rem;
  position: absolute;
  background-color: rgba(100, 100, 100, 0.5);
  padding: 6px;
  border-radius: 0.4rem;
  margin-left: 115px;
  margin-top: -35px;
`;

const NumText = styled.div`
  /* transform: translate(50%, -200%); */
  color: white;

  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  font-size: 0.8rem;
  position: absoulte;
  z-index: 2;
`;

const CrTextBox = styled.div`
  margin-top: 5px;
  padding: 5px;
`;

const CampName = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const CampLoca = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: gray;
`;
