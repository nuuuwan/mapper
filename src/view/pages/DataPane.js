import { Box } from "@mui/material";
import { RegionPicker, ConfigTableView, DataUpDownloader } from "../molecules";
import { STYLE } from "./HomePageStyle";

import { RegionGroupPicker } from "../organisms";

export default function DataPane({
  config,
  allEntIdx,
  onAddRegions,
  onRemoveRegions,
  onChangeConfig,
}) {
  const regionIds = config.regionInfoList.map((info) => info.id);
  const keyRegions = "suggested-region-picker-" + regionIds.join("-");
  return (
    <div style={STYLE.BODY_CONTENT_SCROLLABLE}>
      <Box sx={{ maxWidth: 640, margin: "auto", align: "center", padding: 2 }}>
        <RegionPicker
          allEntIdx={allEntIdx}
          regionIds={regionIds}
          onAddRegions={onAddRegions}
        />
        <RegionGroupPicker
          key={keyRegions}
          regionIds={regionIds}
          onAddRegions={onAddRegions}
          onRemoveRegions={onRemoveRegions}
        />

        <ConfigTableView
          allEntIdx={allEntIdx}
          config={config}
          onRemoveRegions={onRemoveRegions}
        />
        <DataUpDownloader
          data={config.toData()}
          setData={onChangeConfig}
          fileName={config.fileName}
        />
      </Box>
    </div>
  );
}
