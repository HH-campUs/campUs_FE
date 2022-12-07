import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import registDragEvent from "../../utils/registDragEvent";
import ReviewSizeHook from "./ReviewSizeHook";

import { useState } from "react";
import { useMyPageApi } from "../../APIs/myPageApi";

export default function NewReview() {
  const NewReview = useGetApi.useGetNewReview().data?.data || [];
  console.log("내리뷰는누가먹었을까", NewReview);
  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width, height } = ReviewSizeHook();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  // const { id } = useParams();

  // const handleClick = (id: number) => () => {
  //   navigate(`/topic/${id}`);
  // };

  const imageList = [0, 1, 2, 3, 4];
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
          {NewReview.map((item, reviewId) => (
            <CaroImgBox key={reviewId}>
              <Wrapper draggable={false}>
                <MainBox>
                  <PfBox>
                    <PfImg>
                      <img src={checkPf?.profileImg} alt="pfImg" />
                    </PfImg>
                    <div
                      style={{ flexDirection: "column", marginLeft: "6.5px" }}
                    >
                      <NickBox>
                        <PfNick>{checkPf?.nickname}</PfNick>
                      </NickBox>
                      <LocaBox>
                        <Date>&nbsp;{item?.createdAt.slice(0, 10)}</Date>
                      </LocaBox>
                    </div>
                  </PfBox>
                  <ReviewBox>
                    <ReviewText>{item?.reviewComment}</ReviewText>
                  </ReviewBox>
                  <ImgFlex>
                    {item?.reviewImg
                      .toString()
                      .split(",")
                      .map((image: string, i: number) => (
                        <ImgBox>
                          <img src={image} alt="reviewImg" key={i} />
                        </ImgBox>
                      ))}
                  </ImgFlex>
                </MainBox>
              </Wrapper>
            </CaroImgBox>
          ))}
        </CarouselSlider>
      </CarouselViewer>
    </>
  );
}

const CarouselViewer = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(300)} !important;
  overflow: hidden;
  user-select: none;
`;

const CarouselSlider = styled.div`
  display: flex;
`;

const CaroImgBox = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  margin-left: 20px;
`;

const MainBox = styled.div`
  margin-top: 18px;
  width: ${(props) => props.theme.pixelToRem(288)};
  height: ${(props) => props.theme.pixelToRem(256)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #eee;
`;

const PfBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(300)};
  height: ${(props) => props.theme.pixelToRem(40)};
  margin: 18px 18px 0 22px;
  display: flex;
  /* background-color: red; */
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
  width: ${(props) => props.theme.pixelToRem(250)};
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const PfNick = styled.div`
  color: #222;
  margin-left: 3px;
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
  width: ${(props) => props.theme.pixelToRem(300)};
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 15px;
  margin-left: 18px;
  line-height: 1.57;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ReviewText = styled.div``;

const ImgFlex = styled.div`
  margin-top: 14px;
  margin-left: 20px;
  width: ${(props) => props.theme.pixelToRem(77)};
  height: ${(props) => props.theme.pixelToRem(84)};
  display: flex;
`;

const ImgBox = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};

  img {
    width: ${(props) => props.theme.pixelToRem(77)};
    height: ${(props) => props.theme.pixelToRem(84)};
    aspect-ratio: 1/1;
    /* border: 1px solid lightgray; */
  }
`;
