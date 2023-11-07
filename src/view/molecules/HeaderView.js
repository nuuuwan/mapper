import { AppBar, Typography, Toolbar, Badge } from "@mui/material";
import { DATETIME_STR } from "../../nonview/constants/VERSION.js";

export default function HeaderView({ nRegions, selectedColor }) {
  const onClickTitle = function () {
    window.location.reload();
  };
  return (
    <AppBar component="nav" sx={{ background: selectedColor }}>
      <Toolbar>
        <Badge badgeContent={nRegions} color="primary">
          <Typography variant="h6" onClick={onClickTitle}>
            #Mapper
          </Typography>
        </Badge>
        <Typography variant="caption" onClick={onClickTitle} sx={{ marginLeft: 1 }}>
          {DATETIME_STR}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
