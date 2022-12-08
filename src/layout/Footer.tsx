import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isModal } from "../store/searchAtom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router";
import BookmarkIcon from "@mui/icons-material/Bookmark"; //filled
import { blue } from "@mui/material/colors";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        // left: "50%",
        // transform: "translate(-50%,-50%)",
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Pretendard-Regular !important",
      }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
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
    </Box>
  );
}
