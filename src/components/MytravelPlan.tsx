import { useRecoilValue } from "recoil";
import { LoginState } from "../store/loginAtom";
import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../instance/cookies";
import { useGetApi, useGetTravelPlan2 } from "../APIs/getApi";

//css
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function MytravelPlan() {
  const data = useGetTravelPlan2();
  const trip = data?.myTrip?.trip[0];
  console.log(trip);
  const navigate = useNavigate();
  const isLogin = getCamperToken();

  const DdayCalculator = (date: string) => {
    const planDay = new Date(date);
    const today = new Date();
    const gap = planDay.getTime() - today.getTime();
    const result = Math.floor(gap / (1000 * 60 * 60 * 24) + 1);

    console.log(result, typeof result);
    return result;
  };

  return (
    <Wrapper>
      <TextBox>
        <MyPlan>내 여행일정</MyPlan>
        <AllList
          onClick={() => {
            navigate("/mypage/myplan");
          }}>
          전체보기
        </AllList>
      </TextBox>

      {isLogin ? (
        trip !== undefined ? (
          <PlanBox>
            <ImgBox src={trip?.ImageUrl} alt="img" />
            <PlaceName>
              <PlaceBox>
                <Campname className="isLogin">{trip?.campName}</Campname>
                <Dday>D - {DdayCalculator(trip.date)}</Dday>
              </PlaceBox>
              <Location>
                <LocationOnIcon />
                <span> {trip?.address} </span>
                <img
                  src="/images/Calendar.svg"
                  alt="Calendar"
                  width="50"
                  height="50"
                />
                <p>
                  {trip?.date.slice(0, 4)}.{trip?.date.slice(5, 7)}.
                  {trip?.date.slice(8, 10)}
                </p>
              </Location>
            </PlaceName>
          </PlanBox>
        ) : (
          <CloseBox>
            <CloBox>
              <Carlendar>
                <img
                  src="/images/travelplan/calendarplan.svg"
                  alt="carlendar"
                  width="50"
                  height="50"
                />
              </Carlendar>
              <CloseText>
                <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                  캠핑장을 검색하고
                </p>
                &nbsp;
                <span>내 여행일정을 등록해 보세요</span>
              </CloseText>
            </CloBox>
          </CloseBox>
        )
      ) : (
        <CloseBox>
          <CloBox>
            <Carlendar>
              <img
                src="/images/travelplan/calendarplan.svg"
                alt="carlendar"
                width="50"
                height="50"
              />
            </Carlendar>
            <CloseText>
              <p
                onClick={() => {
                  navigate("/login");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}>
                로그인하고
              </p>
              &nbsp;
              <span>내 여행일정을 등록해 보세요</span>
            </CloseText>
          </CloBox>
        </CloseBox>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(40)};
  width: 100%;
`;

const TextBox = styled.div`
  margin-top: ${(props) => props.theme.pixelToRem(15)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const MyPlan = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(20)};
  margin-left: ${(props) => props.theme.pixelToRem(20)};
`;

const AllList = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-right: ${(props) => props.theme.pixelToRem(20)};
  color: grey;
`;

const PlanBox = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pixelToRem(365)};
  height: ${(props) => props.theme.pixelToRem(102)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #f5f5f5;
  display: flex;
  margin-top: ${(props) => props.theme.pixelToRem(18)};
  margin-left: ${(props) => props.theme.pixelToRem(20)};
`;

const PlaceName = styled.div`
  width: ${(props) => props.theme.pixelToRem(235)};
  height: ${(props) => props.theme.pixelToRem(73)};
  justify-content: space-between;
  padding-left: 14px;
`;

const PlaceBox = styled.div`
  display: flex;
`;

const CloseBox = styled.div`
  width: 90%;
  height: ${(props) => props.theme.pixelToRem(102)};
  margin-left: 20px;
  margin-top: ${(props) => props.theme.pixelToRem(15)};
`;

const CloBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #bab8b0;
  font-size: ${(props) => props.theme.pixelToRem(13)};
  display: flex;
  z-index: 3;
`;

const Carlendar = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: ${(props) => props.theme.pixelToRem(20)};
`;

const CloseText = styled.div`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => props.theme.pixelToRem(15)};
  color: whitesmoke;
  font-weight: 550;
  flex-direction: column;

  p {
    font-size: ${(props) => props.theme.pixelToRem(14)};
    cursor: pointer;
    color: #666;
  }

  span {
    font-size: ${(props) => props.theme.pixelToRem(16)};
  }
`;

const HiddenBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(102)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};

  background-color: rgba(100, 100, 100, 0.1);
  margin: 15px auto;
  font-size: ${(props) => props.theme.pixelToRem(13)};
  display: flex;
`;

export const ImgBox = styled.img`
  width: ${(props) => props.theme.pixelToRem(70)};
  height: ${(props) => props.theme.pixelToRem(70)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: grey;
  margin-top: 16px;
  margin-left: 16px;
`;

const Campname = styled.div`
  width: ${(props) => props.theme.pixelToRem(145)};
  margin-top: ${(props) => props.theme.pixelToRem(18)};
  margin-left: ${(props) => props.theme.pixelToRem(5)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #222;

  islogin {
    background-color: grey;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  margin-top: ${(props) => props.theme.pixelToRem(23)};

  span {
    width: ${(props) => props.theme.pixelToRem(105)};
    font-size: ${(props) => props.theme.pixelToRem(12)};
    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  img {
    margin-left: ${(props) => props.theme.pixelToRem(5)};
  }
`;

const Dday = styled.div`
  width: ${(props) => props.theme.pixelToRem(66)};
  height: ${(props) => props.theme.pixelToRem(26)};
  margin-top: ${(props) => props.theme.pixelToRem(14)};
  margin-right: ${(props) => props.theme.pixelToRem(-1)};
  font-size: ${(props) => props.theme.pixelToRem(14)};
  border-radius: 1rem;
  background-color: #5185a6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
