import { Box, Alert, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useState } from "react";
import Config from "../../nonview/core/Config";

const StyleTextareaAutosize = styled(TextareaAutosize)(
  ({ theme }) => `
  font-family: "Noto Sans Mono", monospace;
  padding: 24px;
  border-radius: 12px;
  color: #008;
  background: #fff1;
  border: 1px solid #0001;
`
);

export default function ConfigEditorView({ configStr, onChange }) {
  let [localConfigStr, setLocalConfigStr] = useState(configStr);

  let configExceptionStr = null;
  try {
    Config.fromString(localConfigStr);
  } catch (e) {
    configExceptionStr = e.toString();
  }

  const isLocalConfigStrUpdated =
    Config.fromStringSafe(localConfigStr).toString() !== configStr;
  const syncDisabled = configExceptionStr !== null || !isLocalConfigStrUpdated;

  const onChangeInner = function (e) {
    setLocalConfigStr(e.target.value);
  };

  const onClickSync = function (e) {
    onChange(Config.fromString(localConfigStr).toString());
  };

  return (
    <Box sx={{ p: 1, m: 2 }}>
      <StyleTextareaAutosize
        minRows={10}
        cols={40}
        placeholder=""
        value={localConfigStr}
        onChange={onChangeInner}
      />
      {configExceptionStr ? (
        <Alert severity="error">{configExceptionStr}</Alert>
      ) : (
        ""
      )}
      <IconButton onClick={onClickSync} disabled={syncDisabled}>
        <SyncIcon />
      </IconButton>
    </Box>
  );
}
