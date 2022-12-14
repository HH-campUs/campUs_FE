import { useMutation, useQuery } from "@tanstack/react-query";

import { instance, postInstance } from "../instance/instance";

import {
  IReviewPosts,
  IEditReviewPosts,
  IPostTravelPlan,
  ICampingPicked,
} from "../interfaces/Posts";

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
      return data;
    });
  },

  // ** 리뷰수정 / put ** //
  useEditReview: () => {
    return useMutation((payload: IEditReviewPosts) =>
      instance.put(`${serverUrl}/camps/:campId/:ewviewId`, {
        reviewImg: payload.reviewImg,
        reviewComment: payload.reviewComment,
      })
    );
  },

  //** 리뷰삭제 / delete ** //
  useDeleteReview: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.delete(
        `${serverUrl}/camps/:campId/:reviewId`
      );
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
    return useMutation(async (payload: IPostTravelPlan) => {
      console.log(payload);
      const { data } = await instance.put(`/camps/${payload.tripId}/`, {
        date: payload.date,
        memo: payload.memo,
      });
      return data;
    });
  },

  // ** 캠핑장 찜하기 , payload값없이 header로 access/refresh토큰만보내면됨 / POST ** /
  useCampingPicked: () => {
    return useMutation(
      async (payload: ICampingPicked) =>
        await instance.put(`/camps/${payload}/pick`)
    );
  },
};
