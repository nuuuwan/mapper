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
import { StyledTableCell, ValueView } from "../atoms";

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
      <StyledTableCell>Value</StyledTableCell>
      <StyledTableCell>Actions</StyledTableCell>

      {/* Add more StyledTableCell components here for additional columns */}
    </TableRow>
  );
}

function ConfigTableViewRow({ id, value, color, ent, onRemoveRegions }) {
  return (
    <TableRow key={id}>
      <StyledTableCell>{ent.name}</StyledTableCell>
      <StyledTableCell>{ent.entType.shortName}</StyledTableCell>
      <StyledTableCell>{Number.humanize(ent.population)}</StyledTableCell>
      <StyledTableCell>
        <ValueView value={value} color={color} />
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
            {Object.entries(config.regionIdToValue).map(function ([id, value]) {
              const color = config.valueToColor[value];
              return (
                <ConfigTableViewRow
                  key={'config-table-view-row-'+id}
                  id={id}
                  value={value}
                  color={color}
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
