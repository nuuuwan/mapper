import { Autocomplete, TextField } from "@mui/material";
import { Ent } from "../../nonview/base";
export default function RegionPicker({ regionIds, allEntIdx, onAddRegions }) {
  const onChange = function (_, ent) {
    onAddRegions([ent.id]);
  };
  const entList = Object.values(allEntIdx);
  const key = regionIds.join(",");
  return (
    <Autocomplete
      key={key}
      disablePortal
      options={entList
        .filter((ent) => !regionIds.includes(ent.id))
        .sort((a, b) => Ent.cmp(a, b))}
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
