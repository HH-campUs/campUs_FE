import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../instance/instance";
import {
  IGetCampCatInfo,
  IGetCampReview,

  IGetCampResult,

} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

// ** 캠핑장 카테고리 정보 조회 / get ** //

export const useGetApi = {
  useGetCampCatInfo: () => {
    return useQuery(["campcatinfo"], async () => {
      const { data } = await instance.get<IGetCampCatInfo>(`${serverUrl}`);
      return data;
    });
  },

  // ** 캠핑장 결과 조회 - search (Infinite) / get ** //
  getCampResult: () => {
    return useInfiniteQuery(["campResult"], async () => {
      /* request query에 payload값 받아야됨. (page) */
      const { data } = await instance.get<IGetCampResult>(`${serverUrl}`);
      return data;
    });
  },

  // ** 캠핑장 리뷰 조회 / get ** //
  useGetCampReview: () => {
    return useQuery(["reviewinfo"], async () => {
      const { data } = await instance.get<IGetCampReview>(
        `${serverUrl}/camps/:campId/review`
      );
      return data;
    });
  },

  useGetWeather: () => {
    return useQuery(["weatherinfo"], async () => {
      const { data } = await instance.get<IGetWeather>("/weathers");
      console.log(data);
      return data;
    });
  },
};

// {
//   enabled: !!getCookieToken(), -> 이거뭐냐
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
// },
