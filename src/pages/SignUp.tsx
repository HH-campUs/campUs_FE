import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignUpForm } from "../interfaces/inLogin";
import { instance } from "../instance/instance";

import { InfoToast } from "../components/Toast/Toast";

//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckIcon from "@mui/icons-material/Check";

export default function SignUp() {
  const [toastState, setToastState] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const [mailCK, setMailCk] = useState(false);

  const password = watch("password");
  const mailwatch = watch("email");

  const handleValid = async (data: ISignUpForm) => {
    if (mailCK === false) return;

    try {
      const response = await instance.post(`/users/signup`, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        const timer = setTimeout(() => {
          navigate("/login");
          setToastState(true);
        }, 1600);
        return () => {
          clearTimeout(timer);
        };
      }
    } catch (error) {
      window.alert("가입에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (errors.email) {
      setMailCk(false);
    }
  }, [errors.email]);

  const mailchecking = async () => {
    await instance
      .post(`users/signup/check`, { email: mailwatch })
      .then(() => {
        window.alert("사용가능한 메일입니다.");
        setMailCk(true);
      })
      .catch(() => {
        window.alert("사용이 불가능한 메일입니다.");
      });
  };

  return (
    <LoginWrap>
      {toastState == true ? (
        <InfoToast
          text={`사용가능한 메일입니다.`}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 32 }}
            onClick={() => navigate(-1)}
          />
        </div>
        <LoginText>회원가입</LoginText>
      </LoginTitle>
      <HeadText>
        <img src="/images/mypage/_campUs logo_5.svg" alt="" />
      </HeadText>
      {/* Form Start */}
      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <EmailText>이메일</EmailText>
        <EmailInputBox>
          <StInputMail
            unValid={Boolean(errors.email)}
            placeholder="이메일"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
                message: "올바른 이메일 형식을 입력해주세요.",
              },
            })}
          />

          {mailCK ? (
            <DubckBtn type="button">
              <CheckIcon />
              <span>&nbsp;확인</span>
            </DubckBtn>
          ) : (
            <DubckBtn type="button" onClick={mailchecking}>
              중복검사
            </DubckBtn>
          )}
        </EmailInputBox>

        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <PasswordText>비밀번호</PasswordText>
        <StInput
          unValid={Boolean(errors.password)}
          type="password"
          placeholder="숫자, 영어, 대문자, 특수기호, 8-20자리"
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
                /^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
              message: "숫자, 영어, 대문자, 특수기호가 포함된 8-20자리 입니다",
            },
          })}
        />

        <ErrorMessage> {errors.password?.message}</ErrorMessage>
        <StInput
          unValid={Boolean(errors.passwordcheck)}
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordcheck", {
            required: "다시 입력 해주세요.",
            validate: {
              confirmPw: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            },
          })}
        />
        <ErrorMessage>{errors.passwordcheck?.message}</ErrorMessage>

        <StBtn>회원가입</StBtn>
        {/* form end */}
      </LoginForm>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  height: 95vh;
  position: relative;
  /* background-color: red; */
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

const LoginText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(18)};
  color: #222;
`;

const HeadText = styled.div`
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
  position: absolute;
  /* background-color: blue; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  left: 50%;
  transform: translateX(-50%);

  span {
    color: var(--point-color);
  }
  /* align-items: center; */
`;

// #024873
const EmailText = styled.div`
  margin-top: 40px;
  margin-left: 16px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 500;
  color: #909090;
`;

const PasswordText = styled.div`
  margin-top: 30px;
  margin-left: 16px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 500;
  color: #909090;
`;

const EmailInputBox = styled.div`
  margin-top: 9px;
  display: flex;
`;

const StInputMail = styled.input<{ unValid: boolean }>`
  width: ${(props) => props.theme.pixelToRem(232)};
  height: ${(props) => props.theme.pixelToRem(54)};
  margin-left: 4px;
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: 8px;
  transition: all 0.5s linear;
  color: #222;

  padding: 10px;
  &:focus {
    border: 1px solid #5185a6;
  }
`;

const DubckBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(85)};
  height: ${(props) => props.theme.pixelToRem(54)};
  font-size: ${(props) => props.theme.pixelToRem(14)};
  margin-left: ${(props) => props.theme.pixelToRem(10)};
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #5185a6;
  border: 1px solid #5185a6;
  color: #fff;
`;

const StInput = styled.input<{ unValid: boolean }>`
  width: ${(props) => props.theme.pixelToRem(327)};
  height: ${(props) => props.theme.pixelToRem(54)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  margin-left: ${(props) => props.theme.pixelToRem(4)};
  margin-top: 9px;
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: 8px;
  transition: all 0.5s linear;
  padding: 10px;
  color: #222;
  &:focus {
    border: 1px solid #5185a6;
  }
`;

const StBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(327)};
  height: ${(props) => props.theme.pixelToRem(60)};
  font-size: ${(props) => props.theme.pixelToRem(18)};
  margin-left: 4px;
  margin-top: 32px;
  border: 1px solid #adc2ce;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  background-color: #adc2ce;
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  margin-top: 5px;
  margin-left: 24px;
  font-size: 0.85rem;
  color: red;
`;
