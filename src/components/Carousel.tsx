import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSize";

//css
import styled from "styled-components";
import { useGetApi } from "../APIs/getApi";
import { useNavigate, useParams } from "react-router-dom";

const imageList = [0, 1, 2, 3];

export default function Carousel() {
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const navigate = useNavigate();
  const { campId } = useParams();

  const campLook = useGetApi.useGetSort()?.data?.MostList?.[0].look || [];
  const campReview = useGetApi.useGetSort()?.data?.MostList?.[1]?.review || [];
  const campPick = useGetApi.useGetSort()?.data?.MostList?.[2]?.pick || [];

  /* const { ref, width, height } = useCarouselSize(); */

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  const handleClick = (campId: string | undefined) => () => {
    navigate(`/detail/${campId}/detail`);
  };

  const SLIDER_WIDTH = 400;
  const SLIDER_HEIGHT = 400;

  return (
    <>
      <CarouselViewer
        /* ref={ref} */

        style={{
          /* height, */
          overflow: hide ? "hidden" : "visible",
        }}>
        <CarouselSlider
          className="flex"
          style={{
            transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
            transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
          }}
          {...registDragEvent({
            onDragChange: (deltaX) => {
              setTransX(inrange(deltaX, -SLIDER_WIDTH, SLIDER_WIDTH));
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
          <CarouselSlide>
            <Outline>
              <ImgCover onClick={handleClick(campLook?.campId)} />

              <CarouselImg
                draggable={false}
                src={campLook?.ImageUrl}
                alt="img"
                width={SLIDER_WIDTH}
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
              <ImgCover onClick={handleClick(campReview?.campId)} />
              <CarouselImg
                draggable={false}
                src={campReview?.ImageUrl}
                alt="img"
                width={SLIDER_WIDTH}
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
              <ImgCover onClick={handleClick(campPick?.campId)} />
              <CarouselImg
                draggable={false}
                src={campPick?.ImageUrl}
                alt="img"
                width={SLIDER_WIDTH}
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

const CarouselViewer = styled.div`
  width: ${(props) => props.theme.pixelToRem(475)};
  max-width: ${(props) => props.theme.pixelToRem(475)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
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
  width: 100%;
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
  margin-left: 10px;
  color: #ffffff;
  z-index: 5;
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
  z-index: 5;
`;

const NumText = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  position: absoulte;
`;
