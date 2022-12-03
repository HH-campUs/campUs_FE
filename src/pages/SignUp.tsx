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
            sx={{ fontSize: 40, marginLeft: "10px" }}
            onClick={() => navigate(-1)}
          />
        </div>

        <LoginText>회원가입</LoginText>
      </LoginTitle>
      <HeadText>campUs</HeadText>
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
              validate: {},
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
              message:
                "영어, 대문자, 숫자, 특수기호(!@#$%&)가 포함된 8~20자리 입니다.",
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

        <TextBox>
          <FindUserInfo></FindUserInfo>
        </TextBox>
        <StBtn>회원가입</StBtn>
        {/* form end */}
      </LoginForm>
    </LoginWrap>
  );
}

const LoginWrap = styled.div``;

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
  align-content: center;
  gap: 20px;
  margin-top: 95px;
  margin-left: 52.5px;
  span {
    color: var(--point-color);
  }
  /* background-color: red; */
  /* align-items: center; */
`;

const HeadText = styled.div`
  /* text-align: left; */
  position: absolute;
  font-size: 2rem;
  margin-left: 42.5px;
  /* background-color: aliceblue; */
  margin-top: 20px;
`;

const EmailText = styled.div``;

const PasswordText = styled.div``;

const EmailInputBox = styled.div`
  display: flex;
`;

const StInputMail = styled.input<{ unValid: boolean }>`
  width: 285px;
  height: 60px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: 8px;
  transition: all 0.5s linear;
  margin-top: 5px;
  padding: 10px;
  &:focus {
    border: 1px solid #5185a6;
  }
`;

const DubckBtn = styled.button`
  width: 75px;
  height: 60px;
  margin-top: 5px;
  font-size: 13px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #5185a6;
  border: 1px solid #5185a6;
  color: whitesmoke;
`;

const StInput = styled.input<{ unValid: boolean }>`
  width: 370px;
  height: 60px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: 8px;
  transition: all 0.5s linear;
  padding: 10px;
  &:focus {
    border: 1px solid #5185a6;
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
  width: 370px;
  height: 61px;
  font-size: 16px;
  border: 0.5px none grey;
  margin-top: 50px;
  border-radius: 8px;
  padding: 10px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const ErrorMail = styled.p`
  margin-top: -10px;
  font-size: 0.85rem;
  color: red;
`;

const ErrorMessage = styled.p`
  margin-top: -10px;
  font-size: 0.85rem;
  color: red;
`;

const ErrorPassword = styled.p`
  margin-top: -10px;
  font-size: 0.85rem;
  color: red;
`;
