import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { IUser } from "../interfaces/inLogin";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom<boolean>({
  key: "user",
  default: false,
});
