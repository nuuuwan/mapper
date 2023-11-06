import { Box, IconButton } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PestControlIcon from "@mui/icons-material/PestControl";
import HelpIcon from "@mui/icons-material/Help";

const URL_INFO_LIST = [
  {
    url: "https://nuuuwan.github.io/mapper/",
    Icon: RefreshIcon,
  },
  {
    url: "",
    Icon: HelpIcon,
  },
  {
    url: "https://github.com/nuuuwan/mapper/issues/new",
    Icon: PestControlIcon,
  },
];

export default function VersionView() {
  const renderedIconButtons = URL_INFO_LIST.map(function (
    { url, Icon },
    iIconButton
  ) {
    const onClick = function () {
      window.open(url, "_blank");
    };

    return (
      <IconButton onClick={onClick} key={"icon-button-" + iIconButton}>
        <Icon />
      </IconButton>
    );
  });

  return (
    <Box sx={{ margin: 2, marginTop: 10, textAlign: "center" }}>
      <Box>{renderedIconButtons}</Box>
    </Box>
  );
}
