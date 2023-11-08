import { useScreenshot } from "use-react-screenshot";
import { Tooltip, IconButton } from "@mui/material";
import React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AlignRight, SnackbarLight } from "../atoms";
import { STYLE } from "../pages/HomePageStyle";
export default function ScreenShot({ label, children }) {
  const ref = React.useRef(null);

  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const takeScreenshot = useScreenshot()[1];
  const imageFile = `${label}.png`;
  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = imageFile;
    link.click();
    setSnackbarMessage(`Downloaded ${imageFile}`);
  };

  const onClick = function () {
    takeScreenshot(ref.current).then(download);
  };

  return (
    <div>
      <div ref={ref} id={label}>
        {children}
      </div>

      <div style={STYLE.BODY_CONTROLS}>
        <AlignRight>
          <Tooltip title="Download Image">
            <IconButton onClick={onClick}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <SnackbarLight
            key={"snackbar-" + snackbarMessage}
            snackbarMessage={snackbarMessage}
          />
        </AlignRight>
      </div>
    </div>
  );
}
