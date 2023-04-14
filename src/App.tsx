import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/* import { ReactQueryDevtools } from "react-query/devtools"; */
import "./style/transition.css";

import Error from "./pages/Error";

import { ErrorBoundary } from "react-error-boundary";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./layout/theme";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary FallbackComponent={Error}>
          <Router />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Pretendard-Regular';
    font-size: 100%;
    vertical-align: baseline;
    -ms-overflow-style: none;
      .scroll_container{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  }
  
  .scroll_container::-webkit-scrollbar{
  display: none;
  width: 0;  /* Remove scrollbar space */
  height: 0;
  background: transparent;  /* Optional: just make scrollbar invisible */
  -webkit-appearance: none;
  }
    ::-webkit-scrollbar {
    display: none;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */


  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
  *{
    user-select: none;
  }
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body{
    font-family: 'Pretendard-Regular';
   
}

  }
  a{
    text-decoration: none;
    color:inherit;
  }
  input{
    outline: none;
  }
`;
