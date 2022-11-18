import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance/instance";
import { IGetCampCatInfo, IGetCampReview } from "../interfaces/get";

export const getApi = {
  // ** 캠핑장 카테고리 정보 조회 / get ** //
  getCampCatInfo: () => {
    return useQuery(["campcatinfo"], async () => {
      const { data } = await instance.get<IGetCampCatInfo>("/camps");
      return data;
    });
  },

  // ** 캠핑장 리뷰 조회 / get ** //
  getCampReview: () => {
    return useQuery(["reviewinfo"], async () => {
      const { data } = await instance.get<IGetCampReview>(
        "/camps/:campId/review"
      );
      return data;
    });
  },
};

// {
//   enabled: !!getCookieToken(), -> 이거뭐냐
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
// },
