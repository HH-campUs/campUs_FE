import { atom, selector } from "recoil";

import { IEditProfile } from "../interfaces/MyPage";

export const profileState = atom<IEditProfile>({
  key: "editProfile",
  default: {
    profileImg: "",
    nickname: "",
  },
});

export const updateState = atom<boolean>({
  key: "editProfile",
  default: false,
});
