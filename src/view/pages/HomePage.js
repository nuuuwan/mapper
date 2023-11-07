import { Component } from "react";
import { Box, CircularProgress, Drawer } from "@mui/material";

import { BBox, LngLat, Ents, Geo, Color } from "../../nonview/base";
import { Config } from "../../nonview/core";

import {
  HeaderView,
  FooterView,
  OptionsView,
  MultiRegionView,
} from "../molecules";

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

  renderDrawerOptions() {
    const { isDrawerOptionsOpen, selectedColor, config, allEntList } =
      this.state;
    return (
      <Drawer
        anchor={"right"}
        open={isDrawerOptionsOpen}
        onClose={this.onCloseDrawerOptions.bind(this)}
      >
        <OptionsView
          selectedColor={selectedColor}
          config={config}
          allEntList={allEntList}
          onCloseDrawerOptions={this.onCloseDrawerOptions.bind(this)}
          onChangeSelectedColor={this.onChangeSelectedColor.bind(this)}
          onChangeRegionIDs={this.onChangeRegionIDs.bind(this)}
        />
      </Drawer>
    );
  }

  render() {
    const { bbox, config } = this.state;
    if (!bbox) {
      return <CircularProgress />;
    }
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>
          <HeaderView />
        </Box>
        <Box sx={STYLE.BODY}>
          <MultiRegionView
            bbox={bbox}
            config={config}
            onClickRegion={this.onClickRegion.bind(this)}
          />
          {this.renderDrawerOptions()}
        </Box>
        <Box sx={STYLE.FOOTER}>
          <FooterView onClick={this.onOpenDrawerOptions.bind(this)} />
        </Box>
      </Box>
    );
  }
}
