export interface isProps {
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface searchData {
  selectInput?: string;
  selectDate: string;
  selectLocation?: string;
}
