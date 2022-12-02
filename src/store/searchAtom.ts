import { atom, selector } from "recoil";

export const textValue = atom<string>({
  key: "inputValue",
  default: "",
});

export const isModal = atom<boolean>({
  key: "Modal",
  default: false,
});
