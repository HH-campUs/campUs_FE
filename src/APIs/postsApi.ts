import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance, postInstance } from "../instance/instance";

import { IReviewPosts, IPostTravelPlan } from "../interfaces/Posts";

const serverUrl = process.env.REACT_APP_API;

export const usePostsApi = {
  //** 리뷰작성 / post **//
  usePostReview: () => {
    return useMutation(async (payload: IReviewPosts) => {
      const fd = payload.reviewImg;
      fd.append("reviewComment", payload.reviewComment);
      fd.append("likeStatus", payload.likeStatus);
      const { data } = await postInstance.post(
        `reviews/${payload.campId}/`,
        fd
      );
      console.log("리뷰작성data", data);
      return data;
    });
  },

  //** 리뷰삭제 / delete ** //
  useDeleteReview: () => {
    return useMutation(async (reviewId: number) => {
      const { data } = await instance.delete(`reviews/:reviewId`);
      return data;
    });
  },

  //** 여행일정등록 / post */
  usePostTravelPlan: () => {
    return useMutation(async (payload: IPostTravelPlan) => {
      console.log(payload);
      const { data } = await instance.post(`/camps/${payload.campId}/`, {
        date: payload.date,
        memo: payload.memo,
      });
      return data;
    });
  },

  /* 여행일정삭제 / delete */
  useDeleteTravelPlan: () => {
    return useMutation((payload: IPostTravelPlan) =>
      instance.delete(`/camps/${payload}`)
    );
  },

  /* 여행일정수정/ put */
  useUpdateTravelPlan: () => {
    return useMutation((payload: IPostTravelPlan) =>
      instance.put(`/camps/${payload}`, {
        date: payload.date,
        memo: payload.memo,
      })
    );
  },
};
