import { Box } from "@mui/material";
import { TwitterPicker } from "react-color";
import { Color } from "../../nonview/base";
import { MultiRegionView } from "../molecules";
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
  return (
    <Box>
      <MultiRegionView
        bbox={bbox}
        config={config}
        onClickRegion={onClickRegion}
      />

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
