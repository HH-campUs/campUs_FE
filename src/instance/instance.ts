import axios, { AxiosRequestConfig } from "axios";

/* 쿠키 토큰 넣어 주는 곳 */
import { getCookieToken } from "./cookies";

export const instance = axios.create({
  /* api 배포 되면 환경변수 넣어주기
    baseUrl: process.env.<environment>
    */
  headers: {
    "content-type": "application/json;charset=utf-8",
    accept: "application/json, ",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

/* request / response 후 선 후행 처리를 커스텀 가능케 -> 예외처리로 넘어가기 전에
가로채기 Ssap 가능 */
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getCookieToken();
  if (token) {
    config.headers = { authorization: token };
    return config;
  }
  return config;
});
