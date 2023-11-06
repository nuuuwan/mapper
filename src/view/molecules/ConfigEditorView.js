import { Box, Typography, Alert } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
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

export default function ConfigEditorView({
  configStr,
  configExceptionStr,
  onChange,
}) {
  const onChangeInner = function (e) {
    onChange(e.target.value);
  };

  return (
    <Box sx={{ p: 1, m: 2 }}>
      <Typography variant="h6">Config Editor</Typography>
      <StyleTextareaAutosize
        minRows={10}
        cols={40}
        placeholder=""
        value={configStr}
        onChange={onChangeInner}
      />
      {configExceptionStr ? (
        <Alert severity="error">{configExceptionStr}</Alert>
      ) : (
        ""
      )}
    </Box>
  );
}
