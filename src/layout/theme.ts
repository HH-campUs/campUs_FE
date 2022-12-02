import { DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "white",
  accentColor: "#9c88ff",
};

const lightTheme: DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "#718093",
  accentColor: "#1e272e",
};

const colorTheme = {
  text: "#222222",
  text2: "#666666",
  text3: "#909090",
  border: "#e3e3e3",
  textWhite: "#ffffff",
  cold: "#5db1ff",
  hot: "#e27554",
  main: "#024873",
  primary1: "#024873",
  primary2: "#5185A6",
  primary3: "#9DD3F5",
  primary30: "#ADC2CE",
  warning: "fc9701",
  danger: "#eb4343",
  good: "#27a80c",
  disabled: "#f3f3f3",
};

/* convert px to rem */
const pixelToRem = (size: number) => `${size / 16}rem`;

/* font-set (article / font-weight / font-size / color) */
const fontTheme = {
  /* Headerline */
  Headerline1: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(20)};
 font-weight: 600;
 color: ${colorTheme.text};
`,
  Headerline2: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(20)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Headerline3: `
  font-family: 'Pretendard-Regular';
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
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(16)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  Subtitle4: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(16)};
 font-weight: 600;
 color: ${colorTheme.text};
`,
  /* Body */
  Body1: `
 font-size: ${pixelToRem(16)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Body2: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(16)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  /* Caption */
  Caption1: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(14)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Caption2: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(14)};
 font-weight: normal;
 color: ${colorTheme.text};
`,
  Caption3: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(12)};
 font-weight: 500;
 color: ${colorTheme.text};
`,
  Caption4: `
  font-family: 'Pretendard-Regular';
 font-size: ${pixelToRem(12)};
 font-weight: normal;
 color: ${colorTheme.text3};
`,
};

export const theme = {
  darkTheme,
  lightTheme,
  fontTheme,
  pixelToRem,
  colorTheme,
};

export type Theme = typeof theme;
