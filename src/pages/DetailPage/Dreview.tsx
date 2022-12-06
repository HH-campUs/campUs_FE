import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

function Dreview() {
  const navigate = useNavigate();
  const loca = useLocation();
  const state = loca.state as { campId: number };

  const detailItem = useGetApi.useGetCampDetail(state.campId).data;
  const checkItem = detailItem?.detailCamp![0];
  console.log(checkItem);

  return (
    <Wrapper>
      <ReviewBox>
        <ReviewText>전체리뷰</ReviewText>
        <ReviewNum>{checkItem?.reviewCount}</ReviewNum>
        <ReviewIcon
          onClick={() =>
            navigate(`/review/${state.campId}/`, {
              state: {
                campId: `${state.campId}`,
              },
            })
          }
        >
          <img src="/images/mypage/reviewwrite.svg" />
        </ReviewIcon>
      </ReviewBox>
    </Wrapper>
  );
}

export default Dreview;

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(31)};
  display: flex;
  flex-direction: column;
  position: relative;
  height: 500px;
`;

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
  justify-content: space-between;
`;

const ReviewText = styled.div`
  margin-left: ${(props) => props.theme.pixelToRem(20)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
`;

const ReviewNum = styled.div`
  color: #024873;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  position: absolute;
  margin-left: ${(props) => props.theme.pixelToRem(90)};
`;

const ReviewIcon = styled.div`
  margin-right: ${(props) => props.theme.pixelToRem(20)};
  margin-top: ${(props) => props.theme.pixelToRem(2)};
`;
