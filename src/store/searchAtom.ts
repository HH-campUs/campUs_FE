import { atom, selector } from "recoil";

/* 백엔드에 보낼 연월일 */
export const isModal = atom<boolean>({
  key: "isModal",
  default: false,
});

/* 연 */
export const StrYear = atom<string>({
  key: "StrYear",
  default: new Date().getFullYear().toString(),
});
