import { useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { instance } from "../instance/instance";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExportDate, DateState } from "../store/dateAtom";
import { showLo, selectLo } from "../store/locationAtom";

import {
  IGetCampReview,
  IGetCampResult,
  IGetWeather,
  campResult,
} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

/* const [isDate, setIsDate] */

// ** 캠핑장 카테고리 정보 조회 / get ** //

/* test 1 */
/* export const useGetCamp = (doNm: string) => {
  const useData = async ({ pageParam = 0 }) => {
    const { data } = await instance.get(
      `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
    );
    return {
      camps: data[0],
      nextPage: pageParam + 1,
    };
  };

  const {
    data: regionCamp,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<campResult>(["getCamp", doNm], useData, {
    getNextPageParam: (lastPage) => {
      return lastPage.camps ? lastPage.nextPage : undefined;
    },
  });

  return { regionCamp, fetchNextPage, isSuccess, hasNextPage, refetch };
}; */

export const useGetApi = {
  /* test2 */
  // ** 캠핑장 결과 조회 - search (Infinite) / get ** //
  useGetCampResult: () => {
    const doNm = useRecoilValue(showLo);
    return useQuery<campResult>(
      ["campResult"],
      async ({ pageParam = 1 }) => {
        const { data } = await instance.get(
          `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
        );
        console.log(data[0]);
        return data[0];
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  },

  /* const doNm = useRecoilValue(showLo);
    return useQuery<campArray[]>(["campResult"], 
      async ({ pageParam = 0 }) => {
        const { data } = await instance.get(
          `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
        );
        console.log(data);
        return data[0];
      },
        {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        }
      ), */

  useGetCampResult2: () => {
    const doNm = useRecoilValue(showLo);
    const { data: camps, fetchNextPage } = useInfiniteQuery(
      ["campResult"],
      async ({ pageParam = 0 }) => {
        const { data } = await instance.get(
          `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
        );
        console.log(data);
        return {
          camps: data.regionCamp,
          nextPage: pageParam + 1,
        };
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.camps[0] ? lastPage.nextPage : undefined;
        },
      }
    );
  },

  /* topic 별 캠핑장 결과 조회 */
  useGetTopicResult: () => {
    const params = 1;
    return useQuery(["topicResult"], async () => {
      const { data } = await instance.get<IGetCampResult>(
        `/camps/${params}?numOfRows=20&pageNo=1`
      );
      console.log(data);
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

  /* 날씨 조회 */
  useGetWeather: () => {
    const date = useRecoilValue(DateState);
    const pardo = useRecoilValue(selectLo);
    return useQuery(
      ["weatherinfo"],
      async () => {
        const { data } = await instance.get<IGetWeather>(
          `/weathers?pardo=${pardo}&dt=${date}`
        );
        console.log(data);
        return data;
      },
      {
        /* refetchOnMount: false, */
        refetchOnWindowFocus: false,
      }
    );
  },
};

// *** 첫페이지 날씨 좋은 기준 만들어서 api새로 생성해야 할 것 같음. *** //
