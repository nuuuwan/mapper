import { AppBar, Typography, Toolbar, Badge } from "@mui/material";

export default function HeaderView({ nRegions }) {
  const onClickTitle = function () {
    window.location.reload();
  };
  return (
    <AppBar component="nav" sx={{ background: "#941E32" }}>
      <Toolbar>
        <Badge badgeContent={nRegions} color="primary">
          <Typography variant="h4h6" onClick={onClickTitle}>
            #Mapper
          </Typography>
        </Badge>
      </Toolbar>
    </AppBar>
  );
}
