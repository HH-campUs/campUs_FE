import { atom, selector } from "recoil";
import { originDate, useDate } from "../interfaces/inDate";

export const DateState = atom<originDate>({
  key: "DateState",
  default: {
    dateData: new Date(),
  },
});
