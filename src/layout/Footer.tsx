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

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const [isSearch, setIsSearch] = useRecoilState(isModal);

  const navigate = useNavigate();
  return (
    <Box sx={{ width: 475, position: "fixed", bottom: 0 }}>
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
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="검색"
          onClick={() => {
            setIsSearch(true);
          }}
          icon={<SearchIcon />}
        />

        <BottomNavigationAction
          onClick={() => {
            navigate("/mypage");
          }}
          label="마이페이지"
          icon={<PermIdentityIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
