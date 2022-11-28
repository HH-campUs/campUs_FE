export interface myModal {
  profileImg: string;
  ninckName: string;
  file: Blob | MediaSource;
  img: Blob | MediaSource;
}

export interface isPop {
  isPopUp: boolean;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface searchData {
  selectInput?: string;
  selectDate: string;
  selectLocation?: string;
}
