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

      pageId: "map",
    };
  }

  async componentDidMount() {
    const bbox = await HomePage.getBBox(this.state.config);
    const allEntIdx = await Ent.idxFromTypeList(ENT_TYPE_LIST);
    // HACK!
    await this.onClickAutoColor();
    this.setState({ bbox, allEntIdx });
  }

  static async getBBox(config) {
    const regionIdList = config.regionInfoList.map(
      (regionInfo) => regionInfo.id
    );

    const regionIdToPolygonList = await Geo.getIdToPolygonList(regionIdList);
    const lngLatList = LngLat.fromPolygonListList(
      Object.values(regionIdToPolygonList)
    );
    return BBox.fromLngLatList(lngLatList);
  }

  onChangeSelectedColor(colorInfo) {
    this.setState({ selectedColor: colorInfo.hex });
  }

  async onAddRegions(regionEnts) {
    const { config } = this.state;
    config.addRegions(regionEnts);
    const bbox = await HomePage.getBBox(config);
    this.setState({ config, configStr: config.toString(), bbox });
  }

  async onRemoveRegions(regionIds) {
    const { config } = this.state;
    config.deleteRegions(regionIds);
    const bbox = await HomePage.getBBox(config);
    this.setState({ config, configStr: config.toString(), bbox });
  }

  onClickRegion(regionId) {
    const { selectedColor, config } = this.state;
    config.update(regionId, { fill: selectedColor });
    this.setState({ config, configStr: config.toString() });
  }

  onClickPage(pageId) {
    this.setState({ pageId });
  }

  async onChangeConfig(newConfigData) {
    const config = Config.fromData(newConfigData);
    const bbox = await HomePage.getBBox(config);
    this.setState({ config, configStr: config.toString(), bbox });
  }

  async onClickAutoColor() {
    const { config } = this.state;
    const regionIdList = config.regionInfoList.map(
      (regionInfo) => regionInfo.id
    );
    const overlapPairs = await Geo.getOverlapGraph(regionIdList);

    const regionIdToColor = Color.autoColor(overlapPairs, regionIdList);
    Object.entries(regionIdToColor).map(function ([regionId, color]) {
      config.update(regionId, { fill: color });
      return true;
    });

    this.setState({ config, configStr: config.toString() });
  }

  renderBody() {
    const { bbox, config, selectedColor, pageId, allEntIdx } = this.state;
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
            onClickAutoColor={this.onClickAutoColor.bind(this)}
          />
        );
      case "data":
        return (
          <DataPane
            config={config}
            allEntIdx={allEntIdx}
            onAddRegions={this.onAddRegions.bind(this)}
            onRemoveRegions={this.onRemoveRegions.bind(this)}
            onChangeConfig={this.onChangeConfig.bind(this)}
          />
        );
      default:
        return "Unknown Page: " + pageId;
    }
  }

  render() {
    const { pageId, config, selectedColor } = this.state;
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
          />
        </Box>
      </Box>
    );
  }
}
