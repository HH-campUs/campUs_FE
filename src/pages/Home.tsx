import React, { useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Header from "../layout/Header";

function Home() {
  useEffect(() => {
    async function a() {
      const res = await axios.get(
        "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=gocamp&serviceKey=hxdpEFH4tR8PQCTY8sfFyV78s69uVxnI1z7AJkIgBlkk2kHb0WxnFqZjaLQ9sbfo%2B5C7c47t74J1aNmioNNrwg%3D%3D&_type=json"
      );
      console.log(res);
    }
    a();
  }, []);

  useEffect(() => {
    async function b() {
      const r = await axios.get(
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=eixV3mOlRoqUyi%2BK9P6%2BS3BQMBXCroFM31lGc%2BOSp80JFNv7B8%2FiCEV49OSfF2bchwh5N7z50Sw8OQFWCkZbDg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20221108&base_time=0500&nx=55&ny=127"
      );
      console.log(r);
    }
    b();
  }, []);

  // useEffect(() => {
  //   async function c() {
  //     const r = await axios.get(
  //       "https://api.openweathermap.org/data/3.0/onecall?lat=35.146&lon=126.923&units=metric&exclude=current,minutely,hourly&lang=kr&appid=eb5460afac5d3494e2e739c0c59e0988"
  //     );
  //     console.log(r);
  //   }
  //   c();
  // }, []);

  {
    /* <Carousel /> */
  }

  return (
    <>
      <Header />
      Home
      <Carousel />
    </>
  );
}

export default Home;
