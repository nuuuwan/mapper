import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import RegionPicker from "./RegionPicker";

export default function OptionsView({
  config,
  allEntList,
  onCloseDrawerOptions,
  onChangeRegionIDs,
}) {
  const regionIDs = config.regionInfoList.map((info) => info.id);
  return (
    <Box sx={{ maxWidth: 320, p: 3 }}>

      <RegionPicker
        allEntList={allEntList}
        regionIDs={regionIDs}
        onChange={onChangeRegionIDs}
      />
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <IconButton onClick={onCloseDrawerOptions}>
          <CloseIcon />
        </IconButton>
      </Box>{" "}
    </Box>
  );
}
