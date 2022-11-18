export interface IGetCampCatInfo {
  keyword: string;
}

export interface IGetCampReview {
  userId: number;
  campId: number;
  reviewImg: string;
  reviewComment: string;
}
