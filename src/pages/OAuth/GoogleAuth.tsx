//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import React, { useEffect } from "react";
import { setAccessToken, setRefreshToken } from "../../instance/cookies";
import { instance } from "../../instance/instance";

function GoogleAuth() {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;

  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");

  /*  const { data } = await Api.post("oauth/google", { accessToken }); */

  const code = new URL(window.location.href).searchParams.get("code");
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken&redirect_uri=${"http://localhost:3000/google/callback"}&client_id=${"495084276046-fm2mkolqihqio0iv1al1i6ddbqg4t6dg.apps.googleusercontent.com"}`;
  console.log(code);

  useEffect(() => {
    (async () => {
      try {
        const googleResult = await axios.post(GOOGLE_AUTH_URL, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        if (googleResult.status !== 200) console.log("연결실패");
        if (googleResult.status == 200) {
        }
        const token = googleResult.data.access_token;
        const response = await axios.post(
          process.env.REACT_APP_API + "/google",
          googleResult.data,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(token, googleResult.data);
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

export default GoogleAuth;
