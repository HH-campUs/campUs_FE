import { useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { instance } from "../instance/instance";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExportDate, DateState } from "../store/dateAtom";
import { ExportLocation, selectLo } from "../store/locationAtom";

import {
  IGetCampCatInfo,
  IGetCampReview,
  IGetCampResult,
  IGetWeather,
} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

/* const [isDate, setIsDate] */

// ** 캠핑장 카테고리 정보 조회 / get ** //

export const useGetApi = {
  useGetCampCatInfo: () => {
    return useQuery(["campcatinfo"], async () => {
      const { data } = await instance.get<IGetCampCatInfo>(`${serverUrl}`);
      return data;
    });
  },

  // ** 캠핑장 결과 조회 - search (Infinite) / get ** //
  useGetCampResult: () => {
    const location = useRecoilValue(selectLo);
    const { fetchNextPage, isFetching, data, error } = useInfiniteQuery(
      ["campResult"],
      async ({ pageParam = 1 }) => {
        const res = await instance.get<IGetCampResult>(
          `/camps?address=${location}&numOfRows=${10}&pageNo=${pageParam}`
          /* {
          getNextPageParam : (cur:any) => cur.nextPage,
        } */
        );
        console.log(res);
        return res;
      }
    );
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

  /* 날씨 조회 */
  useGetWeather: () => {
    const date = useRecoilValue(DateState);
    const location = useRecoilValue(selectLo);
    return useQuery(["weatherinfo"], async () => {
      const { data } = await instance.get<IGetWeather>(
        `/weathers?pardo=${location}&dt=${date}`
      );
      console.log(date, location);
      return data;
    });
  },
};
