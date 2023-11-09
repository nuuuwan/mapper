import { Component } from "react";
import { Ent, Geo, BBox, LngLat } from "../../nonview/base";
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

  static renderPolygonList(t, info, polygonList) {
    return ( <PolygonListView t={t} info={info} polygonList={polygonList} />)
  }

  static renderPolygonBBox(t, polygonList) {
    const bbox = BBox.fromPolygonList(polygonList);

    const [xMin, yMin] = t([bbox.minLngLat.lng, bbox.minLngLat.lat]);
    const [xMax, yMax] =  t([bbox.maxLngLat.lng, bbox.maxLngLat.lat]);
    const [width, height] = [xMax - xMin, yMin - yMax];
    return (
      <rect x={xMin} y={yMax} width={width} height={height} fill="none" stroke="#0002" strokeWidth={1} />
    )
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
        {RegionViewShapeSVG.renderPolygonList(t, info, polygonList)}
        {RegionViewShapeSVG.renderPolygonBBox(t, polygonList)}
      </g>
    );
  }
}
