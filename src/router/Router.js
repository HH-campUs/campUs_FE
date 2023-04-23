import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "../pages/Home";
import Splash from "../pages/Splash";
import KaKaoAuth from "../pages/OAuth/KaKaoAuth";
import GoogleAuth from "../pages/OAuth/GoogleAuth";

import Ddetail from "../pages/DetailPage/Ddetail";
import Dreview from "../pages/DetailPage/Dreview";

import Layout from "../layout/Layout";

/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */

function Router() {
  /* Lazy를 활용하여 페이지 분리하기 */

  const Result = lazy(() =>
    /* webpackChunkName: "Result" */ import("../pages/Result")
  );
  const Keyword = lazy(() =>
    /* webpackChunkName: "Keyword" */ import("../pages/Keyword")
  );
  const Topic = lazy(() =>
    /* webpackChunkName: "Topic" */ import("../pages/Topic")
  );
  const Login = lazy(() =>
    /* webpackChunkName: "Login" */ import("../pages/Login")
  );
  const SignUp = lazy(() =>
    /* webpackChunkName: "SignUp" */ import("../pages/SignUp")
  );
  const Welcome = lazy(() =>
    /* webpackChunkName: "Welcome" */ import("../pages/Welcome")
  );

  const Mypage = lazy(() =>
    /* webpackChunkName: "Mypage" */ import("../pages/Mypage")
  );
  const NotFound = lazy(() =>
    /* webpackChunkName: "NotFound" */ import("../pages/NotFound")
  );
  const MyReview = lazy(() =>
    /* webpackChunkName: "MyReview" */ import("../pages/Mypage/MyReview")
  );
  const MyPick = lazy(() =>
    /* webpackChunkName: "MyPick" */ import("../pages/Mypage/MyPick")
  );
  const MyPlan = lazy(() =>
    /* webpackChunkName: "MyPlan" */ import("../pages/Mypage/MyPlan")
  );
  const Detail = lazy(() =>
    /* webpackChunkName: "Detail" */ import("../pages/Detail")
  );
  const Review = lazy(() =>
    /* webpackChunkName: "Review" */ import("../pages/Review")
  );

  return (
    <BrowserRouter>
      <Splash />
      <Suspense fallback={<div>...loading</div>}>
        <Layout>
          <TransitionGroup>
            <CSSTransition timeout={500}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="result" element={<Result />} />
                <Route path="keyword" element={<Keyword />} />
                <Route path="topic/:topicId" element={<Topic />} />
                <Route path="login" element={<Login />} />
                <Route path="/kakao/callback" element={<KaKaoAuth />} />
                <Route path="/google/callback" element={<GoogleAuth />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="Welcome" element={<Welcome />} />
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
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
