import { Component } from "react";
import Geo from "../../nonview/base/Geo";
import PolygonListView from "../molecules/PolygonListView";

export default class RegionView extends Component {
  constructor(props) {
    super(props);
    this.state = { polygonList: null };
  }

  async componentDidMount() {
    const { regionID } = this.props;
    const polygonList = await Geo.getPolygonList(regionID);
    this.setState({ polygonList });
  }

  renderRegion(regionID) {
    return regionID;
  }

  render() {
    const { polygonList } = this.state;
    if (!polygonList) {
      return null;
    }
    const { t, info } = this.props;
    return <PolygonListView t={t} info={info} polygonList={polygonList} />;
  }
}
