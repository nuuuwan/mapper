export default function PolygonView({ polygon, t, info }) {
  const d =
    polygon
      .map(function (lngLat, i) {
        const [x, y] = t(lngLat);
        return (i === 0 ? "M" : "L") + x + "," + y;
      })
      .join(" ") + " Z";

  let { fill, stroke, strokeWidth } = info;

  return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}
