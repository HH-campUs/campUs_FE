export interface IGetCampCatInfo {
  keyword: string;
}

export interface IGetTravelPlan {
  campId: number;
  tripId: number;
}

export interface IGetCampReview {
  campId: number;
  reviewImg: string;
  reviewComment: string;
  likeStatus: number;
  data: IGetCampReview[];
  createdAt: string;
  updatedAt: string;
  nickname: string;
  profileImg: string;
  userId: number;
  reviewId: number;
}

export interface IGetNewReview {
  reviewId: number;
  campId: number;
  userId: number;
  reviewImg: string;
  reviewComment: string;
  likeStatus: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  profileImg: string;
  data: IGetNewReview[];

  campName: string;
}

export interface IGetDistance {
  campId: number;
  campName: string;
  induty: string;
  doNm: string;
  address: string;
  X: string;
  Y: string;
  operPdCl: string;
  operDeCl: string;
  animal: string;
  ImageUrl: string;
  homePage: string;
  sbrsCl: string;
  posblFcltyCl: string;
  wtrplCo: string;
  swrmCo: string;
  toiletCo: string;
  manageSttus: string;
  themaEnvrnCl: string;
  eqpmnLendCl: string;
  createdtime: string;
  featureNm: string;
  clturEvent: string;
  nearPost: IGetDistance[];
  nearCamp: IGetDistance;
  reviewCount: number;
  pickCount: number;
  lookUp: number;
  distance: number;
}

export interface weather {
  dt?: string;
  pardo?: string;
  date?: string;
  sunrise?: string;
  sunset?: string;
  humidity?: string;
  wind_speed?: number;
  clouds?: number;
  uvi?: number;
  pop?: number;
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
  rain?: number;
  snow?: number;
}

/* 날씨 */
export interface IGetWeather {
  weather: Array<any>;
  recommend: Array<any>;
  dt?: string;
  pardo?: string;
  date?: string;
  sunrise?: string;
  sunset?: string;
  humidity?: string;
  wind_speed?: number;
  clouds?: number;
  uvi?: number;
  pop?: number;
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
  rain?: number;
  snow?: number;
}

export interface RecoWeather extends IGetWeather {
  recommend: Array<IGetWeather>;
}

/* 캠프 */

export interface IGetCampResult {
  ImageUrl: string;
  X: string;
  Y: string;
  address: string;
  animal: string;
  campId: number;
  campName: string;
  clturEvent: string;
  createdtime: string;
  doNm: string;
  status: boolean;
  eqpmnLendCl: string;
  featureNm: string;
  homePage: string;
  induty: string;
  lookUp: number;
  manageSttus: string;
  operDeCl: string;
  operPdCl: string;
  pickCount: number;
  posblFcltyCl: string;
  reviewCount: number;
  sbrsCl: string;
  sigunguNm: string;
  swrmCo: string;
  themaEnvrnCl: string;
  toiletCo: string;
  wtrplCo: string;
  look: IGetCampResult;
  review: IGetCampResult;
  pick: IGetCampResult;
  camp: IGetCampResult[];
  distance: number;

  /* toast */
  toastState?: boolean;
  setToastState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface campArray extends IGetCampResult {
  currentPage: number;
  total: number;
  topicCamp: IGetCampResult[];
  campTopic: IGetCampResult[];
  searchCamp?: IGetCampResult[];
  detailCamp?: IGetCampResult[];
  camp: IGetCampResult[];
  regionCamp: IGetCampResult[];
  nextPage?: number;
  lastPage?: boolean;
  isLast?: boolean;
  pageParam?: number;
  fetchNextPage: boolean;
  isSuccess: boolean;
  hasNextPage: boolean;
  refetch: boolean;
  icons: string;
}

export interface campResult extends campArray {
  data: campArray[];
}

export interface pickedCamp extends campArray {
  data: campArray[];
}
