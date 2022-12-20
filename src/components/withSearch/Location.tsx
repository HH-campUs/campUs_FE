import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectLo, showLo } from "../../store/locationAtom";
import styled, { keyframes } from "styled-components";
import { isTextProps } from "../../interfaces/inSearch";

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

function Location({ inputValue }: isTextProps) {
  const [openLocation, setOpenLocation] = useState(false);

  /* 화면상에 나올 지역명 & 캠프장 doNm Request value */
  const [locationValue, setLocationValue] = useRecoilState(showLo);

  /* backend에 보내줄 request 형태의 지역명 (Weather / pardo) */
  const [sendLocation, setSendLocation] = useRecoilState(selectLo);

  /* recoil의 비동기적인 요소에 대해서 조사해보자 */
  const LocationChange = (event: any, params: string) => {
    setSendLocation(event.currentTarget.id);
    setLocationValue(params);
  };

  const LocationFolder = () => {
    setOpenLocation(!openLocation);
  };

  useEffect(() => {
    console.log(sendLocation);
  });

  return (
    <Dropdown>
      {inputValue == "" ? (
        <LocationInfo openLocation={openLocation} onClick={LocationFolder}>
          <SubLocation>지역선택</SubLocation>
          <LocationText>
            {locationValue == "" ? "전체/도" : locationValue}
            <img src="/images/dropdown.svg" alt="dropdown" />
          </LocationText>
          {openLocation == false ? null : (
            <Dcontents openLocation={openLocation}>
              {localData.map((item) => (
                <Locations
                  key={item.name}
                  onClick={(event) => {
                    LocationChange(event, item.name);
                  }}
                  id={item.value}>
                  {item.name}
                </Locations>
              ))}
            </Dcontents>
          )}
        </LocationInfo>
      ) : (
        <DisabledLocationInfo>
          <SubLocation>지역선택</SubLocation>
          <LocationText>
            전체/도
            <img src="/images/dropdown.svg" alt="dropdown" />
          </LocationText>
        </DisabledLocationInfo>
      )}
    </Dropdown>
  );
}

export default Location;

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}
`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const Dropdown = styled.div`
  top: ${(props) => props.theme.pixelToRem(-16)};
  position: relative;
  display: inline-block;
`;

const LocationInfo = styled.div<{ openLocation: boolean }>`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) =>
    props.openLocation == false
      ? props.theme.pixelToRem(70)
      : props.theme.pixelToRem(328)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid ${(props) => props.theme.pixelToRem(1)} #e3e3e3;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  transition: all 0.37s ease;
  display: flex;
`;

const DisabledLocationInfo = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(70)};
  margin: 16px 0;
  padding: 25px 20px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: ${(props) => props.theme.colorTheme.disabled};
  justify-content: space-between;
  transition: all 0.4s ease;
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
  margin-right: 15px !important;
  font-family: Pretendard;
  ${(props) => props.theme.fontTheme.Subtitle4};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: ${(props) => props.theme.pixelToRem(-0.5)};
  text-align: right;
  position: relative;
  img {
    position: absolute;
  }
`;

/* After Dropdown -> contents */
const Dcontents = styled.div<{ openLocation: boolean }>`
  width: 95%;
  height: ${(props) => props.theme.pixelToRem(261)};
  margin: 40px 0 0 -10px;
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  border-top: 1px solid ${(props) => props.theme.colorTheme.border};
  overflow: scroll;
  position: absolute;

  animation-name: ${(props) =>
    props.openLocation == false ? fadeOut : fadeIn};
  animation-duration: 1.3s;

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
