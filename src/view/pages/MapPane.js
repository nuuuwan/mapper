import React from "react";
import { Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import { ShowHide } from "../atoms";
import { MultiRegionViewSVG, ScreenShot, ColorPicker } from "../molecules";
import { STYLE } from "./HomePageStyle";

export default function MapPane({
  config,
  bbox,
  selectedColor,
  onChangeSelectedColor,
  onClickRegion,
  onClickAutoColor,
}) {
  const screenshotLabel = "map-" + config.hash;

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
        <ShowHide Icon={PaletteIcon} isShow={false}>
          <ColorPicker
            selectedColor={selectedColor}
            onChangeSelectedColor={onChangeSelectedColor}
            onClickAutoColor={onClickAutoColor}
          />
        </ShowHide>
      </div>
    </Box>
  );
}
