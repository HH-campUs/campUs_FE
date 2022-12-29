import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isPop } from "../interfaces/Modal";
import { IEditPfForm } from "../interfaces/MyPage";
import { useMyPageApi } from "../APIs/myPageApi";
import { useNavigate } from "react-router-dom";
import { InfoToast, InfoToast2 } from "../components/Toast/Toast";

//Login
import { userInfo } from "../store/loginAtom";
import { removeAccessToken, removeRefreshToken } from "../instance/cookies";
import { useRecoilState, useSetRecoilState } from "recoil";

//css
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import styled, { keyframes } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IEditProfile } from "../interfaces/MyPage";
import { postInstance } from "../instance/instance";

export default function ProfileModal({ isPopUp, setIsPopUp }: isPop) {
  const checkPf = useMyPageApi.useGetMyPage().data?.data;
  const [toastState, setToastState] = useState(false);
  const [toastState2, setToastState2] = useState(false);

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

  const setIsLoggedIn = useSetRecoilState(userInfo);
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
  console.log("watch", image);
  useEffect(() => {
    if (image && image.length > 0) {
      //any type check
      const fileImage: any = image[0];
      setImagePreview(URL.createObjectURL(fileImage));
    }
  }, [image]);

  const handleValid = (data: IEditPfForm) => {
    const body = { nickname: data.nickname, profileImg: data.profileImg[0] };
    profileMutate.mutate(body);
    setToastState(true);
    const timer = setTimeout(() => {
      setToastState(false);
      closeModal();
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  };

  const modalPop = () => {
    setIsPopUp((prev) => !prev);
  };

  const closeModal = () => {
    setIsPopUp(false);
  };

  const logOut = () => {
    setToastState2(true);
    removeAccessToken();
    removeRefreshToken();
    setIsLoggedIn(false);
    const timer = setTimeout(() => {
      setToastState2(false);
      navigate("/");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <>
      <PfModalWrap className="setIsPopUp" onClick={modalPop}>
        수정
      </PfModalWrap>
      {toastState == true ? (
        <InfoToast
          text={"프로필이 변경되었어요."}
          toastState={toastState}
          setToastState={setToastState}
        />
      ) : null}
      {toastState2 == true ? (
        <InfoToast2
          text={"다음에 또 봐요!"}
          toastState2={toastState2}
          setToastState2={setToastState2}
        />
      ) : null}

      {isPopUp && (
        <Container>
          <ModalBg onClick={modalPop} />

          <PfModalWrap className="isPopUp">
            <HeadText>
              <PfText>프로필 수정</PfText>
              <CloseBtn
                src="/images/closeBtn.svg"
                alt="close"
                onClick={closeModal}
              />
            </HeadText>
            <NickForm onSubmit={handleSubmit(handleValid)}>
              <PfBox>
                <PfCircle>
                  {imagePreview && (
                    <ImgPreview
                      style={{ objectFit: "cover" }}
                      src={imagePreview}
                      alt="image"
                    />
                  )}
                  <img
                    src={checkPf?.profileImg}
                    alt="Pfp"
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
                          cursor: "pointer",
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
                  minLength: {
                    value: 1,
                    message: "1자 이상 적어주세요.",
                  },
                  maxLength: {
                    value: 8,
                    message: "8자 이하로 적어주세요",
                  },
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
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
`;

const PfModalWrap = styled.button`
  border: 1px solid #bdbdbd;
  background-color: white;
  color: #474747;

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
  text-align: left;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  margin-left: 20px;
`;
const PfBox = styled.div``;

const PfText = styled.span`
  font-weight: 500;
  font-size: ${(props) => props.theme.pixelToRem(20)};
  color: #222;
`;

const CloseBtn = styled.img`
  width: ${(props) => props.theme.pixelToRem(20)};
  height: ${(props) => props.theme.pixelToRem(20)};
  margin-left: 160px;
  cursor: pointer;
`;

const PfCircle = styled.div`
  width: ${(props) => props.theme.pixelToRem(90)};
  height: ${(props) => props.theme.pixelToRem(90)};
  border-radius: ${(props) => props.theme.pixelToRem(50)};
  margin-top: 17px;
  margin-left: 113px;
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
`;

const NickBtn = styled.button`
  margin-top: 18px;
  border-radius: 0.8rem;
  border: 1px solid grey;
  ${(props) => props.theme.fontTheme.Body2}
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
