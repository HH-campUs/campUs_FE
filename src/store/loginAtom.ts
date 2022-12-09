import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

//수정해야함.
export const userInfo = atom({
  key: "user",
  default: false,
});
