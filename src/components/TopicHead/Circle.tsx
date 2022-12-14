import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Circle() {
  const topicArray = ["1", "2", "3", "4"];
  const navigate = useNavigate();
  const { topicId } = useParams();

  const Gotopic = (item: string) => () => {
    navigate(`/topic/${item}`);
  };

  return (
    <CircleMap>
      <>
        {topicArray.map((item, i) => (
          <CircleNav key={i}>
            {topicId === item ? (
              <Contrast />
            ) : (
              <Empty onClick={Gotopic(item)} />
            )}
          </CircleNav>
        ))}
      </>
    </CircleMap>
  );
}

const CircleMap = styled.div`
  max-width: ${(props) => props.theme.pixelToRem(475)};
  height: 10px;
  display: flex;
  z-index: 1;
  gap: 5px;
  position: absolute;
  right: 7%;
  margin-top: -40px;
`;

const CircleNav = styled.div`
  cursor: pointer;
`;

const Contrast = styled.div`
  background-color: #ffffff;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  display: flex;
`;

const Empty = styled.div`
  background-color: beige;
  width: 8px;
  height: 8px;
  opacity: 0.3;
  border-radius: 8px;
  display: flex;
`;
