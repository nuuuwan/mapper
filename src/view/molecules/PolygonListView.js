import PolygonView from "./PolygonView";

export default function PolygonListView({ polygonList, t, info }) {
  return polygonList.map(function (polygon, i) {
    return (
      <PolygonView key={"polygon-" + i} polygon={polygon} t={t} info={info} />
    );
  });
}
