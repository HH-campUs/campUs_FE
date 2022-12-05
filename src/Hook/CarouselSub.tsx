import registDragEvent from "../utils/registDragEvent";
import { useState } from "react";
import useCarouselSize from "./useCarouselSizeHook";
import styled from "styled-components";

import { Navigate, useNavigate, useParams } from "react-router-dom";

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

  const { id } = useParams();

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
      img: "/images/subject/image1.jpg",
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
              <CarouselImg
                src={"/images/subject/image6.jpg"}
                alt="img"
                width={width}
                draggable={false}
                onClick={handleClick(1)}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>애견 동반</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image4.jpg"}
                alt="img"
                width={width}
                onClick={handleClick(2)}
              />
            </BoxEx>

            <BoxEx>
              <CaroText>장비 대여</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image2.jpg"}
                alt="img"
                width={width}
                onClick={handleClick(3)}
              />
            </BoxEx>
            <BoxEx>
              <CaroText>겨울 낚시</CaroText>
              <CarouselImg
                draggable={false}
                src={"/images/subject/image1.jpg"}
                alt="img"
                width={width}
                onClick={handleClick(4)}
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
  width: 375px;
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
  ${(props) => props.theme.fontTheme.Caption3};
  margin: 10px;
  padding: 2px 6px 0 7px;
  border-radius: 13px;
  border: 1px solid whitesmoke;
  background-color: whitesmoke;
  line-height: normal;
  letter-spacing: normal;
  position: absolute;
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

//  {imageList.map((imageLists,i)=>{
//           <BoxEx ket={i}>
//           <CaroText>{imageLists.text}</CaroText>
//           <CarouselImg
//             draggable={false}
//             src={imageLists.img}
//             alt="img"
//             width={width}
//             onClick={handleClick(imageLists.id)}
//           />
//         </BoxEx>
//       })}
