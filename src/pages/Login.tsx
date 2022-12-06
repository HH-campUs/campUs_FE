import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { ILoginForm } from "../interfaces/inLogin";
import axios from "axios";

/* import { KAKAO_AUTH_URL } from "../components/KaKaoAuth"; */
import { idState, LoginState, userInfo } from "../store/loginAtom";
import { instance } from "../instance/instance";
import { setAccessToken, setRefreshToken } from "../instance/cookies";
//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Login() {
  const serverUrl = process.env.REACT_APP_API;
  const navigate = useNavigate();

  const [toKen, setToken] = useRecoilState(LoginState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userInfo);
  const [useId, setUseId] = useRecoilState(idState);
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

  // window.location.replace("/");

  const handleValid = async (data: ILoginForm) => {
    const response = await loginApi(data);

    if (response.status === 200) {
      //리스폰스확인필!
      setAccessToken(response.data.Tokens.AccessToken);
      setRefreshToken(response.data.Tokens.RefreshToken);
      setToken(response.data.Tokens.AccessToken);

      setIsLoggedIn(true);

      setUseId(response.data.Tokens.userId);
      navigate("/");
    }
  };

  const KaKaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${"7aa957f9a1bc0790d8e39735b92eee63"}&redirect_uri=${"http://localhost:3000/kakao/callback"}&response_type=code`;
    /* const res = await instance.get("/kakao");
    console.log(res);
    return res; */
  };

  return (
    <LoginWrap>
      {/* component화 할수잇음. */}
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 32 }}
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
          <GoogleBtn>
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

const LoginWrap = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: 105vh;
`;

const LoginTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 44px;

  div {
    margin-left: 20px;
    margin-right: 95px;
  }
`;

const LoginText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;
`;

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  gap: ${(props) => props.theme.pixelToRem(14)};
  margin-top: 95px;
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

//  #5185A6 #024873;

const TextBox = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  position: relative;
  margin-top: 12px;
  left: ${(props) => props.theme.pixelToRem(100)};
  /* text-align: right; */
  color: #909090;
  span {
    cursor: pointer;
  }
`;

const FindUserInfo = styled.p`
  color: ${(props) => props.theme.textColor};
`;
//로그인버튼색변경?
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
