import React from "react";
import { useRecoilState } from "recoil";
import { isModal } from "../store/searchAtom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  // ${(props) => props.theme.pixelToRem(375)}
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:375px)");
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        width: "100%",
        maxWidth: "475px",
        position: "fixed",
        bottom: 0,
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Pretendard-Regular !important",
      }}
    >
      <BottomNavigationAction
        label="Home"
        onClick={() => {
          navigate("/");
        }}
        icon={<img src="/images/navbar/navhome.svg" />}
      />
      <BottomNavigationAction
        label="검색"
        onClick={() => {
          setIsSearch(true);
        }}
        icon={<img src="/images/navbar/navsearch.svg" />}
      />
      <BottomNavigationAction
        label="찜목록"
        onClick={() => {
          navigate("/mypage/mypick");
        }}
        icon={<img src="/images/navbar/navpick.svg" />}
      />

      <BottomNavigationAction
        onClick={() => {
          navigate("/mypage");
        }}
        label="마이캠핑"
        icon={<img src="/images/navbar/mypage.svg" />}
      />
    </BottomNavigation>
  );
}
