import { Component } from "react";
import { Box, Button } from "@mui/material";

import { RegionGroup } from "../../nonview/core";

export default class RegionGroupPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { regionGroups: [] };
  }

  async componentDidMount() {
    const regionGroups = await RegionGroup.all();
    this.setState({ regionGroups });
  }
  render() {
    const { onRemoveRegions, onAddRegions, regionIDs } = this.props;
    const { regionGroups } = this.state;

    const onClickRemoveAll = function () {
      onRemoveRegions(regionIDs);
    };

    return (
      <Box sx={{ p: 1, m: 1 }}>
        {regionGroups.map(function (regionGroup) {
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
          {"Remove all"}
        </Button>
      </Box>
    );
  }
}
