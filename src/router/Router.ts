/* import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Pop from "../pages/Pop";
import Recommended from "../pages/Recommended";
import Popular from "../pages/Popular";

import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Result from "../pages/Result";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";

import Layout from "../layout/Layout";

/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */

function Router() {
  /*  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="popping" element={<Pop />} />
            <Route path="recommended" element={<Recommended />} />
            <Route path="popular" element={<Popular />} />
          </Route>
          <Route path="result" element={<Result />} />

          <Route path="detail" element={<Detail />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="mypage/:id" element={<Mypage />}>
            <Route path="mypage/:id/myreview" element={<MyReview />} 
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  ); */
}

export default Router;
