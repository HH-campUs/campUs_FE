import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

import DetailMap from "./DetailMap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PlanWrite from "../../components/withPlan/PlanWrite";
import { getCamperToken } from "../../instance/cookies";

function Ddetail() {
  const url = window.location.href;
  const copied = () => {
    window.alert("복사완료");
  };
  const [isPlan, setIsPlan] = useState(false);

  const openPlan = () => {
    setIsPlan(true);
  };

  const isLogin = getCamperToken();
  const { campId } = useParams();

  const detailItem = useGetApi.useGetCampDetail(campId)?.data?.[0];

  return (
    <Wrapper>
      {isPlan === false ? null : (
        <PlanWrite isPlan={isPlan} setIsPlan={setIsPlan} campId={campId} />
      )}
      <InfoBox>
        <Title>기본 정보</Title>
        <CampTitle>캠핑장 정보</CampTitle>
        <InfoBasic>
          <Basic>
            <li>환경 : {detailItem?.featureNm}</li>
            <li>유형 : {detailItem?.induty}</li>
            <li>운영기간 : {detailItem?.operPdCl}</li>
            <li>운영일 : {detailItem?.operDeCl} </li>
          </Basic>
        </InfoBasic>
        <HomeTitle>홈페이지 주소</HomeTitle>
        <HomeInfo>{detailItem?.homePage}</HomeInfo>

        <IntroTitle>한줄소개</IntroTitle>
        <IntroDuce>정보가 없습니다.</IntroDuce>

        <MidLane></MidLane>

        <FcInfoTitle>편의시설/주변 정보</FcInfoTitle>
        <FclDetail>편의시설 상세</FclDetail>
        <FclInfo>
          화장실 {detailItem?.toiletCo}개, 개수대 {detailItem?.wtrplCo}개 ,
          샤워실
          {detailItem?.swrmCo}개
        </FclInfo>
        <ThemEnv>테마환경</ThemEnv>
        <Theminfo>{detailItem?.themaEnvrnCl}</Theminfo>

        <NearTitle>주변 이용 시설</NearTitle>
        <NearInfo>{detailItem?.posblFcltyCl}</NearInfo>
        <AdTitle>체험 프로그램</AdTitle>
        <Adven>이용 가능한 체험프로그램이 없습니다.</Adven>
        <MidLane></MidLane>
      </InfoBox>

      <MapTitle>지도</MapTitle>
      <MapWrapper>
        <DetailMap />
        <BtnBox>
          <CopyToClipboard text={url}>
            <ClipBoardBtn onClick={copied}>
              <img src="/images/icon-share.svg" alt="share" />
            </ClipBoardBtn>
          </CopyToClipboard>
          {isLogin ? (
            <PlanBtn onClick={openPlan}>내 여행일정에 저장</PlanBtn>
          ) : (
            <PlanBtn className="none">로그인 후 일정 저장이 가능해요</PlanBtn>
          )}
        </BtnBox>
      </MapWrapper>
    </Wrapper>
  );
}

export default Ddetail;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 80px;
`;

const InfoBox = styled.div`
  width: 100%;
  position: relative;
  margin: 20px 10px;
  height: ${(props) => props.theme.pixelToRem(180)};
  min-height: ${(props) => props.theme.pixelToRem(650)};
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  margin-top: 18px;
`;

const CampTitle = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(15)};
  margin-top: 18px;
`;

const InfoBasic = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const HomeTitle = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  color: #222;
`;

const HomeInfo = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const IntroTitle = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(15)};
  margin-top: 30px;
`;

const IntroDuce = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const MidLane = styled.div`
  width: 95%;
  height: ${(props) => props.theme.pixelToRem(8)};
  margin-top: 20px;
  background-color: #f2f2f2;
`;

const Basic = styled.div`
  margin-top: 10px;
  li {
    margin: 10px;
  }
`;

const FcInfoTitle = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  margin-top: 20px;
`;

const FclDetail = styled.div`
  margin-top: 18px;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  color: #222;
`;

const FclInfo = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const ThemEnv = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  color: #222;
`;

const Theminfo = styled.div`
  margin-top: 10px;
  color: #666;
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const NearTitle = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  color: #222;
`;

const NearInfo = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

const AdTitle = styled.div`
  margin-top: 30px;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  color: #222;
`;

const Adven = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
`;

//
const MapWrapper = styled.div`
  margin: 0 auto;
  width: ${(props) => props.theme.pixelToRem(355)};
  height: ${(props) => props.theme.pixelToRem(162)};
  justify-content: center;
`;

const MapTitle = styled.div`
  margin-left: 10px;
  font-weight: 600;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;
  margin-bottom: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  margin: 10px;
  width: ${(props) => props.theme.pixelToRem(355)};
`;

const ClipBoardBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(70)};
  height: ${(props) => props.theme.pixelToRem(54)};
  border: 1px solid #e2e2e2;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: transparent;
  cursor: pointer;
`;

const PlanBtn = styled.button`
  margin-left: 14px;
  width: ${(props) => props.theme.pixelToRem(251)};
  height: ${(props) => props.theme.pixelToRem(54)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: none;
  background-color: #024873;
  color: #fff;
  cursor: pointer;

  &.none {
    background-color: ${(props) => props.theme.colorTheme.border};
  }
`;
