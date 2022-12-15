import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import registDragEvent from "../../utils/registDragEvent";
import ReviewSizeHook from "./ReviewSizeHook";

import { useState } from "react";
import { useMyPageApi } from "../../APIs/myPageApi";
import { useNavigate } from "react-router-dom";

export default function NewReview() {
  const NewReview = useGetApi.useGetNewReview().data?.data || [];
  console.log("메인리뷰", NewReview);
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const navigation = useNavigate();

  const { ref, width, height } = ReviewSizeHook();

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  };

  const toDetail = (campId: number) => () => {
    navigation(`/detail/${campId}/review`);
  };

  const imageList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <CarouselViewer
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
              const maxIndex = imageList.length;

              if (deltaX < -100)
                setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
              if (deltaX > 100)
                setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

              setTransX(0);
            },
          })}>
          {NewReview.map((item, reviewId) => (
            <CaroImgBox key={reviewId}>
              <Wrapper>
                <MainBox>
                  <PfBox>
                    <PfImg>
                      <img src={item?.profileImg} alt="pfImg" />
                    </PfImg>
                    <div
                      style={{ flexDirection: "column", marginLeft: "6.5px" }}>
                      <NickBox>
                        <PfNick>{item?.nickname}</PfNick>
                        <PfCamp
                          title={item?.campName}
                          onClick={toDetail(item.campId)}>
                          {item?.campName}
                        </PfCamp>
                      </NickBox>
                      <LocaBox>
                        <Date>&nbsp;{item?.createdAt.slice(0, 10)}</Date>
                      </LocaBox>
                    </div>
                  </PfBox>
                  <ReviewBox>
                    <ReviewText
                      title={item?.reviewComment}
                      onClick={toDetail(item.campId)}>
                      {item?.reviewComment}
                    </ReviewText>
                  </ReviewBox>
                  <ImgFlex>
                    {item?.reviewImg
                      .toString()
                      .split(",")
                      .map((image: string, reviewId) => (
                        <ImgBox>
                          {item?.reviewImg ? (
                            <img src={image} alt="reviewImg" key={reviewId} />
                          ) : null}
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
  width: ${(props) => props.theme.pixelToRem(475)};
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
  /* margin-left: 20px; */
`;

const MainBox = styled.div`
  margin-top: 18px;
  margin-left: 20px;
  /* transform: translateX(20px); */
  width: ${(props) => props.theme.pixelToRem(268)};
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
// width: ${(props) => props.theme.pixelToRem(180)};
const NickBox = styled.div`
  width: 73%;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PfNick = styled.div`
  color: #222;
  margin-left: 3px;
`;

const PfCamp = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
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
  width: ${(props) => props.theme.pixelToRem(240)};
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 15px;
  margin-left: 18px;
  line-height: 1.57;
  word-break: normal;
`;

const ReviewText = styled.div`
  width: 240px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  /* white-space: nowrap; */
`;

const ImgFlex = styled.div`
  margin-top: 14px;
  margin-left: 20px;
  width: ${(props) => props.theme.pixelToRem(77)};
  height: ${(props) => props.theme.pixelToRem(84)};
  display: flex;
`;

const ImgBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.pixelToRem(5)};

  img {
    width: ${(props) => props.theme.pixelToRem(70)};
    height: ${(props) => props.theme.pixelToRem(84)};
    border-radius: 8px;
    object-fit: cover;
  }
`;
