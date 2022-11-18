//url to image : string, image used as <img> ele : HTMLImageElement
export interface IReviewPosts {
  reviewImg?: File; //확인해야함,back은 url로받음.
  reviewComment: string;
}

export interface IEditReviewPosts {
  reviewImg?: File;
  reviewComment: string;
}

export interface IDeleteReviewPosts {
  //id값 필요할텐데 명세서에 아무것도 없음.
}

export interface IPostWeather {
  pardo: string;
  dt: string;
}

export interface IPostTravelPlan {
  userId: number;
  campId: number;
  address: string;
  date: string;
}

export interface ICampingPicked {
  campId: number;
}
