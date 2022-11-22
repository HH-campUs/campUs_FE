import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export interface colorType {
  text: string;
  text2: string;
  text3: string;
  textWhite: string;
  primary1: string;
  primary2: string;
  primary3: string;
  primary30: string;
}
