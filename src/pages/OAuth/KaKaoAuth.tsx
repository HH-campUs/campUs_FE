//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import { useEffect } from "react";
import { setAccessToken, setRefreshToken } from "../../instance/cookies";

function KakaoLogin() {
  const code = new URL(window.location.href).searchParams.get("code");
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${code}`;
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
        if (kakaoResult.status === 200) {
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

        const backAccess = response.data.accesstoken;
        const backfresh = response.data.refreshtoken;
        setAccessToken(backAccess);
        setRefreshToken(backfresh);
        if (status === 200) {
          console.log(accessToken, refreshToken);
          return window.location.replace(`/`);
        } else {
          console.log(accessToken, refreshToken);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [code, KAKAO_AUTH_URL]);

  return <div></div>;
}

export default KakaoLogin;
