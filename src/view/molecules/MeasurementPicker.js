import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { GIG2, StringX } from "../../nonview/base";
import { ConfigFactory } from "../../nonview/core";
import { MEASUREMENT_TO_ICON } from "../../nonview/constants";

const DEFAULT_ICON = PublicIcon;
function getMeasurementIcon(measurement) {
  let Icon = MEASUREMENT_TO_ICON[measurement];
  if (Icon) {
    return Icon;
  }
  return DEFAULT_ICON;
}

function MeasurementListItem({ measurement, isSelected, onClick }) {
  const background = isSelected ? "#eee" : "#fff";

  const tokens = measurement.split("-");
  const superTitle = StringX.toTitleCase(tokens.slice(0, 1).join(" "));
  const title = StringX.toTitleCase(tokens.slice(1).join(" "));

  const Icon = getMeasurementIcon(measurement);

  return (
    <ListItem>
      <ListItemButton onClick={onClick} sx={{ background, borderRadius: 6 }}>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="subtitle2" color="text.secondary">
            {superTitle}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default function MeasurementPicker({ onChangeConfig }) {
  const idxGMT = GIG2.getGroupToMeasurementToTableNames();

  return (
    <Box>
      {Object.entries(idxGMT).map(function ([group, idxMT]) {
        const measurementList = Object.keys(idxMT);
        return (
          <List key={"list-" + group}>
            {measurementList.map(function (measurement) {
              const tableNameList = idxMT[measurement];
              const lastTableName = tableNameList.slice(-1)[0];
              const onClick = async function () {
                const config = await ConfigFactory.fromTableName(lastTableName);

                await onChangeConfig(config, "map");
              };
              return (
                <MeasurementListItem
                  key={"list-item-" + measurement}
                  measurement={measurement}
                  onClick={onClick}
                />
              );
            })}
          </List>
        );
      })}
    </Box>
  );
}
