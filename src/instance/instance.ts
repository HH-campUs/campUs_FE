import axios from "axios";

/* 쿠키 토큰 넣어 주는 곳 */
import { getCamperToken } from "./cookies";
import { getRefreshToken } from "./cookies";

const accessToken = getCamperToken();
const refreshToken = getRefreshToken();

const baseURL = process.env.REACT_APP_API;

export const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    refreshToken: `${refreshToken}`,
  },
});

//리뷰작성용 content-type : multipart/form-data.
export const postInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    refreshToken: `${refreshToken}`,
    "Content-Type": "multipart/form-data",
    // withCredentails: true,
  },
});

// "content-type": "application/json;charset=utf-8",
// accept: "application/json, ",

// withCredentails: true,
// const{accessToken,refreshToken} = req.headers.authorization

// Authorization : {accessToken:"",refreshToken:""}

// const headers = {
//   Authorization: `Bearer ${accessToken}`,
//   refreshToken: `Bearer ${refreshToken}`,
// };

/* request / response 후 선 후행 처리를 커스텀 가능케 -> 예외처리로 넘어가기 전에
가로채기  가능 */
// instance.interceptors.request.use((config: AxiosRequestConfig) => {
//   const token = getCamperToken();
//   if (token) {
//     config.headers = { authorization: token };
//     return config;
//   }
//   return config;
// });
