import { useMyPageApi } from "../../APIs/myPageApi";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { IPickedCamp } from "../../interfaces/Posts";
import { getCamperToken } from "../../instance/cookies";
import MyPickDelete from "../../components/MyPickDelete";

export default function MyPick() {
  const navigate = useNavigate();
  const isLogin = getCamperToken();

  const params = useParams();
  const myPick = useMyPageApi.useGetMyPick().data?.data.Pick;
  const picked = myPick?.map((picks: IPickedCamp) => picks.Camp) || [];

  return (
    <Wrapper>
      {isLogin ? (
        <MapBox>
          {picked.map((pick: IPickedCamp, campId: IPickedCamp) => (
            <Box key={pick.campId}>
              <MyPickDelete pick={pick} />
              <NameBox>
                <CampName>{pick.campName}</CampName>
                <CampDuty>
                  {pick?.induty.split(",").map((duty, i) => (
                    <DutyBox key={i}>
                      <Duties>{duty}</Duties>
                    </DutyBox>
                  ))}
                </CampDuty>
              </NameBox>

              <CampAddress>{pick.address}</CampAddress>
            </Box>
          ))}
        </MapBox>
      ) : (
        <>
          <NotiBox>
            <div>
              <img src="/images/mypage/newtent.svg" alt="tent" />
            </div>
            <PickText>아직 찜한 캠핑장이 없어요!</PickText>
            <PickBtn
              onClick={() => {
                navigate(`/topic/1`);
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
`;

const DutyBox = styled.div`
  border-radius: ${(props) => props.theme.pixelToRem(1)};
  color: #666;
  text-align: center;
  margin-top: 15px;
`;

const Duties = styled.div`
  padding-top: 5px;
  background-color: #f5f5f5;
  margin-left: 5px;
  width: ${(props) => props.theme.pixelToRem(65)};
  height: ${(props) => props.theme.pixelToRem(20)};
  font-size: ${(props) => props.theme.pixelToRem(12)};
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
