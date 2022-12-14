import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Welcome from "../pages/Welcome";
import Splash from "../pages/Splash";
import KaKaoAuth from "../pages/OAuth/KaKaoAuth";
import GoogleAuth from "../pages/OAuth/GoogleAuth";

import Topic from "../pages/Topic";
import Detail from "../pages/Detail";
import Ddetail from "../pages/DetailPage/Ddetail";
import Dreview from "../pages/DetailPage/Dreview";
import Result from "../pages/Result";
import Keyword from "../pages/Keyword";
import Mypage from "../pages/Mypage";

import NotFound from "../pages/NotFound";
import Layout from "../layout/Layout";
import MyReview from "../pages/Mypage/MyReview";
import MyPick from "../pages/Mypage/MyPick";
import MyPlan from "../pages/Mypage/MyPlan";
import Review from "../pages/Review";

/* Switch가 react-router-dom ver 6 넘어가며 Switch를 지원 안하게 됨 -> Routes */

function Router() {
  return (
    <BrowserRouter>
      <Splash />
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
    </BrowserRouter>
  );
}

export default Router;
