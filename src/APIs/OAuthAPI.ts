import React from "react";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance/instance";
import { setAccessToken } from "../instance/cookies";

/* 11.17 백엔드 REST API 나오기 전에 받기만
/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.
*/

export const OAuthAPI = {
  /* kakao */
  /*   KakaoLogin: async (kakaoToken: string) => {
    return await instance
      .get('백엔드 API~~ =${}')
      .then(data => {
        setAccessToken(data.headers.authorization)
      })
      .then(() => {
        window.location.href = "/"
      });
  }, */
};
