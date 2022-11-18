import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 475, position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          onClick={() => {
            navigate("/");
          }}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction label="TBD" icon={<FavoriteIcon />} />

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
