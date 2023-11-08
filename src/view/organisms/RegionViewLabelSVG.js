import { Component } from "react";
import { Ent, Geo, LngLat, BBox, Color } from "../../nonview/base";

export default class RegionViewLabelSVG extends Component {
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
    const [lat, lng] = ent.centroid;
    const [x, y] = t([lng, lat]);

    const labelFill = info.labelFill || Color.getCompliment(info.fill);

    const infoLabel = info.label !== undefined ? info.label : ent.name;

    const bbox = BBox.fromLngLatList(LngLat.fromPolygonList(polygonList));
    const [xMin, yMin] = t([bbox.minLngLat.lng, bbox.minLngLat.lat]);
    const [xMax, yMax] = t([bbox.maxLngLat.lng, bbox.maxLngLat.lat]);
    const [xSpan, ySpan] = [xMax - xMin, yMin - yMax];
    const X_SPAN_BIAS = 1.2;
    const isVertical = ySpan > xSpan * X_SPAN_BIAS;
    const angle = isVertical ? -90 : 0;
    const fontSize = (isVertical ? ySpan : xSpan) / 10;

    const onClick = function () {
      onClickRegion(regionID);
    };

    return (
      <g onClick={onClick} style={{ cursor: "pointer" }}>
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
