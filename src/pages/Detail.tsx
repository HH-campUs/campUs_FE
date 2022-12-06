import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Outlet, useMatch, useLocation, useNavigate } from "react-router-dom";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; //empty
import BookmarkIcon from "@mui/icons-material/Bookmark"; //filled
import { useGetApi } from "../APIs/getApi";
import { campArray, IGetCampResult } from "../interfaces/get";
import { differenceInCalendarQuarters } from "date-fns";

function Detail() {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const detailMatch = useMatch("/detail/:id/detail");
  const reviewMatch = useMatch("/detail/:id/review");

  const loca = useLocation();
  const state = loca.state as { campId: number };

  const goBack = () => {
    navigate(-1);
  };

  //1. 타입 옵셔널 체이닝 확인
  //2. 쿼리문의 타입 확인
  //3. undefiend = !로 해결

  const detailItem = useGetApi.useGetCampDetail(state.campId).data;
  const checkItem = detailItem?.detailCamp![0];

  const icon: string[] | undefined =
    detailItem?.detailCamp![0].sbrsCl.split(",");

  console.log(icon);

  interface IconArr {
    [key: string]: string;
  }

  //4~6단계.

  //1. IconArr / icon 배열 각 각 일치하는 지 확인.
  //2. 일치할때(true) IconnArr의 요소값 리턴,
  //3. 그 리턴값 이미지url 사용 -> 배열이되야됨.
  //4. 3번결과 배열로 맵사용.
  //5. 맵을사용했을때 이미자만 나오는게아니라, 이미지+text같이나와야함.

  // include , 이중for문, filter

  const iconArr: string[] = [
    "무선인터넷",
    "장작판매",
    "온수",
    "트렘폴린",
    "물놀이장",
    "놀이터",
    "산책로",
    "운동장",
    "운동시설",
    "마트.편의점",
    "애완동물",
  ];
  // , icons.push(iconArr[icon![i]]);

  const icons: string[] = [];

  // useEffect(() => {
  //   for (let i = 0; i < 11; i++) {
  //     if (icon !== undefined) {
  //       iconArr.array.forEach((element) => {});
  //     }
  //   }
  //   console.log(icons);
  // }, []);

  // console.log(kim);

  const [bookmark, setBookMark] = useState(true);
  const marking = () => {
    setBookMark((prev) => !prev);
  };

  // [{전기,"/images/back.svg"}].map((qwer) => {<img src="{adsf}"></img>})
  // 진기 ? 아이콘 : null

  return (
    <>
      {isSearch == false ? null : <Search />}
      <Wrapper>
        {/* 최상단 이미지*/}

        <MainImage>
          <TopNavContainer>
            <div style={{ display: "flex" }}>
              <div className="buttonBg">
                <img
                  src="/images/back.svg"
                  alt="share"
                  style={{
                    marginTop: "2px",
                  }}
                  onClick={goBack}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="buttonBg" style={{ marginRight: "14px" }}>
                <img
                  src="/images/icon-share.svg"
                  alt="share"
                  style={{
                    marginLeft: "2px",
                    marginTop: "1px",
                  }}
                />
              </div>
              <div className="buttonBg">
                <PickImg onClick={marking}>
                  {bookmark ? (
                    <img
                      src="/images/icons/unPicked.svg"
                      alt="unPicked"
                      style={{
                        width: "17px",
                        marginLeft: "5.5px",
                        marginTop: "3px",
                      }}
                    />
                  ) : (
                    <img
                      src="/images/icons/picked.svg"
                      alt="Picked"
                      style={{
                        width: "17px",
                        marginLeft: "5px",
                        marginTop: "3px",
                      }}
                    />
                  )}
                </PickImg>
              </div>
            </div>
          </TopNavContainer>
          <MainCampImg src={checkItem?.ImageUrl} alt="campImg" />
        </MainImage>

        {/* 중앙 : 정보 + 찜 리뷰 + 일정 저장 버튼 */}
        <MiddleContainer>
          <UpperWrapper>
            <Left>{checkItem?.campName}</Left>
            {/* 맵처리 */}
            <Right>
              <div>일반야영장</div> <div>글램핑</div>
            </Right>
          </UpperWrapper>
          <DownWrapper>
            <div>
              <img src="/images/location.svg" alt="location" />
            </div>
            <p>{checkItem?.address}</p>
          </DownWrapper>
        </MiddleContainer>
        <PickBox>
          <Pick>찜({checkItem?.pickCount})</Pick>
          <Review>리뷰({checkItem?.reviewCount})</Review>
        </PickBox>
        <AddtripBtn>
          <div className="leftInfo">
            <img src="/images/Calendar.svg" alt="calendar" />
            <p>12월 20일 </p>
            <u>부산북구 날씨 상세</u>
          </div>
          <div className="rightBtn">여행일정 저장</div>
        </AddtripBtn>

        <WFcBox>
          <FcBox>
            <FcTextBox>
              <FcLeft>시설 요약</FcLeft>
              <FcRight>전체보기</FcRight>
            </FcTextBox>
            <FcIconBox>
              {/* {icons?.map((item, i) => {
                <TheIcon key={i}>
                  <img src={item} alt="dog" />
                  <span>애완동물</span>
                </TheIcon>;
              })} */}
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
            </FcIconBox>
          </FcBox>
        </WFcBox>
        <GrayHr />

        <Tabs>
          <Tab isActive={Boolean(detailMatch)}>
            <TabClick
              onClick={() =>
                navigate(`/detail/:${state.campId}/detail`, {
                  state: {
                    campId: `${state.campId}`,
                  },
                })
              }
            >
              상세정보
            </TabClick>
          </Tab>
          <Tab isActive={Boolean(reviewMatch)}>
            <TabClick
              onClick={() =>
                navigate(`/detail/:${state.campId}/review`, {
                  state: {
                    campId: `${state.campId}`,
                  },
                })
              }
            >
              리뷰
            </TabClick>
          </Tab>
        </Tabs>
        <div>
          <Outlet />
        </div>
      </Wrapper>
    </>
  );
}

export default Detail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.pixelToRem(375)};
`;

const MainImage = styled.div`
  margin: 0 auto;
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(256)};
  position: relative;
  object-fit: contain;
`;

const MainCampImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TopNavContainer = styled.div`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(50)};
  margin: 44px 0 0;
  padding: 9px 20px 9px 21px;
  background-color: transparent;
  justify-content: space-between;
  position: absolute;
  display: flex;

  .buttonBg {
    width: ${(props) => props.theme.pixelToRem(32)};
    height: ${(props) => props.theme.pixelToRem(32)};
    padding: 2px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const UpperWrapper = styled.div`
  display: flex;
  position: absolute;
`;

const Left = styled.div`
  margin-top: 5px;
  margin-left: 8px;
  ${(props) => props.theme.fontTheme.Headerline1};
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const Right = styled.div`
  margin-top: 10px;
  margin-left: 80px;
  font-size: ${(props) => props.theme.pixelToRem(13)};
  color: grey;
  justify-content: center;
  display: flex;

  div {
    width: auto;
    height: auto;
    flex-grow: 0;
    margin: 0 0 0 5px;
    padding: 5px;
    border-radius: 1px;
    background-color: #f5f5f5;
  }
`;

const DownWrapper = styled.div`
  /* background-color: red; */
  margin: 35px 5px;
  display: flex;
  text-align: center;
  align-items: center;

  p {
    font-size: ${(props) => props.theme.pixelToRem(14)};
    color: #666;
  }
`;

const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.theme.pixelToRem(55)};
  margin-top: ${(props) => props.theme.pixelToRem(14)};
`;

const PickBox = styled.div`
  margin-left: ${(props) => props.theme.pixelToRem(10)};
  height: ${(props) => props.theme.pixelToRem(30)};
  gap: 6px;

  display: flex;
`;

const Pick = styled.p`
  margin-top: ${(props) => props.theme.pixelToRem(12)};
  ${(props) => props.theme.fontTheme.Caption3}
  color:#666;
`;

const Review = styled.p`
  margin-top: ${(props) => props.theme.pixelToRem(12)};
  text-decoration: underline;
  ${(props) => props.theme.fontTheme.Caption3}
  color:#666;
`;

const AddtripBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(46)};
  margin: ${(props) => props.theme.pixelToRem(24)} auto;
  flex-grow: 0;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px ${(props) => props.theme.colorTheme.border};
  background-color: ${(props) => props.theme.colorTheme.textWhite};
  justify-content: space-between;
  display: flex;
  position: relative;

  .leftInfo {
    margin: 0 auto;
    padding: 16px;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    background-color: transparent;
    ${(props) => props.theme.fontTheme.Caption3};
    position: absolute;
    display: flex;

    img {
      height: 20px;
      margin-top: -4px;
      margin-left: -6px;
    }

    p {
      width: 60px;
      height: auto;
      padding-bottom: 3px;
      margin-top: -2px;
      margin-left: 6px;
      border-right: 1px solid #000000;
    }

    u {
      margin-top: -2px;
      margin-left: 11px;
      text-underline-position: under;
    }
  }

  .rightBtn {
    right: 0;
    top: 0;
    margin-top: -1px;
    width: ${(props) => props.theme.pixelToRem(117)};
    height: ${(props) => props.theme.pixelToRem(46)};
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    flex-grow: 0;
    padding: 15px 20px 14px;
    background-color: ${(props) => props.theme.colorTheme.main};
    ${(props) => props.theme.fontTheme.Caption1};
    color: ${(props) => props.theme.colorTheme.textWhite} !important;
    line-height: normal;
    letter-spacing: normal;
    position: absolute;
  }
`;

const PickImg = styled.div`
  display: flex;
  flex-direction: column;
`;

const WFcBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  margin: auto;
  justify-content: space-around;
`;

const FcBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const FcTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FcLeft = styled.div`
  margin-top: 5px;
  ${(props) => props.theme.fontTheme.Subtitle2};
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
`;

const FcRight = styled.div`
  margin-top: 5px;
  margin-right: ${(props) => props.theme.pixelToRem(10)};
  ${(props) => props.theme.fontTheme.Caption2};
  color: ${(props) => props.theme.colorTheme.text3} !important;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: right;
  display: flex;
`;

const FcIconBox = styled.div`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(80)};
  margin-top: 20px;
  display: flex;
`;

const TheIcon = styled.div`
  width: ${(props) => props.theme.pixelToRem(50)};
  height: ${(props) => props.theme.pixelToRem(50)};
  margin-top: -4px;
  margin-right: 10px;
  flex-direction: column;
  display: flex;
  img {
    margin: 0 auto;
    width: ${(props) => props.theme.pixelToRem(30)};
  }
  span {
    margin-top: 7px;
    ${(props) => props.theme.fontTheme.Caption3};
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => props.theme.colorTheme.text2} !important;
  }
`;

const GrayHr = styled.hr`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(8)};
  margin: 0 auto;
  border: none;
  background-color: #f2f2f2;
`;

const Tabs = styled.div`
  width: ${(props) => props.theme.pixelToRem(375)};
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 5px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 50%;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.bgColor};
  padding: 7px 0px;
  border-bottom: ${(props) => (props.isActive ? "3px solid black" : "none")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const TabClick = styled.div`
  cursor: pointer;
`;
