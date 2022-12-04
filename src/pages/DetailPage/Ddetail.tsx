import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";
import KaKaomap from "../../components/KaKaomap";

// 1rem 16px <

function Ddetail() {
  const loca = useLocation();
  const state = loca.state as { campId: number };

  const detailItem = useGetApi.useGetCampDetail(state.campId).data;
  const checkItem = detailItem?.detailCamp![0];

  // homepage: String,->  홈페이지
  // sbrsCl: String ,->  부대시설
  // posblFcltyCl: String,->  주변이용시설
  // wtrplCo: String ->  계수대 개수
  // swrmCo:String  ->  샤워실 개수
  // toiletCo: String ->  화장실 개수
  //eqpmnLendCl _> 캠핑장비대여

  return (
    <Wrapper>
      <InfoBox>
        <Title>기본 정보</Title>
        <BasicInfo>
          화장실 {checkItem?.toiletCo}개, 계수대 {checkItem?.wtrplCo}개 , 샤워실
          {checkItem?.swrmCo}개
        </BasicInfo>
        <Title>주변 이용 시설</Title>
        <BasicInfo>{checkItem?.posblFcltyCl}</BasicInfo>
        <Title>캠핑 장비 대여</Title>
        <BasicInfo>
          {checkItem?.eqpmnLendCl
            ? checkItem?.eqpmnLendCl
            : "대여 가능한 장비가 없습니다."}
        </BasicInfo>
        <Title>홈페이지 주소</Title>
        <BasicInfo>{checkItem?.homePage}</BasicInfo>
      </InfoBox>

      <MapWrapper>
        <MapTitle>지도</MapTitle>
        <KaKaomap />
      </MapWrapper>
    </Wrapper>
  );
}

export default Ddetail;

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
`;

const InfoBox = styled.div`
  position: relative;
  width: ${(props) => props.theme.pixelToRem(375)};
  margin: 20px 10px;
  height: ${(props) => props.theme.pixelToRem(180)};
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(22)};
  margin-top: 20px;
`;

const BasicInfo = styled.div`
  margin-top: 5px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 300;
`;

const MapWrapper = styled.div`
  margin: 80px auto;
  width: ${(props) => props.theme.pixelToRem(355)};
  height: ${(props) => props.theme.pixelToRem(300)};
  justify-content: center;
`;

const MapTitle = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;
