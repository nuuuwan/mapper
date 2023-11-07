import { Component } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BBox, LngLat, Ents, Geo, Color } from "../../nonview/base";
import { Config } from "../../nonview/core";

import { HeaderView, FooterView } from "../molecules";

import DataPane from "./DataPane";
import MapPane from "./MapPane";
import { STYLE } from "./HomePageStyle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const config = Config.DEFAULT;

    this.state = {
      config,
      configStr: config.toString(),
      bbox: null,
      selectedColor: Color.DEFAULT_COLORS[0],
      isDrawerOptionsOpen: false,
      pageId: "map",
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

  onClickPage(pageId) {
    this.setState({ pageId });
  }

  renderBody() {
    const { bbox, config, selectedColor, pageId, allEntList } = this.state;
    if (!bbox) {
      return <CircularProgress />;
    }
    switch (pageId) {
      case "map":
        return (
          <MapPane
            config={config}
            bbox={bbox}
            selectedColor={selectedColor}
            onChangeSelectedColor={this.onChangeSelectedColor.bind(this)}
            onClickRegion={this.onClickRegion.bind(this)}
          />
        );
      case "data":
        return (
          <DataPane
            config={config}
            allEntList={allEntList}
            onChangeRegionIDs={this.onChangeRegionIDs.bind(this)}
          />
        );
      default:
        return "Unknown Page: " + pageId;
    }
  }

  render() {
    const { pageId, config } = this.state;
    const nRegions = config.nRegions;
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>
          <HeaderView nRegions={nRegions} />
        </Box>
        <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
        <Box sx={STYLE.FOOTER}>
          <FooterView
            onClickPage={this.onClickPage.bind(this)}
            pageId={pageId}
          />
        </Box>
      </Box>
    );
  }
}
