import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isModal } from "../store/searchAtom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate } from "react-router";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const [isSearch, setIsSearch] = useRecoilState(isModal);
  const navigate = useNavigate();

  const [isHome, setIsHome] = useState(false);
  const [isIcon, setIsIcon] = useState(false);
  const [isPick, setIsPick] = useState(false);
  const [isMypf, setIsMypf] = useState(false);

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
          setIsHome(true);
          setIsIcon(false);
          setIsPick(false);
          setIsMypf(false);
        }}
        icon={
          isHome ? (
            <img src="/images/navbar/navhome.svg" />
          ) : (
            <img src="/images/navbar/emptyhome.svg" />
          )
        }
      />
      <BottomNavigationAction
        label="검색"
        onClick={() => {
          setIsSearch(true);
          setIsHome(false);
          setIsIcon(true);
          setIsPick(false);
          setIsMypf(false);
        }}
        icon={
          isIcon ? (
            <img src="/images/navbar/navsearch.svg" />
          ) : (
            <img src="/images/navbar/emptysearch.svg" />
          )
        }
      />
      <BottomNavigationAction
        label="찜목록"
        onClick={() => {
          navigate("/mypage/mypick");
          setIsHome(false);
          setIsIcon(false);
          setIsPick(true);
          setIsMypf(false);
        }}
        icon={
          isPick ? (
            <img src="/images/navbar/navpick.svg" />
          ) : (
            <img src="/images/navbar/emptybookmark.svg" />
          )
        }
      />

      <BottomNavigationAction
        onClick={() => {
          navigate("/mypage/mypick");
          setIsHome(false);
          setIsIcon(false);
          setIsPick(false);
          setIsMypf(true);
        }}
        label="마이캠핑"
        icon={
          isMypf ? (
            <img src="/images/navbar/mypage.svg" />
          ) : (
            <img src="/images/navbar/emptypf.svg" />
          )
        }
      />
    </BottomNavigation>
  );
}
