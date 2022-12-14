//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import React, { useEffect } from "react";
import { setAccessToken, setRefreshToken } from "../../instance/cookies";

function GoogleAuth() {

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;


  /* const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token"); */

  //const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=email+profile`;
  //console.log(accessToken);



  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const Token = parsedHash.get("access_token");


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API + "/google",
          Token,
          {
            headers: {
              Authorization: Token,
            },
          }
        );
        console.log(Token);
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
  }, [Token]);

  return <div></div>;
}

export default GoogleAuth;
