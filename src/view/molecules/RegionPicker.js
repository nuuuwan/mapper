import { Autocomplete, TextField } from "@mui/material";

export default function RegionPicker({ regionIDs, allEntList, onChange }) {
  const onChangeInner = function (_, entList) {
    const newRegionsIDs = entList.map((ent) => ent.id);
    onChange(newRegionsIDs);
  };

  const key = regionIDs.join(",");
  return (
    <Autocomplete
      key={key}
      multiple
      defaultValue={allEntList.filter((ent) => regionIDs.includes(ent.id))}
      options={allEntList}
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
