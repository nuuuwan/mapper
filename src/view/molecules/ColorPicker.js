import { Box, IconButton } from "@mui/material";
import { TwitterPicker } from "react-color";
import { Color } from "../../nonview/base";

export default function ColorPicker({ selectedColor, onChangeSelectedColor }) {
  const expandedColors = Color.expand(selectedColor);

  return (
    <Box>
      <TwitterPicker
        color={selectedColor}
        onChangeComplete={onChangeSelectedColor}
        colors={[].concat(Color.DEFAULT_COLORS, expandedColors)}
        width="320px"
        triangle="hide"
      />
    </Box>
  );
}
