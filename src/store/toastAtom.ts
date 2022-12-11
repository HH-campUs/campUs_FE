import { atom } from "recoil";

export const isToast = atom<boolean>({
  key: "isToast",
  default: false,
});

export const isToast2 = atom<boolean>({
  key: "isToast2",
  default: false,
});

export const unToast = atom<boolean>({
  key: "unToast",
  default: false,
});
