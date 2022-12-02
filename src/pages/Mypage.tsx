import React, { useEffect, useState } from "react";
import { isModal } from "../store/searchAtom";
import Search from "../components/withSearch/Search";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";

import ProfileModal from "../components/ProfileModal";

//Login
import { LoginState } from "../store/loginAtom";
import { useMyPageApi } from "../APIs/myPageApi";
import { useRecoilState } from "recoil";

//css
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Mypage() {
  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const [toKen, setToken] = useRecoilState(LoginState);
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const [isPopUp, setIsPopUp] = useState(false);
  const myReviewMatch = useMatch("/mypage/myreview");
  const myPickMatch = useMatch("/mypage/mypick");
  const myPlanMatch = useMatch("/mypage/myplan");
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(checkPf);
  // }, [checkPf]);

  return (
    <>
      {isSearch == false ? null : <Search />}
      <Wrapper>
        {toKen ? (
          <>
            <HeadText>campUs</HeadText>
            <UserProfile>
              <Profile>
                <>
                  <ProfileCircle>
                    <img
                      src={checkPf?.profileImg}
                      alt="PFP"
                      height={"75px"}
                      width={"75px"}
                      style={{ borderRadius: "125px", objectFit: "cover" }}
                    />
                  </ProfileCircle>
                  <ProfileText>
                    <Welcome>반갑습니다 {checkPf?.nickname} 님!</Welcome>
                    <Nickname>@email주소</Nickname>
                  </ProfileText>

                  <ProfileModal isPopUp={isPopUp} setIsPopUp={setIsPopUp} />
                </>

                {/* <Alarmbell> 
              <NotificationsNoneIcon sx={{ marginLeft: "10px" }} />
            </Alarmbell> */}
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
                  marginTop: "-120px",
                }}>
                <Outlet />
              </div>
            </UserProfile>
          </>
        ) : (
          <>
            <HeadText>campUs</HeadText>
            <UserProfile>
              <Profile>
                <ProfileText>
                  <Welcome style={{ margin: "50px", fontSize: "1.1rem" }}>
                    로그인 하고 더 많은 <br></br>기능을 사용해 보세요!
                  </Welcome>
                </ProfileText>
              </Profile>
              <LoginBox>
                <LoginBtn
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}>
                  로그인
                </LoginBtn>
                <SignBtn
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}>
                  회원가입
                </SignBtn>
              </LoginBox>
              <Tabs style={{ marginTop: "200px" }}>
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
                  marginTop: "20px",
                }}>
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
  display: flex;
  flex-direction: column;
  height: 95vh;
`;

const HeadText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(20)};
  margin-top: 20px;
  margin-left: 50px;
  line-height: 1.5;
  color: #222;
`;

const UserProfile = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: lightgray; */
`;

const Profile = styled.div`
  width: 100%;
  height: 70%;
  position: absolute;
  display: flex;
  align-items: center;
`;

const ProfileCircle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  margin: 25px;
`;

const ProfileText = styled.div`
  /* margin-top: -40px; */
`;

const Welcome = styled.div`
  margin-top: 8px;
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(22)};
  line-height: 1.27;
  /* text-align: left; */
`;

const Nickname = styled.div`
  margin-top: 5px;
`;

const ProfileArrow = styled.div`
  align-items: center;
  display: flex;
`;

const Alarmbell = styled.div``;

const LoginBox = styled.div`
  display: flex;
  gap: 15px;
  margin: 110px auto;
`;

const LoginBtn = styled.button`
  width: 180px;
  height: 48px;
  font-size: 1rem;
  border: 0.5px none grey;
  /* margin-top: 40px; */
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const SignBtn = styled.button`
  width: 180px;
  height: 48px;
  font-size: 1rem;
  border: 0.5px none grey;
  /* margin-top: 40px; */
  border-radius: 8px;
  color: whitesmoke;
  background-color: #024873;
  cursor: pointer;
`;

const Tabs = styled.div`
  width: 380px;
  display: flex;
  margin: 170px 45px;
  gap: 10px;
  position: absolute;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  background-color: ${(props) => props.theme.bgColor};
  padding: 7px 0px;
  /* border-bottom padding webkit */
  border-bottom: ${(props) => (props.isActive ? "3px solid black" : "none")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

//useForm사용해야 할 것 같다.
//userProfile변경위함.

//const { register, handleSubmit, watch, setValue } = useForm();
//watch = getter. , setValue = setter.
// const photo = watch("photo");
// console.log(photo);

// const onValid = async (data) => {
//   const title = data.title;
//   const content = data.content;
//   const image = data.photo[0];
//   const formData = new FormData();

//   formData.append("title", title);
//   formData.append("content", content);
//   formData.append("image", image);

//   const serverUrl = process.env.REACT_APP_API;

//   await axios({
//     method: "POST",
//     url: `${serverUrl}/posts`,
//     mode: "cors",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       accessToken: `${getCookie("accessToken")}`,
//       refreshToken: `${getCookie("refreshToken")}`,
//     },
//     data: formData,
//   });

//   navigate("/posts");
// };

// useEffect(() => {
//   setValue("photo", []);
// }, []);

// useEffect(() => {
//   if (photo && photo.length > 0) {
//     const file = photo[0];
//     setPreviewImg(URL.createObjectURL(file));
//   }
// }, [photo]);

//img 미리보기.
// const encodeFileToBase64 = (fileBlob) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(fileBlob);
//   return new Promise(() => {
//     reader.onload = () => {
//       setPreviewImg(reader.result);
//     };
//   });
// };
