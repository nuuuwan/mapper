import { Box } from "@mui/material";
import {
  RegionPicker,
  MultiRegionPicker,
  ConfigTableView,
  DataUpDownloader,
} from "../molecules";
import { STYLE } from "./HomePageStyle";

export default function DataPane({
  config,
  allEntIdx,
  onAddRegions,
  onChangeConfig,
}) {
  const regionIDs = config.regionInfoList.map((info) => info.id);
  return (
    <div style={STYLE.BODY_CONTENT_SCROLLABLE}>
      <Box sx={{ maxWidth: 640, margin: "auto", align: "center", padding: 2 }}>
        <RegionPicker
          allEntIdx={allEntIdx}
          regionIDs={regionIDs}
          onAddRegions={onAddRegions}
        />
        <MultiRegionPicker regionIDs={regionIDs} onAddRegions={onAddRegions} />
        <ConfigTableView config={config} />
        <DataUpDownloader
          data={config.toData()}
          setData={onChangeConfig}
          fileName={config.fileName}
        />
      </Box>
    </div>
  );
}
