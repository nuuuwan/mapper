import { Box, Typography } from "@mui/material";

export default function ConfigTableView({ config }) {
  return (
    <Box>
      <Typography variant="body1">{config.toString()}</Typography>
    </Box>
  );
}
