import React, { useRef, useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignUpForm } from "../interfaces/inLogin";
import { signUpApi, duplicateApi } from "../APIs/loginApi";
import { useMutation } from "@tanstack/react-query";
import { instance, postInstance } from "../instance/instance";
import axios from "axios";

const serverUrl = process.env.REACT_APP_API;

//11/22화
//1.instance 헤더오류?로 바디에 값이 안담김.
//2.req값을 쿼리로 전송해야하는데 body로전송해서 api안먹음
//3. use안붙여서 사용안됬음.

export default function SignUp() {
  const navigate = useNavigate();

  const [isDup, setIsDup] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>();

  console.log(errors);

  // export const signUpApi = async (payload: ISignUpForm) => {
  //   const data = await instance.post(`${serverUrl}/users/signup`, {
  //     email: payload.email,
  //     password: payload.password,
  //   });
  //   return data;
  // };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const handleValid = (data: ISignUpForm) => {
    console.log(data);
    signUpApi(data);
  };

  const handleDuplicate = (data: ISignUpForm) => {
    console.log(data);
    duplicateApi(data);
  };

  const mailwatch = watch("email");
  console.log(mailwatch);

  // =======
  //   const handleValid = async (data: any) => {
  //     try {
  //       const res = await axios.post(`${serverUrl}/users/signup`, data);
  //       return res;
  //     } catch (err) {
  //       console.log(err);
  //     }
  // >>>>>>> master

  return (
    <LoginWrap>
      <LoginTitle>
        <div>
          <KeyboardArrowLeftIcon
            sx={{ fontSize: 40 }}
            onClick={() => navigate(-1)}
          />
        </div>

        <LoginText>회원가입</LoginText>
      </LoginTitle>
      {/* Form Start */}
      <LoginForm onSubmit={handleSubmit(handleValid)}>
        <label style={{ position: "relative" }}>
          <StInput
            unValid={Boolean(errors.email)}
            placeholder="이메일"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
                //
                // /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
                message: "올바른 이메일 형식을 입력해주세요.",
              },
            })}
          />
        </label>
        <></>
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

              // /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,

              message:
                "영어, 대문자, 특수기호(!@#$%&)가 포함된 8~20자리 입니다.",
            },
          })}
        />
        <ErrorMessage> {errors.password?.message}</ErrorMessage>
        <StInput
          unValid={Boolean(errors.passwordcheck)}
          type="password"
          placeholder="비밀번호 입력확인"
          {...register("passwordcheck", {
            required: "비밀번호 입력확인",
            validate: (value) => value === passwordRef.current,
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
  width: ${(props) => props.theme.pixelToRem(350)};
  height: ${(props) => props.theme.pixelToRem(61)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: 1px solid ${(props) => (props.unValid ? "red" : "grey")};
  border-radius: ${(props) => props.theme.pixelToRem(8)};
  transition: all 0.5s linear;
  padding: 10px;
  &:focus {
    border: 1px solid #024873;
    //outline: none;
  }

  &:nth-child(1) {
    position: absoulte;
  }
`;
const DuplBtn = styled.button`
  right: ${(props) => props.theme.pixelToRem(0)};
  width: ${(props) => props.theme.pixelToRem(80)};
  height: ${(props) => props.theme.pixelToRem(61)};
  color: ${(props) => props.theme.colorTheme.textWhite} !important;
  ${(props) => props.theme.fontTheme.Subtitle3};
  padding: auto 0;
  background-color: #0f5986;
  border-top-right-radius: ${(props) => props.theme.pixelToRem(8)};
  border-bottom-right-radius: ${(props) => props.theme.pixelToRem(8)};
  position: absolute;
`;

const TextBox = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.pixelToRem(13)};
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
  width: ${(props) => props.theme.pixelToRem(350)};
  height: ${(props) => props.theme.pixelToRem(61)};
  font-size: ${(props) => props.theme.pixelToRem(16)};
  border: ${(props) => props.theme.pixelToRem(0.5)} none grey;
  margin-top: 50px;
  border-radius: ${(props) => props.theme.pixelToRem(8)};
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
