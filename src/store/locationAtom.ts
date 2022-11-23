import { atom, selector } from "recoil";

export const selectLo = atom<string>({
  key: "selectLo",
  default: "",
});

/* 변경된 Location 반환 */
export const ExportLocation = selector({
  key: "ExportLocation",
  get: ({ get }) => {
    const exLocation = get(selectLo);
    return exLocation;
  },
});
