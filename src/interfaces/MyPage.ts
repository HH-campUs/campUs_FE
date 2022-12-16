export interface IGetMyReview {
  userId: number;
  campId: number;
  campName: string;
  reviewImg: string;
  reviewComment: string;
  likeStatus: number;
  myReview: IGetMyReview[];
  createdAt: string;
  updatedAt: string;
  data: IGetMyReview[];
  reviewId: number;
}

export interface IGetTravelPlan {
  tripId: number | string;
  campId: number;
  memo: string;
  ImageUrl: string;
  campName: string;
  address?: string;
  date: string;
  setOpenSemi: React.Dispatch<React.SetStateAction<boolean>>;
  Camp?: IGetTravelPlan;
}

export interface Camp {
  campId: number;
  campName: string;
  induty: string;
  ImageUrl: string;
  address: string;
}

export interface Pickitem {
  Camp: Camp;
  userId: number;
}

export interface Review {
  Camp: Camp;
  reviewComment: string;
  reviewImg: string;
}

export interface Trip {
  Camp: Camp;
  date: string;
  memo: string;
  tripId: string;
}

export interface IGetMyInfo {
  Pick: Pickitem[];
  Review: Review[];
  Trip: Trip[];
  email: string;
  nickname: string;
  profileImg: string;
}

//api용
export interface IEditProfile {
  profileImg: string;
  nickname: string;
}

//닉네임변경용
export interface IEditPfForm {
  profileImg: string;
  nickname: string;
}
