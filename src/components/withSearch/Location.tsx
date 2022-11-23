import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectLo, ExportLocation } from "../../store/locationAtom";
import styled from "styled-components";

interface local {
  name: string;
  value: string;
}

const localData: Array<local> = [
  { name: "서울시", value: "서울" },
  { name: "인천시", value: "인천" },
  { name: "경기도", value: "경기" },
  { name: "강원도", value: "강원" },
  { name: "대전시", value: "대전" },
  { name: "세종시", value: "세종" },
  { name: "대구시", value: "대구" },
  { name: "부산시", value: "부산" },
  { name: "울산시", value: "울산" },
  { name: "광주시", value: "광주" },
  { name: "충청북도", value: "충북" },
  { name: "충청남도", value: "충남" },
  { name: "전라북도", value: "전북" },
  { name: "전라남도", value: "전남" },
  { name: "경상북도", value: "경북" },
  { name: "경상남도", value: "경남" },
  { name: "제주도", value: "제주" },
];

function Location() {
  const [openLocation, setOpenLocation] = useState(false);

  /* 화면상에 나올 지역명 */
  const [locationValue, setLocationValue] = useState<string>();

  /* backend에 보내줄 request 형태의 지역명 */
  const [sendLocation, setSendLocation] = useRecoilState(selectLo);

  const LocationChange = (event: any) => {
    setLocationValue(event.target.id);
    setSendLocation(event.target.id);
    console.log(locationValue, sendLocation);
  };

  const LocationFolder = () => {
    setOpenLocation(!openLocation);
  };

  return (
    <Dropdown>
      <LocationInfo onClick={LocationFolder}>
        <SubLocation>지역선택</SubLocation>
        <LocationText>
          {locationValue == null ? "전체/도" : locationValue}
          <img src="/images/dropdown.svg" alt="dropdown" />
        </LocationText>
      </LocationInfo>
      {openLocation == false ? null : (
        <Dcontents>
          {localData.map((item) => (
            <Locations key={item.name} onClick={LocationChange} id={item.value}>
              {item.name}
            </Locations>
          ))}
        </Dcontents>
      )}
    </Dropdown>
  );
}

export default Location;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const LocationInfo = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(70)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid ${(props) => props.theme.pixelToRem(1)} #e3e3e3;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  display: flex;
`;

const SubLocation = styled.div`
  width: 116px;
  height: 20px;
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Subtitle4};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: ${(props) => props.theme.pixelToRem(-0.5)};
  text-align: left;
`;

const LocationText = styled.div`
  width: 124px;
  height: 20px;
  margin-left: 40px !important;
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Subtitle4};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: ${(props) => props.theme.pixelToRem(-0.5)};
  text-align: right;
  img {
    position: absolute;
  }
`;

/* After Dropdown -> contents */
const Dcontents = styled.div`
  width: 95%;
  height: ${(props) => props.theme.pixelToRem(170)};
  margin: 0 auto;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  border-top: 1px solid ${(props) => props.theme.colorTheme.border};
  overflow: scroll;
  //display: none;

  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
`;

const Locations = styled.div`
  padding: 12px 3px;
  text-decoration: none;
  ${(props) => props.theme.fontTheme.Subtitle4};
  text-align: right;
  display: block;

  :hover {
    background-color: ${(props) => props.theme.colorTheme.primary3};
  }
`;
