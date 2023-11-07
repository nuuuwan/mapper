import { IconButton, Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { BlockPicker } from "react-color";

import Color from "../../nonview/base/Color";
import RegionPicker from "./RegionPicker";

export default function OptionsView({
  selectedColor,
  config,
  allEntList,
  onCloseDrawerOptions,
  onChangeSelectedColor,
  onChangeRegionIDs,
}) {
  const regionIDs = config.regionInfoList.map((info) => info.id);
  return (
    <Box sx={{ maxWidth: 320, p: 3 }}>
      <Grid container justify="flex-end">
        <IconButton onClick={onCloseDrawerOptions}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div style={{ height: 240, margin: 12 }}>
        <BlockPicker
          color={selectedColor}
          onChangeComplete={onChangeSelectedColor}
          colors={Color.DEFAULT_COLORS}
          triangle="hide"
        />
      </div>
      <RegionPicker
        allEntList={allEntList}
        regionIDs={regionIDs}
        onChange={onChangeRegionIDs}
      />
    </Box>
  );
}
