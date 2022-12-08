export interface isPop {
  isPopUp: boolean;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface isDateProps {
  openDate: boolean;
  setOpenDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface topicProps {
  dropImg: string;
}

export interface semiOpenProps {
  openSemi: boolean;
  setOpenSemi: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface planOpenProps {
  isPlan: boolean;
  setIsPlan: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToastProps {
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  toastState: boolean;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
}
