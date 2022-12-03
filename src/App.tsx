import React, { useState } from "react";
/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/* import { ReactQueryDevtools } from "react-query/devtools"; */
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./style/transition.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Splash from "./pages/Splash";

import Topic from "./pages/Topic";
import Detail from "./pages/Detail";
import Ddetail from "./pages/DetailPage/Ddetail";
import Dreview from "./pages/DetailPage/Dreview";
import Result from "./pages/Result";
import Mypage from "./pages/Mypage";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./layout/theme";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./store/atmos";
import Layout from "./layout/Layout";
import MyReview from "./pages/Mypage/MyReview";
import MyPick from "./pages/Mypage/MyPick";
import MyPlan from "./pages/Mypage/MyPlan";
import Review from "./pages/Review";

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
    ::-webkit-scrollbar {
    display: none;
    /* font-family: 'Pretendard-Regular'; */
   
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

const queryClient = new QueryClient();

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary FallbackComponent={Error}>
          <Splash />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="result" element={<Result />} />
                <Route path="topic/:topicId" element={<Topic />} />
                <Route path="login" element={<Login />} />

                <Route path="signup" element={<SignUp />} />

                {/* <Route path="detail" element={<Detail />} /> */}
                <Route path="/detail/:campId" element={<Detail />}>
                  <Route path="/detail/:campId/detail" element={<Ddetail />} />
                  <Route path="/detail/:campId/review" element={<Dreview />} />
                </Route>
                <Route path="/review/:campId" element={<Review />} />

                <Route path="mypage" element={<Mypage />} />
                <Route path="/mypage/" element={<Mypage />}>
                  <Route path="/mypage/myreview" element={<MyReview />} />
                  <Route path="/mypage/mypick" element={<MyPick />} />
                  <Route path="/mypage/myplan" element={<MyPlan />} />
                </Route>

                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
