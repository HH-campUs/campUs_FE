//redirect경로는 백엔드와 동일해야함.
import axios from "axios";
import { useEffect } from "react";
import { setAccessToken, setRefreshToken } from "../../instance/cookies";

function GoogleAuth() {
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

        const backAccess = response.data.accesstoken;
        const backfresh = response.data.refreshtoken;
        setAccessToken(backAccess);
        setRefreshToken(backfresh);
        if (status == 200) {
          console.log(accessToken, refreshToken);
          return window.location.replace(`/`);
        } else {
          console.log(accessToken, refreshToken);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [Token]);

  return <div></div>;
}

export default GoogleAuth;
