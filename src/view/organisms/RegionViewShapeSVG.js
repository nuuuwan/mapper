import { Component } from "react";
import { Ent, Geo, GeoBlock, LngLat } from "../../nonview/base";
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
    return <PolygonListView t={t} info={info} polygonList={polygonList} />;
  }

  static renderBlock(t, blockLngLat, blockDim) {
    const [lng, lat] = blockLngLat.toArray();
    const [x1, y1] = t([lng, lat]);
    const [x2, y2] = t([lng + blockDim, lat + blockDim]);
    const [width, height] = [x2 - x1, y1 - y2];
    return (
      <rect
        x={x1}
        y={y2}
        width={width}
        height={height}
        fill="none"
        stroke="black"
        strokeWidth="1"
      />
    );
  }

  static renderBlocks(t, polygonList) {
    const BLOCK_DIM = 0.15;

    const blockLngLatList = GeoBlock.getBlockLngLatList(
      LngLat.fromPolygonList(polygonList),
      BLOCK_DIM
    );

    return blockLngLatList.map(function (blockLngLat) {
      return RegionViewShapeSVG.renderBlock(t, blockLngLat, BLOCK_DIM);
    });
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
      </g>
    );
  }
}
