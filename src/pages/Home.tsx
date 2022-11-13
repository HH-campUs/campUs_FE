import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Search from "../components/Search";
import styled from "styled-components";

function Home() {
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    async function a() {
      const res = await axios.get(
        "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=gocamp&pageNo=6&serviceKey=hxdpEFH4tR8PQCTY8sfFyV78s69uVxnI1z7AJkIgBlkk2kHb0WxnFqZjaLQ9sbfo%2B5C7c47t74J1aNmioNNrwg%3D%3D&_type=json"
      );
      console.log(res);
    }
    a();
  }, []);

  useEffect(() => {
    async function c() {
      const r = await axios.get(
        "https://api.openweathermap.org/data/3.0/onecall?lat=35.20944&lon=127.46444&units=metric&exclude=current,minutely,hourly&lang=kr&appid=eb5460afac5d3494e2e739c0c59e0988"
      );
      console.log(r);
    }
    c();
  }, []);

  return (
    <ModalBlur>
      Home
      <Search isActive={isActive} setIsActive={setIsActive} />
      <Carousel />
    </ModalBlur>
  );
}

export default Home;

const ModalBlur = styled.div`
  width: 100vh;
  height: 100vh;
  background-color: #00000067;
`;
