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
  pickedCamp,
} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

/* const [isDate, setIsDate] */

// ** 캠핑장 카테고리 정보 조회 / get ** //

/* 리얼 인피니티 스크롤 - 캠프 result*/
export const useGetCamp = (doNm: string) => {
  const useData = async ({ pageParam = 0 }) => {
    const { data } = await instance.get<campArray>(
      `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}`
    );
    console.log(data);
    return {
      camps: data.regionCamp,
      currentPage: pageParam,
    };
  };

  const {
    data: campData,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["getCamp", doNm], useData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.camps[0] ? lastPage.currentPage + 1 : undefined;
    },
  });
  console.log(campData);
  return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
};

export const useGetApi = {
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

  useGetCampDetail: (campId: number) => {
    return useQuery<IGetCampResult>(
      ["campDetail"],
      async () => {
        const { data } = await instance.get(`/camps/detail/${campId}`);
        console.log(data);
        return data;
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  },

  /* topic 별 캠핑장 결과 조회 */
  useGetTopicResult: () => {
    const params = 2;
    return useQuery(["topicResult"], async () => {
      const { data } = await instance.get<pickedCamp[]>(
        `/camps/${params}?numOfRows=20&pageNo=1`
      );
      console.log(data[0]);
      return data[0];
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
