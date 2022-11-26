import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { ILoginForm } from "../interfaces/inLogin";

import { KAKAO_AUTH_URL } from "../components/KaKaoAuth";
import { LoginState, userInfo } from "../store/loginAtom";
import { instance } from "../instance/instance";
import { setAccessToken, setRefreshToken } from "../instance/cookies";

//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Login() {
  const serverUrl = process.env.REACT_APP_API;
  const navigate = useNavigate();
  //로그인상태관리 - recoil-persist사용 -> localstorage토큰저장.
  const [toKen, setToken] = useRecoilState(LoginState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  // export const signin = async (payload) => {
  //   const data = await instance.post("users/login", payload);
  //   return data;
  // };

  // export const instance = axios.create({
  //   baseURL: process.env.REACT_APP_API,
  //   headers: {
  //     // "content-type": "application/json;charset=utf-8",
  //     // accept: "application/json, ",
  //     Authorization: `Bearer ${myToken}, ${refreshToken}`,
  //     "Cache-Control": "no-cache",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   withCredentials: true,
  // });

  const loginApi = async (payload: ILoginForm) => {
    const data = await instance.post("users/login", {
      email: payload.email,
      password: payload.password,
    });
    return data;
  };

  const handleValid = async (data: ILoginForm) => {
    const response = await loginApi(data);

    if (response.status === 200) {
      //리스폰스확인필!
      setAccessToken(response.data.Tokens.AccessToken);
      setRefreshToken(response.data.Tokens.RefreshToken);
      setToken(response.data.Tokens.AccessToken);

      setIsLoggedIn(true);
      window.location.replace("/");
    }
    console.log(response.data);
  };

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

      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <StInput
          {...register("email", {
            required: "Emial을 입력해 주세요.",
            pattern: {
              value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
          placeholder="이메일"
        />
        <StInput
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            maxLength: {
              value: 20,
              message: "20자리 이하로 작성해주세요",
            },
            minLength: {
              value: 8,
              message: "8자리 이상으로 작성해주세요",
            },
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message:
                "영어, 대문자, 특수기호(!@#$%&)가 포함된 8~20자리 입니다.",
            },
          })}
          placeholder="비밀번호"
          type="password"
        />

        <TextBox>
          <FindUserInfo>
            <span>아이디 / 비밀번호 찾기</span>
          </FindUserInfo>
        </TextBox>
        <StBtn>로그인</StBtn>
      </LoginForm>

      <SocialBox>
        <SocialText>SNS계정으로 로그인</SocialText>
        <SocialBtnBox>
          <KakaoBtn onClick={KaKaoLogin}>
            <img src="/images/kakaoCircle.svg" alt="kakaoLogin" />
          </KakaoBtn>
          <GoogleBtn>
            <img src="/images/GoogleCircle.svg" alt="GoogleLogin" />
          </GoogleBtn>
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
  border: 1px solid grey;
  border-radius: 8px;
  transition: all 0.5s linear;

  padding: 10px;
  &:focus {
    border: 1px solid #5185a6;
  }
`;

//  #5185A6 #024873;

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
  cursor: pointer;
`;

const SocialBox = styled.div`
  position: relative;
  text-align: center;
  margin: 25px 0;
  padding: 10px;
  flex-direction: column;
  display: flex;
`;

const SocialText = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 0.75rem;
`;

const SocialBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const KakaoBtn = styled.div`
  cursor: pointer;
`;

const GoogleBtn = styled.div`
  cursor: pointer;
`;

const SignUpTextBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.75rem;
`;

const SignUpText = styled.p`
  margin-right: 10px;
  color: gray;
`;

const SignUpLink = styled.p`
  cursor: pointer;
`;
