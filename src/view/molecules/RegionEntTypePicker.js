
import { EntType, GIG2TableMetadata } from "../../nonview/base";

import { ButtonPicker } from "../molecules";
import MapIcon from "@mui/icons-material/Map";

export default function RegionEntTypePicker({
  tableName,
  regionEntType: selectedRegionEntType,
  onChangeRegionEntType,
}) {
  const table = new GIG2TableMetadata(tableName);
  const tableEntity = table.entity;

  let regionEntTypeList = [];
  if (tableEntity === "regions" || tableEntity === "regions-ec") {
    regionEntTypeList = [
      EntType.PROVINCE,
      EntType.ED,
      EntType.DISTRICT,
      EntType.PD,
      EntType.DSD,
    ];
  } else {
    throw new Error(`Unknown tableEntity: ${tableEntity}`);
  }

  return (
   <ButtonPicker optionList={regionEntTypeList} selectedOption={selectedRegionEntType} onClick={onChangeRegionEntType} Icon={MapIcon} />
  );
}
