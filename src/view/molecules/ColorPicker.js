import { Paper, Button } from "@mui/material";
import { TwitterPicker } from "react-color";
import { Color } from "../../nonview/base";

export default function ColorPicker({
  selectedColor,
  onChangeSelectedColor,
  onClickAutoColor,
}) {
  const expandedColors = Color.expand(selectedColor);

  return (
    <Paper sx={{ p: 1, m: 1 }} elevation={1}>
      <TwitterPicker
        color={selectedColor}
        onChangeComplete={onChangeSelectedColor}
        colors={[].concat(Color.DEFAULT_COLORS, expandedColors)}
        width="320px"
        triangle="hide"
      />
      <Button onClick={onClickAutoColor}>Auto Color</Button>
    </Paper>
  );
}
