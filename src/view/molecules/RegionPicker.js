import { Button, Box, Autocomplete, TextField } from "@mui/material";
import Ents from "../../nonview/base/Ents";
export default function RegionPicker({ regionIDs, allEntList, onChange }) {
  const onChangeInner = function (_, entList) {
    const newRegionsIDs = entList.map((ent) => ent.id);
    onChange(newRegionsIDs);
  };

  return (
    <Box sx={{ p: 1, m: 1 }}>
      <Autocomplete
        multiple
        defaultValue={allEntList.filter((ent) => regionIDs.includes(ent.id))}
        options={allEntList}
        getOptionLabel={(ent) => `${ent.id} ${ent.name}`}
        onChange={onChangeInner}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Regions"
            placeholder="Favorites"
          />
        )}
      />
      {["province", "district"].map(function (entType) {
        const onClick = async function () {
          const newRegionEnts = await Ents.getEntsByType(entType);
          const newRegionsIDs = newRegionEnts.map((ent) => ent.id);
          onChange(newRegionsIDs);
        };

        return (
          <Button variant="text" onClick={onClick}>
            {entType}s
          </Button>
        );
      })}
    </Box>
  );
}
