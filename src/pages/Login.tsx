import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { ILoginForm } from "../interfaces/inLogin";

//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { KAKAO_AUTH_URL } from "../components/KaKaoAuth";
import { LoginState } from "../store/loginAtom";
import { recoilPersist } from "recoil-persist";

import { useMutation } from "@tanstack/react-query";

// import kakaoLogin from "../assets/image/";
//import Kakao from "../KaKaoIcon";

const LoginWrap = styled.div`
  height: 95vh;
`;

const LoginTitle = styled.div`
  display: flex;
  align-items: center;
`;

const LoginText = styled.div`
  justify-content: center;
  padding-left: 170px;
`;

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  gap: 20px;
  margin-top: 95px;
  span {
    color: var(--point-color);
  }
`;

const StInput = styled.input`
  width: 350px;
  height: 61px;
  font-size: 16px;
  border: 2px solid grey;
  border-radius: 8px;
  transition: all 0.5s linear;
  padding: 10px;
  &:focus {
    border: 2px solid red;
    //outline: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  font-size: 13px;
  position: absolute;

  margin-top: 155px;
  margin-left: 230px;

  span {
    cursor: pointer;
  }
`;

const FindUserInfo = styled.p`
  color: ${(props) => props.theme.textColor};
`;

const StBtn = styled.button`
  width: 350px;
  height: 61px;
  font-size: 16px;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  padding: 10px;
  color: ${(props) => props.theme.textColor};
`;

const SocialBox = styled.div`
  position: relative;
  text-align: center;
  margin-top: 25px;
`;

const SocialText = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
`;

const SocialBtnBox = styled.div`
  position: absolute;
  margin-top: -15px;
  margin-left: 60px;
`;

const KakaoBtn = styled.img`
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 30px;
  width: 80px;
  height: 36px;
  margin-left: 100px;
`;

const GoogleBtn = styled.img`
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 28px;
  width: 80px;
  height: 40px;
  margin-left: 170px;
`;

const SignUpTextBox = styled.div`
  display: flex;
  position: absolute;
  margin-top: 100px;
  margin-left: 125px;
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
`;

const SignUpText = styled.p`
  margin-right: 10px;
`;

const SignUpLink = styled.p`
  justify-content: center;
  text-align: center;
  align-items: center;
  color: black;
  cursor: pointer;
`;

function Login() {
  const serverUrl = process.env.REACT_APP_API;
  const navigate = useNavigate();
  //로그인상태관리 - recoil-persist사용 -> localstorage토큰저장.
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const { register, handleSubmit, watch, setValue } = useForm<ILoginForm>();
  const handleValid = (data: ILoginForm) => {};

  const KaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginWrap>
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 40 }}
            onClick={() => navigate("/")}
          />
        </div>

        <LoginText>로그인</LoginText>
      </LoginTitle>
      {/* Form Start */}
      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <StInput
          {...register("email", {
            required: "validation Id",
          })}
          placeholder="이메일"
        />
        <StInput
          {...register("password", {
            required: "validation Password",
          })}
          placeholder="비밀번호"
        />

        <TextBox>
          <FindUserInfo>
            <span>아이디 / 비밀번호 찾기</span>
          </FindUserInfo>
        </TextBox>
        <StBtn>로그인</StBtn>
      </LoginForm>
      {/* Form End */}
      {/* Login아래 */}
      <SocialBox>
        <SocialText>SNS계정으로 로그인</SocialText>
        <SocialBtnBox>
          <KakaoBtn
            onClick={KaKaoLogin}
            src="/images/kakao_login_medium.png"
            alt="kakaoLogin"
          />
          <GoogleBtn
            src="/images/btn_google_light_normal_ios.svg"
            alt="GoogleLogin"
          />
        </SocialBtnBox>
        <SignUpTextBox>
          <SignUpText>아직 회원이 아니신가요?</SignUpText>
          <SignUpLink onClick={() => navigate("/signup")}>회원가입</SignUpLink>
          <KeyboardArrowRightIcon sx={{ marginTop: "-6.5px" }} />
        </SignUpTextBox>
      </SocialBox>
    </LoginWrap>
  );
}

export default Login;

{
  //위치수정해야함
  /* <Kakao /> */
}
