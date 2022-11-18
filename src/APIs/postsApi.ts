import { useMutation, useQuery } from "@tanstack/react-query";

import { instance, postInstance } from "../instance/instance";

import {
  IReviewPosts,
  IEditReviewPosts,
  IPostWeather,
  IPostTravelPlan,
  ICampingPicked,
} from "../interfaces/Posts";

export const postsApi = {
  //** 리뷰작성 / post **//
  postReview: () => {
    return useMutation(async (payload: IReviewPosts) => {
      const { data } = await postInstance.post("camps/:campId/review", {
        reviewImg: payload.reviewImg,
        reviewComment: payload.reviewComment,
      });
      return data;
    });
  },

  // ** 리뷰수정 / put ** //
  editReview: () => {
    return useMutation((payload: IEditReviewPosts) =>
      instance.put("camps/:campId/:ewviewId", {
        reviewImg: payload.reviewImg,
        reviewComment: payload.reviewComment,
      })
    );
  },

  //** 리뷰삭제 / delete ** //
  deleteReview: () => {
    return useMutation(async (id: number) => {
      const { data } = await instance.delete("camps/:campId/:reviewId");
      return data;
    });
  },

  //** 날씨정보조회?? / post - 확인필요. */
  postWeather: () => {
    return useMutation((payload: IPostWeather) =>
      instance.post("/weathers", {
        pardo: payload.pardo,
        dt: payload.dt,
      })
    );
  },

  //** 여행일정등록 / post */
  postTravelPlan: () => {
    return useMutation((payload: IPostTravelPlan) =>
      instance.post("/users/:campId", {
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
      instance.post("/camps/:campId/pick")
    );
  },
};
