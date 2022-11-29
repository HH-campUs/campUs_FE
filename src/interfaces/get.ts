export interface IGetCampCatInfo {
  keyword: string;
}

export interface IGetCampReview {
  userId: number;
  campId: number;
  reviewImg: string;
  reviewComment: string;
}

/* 날씨 */
export interface IGetWeather {
  weather: Array<any>;
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

export interface IGetCampResult {
  campId: number;
  campName: string;
  /* 야영장 종류 */
  induty: string;
  doNm: string;
  sigunguNm: string;
  address: string;
  X: string | number;
  Y: string | number;
  oerPdcl: string;
  operDecl: string;
  animal: string;
  ImageUrl: string;
  homepage: string;
  sbrsCl: string;
  posblFcltyCl: string;
  wtrplCo: string;
  swrmCo: string;
  toiletCo: string;
  manageSttus: string;
  themaEnvrnCl: string;
  lookup: string;
  createdtime: string;
  eqpmnLendCl: string;
  reviewCount: number;
  pickCount: number;
}

export interface campArray extends IGetCampResult {
  currentPage?: number;
  total: number;
  regionCamp: IGetCampResult[];
  nextPage?: number;
  lastPage?: boolean;
  isLast?: boolean;
  pageParam?: number;
}

export interface campResult extends campArray {
  data: campArray[];
}
