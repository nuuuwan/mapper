import { Component } from "react";
import { Box } from "@mui/material";
import RegionView from "../organisms/RegionView";
import BBox from "../../nonview/base/BBox";
import ConfigEditorView from "../molecules/ConfigEditorView";

import Config from "../../nonview/core/Config";
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const configStr = Config.getDefaultStr();
    const config = Config.getDefault();

    this.state = {
      config,
      configStr,
      configExceptionStr: null,
      dims: { width: 700, height: 700, padding: 50 },
      bbox: BBox.LK_BBOX,
    };
  }

  onChangeConfig(configStr) {
    let config = this.state.config;
    let configExceptionStr = null;
    try {
      config = JSON.parse(configStr);
    } catch (e) {
      console.log(e);
      configExceptionStr = e.toString();
    }
    this.setState({ configStr, config, configExceptionStr });
  }

  renderRegions() {
    const { dims, bbox } = this.state;
    const { width, height, padding } = dims;
    const t = bbox.getTransform(width, height, padding);

    const { config } = this.state;

    const inner = Object.entries(config.regionInfoIndex).map(function ([
      regionID,
      info,
    ]) {
      const key = "region-" + regionID;
      return <RegionView key={key} regionID={regionID} info={info} t={t} />;
    });
    const padding2 = padding / 2;
    return (
      <svg width={width} height={height}>
        <rect
          x={padding2}
          y={padding2}
          width={width - padding2 / 2}
          height={height - padding2 / 2}
          fill="#0001"
        />
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
