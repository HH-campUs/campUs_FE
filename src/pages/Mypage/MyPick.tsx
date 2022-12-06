import { useEffect } from "react";
import { useMyPageApi } from "../../APIs/myPageApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPickedCamp } from "../../interfaces/Posts";
import { getCamperToken } from "../../instance/cookies";

export default function MyPick() {
  // const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const isLogin = getCamperToken();
  //백엔드 로직 자체가 userId를 주는 거라서, 예외처리해서 찜 못하게 막아야 할 듯..?
  const myPick = useMyPageApi.useGetMyPick().data?.data.Pick;
  const picked = myPick?.map((picks: IPickedCamp) => picks.Camp) || [];
  console.log(picked);
  console.log(myPick);
  // const picke = mypick?.~~~~~ || [];
  // const { Pick } = useMyPageApi.useGetMyPage().data?.data;
  // console.log(Pick);
  // const picked = Pick?.map((picks: IPickedCamp) => picks.Camp);
  // console.log(picked);
  useEffect(() => {
    console.log(picked);
  }, [picked]);

  return (
    <Wrapper>
      {isLogin ? (
        <MapBox>
          {picked.map((pick: IPickedCamp, campId: IPickedCamp) => (
            <Box key={pick.campId}>
              <CampImg src={pick.ImageUrl} alt="" />
              <NameBox>
                <CampName>{pick.campName}</CampName>
                <CampDuty>{pick.induty}</CampDuty>
              </NameBox>

              <CampAddress>{pick.address}</CampAddress>
            </Box>
          ))}
        </MapBox>
      ) : (
        <>
          <NotiBox>
            <div>
              <img src="/images/mypage/tent.svg" alt="tent" />
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* background-color: red; */
  /* margin-top: 130px; */
  height: 100vh;
  /* margin-bottom: 500px; */
  min-height: 500px;
  overflow-y: scroll;
`;

const MapBox = styled.div`
  margin-bottom: 250px;
  /* background-color: blue; */
`;

const Box = styled.div`
  width: 335px;
  margin: 20px auto;
  /* justify-content: center; */
  /* text-align: left; */
  flex-direction: column;
  display: flex;
`;

const CampImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.pixelToRem(8)};
`;

const NameBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CampName = styled.div`
  display: flex;
  /* position: absolute; */
  margin-top: 15px;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222222;
  text-align: left;
`;

const CampDuty = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: flex-end;
  color: grey;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  text-align: right;
  padding-top: 15px;
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
  cursor: pointer;
`;
