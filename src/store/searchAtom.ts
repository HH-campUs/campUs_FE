import { atom } from "recoil";

export const textValue = atom<string>({
  key: "textValue",
  default: "",
});

export const isModal = atom<boolean>({
  key: "Modal",
  default: false,
});
