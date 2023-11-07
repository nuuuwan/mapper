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
    const xMin = t([bbox.minLngLat.lng, bbox.minLngLat.lat])[0];
    const xMax = t([bbox.maxLngLat.lng, bbox.maxLngLat.lat])[0];
    const fontSize = (xMax - xMin) / 7;
    const MIN_FONT_SIZE = 5;

    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
        <PolygonListView t={t} info={info} polygonList={polygonList} />
        {fontSize > MIN_FONT_SIZE ? (
          <text
            x={x}
            y={y}
            fill={labelFill}
            textAnchor="middle"
            fontSize={fontSize}
          >
            {infoLabel}
          </text>
        ) : null}
      </g>
    );
  }
}
