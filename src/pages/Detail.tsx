import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import SemiSearch from "../components/withSearch/SemiSearch";
import Search from "../components/withSearch/Search";
import PlanWrite from "../components/withPlan/PlanWrite";
import { isModal } from "../store/searchAtom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetApi } from "../APIs/getApi";
import { StrDay } from "../store/dateAtom";
import getIcons from "../utils/getIcons";
import { getCamperToken } from "../instance/cookies";
import { isToast, isToast2 } from "../store/toastAtom";
import {
  NoIdPickToast,
  NavToast2,
  InfoToast3,
  NavToast4,
} from "../components/Toast/Toast";
import { usePostsApi } from "../APIs/postsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICampingPicked } from "../interfaces/Posts";
import { instance } from "../instance/instance";

function Detail() {
  const [toastState, setToastState] = useRecoilState(isToast);
  const [toastState2, setToastState2] = useRecoilState(isToast2);
  const [toastState3, setToastState3] = useState(false);
  const [toastState4, setToastState4] = useState(false);

  const url = window.location.href;
  //toast
  const copied = () => {
    window.alert("복사완료");
  };

  const copyLinkRef = useRef();
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const [openSemi, setOpenSemi] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);

  const detailMatch = useMatch("/detail/:campId/detail");
  const reviewMatch = useMatch("/detail/:campId/review");

  const day = useRecoilValue(StrDay);
  const isLogin = getCamperToken();

  const { campId } = useParams();

  //찜하기 query
  const queryClient = useQueryClient();
  const mutateFn = async (payload: ICampingPicked) => {
    const { data } = await instance.put(`/camps/${payload}/pick`);
    return data;
  };

  const pickMutate = useMutation(mutateFn, {
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => console.log("찜하기 실패했습니다."),
  });

  const Mypick = (campId: number) => {
    pickMutate.mutate(campId);
    console.log("찜하기", campId);
  };

  const Unpick = (campId: number) => {
    pickMutate.mutate(campId);
    console.log("취소", campId);
  };

  const goBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setOpenSemi(true);
  };
  const openPlan = () => {
    setIsPlan(true);
  };

  const fullIcon = () => {
    setOpenIcon((prev) => !prev);
  };

  const warnAlert = () => {
    setToastState(true);
  };

  // useEffect로 detail아이템이 바꼈을때 checkitem으로 state값으로관리
  // setquerydata
  const detailItem: any = useGetApi.useGetCampDetail(campId)?.data?.[0];
  // console.log("detail", detailItem);

  const icons = useMemo<string[]>(() => {
    if (!detailItem) return [];
    return detailItem.sbrsCl?.split(",");
  }, [detailItem]);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  return (
    <>
      {openSemi == false ? null : (
        <SemiSearch openSemi={openSemi} setOpenSemi={setOpenSemi} />
      )}
      {isSearch == false ? null : <Search />}

      {isPlan == false ? null : (
        <PlanWrite isPlan={isPlan} setIsPlan={setIsPlan} campId={campId} />
      )}
      <Wrapper>
        {/* 로그인 없이 일정버튼 누를 때 */}
        {toastState == true ? (
          <NoIdPickToast
            text={"로그인 후 일정등록을 할 수 있어요."}
            toastState={toastState}
            setToastState={setToastState}
          />
        ) : null}

        {/* 찜목록 제거 */}
        {toastState3 == true ? (
          <InfoToast3
            text={"찜목록에 제거되었어요."}
            toastState3={toastState3}
            setToastState3={setToastState3}
          />
        ) : null}

        {/* 여행일정 등록완료 */}
        {toastState2 == true ? (
          <NavToast2
            text={"여행일정 등록을 완료했어요."}
            url={"/mypage/myplan"}
            toastState2={toastState2}
            setToastState2={setToastState2}
          />
        ) : null}

        {/* 찜목록 추가 */}
        {toastState4 == true ? (
          <NavToast4
            text={"찜목록에 추가되었어요."}
            url={"/mypage/mypick"}
            toastState4={toastState4}
            setToastState4={setToastState4}
          />
        ) : null}

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
                <CopyToClipboard text={url}>
                  <ClipBoardBtn onClick={copied}>
                    <img
                      src="/images/icon-share.svg"
                      alt="share"
                      style={{
                        top: 12,
                        right: 69.5,
                        position: "absolute",
                      }}
                    />
                  </ClipBoardBtn>
                </CopyToClipboard>
              </div>
              <div className="buttonBg">
                {detailItem?.status ? (
                  <PickImg
                    onClick={(e) => {
                      e.stopPropagation();
                      setToastState3(true);
                      Mypick(detailItem.campId);
                    }}>
                    <img
                      src="/images/icons/picked.svg"
                      alt="Picked"
                      style={{
                        width: "17px",
                        marginLeft: "5.5px",
                        marginTop: "3px",
                      }}
                    />
                  </PickImg>
                ) : (
                  <UnpickImg
                    onClick={(e) => {
                      e.stopPropagation();
                      setToastState4(true);
                      Unpick(detailItem.campId);
                    }}>
                    <img
                      src="/images/icons/unPicked.svg"
                      alt="unPicked"
                      style={{
                        width: "17px",
                        marginLeft: "5.5px",
                        marginTop: "3px",
                      }}
                    />
                  </UnpickImg>
                )}
              </div>
            </div>
          </TopNavContainer>
          <MainCampImg src={detailItem?.ImageUrl} alt="campImg" />
        </MainImage>
        {/* 중앙 : 정보 + 찜 리뷰 + 일정 저장 버튼 */}
        <MiddleContainer>
          <UpperWrapper>
            <Left>{detailItem?.campName}</Left>
            <Right>
              {detailItem?.induty.split(",").map((duty: string, i: number) => (
                <DutyBox key={i}>
                  <Duties>{duty}</Duties>
                </DutyBox>
              ))}
            </Right>
          </UpperWrapper>
          <DownWrapper>
            <div>
              <img src="/images/location.svg" alt="location" />
            </div>
            <p>{detailItem?.address}</p>
          </DownWrapper>
        </MiddleContainer>
        <PickBox>
          <Pick>찜({detailItem?.pickCount})</Pick>
          <Review>리뷰({detailItem?.reviewCount})</Review>
        </PickBox>
        <AddtripBtn>
          <div className="leftInfo">
            <img src="/images/Calendar.svg" alt="calendar" />
            <u className="date" onClick={openModal}>
              12월 {day}일
            </u>
            <span
              style={{
                fontSize: "1rem",
                marginTop: "-4px",
                marginLeft: "4px",
              }}></span>
            <Plan> 일정을 저장해 보세요! </Plan>
          </div>
          {isLogin ? (
            <div className="rightBtn" onClick={openPlan}>
              여행일정 저장
            </div>
          ) : (
            <div className="rightBtn none" onClick={warnAlert}>
              여행일정 저장
            </div>
          )}
        </AddtripBtn>
        <WFcBox>
          <FcBox>
            <FcTextBox>
              <FcLeft>시설 요약</FcLeft>
              {icons.length > 6 && (
                <FcRight onClick={fullIcon}>전체보기</FcRight>
              )}
            </FcTextBox>
            <FcIconBox isActive={openIcon}>
              {icons.length > 0 &&
                icons?.map((item, i) => (
                  <TheIcon key={i}>
                    {getIcons(item)}
                    <span>{item}</span>
                  </TheIcon>
                ))}
            </FcIconBox>
          </FcBox>
        </WFcBox>
        <GrayHr />
        <Tabs>
          <Tab
            isLine={Boolean(detailMatch)}
            onClick={() => navigate(`/detail/${campId}/detail`)}>
            상세정보
          </Tab>
          <Tab
            isLine={Boolean(reviewMatch)}
            onClick={() => navigate(`/detail/${campId}/review`)}>
            리뷰
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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  margin: 0 auto;
  width: inherit;
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
  margin: 34px 0 0;
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
    cursor: pointer;
  }
`;

const ClipBoardBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const UpperWrapper = styled.div`
  display: flex;
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
  font-size: ${(props) => props.theme.pixelToRem(13)};
  justify-content: center;
  display: flex;
  /* right: 0; */
`;

const DutyBox = styled.div`
  border-radius: ${(props) => props.theme.pixelToRem(1)};
  color: #666;
  text-align: center;
  margin-top: 6.5px;
`;

const Duties = styled.div`
  margin-right: 5px;
  padding-top: 5px;
  background-color: #f5f5f5;
  width: ${(props) => props.theme.pixelToRem(65)};
  height: ${(props) => props.theme.pixelToRem(22)};
  font-size: ${(props) => props.theme.pixelToRem(12)};
`;

const DownWrapper = styled.div`
  position: relative;
  margin-left: 5px;
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
  margin-top: 20px;
  gap: 6px;
  display: flex;
`;

const Pick = styled.p`
  ${(props) => props.theme.fontTheme.Caption3}
  color:#666;
`;

const Review = styled.p`
  text-decoration: underline;
  ${(props) => props.theme.fontTheme.Caption3}
  color:#666;
`;

const AddtripBtn = styled.button`
  width: 93%;
  height: ${(props) => props.theme.pixelToRem(46)};
  margin: ${(props) => props.theme.pixelToRem(4)} auto;
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
      margin-left: 5px;

      .date {
        width: 60px;
        height: auto;
        padding-bottom: 3px;
        margin-top: -2px;
        margin-left: 6px;
        border-right: 1px solid #000000;
      }
    }
  }

  .rightBtn {
    right: 0;
    top: 0;
    margin-top: -1px;
    width: 36%;
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

    &.none {
      background-color: ${(props) => props.theme.colorTheme.border};
    }
  }
`;

const Plan = styled.div`
  margin-left: 6px;
  transform: translateY(-2px);
`;

const PickImg = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;
const UnpickImg = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
`;

const WFcBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(355)};
  margin: auto;
  justify-content: space-around;
  /* background-color: red; */
`;

const FcBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const FcTextBox = styled.div`
  width: 100%;
  margin-top: 10px;
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
  cursor: pointer;
`;

const FcIconBox = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(80)};
  justify-content: center;
  display: flex;
  transition: all 0.3s linear;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 5px;

  height: ${(props) =>
    props.isActive == false
      ? props.theme.pixelToRem(70)
      : props.theme.pixelToRem(150)};
`;

const TheIcon = styled.div`
  width: ${(props) => props.theme.pixelToRem(60)};
  height: ${(props) => props.theme.pixelToRem(60)};
  flex-direction: column;

  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin: 0 auto;
    width: ${(props) => props.theme.pixelToRem(30)};
  }
  span {
    margin-top: 7px;
    ${(props) => props.theme.fontTheme.Caption3};
    line-height: normal;
    letter-spacing: normal;

    color: ${(props) => props.theme.colorTheme.text2} !important;
    font-size: ${(props) => props.theme.pixelToRem(12)};
  }
`;

const GrayHr = styled.hr`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(8)};
  margin: 0 auto;
  border: none;
  background-color: #f2f2f2;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 5px;
`;

const Tab = styled.span<{ isLine: boolean }>`
  width: 50%;
  text-align: center;
  font-size: ${(props) => props.theme.pixelToRem(15)};
  font-weight: 500;
  padding: 7px 0px;
  cursor: pointer;
  border-bottom: ${(props) => (props.isLine ? "3px solid black" : "none")};
  color: ${(props) => (props.isLine ? "#222" : "#ccc")};
`;
