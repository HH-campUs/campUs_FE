import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, Outlet, useMatch, useLocation } from "react-router-dom";
import Search from "../components/withSearch/Search";
import { isModal } from "../store/searchAtom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; //empty
import BookmarkIcon from "@mui/icons-material/Bookmark"; //filled
import { useGetApi } from "../APIs/getApi";

function Detail() {
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const announceMatch = useMatch("/detail/:id/announce");
  const detailMatch = useMatch("/detail/:id/detail");
  const reviewMatch = useMatch("/detail/:id/review");

  const loca = useLocation();
  const state = loca.state as { campId: number };

  const campDetail = useGetApi.useGetCampDetail(state.campId);

  console.log(state.campId, campDetail);
  //recoil?
  const [bookmark, setBookMark] = useState(true);
  const marking = () => {
    setBookMark((prev) => !prev);
  };

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
        </MainImage>

        {/* 중앙 : 정보 + 찜 리뷰 + 일정 저장 버튼 */}
        <MiddleContainer>
          <UpperWrapper>
            <Left>노을공원 가족캠핑장</Left>
            <Right>
              <div>일반야영장</div> <div>글램핑</div>
            </Right>
          </UpperWrapper>
          <DownWrapper>
            <div>
              <img src="/images/location.svg" alt="location" />
            </div>
            <p>서울 마포구 하늘공원로 108-1</p>
          </DownWrapper>
        </MiddleContainer>
        <PickBox>
          <Pick>찜(30)</Pick>
          <Review>리뷰(790)</Review>
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
              <TheIcon>
                <img src="/images/faclIcon/icon-dog.svg" alt="dog" />
                <span>애완동물</span>
              </TheIcon>
            </FcIconBox>
          </FcBox>
        </WFcBox>
        <GrayHr />

        <Tabs>
          <Tab isActive={Boolean(announceMatch)}>
            <Link to="/detail/:id/announce"> 공지사항 </Link>
          </Tab>
          <Tab isActive={Boolean(detailMatch)}>
            <Link to="/detail/:id/detail"> 상세정보</Link>
          </Tab>
          <Tab isActive={Boolean(reviewMatch)}>
            <Link to="/detail/:id/review"> 리뷰</Link>
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
`;

const MainImage = styled.div`
  margin: 0 auto;
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(256)};
  background-image: url("http://economychosun.com/query/upload/344/20200419231455_gltgzjsu.jpg");
  position: relative;
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

const MiddleContainer = styled.div`
  margin-top: 8px;
  margin-left: 40px;
  padding: 0 20px 0 20px;
  width: 95%;
  height: 120px;
  display: flex;
  flex-direction: column;
`;

const UpperWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
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
  margin: 35px 5px;
  display: flex;
  text-align: center;
  align-items: center;

  p {
    font-size: 0.9rem;
    color: grey;
  }
`;

const PickBox = styled.div`
  margin-top: -65px;
  margin-left: -11px;
  padding: 0 20px 0 20px;
  height: 60px;
  gap: 6px;
  text-align: center;
  display: flex;
`;

const Pick = styled.p`
  margin-left: 60px;
  margin-top: 13px;
  ${(props) => props.theme.fontTheme.Caption3}
  color:#595959
`;

const Review = styled.p`
  margin-top: 13px;
  text-decoration: underline;
  ${(props) => props.theme.fontTheme.Caption3}
  color:#595959
`;

const AddtripBtn = styled.button`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(46)};
  margin-top: -12px;
  margin-left: 75px;
  flex-grow: 0;
  border-radius: 10px;
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
  width: 80%;
  margin-left: 60px;
  justify-content: space-around;
`;

const GrayHr = styled.hr`
  width: ${(props) => props.theme.pixelToRem(375)};
  height: ${(props) => props.theme.pixelToRem(8)};
  margin: 0 auto;
  border: none;
  background-color: #f2f2f2;
`;

const FcBox = styled.div`
  margin-top: 20px;
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
  margin-left: 13px;
  ${(props) => props.theme.fontTheme.Subtitle2};
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
`;

const FcRight = styled.div`
  margin-top: 5px;
  margin-right: 23px;
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

const Tabs = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 30px 45px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.bgColor};
  padding: 7px 0px;
  border-bottom: ${(props) => (props.isActive ? "3px solid black" : "none")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
