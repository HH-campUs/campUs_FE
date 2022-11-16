import axios from "axios";

/* 쿠키 토큰 넣어 주는 곳 */

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

/* instance.interceptors.request.use(
    (config: AxiosRequestConfig) =>
        const token = getCookieToken();
        return config;
) */

/* regExp
email : ^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+[.]?\w{2,3}

패스워드는 8자리에서 20자리수이며, 대문자 소문자 숫자 특수기호 (!@#$%&)가 1개 이상 들어가야됨
pw : ^(?=.*[A-Z].*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$
*/
