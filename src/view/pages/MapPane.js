import { Box } from "@mui/material";
import { TwitterPicker } from "react-color";
import { Color } from "../../nonview/base";
import { MultiRegionView, ScreenShot } from "../molecules";
import { STYLE } from "./HomePageStyle";

export default function MapPane({
  config,
  bbox,
  selectedColor,
  onChangeSelectedColor,
  onClickRegion,
  isColorPickerOpen,
}) {
  const expandedColors = Color.expand(selectedColor);
  const screenshotLabel = "map-" + config.hash;
  return (
    <Box>
      <div style={STYLE.BODY_CONTENT}>
        <ScreenShot label={screenshotLabel}>
          <MultiRegionView
            bbox={bbox}
            config={config}
            onClickRegion={onClickRegion}
          />
        </ScreenShot>
      </div>

      {isColorPickerOpen ? (
        <div style={STYLE.BODY_CONTROLS}>
          <TwitterPicker
            color={selectedColor}
            onChangeComplete={onChangeSelectedColor}
            colors={[].concat(Color.DEFAULT_COLORS, expandedColors)}
            width="320px"
          />
        </div>
      ) : null}
    </Box>
  );
}
