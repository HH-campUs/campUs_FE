import React, { useState } from "react";

import {
  Link,
  Navigate,
  Outlet,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import KaKaomap from "../components/KaKaomap";

const UserProfile = styled.div`
  height: 190px;
  display: flex;
  position: relative;
  background-color: lightgray;
`;

const Profile = styled.div`
  width: 100%;
  height: 110px;
  position: absolute;
  display: flex;
`;

const ProfileCircle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  background-color: grey;
  margin: 25px;
`;

const Welcome = styled.div`
  margin: 35px 120px;
  font-weight: 500;
  position: absolute;
`;

const Nickname = styled.div`
  margin: 75px -7px;
`;

const LoginBox = styled.div`
  display: flex;
  height: 80px;
  padding: 25px;
  gap: 15px;
  margin: 35px 100px;
`;

const LoginBtn = styled.button`
  width: 100px;
  height: 30px;
  font-size: 16px;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const SignBtn = styled.button`
  width: 100px;
  height: 30px;
  font-size: 16px;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const Tabs = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  margin: 155px 45px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 33%;
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
  background-color: ${(props) => props.theme.bgColor};
  //rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  /* border-bottom padding webkit */
  border-bottom: ${(props) => (props.isActive ? "3px solid black" : "none")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Mypage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const myReviewMatch = useMatch("/mypage/:id/myreview");
  const navigate = useNavigate();

  return (
    <>
      {LoggedIn ? (
        <UserProfile>
          <Profile>
            <ProfileCircle></ProfileCircle>
            <Welcome>반갑습니다, 인원님!</Welcome>
            <Nickname>@nickName</Nickname>
          </Profile>

          <Tabs>
            <Tab isActive={Boolean(myReviewMatch)}>
              <Link to="/mypage/:id/myreview">내 리뷰</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </UserProfile>
      ) : (
        <UserProfile>
          <Profile>
            <Welcome>
              로그인 하고 더 많은 <br></br>기능을 사용해 보세요!
            </Welcome>
          </Profile>

          <LoginBox>
            <LoginBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </LoginBtn>
            <SignBtn
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </SignBtn>
          </LoginBox>

          <Tabs>
            <Tab isActive={Boolean(myReviewMatch)}>
              <Link to="/mypage/:id/myreview">내 리뷰</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </UserProfile>
      )}
      <div style={{ marginLeft: "150px" }}>
        <KaKaomap />
      </div>
    </>
  );
}

export default Mypage;

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
