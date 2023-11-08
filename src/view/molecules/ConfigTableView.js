import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function ConfigTableViewRow({ id, info }) {
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
    </TableRow>
  );
}

export default function ConfigTableView({ config }) {
  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>Fill</TableCell>
              {/* Add more TableCell components here for additional columns */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(config.regionInfoIdx).map(function ([id, info]) {
              return <ConfigTableViewRow key={id} id={id} info={info} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
