import { Component } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

import { ColorView } from "../atoms";
import { STYLE } from "./HomePageStyle";

function ConfigListItem({ config, isSelected, onChangeConfig }) {
  const onClick = function () {
    onChangeConfig(config, "map");
  };

  const background = isSelected ? "#eee" : "#fff";

  return (
    <ListItem>
      {" "}
      <ListItemButton onClick={onClick} sx={{ background, borderRadius: 6 }}>
        <ListItemAvatar>
          <Avatar>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="h6" color="text.secondary">
            {config.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {config.nRegions + " regions"}
          </Typography>
          {config.colors.map(function (color, iColor) {
            return <ColorView key={"color-" + iColor} color={color} />;
          })}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default class ConfigPane extends Component {
  render() {
    const { configList, onChangeConfig, config: selectedConfig } = this.props;
    return (
      <div style={STYLE.BODY_CONTENT_SCROLLABLE}>
        <List>
          {configList.map(function (config, iConfig) {
            return (
              <ConfigListItem
                key={"config-list-item" + iConfig}
                config={config}
                onChangeConfig={onChangeConfig}
                isSelected={selectedConfig.equal(config)}
              />
            );
          })}
        </List>
      </div>
    );
  }
}
