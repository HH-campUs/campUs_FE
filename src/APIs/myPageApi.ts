import { useMutation, useQuery } from "@tanstack/react-query";
import { instance, postInstance } from "../instance/instance";
import { IGetMyPage, IGetMyReview, IEditProfile } from "../interfaces/MyPage";

const serverUrl = process.env.REACT_APP_API;

export const useMyPageApi = {
  // ** 내가 쓴 리뷰 조회 / get ** // /users/review - mypage용.
  // 토큰값필요할텐데 이렇게 사용되는지 확인해야함.
  useGetMyReview: () => {
    return useQuery<IGetMyReview>(["myreviewinfo"], async () => {
      const { data } = await instance.get("/users/review");
      return data;
    });
  },

  // ** 마이페이지 조회 / get ** //
  useGetMyPage: () => {
    return useQuery(["mypageinfo"], async () => {
      const data = await instance.get("/users/myPage");
      // console.log(data.data);
      return data;
    });
  },

  // ** myPick조회 ** //
  useGetMyPick: () => {
    return useQuery(["mypageinfo"], async () => {
      const data = await instance.get("/users/myPage/myPick");
      console.log(data.data);
      return data;
    });
  },

  // ** 유저 정보 변경 ** //
  useEditProfile: () => {
    return useMutation(async (payload: IEditProfile) => {
      const { data } = await postInstance.put("/users/myPage", {
        profileImg: payload.profileImg,
        nickname: payload.nickname,
      });
      return data;
    });
  },
};
