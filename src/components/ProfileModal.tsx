import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isPop } from "../interfaces/Modal";
import { IEditPfForm } from "../interfaces/MyPage";
import { useMyPageApi } from "../APIs/myPageApi";
import { useNavigate } from "react-router-dom";

//Login
import { LoginState } from "../store/loginAtom";
import { removeAccessToken, removeRefreshToken } from "../instance/cookies";
import { useRecoilState } from "recoil";

//css
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import styled, { keyframes } from "styled-components";

export default function ProfileModal({ isPopUp, setIsPopUp }: isPop) {
  const [toKen, setToken] = useRecoilState(LoginState);
  const navigate = useNavigate();
  const checkPf = useMyPageApi.useGetMyPage().data?.data[0];
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
  // 유사배열확인
  const profileEdit = useMyPageApi.useEditProfile();

  const handleValid = (data: IEditPfForm) => {
    const body = { nickname: data.nickname, profileImg: data.profileImg[0] };
    profileEdit.mutate(body);
    console.log(data);
    closeModal();
  };

  // window.location.replace("/mypage");
  const modalPop = () => {
    setIsPopUp((prev) => !prev);
  };

  const closeModal = () => {
    setIsPopUp(false);
  };

  const logOut = () => {
    removeAccessToken();
    removeRefreshToken();
    setToken(null);
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
                    src="/images/kakaopf.jpeg"
                    alt="PFP"
                    style={{
                      height: "100px",
                      borderRadius: "100px",
                      objectFit: "contain",
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
                          marginLeft: "1px",
                          marginTop: "3.5px",
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
                  // pattern: {
                  //   value: /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}/,
                  //   message: "형식에 맞지 않는 닉네임입니다.",
                  // },
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
  margin: 10px auto;
  width: 160px;
  border-radius: 1rem;
  border: 1px solid grey;
  background-color: white;
  color: black;
  z-index: 1;

  &.setIsPopUp {
    width: 60px;
    height: 30px;
    font-size: 1rem;
    margin-top: 20px;

    span {
      margin-left: 10px;
      font-size: 1.4rem;
    }
  }

  &.isPopUp {
    height: 400px;
    width: 300px;
    left: 10;
    bottom: 200;
    padding: 10px;
    position: fixed;
    z-index: 100;
    overflow: auto;
    margin-top: 170px;
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

const HeadText = styled.div`
  height: 150px;
  text-align: left;
  justify-content: flex-end;
  position: relative;
  margin-left: 10px;
  bottom: 10px;
`;
const PfBox = styled.div`
  position: absolute;
  margin-left: 90px;
  width: 100%;
  top: 70px;
`;

const PfText = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(20)};
  height: ${(props) => props.theme.pixelToRem(20)};
  align-items: center;
  margin-left: 165px;
  /* background-color: red; */
  /* display: inline-block; */
`;

const PfCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: relative;
`;
const ImgPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: absolute;
`;

const CameraCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  position: relative;
  margin-top: -35px;
  margin-left: 70px;
  border: 0.5px solid black;
`;

const NickForm = styled.form`
  /* justify-content: center; */
  /* align-items: center; */
  /* display: flex; */
  flex-direction: column;
`;

const InputHead = styled.div`
  text-align: left;
  margin-left: 15px;
  color: grey;
`;

const NickInput = styled.input`
  margin-top: 15px;
  border-radius: 0.8rem;
  border: 1px solid grey;
  width: 250px;
  height: 50px;
  /* box-sizing: border-box; */
`;

const NickBtn = styled.button`
  margin-top: 5px;
  border-radius: 0.8rem;
  border: 1px solid grey;
  width: 250px;
  height: 50px;
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
