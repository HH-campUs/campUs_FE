import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 30);

  return cookies.set("camper_token", accessToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  return cookies.get("camper_token");
};

export const removeCookieToken = () => {
  return cookies.remove("camper_token", { sameSite: "strict", path: "/" });
};

/* 
page에서 사용
function getDate() {
    throw new Error("Function not implemented.");
}
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
}; */

/* const handleSubmit = async (e) => {
e.preventDefault();
console.log("서버로 로그인 요청을 보냅니다.");
axios
.post(`${serverUrl}/users/login`, loginValue)
.then((response) => {
const { accessToken, refreshToken, userId } = response.data;
setCookie("accessToken", accessToken);
setCookie("refreshToken", refreshToken);
console.log(userId);
localStorage.setItem("userId", userId);

axios.defaults.headers.common[
"Authorization"
] = `Bearer ${accessToken}`;

navigate("/posts");
alert("로그인에 성공하였습니다!");
setIsLogin(true);
setIsLoginModalOpen(false);
})
.catch((error) => console.log(error));
};
---------
const handleSubmit = async (e) => {
e.preventDefault();
console.log("서버로 로그인 요청을 보냅니다.");
axios
.post(`${serverUrl}/users/login`, loginValue)
.then((response) => {
const { accessToken, refreshToken, userId } = response.data;
setCookie("accessToken", accessToken);
setCookie("refreshToken", refreshToken);
console.log(userId);
localStorage.setItem("userId", userId);

axios.defaults.headers.common[
"Authorization"
] = `Bearer ${accessToken}`;

navigate("/posts");
alert("로그인에 성공하였습니다!");
setIsLogin(true);
setIsLoginModalOpen(false);
})
.catch((error) => console.log(error));
}; */
