import { Button, Box } from "@mui/material";
import Ents from "../../nonview/base/Ents";
export default function MultiRegionPicker({ regionIDs, allEntList, onChange }) {
  const key = regionIDs.join(",");

  return (
    <Box key={key} sx={{ p: 1, m: 1 }}>
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
