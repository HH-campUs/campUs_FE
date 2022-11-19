import { atom } from "recoil";

// Dark mode, Light mode 사용.
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
