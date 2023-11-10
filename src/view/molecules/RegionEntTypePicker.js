import { Paper } from "@mui/material";

import { ShowHide } from "../atoms";
import MapIcon from "@mui/icons-material/Map";

export default function RegionEntTypePicker() {
  return (
    <ShowHide Icon={MapIcon} isShow={false}>
      <Paper></Paper>
    </ShowHide>
  );
}
