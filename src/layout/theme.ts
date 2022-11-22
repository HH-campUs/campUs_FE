import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "white",
  accentColor: "#9c88ff",
};

export const lightTheme: DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "#718093",
  accentColor: "#1e272e",
};

export const colorTheme = {
  text: "#222222",
  text2: "#666666",
  text3: "#909090",
  textWhite: "#ffffff",
  primary1: "#024873",
  primary2: "#5185A6",
  primary3: "#5185A6",
  primary30: "#ADC2CE",
};

/* convert px to rem */
export const pixelToRem = (size: number) => `${size / 16}rem`;

/* font-set (article / font-weight / font-size / color) */
export const font = {
  /* Headerline */
  Headerline1: `
 font-size: ${pixelToRem(20)};
 font-weight: 600;
 color: ${colorTheme.text};
`,
  Headerline2: `
 font-size: ${pixelToRem(20)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Headerline3: `
 font-size: ${pixelToRem(18)};
 font-weight: 600;
 color: ${colorTheme.text};
`,
  /* Subtitle */
  Subtitle1: `
 font-size: ${pixelToRem(18)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Subtitle2: `
 font-size: ${pixelToRem(18)};
 font-weight: 600;
 color: ${colorTheme.text};
`,
  Subtitle3: `
 font-size: ${pixelToRem(16)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  /* Body */
  Body1: `
 font-size: ${pixelToRem(16)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Body2: `
 font-size: ${pixelToRem(16)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  /* Caption */
  Caption1: `
 font-size: ${pixelToRem(14)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Caption2: `
 font-size: ${pixelToRem(14)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  Caption3: `
 font-size: ${pixelToRem(12)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Caption4: `
 font-size: ${pixelToRem(12)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
};
