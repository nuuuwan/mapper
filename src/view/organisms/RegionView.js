import { Component } from "react";
import Geo from "../../nonview/base/Geo";
import PolygonListView from "../molecules/PolygonListView";
import Ents from "../../nonview/base/Ents";

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
    if (!polygonList) {
      return null;
    }
    const { t, info } = this.props;
    const [lat, lng] = ent.centroid;
    const [x, y] = t([lng, lat]);

    const labelFill = info.labelFill || "#000";

    return (
      <g>
        <PolygonListView t={t} info={info} polygonList={polygonList} />
        <text x={x} y={y} fill={labelFill} textAnchor="middle">
          {info.label}
        </text>
      </g>
    );
  }
}