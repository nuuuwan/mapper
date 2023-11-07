import { AppBar, Typography, Toolbar } from "@mui/material";

export default function HeaderView() {
  const onClickTitle = function () {
    window.location.reload();
  };
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h4h6" onClick={onClickTitle}>
          #Mapper
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
