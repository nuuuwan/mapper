import React from "react";
import { Box, IconButton } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styled from "@mui/system/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 0,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 0,
});

export default function DataUpDownloader({ data, setData }) {
  const setSnackbarMessage = React.useState("")[1];

  const onUpload = function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const content = event.target.result;
        const data = JSON.parse(content);
        setSnackbarMessage(`Uploaded ${content.length}B from ${file.name}`);
        setData(data);
      } catch (error) {
        setSnackbarMessage(`Error parsing JSON file: ${error}`);
      }
    };
    reader.readAsText(file);
  };

  const onDownload = function () {
    const link = document.createElement("a");
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    link.href = jsonString;
    link.download = "config.json";
    link.click();
    setSnackbarMessage(`Downloaded ${link.download}`);
  };

  return (
    <Box>
      <IconButton component="label">
        <PublishIcon />
        <VisuallyHiddenInput type="file" accept="json/*" onChange={onUpload} />
      </IconButton>

      <IconButton onClick={onDownload}>
        <FileDownloadIcon />
      </IconButton>
    </Box>
  );
}
