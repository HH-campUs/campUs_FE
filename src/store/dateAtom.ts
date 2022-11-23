import { atom, selector } from "recoil";
/* import { originDate } from "../interfaces/inSearch"; */

/* 백엔드에 보낼 연월일 */
export const DateState = atom<string>({
  key: "DateState",
  default:
    [new Date().getFullYear().toString()] +
    ["0" + (new Date().getMonth() + 1)].toString().slice(-2) +
    ["0" + new Date().getDate()].toString().slice(-2),
});

/* 연 */
export const StrYear = atom<string>({
  key: "StrYear",
  default: new Date().getFullYear().toString(),
});

/* 월 */
export const StrMonth = atom<string>({
  key: "StrMonth",
  default: ["0" + (new Date().getMonth() + 1)].toString().slice(-2),
});

/* 일 */
export const StrDay = atom<string>({
  key: "StrDay",
  default: ["0" + new Date().getDate()].toString().slice(-2),
});

/* 변경된 year 반환 */
export const ExportYear = selector({
  key: "ExportYear",
  get: ({ get }) => {
    const exYear = get(StrYear);
    return exYear;
  },
});

/* 변경된 month 반환 */
export const ExportMonth = selector({
  key: "ExportMonth",
  get: ({ get }) => {
    const exMonth = get(StrMonth);
    return exMonth;
  },
});

/* 변경된 day 반환 */
export const ExportDay = selector({
  key: "ExportDay",
  get: ({ get }) => {
    const exDay = get(StrDay);
    return exDay;
  },
});

/* 변경된 Full date 반환 */
export const ExportDate = selector({
  key: "ExportDate",
  get: ({ get }) => {
    const exDate = get(DateState);
    return exDate;
  },
});
