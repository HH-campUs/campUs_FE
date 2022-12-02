export interface isProps {
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface isTextProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface searchData {
  selectInput?: string;
  selectDate: string;
  selectLocation?: string;
}
