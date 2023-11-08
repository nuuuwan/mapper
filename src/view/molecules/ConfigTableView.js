import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ConfigTableViewRow({ id, info, onDeleteRegions }) {
  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <span
          style={{
            background: info.fill,
            color: "white",
            padding: 3,
            borderRadius: 3,
            margin: 3,
            textAlign: "center",
          }}
        >
          {" "}
          {info.fill}
        </span>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => onDeleteRegions([id])}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function ConfigTableViewHeaderRow() {
  return (
    <TableRow>
      <TableCell>Region</TableCell>
      <TableCell>Fill</TableCell>
      <TableCell></TableCell>

      {/* Add more TableCell components here for additional columns */}
    </TableRow>
  );
}

export default function ConfigTableView({ config, onDeleteRegions }) {
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
                  onDeleteRegions={onDeleteRegions}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
