import {Color} from "../../nonview/base";

export default function ColorView({color}) {
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
          {color}
      </span>
    );
  }