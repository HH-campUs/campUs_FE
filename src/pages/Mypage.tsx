import { useState } from "react";
import { isModal } from "../store/searchAtom";
import Search from "../components/withSearch/Search";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";

//Login

import { useMyPageApi } from "../APIs/myPageApi";
import { useRecoilState } from "recoil";
import { getCamperToken } from "../instance/cookies";

//css
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Mypage() {
  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const [isPopUp, setIsPopUp] = useState(false);
  const myReviewMatch = useMatch("/mypage/myreview");
  const myPickMatch = useMatch("/mypage/mypick");
  const myPlanMatch = useMatch("/mypage/myplan");
  const navigate = useNavigate();

  const isLogin = getCamperToken();

  return (
    <>
      {isSearch == false ? null : <Search />}
      <Wrapper>
        {isLogin ? (
          <>
            <UserProfile>
              <LoginProfile>
                <HeadText>
                  <img src="/images/mypage/campUs logo.svg" alt="" />{" "}
                </HeadText>
                <ProfileBox>
                  <ProfileCircle>
                    <img src={checkPf?.profileImg} alt="PFP" />
                  </ProfileCircle>
                  <LoginPfText>
                    <Nickname>{checkPf?.nickname} 님!</Nickname>
                    <EmailAddress>{checkPf?.email}</EmailAddress>
                  </LoginPfText>
                  <ProfileModal isPopUp={isPopUp} setIsPopUp={setIsPopUp} />
                </ProfileBox>
                <Line></Line>
              </LoginProfile>

              <Tabs>
                <Tab isActive={Boolean(myPickMatch)}>
                  <Link to="/mypage/mypick">찜한 캠핑장</Link>
                </Tab>
                <Tab isActive={Boolean(myPlanMatch)}>
                  <Link to="/mypage/myplan">여행일정</Link>
                </Tab>
                <Tab isActive={Boolean(myReviewMatch)}>
                  <Link to="/mypage/myreview">내 리뷰</Link>
                </Tab>
              </Tabs>
              <div>
                <Outlet />
              </div>
            </UserProfile>
          </>
        ) : (
          <>
            <UserProfile>
              <Profile>
                <HeadText>
                  {" "}
                  <img src="/images/mypage/campUs logo.svg" alt="" />
                </HeadText>
                <ProfileText>
                  <Welcome>
                    로그인 하고 더 많은 <br></br>기능을 사용해 보세요!
                  </Welcome>
                </ProfileText>
                <LoginBox>
                  <LoginBtn
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    로그인
                  </LoginBtn>
                  <SignBtn
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    회원가입
                  </SignBtn>
                </LoginBox>
              </Profile>

              <Tabs>
                <Tab isActive={Boolean(myPickMatch)}>
                  <Link to="/mypage/mypick">찜한 캠핑장</Link>
                </Tab>
                <Tab isActive={Boolean(myPlanMatch)}>
                  <Link to="/mypage/myplan">여행일정</Link>
                </Tab>
                <Tab isActive={Boolean(myReviewMatch)}>
                  <Link to="/mypage/myreview">내 리뷰</Link>
                </Tab>
              </Tabs>
              <div
                style={{
                  // height: "100vh",
                  marginTop: "20px",
                }}
              >
                <Outlet />
              </div>
            </UserProfile>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Mypage;

const Wrapper = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* background-color: red; */
`;

const HeadText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(20)};
  margin-top: 20px;
  margin-left: 20px;
  line-height: 1.5;
  color: #222;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Profile = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(286)};
  background-color: #f5f5f5;
`;

const LoginProfile = styled.div``;

const ProfileBox = styled.div`
  display: flex;
`;

const ProfileCircle = styled.div`
  margin: 24px 14px 17px 20px;

  img {
    width: ${(props) => props.theme.pixelToRem(48)};
    height: ${(props) => props.theme.pixelToRem(48)};
    border-radius: ${(props) => props.theme.pixelToRem(48)};
    object-fit: cover;
  }
`;

const LoginPfText = styled.div``;

const Nickname = styled.div`
  margin-top: 27px;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  font-weight: 500;
  color: #222;
`;

const EmailAddress = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(14)};
  color: #666;
  margin-top: 5px;
`;

const ProfileText = styled.div`
  display: flex;
`;

const Welcome = styled.div`
  margin-top: 48px;
  margin-left: 20px;
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(18)};
  line-height: 1.27;
  color: #666;
`;

const LoginBox = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 20px;
  gap: ${(props) => props.theme.pixelToRem(11)};
`;

const LoginBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(162)};
  height: ${(props) => props.theme.pixelToRem(48)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: 1px solid #024873;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #fff;
  color: #024873;
  cursor: pointer;
`;

const SignBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(162)};
  height: ${(props) => props.theme.pixelToRem(48)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: 1px solid #024873;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  color: #fff;
  background-color: #024873;
  cursor: pointer;
`;

const Tabs = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(25)};
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  gap: ${(props) => props.theme.pixelToRem(16)};
`;

const Tab = styled.span<{ isActive: boolean }>`
  /* background-color: red; */
  font-size: ${(props) => props.theme.pixelToRem(20)};
  font-weight: 600;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "none")};
  color: ${(props) => (props.isActive ? "#222" : "#ccc")};
  height: 100vh;
`;

const Line = styled.div`
  border-bottom: 1px solid #eee;
  width: ${(props) => props.theme.pixelToRem(355)};
  margin: 10px auto;
`;
