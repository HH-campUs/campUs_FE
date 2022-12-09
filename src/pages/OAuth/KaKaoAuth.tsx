//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessToken, setRefreshToken } from "../../instance/cookies";
import { instance } from "../../instance/instance";

function KakaoLogin() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;
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
        }
        const token = kakaoResult.data.access_token;
        const response = await axios.post(
          process.env.REACT_APP_API + "/kakao",
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
          data: { accessToken, refreshToken },
        } = response;
        if (status !== 200) return;
        // setAccessToken(response.data.Tokens.accessToken);
        // localStorage.setItem("token", refreshToken);
        const backAccess = response.data.accesstoken;
        const backfresh = response.data.refreshtoken;
        setAccessToken(backAccess);
        setRefreshToken(backfresh);
        if (status == 200) {
          console.log(accessToken, refreshToken);
          return window.location.replace(`/`);
        } else {
          console.log(accessToken, refreshToken);
          /*  return window.location.replace("/"); */
        }
      } catch (e) {
        console.error(e);
        /* window.location.replace("/"); */
      }
    })();
  }, [code]);

  return <div></div>;
}

export default KakaoLogin;
