import { useMutation, useQuery } from "@tanstack/react-query";
import { instance, postInstance } from "../instance/instance";
import { IGetMyPage, IGetMyReview, IEditProfile } from "../interfaces/MyPage";

const serverUrl = process.env.REACT_APP_API;

// export const MyPageApi = {
//   // ** 내가 쓴 리뷰 조회 / get ** // /users/review - mypage용.
//   // 토큰값필요할텐데 이렇게 사용되는지 확인해야함.
//   getMyReview: () => {
//     return useQuery(["myreviewinfo"], async () => {
//       const { data } = await instance.get<IGetMyReview>(
//         `${serverUrl}/users/review`
//       );
//       return data;
//     });
//   },

//   // ** 마이페이지 조회 / get ** //
//   getMyPage: () => {
//     return useQuery(["mypageinfo"], async () => {
//       const { data } = await instance.get<IGetMyPage>(
//         `${serverUrl}/users/myPage`
//       );
//       return data;
//     });
//   },

//   // ** 유저 정보 변경 ** //
//   editProfile: () => {
//     return useMutation(async (payload: IEditProfile) => {
//       const { data } = await postInstance.put(`${serverUrl}/users/myPage`, {
//         profileImg: payload.profileImg,
//         nickname: payload.nickname,
//       });
//       return data;
//     });
//   },
// };
