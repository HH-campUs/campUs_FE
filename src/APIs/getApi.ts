import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { instance, instanceTopic } from "../instance/instance";

import {
  IGetCampReview,
  IGetWeather,
  campArray,
  pickedCamp,
  IGetTravelPlan,
  IGetDistance,
  IGetNewReview,
} from "../interfaces/get";

const serverUrl = process.env.REACT_APP_API;

// ** 캠핑장 카테고리 정보 조회 / get ** //

/* 캠핑장 키워드 검색 */
export const useSearchCamp = (keyword: string, sort: string) => {
  const useData = async ({ pageParam = 1 }) => {
    const { data } = await instanceTopic.get<campArray>(
      `/searchSort?keyword=${keyword}&numOfRows=20&pageNo=${pageParam}&sort=${sort}`
    );
    console.log(data, keyword);
    return {
      /* 같은 객체 레벨에 있는 total 값도 사용하기 위해서 data만 */
      camps: data,
      currentPage: pageParam,
    };
  };

  const {
    data: campData,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["searchCamp", keyword], useData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      return lastPage.camps ? lastPage.currentPage + 1 : undefined;
    },
  });

  return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
};

/* 리얼 인피니티 스크롤 - 캠프 result 페이지 전용*/
export const useGetCamp = (doNm: string, sort: string) => {
  const useData = async ({ pageParam = 1 }) => {
    const { data } = await instance.get<campArray>(
      `/camps?doNm=${doNm}&numOfRows=20&pageNo=${pageParam}&sort=${sort}`
    );

    return {
      /* 같은 객체 레벨에 있는 total 값도 사용하기 위해서 data만 */
      camps: data,
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
    getNextPageParam: (lastPage) => {
      return lastPage.camps ? lastPage.currentPage + 1 : undefined;
    },
  });
  // console.log(campData);
  return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
};

//infiniteQuery for Topic
export const useGetTopicInfinite = (topicId: string, sort: string) => {
  const topicData = async ({ pageParam = 0 }) => {
    console.log("sort", sort);
    const { data } = await instance.get<pickedCamp>(
      `/camps/${topicId}?&numOfRows=10&pageNo=${pageParam}&sort=${sort}`
    );
    return {
      campTopic: data,
      currentPage: pageParam + 1,
    };
  };

  const {
    data: campTopic,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(["getCampTopic", topicId], topicData, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.campTopic ? lastPage.currentPage : undefined;
    },
  });

  return { campTopic, fetchNextPage, isSuccess, hasNextPage, refetch };
};

/* 날씨 조회 */

export const useGetWeather = (pardo: string, date: string) => {
  const useData = async () => {
    const { data } = await instance.get<IGetWeather>(
      `/weathers?pardo=${pardo}&dt=${date}`
    );
    return data;
  };
  const {
    data: WeatherData,
    isLoading,
    isError,
  } = useQuery(["getWeather", date, pardo], useData, {
    onError: () => {
      console.error("에러가 났습니다.");
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log(WeatherData);

  return { WeatherData, isLoading, isError };
};

/* 추천 날씨 정보 조회 */

export const useRecommendWeather = () => {
  const useData = async () => {
    const { data } = await instance.get<IGetWeather>(`/weathers/recommend`);
    return data;
  };

  const {
    data: RecommendData,
    isLoading,
    isError,
  } = useQuery(["getRecommendWeather"], useData, {
    onError: () => {
      console.error("에러가 났습니다.");
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { RecommendData, isLoading, isError };
};

/* 정보 get Api 모음 */

export const useGetApi = {
  // ** 캠핑장 새로운 리뷰 ** //
  useGetNewReview: () => {
    return useQuery<IGetNewReview>(["reviewnew"], async () => {
      const { data } = await instance.get(`/reviews`);
      console.log("review", data);
      return data;
    });
  },

  useGetCampDetail: (campId: string | undefined) => {
    return useQuery<campArray[]>(
      ["campDetail", campId],
      async () => {
        const { data } = await instance.get(`/camps/detail/${campId}`);
        return data;
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  },

  // ** 캠핑장 리뷰 조회 / get ** //
  useGetCampReview: (campId: string | undefined) => {
    return useQuery<IGetCampReview>(["reviewinfo", campId], async () => {
      const { data } = await instance.get(`/reviews/${campId}`);

      return data;
    });
  },

  // ** 캠핑장 거리 조회 ** //
  useGetDistance: (campX: number, campY: number) => {
    console.log("196", campX, campY);
    return useQuery<IGetDistance>(["distanceinfo"], async () => {
      if (campX && campY) {
        const { data } = await instance.get(
          `users/nearCamp?campX=${campX}&campY=${campY}`
        );
        return data.nearCamp;
      }
      return [];
    });
  },

  /* topic 별 캠핑장 결과 조회 */
  useGetTopicResult: () => {
    const params = 2;
    return useQuery<pickedCamp[]>(["topicResult"], async () => {
      const { data } = await instance.get(
        `/camps/${params}?numOfRows=20&pageNo=1`
      );

      return data[0];
    });
  },

  // ** LOOK, PICK, REVIEW ** //
  useGetSort: () => {
    return useQuery(["topicSort"], async () => {
      const { data } = await instance.get(`/camps/sort`);
      console.log("mostList", data.MostList[0].look);
      return data;
    });
  },

  /* 여행일정 조회 */
  useGetTravelPlan2: () => {
    return useQuery(["travelplan2"], async () => {
      const { data } = await instance.get<IGetTravelPlan>(`/camps`);

      return data;
    });
  },
};

// *** 첫페이지 날씨 좋은 기준 만들어서 api새로 생성해야 할 것 같음. *** //
