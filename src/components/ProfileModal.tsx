import React from "react";

import styled, { keyframes } from "styled-components";

import { useForm } from "react-hook-form";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { isPop } from "../interfaces/Modal";

import { IEditPfForm } from "../interfaces/MyPage";
// import { MyPageApi } from "../APIs/myPageApi";

export default function ProfileModal({ isPopUp, setIsPopUp }: isPop) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEditPfForm>();

  // const kkkk = MyPageApi.editProfile();
  const handleValid = (data: IEditPfForm) => {
    // kkkk.mutate(data);
  };

  const modalPop = () => {
    setIsPopUp((prev) => !prev);
  };

  return (
    <>
      <PfModalWrap className="setIsPopUp" onClick={modalPop}>
        편집
      </PfModalWrap>

      {isPopUp && (
        <Container>
          <ModalBg onClick={modalPop} />
          <PfModalWrap className="isPopUp">
            <NickForm onSubmit={handleSubmit(handleValid)}>
              <PfBox>
                <PfText>기본 프로필 편집</PfText>
                <PfCircle>
                  <img
                    src="/images/blank-profile-picture-973460_1280.webp"
                    alt="PFP"
                    height={"75px"}
                  />
                  <CameraCircle>
                    <PhotoCameraIcon
                      sx={{
                        marginLeft: "4px",
                        marginTop: "3px",
                        position: "absolute",
                      }}
                    />
                  </CameraCircle>
                </PfCircle>
              </PfBox>

              <NickInput
                placeholder="닉네임"
                {...register("nickname", {
                  required: "8자 이내로 적어주세요.",
                  pattern: {
                    value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
                    message: "형식에 맞지 않는 닉네임입니다.",
                  },
                })}
              />
              <ErrorNick>{errors.nickname?.message}</ErrorNick>
            </NickForm>
          </PfModalWrap>
        </Container>
      )}
    </>
  );
}

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
`;

const PfModalWrap = styled.div`
  margin: 10px auto;
  height: 35px;
  width: 50px;
  border-radius: 13px;
  border: 1px solid grey;
  justify-content: center;
  align-content: center;
  z-index: 1;

  &.setIsPopUp {
    width: 65px;
    height: 35px;
    padding: 10px;
    font-size: 1rem;
    text-align: center;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isPopUp {
    height: 300px;
    width: 300px;
    left: 10;
    bottom: 100;
    padding: 10px;
    position: fixed;
    z-index: 100;
    overflow: auto;
    background-color: lightgray;

    /* animation-duration: 0.7s; */
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  position: fixed;
  display: flex;
  transition: all 0.5s ease-in-out;
`;

const PfBox = styled.div``;

const PfText = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const PfCircle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  margin: 10px auto;
`;

const CameraCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  position: absolute;
  margin-top: -35px;
  margin-left: 42px;
`;

const NickForm = styled.form`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NickInput = styled.input`
  margin-top: 15px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  color: #555;
  box-sizing: border-box;

  &:focus {
    border-bottom: 1px solid white;
  }
`;

const ErrorNick = styled.div`
  margin-top: 10px;
  font-size: 0.75rem;
  color: red;
`;
