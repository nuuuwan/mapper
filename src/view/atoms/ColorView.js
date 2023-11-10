import { Color } from "../../nonview/base";

export default function ColorView({ color, label }) {
  const backgroundColor = color;
  const foregroundColor = Color.getCompliment(color);
  const isLabelMode = label !== undefined;
  const labelFinal = isLabelMode ? label : "";
  const padding = 4;
  const height = isLabelMode ? "auto": padding ;
  return (
    <span
      style={{
        background: backgroundColor,
        color: foregroundColor,

        padding:padding,
        borderRadius:padding,

        display:"inline-block",
        height: height,
        fontSize: 9,

      }}
    >
      {labelFinal}
    </span>
  );
}
