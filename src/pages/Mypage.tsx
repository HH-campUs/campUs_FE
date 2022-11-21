import React, { useState } from "react";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import ProfileModal from "../components/ProfileModal";

function Mypage() {
  const [LoggedIn, setLoggedIn] = useState(true);
  // const [modalOpen, setModalOpen] = useState<myModal>(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const myReviewMatch = useMatch("/mypage/:id/myreview");
  const myPickMatch = useMatch("/mypage/:id/mypick");
  const myPlanMatch = useMatch("/mypage/:id/myplan");
  const navigate = useNavigate();

  return (
    <Wrapper>
      {LoggedIn ? (
        <UserProfile>
          <Profile>
            <>
              <ProfileCircle>
                <img
                  src="/images/blank-profile-picture-973460_1280.webp"
                  alt="PFP"
                  height={"75px"}
                />
              </ProfileCircle>
              <ProfileText>
                <Welcome>반갑습니다, 인원님!</Welcome>
                <Nickname>@nickName</Nickname>
              </ProfileText>
              <ProfileArrow>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: 30, cursor: "pointer" }}
                />
              </ProfileArrow>
              <ProfileModal isPopUp={isPopUp} setIsPopUp={setIsPopUp} />
            </>

            {/* <Alarmbell>
              <NotificationsNoneIcon sx={{ marginLeft: "10px" }} />
            </Alarmbell> */}
          </Profile>

          <Tabs>
            <Tab isActive={Boolean(myPickMatch)}>
              <Link to="/mypage/:id/mypick">찜한 캠핑장</Link>
            </Tab>
            <Tab isActive={Boolean(myPlanMatch)}>
              <Link to="/mypage/:id/myplan">여행일정</Link>
            </Tab>
            <Tab isActive={Boolean(myReviewMatch)}>
              <Link to="/mypage/:id/myreview">내 리뷰</Link>
            </Tab>
          </Tabs>
          <div
            style={{
              marginTop: "-120px",
            }}>
            <Outlet />
          </div>
        </UserProfile>
      ) : (
        <UserProfile>
          <Profile>
            <ProfileText>
              <Welcome style={{ margin: "20px", fontSize: "1.1rem" }}>
                로그인 하고 더 많은 <br></br>기능을 사용해 보세요!
              </Welcome>
            </ProfileText>
          </Profile>
          <LoginBox>
            <LoginBtn
              onClick={() => {
                navigate("/login");
              }}>
              로그인
            </LoginBtn>
            <SignBtn
              onClick={() => {
                navigate("/signup");
              }}>
              회원가입
            </SignBtn>
          </LoginBox>
          <Tabs style={{ marginTop: "200px" }}>
            <Tab isActive={Boolean(myPickMatch)}>
              <Link to="/mypage/:id/mypick">찜한 캠핑장</Link>
            </Tab>
            <Tab isActive={Boolean(myPlanMatch)}>
              <Link to="/mypage/:id/myplan">여행일정</Link>
            </Tab>
            <Tab isActive={Boolean(myReviewMatch)}>
              <Link to="/mypage/:id/myreview">내 리뷰</Link>
            </Tab>
          </Tabs>
          <div
            style={{
              marginTop: "20px",
            }}>
            <Outlet />
          </div>
        </UserProfile>
      )}
    </Wrapper>
  );
}

{
  /* <>
<ProfileCircle>
  <img
    src="/images/abstract-user-flat-4.png"
    alt="PFP"
    height={"75px"}
  />
</ProfileCircle>
<ProfileText>
  <Welcome>반갑습니다, 인원님!</Welcome>
  <Nickname>@nickName</Nickname>
</ProfileText>

<ProfileArrow>
  <KeyboardArrowRightIcon
    sx={{ fontSize: 30, cursor: "pointer" }}
  />
</ProfileArrow>
<EditBtn onClick={EditProfileHandler}>완료</EditBtn>
</> */
}

export default Mypage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
`;

const UserProfile = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: lightgray;
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

const ProfileText = styled.div``;

const Welcome = styled.div`
  font-weight: 500;
`;

const Nickname = styled.div`
  margin-top: 5px;
`;

const ProfileArrow = styled.div`
  align-items: center;
  display: flex;
`;

const EditBtn = styled.button`
  border-radius: 8px;
  font-size: 0.9rem;
  margin-left: 100px;
`;

const Alarmbell = styled.div``;

const LoginBox = styled.div`
  display: flex;
  gap: 15px;
  margin: 70px auto;
`;

const LoginBtn = styled.button`
  width: 180px;
  height: 48px;
  font-size: 1rem;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const SignBtn = styled.button`
  width: 180px;
  height: 48px;
  font-size: 1rem;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  color: whitesmoke;
  background-color: grey;
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