import { Component } from "react";
import { Box, Button } from "@mui/material";

import { RegionGroup } from "../../nonview/core";

const MAX_REGION_GROUP_COUNT = 10;

export default class RegionGroupPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { regionGroups: [] };
  }

  async componentDidMount() {
    const { regionIds } = this.props;
    const regionGroups = [].concat(await RegionGroup.similar(regionIds));

    this.setState({ regionGroups });
  }
  render() {
    const { onRemoveRegions, onAddRegions, regionIds } = this.props;
    const { regionGroups } = this.state;

    const onClickRemoveAll = function () {
      onRemoveRegions(regionIds);
    };

    return (
      <Box sx={{ p: 1, m: 1 }}>
        {regionGroups
          .slice(0, MAX_REGION_GROUP_COUNT)
          .map(function (regionGroup) {
            const onClick = async function () {
              onAddRegions(regionGroup.regionIdList);
            };

            const key = "button-" + regionGroup.name;
            return (
              <Button key={key} variant="text" onClick={onClick}>
                {regionGroup.name}
              </Button>
            );
          })}
        <Button variant="text" onClick={onClickRemoveAll}>
          {"Remove all ✖"}
        </Button>
      </Box>
    );
  }
}
