import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSize";

//css
import styled from "styled-components";
import { useGetApi } from "../APIs/getApi";

const imageList = [
  "https://images.unsplash.com/photo-1607908560428-36ff9e0363b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1628087235616-4e146afcd061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1571983890292-5d10b2f19d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
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

  // console.log(sortItem);
  // {bookmarking ? (
  //   <BookmarkBorderIcon onClick={picking}>
  //     <img src="/images/picked2.svg" alt="Bookmarked" />
  //   </BookmarkBorderIcon>
  // ) : (
  //   <Bookmark onClick={picking}>
  //     <img src="/images/pick1.svg" alt="Bookmark" />
  //   </Bookmark>
  // )}

  const campLook = useGetApi.useGetSort().data?.MostList[0].look;
  // console.log("look", campLook);
  const campReview = useGetApi.useGetSort().data?.MostList[1].review;
  // console.log("campReview", campReview);
  const campPick = useGetApi.useGetSort().data?.MostList[2].pick;
  console.log("campPick", campPick);
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
          {/* 맵사용가능여부 확인해서 맵사용해야함. */}
          {/* 조회수나 리뷰 우선순위 겹치면 똑같은게나옴. */}
          <CarouselSlide>
            <Outline>
              <CarouselImg
                draggable={false}
                src={campLook?.ImageUrl}
                alt="img"
                width={width}
              />
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
              <CarouselImg
                draggable={false}
                src={campReview?.ImageUrl}
                alt="img"
                width={width}
              />
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
              <CarouselImg
                draggable={false}
                src={campPick?.ImageUrl}
                alt="img"
                width={width}
              />
              <CrTextBox>
                <CampName>{campPick?.campName}</CampName>
              </CrTextBox>
              <ReviewInfo>
                <NumText>
                  찜({campPick?.pickCount}) 리뷰({campPick?.reviewCount})
                </NumText>
              </ReviewInfo>
            </Outline>
          </CarouselSlide>
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

// {imageList.map((url, i) => (
//   <CarouselSlide key={i} className="flex-shrink-0">
//     <Outline>
//       <CarouselImg
//         draggable={false}
//         src={url}
//         alt="img"
//         width={width}
//       />
//       <CrTextBox>
//         <CampName>캠핑장 이름자리</CampName>
//       </CrTextBox>
//       <ReviewInfo>
//         <NumText>찜(32) 리뷰(790)</NumText>
//       </ReviewInfo>
//     </Outline>
//   </CarouselSlide>
// ))}

const CarouselViewer = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(318)} !important;
  overflow: hidden;
  user-select: none;
`;

const CarouselSlider = styled.div`
  display: flex;
`;

const CarouselSlide = styled.div`
  display: flex;
`;

const Outline = styled.div`
  /* display: flex; */
  width: ${(props) => props.theme.pixelToRem(214)};
  height: ${(props) => props.theme.pixelToRem(260)};
  position: relative;
  margin-top: ${(props) => props.theme.pixelToRem(18)};
  margin-left: ${(props) => props.theme.pixelToRem(20)};
`;

const CarouselImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.pixelToRem(15)};
  object-fit: cover;
  transition: all 0.3s ease;
  flex: none;
  filter: contrast(60%);
`;

const CrTextBox = styled.div`
  padding: 5px;
  position: absolute;
  /* background-color: red; */
  top: 190px;
  margin-left: 10px;
  color: #ffffff;
`;

const CampName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;

const ReviewInfo = styled.div`
  font-size: 1rem;
  position: absolute;
  border-radius: 0.4rem;
  margin-top: -35px;
  margin-left: 17px;
`;

const NumText = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  position: absoulte;
`;
