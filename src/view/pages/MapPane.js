import React from "react";
import { Box, Stack } from "@mui/material";

import {
  MultiRegionViewSVG,
  ScreenShot,
  ColorPicker,
  TimePicker,
  RegionEntTypePicker,
} from "../molecules";
import { STYLE } from "./HomePageStyle";

export default function MapPane({
  tableName,
  config,
  bbox,
  selectedColor,
  onChangeSelectedColor,
  onClickRegion,
  onClickAutoColor,
  onChangeTableName,
}) {
  const screenshotLabel = "map-" + config.fileLabel;

  return (
    <Box>
      <div style={STYLE.BODY_CONTENT}>
        <ScreenShot label={screenshotLabel}>
          <MultiRegionViewSVG
            bbox={bbox}
            config={config}
            onClickRegion={onClickRegion}
          />
        </ScreenShot>
      </div>
      <div style={Object.assign({}, STYLE.BODY_CONTROLS, { right: 32 })}>
        <Stack direction="row" spacing={0}>
          <RegionEntTypePicker />
          <TimePicker
            tableName={tableName}
            onChangeTableName={onChangeTableName}
          />
          <ColorPicker
            selectedColor={selectedColor}
            onChangeSelectedColor={onChangeSelectedColor}
            onClickAutoColor={onClickAutoColor}
          />
        </Stack>
      </div>
    </Box>
  );
}
