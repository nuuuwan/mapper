import { Component } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { BBox, LngLat, Ent, Geo, Color, EntType } from "../../nonview/base";
import { Config } from "../../nonview/core";

import { HeaderView, FooterView } from "../molecules";

import DataPane from "./DataPane";
import MapPane from "./MapPane";
import { STYLE } from "./HomePageStyle";

const ENT_TYPE_LIST = EntType.ALL;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const config = Config.DEFAULT;

    this.state = {
      config,
      configStr: config.toString(),
      bbox: null,
      selectedColor: Color.DEFAULT_COLORS[0],
      isColorPickerOpen: true,
      pageId: "data",
    };
  }

  async componentDidMount() {
    const bbox = await HomePage.getBBox(this.state.config);
    const allEntList = await Ent.listFromTypeList(ENT_TYPE_LIST);

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

  onToggleColorPicker() {
    this.setState({ isColorPickerOpen: !this.state.isColorPickerOpen });
  }

  onClickPage(pageId) {
    this.setState({ pageId });
  }

  async onChangeConfig(newConfigData) {
    const config = Config.fromData(newConfigData);
    const bbox = await HomePage.getBBox(config);
    this.setState({ config, configStr: config.toString(), bbox });
  }

  renderBody() {
    const {
      bbox,
      config,
      selectedColor,
      pageId,
      allEntList,
      isColorPickerOpen,
    } = this.state;
    if (!bbox) {
      return (
        <Box sx={STYLE.LOADING}>
          <CircularProgress />
          <Typography variant="subtitle" component="div" gutterBottom>
            Loading {config.nRegions} regions...
          </Typography>
        </Box>
      );
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
            isColorPickerOpen={isColorPickerOpen}
          />
        );
      case "data":
        return (
          <DataPane
            config={config}
            allEntList={allEntList}
            onChangeRegionIDs={this.onChangeRegionIDs.bind(this)}
            onChangeConfig={this.onChangeConfig.bind(this)}
          />
        );
      default:
        return "Unknown Page: " + pageId;
    }
  }

  render() {
    const { pageId, config, isColorPickerOpen, selectedColor } = this.state;
    const nRegions = config.nRegions;
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>
          <HeaderView nRegions={nRegions} selectedColor={selectedColor} />
        </Box>
        <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
        <Box sx={STYLE.FOOTER}>
          <FooterView
            onClickPage={this.onClickPage.bind(this)}
            pageId={pageId}
            isColorPickerOpen={isColorPickerOpen}
            onToggleColorPicker={this.onToggleColorPicker.bind(this)}
          />
        </Box>
      </Box>
    );
  }
}
