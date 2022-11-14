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
        {/* 각 각 link연결 아직 안되어있음 home동작은잘되네 확인. */}
        <BottomNavigationAction
          label="Home"
          onClick={() => {
            navigate("/");
          }}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction label="TBD" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="TBD" icon={<FavoriteIcon />} />
        <BottomNavigationAction
          label="마이페이지"
          icon={<PermIdentityIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
