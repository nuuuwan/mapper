import { Box } from "@mui/material";
import { RegionPicker, MultiRegionPicker } from "../molecules";

export default function DataPane({ config, allEntList, onChangeRegionIDs }) {
  const regionIDs = config.regionInfoList.map((info) => info.id);
  return (
    <Box sx={{ maxWidth: 640, margin: "auto", align: "center", padding: 2 }}>
      <RegionPicker
        allEntList={allEntList}
        regionIDs={regionIDs}
        onChange={onChangeRegionIDs}
      />
      <MultiRegionPicker
        allEntList={allEntList}
        regionIDs={regionIDs}
        onChange={onChangeRegionIDs}
      />
    </Box>
  );
}
