import { atom, selector } from "recoil";
/* import { originDate } from "../interfaces/inSearch"; */

export const DateState = atom<string>({
  key: "DateState",
  default:
    [new Date().getFullYear().toString()] +
    ["0" + (new Date().getMonth() + 1)].toString().slice(-2) +
    ["0" + new Date().getDate()].toString().slice(-2),
});

/* 약간 리덕스 슬라이스 느낌 */
export const ExportDate = selector({
  key: "DateState1",
  get: ({ get }) => {
    const exDate = get(DateState);
    return exDate;
  },
});
