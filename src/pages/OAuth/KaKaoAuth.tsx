//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessToken } from "../../instance/cookies";
import { instance } from "../../instance/instance";

function KakaoLogin() {
  const CLIENT_ID = "7aa957f9a1bc0790d8e39735b92eee63";
  const REDIRECT_URI = "http://localhost:3000/kakao/callback";

  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${"7aa957f9a1bc0790d8e39735b92eee63"}&redirect_uri=${"http://localhost:3000/kakao/callback"}&code=${code}`;
  console.log(code);

  useEffect(() => {
    (async () => {
      try {
        const kakaoResult = await axios.post(KAKAO_AUTH_URL, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        if (kakaoResult.status !== 200) console.log("연결실패");
        if (kakaoResult.status == 200) {
          console.log("연결 성공");
        }
        const token = kakaoResult.data.access_token;
        const response = await axios.post(
          "https://campus99.shop/kakao",
          kakaoResult.data,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(token, kakaoResult.data);
        const {
          status,
          data: { accessToken, refreshToken, currentPage },
        } = response;
        if (status !== 200) return;
        setAccessToken(response.data.Tokens.accessToken);
        localStorage.setItem("token", refreshToken);

        if (currentPage) {
          console.log(accessToken, refreshToken, currentPage);
          return window.location.replace(`/`);
        } else {
          console.log(accessToken, refreshToken, currentPage);
          /*  return window.location.replace("/"); */
        }
      } catch (e) {
        console.error(e);
        /* window.location.replace("/"); */
        toast.error("login error", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    })();
  }, [code]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default KakaoLogin;

const CLIENT_ID = "7aa957f9a1bc0790d8e39735b92eee63";
const REDIRECT_URI = "http://localhost:3000/kakao0";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
