import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../instance/instance";

export const useGetTopicResult2 = () => {
  const getCampPage = async ({ pageParam = 1 }) => {
    const res = await instance.get(
      `/camps/${pageParam}?numOfRows=10&pageNo=${pageParam}`
    );

    return {
      // 실제 데이터
      camp_page: res.data,
      // 반환 값에 현재 페이지
      current_page: pageParam,
      // 페이지가 마지막인지 알려주는 서버에서 넘겨준 true/false 값
      isLast: res.data.last,
    };
  };

  const {
    data: getCampTop,
    fetchNextPage: getNextPage,
    isSuccess: getCampIsSuccess,
    hasNextPage: getNextPageIsPossible,
  } = useInfiniteQuery(["camp_lists"], getCampPage, {
    getNextPageParam: (lastPage, pages) => {
      // lastPage와 pages는 콜백함수에서 리턴한 값
      // lastPage: 직전에 반환된 리턴값, pages: 전체 페이지
      if (!lastPage.isLast) return lastPage.current_page + 1;
      // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
      return undefined;
    },
  });

  return { getCampTop, getNextPage, getCampIsSuccess, getNextPageIsPossible };
};
