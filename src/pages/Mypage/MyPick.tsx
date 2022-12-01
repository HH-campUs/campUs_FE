import React, { useEffect } from "react";
import { useMyPageApi } from "../../APIs/myPageApi";
import { LoginState } from "../../store/loginAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

import { IPickedCamp } from "../../interfaces/Posts";

export default function MyPick() {
  const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const { Pick } = useMyPageApi.useGetMyPage().data?.data;

  const picked = Pick?.map((picks: IPickedCamp) => picks.Camp);

  useEffect(() => {
    console.log(picked);
    console.log(Pick);
  }, [Pick]);

  return (
    <>
      {isLogin ? (
        <MapBox>
          {picked.map((pick: IPickedCamp, campId: IPickedCamp) => (
            <Box>
              <CampImg src={pick.ImageUrl} alt="" />
              <CampName>{pick.campName}</CampName>
              <CampAddress>{pick.address}</CampAddress>
            </Box>
          ))}
        </MapBox>
      ) : (
        <>
          <NotiBox>
            <div>
              <img src="/images/tent.svg" alt="tent" />
            </div>
            <PickText>아직 찜한 캠핑장이 없어요!</PickText>
            <PickBtn
              onClick={() => {
                navigate("/topic/1");
              }}
            >
              인기 캠핑장 구경가기
            </PickBtn>
          </NotiBox>
        </>
      )}
    </>
  );
}

const MapBox = styled.div`
  margin-top: 350px;
  min-height: 500px;
`;
const Box = styled.div`
  width: 335px;
  margin: 20px auto;
  justify-content: center;
  text-align: left;
  flex-direction: column;
  display: flex;
`;

const CampImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.pixelToRem(8)};
`;

const CampName = styled.div`
  margin-top: 15px;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222222;
`;

const CampAddress = styled.div`
  color: #666666;
  margin-top: 4px;
  font-size: ${(props) => props.theme.pixelToRem(12)};
`;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 227px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
`;

const PickText = styled.div`
  margin-top: 10px;
  ${(props) => props.theme.pixelToRem(14)};
  color: #909090;
`;

const PickBtn = styled.button`
  margin-top: 30px;
  width: 227px;
  height: 47px;
  border: solid 1px #222;
  background-color: #fff;
  border-radius: 50px;
`;
