import PolygonView from "./PolygonView";

export default function PolygonListView({ polygonList, t, info }) {
  return polygonList.map(function (polygon, i) {
    const infoInner = {
      fill: info.fill || "#ccc",
      fillOpacity: info.fillOpacity || 1,
      stroke: info.stroke || "#fff",
      strokeWidth: info.strokeWidth || 0,
    };

    return (
      <PolygonView
        key={"polygon-" + i}
        polygon={polygon}
        t={t}
        info={infoInner}
      />
    );
  });
}
