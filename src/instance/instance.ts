import axios, { AxiosRequestConfig } from "axios";

/* 쿠키 토큰 넣어 주는 곳 */
import { getCookieToken } from "./cookies";

const myToken = getCookieToken();
// const serverUrl = process.env.REACT_APP_API;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    //   "content-type": "application/json;charset=utf-8",
    //   accept: "application/json, ",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

//리뷰작성용 content-type : multipart/form-data.
export const postInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    //Autorization: mytoken,
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
    withCredentails: true,
  },
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
