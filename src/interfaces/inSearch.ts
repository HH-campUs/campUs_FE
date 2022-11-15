export interface isProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface searchData {
  selectInput?: string;
  selectDate: string;
  selectLocation?: string;
}
