import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCamperToken } from "../instance/cookies";
import { instance } from "../instance/instance";
import { IGetTravelPlan } from "../interfaces/get";
import { IGetMyReview } from "../interfaces/MyPage";
import { IGetMyInfo } from "../interfaces/MyPage";

const serverUrl = process.env.REACT_APP_API;

const isLogin = getCamperToken();

export const useMyPageApi = {
  // ** 내가 쓴 리뷰 조회 / get ** // /users/review - mypage용.
  useGetMyReview: () => {
    return useQuery<IGetMyReview>(["myreviewinfo"], async () => {
      const { data } = await instance.get("/reviews/users");

      return data;
    });
  },

  // ** 마이페이지 조회 / get ** //
  useGetMyPage: () => {
    return useQuery(["mypageinfo"], async () => {
      if (!isLogin) return;
      const data = await instance.get("/users/myPage");
      return data;
    });
  },

  // ** myPick조회 ** //
  useGetMyPick: () => {
    return useQuery(["mypick"], async () => {
      const data = await instance.get("/users/myPage/myPick");
      return data;
    });
  },

  /*  */
  useGetTravelPlan: () => {
    return useQuery(["travelplan"], async () => {
      const { data } = await instance.get<IGetTravelPlan>(`/camps/`);

      return data;
    });
  },
};
