import { Paper, Slider } from "@mui/material";

import { ShowHide } from "../atoms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GIG2TableMetadata } from "../../nonview/base";

export default function TimePicker({ tableName, onChangeTableName }) {
  const table = new GIG2TableMetadata(tableName);

  const times = table.getTimes();
  const nTimes = times.length;
  const marks = times.map((t, i) => ({ value: i, label: t }));

  const iTableSelected = times.indexOf(table.time);

  const onChange = function (e, iTime) {
    const newTime = times[iTime];
    const newTable = GIG2TableMetadata.fromMET(
      table.measurement,
      table.entity,
      newTime
    );
    onChangeTableName(newTable.tableName);
  };

  return (
    <ShowHide Icon={CalendarMonthIcon} isShow={false}>
      <Paper sx={{ minWidth: 200, p: 2 }}>
        <Slider
          min={0}
          max={nTimes - 1}
          marks={marks}
          defaultValue={iTableSelected}
          onChange={onChange}
        />
      </Paper>
    </ShowHide>
  );
}
