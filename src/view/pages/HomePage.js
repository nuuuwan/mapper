import { Component } from "react";
import { Box, CircularProgress, Drawer, IconButton } from "@mui/material";
import RegionView from "../organisms/RegionView";
import BBox from "../../nonview/base/BBox";
import LngLat from "../../nonview/base/LngLat";
import Ents from "../../nonview/base/Ents";

import Config from "../../nonview/core/Config";
import Geo from "../../nonview/base/Geo";

import { BlockPicker } from "react-color";
import RegionPicker from "../molecules/RegionPicker";
import Color from "../../nonview/base/Color";

import TuneIcon from "@mui/icons-material/Tune";

const [SVG_WIDTH, SVG_HEIGHT, SVG_PADDING] = [640, 640, 20];
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const config = Config.DEFAULT;

    this.state = {
      config,
      configStr: config.toString(),
      bbox: null,
      selectedColor: "#ff000088",
      isDrawerOptionsOpen: false,
    };
  }

  async componentDidMount() {
    const bbox = await HomePage.getBBox(this.state.config);
    const allEntIndex = await Ents.getAllEntIndex();
    let allEntList = [];
    for (const entType of ["province", "district", "dsd", "pd", "ed"]) {
      for (const ent of Object.values(allEntIndex[entType])) {
        allEntList.push(ent);
      }
    }

    this.setState({ bbox, allEntList });
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

  async onChangeRegionIDs(regionIDs) {
    const { config } = this.state;
    config.setRegionIDs(regionIDs);
    const bbox = await HomePage.getBBox(config);
    this.setState({ config, configStr: config.toString(), bbox });
  }

  onClickRegion(regionID) {
    const { selectedColor, config } = this.state;
    config.update(regionID, { fill: selectedColor });
    this.setState({ config, configStr: config.toString() });
  }

  onCloseDrawerOptions() {
    this.setState({ isDrawerOptionsOpen: false });
  }

  onOpenDrawerOptions() {
    this.setState({ isDrawerOptionsOpen: true });
  }

  renderRegions() {
    const { bbox } = this.state;
    if (!bbox) {
      return <CircularProgress />;
    }
    const t = bbox.getTransform(SVG_WIDTH, SVG_HEIGHT, SVG_PADDING);

    const { config } = this.state;
    const inner = config.sortedRegionInfoList.map(
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
    const padding2 = SVG_PADDING / 2;
    return (
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width="100%"
        height="100vh"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={padding2}
          y={padding2}
          width={SVG_WIDTH - padding2 * 2}
          height={SVG_HEIGHT - padding2 * 2}
          fill="none"
          stroke="#eee"
        />
        {inner}
      </svg>
    );
  }

  renderOptionsInner() {
    const { selectedColor, config, allEntList } = this.state;
    if (!allEntList) {
      return <CircularProgress />;
    }

    const regionIDs = config.regionInfoList.map((info) => info.id);
    return (
      <Box sx={{ maxWidth: 320, p: 3 }}>
        <RegionPicker
          allEntList={allEntList}
          regionIDs={regionIDs}
          onChange={this.onChangeRegionIDs.bind(this)}
        />
        <div style={{ height: 200, margin: 20 }}>
          <BlockPicker
            color={selectedColor}
            onChangeComplete={this.onChangeSelectedColor.bind(this)}
            colors={Color.DEFAULT_COLORS}
            triangle="hide"
          />
        </div>
      </Box>
    );
  }

  renderOptions() {
    const { isDrawerOptionsOpen, selectedColor } = this.state;
    return (
      <Box sx={{ background: selectedColor }}>
        <IconButton>
          <TuneIcon onClick={this.onOpenDrawerOptions.bind(this)} />
        </IconButton>
        <Drawer
          anchor={"right"}
          open={isDrawerOptionsOpen}
          onClose={this.onCloseDrawerOptions.bind(this)}
        >
          {this.renderOptionsInner()}
        </Drawer>
      </Box>
    );
  }

  render() {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {this.renderRegions()}
        {this.renderOptions()}
      </Box>
    );
  }
}
