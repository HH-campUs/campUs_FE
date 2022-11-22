export interface IGetCampCatInfo {
  keyword: string;
}

export interface IGetCampReview {
  userId: number;
  campId: number;
  reviewImg: string;
  reviewComment: string;
}

export interface IGetWeather {
  pardo: string;
  dt: string;
}

export interface IGetCampResult {
  campId: number;
  campName: string;
  /* 야영장 종류 */
  induty: string;
  doNm: string;
  /*  */
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
}
