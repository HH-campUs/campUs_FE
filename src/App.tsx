import React from "react";
/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import Result from "./pages/Result";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    /* 혹시모를 치명적인 Error를 서비스 이용자가 보지 못하게 에러 페이지로 보내버림 */
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="login" element={<Login />} />
          <Route path="detail" element={<Detail />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="mypage/:id" element={<Mypage />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
