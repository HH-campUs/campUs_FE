import { atom } from "recoil";

export const isToast = atom<boolean>({
  key: "toastState",
  default: false,
});
