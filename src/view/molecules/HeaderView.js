import { AppBar, Typography, Toolbar, Badge } from "@mui/material";
import { DATETIME_STR } from "../../nonview/constants/VERSION.js";

export default function HeaderView({ nRegions }) {
  const onClickTitle = function () {
    window.location.reload();
  };
  return (
    <AppBar component="nav" sx={{ background: "#941E32" }}>
      <Toolbar>
        <Badge badgeContent={nRegions} color="primary">
          <Typography variant="h4h6" onClick={onClickTitle}>
            #Mapper - {DATETIME_STR}
          </Typography>
        </Badge>
      </Toolbar>
    </AppBar>
  );
}
