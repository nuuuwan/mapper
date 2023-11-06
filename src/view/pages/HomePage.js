import { Component } from "react";
import { Box, CircularProgress } from "@mui/material";
import RegionView from "../organisms/RegionView";
import BBox from "../../nonview/base/BBox";
import LngLat from "../../nonview/base/LngLat";

import Config from "../../nonview/core/Config";
import Geo from "../../nonview/base/Geo";

import { BlockPicker } from "react-color";
import Color from "../../nonview/base/Color";
const [SVG_WIDTH, SVG_HEIGHT] = [640, 640];

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const config = Config.DEFAULT;

    this.state = {
      config,
      configStr: config.toString(),
      bbox: null,
      selectedColor: "#ff000088",
    };
  }

  async componentDidMount() {
    const bbox = await HomePage.getBBox(this.state.config);
    this.setState({ bbox });
  }

  static async getBBox(config) {
    const regionIDList = config.regionInfoList.map(
      (regionInfo) => regionInfo.id
    );
    const regionIDToPolygonList = await Geo.getIDToPolygonList(regionIDList);
    const lngLatList = LngLat.fromPolygonListList(
      Object.values(regionIDToPolygonList)
    );
    return BBox.fromLngLatList(lngLatList);
  }

  async onChangeConfig(configStr) {
    let { config, bbox } = this.state;
    config = Config.fromString(configStr);
    bbox = await HomePage.getBBox(config);
    this.setState({ config, bbox, configStr });
  }

  onChangeSelectedColor(colorInfo) {
    this.setState({ selectedColor: colorInfo.hex });
  }

  onClickRegion(regionID) {
    const { selectedColor, config } = this.state;
    config.update(regionID, { fill: selectedColor });
    this.setState({ config, configStr: config.toString() });
  }

  renderRegions() {
    const { bbox } = this.state;
    if (!bbox) {
      return <CircularProgress />;
    }
    const t = bbox.getTransform(SVG_WIDTH, SVG_HEIGHT, 0);

    const { config } = this.state;
    const inner = config.regionInfoList.map(
      function (info) {
        const regionID = info.id;
        const key = "region-" + regionID;
        const onClickInner = function () {
          this.onClickRegion(regionID);
        }.bind(this);
        return (
          <RegionView
            key={key}
            regionID={regionID}
            info={info}
            t={t}
            onClick={onClickInner}
          />
        );
      }.bind(this)
    );
    return (
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x={0} y={0} width={SVG_WIDTH} height={SVG_HEIGHT} fill="#ccc1" />
        {inner}
      </svg>
    );
  }

  render() {
    const { selectedColor } = this.state;
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {this.renderRegions()}
        <Box>
          <div style={{ height: 200 }}>
            <BlockPicker
              color={selectedColor}
              onChangeComplete={this.onChangeSelectedColor.bind(this)}
              colors={Color.DEFAULT_COLORS}
            />
          </div>
        </Box>
      </Box>
    );
  }
}
