//url to image : string, image used as <img> ele : HTMLImageElement
export interface IReviewPosts {
  reviewImg: string;
  reviewComment: string;
}

export interface IEditReviewPosts {
  reviewImg?: File;
  reviewComment: string;
}

export interface IDeleteReviewPosts {}

export interface IPostTravelPlan {
  userId: number;
  campId: number;
  address: string;
  date: string;
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
