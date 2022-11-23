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

// export const LoginState = atom({
//   key: "LoginState",
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });

//atom작성을 위해서 type작성
// export const userInfo = atom<IUser>({
//   key: "user",
//   default: {
//     id: "",
//     password: "",
//   },
// });

//atom에 변화를 줄수 있다. getfunction이 있어야 atom을받음.
//readyonly한 값만을 반환함.
//set은 atom의 값을 변경해줄수있음.
//export const loginSelector = selector({
//key: "loginSelector",
// get: ({ get }) => {
//const toDos = get(toDoState);
// },
//set: ({ set }, newValue) => {
// 첫번째 인자로 변경할 atom, 두번째는 변경할 값.
//set(userInfo, newValue);
//},
//});
