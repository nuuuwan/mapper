import { Box } from "@mui/material";
import {
  RegionPicker,
  MultiRegionPicker,
  ConfigTableView,
  DataUpDownloader,
} from "../molecules";

export default function DataPane({
  config,
  allEntList,
  onChangeRegionIDs,
  onChangeConfig,
}) {
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
      <ConfigTableView config={config} />
      <DataUpDownloader data={config.toData()} setData={onChangeConfig} />
    </Box>
  );
}
