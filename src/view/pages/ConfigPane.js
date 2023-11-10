import { Component } from "react";
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar,ListItemButton } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { ConfigFactory } from "../../nonview/core";
import {ColorView } from "../atoms"

function ConfigListItem({config, onChangeConfig}) {
  const onClick = function() {
    onChangeConfig(config);
  }  

  return (
  
        <ListItem >  <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText >
        <Typography variant="h6" color="text.secondary">
            {config.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {config.nRegions + ' regions'}
            </Typography>
            {config.colors.map(
                function(color, iColor) {
                    return <ColorView key={'color-' + iColor} color={color} />;
                }
          
            )}
</ListItemText></ListItemButton>
      </ListItem>
    );
}

export default class ConfigPane extends Component {
  constructor(props) {
    super(props);
    this.state = { configList: [] };
  }

  async componentDidMount() {
    const configList = await ConfigFactory.all();
    this.setState({ configList });
  }

  

  render() {
    return (
        <List >
            {this.state.configList.map(
                function(config, iConfig) {
                    return <ConfigListItem key={"config-list-item" + iConfig} config={config} onChangeConfig={this.props.onChangeConfig} />;
                }.bind(this)
            )}
      </List>
    )
  }
}
