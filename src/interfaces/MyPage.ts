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
