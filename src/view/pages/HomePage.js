import { Component } from "react";
import { Box } from "@mui/material";
import { BBox, LngLat, Ent, Geo, Color, EntType } from "../../nonview/base";
import { ConfigFactory } from "../../nonview/core";
import { LoadingProgress } from "../atoms";
import { HeaderView, FooterView } from "../molecules";

import DataPane from "./DataPane";
import MapPane from "./MapPane";
import ConfigPane from "./ConfigPane";
import { STYLE } from "./HomePageStyle";

const ENT_TYPE_LIST = EntType.ALL;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableName: null,
      regionEntType: null,
      config: null,
      bbox: null,
      selectedColor: Color.DEFAULT_COLORS[0],
      pageId: "config",
    };
  }

  async componentDidMount() {
    const allEntIdx = await Ent.idxFromTypeList(ENT_TYPE_LIST);

    this.setState({ allEntIdx });
  }

  static async getBBox(config) {
    const regionIdList = config.regionIdList;

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
    let { config } = this.state;
    config.addRegions(regionEnts);
    await this.onChangeConfig(config);
  }

  async onRemoveRegions(regionIds) {
    const { config } = this.state;
    config.deleteRegions(regionIds);
    await this.onChangeConfig(config);
  }

  onClickRegion(regionId) {
    const { selectedColor, config } = this.state;
    config.update(regionId, { fill: selectedColor });
    this.setState({ config, configStr: config.toString() });
  }

  onClickPage(pageId) {
    this.setState({ pageId });
  }

  async onChangeTableName(tableName) {
    const regionEntType = EntType.PROVINCE;
    const config = await ConfigFactory.fromTableName(tableName, regionEntType);
    const bbox = await HomePage.getBBox(config);
    this.setState({
      tableName,
      regionEntType,
      config: config,
      bbox,
      pageId: "map",
    });
  }

  async onChangeRegionEntType(regionEntType) {
    const { tableName } = this.state;
    const config = await ConfigFactory.fromTableName(tableName, regionEntType);
    const bbox = await HomePage.getBBox(config);
    this.setState({
      tableName,
      regionEntType,
      config: config,
      bbox,
      pageId: "map",
    });
  }

  async onChangeConfig(newConfig, pageId) {
    pageId = pageId || this.state.pageId;
    const bbox = await HomePage.getBBox(newConfig);
    this.setState({ config: newConfig, bbox, pageId });
  }

  async onClickAutoColor() {
    let { config } = this.state;
    await config.autoColor();
    this.setState({ config, configStr: config.toString() });
  }

  renderBody() {
    const {
      bbox,
      tableName,
      regionEntType,
      config,
      selectedColor,
      pageId,
      allEntIdx,
    } = this.state;
    if (!allEntIdx) {
      return <LoadingProgress />;
    }

    switch (pageId) {
      case "config":
        return (
          <ConfigPane onChangeTableName={this.onChangeTableName.bind(this)} />
        );
      case "map":
        return (
          <MapPane
            tableName={tableName}
            regionEntType={regionEntType}
            config={config}
            bbox={bbox}
            selectedColor={selectedColor}
            onChangeSelectedColor={this.onChangeSelectedColor.bind(this)}
            onClickRegion={this.onClickRegion.bind(this)}
            onClickAutoColor={this.onClickAutoColor.bind(this)}
            onChangeTableName={this.onChangeTableName.bind(this)}
            onChangeRegionEntType={this.onChangeRegionEntType.bind(this)}
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
    const { pageId, config, selectedColor, tableName } = this.state;

    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>
          <HeaderView
            config={config}
            pageId={pageId}
            selectedColor={selectedColor}
          />
        </Box>
        <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
        <Box sx={STYLE.FOOTER}>
          <FooterView
            onClickPage={this.onClickPage.bind(this)}
            pageId={pageId}
            tableName={tableName}
          />
        </Box>
      </Box>
    );
  }
}
