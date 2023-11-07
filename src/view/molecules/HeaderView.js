import { AppBar, Typography, Toolbar } from "@mui/material";

export default function HeaderView() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h4h6">#Mapper</Typography>
      </Toolbar>
    </AppBar>
  );
}
