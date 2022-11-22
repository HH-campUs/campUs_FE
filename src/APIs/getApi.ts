import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance/instance";
import { useRecoilValue } from "recoil";
import { ExportDate } from "../store/dateAtom";

import {
  IGetCampCatInfo,
  IGetCampReview,
  IGetCampResult,
  IGetWeather,
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
  /*   getCampResult: () => {
    return useInfiniteQuery(["campResult"], async () => {
  
      const { data } = await instance.get<IGetCampResult>(`${serverUrl}`);
      return data;
    });
  }, */

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
    /* date, location 값을 useRecoilValue로 이전 컴포넌트에서 사용된 selector들을 활용하여 저장 */
    const date = useRecoilValue(ExportDate);
    /* const location =  */
    return useQuery(["weatherinfo"], async () => {
      const { data } = await instance.get<IGetWeather>(
        `/weathers?pardo=${"강원"}&dt=${date}`
      );
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
