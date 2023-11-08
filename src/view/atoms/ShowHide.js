import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlignRight from "./AlignRight";
export default function ShowHide({
  children,
  Icon: IconShow,
  isShow: isShowDefault,
}) {
  const [isShow, setIsShow] = React.useState(isShowDefault);

  const Icon = isShow ? CloseIcon : IconShow;

  return (
    <Box>
      {isShow ? children : null}

      <AlignRight>
        <IconButton onClick={() => setIsShow(!isShow)}>
          <Icon />
        </IconButton>
      </AlignRight>
    </Box>
  );
}
