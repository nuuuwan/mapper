import { Paper, Button } from "@mui/material";
import { TwitterPicker } from "react-color";
import PaletteIcon from "@mui/icons-material/Palette";
import { ShowHide } from "../atoms";
import { Color } from "../../nonview/base";

export default function ColorPicker({
  selectedColor,
  onChangeSelectedColor,
  onClickAutoColor,
}) {
  const expandedColors = Color.expand(selectedColor);

  return (
    <ShowHide Icon={PaletteIcon} isShow={false}>
      <Paper>
        <TwitterPicker
          color={selectedColor}
          onChangeComplete={onChangeSelectedColor}
          colors={[].concat(Color.DEFAULT_COLORS, expandedColors)}
          width="320px"
          triangle="hide"
        />
        <Button onClick={onClickAutoColor}>Auto Color</Button>
      </Paper>
    </ShowHide>
  );
}
