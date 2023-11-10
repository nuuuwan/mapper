function ColorLegendRowSVG({ i, value, color, x: x0, y:y0 }) {
  const ROW_HEIGHT = 32;
  const cx = x0;
  const cy = y0 + i * ROW_HEIGHT;
  const r = ROW_HEIGHT / 2;
  return (
    <g>
      <circle cx={cx-r} cy={cy} r={r} fill={color} />
      <text
        x={cx - r * 2.5}
        y={cy}
        fontSize="24"
        dominantBaseline="middle"
        textAnchor="end"
      >
        {value}
      </text>
    </g>
  );
}

export default function ColorLegendSVG({ config,x,y }) {
  return (
    <g>
      {Object.entries(config.valueToColor).map(function ([value, color], i) {
        return (
          <ColorLegendRowSVG
            key={"color-legend-row-" + i}
            i={i}
            value={value}
            color={color}
            x={x}
            y={y}
          />
        );
      })}
    </g>
  );
}
