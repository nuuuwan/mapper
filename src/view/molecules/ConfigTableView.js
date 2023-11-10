import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Number } from "../../nonview/base";
import { StyledTableCell, ColorView } from "../atoms";

function RegionActionsView({ id, onRemoveRegions }) {
  return (
    <IconButton size="small" onClick={() => onRemoveRegions([id])}>
      <DeleteIcon />
    </IconButton>
  );
}

function ConfigTableViewHeaderRow() {
  return (
    <TableRow>
      <StyledTableCell>Region</StyledTableCell>
      <StyledTableCell>Type</StyledTableCell>
      <StyledTableCell>Population</StyledTableCell>
      <StyledTableCell>Fill</StyledTableCell>
      <StyledTableCell>Actions</StyledTableCell>

      {/* Add more StyledTableCell components here for additional columns */}
    </TableRow>
  );
}

function ConfigTableViewRow({ id, info, ent, onRemoveRegions }) {
  return (
    <TableRow key={id}>
      <StyledTableCell>{ent.name}</StyledTableCell>
      <StyledTableCell>{ent.entType.shortName}</StyledTableCell>
      <StyledTableCell>{Number.humanize(ent.population)}</StyledTableCell>
      <StyledTableCell>
        <ColorView color={info.fill} />
      </StyledTableCell>
      <StyledTableCell>
        <RegionActionsView id={id} onRemoveRegions={onRemoveRegions} />
      </StyledTableCell>
    </TableRow>
  );
}

export default function ConfigTableView({
  allEntIdx,
  config,
  onRemoveRegions,
}) {
  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <ConfigTableViewHeaderRow />
          </TableHead>
          <TableBody>
            {config.sortedRegionInfoList.map(function (info) {
              const id = info.id;
              return (
                <ConfigTableViewRow
                  key={id}
                  id={id}
                  info={info}
                  ent={allEntIdx[id]}
                  onRemoveRegions={onRemoveRegions}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
