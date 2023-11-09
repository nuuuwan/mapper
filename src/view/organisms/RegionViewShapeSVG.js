import { Component } from "react";
import { Ent, Geo, GeoBlock, Color } from "../../nonview/base";
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

  static renderBBox(t, bbox, fill) {
    const [lngMin, latMin, lngMax, latMax] = bbox.toArray();
    const [x1, y1] = t([lngMin, latMin]);
    const [x2, y2] = t([lngMax, latMax]);

    const [width, height] = [x2 - x1, y1 - y2];
    return (
      <g>
        <rect
          x={x1}
          y={y2}
          width={width}
          height={height}
          fill={fill}
          stroke="#0001"
          strokeWidth="1"
        />
      </g>
    );
  }

  static renderBBoxes = function (t, largestRectBBox, blockBBoxList) {
    const [lngMin, latMin, lngMax, latMax] = largestRectBBox.toArray();
    const [x1, y1] = t([lngMin, latMin]);
    const [x2, y2] = t([lngMax, latMax]);
    const [xMid, yMid] = [(x1 + x2) / 2, (y1 + y2) / 2];

    return (
      <g>
        {blockBBoxList.map(function (bbox, i) {
          return (
            <g key={"bbox-" + i}>
              {RegionViewShapeSVG.renderBBox(t, bbox, "#08f1")}
            </g>
          );
        })}
        {RegionViewShapeSVG.renderBBox(t, largestRectBBox, "#f001")}
        <line
          x1={xMid}
          y1={y1}
          x2={xMid}
          y2={y2}
          stroke="#f002"
          strokeWidth="5"
          strokeDasharray={"10, 10"}
        />
        <line
          x1={x1}
          y1={yMid}
          x2={x2}
          y2={yMid}
          stroke="#f002"
          strokeWidth="5"
          strokeDasharray={"10, 10"}
        />
      </g>
    );
  };

  static renderLabel(t, bbox, ent, info) {
    const [lngMin, latMin, lngMax, latMax] = bbox.toArray();
    const [x1, y1] = t([lngMin, latMin]);
    const [x2, y2] = t([lngMax, latMax]);
    const [xMid, yMid] = [(x1 + x2) / 2, (y1 + y2) / 2];
    const [width, height] = [x2 - x1, y1 - y2];

    const HORIZONTAL_BIAS = 1.1;
    const isVertical = height > width * HORIZONTAL_BIAS;
    const angle = isVertical ? -90 : 0;

    const label = ent.name;
    const fontDim = isVertical ? height : width;
    const fontSize = (fontDim * 1.3) / label.length;
    const fill =
      info.labelFill || (info.fill ? Color.getCompliment(info.fill) : "#000");

    return (
      <text
        x={xMid}
        y={yMid}
        fill={fill}
        stroke="none"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        lengthAdjust="spacingAndGlyphs"
        transform={`translate(${xMid}, ${yMid}) rotate(${angle}) translate(-${xMid}, -${yMid})`}
      >
        {label}{" "}
      </text>
    );
  }

  render() {
    const { polygonList, ent } = this.state;
    if (!polygonList || !ent) {
      return null;
    }
    const {
      t,
      info,
      onClickRegion,
      regionId,
      showPolygonList,
      showLabel,
      showBBox,
    } = this.props;
    const onClick = function () {
      onClickRegion(regionId);
    };

    const geoBlock = new GeoBlock(polygonList);
    const largestRectBBox = geoBlock.getLargestRectBBox();
    const blockBBoxList = geoBlock.getBlockBBoxList();

    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
        {showPolygonList
          ? RegionViewShapeSVG.renderPolygonList(t, info, polygonList)
          : null}
        {showBBox
          ? RegionViewShapeSVG.renderBBoxes(t, largestRectBBox, blockBBoxList)
          : null}
        {showLabel
          ? RegionViewShapeSVG.renderLabel(t, largestRectBBox, ent, info)
          : null}
      </g>
    );
  }
}
