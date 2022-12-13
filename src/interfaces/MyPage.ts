export interface IGetMyReview {
  userId: number;
  campId: number;
  campName: string;
  reviewImg: string[];
  reviewComment: string;
  likeStatus: number;
  myReview: IGetMyReview[];
  createdAt: string;
  updatedAt: string;
  data: IGetMyReview[];
}

export interface IGetTravelPlan {
  tripId: number | undefined;
  campId: number;
  memo: string;
  ImageUrl: string;
  campName: string;
  address?: string;
  date: string;
  setOpenSemi: React.Dispatch<React.SetStateAction<boolean>>;
  Camp?: IGetTravelPlan;
}

/* interface IGetMyCamp {
  campId: number;
  memo?:   string;
  ImageUrl: string;
  campName: string;
  address?: string;
} */

export interface IGetMyPage {}

//api용
export interface IEditProfile {
  profileImg: string;
  nickname: string;
}

//닉변용 form
export interface IEditPfForm {
  profileImg: string;
  nickname: string;
}
