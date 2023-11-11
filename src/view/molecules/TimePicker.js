import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GIG2TableMetadata } from "../../nonview/base";
import { ButtonPicker } from "../molecules";

export default function TimePicker({ tableName, onChangeTableName }) {
  const table = new GIG2TableMetadata(tableName);
  const times = table.getTimes();

  const onClick = async function (newTime) {
    const newTable = GIG2TableMetadata.fromMET(
      table.measurement,
      table.entity,
      newTime
    );
    await onChangeTableName(newTable.tableName);
  };

  return (
    <ButtonPicker
      optionList={times}
      selectedOption={table.time}
      onClick={onClick}
      Icon={CalendarMonthIcon}
    />
  );
}
