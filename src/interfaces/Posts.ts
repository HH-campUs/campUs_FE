export interface IReviewPosts {
  reviewImg: FormData;
  reviewComment: string;
  campId: number | string;
  likeStatus: string;
}

export interface IReviewRead {
  reviewImg: string[];
  reviewComment: string;
  Camp: object;
  campName: string;
}

export interface IEditReviewPosts {
  reviewImg?: FormData;
  reviewComment: string;
  reviewId: number;
}

export interface IDeleteReviewPosts {}

export interface IPostTravelPlan {
  campId?: number | string;
  tripId?: number | string;
  date: string;
  memo: string;
}

export interface IPickedCamp {
  Camp: Object;
  ImageUrl: string;
  address: string;
  campId: number;
  campName: string;
  induty: string;
  Pick: Object;
}

export type ICampingPicked = number;
