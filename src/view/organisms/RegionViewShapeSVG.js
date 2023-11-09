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
    const { regionId } = this.props;
    const ent = await Ent.fromId(regionId);
    const polygonList = await Geo.getPolygonList(regionId);
    this.setState({ polygonList, ent });
  }


  render() {
    const { polygonList, ent } = this.state;
    if (!polygonList || !ent) {
      return null;
    }
    const { t, info, onClickRegion, regionId } = this.props;
    const onClick = function () {
      onClickRegion(regionId);
    };
    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
        <PolygonListView t={t} info={info} polygonList={polygonList} />
      </g>
    );
  }
}
