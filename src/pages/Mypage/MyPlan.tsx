import { useNavigate } from "react-router-dom";
import { getCamperToken } from "../../instance/cookies";
import styled from "styled-components";

export default function MyPlan() {
  const isLogin = getCamperToken();
  const navigate = useNavigate();

  return (
    <Wrapper>
      {isLogin ? (
        <div>로그인햇당</div>
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
  );
}

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
