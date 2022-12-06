import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignUpForm } from "../interfaces/inLogin";
import { instance } from "../instance/instance";

//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckIcon from "@mui/icons-material/Check";

// #024873(회원가입), #5185A6(중복검사)
export default function SignUp() {
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
  console.log(mailwatch);
  console.log(password);

  const handleValid = async (data: ISignUpForm) => {
    if (mailCK === false) return window.alert("중복확인을 다시 해주세요.");
    try {
      const response = await instance.post(`/users/signup`, {
        email: data.email,
        password: data.password,
      });
      console.log(data);
      if (response.status === 201) {
        window.alert(`${data?.email}님\n반갑습니다.`);
        navigate("/login");
      }
    } catch (error) {
      window.alert("가입에 실패했습니다.");
    }
  };

  // 1.정규식(errors.email?) 에러발생하면 중복검사 버튼 돌아감.
  // 2. 이 함수는 useEffect로 mailCK가 트루가 되었을때 사용.
  // 3.useEffect사용으로 구현.

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
        window.alert("중복된 메일입니다.");
      });
  };

  return (
    <LoginWrap>
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 32 }}
            onClick={() => navigate(-1)}
          />
        </div>
        <LoginText>회원가입</LoginText>
      </LoginTitle>
      <HeadText>campUs</HeadText>
      {/* Form Start */}
      {/* 중복검사 통과 체크버튼? */}
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
  width: ${(props) => props.theme.pixelToRem(375)};
  height: 95vh;
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

const HeadText = styled.div`
  position: absolute;
  font-size: ${(props) => props.theme.pixelToRem(22)};
  margin-top: 18px;
  margin-left: 24px;
`;

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  /* gap: 20px; */
  margin-top: 40px;

  span {
    color: var(--point-color);
  }
  /* align-items: center; */
`;

// #024873
const EmailText = styled.div`
  margin-top: 40px;
  margin-left: 26px;
  font-size: ${(props) => props.theme.pixelToRem(14)};
  font-weight: 500;
  color: #909090;
`;

const PasswordText = styled.div`
  margin-top: 30px;
  margin-left: 26px;
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
  margin-left: 24px;
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
  margin-left: ${(props) => props.theme.pixelToRem(24)};
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
  margin-left: 24px;
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
