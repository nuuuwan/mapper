import { Button, Box } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
const ENT_TYPE_LIST = [EntType.PROVINCE, EntType.DISTRICT];
export default function MultiRegionPicker({ regionIDs, allEntList, onChange }) {
  const key = regionIDs.join(",");

  return (
    <Box key={key} sx={{ p: 1, m: 1 }}>
      {ENT_TYPE_LIST.map(function (entType) {
        const onClick = async function () {
          const newRegionEnts = await Ent.listFromType(entType);
          const newRegionsIDs = newRegionEnts.map((ent) => ent.id);
          onChange(newRegionsIDs);
        };
        const key = "button-" + entType.id;
        return (
          <Button key={key} variant="text" onClick={onClick}>
            {entType.id}s
          </Button>
        );
      })}
    </Box>
  );
}
