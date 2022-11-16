import { borderBottom } from "@mui/system";
import React from "react";

import { Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";

const UserProfile = styled.div`
  height: 170px;
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
  margin: 60px -7px;
`;

const Tabs = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  margin: 135px 45px;
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
  const myReviewMatch = useMatch("/mypage/:id/myreview");

  // const onClick = (event: any) => {
  //   event.target.value(setClicked(''));
  // };

  return (
    <>
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
          {/* <Tab isActive={myReviewMatch !== null}>
            <Link to="/:id/myreview"> 내 리뷰 </Link>
          </Tab>
          <Tab isActive={myReviewMatch !== null}>
            <Link to="/:id/myreview"> 내 리뷰 </Link>
          </Tab> */}
        </Tabs>
        <Outlet />
      </UserProfile>
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

// const encodeFileToBase64 = (fileBlob) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(fileBlob);
//   return new Promise(() => {
//     reader.onload = () => {
//       setPreviewImg(reader.result);
//     };
//   });
// };
