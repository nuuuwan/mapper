import React from "react";
import { Snackbar } from "@mui/material";

export default function SnackbarLight({ snackbarMessage }) {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(
    snackbarMessage !== ""
  );

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={1000}
      onClose={() => setIsSnackbarOpen(false)}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
}
