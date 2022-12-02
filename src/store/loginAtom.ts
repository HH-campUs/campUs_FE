import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const idState = atom({
  key: "idState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom<boolean>({
  key: "user",
  default: false,
});
