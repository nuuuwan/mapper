import { Component } from "react";
import { Ents, Geo, LngLat, BBox } from "../../nonview/base";
import PolygonListView from "../molecules/PolygonListView";

export default class RegionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polygonList: null,
      ent: null,
    };
  }

  async componentDidMount() {
    const { regionID } = this.props;
    const ent = await Ents.getEnt(regionID);
    const polygonList = await Geo.getPolygonList(regionID);
    this.setState({ polygonList, ent });
  }

  renderRegion(regionID) {
    return regionID;
  }

  render() {
    const { polygonList, ent } = this.state;
    if (!polygonList || !ent) {
      return null;
    }
    const { t, info, onClick } = this.props;
    const [lat, lng] = ent.centroid;
    const [x, y] = t([lng, lat]);

    const labelFill = info.labelFill || "#000";
    const infoLabel = info.label !== undefined ? info.label : ent.name;

    const bbox = BBox.fromLngLatList(LngLat.fromPolygonList(polygonList));
    const [xMin, yMin] = t([bbox.minLngLat.lng, bbox.minLngLat.lat]);
    const [xMax, yMax] = t([bbox.maxLngLat.lng, bbox.maxLngLat.lat]);
    const [xSpan, ySpan] = [xMax - xMin, yMin - yMax];

    const angle = xSpan > ySpan ? 0 : -90;
    const fontSize = Math.sqrt(xSpan * xSpan + ySpan * ySpan) / 12;

    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
        <PolygonListView t={t} info={info} polygonList={polygonList} />
        <text
          x={x}
          y={y}
          fill={labelFill}
          textAnchor="middle"
          fontSize={fontSize}
          transform={`translate(${x}, ${y}) rotate(${angle}) translate(-${x}, -${y})`}
        >
          {infoLabel}
        </text>
      </g>
    );
  }
}
