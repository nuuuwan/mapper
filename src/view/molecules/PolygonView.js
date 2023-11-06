export default function PolygonView({ polygon, t, info }) {
  const d =
    polygon
      .map(function (lngLat, i) {
        const [x, y] = t(lngLat);
        return (i === 0 ? "M" : "L") + x + "," + y;
      })
      .join(" ") + " Z";

  let { fill, stroke, strokeWidth } = info;
  fill = fill || "#0001";
  stroke = stroke || "#000";
  strokeWidth = strokeWidth || 0;

  return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}
