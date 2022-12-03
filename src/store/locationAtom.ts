import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/* pardo - weather */
export const selectLo = atom<string>({
  key: "selectLo",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

/* doNm - camp */
export const showLo = atom<string>({
  key: "showLo",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

/* 변경된 Location 반환 */
export const ExportLocation = selector({
  key: "ExportLocation",
  get: ({ get }) => {
    const exLocation = get(selectLo);
    return exLocation;
  },
});
