import { Stack } from "@mui/material";

export default function AlignRight({ alignDirection, children }) {
  return (
    <Stack direction="row" justifyContent="end">
      {children}
    </Stack>
  );
}
