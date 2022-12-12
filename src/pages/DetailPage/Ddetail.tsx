import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetApi } from "../../APIs/getApi";

import DetailMap from "./DetailMap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SemiSearch from "../../components/withSearch/SemiSearch";

function Ddetail() {
  const url = window.location.href;
  const copied = () => {
    window.alert("복사완료");
  };
  const [isPlan, setIsPlan] = useState(false);
  const [openSemi, setOpenSemi] = useState(false);

  const openPlan = () => {
    setIsPlan(true);
  };

  const openModal = () => {
    setOpenSemi(true);
  };

  const { campId } = useParams();

  const detailItem: any = useGetApi.useGetCampDetail(campId)?.data;

  const checkItem = detailItem?.[0];

  return (
    <Wrapper>
      {openSemi == false ? null : (
        <SemiSearch openSemi={openSemi} setOpenSemi={setOpenSemi} />
      )}
      <InfoBox>
        <Title>기본 정보</Title>
        <CampTitle>캠핑장 정보</CampTitle>
        <InfoBasic>
          <Basic>
            <li>환경 : {checkItem?.featureNm}</li>
            <li>유형 : {checkItem?.induty}</li>
            <li>운영기간 : {checkItem?.operPdCl}</li>
            <li>운영일 : {checkItem?.operDeCl} </li>
          </Basic>
        </InfoBasic>
        <HomeTitle>홈페이지 주소</HomeTitle>
        <HomeInfo>{checkItem?.homePage}</HomeInfo>

        <IntroTitle>한줄소개</IntroTitle>
        <IntroDuce>정보가 없습니다.</IntroDuce>

        <MidLane></MidLane>

        <FcInfoTitle>편의시설/주변 정보</FcInfoTitle>
        <FclDetail>편의시설 상세</FclDetail>
        <FclInfo>
          화장실 {checkItem?.toiletCo}개, 개수대 {checkItem?.wtrplCo}개 , 샤워실
          {checkItem?.swrmCo}개
        </FclInfo>
        <ThemEnv>테마환경</ThemEnv>
        <Theminfo>{checkItem?.themaEnvrnCl}</Theminfo>

        <NearTitle>주변 이용 시설</NearTitle>
        <NearInfo>{checkItem?.posblFcltyCl}</NearInfo>
        <AdTitle>체험 프로그램</AdTitle>
        <Adven>이용 가능한 체험프로그램이 없습니다.</Adven>
        <MidLane></MidLane>
      </InfoBox>

      <MapWrapper>
        <MapTitle>지도</MapTitle>
        <DetailMap />
      </MapWrapper>
      <BtnBox>
        <CopyToClipboard text={url}>
          <ClipBoardBtn onClick={copied}>
            <img src="/images/icon-share.svg" alt="share" />
          </ClipBoardBtn>
        </CopyToClipboard>
        <PlanBtn onClick={openPlan}>내 여행일정에 저장</PlanBtn>
      </BtnBox>
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
  position: relative;
  width: ${(props) => props.theme.pixelToRem(375)};
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
  width: ${(props) => props.theme.pixelToRem(375)};
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

const BasicInfo = styled.div`
  margin-top: 5px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 300;
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

const MapWrapper = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(162)};
  justify-content: center;
`;

const MapTitle = styled.div`
  margin-left: -10px;
  font-weight: 600;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;
  margin-bottom: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  margin-top: 60px;
  margin-left: 20px;
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
`;
