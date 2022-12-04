import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/* import { ReactQueryDevtools } from "react-query/devtools"; */
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { toast, ToastContainer } from "react-toastify";
/* import "./style/transition.css"; */

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Splash from "../pages/Splash";

import Topic from "../pages/Topic";
import Detail from "../pages/Detail";
import Dannounce from "../pages/DetailPage/Dannounce";
import Ddetail from "../pages/DetailPage/Ddetail";
import Dreview from "../pages/DetailPage/Dreview";
import Result from "../pages/Result";
import Mypage from "../pages/Mypage";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "../layout/theme";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../store/atmos";
import Layout from "../layout/Layout";
import MyReview from "../pages/Mypage/MyReview";
import MyPick from "../pages/Mypage/MyPick";
import MyPlan from "../pages/Mypage/MyPlan";
import Review from "../pages/Review";

/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="result" element={<Result />} />
          <Route path="topic/:topicId" element={<Topic />} />
          <Route path="login" element={<Login />} />

          <Route path="signup" element={<SignUp />} />

          {/* <Route path="detail" element={<Detail />} /> */}
          <Route path="/detail/:id" element={<Detail />}>
            <Route path="/detail/:id/announce" element={<Dannounce />} />
            <Route path="/detail/:id/detail" element={<Ddetail />} />
            <Route path="/detail/:id/review" element={<Dreview />} />
          </Route>
          <Route path="/review" element={<Review />} />

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
  );
}

export default Router;
