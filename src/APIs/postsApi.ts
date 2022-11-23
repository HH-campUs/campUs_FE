import { useMutation, useQuery } from "@tanstack/react-query";

import { instance, postInstance } from "../instance/instance";

import {
  IReviewPosts,
  IEditReviewPosts,
  IPostTravelPlan,
  ICampingPicked,
} from "../interfaces/Posts";

const serverUrl = process.env.REACT_APP_API;

export const postsApi = {
  //** 리뷰작성 / post **//
  postReview: () => {
    return useMutation(async (payload: IReviewPosts) => {
      const { data } = await postInstance.post(
        `${serverUrl}camps/:campId/review`,
        {
          reviewImg: payload.reviewImg,
          reviewComment: payload.reviewComment,
        }
      );
      return data;
    });
  },

  // ** 리뷰수정 / put ** //
  editReview: () => {
    return useMutation((payload: IEditReviewPosts) =>
      instance.put(`${serverUrl}/camps/:campId/:ewviewId`, {
        reviewImg: payload.reviewImg,
        reviewComment: payload.reviewComment,
      })
    );
  },

  //** 리뷰삭제 / delete ** //
  deleteReview: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.delete(
        `${serverUrl}/camps/:campId/:reviewId`
      );
      return data;
    });
  },

  
  //** 여행일정등록 / post */
  postTravelPlan: () => {
    return useMutation((payload: IPostTravelPlan) =>
      instance.post(`${serverUrl}/users/:campId`, {
        userId: payload.userId,
        campId: payload.campId,
        address: payload.address,
        date: payload.date,
      })
    );
  },

  // ** 캠핑장 찜하기 , payload값없이 header로 access/refresh토큰만보내면됨 / POST ** /
  campingPicked: () => {
    return useMutation((payload: ICampingPicked) =>
      instance.post(`${serverUrl}/camps/:campId/pick`)
    );
  },
};
