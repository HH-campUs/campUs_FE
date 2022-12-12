import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Sunset() {
  const navigation = useNavigate();
  const onClick = () => {
    navigation(`/topic/2`);
  };

  return (
    <Wrapper>
      <BackImg>
        <TextBox>
          <TextTitle>일몰명소</TextTitle>
          <MidTextBox>
            <MidText>일몰 명소 캠핑장 추천</MidText>
            <NextPage onClick={onClick}>
              <span>애견동반</span>
              <KeyboardArrowRight sx={{ color: "white", cursor: "pointer" }} />
            </NextPage>
          </MidTextBox>
        </TextBox>
        <img src="/images/subject/image6.jpg" alt="1" />
      </BackImg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => props.theme.pixelToRem(266)};
  background-size: cover;
`;

const BackImg = styled.div`
  position: relative;
  img {
    width: 100%;
    /* width: ${(props) => props.theme.pixelToRem(375)}; */
    height: ${(props) => props.theme.pixelToRem(266)};
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: ${(props) => props.theme.pixelToRem(12)};
    border-bottom-right-radius: ${(props) => props.theme.pixelToRem(12)};
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  width: 90%;
  position: absolute;
  z-index: 5;
  margin-top: 50px;
`;

const TextTitle = styled.div`
  color: #efefef;
  font-size: ${(props) => props.theme.pixelToRem(32)};
  font-weight: 500;
  margin-top: 28px;
  margin-left: 18px;
  /* margin: 28px 155px 0 30px; */
`;

const MidTextBox = styled.div`
  /* background-color: red; */
  width: 100%;
  display: flex;
  margin-left: 24px;
  margin-top: 28px;
  line-height: 1.5;
  letter-spacing: normal;
  justify-content: space-between;
  align-items: center;
`;
const MidText = styled.div`
  font-size: ${(props) => props.theme.pixelToRem(16)};
  color: #f5f5f5;
`;

const NextPage = styled.div`
  cursor: pointer;
  color: #fff;
  font-size: ${(props) => props.theme.pixelToRem(12)};
  align-items: center;
  display: flex;
`;
