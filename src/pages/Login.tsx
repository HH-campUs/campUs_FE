import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { ILoginForm } from "../interfaces/inLogin";

/* import { KAKAO_AUTH_URL } from "../components/KaKaoAuth"; */
import { LoginState, userInfo } from "../store/loginAtom";
import { instance } from "../instance/instance";
import { setAccessToken, setRefreshToken } from "../instance/cookies";
//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { InfoToast } from "../components/Toast/Toast";
import { useState } from "react";

function Login() {
  const serverUrl = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const [toastState, setToastState] = useState(false);

  const [toKen, setToken] = useRecoilState(LoginState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

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
      setAccessToken(response.data.Tokens.AccessToken);
      setRefreshToken(response.data.Tokens.RefreshToken);
      setToken(response.data.Tokens.AccessToken);

      setIsLoggedIn(true);
      window.location.replace("/");
      setToastState(true);
    }
  };

  /* 반영 중 */

  const KaKaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  };

  const GoogleLogin = async () => {
    window.location.href = `
https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&scope=email+profile`;
  };

  return (
    <LoginWrap>
      <Toast>
        {toastState == true ? (
          <InfoToast
            text={"환영합니다"}
            toastState={toastState}
            setToastState={setToastState}
          />
        ) : null}
      </Toast>
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 32 }}
            onClick={() => navigate("/")}
          />
        </div>
        <LoginText>로그인</LoginText>
      </LoginTitle>
      <Logo>
        <img src="/images/mypage/_campUs logo_5.svg" alt="" />
      </Logo>
      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <StInput
          {...register("email", {
            required: "mail을 입력해 주세요.",
            pattern: {
              value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
          placeholder="이메일"
        />
        <ErrorMessage> {errors.email?.message}</ErrorMessage>
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
        <ErrorMessage> {errors.password?.message}</ErrorMessage>
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
          <GoogleBtn onClick={GoogleLogin}>
            <img src="/images/GoogleCircle.svg" alt="GoogleLogin" />
          </GoogleBtn>
        </SocialBtnBox>
        <SignUpTextBox>
          <SignUpText>아직 회원이 아니신가요?</SignUpText>
          <SignUpLink onClick={() => navigate("/signup")}>회원가입</SignUpLink>
          <KeyboardArrowRightIcon sx={{ marginTop: "-5px" }} />
        </SignUpTextBox>
      </SocialBox>
    </LoginWrap>
  );
}

export default Login;

// ${(props) => props.theme.pixelToRem(375)};
const LoginWrap = styled.div`
  width: 100%;
  height: 105vh;
`;

const LoginTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 44px auto 0 auto; */
  margin-top: 44px;
  position: relative;

  div {
    margin-left: -20px;
    margin-right: 145px;
  }
`;

const Toast = styled.div`
  margin-left: 65px;
  /* transform: translateY(200px); */
`;

const LoginText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;
`;

const Logo = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  max-width: ${(props) => props.theme.pixelToRem(475)};
  justify-content: center;
  align-items: center;
  position: relative;
  /* margin: auto; */
  margin: auto;
  display: flex;
  transform: translateY(50px);
`;

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  gap: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 85px;
  span {
    color: var(--point-color);
  }
`;

const StInput = styled.input`
  width: ${(props) => props.theme.pixelToRem(327)};
  height: ${(props) => props.theme.pixelToRem(68)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
  border: 1px solid #dbdbdb;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  transition: all 0.5s linear;
  padding: 20px;
  &:focus {
    border: 1px solid #5185a6;
  }
`;

const ErrorMessage = styled.p`
  font-size: ${(props) => props.theme.pixelToRem(12)};
  color: red;
`;

const TextBox = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  position: relative;
  margin-top: 12px;
  left: ${(props) => props.theme.pixelToRem(100)};
  color: #909090;
  span {
    cursor: pointer;
  }
`;

const FindUserInfo = styled.p`
  color: ${(props) => props.theme.textColor};
`;

const StBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(327)};
  height: ${(props) => props.theme.pixelToRem(60)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
  border: 0.5px none grey;
  margin-top: 44px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  padding: 10px;
  background-color: #adc2ce;
  color: #fff;
  cursor: pointer;
`;

const SocialBox = styled.div`
  position: relative;
  text-align: center;
  margin: 38px 0;
  padding: 10px;
  flex-direction: column;
  display: flex;
`;

const SocialText = styled.p`
  color: #767676;
  font-size: ${(props) => props.theme.pixelToRem(14)};
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
  margin-top: 48px;
  color: ${(props) => props.theme.textColor};
  font-size: ${(props) => props.theme.pixelToRem(14)};
`;

const SignUpText = styled.p`
  margin-right: 10px;
  color: #767676;
`;

const SignUpLink = styled.p`
  color: #191919;
  cursor: pointer;
`;
