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

export const setRefreshToken = (refreshToken: string) => {
  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
  });
};

export const getCamperToken = () => {
  return cookies.get("camper_token");
};

export const getRefreshToken = () => {
  return cookies.get("refresh_token");
};

export const removeAccessToken = () => {
  return cookies.remove("camper_token", { sameSite: "strict", path: "/" });
};

export const removeRefreshToken = () => {
  return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
};
