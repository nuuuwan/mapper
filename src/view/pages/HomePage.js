import { Component } from "react";
import { Box } from "@mui/material";
import RegionView from "../organisms/RegionView";
import BBox from "../../nonview/base/BBox";
import ConfigEditorView from "../molecules/ConfigEditorView";

import Config from "../../nonview/core/Config";
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const config = Config.DEFAULT;

    this.state = {
      config,
      configStr: config.toString(),
      configExceptionStr: null,
      bbox: BBox.LK_BBOX,
    };
  }

  onChangeConfig(configStr) {
    let config = this.state.config;
    let configExceptionStr = null;
    try {
      config = Config.fromString(configStr);
      configStr = config.toString();
    } catch (e) {
      console.log(e);
      configExceptionStr = e.toString();
    }
    this.setState({ configStr, config, configExceptionStr });
  }

  renderRegions() {
    const { bbox } = this.state;
    const t = bbox.getTransform(1000, 1000, 0);

    const { config } = this.state;
    const inner = config.regionInfoList.map(function (info) {
      const regionID = info.id;
      const key = "region-" + regionID;
      return <RegionView key={key} regionID={regionID} info={info} t={t} />;
    });
    return (
      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <rect x={0} y={0} width={1000} height={1000} fill="#ccc1" />
        {inner}
      </svg>
    );
  }

  render() {
    const { configStr, configExceptionStr } = this.state;
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {this.renderRegions()}
        <ConfigEditorView
          configStr={configStr}
          onChange={this.onChangeConfig.bind(this)}
          configExceptionStr={configExceptionStr}
        />
      </Box>
    );
  }
}
