import React from "react";
import { Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { TwitterPicker } from "react-color";
import { Color } from "../../nonview/base";
import { ShowHide } from "../atoms";
import { MultiRegionViewSVG, ScreenShot } from "../molecules";
import { STYLE } from "./HomePageStyle";

export default function MapPane({
  config,
  bbox,
  selectedColor,
  onChangeSelectedColor,
  onClickRegion,
}) {
  const expandedColors = Color.expand(selectedColor);
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
          <TwitterPicker
            color={selectedColor}
            onChangeComplete={onChangeSelectedColor}
            colors={[].concat(Color.DEFAULT_COLORS, expandedColors)}
            width="320px"
            triangle="hide"
          />
        </ShowHide>
      </div>
    </Box>
  );
}
