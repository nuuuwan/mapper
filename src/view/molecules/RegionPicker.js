import { Autocomplete, TextField } from "@mui/material";
import { Ent } from "../../nonview/base";
export default function RegionPicker({ regionIDs, allEntIdx, onAddRegions }) {
  const onChange = function (_, ent) {
    onAddRegions([ent]);
  };
  const entList = Object.values(allEntIdx);
  const key = regionIDs.join(",");
  return (
    <Autocomplete
      key={key}
      disablePortal
      options={entList.sort((a, b) => Ent.cmp(a, b))}
      groupBy={(ent) => ent.name.substring(0, 2)}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Regions"
          placeholder="Select Regions"
        />
      )}
    />
  );
}
