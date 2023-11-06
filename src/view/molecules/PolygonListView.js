import PolygonView from "./PolygonView";
import Color from "../../nonview/base/Color.js";
export default function PolygonListView({ polygonList, t, info }) {
  return polygonList.map(function (polygon, i) {
    info.fill = info.fill || Color.getRandomHSLA();
    info.stroke = info.stroke || "#fff";
    info.strokeWidth = info.strokeWidth || 0;

    return (
      <PolygonView key={"polygon-" + i} polygon={polygon} t={t} info={info} />
    );
  });
}
