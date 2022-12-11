import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isPop } from "../interfaces/Modal";
import { IEditPfForm } from "../interfaces/MyPage";
import { useMyPageApi } from "../APIs/myPageApi";
import { useNavigate } from "react-router-dom";

//Login
import { LoginState, userInfo } from "../store/loginAtom";
import { removeAccessToken, removeRefreshToken } from "../instance/cookies";
import { useRecoilState } from "recoil";

//css
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import styled, { keyframes } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IEditProfile } from "../interfaces/MyPage";
import { postInstance } from "../instance/instance";
import { InfoToast } from "./Toast/Toast";

export default function ProfileModal({ isPopUp, setIsPopUp }: isPop) {
  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const [toastState, setToastState] = useState(false);
  const queryClient = useQueryClient();
  const mutateFn = async (payload: IEditProfile) => {
    const { data } = await postInstance.put("/users/myPage", {
      profileImg: payload.profileImg,
      nickname: payload.nickname,
    });
    return data;
  };
  const profileMutate = useMutation(mutateFn, {
    onSuccess: () => queryClient.invalidateQueries(["mypageinfo"]),
    onError: () => console.log("파일전송에 실패했습니다."),
  });

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userInfo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEditPfForm>();

  //이미지미리보기
  const [imagePreview, setImagePreview] = useState("");
  const image = watch("profileImg");
  useEffect(() => {
    if (image && image.length > 0) {
      //any type check
      const file: any = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const handleValid = (data: IEditPfForm) => {
    const body = { nickname: data.nickname, profileImg: data.profileImg[0] };
    profileMutate.mutate(body);

    closeModal();
  };

  const modalPop = () => {
    setIsPopUp((prev) => !prev);
  };

  const closeModal = () => {
    setIsPopUp(false);
  };

  const logOut = () => {
    setToastState(true);
    removeAccessToken();
    removeRefreshToken();
    setIsLoggedIn(false);
    window.alert("다음에 또 봐요!");
    navigate("/");
  };

  return (
    <>
      <PfModalWrap className="setIsPopUp" onClick={modalPop}>
        수정
      </PfModalWrap>

      {isPopUp && (
        <Container>
          <ModalBg onClick={modalPop} />

          <PfModalWrap className="isPopUp">
            <HeadText>
              <PfText>프로필 수정</PfText>
              <CloseBtn src="/images/closeBtn.svg" onClick={closeModal} />
            </HeadText>
            <Toast>
              {toastState == true ? (
                <InfoToast
                  text={"다음에 만나요!"}
                  toastState={toastState}
                  setToastState={setToastState}
                />
              ) : null}
            </Toast>

            <NickForm onSubmit={handleSubmit(handleValid)}>
              <PfBox>
                <PfCircle>
                  {imagePreview && (
                    <ImgPreview
                      style={{ objectFit: "cover" }}
                      src={imagePreview}
                    />
                  )}
                  <img
                    src={checkPf?.profileImg}
                    alt="PFP"
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "90px",
                      objectFit: "cover",
                    }}
                  />
                  <CameraCircle>
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        Content-Type="multipart/form-data"
                        style={{ display: "none" }}
                        {...register("profileImg")}
                      />
                      <PhotoCameraIcon
                        sx={{
                          marginLeft: "0.5px",
                          marginTop: "5.5px",
                        }}
                      />
                    </label>
                  </CameraCircle>
                </PfCircle>
              </PfBox>
              <InputHead>닉네임</InputHead>
              <NickInput
                placeholder="닉네임"
                {...register("nickname", {
                  required: "8자 이내로 적어주세요.",
                })}
              />
              <ErrorNick>{errors.nickname?.message}</ErrorNick>
              <NickBtn>수정완료</NickBtn>
            </NickForm>
            <LogoutBtn onClick={logOut}>로그아웃</LogoutBtn>
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
  /* backdrop-filter: blur(1px); */
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
`;

const PfModalWrap = styled.button`
  border: 1px solid #bdbdbd;
  background-color: white;
  color: #474747;
  z-index: 1;

  &.setIsPopUp {
    width: ${(props) => props.theme.pixelToRem(53)};
    height: ${(props) => props.theme.pixelToRem(30)};
    border-radius: ${(props) => props.theme.pixelToRem(40)};
    font-size: ${(props) => props.theme.pixelToRem(12)};
    margin-left: 80px;
    margin-top: 30px;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isPopUp {
    width: ${(props) => props.theme.pixelToRem(335)};
    height: ${(props) => props.theme.pixelToRem(375)};
    border-radius: ${(props) => props.theme.pixelToRem(10)};
    left: 10;
    bottom: 200;
    padding: 10px;
    position: fixed;
    z-index: 100;
    overflow: auto;
    margin-top: 130px;
  }
`;

const Container = styled.div`
  /* background-color: red; */
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

const Toast = styled.div`
  margin: 0 auto;
`;

const HeadText = styled.div`
  text-align: left;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  margin-left: 20px;
`;
const PfBox = styled.div`
  /* position: relative; */
  /* position: absolute; */
`;

const PfText = styled.span`
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  color: #222;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(20)};
  height: ${(props) => props.theme.pixelToRem(20)};
  margin-left: 160px;
`;

const PfCircle = styled.div`
  width: ${(props) => props.theme.pixelToRem(90)};
  height: ${(props) => props.theme.pixelToRem(90)};
  border-radius: ${(props) => props.theme.pixelToRem(50)};
  margin-top: 17px;
  margin-left: 113px;
  /* position: absolute; */
`;
const ImgPreview = styled.img`
  width: ${(props) => props.theme.pixelToRem(90)};
  height: ${(props) => props.theme.pixelToRem(90)};
  border-radius: ${(props) => props.theme.pixelToRem(50)};
  position: absolute;
`;

const CameraCircle = styled.div`
  width: ${(props) => props.theme.pixelToRem(36)};
  height: ${(props) => props.theme.pixelToRem(36)};
  background-color: #fff;
  border-radius: ${(props) => props.theme.pixelToRem(40)};
  position: relative;
  margin-top: -39px;
  margin-left: 55px;
  border: 1px solid #bdbdbd;
`;

const NickForm = styled.form`
  /* justify-content: center; */
  /* align-items: center; */
  /* display: flex; */
  flex-direction: column;
`;

const InputHead = styled.div`
  text-align: left;
  margin-left: 10px;
  color: #909090;
`;

const NickInput = styled.input`
  margin-top: 9px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: 1px solid #bdbdbd;
  width: ${(props) => props.theme.pixelToRem(295)};
  height: ${(props) => props.theme.pixelToRem(54)};
  /* box-sizing: border-box; */
`;

// #adc2e;
const NickBtn = styled.button`
  margin-top: 18px;
  border-radius: 0.8rem;
  border: 1px solid grey;
  width: ${(props) => props.theme.pixelToRem(295)};
  height: ${(props) => props.theme.pixelToRem(52)};
  background-color: #024873;
  color: whitesmoke;
  cursor: pointer;
`;

const LogoutBtn = styled.div`
  margin-top: 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  text-decoration: underline;
  color: grey;
  cursor: pointer;
`;

const ErrorNick = styled.div`
  margin-top: 10px;
  font-size: 0.75rem;
  color: red;
`;
