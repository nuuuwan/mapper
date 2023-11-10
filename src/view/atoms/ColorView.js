import { Color } from "../../nonview/base";

export default function ColorView({ color, label }) {
  const backgroundColor = color;
  const foregroundColor = Color.getCompliment(color);
  return (
    <span
      style={{
        background: backgroundColor,
        color: foregroundColor,
        padding: 3,
        borderRadius: 3,
        fontFamily: "monospace",
      }}
    >
      {label || color}
    </span>
  );
}
