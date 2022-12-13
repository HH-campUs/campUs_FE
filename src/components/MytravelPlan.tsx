import { useRecoilValue } from "recoil";
import { LoginState } from "../store/loginAtom";
import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../instance/cookies";
import { useGetApi, useGetTravelPlan2 } from "../APIs/getApi";

//css
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function MytravelPlan() {
  // const isLogin = useRecoilValue(LoginState);
  const data = useGetTravelPlan2();

  console.log(data);
  const navigate = useNavigate();
  const isLogin = getCamperToken();
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
        <PlanBox>
          <ImgBox />
          <PlaceName>
            <PlaceBox>
              <Campname className="isLogin">캠핑장이름</Campname>
              <Dday>D-16</Dday>
            </PlaceBox>
            <Location>
              <LocationOnIcon />
              <span> 주소 </span>
              <img src="/images/Calendar.svg" alt="Calendar" />
              <p>2022.12.28</p>
            </Location>
          </PlaceName>
        </PlanBox>
      ) : (
        <CloseBox>
          <CloBox>
            <Carlendar>
              <img src="/images/travelplan/calendarplan.svg" alt="carlendar" />
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
{
  /* <HiddenBox></HiddenBox> */
}
const Wrapper = styled.div`
  /* background-color: red; */
  margin-top: ${(props) => props.theme.pixelToRem(40)};
  width: 100%;
  /* margin: 20px 10px 20px 10px; */
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
  width: 90%;
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
  /* position: relative; */
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

export const ImgBox = styled.div`
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

  line-height: 1.25;
  letter-spacing: normal;
  color: #222;
  line-height: 1.25;
  islogin {
    background-color: grey;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  margin-top: ${(props) => props.theme.pixelToRem(3)};
  /* background-color: red; */

  span {
    width: ${(props) => props.theme.pixelToRem(105)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  img {
    margin-left: ${(props) => props.theme.pixelToRem(5)};
  }
  /* margin-top: ${(props) => props.theme.pixelToRem(11)}; */
  /* background-color: blue; */
`;

const Dday = styled.div`
  width: ${(props) => props.theme.pixelToRem(66)};
  height: ${(props) => props.theme.pixelToRem(26)};
  margin-top: ${(props) => props.theme.pixelToRem(14)};
  margin-right: ${(props) => props.theme.pixelToRem(9)};
  font-size: ${(props) => props.theme.pixelToRem(14)};
  border-radius: 1rem;
  background-color: #5185a6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
