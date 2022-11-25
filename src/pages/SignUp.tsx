import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignUpForm } from "../interfaces/inLogin";
import { instance } from "../instance/instance";

//css
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckIcon from "@mui/icons-material/Check";

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
        navigate("/");
      }
    } catch (error) {
      window.alert("가입에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (mailwatch !== mailwatch) {
      setMailCk((prev) => !prev);
    }
  }, [mailwatch]);

  // validate: {
  //   confirmPw: (value) =>
  //     value === password || "비밀번호가 일치하지 않습니다.",
  // },

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
            sx={{ fontSize: 40 }}
            onClick={() => navigate("-1")}
          />
        </div>

        <LoginText>회원가입</LoginText>
      </LoginTitle>
      {/* Form Start */}
      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <StInput
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
          <button type="button">
            <CheckIcon />
            <span>&nbsp;중복확인</span>
          </button>
        ) : (
          <button type="button" onClick={mailchecking}>
            중복확인
          </button>
        )}
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <StInput
          unValid={Boolean(errors.password)}
          type="password"
          placeholder="비밀번호"
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
  align-items: center;
  align-content: center;
  gap: 20px;
  margin-top: 95px;
  span {
    color: var(--point-color);
  }
`;

const StInput = styled.input<{ unValid: boolean }>`
  width: 350px;
  height: 61px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: 8px;
  transition: all 0.5s linear;
  padding: 10px;
  &:focus {
    border: 1px solid #5185a6;
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
