import React, { useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";

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
    async function c() {
      const r = await axios.get(
        "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=eb5460afac5d3494e2e739c0c59e0988"
      );
      console.log(r);
    }
    c();
  }, []);

  return (
    <div>
      Home
      <Carousel />
    </div>
  );
}

export default Home;
