export interface myModal {
  profileImg: string;
  ninckName: string;
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
