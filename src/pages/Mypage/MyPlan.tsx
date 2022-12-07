import React, { useState } from "react";
import styled from "styled-components";
import { usePostsApi } from "../../APIs/postsApi";
import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";

export default function MyPlan() {
  const [onOff, setOnOff] = useState(false);
  const isLogin = getCamperToken();
  const navigate = useNavigate();

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked === false) {
      setOnOff(false);
    } else if (e.target.checked === true) {
      setOnOff(true);
    }
  };
  const tripId = 1;
  const deleteHandler = () => {
    usePostsApi.useDeleteTravelPlan(tripId);
  };

  return (
    <TotalContainer>
      <Wrapper>
        {isLogin ? (
          <>
            <ToggleBtn onOff={onOff}>
              <input
                type="checkbox"
                id="toggle"
                onChange={onChangeText}
                hidden
              />

              <span className="offSpan">다가올 여행</span>
              <span className="onSpan">지난여행</span>
              <label htmlFor="toggle" className="toggleSwitch">
                <span className="toggleButton" />
              </label>
            </ToggleBtn>
          </>
        ) : (
          <>
            <NotiBox>
              <div>
                <img src="/images/mypage/myplan.svg" alt="tent" />
              </div>
              <PickText>아직 저장한 여행이 없어요!</PickText>
              <PickBtn
                onClick={() => {
                  navigate("/topic/1");
                }}
              >
                가장 가까운 캠핑장 구경가기
              </PickBtn>
            </NotiBox>
          </>
        )}
      </Wrapper>
      /*{" "}
      <Container>
        {onOff == false ? (
          <>
            <PlanBox>
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMDNfMTIw/MDAxNTcyNzExMzg5NjE4.S3sNMojDGrZ4WdYdGXRV-XMrd5R9jyxts4HLVGcZg1cg.kNrbyXXyEU7EHW5DqsGGr9XufBo-NWfGPIdyQ0mI3kcg.JPEG.z_ye0n/IMG_0206.JPG?type=w800"
                alt="img"
              />
              <div className="infoBox">
                <span>경기도 용인시</span>
                <span>용인 자연휴양림 야영장</span>
                <span>떠나는 날짜</span>
                <span>22.12.03</span>
              </div>
              <BtnBox>
                <button>수정</button>
                <button>리뷰쓰기</button>
              </BtnBox>
            </PlanBox>
            <PlanBox>
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMDNfMTIw/MDAxNTcyNzExMzg5NjE4.S3sNMojDGrZ4WdYdGXRV-XMrd5R9jyxts4HLVGcZg1cg.kNrbyXXyEU7EHW5DqsGGr9XufBo-NWfGPIdyQ0mI3kcg.JPEG.z_ye0n/IMG_0206.JPG?type=w800"
                alt="img"
              />
              <div className="infoBox">
                <span>경기도 용인시</span>
                <span>용인 자연휴양림 야영장</span>
                <span>떠나는 날짜</span>
                <span>22.12.03</span>
              </div>
              <BtnBox>
                <button>수정</button>
                <button>리뷰쓰기</button>
              </BtnBox>
            </PlanBox>
            <PlanBox>
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMDNfMTIw/MDAxNTcyNzExMzg5NjE4.S3sNMojDGrZ4WdYdGXRV-XMrd5R9jyxts4HLVGcZg1cg.kNrbyXXyEU7EHW5DqsGGr9XufBo-NWfGPIdyQ0mI3kcg.JPEG.z_ye0n/IMG_0206.JPG?type=w800"
                alt="img"
              />
              <div className="infoBox">
                <span>경기도 용인시</span>
                <span>용인 자연휴양림 야영장</span>
                <span>떠나는 날짜</span>
                <span>22.12.03</span>
              </div>
              <BtnBox>
                <button>수정</button>
                <button>리뷰쓰기</button>
              </BtnBox>
            </PlanBox>
            <PlanBox>
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAxOTExMDNfMTIw/MDAxNTcyNzExMzg5NjE4.S3sNMojDGrZ4WdYdGXRV-XMrd5R9jyxts4HLVGcZg1cg.kNrbyXXyEU7EHW5DqsGGr9XufBo-NWfGPIdyQ0mI3kcg.JPEG.z_ye0n/IMG_0206.JPG?type=w800"
                alt="img"
              />
              <div className="infoBox">
                <span>경기도 용인시</span>
                <span>용인 자연휴양림 야영장</span>
                <span>떠나는 날짜</span>
                <span>22.12.03</span>
              </div>
              <BtnBox>
                <button>수정</button>
                <button>리뷰쓰기</button>
              </BtnBox>
            </PlanBox>
          </>
        ) : null}
      </Container>{" "}
      */
    </TotalContainer>
  );
}

const TotalContainer = styled.div`
  position: absolute;
`;

const ToggleBtn = styled.div<{ onOff: boolean }>`
  margin-top: -20px;
  margin-left: -10px;

  .toggleSwitch {
    width: ${(props) => props.theme.pixelToRem(335)};
    height: ${(props) => props.theme.pixelToRem(48)};
    display: block;
    position: relative;
    border-radius: ${(props) => props.theme.pixelToRem(26)};
    background-color: #5185a6;
    cursor: pointer;
    margin: 30px;
  }

  .toggleSwitch .toggleButton {
    width: ${(props) => props.theme.pixelToRem(150)};
    height: ${(props) => props.theme.pixelToRem(38)};
    position: absolute;
    top: 49%;
    left: 1.7%;
    transform: translateY(-50%);
    border-radius: ${(props) => props.theme.pixelToRem(37)};
    background: #ffffff;
    z-index: 1;
  }

  #toggle:checked ~ .toggleSwitch .toggleButton {
    left: calc(100% - 156px);
    background: #fff;
  }

  .toggleSwitch,
  .toggleButton {
    transition: all 0.14s ease-in;
  }

  .offSpan {
    margin-top: 13px;
    margin-left: 70px;
    font-size: ${(props) => props.theme.pixelToRem(16)};
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => (props.onOff == true ? "#ffffff" : "#000000")};
    z-index: 10;
    position: absolute;
    transition: color 0.2s ease-in-out;
  }

  .onSpan {
    margin-top: 13px;
    margin-left: 258px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: ${(props) => (props.onOff == true ? "#000000" : "#ffffff")};
    z-index: 10;
    position: absolute;
    transition: color 0.2s ease-in-out;
  }
`;

const Container = styled.div`
  width: inherit;
  height: 100vh;
  margin-top: -20px;
  padding: 20px;
  overflow-y: scroll !important;
`;

const PlanBox = styled.div`
  width: ${(props) => props.theme.pixelToRem(335)};
  height: ${(props) => props.theme.pixelToRem(150)};
  margin-bottom: 18px;
  border-radius: ${(props) => props.theme.pixelToRem(10)};
  border: solid 1px #eee;
  display: flex;

  img {
    width: ${(props) => props.theme.pixelToRem(118)};
    height: ${(props) => props.theme.pixelToRem(150)};
    border-radius: 10px;
  }

  .infoBox {
    padding: 14px 14px 10px 14px;
    text-align: left;
    flex-direction: column;
    display: flex;
    span {
      :first-child {
        width: ${(props) => props.theme.pixelToRem(106)};
        height: ${(props) => props.theme.pixelToRem(14)};
        ${(props) => props.theme.fontTheme.Caption4};
        color: ${(props) => props.theme.colorTheme.text2};
        line-height: normal;
        letter-spacing: normal;
      }
      :nth-child(2) {
        width: ${(props) => props.theme.pixelToRem(140)};
        height: ${(props) => props.theme.pixelToRem(18)};
        margin-top: 2px;
        ${(props) => props.theme.fontTheme.Caption1};
        line-height: normal;
        letter-spacing: normal;
      }
      :nth-child(3) {
        width: auto;
        height: ${(props) => props.theme.pixelToRem(14)};
        margin-top: 12px;
        ${(props) => props.theme.fontTheme.Caption4};
        color: ${(props) => props.theme.colorTheme.text2};
        line-height: normal;
        letter-spacing: normal;
      }
      :last-child {
        width: ${(props) => props.theme.pixelToRem(106)};
        height: ${(props) => props.theme.pixelToRem(14)};
        margin-top: 2px;
        ${(props) => props.theme.fontTheme.Caption1};
        line-height: normal;
        letter-spacing: normal;
      }
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  position: absolute;
  margin-top: 104px;
  left: 152px;
  button {
    height: ${(props) => props.theme.pixelToRem(36)};
    gap: ${(props) => props.theme.pixelToRem(8)};

    ${(props) => props.theme.fontTheme.Caption1};
    line-height: 1.29;
    letter-spacing: normal;
    border-radius: 8px;
    border: solid 1px #ccc;
    background-color: ${(props) => props.theme.colorTheme.textWhite};
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
    display: flex;
    :first-child {
      width: ${(props) => props.theme.pixelToRem(69)};
    }
    :last-child {
      margin-left: 6px;
      width: ${(props) => props.theme.pixelToRem(114)};
    }
  }
`;

const Wrapper = styled.div`
  /* background-color: red; */
  /* margin-top: 130px; */
  height: 100vh;
  /* margin-bottom: 500px; */
  min-height: 500px;
  overflow-y: scroll;
`;

const NotiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 227px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
`;

const PickText = styled.div`
  margin-top: 10px;
  ${(props) => props.theme.pixelToRem(14)};
  color: #909090;
`;

const PickBtn = styled.button`
  margin-top: 30px;
  width: 227px;
  height: 47px;
  border: solid 1px #222;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
`;
