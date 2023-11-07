import { Box } from "@mui/material";
import { RegionPicker } from "../molecules";

export default function DataPane({ config, allEntList, onChangeRegionIDs }) {
  const regionIDs = config.regionInfoList.map((info) => info.id);
  return (
    <Box sx={{ maxWidth: 320, p: 3 }}>
      <RegionPicker
        allEntList={allEntList}
        regionIDs={regionIDs}
        onChange={onChangeRegionIDs}
      />
    </Box>
  );
}
