import { Autocomplete, TextField } from "@mui/material";
import { Ent } from "../../nonview/base";
export default function RegionPicker({ regionIDs, allEntIdx, onChange }) {
  const onChangeInner = function (_, entList) {
    const newRegionsIDs = entList.map((ent) => ent.id);
    onChange(newRegionsIDs);
  };
  const entList = Object.values(allEntIdx);
  const key = regionIDs.join(",");
  return (
    <Autocomplete
      key={key}
      multiple
      defaultValue={entList.filter((ent) => regionIDs.includes(ent.id))}
      options={entList.sort((a, b) => Ent.cmp(a, b))}
      groupBy={(ent) => ent.name.substring(0, 2)}
      getOptionLabel={(ent) => `${ent.label}`}
      onChange={onChangeInner}
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
