export interface IGetCampCatInfo {
  keyword: string;
}

export interface IGetCampReview {
  userId: number;
  campId: number;
  reviewImg: string;
  reviewComment: string;
  likeStatus: number;
  data: IGetCampReview[];
  reviewMap: IGetCampReview[];
  createdAt: string;
  updatedAt: string;
  nickname: string;
  profileImg: string;
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
  data: IGetNewReview[];
  NewReview: IGetNewReview[];
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


export interface IMostList extends IGetCampResult {
  look: IGetCampResult;
  pick: IGetCampResult;
  review: IGetCampResult;
  MostList: IGetCampResult[];
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
}

export interface campArray extends IGetCampResult {
  currentPage: number;
  total: number;
  topicCamp: IGetCampResult[];
  campTopic: IGetCampResult[];
  regionCamp: IGetCampResult[];
  detailCamp?: IGetCampResult[];
  camps: IGetCampResult[];
  nextPage?: number;
  lastPage?: boolean;
  isLast?: boolean;
  pageParam?: number;
  fetchNextPage: boolean;
  isSuccess: boolean;
  hasNextPage: boolean;
  refetch: boolean;
}

export interface campResult extends campArray {
  data: campArray[];
}

export interface pickedCamp extends campArray {
  data: campArray[];
}
