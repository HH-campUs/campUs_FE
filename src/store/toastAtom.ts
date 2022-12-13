import { atom } from "recoil";

export const isToast = atom<boolean>({
  key: "isToast",
  default: false,
});

export const isToast2 = atom<boolean>({
  key: "isToast2",
  default: false,
});

/* 모달 전용 useState로 일단 사용중... */
/* export const isToast3 = atom<boolean>({
  key: "isToast3",
  default: false,
});


export const isToast4 = atom<boolean>({
  key: "isToast4",
  default: false,
}); */

export const unToast = atom<boolean>({
  key: "unToast",
  default: false,
});
