import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

interface local {
  name: string;
}

const localData: Array<local> = [
  { name: "서울" },
  { name: "인천" },
  { name: "경기" },
  { name: "강원" },
  { name: "대전" },
  { name: "세종" },
  { name: "대구" },
  { name: "부산" },
  { name: "울산" },
  { name: "광주" },
  { name: "충북" },
  { name: "충남" },
  { name: "전북" },
  { name: "전남" },
  { name: "경북" },
  { name: "경남" },
  { name: "제주" },
];

function Location() {
  /* const [sendLo, setSendLo] = useRecoilState("서울") */

  return (
    <div>
      {localData.map((item) => (
        <label>
          <input type="radio" name="location" />
          {item.name}
        </label>
      ))}
    </div>
  );
}

export default Location;
