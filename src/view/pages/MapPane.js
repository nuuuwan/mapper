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
}) {
  return (
    <Box>
      <MultiRegionView
        bbox={bbox}
        config={config}
        onClickRegion={onClickRegion}
      />

      <div style={STYLE.BODY_CONTROLS}>
        <TwitterPicker
          color={selectedColor}
          onChangeComplete={onChangeSelectedColor}
          colors={Color.DEFAULT_COLORS}
          triangle="hide"
          width="200px"
        />
      </div>
    </Box>
  );
}
