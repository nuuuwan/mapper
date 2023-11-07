import { useScreenshot } from "use-react-screenshot";
import { Grid, Tooltip, IconButton } from "@mui/material";
import React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function ScreenShot({ label, children, setSnackbarMessage }) {
  const ref = React.useRef(null);

  const takeScreenshot = useScreenshot()[1];
  const imageFile = `${label}.png`;
  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = imageFile;
    link.click();
    if (setSnackbarMessage) {
      setSnackbarMessage(`Downloaded ${imageFile}`);
    }
  };

  const onClick = function () {
    takeScreenshot(ref.current).then(download);
  };

  return (
    <div>
      <Grid container justifyContent="flex-end" sx={{ paddingRight: 2 }}>
        <Tooltip title="Download Image">
          <IconButton onClick={onClick}>
            <CloudDownloadIcon sx={{ color: "#ccc" }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <div ref={ref} id={label}>
        {children}
      </div>
    </div>
  );
}
