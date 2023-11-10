function ColorLegendRowSVG({ i, value, color }) {
  const ROW_HEIGHT = 32;
  const cx = 950;
  const cy = 20 + i * ROW_HEIGHT;
  const r = ROW_HEIGHT / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <text
        x={cx - r * 1.5}
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

export default function ColorLegendSVG({ config }) {
  return (
    <g>
      {Object.entries(config.valueToColor).map(function ([value, color], i) {
        return (
          <ColorLegendRowSVG
            key={"color-legend-row-" + i}
            i={i}
            value={value}
            color={color}
          />
        );
      })}
    </g>
  );
}
