import { Button, Box } from "@mui/material";
import { Ent, EntType } from "../../nonview/base";
const ENT_TYPE_LIST = [EntType.PROVINCE, EntType.DISTRICT];
export default function MultiRegionPicker({
  regionIDs,
  onAddRegions,
  onRemoveRegions,
}) {
  const key = regionIDs.join(",");

  const onClickRemoveAll = function () {
    onRemoveRegions(regionIDs);
  };

  return (
    <Box key={key} sx={{ p: 1, m: 1 }}>
      {ENT_TYPE_LIST.map(function (entType) {
        const onClick = async function () {
          const newRegionEnts = await Ent.listFromType(entType);
          onAddRegions(newRegionEnts);
        };
        const key = "button-" + entType.id;
        return (
          <Button key={key} variant="text" onClick={onClick}>
            {"Add All " + entType.id + "s"}
          </Button>
        );
      })}
      <Button variant="text" onClick={onClickRemoveAll}>
        {"Remove all"}
      </Button>
    </Box>
  );
}
