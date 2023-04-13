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

// ** 캠핑장 카테고리 정보 조회 / get ** //

/* 캠핑장 키워드 검색 */
export const useSearchCamp = (keyword: string, sort: string) => {
  const useData = async ({ pageParam = 1 }) => {
    const { data } = await instanceTopic.get<campArray>(
      `/searchSort?keyword=${keyword}&numOfRows=15&pageNo=${pageParam}&sort=${sort}`
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
      `/camps?doNm=${doNm}&numOfRows=15&pageNo=${pageParam}&sort=${sort}`
    );

    console.log(data);

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
    getNextPageParam: (lastPage) => {
      return lastPage.camps ? lastPage.currentPage + 1 : undefined;
    },
  });

  return { campData, fetchNextPage, isSuccess, hasNextPage, refetch };
};

//infiniteQuery for Topic
export const useGetTopicInfinite = (topicId: string, sort: string) => {
  const topicData = async ({ pageParam = 0 }) => {
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
    isFetching,
  } = useQuery(["getWeather"], useData, {
    onError: () => {
      console.error("에러가 났습니다.");
    },
    notifyOnChangeProps: ["data"],
  });

  return { WeatherData, isLoading, isError, isFetching };
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
  });

  return { RecommendData, isLoading, isError };
};

export const useGetTravelPlan2 = () => {
  const useData = async () => {
    const { data } = await instance.get<IGetTravelPlan>("/trip");
    return data;
  };

  const {
    data: myTrip,
    isLoading,
    isError,
  } = useQuery(["myTrip"], useData, {
    onError: (err) => {
      console.error(err);
    },
  });

  return { myTrip, isLoading, isError };
};

/* 정보 get Api 모음 */

export const useGetApi = {
  // ** 캠핑장 새로운 리뷰 ** //
  useGetNewReview: () => {
    return useQuery<IGetNewReview>(["reviewnew"], async () => {
      const { data } = await instance.get(`/reviews`);
      return data;
    });
  },

  useGetCampDetail: (campId: string | undefined) => {
    return useQuery<campArray[]>(["campDetail", campId], async () => {
      const { data } = await instance.get(`/camps/detail/${campId}`);
      return data;
    });
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

  // ** LOOK, PICK, REVIEW ** //
  useGetSort: () => {
    return useQuery(["topicSort"], async () => {
      const { data } = await instance.get(`/camps/sort`);
      console.log(data);
      return data;
    });
  },
  /* 여행일정 조회 */
  useGetTravelPlan2: () => {
    return useQuery(["travelplan2"], async () => {
      const { data } = await instance.get<IGetTravelPlan>(`/trip`);
      console.log(data);
      return data;
    });
  },
};

// *** 첫페이지 날씨 좋은 기준 만들어서 api새로 생성해야 할 것 같음. *** //
