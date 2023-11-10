import { AppBar, Typography, Toolbar } from "@mui/material";
import { DATETIME_STR } from "../../nonview/constants/VERSION.js";
import { Color } from "../../nonview/base";

export default function HeaderView({ config, pageId, selectedColor }) {
  const onClickTitle = function () {
    window.location.reload();
  };

  const backgroundColor = selectedColor;
  const foregroundColor = Color.getCompliment(selectedColor);

  const title =
    config && pageId !== "config" ? config.name : "#Mapper - v" + DATETIME_STR;
  document.title = title;

  return (
    <AppBar
      component="nav"
      sx={{ background: backgroundColor, color: foregroundColor }}
    >
      <Toolbar>
        <Typography variant="h6" onClick={onClickTitle}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
