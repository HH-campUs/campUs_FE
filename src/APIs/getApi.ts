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
  campArray,
} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

/* const [isDate, setIsDate] */

// ** 캠핑장 카테고리 정보 조회 / get ** //

/* test 1 */
export const useGetCamp = (doNm: string) => {
  const useData = async ({ pageParam = 0 }) => {
    const { data } = await instance.get<campArray>(
      `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
    );
    return {
      camps: data.regionCamp,
      nextPage: pageParam + 1,
    };
  };

  const {
    data: campData,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["getCamp", doNm], useData, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.camps ? lastPage.nextPage : undefined;
    },
  });

  console.log(campData);
  return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
};

export const useGetApi = {
  /* test2 */
  // ** 캠핑장 결과 조회 - search (Infinite) / get ** //
  /* promise 타입의 비동기로 처음에 받고 -> InfiniteQuery를 적용해야된다..! */

  /* const useGetcampResult = async ({ pageParam = 0 }) => {
    const doNm = useRecoilValue(showLo);
    const { data } = await instance.get(
      `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
    );
    return {
      camps: data[0].regionCamp,
      nextPage: pageParam + 1
    };
  },

  useGetCampResult2: () => {
    const {
      data: campData,
      fetchNextPage,
      isSuccess,
      hasNextPage,
      refetch,
    } = useInfiniteQuery<any>(
      ["campInfiniteResult"],
      useGetApi.useGetCampResult,
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.camps ? lastPage.nextPage : undefined;
        },
      }
    );
    return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
  }, */

  useGetCampResult: () => {
    const doNm = useRecoilValue(showLo);
    return useQuery<campArray>(
      ["campResult1"],
      async ({ pageParam = 1 }) => {
        const { data } = await instance.get(
          `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
        );
        console.log(data);
        return data;
      },
      {
        retry: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
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
