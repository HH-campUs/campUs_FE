import { atom } from "recoil";

export const isToast = atom<boolean>({
  key: "isToast",
  default: false,
});
