import React from "react";
import styled from "styled-components";
import KaKaomap from "../../components/KaKaomap";

// 1rem 16px <

function Ddetail() {
  return (
    <Wrapper>
      <InfoBox>
        <Title>기본 정보</Title>
        <BasicInfo>화장실 1개, 개수대 1개, 샤워실 1개</BasicInfo>
        <InfoTitle>정보 제목</InfoTitle>
        <InfoDetail>정보내용적는곳 / img</InfoDetail>
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
  width: 380px;
  margin: 20px 10px;
  height: 180px;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 1.3rem;
`;

const BasicInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

const InfoTitle = styled.h2`
  margin-top: 50px;
  font-weight: 500;
  font-size: 1.3rem;
`;

const InfoDetail = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

const MapWrapper = styled.div`
  margin: 0 auto;
  width: ${(props) => props.theme.pixelToRem(355)};
  height: 300px;
  justify-content: center;
`;

const MapTitle = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;
