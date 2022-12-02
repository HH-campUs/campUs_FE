//url to image : string, image used as <img> ele : HTMLImageElement
export interface IReviewPosts {
  reviewImg: string; //확인해야함,back은 url로받음.
  reviewComment: string;
}

export interface IEditReviewPosts {
  reviewImg?: File;
  reviewComment: string;
}

export interface IDeleteReviewPosts {
  //id값 필요할텐데 명세서에 아무것도 없음.
}

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
