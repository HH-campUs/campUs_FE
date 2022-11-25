import { useMutation, useQuery } from "@tanstack/react-query";
import { instance, postInstance } from "../instance/instance";

import { ISignUpForm } from "../interfaces/inLogin";
import { ILoginForm } from "../interfaces/inLogin";

// const serverUrl = process.env.REACT_APP_API;


/* 회원가입 */
export const signUpApi = async (payload: ISignUpForm) => {
  const data = await instance.post(`/users/signup`, {
    email: payload.email,
    password: payload.password,
  });
  return data;
};


/* 이메일 중복확인 */
export const duplicateApi = async (payload: any) => {
  const data = await instance.post(`/users/signup/check`, {
    email: payload.email,
  });
  return data;
};
// export const loginApi = {
// postSignup: () => {
//   return useMutation((payload: ISignUpForm) =>
//     instance.post(`${serverUrl}/users/signup`, {
//       email: payload.email,
//       password: payload.password,
//     })
//   );
// },

//   postLogin: () => {
//     return useMutation((payload: ILoginForm) =>
//       instance.post(`${serverUrl}/users/login`, {
//         email: payload.email,
//         password: payload.password,
//       })
//     );
//   },
// };
