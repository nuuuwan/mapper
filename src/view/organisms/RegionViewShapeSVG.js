import { Component } from "react";
import { Ent, Geo } from "../../nonview/base";
import PolygonListView from "../molecules/PolygonListView";

export default class RegionViewShapeSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polygonList: null,
      ent: null,
    };
  }

  async componentDidMount() {
    const { regionID } = this.props;
    const ent = await Ent.fromId(regionID);
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
    const { t, info, onClickRegion, regionID } = this.props;
    const onClick = function () {
      onClickRegion(regionID);
    };
    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
        <PolygonListView t={t} info={info} polygonList={polygonList} />
      </g>
    );
  }
}
