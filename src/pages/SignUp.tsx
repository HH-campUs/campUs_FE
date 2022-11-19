import React from "react";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ISignUpForm } from "../interfaces/inLogin";

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

export default function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm<ISignUpForm>();
  const handleValid = (data: ISignUpForm) => {
    // setToDos((oldToDos) => [
    //   { text: data.toDo, id: Date.now(), category },
    //   ...oldToDos,
    // ]);
    // setValue("toDo", "");
  };

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
        <StInput
          {...register("LoginId", {
            required: "validation Id",
          })}
          placeholder="아이디"
        />
        <StInput
          {...register("Password", {
            required: "validation Password",
          })}
          placeholder="비밀번호"
        />
        <StInput
          {...register("PasswordCheck", {
            required: "validation PasswordCheck",
          })}
          placeholder="비밀번호확인"
        />

        <TextBox>
          <FindUserInfo></FindUserInfo>
        </TextBox>
        <StBtn>회원가입</StBtn>
      </LoginForm>
    </LoginWrap>
  );
}
